import type { Task } from "../types/types";
import { apiFetch } from "./api";

export function getTasks(): Promise<Task[]> {
  return apiFetch<Task[] | { tasks: Task[] }>("/tasks")
    .then(data => Array.isArray(data) ? data : data.tasks ?? []);
}

export function getTaskById(id: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`);
}

export function addTask(
  title: string,
  description: string,
  status: string
): Promise<Task> {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description, status }),
  });
}

export function editTask(
  id: string,
  partial: Partial<Task>
): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(partial),
  });
}

export function removeTask(id: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, {
    method: "DELETE",
  });
}
