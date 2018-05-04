import React, {Component} from 'react';
import {Alert, AsyncStorage, Image, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardSection} from 'ex_auth/src/components/common';
import * as WOGApiClient from 'ex_auth/src/api_client/WogApiClient.js';

class HomePage extends Component{

    constructor(){
        super();
        this.state = { workouts: null };
    }
 
    componentDidMount(){
        const {clients} = this.props;
        const response = WOGApiClient.workoutList(clients.restClient)
        .then((workouts) => this.setState({workouts}));
    }

    userLogout(){
        const {clients} = this.props;
        WOGApiClient.authLogout(clients.restClient)
        .then((response) => {
            clients.authClient.removeToken();
            Actions.LoginForm();
        }).catch((error)=>console.log(error));
    }

    onpenWorkoutDetail(workoutId){
        Actions.WorkoutDetail({workoutId});
    }

    renderWorkoutList(){
        if(this.state.workouts){
            return this.state.workouts.map(workout=>(
                <CardSection>
                    <Button
                        onPress={() => this.onpenWorkoutDetail(workout.id)}
                    >
                    {workout.name}
                    </Button>
                </CardSection>
            ))
        }else{
            return <CardSection><Text>No workout</Text></CardSection>;
        }
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Button>New Workout</Button>
                    <Button onPress={this.userLogout.bind(this)}>Log out</Button>
                </CardSection>
                {this.renderWorkoutList()}
            </Card>
        );
    }
}

export default HomePage;
