import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./src/screens/Home";
import {Categories} from "./src/screens/Categories";
import {createStackNavigator} from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

export enum ROUTES {
    Home = "Home",
    Categories = "Categories",
}

export type DrawerParams = {
    Home: { category: number };
    Categories: { setCategory: (category: number) => void };
}

const Stack = createStackNavigator<DrawerParams>();

const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

export const App = () => {
    useEffect(()=> {
       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    });
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator>
                <Stack.Screen name={ROUTES.Categories} component={Categories} options={{ cardStyleInterpolator: forFade }}/>
                <Stack.Screen name={ROUTES.Home} component={Home} initialParams={{category: undefined}} options={{ cardStyleInterpolator: forFade }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
