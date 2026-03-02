<template>
    <Header />
    <main>
        <router-view />
    </main>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";
</script>

<style lang="scss">
@import url("./assets/scss/app.scss");
</style>
