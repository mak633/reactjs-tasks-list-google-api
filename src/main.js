import ReactDOM from 'react-dom';
import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import SessionActions from './actions/SessionActions';
import SessionStore from './stores/SessionStore';
import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import AboutPage from './components/AboutPage.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

window.handleGoogleApiLoaded = () => {
    api.authorize({ immediate: false })
}

window.handleGoogleApiLoaded = () => {
    SessionActions.authorize(true, renderApp);
};

function renderApp() {
  ReactDOM.render(
    <HashRouter>
      <Router>
        <MuiThemeProvider>
        <div className='App'>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={LoginPage} />
            <Route render={props => (
                SessionStore.isLoggedIn() ? (
                  <LoggedInLayout/>
                ) : (
                  <Redirect to={{
                    pathname: '/login',
                    state: { nextPathname: props.location }
                  }}/>
                )
              )}/>

        </div>
        </MuiThemeProvider>
      </Router>
    </HashRouter>,
      document.getElementById('mount-point')
  );
}
function requireAuth(nextState, replace) {
  console.log(4);
  if (!SessionStore.isLoggedIn()) {
        console.log(4);
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
