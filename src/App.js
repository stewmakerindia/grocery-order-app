import { useState } from 'react';

const defaultItems = [
  { name: "Onion", unit: "kg", qty: 0 },
  { name: "Tomato", unit: "kg", qty: 0 },
  { name: "Coconut", unit: "pcs", qty: 0 },
  { name: "Appam Batter", unit: "litres", qty: 0 },
  { name: "Stew Mix", unit: "kg", qty: 0 },
];

function GroceryOrderApp() {
  const [items, setItems] = useState(defaultItems);

  const updateQty = (index, delta) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(0, updated[index].qty + delta);
      return updated;
    });
  };

  const createWhatsAppMessage = () => {
    const list = items.filter(i => i.qty > 0).map(i => `${i.name}: ${i.qty} ${i.unit}`).join("\n");
    const text = encodeURIComponent(`🛒 Grocery Order List:\n${list}`);
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-xl mt-10">
      <h1 className="text-xl font-bold mb-4">Kitchen Grocery List</h1>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={item.name} className="flex justify-between items-center border-b pb-2">
            <span>{item.name} ({item.unit})</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQty(idx, -1)} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => updateQty(idx, 1)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
            </div>
          </li>
        ))}
      </ul>
      <a href={createWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Send on WhatsApp</button>
      </a>
    </div>
  );
}

export default GroceryOrderApp;