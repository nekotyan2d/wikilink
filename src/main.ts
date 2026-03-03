import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/index.vue"),
        },
        {
            path: "/game",
            component: () => import("./pages/game.vue"),
        },
    ],
});

createApp(App).use(pinia).use(router).mount("#app");
