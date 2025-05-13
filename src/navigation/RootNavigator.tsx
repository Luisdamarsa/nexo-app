import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme/theme';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LawyerHomeScreen from '../screens/lawyer/LawyerHomeScreen';
import NewCaseScreen from '../screens/NewCaseScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Chat: { caseId: string };
  NewCase: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cases: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.background,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.gray,
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.background,
    }}
  >
    <MainTab.Screen name="Home" component={HomeScreen} />
    <MainTab.Screen name="Cases" component={NewCaseScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
);

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={MainNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="NewCase"
      component={NewCaseScreen}
      options={{ title: 'New Case' }}
    />
  </Stack.Navigator>
);

export default RootNavigator; 