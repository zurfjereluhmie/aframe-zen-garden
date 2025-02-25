<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
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
        default: '0.450 0.310 1',
    },
});

const droppedEl = ref(null);

const placeholderId = `pot-placeholder-${Math.random().toString(36).substring(2, 9)}`;
const placeholder = useTemplateRef('placeholder');

const handleDrop = (event) => {
    droppedEl.value = event.detail.el;

    window.dispatchEvent(
        new CustomEvent('pot-dropped', {
            detail: { pot: event.detail.el },
        })
    );
};

const handleUndrop = (event) => {};

onMounted(() => {
    window.addEventListener('pot-grabbed', (event) => {
        placeholder.value.setAttribute('clickable', '');
        placeholder.value.setAttribute('simple-grab-drop-zone', '');
    });

    window.addEventListener('pot-dropped', (event) => {
        placeholder.value.removeAttribute('clickable');
        placeholder.value.removeAttribute('simple-grab-drop-zone');
    });
});
</script>

<template>
    <a-box
        outline-on-event
        ref="placeholder"
        :id="placeholderId"
        :position="position"
        :scale="scale"
        depth="0.3"
        width="1"
        height="0"
        rotation="0 0 0"
        material="opacity: 0"
        @drop="handleDrop($event)"
        @undrop="handleUndrop($event)"
    ></a-box>
</template>

<style scoped></style>
