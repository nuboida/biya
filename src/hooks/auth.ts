import auth from '@/helpers/auth.helper';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.isAuthenticated())
  }, []);

  return user;
}
