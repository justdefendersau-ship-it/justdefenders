\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# MS-006 — END-TO-END CONTROLLED HARVEST ACCEPTANCE

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\#

\# Execution Chain:

\#

\#   PR-018A — Operational Assessment

\#   PR-018B — Harvester Commissioning

\#   PR-019A — Source Discovery

\#   PR-019B — Harvest Execution

\#   PR-019C — Result Normalisation

\#   PR-019D — Persistence

\#   PR-019E — Federation

\#

\# Authority  : MS-006 Operational Intelligence Baseline

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



This procedure is the controlled end-to-end acceptance gate for MS-006.



It exists to demonstrate that the JustDefenders Harvester has transitioned from

registered operational infrastructure into a functioning intelligence-producing

pipeline.



The acceptance target is:



&#x20;   REAL SOURCE

&#x20;       |

&#x20;       v

&#x20;   SOURCE DISCOVERY

&#x20;       |

&#x20;       v

&#x20;   REAL ACQUISITION

&#x20;       |

&#x20;       v

&#x20;   RESULT NORMALISATION

&#x20;       |

&#x20;       v

&#x20;   DURABLE PERSISTENCE

&#x20;       |

&#x20;       v

&#x20;   FEDERATION

&#x20;       |

&#x20;       v

&#x20;   JUSTDEFENDERS INTELLIGENCE



This procedure is an execution and acceptance procedure.



It is not an architecture exercise.



It is not a source-discovery documentation exercise.



It is not a synthetic-data validation exercise.



\---



\# 2. ACCEPTANCE PRINCIPLE



MS-006 shall only be accepted when the complete operational path has been

demonstrated using genuine source material.



The following sequence must be evidenced:



&#x20;   Source identified

&#x20;         |

&#x20;         v

&#x20;   Source accessed

&#x20;         |

&#x20;         v

&#x20;   Material acquired

&#x20;         |

&#x20;         v

&#x20;   Material normalised

&#x20;         |

&#x20;         v

&#x20;   Intelligence persisted

&#x20;         |

&#x20;         v

&#x20;   Intelligence federated

&#x20;         |

&#x20;         v

&#x20;   Platform representation available



A green runtime status alone is insufficient evidence.



A successful HTTP request alone is insufficient evidence.



A populated test fixture alone is insufficient evidence.



A synthetic record alone is insufficient evidence.



\---



\# 3. PRECONDITIONS



Before executing this procedure, the following conditions shall already be true:



1\. PR-001 checkpoint is committed.

2\. Operational Service Host is operational.

3\. Harvester is registered.

4\. Harvester is enabled.

5\. Harvester runtime is operational.

6\. PR-018A artefact exists.

7\. PR-018B artefact exists.

8\. PR-019A artefact exists.

9\. PR-019B artefact exists.

10\. PR-019C artefact exists.

11\. PR-019D artefact exists.

12\. PR-019E artefact exists.

13\. The Harvester source/collection implementation is present.

14\. The authorised persistence boundary is available.

15\. The authorised federation boundary is available.



If a precondition is not satisfied, stop and report the specific missing

precondition.



Do not compensate by inventing evidence.



\---



\# 4. CONTROLLED EXECUTION MODE



The first acceptance execution shall be controlled.



The objective is to prove the pipeline, not to maximise harvest volume.



The first successful run should therefore use:



&#x20;   a bounded execution

&#x20;   a known valid source

&#x20;   a controlled result volume

&#x20;   normal runtime execution

&#x20;   normal source discovery / source selection

&#x20;   normal collection

&#x20;   normal normalisation

&#x20;   normal persistence

&#x20;   normal federation



Do not begin by attempting an unrestricted crawl of the entire discovered source

universe.



The first run proves the pipeline.



Subsequent runs can expand collection scope.



\---



\# 5. SOURCE SELECTION



The execution shall begin from the existing Harvester source-discovery and

source-configuration implementation.



A source may be:



\- an already configured authorised source;

\- a source discovered through the Harvester's discovery capability;

\- a source returned by the established source-discovery mechanism.



The acceptance run must use a genuine external source.



Do not substitute a synthetic URL or test fixture for the first real pipeline

demonstration.



\---



\# 6. SOURCE DISCOVERY EVIDENCE



Capture the following information for the selected source where available:



&#x20;   sourceId

&#x20;   sourceName

&#x20;   sourceUrl

&#x20;   discoveryMethod

&#x20;   parentSource

&#x20;   adapter

&#x20;   discoveryTimestamp



The evidence must establish that the source entered the Harvester through the

authorised source-discovery / source-selection boundary.



If the source was already configured, record that fact explicitly.



If the source was discovered dynamically, record that fact explicitly.



\---



\# 7. HARVEST EXECUTION



Start the Harvester through its existing managed-service execution path.



Do not bypass the Operational Service Host merely to make the acceptance run

easier.



The execution must use the existing Harvester runtime.



Capture:



&#x20;   runtime state

&#x20;   execution start time

&#x20;   source selected

&#x20;   collection start

&#x20;   collection completion

&#x20;   result count

&#x20;   errors

&#x20;   heartbeat



The Harvester must remain operational throughout the controlled execution.



\---



\# 8. REAL ACQUISITION



The controlled run must acquire genuine material from the selected source.



Evidence should establish:



&#x20;   source URL

&#x20;   request / acquisition event

&#x20;   response status where available

&#x20;   content type where available

&#x20;   acquisition timestamp

&#x20;   acquired result count



A successful connection without useful acquired material does not satisfy the

real acquisition requirement.



\---



\# 9. RAW RESULT EVIDENCE



At least one genuine acquired result must be traceable through the pipeline.



The selected result should have a traceable relationship to:



&#x20;   source

&#x20;   source URL

&#x20;   acquisition event

&#x20;   collection time



The result does not need to represent every possible source content type.



One valid real result is sufficient for the first controlled end-to-end proof,

provided the complete downstream path succeeds.



\---



\# 10. RESULT NORMALISATION



The acquired result shall pass through PR-019C.



The execution must demonstrate:



&#x20;   raw result

&#x20;       |

&#x20;       v

&#x20;   classification

&#x20;       |

&#x20;       v

&#x20;   extraction

&#x20;       |

&#x20;       v

&#x20;   normalisation

&#x20;       |

&#x20;       v

&#x20;   normalised result



Capture:



&#x20;   normalisation status

&#x20;   result type

&#x20;   source identity

&#x20;   source URL

&#x20;   normalised fields

&#x20;   normalisation timestamp



At least one result must achieve:



&#x20;   NORMALISED



A collection result that never reaches normalisation does not satisfy MS-006.



\---



\# 11. NORMALISATION INTEGRITY



The accepted normalised result must preserve:



\- source identity;

\- source URL;

\- provenance;

\- collection context;

\- substantive source information.



The normalisation process must not introduce fabricated:



\- suppliers;

\- part numbers;

\- prices;

\- availability;

\- technical claims;

\- product identities.



Missing source information must remain missing or explicitly unknown.



\---



\# 12. PERSISTENCE



The normalised result shall pass through PR-019D.



At least one result must achieve a durable persistence outcome:



&#x20;   INSERTED



or, where the same genuine record has already been persisted during an earlier

controlled execution:



&#x20;   UPDATED

&#x20;   UNCHANGED



The persistence evidence must establish that the result exists in the authorised

durable storage boundary.



An in-memory object does not satisfy persistence.



A runtime counter does not satisfy persistence.



A log message alone does not satisfy persistence.



\---



\# 13. PERSISTENCE EVIDENCE



Capture, where available:



&#x20;   platformRecordId

&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   harvestBatchId

&#x20;   persistenceStatus

&#x20;   persistenceTimestamp



The persisted record must remain traceable to the normalised result.



The evidence chain must not terminate at the persistence function call.



\---



\# 14. FEDERATION



The durable record shall pass through PR-019E.



At least one genuine persisted record must achieve:



&#x20;   FEDERATED



or, where the record was already successfully federated:



&#x20;   UPDATED

&#x20;   UNCHANGED



The federation result must be observable through the authorised platform

intelligence boundary.



\---



\# 15. FEDERATION EVIDENCE



Capture, where available:



&#x20;   platformRecordId

&#x20;   federationStatus

&#x20;   federationTimestamp

&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   destination / intelligence surface



The federated representation must remain attributable to the original source.



\---



\# 16. END-TO-END TRACE



At least one genuine record shall be traceable through the complete chain:



&#x20;   SOURCE

&#x20;      |

&#x20;      v

&#x20;   DISCOVERY / SELECTION

&#x20;      |

&#x20;      v

&#x20;   ACQUISITION

&#x20;      |

&#x20;      v

&#x20;   RAW RESULT

&#x20;      |

&#x20;      v

&#x20;   NORMALISATION

&#x20;      |

&#x20;      v

&#x20;   PERSISTENCE

&#x20;      |

&#x20;      v

&#x20;   FEDERATION

&#x20;      |

&#x20;      v

&#x20;   PLATFORM INTELLIGENCE



The record need not have the same physical representation at every stage.



Its identity and provenance must remain traceable.



\---



\# 17. MINIMUM ACCEPTANCE RECORD



The first successful MS-006 execution must produce at least one genuine record

for which the following can be demonstrated:



&#x20;   Source identified                  = YES

&#x20;   Real material acquired            = YES

&#x20;   Raw result observed               = YES

&#x20;   Result normalised                 = YES

&#x20;   Durable persistence confirmed     = YES

&#x20;   Federation confirmed              = YES

&#x20;   Platform representation observed  = YES

&#x20;   Source provenance preserved       = YES



All eight conditions are mandatory.



\---



\# 18. MULTI-SOURCE EXPECTATION



MS-006 is not limited to one permanent source.



The Harvester is expected to support multiple sources and continued source

discovery.



However, the first controlled acceptance does not require unrestricted harvesting

of every known source.



The first objective is to establish the functioning pipeline.



Once the pipeline is proven, additional sources may be exercised through subsequent

controlled runs.



\---



\# 19. ACTIVE SOURCE DISCOVERY



The Harvester shall remain capable of continuing source discovery beyond the

initial controlled source.



The acceptance run must not disable or permanently remove the source-discovery

capability merely to obtain a clean demonstration.



The controlled run may bound discovery volume or execution duration.



The underlying discovery capability remains part of the operational Harvester.



\---



\# 20. COLLECTION BOUNDARY



The first acceptance run shall operate within the authorised source and collection

boundary established by MS-006.



It shall not:



\- crawl arbitrary unrelated infrastructure;

\- bypass source controls;

\- bypass configured collection limits;

\- disable safety controls;

\- create unrestricted external traffic merely to increase result counts.



The goal is operational proof, not maximum crawling.



\---



\# 21. FAILURE HANDLING



A failure shall be classified at the stage where it occurs.



Permitted failure stages include:



&#x20;   SOURCE\_DISCOVERY

&#x20;   ACQUISITION

&#x20;   NORMALISATION

&#x20;   PERSISTENCE

&#x20;   FEDERATION



If a failure occurs, record:



&#x20;   stage

&#x20;   timestamp

&#x20;   source

&#x20;   operation

&#x20;   error

&#x20;   affected result

&#x20;   recovery state



Do not report MS-006 as failed without identifying the actual failed boundary.



\---



\# 22. PARTIAL FAILURE



One bad source result must not automatically invalidate the complete Harvester

runtime.



For example:



&#x20;   Result A -> NORMALISED -> PERSISTED -> FEDERATED

&#x20;   Result B -> REJECTED

&#x20;   Result C -> NORMALISED -> PERSISTED -> FEDERATED



This may still satisfy the end-to-end acceptance if the required genuine record

has completed the full path.



A total failure of the pipeline does not.



\---



\# 23. SYNTHETIC DATA EXCLUSION



Synthetic, demo, fixture, placeholder, or manually fabricated records shall not

be counted as MS-006 end-to-end evidence.



If test data exists in the environment, it must be distinguishable from the real

harvest output.



The acceptance evidence must identify which record originated from the genuine

external source.



\---



\# 24. EXISTING RECORD HANDLING



If the selected source result already exists in durable storage, the first

controlled execution may legitimately produce:



&#x20;   UNCHANGED



rather than:



&#x20;   INSERTED



This is acceptable only when the existing record is itself genuine and its source

provenance can be demonstrated.



Do not delete genuine existing intelligence merely to force an `INSERTED` result.



\---



\# 25. RUNTIME HEALTH



At the conclusion of the controlled execution verify:



&#x20;   Operational Service Host = RUNNING

&#x20;   Operational Service Host = HEALTHY

&#x20;   Harvester                = RUNNING

&#x20;   Harvester                = HEALTHY



Where scheduler state is exposed, verify that the scheduler remains operational.



The controlled harvest must not leave the managed-service architecture degraded.



\---



\# 26. POST-RUN EVIDENCE



Capture the final runtime state:



&#x20;   host status

&#x20;   Harvester status

&#x20;   health

&#x20;   last run

&#x20;   last heartbeat

&#x20;   crawl count

&#x20;   documents processed

&#x20;   documents inserted

&#x20;   failed documents

&#x20;   persistence metrics

&#x20;   federation metrics



Use the actual runtime values.



Do not manually substitute expected values.



\---



\# 27. PROVENANCE VERIFICATION



For the accepted end-to-end record, verify:



&#x20;   original source

&#x20;         |

&#x20;         v

&#x20;   collection record

&#x20;         |

&#x20;         v

&#x20;   normalised record

&#x20;         |

&#x20;         v

&#x20;   persisted record

&#x20;         |

&#x20;         v

&#x20;   federated record



The source URL or equivalent source identity must remain recoverable.



If provenance is lost at any stage, MS-006 is not accepted.



\---



\# 28. DATA INTEGRITY VERIFICATION



Verify that the federated record contains information that can be reconciled

with the original source material.



At minimum, verify:



\- source identity;

\- source URL;

\- substantive content or extracted information;

\- collection timestamp or equivalent provenance;

\- platform record identity.



Do not require every source field to survive unchanged.



Do require the resulting intelligence to remain attributable and materially

consistent with the source evidence.



\---



\# 29. NO-FABRICATION VERIFICATION



Inspect at least one accepted federated record against its source evidence.



Confirm that no unsupported values were introduced for:



&#x20;   supplier

&#x20;   product

&#x20;   part number

&#x20;   price

&#x20;   availability

&#x20;   technical information



Where a value was not present in the source, the value must not be presented as

source-derived without an explicit downstream derivation rule.



\---



\# 30. ACCEPTANCE TEST MATRIX



The following conditions must be recorded:



| Test | Requirement | Result |

|---|---|---|

| MS6-01 | Operational Service Host running | PASS / FAIL |

| MS6-02 | Harvester registered | PASS / FAIL |

| MS6-03 | Harvester healthy | PASS / FAIL |

| MS6-04 | Genuine source identified | PASS / FAIL |

| MS6-05 | Genuine source material acquired | PASS / FAIL |

| MS6-06 | Raw result observed | PASS / FAIL |

| MS6-07 | Result normalised | PASS / FAIL |

| MS6-08 | Provenance retained after normalisation | PASS / FAIL |

| MS6-09 | Result durably persisted | PASS / FAIL |

| MS6-10 | Persistence identity retained | PASS / FAIL |

| MS6-11 | Result federated | PASS / FAIL |

| MS6-12 | Federated representation available | PASS / FAIL |

| MS6-13 | Provenance retained after federation | PASS / FAIL |

| MS6-14 | No synthetic intelligence counted | PASS / FAIL |

| MS6-15 | Runtime healthy after execution | PASS / FAIL |

| MS6-16 | End-to-end trace complete | PASS / FAIL |



All mandatory tests must pass.



\---



\# 31. ACCEPTANCE THRESHOLD



MS-006 shall be considered accepted only when:



&#x20;   MS6-01 = PASS

&#x20;   MS6-02 = PASS

&#x20;   MS6-03 = PASS

&#x20;   MS6-04 = PASS

&#x20;   MS6-05 = PASS

&#x20;   MS6-06 = PASS

&#x20;   MS6-07 = PASS

&#x20;   MS6-08 = PASS

&#x20;   MS6-09 = PASS

&#x20;   MS6-10 = PASS

&#x20;   MS6-11 = PASS

&#x20;   MS6-12 = PASS

&#x20;   MS6-13 = PASS

&#x20;   MS6-14 = PASS

&#x20;   MS6-15 = PASS

&#x20;   MS6-16 = PASS



No individual mandatory test may be waived merely because another stage succeeds.



\---



\# 32. ACCEPTANCE EVIDENCE PACKAGE



The execution evidence should contain:



1\. execution timestamp;

2\. repository / branch identity;

3\. source identity;

4\. source URL;

5\. discovery / selection evidence;

6\. acquisition evidence;

7\. raw result evidence;

8\. normalisation evidence;

9\. persistence evidence;

10\. federation evidence;

11\. final runtime status;

12\. accepted record identity;

13\. provenance chain;

14\. acceptance matrix.



The evidence should be concise.



Do not generate unnecessary bulk data.



The objective is proof of the pipeline, not an archive of every harvested document.



\---



\# 33. CONTROLLED RUN SIZE



For the first acceptance run:



&#x20;   Prefer a small bounded result set.



The run should be large enough to demonstrate genuine processing but small enough

that the resulting evidence can be inspected manually.



A successful controlled run may be followed by broader collection.



The first run does not need to maximise:



&#x20;   crawl count

&#x20;   source count

&#x20;   document count

&#x20;   queue depth



Pipeline integrity is more important than volume.



\---



\# 34. ACCEPTANCE EXECUTION ORDER



Execute in this order:



&#x20;   STEP 1

&#x20;   Verify repository / runtime baseline



&#x20;       ↓



&#x20;   STEP 2

&#x20;   Verify Operational Service Host



&#x20;       ↓



&#x20;   STEP 3

&#x20;   Verify Harvester registration and health



&#x20;       ↓



&#x20;   STEP 4

&#x20;   Execute controlled source discovery / selection



&#x20;       ↓



&#x20;   STEP 5

&#x20;   Execute genuine source acquisition



&#x20;       ↓



&#x20;   STEP 6

&#x20;   Confirm raw result



&#x20;       ↓



&#x20;   STEP 7

&#x20;   Confirm PR-019C normalisation



&#x20;       ↓



&#x20;   STEP 8

&#x20;   Confirm PR-019D durable persistence



&#x20;       ↓



&#x20;   STEP 9

&#x20;   Confirm PR-019E federation



&#x20;       ↓



&#x20;   STEP 10

&#x20;   Trace one genuine record end-to-end



&#x20;       ↓



&#x20;   STEP 11

&#x20;   Verify final runtime health



&#x20;       ↓



&#x20;   STEP 12

&#x20;   Complete acceptance matrix



&#x20;       ↓



&#x20;   STEP 13

&#x20;   Declare MS-006 PASS or FAIL



\---



\# 35. STOP CONDITIONS



Stop the acceptance execution if:



\- the Harvester cannot start;

\- the source boundary cannot be established;

\- the source is inaccessible for reasons requiring engineering intervention;

\- raw material cannot be acquired;

\- normalisation cannot process an eligible result;

\- durable persistence cannot be confirmed;

\- federation cannot be confirmed;

\- provenance is lost;

\- synthetic data would need to be substituted;

\- the runtime enters an unsafe or uncontrolled state.



When stopping, report the exact stage and evidence.



Do not continue by bypassing the failed boundary.



\---



\# 36. PASS CONDITION



MS-006 PASS requires demonstration of:



&#x20;   REAL SOURCE

&#x20;       +

&#x20;   REAL ACQUISITION

&#x20;       +

&#x20;   REAL NORMALISATION

&#x20;       +

&#x20;   REAL PERSISTENCE

&#x20;       +

&#x20;   REAL FEDERATION

&#x20;       +

&#x20;   PROVENANCE PRESERVATION

&#x20;       +

&#x20;   HEALTHY RUNTIME



All are required.



\---



\# 37. FAIL CONDITION



MS-006 FAIL shall be declared when any mandatory stage cannot be demonstrated

using genuine source material.



A failure is not evidence that the overall architecture is wrong.



It identifies the exact operational boundary requiring engineering correction.



No unrelated architecture should be redesigned solely because one acceptance

stage fails.



\---



\# 38. ACCEPTANCE RECORD



After execution, complete:



&#x20;   MS-006 EXECUTION DATE:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   EXECUTION START:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   EXECUTION END:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   BRANCH:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   COMMIT:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   SOURCE:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   SOURCE URL:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   DISCOVERY METHOD:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   HARVEST BATCH:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   ACCEPTED PLATFORM RECORD:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   PERSISTENCE OUTCOME:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   FEDERATION OUTCOME:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   FINAL HARVESTER HEALTH:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



&#x20;   FINAL HOST HEALTH:

&#x20;   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



\---



\# 39. FINAL ACCEPTANCE MATRIX



Complete the following after the controlled execution:



&#x20;   MS6-01  Operational Service Host             \[ PASS / FAIL ]

&#x20;   MS6-02  Harvester registration                \[ PASS / FAIL ]

&#x20;   MS6-03  Harvester health                     \[ PASS / FAIL ]

&#x20;   MS6-04  Genuine source                       \[ PASS / FAIL ]

&#x20;   MS6-05  Genuine acquisition                  \[ PASS / FAIL ]

&#x20;   MS6-06  Raw result                           \[ PASS / FAIL ]

&#x20;   MS6-07  Normalisation                        \[ PASS / FAIL ]

&#x20;   MS6-08  Normalisation provenance             \[ PASS / FAIL ]

&#x20;   MS6-09  Durable persistence                  \[ PASS / FAIL ]

&#x20;   MS6-10  Persistence identity                 \[ PASS / FAIL ]

&#x20;   MS6-11  Federation                           \[ PASS / FAIL ]

&#x20;   MS6-12  Federated representation             \[ PASS / FAIL ]

&#x20;   MS6-13  Federation provenance                \[ PASS / FAIL ]

&#x20;   MS6-14  No synthetic intelligence            \[ PASS / FAIL ]

&#x20;   MS6-15  Final runtime health                 \[ PASS / FAIL ]

&#x20;   MS6-16  End-to-end trace                     \[ PASS / FAIL ]



\---



\# 40. MS-006 DECLARATION



If all mandatory acceptance conditions pass:



&#x20;   MS-006 STATUS:



&#x20;   OPERATIONAL INTELLIGENCE BASELINE ACHIEVED



If one or more mandatory acceptance conditions fail:



&#x20;   MS-006 STATUS:



&#x20;   NOT YET ACCEPTED



The failed stage shall be identified explicitly.



\---



\# 41. PROGRAMME TRANSITION



On MS-006 PASS, the Harvester moves from:



&#x20;   OPERATIONAL HARVESTER INFRASTRUCTURE



to:



&#x20;   OPERATIONAL INTELLIGENCE PIPELINE



The next programme activity shall then be determined by the authoritative

Roadmap to Alpha and milestone register.



MS-006 acceptance does not automatically authorise unrelated feature expansion.



\---



\# 42. FINAL ACCEPTANCE STATEMENT



The following statement may only be recorded after all mandatory tests pass:



&#x20;   MS-006 — OPERATIONAL INTELLIGENCE BASELINE



&#x20;   The JustDefenders Harvester has demonstrated a genuine end-to-end

&#x20;   source-to-platform intelligence pipeline.



&#x20;   A real source was identified and acquired.



&#x20;   Genuine source material was normalised.



&#x20;   Normalised intelligence was durably persisted.



&#x20;   Persisted intelligence was federated into the authorised JustDefenders

&#x20;   intelligence boundary.



&#x20;   Source provenance remained traceable through the complete pipeline.



&#x20;   The Harvester and Operational Service Host remained healthy following

&#x20;   execution.



&#x20;   MS-006 is therefore accepted as operational.



\# ==================================================================================================

\# END OF MS-006 — END-TO-END CONTROLLED HARVEST ACCEPTANCE

\# ==================================================================================================

