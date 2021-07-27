import axios from "axios";

export const vkUploadPhoto = (albumId, data) => {
    const formData = new FormData();
    formData.append('file', data);

    //GET UPLOAD URL 
    window.VK.Api.call('photos.getUploadServer', {album_id: albumId, v: '5.131'}, ({response}) => {

            formData.append('url', response.upload_url); 

            uploadFileOnServer(formData, albumId);

     
    }); 
}


//UPLOAD FILE TO THE SERVER
const uploadFileOnServer = (data, albumId) => {

    if(!data) return;
    const url = 'http://einov.beget.tech/vk.php';

    const options = {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: (progressEvent) => {
            const uploadPercentage = parseInt(Math.round(( progressEvent.loaded / progressEvent.total) * 100));
            console.log('progress: ', uploadPercentage);
        }
    }
    
    axios.post(url, data, options)
    .then(res => {
        console.log('res axios: ', res.data);
        savePhoto(res.data, albumId);

    })
}

//SAVE THE PHOTO ON THE SERVER
const savePhoto = ({server, photos_list, hash}, albumId) => {
    const param = {album_id:albumId, server, photos_list, hash, v: '5.131'};
    window.VK.Api.call('photos.save', param, ({response}) => {
        console.log('savePhoto', response);
    })
}



