import React, {Component} from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    Button,
    Card,
    CardSection,
    FloatingCreateButton
} from '@components/common';
import * as WOGApiClient from '@api_client/WogApiClient.js';


const styles = StyleSheet.create({
    rootContainerStyle: {
        flex:1,
    },
    mainContainerStyle: {
        flex:1,
        margin: 5,
    }
});

class HomePage extends Component{

    constructor(){
        super();
        this.state = { workouts: null };
    }
 
    componentDidMount(){
        this.fetchWorkoutList();
    }

    fetchWorkoutList(){
        WOGApiClient.workoutList()
        .on('done', (res) => this.setState({workouts: res.body}));
    }

    onpenWorkoutDetail(workout){
        Actions.WorkoutDetail({workoutId: workout.id, title: workout.name});
    }

    handleCreateWorkout(name){
        console.log(`create workout!`);
        
        const response = WOGApiClient.workoutCreate(name)
        .then((workout) => Actions.WorkoutDetail({workoutId: workout.id, title: workout.name}));
        
        // this.fetchWorkoutList()
    }

    renderWorkoutList(){
        if(this.state.workouts){
            return this.state.workouts.map(workout=>(
                <CardSection>
                    <Button
                        key={workout.id}
                        onPress={() => this.onpenWorkoutDetail(workout)}
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
            <View style={styles.rootContainerStyle}>
                <View style={styles.mainContainerStyle}>
                    <Card>
                        {this.renderWorkoutList()}
                    </Card>
                </View>
                <FloatingCreateButton
                    style={{elevation:2}}
                    customCallback={this.handleCreateWorkout}
                    inputLabel='Create a workout'
                    placeHolder='Name it...'
                />
            </View>
        );
    }
}

export default HomePage;
