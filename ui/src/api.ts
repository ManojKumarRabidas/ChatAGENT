export const fetchExecutiveOrders = async () => {
  const res = await fetch('/executive-orders');
  const data = await res.json();
  return data;
};
