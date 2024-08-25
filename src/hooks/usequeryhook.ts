import { useQuery } from "@tanstack/react-query";
import axiostwoInstance from "../config/axios2.config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useCustomQuery = ({ queryKey, url, config }: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiostwoInstance.get(url, config);
      return data;
    },
  });
};

export default useCustomQuery;