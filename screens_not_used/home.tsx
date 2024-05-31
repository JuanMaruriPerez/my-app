//
import React, { useState } from "react";
import { Text, View, Image, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useAssets } from "expo-asset";
import styles from "../styles/AppStyles";


export default function Tab() {
  
  const [assets] = useAssets([
    require('../../assets/images/alien-fuck-you.png'),
  ]);

  const [count, setCount] = useState<number>(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)


  return (
    <View style={styles.container}>
      {assets ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: assets[0].uri }}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>Fuck you.</Text>
          <Text> </Text>
          <Text>Count is: {count}</Text>
          <Text> </Text>
          <Button title="++" onPress={increment}/>
          <Button title="--" onPress={decrement}/>
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
}

