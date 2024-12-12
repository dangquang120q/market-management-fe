import { message } from "antd";

type MessageType =
  | "info"
  | "success"
  | "error"
  | "warning"
  | "loading"
  | undefined;

export default function showMessage(
  msgType: MessageType,
  msgContent: string,
  key?: string
) {
  if (msgContent === "undefined") {
    return;
  }

  message.config({
    maxCount: 1,
  });
  message.open({
    content: msgContent,
    className: "event-message",
    duration: 3,
    type: msgType,
    key: key,
  });
}
