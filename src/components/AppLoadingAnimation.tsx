import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Target, Heart, Brain } from 'lucide-react'

interface AppLoadingAnimationProps {
  onComplete: () => void
}

const adhdFriendlyMessages = [
  { text: "Your unique brain is amazing! 🧠", icon: Brain },
  { text: "Different minds, incredible results! ✨", icon: Sparkles },
  { text: "Ready to conquer your day? 🎯", icon: Target },
  { text: "You've got this, champion! ⚡", icon: Zap },
  { text: "Built with love for neurodivergent minds 💜", icon: Heart },
]

export default function AppLoadingAnimation({ onComplete }: AppLoadingAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sequence = async () => {
      // Show logo first
      setTimeout(() => setShowLogo(true), 200)
      
      // Start progress animation
      setTimeout(() => {
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval)
              return 100
            }
            return prev + 2
          })
        }, 30)
      }, 800)

      // Show first message
      setTimeout(() => setShowMessage(true), 1200)

      // Cycle through messages
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          const next = (prev + 1) % adhdFriendlyMessages.length
          if (next === 0) {
            clearInterval(messageInterval)
            setTimeout(onComplete, 800)
          }
          return next
        })
      }, 1000)
    }

    sequence()
  }, [onComplete])

  const currentMessage = adhdFriendlyMessages[currentMessageIndex]
  const IconComponent = currentMessage.icon

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      color: 'white',
    }}>
      {/* Floating particles background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Main logo animation */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 100,
              duration: 1.2
            }}
            style={{
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            {/* Pulsing glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.3)',
                  '0 0 40px rgba(255, 255, 255, 0.6)',
                  '0 0 20px rgba(255, 255, 255, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: '48px' }}
              >
                ⚡
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '8px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              DailyFlow
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: '16px',
                opacity: 0.9,
                fontStyle: 'italic',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              ADHD Friendly To-Do List App
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '200px', opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '30px',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '2px',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </motion.div>

      {/* Motivational messages */}
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={currentMessageIndex}
            initial={{ y: 30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              duration: 0.6
            }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <IconComponent size={32} />
            </motion.div>

            <motion.p
              style={{
                fontSize: '18px',
                fontWeight: '500',
                textAlign: 'center',
                maxWidth: '280px',
                lineHeight: '1.4',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              {currentMessage.text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          gap: '20px',
        }}
      >
        {['🎯', '🌟', '💪', '🚀', '✨'].map((emoji, index) => (
          <motion.div
            key={emoji}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              repeatType: "reverse"
            }}
            style={{
              fontSize: '24px',
              opacity: 0.7,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}