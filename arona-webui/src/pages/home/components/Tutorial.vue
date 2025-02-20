<script setup lang="ts">
import { ElCard, ElDivider, ElForm, ElFormItem, ElImage, ElInput, ElMessageBox, ElScrollbar, ElSpace, ElTabPane, ElTabs } from "element-plus";
import { TutorialUtil } from "~/utils/tutorial";
import { TutorialApi } from "~/api/modules/tutorial";
import type { TutorialSearchResult } from "~/interface/modules/tutorial";
import { errorMessage, successMessage, warningMessage } from "~/utils/message";
import { useLoading } from "~/utils";

defineOptions({
  name: "AronaTutorial",
});
const { t } = useI18n();
const MaxChapter = 28;
const ChapterMapList = Array.from({ length: MaxChapter }).map((_, index) => TutorialUtil.buildChapterMapList(index + 1)).reverse();
const QuickActionMap = TutorialUtil.QuickActionMap;
const server = ref("server-jp");
const type = ref("quick");
const tutorialSearchResultList = ref<TutorialSearchResult[]>([]);
const searchTarget = ref("");
const settingStore = useSetting();
const showInlineImage = ref(false);
const inlineImageUrl = ref("");
const router = useRoute();
const { loading, startLoading, endLoading } = useLoading(600);
const doSearch = useThrottleFn(() => {
  const name = searchTarget.value;
  if (!name) {
    warningMessage("请先输入名称");
    return;
  }
  showInlineImage.value = false;
  nextTick(() => {
    inlineImageUrl.value = "";
  });
  startLoading();
  TutorialApi.fetchTutorialSearch(searchTarget.value).then((res) => {
    endLoading();
    if (res && res.data && Array.isArray(res.data) && res.data.length === 1) {
      showImage(res.data[0]);
    } else {
      tutorialSearchResultList.value = res.data;
    }
  }).catch(endLoading);
}, 1000);
function toFile(name: string) {
  startLoading();
  TutorialApi.fetchTutorialSearch(name).then((res) => {
    endLoading();
    if (res && res.data && Array.isArray(res.data) && res.data.length === 1) {
      showImage(res.data[0]);
    } else {
      errorMessage("获取path失败");
    }
  }).catch(endLoading);
}
function showImage(data: TutorialSearchResult) {
  const path = `https://arona.cdn.diyigemt.com/image${data.content}?${data.hash}`;
  if (settingStore.imageInlineMode) {
    const win = window.open(path);
    if (win === null) {
      ElMessageBox.alert("窗口打开失败, 请允许弹出新窗口或在右上角设置中改变图片打开方式", "提示");
    }
  } else {
    inlineImageUrl.value = path;
    showInlineImage.value = true;
  }
}
function onHiddenEgg() {
  successMessage("还是太闲了, 总之彩蛋没做完.");
}
onMounted(() => {
  const name = router.query.name;
  if (name) {
    toFile(name as string);
  }
});
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
          <div
            v-for="(e, index) in ChapterMapList" :key="index" :class="index === 0 ? ''
              : 'mt-4'"
          >
            <div class="mb-8px">
              第{{ MaxChapter - index }}章
            </div>
            <ElSpace
              wrap
            >
              <ElButton
                v-for="(item, jIndex) in e"
                :key="`${index}-${jIndex}`"
                @click="toFile(item)"
              >
                {{ item }}
              </ElButton>
            </ElSpace>
          </div>
        </ElScrollbar>
      </ElTabPane>
      <ElTabPane v-if="settingStore.eggStep === 2" name="hidden" label="">
        <div class="relative h-300px">
          <div class="absolute top-50% left-50% cursor-pointer transform translate-x--50% translate-y--50%" @click="onHiddenEgg()">
&emsp;&emsp;
          </div>
        </div>
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
    <div>
      <ElImage v-if="showInlineImage" :src="inlineImageUrl" fit="cover" :preview-src-list="[inlineImageUrl]" />
      <ElSpace v-else wrap fill class="w-100%">
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
