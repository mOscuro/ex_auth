import React, {Component} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection, Input} from '@components/common';
import * as WOGApiClient from '@api_client/WogApiClient.js';
import AuthClient from '@api_client/auth_client.js';
import { apicase } from '@apicase/core'
import fetch from '@apicase/adapter-fetch'

const doRequest = apicase(fetch)

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {email: 'user1@wogether.com', password: 'Password44$'};
    }

    userLogin(){
        const {email, password} = this.state;
        const {authClient} = this.props;
        WOGApiClient.authLogin({email, password})
        .on('done', responseData => {
                Actions.HomePage();
            }
        )
        .on('fail', res => console.warn(res))
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(email) => this.setState({email})}
                        placeholder='Email'
                        returnKeyType='next'
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
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
