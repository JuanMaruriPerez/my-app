// IngredientForm.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ingredient, Category, Location, Confection, State, Binary } from '../data/ingredients';
import styles from '../styles/AppStyles';


/** Interface used by adding and updating ingredients features */
interface IngredientFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (ingredient: Ingredient) => void;
  init_ing?: Ingredient;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ visible, onClose, onSubmit,  init_ing}) => {
  /**Local states */
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [open, setOpen] = useState<Binary>(Binary.no);
  const [category, setCategory] = useState<Category | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [confection, setConfection] = useState<Confection | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [expirationFromNow, setExpirationFromNow] = useState<number | null>(null);
  const [ripenessState, setRipenessState] = useState<State | null>(null);
  const [ripenessDate, setRipenessDate] = useState<string | null>(null);


  /** Begin of Set of functions to work with dates */
  /** 1  */
  const calculateDaysFromNow = (dateString: string) => {
    const expirationDateObj = new Date(dateString);
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Número de milisegundos en un día
    return Math.ceil((expirationDateObj.getTime() - currentDate.getTime()) / millisecondsPerDay);
  };
  /** 2  */
  const calculateDateFromNow = (days: number) => {
    const currentDate = new Date();
    const expirationDateObj = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return expirationDateObj.toISOString().split('T')[0];
  };
  /** 3  */
  const handleExpirationDateChange = (date: string) => {
    setExpirationDate(date);
    const daysFromNow = calculateDaysFromNow(date);
    setExpirationFromNow(daysFromNow);
  };
  /** 4  */
  const handleExpirationFromNowChange = (days: number | null) => {
    setExpirationFromNow(days);
    if (days !== null) {
      const dateFromNow = calculateDateFromNow(days);
      setExpirationDate(dateFromNow);
    } else {
      setExpirationDate(null);
    }
  };
  /** End of set of date functions */


  /** Function used to restart form boxes and local states*/
  const clearForm = () => {
    setName('');
    setBrand('');
    setCategory(null);
    setLocation(null);
    setConfection(null);
    setExpirationDate(null);
    setExpirationFromNow(null);
    setRipenessState(null);
    setRipenessDate(null);
    setOpen(Binary.no);
  };

  /** Action taked when form closed */
  const handleClose = () => {
    clearForm();
    onClose();
  };

  /** Effect used when updating ingredients, pre-selected values are visible when updating. */
  useEffect(() => {
    if (init_ing) {
      setName(init_ing.name || '');
      setBrand(init_ing.brand || '')
      setCategory(init_ing.category || null);
      setLocation(init_ing.location || null);
      setConfection(init_ing.confection || null);
      setExpirationDate(init_ing.expiration.date || null);
      setExpirationFromNow(init_ing.expiration.from_now || null);
      setRipenessState(init_ing.ripeness.state || null);
      setRipenessDate(init_ing.ripeness.date || null);
      setOpen(init_ing.open || Binary.no)
    }
  }, [init_ing]);

  /** Effect used when ingredient state change to frozen --> expirationDate set to 180days  */
  useEffect(() => {
    if (ripenessState === State.Frozen) {
      handleExpirationFromNowChange(180);
    }
  }, [ripenessState]);


  /** Set of action taked when "Add Ingredient" button pressed */
  const handleSubmit = () => {

    /** First check if name is valid, if not alert and non ingredient added*/
    if (name.trim() === '') {
      alert('Please, select a valid name.');
      return;
    }


    /** New Ingredient created by user */
    const newIngredient: Ingredient = {
      name,
      brand,
      category,
      location,
      confection,
      expiration: {
        date: expirationDate,
        from_now: expirationFromNow,
      },
      ripeness: {
        state: ripenessState,
        date: ripenessDate
      },
      open,
    };

    /** Adding the new ingredients */
    onSubmit(newIngredient);

    /** Telling the user that everything went fine */
    alert(newIngredient.name + " added!")

    /** Clearing form for next ingredients */
    clearForm();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container_insert}>
        <ScrollView contentContainerStyle={styles.container_basic}>
          <Text style={styles.header}>{init_ing ? "Update Ingredient" : "Add Ingredient"}</Text>
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
            <Text>Brand:</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Brand"
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
              onValueChange={(itemValue: Confection | null) => 
                {setConfection(itemValue);
                  if (itemValue) {
                    setRipenessDate(new Date().toISOString().split('T')[0]);
                  }
                }}
              style={styles.input}
            >
              <Picker.Item label="--" value={null} />
              <Picker.Item label="Fresh" value={Confection.Fresh} />
              <Picker.Item label="Canned" value={Confection.Canned} />
              <Picker.Item label="Cured" value={Confection.Cured} />
            </Picker>
            {confection === Confection.Fresh && (
            <>
              <View>
                <Text>Ripeness State:</Text>
                <Picker
                  selectedValue={ripenessState}
                  onValueChange={(itemValue: State | null) => setRipenessState(itemValue)}
                  style={styles.input}
                >
                  <Picker.Item label="--" value={null} />
                  <Picker.Item label="L" value={State.L} />
                  <Picker.Item label="M" value={State.M} />
                  <Picker.Item label="H" value={State.H} />
                  <Picker.Item label="Frozen" value={State.Frozen} />
                </Picker>
                <Text></Text>
              </View>
            </>
          )}
          </View>
          <View>
          <Text>Open:</Text>
          <Picker
            selectedValue={open}
            onValueChange={(value: string) => {setOpen(value as Binary);
              if ( value === 'yes' ){
                alert('Expiration date may change');
              }
            }}
            style={styles.input}
          >
            <Picker.Item label="Yes" value={Binary.yes} />
            <Picker.Item label="No" value={Binary.no} />
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
              value={ expirationFromNow ? expirationFromNow.toString() : ''}
              onChangeText={(value) => handleExpirationFromNowChange(parseInt(value) || null)}
              placeholder="Days from now"
              keyboardType="numeric"
            />
          </View>
          
          <Button title={init_ing ? "Update Ingredient" : "Add Ingredient"} onPress={handleSubmit} />
          <Button title="Close" onPress={handleClose} color="red" />
        </ScrollView>
      </View>
    </Modal>
  );
};


export default IngredientForm;
