import React from 'react'
import { useDispatch } from 'react-redux'
import fbAPI from '../../facebookAPI/fbInitialize'
import { login } from '../../redux/reducers/reducer'
import './login-page.less'

const LoginPage = () => {

    const dispatch = useDispatch();

    const logIn = () => {
        dispatch(login);
    }

    return (
        <div className="login-page">
            <h1 className="login-page__title">Your facebook albom photo</h1>
            <div onClick={logIn} className="login-page__btn">Login with Facebook</div>
        </div>
    )
}

export default LoginPage;