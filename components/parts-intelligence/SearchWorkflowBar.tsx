"use client";

import React,
{
  useState
}
from "react"

// =====================================================
// JustDefenders ©
// Operational Toolbar
// =====================================================

export default function SearchWorkflowBar({

  search,
  setSearch,
  selectedVehicle,
  setSelectedVehicle

}:any){

  const [filtersOpen,setFiltersOpen] =
    useState(false)

  return (

    <div className="jd-toolbar-shell">

      <div className="jd-toolbar-top">

        <div className="jd-toolbar-brand">

          JustDefenders Parts Intelligence

        </div>

        <div className="jd-toolbar-actions">

          <button className="jd-secondary-button">
            Export
          </button>

          <button className="jd-primary-button">
            Email
          </button>

        </div>

      </div>

      <div className="jd-toolbar-row">

        <input
          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search part number, VIN or keyword"

          className="jd-toolbar-search"
        />

        <select
          className="jd-toolbar-select"

          value={selectedVehicle}

          onChange={(e)=>
            setSelectedVehicle(
              e.target.value
            )
          }
        >

          <option>300Tdi</option>
          <option>Td5</option>
          <option>Puma 2.2</option>
          <option>County</option>
          <option>One Ten</option>

        </select>

        <button
          className="jd-primary-button"
        >

          Search

        </button>

        <button
          className="jd-success-button"

          onClick={()=>
            setFiltersOpen(!filtersOpen)
          }
        >

          Filters

        </button>

      </div>

      <div className="jd-toolbar-chip-row">

        <div className="jd-chip-active">
          Touring
        </div>

        <div className="jd-chip">
          OEM
        </div>

        <div className="jd-chip">
          Physical Store
        </div>

        <div className="jd-chip">
          Australia Only
        </div>

        <div className="jd-chip">
          Heavy Duty
        </div>

      </div>

      {filtersOpen && (

        <div className="jd-toolbar-filter-panel">

          <div className="jd-filter-grid">

            <label>
              <input type="checkbox" />
              Touring Recommended
            </label>

            <label>
              <input type="checkbox" />
              Physical Store
            </label>

            <label>
              <input type="checkbox" />
              OEM Only
            </label>

            <label>
              <input type="checkbox" />
              Same Day Dispatch
            </label>

            <label>
              <input type="checkbox" />
              Australia Only
            </label>

            <label>
              <input type="checkbox" />
              Heavy Duty
            </label>

          </div>

        </div>
      )}

    </div>
  )
}
