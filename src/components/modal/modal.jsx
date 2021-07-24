import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModalDataTh } from '../../redux/reducers/reducer';
import prevArrow from '../../assets/icons/arrow-left-w.svg'
import nextArrow from '../../assets/icons/right-arrow.svg'
import './modal.less'
import { getPhotos } from '../../selectors/selectors';

const Modal = ({modalData}) => {
    console.log('modal');

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
        </div>
    )
}

export default Modal;