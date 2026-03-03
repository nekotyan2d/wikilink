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
        onConfirm: undefined as (() => void) | undefined,
    });

    function showModal(title: string, message: string, onConfirm?: () => void) {
        modalData.value.title = title;
        modalData.value.message = message;
        modalData.value.onConfirm = onConfirm;
    }

    function closeModal() {
        modalData.value.title = "";
        modalData.value.message = "";
        modalData.value.onConfirm = undefined;
    }

    function resetGame() {
        steps.value = 0;
        fromArticle.value = null;
        toArticle.value = null;
        currentArticleId.value = null;
    }

    return {
        steps,

        fromArticle,
        toArticle,

        currentArticleId,

        resetGame,

        modalData,
        showModal,
        closeModal,
    };
});
