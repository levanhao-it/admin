import userApi from 'components/api/userApi';
import { useEffect, useState } from 'react';

export default function useUserDetail(userId) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await userApi.getById(userId);
        setUser(result);
      } catch (error) {
        console.log('Failed to fetch user', error);
      }

      setLoading(false);
    })();
  }, [userId]);

  return { user, loading };
}
