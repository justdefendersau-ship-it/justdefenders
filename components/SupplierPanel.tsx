"use client";

export default function SupplierPanel({ data }:any){

  async function reward(success:boolean){
    await fetch("/api/update-bandit",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        variant: data.variant,
        reward: success ? 1 : 0
      })
    })
  }

  return (
    <div
      onClick={()=>reward(false)} // click = weak signal
      style={{
        padding:"10px",
        marginBottom:"10px",
        background:"#111",
        border:"1px solid #222",
        cursor:"pointer"
      }}
    >

      <div style={{fontWeight:"bold"}}>
        {data.supplier}
      </div>

      <div style={{color:"#0f0"}}>
        ${data.price}
      </div>

      <button onClick={(e)=>{
        e.stopPropagation()
        reward(true) // conversion signal
      }}>
        Buy
      </button>

    </div>
  )
}
