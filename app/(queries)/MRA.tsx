
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Button } from "react-native";
import styles from "../../styles/AppStyles";

import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";
import { getQuery } from "@/database/database";

const MRA: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
  
  /** Local constants */
  const query = `SELECT * FROM ingredients ORDER BY id DESC LIMIT 2;`
  
   /** Action to refresh page */
   const  refresh= () =>{
    context.addMRA(getQuery(db,query,[]));
  }
    
  return (
    
      <View style={styles.container_basic}>
        <Button
        title="Search"
        onPress={refresh}
        />

        <Text> </Text>
        <Text>List of Ingredients:</Text>
        <Text> </Text>
        <FlatList
        data={context.mra}
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

export default MRA;

