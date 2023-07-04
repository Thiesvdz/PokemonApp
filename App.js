import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
  
import { ImageBackground,StyleSheet, Text, View, Image, FlatList } from "react-native";
import GeneratePokemon from "./src/components/GeneratePokemon/GeneratePokemon";
import background from "./src/images/pokemon_bg.jpg";

const image = background;

export default function App() {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>

    <View style={styles.container}>
      <GeneratePokemon/>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonCon: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 25,
    padding: 20,
  },
  pokemon: {
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    alignSelf: 'stretch',
  },
});
