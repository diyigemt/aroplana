import ApiService from "~/api/http";
import type { TutorialSearchResult } from "~/interface/modules/tutorial";

function fetchTutorialSearch(name: string) {
  return ApiService.get<TutorialSearchResult[]>({
    url: "/image",
    params: {
      name,
    },
  });
}

export const TutorialApi = {
  fetchTutorialSearch,
};
