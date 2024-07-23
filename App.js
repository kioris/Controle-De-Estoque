import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          initialParams={{ product: {}, quantity: 0 }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;