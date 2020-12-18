import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export const MyButton = ({disable,text,onPress,color}) => {

    const col=disable?"lightgrey":color
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
        >
            <View style={disable ? {...styles.disableButtonContainer,backgroundColor:col}: {...styles.activeButtonContainer,backgroundColor:col}}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    
    activeButtonContainer: {

        // backgroundColor:"orange",
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    disableButtonContainer: {

        // backgroundColor: "lightgrey",
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonText: {
        color: "#000",
        fontSize: 20
    },

});
