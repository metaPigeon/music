import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import Routers from './routes/index'
import { renderRoutes } from 'react-router-config'
import GlobalStyle from './style'
import { IconStyle } from './assets/iconfont/iconfont.js'
import { Provider } from 'react-redux'
import store from '@/store'
import {Data} from '@/application/singers/data.js'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
        {renderRoutes(Routers)}
        </Data>
      </Router>
    </Provider>
  );
}

export default App;
