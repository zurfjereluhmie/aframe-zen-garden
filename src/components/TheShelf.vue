<script setup>
import AppPot from './AppPot.vue';

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
</script>

<template>
    <a-gltf-model
        :position="position"
        :rotation="rotation"
        ref="lamp"
        src="#shelf"
        scale="1 1 1"
    >
        <slot></slot>
    </a-gltf-model>
</template>

<style scoped></style>
