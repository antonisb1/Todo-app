import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskModal } from "./Modals/AddTaskModal";
import type { Column as ColumnType, Task } from "../types/types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onCreateTask: (
    title: string,
    description: string,
    status: string
  ) => Promise<void> | void;
  onEditTask: (id: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
};

const headerStyles: Record<
  ColumnType["id"],
  { bg: string; border: string; dot: string; text: string; countText: string }
> = {
  todo: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-400",
    text: "text-rose-700",
    countText: "text-rose-600",
  },
  "in-progress": {
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-400",
    text: "text-sky-700",
    countText: "text-sky-600",
  },
  done: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-400",
    text: "text-emerald-700",
    countText: "text-emerald-600",
  },
};

export function Column({
  column,
  tasks,
  onCreateTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });
  const s = headerStyles[column.id];
  const [showAdd, setShowAdd] = useState(false);
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex w-full min-h-[calc(100vh-14rem)] flex-col rounded-xl bg-white shadow-sm border border-slate-200">
      <div
        className={[
          "w-full -mt-4 px-4 py-3 rounded-t-xl shadow-sm border-b",
          s.bg,
          s.border,
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <span className={["h-2.5 w-2.5 rounded-full", s.dot].join(" ")} />
          <h2 className={["font-semibold", s.text].join(" ")}>
            {column.title}
          </h2>
          <span
            className={["ml-auto text-xs font-medium", s.countText].join(" ")}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4 p-4 mt-4">
        {tasks.map((t) => (
          <TaskCard
            key={t._id}
            task={t}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      <button
        className="mt-2 text-start text-xs px-4 py-2 bg-slate-200/70 hover:bg-slate-200 transition-colors border border-slate-200 hover:cursor-pointer"
        onClick={() => setShowAdd(true)}
      >
        + Add item
      </button>

      <AddTaskModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        loading={creating}
        mode="create"
        onSubmit={async (title, description) => {
          try {
            setCreating(true);
            await onCreateTask(title, description, column.id);
            setShowAdd(false);
          } finally {
            setCreating(false);
          }
        }}
      />
    </div>
  );
}
