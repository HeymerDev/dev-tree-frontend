import { useParams } from "react-router";

export const PublicView = () => {
  const { handle } = useParams();
  return <div>Profile for user: {handle}</div>;
};
