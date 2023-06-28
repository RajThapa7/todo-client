import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

const deleteTodo = async (api: AxiosInstance, id: string | undefined) => {
  let result;
  if (typeof id === "undefined") {
    result = await api.delete(`/todo`);
  }
  result = await api.delete(`/todo/${id}`);
  return result;
};

const useDeleteTodo = () => {
  const api = useCreateApi();
  const result = useMutation({
    mutationFn: (id: string | undefined) => deleteTodo(api, id),
  });
  return result;
};

export default useDeleteTodo;
