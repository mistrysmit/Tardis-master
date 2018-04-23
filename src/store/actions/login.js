import {LOGIN,LOGIN_IN_PROGRESS,LOGIN_FAIL,API_URL} from '../constant';
import { AsyncStorage } from 'react-native';



export const login = payload => ({
    type:LOGIN,
    payload
});

const loginInProgress = payload => (
    {
        type:LOGIN_IN_PROGRESS,
        payload
    }
)

const loginFail = payload => (
    {
        type:LOGIN_FAIL,
        payload
    }
)


//reset all login flags to initial state
const resetLogin = (dispatch) => {
    dispatch(loginFail(false));
    dispatch(loginInProgress(true));
};

//perform on press task for login 
export const onPress = (username, password) => async dispatch => {
    //username get username from login form
    //password get password from login form

    //auth token to perform initial login request
    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc';
    resetLogin(dispatch);

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
            },
            body: authToken,
        });

        const data = await response.text();

        //setup received auth token to local storage of device
        //which use to verify is user is logged in or not 
        await AsyncStorage.setItem('Auth-Token', data);

        dispatch(login(data));

    } catch (e) {
        //notify if something goes wrong and login request fails
        dispatch(loginFail(true));
    } finally {
        //notify that login process completed
        dispatch(loginInProgress(false));
    }

}


