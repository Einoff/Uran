import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openAlbumTh } from '../../redux/reducers/reducer';
import './album-card.less'

const AlbumCard = ({data}) => {
    const {id, title, description, size, thumb_src, lastUpdate} = data;
    const history = useHistory();
    
    const openAlbum = () => {
        history.push('/albums/' + title + '_' + id);
    }

    return (
        <div className="album-card" onClick={openAlbum}>
            <div className="album-card__img">
                <img src={thumb_src} alt="userpic" />
            </div>
            <div className="album-card__info">
                <div className="album-card__title">{title}</div>
                <div className="album-card__files">{size} files</div>
                <div className="album-card__last-udate">{lastUpdate}</div>
            </div>
        </div>
    )
}

export default AlbumCard;