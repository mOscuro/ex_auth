import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as WOGApiClient from '@api_client/WogApiClient.js';
import {Button, Card, CardSection, Spinner} from '@components/common';
import StepItem from '@components/StepItem';


const styles = {
    mainViewContainerStyle: {
        display: 'flex',
        flex: 1,
        padding: 5
    },
    deleteButtonContainerStyle: {
        height: 50,
        width : '100%'
    },
    scrollViewStyle: {
        flex: 1
    }
}

class WorkoutDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'workoutId': this.props.workoutId,
            'rounds': null
        };
    }

    componentDidMount(){
        const response = WOGApiClient.workoutRounds(this.props.workoutId)
        .then((rounds) => this.setState({rounds}));
    }

    renderSteps(round){
        return round.steps.map(step => <StepItem step={step} />);
    }

    renderRounds(){
        return this.state.rounds.map((round) => (
            <Card>
                <CardSection>
                    <Text>Repeat {round.nbRepeat} times</Text>
                </CardSection>
                {this.renderSteps(round)}
            </Card>
        ));
    }

    handleDeleteWorkout(){
        const response = WOGApiClient.workoutDelete(this.state.workoutId)
        .then(() => Actions.pop({ refresh: { title: 'new title' }}));
    }

    render() {
       
        return (
            this.state.rounds
            ?
            (
                <View style={styles.mainViewContainerStyle}>
                    <View style={styles.deleteButtonContainerStyle}>
                        <Button onPress={this.handleDeleteWorkout.bind(this)} >Delete Workout</Button>
                    </View>
                    <ScrollView style={styles.scrollViewStyle}>{this.renderRounds()}</ScrollView>
                </View>
            )
            : <Spinner />
        );
    }

}

export default WorkoutDetail;