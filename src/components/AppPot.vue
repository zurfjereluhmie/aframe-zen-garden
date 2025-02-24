<script setup>
import { ref, watch, useTemplateRef } from 'vue';
const allAssetsLoaded = ref(false);

const props = defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    type: {
        type: String,
        default: 'small',
        validator: (value) => ['small', 'big', 'high'].includes(value),
    },
});

import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/bind-position.js';
import '../aframe/bind-rotation.js';

const pot = useTemplateRef('pot');
const potId = `pot-${Math.random().toString(36).substring(2, 11)}`;
const droppedEl = ref(null);

watch(droppedEl, () => {}, { deep: true });

const handleDrop = (event) => {
    droppedEl.value = event.detail.el;
    droppedEl.value.setAttribute('id', 'droppedEl');
    pot.value.setAttribute('simple-grab', '');
    droppedEl.value.setAttribute('bind-position', { target: `#${potId}` });
    droppedEl.value.setAttribute('bind-rotation', { target: `#${potId}` });
};

const undropHandler = (event) => {
    console.log('undropHandler', event);

    pot.value.removeAttribute('id');
    pot.value.removeAttribute('simple-grab');
    droppedEl.value.removeAttribute('bind-position');
    droppedEl.value.removeAttribute('bind-rotation');
    droppedEl.value = null;
};
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item
            :id="`tool-pot-${type}`"
            :src="`./assets/tools/pots/pot-${type}.glb`"
        ></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <a-gltf-model
            :position="position"
            ref="pot"
            :id="potId"
            :src="`#tool-pot-${type}`"
            simple-grab-drop-zone="dropOnly: true;"
            clickable
            @drop="handleDrop($event)"
            @undrop="undropHandler($event)"
        ></a-gltf-model>
    </template>
</template>

<style scoped></style>
