import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Spinner} from 'ex_auth/src/components/common';
import AuthClient from 'ex_auth/src/api_client/auth_client.js';
import RestClient from 'ex_auth/src/api_client/rest_client.js';
import LoginForm from 'ex_auth/src/components/pages/authentication/LoginForm';
import SignupForm from 'ex_auth/src/components/pages/authentication/SignupForm';
import HomePage from 'ex_auth/src/components/pages/HomePage';
import WorkoutDetail from 'ex_auth/src/components/pages/WorkoutDetail';

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
          <Scene key='root'>
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
                  hideNavBar={true}
                  initial={true}
                  key='HomePage'
                  title='Home Page'
              />
              <Scene
                  {...rootProps}
                  component={WorkoutDetail}
                  hideNavBar={false}
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