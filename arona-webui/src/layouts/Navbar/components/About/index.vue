<script setup lang="ts">
import type { NotificationOptionsTyped, NotificationProps } from "element-plus";
import { ElButton, ElDialog, ElMessage, ElNotification } from "element-plus";
import { isMobile } from "~/utils";

defineOptions({
  name: "About",
});
const settingStore = useSetting();
const show = ref(settingStore.showAnnounce);
const width = isMobile() ? "90vw" : "400";
let unknownCount = 0;
type Position = NotificationOptionsTyped["position"];
type NotifyType = NotificationProps["type"];
interface Action {
  content: string; action?: (config: Action) => boolean; type?: NotifyType;
}
const positionCircleList: Position[] = isMobile() ? ["top-right", "bottom-left"] : ["top-right", "top-left", "bottom-left", "bottom-right"];
const unknownCountMap: { [key: number]: Action } = {
  10: { content: "真的不明白吗" },
  15: { content: "好好好" },
  20: { content: "<div class='mb-8px'>那就不明白吧</div><div>我又没什么办法</div>" },
  50: { content: "<div class='mb-8px'>恭喜, 你已经点了50下</div><div>你赢了</div>", action: onEgg50, type: "success" },
  60: { content: "<div class='mb-8px'>第三个页面的中间....</div><div>有什么东西呢</div>", action: onEgg100, type: "success" },
};
let lastPostition = 0;
function onEgg50(_: Action) {
  settingStore.setEggStep(1);
  return true;
}
function onEgg100(_: Action) {
  settingStore.setEggStep(2);
  return true;
}
function onReject() {
  unknownCount++;
  const config = unknownCountMap[unknownCount];
  if (config) {
    if (config.content) {
      ElMessage({ message: config.content, type: config.type || "error", duration: 5000, dangerouslyUseHTMLString: true });
    }
    if (config.action) {
      const close = config.action(config);
      if (close) {
        show.value = false;
        settingStore.readAnnounce();
      }
    }
  } else {
    ElNotification.error({
      message: "不明白也得给我明白",
      position: positionCircleList[lastPostition],
      duration: 1000,
    });
    lastPostition = (lastPostition + 1) % positionCircleList.length;
  }
}
</script>

<template>
  <div tabindex="0" class="btn-ghost btn gap-1 normal-case" @click="show = true">
    <UnoCSSIconButton icon="i-tabler-info-circle" />
  </div>
  <ElDialog
    v-model="show"
    title="关于"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :width="width"
  >
    <ElText>
      本页面是根据<ElLink type="primary" href="https://doc.arona.diyigemt.com/api/" target="_blank">
        AronaBot攻略数据公开计划
      </ElLink>做出来的简易界面，有什么想法自己去看
    </ElText>
    <br>
    <ElText class="mt-4">
      Safari<ElText tag="del">
        (现代IE)
      </ElText>用户可以去右上角设置图片打开方式
    </ElText>
    <br>
    <ElText class="mt-4">
      如果新窗口打开的图片出现404现象, 请在404的窗口清空缓存并完全关闭浏览器再打开. 或者在设置里选择页内弹窗方式打开
    </ElText>
    <br>
    <ElText class="mt-4">
      如果资源加载失败，可以去<ElLink type="primary" href="https://docs.qq.com/sheet/DVGNTT3hCVUJKVHZP?tab=BB08J2" target="_blank">
        腾讯文档
      </ElLink>反馈
    </ElText>
    <template #footer>
      <ElButton @click="onReject">
        不明白
      </ElButton>
      <ElButton type="primary" @click="show = false; settingStore.readAnnounce();">
        明白
      </ElButton>
    </template>
  </ElDialog>
</template>
