import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setNavLinkTh } from '../../redux/reducers/reducer'
import { getNavLink, getUserInfo } from '../../selectors/selectors'
import './nav-panel.less'

const NavPanel = () => {
    console.log('nav-panel');
    const dispatch = useDispatch();
    
    const link = useLocation();
    const history = useHistory();

    const {name} = useSelector(getUserInfo);
    const navLink = useSelector(getNavLink);

    const goBackToAlbums = () => {
        history.push('/alboms');
    }

    useEffect(() => {
        dispatch(setNavLinkTh(link))
    }, [link])

    return (
            <div className="nav-panel">
                <div className="nav-panel__info"><span onClick={goBackToAlbums}>👇 👈 </span> {navLink[navLink.length - 1]}</div>
                <div className="nav-panel__user-info">Welcome, {name}.</div>
            </div>
    )
}

export default NavPanel;