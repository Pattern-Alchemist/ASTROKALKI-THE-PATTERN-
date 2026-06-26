/**
 * Firebase Configuration
 *
 * Config sourced from the parallel Google Gemini-built project
 * (the-pattern-recognition-institute). Same Firebase project reused.
 *
 * To enable Firebase in production:
 * 1. npm install firebase
 * 2. Uncomment the initialization below
 * 3. Import functions from this file where needed
 *
 * Firestore rules are in /firestore.rules (from the parallel project)
 */

export const firebaseConfig = {
  projectId: "kinetic-hangout-v5xj8",
  appId: "1:694076127039:web:230530bf5857ae0caa458a",
  apiKey: "AIzaSyCOhdQ3COa6x5LzSi5O_vDOotcirpes7JI",
  authDomain: "kinetic-hangout-v5xj8.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-thepatternrecogn-01c192d1-a86b-43eb-a40a-d628e1cda184",
  storageBucket: "kinetic-hangout-v5xj8.firebasestorage.app",
  messagingSenderId: "694076127039",
  measurementId: "",
};

/**
 * Firebase initialization is commented out until the `firebase` package
 * is installed. When ready:
 *
 * import { initializeApp } from 'firebase/app';
 * import { getFirestore } from 'firebase/firestore';
 * import { getAuth } from 'firebase/auth';
 *
 * const app = initializeApp(firebaseConfig);
 * export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
 * export const auth = getAuth(app);
 */

// Firestore collection schemas (from firebase-blueprint.json)
export const collections = {
  patternLogs: 'pattern_logs',
  corporateInquiries: 'corporate_inquiries',
  consultations: 'consultations',
  emailSubscribers: 'email_subscribers',
} as const;

// Pattern Log schema
export interface PatternLog {
  userId: string;
  emotion: string;
  patternType: string;
  trigger: string;
  thought: string;
  createdAt: number; // timestamp
}

// Corporate/WhatsApp enquiry schema
export interface ConsultationEnquiry {
  name: string;
  email?: string;
  phone: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  challenge?: string;
  preferredService?: string;
  createdAt: number;
  status: 'new' | 'contacted' | 'booked' | 'completed';
}
