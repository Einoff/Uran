import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../../redux/reducers/reducer';
import { getUploadData } from '../../../selectors/selectors';
import './uploadItem.less'

const UploadItem = ({data:{id='', img='', albumId='', progress, data}}) => {
    console.log('upload item');
    
    const dispatch = useDispatch();
    // const {progress} = useSelector(getUploadData).find(item => item.id == id);
    
    useEffect(() => {
        dispatch(uploadFile(id, albumId, data, img));
    }, [])
    
    return (
        <div key={id} className="upload__item">
            <img src={img} alt="img" />
            <div className="upload__progress" style={{right: progress + '%'}}>
            </div>
        </div>
    )
}

export default UploadItem;