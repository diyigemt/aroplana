import { defineStore } from "pinia";
import { isMobile } from "~/utils";

// 移动端默认页内弹窗打开图片, 桌面端默认新页面打开;
// 非浏览器环境(如预渲染/测试)回退到桌面端默认行为.
// 持久化中已存在该字段时, persist 插件水合会覆盖此默认值, 不影响老用户的已存偏好.
function defaultImageInlineMode() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return true;
  }
  return !isMobile();
}

export const useSetting = defineStore("config", {
  state: () => ({
    showAnnounce: true,
    imageInlineMode: defaultImageInlineMode(),
    eggStep: 0,
  }),
  actions: {
    readAnnounce(read = true) {
      this.showAnnounce = !read;
    },
    setImageInlineMode(mode: boolean) {
      this.imageInlineMode = mode;
    },
    setEggStep(step: number) {
      this.eggStep = step;
    },
  },
  persist: {
    paths: ["showAnnounce", "imageInlineMode"],
  },
});
