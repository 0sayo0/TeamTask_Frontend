import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label
          htmlFor="projectName"
          className="text-neutral-600 text-sm uppercase font-bold"
        >
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="clientName"
          className="text-neutral-600 text-sm uppercase font-bold"
        >
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="description"
          className="text-neutral-600 text-sm uppercase font-bold"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="bg-transparent w-full p-3 border-2 rounded-md border-[#E9DAC1] focus:border-teal-300 focus:ring-teal-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
