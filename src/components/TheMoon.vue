<script setup>
defineProps({
    revolutionTime: {
        type: Number,
        default: 10000,
    },
});
</script>

<template>
    <a-entity
        position="0 2 0"
        :animation__rotation="`property: rotation; to: 360 0 0; loop: true; dur: ${revolutionTime}; easing: linear`"
    >
        <a-entity position="0 -42 0">
            <a-light
                type="point"
                color="blue"
                intensity="30"
                position="0 0 0"
            ></a-light>
            <a-light
                type="point"
                color="white"
                intensity="10"
                position="0 0 0"
            ></a-light>
            <a-sphere
                color="white"
                radius="2"
                position="0 0 0"
                shader="flat"
            ></a-sphere>
        </a-entity>
    </a-entity>
</template>

<style scoped></style>
