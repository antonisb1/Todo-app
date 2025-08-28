const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN_KEY = "token";

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}
 
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
