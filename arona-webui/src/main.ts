import { useLocalStorage } from "@vueuse/core";
import { createApp } from "vue";

// Vue Router
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createI18n } from "vue-i18n";

import { registerSW } from "virtual:pwa-register";
import { ElMessageBox } from "element-plus";
import { router } from "./router";

import { registerStore } from "./store";
import App from "~/App.vue";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "~/styles/main.css";
import "uno.css";

import "element-plus/dist/index.css";
import { warningMessage } from "~/utils/message";

const updateSW = registerSW({
  onNeedRefresh() {
    ElMessageBox.alert("资源已更新, 请点击刷新已使用最新版本", "提示", {
      type: "info",
      confirmButtonText: "刷新",
    }).then(() => {
      useSetting().readAnnounce(false);
      updateSW(true).then();
    }).catch(() => {
      warningMessage("取消更新");
    });
  },
});

const app = createApp(App);
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>("./locales/*.json", { eager: true }))
    .map(([key, value]) => {
      return [key.slice(10, -5), value.default];
    }),
);
app.use(createI18n({
  legacy: false,
  locale: unref(useLocalStorage("locale", "zh-CN")),
  messages,
}));
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
registerStore();
app.use(router);
app.mount("#app");
