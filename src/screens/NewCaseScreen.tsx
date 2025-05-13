import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, SegmentedButtons } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { firebaseService } from '../services/firebase';
import type { LegalTopic } from '../types';

const NewCaseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState<LegalTopic>('other');
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCase = async () => {
    if (!description || !suggestedPrice) {
      return;
    }

    setLoading(true);
    try {
      const caseId = await firebaseService.createCase({
        description,
        topic,
        suggestedPrice: parseFloat(suggestedPrice),
        lawyerId: route.params?.lawyerId || '',
        status: 'pending',
        documents: [],
      });

      if (caseId) {
        navigation.navigate('Chat', { caseId });
      }
    } catch (error) {
      console.error('Create case error:', error);
    } finally {
      setLoading(false);
    }
  };

  const legalTopics: { value: LegalTopic; label: string }[] = [
    { value: 'traffic', label: 'Traffic' },
    { value: 'credit', label: 'Credit' },
    { value: 'health', label: 'Health' },
    { value: 'property', label: 'Property' },
    { value: 'family', label: 'Family' },
    { value: 'labor', label: 'Labor' },
    { value: 'criminal', label: 'Criminal' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>New Legal Case</Title>

        <SegmentedButtons
          value={topic}
          onValueChange={(value) => setTopic(value as LegalTopic)}
          buttons={legalTopics}
          style={styles.topicSelector}
          multiSelect={false}
        />

        <TextInput
          label="Case Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          numberOfLines={4}
        />

        <TextInput
          label="Suggested Price (COP)"
          value={suggestedPrice}
          onChangeText={setSuggestedPrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={handleCreateCase}
          loading={loading}
          style={styles.button}
        >
          Create Case
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
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  topicSelector: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
});

export default NewCaseScreen; 