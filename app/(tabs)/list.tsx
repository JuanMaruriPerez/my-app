
import React, { useEffect} from "react";
import { Text, View, FlatList } from "react-native";
import styles from "../../styles/AppStyles";
import { useIngredients } from '@/components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { getQuery } from "@/database/database";
import { Confection } from "@/data/ingredients";

const Lists: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
 
        
  /** Effect used to get list of ingredients (getIngredients) and updating context with it*/
  useEffect(() => {
    context.addIngredients(getQuery(db));
  }, []);

  return (
      <View style={styles.container_basic}>
        <Text style={styles.header} >List of Ingredients</Text>
        <Text>Total : {context.ingredients.length}</Text>
        <Text> </Text>
        <FlatList
        data={context.ingredients}
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

export default Lists;



