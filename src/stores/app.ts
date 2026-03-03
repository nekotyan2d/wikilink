import { defineStore } from "pinia";
import { ref } from "vue";

interface ArticleMeta {
    pageid: number;
    title: string;
    description?: string;
}

export const useAppStore = defineStore("app", () => {
    const steps = ref(0);

    const fromArticle = ref<ArticleMeta | null>(null);
    const toArticle = ref<ArticleMeta | null>(null);

    const currentArticleId = ref<number | null>(null);

    const modalData = ref({
        title: "",
        message: "",
    });

    function showModal(title: string, message: string) {
        modalData.value.title = title;
        modalData.value.message = message;
    }

    function closeModal() {
        modalData.value.title = "";
        modalData.value.message = "";
    }

    return {
        steps,

        fromArticle,
        toArticle,

        currentArticleId,

        modalData,
        showModal,
        closeModal,
    };
});
