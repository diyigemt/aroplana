<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "ClearCache",
});

const router = useRouter();

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
      setTimeout(() => {
        router.go(0);
      }, 500);
    });
}
</script>

<template>
  <div tabindex="0" class="btn-ghost btn gap-1 normal-case" @click="clearCache">
    <UnoCSSIconButton icon="i-tabler-trash-x" />
  </div>
</template>
