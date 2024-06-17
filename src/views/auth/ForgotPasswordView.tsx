import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-neutral-500">
        Reestablecer Contraseña
      </h1>
      <p className="text-2xl font-light text-neutral-500 mt-5">
        Llena el formulario para {""}
        <span className=" text-teal-500 font-bold">
          {" "}
          reestablecer tu contraseña
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 bg-orange-50 rounded-lg border-2 border-teal-300 shadow-lg mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-neutral-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-teal-500 hover:bg-teal-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4 w-max mx-auto">
        <Link
          to="/auth/login"
          className="text-center text-neutral-500 font-normal hover:text-teal-500 transition-colors"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-neutral-500 font-normal hover:text-teal-500 transition-colors"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
