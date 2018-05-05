const namespace = 'REACT_APP';

export default {
    get(key) {
        const realKey = namespace + "_" + key;
        console.log(process.env)
        return process.env[realKey];
    }
}
