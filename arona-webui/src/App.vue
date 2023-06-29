<script setup lang="ts">
import { logger } from "@kirklin/logger";

logger.info("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*");
onMounted(() => {
  if (window.location.href.match(/arona[.]cdn[.]/)) {
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
      .then().catch();
  }
});
</script>

<template>
  <RouterView />
</template>
