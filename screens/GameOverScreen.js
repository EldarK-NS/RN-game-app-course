import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import MainButton from './../components/MainButton';

export default function GameOverScreen(props) {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <Image
                source={{uri:'https://www.transparency-initiative.org/wp-content/uploads/2020/03/winner.jpg'}}
                style={styles.image}
                resizeMode='cover'
            />
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 300,

    }
})
