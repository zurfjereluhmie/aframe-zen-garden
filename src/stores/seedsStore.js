import { reactive } from 'vue';

export const store = reactive({
    seeds: [
        { type: 'sunflower', position: '-0.6 0.72 -0.43' },
        { type: 'sunflower', position: '-0.6 0.72 -0.13' },
        { type: 'sunflower', position: '-0.6 0.72 0.17' },
        { type: 'sunflower', position: '-0.6 0.72 0.47' },
        { type: 'daisy', position: '-0.2 0.72 -0.43' },
        { type: 'daisy', position: '-0.2 0.72 -0.13' },
        { type: 'daisy', position: '-0.2 0.72 0.17' },
        { type: 'daisy', position: '-0.2 0.72 0.47' },
        { type: 'tulip', position: '0.2 0.72 -0.43' },
        { type: 'tulip', position: '0.2 0.72 -0.13' },
        { type: 'tulip', position: '0.2 0.72 0.17' },
        { type: 'tulip', position: '0.2 0.72 0.47' },
        { type: 'violet', position: '0.6 0.74 -0.43' },
        { type: 'violet', position: '0.6 0.74 -0.13' },
        { type: 'violet', position: '0.6 0.74 0.17' },
        { type: 'violet', position: '0.6 0.74 0.47' },
        { type: 'blue', position: '1 0.75 -0.43' },
        { type: 'blue', position: '1 0.75 -0.13' },
        { type: 'blue', position: '1 0.75 0.17' },
        { type: 'blue', position: '1 0.75 0.47' },
    ],
    addSeed(seed) {
        store.seeds.push(seed);
    },
    getSeeds() {
        return store.seeds;
    },
    removeSeed(seed) {
        store.seeds = store.seeds.filter((s) => s !== seed);
    },
    clearSeeds() {
        store.seeds = [];
    },
});
