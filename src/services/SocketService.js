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
        retry(listenNewUserJoin, {room_id, cb}, room_id);
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
        retry(listenNewUserJoin, {room_id, cb}, room_id);
    }
}

export function removeListenUserChange() {
    if (socket) {
        console.log('removeListenUserChange');
        socket.off('usersChanged');
    }
}


// start game
export function listenStartGame({room_id, cb}) {
    if (socket) {
        console.log('listenStartGame', room_id);
        socket.on('startGame', cb);
    } else {
        retry(listenStartGame, {room_id, cb}, room_id);
    }
}

export function removeListenStartGame() {
    if (socket) {
        console.log('removeListenStartGame');
        socket.off('startGame');
    }
}

export const connect = (room_id, cb) => {
    if (socket) {
        return;
    }

    let _socket = io.connect(BASE_URL, {query: {room: room_id}});

    _socket.on('connect', () => {
        socket = _socket;
        console.log('Connect socket successfully!');
        cb();
    });

    _socket.on('disconnect', () => {
        console.log('Socket is disconnected');
    });

    _socket.on('error', (err) => {
        console.log('Connect socket fail', err);
    });
};

export const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

const retry = (func, params, room_id) => {
    console.log('retry');

    const onConnected = () => {
        func(params);
    };

    connect(room_id, onConnected);
};
