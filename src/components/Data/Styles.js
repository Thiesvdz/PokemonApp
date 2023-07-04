import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardCircle: {
      width: 300,
      height: 220,
      borderRadius: 150,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      position: "absolute",
      top: 0,
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
      alignItems: "center",
      flexDirection: "row",
      gap: 20,
    },
    statWrap: {
      display: "flex",
      alignItems: "center",
    },
    statSingle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 5,
    },
    statSingleName: {
      textTransform: "capitalize",
    },
    typeImage: {
      width: 25,
      height: 25,
    },
    pokemonCon: {
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