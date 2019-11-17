import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'

function Home(props) {
    const { route } = props;
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">music</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to='/recommend' activeClassName='actived'><TabItem><span>推荐</span></TabItem></NavLink>
                <NavLink to='/singers' activeClassName='actived'><TabItem><span>歌手</span></TabItem></NavLink>
                <NavLink to='/rank' activeClassName='actived'><TabItem><span>排行榜</span></TabItem></NavLink>
            </Tab>
            {renderRoutes(route.routes)}
        </div>
    )
}
export default Home