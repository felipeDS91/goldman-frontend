import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export default function OrderProvider({ initialOrder, children }) {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    setOrder(initialOrder);

    // eslint-disable-next-line
  }, [initialOrder]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within a OrderProvider');
  const { order, setOrder } = context;
  return { order, setOrder };
}
