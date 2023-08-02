import React,{useState} from 'react';
import CartSidebarProps from '../interfaces/CartSidebarProps';

const CartSidebar: React.FC<CartSidebarProps> = ({ cartItems, onQuantityChange, onClearCart }) => {
  const [showModal, setShowModal] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const handleCheckout = () => {
    setShowModal(true);
    onClearCart();
  };
  return (
    <div style={{ width: '1000px', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <h2>Cart Items</h2>
      <div style={{ marginTop: '10px' }}>
        <button onClick={onClearCart}>Clear Cart</button>
      </div>
      <ul>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '10px',
            }}
          >
            <div style={{ flex: 1 }}>
              <img src={item.imageUrl} alt={item.productName} style={{ maxWidth: '80px' }} />
            </div>
            <div style={{ flex: 2 }}>
              <h2>{item.productName}</h2>
              <p>Unit Price: {item.unitPrice}</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '5px' }}>
                <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <p>Total Price: {item.unitPrice * item.quantity}</p>
            </div>
          </div>
        ))}
      </ul>
      <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>Total Items: {totalItems}</p>
        <p>Total Amount: {totalAmount}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '20px' }}>
            <p>Thank you for purchasing!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
