import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from './../components/Card';
import Colors from '../constants/color'
import Input from './../components/Input';
import NumberContainer from './../components/NumberContainer';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

export default function StartGameScreen(props) {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g), '')
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Error', 'Number has to be a number between 1 and 99', [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }])
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected </BodyText>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton  onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>)
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}> Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <BodyText style={styles.text}>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}





const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text:{
        fontFamily:'open-sans'
    }
})