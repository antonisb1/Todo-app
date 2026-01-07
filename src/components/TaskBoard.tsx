import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Task, Column as ColumnType } from "../types/types";
import { Column } from "./Column";
import * as taskService from "../services/taskService";

const COLUMNS: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    refetchTasks();
  }, []);

  async function refetchTasks() {
    try {
      const fresh = await taskService.getTasks();
      setTasks(fresh);
    } finally {
    }
  }

  // Drag-and-drop: optimistic status, then PUT, then refetch
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id as Task["status"];
    if (!["todo", "in-progress", "done"].includes(newStatus)) return;

    const prev = tasks;
    setTasks(
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.editTask(taskId, { status: newStatus });
      await refetchTasks(); // canonical refresh
    } catch {
      setTasks(prev); // revert on error
    }
  }

  // Create: POST then refetch
  async function addTask(title: string, description: string, status: string) {
    await taskService.addTask(title, description, status);
    await refetchTasks();
  }

  // Edit: PUT then refetch
  async function editTask(id: string, updates: Partial<Task>) {
    await taskService.editTask(id, updates);
    await refetchTasks();
  }

  // Delete: DELETE then refetch
  async function deleteTask(id: string) {
    await taskService.removeTask(id);
    await refetchTasks();
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
