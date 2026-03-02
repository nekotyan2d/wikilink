import { defineStore } from "pinia";
import { ref } from "vue";

interface ArticleMeta {
    pageid: number;
    title: string;
}

export const useAppStore = defineStore("app", () => {
    const steps = ref(0);

    const fromArticle = ref<ArticleMeta | null>(null);
    const toArticle = ref<ArticleMeta | null>(null);

    return {
        steps,

        fromArticle,
        toArticle,
    };
});
