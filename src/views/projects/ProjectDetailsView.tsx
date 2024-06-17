import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();

  const params = useParams();

  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data && user)
    return (
      <>
        <nav className="mt-5 mb-14">
          <Link
            className="bg-orange-50 hover:bg-[#F7EcDE] px-6 py-2 text-neutral-500 text-lg font-bold cursor-pointer transition-colors border-2 border-teal-300 rounded-3xl"
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>
        <h1 className="text-neutral-600 text-4xl font-black">
          {data.projectName}
        </h1>
        <p className="text-xl font-light text-neutral-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 px-6 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar tarea
            </button>
            <Link
              to={"team"}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
