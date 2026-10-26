import { useCallback, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);

  const addOrder = useCallback((item, { date, duration }) => {
    const order = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      itemName: item.name,
      date,
      duration,
      totalPrice: item.price * duration,
      status: "Menunggu Pembayaran",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const clearOrders = useCallback(() => setOrders([]), []);

  return { orders, addOrder, clearOrders };
}
