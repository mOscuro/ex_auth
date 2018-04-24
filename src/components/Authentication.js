import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Input} from './common'

class Authentication extends Component {
    constructor(){
        super();
        this.state = {username: null, password: null};
    }

    userSignup(){
        if (!this.state.username || !this.state.password) return;

        fetch('http://192.168.1.63:8085/auth/login/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.saveItem('token', responseData.token),
            Alert.alert('Signup succes');
            Actions.HomePage();
        })
        .done();
    }
    userLogin(){
        Actions.HomePage();
    }

    async saveItem(item, selectedValue){
        try{
            await AsyncStorage.setItem(item, selectedValue);
        }catch (error){
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    render(){
        return(
            <View>
                <Input
                    editable={true}
                    onChangeText={(username) => this.setState({username})}
                    placeholder='Username'
                    ref='username'
                    returnKeyType='next'
                    value={this.state.username}
                />
                <Input
                    editable={true}
                    onChangeText={(password) => this.setState({password})}
                    placeholder='Password'
                    ref='password'
                    returnKeyType='next'
                    secureTextEntry={true}
                    value={this.state.password}
                />

                <Button onPress={this.userLogin.bind(this)}>
                    Log in
                </Button>

                <Button onPress={this.userSignup.bind(this)}>
                    Sign up
                </Button>
            </View>
        );
    }
}

export default Authentication;
