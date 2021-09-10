import React, { useEffect } from 'react';
import {
    Alert,
    Dimensions,
    ImageBackground,
    Linking, PixelRatio,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import soundLibrary from "../../assets/category/config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';
import { DrawerParams } from "../../App";
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Audio } from "expo-av";
import LogoDiscord from '../components/LogoDiscord';

const { width, height } = Dimensions.get("window");

type HomeScreenRouteProp = RouteProp<DrawerParams, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<DrawerParams, 'Home'>;

type Props = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

export const Home = ({route, navigation}: Props) => {
    const category = route.params.category;
    const sound = new Audio.Sound();
    let prevSound: Audio.Sound;

    useEffect(() => {
        let prevSound;
        navigation.setOptions({
            headerTitle: () => <Text style={styles.textHeader}>RPZ SoundBox</Text>,
            headerStyle: {
                backgroundColor: "#19171C",
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                    width: 0,
                },
                borderBottomWidth: 0
            },
            headerTitleAlign: 'center',
            headerLeft: () =>
            (<TouchableOpacity onPress={() => {
                if (prevSound) prevSound.stopAsync();
                navigation.push("Categories");
            }}>
                <Ionicons name="apps-outline" size={32} style={{ marginLeft: 15, marginTop: 5, color: "#FFF" }} />
            </TouchableOpacity>),
            headerRight: () =>
            (<View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/Playa_Dev")}>
                    <Ionicons name="logo-twitter" size={32} style={{ marginRight: 15, marginTop: 5, color: "#00acee" }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://discord.gg/Ry5qNYJG83")} style={{ marginRight: 15, marginTop: 5 }}>
                    <LogoDiscord width={32} height={32} />
                </TouchableOpacity>
            </View>),
        });
    }, []);

    return (
        <View style={styles.container}>
                <Text style={styles.textCat}>
                    {category !== undefined ? soundLibrary[category]?.name : "Accueil"}
                </Text>
                <ScrollView>
                    <SafeAreaView style={{ marginTop: 20 }}>
                        <FlatGrid
                            data={category !== undefined ? soundLibrary[category]?.sounds : soundLibrary.flatMap(s => s.sounds)}
                            keyExtractor={(s, i) => s.name + i}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{ height: 175, borderRadius: 50, justifyContent: 'center' }}
                                        onPress={async () => {
                                            if (prevSound) await prevSound.unloadAsync();
                                            await sound.loadAsync(item.audio);
                                            await sound.playAsync();
                                            prevSound = sound;
                                            //await sound.unloadAsync();
                                        }}>
                                        <ImageBackground
                                            style={{ height: 100, width: 100, alignSelf: 'center', position: "relative" }}
                                            imageStyle={{ borderRadius: 50 }}
                                            source={item.image} />
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </SafeAreaView>
                </ScrollView>
            </View>
    );
}


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
        fontSize: 18,

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
        color: "#FFF"
    }
});
