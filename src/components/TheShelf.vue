<script setup>
import { ref } from 'vue';
const allAssetsLoaded = ref(false);

defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    rotation: {
        type: String,
        default: '0 0 0',
    },
});
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item id="shelf" src="./assets/shelf.glb"></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <a-gltf-model
            :position="position"
            :rotation="rotation"
            ref="lamp"
            src="#shelf"
            scale="1 1 1"
        >
        </a-gltf-model>
    </template>
</template>

<style scoped></style>
