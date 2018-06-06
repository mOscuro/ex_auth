import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import {Spinner} from '@components/common';
import * as WOGApiClient from '@api_client/WogApiClient.js';
import LoginForm from '@components/pages/authentication/LoginForm';
import SignupForm from '@components/pages/authentication/SignupForm';
import HomePage from '@components/pages/HomePage';
import WorkoutDetail from '@components/pages/WorkoutDetail';

class App extends Component {
  constructor(){
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  userLogout(){
    WOGApiClient.authLogout()
    .on('done', (response) => {
        Actions.LoginForm();
    })
    .on('error', (error) => console.log(error));
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
      const rootProps = {clients: this.clients};
      const refreshOnBack = () => { Actions.pop({ refresh: {} }); }
      return(
        <Router>
          <Scene key='root' hideNavBar={true}>
            <Scene key='auth-pages' initial={!this.state.hasToken}>
              <Scene
                  {...rootProps}
                  component={LoginForm}
                  hideNavBar={true}
                  initial={true}
                  key='LoginForm'
                  title='Authentication'
              />
              <Scene
                  {...rootProps}
                  component={SignupForm}
                  hideNavBar={true}
                  key='SignupForm'
                  title='Sign up'
              />
            </Scene>
            <Scene key='app-pages' initial={this.state.hasToken}>
              <Scene
                  {...rootProps}
                  component={HomePage}
                  initial={true}
                  key='HomePage'
                  title='Home Page'
                  onRight={() => this.userLogout()} 
                  rightTitle='Logout'
              />
              <Scene
                  {...rootProps}
                  component={WorkoutDetail}
                  initial={false}
                  key='WorkoutDetail'
                  title='Workout Detail'
                  onBack={refreshOnBack}
              />
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
}

export default App;