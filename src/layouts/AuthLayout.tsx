import { Outlet } from "react-router";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <section className="bg-slate-800 min-h-screen">
      <Toaster />
      <div className="max-w-lg pt-10 px-5 mx-auto">
        <img src="/logo.svg" alt="logo" />

        <div className="py-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
