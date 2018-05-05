import storageService from "./StorageService";

let listeners = {};
let userInfo = storageService.get('user-info');

function broadcast() {
    Object.keys(listeners).forEach(
        k => listeners[k]()
    );
}

export default {
    get: () => userInfo,
    set: (newInfo) => {
        userInfo = newInfo;
        if (newInfo) {
            storageService.set('user-info', userInfo);
        } else {
            storageService.clear('user-info');
        }

        broadcast();
    },
    onChange: (key, cb) => {
        listeners[key] = cb;
    },
    unChange: (key) => {
        delete listeners[key];
    }
}
