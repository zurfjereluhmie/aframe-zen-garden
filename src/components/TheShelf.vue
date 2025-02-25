<script setup>
import AppPotPlaceholder from './AppPotPlaceholder.vue';

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
        <AppPotPlaceholder position="-0.278 1.381 -0.031"></AppPotPlaceholder>
        <AppPotPlaceholder position="-0.278 0.831 -0.031"></AppPotPlaceholder>
    </a-gltf-model>
</template>

<style scoped></style>
