<script setup>
defineProps({
    revolutionTime: {
        type: Number,
        default: 100000,
    },
});
</script>

<template>
    <a-entity
        position="0 -2 0"
        :animation__rotation="`property: rotation; to: 360 0 0; loop: true; dur: ${revolutionTime}; easing: linear`"
    >
        <a-entity position="0 42 0">
            <a-light
                type="point"
                color="orange"
                intensity="100"
                position="0 0 0"
            ></a-light>
            <a-light
                type="point"
                color="white"
                :animation="`property: intensity; to: 0; dur: ${revolutionTime / 4}; loop: true; easing: linear; dir: alternate`"
                intensity="100"
                position="0 0 0"
            ></a-light>
            <a-sphere
                color="yellow"
                radius="3"
                position="0 0 0"
                shader="flat"
            ></a-sphere>
        </a-entity>
    </a-entity>
</template>

<style scoped></style>
