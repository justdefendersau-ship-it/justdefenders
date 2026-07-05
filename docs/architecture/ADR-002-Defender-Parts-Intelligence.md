\# ============================================================================



\# JustDefenders©



\#



\# File:



\# C:\\dev\\justdefenders\\frontend\\docs\\architecture\\



\# ADR-002-Defender-Parts-Intelligence.md



\#



\# Timestamp:



\# 29 June 2026 18:30 Sydney



\#



\# Architecture Decision Record



\#



\# ADR-002



\#



\# Defender Parts Intelligence



\#



\# Status:



\# Draft



\#



\# ============================================================================



\# ADR-002 – Defender Parts Intelligence



\## 1. Purpose



\### Overview



The Defender Parts Intelligence Engine is a foundational capability of the

JustDefenders Operational Intelligence Platform.



Its purpose is to help owners identify, understand, procure and maintain the

correct components for their specific Defender by combining canonical parts

data, vehicle configuration, operational history, evidence and community

knowledge into a single authoritative experience.



The objective is not simply to provide a searchable parts catalogue.



The objective is to reduce uncertainty and increase confidence when making

maintenance and procurement decisions.



\---



\## 2. Problem Statement



Finding the correct Defender part is frequently more complex than searching

for a catalogue number.



Owners may begin with:



\* a Land Rover part number;

\* a superseded part number;

\* an OEM manufacturer number;

\* an aftermarket catalogue number;

\* a supplier invoice;

\* a faded parts box;

\* a barcode;

\* a QR code;

\* a photograph;

\* a workshop manual reference;

\* a spoken description;

\* a symptom;

\* or simply the question:



> "Is this the right part for my Defender?"



Existing systems typically require owners to understand manufacturer

catalogues, supplier terminology and model-specific variations before they can

locate the correct component.



JustDefenders reverses that process.



The platform accepts whatever information the owner has available and

intelligently resolves it into a single authoritative part record.



\---



\## 3. Architectural Vision



Defender Parts Intelligence is not intended to replace:



\* Workshop manuals;

\* Parts catalogues;

\* Specialist suppliers;

\* Land Rover clubs;

\* Technical forums;

\* Community expertise.



Instead, the platform connects these sources intelligently around the owner's

Digital Twin.



Every maintenance decision should present the owner with the information

required to act confidently without searching multiple systems.



The platform therefore becomes a unified operational workspace rather than

another isolated catalogue.



\---



\## 4. Architectural Principles



The Defender Parts Intelligence Engine shall operate according to the

following principles.



\### Defender First



Every recommendation shall be specific to supported Defender variants defined

within KR-001.



Generic vehicle assumptions shall be avoided.



\---



\### One Canonical Part



Every physical component shall have one authoritative part record.



Multiple identifiers shall resolve to that canonical record.



\---



\### Search Should Start Anywhere



Owners should never need to know the correct identifier before beginning a

search.



The platform shall support searches using:



\* Part numbers;

\* OEM numbers;

\* Aftermarket numbers;

\* Supplier catalogue numbers;

\* Common workshop terminology;

\* Community terminology;

\* VIN;

\* Barcode;

\* QR code;

\* OCR;

\* Voice;

\* Photographs;

\* Natural language;

\* Symptoms.



Every supported search method should converge on the same canonical part

record.



\---



\### Explainability



Every recommendation should clearly explain:



\* why the part is recommended;

\* how compatibility was determined;

\* what supporting evidence exists;

\* which Defender variants are applicable;

\* and what alternatives are available.



Owners should understand recommendations rather than simply receiving them.



\---



\### Operational Context



Parts should never be presented in isolation.



Every canonical part record should be capable of presenting operational

context including:



\* Vehicle compatibility;

\* Engine compatibility;

\* Associated components;

\* Expedition relevance;

\* Service interval;

\* Workshop references;

\* Supplier options;

\* Previous maintenance;

\* Operational Insights;

\* Evidence;

\* Personal ownership history.



The objective is to support confident decisions rather than isolated part

lookups.



