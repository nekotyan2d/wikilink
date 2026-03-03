<template>
    <header>
        <div
            class="from"
            title="Исходная статья"
            @click="showSourceModal">
            {{ app.$state.fromArticle?.title }}
        </div>
        <div
            class="steps"
            title="Переходов">
            {{ app.$state.steps }}
        </div>
        <div
            class="to"
            title="Конечная статья"
            @click="showTargetModal">
            {{ app.$state.toArticle?.title }}
        </div>
    </header>
</template>
<script lang="ts" setup>
import { useAppStore } from "../stores/app";

const app = useAppStore();

function showSourceModal() {
    if (!app.$state.fromArticle) return;

    app.showModal(app.fromArticle!.title, app.fromArticle?.description || "");
}

function showTargetModal() {
    if (!app.$state.toArticle) return;

    app.showModal(app.toArticle!.title, app.toArticle?.description || "");
}
</script>
<style lang="scss">
header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: #fff;
    padding: 8px;
    gap: 8px;
}
.from,
.to {
    font-size: 1.2rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.steps {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
    background-color: hsl(0, 86%, 95%);
    padding: 8px 16px;
    border-radius: 16px;
}
</style>
