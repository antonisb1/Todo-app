import { apiFetch } from "./api";

export async function login(credentials: {
  email: string;
  password: string;
}) {
  const data = await apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  localStorage.setItem("token", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export type RegisterInput = {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    name?: string;
    lastname?: string;
    email: string;
  };
};

export function register(input: RegisterInput): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
