<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/listen-to.js';
import AppFlower from './AppFlower.vue';

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

const model = useTemplateRef('model');
const zones = ref(Array.from({ length: 8 }, (_, i) => null));
const flowers = ref([]);

const handleDrop = (event, detail) => {
    store.clearCarryItem();
    zones.value[detail.index] = {
        el: event.detail.el,
        seedType: event.detail.el.dataset.seedType,
        hydratationLevel: 0,
        randomRotation: `0 ${Math.random() * 360} 0`,
        plantedAt: Date.now(),
    };
    event.detail.el.setAttribute('visible', false);
};

const handleClickWatering = (event, detail) => {
    if (!zones.value[detail.index]) return;

    const zone = zones.value[detail.index];
    zone.hydratationLevel += 1;
    if (zone.hydratationLevel === 4) {
        event.target.removeAttribute('clickable');
        event.target.removeAttribute('simple-grab-drop-zone');
        event.target.removeAttribute('outline-on-event');

        window.dispatchEvent(
            new CustomEvent('flower-ready', {
                detail: {
                    ...zone,
                    event: { ...event },
                },
            })
        );

        zones.value[detail.index] = null;
        event.target.setAttribute('clickable');
        event.target.setAttribute('simple-grab-drop-zone');
        event.target.setAttribute('outline-on-event');

        return;
    }
};

const flowerGrabbed = (event, detail) => {
    zones.value[detail.index] = null;
    event.target.setAttribute('clickable');
    event.target.setAttribute('simple-grab-drop-zone');
    event.target.setAttribute('outline-on-event');
};

watch(
    () => store.getCarryItem(),
    (newCarryItem) => {
        if (newCarryItem?.itemName === 'seedPack') {
            model.value.querySelectorAll('a-box').forEach((zone, i) => {
                if (zones.value[i]) return;
                zone.setAttribute('clickable', '');
                zone.setAttribute('simple-grab-drop-zone', 'dropOnly: true;');
            });
            return;
        }

        if (newCarryItem?.itemName === 'waterCan') {
            if (!newCarryItem.details.isFull) return;

            model.value.querySelectorAll('a-box').forEach((zone, i) => {
                if (!zones.value[i]) return;
                if (zones.value[i].hydratationLevel > 3) return;
                zone.setAttribute('clickable', '');
            });
            return;
        }

        model.value.querySelectorAll('a-box').forEach((zone, i) => {
            zone.removeAttribute('clickable');
            zone.removeAttribute('simple-grab-drop-zone');
        });
    }
);
</script>

<template>
    <a-gltf-model
        ref="model"
        src="#planting-zone"
        :position="position"
        :rotation="rotation"
    >
        <template v-for="i in zones.length" :key="i">
            <a-box
                :position="`${-5 + i} 0.05 -0.03`"
                width="1"
                depth="0.64"
                height="0.09"
                opacity="0.5"
                outline-on-event
                material="opacity: 0"
                @drop="handleDrop($event, { index: i - 1 })"
                @click="handleClickWatering($event, { index: i - 1 })"
            >
                <template v-if="zones[i - 1]">
                    <a-gltf-model
                        v-if="zones[i - 1].hydratationLevel === 1"
                        src="#seeding-process-step-1"
                        :rotation="zones[i - 1].randomRotation"
                    ></a-gltf-model>
                    <a-gltf-model
                        v-if="zones[i - 1].hydratationLevel === 2"
                        src="#seeding-process-step-2"
                        position="0 0.05 0"
                        :rotation="zones[i - 1].randomRotation"
                    ></a-gltf-model>
                    <a-gltf-model
                        v-if="zones[i - 1].hydratationLevel === 3"
                        src="#seeding-process-step-3"
                        position="0 0.08 0"
                        :rotation="zones[i - 1].randomRotation"
                    ></a-gltf-model>
                    <!-- <AppFlower
                        v-if="zones[i - 1].hydratationLevel === 4"
                        :flowerName="zones[i - 1].seedType"
                        position="0 0.08 0"
                        @_grab="flowerGrabbed($event, { index: i - 1 })"
                    ></AppFlower> -->
                </template>
            </a-box>
        </template>
    </a-gltf-model>
</template>

<style scoped></style>
