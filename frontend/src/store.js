// client/src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
