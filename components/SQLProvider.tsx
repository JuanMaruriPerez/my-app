
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';



/** Database Context Provider  */

export function useDatabase():SQLiteDatabase {
  return useSQLiteContext();
}


