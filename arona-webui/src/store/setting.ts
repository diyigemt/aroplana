import { defineStore } from "pinia";

export const useSetting = defineStore("config", {
  state: () => ({
    showAnnounce: true,
    imageInlineMode: true,
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
