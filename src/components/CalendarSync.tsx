import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCalendar } from '@/hooks/useCalendar';

interface CalendarSyncProps {
  visible: boolean;
  onClose: () => void;
  tasks?: any[];
}

export default function CalendarSync({ visible, onClose }: CalendarSyncProps) {
  const { theme } = useTheme();
  const { isConnected, loadEvents } = useCalendar();

  useEffect(() => {
    if (visible && isConnected) {
      loadEvents();
    }
  }, [visible, isConnected]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4285f4, #34a853)',
          padding: '24px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <X size={24} />
          </button>
          
          <h2 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}>
            📅 Google Calendar Sync
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Sync your tasks with Google Calendar
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Coming Soon Message */}
          <div style={{
            backgroundColor: theme.isDark ? 'rgba(66, 133, 244, 0.1)' : '#f0f4ff',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: `2px solid #4285f4`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', fontFamily: 'Poppins, sans-serif', color: theme.colors.text, marginBottom: '8px' }}>
              Coming Soon!
            </h3>
            <p style={{ fontSize: '16px', color: theme.colors.textSecondary, marginBottom: '16px', lineHeight: '1.5' }}>
              We're working hard to bring you seamless Google Calendar integration! This feature will allow you to:
            </p>
            
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>✅</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>Sync tasks directly to your calendar</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>⏰</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>Get reminders 15 minutes before tasks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>🔄</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>Two-way sync with your existing events</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>🧠</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>ADHD-friendly time blocking</span>
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: theme.colors.primary, fontWeight: '600', fontStyle: 'italic' }}>
              Stay tuned for updates! 🌟
            </p>
          </div>

          {/* Preview mockup */}
          <div style={{
            backgroundColor: theme.colors.border,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            opacity: 0.7,
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.text, marginBottom: '12px' }}>
              📱 Preview: What's Coming
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: theme.colors.surface, borderRadius: '8px' }}>
                <span style={{ fontSize: '16px' }}>📝</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>Finish project presentation</span>
                <span style={{ fontSize: '12px', color: theme.colors.textSecondary, marginLeft: 'auto' }}>2:00 PM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: theme.colors.surface, borderRadius: '8px' }}>
                <span style={{ fontSize: '16px' }}>🛒</span>
                <span style={{ fontSize: '14px', color: theme.colors.text }}>Buy groceries</span>
                <span style={{ fontSize: '12px', color: theme.colors.textSecondary, marginLeft: 'auto' }}>5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}