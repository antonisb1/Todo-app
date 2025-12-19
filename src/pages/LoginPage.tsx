import { useState } from "react";
import { Form, Input, Button, Typography, Card, Divider } from "antd";
import { LockOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useLogin, useRegister } from "../hooks/useAuth";
import { CreateUserModal } from "../components/Modals/CreateUserModal";

const { Title } = Typography;

export function Login() {
  const [showCreate, setShowCreate] = useState(false);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <Card className="w-full max-w-sm shadow-xl rounded-xl">
        <div className="text-center mb-6">
          <span className="text-4xl">🗂️</span>
          <Title level={3} className="mt-2 mb-0">
            Taskboard Login
          </Title>
          <p className="text-gray-500 text-sm">Welcome back! Please log in.</p>
        </div>

        <Form layout="vertical" onFinish={loginMutation.mutate}>
          {" "}
          <Form.Item label="Email" name="email">
            <Input prefix={<UserOutlined />} placeholder="admin@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="123456" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>or</Divider>

        <Button
          type="default"
          icon={<PlusOutlined />}
          onClick={() => setShowCreate(true)}
          block
        >
          Create an account
        </Button>
      </Card>

      <CreateUserModal
        open={showCreate}
        onSubmit={(values) => {
          registerMutation.mutate(values);
          setShowCreate(false);
        }}
        loading={registerMutation.isPending}
        onClose={() => setShowCreate(false)}
      />
    </div>
  );
}
