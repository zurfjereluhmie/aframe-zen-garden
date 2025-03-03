<script setup>
import { onMounted, ref, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import { store as vrStore } from '../stores/vrStore.js';
import { store as flowersStore } from '../stores/flowersStore.js';
import { store as photoCamStore } from '../stores/photoCamStore.js';
import { store as potsStore } from '../stores/potsStore.js';

import TheCameraRig from './TheCameraRig.vue';
import TheFloor from './TheFloor.vue';
import AppPot from './AppPot.vue';
import AppFlower from './AppFlower.vue';
import AppLamp from './AppLamp.vue';
import TheShelf from './TheShelf.vue';
import TheRiver from './TheRiver.vue';
import TheMarket from './TheMarket.vue';
import TheBackPack from './TheBackPack.vue';
import AppPlantingZone from './AppPlantingZone.vue';
import TheWaterCan from './TheWaterCan.vue';
import AppWaterCanPlaceholder from './AppWaterCanPlaceholder.vue';
import TheSun from './TheSun.vue';
import TheMoon from './TheMoon.vue';
import TheCharacter from './TheCharacter.vue';
import ThePhotoCam from './ThePhotoCam.vue';
import ThePictureDisplay from './ThePictureDisplay.vue';
import AppStool from './AppStool.vue';
import AppPhotoCamPlaceholder from './AppPhotoCamPlaceholder.vue';

import '../aframe/outline.js';
import TheNavigationMesh from './TheNavigationMesh.vue';

const allAssetsLoaded = ref(false);
const DAY_DURATION = 100000;
const ENABLE_SUN_NIGHT_CYCLE = false;
const screenshotCameraSelector = ref('#head');
const renderOutline = ref(false);

watch(
    () => [store.getCarryItem(), photoCamStore.getIsTakingPicture()],
    ([newCarryItem, isTakingPicture]) => {
        if (newCarryItem && newCarryItem.itemName === 'photoCam') {
            screenshotCameraSelector.value = `#${newCarryItem.details.id} [camera]`;
        } else {
            screenshotCameraSelector.value = '#head';
        }
        renderOutline.value = !isTakingPicture;
    },
    { immediate: true }
);

onMounted(() => {
    document.querySelector('a-scene').addEventListener('enter-vr', () => {
        vrStore.setVR(true);
    });
    document.querySelector('a-scene').addEventListener('exit-vr', () => {
        vrStore.setVR(false);
    });
});
</script>

<template>
    <!-- The outline is still experimental, thus break the screenshot so we need to disable it whenever the user hold the camera -->
    <a-scene
        obb-collider="showColliders: false"
        stats
        fog="type: linear; color: #a3d0ed; near: 30; far: 60"
        background="color: #a3d0ed;"
        :outline="renderOutline ? 'color: red; strength: 20' : null"
        :screenshot="`camera: ${screenshotCameraSelector}; width: 1920; height: 1080;`"
    >
        <a-assets @loaded="allAssetsLoaded = true">
            <!-- SOUNDS -->
            <!-- DIALOGS -->
            <audio
                id="dialog-1_introduction"
                src="./assets/sounds/dialog-1_introduction.mp3"
            ></audio>
            <audio
                id="dialog-1_request-flower"
                src="./assets/sounds/dialog-1_request-flower.mp3"
            ></audio>
            <audio
                id="dialog-2_introduction_flower"
                src="./assets/sounds/dialog-2_introduction_flower.mp3"
            ></audio>
            <audio
                id="dialog-3_introduction_gift"
                src="./assets/sounds/dialog-3_introduction_gift.mp3"
            ></audio>
            <audio
                id="dialog-4_fail-1"
                src="./assets/sounds/dialog-4_fail-1.mp3"
            ></audio>
            <audio
                id="dialog-4_fail-2"
                src="./assets/sounds/dialog-4_fail-2.mp3"
            ></audio>
            <audio
                id="dialog-4_fail-3"
                src="./assets/sounds/dialog-4_fail-3.mp3"
            ></audio>
            <audio
                id="dialog-4_sucess-nearby-1"
                src="./assets/sounds/dialog-4_sucess-nearby-1.mp3"
            ></audio>
            <audio
                id="dialog-4_sucess-nearby-2"
                src="./assets/sounds/dialog-4_sucess-nearby-2.mp3"
            ></audio>
            <audio
                id="dialog-4_sucess-1"
                src="./assets/sounds/dialog-4_sucess-1.mp3"
            ></audio>
            <audio
                id="dialog-4_waiting-1"
                src="./assets/sounds/dialog-4_waiting-1.mp3"
            ></audio>
            <audio
                id="dialog-4_waiting-2"
                src="./assets/sounds/dialog-4_waiting-2.mp3"
            ></audio>
            <audio
                id="dialog-4_waiting-3"
                src="./assets/sounds/dialog-4_waiting-3.mp3"
            ></audio>
            <audio
                id="dialog-5_end-1"
                src="./assets/sounds/dialog-5_end-1.mp3"
            ></audio>
            <audio
                id="dialog-5_end-2"
                src="./assets/sounds/dialog-5_end-2.mp3"
            ></audio>
            <audio
                id="dialog-5_end-3"
                src="./assets/sounds/dialog-5_end-3.mp3"
            ></audio>
            <!-- END DIALOGS -->

            <!-- SFX -->
            <audio id="river-sound" src="./assets/sounds/sfx-water.mp3"></audio>
            <audio
                id="watercan-fill-sound"
                src="./assets/sounds/sfx-filling-watercan.mp3"
            ></audio>
            <audio
                id="pouring-water-sound"
                src="./assets/sounds/sfx-pouring-water.mp3"
            ></audio>
            <audio
                id="walking-with-watercan-full-sound"
                src="./assets/sounds/sfx-walking-watercan-full.mp3"
            ></audio>
            <!-- END SFX -->
            <!-- END SOUNDS -->

            <!-- MODELS -->
            <a-asset-item id="scene" src="./assets/scene.glb"></a-asset-item>
            <a-asset-item id="market" src="./assets/market.glb"></a-asset-item>
            <a-asset-item
                id="navigation-mesh"
                src="./assets/navigation-meshes/navigation-mesh.glb"
            ></a-asset-item>
            <a-asset-item
                id="character"
                src="./assets/adventurer.glb"
            ></a-asset-item>
            <a-asset-item
                id="picture-board"
                src="./assets/tools/picture-board.glb"
            ></a-asset-item>
            <a-asset-item
                id="picture-pin"
                src="./assets/tools/picture-pin.glb"
            ></a-asset-item>
            <a-asset-item
                id="stool"
                src="./assets/tools/stool-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-display"
                src="./assets/flower-display.glb"
            ></a-asset-item>
            <a-asset-item
                id="backpack"
                src="./assets/tools/backpack.glb"
            ></a-asset-item>
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
                id="planting-zone"
                src="./assets/fertile-soil.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-daisy"
                src="./assets/flowers/daisy-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-daisy-seeds"
                src="./assets/flowers/seed-pack-daisy.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-sunflower"
                src="./assets/flowers/sunflower-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-sunflower-seeds"
                src="./assets/flowers/seed-pack-sunflower.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-tulip"
                src="./assets/flowers/tulip-normal.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-tulip-seeds"
                src="./assets/flowers/seed-pack-tulip.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-violet"
                src="./assets/flowers/violet.glb"
            ></a-asset-item>
            <a-asset-item
                id="flower-violet-seeds"
                src="./assets/flowers/seed-pack-violet.glb"
            ></a-asset-item>
            <a-asset-item
                id="seeding-process-step-1"
                src="./assets/seeding-process/step-1.glb"
            ></a-asset-item>
            <a-asset-item
                id="seeding-process-step-2"
                src="./assets/seeding-process/step-2.glb"
            ></a-asset-item>
            <a-asset-item
                id="seeding-process-step-3"
                src="./assets/seeding-process/step-3.glb"
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
            <a-asset-item
                id="tool-water-can"
                src="./assets/tools/water-can.glb"
            ></a-asset-item>
            <a-asset-item
                id="tool-photo-camera"
                src="./assets/tools/photoCamera-normal.glb"
            ></a-asset-item>
            <!-- END MODELS -->
        </a-assets>

        <template v-if="allAssetsLoaded">
            <template v-if="ENABLE_SUN_NIGHT_CYCLE">
                <TheSun :revolution-time="DAY_DURATION"></TheSun>
                <TheMoon :revolution-time="DAY_DURATION"></TheMoon>
            </template>
            <template v-else>
                <a-entity
                    light="type: ambient; color: #fff; intensity: 2.7"
                ></a-entity>
                <a-entity
                    light="type: directional; intensity: 2"
                    position="0 3.653 2.119"
                ></a-entity>
            </template>

            <ThePhotoCam
                position="-5.2 0.75 -2"
                rotation="0 180 0"
            ></ThePhotoCam>

            <TheCharacter position="-6.5 0 -2"></TheCharacter>
            <AppStool id="character-stool" position="-5.2 0 -2"></AppStool>
            <AppPhotoCamPlaceholder
                position="-5.2 0.74 -2"
                rotation="0 180 0"
                :size="{ width: 0.45, height: 0.1, depth: 0.45 }"
            ></AppPhotoCamPlaceholder>

            <ThePictureDisplay
                position="-12 0 3"
                rotation="0 90 0"
            ></ThePictureDisplay>

            <template v-for="flower in flowersStore.getFlowers()">
                <AppFlower
                    :position="flower.position"
                    :rotation="flower.rotation"
                    :flowerName="flower.flowerName"
                ></AppFlower>
            </template>

            <template v-for="(pot, index) in potsStore.getPots()" :key="index">
                <AppPot :position="pot.position" :type="pot.type"></AppPot>
            </template>

            <TheShelf position="5.438 0 -3.431" rotation="0 -35 0"></TheShelf>

            <TheRiver position="0 0.2 0"></TheRiver>

            <TheMarket position="0 0 -5" rotation="0 180 0">
                <TheWaterCan
                    position="-1.5 0.9 0"
                    rotation="0 -180 0"
                ></TheWaterCan>
                <AppWaterCanPlaceholder
                    position="-1.592 0.7 0.036"
                ></AppWaterCanPlaceholder>
            </TheMarket>

            <!-- <TheBackPack position="0 0 -5"></TheBackPack> -->

            <AppPlantingZone position="-5 0 6"></AppPlantingZone>
            <AppPlantingZone position="-5 0 7"></AppPlantingZone>
            <AppPlantingZone position="-5 0 8"></AppPlantingZone>

            <!-- TODO: REMOVE -->
            <a-entity id="debug-items" position="0 0 0" v-if="false">
                <AppPot position="0 1 0" type="high"></AppPot>
                <!-- <a-box position="0 0.5 0"></a-box> -->
                <AppLamp position="2 0 0.15"></AppLamp>
                <AppFlower position="-2 0 0" flowerName="violet"></AppFlower>
                <AppFlower position="-1 0 0" flowerName="sunflower"></AppFlower>
                <AppFlower position="1 0 0" flowerName="daisy"></AppFlower>
                <AppFlower position="2 0 0" flowerName="tulip"></AppFlower>
            </a-entity>
            <TheNavigationMesh></TheNavigationMesh>
            <TheFloor />
        </template>

        <TheCameraRig />
    </a-scene>
</template>
