<script setup lang="ts">
import About from "./components/About/index.vue";
import Setting from "./components/Setting/index.vue";
import UnoCSSIconButton from "~/components/Icon/UnoCSSIconButton.vue";

defineOptions({
  name: "Navbar",
});
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-16 w-full justify-center text-base-content opacity-90 backdrop-blur transition-all duration-100"
  >
    <nav class="navbar w-full">
      <div class="flex flex-1 md:gap-1 lg:gap-2">
        <RouterLink
          to="/"
          aria-current="page"
          aria-label="Homepage"
          class="btn-ghost btn px-2"
        >
          <div
            class="inline-flex text-lg text-primary transition-all duration-200 md:text-3xl"
            style="background: linear-gradient( 135deg, rgb(72,84,235), rgba(203,158,234, .8) 90% );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent
            "
          >
            <!-- <span class="text-accent">A<span class="lowercase">rona</span></span>
            <span class="text-base-content">B<span class="lowercase">ot</span></span> -->
            <span>A<span class="lowercase">rona</span>B<span class="lowercase">ot</span></span>
          </div>
        </RouterLink>
      </div>
      <div>
        <!-- <ThemeChange /> -->
        <About />
        <Setting />
        <!-- <LocalesChange /> -->
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="GitHub"
        >
          <span class="flex-none items-center">
            <a
              aria-label="Github"
              target="_blank"
              href="https://github.com/diyigemt/arona"
              class="btn-ghost drawer-button btn-square btn normal-case dark-icon"
            >
              <UnoCSSIconButton icon="i-mdi-github" />
            </a>
          </span>
        </span>
      </div>
    </nav>
  </div>
</template>
