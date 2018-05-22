import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import * as WOGApiClient from '@api_client/WogApiClient.js';
import {Button, Card, CardSection, Spinner} from '@components/common';
import StepItem from '@components/StepItem';


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

    render() {
        return (
            this.state.rounds
            ? <ScrollView>{this.renderRounds()}</ScrollView>
            : <Spinner />
        );
    }

}

export default WorkoutDetail;