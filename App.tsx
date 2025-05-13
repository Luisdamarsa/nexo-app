import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme/theme';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App; 