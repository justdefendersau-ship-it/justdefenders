\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# PR-019D — PERSISTENCE

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\# Predecessor: PR-019C — Result Normalisation

\#

\# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



PR-019D establishes the persistence stage of the MS-006 Harvester pipeline.



PR-019C produces normalised intelligence records.



PR-019D accepts those normalised records and establishes their durable persistence

within the authorised JustDefenders persistence boundary.



The persistence boundary is:



&#x20;   Raw External Source Material

&#x20;           |

&#x20;           v

&#x20;   PR-019C — Result Normalisation

&#x20;           |

&#x20;           v

&#x20;   Normalised Intelligence Records

&#x20;           |

&#x20;           v

&#x20;   PR-019D — Persistence

&#x20;           |

&#x20;           v

&#x20;   Durable Intelligence Records

&#x20;           |

&#x20;           v

&#x20;   PR-019E — Federation



PR-019D does not own source discovery.



PR-019D does not own external collection.



PR-019D does not own result normalisation.



PR-019D does not own federation.



\---



\# 2. AUTHORITY



The authorised MS-006 execution sequence is:



&#x20;   PR-018A — Operational Assessment

&#x20;           |

&#x20;           v

&#x20;   PR-018B — Harvester Commissioning

&#x20;           |

&#x20;           v

&#x20;   PR-019A — Source Discovery

&#x20;           |

&#x20;           v

&#x20;   PR-019B — Harvest Execution

&#x20;           |

&#x20;           v

&#x20;   PR-019C — Result Normalisation

&#x20;           |

&#x20;           v

&#x20;   PR-019D — Persistence

&#x20;           |

&#x20;           v

&#x20;   PR-019E — Federation



PR-019D is therefore the durable-storage boundary for the first operational

intelligence pipeline.



\---



\# 3. PREDECESSOR



PR-019C — Result Normalisation



PR-019C establishes:



\- normalised records;

\- source provenance;

\- source identity;

\- collection context;

\- normalised fields;

\- processing context;

\- result classification.



PR-019D consumes those records.



PR-019D shall not require another external collection operation merely to persist

an already normalised result.



\---



\# 4. PERSISTENCE OBJECTIVE



The objective of PR-019D is to:



1\. receive normalised intelligence;

2\. validate persistence eligibility;

3\. establish durable record identity;

4\. preserve source provenance;

5\. preserve collection context;

6\. persist the normalised record;

7\. prevent uncontrolled duplicate creation;

8\. record persistence outcomes;

9\. expose persistence diagnostics;

10\. provide durable records to PR-019E.



The persisted representation must remain traceable to the source evidence from which

it originated.



\---



\# 5. PERSISTENCE BOUNDARY



The persistence boundary is:



&#x20;   Normalised Intelligence Record

&#x20;           |

&#x20;           v

&#x20;   Persistence Validation

&#x20;           |

&#x20;           v

&#x20;   Record Identity Resolution

&#x20;           |

&#x20;           v

&#x20;   Duplicate / Existing Record Check

&#x20;           |

&#x20;           v

&#x20;   Durable Write

&#x20;           |

&#x20;           v

&#x20;   Persistence Outcome

&#x20;           |

&#x20;           v

&#x20;   PR-019E Federation



The persistence layer owns the durable write.



It does not reinterpret the source material.



\---



\# 6. PERSISTENCE INPUT



PR-019D receives the normalised result set produced by PR-019C.



Each input record shall contain sufficient information to establish:



\- record type;

\- source identity;

\- source URL or source reference;

\- provenance;

\- normalised content;

\- collection context;

\- processing context.



Records lacking the minimum persistence contract shall not be silently persisted as

complete intelligence records.



\---



\# 7. RECORD IDENTITY



Each persisted record shall have a stable platform identity.



The persistence layer shall distinguish between:



&#x20;   platform record identity

&#x20;   source identity

&#x20;   source record identity

&#x20;   external identifier

&#x20;   supplier identifier

&#x20;   manufacturer identifier



A source identifier must not automatically become the platform's primary identity.



Where no reliable external identifier exists, the persistence implementation may

derive a deterministic identity from the available provenance and normalised

content.



\---



\# 8. PROVENANCE PRESERVATION



Every persisted intelligence record shall retain provenance.



At minimum, where available:



&#x20;   sourceId

&#x20;   sourceName

&#x20;   sourceUrl

&#x20;   finalUrl

&#x20;   discoveryMethod

&#x20;   parentSource

&#x20;   adapter

&#x20;   capturedAt



The persistence layer shall not detach the record from its source.



The source remains the origin of the collected information.



\---



\# 9. COLLECTION CONTEXT



Where available, persisted records shall retain:



&#x20;   harvestBatchId

&#x20;   collectedAt

&#x20;   adapter

&#x20;   collectionStatus



This permits a persisted record to be associated with the harvest event that

produced it.



Collection time shall remain distinguishable from publication time.



\---



\# 10. PROCESSING CONTEXT



Where supported, persistence shall retain:



&#x20;   normalisedAt

&#x20;   normalisationVersion

&#x20;   processingStatus



Processing metadata shall remain separate from source content.



The persistence layer shall not overwrite source timestamps with processing

timestamps.



\---



\# 11. PERSISTENCE STATES



Each persistence attempt shall produce an observable outcome.



Permitted outcomes include:



&#x20;   INSERTED

&#x20;   UPDATED

&#x20;   UNCHANGED

&#x20;   SKIPPED

&#x20;   REJECTED

&#x20;   FAILED



`INSERTED` means a new durable record was created.



`UPDATED` means an existing record was updated with accepted new information.



`UNCHANGED` means the incoming record was materially equivalent to the durable

record already present.



`SKIPPED` means the record was intentionally not persisted.



`REJECTED` means the record failed persistence acceptance conditions.



`FAILED` means an unexpected persistence operation failed.



\---



\# 12. PERSISTENCE VALIDATION



Before a record is persisted, the implementation shall validate the minimum

persistence contract.



At minimum:



\- record type is established;

\- source provenance is available;

\- record identity can be resolved;

\- required fields for the record type are valid;

\- the record is not known to be synthetic;

\- the persistence target is available.



A record failing validation shall produce an observable `REJECTED` or `FAILED`

outcome according to the nature of the failure.



\---



\# 13. NO SYNTHETIC INTELLIGENCE



PR-019D shall never create a genuine intelligence record merely to satisfy

persistence counts.



The following are prohibited:



\- invented suppliers;

\- invented products;

\- invented part numbers;

\- invented prices;

\- invented availability;

\- invented technical information;

\- placeholder records presented as harvested intelligence.



Persistence stores intelligence.



It does not manufacture intelligence.



\---



\# 14. DUPLICATE CONTROL



The persistence layer shall prevent uncontrolled duplicate records.



Duplicate determination may use combinations of:



\- stable platform identity;

\- source identity;

\- source URL;

\- source record identifier;

\- part number;

\- supplier;

\- manufacturer;

\- product identifier;

\- deterministic content identity.



Duplicate control shall not merge unrelated records merely because they contain

similar text.



\---



\# 15. UPSERT BEHAVIOUR



Where the persistence target supports upsert semantics, the implementation may

use them where they preserve the established record identity.



Upsert behaviour must distinguish between:



&#x20;   new information

&#x20;   changed information

&#x20;   unchanged information



An update shall not destroy existing provenance.



An update shall not replace valid information with an empty or lower-confidence

value merely because a later source response omitted the field.



\---



\# 16. SOURCE AUTHORITY



Where multiple sources provide information concerning the same entity, persistence

shall preserve source attribution.



The persistence layer shall not collapse independent sources into an anonymous

record.



Where multiple source observations relate to the same platform entity, the source

relationships shall remain recoverable.



This provides the foundation for later federation and intelligence composition.



\---



\# 17. MULTI-SOURCE PERSISTENCE



PR-019D shall support records originating from multiple independent sources.



The implementation shall not:



\- require one supplier;

\- require one community;

\- overwrite all records with the latest source;

\- discard source identity;

\- assume that one source is authoritative for every field.



Each source observation remains attributable.



\---



\# 18. PARTS INTELLIGENCE PERSISTENCE



Where normalised records represent parts intelligence, supported fields may

include:



&#x20;   partNumber

&#x20;   manufacturerPartNumber

&#x20;   supplierPartNumber

&#x20;   manufacturer

&#x20;   productName

&#x20;   description

&#x20;   supplier

&#x20;   supplierUrl

&#x20;   price

&#x20;   currency

&#x20;   availability

&#x20;   sourceUrl

&#x20;   capturedAt



The persistence layer shall preserve distinctions between:



\- JLR / Land Rover part numbers;

\- manufacturer part numbers;

\- supplier references;

\- platform identifiers.



A supplier reference must not silently replace a manufacturer part number.



\---



\# 19. SUPPLIER PERSISTENCE



Where normalised records contain supplier information, the persistence layer may

retain:



&#x20;   supplierId

&#x20;   supplierName

&#x20;   supplierUrl

&#x20;   supplierLocation

&#x20;   sourceId



Supplier identity shall remain linked to the source observation.



The persistence layer shall not assign a supplier identity solely from a textual

similarity where confidence is insufficient.



\---



\# 20. KNOWLEDGE PERSISTENCE



Where normalised records contain knowledge information, supported fields may

include:



&#x20;   title

&#x20;   summary

&#x20;   content

&#x20;   category

&#x20;   topic

&#x20;   author

&#x20;   publishedAt

&#x20;   sourceUrl

&#x20;   sourceId



Knowledge records shall retain source attribution.



Persistence does not establish that a source claim is independently verified.



\---



\# 21. VEHICLE INTELLIGENCE PERSISTENCE



Where normalised records contain vehicle information, supported fields may include:



&#x20;   model

&#x20;   variant

&#x20;   generation

&#x20;   year

&#x20;   engine

&#x20;   transmission

&#x20;   vehicleReference



The persistence layer shall not create a specific vehicle identity where the

normalised evidence does not support one.



\---



\# 22. PRICE PERSISTENCE



Price records shall preserve:



&#x20;   amount

&#x20;   currency

&#x20;   source

&#x20;   capturedAt



A currency-unknown price shall not be silently persisted as though its currency

were known.



Price history shall remain distinguishable from current price where the persistence

model supports temporal observations.



\---



\# 23. AVAILABILITY PERSISTENCE



Availability may be persisted using the normalised state established by PR-019C:



&#x20;   IN\_STOCK

&#x20;   OUT\_OF\_STOCK

&#x20;   BACKORDER

&#x20;   UNKNOWN



Availability shall remain associated with its source and observation time.



The persistence layer shall not transform `UNKNOWN` into a positive or negative

availability state.



\---



\# 24. TEMPORAL INFORMATION



The persistence layer shall distinguish:



&#x20;   source publication time

&#x20;   source observation time

&#x20;   collection time

&#x20;   normalisation time

&#x20;   persistence time

&#x20;   update time



These timestamps represent different events.



They shall not be collapsed into a single timestamp merely for convenience.



\---



\# 25. RAW-SOURCE RELATIONSHIP



Where the existing persistence architecture provides a raw collection or evidence

record, the normalised record shall retain its relationship to that evidence.



The durable intelligence record shall therefore support an evidence chain:



&#x20;   Source

&#x20;      |

&#x20;      v

&#x20;   Collection

&#x20;      |

&#x20;      v

&#x20;   Raw Result

&#x20;      |

&#x20;      v

&#x20;   Normalised Record

&#x20;      |

&#x20;      v

&#x20;   Persisted Record



This chain is required for later intelligence verification.



\---



\# 26. PERSISTENCE TRANSACTION



Where the storage system supports transactional writes, related persistence

operations should be performed within an appropriate transaction boundary.



A failed transaction shall not leave a partially written record represented as

successfully persisted.



Where a transaction cannot be used, the implementation shall provide an equivalent

observable failure and recovery strategy.



\---



\# 27. PARTIAL FAILURE ISOLATION



A failure persisting one record shall not automatically invalidate unrelated valid

records in the same batch where independent persistence is supported.



For example:



&#x20;   Record A -> INSERTED

&#x20;   Record B -> FAILED

&#x20;   Record C -> UPDATED

&#x20;   Record D -> REJECTED



The persistence batch shall retain each individual outcome.



\---



\# 28. BATCH PERSISTENCE



PR-019D shall operate against the normalised result batch produced by PR-019C.



The persistence batch shall be capable of identifying:



&#x20;   batchId

&#x20;   startedAt

&#x20;   completedAt

&#x20;   inputCount

&#x20;   insertedCount

&#x20;   updatedCount

&#x20;   unchangedCount

&#x20;   skippedCount

&#x20;   rejectedCount

&#x20;   failedCount

&#x20;   results



The batch represents a persistence event.



It does not replace individual record identity.



\---



\# 29. PERSISTENCE METRICS



Operational metrics shall distinguish:



&#x20;   recordsReceived

&#x20;   recordsInserted

&#x20;   recordsUpdated

&#x20;   recordsUnchanged

&#x20;   recordsSkipped

&#x20;   recordsRejected

&#x20;   recordsFailed



Where available:



&#x20;   duplicateRecords

&#x20;   newRecords

&#x20;   changedRecords

&#x20;   persistenceDuration



Metrics shall represent genuine persistence outcomes.



\---



\# 30. DURABLE SUCCESS



A persistence operation may only be reported as successful when the target storage

system confirms the corresponding durable operation.



The following do not constitute durable persistence:



\- creating an in-memory object;

\- incrementing a counter;

\- writing only runtime state;

\- returning a successful function result without storage confirmation;

\- retaining the record only in a transient queue.



Durable success requires confirmation from the authorised persistence boundary.



\---



\# 31. RUNTIME STATE



The Harvester runtime may expose persistence status and metrics.



Runtime status shall distinguish:



&#x20;   Harvester operational health

&#x20;   collection health

&#x20;   normalisation health

&#x20;   persistence health



A persistence failure shall not automatically be represented as complete Harvester

runtime failure unless the established runtime policy requires that escalation.



\---



\# 32. MANAGED SERVICE INTEGRATION



PR-019D remains part of the existing Harvester managed-service architecture.



It shall not:



\- create another Harvester service;

\- create another scheduler;

\- bypass the Operational Service Host;

\- replace the Harvester runtime;

\- alter unrelated managed services.



Persistence is a capability within the established service boundary.



\---



\# 33. STORAGE BOUNDARY



The persistence implementation shall use the authorised JustDefenders storage

boundary.



It shall not silently introduce a second persistence system merely to satisfy the

work package.



Where an existing persistence manager or repository abstraction exists, PR-019D

shall use that established boundary.



\---



\# 34. STORAGE COMPATIBILITY



The persistence implementation shall preserve compatibility with the existing

platform storage architecture.



It shall not require unrelated schema changes merely to establish the basic

MS-006 persistence boundary.



Where schema evolution is genuinely required, the change shall be treated as an

explicit engineering dependency rather than silently embedded in the Harvester

execution path.



\---



\# 35. SECURITY



Persistence shall preserve applicable security boundaries.



The persistence implementation shall:



\- use authorised storage credentials;

\- avoid logging secrets;

\- avoid exposing credentials in persisted records;

\- validate externally supplied values;

\- respect applicable access controls;

\- avoid uncontrolled arbitrary database writes.



Source content shall be treated as untrusted external data.



\---



\# 36. DATA INTEGRITY



Persistence shall preserve the distinction between:



&#x20;   source evidence

&#x20;   normalised representation

&#x20;   durable record

&#x20;   later derived intelligence



A persisted record represents information obtained and normalised from a source.



Persistence itself does not make the source claim independently true.



\---



\# 37. RETRY AND RECOVERY



Transient persistence failures may be retried where appropriate.



Retries shall be bounded.



A failed write shall not create uncontrolled duplicate records through repeated

blind insertion.



Where deterministic record identity exists, retry behaviour should use that

identity to preserve idempotence.



\---



\# 38. IDEMPOTENCE



Repeated persistence of the same normalised record should not create uncontrolled

duplicate durable records.



Given the same stable identity and materially equivalent content:



&#x20;   first execution  -> INSERTED

&#x20;   subsequent       -> UNCHANGED



Where the source information genuinely changes:



&#x20;   first execution  -> INSERTED

&#x20;   later execution  -> UPDATED



The exact outcome depends on the established record identity and storage semantics.



\---



\# 39. OBSERVABILITY



PR-019D shall provide sufficient information to establish:



\- when persistence occurred;

\- which batch was processed;

\- how many records were received;

\- how many were inserted;

\- how many were updated;

\- how many were unchanged;

\- how many were rejected;

\- how many failed;

\- which storage boundary was used.



Diagnostics shall not expose secrets or unnecessary sensitive source content.



\---



\# 40. FIRST REAL HARVEST PERSISTENCE



The first real harvest produced by PR-019B and normalised by PR-019C becomes the

first real input to PR-019D.



PR-019D shall therefore be capable of demonstrating:



&#x20;   REAL SOURCE

&#x20;       |

&#x20;       v

&#x20;   REAL ACQUIRED MATERIAL

&#x20;       |

&#x20;       v

&#x20;   NORMALISED RECORD

&#x20;       |

&#x20;       v

&#x20;   DURABLE PERSISTED RECORD

&#x20;       |

&#x20;       v

&#x20;   PR-019E FEDERATION



A synthetic record shall not be used as evidence that the complete MS-006

persistence path is operational.



\---



\# 41. PERSISTENCE EVIDENCE



A successful persistence operation shall leave sufficient evidence to establish:



&#x20;   record identity

&#x20;   source identity

&#x20;   source provenance

&#x20;   harvest batch

&#x20;   persistence outcome

&#x20;   persistence timestamp

&#x20;   durable storage confirmation



This evidence provides the foundation for downstream federation.



\---



\# 42. FEDERATION HAND-OFF



PR-019D terminates at the durable-record boundary.



The intended hand-off is:



&#x20;   PR-019C

&#x20;   Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   PR-019D

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   DURABLE INTELLIGENCE RECORDS

&#x20;         |

&#x20;         v

&#x20;   PR-019E

&#x20;   Federation



PR-019D shall not perform federation itself.



\---



\# 43. FEDERATION INPUT CONTRACT



PR-019E shall receive persisted records with sufficient information to establish:



\- platform record identity;

\- source identity;

\- provenance;

\- normalised content;

\- persistence state;

\- collection context;

\- temporal information.



Federation shall not need to repeat the original external collection merely to

determine where a persisted record came from.



\---



\# 44. ACCEPTANCE CONDITIONS



PR-019D is accepted when:



1\. Normalised results from PR-019C can be received.

2\. Persistence eligibility can be validated.

3\. Stable record identity can be established.

4\. Source provenance is retained.

5\. Collection context is retained.

6\. Processing context is retained.

7\. Durable records can be created.

8\. Existing records can be updated where appropriate.

9\. Unchanged records can be identified.

10\. Duplicate creation is controlled.

11\. Multiple sources can be persisted independently.

12\. Source attribution is preserved.

13\. Persistence failures are observable.

14\. One record failure does not unnecessarily terminate unrelated valid records.

15\. Persistence metrics are observable.

16\. Durable success is confirmed by the storage boundary.

17\. Persistence is compatible with the existing platform architecture.

18\. Security boundaries are preserved.

19\. The first real harvest can reach durable storage.

20\. Persisted records remain traceable to source evidence.

21\. Records are suitable for PR-019E Federation.



\---



\# 45. NON-CONDITIONS



PR-019D shall not be considered failed merely because:



\- one record is rejected;

\- one source produces malformed data;

\- one optional field is absent;

\- one source cannot be reconciled with an existing record;

\- one persistence attempt encounters a transient failure.



These are record-level or source-level outcomes.



PR-019D fails when the authorised persistence boundary cannot reliably establish

durable storage for valid normalised intelligence.



\---



\# 46. OUTPUT



The principal output of PR-019D is:



&#x20;   DURABLE NORMALISED INTELLIGENCE RECORD SET



Each accepted record shall retain:



&#x20;   platform identity

&#x20;   source identity

&#x20;   provenance

&#x20;   normalised intelligence

&#x20;   collection context

&#x20;   processing context

&#x20;   persistence state



The output is suitable for:



&#x20;   PR-019E — Federation



\---



\# 47. MS-006 TRANSITION



The operational transition is:



&#x20;   PR-019A

&#x20;   Source Discovery

&#x20;         |

&#x20;         v

&#x20;   PR-019B

&#x20;   Harvest Execution

&#x20;         |

&#x20;         v

&#x20;   REAL RAW SOURCE RESULTS

&#x20;         |

&#x20;         v

&#x20;   PR-019C

&#x20;   Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   NORMALISED INTELLIGENCE

&#x20;         |

&#x20;         v

&#x20;   PR-019D

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   DURABLE INTELLIGENCE

&#x20;         |

&#x20;         v

&#x20;   PR-019E

&#x20;   Federation



PR-019D is therefore the durable evidence boundary of the MS-006 operational

intelligence pipeline.



\---



\# 48. OUTCOME



PR-019D establishes the controlled persistence capability required by MS-006.



Status:



&#x20;   PR-019D — PERSISTENCE

&#x20;   STATUS: READY FOR FEDERATION



The next authorised engineering activity is:



&#x20;   PR-019E — FEDERATION



No additional architectural redesign is required by PR-019D.



\# ==================================================================================================

\# END OF PR-019D — PERSISTENCE

\# ==================================================================================================

