import React from 'react'
import Template from './app-template'
import IndexComponent from './index-component'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

export default () => {
    return(
        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={IndexComponent}/>
            </Route>
        </Router>
    )
}
