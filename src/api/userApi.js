import {apiManager} from "./apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
const user_login = async (Username,Password) => {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,  
  };
  const data =
  {
    username: Username,
    password: Password,
  }
  try {
    const result = await apiManager('POST', headers, data, 'user/login');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

const ObtenerInfoJugador = async (token) => {
  console.log('Token:', token);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true,  
  };
  const data = {};  
  const path = "auth/Decode";  
  
  try {
    const result = await apiManager(method, headers, data, path);
    console.log('User info response:', result.data);  // Cambia result a result.data para acceder a los datos de la respuesta
    return result.data;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error.message);
    await AsyncStorage.removeItem('@AccessToken');
    return { error: error.message };
  }
};
const RegisterUser = async (Email,Password,Username) =>
{

    const headers = {
        "Content-Type": "application/json",
    }

    const data =
  {
    email: Email,
    username: Username,
    password: Password,
  }
  try {
    const result = await apiManager('POST', headers, data, 'user/register');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
}

export default { user_login, ObtenerInfoJugador,RegisterUser};