<script setup>
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/listen-to.js';
import { computed, useTemplateRef } from 'vue';
import { store } from '../stores/carryStore.js';
import { generateId } from '../utils/idGenerator.js';

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
        hitbox: 'width: 0.2; height: 0.5; depth: 0.3',
    },
    sunflower: {
        scale: '0.3 0.3 0.3',
        hitbox: 'width: 0.33; height: 0.6; depth: 0.25',
    },
    tulip: {
        scale: '0.5 0.5 0.5',
        hitbox: 'width: 0.25; height: 0.6; depth: 0.25',
    },
    violet: {
        scale: '1.5 1.5 1.5',
        hitbox: 'width: 0.25; height: 0.6; depth: 0.15',
    },
};

const flowerEntity = useTemplateRef('flower-entity');
const flowerId = generateId('flower');
const hitboxPosition = computed(() => {
    const [x, y, z] = props.position
        .split(' ')
        .map((coord) => parseFloat(coord));
    return `${x} ${y + 0.25} ${z}`;
});

const handleGrab = (event) => {
    store.setCarryItem('flower', { flowerId });
};
</script>

<template>
    <a-entity
        ref="flower-entity"
        :simple-grab="
            ['pot', 'waterCan'].includes(store.getCarryItem()?.itemName) ||
            flowerEntity?.dataset.potId
                ? null
                : ''
        "
        :clickable="
            ['pot', 'waterCan'].includes(store.getCarryItem()?.itemName) ||
            flowerEntity?.dataset.potId
                ? null
                : ''
        "
        :id="flowerId"
        :position="hitboxPosition"
        :geometry="`primitive: box; ${flowers[flowerName].hitbox}`"
        material="visible: false;"
        @grab="handleGrab($event)"
    >
        <a-gltf-model
            :src="`#flower-${flowerName}`"
            :scale="flowers[flowerName].scale"
            position="0 -0.25 0"
            :listen-to__grab="`target: #${flowerId}; event: grab; emit: taken`"
            :listen-to__drop="`target: #${flowerId}; event: drop; emit: untaken`"
            event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
            event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
            event-set__taken_position="event: taken; attribute: position; value: 0 0 0"
            event-set__untaken_position="event: untaken; attribute: position; value: 0 -0.25 0"
        ></a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
