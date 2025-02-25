<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
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

const model = useTemplateRef('model');
const zones = ref(Array.from({ length: 8 }, (_, i) => null));

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

                zone.setAttribute('clickable', '');
                // TODO: Set the click logic for watering the plant
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
            >
                <template v-if="zones[i]">
                    <a-gltf-model
                        v-if="zones[i].hydratationLevel === 1"
                        src="#seeding-process-step-1"
                        :rotation="zones[i].randomRotation"
                    ></a-gltf-model>
                    <a-gltf-model
                        v-if="zones[i].hydratationLevel === 2"
                        src="#seeding-process-step-2"
                        position="0 0.05 0"
                        :rotation="zones[i].randomRotation"
                    ></a-gltf-model>
                    <a-gltf-model
                        v-if="zones[i].hydratationLevel === 3"
                        src="#seeding-process-step-3"
                        position="0 0.05 0"
                        :rotation="zones[i].randomRotation"
                    ></a-gltf-model>
                </template>
            </a-box>
        </template>
    </a-gltf-model>
</template>

<style scoped></style>
