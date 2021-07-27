import { vkUploadPhoto } from "../../vkontakteAPI/uploadFile";
import vkApi from "../../vkontakteAPI/vkApi";
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
const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';

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
    uploadFile: false
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
                uploadData: [...state.uploadData, payload]
            }
        case SET_UPLOAD_STATUS:
            return {
                ...state,
                uploadStatus: payload
            }
        case UPDATE_UPLOAD_PROGRESS: 
            return {
                ...state,
                uploadData: [
                    ...state.uploadData.map(item => {
                        if(item.id == payload.id) return {...item, progress: payload.progress};
                        return {...item}
                    }) 
                ]
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

const updateUploadProgress = (payload) => {
    return {
        type: UPDATE_UPLOAD_PROGRESS,
        payload
    }
}

//
//THUNKS
//

//INIT
export const setInitialServData = (dispatch) => {
    const initServData = () => {
        window.VK.Auth.getLoginStatus(({status, ...rest}) => {
            const boolStatus = statusToBool(status);
            dispatch(setLoginStatus(boolStatus));

            if(!status) return;
            
            setUserName(dispatch);
        });
    }

    vkApi.init(initServData);
}

//LOGIN
export const login = (dispatch) => {
    window.VK.Auth.login(({session, status, ...rest}) => {
        console.log('rest', rest, 'sesion: ', session) ;
        if(!session) return;

        const boolStatus = statusToBool(status);
        dispatch(setLoginStatus(boolStatus));

        const firstName = session.user.first_name;
        dispatch(setNameOfLoginedUser(firstName));
    }, 4);
}   

//LOGOUT
export const logout = (dispatch) => {
    window.VK.Auth.logout(({status}) => {
        const boolStatus = statusToBool(status)
        dispatch(setLoginStatus(boolStatus));
        dispatch(setNameOfLoginedUser('unknown'))
    });
}

export const openAlbumTh = (titleAndId) => (dispatch) => {
    const id = titleAndId.split('_')[1];
    
    window.VK.Api.call('photos.get', {album_id: id, v: '5.131'}, function({response: {items}}) {  
        const photos = items.map(({id, sizes}) => {
            const img = sizes[sizes.length-1].url
            return { id, img};
        })

        dispatch(setPhotosByAlbumIdAc(photos));
    });
}

export const setPhotoAlbumDataTh = (dispatch) => {
    window.VK.Api.call('photos.getAlbums', {need_covers: '1', v: '5.131'}, ({response}) => {
        const albumsData = response.items.map(({id, title, description, size, thumb_src, updated}) => {
            const lastUpdate = getLastUpdateAlbumTime(updated);
            return {id, title, description, size, thumb_src, lastUpdate};
        })

        albumsData.reverse();

        dispatch(setPhotoAlbumDataAc(albumsData));
    });
}

export const setNavLinkTh = ({pathname=[]}) => (dispatch) => {
        const currentNavLink = pathname
        .replace(/_\d{9}/, '')
        .split(/\//)
        .filter(item => item);
        dispatch(setNavLinkAc(currentNavLink));
}

export const setModalDataTh = ({img=null, id=null, nav=false, photos=[]}) => (dispatch) => {
    // !img && dispatch(setModalDataAc({img, id}));
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
    
    dispatch(setModalDataAc({img, id}));

}

export const setUploadDataTh = (files, albumId) => (dispatch) => {         
    files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =() => {
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

export const uploadFile = (id='', albumId='', data, img='') => (dispatch) => {
    vkUploadPhoto(albumId, data);
}

//
//HELPERS
//
function statusToBool (status) {
    let statusFlag = false;
    if(status === 'connected') statusFlag = true;
    return statusFlag;
}

function setUserName (dispatch) {
    window.VK.Api.call('users.get', {v: '5.131'}, ({response}) => {
        dispatch(setNameOfLoginedUser(response[0].first_name)); 
    }); 
}

function getLastUpdateAlbumTime (previousTime) {
    const currentTime = parseInt(new Date().getTime());
    const hours = new Date(currentTime - (previousTime * 1000)).getHours();
    if ((hours / 8770) >= 1 ) return parseInt(hours / 8760) + ' years ago';
    if ((hours / 720) >= 1) return parseInt(hours / 720) +  ' months ago';
    if ((hours / 24) >= 1) return parseInt(hours / 24) + ' days ago';
    
    return hours + ' hours ago';
}

function uploadDataOnServer(files, dispatch) {
    window.VK.Api.call('photos.getUploadServer', {v: '5.131'}, ({response}) => {
        
    }); 
}



export default mainReducer;