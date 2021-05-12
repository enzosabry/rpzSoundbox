import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/screens/Home";

export default function App() {
  const [data, setData] = useState([]);
  useEffect(()=> {
    const data = [];
    const assetCategory = './assets/';const fs = require('fs');
    const path = require('path');

    fs.readdirSync(assetCategory).forEach((file: string) => {
      console.log(file); // 'brave.png'
    });
  }, []);

  return (
    <View style={styles.container}>
      <Home data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
