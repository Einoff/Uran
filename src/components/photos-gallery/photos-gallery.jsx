import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openAlbumTh } from '../../redux/reducers/reducer';
import { getPhotos } from '../../selectors/selectors';
import './photos-gallery.less';

const PhotosGallery = () => {
    console.log('photo gallery');
    const {id} = useParams();
    const photos = useSelector(getPhotos);

    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(openAlbumTh(id));
    }, [photos.lenght])

    return (     
        <div className="photo-gallery">
            {photos.map(({id, img}) => {
                return (
                    <div key={id} className="photo-gallery__img">
                        <img src={img} alt="img" />
                    </div>
                )
            }
                
            )}
        </div>
    )
}

export default PhotosGallery;