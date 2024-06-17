import { Link, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  if (data)
    return (
      <>
        <header className="shadow-md bg-[#F7EcDE] py-5">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="lg:ml-12">
              <Link to={"/"}>
                <img
                  src="../../public/Logo.png"
                  className="w-40"
                  alt="TTsk Logo"
                />
              </Link>
            </div>

            <div className="lg:mr-12">
              <NavMenu name={data.name} />
            </div>
          </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <footer className="py-5">
          <p className="text-center">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}
