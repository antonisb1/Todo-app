import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/types";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-slate-50 hover:bg-slate-100 p-4 shadow-sm hover:shadow-md transition-colors duration-200 border border-slate-200"
      style={style}
    >
      <h3 className="font-medium text-slate-900">{task.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{task.description}</p>
    </div>
  );
}
