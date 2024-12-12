import { ConfigProvider } from "antd";
import "i18n/i18n";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/_app.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);
