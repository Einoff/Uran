import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fbAPI from '../../facebookAPI/fbInitialize'
import { setInitialLoginStatus } from '../../redux/reducers/reducer'
import { getLoginStatus } from '../../selectors/selectors'
import LoginPage from '../login-page/login-page'
import './app.less'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInitialLoginStatus);
    }, [])

    const loginStatus = useSelector(getLoginStatus);

    if(!loginStatus) return <LoginPage />
}

export default App;