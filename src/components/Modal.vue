<template>
    <div
        class="modal-overlay"
        @click.self="$emit('close')">
        <div class="modal-content">
            <h2>{{ title }}</h2>
            <p>{{ message }}</p>
            <button @click="$emit('close')">ОК</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["close"]);

const props = defineProps<{
    title: string;
    message: string;
}>();
</script>
<style lang="scss">
.modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
        background-color: #fff;
        border-radius: 16px;
        padding: 16px;
    }
}
</style>
