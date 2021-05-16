/*import React from 'react';
import {Dimensions, SafeAreaView, Text} from "react-native";
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerOpen from "../navigation/DrawerOpen";
import {AntDesign} from '@expo/vector-icons';
import Home from "../screens/Home";

const {width, height} = Dimensions.get("window");

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
    <SafeAreaView style={{flex: 1, marginTop: 25}}>
        <DrawerItems {...props}/>
    </SafeAreaView>
));


const AppNavigator = createDrawerNavigator({
        Accueil: {
            screen: NavAccueil,
            params: {id: 1},
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <AntDesign name="home" size={35} style={{marginRight: -20, marginTop: 10, marginBottom: 10}}/>
                ),
                tabBarOptions: {
                    showIcon: true
                },
                drawerLabel: <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10,}}> Accueil </Text>,
                headerStyle: {
                    backgroundColor: '#FFF'
                },
                headerTitleAlign: 'center',
            },
        },
    }, {
        contentOptions: {
            intialRouteName: 'NavAccueil',
            activeBackgroundColor: "rgba(100,0,0,0.1)",
            activeTintColor: 'orange'
        },
        contentComponent: CustomDrawerComponent,
    }
);

export default createAppContainer(AppNavigator)
*/