import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from './navigator/StackNavigator';
import { PaperProvider } from 'react-native-paper';

import IonIcon from 'react-native-vector-icons/Ionicons'

export const PokedexApp = () => {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <IonIcon {...props} />
      }}
    >
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>

  );
};