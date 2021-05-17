import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import soundLibrary from "../../assets/category/config";
import {RouteProp} from "@react-navigation/native";
import {DrawerParams} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import SortableGridView from 'react-native-sortable-gridview';

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
        fontSize: width/28,
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
        const {setCategory} = this.props.route.params;
        const navigate = this.props.navigation.navigate;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.textCat}>Choose Category</Text>
                <View style={{marginTop: 20}}>
                    <SortableGridView
                        data={ soundLibrary.map(s => {return {name: s.name, image: s.image}}) }
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
                                        setCategory(i);
                                        navigate('Home', {category: i});
                                    }}
                                    style={styles.item}
                                >
                                    <Image style={{resizeMode: 'contain', height: 80, borderRadius: 40}} source={item.image}/>
                                    <Text style={styles.text}>{item.name}</Text>
                                </TouchableOpacity >
                            )
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}
