import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Colors from '../constants/color'
import TitleText from './TitleText';

export default function Header(props) {
    return (
        <View style={{
            ...styles.headerBAse,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}>
            <TitleText >
                {props.title}
            </TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBAse: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'

    },
    headerIOS: {
        backgroundColor: 'white'
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    }
})
