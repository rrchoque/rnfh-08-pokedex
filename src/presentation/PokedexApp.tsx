import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from './navigator/StackNavigator';
import { PaperProvider } from 'react-native-paper';

import IonIcon from 'react-native-vector-icons/Ionicons'
import { ThemeContextProvider } from './context/ThemeContext';

export const PokedexApp = () => {
  return (
    <ThemeContextProvider>
      <StackNavigator />
    </ThemeContextProvider>

  );
};