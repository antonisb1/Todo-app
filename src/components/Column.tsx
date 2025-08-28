import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import type { Column as ColumnType, Task } from "../types/types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-full min-h-[calc(100vh-13rem)] flex-col rounded-xl bg-white shadow-sm border border-slate-200 p-4">
      <h2 className="mb-4 font-semibold text-indigo-700">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
