
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Button, TextInput } from "react-native";
import styles from "../../styles/AppStyles";

import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";
import { getQuery} from "@/database/database";

const Expiring_soon: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();

  /** Local States */
  const [value, setValue] = useState(0);
  
  /** Action taken to refresh page */
  const  refresh= () =>{
    context.addExpiringSoon(getQuery(db,'SELECT * FROM ingredients WHERE open = ? OR ripeness_state = ? OR expiration_from_now <= ?;',[Binary.yes,State.H,value]));
  }
    
  /** Effect used to refresh page */
  useEffect(() => {
      refresh();
  }, []);

  return (
      <View style={styles.container_basic}>
        <Button
        title="Search"
        onPress={refresh}
        />
        <Text> </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setValue(parseInt(value))}
          placeholder="Select days from now"
          keyboardType="numeric"
        />
        <Text style={styles.header}>Total of ingredients expiring in {value} days: {context.expiringSoon.length}</Text>
        <Text> </Text>
        <Text>List of Ingredients:</Text>
        <Text> </Text>
        <FlatList
        data={context.expiringSoon}
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
            <Text> </Text>
          </View>
        )}
        />
      </View>
  );
};

export default Expiring_soon;

