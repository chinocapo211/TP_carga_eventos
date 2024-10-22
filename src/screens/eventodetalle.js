import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventoDetalle = ({ navigation, route }) => {
  // Recibimos el evento desde los parámetros de la navegación
  const { event } = route.params || {};
  console.log("aca",route.params);
  console.log("aca",event);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/*
        <Text style={styles.title}>Detalle Evento</Text>
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
          <Text style={styles.detailText}>{event.location || 'Sin ubicación'}</Text>
        </View>
        */}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
});

export default EventoDetalle;
