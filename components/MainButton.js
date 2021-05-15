import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../constants/color'

export default function MainButton(props) {
    let ButtonComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return (
        <View style={styles.radius}>
            <ButtonComponent onPress={props.onPress} activeOpacity={0.8}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    radius: {
        borderRadius: 25,
        overflow:'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25

    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})
