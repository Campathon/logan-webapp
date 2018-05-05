import {get, post, put} from './api-sender';

export function getCards() {
    return get('/cards');
}
