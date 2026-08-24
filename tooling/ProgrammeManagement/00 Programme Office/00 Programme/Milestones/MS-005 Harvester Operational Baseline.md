# JustDefenders ©

# MS-005 — Harvester Operational Baseline

**Programme:** JustDefenders Product Platform  
**Milestone:** MS-005  
**Title:** Harvester Operational Baseline  
**Predecessor:** MS-004 — Foundation Engineering Baseline  
**Successor:** MS-006 — First Operational Harvest Executed  

**Timestamp:** 14 August 2026

---

## 1. Purpose

MS-005 establishes the operational baseline for the JustDefenders Harvester.

The purpose of this milestone is to establish that the Harvester is operationally registered, controllable, observable, and ready to proceed to controlled real collection.

MS-005 does **not** constitute the first operational harvest.

The first controlled real harvest is a subsequent MS-006 activity.

---

## 2. Programme Position

The authoritative programme sequence is:

1. MS-004 — Foundation Engineering Baseline
2. MS-005 — Harvester Operational Baseline
3. MS-006 — First Operational Harvest Executed

MS-005 therefore forms the operational gate between foundation/runtime readiness and real intelligence collection.

---

## 3. Operational Baseline

MS-005 requires the following operational conditions to be established.

### 3.1 Operational Service Host

The Operational Service Host shall be:

- Initialised
- Running
- Healthy
- Capable of maintaining managed-service registrations
- Capable of starting managed services
- Capable of stopping managed services
- Capable of restarting managed services
- Capable of exposing managed-service status and health

### 3.2 Harvester Registration

The Harvester shall be registered with the Operational Service Host.

The active registration shall identify:

- Name
- Display name
- Description
- Version
- Runtime type
- Runtime state
- Enabled state
- Startup command
- Stop command
- Restart command
- Status command
- Health command
- Metrics command

The registration shall be represented through the Host Runtime rather than through direct consumer access to the underlying Operational Registry.

### 3.3 Harvester Lifecycle

The Harvester shall expose the managed-service lifecycle required by the operational host.

The baseline lifecycle contract is:

    Start-JDHarvester
    Stop-JDHarvester
    Restart-JDHarvester

The registration shall expose:

    StartupCommand : Start-JDHarvester
    StopCommand    : Stop-JDHarvester
    RestartCommand : Restart-JDHarvester

### 3.4 Harvester Observability

The Harvester shall expose:

    Get-JDHarvesterStatus
    Get-JDHarvesterHealth
    Get-JDHarvesterMetrics

The operational baseline shall permit the host and engineering operators to determine:

- Whether the Harvester is running
- Whether the Harvester is healthy
- Current runtime phase
- Queue state
- Worker state
- Harvest activity
- Processing activity
- Failure state
- Heartbeat state

---

## 4. Source and Collection Gate

MS-005 establishes readiness for collection but does not itself authorise uncontrolled collection.

Before the first real harvest, the collection surface shall be explicitly established.

The collection gate shall identify:

- Authorised source or sources
- Source discovery state
- Collection mechanism
- Collection mode
- Expected result boundary
- Normalisation boundary
- Persistence boundary
- Federation boundary

No production collection shall be inferred solely from the fact that the Harvester runtime is healthy.

---

## 5. Controlled Collection Boundary

The first real collection belongs to MS-006.

MS-005 therefore establishes:

> The Harvester is operationally ready to perform controlled collection.

MS-005 does not establish:

> A real production harvest has been successfully completed.

The transition to real collection requires an explicit controlled MS-006 execution.

---

## 6. Persistence Boundary

The Harvester operational baseline shall preserve a defined boundary between:

    Source
      ↓
    Collection
      ↓
    Normalisation
      ↓
    Persistence
      ↓
    Federation

The existence of a running Harvester shall not by itself be treated as evidence that the complete intelligence pipeline has successfully executed.

Persistence and federation are verified as part of the subsequent operational harvest.

---

## 7. MS-005 Acceptance Conditions

MS-005 may be considered operationally established when all of the following are demonstrated:

- [ ] Operational Service Host is initialised.
- [ ] Operational Service Host is running.
- [ ] Operational Service Host reports healthy.
- [ ] Harvester is registered with the Operational Service Host.
- [ ] Harvester registration identifies `Start-JDHarvester`.
- [ ] Harvester registration identifies `Stop-JDHarvester`.
- [ ] Harvester registration identifies `Restart-JDHarvester`.
- [ ] Harvester registration identifies `Get-JDHarvesterStatus`.
- [ ] Harvester registration identifies `Get-JDHarvesterHealth`.
- [ ] Harvester registration identifies `Get-JDHarvesterMetrics`.
- [ ] Harvester runtime reports initialised.
- [ ] Harvester runtime reports running.
- [ ] Harvester runtime reports healthy.
- [ ] Harvester heartbeat is operational.
- [ ] Source/collection boundary is explicitly identified.
- [ ] Persistence boundary is identified.
- [ ] Federation boundary is identified.
- [ ] No uncontrolled real collection is treated as part of MS-005.

---

## 8. Evidence Required

MS-005 acceptance shall be supported by runtime evidence rather than by source-code presence alone.

Required evidence includes:

### Operational Host

    Get-JDOperationalHostStatus

demonstrating:

    Running      : True
    Initialised  : True
    Health       : HEALTHY

### Harvester Registration

    Get-JDHostRegisteredService -Name "Harvester"

demonstrating the required lifecycle and observability command contract.

### Harvester Runtime

    Get-JDHarvesterStatus

demonstrating:

    Running     : True
    Initialised : True
    Health      : HEALTHY

### Harvester Health

    Get-JDHarvesterHealth

demonstrating:

    Running     : True
    Initialised : True
    Health      : HEALTHY

---

## 9. Current Engineering Evidence

PR-001 established the Harvester registration contract.

Repository checkpoint:

    38e0157
    PR-001: complete Harvester registration contract

The post-PR-001 runtime verification demonstrated:

    Operational Service Host
    Running          : True
    Initialised      : True
    Health           : HEALTHY
    SchedulerRunning : True

and:

    Harvester
    Running     : True
    Initialised : True
    Health      : HEALTHY

The live Host registration demonstrated:

    Name            : Harvester
    StartupCommand  : Start-JDHarvester
    StopCommand     : Stop-JDHarvester
    RestartCommand  : Restart-JDHarvester
    StatusCommand   : Get-JDHarvesterStatus
    HealthCommand   : Get-JDHarvesterHealth
    MetricsCommand  : Get-JDHarvesterMetrics

These observations constitute implementation evidence for the corresponding MS-005 operational conditions.

---

## 10. Transition to MS-006

Once MS-005 acceptance conditions have been demonstrated, the programme may proceed to MS-006.

MS-006 is defined by the existing programme baseline as:

    PR-018A Operational Assessment
    PR-018B Harvester Commissioning
    PR-019A Source Discovery
    PR-019B Harvest Execution
    PR-019C Result Normalisation
    PR-019D Persistence
    PR-019E Federation

The first controlled real harvest therefore belongs to MS-006 rather than MS-005.

---

## 11. Non-Goals

MS-005 does not:

- Claim that a real harvest has completed.
- Claim that source intelligence has been successfully collected.
- Claim that persistence has successfully occurred.
- Claim that federation has successfully occurred.
- Replace MS-006.
- Author uncontrolled production collection.
- Introduce new Harvester architecture.
- Replace the Operational Service Host.
- Replace the Operational Registry.
- Replace the existing Harvester runtime.

---

## 12. Milestone Boundary

The MS-005 boundary is:

    FOUNDATION
        ↓
    OPERATIONAL HOST
        ↓
    HARVESTER REGISTERED
        ↓
    HARVESTER RUNNING
        ↓
    HARVESTER HEALTHY
        ↓
    SOURCE / COLLECTION GATE ESTABLISHED
        ↓
    ========================
    MS-005 OPERATIONAL BASELINE
    ========================
        ↓
    CONTROLLED COMMISSIONING
        ↓
    SOURCE DISCOVERY
        ↓
    REAL HARVEST
        ↓
    NORMALISATION
        ↓
    PERSISTENCE
        ↓
    FEDERATION
        ↓
    ========================
    MS-006 FIRST OPERATIONAL HARVEST
    ========================

---

## 13. Acceptance Authority

MS-005 establishes the operational readiness gate for the Harvester.

Acceptance of MS-005 shall require evidence that the conditions defined in this document have been demonstrated.

MS-005 acceptance shall not be inferred from a contradictory milestone register entry or from the existence of Harvester implementation code.

The operational evidence is the acceptance basis.

---

## 14. Status

**Status:** Baseline Established — Pending Formal Acceptance Evidence

**Next Programme Action:**

Perform the MS-005 acceptance verification against the live Operational Service Host and Harvester runtime.

Following successful acceptance, proceed to the controlled MS-006 commissioning and first operational harvest sequence.

---

# End of MS-005