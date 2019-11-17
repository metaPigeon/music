import * as actionTypes from './constants'
import { fromJS } from 'immutable';
import { getHotSingerListRequest, getSingerListRequest }  from '@/api/request.js'

const changeSingerList = (data) => {
  return {
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
  }
}

export const changePageCount = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
})

export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
})

export const getHotSingerList = () =>{
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.data.artists;
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    })
  }
}

export const refreshMoreHotSingerList = () => {
  return (dispatch,getState) => {
     const pageCount = getState().getIn(['singers','pageCount'])
     const singers = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount).then(res => {
          const singerList = [...singers, ...res.data.artists]
          dispatch(changeSingerList(singerList))
          dispatch(changePullUpLoading(false))
     }).catch((err) => {
       console.log(err,'获取更多热门歌手失败')
     })
  }
}

export const getSingerList = (catergory, alpha) => {
  return (dispatch,getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    getSingerListRequest(catergory, alpha, pageCount).then((res) => {
      const data = res.data.artists;
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch((err) => {
      console.log(err, '歌手数据获取失败')
    })
  }
}

export const refreshMoreSingerList= (catergory, alpha) => {
   return (dispatch, getState) => {
     const pageCount = getState().getIn(['singers', 'pageCount'])
     const singerList = getState().getIn(['singers', 'singerList']).toJS()
     console.log(alpha,'2222')
     getSingerListRequest(catergory, alpha, pageCount).then(res => {
       const data = [...singerList, ...res.data.artists]
       dispatch(changeSingerList(data))
       dispatch(changePullUpLoading(false));
     }).then(err => {
       console.log(err, '获取更多歌手失败')
     })

   }
}