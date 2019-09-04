import * as actionTyps from './constants';
import axios from 'axios';

const changeList = (data) => ({
    type: actionTyps.INIT_LIST,
    data: data,
    totalPage: Math.ceil(data.length / 10)
});

export const searchFocus = () => ({
    type: actionTyps.SEARCH_FOCUS,
});

export const searchBlur = () => ({
    type: actionTyps.SEARCH_BLUR,
});

export const mouseEnter = () => ({
    type: actionTyps.MOUSE_ENTER,
});

export const mouseLeave = () => ({
    type: actionTyps.MOUSE_LEAVE,
});

export const changePage = (page) => ({
    type: actionTyps.CHANGE_PAGE,
    page
});

export const getSearchList = () => {
    return (dispatch) => {
        axios.get(" https://www.easy-mock.com/mock/5d674179c3af751d0ff2167d/jianshu/headerlist").then((res) => {
            const data = res.data.data;
            dispatch(changeList(data))
        }).catch((err) => {
            console.log(err);
        })
    }
}