import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void> | void;
  loading?: boolean;
  // When editing, pass current values; when creating, leave undefined
  initial?: { title: string; description: string } | null;
  mode?: "create" | "edit";
};

export function AddTaskModal({
  open,
  onClose,
  onSubmit,
  loading = false,
  initial,
  mode = "create",
}: AddTaskModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initial) {
        form.setFieldsValue({
          title: initial.title ?? "",
          description: initial.description ?? "",
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initial, form]);

  const handleOk = async () => {
    try {
      const { title, description } = await form.validateFields();
      await onSubmit(title, description);
      form.resetFields();
    } catch {}
  };

  return (
    <Modal
      open={open}
      title={mode === "edit" ? "Edit task" : "Add a new task"}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            form.resetFields();
            onClose();
          }}
        >
          Cancel
        </Button>,
        <Button key="ok" type="primary" loading={loading} onClick={handleOk}>
          {mode === "edit" ? "Save" : "Create"}
        </Button>,
      ]}
      destroyOnClose
      centered
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Task title" autoFocus />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            rows={5}
            placeholder="Type your description here..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
