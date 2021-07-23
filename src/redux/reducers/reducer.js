import vkApi from "../../vkontakteAPI/vkApi";

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

//
//INITIAL STATE
//
const initialState = {
    loginStatus: null,
    activeMenuTab: 'album',
    userInfo: {
        name: 'unknown'
    },
    photoAlbums: [],
    photos: [],
    navLink: [],
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

//
//THUNKS
//

//INIT
export const setInitialServData = (dispatch) => {
    const initServData = () => {
        window.VK.Auth.getLoginStatus(({status}) => {
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
    window.VK.Auth.login(({session, status}) => {
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


export default mainReducer;

// {
//     "album_id": 280320184,
//     "date": 1626903328,
//     "id": 457239147,
//     "owner_id": 664916362,
//     "has_tags": false,
//     "sizes": [
//         {
//             "height": 74,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=130x74&quality=96&sign=687b461499ae663a960a005e3735c4d0&c_uniq_tag=YVc5m1C_CE5p82HbNyLYLTpeHOkHI71dieY5acCHMVg&type=album",
//             "type": "m",
//             "width": 130
//         },
//         {
//             "height": 87,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=130x87&quality=96&crop=102,0,1125,753&sign=26e2191c5fb43e53e862dda7a580077c&c_uniq_tag=Y32oOlsBO4amquQE8TCGXSinrw9ytjh63kM2z0oT5hY&type=album",
//             "type": "o",
//             "width": 130
//         },
//         {
//             "height": 133,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=200x133&quality=96&crop=98,0,1132,753&sign=60a4e178910f84ce99a24dd3493d98c3&c_uniq_tag=5CU64Hy9k2xL1uIFF06O0TQAyyICMcHiNpttd2_joRs&type=album",
//             "type": "p",
//             "width": 200
//         },
//         {
//             "height": 213,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=320x213&quality=96&crop=99,0,1131,753&sign=69ef1749abb0e09135843bccf0643f16&c_uniq_tag=QOghoRLlyTls84W-Ev6NJf0HNsNqYnGdmvm3nvYMNpA&type=album",
//             "type": "q",
//             "width": 320
//         },
//         {
//             "height": 340,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=510x340&quality=96&crop=100,0,1129,753&sign=811a5847ce61b5f8721c42c2a395bcfc&c_uniq_tag=9Z5QAyuy1OaNDOqGehJYXuOhwzI5gsyb3UyGS7dJC0M&type=album",
//             "type": "r",
//             "width": 510
//         },
//         {
//             "height": 43,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=75x42&quality=96&sign=7ee9bcbff38fc475301b5113340cb7f8&c_uniq_tag=4oD65S-bIs9Oqs5j0EE8LtWNl1vF4UKvsuR56bW92gA&type=album",
//             "type": "s",
//             "width": 75
//         },
//         {
//             "height": 753,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=1329x753&quality=96&sign=f4670524e9dcc046ce51315fd4767130&c_uniq_tag=zkSMJ3-YSMXBQQtNEQmPcr7fPNMMo5BobKJIZkDBU1Y&type=album",
//             "type": "w",
//             "width": 1329
//         },
//         {
//             "height": 342,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=604x342&quality=96&sign=aa96143a506fedb8c2477327b5c5258d&c_uniq_tag=aNxQ2ort6ucetKcUi14FnT5-abT1hqbh2Af-XN0rFcQ&type=album",
//             "type": "x",
//             "width": 604
//         },
//         {
//             "height": 457,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=807x457&quality=96&sign=38fcaf271cae3817646b29ba2e890bfd&c_uniq_tag=Mn2ms0LKICSx0VuVC0atyKTOC3b94tec1jRFBhWEq_M&type=album",
//             "type": "y",
//             "width": 807
//         },
//         {
//             "height": 725,
//             "url": "https://sun9-62.userapi.com/impg/IiLw0gBCnZaF2UkR_gEOeJfXQ74KxrPDSfxJJQ/frL7QMZLaWQ.jpg?size=1280x725&quality=96&sign=3440def9ff715d17078c71bf7ebc3874&c_uniq_tag=D5-NvNVKUDtuJKb91zI1AErixNbIghTnJa9MR41od4E&type=album",
//             "type": "z",
//             "width": 1280
//         }
//     ],
//     "text": ""
// }