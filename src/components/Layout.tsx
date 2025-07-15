import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import AppLoadingAnimation from './AppLoadingAnimation'
import { useTheme } from '@/contexts/ThemeContext'

export default function Layout() {
  const { theme } = useTheme()
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false)

  useEffect(() => {
    // Show welcome animation only on first visit after onboarding
    const hasSeenWelcome = localStorage.getItem('dailyflow_welcome_shown')
    if (!hasSeenWelcome) {
      setShowWelcomeAnimation(true)
      localStorage.setItem('dailyflow_welcome_shown', 'true')
    }
  }, [])

  if (showWelcomeAnimation) {
    return <AppLoadingAnimation onComplete={() => setShowWelcomeAnimation(false)} />
  }

  return (
    <div style={{ 
      backgroundColor: theme.colors.background, 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}