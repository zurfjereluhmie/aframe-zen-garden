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
        default: '0.450 0.310 1',
    },
});

const droppedEl = ref(null);

const placeholderId = generateId('pot-placeholder');
const placeholder = useTemplateRef('placeholder');

const handleDrop = (event) => {
    store.clearCarryItem();
    droppedEl.value = event.detail.el;
};

const handleUndrop = (event) => {};

watch(
    () => store.getCarryItem(),
    (newCarryItem) => {
        if (!newCarryItem) {
            if (store.getPreviousCarryItem()?.itemName === 'pot') {
                placeholder.value.removeAttribute('clickable');
                placeholder.value.removeAttribute('simple-grab-drop-zone');
            }
            return;
        }

        if (newCarryItem.itemName === 'pot') {
            placeholder.value.setAttribute('clickable', '');
            placeholder.value.setAttribute('simple-grab-drop-zone', '');
            return;
        }
    }
);
</script>

<template>
    <a-box
        outline-on-event
        ref="placeholder"
        :id="placeholderId"
        :position="position"
        :scale="scale"
        depth="0.4"
        width="0.6"
        height="0"
        rotation="0 0 0"
        material="opacity: 0"
        @drop="handleDrop($event)"
        @undrop="handleUndrop($event)"
    ></a-box>
</template>

<style scoped></style>
