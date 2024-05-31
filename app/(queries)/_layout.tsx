import React from 'react';
import { Tabs } from 'expo-router';
import { IngredientsProvider } from "../../components/IngredientsProvider";
import { FontAwesome } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';


export default () => {
  return (
    <IngredientsProvider>
      <SQLiteProvider databaseName="ingredients.db" assetSource={{ assetId: require('@/assets/database/ingredients.db') }}  >
      <Tabs >
          <Tabs.Screen
            name="misingData"
            options={{
              title: 'Mising Data',
              tabBarIcon: ({ color }) =><FontAwesome size={28} name="stop" color={color} />,
            }}
          />
          <Tabs.Screen
            name="sameLocation"
            options={{
              title: 'Same Location',
              tabBarIcon: ({ color }) =><FontAwesome size={28} name="link" color={color} />,
            }}
          />
          <Tabs.Screen
            name="MRA"
            options={{
              title: 'Most Recently Added',
              tabBarIcon: ({ color }) =><FontAwesome size={28} name="history" color={color} />,
            }}
          />
          <Tabs.Screen
            name="sameAtributes"
            options={{
              title: 'Equal Atributes',
              tabBarIcon: ({ color }) =><FontAwesome size={28} name="repeat" color={color} />,
            }}
          />
        </Tabs>
      </SQLiteProvider>
      </IngredientsProvider> 
  );
};

