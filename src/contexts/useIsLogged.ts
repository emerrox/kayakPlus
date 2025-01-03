import { create } from 'zustand';
import { CredentialResponse } from '@react-oauth/google';
import { VALIDATE_URL, MY_GROUPS_URL } from '../apiName';

type Store = {
  isLogged: boolean;
  email: string;
  pictureUrl: string;
  name: string;
  token: string;
  setToken: ({ token, email, name }: { token: string; email: string; name: string }) => void;
  responseMessage: (response: CredentialResponse, paramToken: string, navigate: (path: string) => void, setLoading: (loading: boolean) => void) => Promise<void>;
  errorMessage: () => void;
};

const useIsLogged = create<Store>((set) => ({
  email: '',
  pictureUrl: '',
  name: '',
  isLogged: localStorage.getItem('token') ? true : false, 
  token: '',
  setToken: ({ token, email, name }: { token: string; email: string; name: string }) => {
    localStorage.setItem('token', token);
    set(() => ({ token, isLogged: true, email, name }));
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
      console.log(data);
      
      set(() => ({ token: data.token, isLogged: true, email: data.email, name: data.name, pictureUrl: data.picture }));
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