import { Modal, Form, Input, Button, Space } from "antd";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  loading?: boolean;
};

export function AddTaskModal({
  isOpen,
  onClose,
  onCreate,
  loading = false,
}: AddTaskModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values.title, values.description);
        form.resetFields();
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Add a new task"
      open={isOpen}
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
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
      destroyOnClose
      centered
      width={600}
    >
      <Form form={form} layout="vertical" name="add_task_form">
        <Form.Item
          name="title"
          label="Add a title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Title" autoFocus />
        </Form.Item>

        <Form.Item name="description" label="Add a description">
          <Input.TextArea
            placeholder="Type your description here..."
            rows={5}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
