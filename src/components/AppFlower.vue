<script setup>
import { ref } from 'vue';
const allAssetsLoaded = ref(false);

const props = defineProps({
    flowerName: {
        type: String,
        default: 'daisy',
    },
    position: {
        type: String,
        default: '0 0 0',
    },
});

// TODO: Some flowers have bad origin, create an offset for them, adding it to the position
const flowers = {
    daisy: {
        src: './assets/flowers/daisy-normal.glb',
        scale: '0.2 0.2 0.2',
    },
    sunflower: {
        src: './assets/flowers/sunflower-normal.glb',
        scale: '0.5 0.5 0.5',
    },
    tulip: {
        src: './assets/flowers/tulip-normal.glb',
        scale: '1 1 1',
    },
};

import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';

const flowerId = `pot-${Math.random().toString(36).substring(2, 9)}`;
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item
            :id="`flower-${flowerName}`"
            :src="flowers[flowerName].src"
        ></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <a-gltf-model
            :position="position"
            :id="flowerId"
            :src="`#flower-${flowerName}`"
            simple-grab
            clickable
            :scale="flowers[flowerName].scale"
            event-set__grab="event: grab; attribute: scale; value: 0.15 0.15 0.15"
            :event-set__ungrab="`event: drop; attribute: scale; value: ${flowers[flowerName].scale}`"
        ></a-gltf-model>
    </template>
</template>

<style scoped></style>
