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
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error("Failed to edit task");
  return res.json();  
}

export async function getTaskById(id: string): Promise<Task | null> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
  });
  if (!res.ok) return null;
  return res.json() as Promise<Task>;
}

// New function to create task on backend and return created task
export async function addTask(title: string, description: string, status: string): Promise<Task> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ title, description, status }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add task: ${text}`);
  }
  const data = await res.json();
  // Assumes backend returns created task as { task: {...} } or task directly
  return data.task ?? data;
}
export async function removeTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  // Common patterns return 204 No Content; treat any 2xx as success
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete task: ${text || res.statusText}`);
  }
  return;
}