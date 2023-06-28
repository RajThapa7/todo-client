import { useMutation } from "@tanstack/react-query";
import useCreateApi from "../useCreateApi";
import { AxiosInstance } from "axios";
import { ITodos } from "./useFetchTodos";

type TodoForm = Omit<ITodos, "_id">;

const addTodo = async (api: AxiosInstance, data: TodoForm) => {
  const result = api.post("/todo/create", data);
  return result;
};

const useAddTodo = () => {
  const api = useCreateApi();
  const result = useMutation({
    mutationFn: (data: TodoForm) => addTodo(api, data),
  });

  return result;
};

export default useAddTodo;
