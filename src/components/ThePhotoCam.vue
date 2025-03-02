<script setup>
import { computed, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import { store as photoCamStore } from '../stores/photoCamStore.js';
import { store as vrStore } from '../stores/vrStore.js';
import { generateId } from '../utils/idGenerator.js';
import '../aframe/clickable.js';
import '../aframe/simple-grab.js';
import '../aframe/listen-to.js';
import '../aframe/multi-camera.js';

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

const id = generateId('camera');
const takenPosition = computed(() =>
    vrStore.getVR() ? '-0.15 0 0' : '0.01 -0.3 -0.5'
);

const takeAPhoto = () => {
    photoCamStore.setIsTakingPicture(true);
    setTimeout(() => {
        const screenshot =
            document.querySelector('a-scene').components.screenshot;
        const canvas = screenshot.getCanvas('perspective');

        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                photoCamStore.addPictureUrl(reader.result);
                photoCamStore.setIsTakingPicture(false);
            };
        }, 'image/png');
    }, 1);
};

watch(
    () => vrStore.getVR(),
    (value) => {
        if (value) {
            // VR mode
            document
                .querySelector('#hand-right')
                .addEventListener('buttondown', (event) => {
                    if (store.getCarryItem()?.itemName === 'photoCam') {
                        takeAPhoto();
                    }
                });
        } else {
            // NON VR mode
            document.addEventListener('mousedown', (event) => {
                // TODO: Fix the event, because it's triggering on swap with a item
                if (
                    event.button === 2 &&
                    store.getCarryItem()?.itemName === 'photoCam'
                ) {
                    takeAPhoto();
                }
            });
        }
    },
    { immediate: true }
);
</script>

<template>
    <template v-if="!photoCamStore.getCamsStatus()">
        <a-entity
            :id="id"
            geometry="primitive: box; depth: 0.2; height: 0.2; width: 0.32"
            :position="position"
            :rotation="rotation"
            clickable
            simple-grab
            @grab="store.setCarryItem('photoCam', { id })"
            @drop="store.clearCarryItem()"
            material="visible: false"
        >
            <a-gltf-model
                :id="`${id}-model`"
                position="0.01 0 0.04"
                src="#tool-photo-camera"
                :listen-to__grab="`target: #${id}; event: grab; emit: taken`"
                :listen-to__drop="`target: #${id}; event: drop; emit: untaken`"
                event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
                event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
                :event-set__taken_position="`event: taken; attribute: position; value: ${takenPosition}`"
                event-set__untaken_position="event: untaken; attribute: position; value: 0.01 0 0.04"
            >
                <a-entity
                    :id="`${id}-screen`"
                    geometry="primitive: plane; width: 0.28; height: 0.09"
                    material="opacity: 1; color: white"
                    position="-0.007 -0.017 0.0559"
                ></a-entity>
                <a-entity position="0 0 -0.13">
                    <a-entity
                        :id="`${id}-camera`"
                        :secondary-camera="`
                cameraType: perspective;
                output: scene;
                outputElement: #${id}-screen;
                sequence: before;
              `"
                    ></a-entity>
                    <a-entity camera="active: false"></a-entity>
                </a-entity>
            </a-gltf-model>
        </a-entity>
    </template>
</template>

<style scoped></style>
