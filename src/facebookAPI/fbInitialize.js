
const appId = '877538953113651';

const fbAPI = {

    init: (getLoginStatus) => {
        window.fbAsyncInit = function() {
            FB.init({
                appId,
                cookie     : true,
                xfbml      : true,
                version    : 'v11.0'
            });
    
            FB.AppEvents.logPageView(); 
            
            FB.getLoginStatus(({status}) => {
                if(status === 'not_authorized' || status === 'unknown') {
                    getLoginStatus(false);
                } else {
                    getLoginStatus(true);
                }
                
            })
        };
    
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    getLoginStatus: () => {
        if(FBData) {
             FBData.getLoginStatus(response => response);
        }
    }
}

export default fbAPI;