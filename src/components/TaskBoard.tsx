import { useState, useEffect } from "react";
import type { Task, Column as ColumnType } from "../types/types";
import { Column } from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import * as TaskService from "../services/taskService";

const COLUMNS: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];
// const INITIAL_TASKS: Task[] = [
//   {
//     id: "1",
//     title: "Research Project",
//     description: "Gather requirements and create initial documentation",
//     status: "todo",
//   },
//   {
//     id: "2",
//     title: "Design System",
//     description: "Create component library and design tokens",
//     status: "todo",
//   },
//   {
//     id: "3",
//     title: "API Integration",
//     description: "Implement REST API endpoints",
//     status: "in-progress",
//   },
//   {
//     id: "412",
//     title: "Testing",
//     description: "Write unit tests for core functionality",
//     status: "done",
//   },
// ];

// export function TaskBoard() {
//   const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
