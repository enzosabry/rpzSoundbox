import React from 'react';
import {Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import soundLibrary from "../../assets/category/config";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {DrawerParams} from "../../App";
import {FlatGrid} from 'react-native-super-grid';

const {width, height} = Dimensions.get("window");

type HomeScreenRouteProp = RouteProp<DrawerParams, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<DrawerParams, 'Home'>;

type Props = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

export class Home extends React.Component<Props, {}> {

    componentDidUpdate() {
        console.log(`Nouvelle catégorie : ${this.props.route.params.category}. 
        Ca correspond à ${this.props.route.params.category ? soundLibrary[this.props.route.params.category].name : "rien"}`);
    }

    render() {
        const {category} = this.props.route.params;

        const play = (i: number) => {
            soundLibrary[category]?.sounds[i].audio?.replayAsync().catch(console.error);
        };

        return (

            <View style={styles.container}>
                <Text style={styles.textCat}>
                    {category ? soundLibrary[category]?.name : "Accueil"}
                </Text>
                <View>
                    <SafeAreaView style={{marginTop: 20}}>
                        {category ? <FlatGrid
                            data={soundLibrary[category]?.sounds}
                            keyExtractor={(s, i) => s.name + i}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity style={{height: 150, borderRadius: 50}}
                                                      onPress={() => play(index)}>
                                        <ImageBackground style={{height: 100, width: 100, alignSelf: 'center', position: "relative"}}
                                                         imageStyle={{borderRadius: 50}}
                                                         source={item.image}/>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        /> : null}
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tile: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    container: {
        paddingTop: 0,
        backgroundColor: "#19171C",
        height: height,
        width: width,
        color: "#FFF"
    },
    tinyLogo: {
        width: width,
        height: height / 5,
        resizeMode: 'contain',
    },
    containrLogo: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 66,
        height: 58,
    },
    text: {
        color: "#fff",
        fontSize: 22,
        textAlign: 'center',
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