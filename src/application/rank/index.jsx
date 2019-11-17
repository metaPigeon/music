import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store'
import { filterIndex } from  '@/api/utils.js'
import {List, Container, ListItem, SongList} from './style'
import Scroll from '@/baseUI/scroll/index'
 
function Rank(props) {
  const {rankList:list, loading } = props
  const {getRankListDataDispatch} = props

  let rankList = list?list.toJS() : []
  useEffect(() => {
    getRankListDataDispatch()
  }, [])
   let globalStartIndex = filterIndex(rankList)
   console.log(globalStartIndex,'kk')
  let officalList = rankList.slice(0,globalStartIndex)
  let globalList  = rankList.slice(globalStartIndex)
  const enterDetail = (e) => {
    console.log(e)
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item, index) => (
            <ListItem key={`${item.coverImgId}${index}`} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy"></span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          ))
        }
      </List>
    )
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item,index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second} </li>
          })
        }
      </SongList>
    ) : null
  }
  let displayStyle = loading ? { display: 'none' } : { display: '' }
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
            { renderRankList(officalList)}
          <h1 className='global'>全球版</h1>
            {renderRankList(globalList,true)}
        </div>
      </Scroll>
      {/* {renderRoutes(props.route.routes)} */}
    </Container>
  ) 
}


const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank','rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch()  {
      dispatch(getRankList())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rank)