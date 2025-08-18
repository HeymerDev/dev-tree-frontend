import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/dashboard";
import { Navigate } from "react-router";
import { Links } from "../components/dashboard/Links";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  if (data) {
    return <Links user={data} />;
  }
}
