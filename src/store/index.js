import { createStore,applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducer"

// const composeEnhancers = window?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null;
const store = createStore(reducer, /* preloadedState, */ compose(
    applyMiddleware(thunk)
));

export default store;