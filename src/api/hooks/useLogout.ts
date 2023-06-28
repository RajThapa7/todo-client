import { useMutation } from "@tanstack/react-query";
import useCreateApi from "../useCreateApi";
import { AxiosInstance } from "axios";

const logout = (api: AxiosInstance, data: any) => {
  const result = api.post("/logout", data);
  return result;
};

const useLogout = () => {
  const api = useCreateApi();
  const result = useMutation({
    mutationFn: (data: any) => logout(api, data),
  });
  return result;
};

export default useLogout;
