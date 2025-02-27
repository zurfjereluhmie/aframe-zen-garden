<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import { store as flowersStore } from '../stores/flowersStore.js';
import { generateId } from '../utils/idGenerator.js';
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
const zoneId = generateId('planting-zone');
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

const handleClickWatering = (event, detail) => {
    if (!zones.value[detail.index]) return;
    if (!store.getCarryItem()) return;
    if (store.getCarryItem().itemName !== 'waterCan') return;
    if (!store.getCarryItem().details.isFull) return;
    setTimeout(() => {
        store.setCarryItem('waterCan', { isFull: false });
    }, 1);

    const zone = zones.value[detail.index];
    zone.hydratationLevel += 1;

    window.dispatchEvent(
        new CustomEvent('watering', {
            detail: {
                ...zone,
                event: { ...event },
            },
        })
    );

    if (zone.hydratationLevel === 4) {
        const pos = new THREE.Vector3();
        zone.el.object3D.getWorldPosition(pos);
        flowersStore.addFlower({
            position: `${pos.x} ${pos.y} ${pos.z}`,
            flowerName: zone.seedType,
            details: { ...zone },
        });

        zones.value[detail.index] = null;
        event.target.setAttribute('clickable');
        event.target.setAttribute('simple-grab-drop-zone');
        event.target.setAttribute('outline-on-event');

        return;
    }
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
            if (!newCarryItem.details.isFull) {
                model.value.querySelectorAll('a-box').forEach((zone, i) => {
                    zone.removeAttribute('clickable');
                    zone.removeAttribute('simple-grab-drop-zone');
                });
                return;
            }

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
        :id="zoneId"
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
                        position="0 0.15 0"
                        :rotation="zones[i - 1].randomRotation"
                    ></a-gltf-model>
                </template>
            </a-box>
        </template>
    </a-gltf-model>
</template>

<style scoped></style>
