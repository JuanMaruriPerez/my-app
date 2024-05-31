import * as SQLite from 'expo-sqlite';
import { Ingredient } from '../data/ingredients';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';



// Define el contexto
let db: SQLite.SQLiteDatabase ;


export const moveDatabase = async () => {
    const databasePath = `${FileSystem.documentDirectory}SQLite/ingredients.db`;
    const asset = Asset.fromModule(require('../assets/database/ingredients.db'));
  
    try {
      // Crea el directorio de destino si no existe
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
  
      // Verifica si la base de datos ya existe en el destino
      const { exists } = await FileSystem.getInfoAsync(databasePath);
      if (!exists) {
        await FileSystem.downloadAsync(asset.uri, databasePath);
        console.log("Database moved successfully");
      } else {
        console.log("Database already exists");
      }
    } catch (error) {
      console.error("Error moving database:", error);
    }
  };
  
export const initializeDatabase = async () => {
  
    try {
        db = await SQLite.openDatabaseAsync('ingredients.db'); // Asegúrate de que esta ruta sea correcta
        createTables();
        console.log("Databases Inizializada y tablas creadas");
      } catch (error) {
        console.error('Error al abrir la base de datos:', error);
      }
  
};

const createTables = async () => {
  if (db) {
    db.runAsync(`
        CREATE TABLE IF NOT EXISTS ingredients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          category TEXT,
          location TEXT,
          confection TEXT,
          expiration_date TEXT,
          expiration_from_now INTEGER
        );
      `);
    }else{
        console.log("CreateTables; Error: db es null");
    }
}



export const insertIngredient = async (ingredient: Ingredient) => {
  if (db) {
    db.runAsync(`INSERT INTO ingredients 
    (name, category, location, confection, expiration_date, expiration_from_now)
     VALUES (?, ?, ?, ?, ?, ?)`,
     ingredient.name, ingredient.category, ingredient.location, ingredient.confection, ingredient.expiration.date, ingredient.expiration.from_now);
  }
};


