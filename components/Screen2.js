import React, { useState,useEffect } from "react";
import { Alert,Button,style, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyButton } from "./MyButton";


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.price}</Text>
        <Text style={styles.title}>{item.discount}</Text>
        <Text style={styles.title}>{item.finalPrice}</Text>
    </TouchableOpacity>
);


const Screen2 = ({navigation,route}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [DATA,setDATA]=useState(route.params)
    console.log("DATA",DATA)
    console.log(route)
    
    
const delItems=(itemId)=>{
    setDATA(DATA.filter( item => item.id!=itemId))

}

const dellAll=()=> {
    // setDATA([])
    // Works on both Android and iOS
Alert.alert(
    'Warning',
    'Do you want to clear all history?',
    [
      
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => setDATA([])}
    ],
    { cancelable: false }
  );
}

   
    const emptyScreen=(
        <View>
            <Text style={{fontSize:32,color:"lightgrey",textAlign:"center"}}>Please add items...!</Text>
        </View>
    );
    const listScreen=(
        <View style={{justifyContent:"center",textAlign:"center"}}>
            
        
    <SafeAreaView style={styles.container}>
    <ScrollView>
    {DATA.map((element,index)=>{
        return(
            <TouchableOpacity
                
                key={index}
            >
            <View style={styles.header}>
            <View style={{width:300,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={styles.title}>{element.price}</Text>
                <Text style={styles.title}>{element.discount}</Text>
                <Text style={styles.title}>{element.finalPrice}</Text>
            </View>
            <TouchableOpacity
                onPress={()=> delItems(element.id)}
            >
                <View style={{padding:5,backgroundColor:"black",textAlign:"center"}}>
                    <Text style={{color:"white"}}>X</Text>
                </View>
            </TouchableOpacity>

            </View>

            </TouchableOpacity>
        )
    })}
    </ScrollView>
        <TouchableOpacity
                onPress={dellAll}
            >
                <View style={{padding:10,backgroundColor:"black",textAlign:"center"}}>
                    <Text style={{color:"white"}}>Clear All History</Text>
                </View>
        </TouchableOpacity>
    </SafeAreaView>

        
        </View>
    );
    route.params.map((value)=>{
        console.log(value.discount)
        console.log(value.finalPrice)
        console.log(value.id)
        console.log(value.price)
    })
    console.log(DATA)
    return (
        <View style={styles.container}>
        
            <TouchableOpacity style={[styles.header, style]}>
        <Text style={styles.headerHeading}>Price</Text>
        <Text style={styles.headerHeading}>Discount</Text>
        <Text style={styles.headerHeading}>Final Price</Text>
    </TouchableOpacity>
            {DATA.length===0?emptyScreen:listScreen}
            <Button
                onPress={()=> navigation.navigate('Home',DATA)}
                title="Go home"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height:400
    },
    header: {
        width: 350,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        textAlign:"center",
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor:"#20b2aa"
    },
    item: {
        width: 350,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    headerHeading: {
        fontSize: 22,
    },
});

export default Screen2;
