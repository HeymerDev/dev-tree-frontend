import { Toaster } from "sonner";
import { Logo } from "../components/Logo";
import { Outlet } from "react-router";

const PublicLayout = () => {
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

export default PublicLayout;
