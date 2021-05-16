import React from 'react';
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DrawerOpen from "../navigation/DrawerOpen";
import {AudioName} from "../components/Sound";
import soundLibrary from "../../assets/category/config";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {DrawerParams} from "../../App";
import SortableGridView from 'react-native-sortable-gridview';

const {width, height} = Dimensions.get("window");

type HomeScreenRouteProp = RouteProp<DrawerParams, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<DrawerParams, 'Home'>;

type Props = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

export class Home extends React.Component<Props, {}> {
    render() {
        const {category} = this.props.route.params;

        const play = (i: number) => {
            soundLibrary[category]?.sounds[i].audio?.replayAsync().catch(console.error);
        };

        return (

            <ScrollView style={styles.container}>
                <Text style={styles.textCat}>
                    {soundLibrary[category].name}
                </Text>
                <View>
                    <View style={{marginTop: 20}}>
                        <SortableGridView
                            data={ soundLibrary[category]?.sounds.map(s => {return {name: s.name, image: s.image}}) }
                            onDragStart={() => {
                                console.log('Default onDragStart');
                            }}
                            onDragRelease={(data) => {
                                console.log('Default onDragRelease', data);
                            }}
                            renderItem={(item: {name: string, image: any}, i) => {
                                return (
                                    <TouchableOpacity
                                        key={item.name} // Important! Should add this props!!!
                                        onPress={() => {
                                            play(i);
                                            console.log(i)
                                        }}
                                        style={styles.item}
                                    >
                                        <Image style={{resizeMode: 'contain', height: 80}} source={item.image}/>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity >
                                )
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
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
        color: "#000",
        fontSize: width/28,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 30
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