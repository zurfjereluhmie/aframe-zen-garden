<script setup>
import { ref } from 'vue';
import TheCameraRig from './TheCameraRig.vue';

import TheFloor from './TheFloor.vue';
import AppPot from './AppPot.vue';
import AppFlower from './AppFlower.vue';
import AppLamp from './AppLamp.vue';
import TheShelf from './TheShelf.vue';
import TheRiver from './TheRiver.vue';

import '../aframe/outline.js';

const allAssetsLoaded = ref(false);
</script>

<template>
    <a-scene
        stats
        fog="type: linear; color: #a3d0ed; near: 30; far: 60"
        background="color: #a3d0ed;"
        outline="color: red; strength: 20"
    >
        <a-assets @loaded="allAssetsLoaded = true">
            <!-- SOUNDS -->
            <audio id="river-sound" src="./assets/sounds/sfx-water.mp3"></audio>

            <!-- MODELS -->
            <a-asset-item id="scene" src="./assets/scene.glb"></a-asset-item>
            <a-asset-item
                id="river-border-left"
                src="./assets/decorations/river-border-left.glb"
            ></a-asset-item>
            <a-asset-item
                id="river-border-right"
                src="./assets/decorations/river-border-right.glb"
            ></a-asset-item>
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
            <a-entity
                light="type: ambient; color: #fff; intensity: 2.7"
            ></a-entity>
            <a-entity
                light="type: directional; intensity: 2"
                position="0 3.653 2.119"
            ></a-entity>

            <TheShelf position="-5.726 0 -2" rotation="0 45 0">
                <AppPot position="-0.741 0.520 -0.023" type="big"></AppPot>
                <AppPot position="0.600 0.829 -0.018" type="big"></AppPot>
                <AppPot position="0.194 1.855 -0.027" type="big"></AppPot>
                <AppPot position="0.194 0.855 -0.027" type="small"></AppPot>
                <AppPot position="0.194 0.113 -0.027" type="high"></AppPot>
            </TheShelf>

            <TheRiver position="0 0.2 0"></TheRiver>

            <a-entity id="debug-items" position="0 0 0">
                <AppPot position="0 1 0" type="high"></AppPot>
                <!-- <a-box position="0 0.5 0"></a-box> -->
                <AppLamp position="2 0 0.15"></AppLamp>
                <AppFlower position="-1 0 0" flowerName="sunflower"></AppFlower>
                <AppFlower position="1 0 0" flowerName="daisy"></AppFlower>
                <AppFlower position="2 0 0" flowerName="tulip"></AppFlower>
            </a-entity>

            <TheFloor />
        </template>

        <TheCameraRig />
    </a-scene>
</template>
