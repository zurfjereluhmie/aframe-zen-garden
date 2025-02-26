<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import '../aframe/clickable.js';
import '../aframe/simple-grab.js';
import '../aframe/event-set.js';
import '../aframe/listen-to.js';

const props = defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    rotation: {
        type: String,
        default: '0 0 0',
    },
    isFull: {
        type: Boolean,
        default: false,
    },
});

const isFull = ref(props.isFull);
const pouringSfx = useTemplateRef('pouring-water-sfx');
const fillingSfx = useTemplateRef('filling-sfx');
const walkingSfx = useTemplateRef('walking-sfx');

const handleCollision = (event, type) => {
    if (isFull.value) return;
    const isRiverHitbox = event.detail.withEl.id === 'river-hitbox';
    if (isRiverHitbox) {
        if (type === 'start') {
            fillingSfx.value.components.sound.playSound();
        } else if (type === 'end') {
            fillingSfx.value.components.sound.stopSound();
        }
    }
};

const fillingComplete = (event) => {
    isFull.value = true;
    fillingSfx.value.components.sound.stopSound();
    setTimeout(() => {
        store.setCarryItem('waterCan', { isFull: isFull.value });
    }, 1);
};

watch(
    () => store.getCarryItem(),
    (newCarryItem) => {
        if (newCarryItem?.itemName === 'waterCan' && isFull.value) {
            walkingSfx.value.components.sound.playSound();
            return;
        }
        if (store.getPreviousCarryItem()?.itemName === 'waterCan') {
            walkingSfx.value?.components.sound.pauseSound();
            return;
        }
    }
);

onMounted(() => {
    window.addEventListener('watering', () => {
        pouringSfx.value.components.sound.playSound();
        isFull.value = false;
        setTimeout(() => {
            pouringSfx.value.components.sound.stopSound();
        }, 1000);
    });
});
</script>

<template>
    <a-entity
        id="water-can"
        :position="position"
        :rotation="rotation"
        geometry="primitive: box; width: 0.8; height: 0.42; depth: 0.25"
        material="visible: false;"
        clickable
        simple-grab
        @grab="() => store.setCarryItem('waterCan', { isFull })"
    >
        <a-sound
            ref="pouring-water-sfx"
            src="#pouring-water-sound"
            positional="true"
        ></a-sound>
        <a-sound
            ref="filling-sfx"
            src="#watercan-fill-sound"
            positional="true"
            @sound-ended="fillingComplete($event)"
        ></a-sound>
        <a-sound
            v-if="isFull"
            ref="walking-sfx"
            src="#walking-with-watercan-full-sound"
            positional="true"
            autoplay="true"
            loop="true"
        ></a-sound>
        <a-gltf-model
            src="#tool-water-can"
            position="0.1 -0.2 -0.02"
            rotation="0 -12 0"
            obb-collider
            listen-to__grab="target: #water-can; event: grab; emit: taken"
            listen-to__drop="target: #water-can; event: drop; emit: untaken"
            event-set__taken_rotation="event: taken; attribute: rotation; value: 0 -90 90"
            event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 -12 0"
            event-set__taken_position="event: taken; attribute: position; value: -0.05 -0.25 0.19"
            event-set__untaken_position="event: untaken; attribute: position; value: 0.1 -0.2 -0.02"
            @obbcollisionstarted="handleCollision($event, 'start')"
            @obbcollisionended="handleCollision($event, 'end')"
        ></a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
