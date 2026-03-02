<template>
    <header>
        <div class="steps">
            {{ app.$state.steps }}
        </div>
    </header>
</template>
<script lang="ts" setup>
import { useAppStore } from "../stores/app";

const app = useAppStore();
</script>
