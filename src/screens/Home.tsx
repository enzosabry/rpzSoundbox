import React from 'react';
import {Text, View, Image} from "react-native";


export default function Home() {

    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
        },
        tinyLogo: {
            width: 50,
            height: 50,
        },
        logo: {
            width: 66,
            height: 58,
        },
    });

    return (
        <View>
            <Text>RPZ SoundBox</Text>
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/img/logorpz.png')}
            />

            <View>
                <Text>Choose Category</Text>
            </View>
        </View>
    );



}