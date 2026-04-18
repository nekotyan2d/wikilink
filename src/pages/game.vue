<template>
    <Header />
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
import { onMounted, ref, watch } from "vue";
import { useApi } from "../composables/useApi";
import WikiViewer from "../components/WikiViewer.vue";
import { useAppStore } from "../stores/app";
import ProgressBar from "../components/ProgressBar.vue";
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";

const app = useAppStore();

const { getArticleText, getArticleByName, getRandomArticles } = useApi();

const title = ref("");
const data = ref<any>();
const loading = ref(true);

const router = useRouter();

onMounted(async () => {
    try {
        const randomArticles = await getRandomArticles(2);

        const articles = Object.values(randomArticles.query.pages);

        app.fromArticle = {
            pageid: articles[0]!.pageid,
            title: articles[0]!.title,
            description: articles[0]!.extract,
        };

        app.toArticle = {
            pageid: articles[1]!.pageid,
            title: articles[1]!.title,
            description: articles[1]!.extract,
        };

        const pageId = app.fromArticle.pageid;

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

        app.currentArticleId = articleData.parse.pageid;

        title.value = articleData.parse.title;
        data.value = articleData;
    } catch (error) {
    } finally {
        loading.value = false;
    }
}

watch(
    () => app.$state.currentArticleId,
    (newId) => {
        if (newId === app.toArticle?.pageid) {
            app.showModal("Ура!", "Ты дошел до цели за " + app.steps + " переходов!", () => {
                app.resetGame();
                router.replace("/");
            });
        }
    },
);
</script>
<style lang="scss">
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
}
</style>
