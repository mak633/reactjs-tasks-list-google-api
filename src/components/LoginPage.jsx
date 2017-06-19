import React from 'react';
import SessionStore from '../stores/SessionStore';

import SessionActions from '../actions/SessionActions'
import RaisedButton from 'material-ui/RaisedButton';
import './LoginPage.less';
const PropTypes = require('prop-types');

function getStateFromFlux() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    };
}
export default class LoginPage extends React.Component{

   constructor(props) {
     super(props);
     this.state = getStateFromFlux()
     this._onChange = this._onChange.bind(this);

   }
   componentDidMount() {
      SessionStore.addChangeListener(this._onChange);
    }
    componentWillUpdate(nextProps, nextState) {
       if (nextState.isLoggedIn) {
         const { location } = this.props

         if (location.state && location.state.nextPathname) {
             this.context.router.history.replace(location.state.nextPathname);
         } else {
             this.context.router.history.replace('/lists');
         }
       }
   }
   componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange);
    }

  handleLogIn(){
    SessionActions.authorize();
  }
  render() {
        return (
          <div className="LoginPage">
            <div className="LoginPage__banner">
              <div className="LoginPage__text">
                <h1>Almost Google tasks</h1>
                <p>Organis your life!</p>
                <RaisedButton
                  className="login-button"
                  label="Log in With Google"
                  onClick={() => this.handleLogIn()} />
              </div>
              <img
                src="/img/desk.png"
                className='LoginPage__image'/>
            </div>
          </div>
        )
  }
  _onChange() {
        this.setState(getStateFromFlux());
  }

}
LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};
