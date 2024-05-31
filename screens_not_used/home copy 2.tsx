// app/(tabs)/home.tsx
import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, Button, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ingredient, Category, Location, Confection } from "../../data/ingredients";
import styles from "../../styles/AppStyles";

import { useIngredients } from '../../components/IngredientsProvider';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useDatabase } from "@/components/SQLProvider";


const Home: React.FC = () => {

  const context = useIngredients();  
  const db = useDatabase();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [confection, setConfection] = useState<Confection | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [expirationFromNow, setExpirationFromNow] = useState<number | null>(null);

  const calculateDaysFromNow = (dateString: string) => {
    const expirationDateObj = new Date(dateString);
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Número de milisegundos en un día

    // Calcular la diferencia en días entre la fecha de expiración y la fecha actual
    return Math.ceil((expirationDateObj.getTime() - currentDate.getTime()) / millisecondsPerDay);
  };

  const calculateDateFromNow = (days: number) => {
    const currentDate = new Date();
    const expirationDateObj = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return expirationDateObj.toISOString().split('T')[0];
  };

  const handleExpirationDateChange = (date: string) => {
    setExpirationDate(date);
    const daysFromNow = calculateDaysFromNow(date);
    setExpirationFromNow(daysFromNow);
  };

  const handleExpirationFromNowChange = (days: number | null) => {
    setExpirationFromNow(days);
    if (days !== null) {
      const dateFromNow = calculateDateFromNow(days);
      setExpirationDate(dateFromNow);
    } else {
      setExpirationDate(null);
    }
  };

   //Databases functions 
   const addIngredientToDatabase = async (ingredient: Ingredient) => {
    try {
      // Ejecutar la consulta SQL para crear la tabla si no existe
      await db.runAsync(`INSERT INTO ingredients (name, category,
        location, confection, expiration_date, expiration_from_now)
         VALUES (?,?,?,?,?,?)`, ingredient.name,ingredient.category,
         ingredient .location, ingredient.confection, ingredient.expiration.date
        ,ingredient.expiration.from_now );
      console.log("addIngredient : Ejecutado!");
      console.log('Alimento añadido!');
      db.closeAsync;
       //db.closeAsync;
    } catch (error) {
      console.error("Error initializing the database: ", error);
    }
  };

  const dropTables = () => {
    try {
      // Ejecutar la consulta SQL para crear la tabla si no existe
      db.runSync(`delete from ingredients;`);
      console.log('Elementos borrados!');
       db.closeAsync;
    } catch (error) {
      console.error(error);
    }
  };
  
 
  const handleSubmit = () => {
    if (name.trim() === '') {
      alert('Please, select a valid name.');
      dropTables();
      return;
    } else {
      alert(name + ' added.');
    }
    
    const newIngredient: Ingredient = {
      //id,
      name,
      category,
      location,
      confection,
      expiration: {
        date: expirationDate,
        from_now: expirationFromNow,
      },
    };
    context.addIngredient(newIngredient);
    addIngredientToDatabase(newIngredient)
    //console.log(newIngredient);
    
    // Limpiar el formulario después de agregar el ingrediente
    setName('');
    setCategory(null);
    setLocation(null);
    setConfection(null);
    setExpirationDate(null);
    setExpirationFromNow(null);
  };

 
  /*
  export function Content() {
    const db = useSQLiteContext();
    const context = useIngredients();
    
    useEffect(() => {
      async function setup() {
        const result = await db.getAllAsync<Ingredient>('SELECT * FROM ingredients');
        context.addIngredient(result[0]);
      }
      setup();
    }, []);
  
    return (
      <View >
        {context.ingredients.map((ingredient, index) => (
          <View  key={index}>
            <Text>{`${ingredient.name} - ${ingredient.expiration.from_now}`}</Text>
          </View>
        ))}
      </View>
    );
  }

*/
  return (
    <ScrollView contentContainerStyle={styles.container_basic}>
      <Text style={styles.header}>Add Ingredients</Text>
      <View>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
      </View>
      <View>
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
      </View>
      <View>
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
      </View>
      <View>
        <Text>Confection:</Text>
        <Picker
          selectedValue={confection}
          onValueChange={(itemValue: Confection | null) => setConfection(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="--" value={null} />
          <Picker.Item label="Fresh" value={Confection.Fresh} />
          <Picker.Item label="Canned" value={Confection.Canned} />
          <Picker.Item label="Cured" value={Confection.Cured} />
        </Picker>
      </View>
      <View>
        <Text>Expiration Date:</Text>
        <TextInput
          style={styles.input}
          value={expirationDate || ""}
          onChangeText={handleExpirationDateChange}
          placeholder="YYYY-MM-DD"
        />
      </View>
      <View>
        <Text>Expiration From Now (days):</Text>
        <TextInput
          style={styles.input}
          value={expirationFromNow ? expirationFromNow.toString() : ''}
          onChangeText={(value) => handleExpirationFromNowChange(parseInt(value) || null)}
          placeholder="Days from now"
          keyboardType="numeric"
        />
      </View>
      <Button
        title="Add Ingredient"
        onPress={handleSubmit}
      />
           
    </ScrollView>
    
  );
};

export default Home;


/*
export function Content() {
  const db = useSQLiteContext();
  const context = useIngredients();
  
  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Ingredient>('SELECT * FROM ingredients');
      context.addIngredient(result[0]);
    }
    setup();
  }, []);

  return (
    <View >
      {context.ingredients.map((ingredient, index) => (
        <View  key={index}>
          <Text>{`${ingredient.name} - ${ingredient.expiration.from_now}`}</Text>
        </View>
      ))}
    </View>
  );
}


*/
