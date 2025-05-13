import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { firebaseService } from '../services/firebase';
import type { Lawyer } from '../types';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyLawyers = async () => {
      try {
        // Example coordinates for Bogotá, Colombia
        const nearbyLawyers = await firebaseService.findNearbyLawyers(
          4.6097,
          -74.0817,
          'all'
        );
        setLawyers(nearbyLawyers);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyLawyers();
  }, []);

  const renderLawyerCard = ({ item }: { item: Lawyer }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Specialties: {item.specialties.join(', ')}</Paragraph>
        <Paragraph>Rating: {item.rating} ⭐</Paragraph>
        <Paragraph>Cases: {item.cases}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NewCase', { lawyerId: item.id })}
        >
          Contact
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lawyers}
        renderItem={renderLawyerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('NewCase')}
        label="New Case"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen; 