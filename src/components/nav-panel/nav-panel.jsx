import React from 'react'
import { useSelector } from 'react-redux'
import { getUserInfo } from '../../selectors/selectors'
import './nav-panel.less'

const NavPanel = () => {
    
    const {name} = useSelector(getUserInfo);

    return (
            <div className="nav-panel">
                <div className="nav-panel__info">Albums</div>
                <div className="nav-panel__user-info">Welcome, {name}.</div>
            </div>
    )
}

export default NavPanel;