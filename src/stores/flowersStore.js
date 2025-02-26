import { reactive } from 'vue';

export const store = reactive({
    flowers: [],
    addFlower(flower) {
        store.flowers.push(flower);
    },
    getFlowers() {
        return store.flowers;
    },
    removeFlower(flower) {
        store.flowers = store.flowers.filter((f) => f !== flower);
    },
    clearFlowers() {
        store.flowers = [];
    },
});
