"use client";
import { useState } from "react";

export default function RepairPlan({ vehicleId }:{ vehicleId:string }){

  const [plan, setPlan] = useState<any>(null)

  async function generate(){

    const res = await fetch("/api/garage/repair-plan",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ vehicle_id: vehicleId })
    })

    const data = await res.json()

    if(data.success){
      setPlan(data)
    }
  }

  return (
    <div style={{marginTop:"20px"}}>

      <button onClick={generate}>
        Generate Repair Plan
      </button>

      {plan && (
        <div style={{marginTop:"15px", background:"#111", padding:"10px"}}>

          <h3>Repair Plan</h3>

          <div>
            Cause: {plan.plan.cause}
          </div>

          <div>
            Confidence: {Math.round(plan.plan.confidence * 100)}%
          </div>

          <div>
            Total Cost: ${plan.plan.total_estimated_cost}
          </div>

          <div>
            Estimated Time: {plan.plan.total_estimated_time_hours} hrs
          </div>

          <div style={{marginTop:"10px"}}>
            <strong>Parts:</strong>
          </div>

          {plan.items.map((i:any,idx:number)=>(
            <div key={idx} style={{marginTop:"6px"}}>

              <div>{i.part_number}</div>

              <div style={{fontSize:"12px", color:"#0f0"}}>
                {i.supplier} â€” ${i.price}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}