import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Spinner} from './components/common';
import LoginForm from './components/pages/authentication/LoginForm';
import SignupForm from './components/pages/authentication/SignupForm';
import HomePage from './components/pages/HomePage';

class App extends Component {
  constructor(){
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentDidMount(){
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }
  
  render() {
    if(!this.state.isLoaded){
      return <Spinner />
    }else{
      return(
        <Router>
          <Scene key='root'>
            <Scene key='auth-pages' initial={!this.state.hasToken}>
              <Scene
                  component={LoginForm}
                  hideNavBar={true}
                  initial={true}
                  key='LoginForm'
                  title='Authentication'
              />
              <Scene
                  component={SignupForm}
                  hideNavBar={true}
                  key='SignupForm'
                  title='Sign up'
              />
            </Scene>
            <Scene key='app-pages' initial={this.state.hasToken}>
              <Scene
                  component={HomePage}
                  hideNavBar={true}
                  initial={true}
                  key='HomePage'
                  title='Home Page'
              />
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
}

export default App;