import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

interface ILogin {
  email: string;
  password: string;
}

const login = async (data: ILogin, api: AxiosInstance) => {
  const result = await api.post("/login", data);
  return result;
};

const useLogin = () => {
  const api = useCreateApi();
  const result = useMutation({
    mutationFn: (data: ILogin) => login(data, api),
  });
  return result;
};

export default useLogin;
