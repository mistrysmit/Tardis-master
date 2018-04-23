import { KEYFOB, KEYFOB_IN_PROGRESS, KEYFOB_FAIL, KEYFOB_SUCCESS } from '../constant';

export const keyFob = (state = '', action) => (action.type === KEYFOB) ? action.payload : state;

export const keyFobFail = (state = false, action) => (action.type === KEYFOB_FAIL) ? action.payload : state;

export const keyFobSuccess = (state = false, action) => (action.type === KEYFOB_SUCCESS) ? action.payload : state;

export const keyFobInProgress = (state = false, action) => (action.type === KEYFOB_IN_PROGRESS) ? action.payload : state;

