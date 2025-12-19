import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/types";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteConfirmModal } from "./Modals/DeleteConfirmModal";
import { AddTaskModal } from "./Modals/AddTaskModal";
import { useMessage } from "../providers/MessageProvider";

type TaskCardProps = {
  task: Task;
  onEditTask: (id: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
};

export function TaskCard({ task, onEditTask, onDeleteTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: String(task._id) });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const [showDelete, setShowDelete] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const messageApi = useMessage();

  return (
    <>
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

        {/* Actions */}
        <div className="ml-4 flex items-start">
          <Space size="small">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowEdit(true);
              }}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowDelete(true);
              }}
            />
          </Space>
        </div>
      </div>

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        open={showDelete}
        taskTitle={task.title}
        confirming={confirmingDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => {
          try {
            setConfirmingDelete(true);
            await onDeleteTask(task._id);
            setShowDelete(false);
            messageApi.success("Task deleted successfully");
          } finally {
            setConfirmingDelete(false);
          }
        }}
      />

      {/* Edit modal using AddTaskModal */}
      <AddTaskModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        loading={savingEdit}
        initial={{ title: task.title, description: task.description }}
        mode="edit"
        onSubmit={async (title, description) => {
          try {
            setSavingEdit(true);
            await onEditTask(task._id, { title, description });
            setShowEdit(false);
            messageApi.success("Task edited successfully");
          } finally {
            setSavingEdit(false);
          }
        }}
      />
    </>
  );
}
