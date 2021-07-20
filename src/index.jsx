import './index.less';
import ReactDom from 'react-dom'
import App from './components/app/app'
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import fbAPI from './facebookAPI/fbInitialize';


ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    
    document.getElementById('root')
)