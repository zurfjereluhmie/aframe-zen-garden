import { reactive } from 'vue';

export const store = reactive({
    pots: [
        { type: 'high', position: '-2 0 -5' },
        { type: 'small', position: '-2.3 0 -5' },
        { type: 'big', position: '-2.160 0 -5.320' },
        { type: 'high', position: '-2.6 0 -5' },
        { type: 'high', position: '-2.12 0 -4.690' },
        { type: 'small', position: '-2.430 0 -4.690' },
        { type: 'big', position: '-2.560 0 -5.320' },
    ],
    addPot(pot) {
        store.pots.push(pot);
    },
    getPots() {
        return store.pots;
    },
    removePot(pot) {
        store.pots = store.pots.filter((p) => p !== pot);
    },
    clearPots() {
        store.pots = [];
    },
});
