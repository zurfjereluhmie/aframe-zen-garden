<script setup>
import { ref } from 'vue';
import { store as seedsStore } from '../stores/seedsStore.js';
import AppSeedPack from './AppSeedPack.vue';

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

const grabbedSeed = ref(new Map());

const handleGrab = (event) => {
    if (grabbedSeed.value.has(event.detail.el.id)) return;
    grabbedSeed.value.set(event.detail.el.id, {
        position: { ...event.detail.el.object3D.position },
        type: event.detail.el.dataset.seedType,
    });
};

const handleDrop = (event) => {
    if (!event.detail.dropZone?.parentNode?.id.startsWith('planting-zone'))
        return;
    const seedInit = grabbedSeed.value.get(event.detail.el.id);
    seedsStore.addSeed({
        type: seedInit.type,
        position: `${seedInit.position.x} ${seedInit.position.y} ${seedInit.position.z}`,
    });
    grabbedSeed.value.delete(event.detail.el.id);
};
</script>

<template>
    <a-gltf-model src="#market" :position :rotation>
        <slot></slot>
        <template v-for="(seed, index) in seedsStore.getSeeds()" :key="index">
            <AppSeedPack
                :position="seed.position"
                @grab="handleGrab($event)"
                @drop="handleDrop($event)"
                :type="seed.type"
            ></AppSeedPack>
        </template>
    </a-gltf-model>
</template>

<style scoped></style>
