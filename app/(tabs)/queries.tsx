
import React from "react";
import { Text, View, Button} from "react-native";
import styles from "../../styles/AppStyles";
import { useRouter } from 'expo-router';

const Queries: React.FC = () => {
  /** Context */
  const router = useRouter();

  return (
    <View style={styles.container_basic}>
    <Text></Text>
    <Button title="Missing Data" onPress={() =>router.push('/misingData')} />
    <Text></Text>
    <Button title="Most Recently Added" onPress={() =>router.push('/MRA')} />
    <Text></Text>
    <Button title="Same Location" onPress={() =>router.push('/sameLocation')} />
    <Text></Text>
    <Button title="Same Atributes" onPress={() =>router.push('/sameAtributes')} />
    </View>
  );
};

export default Queries;

