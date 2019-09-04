import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";
import { actionCreators } from '../store';
import { ListItem, ListInfo, LoadMore } from '../style';
import { Link } from 'react-router-dom';

class List extends PureComponent {
    render() {
        const { articleList, getMoreList, page } = this.props;
        return (
            <Fragment>
                {
                    articleList.map((item, index) => {
                        return <Link key={index} to={'/detail/' + item.get('id')}>
                            <ListItem key={index} >
                                <img className='pic' src={item.get('imgUrl')} />
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc'>{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    })
                }
                <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(["home", "articleList"]),
    page: state.getIn(["home", "articlePage"])
});

const mapStateToDispatch = (dispatch) => ({
    getMoreList(page) {
        dispatch(actionCreators.getMoreList(page))
    }
});

export default connect(mapStateToProps, mapStateToDispatch)(List);