import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setNavLinkTh } from '../../redux/reducers/reducer'
import { getNavLink, getUserInfo } from '../../selectors/selectors'
import folderImg from '../../assets/icons/folder.svg'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import './nav-panel.less'

const NavPanel = () => {
    const dispatch = useDispatch();
    
    const link = useLocation();
    const history = useHistory();

    const {name} = useSelector(getUserInfo);
    const navLink = useSelector(getNavLink);

    const goBackToAlbums = () => {
        history.push('/albums');
    }

    useEffect(() => {
        dispatch(setNavLinkTh(link))
    }, [link])

    return (
            <div className="nav-panel">
                <div className="nav-panel__info">
                    <div className="nav-panel__btns">
                        { navLink.length > 1 &&  <img src={arrowLeft} 
                                                    className="nav-panel__arrow-left" 
                                                    alt="arrowLeft" 
                                                    onClick={goBackToAlbums}/> }
                        
                        { navLink.length > 1 &&  <img src={folderImg} alt="folder" /> }
                    </div>
                                      
                    {navLink[navLink.length - 1]}
                </div>

                <div className="nav-panel__user-info">Welcome, {name}.</div>
            </div>
    )
}

export default NavPanel;