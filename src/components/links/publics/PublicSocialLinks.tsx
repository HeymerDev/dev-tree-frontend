import type { SocialNetwork } from "../../../types";

const PublicSocialLinks = ({ link }: { link: Omit<SocialNetwork, "id"> }) => {
  return (
    <a
      className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg cursor-pointer text-black w-[400px] mx-auto"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <p>
        Visita mi <span className="font-semibold">{link.name}</span>
      </p>
    </a>
  );
};

export default PublicSocialLinks;
