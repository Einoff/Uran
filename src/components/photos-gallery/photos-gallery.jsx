import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openAlbumTh, setLazyLoadingStatusTh, setModalDataTh } from '../../redux/reducers/reducer';
import { getlazyLoading, getModalData, getPaginationPhotosInfo, getPhotos } from '../../selectors/selectors';
import Modal from '../modal/modal'
import Spinner from '../spinner/spinner';
import './photos-gallery.less';
import likesIcon from '../../assets/icons/heart.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share.svg'

const PhotosGallery = () => {
    const {id} = useParams();
    const photos = useSelector(getPhotos);
    const modalData = useSelector(getModalData);
    const isLazyLoading = useSelector(getlazyLoading);
    const paginationInfo = useSelector(getPaginationPhotosInfo(id));
    

    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(openAlbumTh(id));
    }, [photos.lenght])

    // const openModal = () => {
    //     dispatch(setModalData())
    // }

    const uploadMorePhoto = ({target}) => {  
        const {countAlbums, countPhotos} = paginationInfo;
        //if all photos are received from the server, abort the execution of the function
        if(countAlbums - countPhotos <= 0) return;
        
        const {scrollHeight, clientHeight, scrollTop} = target;
        if(!isLazyLoading && (scrollTop + clientHeight) > (scrollHeight - 50)) {
            dispatch(setLazyLoadingStatusTh(id, paginationInfo));
        }       
    }

    return (     
        <div className="photo-gallery" onScroll={uploadMorePhoto}>
            {photos.map(({id, img, likesCount, commentsCount, repostCount}) => {
                return (
                    <div key={id} className="photo-gallery__img" onClick={() => dispatch(setModalDataTh({img, id, likesCount, commentsCount, repostCount}))}>
                        <img src={img} alt="img" />  
                        <div className="photo-gallery__info">
                            <div className="info__likes info-icon">
                                <img src={likesIcon} alt="likes" />
                                <span>{likesCount}</span>
                            </div>
                            <div className="info__comments info-icon">
                                <img src={commentIcon} alt="comments" />
                                <span>{commentsCount}</span>
                            </div>
                            <div className="info__share info-icon">
                                <img src={shareIcon} alt="share" />
                                <span>{repostCount}</span>
                            </div>
                        </div>                         
                    </div>
                )
            })} 
           { modalData.img && <Modal modalData={modalData}/>} 
           {isLazyLoading && <Spinner />} 
        </div>
    )
}

export default PhotosGallery;