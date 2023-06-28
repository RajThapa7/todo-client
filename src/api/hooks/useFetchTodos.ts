import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";
import { useQuery } from "@tanstack/react-query";

export interface ITodos {
  _id: string;
  title: string;
  body: string;
  isActive: boolean;
}
const getTodos = async (api: AxiosInstance): Promise<ITodos[]> => {
  const result = await api.get(`/todo`);
  return result.data;
};

const useFetchTodos = () => {
  const api = useCreateApi();
  const result = useQuery({
    queryFn: () => getTodos(api),
    queryKey: ["todos"],
  });
  return result;
};

export default useFetchTodos;
