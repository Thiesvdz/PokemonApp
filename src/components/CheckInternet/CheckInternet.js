import {useNetInfo} from "@react-native-community/netinfo";
import {View, Text} from "react-native";
export default function CheckInternet () {
  const netInfo = useNetInfo();
  return (
    <View>
      <Text>Type: {netInfo.type}</Text>
      <Text>Is Connected?: {netInfo.isConnected}</Text>
    </View>
  );
};
   