import { KEYFOB, KEYFOB_IN_PROGRESS, KEYFOB_FAIL, KEYFOB_SUCCESS, API_URL } from '../constant';


const keyFob = payload => ({
    type: KEYFOB,
    payload
})

const keyFobInProgress = payload => ({
    type: KEYFOB_IN_PROGRESS,
    payload
})

const keyFobFail = payload => ({
    type: KEYFOB_FAIL,
    payload
})

const keyFobSuccess = payload => ({
    type: KEYFOB_SUCCESS,
    payload
})

//Reset all key fob states which help to manage animation and notify success of fail state for the request of lock or unlock
const resetKeyFob = (dispatch, lock_unlock) => {
    dispatch(keyFob(lock_unlock));
    dispatch(keyFobInProgress(true));
    dispatch(keyFobFail(false));
    dispatch(keyFobSuccess(false));
};


//wait for lock or unlock to complete
//Keep on polling until get response status 'complete'
const lockUnlockComplete = async (lock_unlock) => {
    try {
        const response = await fetch(`${API_URL}keyfob?type=${lock_unlock}`, {
            method: 'GET',
            headers: {
                'authorization': 'access_token',
            },
        });
        const data = await response.json();

        if (data && data.status !== 'complete') {
            lockUnlockComplete();
        }
    }
    catch (e) {
        console.log(e);
    }
}


//perform lock or unlock operation on lock or unlock press event
export const onPress = lock_unlock => async dispatch => {

    try {
        resetKeyFob(dispatch, lock_unlock);

        await fetch(`${API_URL}keyfob`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'access_token',
            },
            body: JSON.stringify({
                type: 'LOCK',
            })
        });

        await lockUnlockComplete(lock_unlock);
        //notify that everything goes well and request for lock or unlock gets done successfully
        dispatch(keyFobSuccess(true));
    } catch (e) {
        //notify something goes wrong and request for lock or unlock gets fail
        dispatch(keyFobFail(true));
    } finally {
        //notify request is done
        dispatch(keyFobInProgress(false));
    }
}
