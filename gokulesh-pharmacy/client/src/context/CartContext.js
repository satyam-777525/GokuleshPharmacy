import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const AUTO_COUPON = {
  code: 'GOKULESH10',
  minSubtotal: 999,
  percentOff: 10,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i
        )
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const stored = JSON.parse(localStorage.getItem('gp_cart') || '{"items":[]}');
  const [state, dispatch] = useReducer(cartReducer, stored);

  useEffect(() => {
    localStorage.setItem('gp_cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const isAutoCouponEligible = subtotal >= AUTO_COUPON.minSubtotal;
  const couponCode = isAutoCouponEligible ? AUTO_COUPON.code : null;
  const discount = isAutoCouponEligible ? Math.round((subtotal * AUTO_COUPON.percentOff) / 100) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);

  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        subtotal,
        discount,
        discountedSubtotal,
        couponCode,
        count,
        addItem,
        removeItem,
        updateQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
