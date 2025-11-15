/**
 * Dashboard Page
 * ------------------------
 * Allows authenticated users to:
 *  - View available sweets
 *  - Search sweets by name
 *  - Purchase sweets (if in stock)
 *
 * This page requires a valid JWT token.
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

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  /**
   * Fetch all available sweets
   */
  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:4000/api/sweets", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSweets(res.data);
  };

  /**
   * Purchase a sweet (quantity decreases)
   */
  const handlePurchase = async (id: string) => {
    try {
      await axios.post(
        `http://localhost:4000/api/sweets/${id}/purchase`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchSweets(); // refresh UI
    } catch (err) {
      console.error("Purchase error:", err);
    }
  };

  /**
   * Search sweets by name
   */
  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/sweets/search?name=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSweets(res.data);
  };

  // Load sweets on first render
  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Sweet Shop Dashboard</h1>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search sweets..."
            className="border p-2 rounded w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* SWEETS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sweets.map((sweet) => (
            <div
              key={sweet._id}
              className="p-4 border rounded shadow bg-white"
            >
              {/* IMAGE */}
              {sweet.image ? (
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* DETAILS */}
              <h2 className="text-xl font-semibold">{sweet.name}</h2>
              <p className="text-gray-700">Category: {sweet.category}</p>
              <p className="text-gray-700">Price: ₹{sweet.price}</p>

              <p className="font-bold">
                Stock:{" "}
                <span
                  className={
                    sweet.quantity > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {sweet.quantity}
                </span>
              </p>

              {/* PURCHASE BUTTON */}
              <button
                disabled={sweet.quantity === 0}
                onClick={() => handlePurchase(sweet._id)}
                className={`mt-3 w-full p-2 rounded text-white ${
                  sweet.quantity === 0
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
