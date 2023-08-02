import Item from './Item';

interface CartSidebarProps {
  cartItems: Item[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onClearCart: () => void; 
}

export default CartSidebarProps;