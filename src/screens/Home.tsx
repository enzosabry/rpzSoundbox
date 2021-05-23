import React from 'react';
import {
    Alert,
    Dimensions,
    ImageBackground,
    Linking, PixelRatio,
    SafeAreaView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import {RFValue} from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get("window");

type HomeScreenRouteProp = RouteProp<DrawerParams, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<DrawerParams, 'Home'>;

type Props = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

export class Home extends React.Component<Props, {}> {


    constructor(props) {
        super(props);
    }

    state: { firstLaunch: boolean, visible: boolean } = {
        firstLaunch: false,
        visible: true
    }

    private handleCancel: any;

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('@alreadyLaunched', 'First opening !');
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@alreadyLaunched');
            if (value !== null) {
                // We have data!!
                this.setState({firstLaunch: false})
            }else {
                await this._storeData()
                this.setState({firstLaunch: true})
            }
            console.log(value);
        } catch (error) {
            // Error retrieving data
        }
    };

    async componentDidMount() {
        await this._retrieveData()
    }

    showNav() {
        const {route, navigation} = this.props;
        const {category} = route.params;
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
                    navigation.navigate("Categories");
                }}>
                    <Ionicons name="apps-outline" size={32} style={{marginLeft: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
        });
    }

    render() {
        const {route, navigation} = this.props;
        const {category} = route.params;
        let prevSound;
        {this.showNav()}
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

                        -<Text onPress={() => Linking.openURL('https://discord.gg/Ry5qNYJG83')}
                               style={{textDecorationLine: 'underline', color: 'blue'}}>Discord</Text>{"\n"}
                        <Text>Bisou.</Text>
                    </Dialog.Description>
                    <Dialog.Button label="Laisse moi tester !" onPress={handleCancel}/>
                </Dialog.Container>
            </View>);

        return (

            <View style={styles.container}>
                { this.state.firstLaunch? dial:null}
                <Text style={styles.textCat}>
                    {category !== undefined ? soundLibrary[category]?.name : "Accueil"}
                </Text>
                <View>
                    <SafeAreaView style={{marginTop: 20}}>
                        <FlatGrid
                            data={category !== undefined ? soundLibrary[category]?.sounds : soundLibrary.flatMap(s => s.sounds)}
                            keyExtractor={(s, i) => s.name + i}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity
                                        style={{height: 175, borderRadius: 50,}}
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