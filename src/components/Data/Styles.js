import { StyleSheet } from "react-native";


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
    statCon: {
      display: "flex",
      gap: 25,
    },
    statSingle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 5
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
      fontSize: 25,
      textTransform: "uppercase",
    },
    image: {
      width: 200,
      height: 200,
    },
  });
export default styles;  