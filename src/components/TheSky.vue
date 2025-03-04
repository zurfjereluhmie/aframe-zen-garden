<script setup>
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

const props = defineProps({
    revolutionTime: {
        type: Number,
        default: 100000,
    },
});

const animationCount = ref(1);
const sky = useTemplateRef('sky');

watchEffect(() => {
    if (animationCount.value === 1) {
        sky.value?.setAttribute('animation', {
            property: 'opacity',
            to: 0,
            dur: props.revolutionTime / 4,
            easing: 'linear',
        });
        return;
    }
    if (animationCount.value === 2) {
        return;
    }
    if (animationCount.value === 3) {
        return;
    }
    if (animationCount.value === 4) {
        sky.value.setAttribute('animation', {
            property: 'opacity',
            to: 1,
            dur: props.revolutionTime / 4,
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
    <a-sky ref="sky" color="#a3d0ed" opacity="0.99"></a-sky>
</template>

<style scoped></style>
