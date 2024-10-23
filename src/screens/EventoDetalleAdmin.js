import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { all_categories } from '../api/categoriesApi';
import { all_locations } from '../api/locations';
import { deleteEvent } from '../api/eventosApi';
const EventoDetalleAdmin = ({ navigation, route }) => {
  const { event } = route.params;
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const getCategories = async () => {
    try {
      const result = await all_categories();
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

  const handleDelete = async () => {
    const result = await deleteEvent(event.id,localStorage.getItem('userId'))
    if(result.status === 200){
      alert("Eliminado")
      navigation.goBack()
    }
    else{
      alert("Hubo un error")
    }
  }
  console.log(event)
  const category = categories[event.id_event_category - 1];
  const location = locations[event.id_event_location - 1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Administrar Evento</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Nombre:</Text>
          <Text style={styles.detailText}>{event.name || 'Sin título'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Descripción:</Text>
          <Text style={styles.detailText}>{event.description || 'Sin descripción'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Fecha de Inicio:</Text>
          <Text style={styles.detailText}>{event.start_date || 'Sin fecha'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Ubicación:</Text>
          <Text style={styles.detailText}>{location?.name || 'Sin ubicación'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Duración:</Text>
          <Text style={styles.detailText}>{event.duration_in_minutes + " minutos" || 'Sin duración'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Precio:</Text>
          <Text style={styles.detailText}>{"$" + event.price || 'Sin precio'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Categoría:</Text>
          <Text style={styles.detailText}>{category?.name || 'Sin categoría'}</Text>
        </View>
          <TouchableOpacity style={styles.enrollButton} onPress={handleDelete}>
            <Text style={styles.enrollButtonText}>Eliminar</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 26, // Aumentado
    fontWeight: 'bold',
    marginBottom: 20, // Ajustado para un poco más de espacio
    color: '#333',
    textAlign: 'center',
  },
  detailContainer: {
    width: '100%',
    height:"9.5%",
    backgroundColor: '#fff',
    padding: 15, // Aumentado
    marginVertical: 8, // Aumentado
    borderRadius: 8,
    elevation: 1,
  },
  detailLabel: {
    fontSize: 18, // Aumentado
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 15, // Aumentado
    color: '#666',
  },
  enrollButton: {
    width: '50%',
    padding: 15,
    backgroundColor: '#ff7e63', // Verde
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  enrollButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18, // Aumentado
  },
});

export default EventoDetalleAdmin;
