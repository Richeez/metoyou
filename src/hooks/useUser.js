import { useQuery } from "@tanstack/react-query";
import { toaster } from "../helpers/reuseable";
import ApiServices from "../../services/APIServices";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await ApiServices.getUser();
        return response;
      } catch (err) {
        if (!err?.message.includes("authenticated")) {
          toaster("Something went wrong!", true);
        }
        console.log("🚀 ~ err:", err?.message);
        throw err; // Ensure the error is thrown so react-query knows it's an error
      }
    },
    select: (res) => res.data, // Extract the data from the response
    refetchOnWindowFocus: false, // Prevent refetching when window is focused
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return { data, isLoading, isError, refetch };
};

export default useUser;
