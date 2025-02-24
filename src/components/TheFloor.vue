<script setup>
import { ref } from 'vue';
const allAssetsLoaded = ref(false);
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item id="scene" src="./assets/scene.glb"></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <a-gltf-model id="scene" src="#scene" scale="1 1 1"></a-gltf-model>
    </template>
</template>

<style scoped></style>
