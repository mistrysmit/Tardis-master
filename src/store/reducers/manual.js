import { MANUAL, MANUAL_IN_PROGRESS, MANUAL_FAIL, MANUAL_SUCCESS } from '../constant';

export const manual = (state = [], action) => (action.type === MANUAL) ? action.payload : state;

export const manualFail = (state = false, action) => (action.type === MANUAL_FAIL) ? action.payload : state;

export const manualSuccess = (state = false, action) => (action.type === MANUAL_SUCCESS) ? action.payload : state;

export const manualInProgress = (state = false, action) => (action.type === MANUAL_IN_PROGRESS) ? action.payload : state;
