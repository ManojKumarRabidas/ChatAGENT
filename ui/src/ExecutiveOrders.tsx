import React, { useEffect, useState } from "react";

interface ExecutiveOrder {
  // Replace with your actual structure
  id?: number;
  title?: string;
  description?: string;
  [key: string]: any;
}

const ExecutiveOrders: React.FC = () => {
//   const [orders, setOrders] = useState<ExecutiveOrder[]>([]);
const [orders, setOrders] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/executive-orders")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.data) {
//           setOrders(data.data);
//         } else {
//           setError("No data found");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch orders: " + err.message);
//         setLoading(false);
//       });
//   }, []);


useEffect(() => {
  fetch("http://127.0.0.1:8000/executive-orders")
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        setOrders(data.data);
      } else {
        setError("No data found");
      }
      setLoading(false);
    })
    .catch((err) => {
      setError("Failed to fetch orders: " + err.message);
      setLoading(false);
    });
}, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <div>
//       <h2>Executive Orders</h2>
//       <ul>
//         {orders.map((order, idx) => (
//           <li key={idx}>
//             {order.title || `Order ${idx + 1}`} - {order.description || "No description"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

    return (
    <div>
        <h2>Executive Orders</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "1rem" }}>
        {orders.length > 0 ? JSON.stringify(orders, null, 2) : "No orders found"}
        </pre>
    </div>
    );

};

export default ExecutiveOrders;
