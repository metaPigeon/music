import React, { useState, useEffect, useContext } from 'react'
import HOrizen from '@/baseUI/horizen-item/index'
import { categoryTypes } from '../../api/config';
import { alphaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style'
import { connect } from 'react-redux'
import Scroll from '@/baseUI/scroll/index.jsx'
import Loading from '../../baseUI/loading';
import {
    changePageCount, changeEnterLoading, changePullDownLoading,
    changePullUpLoading, getHotSingerList, refreshMoreHotSingerList, refreshMoreSingerList, getSingerList
} from './store/actionCreators'
import LazyLoad, {forceCheck} from 'react-lazyload'
import {Data, CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA} from './data.js'



function Singers(props) {
    // let [category, setCategory] = useState('')
    const { data, dispatch } = useContext(CategoryDataContext);
    console.log(data)
    const { category, alpha } = data&&data.toJS();
    // let [alpha, setAlpha] = useState('')

    let handleUpdateCatergory = (val) => {
        dispatch({type: CHANGE_CATEGORY, data: val})
        updateDispatch(val, alpha);
    }
    let handleUpdateAlpha = (val) => {
        dispatch({type:CHANGE_ALPHA, data: val})
        updateDispatch(category, val)
    }
    const  {singerList,enterLoading, pullDownLoading, pullUpLoading, pageCount } = props
    const  {getHotSingerDisPatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props
    // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,14,18,198,277,89,78,67,25,67].map(item => {
    //     return {
    //         picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    //         name: "隔壁老樊",
    //         accountId: 277313426,
    //     }
    // })
    const handlePullUp = () => {
        console.log('upupupup', typeof category, typeof alpha, pageCount)
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }
    const handlePullDown = () => {
        console.log(category,'pullDown')
        pullDownRefreshDispatch(category, alpha)
    }
    useEffect(() => {
        if(!singerList.size){
        getHotSingerDisPatch()
        }
    },[])
    const renderSingerList = () => {
        const list = singerList ? singerList.toJS():[]
        return (
            <List>
                {list.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                <img src={`${item.picUrl}?param=300*300`} width='100%' height="100%" alt="music" />
                                </LazyLoad>
                            </div>
                                           
                            <span className="name">{item.name}</span>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
    return (
        <div>
            <NavContainer>
                <HOrizen title={'分类(热门搜索):'} list={categoryTypes} handleClick={handleUpdateCatergory} oldVal={category}></HOrizen>
                <HOrizen title={'首字母:'} list={alphaTypes} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></HOrizen>
            </NavContainer>
            <ListContainer>
                <Scroll 
                  pullUp = {handlePullUp}
                  pullDown = {handlePullDown}
                  pullDownLoading = { pullDownLoading }
                  pullUpLoading = {pullUpLoading }
                    onScroll={forceCheck}
                  >
                    {
                        renderSingerList()
                    }
                </Scroll>
                <Loading show={enterLoading}></Loading>
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers','pullDownLoading']),
    pageCount: state.getIn(['singers','pageCount'])

})

const mapDispatchToProps = (dispatch) => ({
    getHotSingerDisPatch(){
        dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha){
        dispatch(changePageCount(0))
        dispatch(changeEnterLoading(true))
        dispatch(getSingerList(category,alpha))
    },
    pullUpRefreshDispatch(category, alpha, hot, count) {
        dispatch(changePullUpLoading(true))
        dispatch(changePageCount(count+1))
        if(hot){
            dispatch(refreshMoreHotSingerList())
        } else {
            dispatch(refreshMoreSingerList(category, alpha))
        }
    },
    pullDownRefreshDispatch(category, alpha) {
        dispatch(changePullDownLoading(true))
        dispatch(changePageCount(0))
        if(category === ''&& alpha === '') {
            dispatch(getHotSingerList())
        }else {
            dispatch(getHotSingerList(category, alpha))
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Singers)