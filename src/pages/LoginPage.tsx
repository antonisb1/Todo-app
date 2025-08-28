import { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMessage } from "../providers/MessageProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/paths";
import { login } from "../services/authService";

const { Title } = Typography;

export function Login() {
  const [loading, setLoading] = useState(false);
  const messageApi = useMessage();
  const navigate = useNavigate();

  const handleFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values);
      messageApi.success("Login successful!");
      navigate(ROUTES.TASKBOARD, { replace: true });
    } catch (error: any) {
      messageApi.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
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
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
