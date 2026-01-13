"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Toaster, toast } from "sonner"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading')
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Récupère le code de vérification depuis l'URL
        const oobCode = searchParams.get('oobCode')
        const mode = searchParams.get('mode')
        
        if (!oobCode || mode !== 'verifyEmail') {
          setStatus('invalid')
          setMessage('Lien de vérification invalide ou expiré.')
          return
        }

        // Applique le code de vérification
        await firebase.auth().applyActionCode(oobCode)
        
        // Récupère l'email vérifié
        const info = await firebase.auth().checkActionCode(oobCode)
        setUserEmail(info.data.email || '')
        
        // Marque l'email comme vérifié
        await firebase.auth().applyActionCode(oobCode)
        
        setStatus('success')
        setMessage('Votre email a été vérifié avec succès !')
        
        toast.success('Email vérifié !', {
          description: 'Vous pouvez maintenant vous connecter.',
          duration: 5000,
        })

      } catch (error: any) {
        console.error('Erreur vérification:', error)
        
        switch (error.code) {
          case 'auth/expired-action-code':
            setStatus('error')
            setMessage('Le lien a expiré. Veuillez demander un nouveau lien.')
            break
          case 'auth/invalid-action-code':
            setStatus('error')
            setMessage('Lien invalide. Veuillez demander un nouveau lien.')
            break
          case 'auth/user-disabled':
            setStatus('error')
            setMessage('Ce compte a été désactivé.')
            break
          case 'auth/user-not-found':
            setStatus('error')
            setMessage('Aucun compte trouvé avec cet email.')
            break
          default:
            setStatus('error')
            setMessage('Une erreur est survenue. Veuillez réessayer.')
        }
        
        toast.error('Erreur de vérification', {
          description: error.message,
          duration: 5000,
        })
      }
    }

    verifyEmail()
  }, [searchParams])

  // Renvoyer un email de vérification
  const handleResendEmail = async () => {
    try {
      const currentUser = firebase.auth().currentUser
      
      if (!currentUser) {
        toast.error('Veuillez vous connecter d\'abord')
        return
      }
      
      await currentUser.sendEmailVerification()
      
      toast.success('Email renvoyé !', {
        description: 'Vérifiez votre boîte de réception.',
        duration: 5000,
      })
    } catch (error: any) {
      toast.error('Erreur', {
        description: 'Impossible de renvoyer l\'email.',
        duration: 5000,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <Card className="w-full max-w-md bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-lg">
              <Image 
                src="/logo2.png" 
                alt="Logo Full Event" 
                width={70} 
                height={30}
                className="rounded-full"
              />
            </div>
          </div>
          <CardTitle className="text-2xl text-white font-bold">
            Vérification d&apos;email
          </CardTitle>
          <CardDescription className="text-white/80">
            {status === 'loading' ? 'Vérification en cours...' : 
             status === 'success' ? 'Vérification réussie !' :
             'Vérification requise'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* État de chargement */}
          {status === 'loading' && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-[#E3C32F] mx-auto mb-4" />
              <p className="text-white/80">Vérification de votre email...</p>
            </div>
          )}

          {/* Succès */}
          {status === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Email vérifié !</h3>
                <p className="text-white/70">
                  {userEmail && `Votre email ${userEmail} a été vérifié avec succès.`}
                </p>
                <p className="text-white/70">
                  Vous pouvez maintenant accéder à toutes les fonctionnalités de Full Event.
                </p>
              </div>
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-[#E3C32F] to-[#d4b329] hover:from-[#e8c83d] hover:to-[#ddbb34] text-black font-semibold mt-4"
              >
                <Link href="/login">
                  Se connecter
                </Link>
              </Button>
            </div>
          )}

          {/* Erreur */}
          {status === 'error' && (
            <div className="text-center space-y-4">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Erreur de vérification</h3>
                <p className="text-white/70">{message}</p>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail}
                  className="w-full bg-gradient-to-r from-[#E3C32F] to-[#d4b329] hover:from-[#e8c83d] hover:to-[#ddbb34] text-black font-semibold"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Renvoyer l&apos;email de vérification
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Link href="/login">
                    Retour à la connexion
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Lien invalide */}
          {status === 'invalid' && (
            <div className="text-center space-y-4">
              <XCircle className="h-16 w-16 text-yellow-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Lien invalide</h3>
                <p className="text-white/70">
                  Ce lien de vérification est invalide ou a expiré.
                </p>
                <p className="text-white/70 text-sm">
                  Veuillez vous connecter à votre compte pour renvoyer un nouvel email de vérification.
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-[#E3C32F] to-[#d4b329] hover:from-[#e8c83d] hover:to-[#ddbb34] text-black font-semibold"
                >
                  <Link href="/login">
                    Se connecter
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Link href="/">
                    Retour à l&apos;accueil
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center text-center text-sm text-white/50 pt-6 border-t border-white/10">
          <p>
            Si vous ne trouvez pas l&apos;email, vérifiez vos spams ou 
            <button 
              onClick={handleResendEmail}
              className="ml-1 text-[#E3C32F] hover:underline"
            >
              cliquez ici pour renvoyer
            </button>
          </p>
          <p className="mt-2 text-xs">
            En cas de problème, contactez support@fullevent.sn
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}