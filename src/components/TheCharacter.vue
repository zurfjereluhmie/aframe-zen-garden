<script setup>
import { computed, ref, useTemplateRef, watch } from 'vue';
import { store } from '../stores/carryStore.js';
import { store as photoCamStore } from '../stores/photoCamStore.js';
import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/look-at.js';
import '../aframe/look-at_horizon.js';
import '../aframe/emit-when-near.js';

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

const DIALOGS = {
    introduction: [
        'dialog-1_introduction',
        'dialog-1_request-flower',
        'dialog-2_introduction_flower',
        'dialog-3_introduction_gift',
    ],
    fail: ['dialog-4_fail-1', 'dialog-4_fail-2', 'dialog-4_fail-3'],
    nearby: ['dialog-4_sucess-nearby-1', 'dialog-4_sucess-nearby-2'],
    sucess: ['dialog-4_sucess-1'],
    waiting: ['dialog-4_waiting-1', 'dialog-4_waiting-2', 'dialog-4_waiting-3'],
    end: ['dialog-5_end-1', 'dialog-5_end-2', 'dialog-5_end-3'],
};

const character = useTemplateRef('character');
const soundElt = useTemplateRef('sound-elt');
const isSpeaking = ref(false);
const isClose = ref(false);
const canTakeFlower = ref(false);
const flowerGiven = ref(false);
const dialog = ref(0);
const dialogQueue = ref([]);
const done = ref(false);
const photoCamDropped = ref(false);
const photoCamTaken = ref(false);
const lookAtTarget = ref('#head');

const lookAtCamera = computed(() => {
    return isSpeaking.value || isClose.value;
});

const playAnimation = (clip, duration) => {
    character.value.setAttribute('animation-mixer', {
        clip,
        loop: 'once',
    });
    setTimeout(() => {
        character.value.setAttribute('animation-mixer', {
            clip: 'CharacterArmature|Idle',
            loop: 'repeat',
        });
    }, duration);
};

const handleClose = (event) => {
    isClose.value = true;
    if (photoCamDropped.value) return;
    if (dialog.value === 0) {
        playAnimation('CharacterArmature|Wave', 1666.6666269302368);
        dialogQueue.value.push(...DIALOGS.introduction);
        dialog.value++;
        nextDialog();
        return;
    }

    if (!store.getCarryItem()) {
        dialogQueue.value.push(
            DIALOGS.waiting[Math.floor(Math.random() * DIALOGS.waiting.length)]
        );
        nextDialog();
        return;
    }

    if (store.getCarryItem().itemName === 'flower') {
        dialogQueue.value.push(
            DIALOGS.nearby[Math.floor(Math.random() * DIALOGS.nearby.length)]
        );
        canTakeFlower.value = true;
        nextDialog();
        return;
    } else {
        dialogQueue.value.push(
            DIALOGS.fail[Math.floor(Math.random() * DIALOGS.fail.length)]
        );
        nextDialog();
        return;
    }
};
const handleFar = (event) => {
    isClose.value = false;
};

const nextDialog = (event) => {
    isSpeaking.value = false;
    if (dialogQueue.value.length === 0) {
        if (flowerGiven.value) {
            done.value = true;
        }
        return;
    }
    if (photoCamDropped.value) return;
    const dialogId = dialogQueue.value.shift();
    soundElt.value.setAttribute('src', `#${dialogId}`);
    isSpeaking.value = true;
};

const handleFlowerGive = (event) => {
    if (!canTakeFlower.value) return;
    playAnimation('CharacterArmature|Interact', 1250);
    const flower = store.getCarryItem();
    const flowerDOM = document.querySelector(`#${flower.details.flowerId}`);
    const scene = document.querySelector('a-scene');
    const hand = flowerDOM.components['simple-grab']?.grabbedBy;
    if (hand) {
        scene.systems['simple-grab'].removeCurrentGrab(hand, flowerDOM);
    }
    flowerDOM.parentNode?.removeChild(flowerDOM);
    store.clearCarryItem();
    flowerGiven.value = true;
};

const handleEnd = (newVal) => {
    canTakeFlower.value = false;

    playAnimation('CharacterArmature|Interact', 1250);
    lookAtTarget.value = '#character-stool';
    photoCamStore.setShowPhotoCam(true);
    photoCamDropped.value = true;
    setTimeout(() => {
        lookAtTarget.value = '#head';
    }, 1250);
};

const leaveAnimation = () => {
    playAnimation('CharacterArmature|Wave', 1666.6666269302368);
    setTimeout(() => {
        character.value.removeAttribute('look-at_horizon');
        character.value.setAttribute('animation', {
            property: 'rotation',
            to: '0 180 0',
            dur: 500,
            easing: 'linear',
        });
        setTimeout(() => {
            character.value.setAttribute('animation-mixer', {
                clip: 'CharacterArmature|Walk',
                loop: 'repeat',
            });
            character.value.setAttribute('animation', {
                property: 'position',
                to: '-6.5 0 -12',
                dur: 5000,
                easing: 'linear',
            });
            setTimeout(() => {
                character.value.parentNode?.removeChild(character.value);
            }, 5000);
        }, 500);
    }, 1666.6666269302368);
};

watch(
    () => store.getCarryItem(),
    (newVal) => {
        if (newVal?.itemName === 'photoCam') {
            photoCamTaken.value = true;
            leaveAnimation();
        }
    }
);

watch(
    () => flowerGiven.value,
    (newVal) => {
        if (newVal) {
            dialogQueue.value.push(
                DIALOGS.sucess[
                    Math.floor(Math.random() * DIALOGS.sucess.length)
                ]
            );
            dialogQueue.value.push(...DIALOGS.end);
            nextDialog();
        }
    },
    { once: true }
);

watch(
    () => done.value,
    (newVal) => {
        handleEnd(newVal);
    },
    { once: true }
);
</script>

<template>
    <a-gltf-model
        id="character"
        ref="character"
        src="#character"
        :position="position"
        :rotation="rotation"
        scale="1.2 1.2 1.2"
        :look-at_horizon="`enabled: ${lookAtCamera}; target: ${lookAtTarget}`"
        emit-when-near="target: #head;distance: 3; event: close; eventFar: far"
        @close="handleClose()"
        @far="handleFar()"
        :clickable="canTakeFlower ? '' : null"
        @click="handleFlowerGive($event)"
        animation-mixer="clip: CharacterArmature|Idle; loop: repeat"
    >
        <a-sound
            ref="sound-elt"
            positional="true"
            autoplay="true"
            @sound-ended="nextDialog($event)"
        ></a-sound>
    </a-gltf-model>
</template>

<style scoped></style>
