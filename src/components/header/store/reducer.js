import * as actionTyps from './constants';
import { fromJS } from 'immutable';
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1,
});

export default (state = defaultState, action) => {
    // const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTyps.SEARCH_FOCUS:
            // newState.focused = true;
            return state.set("focused", true);
        case actionTyps.SEARCH_BLUR:
            // newState.focused = false;
            return state.set("focused", false);
        case actionTyps.INIT_LIST:
            // newState.focused = false;
            console.log(action);
            // return state.set("list", fromJS(action.data)).set("totalPage", action.totalPage);
            return state.merge({
                list:fromJS(action.data),
                totalPage:action.totalPage
            })
        case actionTyps.MOUSE_ENTER:
            return state.set("mouseIn", true);
        case actionTyps.MOUSE_LEAVE:
            return state.set("mouseIn", false);
        case actionTyps.CHANGE_PAGE:
            return state.set("page", action.page);
        default:
            return state;
    }
}