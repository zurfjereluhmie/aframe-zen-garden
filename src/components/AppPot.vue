<script setup>
import { ref, watch, useTemplateRef } from 'vue';
import { store } from '../stores/carryStore.js';
import { store as potsStore } from '../stores/potsStore.js';
import { generateId } from '../utils/idGenerator.js';
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import '../aframe/bind-position.js';
import '../aframe/bind-rotation.js';
import '../aframe/listen-to.js';

const props = defineProps({
    position: {
        type: String,
        default: '0 0 0',
    },
    type: {
        type: String,
        default: 'small',
        validator: (value) => ['small', 'big', 'high'].includes(value),
    },
});

const pot = useTemplateRef('pot');
const outerHitbox = useTemplateRef('outerHitbox');
const potId = generateId('pot');
const droppedEl = ref(null);

const potMeta = {
    small: {
        dropbox: '0 0.3 0',
        hitbox: 'width: 0.2; height: 0.28; depth: 0.2',
    },
    big: {
        dropbox: '0 0.45 0',
        hitbox: 'width: 0.3; height: 0.6; depth: 0.3',
    },
    high: {
        dropbox: '0 0.35 0',
        hitbox: 'width: 0.2; height: 0.4; depth: 0.2',
    },
};

const handleDrop = (event) => {
    store.clearCarryItem();

    droppedEl.value = event.detail.el;
    droppedEl.value.removeAttribute('clickable');
    droppedEl.value.dataset.potId = potId;

    droppedEl.value.setAttribute('bind-position', {
        target: `#${potId} .dropbox`,
    });
    droppedEl.value.setAttribute('bind-rotation', {
        target: `#${potId} .dropbox`,
        convertToLocal: true,
    });

    setTimeout(() => {
        outerHitbox.value.setAttribute('simple-grab', '');
        outerHitbox.value.setAttribute('clickable', '');
    }, 1);
};

const undropHandler = (event) => {
    droppedEl.value = null;
};

const handleGrab = (event) => {
    store.setCarryItem('pot', {
        pot: outerHitbox.value,
        droppedEl: droppedEl.value,
    });

    const isBase = !!event.detail.el.dataset.base;

    if (isBase) {
        const { x, y, z } = event.detail.el.object3D.position;
        setTimeout(() => {
            potsStore.addPot({
                type: event.detail.el.dataset.type,
                position: `${x} ${y} ${z}`,
                isBase: true,
            });
        }, 2000);

        event.detail.el.dataset.base = '';
    }
};

watch(
    () => store.getCarryItem(),
    (newCarryItem) => {
        if (newCarryItem?.itemName === 'flower' && !droppedEl.value) {
            pot.value?.setAttribute('simple-grab-drop-zone', 'dropOnly: true;');
            pot.value?.setAttribute('clickable', '');
            return;
        }

        if (newCarryItem?.itemName !== 'flower') {
            pot.value?.removeAttribute('simple-grab-drop-zone');
            pot.value?.removeAttribute('clickable');
            return;
        }

        if (newCarryItem?.itemName !== 'pot') return;
        if (newCarryItem && newCarryItem.details.pot.id !== potId) {
            pot.value.removeAttribute('simple-grab-drop-zone');
            pot.value.removeAttribute('clickable');
        }
    }
);
</script>

<template>
    <a-entity
        ref="outerHitbox"
        :geometry="`primitive: box; ${potMeta[type].hitbox}`"
        material="visible: false;"
        :position="position"
        :id="potId"
        :data-type="type"
        @grab="handleGrab($event)"
    >
        <a-gltf-model
            ref="pot"
            :src="`#tool-pot-${type}`"
            simple-grab-drop-zone="dropOnly: true;"
            clickable
            @drop="handleDrop($event)"
            @undrop="undropHandler($event)"
            :listen-to__grab="`target: #${potId}; event: grab; emit: taken`"
            :listen-to__drop="`target: #${potId}; event: drop; emit: untaken`"
            event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
            event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
        >
            <a-entity
                class="dropbox"
                :position="potMeta[type].dropbox"
            ></a-entity>
        </a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
