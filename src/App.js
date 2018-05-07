import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import {Spinner} from '@components/common';
import AuthClient from '@api_client/auth_client.js';
import RestClient from '@api_client/rest_client.js';
import * as WOGApiClient from '@api_client/WogApiClient.js';
import LoginForm from '@components/pages/authentication/LoginForm';
import SignupForm from '@components/pages/authentication/SignupForm';
import HomePage from '@components/pages/HomePage';
import WorkoutDetail from '@components/pages/WorkoutDetail';

class App extends Component {
  constructor(){
    super();
    this.state = { hasToken: false, isLoaded: false };
    
    // clients initialization:
    const authClient = new AuthClient();
    const restClient = new RestClient({
      apiOrigin: 'http://192.168.104.76:8085',
      getToken: authClient.getInstanceToken,
    });
    this.clients = {
      authClient,
      restClient,
    };
  }

  userLogout(){
    WOGApiClient.authLogout(this.clients.restClient)
    .then((response) => {
        this.clients.authClient.removeToken();
        Actions.LoginForm();
    }).catch((error)=>console.log(error));
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
              />
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
}

export default App;