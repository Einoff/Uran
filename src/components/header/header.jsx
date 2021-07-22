import React from 'react'
import './header.less'
import SearchForm from '../search-form/search-form'
import { useDispatch, useSelector } from 'react-redux'
import { getFbData, getLoginStatus } from '../../selectors/selectors'
import reducer, { logout } from '../../redux/reducers/reducer'

const Header = () => {
    console.log('header');
    const loginStatus = useSelector(getLoginStatus);

    const dispatch = useDispatch();

    return (
        <div className="header">
            <div className="logOut"></div>
            <SearchForm />
            {loginStatus && <div className="logout" onClick={() => {dispatch(logout)}}>Logout</div>}
        </div>
    )
}

export default Header;