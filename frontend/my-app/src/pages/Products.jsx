import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

function Products() {
  const [category, setCategory] = useState('');
  const { products, loading, error } = useProducts({ category: category || undefined });

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p>Discover our range of IoT solutions</p>
        </div>
      </section>

      <section className="products-content">
        <div className="container">
          <div className="filters">
            <label>Filter by Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="sensor">Sensors</option>
              <option value="meter">Meters</option>
              <option value="service">Services</option>
            </select>
          </div>

          <div className="products-grid">
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;