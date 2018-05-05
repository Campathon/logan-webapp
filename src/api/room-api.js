import {get, post, put} from './api-sender';

export function createRoom() {
    return post('/rooms', {});
}

export function joinRoom(payload) {
    return post('/rooms/join', payload);
}

export function readyRoom(payload) {
    return post('/rooms/ready', payload);
}

export function closeRoom(payload) {
    return post('/rooms/close', payload);
}

export function playRoom(payload) {
    return post('/rooms/play', payload);
}

export function getUsers(payload) {
    return post('/rooms/users', payload);
}
