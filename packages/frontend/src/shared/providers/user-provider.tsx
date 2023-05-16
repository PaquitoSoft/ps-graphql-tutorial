/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactNode, createContext, useContext, useMemo } from "react";
import { v4 as uuid } from 'uuid';

type TUserContext = {
  userId: string;
}

const USER_ID_STORAGE_KEY = '__uid';

const UserContext = createContext<TUserContext>({
  userId: ''
});

export function UserProvider({ children }: { children: ReactNode }) {
  let userId = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId) {
    userId = uuid();
    window.localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }

  const providerValue = useMemo<TUserContext>(() => ({ userId: userId! }), [userId]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('No UserContext provider found in the tree.');
  }

  return userContext;
};
