import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { setActiveMenuTab } from '../../redux/reducers/reducer';
import { getActiveMenuTab } from '../../selectors/selectors';
import './tab-item.less'

const TabItem = ({icon, type}) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const activTab = useSelector(getActiveMenuTab);

    // const location = useLocation();
    
    const onTabClick = () => {
        history.push(type);
        dispatch(setActiveMenuTab(type));
    }

    return (
        <div className={
                activTab === type ? 
                "tab-item activ-tab"
                : "tab-item"}
                 onClick={onTabClick}>

            <img src={icon} alt="" />
        </div>
    )
}

export default TabItem;