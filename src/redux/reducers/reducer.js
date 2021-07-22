import vkApi from "../../vkontakteAPI/vkApi";

//ACTION TYPES
const LOGIN_STATUS = 'LOGIN_STATUS';
const SET_SERV_DATA = 'SET_SERV_DATA';
const SET_ACTIVE_MENU_TAB = 'SET_ACTIVE_MENU_TAB';
const SET_NAME_OF_LOGINED_USER = 'SET_NAME_OF_LOGINED_USER';
const SET_PHOTO_ALBUMS_DATA = 'SET_PHOTO_ALBUMS_DATA';

//INITIAL STATE
const initialState = {
    loginStatus: null,
    activeMenuTab: 'album',
    userInfo: {
        name: 'unknown'
    },
    photoAlbums: []
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
        case SET_PHOTO_ALBUMS_DATA: 
            return {
                ...state,
                photoAlbums: payload
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

const setPhotoAlbumDataAc = (payload) => {
    return {
        type: SET_PHOTO_ALBUMS_DATA,
        payload
    }
}

//THUNKS

//INIT
export const setInitialServData = (dispatch) => {
    const initServData = () => {
        window.VK.Auth.getLoginStatus(({status}) => {
            const boolStatus = statusToBool(status);
            dispatch(setLoginStatus(boolStatus));

            if(!status) return;
            
            setUserName(dispatch);
            setPhotoAlbumData(dispatch);

            // window.VK.Api.call('photos.get', {album_id: '280320184', photo_sizes: '0', v: '5.131'}, function(r) {
            //     console.log(r);
            //   });
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

//HELPERS
function statusToBool (status) {
    let statusFlag = false;
    if(status === 'connected') statusFlag = true;
    return statusFlag;
}

function setPhotoAlbumData (dispatch) {
    window.VK.Api.call('photos.getAlbums', {need_covers: '1', v: '5.131'}, ({response}) => {

        const albumsData = response.items.map(({id, title, description, size, thumb_src, updated}) => {
            const timeAgo = getTimeDifference(updated);
            return {id, title, description, size, thumb_src, timeAgo}
        })

        dispatch(setPhotoAlbumDataAc(albumsData));
    });
}

function setUserName (dispatch) {
    window.VK.Api.call('users.get', {v: '5.131'}, ({response}) => {
        dispatch(setNameOfLoginedUser(response[0].first_name)); 
    }); 
}

function getTimeDifference (previousTime) {
    const currentTime = parseInt(new Date().getTime());
    const hours = new Date(currentTime - (previousTime * 1000)).getHours();
    if ((hours / 8770) >= 1 ) return parseInt(hours / 8760) + ' years ago';
    if ((hours / 720) >= 1) return parseInt(hours / 720) +  ' months ago';
    if ((hours / 24) >= 1) return parseInt(hours / 24) + ' days ago';
    
    return hours + ' hours ago';
}


export default mainReducer;

// {
//     "id": 280320184,
//     "thumb_id": 457239161,
//     "owner_id": 664916362,
//     "title": "Пятый",
//     "description": "Исчезновение Агаты Кристи (англ. The disappearance of Agatha Christie) — резонансное одиннадцатидневное отсутствие английской писательницы Агаты Кристи в декабре 1926 года. В конце 1914 года она вышла замуж за военного лётчика Арчибальда Кристи, от которого родила своего единственного ребёнка — дочь Розалинду. В 1916 году начинающая писательница закончила свой первый детективный роман «Загадочное происшествие в Стайлзе», а к середине 1920-х годов смогла утвердиться в качестве признанного автора детективов и",
//     "created": 1626903317,
//     "updated": 1626903352,
//     "size": 15,
//     "thumb_is_last": 1,
//     "privacy_view": {
//         "category": "all"
//     },
//     "privacy_comment": {
//         "category": "all"
//     },
//     "thumb_src": "https://sun9-44.userapi.com/impg/C5GiUbtHgIcJW_JwFdV2LfX2vKKksNwHAOM3-w/U90joibl2_c.jpg?size=130x55&quality=96&sign=02c29e73029d67603566e69bad646cad&c_uniq_tag=ofIVznUFZmseBPR0ziW-srATgUKUz0aJzww38JH_Kxs&type=album"
// }