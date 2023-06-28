import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

interface ISignup {
  name: string;
  email: string;
  password: string;
}

const signup = async (api: AxiosInstance, data: ISignup) => {
  const result = await api.post("/signup", data);
  return result;
};

const useSignup = () => {
  const api = useCreateApi();

  const result = useMutation({
    mutationFn: (data: ISignup) => signup(api, data),
  });
  return result;
};

export default useSignup;
