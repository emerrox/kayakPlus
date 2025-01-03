import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'

const clientId = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId= {clientId}>
    <StrictMode>
<Toaster richColors position="bottom-right" />

      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
