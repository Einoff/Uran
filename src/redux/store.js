import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/reducer'

const reducer = combineReducers({mainReducer});

const store = createStore(reducer, applyMiddleware(thunk));

window.store = store;

export default store;