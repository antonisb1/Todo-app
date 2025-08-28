import { MessageProvider } from "./providers/MessageProvider";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <MessageProvider>
      <AppRouter />
    </MessageProvider>
  );
}
