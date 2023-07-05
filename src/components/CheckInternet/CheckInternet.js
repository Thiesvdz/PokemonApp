import React, { useState, useEffect } from "react";
import {useNetInfo} from "@react-native-community/netinfo";
import {View, Text} from "react-native";
import styles from "../Data/Styles"; 

export default function CheckInternet () {
  const netInfo = useNetInfo();
  const [isConnected, setisConnected] = useState(false);
  
  useEffect(() => {
    setisConnected(netInfo.isConnected);
  }, [netInfo.isConnected])
  

  return (
    <View>
      {!isConnected && (
        <Text style={styles.warning}>You are not connected to the internet, connect to the internet use this app</Text>
      )}
    </View> 
  ); 
};
