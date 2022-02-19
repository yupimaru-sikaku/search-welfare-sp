import useSWR from "swr";

export const useFetchArray = (url) => {
  const { data, error } = useSWR(url);

  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
  };
};