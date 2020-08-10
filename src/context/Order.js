import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export default function OrderProvider({ initialOrder, formRef, children }) {
  const [order, setOrder] = useState(initialOrder);

  async function calculateTotal() {
    setTimeout(async () => {
      const data = formRef.current.getData();

      const total =
        ((await data.order_details.reduce(
          (acum, elem) => acum + (elem.value || 0),
          0
        )) || 0) + (data.delivery_value || 0);

      formRef.current.setFieldValue('total', total);
      formRef.current.setFieldValue('order_payments[0].value', total);
    }, 1000);
  }

  useEffect(() => {
    setOrder(initialOrder);

    // eslint-disable-next-line
  }, [initialOrder]);

  return (
    <OrderContext.Provider value={{ order, setOrder, calculateTotal }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within a OrderProvider');
  const { order, setOrder, calculateTotal } = context;
  return { order, setOrder, calculateTotal };
}
