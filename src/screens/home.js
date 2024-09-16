import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Nuestra App!</Text>
        <Text style={styles.introduction}>
          Estamos encantados de tenerte aquí. Nuestra aplicación te ayudará a lograr [tu objetivo o beneficios de la app].
          Explora, disfruta y no dudes en contactarnos si necesitas ayuda.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0', // Color de fondo gris claro
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    padding: 20, // Espaciado alrededor del contenido
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Espacio entre el título y la introducción
  },
  introduction: {
    fontSize: 18,
    color: '#333', // Color del texto de introducción
    textAlign: 'center',
    lineHeight: 24, // Mejora la legibilidad del texto
  },
});

export default Home;
