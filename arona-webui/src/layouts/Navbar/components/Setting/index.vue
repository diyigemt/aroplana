<script setup lang="ts">
import { ElForm, ElFormItem, ElMessage, ElMessageBox, ElSwitch } from "element-plus";
import { useSetting } from "~/store/setting";
import { isMobile, useDialog } from "~/utils";

defineOptions({
  name: "Setting",
});

const router = useRouter();
const width = isMobile() ? "90vw" : "300";
const { show, showDialog, hideDialog } = useDialog();
const { imageInlineMode, setImageInlineMode } = useSetting();
const isDark = useDark();
const dark = ref(isDark.value);
const _imageInlineMode = ref(imageInlineMode);
watch(() => dark.value, (cur) => {
  if (cur) {
    document.body.style.backgroundColor = "#22272e";
  } else {
    document.body.style.backgroundColor = "white";
  }
  setTimeout(() => {
    isDark.value = cur;
  }, 160);
}, { immediate: true });
function clearCache() {
  ElMessageBox.confirm("在应用工作不正常时使用此功能清除缓存, 是否继续?", "清除缓存", {
    type: "warning",
    cancelButtonText: "取消",
    confirmButtonText: "清除",
  }).then(doClearChache);
}
function doClearChache() {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    })
    .then(() => {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
    })
    .then(() => {
      ElMessage.info("已重置应用状态，即将刷新页面");
      if (window.location.href.match(/arona[.]cdn[.]/)) {
        window.location.href = "https://tutorial.arona.diyigemt.com/home";
      } else {
        setTimeout(() => {
          router.go(0);
        }, 1500);
      }
    }).catch();
}
</script>

<template>
  <div tabindex="0" class="btn-ghost btn gap-1 normal-case" @click="showDialog">
    <UnoCSSIconButton icon="i-tabler-settings" />
  </div>
  <ElDialog
    v-model="show"
    title="设置"
    append-to-body
    :width="width"
  >
    <ElForm size="small">
      <ElFormItem label="暗色模式">
        <ElSwitch v-model="dark" active-text="打开" inactive-text="关闭" :active-value="true" :inactive-value="false" />
      </ElFormItem>
      <ElFormItem label="图片打开方式">
        <ElSwitch v-model="_imageInlineMode" active-text="新页面" inactive-text="页内弹窗" :active-value="true" :inactive-value="false" @change="setImageInlineMode" />
      </ElFormItem>
      <ElFormItem label="重置应用状态">
        <ElButton type="danger" @click="clearCache">
          重置
        </ElButton>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="hideDialog">
        取消
      </ElButton>
      <ElButton type="primary" @click="hideDialog">
        确定
      </ElButton>
    </template>
  </ElDialog>
</template>
