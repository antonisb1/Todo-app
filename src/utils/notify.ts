import { type MessageInstance } from "antd/es/message/interface";

type NotifyType = "success" | "error" | "warning" | "info" | "loading";

export const notify = (
  messageApi: MessageInstance,
  type: NotifyType,
  content: string
) => {
  messageApi.open({
    type,
    content,
    duration: 2,
  });
};
