import { createContext, useContext } from "react";
import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";

const MessageContext = createContext<MessageInstance>(message);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [msgApi, contextHolder] = message.useMessage();
  return (
    <MessageContext.Provider value={msgApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
