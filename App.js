import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";


export default function App() {
  // State waar de Pokemon in worden opgeslagen
  const [firstGenPokemon, setfirstGenPokemon] = useState([]);
  const [number, setNumber] = useState(0);

  // data om met de Pokemon API te connecten
  const pokemonPath = "https://pokeapi.co/api/v2/";
  const pokemon = `pokemon?limit=1&offset=${number}`;
  const firstGen = `${pokemonPath}${pokemon}`;

  const generateRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * 151) + 1;
    setNumber(randomNumber);
  };
  useEffect(() => {
    generateRandomNum();
  }, []);
  
  useEffect(() => {
    const fetchFirstGen = async () => {
      const firstgenPokemonIdsReponse = await fetch(firstGen);
      const firstgenPokemonIdsBody = await firstgenPokemonIdsReponse.json();

      const firstgenPokemonInfo = await Promise.all(
        firstgenPokemonIdsBody.results.map(async (p) => {
          const pInfo = await fetch(p.url, pInfo);
          console.log(p.url);
          return pInfo.json();
        })
      );
      setfirstGenPokemon(firstgenPokemonInfo);
    };
    fetchFirstGen();
  }, [number]);

  const renderPokemon = ({ item }) => {
    return (
      <View style={styles.pokemonCon}>
        <Image
          source={{ uri: item.sprites.front_default }}
          style={styles.image}
        />
        <Text style={styles.pokemon}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={firstGenPokemon} renderItem={renderPokemon}></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    marginTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
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
});
