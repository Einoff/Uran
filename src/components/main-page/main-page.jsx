import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Albums from '../albums/albums'
import Header from '../header/header'
import NavPanel from '../nav-panel/nav-panel'
import PhotosGallery from '../photos-gallery/photos-gallery'
import TabMenu from '../tab-menu/tab-menu'

const MainPage = () => {
    console.log('main page');
    return (
        <div className="main-page">
            <Header />
            <TabMenu />
            <NavPanel />

            {/* <Redirect to={`/albums`}/> */}

            <Switch>
                <Route exect path={`/albums/:id`}>
                    <PhotosGallery />
                </Route>
                <Route exect path={`/albums`}>
                    <Albums />
                </Route>
                <Route exect path={`/`}>
                    <Albums />
                </Route>
                {/* <Redirect to={`/albums`}/> */}
            </Switch>
        </div>
    )
}

export default MainPage;