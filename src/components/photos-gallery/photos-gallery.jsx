import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openAlbumTh, setModalDataTh } from '../../redux/reducers/reducer';
import { getModalData, getPhotos } from '../../selectors/selectors';
import Modal from '../modal/modal'
import './photos-gallery.less';

const PhotosGallery = () => {
    console.log('photo gallery');
    const {id} = useParams();
    const photos = useSelector(getPhotos);
    const modalData = useSelector(getModalData);

    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(openAlbumTh(id));
    }, [photos.lenght])

    // const openModal = () => {
    //     dispatch(setModalData())
    // }

    return (     
        <div className="photo-gallery">
            {photos.map(({id, img}) => {
                return (
                    <div key={id} className="photo-gallery__img" onClick={() => dispatch(setModalDataTh({img, id}))}>
                        <img src={img} alt="img" />                         
                    </div>
                )
            })} 
           { modalData.img && <Modal modalData={modalData}/>}  
        </div>
    )
}

export default PhotosGallery;