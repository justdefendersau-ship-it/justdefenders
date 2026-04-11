"use client";

import { useState } from "react";

export default function Home() {

  const [part, setPart] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function search() {

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ part }),
    });

    const json = await res.json();

    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>

      <h1>JustDefenders Parts Engine</h1>

      <input
        placeholder="Enter part number"
        value={part}
        onChange={(e) => setPart(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />

      <button onClick={search} style={{ padding: 8 }}>
        Search
      </button>

      {loading && <p>🔄 Searching...</p>}

      {data && data.decision && (
        <div style={{ marginTop: 20 }}>

          <h2>🏆 Best Option</h2>

          <div style={{
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 8,
            background: "#f9f9f9"
          }}>
            <p><strong>Supplier:</strong> {data.decision.recommendedSupplier}</p>
            <p><strong>Price:</strong> ${data.decision.price_aud}</p>
            <p><strong>Recommendation:</strong> {data.decision.recommendation}</p>
            <p><strong>Trend:</strong> {data.decision.trend}</p>
          </div>

          <h3 style={{ marginTop: 20 }}>All Suppliers</h3>

          {data.suppliers.map((s, i) => (
            <div key={i} style={{
              border: "1px solid #ddd",
              padding: 10,
              marginTop: 10,
              borderRadius: 6
            }}>
              <p><strong>{s.supplier}</strong></p>
              <p>Price: ${s.price_aud}</p>
              <p>Delivery: {s.delivery_days} days</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}