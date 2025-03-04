<script setup>
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

const props = defineProps({
    revolutionTime: {
        type: Number,
        default: 10000,
    },
});

const animationCount = ref(1);
const moon = useTemplateRef('moon');
const lightBlue = useTemplateRef('moon-light-blue');
const lightWhite = useTemplateRef('moon-light-white');

watchEffect(() => {
    if (animationCount.value === 1) {
        return;
    }
    if (animationCount.value === 2) {
        lightBlue.value.setAttribute('animation', {
            property: 'intensity',
            to: 35,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        lightWhite.value.setAttribute('animation', {
            property: 'intensity',
            to: 10,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        moon.value.setAttribute('animation', {
            property: 'opacity',
            to: 1,
            dur: props.revolutionTime / 24,
            easing: 'linear',
        });
        return;
    }
    if (animationCount.value === 3) {
        lightWhite.value.setAttribute('animation', {
            property: 'intensity',
            to: 10,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        lightBlue.value.setAttribute('animation', {
            property: 'intensity',
            to: 10,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        return;
    }
    if (animationCount.value === 4) {
        lightWhite.value.setAttribute('animation', {
            property: 'intensity',
            to: 0,
            dur: props.revolutionTime / 16,
            easing: 'linear',
        });
        lightBlue.value.setAttribute('animation', {
            property: 'intensity',
            to: 0,
            dur: props.revolutionTime / 16,
            easing: 'linear',
        });
        moon.value.setAttribute('animation', {
            property: 'opacity',
            to: 0,
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
        position="0 2 0"
        :animation__rotation="`property: rotation; to: 360 0 0; loop: true; dur: ${revolutionTime}; easing: linear`"
    >
        <a-entity position="0 -42 0">
            <a-light
                ref="moon-light-blue"
                type="point"
                color="blue"
                intensity="0"
                position="0 0 0"
            ></a-light>
            <a-light
                ref="moon-light-white"
                type="point"
                color="white"
                intensity="0"
                position="0 0 0"
            ></a-light>
            <a-sphere
                ref="moon"
                opacity="0"
                color="white"
                radius="2"
                position="0 0 0"
                shader="flat"
            ></a-sphere>
        </a-entity>
    </a-entity>
</template>

<style scoped></style>
