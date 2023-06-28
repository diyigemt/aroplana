<script setup lang="ts">
import { ElCard, ElDivider, ElForm, ElFormItem, ElInput, ElScrollbar, ElSpace, ElTabPane, ElTabs } from "element-plus";
import { TutorialUtil } from "~/utils/tutorial";
import { TutorialApi } from "~/api/modules/tutorial";
import type { TutorialSearchResult } from "~/interface/modules/tutorial";
import { errorMessage, warningMessage } from "~/utils/message";
import { isMobile, useLoading } from "~/utils";

defineOptions({
  name: "AronaTutorial",
});
const { t } = useI18n();
const MaxChapter = 23;
const ChapterMapList = Array.from({ length: MaxChapter }).map((_, index) => TutorialUtil.buildChapterMapList(index + 1)).reverse();
const QuickActionMap = TutorialUtil.QuickActionMap;
const server = ref("server-jp");
const type = ref("quick");
const tutorialSearchResultList = ref<TutorialSearchResult[]>([]);
const searchTarget = ref("");
const removeSpace = isMobile();
const { loading, startLoading, endLoading } = useLoading();
const doSearch = useThrottleFn(() => {
  const name = searchTarget.value;
  if (!name) {
    warningMessage("请先输入名称");
    return;
  }
  startLoading();
  TutorialApi.fetchTutorialSearch(searchTarget.value).then((res) => {
    tutorialSearchResultList.value = res.data;
    endLoading();
  }).catch(endLoading);
}, 1000);
function toFile(name: string) {
  startLoading();
  TutorialApi.fetchTutorialSearch(name).then((res) => {
    endLoading();
    if (res && res.data && Array.isArray(res.data) && res.data.length !== 0) {
      window.open(`https://arona.cdn.diyigemt.com/image${res.data[0].path}`);
    } else {
      errorMessage("获取path失败");
    }
  }).catch(endLoading);
}
</script>

<template>
  <div v-loading="loading">
    <ElTabs v-model="type">
      <ElTabPane :label="t('quick')" name="quick">
        <ElTabs v-model="server" class="px-4">
          <ElTabPane
            v-for="(e, key, index) in QuickActionMap"
            :key="index" :label="t(key)" :name="key"
          >
            <ElSpace wrap>
              <ElButton
                v-for="(item, jIndex) in e"
                :key="`${index}-${jIndex}`"
                @click="toFile(item)"
              >
                {{ item }}
              </ElButton>
            </ElSpace>
          </ElTabPane>
        </ElTabs>
      </ElTabPane>
      <ElTabPane :label="t('chapter map')" name="chapterMap">
        <ElScrollbar height="300">
          <ElSpace
            v-for="(e, index) in ChapterMapList" :key="index" wrap :class="(index === 0 && removeSpace) ? ''
              : 'mt-4'"
          >
            <ElButton
              v-for="(item, jIndex) in e"
              :key="`${index}-${jIndex}`"
              @click="toFile(item)"
            >
              {{ item }}
            </ElButton>
          </ElSpace>
        </ElScrollbar>
      </ElTabPane>
    </ElTabs>
    <ElDivider />
    <ElForm inline class="justify-center items-center text-center" @submit.native.prevent>
      <ElFormItem class="small-item">
        <ElInput
          v-model="searchTarget"
          clearable
          placeholder="学生/活动/历来总力等搜索"
          maxlength="10"
          @keydown.enter="doSearch()"
        />
      </ElFormItem>
      <ElFormItem class="small-item">
        <ElButton type="primary" @click="doSearch()">
          {{ t("search") }}
        </ElButton>
      </ElFormItem>
    </ElForm>
    <ElSpace wrap fill class="w-100%">
      <ElCard
        v-for="(e, index) in tutorialSearchResultList"
        :key="index"
        class="cursor-pointer search-result-item"
        @click="toFile(e.name)"
      >
        {{ e.name }}
      </ElCard>
    </ElSpace>
  </div>
</template>

<style scoped>
.small-item {
  margin-right: 16px;
}
.search-result-item {
  transition: box-shadow 0.25s;
}
.search-result-item:hover {
  box-shadow: var(--el-box-shadow-dark);
}
</style>
