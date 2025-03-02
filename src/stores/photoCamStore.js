import { reactive } from 'vue';
import { generateId } from '../utils/idGenerator';

export const store = reactive({
    isCamVisible: false,
    isTakingPicture: false,
    picturesUrl: [],
    getCamsStatus() {
        return store.isCamVisible;
    },
    getIsTakingPicture() {
        return store.isTakingPicture;
    },
    setIsTakingPicture(status) {
        store.isTakingPicture = status;
    },
    setShowPhotoCam(status) {
        store.isCamVisible = status;
    },
    addPictureUrl(url) {
        if (store.picturesUrl.length >= 3) store.picturesUrl.shift();
        const id = generateId('picture-taken');
        store.picturesUrl.push({ id, url, date: new Date() });
    },
    getPicturesUrl() {
        return store.picturesUrl;
    },
});
