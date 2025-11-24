const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
 

export type RegisterInput = {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  token: string; // returned by backend, but we will NOT store it
  user: {
    id: string;
    name?: string;
    lastname?: string;
    email: string;
  };
};

export async function register(input: RegisterInput): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to register");
  }
  return res.json() as Promise<RegisterResponse>;
}
