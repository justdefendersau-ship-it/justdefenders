\# JustDefenders ┬⌐



\# MS-006 ΓÇö Controlled Source / Collection Gate



\*\*Programme:\*\* JustDefenders Product Platform

\*\*Milestone:\*\* MS-006 ΓÇö First Operational Harvest Executed

\*\*Gate:\*\* Controlled Source / Collection Gate

\*\*Predecessor:\*\* MS-005 ΓÇö Harvester Operational Baseline

\*\*Timestamp:\*\* 14 August 2026



\---



\## 1. Purpose



This artefact establishes the controlled source and collection gate required before the first real JustDefenders Harvester execution.



MS-005 established that the Operational Service Host and Harvester are operationally ready.



MS-006 now establishes the boundary between:



&#x20;   OPERATIONAL READINESS



and:



&#x20;   AUTHORISED REAL COLLECTION



The Harvester shall not perform uncontrolled production collection.



The first real harvest shall occur only after this gate has been satisfied.



\---



\## 2. Programme Position



The authoritative operational sequence is:



&#x20;   MS-004

&#x20;       Foundation Engineering Baseline

&#x20;           Γåô

&#x20;   PR-001

&#x20;       Harvester Registration Contract

&#x20;           Γåô

&#x20;   MS-005

&#x20;       Harvester Operational Baseline

&#x20;           Γåô

&#x20;   MS-006

&#x20;       Controlled Source / Collection Gate

&#x20;           Γåô

&#x20;   PR-018A

&#x20;       Operational Assessment

&#x20;           Γåô

&#x20;   PR-018B

&#x20;       Harvester Commissioning

&#x20;           Γåô

&#x20;   PR-019A

&#x20;       Source Discovery

&#x20;           Γåô

&#x20;   PR-019B

&#x20;       Harvest Execution

&#x20;           Γåô

&#x20;   PR-019C

&#x20;       Result Normalisation

&#x20;           Γåô

&#x20;   PR-019D

&#x20;       Persistence

&#x20;           Γåô

&#x20;   PR-019E

&#x20;       Federation

&#x20;           Γåô

&#x20;   First Operational Harvest Baseline



\---



\## 3. MS-005 Entry Condition



MS-005 acceptance has established the operational Harvester baseline.



The accepted operational evidence includes:



\- Operational Service Host initialised.

\- Operational Service Host running.

\- Operational Service Host healthy.

\- Harvester registered.

\- Harvester lifecycle contract available.

\- Harvester status contract available.

\- Harvester health contract available.

\- Harvester metrics contract available.

\- Harvester runtime initialised.

\- Harvester runtime running.

\- Harvester runtime healthy.

\- Harvester heartbeat available.



MS-006 does not repeat those checks.



MS-006 consumes the accepted MS-005 operational baseline.



\---



\## 4. Controlled Collection Principle



The Harvester shall distinguish between:



&#x20;   Runtime readiness



and:



&#x20;   Collection authorisation.



A healthy and running Harvester is not, by itself, permission to collect external intelligence.



Collection authorisation requires an explicit source and collection definition.



\---



\## 5. Authorised Source Definition



Before PR-019B Harvest Execution begins, an authorised source record shall exist.



The source record shall contain, at minimum:



&#x20;   Source Name

&#x20;   Source Identifier

&#x20;   Source Type

&#x20;   Source Location

&#x20;   Collection Method

&#x20;   Authorisation Status

&#x20;   Collection Scope

&#x20;   Collection Restrictions

&#x20;   Expected Result Type



The source shall be explicitly identified.



No source shall be inferred merely from the existence of Harvester source adapters, source configuration, or runtime capability.



\---



\## 6. Source Discovery Boundary



PR-019A ΓÇö Source Discovery is responsible for identifying candidate collection sources.



Source discovery shall not automatically authorise collection.



The discovery result shall distinguish:



&#x20;   Candidate Source



from:



&#x20;   Authorised Source



Only an explicitly authorised source may proceed to PR-019B Harvest Execution.



\---



\## 7. Source Authorisation Gate



The following conditions shall be satisfied before real collection:



\- \[ ] Source has been identified.

\- \[ ] Source identifier has been recorded.

\- \[ ] Source type has been recorded.

\- \[ ] Source location has been recorded.

\- \[ ] Collection method has been identified.

\- \[ ] Collection scope has been defined.

\- \[ ] Collection restrictions have been defined.

\- \[ ] Source has been explicitly authorised for controlled collection.

\- \[ ] Source authorisation is recorded before execution.

\- \[ ] The collection is limited to the authorised scope.



If any condition is incomplete, real collection shall not begin.



\---



\## 8. Collection Mode



The first real harvest shall be performed as a controlled collection.



The initial collection shall favour:



&#x20;   Small scope

&#x20;   Observable execution

&#x20;   Deterministic boundaries

&#x20;   Limited result volume

&#x20;   Clear failure reporting

&#x20;   Reproducible execution



The first harvest shall not be treated as an unrestricted production crawl.



\---



\## 9. Collection Execution Boundary



The controlled execution sequence is:



&#x20;   Authorised Source

&#x20;         Γåô

&#x20;   Collection Invocation

&#x20;         Γåô

&#x20;   Raw Result Acquisition

&#x20;         Γåô

&#x20;   Result Normalisation

&#x20;         Γåô

&#x20;   Persistence

&#x20;         Γåô

&#x20;   Federation



Each stage shall remain observable.



Failure at one stage shall not be represented as successful completion of the complete pipeline.



\---



\## 10. Raw Collection Boundary



PR-019B ΓÇö Harvest Execution shall establish whether raw source material was successfully acquired.



The execution record shall provide sufficient information to determine:



\- Source contacted.

\- Collection attempted.

\- Collection completed or failed.

\- Number of results discovered.

\- Number of results accepted for processing.

\- Number of results rejected.

\- Collection errors.



A running Harvester with zero discovered results shall not automatically be interpreted as successful intelligence collection.



\---



\## 11. Normalisation Boundary



PR-019C ΓÇö Result Normalisation shall establish the transition from source-specific material to the JustDefenders canonical result representation.



Normalisation shall occur after collection.



The normalisation boundary shall preserve the distinction between:



&#x20;   Raw Source Result



and:



&#x20;   Canonical Intelligence Result



The first operational harvest shall provide evidence of this transition.



\---



\## 12. Persistence Boundary



PR-019D ΓÇö Persistence shall establish whether normalised results were successfully written to the authorised persistence surface.



Persistence evidence shall distinguish:



&#x20;   Discovered

&#x20;   Processed

&#x20;   Inserted

&#x20;   Updated

&#x20;   Duplicate

&#x20;   Failed



The existence of discovered source material shall not be treated as persistence success.



\---



\## 13. Federation Boundary



PR-019E ΓÇö Federation shall establish whether persisted intelligence was successfully exposed to the authorised downstream intelligence surface.



Federation shall occur only after successful normalisation and persistence of the applicable result.



Federation shall not be inferred from persistence alone.



\---



\## 14. First Harvest Scope



The first operational harvest shall be intentionally constrained.



The initial execution shall establish:



\- One explicitly authorised collection surface.

\- A defined collection scope.

\- A controlled execution.

\- A bounded result set.

\- Observable collection metrics.

\- Normalisation evidence.

\- Persistence evidence.

\- Federation evidence.



Expansion of source count or collection scope shall occur only after the first controlled execution has been evaluated.



\---



\## 15. Prohibited Actions Before Gate Completion



The following actions are prohibited before this gate is satisfied:



\- Starting unrestricted external collection.

\- Crawling unspecified sources.

\- Treating discovered sources as authorised sources.

\- Expanding collection scope without authority.

\- Treating a healthy runtime as collection authorisation.

\- Declaring a zero-result execution to be a successful intelligence harvest.

\- Declaring persistence success without persistence evidence.

\- Declaring federation success without federation evidence.



\---



\## 16. Gate Acceptance Conditions



The MS-006 Controlled Source / Collection Gate is accepted only when:



\- \[ ] MS-005 operational baseline has been accepted.

\- \[ ] Candidate source discovery has been performed.

\- \[ ] One collection source has been explicitly selected.

\- \[ ] Source identity has been recorded.

\- \[ ] Source location has been recorded.

\- \[ ] Collection method has been recorded.

\- \[ ] Collection scope has been defined.

\- \[ ] Collection restrictions have been defined.

\- \[ ] Source has been explicitly authorised.

\- \[ ] First collection is bounded.

\- \[ ] First collection is observable.

\- \[ ] Normalisation boundary is defined.

\- \[ ] Persistence boundary is defined.

\- \[ ] Federation boundary is defined.

\- \[ ] No unrestricted collection is authorised by this gate.



\---



\## 17. Gate Evidence



The following evidence shall be retained for the gate:



\### Operational Baseline



MS-005 acceptance evidence demonstrating:



&#x20;   Operational Service Host

&#x20;   Running      : True

&#x20;   Initialised  : True

&#x20;   Health       : HEALTHY



and:



&#x20;   Harvester

&#x20;   Running      : True

&#x20;   Initialised  : True

&#x20;   Health       : HEALTHY



\### Source Definition



A recorded source definition containing:



&#x20;   Source Name

&#x20;   Source Identifier

&#x20;   Source Type

&#x20;   Source Location

&#x20;   Collection Method

&#x20;   Collection Scope

&#x20;   Collection Restrictions

&#x20;   Authorisation Status



\### Execution Boundary



A recorded statement defining the intended first collection scope.



\### Downstream Boundaries



Recorded definitions for:



&#x20;   Normalisation

&#x20;   Persistence

&#x20;   Federation



\---



\## 18. Gate Status



\*\*Current Status:\*\*



&#x20;   MS-005 OPERATIONAL BASELINE

&#x20;   ACCEPTED BY LIVE VERIFICATION



&#x20;   MS-006 SOURCE / COLLECTION GATE

&#x20;   ESTABLISHED ΓÇö SOURCE AUTHORISATION PENDING



This status deliberately does not authorise a harvest yet.



The remaining prerequisite is the explicit identification and authorisation of the first collection source.



\---



\## 19. Transition to Harvest Execution



Once the source authorisation conditions have been satisfied, the programme may proceed to:



&#x20;   PR-019B ΓÇö Harvest Execution



The first execution shall be controlled and observable.



The first execution shall not expand beyond the authorised source and scope.



The execution result shall then proceed through:



&#x20;   PR-019C ΓÇö Result Normalisation



&#x20;   PR-019D ΓÇö Persistence



&#x20;   PR-019E ΓÇö Federation



The resulting evidence shall form the basis for the MS-006 first operational harvest assessment.



\---



\## 20. Completion Rule



This gate is complete when a specific source has been identified, explicitly authorised, bounded, and prepared for controlled collection.



This gate does not itself constitute a harvest.



The first real harvest occurs only after this gate has been accepted.



\---



\# End of MS-006 Controlled Source / Collection Gate
---

## MS-006 ENGINEERING COMPLETION RECORD

**Timestamp:** 17th August 2026, 19:44 Sydney

### Lifecycle correction

The authorised Harvester lifecycle boundary was corrected so that the existing
`Start-JDHarvester` lifecycle performs:

1. Runtime state initialisation;
2. authorised MS-006 source registration;
3. authorised source configuration;
4. Runtime start.

Registration and configuration remain existing operations. No new registration
mechanism was introduced.

### Authorised source set

The reconciled MS-006 source authority is:

- `repco`
- `burson`
- `lrdirect`

`jlrclassic` remains unauthorised.

### Controlled discovery result

A single controlled Phase 7 discovery operation was executed against the
established source registry.

The discovery result contained:

- 3 configured sources;
- 12 discovery candidates;
- 3 source-result records.

The sole configured/root candidate was:

`https://www.burson.com.au/`

with root path `/`.

The result does not establish a product/parts-specific collection surface.

### Supplier HTTP result

The controlled discovery result recorded:

- `burson` ΓÇö HTTP 200;
- `repco` ΓÇö HTTP 403;
- `lrdirect` ΓÇö HTTP 403.

The HTTP 403 results are recorded as supplier HTTP access/response findings
only. They do not authorise collection or harvesting.

### Current execution boundary

Collection remains NOT EXECUTED.

Harvesting remains NOT EXECUTED.

Production harvesting remains NOT AUTHORISED.

A separately authorised supplier/product discovery implementation is required
before downstream collection becomes an engineering execution boundary.

### Checkpoint boundary

Unrelated working-tree changes are not part of the MS-006 checkpoint.