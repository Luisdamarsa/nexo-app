export type LegalTopic = 
  | 'traffic'
  | 'credit'
  | 'health'
  | 'property'
  | 'family'
  | 'labor'
  | 'criminal'
  | 'administrative'
  | 'commercial'
  | 'other';

export type CaseStatus =
  | 'pending'
  | 'accepted'
  | 'delivered'
  | 'appealed'
  | 'firstInstance'
  | 'received'
  | 'response'
  | 'closed'
  | 'canceled';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'lawyer';
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
}

export interface Lawyer extends User {
  specialties: LegalTopic[];
  rating: number;
  cases: number;
  description: string;
  certifications: string[];
  available: boolean;
}

export interface Case {
  id: string;
  clientId: string;
  lawyerId: string;
  topic: LegalTopic;
  description: string;
  suggestedPrice: number;
  finalPrice: number;
  status: CaseStatus;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  attachments: Document[];
}

export interface ChatRoom {
  id: string;
  caseId: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
} 