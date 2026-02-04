import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../../api/dashboard";
import type { SocialNetwork } from "../../types";
import PublicSocialLinks from "../../components/links/publics/PublicSocialLinks";

export const PublicView = () => {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    retry: false,
    queryKey: ["handle", handle],
    queryFn: () => getUserByHandle(handle!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;

  if (!data) return <Navigate to="/404" />;

  console.log(data);

  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{data.handle}</p>

      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt="Profile"
          className="mx-auto max-w-[250px]"
        />
      )}

      <p className="text-lg text-center font-bold">{data.description}</p>

      <div className="mt-2 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => <PublicSocialLinks key={link.name} link={link} />)
        ) : (
          <p className="text-5xl text-center font-black">
            No Hay enlaces en este perfil
          </p>
        )}
      </div>
    </div>
  );
};
