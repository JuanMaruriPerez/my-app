// app/(tabs)/home.tsx
import React, { useState } from "react";
import { View, Button } from "react-native";
import { Ingredient } from "../../data/ingredients";
import styles from "../../styles/AppStyles";
import IngredientForm from "../../components/IngredientForm";
import { useIngredients } from '../../components/IngredientsProvider';
import { useDatabase } from "@/components/SQLProvider";
import { addIngredientToDatabase } from "@/database/database";

const Home: React.FC = () => {
  /** Contexts  */
  const context = useIngredients();  
  const db = useDatabase();

  /** Local states */
  const [isModalVisible, setModalVisible] = useState(false);


  /** Action taken when adding new ingredient */
  const handleAddIngredient = (newIngredient: Ingredient) => {

    context.addIngredient(newIngredient);           /** Local memory */
    addIngredientToDatabase(db,newIngredient);     /** Persistent memory */
    setModalVisible(false);                       /** Close form */

  };

  return (
    <View style={styles.container_basic}>
      <Button title="Add Ingredients" onPress={() => setModalVisible(true)} />
      <IngredientForm
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddIngredient}
      />
    </View>
  );
};

export default Home;
