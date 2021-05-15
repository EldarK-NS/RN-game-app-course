import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import NumberContainer from './../components/NumberContainer';
import Card from './../components/Card';
import DefaultStyles from '../constants/default-styles'
import MainButton from './../components/MainButton';
import { Ionicons } from '@expo/vector-icons'
import BodyText from './../components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (<View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
</View>)


export default function GameScreen(props) {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])


    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)


    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props


    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])


    const nextGuassHandler = direction => {

        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'This is wrong....', [{ text: 'Sorry', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(CurRounds => CurRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }


    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuassHandler.bind(this, 'lower')} >
                        <Ionicons name="arrow-down" size={24} color="black" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuassHandler.bind(this, 'greater')}>
                        <Ionicons name="arrow-up" size={24} color="black" /></MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))}
                </ScrollView> */}
                    <FlatList data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} keyExtractor={(item) => item}
                        contentContainerStyle={styles.list} />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuassHandler.bind(this, 'lower')} >
                    <Ionicons name="arrow-down" size={24} color="black" />
                </MainButton>
                <MainButton onPress={nextGuassHandler.bind(this, 'greater')}>
                    <Ionicons name="arrow-up" size={24} color="black" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))}
        </ScrollView> */}
                <FlatList data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} keyExtractor={(item) => item}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: Dimensions.get('window').height > 500 ? 25 : 10,
        width: 400,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    },
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    }
})
