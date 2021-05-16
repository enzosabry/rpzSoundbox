import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./src/screens/Home";
import {Categories} from "./src/screens/Categories";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import {Animated, Dimensions, Text} from "react-native";
import DrawerOpen from "./src/navigation/DrawerOpen";

const {width, height} = Dimensions.get("window");

export enum ROUTES {
    Home = "Home",
    Categories = "Categories",
    Accueil= "Accueil",
}

export type DrawerParams = {
    Home: { category: number };
    Categories: { setCategory: (category: number) => void };
    Accueil: { category: number };
}


const Drawer = createDrawerNavigator<DrawerParams>();
const Stack = createStackNavigator<DrawerParams>();

const HomeStack = ({route, navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.Home} component={Home} initialParams={{category: route.params.category}} options={{
                headerTitle: () => <Text style={{fontSize: width / 15, color: "#FFF"}}> RPZ SoundBox </Text>,
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
                headerLeft: () => <DrawerOpen navigation={navigation}/>,
            }}/>
        </Stack.Navigator>);
};
const CategoriesStack = ({route, navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.Categories} component={Categories} initialParams={route.params} options={{
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
                headerLeft: () => <DrawerOpen navigation={navigation}/>,
            }}/>
        </Stack.Navigator>);
};

export const App = () => {
    const [category, setCategory] = useState<number>(0);

    useEffect(() => {
        if (category) console.log("setCategory: " + category);
    }, [category]);

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name={ROUTES.Accueil} component={HomeStack} initialParams={{category}}/>
                <Drawer.Screen name={ROUTES.Categories} component={CategoriesStack} initialParams={{setCategory}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
