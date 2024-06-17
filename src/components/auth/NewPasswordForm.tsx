import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { ConfirmToken, NewPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 bg-orange-50 rounded-lg border-2 border-teal-300 shadow-lg mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-neutral-600 text-2xl">
            Password
          </label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-neutral-600 text-2xl">
            Repetir Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Reestablecer contraseña"
          className="bg-teal-500 hover:bg-teal-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </>
  );
}
