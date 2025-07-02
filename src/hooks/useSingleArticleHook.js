import { useQuery } from "@tanstack/react-query";
import { fetchToGetData } from "../helpers/fetcher";
const useSingleArticleHook = (id) => {
  const {
    data: singleArticleData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleArticleData",id],
    queryFn: () => fetchToGetData("articals", id),
    staleTime: 2 * 60 * 60 * 1000,
  });
  return [singleArticleData, isLoading, isError, error];
};
export default useSingleArticleHook;
