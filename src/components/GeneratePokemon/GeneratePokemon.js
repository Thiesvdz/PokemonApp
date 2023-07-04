import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { DeviceEventEmitter } from 'react-native';

import icons from "../Data/PokemonIcons";
import styles from "../Data/Styles"; 

export default function GeneratePokemon() {
  // State waar de Pokemon in worden opgeslagen
  const [firstGenPokemon, setfirstGenPokemon] = useState([]);
  const [number, setNumber] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [pokemonStats, setpokemonStat] = useState([]);
  const [sprite,setSprite] = useState(null);

  const generateRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * 150) + 1;
    setNumber(randomNumber);
  };

  useEffect(() => {
    generateRandomNum();
  }, []);

  // data om met de Pokemon API te connecten 
  const pokemonPath = "https://pokeapi.co/api/v2/";
  const pokemon = `pokemon?limit=1&offset=${number}`;
  const firstGen = `${pokemonPath}${pokemon}`;

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
          let backgroundColor;
          if (backgroundColorData != "white") {
            backgroundColor = backgroundColorData;
          } else {
            backgroundColor = "lightgrey";
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
    setSprite(item.sprites.front_default.toString());
    // const displayShiny = () => {
    //   setSprite(item.sprites.front_shiny.toString());
    //   console.log(sprite);
    // }
    // console.log(sprite);


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

      let iconsToBeRenderd = icons.map((icon, index) => {
        if (typesToBeRenderd[0]?.key == icon.label) {
          return (
            <View
              key={index}
              style={[styles.typeImageCon, { backgroundColor: icon.color }]}
            >
              <Image source={icon.png} style={styles.typeImage} />
            </View>
          );
        } else if (
          typesToBeRenderd.length >= 2 &&
          (typesToBeRenderd[0]?.key === icon.label ||
            typesToBeRenderd[1]?.key === icon.label)
        ) {
          return (
            <View
              key={index}
              style={[styles.typeImageCon, { backgroundColor: icon.color }]}
            >
              <Image source={icon.png} style={styles.typeImage} />
            </View>
          );
        }
      });
      return iconsToBeRenderd;
    };

    const retrieveStats = () => {
      let stats = item.stats;
      let filterdStats = stats.filter((stat) => {
        let statName = stat.stat.name;
        return (
          statName == "attack" || statName == "defense" || statName == "speed"
        );
      });
      let statsToBeRenderd = filterdStats.map((stat) => {
        let statName = stat.stat.name;
        let baseStat = stat.base_stat;
        return (
          <View key={statName} style={styles.statWrap}>
            <Text style={styles.statSingle}>{baseStat}</Text>
            <Text style={styles.statSingleName}>{statName}</Text>
          </View>
        ); 
      });
      return statsToBeRenderd;
    };

    return (
      <View style={styles.pokemonCon}>
        <View style={cardStyle}></View>
        <Image
          source={{ uri: sprite }}
          style={styles.image}
        />
        <View style={styles.typeContainer}>{retrieveIcons()}</View>
        <Text style={styles.pokemon}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <View style={styles.statCon}>{retrieveStats()}</View>
        {/* <Button
        onPress={displayShiny}
        title="Show shiny version"
        color="#841584"  /> */}
        <Text style={styles.hpContainer}>HP: {item.healthPoints}</Text>
      </View>
    );  
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={firstGenPokemon}
        renderItem={renderPokemon}
        contentContainerStyle={styles.center}
      ></FlatList>
   
      <Button
        onPress={generateRandomNum}
        title="Generate random pokemon"
        color="#841584"
      />
      <StatusBar style="auto" />
    </View>
  );
}
