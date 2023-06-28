import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";
import { useSearchParams } from "react-router-dom";
import { ITodos } from "./useFetchTodos";
import { Dispatch, SetStateAction } from "react";

const getTodo = async (api: AxiosInstance, id: string): Promise<ITodos> => {
  const result = await api.get(`/todo/${id}`);
  return result.data;
};

const useFetchSingleTodo = (
  isEnabled: boolean,
  setIsEnabled: Dispatch<SetStateAction<boolean>>
) => {
  const api = useCreateApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const result = useQuery({
    queryFn: () => getTodo(api, id),
    queryKey: ["todo", id],
    enabled: isEnabled,
  });
  return result;
};

export default useFetchSingleTodo;
