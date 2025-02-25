<script setup>
import { store } from '../stores/carryStore.js';
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/listen-to.js';

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

const zoneCount = 11;
</script>

<template>
    <a-gltf-model
        :src="`#planting-zone`"
        :position="position"
        :rotation="rotation"
    >
        <template v-for="i in zoneCount" :key="i">
            <a-box
                clickable
                :position="`${-6.5 + i} 0.1 0`"
                rotation="0 0 0"
                width="1"
                depth="0.3"
                height="0.1"
                opacity="0.5"
                outline-on-event
                material="opacity: 0"
            ></a-box>
        </template>
    </a-gltf-model>
</template>

<style scoped></style>
