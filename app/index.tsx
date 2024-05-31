// Index is login
import React, { useState } from 'react';
import { useAssets } from "expo-asset";
import { View, TextInput, Button, Text, TouchableOpacity, Image } from 'react-native';
import  styles from "../styles/AppStyles" ;
import { useRouter } from 'expo-router';

export default function Tab() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const [assets] = useAssets([
      require('../assets/images/logo.png'),
    ]);

    const handleLogin = () => {


      // Simulate login logic (replace with actual authentication)
      if (username === '' && password === '') {
         // Clear the error message upon successful login
        setError('');
        console.log('Login successful!');
        // Navigate to the main screen upon successful login
        router.push('/home'); // Navigate to the Home screen       
      } else {
        setError('Invalid username or password');
      }
    };

    return (
      
      <View style={styles.container}>
        
        <Text style={styles.header}>Welcome to Pepito Green</Text>
        {assets ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: assets[0].uri }}
              style={styles.image}
            />
          </View>
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
        <TextInput
          style={styles.input_login}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input_login}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );

  

  
}
 