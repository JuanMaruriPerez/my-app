// Definir enums para category, location y confection
export enum Category {
  Fruit = "fruit",
  Vegetable = "vegetable",
  Dairy = "dairy",
  Fish = "fish",
  Meat = "meat",
  Liquid = "liquid",
 
}

export enum Location {
  Fridge = "fridge",
  Freezer = "freezer",
  Pantry = "pantry",
}

export enum Confection {
  Fresh = "fresh",
  Canned = "canned",
  Cured = "cured",
}

export enum State{
  L = "Low",
  M = "Medium",
  H = "High",
  Frozen = "Frozen",
}
export enum Binary{
  yes = 'yes',
  no = 'no'
}


// Definir el tipo Ingredient usando los enums
export type Ingredient = {
  //id: number;
  name: string;
  brand: string
  category: Category | null ;
  location: Location | null ;
  confection: Confection | null ;
  expiration: { 
    date: string | null ,
    from_now: number | null
  };
  ripeness: {
    state: State | null ;
    date: string | null,
  };
  open: Binary;
}

export interface IngredientDatabase {
  id: number;
  name: string;
  brand: string;
  category: string;
  location: string;
  confection: string;
  expiration_date: string;
  expiration_from_now: number;
  ripeness_state: string;
  ripeness_date: string;
  open: string;
}


//export let Ingredients: Ingredient[] = []
  
