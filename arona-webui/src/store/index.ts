import { useSetting } from "./setting";

const appStore: any = {};

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.counter = useSetting();
};

export default appStore;
