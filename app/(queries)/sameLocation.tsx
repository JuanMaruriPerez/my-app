
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button } from "react-native";
import styles from "../../styles/AppStyles";
import { Picker } from "@react-native-picker/picker";
import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Location, Confection } from "@/data/ingredients";
import { buildSameLocation, getQuery } from "@/database/database";

const sameLocation: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
  
  /** Local states */
  const [location, setLocation] = useState<Location | null>(null);

  /** Local constants */
  const { query, params } = buildSameLocation(location,null)

  /** Action to refresh page */
  const  refresh= () =>{
    if (location  === null ) {
      alert('Please, select a valid location.');
      return;
    }
    context.addSameLocation(getQuery(db,query,params));
  }

  /** Effect used to refresh page */
  useEffect(() => {
    refresh;
  }, []);

  return (
    
      <View style={styles.container_basic}>
        <Button
        title="Search"
        onPress={refresh}
        />
        <Text>Location:</Text>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue: Location | null) => setLocation(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="--" value={null} />
          <Picker.Item label="Fridge" value={Location.Fridge} />
          <Picker.Item label="Freezer" value={Location.Freezer} />
          <Picker.Item label="Pantry" value={Location.Pantry} />
        </Picker>
        <Text>Total of ingredients in {location} : {context.sameLocation.length}</Text>
        <Text> </Text>
        <Text>List of Ingredients:</Text>
        <Text> </Text>
        <FlatList
        data={context.sameLocation}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Confection: {item.confection}</Text>
            {item.confection === Confection.Fresh && (
            <Text>Ripeness State: {item.ripeness.state} : {item.ripeness.date}</Text>
               )}
            <Text>Open : {item.open}</Text>
            <Text>Expiration: {item.expiration.date}</Text>
            <Text>Expiration from now: {item.expiration.from_now}</Text>
          </View>
        )}
        />
      </View>
  );
};

export default sameLocation;


