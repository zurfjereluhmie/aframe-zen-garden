import { reactive } from 'vue';

export const store = reactive({
    isCamVisible: false,
    getCamsStatus() {
        return store.isCamVisible;
    },
    setShowPhotoCam(status) {
        store.isCamVisible = status;
    },
});
