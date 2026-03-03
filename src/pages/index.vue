<template>
    <div class="box">
        <h1>WikiLink</h1>
        <button @click="$router.push('/game')">Начать игру</button>
    </div>
</template>
<style lang="scss">
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100dvh;
}
</style>
