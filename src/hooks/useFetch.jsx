import useSWR from "swr";

export const useFetch = (url) => {
  const { data, error, mutate } = useSWR(url);

  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
  };
};
