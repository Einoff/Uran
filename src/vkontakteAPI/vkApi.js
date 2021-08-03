const AppId = '7908036';

const vkApi2_0 = {
  //INIT
  init: () => {
    const response = new Promise(resolve => {
      window.vkAsyncInit = () => {
        VK.init({
          apiId: AppId
        });
        resolve();
      };
    });

    setTimeout(function() {
      var el = document.createElement("script");
      el.type = "text/javascript";
      el.src = "https://vk.com/js/api/openapi.js?169";
      el.async = true;
      document.getElementById("vk_api_transport").appendChild(el);
    }, 0);

    return response
  },

  // GET LOGIN STATUS
  getLoginStatus: () => {
    return new Promise(resolve => {
      window.VK.Auth.getLoginStatus(({status}) => {
        resolve(status);
      });
    })
  },

  //LOGIN
  login: () => {
      return new Promise (resolve => {
        window.VK.Auth.login(result => {
          resolve(result)
        }, 4);
      })
  },

  //LOGOUT
  logout: () => {
    return new Promise (resolve => {
      window.VK.Auth.logout((result) => {
        resolve(result)
      });
    })
  },

  //GET PHOTOS
  getPhotosFromAlbum: (id) => {
    return new Promise(resolve => {
      window.VK.Api.call('photos.get', {extended: 1, album_id: id, count: 20, v: '5.131'}, function({response: {items}}) {  
        const photos = items.map(({id, sizes, ...rest}) => {
            const likesCount = rest.likes.count;
            const commentsCount = rest.comments.count;
            const repostCount = rest.reposts.count;
            const img = sizes[sizes.length-1].url;
            return {id, img, likesCount, commentsCount, repostCount};
        })
  
       resolve(photos);
      });
    })
  },

  //GET ALBUMS
  getAlbums: () => {
    return new Promise(resolve => {
      window.VK.Api.call('photos.getAlbums', {need_covers: '1', v: '5.131'}, ({response}) => {
        const albumsData = response.items.map(({id, title, description, size, thumb_src, updated}) => {
            const lastUpdate = getLastUpdateAlbumTime(updated);
            return {id, title, description, size, thumb_src, lastUpdate};
        });
  
        albumsData.reverse();
  
        resolve(albumsData);
      })
    })
  },

  //GET USER NAME
  getUserName: () => {
    return new Promise(resolve => {
      window.VK.Api.call('users.get', {v: '5.131'}, ({response}) => {
        resolve(response[0].first_name);
      }); 
    })
  },
}

//UTILE
function getLastUpdateAlbumTime (previousTime) {
  const currentTime = parseInt(new Date().getTime());
  const hours = new Date(currentTime - (previousTime * 1000)).getHours();
  if ((hours / 8770) >= 1 ) return parseInt(hours / 8760) + ' years ago';
  if ((hours / 720) >= 1) return parseInt(hours / 720) +  ' months ago';
  if ((hours / 24) >= 1) return parseInt(hours / 24) + ' days ago';
  
  return hours + ' hours ago';
}



export default vkApi2_0;