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

    return (
        <View style={styles.container}>
            <View style={styles.containrLogo}>
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/img/logorpz.png')}
            />
            </View>
            <View style={{marginTop: 20}}>
                <Text style={styles.textCat}>Choose Category</Text>
                <SortableGridView
                    data={[
                        {name: 'LSPD', backgroundColor: '#09f', color: '#fff'},
                        {name: 'Johnny Monnay', backgroundColor: '#333', color: '#fff'},
                        {name: 'Vagos', backgroundColor: '#rgba(255, 216, 58, 1)', color: '#333'},
                        {name: 'Families', backgroundColor: '#rgba(0, 222, 144, 1)', color: '#fff'},
                        {name: 'Fab et Donna', backgroundColor: '#290916', color: '#fff'},
                        {name: 'Les Croutes', backgroundColor: 'red', color: '#fff'},
                        {name: 'LSMS', backgroundColor: '#425b8a', color: '#fff'},
                        {name: 'Other', backgroundColor: '#f60', color: '#fff'},
                    ]}
                    onDragStart={() => {
                        console.log('Default onDragStart');
                    }}
                    onDragRelease={(data) => {
                        console.log('Default onDragRelease', data);
                    }}
                    renderItem={(item, index) => {
                        return (
                            <View
                                uniqueKey={item.name} // Important! Should add this props!!!
                                onTap={() => {
                                    Alert.alert(`On Tap ${item.name}!`);
                                }}
                                style={[styles.item, {backgroundColor: item.backgroundColor}]}
                            >
                                <Text style={[styles.text, {color: item.color, }]}>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );



}