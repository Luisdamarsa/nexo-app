import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { firebaseService } from '../../services/firebase';
import type { User } from '../../types';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'client' | 'lawyer'>('client');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      return;
    }

    setLoading(true);
    try {
      const userData: Partial<User> = {
        name,
        email,
        phone,
        role,
        location: {
          latitude: 0,
          longitude: 0,
        },
      };

      const user = await firebaseService.signUp(email, password, userData);
      if (user) {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>Create Account</Title>
        <Text style={styles.subtitle}>Join the Nexo legal network</Text>

        <SegmentedButtons
          value={role}
          onValueChange={(value) => setRole(value as 'client' | 'lawyer')}
          buttons={[
            { value: 'client', label: 'Client' },
            { value: 'lawyer', label: 'Lawyer' },
          ]}
          style={styles.roleSelector}
        />
        
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          style={styles.button}
        >
          Register
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          Already have an account? Login
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  roleSelector: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  linkButton: {
    marginTop: theme.spacing.md,
  },
});

export default RegisterScreen; 