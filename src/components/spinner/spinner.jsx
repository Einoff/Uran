import React from 'react'
import spinner from '../../assets/image/spinner.svg'
import './spinner.less'

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={spinner} alt="spiner" />
        </div>
    )
}

export default Spinner;