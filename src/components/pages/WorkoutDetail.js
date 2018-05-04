import React from 'react';
import {Text} from 'react-native';
import * as WOGApiClient from 'ex_auth/src/api_client/WogApiClient.js';
import {Button, Card, CardSection, Spinner} from 'ex_auth/src/components/common';


class WorkoutDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'workoutId': this.props.workoutId,
            'rounds': null
        };
    }

    componentDidMount(){
        const {clients} = this.props;
        const response = WOGApiClient.workoutRounds(clients.restClient, this.props.workoutId)
        .then((rounds) => this.setState({rounds}));
    }

    render() {
        if(this.state.rounds){
            const rounds = this.state.rounds.map((round) => {
                const roundHeader = <CardSection><Text>Repeat {round.nbRepeat} times</Text></CardSection>;

                const steps =  round.steps.map(step => <CardSection><Text>{step.nbRep} {step.exercise.name}</Text></CardSection>)
                return (<Card><CardSection>{roundHeader}</CardSection>{steps}</Card>);
            })
            return rounds;

        }else{
            return <Spinner />
        }
    }

}

export default WorkoutDetail;