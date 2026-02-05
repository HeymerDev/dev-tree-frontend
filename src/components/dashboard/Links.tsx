import { Link, Outlet } from "react-router";
import NavigationTabs from "../navigation/Tabs";
import type { SocialNetwork, User } from "../../types";
import { Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { SocialLinks } from "../links/SocialLinks";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "../navigation/Header";

export const Links = ({ user }: { user: User }) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled),
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled),
    );
  }, [user]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const disabledLinks: SocialNetwork[] = JSON.parse(user.links).filter(
      (link: SocialNetwork) => !link.enabled,
    );

    const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
    const nextIndex = enabledLinks.findIndex((link) => link.id === over.id);

    const order = arrayMove(enabledLinks, prevIndex, nextIndex);
    setEnabledLinks(order);

    const links = [...order, ...disabledLinks];

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(links),
      };
    });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${user.handle}`}
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

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <section className="mt-2 flex flex-col gap-5 ">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <SocialLinks key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </section>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};
