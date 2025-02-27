<script setup>
import { ref, useTemplateRef, watch } from 'vue';
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
});

const droppedEl = ref(null);

const placeholderId = generateId('watercan-placeholder');
const placeholder = useTemplateRef('placeholder');
const placeholderHitbox = useTemplateRef('placeholder-hitbox');

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
        if (newCarryItem && newCarryItem.itemName === 'waterCan') {
            placeholder.value.setAttribute('clickable', '');
            placeholderHitbox.value.setAttribute('clickable', '');
            placeholder.value.setAttribute('simple-grab-drop-zone', '');
        } else {
            placeholder.value.removeAttribute('clickable');
            placeholderHitbox.value.removeAttribute('clickable');
            placeholder.value.removeAttribute('simple-grab-drop-zone');
        }
    }
);
</script>

<template>
    <a-box
        ref="placeholder-hitbox"
        :id="placeholderId"
        :position="position"
        :scale="scale"
        rotation="0 180 0"
        depth="1"
        width="1"
        height="0"
        outline-on-event
        material="opacity: 0"
    >
        <a-box
            ref="placeholder"
            depth="1"
            width="1"
            height="0.2"
            position="0 0.189 0"
            material="visible: false"
            @drop="handleDrop($event)"
            @undrop="handleUndrop($event)"
        >
        </a-box>
    </a-box>
</template>

<style scoped></style>
