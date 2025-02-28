<script setup>
import { store } from '../stores/photoCamStore';

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
</script>

<template>
    <Teleport to="a-scene">
        <template v-for="image in store.getPicturesUrl()" :key="image.id">
            <a-assets>
                <img :id="image.id" :src="image.url" />
            </a-assets>
        </template>
    </Teleport>
    <a-entity :position="position" :rotation="rotation">
        <a-gltf-model src="#picture-board">
            <a-image
                v-for="(image, index) in store.getPicturesUrl()"
                :key="image.id"
                :position="`${-0.9 + index * 0.9} 1.65 0.025`"
                :src="`#${image.id}`"
                :width="1.92"
                :height="1.08"
                scale="0.4 0.4 0.4"
            >
                <a-gltf-model
                    src="#picture-pin"
                    position="-0.85 0.45 0.03"
                    rotation="45 0 0"
                ></a-gltf-model>
                <a-gltf-model
                    src="#picture-pin"
                    position="0.85 0.45 0.03"
                    rotation="45 0 0"
                ></a-gltf-model>
            </a-image>
        </a-gltf-model>
    </a-entity>
</template>

<style scoped></style>
