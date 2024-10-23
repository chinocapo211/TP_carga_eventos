import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { all_events } from '../api/eventosApi';

const Home = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const[total, setTotalEvents] = useState([]);
  const handleCrearEvento = () => {
    navigation.navigate("LoggedStack", { screen: "CrearEvento" });
  };

  const handleAdministrar = () => {
    navigation.navigate("LoggedStack", { screen: "AdministrarEventos" });
  };

  const handleDetalle = (item) => {
    navigation.navigate("LoggedStack", { screen: "EventoDetalle", params: { event: item } });
};

  
  const getEvents = async () => {
    try {
      const result = await all_events();
      if (result.status === 200) {
        const devolver = [];
        result.data.forEach(element => {
          const now = new Date();
          if (new Date(element.start_date) > now) {
            devolver.push(element);
          }
        });
        setEvents(devolver);
        setTotalEvents(result.data) 
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
      <Text style={styles.eventTitle}>{item.name || 'Sin título'}</Text>
      <Text style={styles.eventDescription}>{item.description || 'Sin descripción'}</Text>
      <Text style={styles.eventDescription}>{item.id}</Text>
      <TouchableOpacity style={styles.eventButton} onPress={() => handleDetalle(item)}>
        <Text style={styles.eventButtonText}>Detalles</Text>
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.registerButton} onPress={handleCrearEvento}>
          <Text style={styles.registerButtonText}>Crear Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleAdministrar}>
          <Text style={styles.registerButtonText}>Administrar eventos</Text>
        </TouchableOpacity>
        <View style={styles.list}>
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de que 'id' sea único
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  list: {
    marginTop: 30,
    width: "80%",
  },  
  registerButton: {
    width: '30%',
    padding: 16,
    backgroundColor: '#24292e',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 40,
  },
  registerButtonText: {
    color: '#ffffff',
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center', // Centrar contenido
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 16,
    color: '#666',
  },
  eventButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#808080', // Color gris para el botón
    borderRadius: 5,
    alignItems: 'center',
    width:"40%",
  },
  eventButtonText: {
    color: '#ffffff', // Texto blanco para el botón de evento
    fontWeight: 'bold',
  },
});

export default Home;
