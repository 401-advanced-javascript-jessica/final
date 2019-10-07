import {createStore, applyMiddleware} from "redux";
import mainReducer from './reducers/main-reducer';
import {composeWithDevTools} from "redux-devtools-extension";

export default () => {
    return createStore(mainReducer, composeWithDevTools(
        applyMiddleware()
    ));
};