import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../../api/dashboard";

export const PublicView = () => {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", handle],
    queryFn: () => getUserByHandle(handle!),
  });

  console.log(data);

  return <div>Profile for user: {handle}</div>;
};
