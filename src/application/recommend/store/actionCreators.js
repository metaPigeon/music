import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest} from  '@/api/request'

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    bannerList: fromJS(data)
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    recommendList: fromJS(data)
})
export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    enterLoading: fromJS(data)
})
export const getBannerList = () => {
   return (dispatch) => {
       getBannerRequest().then( ({data}) => {
           console.log(data, 'lllll')
           dispatch(changeBannerList(data.banners))

       }).catch((err)=> {
           console.log(err,'轮播图数据错误')
       })
   }
}

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(({ data }) => {
            dispatch(changeRecommendList(data.result))
            dispatch(changeEnterLoading(false))
        }).catch(() => {
            console.log("推荐数据获取错误")
        })
    }
}