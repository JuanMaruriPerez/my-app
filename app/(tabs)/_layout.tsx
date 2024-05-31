// app/_layout.tsx
  import React from 'react';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import { Tabs } from 'expo-router';
  import { IngredientsProvider } from "../../components/IngredientsProvider";
  import { FontAwesome5 } from '@expo/vector-icons';
  import {  SQLiteProvider } from 'expo-sqlite';

  


  export default () => {

    

    return(
      <IngredientsProvider>
      <SQLiteProvider databaseName="ingredients.db" assetSource={{ assetId: require('@/assets/database/ingredients.db') }}  >
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) =><FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
          name="queries"
          options={{
            title: 'Queries',
            tabBarIcon: ({ color }) => <FontAwesome5 name="search" size={24} color={color} /> ,
          }}
          />
          <Tabs.Screen
          name="list"
          options={{
            title: 'List',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} /> ,
          }}
          />
          <Tabs.Screen
          name="expiring_soon"
          options={{
            title: 'Expiring Soon',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} /> ,
          }}
          />
      </Tabs>
      </SQLiteProvider>
      </IngredientsProvider> 
      
    )
  }

