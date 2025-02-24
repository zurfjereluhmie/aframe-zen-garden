<script setup>
import { ref } from 'vue';
const allAssetsLoaded = ref(false);

const props = defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    isOn: {
        type: Boolean,
        default: false,
    },
});

import '../aframe/simple-grab.js';
import '../aframe/clickable.js';

const isOn = ref(props.isOn);
const lastclick = ref(null);

const handleClick = (event) => {
    if (lastclick.value) {
        const delta = event.timeStamp - lastclick.value;
        if (delta < 300) {
            isOn.value = !isOn.value;
        }
    }
    lastclick.value = event.timeStamp;
};
</script>

<template>
    <a-assets @loaded="allAssetsLoaded = true">
        <a-asset-item
            id="tool-lamp"
            src="./assets/tools/lamp.glb"
        ></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
        <a-gltf-model
            :position="position"
            ref="lamp"
            src="#tool-lamp"
            scale="1 1 1"
            clickable
            @click="handleClick($event)"
        >
            <a-light
                v-if="isOn"
                type="point"
                position="0 0.192 0"
                color="#ffea00"
                intensity="1"
                distance="100"
                decay="2"
            ></a-light>
        </a-gltf-model>
    </template>
</template>

<style scoped></style>
