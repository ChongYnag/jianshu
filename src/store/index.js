import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

export default store;