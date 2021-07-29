import React from 'react'
import { useDispatch } from 'react-redux'
import fbAPI from '../../facebookAPI/fbInitialize'
import { login } from '../../redux/reducers/reducer'
import bgImage from '../../assets/image/smmbg.jpg'
import './login-page.less'

const LoginPage = () => {

    const dispatch = useDispatch();

    const logIn = () => {
        dispatch(login);
    }

    return (
        <div className="login-page" style={{backgroundImage: `url("${bgImage}")`}}>
            <h1 className="login-page__title">Your social albums</h1>
            <h1 className="login-page__descr">view and add photos from the app easily</h1>
            <div onClick={logIn} className="login-page__btn">Login with VK</div>
        </div>
    )
}

export default LoginPage;