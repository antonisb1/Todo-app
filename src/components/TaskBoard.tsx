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

  // Load tasks: local cache first, then backend
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
        // keep cached if fetch fails
      }
    })();
  }, []);

  // Minimal change: functional update + optimistic backend edit, revert on failure
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id as Task["status"];
    if (!["todo", "in-progress", "done"].includes(newStatus)) return;

    let previous: Task[] = [];
    setTasks((prev) => {
      previous = prev;
      const next = prev.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      );
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await taskService.editTask(taskId, { status: newStatus });
      // keep optimistic state
    } catch {
      // revert on failure
      setTasks(previous);
      localStorage.setItem(LS_KEY, JSON.stringify(previous));
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
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
