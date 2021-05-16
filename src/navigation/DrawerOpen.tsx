import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PT from 'prop-types';


const DrawerOpen = ({navigation}) => {

    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="md-menu" size={32} style={{marginLeft:15, marginTop:5, color: "#FFF"}} />
        </TouchableOpacity>
    );
};

DrawerOpen.propTypes = {
    navigation: PT.shape({
        openDrawer: PT.func,
    }),
};

export default DrawerOpen;