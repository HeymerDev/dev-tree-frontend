import { Link } from "react-router";

export const NotFound = () => {
  return (
    <>
      <h5 className="text-4xl font-black text-center text-white">404</h5>
      <p className="font-bold text-2xl text-center text-white">
        Este Recurso no fue encontrado
      </p>

      <Link to={"/"} className="block mt-5 text-center text-lime-500 font-bold">
        Regresar al Inicio
      </Link>
    </>
  );
};
