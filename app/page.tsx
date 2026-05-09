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
  "Fizzy Cherry",
  "Watermelon Ice",
  "Peach Mango Pineapple"
];

export default function VapeShop() {

  const [cart, setCart] = useState<any[]>([]);
  const [flavorMap, setFlavorMap] = useState<any>({});
  const [adminMode, setAdminMode] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const [order, setOrder] = useState({
    name: "",
    phone: "",
    place: "",
    date: "",
    time: ""
  });

  const addToCart = (p:any) => {
    const flavor = flavorMap[p.id] || flavors[0];
    setCart([...cart, { ...p, flavor }]);
  };

  const sendOrder = () => {

    const newOrder = {
      ...order,
      items: cart,
      status: "pendiente"
    };

    setOrders([newOrder, ...orders]);

    const text = `🔥 NUEVO PEDIDO VAPE SHOP

${cart.map(i => `- ${i.name} (${i.flavor}) - ${i.price}€`).join("\n")}

Nombre: ${order.name}
Tel: ${order.phone}
Lugar: ${order.place}
Fecha: ${order.date}
Hora: ${order.time}
`;

    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");

    setCart([]);
  };

  const markDone = (index:number) => {
    const updated = [...orders];
    updated[index].status = "entregado";
    setOrders(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">VapeShop ADH 🚀</h1>
        <p className="mb-6">Entrega en mano en Alcalá de Henares</p>

        <button
          onClick={() => setAdminMode(!adminMode)}
          className="mb-6 px-4 py-2 bg-black text-white rounded"
        >
          {adminMode ? "Modo Cliente" : "Modo Admin"}
        </button>

        {/* ADMIN */}
        {adminMode ? (

          <div className="bg-white p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Pedidos</h2>

            {orders.length === 0 && <p>No hay pedidos aún</p>}

            {orders.map((o, i) => (
              <div key={i} className="border-b py-2">
                <p><b>{o.name}</b> - {o.phone}</p>
                <p>{o.place} | {o.date} {o.time}</p>
                <p>Status: {o.status}</p>

                <button
                  onClick={() => markDone(i)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Marcar entregado
                </button>
              </div>
            ))}
          </div>

        ) : (

          <>

            {/* PRODUCTS */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">

              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded shadow">

                  <h2 className="font-bold">{p.name}</h2>
                  <p>{p.price}€</p>

                  <select
                    className="w-full border p-2 mt-2"
                    onChange={(e) =>
                      setFlavorMap({ ...flavorMap, [p.id]: e.target.value })
                    }
                  >
                    {flavors.map(f => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => addToCart(p)}
                    className="w-full mt-2 bg-black text-white py-2"
                  >
                    Añadir
                  </button>

                </div>
              ))}

            </div>

            {/* CART */}
            <div className="bg-white p-4 mb-6 rounded">
              <h2 className="font-bold mb-2">Carrito</h2>

              {cart.length === 0 && <p>Vacío</p>}

              {cart.map((c, i) => (
                <p key={i}>
                  {c.name} - {c.flavor} - {c.price}€
                </p>
              ))}
            </div>

            {/* FORM */}
            <div className="bg-white p-4 rounded">

              <input
                placeholder="Nombre"
                className="border p-2 w-full mb-2"
                onChange={(e)=>setOrder({...order,name:e.target.value})}
              />

              <input
                placeholder="Teléfono"
                className="border p-2 w-full mb-2"
                onChange={(e)=>setOrder({...order,phone:e.target.value})}
              />

              <input
                placeholder="Lugar"
                className="border p-2 w-full mb-2"
                onChange={(e)=>setOrder({...order,place:e.target.value})}
              />

              <input
                type="date"
                className="border p-2 w-full mb-2"
                onChange={(e)=>setOrder({...order,date:e.target.value})}
              />

              <input
                type="time"
                className="border p-2 w-full mb-2"
                onChange={(e)=>setOrder({...order,time:e.target.value})}
              />

              <button
                onClick={sendOrder}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded"
              >
                🚀 Confirmar pedido
              </button>

            </div>

          </>

        )}

      </div>
    </div>
  );
}