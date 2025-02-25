<script setup>
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
    <a-gltf-model src="#market" :position :rotation></a-gltf-model>
</template>

<style scoped></style>
