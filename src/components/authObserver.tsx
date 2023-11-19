// authObserver.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './../pages/firebase';

const useAuthObserver = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        setUser(user);
      } catch (error) {
        setError(error);
      }
    }, (error) => {
      setError(error);
    });

    return () => unsubscribe();
  }, []);

  return { user, error };
};

export default useAuthObserver;
