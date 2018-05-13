const namespace = 'REACT_APP';

export default {
    get(key) {
        const realKey = namespace + "_" + key;
        return process.env[realKey];
    }
}
