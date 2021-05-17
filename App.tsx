import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./src/screens/Home";
import {Categories} from "./src/screens/Categories";
import {createStackNavigator} from "@react-navigation/stack";

export enum ROUTES {
    Home = "Home",
    Categories = "Categories",
}

export type DrawerParams = {
    Home: { category: number };
    Categories: { setCategory: (category: number) => void };
}

const Stack = createStackNavigator<DrawerParams>();

export const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={ROUTES.Home} component={Home} initialParams={{category: undefined}}/>
                <Stack.Screen name={ROUTES.Categories} component={Categories}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
