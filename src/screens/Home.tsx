import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions, Alert} from "react-native";
import SortableGridView from 'react-native-sortable-gridview'

const { width, height } = Dimensions.get("window");

export default function Home() {

    const styles = StyleSheet.create({
        container: {
            paddingTop: 0,
            backgroundColor: "#19171C",
            height: height,
            width: width,
            color: "#FFF"
        },
        tinyLogo: {
            width: width,
            height: height/5,
            resizeMode:'contain',
        },
        containrLogo: {
            width:width,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: 66,
            height: 58,
        },
        text: {
            color: "#FFF",
            fontSize: 24,
            textAlign: 'center'
        },
        textCat: {
            color: "#FFF",
            fontSize: 24,
            marginLeft: 15
        },
        item: {
            borderRadius: 4,
            backgroundColor: 'white',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });

    return(
        <View>
            <Text>
                Home
            </Text>
        </View>
    );
}