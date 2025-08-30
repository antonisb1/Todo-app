import { Modal } from "antd";

type DeleteConfirmModalProps = {
  open: boolean;
  taskTitle: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
  confirming?: boolean;
};

export function DeleteConfirmModal({
  open,
  taskTitle,
  onCancel,
  onConfirm,
  confirming = false,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      open={open}
      title="Delete task?"
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      confirmLoading={confirming}
      onOk={onConfirm}
      onCancel={onCancel}
      centered
    >
      <p>
        Are you sure you want to delete “{taskTitle}”? This action cannot be
        undone.
      </p>
    </Modal>
  );
}
