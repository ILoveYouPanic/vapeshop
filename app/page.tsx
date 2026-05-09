'use client'
import { useState } from "react";

const products = [
  { id: 1, name: "RazzBar 30K", price: 13 },
  { id: 2, name: "RazzBar 60K", price: 14 },
  { id: 3, name: "VapSolo KING PRO", price: 14 },
  { id: 4, name: "X-Bar 40K", price: 12 },
];

const flavors = [
  "Blueberry Sour Raspberry",
  "Mixed Berry",
  "Cherry Cola",
  "Watermelon Ice",
  "Peach Mango Pineapple"
];

export default function VapeShop() {

  const [cart, setCart] = useState<any[]>([]);
  const [flavorMap, setFlavorMap] = useState<any>({});
  const [order, setOrder] = useState({
    name: "",
    phone: "",
    place: "",
    time: ""
  });

  const addToCart = (p:any) => {
    const flavor = flavorMap[p.id] || flavors[0];
    setCart([...cart, { ...p, flavor }]);
  };

  const sendOrder = () => {
    const text = `
🔥 NUEVO PEDIDO VAPE SHOP

${cart.map(i => `- ${i.name} (${i.flavor}) - ${i.price}€`).join("\n")}

Nombre: ${order.name}
Tel: ${order.phone}
Lugar: ${order.place}
Hora: ${order.time}
    `;

    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
    setCart([]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">VapeShop ADH 🚀</h1>
      <p className="mb-6">Entrega en mano en Alcalá de Henares</p>

      {/* PRODUCTS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="font-bold">{p.name}</h2>
            <p>{p.price}€</p>

            <select
              className="w-full border mt-2 p-2"
              onChange={(e) =>
                setFlavorMap({ ...flavorMap, [p.id]: e.target.value })
              }
            >
              {flavors.map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <button
              className="w-full mt-2 bg-black text-white py-2"
              onClick={() => addToCart(p)}
            >
              Añadir
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="border p-4 mb-4">
        <h2 className="font-bold mb-2">Carrito</h2>
        {cart.length === 0 && <p>Vacío</p>}
        {cart.map((c, i) => (
          <p key={i}>
            {c.name} - {c.flavor} - {c.price}€
          </p>
        ))}
      </div>

      {/* ORDER FORM */}
      <div className="border p-4">

        <input
          placeholder="Nombre"
          className="border p-2 w-full mb-2"
          onChange={(e) => setOrder({ ...order, name: e.target.value })}
        />

        <input
          placeholder="Teléfono"
          className="border p-2 w-full mb-2"
          onChange={(e) => setOrder({ ...order, phone: e.target.value })}
        />

        <input
          placeholder="Lugar de entrega"
          className="border p-2 w-full mb-2"
          onChange={(e) => setOrder({ ...order, place: e.target.value })}
        />

        <input
          type="time"
          className="border p-2 w-full mb-2"
          onChange={(e) => setOrder({ ...order, time: e.target.value })}
        />

        <button
          onClick={sendOrder}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3"
        >
          🚀 Hacer pedido por WhatsApp
        </button>

      </div>

    </div>
  );
}