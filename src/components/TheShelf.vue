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
        src="#flower-display"
        scale="1.5 1.5 1.5"
    >
        <slot></slot>
        <AppPotPlaceholder position="-0.44 0.88 -0.47"></AppPotPlaceholder>
        <AppPotPlaceholder position="-0.44 0.42 0"></AppPotPlaceholder>
        <AppPotPlaceholder position="-0.15 0.88 -0.47"></AppPotPlaceholder>
        <AppPotPlaceholder position="-0.15 0.42 0"></AppPotPlaceholder>
        <AppPotPlaceholder position="0.14 0.88 -0.47"></AppPotPlaceholder>
        <AppPotPlaceholder position="0.14 0.42 0"></AppPotPlaceholder>
        <AppPotPlaceholder position="0.43 0.88 -0.47"></AppPotPlaceholder>
        <AppPotPlaceholder position="0.43 0.42 0"></AppPotPlaceholder>
    </a-gltf-model>
</template>

<style scoped></style>
