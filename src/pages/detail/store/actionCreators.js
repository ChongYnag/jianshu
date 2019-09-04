import axios from 'axios';
import * as constants from './constants';

const changeDetail = (title, content) => ({
	type: constants.CHANGE_DETAIL,
	title,
	content
});

export const getDetail = (id) => {
	return (dispatch) => {
		axios.get('https://www.easy-mock.com/mock/5d674179c3af751d0ff2167d/jianshu/detail?id=' + id).then((res) => {
            const result = res.data.data;
            console.log(result);
			dispatch(changeDetail(result.title, result.content));
		}).catch(() => {
			
		})
	}
};