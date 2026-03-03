<template>
    <h1>{{ props.title }}</h1>
    <div
        class="wiki-viewer"
        ref="wikiViewer"
        v-html="props.text"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
    text: string;
    title: string;
}>();

const emit = defineEmits<{
    "link-clicked": [href: string];
}>();

const wikiViewer = ref<HTMLElement | null>(null);

watch(wikiViewer, () => {
    const wikiViewerEl = wikiViewer.value;

    wikiViewerEl?.scrollIntoView();

    if (wikiViewerEl) {
        const links = wikiViewerEl.querySelectorAll("a");

        const literatureHeader = wikiViewerEl.querySelector("#Литература");
        literatureHeader?.parentElement?.nextElementSibling?.remove();
        literatureHeader?.remove();

        wikiViewerEl.querySelectorAll(".ts-disambig").forEach((i) => i.remove());
        wikiViewerEl.querySelector("#disambig")?.remove();
        wikiViewerEl.querySelector(".ts-Родственный_проект")?.remove();
        wikiViewerEl.querySelectorAll(".ambox").forEach((i) => i.remove());

        wikiViewerEl.querySelectorAll("th").forEach((th) => {
            if (th.style.background == "lightsteelblue") {
                th.style.background = "var(--background-color-progressive-subtle)";
            }
        });

        links.forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            const url = new URL(href ?? "", window.location.origin);

            const isExternal = url.hostname && url.hostname !== window.location.hostname;

            if (isExternal) {
                link.classList.remove("external");
                delinkify(link);
                return;
            }

            if (link.classList.contains("new")) {
                link.classList.remove("new");
                delinkify(link);
                return;
            }

            link.addEventListener("click", (event) => {
                event.preventDefault();

                if (link.classList.contains("mw-file-description")) return;

                emit("link-clicked", href);
            });
        });
    }
});

function delinkify(link: HTMLAnchorElement) {
    const href = link.getAttribute("href");

    if (!href) return;

    const span = document.createElement("span");
    Array.from(link.attributes).forEach((attr) => {
        span.setAttribute(attr.name, attr.value);
    });
    span.innerHTML = link.innerHTML;
    link.parentNode?.replaceChild(span, link);
}
</script>
<style lang="scss">
:root {
    --background-color-progressive-subtle: #fac1c1;
}
a {
    color: #ab0d0d;
    font-weight: bold;
}
.infobox-header,
.navbox-group,
.navbox-abovebelow {
    background-color: #fac1c1 !important;
}
</style>
