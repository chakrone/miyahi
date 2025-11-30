import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [JSON.stringify(filters)]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll(filters);
      setProducts(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refresh: loadProducts };
}
