import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { isMobile } from 'react-device-detect';

const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <Toaster richColors position={isMobile ? 'top-center' : 'bottom-right'} />
        <App />
      </GoogleOAuthProvider>
  </StrictMode>
);
