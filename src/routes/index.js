import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '@/application/home/index.jsx'
import Recommend  from '@/application/recommend/index';
import Singers from '../application/singers/index';
import Rank from '../application/rank';

const Routes = [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"} />
                )
            },
            {
                path: '/recommend',
                component: Recommend,
            },
            {
                path: '/singers',
                component: Singers
            },
            {
                path: '/rank',
                component: Rank
            }
        ]
    }
]

export default Routes