<script setup>
import { reactive } from 'vue';

const windsEmitter = reactive(['-8 2 -7', '8 2 -7']);
</script>

<template>
    <a-box
        v-for="(wind, index) in windsEmitter"
        id="wind"
        :position="wind"
        :key="index"
        visible="false"
    >
        <a-sound
            src="#wind"
            positional="true"
            autoplay="true"
            loop="true"
            volume="4"
        ></a-sound>
    </a-box>
</template>

<style scoped></style>
