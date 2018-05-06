import io from 'socket.io-client';
import ConfigService from "./ConfigService";

let socket = null;
const BASE_URL = ConfigService.get('BASE_URL');


// new user
export function listenNewUserJoin({room_id, cb}) {
    if (socket) {
        console.log('listenNewUserJoin', room_id);
        socket.on('newUser', cb);
    } else {
        connect(room_id, listenNewUserJoin, {room_id, cb});
    }
}

export function removeListenNewUserJoin() {
    if (socket) {
        console.log('removeListenNewUserJoin');
        socket.off('newUser');
    }
}


// User change usersChanged
export function listenUserChange({room_id, cb}) {
    if (socket) {
        console.log('listenUserChange', room_id);
        socket.on('usersChanged', cb);
    } else {
        connect(room_id, listenUserChange, {room_id, cb});
    }
}

export function removeListenUserChange() {
    if (socket) {
        console.log('removeListenUserChange');
        socket.off('usersChanged');
    }
}

// close game
export function listenRoomClose({room_id, cb}) {
    if (socket) {
        console.log('listenRoomClose', room_id);
        socket.on('roomClosed', cb);
    } else {
        connect(room_id, listenRoomClose, {room_id, cb});
    }
}

export function removeListenRoomClose() {
    if (socket) {
        console.log('removeListenRoomClose');
        socket.off('roomClosed');
    }
}


// start game
export function listenStartGame({room_id, cb}) {
    if (socket) {
        console.log('listenStartGame', room_id);
        socket.on('startGame', cb);
    } else {
        connect(room_id, listenStartGame, {room_id, cb});
    }
}

export function removeListenStartGame() {
    if (socket) {
        console.log('removeListenStartGame');
        socket.off('startGame');
    }
}

export const connect = (room_id, cb, params) => {
    socket = io.connect(BASE_URL, {query: {room: room_id}});

    socket.on('connect', () => {
        console.log('Connect socket successfully!');
    });

    socket.on('disconnect', () => {
        console.log('Socket is disconnected');
    });

    socket.on('error', (err) => {
        console.log('Connect socket fail', err);
    });

    cb(params);
};

export const disconnect = () => {
    if (socket) {
        socket.disconnect();
    }
};
