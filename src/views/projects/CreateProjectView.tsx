import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <nav className="mt-5 mb-12">
          <Link
            className="bg-orange-50 hover:bg-[#F7EcDE]  px-6 py-2 text-neutral-500 text-lg font-bold cursor-pointer transition-colors border-2 border-teal-300 rounded-3xl"
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <h1 className="text-4xl font-bold text-neutral-600">Crear Proyecto</h1>
        <p className="text-2xl font-light text-neutral-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>

        <form
          className="mt-5 bg-orange-50 shadow-lg p-10 border-2 border-teal-300 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Crear Proyecto"
            className=" bg-teal-500 hover:bg-teal-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
