import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../../redux/reducers/reducer';
import { getUploadData, getUploadQueue } from '../../../selectors/selectors';
import './uploadItem.less'

const UploadItem = ({data:{id='', img='', albumId='', data}}) => {
    const dispatch = useDispatch();
    const {queueId, progress} = useSelector(getUploadQueue);

    // useEffect(() => {
        if(!queueId) dispatch(uploadFile(id, albumId, data));
    // }, [id])

    return (
        <div key={id} className="upload__item">
            <img src={img} alt="img" />
            <div className="upload__progress" 
                style={{
                    right: (queueId == id ? 100 - progress : 100) + '%',
                    // transform: `scale(${queueId >= 90 && '0'})` 
                }}
            >
            </div>
        </div>
    )
}

export default UploadItem;