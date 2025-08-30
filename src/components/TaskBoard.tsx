import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Column } from "./Column";
import type { Task, Column as ColumnType } from "../types/types";
import * as taskService from "../services/taskService";

const COLUMNS: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const LS_KEY = "tasks-cache";

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try {
        setTasks(JSON.parse(cached) as Task[]);
      } catch {}
    }
    (async () => {
      try {
        const fresh = await taskService.getTasks();
        setTasks(fresh);
        localStorage.setItem(LS_KEY, JSON.stringify(fresh));
      } catch {}
    })();
  }, []);

  function saveCache(next: Task[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  // DnD status move
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const taskId = String(active.id);
    const newStatus = over.id as Task["status"];
    if (!["todo", "in-progress", "done"].includes(newStatus)) return;

    let prev: Task[] = [];
    setTasks((p) => {
      prev = p;
      const next = p.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      );
      saveCache(next);
      return next;
    });

    try {
      await taskService.editTask(taskId, { status: newStatus });
    } catch {
      setTasks(prev);
      saveCache(prev);
    }
  }

  // Create
  async function addTask(title: string, description: string, status: string) {
    const created = await taskService.addTask(title, description, status);
    setTasks((p) => {
      const next = [...p, created];
      saveCache(next);
      return next;
    });
  }

  async function editTask(id: string, updates: Partial<Task>) {
    const updated = await taskService.editTask(id, updates);

    setTasks((p) => {
      const next = p.map((t) =>
        t._id === id
          ? { ...t, ...updates, ...updated } // merge to keep old fields
          : t
      );
      saveCache(next);
      return next;
    });
  }

  // Delete
  async function deleteTask(id: string) {
    await taskService.removeTask(id);
    setTasks((p) => {
      const next = p.filter((t) => t._id !== id);
      saveCache(next);
      return next;
    });
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((t) => t.status === column.id)}
              onCreateTask={addTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
