import { useEffect, useState } from "react";
import { social } from "../../data/social";
import type { DevTreeLink, SocialNetwork, User } from "../../types";
import { DevTreeLinks } from "../../components/links/DevTreeLinks";
import { isValidUrl } from "../../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/dashboard";

const LinkTree = () => {
  const [links, setLinks] = useState<DevTreeLink[]>(social);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Links updated successfully!");
    },
  });

  useEffect(() => {
    const updateData = links.map((item) => {
      const userLinks = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLinks) {
        return { ...item, url: userLinks.url, enabled: userLinks.enabled };
      }
      return item;
    });
    setLinks(updateData);
  }, []);

  const handleUrlChange = (name: string, url: string) => {
    const updatedLinks = links.map((link) =>
      link.name === name ? { ...link, url } : link
    );
    setLinks(updatedLinks);
    queryClient.setQueryData(["user"], (prevUser: User) => {
      return {
        ...prevUser,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  const handleEnableLink = (socialName: string) => {
    const updatedLinks = links.map((link) => {
      if (link.name === socialName) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Please enter a valid URL before enabling the link.");
        }
      }
      return link;
    });

    setLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevUser: User) => {
      return {
        ...prevUser,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  return (
    <div className="space-y-5">
      {links.map((link) => (
        <DevTreeLinks
          key={link.name}
          link={link}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
        onClick={() => mutate(user!)}
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default LinkTree;
