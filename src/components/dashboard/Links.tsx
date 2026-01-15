import { Link, Outlet } from "react-router";
import NavigationTabs from "../navigation/Tabs";
import type { SocialNetwork, User } from "../../types";
import { Toaster } from "sonner";
import { useState } from "react";

export const Links = ({ user }: { user: User }) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled)
  );

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil /{user.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white font-semibold">
                {user.handle}
              </p>
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt="profile Image"
                  className="mx-auto max-w-[250px]"
                />
              )}

              <p className="text-center text-lg font-normal text-white">
                {user.description}
              </p>

              <section className="mt-20 flex flex-col gap-5 ">
                {enabledLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bg-white text-slate-800 text-center p-3 rounded-lg font-bold block"
                  >
                    {link.name}
                  </a>
                ))}
              </section>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};
