import { useQuery } from "react-query";
import {
  useGetUserPostsQuery,
  useGetUsersPostsQuery,
} from "../manager/usersReq/usersApiSlice";

export function useFetchUserPosts(userId) {
  const queryHook = useGetUserPostsQuery(userId);
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery("posts", async () => {
    return await queryHook.unwrap();
  });

  return {
    post,
    isLoading: isLoading || queryHook.isLoading,
    isError,
    error,
  };
}
export function useFetchUsersPosts() {
  const queryHook = useGetUsersPostsQuery();
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery("posts", async () => {
    return await queryHook.unwrap();
  });

  return {
    post,
    isLoading: isLoading || queryHook.isLoading,
    isError,
    error,
  };
}
