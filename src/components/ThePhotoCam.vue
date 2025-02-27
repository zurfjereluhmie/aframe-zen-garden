<script setup>
import { ref } from 'vue';
import { store } from '../stores/photoCamStore.js';
import '../aframe/clickable.js';
import '../aframe/simple-grab.js';
import '../aframe/listen-to.js';

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

const isActive = ref(false);

const handleCollision = (event, type) => {
    if (event.detail.withEl.id !== 'head-hitbox')
        console.log(event, type, 'here');

    if (type === 'start') {
        isActive.value = true;
    } else if (type === 'end') {
        isActive.value = false;
    }
};
</script>

<template>
    <template v-if="!store.getCamsStatus()">
        <a-box
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
                scale="0.0005 0.0005 0.0005"
                rotation="0 -90 0"
                src="#tool-photo-camera"
                obb-collider="centerModel: true"
                @obbcollisionstarted="handleCollision($event, 'start')"
                @obbcollisionended="handleCollision($event, 'end')"
                listen-to__grab="target: #photoCamera; event: grab; emit: taken"
                listen-to__drop="target: #photoCamera; event: drop; emit: untaken"
                event-set__taken_rotation="event: taken; attribute: rotation; value: 0 -90 90"
                event-set__taken_position="event: taken; attribute: position; value: -0.18 -0.08 0"
                event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 -90 0"
                event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
            >
                <a-entity
                    :camera="`active: ${isActive};`"
                    position="0 2 0"
                    rotation="0 0 0"
                ></a-entity>
            </a-gltf-model>
        </a-box>
    </template>
</template>

<style scoped></style>
