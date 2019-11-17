import {fromJS } from 'immutable'
import * as actionTypes from './constants'

const defaultStatee= fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true,
})

function reducer (state=defaultStatee, action) {
    switch(action.type) {
        case actionTypes.CHANGE_BANNER: 
          return state.set('bannerList', action.bannerList)
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.recommendList)
        case actionTypes.CHANGE_ENTER_LOADING: 
            return state.set('enterLoading', action.enterLoading)
        default: 
            return state
    }
}

export default reducer