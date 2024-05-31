
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Button } from "react-native";
import styles from "../../styles/AppStyles";
import { Picker } from "@react-native-picker/picker";

import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";
import { buildSameLocation, getQuery } from "@/database/database";

const sameAtributes: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
  
  /**Local states */
  const [location, setLocation] = useState<Location | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
     
  /** Local constants */
  const { query, params } = buildSameLocation(location,category)

  /** Action to refresh page */
  const  refresh= () =>{
    context.addSameCategory(getQuery(db,query,params));
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
        <Text>Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue: Category | null) => setCategory(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="--" value={null} />
          <Picker.Item label="Fruit" value={Category.Fruit} />
          <Picker.Item label="Vegetable" value={Category.Vegetable} />
          <Picker.Item label="Dairy" value={Category.Dairy} />
          <Picker.Item label="Fish" value={Category.Fish} />
          <Picker.Item label="Meat" value={Category.Meat} />
          <Picker.Item label="Liquid" value={Category.Liquid} />
        </Picker>
        <Text>Total of ingredients in {location}  and in {category} : {context.sameCategory.length}</Text>
        <Text> </Text>
        <Text>List of Ingredients:</Text>
        <Text> </Text>
        <FlatList
        data={context.sameCategory}
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

export default sameAtributes;



