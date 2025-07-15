import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import AppLoadingAnimation from './components/AppLoadingAnimation'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const { theme } = useTheme()
  const [showLoading, setShowLoading] = useState(true)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const onboardingComplete = localStorage.getItem('dailyflow_onboarding_complete')
    setHasSeenOnboarding(!!onboardingComplete)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <AppLoadingAnimation onComplete={handleLoadingComplete} />
  }

  return (
    <div className={theme.isDark ? 'dark' : ''} style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={hasSeenOnboarding ? <Layout /> : <Navigate to="/onboarding" replace />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App