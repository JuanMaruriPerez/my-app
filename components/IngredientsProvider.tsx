import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Ingredient, IngredientDatabase } from '../data/ingredients';




/** Interface ingredients to save ingredients in local memory when app running */
export interface IngredientsContextType {
  ingredients: Ingredient[];
  expiringSoon: Ingredient[];
  misingData: Ingredient[];
  mra: Ingredient[];
  sameLocation : Ingredient[];
  sameCategory : Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  addIngredients: (ingredients: Ingredient[]) => void;
  getIngredients: () => Ingredient[];
  addExpiringSoon: (ingredient: Ingredient[]) => void;
  addMisingData: (ingredient: Ingredient[]) => void;
  addMRA: (ingredient: Ingredient[]) => void;
  addSameLocation: (ingredient: Ingredient[]) => void;
  addSameCategory: (ingredient: Ingredient[]) => void;
}

/** Props of component Ingredientsprovider */
interface IngredientsProviderProps {
  children: ReactNode; 
}



/** Context creation */
export const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

/** Component provider of context */

export const IngredientsProvider:  React.FC<IngredientsProviderProps> = ({ children }) => {
  /** Local states */
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [expiringSoon, setExpiringSoon] = useState<Ingredient[]>([]);
  const [misingData, setMisingData] = useState<Ingredient[]>([]);
  const [ mra, setMRA] = useState<Ingredient[]>([]);
  const [ sameLocation, setSameLocation] = useState<Ingredient[]>([]);
  const [ sameCategory, setSameCategory] = useState<Ingredient[]>([]);

  /** Set of functions to update local states */
  /** 1 */
  const addIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };
  /** 2 */
  const addIngredients = (ingredients: Ingredient[]) => {    /** This function exists because updating context one by one does not work */
    setIngredients(ingredients);
  };
  /** 3 */
  const getIngredients = () => {
    return ingredients;
  };
  /** 4 */
  const addExpiringSoon = (ingredients: Ingredient[]) => {
    setExpiringSoon(ingredients);
  };
  /** 5 */
  const addMisingData = (ingredients: Ingredient[]) => {
    setMisingData(ingredients);
  };
  /** 6 */
  const addMRA = (ingredients: Ingredient[]) => {
    setMRA(ingredients);
  };
  /** 7 */
  const addSameLocation = (ingredients: Ingredient[]) => {
    setSameLocation(ingredients);
  };
  /** 8 */
  const addSameCategory = (ingredients: Ingredient[]) => {
    setSameCategory(ingredients);
  };
  /** End of set of function to update local updates */

  
  return (
    <IngredientsContext.Provider value={{ ingredients, expiringSoon, misingData, mra, sameLocation, sameCategory,
      addIngredient, addIngredients, getIngredients, addExpiringSoon, addMisingData,
       addMRA, addSameLocation, addSameCategory }}>
      {children}
    </IngredientsContext.Provider>
  );
};

/** Ingredients Context Provider */
export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error('useIngredients debe ser usado dentro de un IngredientsProvider');
  }
  return context;
};
































