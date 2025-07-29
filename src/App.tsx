import { useState } from "react";
import { Button, message } from "antd";
import { Login } from "./components/Login";
import { TaskBoard } from "./components/TaskBoard";
import { notify } from "./utils/notify";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = () => {
    setLoggedIn(false);
    notify(messageApi, "success", "Logged out successfully");
  };

  return (
    <>
      {contextHolder}
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Taskboard</h1>
              <p className="text-gray-600">
                This is a taskboard to manage your tasks easily.
              </p>
            </div>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </header>
          <TaskBoard />
        </div>
      )}
    </>
  );
}
