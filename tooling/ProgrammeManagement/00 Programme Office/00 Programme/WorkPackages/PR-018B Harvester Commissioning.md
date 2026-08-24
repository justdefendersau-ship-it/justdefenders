# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PR-018B — HARVESTER COMMISSIONING
#
# Programme  : PP-001 — Product Platform
# Milestone  : MS-006 — Operational Intelligence Baseline
# Workstream : Harvester
# Predecessor: PR-018A — Operational Assessment
#
# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary
# Timestamp  : 14 August 2026
#
# ==================================================================================================

# 1. PURPOSE

PR-018B commissions the Harvester implementation surface established by PR-018A.

The purpose of this work package is to establish the Harvester as a commissioned
operational intelligence component capable of proceeding into:

    PR-019A — Source Discovery

    PR-019B — Harvest Execution

    PR-019C — Result Normalisation

    PR-019D — Persistence

    PR-019E — Federation

PR-018B does not constitute the first real harvest.

The first controlled real harvest remains an MS-006 activity and is performed through
PR-019B.

---

# 2. AUTHORITY

MS-005 establishes Harvester operational readiness and the controlled source and
collection boundary.

MS-006 establishes the first controlled real harvest.

The authorised MS-006 delivery sequence is:

1. PR-018A — Operational Assessment
2. PR-018B — Harvester Commissioning
3. PR-019A — Source Discovery
4. PR-019B — Harvest Execution
5. PR-019C — Result Normalisation
6. PR-019D — Persistence
7. PR-019E — Federation

PR-018B therefore establishes the commissioned state required before real collection
is initiated.

---

# 3. PREDECESSOR

PR-018A — Operational Assessment

PR-018A established:

- the Harvester operational boundary;
- the source registry ownership boundary;
- the source discovery boundary;
- the collection adapter boundary;
- the raw result contract;
- the normalisation boundary;
- the persistence boundary;
- the federation boundary;
- the multi-source requirement;
- the requirement for additional source discovery;
- the requirement for controlled collection.

PR-018B implements that established boundary.

---

# 4. COMMISSIONING OBJECTIVE

The Harvester shall be considered commissioned when the following operational
composition exists:

    Operational Service Host
            |
            v
    Harvester Managed Service
            |
            v
    Harvester Runtime
            |
            v
    Source Registry
            |
            v
    Source Discovery / Collection Boundary
            |
            v
    Result Normalisation
            |
            v
    Persistence
            |
            v
    Federation

Each layer retains its existing ownership.

No layer shall assume ownership of another layer's runtime state.

---

# 5. OWNERSHIP

## 5.1 Operational Service Host

Owns:

- managed-service hosting;
- lifecycle coordination;
- service registration;
- service startup;
- service shutdown;
- scheduler integration;
- operational health.

The Operational Service Host does not own source collection.

---

## 5.2 Harvester Runtime

Owns:

- Harvester runtime state;
- Harvester lifecycle state;
- execution state;
- operational metrics;
- runtime health;
- runtime status.

The Harvester Runtime does not become the owner of external source data.

---

## 5.3 Source Registry

Owns:

- source registration;
- source metadata;
- source enablement;
- source disablement;
- source state;
- source execution statistics;
- source failure state.

A source being registered, enabled, connected or healthy does not by itself prove
that external source material has been collected.

---

## 5.4 Collection Engine

Owns:

- source discovery execution;
- candidate source creation;
- collection adapter selection;
- bounded source acquisition;
- raw collection result creation;
- collection-level diagnostics.

The collection engine does not own canonical persistence.

---

## 5.5 Normalisation

Owns:

- conversion of raw collection results into the established normalised form;
- extraction of structured intelligence;
- normalised record construction.

---

## 5.6 Persistence

Owns:

- durable storage of normalised results;
- persistence metadata;
- storage location;
- persistence status.

---

## 5.7 Federation

Owns:

- propagation of persisted intelligence;
- downstream intelligence representation;
- federation state.

---

# 6. COMMISSIONED HARVESTER SURFACE

PR-018B commissions the following functional surface:

    Harvester
    │
    ├── Managed Service
    │
    ├── Runtime
    │
    ├── Source Registry
    │
    ├── Source Discovery
    │
    ├── Candidate Qualification
    │
    ├── Collection Adapter Boundary
    │
    ├── Raw Result Contract
    │
    ├── Normalisation
    │
    ├── Persistence
    │
    └── Federation

This is a composed operational capability rather than a single monolithic
collection function.

---

# 7. SOURCE MODEL

A commissioned source definition shall be capable of representing:

- source identifier;
- source name;
- supplier or community identity where applicable;
- source URL or endpoint;
- source type;
- country where known;
- enabled state;
- authorisation state;
- discovery method;
- collection scope;
- collection restrictions.

The source definition must retain provenance.

A discovered source shall remain distinguishable from a configured source.

---

# 8. SOURCE DISCOVERY

PR-018B commissions the boundary through which PR-019A will discover sources.

Source discovery shall support:

1. configured sources;
2. known community sources;
3. known supplier sources;
4. additional relevant sources discovered during operation.

The discovery process shall create candidate source definitions rather than silently
converting every discovered URL into an authorised collection target.

The discovery boundary shall remain separate from collection execution.

---

# 9. SOURCE QUALIFICATION

Before collection, a candidate source shall be capable of being assessed for:

- valid source address;
- supported source type;
- collection adapter availability;
- source accessibility;
- collection policy;
- authorisation;
- source relevance;
- source restrictions.

Only an eligible source proceeds into controlled collection.

---

# 10. COLLECTION ADAPTER BOUNDARY

The commissioned Harvester shall expose a pluggable collection adapter boundary.

The boundary shall support the future addition of:

- web collection;
- feed collection;
- API collection;
- other authorised collection mechanisms.

The initial adapter must not be treated as the permanent architecture.

An adapter must return structured collection output.

The adapter must preserve:

- source identity;
- source URL;
- collection timestamp;
- response metadata;
- collection status;
- raw payload;
- failure information.

---

# 11. REAL COLLECTION REQUIREMENT

The commissioned collection boundary must be capable of performing actual external
source acquisition.

The following shall not be accepted as evidence of real collection:

- synthetic records;
- incrementing recordsCollected without external acquisition;
- source metadata copied into a result;
- a Connected flag alone;
- a HEALTHY source state alone;
- a successful managed-service heartbeat alone.

A real collection result requires evidence that source material was actually
acquired through the collection boundary.

---

# 12. CONTROLLED COLLECTION

Collection shall be bounded.

The commissioned Harvester shall provide controls for:

- request timeout;
- response size;
- discovery depth;
- discovery result count;
- collection result count;
- source-level failure isolation.

Collection shall not become an uncontrolled recursive crawler.

A failing source shall not terminate the entire Harvester service.

---

# 13. SOURCE ACCESS POLICY

The collection boundary shall support applicable source access restrictions.

Where applicable, collection shall:

- identify itself using the configured Harvester user agent;
- inspect source access policy;
- respect disallowed paths;
- avoid unrestricted recursive traversal;
- retain source provenance;
- stop collection when a source is not eligible.

The commissioning layer does not grant permission to collect from a source merely
because the source was discovered.

---

# 14. RAW RESULT CONTRACT

The commissioned collection boundary shall produce raw results capable of representing:

    source
    sourceId
    sourceUrl
    finalUrl
    adapter
    status
    statusCode
    contentType
    capturedAt
    payload
    metadata
    error

The raw result shall be suitable for PR-019C Result Normalisation.

The collection boundary shall not manufacture canonical intelligence records merely
to satisfy runtime statistics.

---

# 15. NORMALISATION INTEGRATION

PR-018B establishes the hand-off from collection to normalisation.

The intended sequence is:

    Source
      |
      v
    Collection Adapter
      |
      v
    Raw Result
      |
      v
    PR-019C Result Normalisation
      |
      v
    Normalised Result

Normalisation remains a separate responsibility.

---

# 16. PERSISTENCE INTEGRATION

The commissioned Harvester shall preserve the downstream persistence boundary.

The intended sequence is:

    Raw Result
        |
        v
    Normalisation
        |
        v
    Persistence

PR-018B does not move persistence ownership into the collection engine.

---

# 17. FEDERATION INTEGRATION

Federation remains downstream of persistence.

The intended sequence is:

    Collection
        |
        v
    Normalisation
        |
        v
    Persistence
        |
        v
    Federation

No direct collection-to-federation path is authorised.

---

# 18. MULTI-SOURCE COMMISSIONING

The Harvester is commissioned as a multi-source capability.

The implementation shall not:

- hard-code a single source;
- require one permanent source;
- require manual replacement of the source URL for each harvest;
- treat a single supplier as the Harvester's architecture.

Multiple sources must pass through the same source/collection boundary.

Additional sources discovered during PR-019A shall be capable of entering the same
pipeline.

---

# 19. FAILURE ISOLATION

Source-level failure shall be isolated.

Each collection attempt shall have an independently observable outcome.

Permitted outcomes include:

- EXECUTED
- SKIPPED
- FAILED

A failed source shall not automatically transition the Harvester into an unhealthy
runtime state unless the failure represents a genuine runtime failure.

Source failures shall be available for subsequent diagnostics.

---

# 20. OPERATIONAL OBSERVABILITY

The commissioned Harvester shall expose sufficient information to determine:

- Harvester runtime state;
- source count;
- candidate source count;
- collection attempts;
- successful collections;
- skipped collections;
- failed collections;
- records collected;
- latest collection timestamp;
- source-level failures.

These values must remain compatible with the existing Harvester operational status
and diagnostic surfaces.

---

# 21. PUBLIC API PRESERVATION

PR-018B does not authorise breaking the existing managed-service public API.

Existing Harvester lifecycle and operational surfaces shall remain available.

At minimum, existing lifecycle/status/health semantics shall remain intact.

The addition of source discovery and collection capability shall occur behind the
existing managed-service boundary.

---

# 22. RUNTIME SAFETY

The commissioned Harvester shall:

- start without requiring an immediate real harvest;
- remain capable of reporting operational health before collection;
- isolate source-level errors;
- avoid crashing the managed-service host because of one source;
- preserve runtime state;
- preserve diagnostics;
- preserve scheduler integration.

Commissioning must not make the Harvester dependent upon successful external
collection merely to initialise its runtime.

---

# 23. NO AUTOMATIC FIRST HARVEST

PR-018B does not initiate the first real harvest.

Commissioning establishes capability.

The first controlled real harvest remains:

    PR-019B — Harvest Execution

This separation is mandatory.

---

# 24. COMMISSIONING STATE

The Harvester commissioning state is represented conceptually as:

    UNCOMMISSIONED
          |
          v
    PR-018A ASSESSED
          |
          v
    PR-018B COMMISSIONED
          |
          v
    PR-019A SOURCE DISCOVERY
          |
          v
    PR-019B HARVEST EXECUTION

PR-018B therefore represents a capability transition rather than a collection event.

---

# 25. COMMISSIONING ACCEPTANCE CONDITIONS

PR-018B is accepted when:

1. The Operational Service Host remains operational.
2. The Harvester remains a managed service.
3. Harvester runtime remains operational.
4. Source Registry remains the source-state owner.
5. Source discovery has a defined execution boundary.
6. Candidate source qualification has a defined boundary.
7. Collection has a dedicated adapter boundary.
8. Multiple sources are supported.
9. Additional discovered sources can enter the same pipeline.
10. Raw collection results have a defined contract.
11. Normalisation remains downstream.
12. Persistence remains downstream.
13. Federation remains downstream.
14. Source failures are isolated.
15. Operational collection metrics remain observable.
16. Existing lifecycle/status/health interfaces remain available.
17. No uncontrolled crawling is introduced.
18. PR-018B itself does not perform the first real harvest.

---

# 26. COMMISSIONING NON-CONDITIONS

PR-018B shall not be considered failed merely because:

- a particular external source is temporarily unavailable;
- a discovered candidate is rejected;
- a source refuses collection;
- a source contains no relevant material;
- a collection adapter reports an individual source failure.

Those are source-level outcomes.

PR-018B fails only where the commissioned Harvester architecture cannot provide
the required controlled source discovery and collection boundary.

---

# 27. NEXT AUTHORISED WORK

Upon successful completion of PR-018B, the next authorised activity is:

# PR-019A — SOURCE DISCOVERY

PR-019A shall:

- activate source discovery;
- enumerate configured sources;
- identify additional candidate sources;
- qualify candidate sources;
- produce the source set for controlled collection.

PR-019A shall not bypass the commissioned collection boundary.

---

# 28. MS-006 TRANSITION

The transition after PR-018B is:

    PR-018A
    Operational Assessment
            |
            v
    PR-018B
    Harvester Commissioning
            |
            v
    PR-019A
    Source Discovery
            |
            v
    PR-019B
    Harvest Execution
            |
            v
    PR-019C
    Result Normalisation
            |
            v
    PR-019D
    Persistence
            |
            v
    PR-019E
    Federation

The MS-006 objective is not satisfied by commissioning alone.

The actual intelligence transition occurs when PR-019B executes the first controlled
real harvest and its output successfully traverses the downstream pipeline.

---

# 29. OUTCOME

PR-018B establishes the commissioned Harvester implementation boundary required for
MS-006.

Status:

    PR-018B — HARVESTER COMMISSIONING
    STATUS: COMMISSIONED

The Harvester is authorised to proceed to:

    PR-019A — SOURCE DISCOVERY

No additional architectural redesign is required by PR-018B.

The first controlled real harvest remains gated to PR-019B.

# ==================================================================================================
# END OF PR-018B — HARVESTER COMMISSIONING
# ==================================================================================================