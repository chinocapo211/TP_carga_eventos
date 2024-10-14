import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Picker, Switch  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { all_categories } from '../api/categoriesApi';
import { all_locations } from '../api/locations'; 

const CrearEvento = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [idEventCategory, setIdEventCategory] = useState('');
  const [idEventLocation, setIdEventLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [enabledForEnrollment, setEnabledForEnrollment] = useState(false);
  const [maxAssistance, setMaxAssistance] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const getCategories = async () => {
    try {
      const result = await all_categories();
      console.log(result);
      if (result.status === 200) {
        setCategories(result.data); 
      } else {
        alert('Error categories');
      }
    } catch (error) {
      console.error('Error categories catch', error);
    }
  };

  const getLocations = async () => {
    try {
      const result = await all_locations();
      console.log(result);
      if (result.status === 200) {
        setLocations(result.data); 
      } else {
        alert('Error locations');
      }
    } catch (error) {
      console.error('Error locations catch', error);
    }
  };

  useEffect(() => {
    getCategories();
    getLocations();
  }, []);

  const handleSubmit = () => {
    if (!name || !description || !idEventCategory || !idEventLocation || !startDate || 
        !durationInMinutes || !price || !maxAssistance) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const eventData = {
      name,
      description,
      id_event_category: parseInt(idEventCategory),
      id_event_location: parseInt(idEventLocation),
      start_date: new Date(startDate),
      duration_in_minutes: parseInt(durationInMinutes),
      price: parseInt(price),
      enabledForEnrollment,
      max_assistance: parseInt(maxAssistance),
    };

    // Aquí podrías enviar el eventData a tu API o manejador de eventos
    console.log(eventData);
    alert('Evento creado correctamente');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre del evento"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Picker
          selectedValue={idEventCategory}
          onValueChange={(itemValue) => setIdEventCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
          ))}
        </Picker>
        <Picker
          selectedValue={idEventLocation}
          onValueChange={(itemValue) => setIdEventLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una locación" value="" />
          {locations.map((location) => (
            <Picker.Item key={location.id} label={location.name} value={location.id.toString()} />
          ))}
        </Picker>
        <TextInput
          placeholder="Fecha de inicio (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Duración (en minutos)"
          value={durationInMinutes}
          onChangeText={setDurationInMinutes}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Máxima asistencia"
          value={maxAssistance}
          onChangeText={setMaxAssistance}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Habilitar para inscripciones</Text>
          <Switch
            value={enabledForEnrollment}
            onValueChange={setEnabledForEnrollment}
          />
        </View>
        <Button title="Crear Evento" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginRight: 10,
  },
});

export default CrearEvento;
