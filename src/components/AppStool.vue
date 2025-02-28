<script setup>
import { generateId } from '../utils/idGenerator';

defineProps({
    id: {
        type: String,
        default: generateId('stool'),
    },
    position: {
        type: String,
        default: '0 0 0',
    },
    rotation: {
        type: String,
        default: '0 0 0',
    },
});
</script>

<template>
    <a-gltf-model
        :id="id"
        :position="position"
        :rotation="rotation"
        src="#stool"
    ></a-gltf-model>
</template>

<style scoped></style>
