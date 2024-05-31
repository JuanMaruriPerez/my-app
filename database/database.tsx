import { Category, Location, Confection, Ingredient, IngredientDatabase, State, Binary } from "@/data/ingredients";
import { SQLiteDatabase } from "expo-sqlite";
import { IngredientsContextType } from '../components/IngredientsProvider';
import { Name } from "@/data/users";


/* DATABASE TABLE ingredients SCHEMA:
*
*      CREATE TABLE IF NOT EXISTS ingredients (
*        id INTEGER PRIMARY KEY AUTOINCREMENT,
*        name TEXT,
*        brand TEXT,
*        category TEXT,
*        location TEXT,
*        confection TEXT,
*        expiration_date TEXT,
*        expiration_from_now INTEGER,
*        ripeness_state TEXT,
*        ripeness_date TEXT,
*        open TEXT
*      );
*/


/** Set of functions used for database management, there is one database with one table: ingredients*/


/**
 * This function adds a new ingredient to the table ingredients
 * @param db 
 * @param ingredient 
 */
export const addIngredientToDatabase = async (db: SQLiteDatabase, ingredient: Ingredient) => {
  try {

    await db.runAsync(`INSERT INTO ingredients (name, brand, category, location, confection, expiration_date, expiration_from_now, ripeness_state, ripeness_date, open)
     VALUES (?,?,?,?,?,?,?,?,?,?)`, ingredient.name, ingredient.brand, ingredient.category, ingredient.location, ingredient.confection, ingredient.expiration.date,
      ingredient.expiration.from_now, ingredient.ripeness.state, ingredient.ripeness.date, ingredient.open);

    console.log("addIngredient : Executed!");
    console.log('Ingredient added!');

  } catch (error) {

    console.error("Error initializing the database: ", error);

  }
};

/**
 * Function used to return list of ingredients with determined query or params if specified
 * @param db 
 * @returns 
 */
export const getQuery = (db: SQLiteDatabase, optionalQuery?: string, optionalParams?: any[]): Ingredient[]=> {
  const list: Ingredient[] = [];
    try {
      let result;
      if (optionalQuery && optionalParams) {
        result = db.getAllSync<IngredientDatabase>(optionalQuery, optionalParams);
      } else {
        result = db.getAllSync<IngredientDatabase>('SELECT * FROM ingredients');
      }
      /** Adding each ingredient to list */
        result.forEach(dbIngredient => {
          list.push(newIngredient(dbIngredient))
        });

      console.log("Ingredient loaded from database.");
    } catch (error) {
      console.error("Error loading ingredients from database: ", error);
    }finally {
      return list;
    }
  }
/**
 * Funciton use to build same location or category 
 * @param item 
 * @returns 
 */
export function buildSameLocation (location: Location | null, category: Category | null): { query: string, params: any[] } {
  let query = 'SELECT * FROM ingredients';
  const conditions: string[] = [];
  const params: any[] = [];

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

  return { query, params };
}

/**
 * Function used to make the query to get a speciffic ingredient
 * @param item 
 * @returns 
 */
export function buildIngredientQuery(item: Ingredient): { query: string, params: any[] } {
  let query = 'SELECT * FROM ingredients';
  const conditions: string[] = [];
  const params: any[] = [];

  if (item.name !== null) {
      conditions.push('name = ?');
      params.push(item.name);
  }
  if (item.brand !== null) {
    conditions.push('brand = ?');
    params.push(item.brand);
  }
  if (item.category !== null) {
      conditions.push('category = ?');
      params.push(item.category);
  }
  if (item.location !== null) {
      conditions.push('location = ?');
      params.push(item.location);
  } 
  if (item.confection !== null) {
      conditions.push('confection = ?');
      params.push(item.confection);
  }
  if (item.expiration.date !== null) {
      conditions.push('expiration_date = ?');
      params.push(item.expiration.date);
  }
  if (item.expiration.from_now !== null) {
      conditions.push('expiration_from_now = ?');
      params.push(item.expiration.from_now);
  }
  if (item.ripeness.state !== null) {
    conditions.push('ripeness_state = ?');
    params.push(item.ripeness.state);
  }
  if (item.ripeness.date !== null) {
    conditions.push('ripeness_date = ?');
    params.push(item.ripeness.date);
  }
  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }
  return { query, params };
}

/**
 * Function used make the query to update a speciffic ingredient
 * @param item 
 * @param id 
 * @returns 
 */
export function buildIngredientUpdate(item: Ingredient, id:number): { query: string, params: any[] } {
  let query = 'UPDATE ingredients';
  const conditions: string[] = [];
  const params: any[] = [];

  if (item.name !== null) {
      conditions.push('name = ?');
      params.push(item.name);
  }
  if (item.brand !== null) {
    conditions.push('brand = ?');
    params.push(item.brand);
  }
  if (item.category !== null) {
      conditions.push('category = ?');              // Veer si puedo hacer que ingredientes cambien su estado null
      params.push(item.category);
  }
  if (item.location !== null) {
      conditions.push('location = ?');
      params.push(item.location);
  } 
  if (item.confection !== null) {
      conditions.push('confection = ?');
      params.push(item.confection);
  }
  if (item.expiration.date !== null) {
      conditions.push('expiration_date = ?');
      params.push(item.expiration.date);
  }
  if (item.expiration.from_now !== null) {
      conditions.push('expiration_from_now = ?');
      params.push(item.expiration.from_now);
  }
  if (item.ripeness.state !== null) {
    conditions.push('ripeness_state = ?');
    params.push(item.ripeness.state);
  }
  if (item.ripeness.date !== null) {
    conditions.push('ripeness_date = ?');
    params.push(item.ripeness.date);
  }
  if (item.open !== 'no'){
    conditions.push( ' open = ?')
    params.push(item.open)
  }
  if (conditions.length > 0) {
      query += ' SET ' + conditions.join(' , ');
  }
  query += ' WHERE id = ? '; 
  params.push(id);

  return { query, params };
}


/**
 * Function used to get id of an ingredient
 * @param db 
 * @param item 
 * @returns 
 */
export const getId = (db: SQLiteDatabase, item: Ingredient): number => {
  const { query, params } = buildIngredientQuery(item);
  try {

    const result = db.getAllSync<IngredientDatabase>(query,params);
    return result.length === 1 ? result[0].id : -1;
    
  }catch (error) {
    console.error("Error loading ingredients from database: ", error);
    return -1;
  }
  
}

/**
 * Function use to update an ingredient
 * @param ingredient 
 * @param id 
 */
export const updateIngredientToDatabase = async (db: SQLiteDatabase,ingredient: Ingredient, id: number) => {
  try {
    if (id === -1) {
      throw new Error("Invalid ID: -1");
    }
    const { query, params } = buildIngredientUpdate(ingredient,id);
    await db.runAsync(query,params);
    
    console.log("updateIngredientToDatabase: Excuted!");
  } catch (error) {
    console.error("Error updating the ingredient in the database: ", error);
  }
};


/**
 * Auxiliar function to translate type:Ingredientdatabase --> type:Ingredient 
 * @param dbIngredient 
 * @returns 
 */
const newIngredient = (dbIngredient: IngredientDatabase): Ingredient => {
  const newIng: Ingredient = {
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
    open: dbIngredient.open as Binary
  };      
  return newIng;
}




