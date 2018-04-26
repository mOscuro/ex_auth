import React, {Component} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection, Input} from '../../common'

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {username: 'user1@wogether.com', password: 'Password44$'};
    }

    userLogin(){
        // if (!this.state.username || !this.state.password) return;

        fetch('http://192.168.104.76:8085/auth/login/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            if(responseData.key){
                this.saveItem('token', responseData.key);
                Alert.alert('Login succes');
                Actions.HomePage();
            }else{
                Alert.alert('Login failed');
            }

        })
        .done();
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
            <Card>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                        ref='username'
                        returnKeyType='next'
                        value={this.state.username}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.userLogin.bind(this)}>
                        Log in
                    </Button>

                    <Button onPress={() => {Actions.SignupForm()}}>
                        Sign up
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;
