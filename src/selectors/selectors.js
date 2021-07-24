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

export const getAlbums = (state) => {
    return state.mainReducer.photoAlbums;
}

export const getPhotos = (state) => {
    return state.mainReducer.photos;
}

export const getNavLink = (state) => {
    return state.mainReducer.navLink;
}

export const getModalData = (state) => {
    return state.mainReducer.modalData;
}