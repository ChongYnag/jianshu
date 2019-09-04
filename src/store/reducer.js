import { combineReducers } from 'redux-immutable';
import { reducer as headerRuducer } from '../components/header/store';
import { reducer as homeRuducer } from '../pages/home/store';
import { reducer as detailRuducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
    header: headerRuducer,
    home: homeRuducer,
    detail: detailRuducer,
    login: loginReducer
})

export default reducer;