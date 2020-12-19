import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { MyButton } from './MyButton'
import Screen2 from './Screen2'

export const Screen1 = ({ navigation, route }) => {
    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [save, setSave] = useState("")
    const [screen, setScreen] = useState(0)
    const [errorMessage, setErrMessage] = useState("")
    const [disable, setDisable] = useState(true)

    const [DATA, setData] = useState()
    const setParams = () => {
        let arr = []
        Object.keys(route.params).map((key) => {
            arr.push(route.params[key])
        })
        return arr

    }
    useEffect(() => {
        setDisable(true)
        
        setData(route.params === undefined ? [] : setParams)
        console.log("price" + price)
        console.log("discount" + price)

    }, [route.params])
    // console.log("Home DATA",DATA)
    // console.log(route)            

    const checkDisable = (bool) => {

        if (price.length !== 0 && discount.length !== 0 || (discount.length !== 0 && price.length !== 0)) {

            setDisable(bool)
        } else {
            setDisable(true)
        }
    }
    const checkPrice = (text) => {
        if (text > 0) {
            setErrMessage("")
            setScreen(0)
            console.log(price.length)
            setPrice(text)
            checkDisable(false)
        } else if (text.length === 0) {
            setPrice("")
        }
        else {
            setErrMessage("Price Cannot be Negative")
            setScreen(1)
            checkDisable(true)

        }
    }
    const calDiscount = (text) => {
        setDiscount(text)
        if (text >= 0) {
            if(text.length===1){
            setSave((price * (text * 0.01)).toFixed(2))
              setDisable(false)
            }
            else{
            if (text > 100) {
                setScreen(1)
                setErrMessage("Discount Cannot be greater than 100")
                setDisable(true)
            } else {
                setErrMessage("")
                setScreen(0)
                // let x=(text/100)
                // console.log(save);
                setSave((price * (text * 0.01)).toFixed(2))
                checkDisable(false)
            }
            }
            
        } else if (text.length === 0) {
            setDiscount("")
            setDisable(true)
        }
        else {
            setErrMessage("Discount Cannot be Negative")
            setScreen(1);
            checkDisable(true)
        }
    }
    const listSave = () => {
        const random = Math.random()
        let id=""+random
        DATA.push({ id: id, price: price, discount: discount +"%", finalPrice: save })
        console.log(DATA)
        setData(DATA)
        setPrice("")
        setDiscount("")
        setSave("")
        setDisable(true)
    }

    const errorScreen = (
        <View style={{height:100}}>
            <Text style={{fontSize:20,color:"red"}}>{errorMessage}</Text>
        </View>)
    const details = (
        <View style={{height:400}}>
            <Text style={styles.outputText}>You Save:{save}</Text>
            <Text style={styles.outputText}>Final Price:{price.length === 0 ? "" : discount.length === 0 ? price : (price - save).toFixed(2)}</Text>
        </View>
    )
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 100 }}>Discount Calculator</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputText}
                    onChangeText={(text) => { checkPrice(text) }}
                    placeholder="Enter Price "
                    placeholderTextColor="red"
                    selectTextOnFocus={true}
                    keyboardType='numeric'
                    value={price}
                />
                <TextInput style={styles.inputText}
                    onChangeText={(text) => { calDiscount(text) }}
                    placeholder="Enter  Discount  "
                    keyboardType='numeric'
                    placeholderTextColor="green"
                    value={discount}
                />
            </View>
            <View style={styles.buttonContainer}>
                <MyButton
                    disable={disable}
                    onPress={listSave}
                    text="Save"
                    color="orange"
                />
                {/* <TouchableOpacity
                    disabled={disable}
                >
                    <View style={{...styles.activeButtonContainer,backgroundColor:"green"}}>
                        <Text style={styles.buttonText}>View History</Text>
                    </View>
                </TouchableOpacity> */}
                <MyButton
                    disable={false}
                    text="View History"
                    color="green"
                    onPress={() => navigation.navigate('List', DATA)}
                />

            </View>
            <View>
                <Text style={styles.output}>{screen === 0 ? details : errorScreen}</Text>

            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        width: "100%"
    },
    inputContainer: {
        width: "80%",
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputText: {
        width: "33%",
        borderBottomWidth: 2,
        borderColor: "blue",
        height: 50
    }, buttonContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 50
    },
    activeButtonContainer: {

        backgroundColor: "lightgrey",
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    disableButtonContainer: {

        backgroundColor: "grey",
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20
    },
    output: {
        width: "80%",
        alignItems: "flex-start"
    },
    outputText: {
        width: "30%",
        fontSize: 25,
        // borderBottomWidth: 2,
        marginBottom: 10
    }


});
