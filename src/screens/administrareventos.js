import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { all_events } from '../api/eventosApi';

const AdministrarEventos = ({ navigation }) => {
  const [proxEvents, setEventsProx] = useState([]);
  const [anteEvents, setEventsAnte] = useState([]);
  const [total, setTotal] = useState([]);
  const getEvents = async () => {
    try {
      const result = await all_events();
      if (result.status === 200) {
        const futuro = [];
        const pasado = [];
        setTotal(result.data)
        result.data.forEach(element => {
          const now = new Date();
          if (new Date(element.start_date) > now) {
            futuro.push(element);
          } else {
            pasado.push(element);
          }
        });
        setEventsProx(futuro);
        setEventsAnte(pasado);
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

  const handleDetalle = (item) => {
    console.log(item)
    navigation.navigate("LoggedStack", { screen: "EventoDetalleAdmin", params: { event: item } });
  }

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.name}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.eventButton} onPress={() => handleDetalle(item)}>
        <Text style={styles.eventButtonText}>Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador</Text>
        <Text style={styles.introduction}>
          Estamos encantados de tenerte aquí. Nuestra aplicación te ayudará a lograr la felicidad.
          Explora, disfruta y no dudes en contactarnos si necesitas ayuda.
        </Text>

        <View style={styles.listContainer}>
          <View style={styles.listColumn}>
            <Text style={styles.columnTitle}>Próximos Eventos</Text>
            <FlatList
              data={proxEvents}
              renderItem={renderEvent}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.listColumn}>
            <Text style={styles.columnTitle}>Eventos Pasados</Text>
            <FlatList
              data={anteEvents}
              renderItem={renderEvent}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  introduction: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  eventContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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

export default AdministrarEventos;
