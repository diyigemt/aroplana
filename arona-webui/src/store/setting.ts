import { defineStore } from "pinia";

export const useSetting = defineStore("config", {
  state: () => ({
    showAnnounce: true,
    imageInlineMode: true,
  }),
  actions: {
    readAnnounce(read = true) {
      this.showAnnounce = !read;
    },
    setImageInlineMode(mode: boolean) {
      this.imageInlineMode = mode;
    },
  },
  persist: true,
});
