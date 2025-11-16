/**
 * AdminPanel Page
 * ------------------------
 * Allows admin users to:
 *  - Add new sweets
 *  - View all sweets
 *  - Restock sweets
 *  - Delete sweets
 *
 * All operations require a valid JWT token.
 */

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  // Form states
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // price + quantity are STRINGS inside inputs
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  // Restock amounts (per sweet)
  const [restockAmounts, setRestockAmounts] = useState<{
    [id: string]: string;
  }>({});

  const token = localStorage.getItem("token");

  /**
   * Fetch all sweets from backend
   */
  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:4000/api/sweets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSweets(res.data);
  };

  /**
   * Add new sweet (Admin only)
   */
  const addSweet = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:4000/api/sweets",
      {
        name,
        category,
        price: Number(price), // convert string → number
        quantity: Number(quantity),
        image,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // refresh + reset
    fetchSweets();
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImage("");
  };

  /**
   * Delete sweet (Admin only)
   */
  const deleteSweet = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/sweets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSweets();
  };

  /**
   * Restock sweet (Admin only)
   */
  const restockSweet = async (id: string, amount: string) => {
    if (!amount || Number(amount) <= 0) return;

    await axios.post(
      `http://localhost:4000/api/sweets/${id}/restock`,
      { amount: Number(amount) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchSweets();
  };

  // Load sweets on page render
  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        {/* ADD SWEET FORM */}
        <form
          onSubmit={addSweet}
          className="p-4 border rounded w-full max-w-xl mb-8 bg-white shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Sweet</h2>

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Sweet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Price (₹)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Stock Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <button className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700">
            Add Sweet
          </button>
        </form>

        {/* SWEETS LIST */}
        <h2 className="text-2xl font-bold mb-4">All Sweets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sweets.map((sweet) => (
            <div key={sweet._id} className="p-4 border rounded shadow bg-white">
              {/* IMAGE */}
              <img
                src={`http://localhost:4000/${sweet.image}`}
                alt={sweet.name}
                className="w-full h-40 object-cover rounded mb-3"
              />


              {/* DETAILS */}
              <h2 className="text-xl font-semibold">{sweet.name}</h2>
              <p>Category: {sweet.category}</p>
              <p>Price: ₹{sweet.price}</p>
              <p className="font-bold">Stock: {sweet.quantity}</p>

              {/* RESTOCK INPUT */}
              <div className="mt-3 flex gap-2">
                <input
                  type="number"
                  className="border p-2 w-24 rounded"
                  placeholder="Qty"
                  value={restockAmounts[sweet._id] || ""}
                  onChange={(e) =>
                    setRestockAmounts({
                      ...restockAmounts,
                      [sweet._id]: e.target.value, // store as string
                    })
                  }
                />

                <button
                  onClick={() =>
                    restockSweet(sweet._id, restockAmounts[sweet._id] || "")
                  }
                  className="bg-blue-600 text-white px-3 rounded"
                >
                  Restock
                </button>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteSweet(sweet._id)}
                className="bg-red-600 text-white w-full p-2 mt-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
