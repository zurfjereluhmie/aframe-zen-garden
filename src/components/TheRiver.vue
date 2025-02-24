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
    <a-entity :position :rotation>
        <a-sound
            position="9.190 0 5.846"
            src="#river-sound"
            autoplay="true"
            loop="true"
            positional="true"
        ></a-sound>
        <a-gltf-model
            src="#river-border-left"
            position="0 -0.15 0"
        ></a-gltf-model>
        <a-ocean
            position="11.574 0 3.066"
            rotation="-90 147.711 0"
            width="3.5"
            depth="20"
            speed="0.05"
            amplitude="0.015"
            amplitudeVariance="0.05"
        ></a-ocean>
        <a-ocean
            position="11.945 0 2.279"
            rotation="-90 147.711 0"
            width="3.5"
            depth="20"
            speed="0.05"
            amplitude="0.015"
            amplitudeVariance="0.05"
        ></a-ocean>
        <a-gltf-model
            src="#river-border-right"
            position="0 0.05 0"
        ></a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
