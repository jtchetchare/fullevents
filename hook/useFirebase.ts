import { useState, useEffect, useRef } from 'react';
import { 
  initializeApp, 
  getApps, 
  FirebaseApp 
} from "firebase/app";
import { 
  getAuth, 
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider 
} from "firebase/auth";
import { 
  getFirestore, 
  Firestore 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
};

export interface FirebaseServices {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  googleProvider: GoogleAuthProvider | null;
  facebookProvider: FacebookAuthProvider | null;
  isInitialized: boolean;
}

export const useFirebase = (): FirebaseServices => {
  const [firebase, setFirebase] = useState<FirebaseServices>({
    app: null,
    auth: null,
    db: null,
    googleProvider: null,
    facebookProvider: null,
    isInitialized: false
  });

  const isInitializing = useRef(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Éviter les initialisations multiples
    if (isInitializing.current || !isMounted.current) {
      return;
    }

    // Ne s'exécute que côté client
    if (typeof window === 'undefined') {
      return;
    }

    // Vérifier si les variables d'environnement sont présentes
    const hasConfig = Object.values(firebaseConfig).every(value => value !== "");
    
    if (!hasConfig) {
      console.warn("Configuration Firebase manquante. Vérifiez les variables d'environnement.");
      return;
    }

    const initializeFirebase = async () => {
      isInitializing.current = true;
      
      try {
        let app: FirebaseApp;
        
        if (!getApps().length) {
          app = initializeApp(firebaseConfig);
        } else {
          app = getApps()[0];
        }
        
        const auth = getAuth(app);
        const db = getFirestore(app);
        const googleProvider = new GoogleAuthProvider();
        const facebookProvider = new FacebookAuthProvider();

        // Vérifier si le composant est toujours monté avant de mettre à jour l'état
        if (isMounted.current) {
          setFirebase({
            app,
            auth,
            db,
            googleProvider,
            facebookProvider,
            isInitialized: true
          });
        }
      } catch (error) {
        console.error("Erreur d'initialisation Firebase:", error);
        
        if (isMounted.current) {
          setFirebase(prev => ({
            ...prev,
            isInitialized: false
          }));
        }
      } finally {
        if (isMounted.current) {
          isInitializing.current = false;
        }
      }
    };

    initializeFirebase();
  }, []); // Tableau de dépendances vide = exécute une seule fois

  return firebase;
};