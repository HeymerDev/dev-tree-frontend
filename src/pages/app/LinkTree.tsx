import { useState } from "react";
import { social } from "../../data/social";
import type { DevTreeLink } from "../../types";
import { DevTreeLinks } from "../../components/links/DevTreeLinks";
import { isValidUrl } from "../../utils";
import { toast } from "sonner";

const LinkTree = () => {
  const [links, setLinks] = useState<DevTreeLink[]>(social);

  const handleUrlChange = (name: string, url: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.name === name ? { ...link, url } : link))
    );
  };

  const handleEnableLink = (socialName: string) => {
    const linkToToggle = links.find((link) => link.name === socialName);
    if (!linkToToggle) return;

    if (!isValidUrl(linkToToggle.url)) {
      toast.error("Please enter a valid URL before enabling the link.");
      return;
    }

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.name === socialName ? { ...link, enabled: !link.enabled } : link
      )
    );
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
    </div>
  );
};

export default LinkTree;
