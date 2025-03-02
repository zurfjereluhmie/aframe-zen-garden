import { reactive } from 'vue';

export const store = reactive({
    isVR: false,
    setVR(isVR) {
        store.isVR = isVR;
    },
    getVR() {
        return store.isVR;
    },
});
