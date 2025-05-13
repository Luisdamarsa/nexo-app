import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, IconButton, Surface, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { firebaseService } from '../services/firebase';
import type { Message } from '../types';

const ChatScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const caseId = route.params?.caseId;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // TODO: Implement real-time message subscription
        // This is a placeholder for demo purposes
        setMessages([
          {
            id: '1',
            caseId,
            senderId: 'lawyer1',
            content: 'Hello! How can I help you today?',
            timestamp: new Date(),
            attachments: [],
          },
        ]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [caseId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    try {
      await firebaseService.sendMessage(caseId, {
        content: newMessage.trim(),
        attachments: [],
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Surface style={[
      styles.messageBubble,
      item.senderId === 'currentUser' ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text>{item.content}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
          multiline
        />
        <IconButton
          icon="send"
          size={24}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messageList: {
    padding: theme.spacing.md,
  },
  messageBubble: {
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    maxWidth: '80%',
    borderRadius: theme.borderRadius.md,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.lightGray,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightGray,
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
});

export default ChatScreen; 