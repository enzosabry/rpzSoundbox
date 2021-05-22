import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import soundLibrary from "../../assets/category/config";
import {RouteProp} from "@react-navigation/native";
import {DrawerParams} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import SortableGridView from 'react-native-sortable-gridview';
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CategoriesScreenRouteProp = RouteProp<DrawerParams, 'Categories'>;

type CategoriesScreenNavigationProp = StackNavigationProp<DrawerParams, 'Categories'>;

type Props = {
    route: CategoriesScreenRouteProp;
    navigation: CategoriesScreenNavigationProp;
};

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        backgroundColor: "#19171C",
        height: "100%",
        width: "100%",
        color: "#FFF"
    },
    text: {
        color: "#fff",
        fontSize: width / 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        //height: 30,
    },
    textCat: {
        color: "#FFF",
        fontSize: 24,
        marginLeft: 15
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 15,
        position: "relative",
        overflow: "hidden",
    }
});

export class Categories extends React.Component<Props, object> {

    state = {
        currentPageIndex: 0,
        firstLaunch: false
    };

    componentDidUpdate() {
        if (this.state.firstLaunch !== null)
            AsyncStorage.getItem("@alreadyLaunched").then(value => {
                if (value == null) {
                    AsyncStorage.setItem('@alreadyLaunched', JSON.stringify(true)); // No need to wait for `setItem` to finish, although you might want to handle errors
                    this.setState({firstLaunch: true});
                } else {
                    this.setState({firstLaunch: null});
                }
            }) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
    }

    showAlert1() {
        Alert.alert(
            "Merci d'avoir téléchargé l'application !",
            'Si l\'app te plaît, mets nous une bonne note sur le store\n' +
            '\n' +
            'Tu veux un nouveau son ou tu veux participer au développement de l\'app?\n' +
            'Github: https://github.com/enzosabry/rpzSoundbox\n' +
            'Discord: https://discord.gg/yTQZ46Bh\n' +
            '\n' +
            'Bisou.',
            [
                {
                    text: 'ok'
                }
            ]
        );
    }

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
                { this.state.firstLaunch ?
                        this.showAlert1() : null}
                <Text style={styles.textCat}>Choisis une catégorie :</Text>
                <View>
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
                                    <View style={styles.itemImage}>
                                        <ImageBackground
                                            style={styles.itemImage}
                                            imageStyle={{height: 80, resizeMode: 'center',}}
                                            source={item?.image || require("../../assets/img/logorpz.png")}/>
                                    </View>
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
