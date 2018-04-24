import React, {Component} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from './common';

class HomePage extends Component{

    getProtectedQuote(){
        Alert.alert('We will print a quote here')
    }

    userLogout(){
        Actions.Authentication();
    }

    render(){
        return(
            <View>
                <Button onPress={this.getProtectedQuote.bind(this)}>Get Workouts</Button>
                <Button onPress={this.userLogout.bind(this)}>Log out</Button>
            </View>
        );
    }
}

export default HomePage;
