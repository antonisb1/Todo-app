import { Button } from "antd";
import { TaskBoard } from "../components/TaskBoard";
import { ROUTES } from "../router/paths";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../providers/MessageProvider";
import { logout } from "../services/authService";

export default function TaskboardPage() {
  const navigate = useNavigate();
  const messageApi = useMessage();

  const handleLogout = () => {
    messageApi.success("Logged out successfully");
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className=" bg-slate-100  ">
      <header className=" mb-6 flex items-center justify-between bg-white shadow-md rounded-lg p-4 border border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Taskboard</h1>
          <p className="text-slate-600">
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
