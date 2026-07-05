\# ============================================================================



\# JustDefenders©



\#



\# File:



\# C:\\dev\\justdefenders\\frontend\\docs\\knowledge-registers\\



\# KR-002-Engine-Register.md



\#



\# Timestamp:



\# 29 June 2026 16:30 Sydney



\#



\# Knowledge Register



\#



\# KR-002



\#



\# Engine Register



\#



\# Status:



\# Canonical Register



\#



\# ============================================================================



\# Purpose



This Knowledge Register defines the canonical engine variants supported by the

JustDefenders Operational Intelligence Platform.



The register provides the authoritative reference for engine identification,

vehicle compatibility, operational intelligence, procurement intelligence,

maintenance scheduling and Digital Twin configuration.



All platform components shall reference this register rather than maintaining

independent engine definitions.



\---



\# Architectural Principle



Engines represent one of the primary dimensions of the Digital Twin.



Operational Intelligence, Parts Intelligence and Fuel Intelligence shall all

consider engine configuration when generating recommendations.



\---



\# Engine Register



\## Rover 3.5L V8 Petrol



| Attribute      | Value               |

| -------------- | ------------------- |

| Fuel           | Petrol              |

| Cylinders      | V8                  |

| Induction      | Naturally Aspirated |

| Cooling        | Liquid              |

| Primary Models | Ninety              |



Operational Characteristics



\* Strong low-speed torque

\* Higher fuel consumption

\* Simple mechanical architecture

\* Well supported by enthusiast community



\---



\## Isuzu 4BD1



| Attribute      | Value               |

| -------------- | ------------------- |

| Fuel           | Diesel              |

| Cylinders      | Inline 4            |

| Induction      | Naturally Aspirated |

| Cooling        | Liquid              |

| Primary Models | Land Rover 120      |



Operational Characteristics



\* Exceptional durability

\* Heavy-duty commercial design

\* Long service life

\* Popular expedition platform



\---



\## 200Tdi



| Attribute    | Value      |

| ------------ | ---------- |

| Fuel         | Diesel     |

| Cylinders    | Inline 4   |

| Turbocharged | Yes        |

| Injection    | Mechanical |

| Cooling      | Liquid     |



Supported Vehicles



\* Defender 90

\* Defender 110

\* Defender 130



Operational Characteristics



\* Simple field maintenance

\* Excellent expedition reputation

\* Minimal electronic dependency

\* High owner serviceability



\---



\## 300Tdi



| Attribute    | Value      |

| ------------ | ---------- |

| Fuel         | Diesel     |

| Cylinders    | Inline 4   |

| Turbocharged | Yes        |

| Injection    | Mechanical |

| Cooling      | Liquid     |



Supported Vehicles



\* Defender 90

\* Defender 110

\* Defender 130



Operational Characteristics



\* Widely supported globally

\* Excellent parts availability

\* High reliability

\* Popular touring platform



\---



\## Td5



| Attribute         | Value          |

| ----------------- | -------------- |

| Fuel              | Diesel         |

| Cylinders         | Inline 5       |

| Turbocharged      | Yes            |

| Engine Management | Electronic ECU |



Supported Vehicles



\* Defender 90

\* Defender 110

\* Defender 130



Operational Characteristics



\* Electronically managed engine

\* Strong aftermarket support

\* Excellent touring capability

\* Extensive diagnostic capability



\---



\## Tdci 2.4 (Puma)



| Attribute         | Value          |

| ----------------- | -------------- |

| Fuel              | Diesel         |

| Cylinders         | Inline 4       |

| Turbocharged      | Yes            |

| Engine Management | Electronic ECU |



Production



2007–2012



Operational Characteristics



\* Improved refinement

\* Six-speed transmission

\* Excellent highway touring

\* Modern electronic integration



\---



\## Tdci 2.2 (Puma)



| Attribute         | Value          |

| ----------------- | -------------- |

| Fuel              | Diesel         |

| Cylinders         | Inline 4       |

| Turbocharged      | Yes            |

| Engine Management | Electronic ECU |



Production



2012–2016



Operational Characteristics



\* Final Defender engine

\* Improved emissions compliance

\* Mature platform

\* Strong parts support



\---



\# Operational Intelligence



The engine type influences multiple platform capabilities including:



\* Parts compatibility

\* Maintenance scheduling

\* Fuel Intelligence

\* Operational Insights

\* Known issues

\* Supplier recommendations

\* Expedition preparation

\* Diagnostic workflows

\* Service interval calculations

\* Digital Twin configuration



Engine identification shall therefore be considered mandatory for every

Digital Twin.



\---



\# Future Register Expansion



Future revisions of this register may include:



\* Engine specifications

\* Factory power and torque

\* Lubricant capacities

\* Cooling capacities

\* Common failure modes

\* Service intervals

\* Known operational characteristics

\* Parts intelligence references

\* Diagnostic procedures

\* Technical Service Bulletins



\---



\# Architectural References



Referenced by:



\* KR-001 Supported Defender Variants

\* ADR-001 Operational Intelligence Philosophy

\* ADR-002 Defender Parts Intelligence

\* ADR-004 Fuel Intelligence

\* Digital Twin

\* VIN Decoder

\* Procurement Intelligence

\* Knowledge Acquisition Engine



This register represents the single authoritative source for supported engine

variants within the JustDefenders Operational Intelligence Platform.



