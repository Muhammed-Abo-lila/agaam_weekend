"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchToGetData } from "../helpers/fetcher";
const useHomeHook = () => {
  const {
    data: articlesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchToGetData("articals"),
    staleTime: 2 * 60 * 60 * 1000,
  });
  return [articlesData, isLoading, isError, error];
};

export default useHomeHook;
