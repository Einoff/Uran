import fbAPI from "../../facebookAPI/fbInitialize";

//ACTION TYPES
const LOGIN_STATUS = 'LOGIN_STATUS';

//INITIAL STATE
const initialState = {
    loginStatus: false,

}

//REDUCER
const reducerFB = (state = initialState, {type, payload}) => {
    switch(type) {
        case LOGIN_STATUS:
            return {
                ...state,
                loginStatus: payload
            }

        default: return state;
    }
}

// ACTION CREATORS
const setLoginStatusCr = (payload) => {
    return {
        type: LOGIN_STATUS,
        payload
    }
}

//THUNKS
export const setInitialLoginStatus = (dispatch) => {
    const getLoginStatus = (status) => {
        dispatch(setLoginStatusCr(status));
    }

    fbAPI.init(getLoginStatus)
}

export const setLoginStatusTh = (status) => (dispatch) => {
}



export default reducerFB;