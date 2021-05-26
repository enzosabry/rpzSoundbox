import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Linking, PixelRatio, Platform,
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
import {RFValue} from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";

type CategoriesScreenRouteProp = RouteProp<DrawerParams, 'Categories'>;

type CategoriesScreenNavigationProp = StackNavigationProp<DrawerParams, 'Categories'>;

type Props = {
    route: CategoriesScreenRouteProp;
    navigation: CategoriesScreenNavigationProp;
};

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#19171C",
        height: "100%",
        width: "100%",
        color: "#FFF",
    },
    text: {
        color: "#fff",
        fontSize: RFValue(12, 700),
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
        height: 80,
        width: 80,
        borderRadius: 15,
        position: "relative",
        overflow: "hidden",
    }
});

export class Categories extends React.Component<Props, object> {

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
            await AsyncStorage.setItem('@alreadyLaunchedd', 'First opening !');
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@alreadyLaunchedd');
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
        let prevSound;
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
                (<TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/Playa_Dev")}>
                    <Ionicons name="logo-twitter" size={32} style={{marginRight: 15, marginTop: 5, color: "#FFF"}}/>
                </TouchableOpacity>),
        });
    }

    render() {
        const {route, navigation} = this.props;
        const navigate = navigation.navigate;
        let aspectRatio;
        let nbrCat = 3;
        if(width>2700) {
            aspectRatio = 0.7;
            nbrCat = 8
        }else if(width>1675) {
            aspectRatio = 0.6;
            nbrCat = 7
        }else if(width>1375) {
            aspectRatio = 0.6;
            nbrCat = 6
        }else if(width>960) {
            aspectRatio = 0.6;
            nbrCat = 5
        }else if(width>780) {
            aspectRatio = 0.6;
            nbrCat = 4
        }else {
            aspectRatio = 1;
            nbrCat = 3
        }
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
        let dial: JSX.Element = <View/>;
        if (Platform.OS !== 'web') {
            dial = (
                <View>
                    <Dialog.Container visible={this.state.visible}>
                        <Dialog.Title>Merci d'avoir téléchargé l'application !</Dialog.Title>
                        <Dialog.Description>
                            <Text>Cette application a été créé tout comme toi par des personnes ayant passionnément aimé
                                l'évènement GTA RPZ.{"\n"}</Text>
                            <Text>Tu veux ajouter un nouveau son ou alors participer au développement de l'app ? Rejoins
                                nous vite sur :{"\n"}</Text>
                            -<Text onPress={() => Linking.openURL('https://github.com/enzosabry/rpzSoundbox')}
                                   style={{textDecorationLine: 'underline', color: 'blue'}}>Github</Text>{"\n"}

                            -<Text onPress={() => Linking.openURL('https://discord.gg/Ry5qNYJG83')}
                                   style={{textDecorationLine: 'underline', color: 'blue'}}>Discord</Text>{"\n"}
                            <Text>Bisou.</Text>
                        </Dialog.Description>
                        <Dialog.Button color={"#169689"} label="Laisse moi tester !" onPress={handleCancel}/>
                    </Dialog.Container>
                </View>);
        }else
            dial = null;

        return (
            <ScrollView style={styles.container}>
                { this.state.firstLaunch? dial:null}
                <Text style={styles.textCat}>Choisis une catégorie :</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: width, alignSelf: 'center',}}>
                    <SortableGridView
                        data={[undefined, ...soundLibrary.map(s => {
                            return {name: s.name, image: s.image}
                        })]}
                        gapWidth={20}
                        aspectRatio={aspectRatio}
                        numPerRow={nbrCat}
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
