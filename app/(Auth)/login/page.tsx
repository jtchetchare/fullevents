"use client"

import Image from "next/image";
import { useState, useEffect } from "react"
import { Mail, User, Phone, Lock, Eye, EyeOff, CheckCircle, Loader2, LogIn } from "lucide-react"
import { Toaster, toast } from "sonner"
import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  AuthError
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Configuration Firebase 
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Refresh token
const getFreshToken = async () => {
  const user = auth.currentUser;
  if (user) {
    // true = force le refresh
    const freshToken = await user.getIdToken(true);
    return freshToken;
  }
  return null;
};

// Appeler toutes les 30 minutes
setInterval(async () => {
  await getFreshToken();
  console.log('Token rafraîchi');
}, 30 * 60 * 1000); 

const countries = [
  { code: "SN", name: "Sénégal", dialCode: "+221", phoneLength: 9 },
  { code: "FR", name: "France", dialCode: "+33", phoneLength: 9 },
  { code: "US", name: "États-Unis", dialCode: "+1", phoneLength: 10 },
  { code: "GB", name: "Royaume-Uni", dialCode: "+44", phoneLength: 10 },
  { code: "DE", name: "Allemagne", dialCode: "+49", phoneLength: 10 },
  { code: "ES", name: "Espagne", dialCode: "+34", phoneLength: 9 },
  { code: "IT", name: "Italie", dialCode: "+39", phoneLength: 10 },
  { code: "MA", name: "Maroc", dialCode: "+212", phoneLength: 9 },
  { code: "DZ", name: "Algérie", dialCode: "+213", phoneLength: 9 },
  { code: "TN", name: "Tunisie", dialCode: "+216", phoneLength: 8 },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", phoneLength: 10 },
  { code: "ML", name: "Mali", dialCode: "+223", phoneLength: 8 },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", phoneLength: 8 },
  { code: "NE", name: "Niger", dialCode: "+227", phoneLength: 8 },
  { code: "TG", name: "Togo", dialCode: "+228", phoneLength: 8 },
  { code: "BJ", name: "Bénin", dialCode: "+229", phoneLength: 8 },
  { code: "MR", name: "Mauritanie", dialCode: "+222", phoneLength: 8 },
  { code: "GN", name: "Guinée", dialCode: "+224", phoneLength: 9 },
  { code: "CM", name: "Cameroun", dialCode: "+237", phoneLength: 9 },
  { code: "CA", name: "Canada", dialCode: "+1", phoneLength: 10 },
  { code: "BE", name: "Belgique", dialCode: "+32", phoneLength: 9 },
  { code: "CH", name: "Suisse", dialCode: "+41", phoneLength: 9 },
]

const carouselImages = [
  "/log1.webp",
  "/log2.webp",
  "/co.jpeg",
  "/show.jpeg",
]

// Messages d'erreur Firebase
const getFirebaseErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé par un autre compte.';
    case 'auth/invalid-email':
      return 'Format d\'email invalide.';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible (minimum 6 caractères).';
    case 'auth/user-not-found':
      return 'Aucun utilisateur trouvé avec cet email.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Veuillez réessayer plus tard.';
    case 'auth/network-request-failed':
      return 'Erreur réseau. Vérifiez votre connexion.';
    case 'auth/popup-closed-by-user':
      return 'La fenêtre de connexion a été fermée.';
    case 'auth/cancelled-popup-request':
      return 'Connexion annulée.';
    case 'auth/operation-not-allowed':
      return 'Cette méthode de connexion n\'est pas activée.';
    case 'auth/account-exists-with-different-credential':
      return 'Un compte existe déjà avec cet email via un autre fournisseur.';
    default:
      return `Erreur: ${error.message}`;
  }
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState("SN")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Validation email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "L'email est requis"
    if (!emailRegex.test(email)) return "Format d'email invalide"
    
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
    const domain = email.split('@')[1]
    if (domain && !commonDomains.includes(domain)) {
      const suggestions = commonDomains.filter(d => d.startsWith(domain[0]))
      if (suggestions.length > 0) {
        return `Vouliez-vous dire @${suggestions[0]} ?`
      }
    }
    return ""
  }

  // Validation téléphone
  const validatePhone = (phone: string) => {
    const country = countries.find(c => c.code === selectedCountry)
    if (!phone) return "Le numéro est requis"
    if (!/^\d+$/.test(phone)) return "Uniquement des chiffres"
    if (country && phone.length !== country.phoneLength) {
      return `Doit contenir ${country.phoneLength} chiffres`
    }
    return ""
  }

  // Validation mot de passe
  const validatePassword = (password: string) => {
    if (!password) return "Le mot de passe est requis"
    if (password.length < 8) return "Minimum 8 caractères"
    if (!/[A-Z]/.test(password)) return "Au moins une majuscule"
    if (!/[a-z]/.test(password)) return "Au moins une minuscule"
    if (!/[0-9]/.test(password)) return "Au moins un chiffre"
    return ""
  }

  // Calcul force mot de passe
  const calculatePasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { score, label: "Faible", color: "bg-red-500" }
    if (score <= 4) return { score, label: "Moyen", color: "bg-yellow-500" }
    return { score, label: "Fort", color: "bg-green-500" }
  }

  // Gestion des changements
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (touched[field as keyof typeof touched]) {
      let error = ""
      if (field === "email") error = validateEmail(value)
      if (field === "phone") error = validatePhone(value)
      if (field === "password") {
        error = validatePassword(value)
        setPasswordStrength(calculatePasswordStrength(value))
      }
      if (field === "confirmPassword") {
        error = value !== formData.password ? "Les mots de passe ne correspondent pas" : ""
      }
      if (field === "username") {
        error = value.length < 3 ? "Minimum 3 caractères" : ""
      }
      
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    handleChange(field, formData[field as keyof typeof formData])
  }

  // Fonction pour créer un document utilisateur dans Firestore
  const createUserProfile = async (userId: string, userData: any) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true, // Directement vérifié
        role: "user",
        status: "active"
      });
      return true;
    } catch (error) {
      console.error("Erreur création profil:", error);
      return false;
    }
  }

  // Connexion avec Firebase -
  const handleLogin = async (email: string, password: string) => {
    const loadingToast = toast.loading("Connexion en cours...");
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Récupérer les infos utilisateur depuis Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      toast.dismiss(loadingToast);
      toast.success("Connexion réussie ! 🎉", {
        description: `Bienvenue ${user.displayName || user.email}!`,
        duration: 3000,
      });

      setShowSuccess(true);
      
      // Rediriger vers la page dashboard
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error: any) {
      console.error("Erreur connexion:", error);
      toast.dismiss(loadingToast);
      toast.error("Erreur de connexion", {
        description: getFirebaseErrorMessage(error),
        duration: 5000,
      });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  // Inscription avec Firebase 
  const handleRegister = async () => {
    const loadingToast = toast.loading("Création du compte en cours...");
    
    try {
      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // Mettre à jour le profil avec le nom d'utilisateur
      await updateProfile(user, {
        displayName: formData.username
      });

      // Créer le profil utilisateur dans Firestore
      const profileCreated = await createUserProfile(user.uid, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone ? `${currentCountry?.dialCode}${formData.phone}` : null,
        country: selectedCountry,
        displayName: formData.username
      });

      toast.dismiss(loadingToast);
      
      if (profileCreated) {
        toast.success("Compte créé avec succès ! 🎉", {
          description: "Merci de vous connecter afin d'accéder à l'espace.",
          duration: 5000,
        });
        
        setShowSuccess(false);
        
        // Rediriger vers la page de login après inscription
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        
      } else {
        toast.success("Compte créé !", {
          description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
          duration: 5000,
        });
        
        setTimeout(() => {
          setIsLogin(true); 
          setFormData(prev => ({ ...prev, password: "" }));
        }, 2000);
      }

    } catch (error: any) {
      console.error("Erreur inscription:", error);
      toast.dismiss(loadingToast);
      toast.error("Erreur d'inscription", {
        description: getFirebaseErrorMessage(error),
        duration: 5000,
      });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Connexion avec Google...");
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Vérifier si l'utilisateur existe déjà dans Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        // Créer un nouveau profil pour les nouveaux utilisateurs Google
        await createUserProfile(user.uid, {
          username: user.displayName || user.email?.split('@')[0],
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "google",
          emailVerified: true // Directement vérifié avec Google
        });
      }

      toast.dismiss(loadingToast);
      toast.success("Connexion Google réussie !", {
        description: `Bienvenue ${user.displayName}!`,
        duration: 3000,
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error: any) {
      console.error("Erreur Google:", error);
      toast.dismiss(loadingToast);
      toast.error("Erreur Google", {
        description: getFirebaseErrorMessage(error),
        duration: 5000,
      });
    }
  }

  // Connexion avec Facebook
  const handleFacebookLogin = async () => {
    const loadingToast = toast.loading("Connexion avec Facebook...");
    
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      
      // Vérifier si l'utilisateur existe déjà dans Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        await createUserProfile(user.uid, {
          username: user.displayName || user.email?.split('@')[0],
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "facebook",
          emailVerified: true // Directement vérifié avec Facebook
        });
      }

      toast.dismiss(loadingToast);
      toast.success("Connexion Facebook réussie !", {
        description: `Bienvenue ${user.displayName}!`,
        duration: 3000,
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error: any) {
      console.error("Erreur Facebook:", error);
      toast.dismiss(loadingToast);
      toast.error("Erreur Facebook", {
        description: getFirebaseErrorMessage(error),
        duration: 5000,
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const allTouched = {
      username: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    }
    setTouched(allTouched)

    // Validation
    const emailError = validateEmail(formData.email)
    const phoneError = !isLogin ? validatePhone(formData.phone) : ""
    const passwordError = validatePassword(formData.password)
    const confirmError = !isLogin && formData.password !== formData.confirmPassword ? "Les mots de passe ne correspondent pas" : ""
    const usernameError = !isLogin && formData.username.length < 3 ? "Minimum 3 caractères" : ""

    const hasErrors = !isLogin && (
      emailError ||
      phoneError ||
      passwordError ||
      confirmError ||
      usernameError
    )

    if (hasErrors) {
      setErrors({
        username: usernameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
        confirmPassword: confirmError
      })
      
      toast.error("Erreur de validation", {
        description: "Veuillez corriger les erreurs dans le formulaire.",
        duration: 4000,
      });
      
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)

    try {
      if (isLogin) {
        // Connexion
        await handleLogin(formData.email, formData.password)
      } else {
        // Inscription
        await handleRegister()
      }
    } catch (error) {
      console.error("Erreur générale:", error)
      toast.error("Erreur inattendue", {
        description: "Une erreur est survenue. Veuillez réessayer.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false)
    }
  }

  const getCountryFlag = (countryCode: string) => {
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`
  }

  const currentCountry = countries.find(c => c.code === selectedCountry)

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Toaster pour les notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: "!bg-gray-900/95 !backdrop-blur-sm !text-white !border !border-white/10",
          duration: 4000,
        }}
        expand={true}
        richColors
        closeButton
      />

      {/* Image de fond en cover */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cover1.jpg"
          alt="Background événements Full Event"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <div className="container mx-auto flex min-h-screen items-center px-4">
          {/* Partie gauche - Carrousel et texte */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-6">
            <div className="max-w-lg w-full space-y-8">
              {/* Titre et description */}
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Rejoignez la{' '}
                  <span className="text-[#E3C32F]">communauté Full Event</span>
                </h1>
                <p className="text-lg text-white/80 italic leading-relaxed">
                  "Bienvenue ! Faites partie de notre communauté pour être informé en temps réel des événements à venir."
                </p>
              </div>

              {/* Carrousel 3D */}
              <div className="relative w-full h-[260px] perspective-1000 overflow-hidden rounded-xl">
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  {carouselImages.map((image, index) => {
                    const offset = index - currentImageIndex
                    const absOffset = Math.abs(offset)
                    
                    return (
                      <div
                        key={index}
                        className="absolute w-full h-full transition-all duration-700 ease-in-out rounded-xl overflow-hidden shadow-2xl"
                        style={{
                          transform: `
                            translateX(${offset * 40}%)
                            translateZ(${-absOffset * 80}px)
                            rotateY(${offset * -12}deg)
                            scale(${1 - absOffset * 0.15})
                          `,
                          opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.4,
                          zIndex: 10 - absOffset,
                        }}
                      >
                        <Image
                          src={image}
                          alt={`Événement ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Indicateurs */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-[#E3C32F] w-6' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Partie droite - Formulaire */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
              <Tabs 
                defaultValue="login" 
                className="w-full"
                onValueChange={(value) => setIsLogin(value === "login")}
              >
                <Card className={`border-2 shadow-2xl transition-all duration-300 ${shake ? 'animate-shake' : ''} 
                  bg-black/70 backdrop-blur-xl border-white/10
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]`}>
                  <CardHeader className="space-y-1 pb-3">
                    <div className="flex justify-center mb-2">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-lg">
                        <Image 
                          src="/logo2.png" 
                          alt="Logo Full Event" 
                          width={60} 
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-center text-white font-bold">
                      {isLogin ? "Connexion" : "Créer un compte"}
                    </CardTitle>
                    <CardDescription className="text-center text-white/90 text-sm">
                      {isLogin 
                        ? "Entrez vos identifiants pour accéder à votre compte" 
                        : "Inscrivez-vous et accédez immédiatement"
                      }
                    </CardDescription>
                  </CardHeader>

                  <TabsList className="grid grid-cols-2 mx-4 mb-3 bg-white/5 p-1 rounded-lg border border-white/10">
                    <TabsTrigger 
                      value="login" 
                      className="text-sm font-medium data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=inactive]:text-white/70 transition-all"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Connexion
                    </TabsTrigger>
                    <TabsTrigger 
                      value="register" 
                      className="text-sm font-medium data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=inactive]:text-white/70 transition-all"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Inscription
                    </TabsTrigger>
                  </TabsList>

                  <CardContent className="pb-4 px-4">
                    {/* Formulaire de Connexion */}
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email" className="text-sm text-white/90 font-medium">Email</Label>
                          <Input 
                            id="login-email" 
                            placeholder="votre@gmail.com" 
                            type="email"
                            autoComplete="email"
                            className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="login-password" className="text-sm text-white/90 font-medium">Mot de passe</Label>
                            <Button 
                              variant="link" 
                              className="h-auto p-0 text-xs text-white/60 hover:text-white"
                              type="button"
                              onClick={() => toast.info("Fonctionnalité à venir", {
                                description: "La réinitialisation de mot de passe sera bientôt disponible.",
                              })}
                            >
                              Mot de passe oublié?
                            </Button>
                          </div>
                          <div className="relative">
                            <Input 
                              id="login-password" 
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              placeholder="••••••••"
                              className="pr-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20"
                              value={formData.password}
                              onChange={(e) => handleChange('password', e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-white/60 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-1">
                          <Checkbox id="remember" className="h-4 w-4 border-white/20 data-[state=checked]:bg-[#E3C32F] data-[state=checked]:border-[#E3C32F]" />
                          <Label htmlFor="remember" className="text-sm text-white/70">
                            Se souvenir de moi
                          </Label>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full h-10 bg-gradient-to-r from-[#E3C32F] to-[#d4b329] hover:from-[#e8c83d] hover:to-[#ddbb34] text-black font-semibold transition-all hover:shadow-lg hover:shadow-[#E3C32F]/20 hover:scale-[1.02]" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connexion...
                            </>
                          ) : showSuccess ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Connecté !
                            </>
                          ) : (
                            "Se connecter"
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Formulaire d'Inscription */}
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nom et Email */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="register-username" className="text-sm font-medium text-white/90">Nom complet</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input 
                                id="register-username" 
                                placeholder="Votre nom" 
                                autoComplete="name"
                                className={`pl-9 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20 ${errors.username && touched.username ? 'border-red-500/50' : ''}`}
                                value={formData.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                onBlur={() => handleBlur('username')}
                                required
                              />
                              {touched.username && !errors.username && formData.username && (
                                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-400" />
                              )}
                            </div>
                            {errors.username && touched.username && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.username}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email" className="text-sm font-medium text-white/90">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input 
                                id="register-email" 
                                type="email" 
                                placeholder="vous@gmail.com"
                                autoComplete="email"
                                className={`pl-9 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20 ${errors.email && touched.email ? 'border-red-500/50' : ''}`}
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                required
                              />
                              {touched.email && !errors.email && formData.email && (
                                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-400" />
                              )}
                            </div>
                            {errors.email && touched.email && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Téléphone */}
                        <div className="space-y-2">
                          <Label htmlFor="register-phone" className="text-sm font-medium text-white/90">Téléphone</Label>
                          <div className="flex gap-2">
                            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                              <SelectTrigger className="w-[120px] h-10 bg-white/5 border-white/10 text-white">
                                <SelectValue>
                                  <div className="flex items-center gap-2">
                                    <img 
                                      src={getCountryFlag(selectedCountry)} 
                                      alt={selectedCountry}
                                      className="w-5 h-4 object-cover"
                                    />
                                    <span className="text-sm">{currentCountry?.dialCode}</span>
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-white/10">
                                {countries.map((country) => (
                                  <SelectItem key={country.code} value={country.code} className="text-white hover:bg-white/10 focus:bg-white/10">
                                    <div className="flex items-center gap-2">
                                      <img 
                                        src={getCountryFlag(country.code)} 
                                        alt={country.name}
                                        className="w-5 h-4 object-cover"
                                      />
                                      <span className="text-sm">{country.name}</span>
                                      <span className="text-xs text-white/50 ml-auto">{country.dialCode}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="flex-1 relative">
                              <Input 
                                id="register-phone" 
                                type="tel" 
                                inputMode="numeric"
                                placeholder={`${currentCountry?.phoneLength} chiffres`}
                                autoComplete="tel"
                                className={`h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20 ${errors.phone && touched.phone ? 'border-red-500/50' : ''}`}
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                                onBlur={() => handleBlur('phone')}
                              />
                              {touched.phone && !errors.phone && formData.phone && (
                                <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-400" />
                              )}
                            </div>
                          </div>
                          {errors.phone && touched.phone && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Mot de passe et Confirmation */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="register-password" className="text-sm font-medium text-white/90">Mot de passe</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input 
                                id="register-password" 
                                type={showPassword ? "text" : "password"} 
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className={`pl-9 pr-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20 ${errors.password && touched.password ? 'border-red-500/50' : ''}`}
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                onBlur={() => handleBlur('password')}
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-white/60 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                            {formData.password && (
                              <div className="space-y-1">
                                <div className="flex gap-1">
                                  {[...Array(6)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`h-1 flex-1 rounded-full transition-all ${
                                        i < passwordStrength.score ? passwordStrength.color : 'bg-white/20'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-xs text-white/70">
                                  <span className={`font-semibold ${
                                    passwordStrength.label === 'Fort' ? 'text-green-400' :
                                    passwordStrength.label === 'Moyen' ? 'text-yellow-400' : 'text-red-400'
                                  }`}>
                                    {passwordStrength.label}
                                  </span>
                                </p>
                              </div>
                            )}
                            {errors.password && touched.password && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.password}
                              </p>
                            )}
                          </div>
    
                          <div className="space-y-2">
                            <Label htmlFor="register-confirm-password" className="text-sm font-medium text-white/90">Confirmation</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input 
                                id="register-confirm-password" 
                                type={showConfirmPassword ? "text" : "password"} 
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className={`pl-9 pr-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#E3C32F]/50 focus:ring-[#E3C32F]/20 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500/50' : ''}`}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                onBlur={() => handleBlur('confirmPassword')}
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-white/60 hover:text-white"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                                <CheckCircle className="absolute right-10 top-3 h-4 w-4 text-green-400" />
                              )}
                            </div>
                            {errors.confirmPassword && touched.confirmPassword && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.confirmPassword}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full h-10 mt-2 bg-gradient-to-r from-[#E3C32F] to-[#d4b329] hover:from-[#e8c83d] hover:to-[#ddbb34] text-black font-semibold transition-all hover:shadow-lg hover:shadow-[#E3C32F]/20 hover:scale-[1.02]" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Création...
                            </>
                          ) : showSuccess ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Compte créé !
                            </>
                          ) : (
                            "Créer mon compte"
                          )}
                        </Button>
                        
                        {/* Note sur la vérification */}
                        <div className="text-center text-xs text-white/50 mt-2">
                          <p>✓ Pas de vérification d'email requise</p>
                          <p>✓ Accès immédiat après inscription</p>
                        </div>
                      </form>
                    </TabsContent>

                    {/* Séparateur social */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="bg-white/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-black/70 backdrop-blur-sm px-3 text-white/70">Ou continuer avec</span>
                        </div>
                      </div>

                      {/* Boutons sociaux */}
                      <div className="flex justify-center gap-4 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-10 h-10 rounded-full p-0 hover:scale-110 transition-all bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                          onClick={handleGoogleLogin}
                          disabled={isLoading}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          className="w-10 h-10 rounded-full p-0 hover:scale-110 transition-all bg-[#1877F2] border-[#1877F2] hover:bg-[#166FE5] hover:border-[#166FE5]"
                          onClick={handleFacebookLogin}
                          disabled={isLoading}
                        >
                          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pb-4 pt-0 px-4 -mt-5">
                    <p className="text-xs text-center text-white/70 w-full">
                      En vous inscrivant, vous acceptez nos conditions d&apos;utilisation
                      et notre politique de confidentialité.
                    </p>
                  </CardFooter>
                </Card>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shake {
          animation: shake 0.5s;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        /* Masquer les flèches des inputs number */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }

        /* Optimisation responsive */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}