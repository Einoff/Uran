import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fbAPI from '../../facebookAPI/fbInitialize'
import { setInitialServData } from '../../redux/reducers/reducer'
import { getLoginStatus } from '../../selectors/selectors'
import LoginPage from '../login-page/login-page'
import MainPage from '../main-page/main-page'
import Spinner from '../spinner/spinner'
import './app.less'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInitialServData);
    }, [])

    const loginStatus = useSelector(getLoginStatus);
    
    if(loginStatus === null) return <Spinner />
    if(loginStatus) return <MainPage />
    if(!loginStatus) return <LoginPage />
}

export default App;