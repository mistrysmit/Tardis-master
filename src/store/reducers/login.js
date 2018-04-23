import {LOGIN,LOGIN_IN_PROGRESS,LOGIN_FAIL,LOGIN_SUCCESS}  from '../constant';

export const login = (state = '', action) => (action.type === LOGIN) ? action.payload : state;

export const loginFail = (state = false, action) => (action.type === LOGIN_FAIL) ? action.payload : state;

export const loginSuccess = (state = false, action) => (action.type === LOGIN_SUCCESS) ? action.payload : state;

export const loginInProgress = (state = false, action) => (action.type === LOGIN_IN_PROGRESS) ? action.payload : state;
