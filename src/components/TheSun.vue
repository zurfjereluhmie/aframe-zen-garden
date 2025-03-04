<script setup>
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

const props = defineProps({
    revolutionTime: {
        type: Number,
        default: 100000,
    },
});

const animationCount = ref(1);
const sun = useTemplateRef('sun');
const lightOrange = useTemplateRef('sun-light-orange');
const lightWhite = useTemplateRef('sun-light-white');

watchEffect(() => {
    if (animationCount.value === 1) {
        lightOrange.value?.setAttribute('animation', {
            property: 'intensity',
            to: 10,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        lightWhite.value?.setAttribute('animation', {
            property: 'intensity',
            to: 10,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        return;
    }
    if (animationCount.value === 2) {
        lightOrange.value.setAttribute('animation', {
            property: 'intensity',
            to: 0,
            dur: props.revolutionTime / 24,
            easing: 'linear',
        });
        lightWhite.value.setAttribute('animation', {
            property: 'intensity',
            to: 0,
            dur: props.revolutionTime / 24,
            easing: 'linear',
        });
        sun.value.setAttribute('animation', {
            property: 'opacity',
            to: 0,
            dur: props.revolutionTime / 32,
            easing: 'linear',
        });
        return;
    }
    if (animationCount.value === 3) {
        return;
    }
    if (animationCount.value === 4) {
        lightWhite.value.setAttribute('animation', {
            property: 'intensity',
            to: 100,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        lightOrange.value.setAttribute('animation', {
            property: 'intensity',
            to: 120,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        sun.value.setAttribute('animation', {
            property: 'opacity',
            to: 1,
            dur: props.revolutionTime / 24,
            easing: 'linear',
        });
        return;
    }
});

onMounted(() => {
    setInterval(() => {
        animationCount.value += 1;
        if (animationCount.value > 4) animationCount.value = 1;
    }, props.revolutionTime / 4);
});
</script>

<template>
    <a-entity
        position="0 -2 0"
        :animation__rotation="`property: rotation; to: 360 0 0; loop: true; dur: ${revolutionTime}; easing: linear`"
    >
        <a-entity position="0 42 0">
            <a-light
                ref="sun-light-orange"
                type="point"
                color="orange"
                intensity="120"
                position="0 0 0"
            ></a-light>
            <a-light
                ref="sun-light-white"
                type="point"
                color="white"
                :_animation="`property: intensity; to: 0; dur: ${revolutionTime / 4}; easing: linear`"
                intensity="100"
                position="0 0 0"
            ></a-light>
            <a-sphere
                ref="sun"
                opacity="0.99"
                color="yellow"
                radius="3"
                position="0 0 0"
                shader="flat"
            ></a-sphere>
        </a-entity>
    </a-entity>
</template>

<style scoped></style>
