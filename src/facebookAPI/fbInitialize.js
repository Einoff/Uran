
const appId = '346168630339909';

const getLoginStatus = (FB, setInitFbData) => {
    FB.getLoginStatus(({status}) => {
        if(status === 'not_authorized' || status === 'unknown') {
            setInitFbData(
                {
                    status: false,
                    fbData: FB
                }
            );
        } else {
            setInitFbData(
                {
                    status: true,
                    fbData: FB
                }
            );
        }
    })
}

const fbAPI = {
    init: (setInitFbData) => {
        
        window.fbAsyncInit = function() {
            FB.init({
                appId,
                cookie     : true,
                xfbml      : true,
                version    : 'v11.0'
            });

            getLoginStatus(FB, setInitFbData);
        };
    
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    getLoginStatus
}

export default fbAPI;