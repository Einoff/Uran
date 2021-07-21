import fbAPI from "../../facebookAPI/fbInitialize";
import vkApi from "../../vkontakteAPI/vkApi";

//ACTION TYPES
const LOGIN_STATUS = 'LOGIN_STATUS';
const SET_SERV_DATA = 'SET_SERV_DATA';
const SET_ACTIVE_MENU_TAB = 'SET_ACTIVE_MENU_TAB';
const SET_NAME_OF_LOGINED_USER = 'SET_NAME_OF_LOGINED_USER';

//INITIAL STATE
const initialState = {
    loginStatus: null,
    fbData: null,
    activeMenuTab: 'album',
    userInfo: {
        name: 'unknown'
    }

}

//REDUCER
const mainReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case LOGIN_STATUS:
            return {
                ...state,
                loginStatus: payload
            }
        case SET_SERV_DATA:
            return {
                ...state,
                fbData: payload
            }
        case SET_ACTIVE_MENU_TAB:
            return {
                ...state,
                activeMenuTab: payload
            }
        case SET_NAME_OF_LOGINED_USER:
            return {
                ...state,
                userInfo: {...state.userInfo, name: payload}
            }

        default: return state;
    }
}

// ACTION CREATORS
const setLoginStatus = (payload) => {
    return {
        type: LOGIN_STATUS,
        payload
    }
}

const setServData = (payload) => {
    return {
        type: SET_SERV_DATA,
        payload
    }
}

export const setActiveMenuTab = (payload) => {
    return {
        type: SET_ACTIVE_MENU_TAB,
        payload
    }
}

export const setNameOfLoginedUser = (payload) => {
    return {
        type: SET_NAME_OF_LOGINED_USER,
        payload
    }
}

//THUNKS

//INIT
export const setInitialServData = (dispatch) => {
    const initServData = async () => {
        const status = await getLoginStatus();
        dispatch(setLoginStatus(status));
    }
    vkApi.init(initServData);
}

//LOGIN
export const login = (dispatch) => {
    window.VK.Auth.login(resp => {
        resp && dispatch(setLoginStatus(true));
        const firstName = resp.session.user.first_name;
        dispatch(setNameOfLoginedUser(firstName))
    });
}

export const logout = (dispatch) => {
    window.VK.Auth.logout(resp => {
        resp && dispatch(setLoginStatus(false));
    });
}

//LOGOUT

//UTILS
function getLoginStatus() {
    window.VK.Auth.getLoginStatus(({status}) => {
        if(status === 'not_authorized' || status === 'unknown') {
            return false;
        }else {
            return true;
        }
    })

}


export default mainReducer;