import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/api';

function Order() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: shippingInfo
      };

      await orderService.create(orderData);
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    return (
      <div className="order-page">
        <div className="container">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to your cart to place an order</p>
          <a href="/products" className="btn btn-primary">Browse Products</a>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1>Complete Your Order</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="order-grid">
          <div className="cart-items">
            <h2>Order Summary</h2>
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.imageUrl || '/placeholder.png'} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </div>

          <div className="shipping-form">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={shippingInfo.street}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;