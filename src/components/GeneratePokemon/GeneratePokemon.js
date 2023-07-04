import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import icons from "../Data/PokemonIcons";

export default function App() {
  // State waar de Pokemon in worden opgeslagen
  const [firstGenPokemon, setfirstGenPokemon] = useState([]);
  const [number, setNumber] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [pokemonStats, setpokemonStat] = useState([]);

  // data om met de Pokemon API te connecten
  const pokemonPath = "https://pokeapi.co/api/v2/";
  const pokemon = `pokemon?limit=1&offset=${number}`;
  const firstGen = `${pokemonPath}${pokemon}`;

  const generateRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * 150) + 1;
    setNumber(randomNumber);
  };
  useEffect(() => {
    generateRandomNum();
  }, []);

  useEffect(() => {
    const fetchFirstGen = async () => {
      setisLoading(true);
      const firstgenPokemonIdsReponse = await fetch(firstGen);
      const firstgenPokemonIdsBody = await firstgenPokemonIdsReponse.json();

      const firstgenPokemonInfo = await Promise.all(
        firstgenPokemonIdsBody.results.map(async (p) => {
          const pInfo = await fetch(p.url, pInfo);
          const pokemonData = await pInfo.json();
          const speciesInfoResponse = await fetch(pokemonData.species.url);
          const speciesInfo = await speciesInfoResponse.json();

          const backgroundColorData = speciesInfo.color.name; // Haal de kleur op uit de data
          let backgroundColor

          if(backgroundColorData != 'white'){
            backgroundColor = backgroundColorData
          }else{
            backgroundColor = 'lightgrey';
          }
          
          const healthPoints = pokemonData.stats[0].base_stat; // Haal de healthpoints op uit de data



          const stats = pokemonData.stats;

          return {
            ...pokemonData,
            healthPoints,
            backgroundColor,
            stats,
          };
        })
      );
      setfirstGenPokemon(firstgenPokemonInfo);
    };
    fetchFirstGen();
  }, [number]);

  const renderPokemon = ({ item }) => {
    const cardStyle = {
      ...styles.cardCircle,
      backgroundColor: item.backgroundColor,
    };

    const retrieveIcons = () => {
      const types = item.types;
      let typesToBeRenderd = types.map((type) => {
        return (
          <Text style={styles.types} key={type.type.name}>
            {" "}
          </Text>
        );
      });
  
      let iconsToBeRenderd = icons.map((icon) => {
        if (typesToBeRenderd[0].key == icon.label) {
          return (
            <View
              key={icon.label}
              style={[styles.typeImageCon, { backgroundColor: icon.color }]}
            >
              <Image source={{ uri: icon.svg }} style={styles.typeImage} />
            </View>
          );
        } else if (
          typesToBeRenderd.length >= 2 &&
          (typesToBeRenderd[0]?.key === icon.label ||
            typesToBeRenderd[1]?.key === icon.label)
        ) {
          return (
            <View
              key={icon.label}
              style={[styles.typeImageCon, { backgroundColor: icon.color }]}
            >
              <Image source={{ uri: icon.svg }} style={styles.typeImage} />
            </View>
          );
        }
      });
      return iconsToBeRenderd;
    }


    const retrieveStats = () => {
      let stats = item.stats;
      let filterdStats = stats.filter((stat=>{
        let statName = stat.stat.name;
        return statName == 'attack' || statName == 'defense' || statName == 'speed';
      }));
      let statsToBeRenderd = filterdStats.map((stat) => {
        let statName = stat.stat.name;
        let baseStat = stat.base_stat;
        return (
          <Text key={statName}>
            {statName}{baseStat}
          </Text>
        );
      });
      return statsToBeRenderd;
    }

    return (
      <View style={styles.pokemonCon}>
        <View style={cardStyle}></View>
        <Image
          source={{ uri: item.sprites.front_default.toString() }}
          style={styles.image}
        />
        <View style={styles.typeContainer}>{retrieveIcons()}</View>
        <Text style={styles.pokemon}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text> {retrieveStats()}</Text>
        <Text style={styles.hpContainer}>HP: {item.healthPoints}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={firstGenPokemon} renderItem={renderPokemon}></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCircle: {
    padding: 150,
    width: 200,
    borderRadius: 250,
    position: "absolute",
    top: -100,
    zIndex: -1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hpContainer: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
  },
  typeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  typeImageCon: {
    padding: 5,
    borderRadius: 50,
  },
  typeImage: {
    width: 25,
    height: 25,
  },
  pokemonCon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 30,
  },
  pokemon: {
    fontSize: 30,
    textTransform: "uppercase",
  },
  image: {
    width: 200,
    height: 200,
  },
});
