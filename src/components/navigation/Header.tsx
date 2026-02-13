import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router";
import { Logo } from "../Logo";
import { getUser } from "../../api/dashboard";

export const Header = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.setQueryData(["user"], null);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <header className="bg-slate-800 py-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <div className="w-full p-5 lg:p-0 md:w-1/3">
          <Logo />
        </div>
        <nav className="md:w-1/3 md:flex md:justify-end">
          {user && location.pathname !== "/" && (
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          )}
          {user && location.pathname === "/" && (
            <div className="flex justify-center gap-4">
              <Link
                to="/app"
                className="bg-cyan-400 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              >
                Ir al Dashboard
              </Link>

              <button
                className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
          {!user && (
            <div className="flex justify-center gap-4">
              <Link
                to="/auth/login"
                className="bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              >
                Iniciar Sesión
              </Link>

              <Link
                to="/auth/register"
                className="ml-4 bg-cyan-400 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
