import { defineStore } from "pinia";

export const useSetting = defineStore("config", {
  state: () => ({
    imageInlineMode: true,
  }),
  actions: {
    setImageInlineMode(mode: boolean) {
      this.imageInlineMode = mode;
    },
  },
  persist: true,
});
