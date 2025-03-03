import { reactive } from 'vue';

export const store = reactive({
    pots: [
        { type: 'high', position: '-2 0 -5', isBase: true },
        { type: 'small', position: '-2.3 0 -5', isBase: true },
        { type: 'big', position: '-2.160 0 -5.320', isBase: true },
        { type: 'high', position: '-2.6 0 -5', isBase: true },
        { type: 'high', position: '-2.12 0 -4.690', isBase: true },
        { type: 'small', position: '-2.430 0 -4.690', isBase: true },
        { type: 'big', position: '-2.560 0 -5.320', isBase: true },
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
