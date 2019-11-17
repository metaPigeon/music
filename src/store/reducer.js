import { combineReducers } from 'redux-immutable'
import {reducer as recommendReducer } from '@/application/recommend/store'
import {reducer as singerReducer } from '@/application/singers/store'
import {reducer as rankReducer} from '@/application/rank/store'
 
export default combineReducers({
    // 之后开发具体功能模块的时候添加reducer
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer
});