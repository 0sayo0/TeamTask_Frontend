import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { athenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: athenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-neutral-500">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-neutral-500 mt-5">
        Comienza a planear tus proyectos {""}
        <span className=" text-teal-500 font-bold"> iniciando sesión</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-orange-50 rounded-lg border-2 border-teal-300 shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-neutral-600 text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-neutral-600  text-2xl">
            Password
          </label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-teal-500 hover:bg-teal-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4 w-max mx-auto">
        <Link
          to={"/auth/register"}
          className="font-normal text-center text-neutral-500 hover:text-teal-500 transition-colors"
        >
          ¿No tienes cuenta? Crear una
        </Link>

        <Link
          to={"/auth/forgot-password"}
          className="font-normal text-center text-neutral-500 hover:text-teal-500 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  );
}
