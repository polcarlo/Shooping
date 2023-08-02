import React, { useEffect, useState } from 'react';
import Item from '../interfaces/Item';
import CartSidebar from './CartSidebar';
const ItemDisplay: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterInput, setFilterInput] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');
  const [cartItems, setCartItems] = useState<Item[]>(() => {
    const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
    return cartItemsFromLocalStorage ? JSON.parse(cartItemsFromLocalStorage) : [];
  });
  useEffect(() => {
    fetch('/data/items.json')
      .then((response) => response.json())
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddToCart = (itemId: string) => {
    const itemToAdd = items.find((item) => item.id === itemId);
    if (itemToAdd) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        const existingCartItem = updatedCartItems.find((item) => item.id === itemId);
  
        if (existingCartItem) {
          existingCartItem.quantity += .5; 
        } else {
          updatedCartItems.push({ ...itemToAdd, quantity: 1 });
        }
  
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    }
  };
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(filterInput.toLowerCase()) ||
      item.category.toLowerCase().includes(filterInput.toLowerCase())
  );

  const sortedItems = filteredItems.slice().sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.unitPrice - b.unitPrice;
    } else {
      return b.unitPrice - a.unitPrice;
    }
  });

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  
    <div style={{ display: 'flex', flex: 1 }}>
    
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <label>
            Filter by Product Name or Category:
            <input
              type="text"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
          </label>
          <label>
            Sort by Unit Price:
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'ascending' | 'descending')}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </label>
          {sortedItems.map((item) => (
        <div
          key={item.id}
          style={{
            width: '90%', 
            backgroundColor: '#e8e8e8',
            marginBottom: '20px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ flex: 1 }}>
            <img src={item.imageUrl} alt={item.productName} style={{ maxWidth: '200px' }} />
          </div>
          <div style={{ flex: 2 }}>
            <h2>{item.productName}</h2>
            <h6>{item.category}</h6>
            <p>{item.description}</p>
          </div>
          <div style={{ flex: 1 }}>
            <h2>{item.unitPrice}</h2>
            <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
          </div>
        </div>
      ))}
      </div>
      <CartSidebar cartItems={cartItems} onQuantityChange={handleQuantityChange} onClearCart={handleClearCart}/>
    </div>
  </div>
  );
};

export default ItemDisplay;
