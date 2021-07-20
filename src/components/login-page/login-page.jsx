import React from 'react'
import fbAPI from '../../facebookAPI/fbInitialize'
import './login-page.less'

const LoginPage = () => {

    const logIn = () => {
        console.log(window.FB);
        window.FB.login(function(response) {
            // handle the response
          }, {scope: 'public_profile,email'});
    }

    return (
        <div className="login-page">
            <h1 className="login-page__title">Your facebook albom photo</h1>
            <div onClick={logIn} className="login-page__btn">Login with Facebook</div>
        </div>
    )
}

export default LoginPage;