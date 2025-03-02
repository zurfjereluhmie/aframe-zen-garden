<script setup>
import { watch, useTemplateRef, ref } from 'vue';
import { store } from '../stores/carryStore.js';
import { generateId } from '../utils/idGenerator.js';
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/outline.js';

defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    scale: {
        type: String,
        default: '1 1 1',
    },
    rotation: {
        type: String,
        default: '0 0 0',
    },
    size: {
        type: Object,
        default: () => ({ width: 1, height: 0.2, depth: 1 }),
    },
});

const id = generateId('photocam-placeholder');
const placeholder = useTemplateRef('placeholder');
const isInteractable = ref(false);
const droppedEl = ref(null);

const handleDrop = (event) => {
    store.clearCarryItem();
    droppedEl.value = event.detail.el;
};

const handleUndrop = (event) => {
    droppedEl.value = null;
};

watch(
    () => store.getCarryItem(),
    (newCarryItem) => {
        isInteractable.value = newCarryItem?.itemName === 'photoCam';
    }
);
</script>

<template>
    <a-box
        ref="placeholder"
        :id="id"
        :position="position"
        :scale="scale"
        :rotation="rotation"
        outline-on-event
        material="visible: false"
        :depth="size.depth"
        :width="size.width"
        :height="size.height"
        :simple-grab-drop-zone="isInteractable ? '' : null"
        @drop="handleDrop($event)"
        @undrop="handleUndrop($event)"
    >
        <a-box
            :clickable="isInteractable ? '' : null"
            :depth="size.depth"
            :width="size.width"
            :height="size.height"
            position="0 -0.1 0"
            scale="0.83 0.83 0.83"
            material="opacity: 0"
        ></a-box>
    </a-box>
</template>

<style scoped></style>
