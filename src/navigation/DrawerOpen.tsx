import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import PT from 'prop-types';


const DrawerOpen = (props) => {

    return (
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Ionicons name="md-menu" size={32} style={{marginLeft:15, marginTop:5}} />
        </TouchableOpacity>
    );
};

DrawerOpen.propTypes = {
    navigation: PT.shape({
        openDrawer: PT.func,
    }),
};

export default withNavigation(DrawerOpen);