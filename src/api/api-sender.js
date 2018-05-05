import axios from "axios";
import ConfigService from "../services/ConfigService";

const BASE_URL = ConfigService.get('BASE_URL');

export function get(route) {
    const url = BASE_URL + route;
    return axios.get(url)
        .then(handleResponse)
}

export function post(route, payload) {
    const url = BASE_URL + route;
    return axios.post(url, payload)
        .then(handleResponse)
}

export function put(route, payload) {
    const url = BASE_URL + route;
    return axios.put(url, payload)
        .then(handleResponse)
}

function handleResponse(res) {
    return new Promise((resolve, reject) => {
        if (res.data && res.data.success) {
            return resolve(res.data.data);
        } else if (res.data && !res.data.success) {
            return reject(new Error(res.data.message));
        } else {
            reject(new Error("Lỗi cmnr"));
        }
    });
}
