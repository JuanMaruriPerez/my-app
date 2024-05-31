
import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
//import { IngredientsContext } from "../../components/IngredientsProvider";
import styles from "../../styles/AppStyles";

const Lists: React.FC = () => {
  const context = useContext(IngredientsContext);

  // Manejo del caso cuando el contexto no está disponible
  if (!context) {
    return <Text>Loading...</Text>; // Otra lógica para manejar el contexto indefinido
  }

   

  return (
    <View style={styles.container_basic}>
      <Text>Total of ingredients: {context.ingredients.length}</Text>
      <Text> </Text>
      <Text>List of Ingredients:</Text>
      <Text> </Text>
      {/* Renderización de la lista de ingredientes */}
      <FlatList
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

          </View>
        )}
      />
    </View>
  );
};

export default Lists;
