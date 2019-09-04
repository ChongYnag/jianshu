import React, { Component } from "react";
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button
} from "./style";

class header extends Component {

    getareaList = () => {
        const { focused, list, page, totalPage, mouseIn, handleOnMouseEnter, handleOnMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];
        let dom = null;
        if (newList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if (focused || mouseIn) {
            dom = (<SearchInfo
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            >
                <SearchInfoTitle>热门搜索
                <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                        <i ref={(icon) => { this.spinIcon = icon }} className="iconfont spin">&#xe851;</i>
                        换一批
                </SearchInfoSwitch>
                </SearchInfoTitle>
                <SearchInfoList>
                    {
                        pageList
                    }
                </SearchInfoList>
            </SearchInfo>);
        }
        return dom;
    };

    render() {
        const { focused, handleFocus, handleBlur, list,login, logout } = this.props;
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    {
						login ? 
							<NavItem onClick={logout} className='right'>退出</NavItem> : 
							<Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
					}
                    <NavItem className="right"><i className="iconfont">&#xe636;</i></NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? "focused" : ""}
                                onFocus={() => handleFocus(list)}
                                onBlur={handleBlur}
                            ></NavSearch>
                        </CSSTransition>
                        <i className={focused ? "focused iconfont zoom" : "iconfont zoom"}>&#xe614;</i>
                        {
                            this.getareaList()
                        }

                    </SearchWrapper>
                </Nav>
                <Addition>
                <Link to='/write'>
						<Button className='writting'>
							<i className="iconfont">&#xe615;</i>
							写文章
						</Button>
					</Link>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        // focused: state.get('header').get("focused")
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login'])
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        handleFocus(list) {
            console.log(list);
            list.size === 0 && dispatch(actionCreators.getSearchList());
            dispatch(actionCreators.searchFocus());
        },
        handleBlur() {
            dispatch(actionCreators.searchBlur());

        },
        handleOnMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleOnMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = `rotate(${originAngle + 360}deg)`;
            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1));
            } else {
                dispatch(actionCreators.changePage(1));
            }
        },
        logout() {
			dispatch(loginActionCreators.logout())
		}
    }
}

export default connect(mapStateToProps, mapDispathToProps)(header);
