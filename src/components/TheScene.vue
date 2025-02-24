<script setup>
import { ref } from 'vue';
import TheCameraRig from './TheCameraRig.vue';

import TheFloor from './TheFloor.vue';
import AppPot from './AppPot.vue';
import AppFlower from './AppFlower.vue';
import AppLamp from './AppLamp.vue';
import TheShelf from './TheShelf.vue';

const allAssetsLoaded = ref(false);
</script>

<template>
    <a-scene
        stats
        fog="type: linear; color: #a3d0ed; near: 30; far: 60"
        background="color: #a3d0ed;"
    >
        <a-assets @loaded="allAssetsLoaded = true">
            <a-asset-item id="scene" src="./assets/scene.glb"></a-asset-item>
            <a-asset-item id="shelf" src="./assets/shelf.glb"></a-asset-item>
            <a-asset-item
                id="flower-daisy"
                src="./assets/flowers/daisy-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-sunflower"
                src="./assets/flowers/sunflower-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-tulip"
                src="./assets/flowers/tulip-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="tool-pot-small"
                src="./assets/tools/pots/pot-small.glb"
            ></a-asset-item>
            <a-asset-item
                id="tool-pot-big"
                src="./assets/tools/pots/pot-big.glb"
            ></a-asset-item>
            <a-asset-item
                id="tool-pot-high"
                src="./assets/tools/pots/pot-high.glb"
            ></a-asset-item>
            <a-asset-item
                id="tool-lamp"
                src="./assets/tools/lamp.glb"
            ></a-asset-item>
        </a-assets>

        <template v-if="allAssetsLoaded">
            <a-entity light="type: ambient; color: #c7fff5"></a-entity>
            <a-entity
                light="type: point; intensity: 2"
                position="0 0 -10"
            ></a-entity>

            <a-box position="0 0.5 0"></a-box>
            <AppLamp position="2 0 0.15"></AppLamp>

            <TheShelf position="-5.726 0 -2" rotation="0 45 0">
                <AppPot position="-0.741 0.520 -0.023" type="big"></AppPot>
                <AppPot position="0.600 0.829 -0.018" type="big"></AppPot>
                <AppPot position="0.194 1.855 -0.027" type="big"></AppPot>
                <AppPot position="0.194 0.855 -0.027" type="small"></AppPot>
                <AppPot position="0.194 0.113 -0.027" type="high"></AppPot>
            </TheShelf>

            <AppFlower position="-1 0 0" flowerName="sunflower"></AppFlower>
            <AppFlower position="1 0 0" flowerName="daisy"></AppFlower>
            <AppFlower position="2 0 0" flowerName="tulip"></AppFlower>
            <TheFloor />
        </template>

        <TheCameraRig />
    </a-scene>
</template>
