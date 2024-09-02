import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home';
import Login from './src/screens/login';
import Registro from './src/screens/registro';

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
      <LoginStack.Screen name="Home" component={Home}/>
    </LoggedStack.Navigator>
  );
}

  function AppNavigator() {
    return (
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Login" component={LoginStackScreen} />
          <AppStack.Screen name="Logged" component={LoggedStackScreen} />
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