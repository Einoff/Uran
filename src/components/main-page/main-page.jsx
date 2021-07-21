import React from 'react'
import fbAPI from '../../facebookAPI/fbInitialize'
import Header from '../header/header'
import NavPanel from '../nav-panel/nav-panel'
import TabMenu from '../tab-menu/tab-menu'

const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <TabMenu />
            <NavPanel />
        </div>
    )
}

export default MainPage;