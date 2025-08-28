import type { Task } from "../types/types";
import { getToken } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  if (Array.isArray(data)) return data as Task[];
  if (data && typeof data === "object" && "tasks" in data) {
    // @ts-ignore
    return (data.tasks ?? []) as Task[];
  }
  return [];
}

export async function editTask(id: string, partial: Partial<Task>) {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error("Failed to edit task");
  return res.json();
}
