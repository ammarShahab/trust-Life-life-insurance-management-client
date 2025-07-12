import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCustomerRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["customerRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/customers/role/${user.email}`);
      return res.data.role;
    },
  });

  return {
    role,
    isLoading,
    isError,
  };
};

export default useCustomerRole;
