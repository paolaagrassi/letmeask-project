import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, Firebase } from "../services/Firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        const isUserWithoutNameOrPhoto = !displayName || !photoURL;

        if (isUserWithoutNameOrPhoto) {
          throw new Error("Nepietiekama informācija no Google konta.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new Firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    const isAuthWorked = result.user;

    if (isAuthWorked) {
      const { displayName, photoURL, uid } = isAuthWorked;

      const isUserWithoutNameOrPhoto = !displayName || !photoURL;

      if (isUserWithoutNameOrPhoto) {
        throw new Error("Nepietiekama informācija no Google konta.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
