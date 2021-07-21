import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenuTab } from '../../redux/reducers/reducer';
import { getActiveMenuTab } from '../../selectors/selectors';
import './tab-item.less'

const TabItem = ({icon, type}) => {

    const dispatch = useDispatch();
    const activeTab = useSelector(getActiveMenuTab);

    const onTabClick = () => {
        window.FB.api('/me?fields=user_photos,birthday', res => console.log(res));
        dispatch(setActiveMenuTab(type));
    }

    return (
        <div className={
                activeTab === type ? "tab-item activ-tab"
                : "tab-item"
             } 
             onClick={onTabClick}>
        {/* <div className="tab-item" onClick={onTabClick}> */}
            <img src={icon} alt="" />
        </div>
    )
}

export default TabItem;