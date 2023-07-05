import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
  
import { ImageBackground,StyleSheet, Text, View, Image, FlatList } from "react-native";
import GeneratePokemon from "./src/components/GeneratePokemon/GeneratePokemon";
import CheckInternet from "./src/components/CheckInternet/CheckInternet";
import background from "./src/images/pokemon_bg.jpg";
import styles from "./src/components/Data/Styles"; 

export default function App() {
  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.imageBackground}>
      <View style={styles.container}>
        <GeneratePokemon/>
        <CheckInternet />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
 


