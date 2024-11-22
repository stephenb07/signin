'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SuccessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Success!
        </h1>
        {session?.user?.email && (
          <p className="text-xl text-gray-600 mt-4">
            Logged in as {session.user.email}
          </p>
        )}
      </motion.div>
    </div>
  )
} 