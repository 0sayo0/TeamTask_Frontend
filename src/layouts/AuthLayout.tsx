import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen">
        <div className="py-10 lg:py-10 mx-auto w-[450px]">
          <img
            src="../../public/Logo.png"
            className="mx-auto w-80"
            alt="Auth TTsk Logo"
          />
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
