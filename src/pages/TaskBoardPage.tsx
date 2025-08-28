import { Button } from "antd";
import { TaskBoard } from "../components/TaskBoard";
import { ROUTES } from "../router/paths";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../providers/MessageProvider";

export default function TaskboardPage() {
  const navigate = useNavigate();
  const messageApi = useMessage();

  const handleLogout = () => {
    messageApi.success("Logged out successfully");
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-sky-50 to-black-50  p-6">
      <header className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur shadow rounded-lg p-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Taskboard</h1>
          <p className="text-gray-700">
            This is a taskboard to manage your tasks easily.
          </p>
        </div>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <TaskBoard />
    </div>
  );
}
