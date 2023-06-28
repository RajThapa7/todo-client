import { useMutation } from "@tanstack/react-query";
import useCreateApi from "../useCreateApi";
import { AxiosInstance } from "axios";
import { ITodos } from "./useFetchTodos";
import { useSearchParams } from "react-router-dom";

type TodoForm = Partial<Omit<ITodos, "_id">>;

const editTodo = async (api: AxiosInstance, data: TodoForm, id: string) => {
  const result = api.patch(`/todo/${id}`, data);
  return result;
};

const useEditTodo = () => {
  const api = useCreateApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const result = useMutation({
    mutationFn: (data: TodoForm) => editTodo(api, data, id),
  });

  return result;
};

export default useEditTodo;
