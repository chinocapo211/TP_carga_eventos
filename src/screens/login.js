import React, { useState } from 'react';
import userApi from "../api/userApi";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView, Platform, KeyboardAvoidingView, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    try {
      const result = userApi.user_login(username, password);
      if (result.status === 200) {
        const token = result.data.token; // Suponiendo que el token está en result.data.token
        navigation.navigate('Home', { token });
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Login error:', error);
    }

    navigation.navigate("Logged");
  };

  const handleRegister = () => {
    navigation.navigate('Registro'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fa', // Fondo gris claro similar al de GitHub
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  innerContainer: {
    backgroundColor: '#ffffff', // Fondo blanco para el formulario
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Sombra para Android
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Máximo ancho para no expandirse demasiado en pantallas grandes
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333', // Color del texto similar al de GitHub
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 6, // Bordes redondeados
    backgroundColor: '#fafafa', // Fondo gris claro para los campos
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#24292e', // Fondo oscuro para el botón, similar al de GitHub
    borderRadius: 6, // Bordes redondeados
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff', // Texto blanco para el botón
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#24292e', // Fondo azul para el botón de registro
    borderRadius: 6, // Bordes redondeados
    alignItems: 'center',
    marginTop: 16,
  },
  /*
  registerButton:hover: {
    backgroundColor: '#007bff',
  },
  */
  registerButtonText: {
    color: '#ffffff', // Texto blanco para el botón de registro
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
