import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AboutPage from './AboutPage.jsx';
import TasklistsPage from './TasklistsPage.jsx';
import './LoggedInLayout.less';

export default class LoggedInLayout extends React.Component{
    render() {
        return (
            <div className='LoggedInLayout'>
                <div className='LoggedInLayout__content'>
                      <Route path='/about' component={AboutPage} />
                      <Route path='/lists' component={TasklistsPage} />
                </div>
            </div>
        );
    }
};
