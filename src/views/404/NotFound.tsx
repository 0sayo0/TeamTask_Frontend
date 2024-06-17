import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-red-400">
        Pagina no encontrada {":("}
      </h1>
      <p className="text-xl mt-10 text-center text-neutral-500">
        Tal vez quieras{" "}
        <Link
          className="font-bold text-teal-500 hover:text-teal-700 transition-colors"
          to={"/"}
        >
          volver a proyectos
        </Link>
      </p>
    </>
  );
}
