// import React from "react";
// import ExecutiveOrders from "./ExecutiveOrders";

// const App: React.FC = () => {
//   return (
//     <div style={{ padding: "1rem", fontFamily: "Arial" }}>
//       <h1>Welcome to MERN-AI</h1>
//       <ExecutiveOrders />
//     </div>
//   );
// };

// export default App;

//----------------------------------------------------------------------------------------

// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [orders, setOrders] = useState<[string, string][]>([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/executive-orders")
//       .then((response) => {
//         if (response.data && response.data.data) {
//           setOrders(response.data.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">Executive Orders</h1>

//         {orders.length === 0 ? (
//           <div className="text-center text-gray-600">No data found</div>
//         ) : (
//           <div className="grid gap-4">
//             {orders.map(([title, summary], index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
//               >
//                 <h2 className="text-xl font-semibold mb-2">{title}</h2>
//                 <p className="text-gray-700">{summary}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import Chat from "./component/Chat";

function App() {
  return (
    <div>
      <Chat />
    </div>
  );
}

export default App;