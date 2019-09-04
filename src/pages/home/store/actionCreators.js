import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';
const changHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
});
const addHomeData = (list,nextPage) =>({
    type:constants.ADD_ARTICLE_LIST,
    list:fromJS(list),
    nextPage:nextPage
});

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get("https://www.easy-mock.com/mock/5d674179c3af751d0ff2167d/jianshu/home").then((res) => {
            const data = res.data.data;
            dispatch(changHomeData(data));
        })
    }
};

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get(`https://www.easy-mock.com/mock/5d674179c3af751d0ff2167d/jianshu/homelist?page=${page}`).then((res) => {
            const data = res.data.data;
            console.log(data);
            dispatch(addHomeData(data,page+1));
        })
    }
};

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
});