<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";
import { errorMessage } from "~/utils/message";
import { isMobile } from "~/utils";

defineOptions({
  name: "About",
});
const show = useLocalStorage("show-info", true);
const width = isMobile() ? "90vw" : "300";
function onReject() {
  errorMessage("不明白也得给我明白");
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
    <template #footer>
      <ElButton @click="onReject">
        不明白
      </ElButton>
      <ElButton type="primary" @click="show = false">
        明白
      </ElButton>
    </template>
  </ElDialog>
</template>
