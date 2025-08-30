import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/types";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type TaskCardProps = { task: Task };

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(task._id),
    });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`rounded-lg bg-slate-50 hover:bg-slate-100 p-4 shadow-sm hover:shadow-md border border-slate-200 flex flex-row justify-between items-start relative ${
        isDragging ? "z-50 shadow-lg" : ""
      }`}
    >
      {/* Draggable area (excludes buttons) */}
      <div className="flex-1 min-w-0 cursor-grab" {...listeners}>
        <h3 className="font-medium text-slate-900">{task.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{task.description}</p>
      </div>

      {/* Actions (clickable, not draggable) */}
      <div className="ml-4 flex items-start">
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // stops drag
              console.log("Edit clicked", task._id);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // stops drag
              console.log("Delete clicked", task._id);
            }}
          />
        </Space>
      </div>
    </div>
  );
}
