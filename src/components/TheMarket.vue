<script setup>
import AppSeedPack from './AppSeedPack.vue';

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

const packCount = 4;
</script>

<template>
    <a-gltf-model src="#market" :position :rotation>
        <slot></slot>
        <template v-for="(position, index) in packCount" :key="index">
            <AppSeedPack
                type="sunflower"
                :position="`-0.3 0.720 ${-0.47 + index * 0.25}`"
            ></AppSeedPack>
            <AppSeedPack
                type="daisy"
                :position="`0.2 0.720 ${-0.47 + index * 0.25}`"
            ></AppSeedPack>
            <AppSeedPack
                type="tulip"
                :position="`0.7 0.720 ${-0.47 + index * 0.25}`"
            ></AppSeedPack>
        </template>
        <!-- <AppSeedPack type="daisy" position="2 1 0"></AppSeedPack> -->
        <!-- <AppSeedPack type="tulip" position="1 1 0"></AppSeedPack> -->
    </a-gltf-model>
</template>

<style scoped></style>
