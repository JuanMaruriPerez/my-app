
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView, Button } from "react-native";
import styles from "../../styles/AppStyles";
import { Picker } from "@react-native-picker/picker";

import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";

const sameCategory: React.FC = () => {
  /** Contexts */
  const db = useDatabase();
  const context = useIngredients();
  
  const [location, setLocation] = useState<Location | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
        
  const getSameCategory= ()=> {
    const list: Ingredient[] = [];
    let query = 'SELECT * FROM ingredients';
    const conditions: string[] = [];
    const params: (Location | Category)[] = [];

    if (location !== null) {
        conditions.push('location = ?');
        params.push(location);
      }
  
      if (category !== null) {
        conditions.push('category = ?');
        params.push(category);
      }
  
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

    if (location  === null ) {
      alert('Please, select a valid location.');
      return;
    } 
      try {
        const result = db.getAllSync<IngredientDatabase>(query, ...params);
        console.log("Total ingredientes en la base de datos: ", result.length); // Añadir este log para ver el total de ingredientes
        if (result.length > 0) {
          result.forEach(dbIngredient => {
            let newIng: Ingredient = {
              name: dbIngredient.name,
              brand: dbIngredient.brand,
              category: dbIngredient.category as Category,
              location: dbIngredient.location as Location,
              confection: dbIngredient.confection as Confection,
              expiration: {
                date: dbIngredient.expiration_date,
                from_now: dbIngredient.expiration_from_now,
              },
              ripeness: {
                state: dbIngredient.ripeness_state as State,
                date: dbIngredient.ripeness_date
              },
              open: dbIngredient.open as Binary,
            };                 
            console.log(dbIngredient); // Añadir este log para ver el total de ingredientes
            console.log(newIng);
            list.push(newIng)
          });
        }
        console.log("Ingredientes cargados desde la base de datos.");
      } catch (error) {
        console.error("Error loading ingredients from database: ", error);
      }finally {
        context.addSameCategory(list)
      }
    }


  return (
    
      <View style={styles.container_basic}>
        <Button
        title="Search"
        onPress={getSameCategory}
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
        
          {/*
        <View >
          {context.ingredients.map((ingredient, index) => (
            <View  key={index}>
              <Text>{ingredient.name}</Text>
              <Text>{`${ingredient.name} - ${ingredient.expiration.from_now}`}</Text>
              <Text>{ingredient.category}</Text>
              <Text>{ingredient.location}</Text>
              <Text>{ingredient.confection}</Text>
              <Text>{ingredient.expiration.date}</Text>
              <Text>{ingredient.expiration.from_now}</Text>
            </View>
          ))}
        </View>
        */}
      </View>
  );
};

export default sameCategory;



/*
CREATE TABLE ingredients (id integer primary key autoincrement, name text, category text, location text, confection text, expiration_date text, expiration_from_now text);
*/
/**
 * <FlatList
        data={context.ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Confection: {item.confection}</Text>
            <Text>Expiration: {item.expiration.date}</Text>
            <Text>Expiration from now: {item.expiration.from_now}</Text>
            <Text> </Text>
          </View>
        )}
        />
 */