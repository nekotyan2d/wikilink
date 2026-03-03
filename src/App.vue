<template>
    <Header />
    <main>
        <router-view />
    </main>
    <Teleport to="body">
        <Modal
            v-if="app.$state.modalData.title"
            :title="app.$state.modalData.title"
            :message="app.$state.modalData.message"
            @close="app.closeModal()" />
    </Teleport>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
import { useAppStore } from "./stores/app";

const app = useAppStore();
</script>

<style lang="scss">
@import url("./assets/scss/app.scss");
</style>
