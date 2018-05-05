import store from 'store';

const nameSpace = 'com.logan.';

export default {
    get(key) {
        const realKey = nameSpace + key;
        let obj = null;
        try {
            obj = JSON.parse(store.get(realKey));
        } catch (err) {
            // console.log('err', err);
        }

        return obj;
    },
    set(key, obj) {
        const realKey = nameSpace + key;
        return store.set(realKey, JSON.stringify(obj));
    },
    clear(key) {
        const realKey = nameSpace + key;
        store.remove(realKey);
    },
    clearAll() {
        store.clearAll();
    }
}
