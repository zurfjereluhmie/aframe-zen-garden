<script setup>
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/listen-to.js';

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
    <a-entity
        simple-grab
        clickable
        :id="flowerId"
        :position="position"
        geometry="primitive: box; width: 0.5; height: 1.5; depth: 0.3"
        material="visible: false"
    >
        <a-gltf-model
            :src="`#flower-${flowerName}`"
            :scale="flowers[flowerName].scale"
            :listen-to__grab="`target: #${flowerId}; event: grab; emit: taken`"
            :listen-to__drop="`target: #${flowerId}; event: drop; emit: untaken`"
            event-set__taken="event: taken; attribute: rotation; value: -90 0 0"
            event-set__untaken="event: untaken; attribute: rotation; value: 0 0 0"
        ></a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
