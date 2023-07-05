import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Share, Text, View, Image, FlatList, Button, Pressable } from "react-native";

import icons from "../Data/PokemonIcons";
import styles from "../Data/Styles"; 


export default function GeneratePokemon() {
  // State waar de Pokemon in worden opgeslagen
  const [firstGenPokemon, setfirstGenPokemon] = useState([]);
  const [number, setNumber] = useState(0);
  const [sprite, setSprite] = useState("Normal");

  // Random number generator die van 1 - 151 random nummers genereerd
  const generateRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * 150) + 1;
    setNumber(randomNumber);
    setSprite("Normal");
  };

  useEffect(() => {
    generateRandomNum();
  }, []);

  // Data om met de Pokemon API te connecten
  const pokemonPath = "https://pokeapi.co/api/v2/";
  const pokemon = `pokemon?limit=1&offset=${number}`;
  const firstGen = `${pokemonPath}${pokemon}`;

  useEffect(() => {
    const fetchFirstGen = async () => {
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
          // If statement die ervoor zorgt dat pokemon met een witte achtergrond een grijze achtergrond krijgen
          if (backgroundColorData != "white") {
            backgroundColor = backgroundColorData;
          } else {
            backgroundColor = "lightgrey";
          }
          // Haal de healthpoints/stats/ID op uit de data
          const healthPoints = pokemonData.stats[0].base_stat; 
          const stats = pokemonData.stats; 
          const pokemonId = pokemonData.id;
          
          return {
            ...pokemonData,
            backgroundColor,
            healthPoints,
            stats,
            pokemonId,
          };
        })
      );
      // Stop alle opgehaalde data in de firstGenPokemon state
      setfirstGenPokemon(firstgenPokemonInfo);
    };
    fetchFirstGen();
  }, [number]);

  const displayShiny = () => {
    setSprite(sprite === "Normal" ? "Shiny" : "Normal");
  };

  const renderPokemon = ({ item }) => {
    const spriteUri = sprite === "Normal" ? item.sprites.front_default : item.sprites.front_shiny;
    const pokemonName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    const cardStyle = {
      ...styles.cardCircle,
      backgroundColor: item.backgroundColor,
    };

    const onShare = async () => {
      try {
        const result = await Share.share({
          // Url werkt blijkbaar alleen voor IOS en niet voor Android
          url: spriteUri,
          message: `Check out this cool pokemon, his name is ${pokemonName}!`,
          title: "Shared pokemon"
        });
      } catch (error) {
        console.log(error)
      }
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
            <View key={index} style={[styles.typeImageCon, { backgroundColor: icon.color }]}>
              <Image source={icon.png} style={styles.typeImage} />
            </View>
          );
        }
      });
      return iconsToBeRenderd;
    };

    const retrieveStats = () => {
      let stats = item.stats;
      // Filter uit de stats array de waardes: attack, defense en speed
      let filterdStats = stats.filter((stat) => {
        let statName = stat.stat.name;
        return (
          statName == "attack" || statName == "defense" || statName == "speed"
        );
      });
      // Loop door de gefilterde stats heen en render deze in een view
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

    // Als de pokemon achtergrond geel is verander dan de knop kleur naar zwart (Geel zie je slecht op de IOS versie)
    let btnColor = item.backgroundColor;
    btnColor = item.backgroundColor === 'yellow' ? 'black' : btnColor;

    return (
      <View style={styles.pokemonCon}>
        <View style={cardStyle}></View>
        <Pressable onPress={displayShiny}>
          <Image source={{ uri: spriteUri }} style={styles.image} />
        </Pressable>
        <View style={styles.typeContainer}>{retrieveIcons()}</View>
        <Text style={styles.pokemon}>
          {pokemonName}
        </Text>
        <View style={styles.statCon}>{retrieveStats()}</View>
        <Text style={styles.hpContainer}>HP: {item.healthPoints}</Text>
        <Text style={styles.spriteStatus}>{sprite}</Text>
        <Text style={styles.idContainer}>#{item.pokemonId}</Text>
        <View style={styles.btnCon}>
          <Button onPress={onShare}  color={btnColor} title="Share pokemon" />
          <Button
            onPress={generateRandomNum}
            title="Generate random pokemon"
            color={btnColor}
          />
        </View>
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
      <StatusBar style="auto" />
    </View>
  );
}
