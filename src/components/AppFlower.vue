<script setup>
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';

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

const flowers = {
    daisy: {
        scale: '0.15 0.15 0.15',
    },
    sunflower: {
        scale: '0.3 0.3 0.3',
    },
    tulip: {
        scale: '0.5 0.5 0.5',
    },
};

const flowerId = `flower-${Math.random().toString(36).substring(2, 9)}`;
</script>

<template>
    <a-gltf-model
        :position="position"
        :id="flowerId"
        :src="`#flower-${flowerName}`"
        simple-grab
        clickable
        :scale="flowers[flowerName].scale"
    ></a-gltf-model>
</template>

<style scoped></style>
