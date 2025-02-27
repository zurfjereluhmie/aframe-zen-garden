<script setup>
import { store } from '../stores/carryStore.js';
import { generateId } from '../utils/idGenerator.js';
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
    type: {
        type: String,
        required: true,
        validator: (value) =>
            ['daisy', 'sunflower', 'tulip', 'violet'].includes(value),
    },
});

const packId = generateId('seed-pack');
</script>

<template>
    <a-entity
        :id="packId"
        :position="position"
        :rotation="rotation"
        simple-grab
        clickable
        geometry="primitive: box; width: 0.13; height: 0.04; depth: 0.23"
        material="visible: false;"
        :data-seed-type="type"
        @grab="() => store.setCarryItem('seedPack', { packId })"
    >
        <a-gltf-model
            :src="`#flower-${type}-seeds`"
            position="0 -0.05 0"
            :listen-to__grab="`target: #${packId}; event: grab; emit: taken`"
            :listen-to__drop="`target: #${packId}; event: drop; emit: untaken`"
            event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
            event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
        ></a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
