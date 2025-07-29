import { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { notify } from "../utils/notify";
const { Title } = Typography;

export function Login({ onLogin }: { onLogin: () => void }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const handleFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (values.email === "a" && values.password === "a") {
        notify(messageApi, "success", "Login successful!");
        // Delay onLogin to allow the message to show
        setTimeout(() => {
          onLogin();
        }, 1000);
      } else {
        notify(messageApi, "error", "Invalid email or password");
      }
    }, 1000);
  };

  return (
    <>
      {" "}
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <Card className="w-full max-w-sm shadow-xl rounded-xl">
          <div className="text-center mb-6">
            <span className="text-4xl">🗂️</span>
            <Title level={3} className="mt-2 mb-0">
              Taskboard Login
            </Title>
            <p className="text-gray-500 text-sm">
              Welcome back! Please log in.
            </p>
          </div>
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="admin@example.com"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
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
    </>
  );
}
