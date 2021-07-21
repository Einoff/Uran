import React from 'react'
import './search-form.less'
import loupeIcone from '../../assets/icons/loupe.svg'

const SearchForm = () => {
    return (
        <div className="search-form">
            <img src={loupeIcone} alt="" className="search-form__btn" />
            <input type="text" placeholder="search"/>
            <div className="search-form__clear-btn">
                <span>&times;</span>
            </div>
        </div>
    )
}

export default SearchForm;