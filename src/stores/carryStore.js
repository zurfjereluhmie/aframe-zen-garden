import { reactive } from 'vue';

export const store = reactive({
    carryItem: null,
    previous: null,
    setCarryItem(itemName, details) {
        if (store.carryItem) {
            store.clearCarryItem();
        }
        store.carryItem = {
            itemName,
            details,
        };
    },
    getCarryItem() {
        return store.carryItem;
    },
    getPreviousCarryItem() {
        return store.previous;
    },
    clearCarryItem() {
        store.previous = store.carryItem;
        store.carryItem = null;
    },
});
