import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface TransitionContextType {
  navigateTo: (path: string) => void;
  isTransitioning: boolean;
  isInitialLoad: boolean;
  completeInitialLoad: () => void;
  startTransitionOut: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();

  const navigateTo = useCallback((path: string) => {
    if (window.location.pathname === path) return;
    
    // Start transition IN (show pink screen)
    setIsTransitioning(true);
    
    // Wait for the pink screen to cover the viewport
    // The exact timing will be synced with GSAP in the PageTransition component
    setTimeout(() => {
      navigate(path);
      // Let PageTransition component handle the out animation (bubbles)
    }, 600); 
  }, [navigate]);

  const startTransitionOut = useCallback(() => {
    // This can be called by PageTransition to signal the end of the out-animation
    setIsTransitioning(false);
  }, []);

  const completeInitialLoad = useCallback(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        navigateTo,
        isTransitioning,
        isInitialLoad,
        completeInitialLoad,
        startTransitionOut,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
