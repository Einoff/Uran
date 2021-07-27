import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoAlbumDataTh, setUploadDataTh } from '../../redux/reducers/reducer';
import { getAlbums, getUploadData } from '../../selectors/selectors';
import Spinner from '../spinner/spinner'
import './upload-page.less'
import UploadItem from './uploadItem/uploadItem';

const UploadPage = () => {
    console.log('upload page');

    const inputFileRef = useRef(null);

    const albums = useSelector(getAlbums);
    const uploadData = useSelector(getUploadData);
    
    const [photoAlbumId, setphotoAlbumId] = useState('');
    
    const dispatch = useDispatch();

    useEffect(() => {
        //set initial value for select
        albums && setphotoAlbumId(albums[0]);
    }, [albums.length])

    if(!albums) {
        dispatch(setPhotoAlbumDataTh);
        return <Spinner />;
    }  

    const openUpload = () => {
        inputFileRef.current.click();
    }

    const inputFileHandler = (e) => {
        const files = Array.from(e.target.files);
        dispatch(setUploadDataTh(files, photoAlbumId.id));
    }

    return (
        <div className="upload-page">
            <div className="upload-page__select-title">Select album</div>

            <select className="upload-page__select" 
                    disabled={!!uploadData.length}
                    name="select" 
                    value={photoAlbumId.id} 
                    onChange={(e) => {setphotoAlbumId(e.target.value)}}>
                {albums.map(({id, title}) => <option key={id} value={id}>{title}</option>)}
            </select>

            <div className="upload">
               
                <div className="upload__items">
                    {uploadData.map(data => <UploadItem data={data}/>)}
                </div>
                
                <input  ref={inputFileRef} 
                        multiple type="file" 
                        onChange={inputFileHandler}
                        accept=".png, .jpg, .jpeg, .gif"
                />

                {!uploadData.length && 
                    <div className="upload__descr">
                        Drop files here or <span onClick={openUpload}>browse</span> to upload
                    </div>
                }
                
            </div>
        </div>    
    )
}

export default UploadPage;