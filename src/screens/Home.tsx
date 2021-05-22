import React, {useState} from 'react';
import {
    Alert,
    Dimensions,
    ImageBackground, Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import soundLibrary from "../../assets/category/config";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {DrawerParams} from "../../App";
import {FlatGrid} from 'react-native-super-grid';
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";

const {width, height} = Dimensions.get("window");

type HomeScreenRouteProp = RouteProp<DrawerParams, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<DrawerParams, 'Home'>;

type Props = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

export class Home extends React.Component<Props, {}> {

    state = {
        currentPageIndex: 0,
        firstLaunch: false,
        visible: true
    };
    private handleCancel: any;

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


    }


    render() {
        let prevSound;
        const {route, navigation} = this.props;
        const {category} = route.params;

        const showDialog = () => {
            this.setState({
                visible: true
            });
        };
        const handleCancel = () => {
            this.setState({
                visible: false
            });
        };
        const dial = (
            <View>
                <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>Merci d'avoir téléchargé l'application !</Dialog.Title>
                    <Dialog.Description>
                        <Text>Cette application a été créé tout comme toi par des personnes ayant passionnément aimé l'évènement GTA RPZ.{"\n"}</Text>
                        <Text>Tu veux ajouter un nouveau son ou alors participer au développement de l'app ? Rejoins nous vite sur :{"\n"}</Text>
                        -<Text onPress={() => Linking.openURL('https://github.com/enzosabry/rpzSoundbox')}
                              style={{textDecorationLine: 'underline', color: 'blue'}}>Github</Text>{"\n"}

                        -<Text onPress={() => Linking.openURL('https://discord.gg/yTQZ46Bh')}
                              style={{textDecorationLine: 'underline', color: 'blue'}}>Discord</Text>{"\n"}
                        <Text>Bisou.</Text>
                    </Dialog.Description>
                    <Dialog.Button label="Laisse moi tester !" onPress={handleCancel}/>
                </Dialog.Container>
            </View>);

        navigation.setOptions({
            headerTitle: () => <Text style={{fontSize: width / 15, color: "#FFF"}}>RPZ SoundBox</Text>,
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
                (<TouchableOpacity onPress={() => {
                    if (prevSound) prevSound.stopAsync();
                    navigation.navigate("Categories");
                }}>
                    <Ionicons name="apps-outline" size={32} style={{marginLeft: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
        });

        return (

            <View style={styles.container}>
                { this.state.firstLaunch? dial:null}
                <Text style={styles.textCat}>
                    {category !== undefined ? soundLibrary[category]?.name : "Accueil"}
                </Text>
                <View>
                    <SafeAreaView style={{marginTop: 20, marginBottom: 100}}>
                        <FlatGrid
                            data={category !== undefined ? soundLibrary[category]?.sounds : soundLibrary.flatMap(s => s.sounds)}
                            keyExtractor={(s, i) => s.name + i}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity
                                        style={{height: 150, borderRadius: 50}}
                                        onPress={() => {
                                            if (prevSound) prevSound.stopAsync();
                                            prevSound = item.audio;
                                            item.audio?.replayAsync().catch(console.error);
                                        }}>
                                        <ImageBackground
                                            style={{height: 100, width: 100, alignSelf: 'center', position: "relative"}}
                                            imageStyle={{borderRadius: 50}}
                                            source={item.image}/>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
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
        height: "100%",
        width: "100%",
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