import { create } from 'zustand';

type Store = {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  setLogin: (newlog: boolean) => void; 
};

const useIsLogged = create<Store>((set) => ({
  isLoggedIn: false, 
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })), 
  setLogin: (newlog: boolean)=> set(() => ({ isLoggedIn: newlog }))
}));

export default useIsLogged;
