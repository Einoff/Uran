import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { getModalData } from '../../selectors/selectors'
import Albums from '../albums/albums'
import Header from '../header/header'
import Modal from '../modal/modal'
import NavPanel from '../nav-panel/nav-panel'
import PhotosGallery from '../photos-gallery/photos-gallery'
import TabMenu from '../tab-menu/tab-menu'
import UploadPage from '../upload-page/upload-page'

const MainPage = () => {
    console.log('main page');

    return (
        <div className="main-page">
            <Header />
            <TabMenu />
            <NavPanel />

            <Switch>
                <Route exect path={`/upload`}>
                    <UploadPage />
                </Route>
                <Route exect path={`/albums/:id`}>
                    <PhotosGallery />
                </Route>
                <Route exect path={`/albums`}>
                    <Albums />
                </Route>
                <Route exect path={`/`}>
                    <Albums />
                </Route>

            </Switch>
        </div>
    )
}

export default MainPage;