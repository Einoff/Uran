import { vkUploadPhoto } from "../../vkontakteAPI/uploadFile";
import VKAPI from "../../vkontakteAPI/vkApi";
const axios = require('axios');

//
//ACTION TYPES
//
const LOGIN_STATUS = 'LOGIN_STATUS';
const SET_SERV_DATA = 'SET_SERV_DATA';
const SET_ACTIVE_MENU_TAB = 'SET_ACTIVE_MENU_TAB';
const SET_NAME_OF_LOGINED_USER = 'SET_NAME_OF_LOGINED_USER';
const SET_PHOTO_ALBUMS_DATA = 'SET_PHOTO_ALBUMS_DATA';
const SET_PHOTOS_BY_ALBUM_ID = 'SET_PHOTO_DATA';
const SET_NAV_LINK = 'SET_NAV_LINK';
const SET_MODAL_DATA = 'SET_MODAL_DATA';
const SET_UPLOAD_DATA = 'SET_UPLOAD_DATA';
const SET_UPLOAD_STATUS = 'SET_UPLOAD_STATUS';
const SET_QUEUE_ID = 'SET_QUEUE_ID';
const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
const REMOVE_UPLOAD_ITEM = 'REMOVE_UPLOAD_ITEM';
const RESET_QUEUE = 'RESET_QUEUE';
const SET_LAZY_LOADING_STATUS = 'SET_LAZY_LOADING_STATUS';
const LAZY_PHOTOS_BY_ALBUM_ID = 'LAZY_PHOTOS_BY_ALBUM_ID';

//
//INITIAL STATE
//
const initialState = {
    loginStatus: null,
    activeMenuTab: '/albums',
    userInfo: {
        name: 'unknown'
    },
    photoAlbums: [],
    photos: [],
    navLink: [],
    modalData: '',
    uploadData: [],
    uploadFile: false,
    uploadQueue: {
        queueId: null,
        progress: 0
    },
    lazyLoading: false
}

//
//REDUCER
//
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
        case SET_PHOTO_ALBUMS_DATA: 
            return {
                ...state,
                photoAlbums: [...payload]
            }
        case SET_PHOTOS_BY_ALBUM_ID:
            return {
                ...state,
                photos: [...payload]
            }
        case SET_NAV_LINK:
            return {
                ...state,
                navLink: payload
            }
        case SET_MODAL_DATA: 
            return {
                ...state,
                modalData: {...payload}
            }
        case SET_UPLOAD_DATA:
            return {
                ...state,
                uploadData: [ ...state.uploadData, payload]
            }
        case SET_QUEUE_ID:
            return {
                ...state,
                uploadQueue: {
                    ...state.uploadQueue,
                    queueId: payload
                }
            }
        case UPDATE_UPLOAD_PROGRESS: 
            return {
                ...state,
                uploadQueue: {
                    ...state.uploadQueue,
                    progress: payload
                }
            }
        case REMOVE_UPLOAD_ITEM: 
            return {
                ...state,
                uploadData: state.uploadData.filter(item => item.id != payload) || []          
            }
        case RESET_QUEUE: 
            return {
                ...state,
                uploadQueue: {
                    queueId: null,
                    progress: 0
                }
            }
        case SET_LAZY_LOADING_STATUS: 
            return {
                ...state,
                lazyLoading: payload
            }
        case LAZY_PHOTOS_BY_ALBUM_ID: 
            return {
                ...state,
                photos: [...state.photos, ...payload]
            }

        default: return state;
    }
}

//
// ACTION CREATORS
//
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

const setPhotoAlbumDataAc = (payload) => {
    return {
        type: SET_PHOTO_ALBUMS_DATA,
        payload
    }
}

const setPhotosByAlbumIdAc = (payload) => {
    return {
        type: SET_PHOTOS_BY_ALBUM_ID,
        payload
    }
}

const addLazyPhotosByAlbumIdAc = (payload) => {
    return {
        type: LAZY_PHOTOS_BY_ALBUM_ID,
        payload
    }
}

export const setNavLinkAc = (payload) => {
    return {
        type: SET_NAV_LINK,
        payload
    }
}

const setModalDataAc = (payload) => {
    return {
        type: SET_MODAL_DATA,
        payload
    }
}

const setUploadDataAc = (payload) => {
    return {
        type: SET_UPLOAD_DATA,
        payload
    }
}

const setUploadStatus = (payload) => {
    return {
        type: SET_UPLOAD_STATUS,
        payload
    }
}

const setQueueIdAc = (payload) => {
    return {
        type: SET_QUEUE_ID,
        payload
    }
}

const updateUploadProgress = (payload) => {
    return {
        type: UPDATE_UPLOAD_PROGRESS,
        payload
    }
}

const removeUploadItemAC = (payload) => {
    return {
        type: REMOVE_UPLOAD_ITEM,
        payload
    }
}

const resetQueue = (payload) => {
    return {
        type: RESET_QUEUE,
        payload
    }
}

const setLazyLoadingStatusAc = (payload) => {
    return {
        type: SET_LAZY_LOADING_STATUS,
        payload
    }
}

//
//THUNKS
//

//INIT
export const setInitialServData = dispatch => {
    const initResultEvent = () => {
        // SET LOGIN STATUS
        const loginStatusRequest = status => {
            dispatch(setLoginStatus(status));
        }

        VKAPI.getLoginStatus(loginStatusRequest);  
        
        //SET USER NAME
        const getUserNameEvent = userName => {
            dispatch(setNameOfLoginedUser(userName));
        }

        VKAPI.getUserName(getUserNameEvent)
    }

    VKAPI.init(initResultEvent);
}

//LOGIN
export const login = dispatch => {
    const loginResultEvent = ({session, status, ...rest}) => {
        if(!session) throw `login error ${status}`;

        const boolStatus = statusToBool(status);
        dispatch(setLoginStatus(boolStatus));

        const firstName = session.user.first_name;
        dispatch(setNameOfLoginedUser(firstName));
    }

    VKAPI.login(loginResultEvent)
}   

//LOGOUT
export const logout = dispatch => {
    const logoutResultEvent = result => {
        const boolStatus = statusToBool(status);
        dispatch(setLoginStatus(boolStatus));
        dispatch(setNameOfLoginedUser('unknown'));
    }

    VKAPI.logout(logoutResultEvent);
}

//GET ALBUMS LIST FROM SERVER
export const setPhotoAlbumDataTh = dispatch => {
    const albumsResultEvent = albumsData => {
        dispatch(setPhotoAlbumDataAc(albumsData));
    }

    VKAPI.getAlbums(albumsResultEvent);
}

export const openAlbumTh = titleAndId => dispatch => {
    const id = titleAndId.split('_')[1];
    const photosResultEvent = photos => {
        dispatch(setPhotosByAlbumIdAc(photos));
    }

    VKAPI.getPhotosFromAlbum(photosResultEvent, id);
}

export const setNavLinkTh = ({pathname=[]}) => (dispatch) => {
        const currentNavLink = pathname
        .replace(/_\d{9}/, '')
        .split(/\//)
        .filter(item => item);
        dispatch(setNavLinkAc(currentNavLink));
}

export const setModalDataTh = ({img=null, id=null, nav=false, photos=[], likesCount, commentsCount, repostCount}) => (dispatch) => {
    
    if(nav == 'prev') {
        let current = photos.findIndex(item => item.id == id);
        
        if(current == 0) current = photos.length - 1;

        const prevPhoto = photos[current - 1];
        dispatch(setModalDataAc(prevPhoto));
        return;
    }

    if(nav == 'next') {
        let current = photos.findIndex(item => item.id == id);
        
        if(current == photos.length - 1) current = 0;

        const prevPhoto = photos[current + 1];
        dispatch(setModalDataAc(prevPhoto));
        return;
    }
    
    dispatch(setModalDataAc({img, id, likesCount, commentsCount, repostCount}));

}

export const setUploadDataTh = (files, albumId) => (dispatch) => {         
    files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const id = new Date().getTime();

            const uploadData = {
                img: reader.result,
                data: file,
                id,
                albumId ,
                progress: 100
            }           
            dispatch(setUploadDataAc(uploadData));
        }
    })
}

export const uploadFile = (id='', albumId='', data) => (dispatch) => {
    dispatch(setQueueIdAc(id));
    
    const updateUploadProgressCallback = (progressValue) => {
            dispatch(updateUploadProgress(progressValue));
    }

    const removeUploadItem = () => {
        dispatch(removeUploadItemAC(id));
        dispatch(resetQueue(null));
    }

    vkUploadPhoto(albumId, data, updateUploadProgressCallback, removeUploadItem);
}

export const setLazyLoadingStatusTh = (id, {countPhotos, countAlbums}) => (dispatch) => {
    
    //if the album is empty, abort the function. This is a !bug of reloading the page with photos.
    if(!countAlbums) return; 
    
    //if all photos are received from the server, abort the execution of the function
    if(countAlbums - countPhotos <= 0) return;

    //calculate how many photos can be uploaded from the server, the current limit is 20 photos.
    const count = countAlbums - countPhotos >= 20 
    ? 20
    : countAlbums - countPhotos;
    
    dispatch(setLazyLoadingStatusAc(true));
    
    const album_id = id.split('_')[1];
    const params = {extended: 1, album_id, count, offset: countPhotos, v: '5.131'};

    window.VK.Api.call('photos.get', params, function({response: {items}}) {  
    const params = {extended: 1, album_id, count, offset: +countPhotos + 20 , v: '5.131'};
        // const photos = items.map(({id, sizes}) => {
        //     const img = sizes[sizes.length-1].url
        //     return {id, img};
        // })

        const photos = items.map(({id, sizes, ...rest}) => {
            const likesCount = rest.likes.count;
            const commentsCount = rest.comments.count;
            const repostCount = rest.reposts.count;
            const img = sizes[sizes.length-1].url
            return {id, img, likesCount, commentsCount, repostCount};
        })
    
        dispatch(addLazyPhotosByAlbumIdAc(photos));
        dispatch(setLazyLoadingStatusAc(false));
    });
}

//
//HELPERS
//

function statusToBool (status) {
    let statusFlag = false;
    if(status === 'connected') statusFlag = true;
    return statusFlag;
}

export default mainReducer;