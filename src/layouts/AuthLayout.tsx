import { Navigate, Outlet } from "react-router";
import { Toaster } from "sonner";
import { Logo } from "../components/Logo";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/dashboard";

const AuthLayout = () => {
  const { data } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false, // No reintentar si falla
    refetchOnWindowFocus: false,
  });

  // Si el usuario ya está autenticado, redirigir a /app
  if (data) {
    return <Navigate to="/app" replace />;
  }

  return (
    <section className="bg-slate-800 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-lg pt-10 px-5 mx-auto">
        <Logo />

        <div className="py-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
