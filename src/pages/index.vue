<template>
    <div
        class="loading"
        v-if="loading">
        <ProgressBar color="var(--color-primary)" />
    </div>
    <WikiViewer
        v-else-if="data?.parse?.text['*']"
        :title="title"
        :text="data?.parse?.text['*'] ?? ''"
        @link-clicked="onLinkClicked" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useApi } from "../composables/useApi";
import WikiViewer from "../components/WikiViewer.vue";
import { useAppStore } from "../stores/app";
import ProgressBar from "../components/ProgressBar.vue";

const app = useAppStore();

const { getRandomArticle, getArticleText, getArticleByName } = useApi();

const title = ref("");
const data = ref<any>();
const loading = ref(true);

onMounted(async () => {
    try {
        const randomArticle = await getRandomArticle();

        const pageId = randomArticle.query.random[0]!.id;

        const randomArticleData = await getArticleText(pageId);

        title.value = randomArticleData.parse.title;
        data.value = randomArticleData;
    } catch (error) {
        console.error("Error fetching random article:", error);
    } finally {
        loading.value = false;
    }
});

async function onLinkClicked(href: string) {
    try {
        loading.value = true;

        const pagePath = href.split("/wiki/")[1];
        if (!pagePath) return;

        app.steps++;

        const page = decodeURIComponent(pagePath);

        const articleData = await getArticleByName(page);
        title.value = articleData.parse.title;
        data.value = articleData;
    } catch (error) {
    } finally {
        loading.value = false;
    }
}
</script>
<style lang="scss">
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
}
</style>
