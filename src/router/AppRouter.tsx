import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./paths";
import { Login } from "../pages/LoginPage";
import TaskboardPage from "../pages/TaskBoardPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.TASKBOARD} element={<TaskboardPage />} />
        <Route path="*" element={<Navigate to={ROUTES.TASKBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
