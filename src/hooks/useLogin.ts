import { MY_GROUPS_URL, VALIDATE_URL } from './../apiName';
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function useLogin(token: string = '') {
  const [isLoading, setIsLoading] = useState(false); 
  // const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleOnSuccessWithoutToken(response: { access_token: string }) {
    setIsLoading(true); 
    try {
      const res = await fetch(VALIDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: response.access_token }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await res.json();
      console.log('Respuesta del backend:', data);

      navigate('/home');
    } catch (err) {
      console.error('Error durante el login:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOnSuccessWithToken(response: { access_token: string }) {
    setIsLoading(true); 
console.log(token);

    try {
      const res = await fetch(VALIDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: response.access_token }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error en la autenticación');
      }
    } catch (err) {
      console.error('Error durante el login:', err);
    }

    try {
      const res = await fetch(MY_GROUPS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // access_token: response.access_token,
            invite_token: token
          }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await res.json();
      console.log('Respuesta del backend:', data);

      navigate('/home');
    } catch (err) {
      console.error('Error durante el login:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) =>{
      if (token == '') {
        handleOnSuccessWithoutToken(response)
      }else{
        handleOnSuccessWithToken(response)
      }
    },
    flow: 'implicit',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar ',
  });

  const login = useCallback(
    () => {
      // setToken(token)
        loginWithGoogle()
    },
    [loginWithGoogle]
  );

  return { login, isLoading }; 
}

export default useLogin;
