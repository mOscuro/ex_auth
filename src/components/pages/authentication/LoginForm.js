import React, {Component} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection, Input} from 'ex_auth/src/components/common';
import * as WOGApiClient from 'ex_auth/src/api_client/WogApiClient.js';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {email: 'user1@wogether.com', password: 'Password44$'};
    }

    userLogin(){
        // if (!this.state.email || !this.state.password) return;

        const {clients} = this.props;
        const {email, password} = this.state
        const response = WOGApiClient.authLogin(clients.restClient, {email, password})
        .then((responseData) => {
            console.log(responseData);
            if(responseData.key){
                clients.authClient.setToken(responseData.key);
                Actions.HomePage();
            }
        })
        .done();
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(email) => this.setState({email})}
                        placeholder='Email'
                        ref='email'
                        returnKeyType='next'
                        value={this.state.email}
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
