import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<User | null>(null);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  //const [isLoading, setIsInitializing] = useState(true);

  useEffect(() => {
    //console.log("useeffect in use")
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
