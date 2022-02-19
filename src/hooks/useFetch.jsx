import useSWR from "swr";

export const useFetch = (url) => {
  const { data, error } = useSWR(url);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};