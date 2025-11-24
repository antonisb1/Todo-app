import { Modal, Form, Input, Button, Row, Col } from "antd";
import { useEffect } from "react";

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name?: string;
    lastname?: string;
    email: string;
    password: string;
  }) => Promise<void> | void;
  loading?: boolean;
};

export function CreateUserModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: CreateUserModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch {}
  };

  return (
    <Modal
      open={open}
      title="Create account"
      centered
      destroyOnClose
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
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="create_user_form">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="First name" name="name">
              <Input placeholder="Optional" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last name" name="lastname">
              <Input placeholder="Optional" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
