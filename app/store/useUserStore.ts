import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session, User } from '@supabase/supabase-js'

interface UserStore {
  session: Session | null;
  user: User | null;
  email: string;
  profileImageUri: string | null;
  verifiedRecipient: {
    exists: boolean;
    userId?: string;
    fullName?: string;
  } | null;

  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setEmail: (email: string) => void;
  setProfileImageUri: (uri: string | null) => void;
  setVerifiedRecipient: (recipient: UserStore['verifiedRecipient']) => void;
  reset: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState = {
  session: null,
  user: null,
  email: '',
  profileImageUri: null,
  verifiedRecipient: null,
  _hasHydrated: false,
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setEmail: (email) => set({ email }),
      setProfileImageUri: (uri) => set({ profileImageUri: uri }),
      setVerifiedRecipient: (recipient) => set({ verifiedRecipient: recipient }),
      reset: () => set({
        ...initialState,
        _hasHydrated: get()._hasHydrated,
      }),
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      
      partialize: (state) => {
        const { _hasHydrated, setHasHydrated, ...persistedState } = state;
        return persistedState;
      },
    }
  )
);

export default useUserStore;