import React from 'react'
import './upload-page.less'

const UploadPage = () => {
    return (
        <div className="upload-page">
            <select name="select" value={'value1'} onChange={(e) => {console.log(e.target.value);}}>
                <option value="value1">Значение 1</option>
                <option value="value2">Значение 2</option>
                <option value="value3">Значение 3</option>
            </select>

            <div className="upload">
                <button type='button'>открыть</button>
            </div>
        </div>

        
    )
}

export default UploadPage;