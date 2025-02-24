<script setup>
import { ref } from 'vue';
import TheCameraRig from './TheCameraRig.vue';

import TheFloor from './TheFloor.vue';
import AppFlower from './AppFlower.vue';
import AppLamp from './AppLamp.vue';

const allAssetsLoaded = ref(false);
</script>

<template>
    <a-scene
        stats
        fog="type: linear; color: #a3d0ed; near: 30; far: 60"
        background="color: #a3d0ed;"
    >
        <a-assets @loaded="allAssetsLoaded = true"></a-assets>

        <template v-if="allAssetsLoaded">
            <a-entity light="type: ambient; color: #c7fff5"></a-entity>
            <a-entity
                light="type: point; intensity: 2"
                position="0 0 -10"
            ></a-entity>

            <a-box position="0 0.5 0"></a-box>
            <AppLamp position="2 0 0.15"></AppLamp>

            <AppFlower position="0 0 -2" flowerName="sunflower"></AppFlower>
            <AppFlower position="0 0 -10" flowerName="daisy"></AppFlower>
            <AppFlower position="0 0 -10" flowerName="tulip"></AppFlower>
            <TheFloor />
        </template>

        <TheCameraRig />
    </a-scene>
</template>
