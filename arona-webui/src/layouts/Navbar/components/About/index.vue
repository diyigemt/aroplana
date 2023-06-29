<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";
import { errorMessage, successMessage } from "~/utils/message";
import { isMobile } from "~/utils";

defineOptions({
  name: "About",
});
const settingStore = useSetting();
const show = ref(settingStore.showAnnounce);
const width = isMobile() ? "90vw" : "400";
let unknownCount = 0;
const unknownCountMap: { [key: number]: string } = {
  10: "真的不明白吗",
  15: "好好好",
  20: "那就不明白吧, 我又没什么办法",
};
function onReject() {
  unknownCount++;
  if (unknownCount === 50) {
    successMessage("恭喜, 你已经点了50下, 你赢了");
    show.value = false;
    settingStore.readAnnounce();
  } else {
    errorMessage(unknownCountMap[unknownCount] || "不明白也得给我明白");
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
