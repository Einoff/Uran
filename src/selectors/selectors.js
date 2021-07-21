export const getLoginStatus = (state) => {
    return state.mainReducer.loginStatus;
}

export const getActiveMenuTab = (state) => {
    return state.mainReducer.activeMenuTab;
}

export const getUserInfo = (state) => {
    return state.mainReducer.userInfo;
}
export const getFbData = (state) => {
    return state.mainReducer.servData;
}