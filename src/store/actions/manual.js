import { MANUAL, MANUAL_IN_PROGRESS, MANUAL_FAIL, MANUAL_SUCCESS, API_URL } from '../constant';
const manual = payload => ({
    type: MANUAL,
    payload
})

const manualInProgress = payload => ({
    type: MANUAL_IN_PROGRESS,
    payload
})

const manualFail = payload => ({
    type: MANUAL_FAIL,
    payload
})

const manualSuccess = payload => ({
    type: MANUAL_SUCCESS,
    payload
})

// Reset all manual flags to initial state
const resetManual = dispatch => {
    dispatch(manualInProgress(true));
    dispatch(manualFail(false));
    dispatch(manualSuccess(false));
}

export const loadManual = () => async dispatch => {
    try {
        resetManual(dispatch);
        const data = await fetch(`${API_URL}manual/index.json`);
        const jsonData = await data.json();
        dispatch(manual(jsonData));
        dispatch(manualSuccess(true));
    } catch (e) {
        dispatch(manualFail(true));
    } finally {
        dispatch(manualInProgress(false));
    }


}