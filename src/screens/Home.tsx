import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";

type DataType = {

}

// assets/category
export default function Home({data}: {data: []}) {


    return(
        <View>
            <Text>
                Choisis une catégorie :
            </Text>
            <View>
                {}
            </View>
        </View>
    );
}