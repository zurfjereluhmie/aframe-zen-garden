<script setup>
import { ref } from 'vue';
import AppPot from './AppPot.vue';
const allAssetsLoaded = ref(false);
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item id="scene" src="./assets/scene.glb"></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <!-- <AppPot position="10 0.1 0"></AppPot>
        <a-plane
            rotation="-90 0 0"
            width="100"
            height="100"
            color="#AADE86"
        ></a-plane> -->
        <a-gltf-model id="scene" src="#scene" scale="1 1 1"></a-gltf-model>
    </template>
</template>

<style scoped></style>
