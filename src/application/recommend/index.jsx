import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Slider from '@/components/slider'
import 'swiper/css/swiper.css'
import RecommendList from '@/components/list'
import Scroll from '@/baseUI/scroll'
import styled from 'styled-components';
import * as actionTypes from './store/actionCreators'
import { forceCheck } from 'react-lazyload'
import Loading from  '@/baseUI/loading/index'

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`

function Recommend(props) {
    const { bannerList, recommendList, getBannerDataDispatch, getRecommendListDataDispatch, enterLoading} = props
    useEffect(()=>{
        if(!bannerList.size) {
            getBannerDataDispatch()
        }
        if(!recommendList.size){
            getRecommendListDataDispatch()
        }
    }, [])
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll onScroll={forceCheck} >
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
                {enterLoading ? <Loading></Loading> : null}               
            </Scroll>
        </Content>
    )
}

const mapStateToProps = (state) => {
    
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
        enterLoading: state.getIn(['recommend','enterLoading'])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList())
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend)