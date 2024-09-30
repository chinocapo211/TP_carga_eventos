import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {all_events} from '../api/eventosApi';

const Home = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  const handleButton = () => {
    navigation.navigate('CrearEvento'); 
  };

  const getEvents = async () => {
    try {
      const result = await all_events();
      console.log(result);
      if (result.status === 200) {
        setEvents(result.data); 
      } else {
        alert('Error', 'Muy mal mal');
      }
    } catch (error) {
      console.error('Mal no muy pero mal', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.name}</Text> {/* Cambia 'title' según tu estructura de evento */}
      <Text style={styles.eventDescription}>{item.description}</Text> {/* Cambia 'description' según tu estructura de evento */}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Nuestra App!</Text>
        <Text style={styles.introduction}>
          Estamos encantados de tenerte aquí. Nuestra aplicación te ayudará a lograr la felicidad.
          Explora, disfruta y no dudes en contactarnos si necesitas ayuda.
        </Text>
        <View style={styles.list}>
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id.toString()} // Asegúrate de que 'id' sea único
        />
        </View>
        
        <TouchableOpacity style={styles.registerButton} onPress={handleButton}>
            <Text style={styles.registerButtonText}>Crear Evento</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  list:{
    marginTop:"2%",
    width:"80%",
    display:"flex",
    flexDirection:"row",
    flexWrap:"nowrap",
  },  
  registerButton: {
    width: '30%',
    padding: 16,
    backgroundColor: '#24292e', // Fondo azul para el botón de registro
    borderRadius: 6, // Bordes redondeados
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#ffffff', // Texto blanco para el botón de registro
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: "3%",
  },
  introduction: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: "2%",
    lineHeight: 24,
  },
  eventContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    display:"flex",
    textAlign:"center",
    alignItems:"center",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default Home;
