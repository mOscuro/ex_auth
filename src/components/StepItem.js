import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    containerStyle : {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FBFCFC',
    },
    thumbnailStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        marginRight: 10,
        height: 40,
        width: 40,
    },
    nbRepTextStyle: {
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    nameContainerStyle: {
        flex: 1
    },
    nameTextStyle: {
        fontSize: 15,
    }
});

class StepItem extends React.Component {

    render() {

        const {nbRep, exercise} = this.props.step;

        return (
            <View style={styles.containerStyle}>
                <View style={styles.thumbnailStyle}></View>
                <View>
                    <Text style={styles.nbRepTextStyle}>{nbRep}x</Text>
                </View>
                <View style={styles.nameContainerStyle}>
                    <Text style={styles.nameTextStyle}>{exercise.name}</Text>
                </View>
            </View>
        );
    }
}

export default StepItem;