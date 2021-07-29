import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalDataTh } from '../../redux/reducers/reducer'
import prevArrow from '../../assets/icons/arrow-left-w.svg'
import nextArrow from '../../assets/icons/right-arrow.svg'
import infoIcon from '../../assets/icons/info.svg'
import './modal.less'
import { getPhotos } from '../../selectors/selectors'
import likesIcon from '../../assets/icons/heart.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share.svg'

const Modal = ({modalData}) => {
    
    const dispatch = useDispatch();
    const photos = useSelector(getPhotos)

    const closeModal = (e) => {
        e.target.dataset.close && dispatch(setModalDataTh({img: false}));
    }

    const prevPhoto = () => {
        dispatch(setModalDataTh({nav: 'prev', photos, ...modalData}));
    }

    const nextPhoto = () => {
        dispatch(setModalDataTh({nav: 'next', photos, ...modalData}));
    }

    return (
        <div className="modal" data-close={true} onClick={closeModal}>
            <div className="modal__close" data-close={true}>✘</div>
                <div className="modal__prev" onClick={prevPhoto}>
                    <img src={prevArrow} alt="prev" />
                </div>
                <div className="modal__next" onClick={nextPhoto}>
                    <img src={nextArrow} alt="next" />
                </div>
            <div className="modal__content">
                <img src={modalData.img} alt="image" onClick={(e) => {e.stopPropagation()}}/>
                
            </div>
            <div className="modal__content-info">
                <div className="info__btn">
                    <img src={infoIcon} alt="info" />
                </div>
                <div className="info__content">
                            <div className="info-icon">
                                <img src={likesIcon} alt="likes" />
                                <span>{modalData.likesCount}</span>
                            </div>
                            <div className="info-icon">
                                <img src={commentIcon} alt="comments" />
                                <span>{modalData.commentsCount}</span>
                            </div>
                            <div className="info-icon">
                                <img src={shareIcon} alt="share" />
                                <span>{modalData.repostCount}</span>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;