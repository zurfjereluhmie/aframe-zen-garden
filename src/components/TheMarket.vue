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

const packCount = 3;
</script>

<template>
    <a-gltf-model src="#market" :position :rotation>
        <slot></slot>
        <template v-for="(position, index) in packCount" :key="index">
            <AppSeedPack
                type="sunflower"
                :position="`-0.6 0.72 ${-0.43 + index * 0.3}`"
            ></AppSeedPack>
            <AppSeedPack
                type="daisy"
                :position="`-0.2 0.72 ${-0.43 + index * 0.3}`"
            ></AppSeedPack>
            <AppSeedPack
                type="tulip"
                :position="`0.2 0.72 ${-0.43 + index * 0.3}`"
            ></AppSeedPack>
            <AppSeedPack
                type="violet"
                :position="`0.6 0.73 ${-0.43 + index * 0.3}`"
            ></AppSeedPack>
        </template>
        <!-- <AppSeedPack type="daisy" position="2 1 0"></AppSeedPack> -->
        <!-- <AppSeedPack type="tulip" position="1 1 0"></AppSeedPack> -->
    </a-gltf-model>
</template>

<style scoped></style>
