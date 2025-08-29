import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "../types/types";
import { Column } from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import * as taskService from "../services/taskService";

const COLUMNS: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const LS_KEY = "tasks-cache";

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from cache and backend once
  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try {
        setTasks(JSON.parse(cached) as Task[]);
      } catch {
        // ignore bad cache
      }
    }
    (async () => {
      try {
        const fresh = await taskService.getTasks();
        setTasks(fresh);
        localStorage.setItem(LS_KEY, JSON.stringify(fresh));
      } catch {
        // ignore fetch failure, keep cache
      }
    })();
  }, []);

  // Handle drag and drop with optimistic UI and revert on failure
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id as Task["status"];
    if (!["todo", "in-progress", "done"].includes(newStatus)) return;

    let previousTasks: Task[] = [];
    setTasks((prev) => {
      previousTasks = prev;
      const next = prev.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      );
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await taskService.editTask(taskId, { status: newStatus });
      // optimistic update kept
    } catch {
      setTasks(previousTasks);
      localStorage.setItem(LS_KEY, JSON.stringify(previousTasks));
    }
  }

  // Add task with backend API call, update local state, handle errors
  async function addTask(title: string, description: string, status: string) {
    try {
      const newTask = await taskService.addTask(title, description, status);
      setTasks((prev) => {
        const updated = [...prev, newTask];
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onCreateTask={addTask}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
