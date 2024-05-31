
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Button } from "react-native";
import styles from "../../styles/AppStyles";

import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";
import IngredientForm from "@/components/IngredientForm";
import { buildIngredientUpdate, getId, getQuery, updateIngredientToDatabase } from "@/database/database";
import { SQLiteDatabase } from "expo-sqlite";


const misingData: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
  
  /** Local states */
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();

  /** Local constants */
  const query = `SELECT * FROM ingredients WHERE name IS NULL OR brand IS NULL OR category IS NULL OR location IS NULL OR confection IS NULL OR expiration_date IS NULL 
      OR expiration_from_now IS NULL`;

  /** Action to refresh page */
  const  refresh= () =>{
    context.addMisingData(getQuery(db,query,[]));
  }
    
  /** Effect used to refresh page */
  useEffect(() => {
      refresh;
  }, []);

  /** Action of updating an ingredient */
  const handleUpdateData = (updatedIngredient: Ingredient) => {
    /* ( ! operator ): used to tell the intrepreter that selectedIngredient wont be null */
    updateIngredientToDatabase(db,updatedIngredient,getId(db,selectedIngredient!));
    setModalVisible(false)
    refresh;
  };

  return (
    
      <View style={styles.container_basic}>
        <Button
        title="Search"
        onPress={refresh}
        />
        <Text>Total of ingredients with mising data: {context.misingData.length}</Text>
        <Text> </Text>
        <Text>List of Ingredients:</Text>
        <Text> </Text>
        <FlatList
        data={context.misingData}
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
            
            <Button  title="Update" onPress={() => {setSelectedIngredient(item); setModalVisible(true)}} 
            color="orange" />
            <Text> </Text>           
          </View>
          )}
          />
          <IngredientForm
              visible={isModalVisible}
              init_ing={selectedIngredient}
              onClose={() => setModalVisible(false)}
              onSubmit={handleUpdateData}

            />
      </View>
  );
};

export default misingData;



