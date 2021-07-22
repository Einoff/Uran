import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import fbAPI from '../../facebookAPI/fbInitialize'
import Albums from '../albums/albums'
import Header from '../header/header'
import NavPanel from '../nav-panel/nav-panel'
import TabMenu from '../tab-menu/tab-menu'

const MainPage = () => {
    console.log('main page');
    return (
        <div className="main-page">
            <Header />
            <TabMenu />
            <NavPanel />
            
            <Redirect to={`/albums`}/>
            
            <Switch>
                <Route path={`/albums`}>
                    <Albums />
                </Route>
            </Switch>
           
        </div>
    )
}

export default MainPage;