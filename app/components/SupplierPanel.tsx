/*
File: C:\dev\justdefenders\frontend\app\components\SupplierPanel.tsx
Timestamp: 03 May 2026 22:40 (Sydney)
JustDefenders ©

SUPPLIER PANEL — FINAL BUILD (STATIC DATA FIRST)

✔ Grid-based (no layout issues)
✔ Best option highlight
✔ Matches provided reference layout
✔ Ready for backend wiring
*/

export default function SupplierPanel() {

const suppliers = [
{
name: "Repco",
part: "Starter Motor",
partNumber: "NAD500210",
price: 295,
score: 61,
confidence: "High",
tag: "BEST OPTION",
highlight: true
},
{
name: "RoverParts Direct",
part: "Starter Motor",
partNumber: "NAD500210",
price: 310,
score: 57,
confidence: "Medium"
},
{
name: "eBay Seller 123",
part: "Starter Motor",
partNumber: "NAD500210",
price: 260,
score: 53,
confidence: "Low"
}
];

return ( <div style={container}>


  {suppliers.map((s, i) => (
    <div
      key={i}
      style={{
        ...card,
        ...(s.highlight ? bestCard : {})
      }}
    >

      {/* LEFT — SUPPLIER */}
      <div style={left}>
        <div style={logoPlaceholder}></div>
        <div style={supplierName}>{s.name}</div>
      </div>

      {/* MIDDLE — PRODUCT */}
      <div style={middle}>

        <div style={imagePlaceholder}></div>

        <div>
          <div style={partTitle}>{s.part}</div>
          <div style={partNumber}>{s.partNumber}</div>

          <div style={meta}>
            ✓ Supplier trust  
            <br />
            ✓ Quality part  
            <br />
            Confidence: {s.confidence}
          </div>
        </div>

      </div>

      {/* RIGHT — PRICE */}
      <div style={right}>

        {s.tag && (
          <div style={bestTag}>{s.tag}</div>
        )}

        <div style={price}>${s.price}</div>
        <div style={score}>Score: {s.score}</div>

      </div>

    </div>
  ))}

</div>


);
}

/* =========================
STYLES
========================= */

const container = {
maxWidth: "1100px",
margin: "30px auto"
};

const card = {
display: "grid",
gridTemplateColumns: "220px 1fr 180px",
gap: "20px",
alignItems: "center",
padding: "18px",
borderRadius: "12px",
background: "#f4f4f4",
marginBottom: "16px"
};

const bestCard = {
background: "linear-gradient(135deg, #1e3c72, #2a5298)",
color: "#fff",
border: "1px solid #4fa3ff"
};

const left = {
display: "flex",
alignItems: "center",
gap: "12px"
};

const logoPlaceholder = {
width: "60px",
height: "40px",
background: "#ddd"
};

const supplierName = {
fontWeight: "600",
fontSize: "16px"
};

const middle = {
display: "flex",
gap: "16px",
alignItems: "center"
};

const imagePlaceholder = {
width: "90px",
height: "90px",
background: "#ccc",
borderRadius: "8px"
};

const partTitle = {
fontWeight: "600",
fontSize: "18px"
};

const partNumber = {
fontSize: "13px",
opacity: 0.8
};

const meta = {
fontSize: "12px",
marginTop: "6px"
};

const right = {
textAlign: "right"
};

const price = {
fontSize: "28px",
fontWeight: "700"
};

const score = {
fontSize: "12px",
marginTop: "4px"
};

const bestTag = {
fontSize: "11px",
marginBottom: "6px",
opacity: 0.9
};
