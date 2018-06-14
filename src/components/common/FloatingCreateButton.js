import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input} from '@components/common'

const buttonSize = 60;

const styles = StyleSheet.create({

    floatingButtonContainerStyle:{
        position: 'absolute',
        width: buttonSize,
        height: buttonSize,
        right: 20,
        bottom: 20,
    },
    touchableButtonStyle:{
        flex: 1,
    },
    buttonContainerStyle:{
        flex: 1,
        width: buttonSize,
        height: buttonSize,
        borderRadius: 50,
        backgroundColor: '#ff7200',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    buttonIconStyle: {
        color: '#FFF'
    },
    floatingBackgroundContainerStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex'
    },
    testStyle: {
        flex: 1,
    },
    floatingInputContainerStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // zIndex: 1000,
    },

    floatingInputTextContainerStyle: {
        flex: 1,
    },
    floatingInputLabelStyle: {
        paddingBottom: 5,
        color: '#FFF'
    },
    floatingInputTextStyle: {
        flex: 1,
        borderRadius: 5,
        marginRight: 10,
        height: 40,
        backgroundColor: '#FFF',
        marginBottom: 20
    },

    floatingInputButtonStyle: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingInputButtonContainerStyle:{
        flex: 1,
        width: buttonSize,
        height: buttonSize,
        borderRadius: 50,
        backgroundColor: '#28c128',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class FloatingCreateButton extends React.Component {

    constructor(){
        super();
        this.state = {'isOpen': false, inputValue: null};
    }

    openComponent(open){
        this.setState({isOpen: open})
    }
    
    render() {
        const {inputLabel, placeHolder, onPress, customCallback} = this.props;
        
        const floatinButton = (
            <View style={styles.floatingButtonContainerStyle}>
                <TouchableOpacity
                    style={styles.touchableButtonStyle}
                    onPress={() => this.openComponent(true)}
                >
                    <View style={styles.buttonContainerStyle}>
                        <Text style={styles.buttonIconStyle}>
                            <Icon name="add" size={30}/>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

        const {inputValue} = this.state;
        const floatingInput = (
            <Modal
                animationType='none'
                transparent={true}
                onRequestClose={() => this.openComponent(false)}
                visible={true}>
                <View style={styles.floatingBackgroundContainerStyle}>
                    <TouchableWithoutFeedback
                        onPress={() => this.openComponent(false)}
                    >
                        <View style={styles.testStyle}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.floatingInputContainerStyle}>
                        <View style={styles.floatingInputTextContainerStyle}>
                            <Text style={styles.floatingInputLabelStyle}>{inputLabel}</Text>
                            <TextInput
                                placeholder={placeHolder}
                                style={styles.floatingInputTextStyle}
                                autoCorrect={false}
                                onChangeText={(inputValue) => this.setState({inputValue})}
                                value={inputValue}
                            />
                        </View>
                    
                        <TouchableOpacity
                            style={styles.floatingInputButtonStyle}
                            onPress={() => {
                                customCallback(inputValue);
                                this.setState({isOpen: false})
                            }}
                        >
                            <View style={styles.floatingInputButtonContainerStyle}>
                                <Text style={styles.buttonIconStyle}>
                                    <Icon name="done" size={30}/>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        );
        
        return this.state.isOpen ? floatingInput : floatinButton
    }
}

export {FloatingCreateButton};

