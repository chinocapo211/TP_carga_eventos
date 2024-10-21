
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Login from './screens/login';
import Registro from './screens/registro';
import CrearEvento from './screens/crearevento';
import AdministrarEventos from './screens/administrareventos';

const LoginStack = createStackNavigator();
const LoggedStack = createStackNavigator();
const AppStack = createStackNavigator();

function LoginStackScreen(){
  return(
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login}/>
      <LoginStack.Screen name="Registro" component={Registro}/>
    </LoginStack.Navigator>
  );
}

function LoggedStackScreen() {
  return (
    <LoggedStack.Navigator screenOptions={{ headerShown: false }}>
      <LoggedStack.Screen name="Home" component={Home}/>
      <LoggedStack.Screen name="CrearEvento" component={CrearEvento}/>
      <LoggedStack.Screen name="AdministrarEventos" component={AdministrarEventos}/>
    </LoggedStack.Navigator>
  );
}

  function AppNavigator() {
    return (
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="LoginStack" component={LoginStackScreen} />
          <AppStack.Screen name="LoggedStack" component={LoggedStackScreen} />
      </AppStack.Navigator>
    );
  }
 
export default function App() {
  return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  );
}