import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ScrollViewComponent,
    Dimensions, Alert, AsyncStorageStatic as AsyncStorage
} from "react-native";
//import 'react-native-gesture-handler';
import {createAppContainer, default as DrawerActions} from 'react-navigation'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import DrawerOpen from "../navigation/DrawerOpen";

// @ts-ignore
import { AntDesign, Entypo } from '@expo/vector-icons';
import Home from "../screens/Home";


const { width, height } = Dimensions.get("window");



const NavAccueil = createStackNavigator({

    Home: {
        //name: 'Home',
        screen: Home,
        navigationOptions: {
            headerTitle: () => <Text style={{fontSize: width / 15, color: "#FFF"}}> RPZ SoundBox </Text>,
            // @ts-ignore
            headerStyle: {
                backgroundColor: "#19171C",
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },

            headerTitleAlign: 'center',
            headerLeft: () => <DrawerOpen/>,
        },
    }
});


const CustomDrawerComponent = (props => (

    <SafeAreaView style={{flex:1, marginTop: 25}}>
        <DrawerItems {...props}/>

    </SafeAreaView>

));

const AppNavigator=createDrawerNavigator({

        Accueil:{
            screen:NavAccueil,
            params: { id: 1 },
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <AntDesign name="home" size={35} style={{marginRight: -20, marginTop: 10, marginBottom: 10}}/>
                ),
                // @ts-ignore
                tabBarOptions: {
                    showIcon: true
                },
                drawerLabel: <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10,}}> Accueil </Text>,
                headerStyle: {
                    backgroundColor:  '#FFF'
                },
                headerTitleAlign: 'center',

            },

        },
    }
    ,{

        contentOptions: {
            intialRouteName: 'NavAccueil',
            activeBackgroundColor: "rgba(100,0,0,0.1)",
            activeTintColor:'orange'
        },
        contentComponent: CustomDrawerComponent,
    }

);

export default createAppContainer(AppNavigator)
