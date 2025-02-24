<script setup></script>

<template>
    <a-gltf-model id="scene" src="#scene" scale="1 1 1"></a-gltf-model>
    <a-ocean
        depth="100"
        width="100"
        position="0 -1 0"
        amplitude="0.05"
        amplitudeVariance="0.5"
    ></a-ocean>
</template>

<style scoped></style>
