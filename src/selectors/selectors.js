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
    const photoAlbums = state.mainReducer.photoAlbums;
    
    return photoAlbums.length == 0 
    ? false
    : state.mainReducer.photoAlbums
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

export const getUploadData = (state) => {
    return state.mainReducer.uploadData;
}

export const getUploadQueue = (state) => {
    return state.mainReducer.uploadQueue;
}
export const getlazyLoading = (state) => {
    return state.mainReducer.lazyLoading;
}

export const getPaginationPhotosInfo = (titleAndId) => ({mainReducer}) => {
    const id = titleAndId.split('_')[1];

    const countPhotos = mainReducer.photos.length;
    const countAlbums = mainReducer.photoAlbums.length 
    ? mainReducer.photoAlbums.find(item => item.id == id).size
    : ''

    return {countPhotos, countAlbums}
}