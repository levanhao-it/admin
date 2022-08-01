import categoryApi from 'components/api/category';
import userApi from 'components/api/userApi';
import { useEffect, useState } from 'react';

export default function useCategoryDetail(categoryId) {
  const [category, setCatefory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await categoryApi.getById(categoryId);
        setCatefory(result);
      } catch (error) {
        console.log('Failed to fetch category', error);
      }

      setLoading(false);
    })();
  }, [categoryId]);

  return { category, loading };
}
