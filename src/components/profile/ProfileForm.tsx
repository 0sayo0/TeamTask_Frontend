import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "@/api/ProfileAPI";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({ defaultValues: data });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-4xl font-black text-neutral-600">Mi Perfil</h1>
        <p className="text-2xl font-light text-neutral-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-orange-50 shadow-lg p-10 border-2 border-teal-300 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="font-normal text-neutral-600 text-2xl"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="font-normal text-neutral-600 text-2xl"
              htmlFor="password"
            >
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-teal-500 hover:bg-teal-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
