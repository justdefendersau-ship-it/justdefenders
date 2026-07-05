\# ============================================================================



\# JustDefenders©



\#



\# File:



\# C:\\dev\\justdefenders\\frontend\\docs\\knowledge-registers\\



\# KR-006-Part-Identifier-Resolution.md



\#



\# Timestamp:



\# 29 June 2026 17:45 Sydney



\#



\# Knowledge Register



\#



\# KR-006



\#



\# Part Identifier Resolution



\#



\# Status:



\# Canonical Register



\#



\# ============================================================================



\# Purpose



This Knowledge Register defines the canonical approach used by the

JustDefenders Operational Intelligence Platform to resolve multiple part

identifiers into a single authoritative part record.



Owners frequently possess different identifiers for the same physical

component.



The objective of the platform is to recognise those identifiers and resolve

them intelligently without requiring the owner to understand manufacturer

cataloguing systems.



\---



\# Architectural Principle



One physical part.



One canonical record.



Many recognised identifiers.



Every supported identifier should resolve to the same authoritative Parts

Intelligence record.



\---



\# Supported Identifier Types



A canonical part may recognise one or more of the following identifiers.



\## Land Rover Part Number



Examples:



\* NRC...

\* STC...

\* ERR...

\* FTC...

\* LR...



\---



\## Superseded Land Rover Numbers



Historical part numbers shall remain searchable.



Where parts have been superseded, the platform shall preserve historical

references while directing owners to the currently recommended replacement.



\---



\## OEM Manufacturer Numbers



Examples include identifiers published by original equipment manufacturers

such as:



\* Timken

\* Bosch

\* NTN

\* SKF

\* Valeo

\* Delphi

\* Lucas

\* VDO



OEM references shall resolve to the canonical part record.



\---



\## Aftermarket Manufacturer Numbers



Examples include:



\* Britpart

\* Allmakes 4x4

\* Bearmach

\* Terrafirma

\* Ashcroft Transmissions

\* ARB

\* Old Man Emu



Where equivalent components exist, they shall be linked to the same canonical

part while preserving manufacturer-specific information.



\---



\## Supplier Catalogue Numbers



Suppliers frequently maintain their own internal catalogue identifiers.



These identifiers should remain searchable while resolving to the canonical

part.



\---



\## Common Workshop Terminology



Owners frequently search using descriptive names rather than catalogue

numbers.



Examples include:



\* Water pump

\* Lift pump

\* Swivel seal

\* Wheel bearing

\* Hub seal

\* Clutch fork

\* A-frame ball joint



The platform should recognise these common terms.



\---



\## Community Terminology



The Defender community often uses informal names.



Examples include:



\* A-frame ball joint

\* Diff pinion seal

\* Turbo hose

\* Rear output seal

\* Injector loom

\* Wading plug



These names should also resolve successfully.



\---



\## Visual Identification



Future platform capabilities may include:



\* Photograph recognition

\* Packaging recognition

\* OCR from labels

\* Barcode recognition

\* QR code recognition



Visual identifiers should resolve to the same canonical part record whenever

confidence permits.



\---



\# Resolution Strategy



When multiple identifiers are recognised, the platform shall present a single

authoritative part record containing:



\* Canonical part number

\* OEM references

\* Aftermarket equivalents

\* Superseded numbers

\* Compatible Defender variants

\* Engine compatibility

\* Related components

\* Workshop references

\* Supplier options

\* Evidence

\* Operational Insights



The owner should never be required to manually correlate equivalent part

numbers.



\---



\# Future Expansion



Future revisions may include:



\* VIN-assisted resolution

\* Voice search

\* Natural language search

\* Handwritten invoice recognition

\* Historic catalogue imports

\* Supplier API lookups

\* AI-assisted identification

\* Image similarity matching



\---



\# Architectural References



Referenced by:



\* ADR-002 Defender Parts Intelligence

\* Parts Intelligence Engine

\* Procurement Intelligence

\* Expedition Intelligence

\* Digital Twin

\* Knowledge Acquisition Engine



This register defines the canonical strategy for resolving multiple

identifiers into a single authoritative Parts Intelligence record.



