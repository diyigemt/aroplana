import { ElMessage, ElMessageBox } from "element-plus";
import type {
  ElMessageBoxOptions,
  MessageBoxData,
} from "element-plus/es/components/message-box/src/message-box.type";

export function infoMessage(info: Parameters<typeof ElMessage.info>[0]) {
  return ElMessage.info(info);
}
export function successMessage(info: Parameters<typeof ElMessage.success>[0]) {
  return ElMessage.success(info);
}
export function warningMessage(info: Parameters<typeof ElMessage.warning>[0]) {
  return ElMessage.warning(info);
}
export function errorMessage(info: Parameters<typeof ElMessage.error>[0]) {
  return ElMessage.error(info);
}

export function IPrompt(title: string, message: string, config?: ElMessageBoxOptions): Promise<MessageBoxData> {
  return ElMessageBox.prompt(message, title, config);
}

export function IConfirm(title: string, message: string, config?: ElMessageBoxOptions) {
  return ElMessageBox.confirm(message, title, config);
}

export function IWarningConfirm(title: string, message: string, config?: ElMessageBoxOptions) {
  return IConfirm(title, message, {
    ...config,
    type: "warning",
  });
}
