import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import userApi from '../api/userApi';
const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !first_name || !last_name || !password ) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    Alert.alert('Registro Exitoso', `Usuario: ${first_name}\nEmail: ${email}`);

    try
    {
        const result = await userApi.RegisterUser(first_name,last_name,email,password) 
        if (result.status === 200) {
            navigation.navigate('Login');
        }else
        {
            alert("Usuario o contraseña incorrecta");
        }
    }  
    catch(error)
    {
        console.error('Login error:', error);
    }

    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={first_name}
            onChangeText={(text) => setFirst_name(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={last_name}
            onChangeText={(text) => setLast_name(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
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
});

export default Registro;
