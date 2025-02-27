<script setup>
import { onMounted, ref } from 'vue';
import { store } from '../stores/photoCamStore.js';
import '../aframe/clickable.js';
import '../aframe/simple-grab.js';
import '../aframe/listen-to.js';
import '../aframe/multi-camera.js';
import { generateId } from '../utils/idGenerator.js';

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
const takeCameraPosition = ref('-0.65 -0.3 -0.47');

onMounted(() => {
    document
        .querySelector('a-scene')
        .addEventListener(
            'enter-vr',
            () => (takeCameraPosition.value = '-0.18 -0.08 0')
        );
});
</script>

<template>
    <template v-if="!store.getCamsStatus()">
        <!-- <a-box
            id="photoCamera"
            depth="0.2"
            height="0.18"
            width="0.32"
            :position
            :rotation
            clickable
            simple-grab
            material="opacity: 0"
        >
            <a-gltf-model
                :id="`${id}-model`"
                position="-0.65 -0.1 -0.47"
                scale="0.0005 0.0005 0.0005"
                rotation="0 -90 0"
                src="#tool-photo-camera"
                listen-to__grab="target: #photoCamera; event: grab; emit: taken"
                listen-to__drop="target: #photoCamera; event: drop; emit: untaken"
                event-set__taken_rotation="event: taken; attribute: rotation; value: 0 -90 90"
                :event-set__taken_position="`event: taken; attribute: position; value: ${takeCameraPosition}`"
                event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 -90 0"
                event-set__untaken_position="event: untaken; attribute: position; value: -0.65 -0.1 -0.47"
            >
                <a-entity
                    :id="`${id}-screen`"
                    geometry="primitive: plane; width: 0.3; height: 0.1"
                    _position="0.005 -0.03 0.093"
                    position="0 0 0"
                ></a-entity>
                <a-entity
                    :id="id"
                    _position="0 0 -0.5"
                    :secondary-camera="`
            cameraType: perspective;
            output: scene;
            aspectRatio: 1;
            outputElement: #${id}-screen;
            sequence: before;
          `"
                ></a-entity>
            </a-gltf-model>
        </a-box> -->
        <a-entity
            :id="id"
            geometry="primitive: box; depth: 0.2; height: 0.2; width: 0.32"
            :position="position"
            :rotation="rotation"
            clickable
            simple-grab
            material="opacity: 0"
        >
            <a-gltf-model
                :id="`${id}-model`"
                position="0.01 0 0.04"
                src="#tool-photo-camera"
                :listen-to__grab="`target: #${id}; event: grab; emit: taken`"
                :listen-to__drop="`target: #${id}; event: drop; emit: untaken`"
                event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
                event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
            >
                <a-entity
                    :id="`${id}-screen`"
                    geometry="primitive: plane; width: 0.28; height: 0.09"
                    material="opacity: 1; color: white"
                    position="-0.007 -0.017 0.0559"
                ></a-entity>
                <a-entity
                    :id="`${id}-camera`"
                    :secondary-camera="`
            cameraType: perspective;
            output: scene;
            aspectRatio: 1;
            outputElement: #${id}-screen;
            sequence: before;
          `"
                ></a-entity>
            </a-gltf-model>
        </a-entity>
    </template>
</template>

<style scoped></style>
