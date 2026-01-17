import type { SocialNetwork } from "../../types";

export const SocialLinks = ({ link }: { link: SocialNetwork }) => {
  return (
    <li className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <p>
        Visita mi <span className="font-semibold">{link.name}</span>
      </p>
    </li>
  );
};
