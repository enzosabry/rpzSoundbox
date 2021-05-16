import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import soundLibrary from "../../assets/category/config";
import {Sound} from "../components/Sound";
import {RouteProp} from "@react-navigation/native";
import {DrawerParams} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";

type CategoriesScreenRouteProp = RouteProp<DrawerParams, 'Categories'>;

type CategoriesScreenNavigationProp = StackNavigationProp<DrawerParams, 'Categories'>;

type Props = {
    route: CategoriesScreenRouteProp;
    navigation: CategoriesScreenNavigationProp;
};

export class Categories extends React.Component<Props, object> {
    render() {
        const {setCategory} = this.props.route.params;
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Text>
                    Categories
                </Text>
                {soundLibrary.map((s: Sound, i: number) => {
                    return (
                        <TouchableOpacity style={{width: 100, height: 100, borderRadius: 50}} key={s.name}
                                          onPress={() => {
                                              setCategory(i);
                                              navigate('Home', {category: i});
                                          }}>
                            <ImageBackground source={s.image} style={{width: 100, height: 100, borderRadius: 50}}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}
