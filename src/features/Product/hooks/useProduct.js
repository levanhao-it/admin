import productApi from "components/api/productApi";
import { useEffect, useState } from "react";

export default function useProduct(productId) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.getById(productId);
        const data = result.data;
        setProduct(data);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    })();
  }, [productId]);

  return { product };
}
