import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Linking, PixelRatio, Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import soundLibrary from "../../assets/category/config";
import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import {Ionicons} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import LogoDiscord from "../components/LogoDiscord";
import {FlatGrid} from 'react-native-super-grid';
import {DiscordPopup} from "../components/DiscordPopup";

type CategoriesScreenRouteProp = RouteProp<StackParams, 'Categories'>;

type CategoriesScreenNavigationProp = StackNavigationProp<StackParams, 'Categories'>;

type Props = {
    route: CategoriesScreenRouteProp;
    navigation: CategoriesScreenNavigationProp;
};

const {width, height} = Dimensions.get("window");


export const Categories = ({route, navigation}: Props) => {

    const [firstLaunch, setFirstLaunch] = useState(false);
    const [visible, setVisible] = useState(true);
    const [discordPopup, showDiscordPopup] = useState(false);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@alreadyLaunchedd', 'First opening !');
        } catch (error) {
            console.error(error);
        }
    };

    const retrieveData = async () => {
        try {
            if (await AsyncStorage.getItem('@alreadyLaunchedd') !== null) {
                // We have data!!
                setFirstLaunch(false);
            } else {
                await storeData()
                setFirstLaunch(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Effectué au lancement de l'application
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={styles.textHeader}>Categories</Text>,
            headerStyle: {
                backgroundColor: "#19171C",
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                    width: 0,
                },
                borderColor: "#19171C",
                borderBottomWidth: 0
            },
            headerTitleAlign: 'center',
            headerLeft: () =>
                (<TouchableOpacity onPress={() => navigation.navigate("Home", undefined)}>
                    <Ionicons name="home-outline" size={32} style={{marginLeft: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
            headerRight: () =>
                (<View style={{display: 'flex', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/Playa_Dev")}>
                        <Ionicons name="logo-twitter" size={32}
                                  style={{marginRight: 15, marginTop: 5, color: "#00acee"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (Platform.OS !== 'android' && Platform.OS !== 'ios')
                            Linking.openURL("https://discord.gg/Ry5qNYJG83");
                        else
                            showDiscordPopup(true)
                    }} style={{marginRight: 15, marginTop: 5}}>
                        <LogoDiscord width={32} height={32}/>
                    </TouchableOpacity>
                </View>),
        });
        retrieveData();
    }, []);


    return (
        <View>
            {firstLaunch ? (
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Merci d'avoir téléchargé l'application !</Dialog.Title>
                    <Dialog.Description>
                        <Text>Cette application a été créé tout comme toi par des personnes ayant passionnément aimé
                            l'évènement GTA RPZ.{"\n"}</Text>
                        <Text>Tu veux ajouter un nouveau son ou alors participer au développement de l'app ? Rejoins
                            nous vite sur :{"\n"}</Text>
                        - <Text onPress={() => Linking.openURL('https://github.com/enzosabry/rpzSoundbox')}
                                style={{textDecorationLine: 'underline', color: 'blue'}}>Github</Text>{"\n"}

                        - <Text onPress={() => Linking.openURL('https://discord.gg/Ry5qNYJG83')}
                                style={{textDecorationLine: 'underline', color: 'blue'}}>Discord</Text>{"\n"}
                        <Text>Bisou.</Text>
                    </Dialog.Description>
                    <Dialog.Button color={"#169689"} label="Laisse moi tester !" onPress={() => setVisible(false)}/>
                </Dialog.Container>
            ) : null}
            {discordPopup ?
                <DiscordPopup visible={discordPopup} close={() => showDiscordPopup(false)}/>
                : null}
            <ScrollView style={[styles.container,{height: Platform.OS === 'web' ? height : "100%"}]}>
                <Text style={[styles.textCat, {marginBottom: 15}]}>Choisis une catégorie :</Text>
                <FlatGrid
                    data={[undefined, ...soundLibrary.map(s => {
                        return {name: s.name, image: s.image}
                    })]}
                    keyExtractor={() => Math.random() + "="}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity
                                key={item?.name || "general"} // Important! Should add this props!!!
                                onPress={() => {
                                    navigation.push('Home', {category: item ? index - 1 : undefined});
                                }}
                                style={{...styles.item, height: 175, borderRadius: 50, alignItems: 'center'}}
                            >
                                <ImageBackground
                                    style={styles.itemImage}
                                    imageStyle={{height: 80, resizeMode: 'center',}}
                                    source={item?.image || require("../../assets/img/logorpz.png")}/>
                                <Text style={styles.text}>{item?.name || "Tout"}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#19171C",
        height: "100%",
        width: "100%",
        color: "#FFF",
    },
    text: {
        color: "#fff",
        fontSize: height*0.024,
        textAlign: 'center',
        textAlignVertical: 'center',
        //height: 30,
    },
    textCat: {
        color: "#FFF",
        fontSize: RFValue(14, 580),
        marginLeft: 15
    },

    textHeader: {
        fontSize: RFValue(18, 580),
        color: "#FFF",

    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 15,
        position: "relative",
        overflow: "hidden",
    }
});