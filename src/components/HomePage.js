import React, {Component} from 'react';
import {Alert, AsyncStorage, Image, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection} from './common';

class HomePage extends Component{

    getWorkouts(){
        AsyncStorage.getItem('token').then((token) =>{
            fetch('http://192.168.104.76:8085/workouts/', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then((response) => response.text())
            .then((workouts) => {
                Alert.alert('workouts', workouts)
            })
            .done();
        })
    }

    userLogout(){
        AsyncStorage.getItem('token').then((token) =>{
            fetch('http://192.168.104.76:8085/auth/logout/', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then((response) => response.json())
            .then(() => {
                this.removeItem('token');
                Alert.alert('Logout success');
                Actions.Authentication();
            });
        })
    }
    
    async removeItem(item){
        try{
            await AsyncStorage.removeItem('token');
        }catch (error){
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Button onPress={this.getWorkouts.bind(this)}>Get Workouts</Button>
                    <Button onPress={this.userLogout.bind(this)}>Log out</Button>
                </CardSection>
            </Card>
        );
    }
}

export default HomePage;
