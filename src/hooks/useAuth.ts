import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/paths";
import { login, register } from "../services/authService";
import { useMessage } from "../providers/MessageProvider";

export function useLogin() {
  const navigate = useNavigate();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      messageApi.success("Login successful!");
      navigate(ROUTES.TASKBOARD, { replace: true });
    },
    onError: (error: any) => {
      messageApi.error(error?.message || "Failed to log in");
    },
  });
}

export function useRegister() {
  const messageApi = useMessage();

  return useMutation({
    mutationFn: register,
    onSuccess: (resp) => {
      messageApi.success(
        resp.message || `Account created for ${resp.user.email}. Please log in.`
      );
    },
    onError: (err: any) => {
      messageApi.error(err?.message || "Failed to create account");
    },
  });
}
