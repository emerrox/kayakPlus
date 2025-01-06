import { create } from 'zustand';
import { CredentialResponse } from '@react-oauth/google';
import { VALIDATE_URL, MY_GROUPS_URL } from '../apiName';
import { User } from '@/types';

type Store = {
  email: string;
  pictureUrl: string;
  name: string;
  token: string;
  setToken: ({ token, email, name, picture }: { token: string; email: string; name: string; picture: string }) => void;
  responseMessage: (response: CredentialResponse, paramToken: string, navigate: (path: string) => void, setLoading: (loading: boolean) => void) => Promise<void>;
  errorMessage: () => void;
};
const storedUser = localStorage.getItem('user');
const userInfo: User | null = storedUser ? JSON.parse(storedUser) : null;

const useIsLogged = create<Store>((set) => ({
  email: userInfo ? userInfo.email : '',
  pictureUrl: userInfo ? userInfo.picture : '',
  name: userInfo ? userInfo.name : '',
  token: userInfo ? userInfo.token : '',
  setToken: ({ token, email, name, picture }: { token: string; email: string; name: string; picture: string }) => {
    localStorage.setItem('user', JSON.stringify({ token, email, name, picture }));
    set(() => ({ token, isLogged: true, email, name, pictureUrl: picture }));
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
      localStorage.setItem('user',  JSON.stringify(data) );
      
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