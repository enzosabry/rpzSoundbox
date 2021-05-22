import React from 'react';
import {Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import soundLibrary from "../../assets/category/config";
import {RouteProp} from "@react-navigation/native";
import {DrawerParams} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import SortableGridView from 'react-native-sortable-gridview';
import {Ionicons} from "@expo/vector-icons";

type CategoriesScreenRouteProp = RouteProp<DrawerParams, 'Categories'>;

type CategoriesScreenNavigationProp = StackNavigationProp<DrawerParams, 'Categories'>;

type Props = {
    route: CategoriesScreenRouteProp;
    navigation: CategoriesScreenNavigationProp;
};

const {width, height} = Dimensions.get("window");

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
        fontSize: width / 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 30,
    },
    textCat: {
        color: "#FFF",
        fontSize: 24,
        marginLeft: 15
    },
    item: {
        borderRadius: 55,
        //backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export class Categories extends React.Component<Props, object> {
    render() {
        const {route, navigation} = this.props;
        const navigate = navigation.navigate;

        navigation.setOptions({
            headerTitle: () => <Text style={{fontSize: width / 15, color: "#FFF"}}>Categories</Text>,
            headerStyle: {
                backgroundColor: "#19171C",
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                    width: 0,
                },
            },
            headerTitleAlign: 'center',
            headerLeft: () =>
                (<TouchableOpacity onPress={() => navigation.navigate("Home", undefined)}>
                    <Ionicons name="home-outline" size={32} style={{marginLeft: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
            headerRight: () =>
                (<TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/Playa_Dev")}>
                    <Ionicons name="logo-twitter" size={32} style={{marginRight: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
        });

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.textCat}>Choose Category</Text>
                <View style={{marginTop: 20}}>
                    <SortableGridView
                        data={[undefined, ...soundLibrary.map(s => {
                            return {name: s.name, image: s.image}
                        })]}
                        renderItem={(item: { name: string, image: any } | undefined, i) => {
                            return (
                                <TouchableOpacity
                                    key={item?.name || "general"} // Important! Should add this props!!!
                                    onPress={() => {
                                        navigate('Home', {category: item ? i - 1 : undefined});
                                    }}
                                    style={styles.item}
                                >
                                    <Image style={{resizeMode: 'contain', height: 80, borderRadius: 40}}
                                           source={item?.image || soundLibrary[0].image}/>
                                    <Text style={styles.text}>{item?.name || "Accueil"}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}
