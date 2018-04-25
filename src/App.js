import React, {Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Spinner} from './components/common';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';

class App extends Component {
  constructor(){
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentDidMount(){
    console.log('MOUNTED!');
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
              <Scene
                  component={Authentication}
                  hideNavBar={true}
                  initial={!this.state.hasToken}
                  key='Authentication'
                  title='Authentication'
              />
              <Scene
                  component={HomePage}
                  hideNavBar={true}
                  initial={this.state.hasToken}
                  key='HomePage'
                  title='Home Page'
              />
          </Scene>
        </Router>
      );
    }
  }
}

export default App;