import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { Router, Route, Switch } from 'react-router-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './App'
import Login from '@/pages/login/login'
import Register from '@/pages/login/register'
import QingPiFlow from '@/pages/tools/qingPiFlow'
import UploadFile from '@/pages/tools/UploadFile'
import NotFound from '@/pages/404'
import { createHashHistory } from 'history'
const history = createHashHistory()
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={App}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
        <Route path='/flow' exact component={QingPiFlow}></Route>
        <Route path='/uploadfile' exact component={UploadFile}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
