import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setPhotoAlbumDataTh } from '../../redux/reducers/reducer'
import { getAlbums } from '../../selectors/selectors'
import AlbumCard from '../album-card/album-card'
import Spinner from '../spinner/spinner'
import './albums.less'

const Albums = () => {
    const history = useHistory();
    const albums = useSelector(getAlbums);   
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPhotoAlbumDataTh);
        history.push('/albums');
    },[albums.lenght])
    
    if(!albums) return <Spinner/>
     
    return (
        <div className="albums-wrapp">
            <div className="albums">
                {albums.map(item => 
                    <AlbumCard data={item} key={item.id}/> 
                )}
            </div>
        </div>
    )
}

export default Albums;