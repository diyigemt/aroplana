function buildChapterMapList(mapIndex: number) {
  return [
    ...Array.from({ length: 5 }).map((_, index) => `${mapIndex}-${index + 1}`),
    ...Array.from({ length: 3 }).map((_, index) => `H${mapIndex}-${index + 1}`),
  ];
}
const QuickActionMap = {
  "server-jp": ["日服总力", "日服火力演习", "日服竞技场", "日服活动", "日服大决战", "日服人权", "日服角色简评"],
  "server-global": ["国际服总力", "国际服活动", "国际服火力演习", "国际服竞技场", "国际服未来视", "国际服人权", "国际服角色简评"],
  "server-cn": ["国服活动", "国服未来视"],
};

export const TutorialUtil = {
  QuickActionMap,
  buildChapterMapList,
};
