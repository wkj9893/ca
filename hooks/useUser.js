import axios from "axios";
import useSWR from "swr";

export default function useUser() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/auth", fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    username: data ? data.username : "",
  };
}
