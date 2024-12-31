import { create } from 'zustand';
import { CredentialResponse } from '@react-oauth/google';
import { VALIDATE_URL, MY_GROUPS_URL } from '../apiName';

type Store = {
  isLogged: boolean;
  token: string;
  setToken: (newToken: string) => void;
  responseMessage: (response: CredentialResponse, paramToken: string, navigate: (path: string) => void, setLoading: (loading: boolean) => void) => Promise<void>;
  errorMessage: () => void;
};

const useIsLogged = create<Store>((set) => ({
  isLogged: localStorage.getItem('token') ? true : false, 
  token: '',
  setToken: (newToken: string) => {
    localStorage.setItem('token', newToken);
    set(() => ({ token: newToken, isLogged: true }));
  },
  responseMessage: async (response: CredentialResponse, paramToken: string, navigate: (path: string) => void, setLoading: (loading: boolean) => void): Promise<void> => {
    try {
      setLoading(true);
      const backendResponse = await fetch(VALIDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential: response.credential })
      });
      const data = await backendResponse.json();
      
      set(() => ({ token: data.token, isLogged: true }));
      localStorage.setItem('token', data.token);
      
      if (paramToken !== '' && paramToken !== null) {
        await fetch(MY_GROUPS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token
          },
          body: JSON.stringify({ invite_token: paramToken })
        });
      }
      navigate("/home");
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  },
  errorMessage: (): void => {
    console.log('algo va mal en el login');
  }
}));

export default useIsLogged;