import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import type { User, Lawyer, Case, Message } from '../types';

class FirebaseService {
  // Authentication Methods
  async signUp(email: string, password: string, userData: Partial<User>): Promise<User | null> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          ...userData,
          id: user.uid,
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      return this.getUserData(user.uid);
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return this.getUserData(userCredential.user.uid);
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Error', 'Invalid email or password.');
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  }

  // User Data Methods
  async getUserData(userId: string): Promise<User | null> {
    try {
      const doc = await firestore().collection('users').doc(userId).get();
      return doc.exists ? (doc.data() as User) : null;
    } catch (error) {
      console.error('Get user data error:', error);
      return null;
    }
  }

  async updateUserLocation(userId: string, latitude: number, longitude: number): Promise<void> {
    try {
      await firestore().collection('users').doc(userId).update({
        location: { latitude, longitude },
      });
    } catch (error) {
      console.error('Update location error:', error);
    }
  }

  // Case Methods
  async createCase(caseData: Partial<Case>): Promise<string | null> {
    try {
      const caseRef = await firestore().collection('cases').add({
        ...caseData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      return caseRef.id;
    } catch (error) {
      console.error('Create case error:', error);
      return null;
    }
  }

  async updateCaseStatus(caseId: string, status: Case['status']): Promise<void> {
    try {
      await firestore().collection('cases').doc(caseId).update({
        status,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Update case status error:', error);
    }
  }

  // Message Methods
  async sendMessage(caseId: string, message: Partial<Message>): Promise<void> {
    try {
      await firestore().collection('messages').add({
        ...message,
        caseId,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // Update case's last activity
      await firestore().collection('cases').doc(caseId).update({
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Send message error:', error);
    }
  }

  // File Upload Methods
  async uploadFile(uri: string, path: string): Promise<string | null> {
    try {
      const reference = storage().ref(path);
      await reference.putFile(uri);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  }

  // Lawyer Search Methods
  async findNearbyLawyers(
    latitude: number,
    longitude: number,
    topic: string,
    radiusInKm: number = 50
  ): Promise<Lawyer[]> {
    try {
      // Get all lawyers with matching specialty
      const lawyersSnapshot = await firestore()
        .collection('users')
        .where('role', '==', 'lawyer')
        .where('specialties', 'array-contains', topic)
        .where('available', '==', true)
        .get();

      const lawyers = lawyersSnapshot.docs.map(doc => doc.data() as Lawyer);

      // Filter lawyers by distance
      return lawyers.filter(lawyer => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          lawyer.location.latitude,
          lawyer.location.longitude
        );
        return distance <= radiusInKm;
      });
    } catch (error) {
      console.error('Find lawyers error:', error);
      return [];
    }
  }

  // Helper Methods
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}

export const firebaseService = new FirebaseService(); 