import React from 'react'
import TabItem from '../tab-item/tab-item';
import imageIcone from '../../assets/icons/image.svg'
import './tab-menu.less'
import pageLinks from '../../config/config';
import { Link } from 'react-router-dom';


const TabMenu = () => {
    
    const tabs = pageLinks.map(({link, img}) => {
        return (
            // <Link to={link} key={link}>
                <TabItem key={link} icon={img} type={link} />
            // </Link> 
        )
    })

    return (
        <div className="tab-menu">
            {tabs}
        </div>
    )


}

export default TabMenu;