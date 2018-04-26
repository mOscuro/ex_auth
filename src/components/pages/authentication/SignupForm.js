import React, {Component} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection, Input} from '../../common'

class SignupForm extends Component {
    constructor(){
        super();
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null
        };
    }

    userSignup(){
        // if (!this.state.username || !this.state.password) return;

        fetch('http://192.168.104.76:8085/auth/registration/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password1: this.state.password,
                password2: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('=================')
            console.log(responseData)
            // this.saveItem('token', responseData.token),
            Alert.alert('register success');
            Actions.LoginForm();
        })
        .done();
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(firstName) => this.setState({firstName})}
                        placeholder='First Name'
                        ref='firstName'
                        returnKeyType='next'
                        value={this.state.firstName}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(lastName) => this.setState({lastName})}
                        placeholder='Last Name'
                        ref='lastName'
                        returnKeyType='next'
                        value={this.state.lastName}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        editable={true}
                        onChangeText={(email) => this.setState({email})}
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
                    <Button onPress={this.userSignup.bind(this)}>
                        Register
                    </Button>

                    <Button onPress={() => Actions.LoginForm()}>
                        Sign in
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default SignupForm;
