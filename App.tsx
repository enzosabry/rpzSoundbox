import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/screens/Home";
import Navigation from "./src/navigation/nav";

export default class App extends React.Component {

  render() {
    return (

        <Navigation/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
