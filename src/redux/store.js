import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerFB from './reducers/reducer'

const reducer = combineReducers({reducerFB});

const store = createStore(reducer, applyMiddleware(thunk));

window.store = store;

export default store;