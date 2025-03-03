<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>

<template>
    <a-gltf-model
        src="#navigation-mesh"
        data-role="nav-mesh"
        position="0 0 0"
        :visible="isVisible"
    ></a-gltf-model>
</template>

<style scoped></style>
