\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# PR-019E — FEDERATION

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\# Predecessor: PR-019D — Persistence

\#

\# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



PR-019E establishes the Federation stage of the MS-006 Harvester pipeline.



PR-019D establishes durable normalised intelligence records.



PR-019E consumes those durable records and establishes their availability to the

wider JustDefenders intelligence platform through the authorised federation

boundary.



The federation boundary is:



&#x20;   External Source

&#x20;         |

&#x20;         v

&#x20;   PR-019B — Harvest Execution

&#x20;         |

&#x20;         v

&#x20;   PR-019C — Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   PR-019D — Persistence

&#x20;         |

&#x20;         v

&#x20;   PR-019E — Federation

&#x20;         |

&#x20;         v

&#x20;   Platform Intelligence Surfaces



PR-019E does not own source discovery.



PR-019E does not own external collection.



PR-019E does not own result normalisation.



PR-019E does not own durable persistence.



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



PR-019E is the final stage of the MS-006 operational intelligence pipeline.



\---



\# 3. PREDECESSOR



PR-019D — Persistence



PR-019D establishes:



\- durable intelligence records;

\- stable platform identity;

\- source identity;

\- provenance;

\- collection context;

\- processing context;

\- persistence state.



PR-019E consumes those durable records.



PR-019E shall not perform another external collection operation merely to establish

federation.



\---



\# 4. FEDERATION OBJECTIVE



The objective of PR-019E is to make persisted intelligence available through the

authorised JustDefenders intelligence boundary while preserving:



\- source identity;

\- provenance;

\- record identity;

\- collection context;

\- temporal information;

\- source relationships;

\- record integrity.



Federation is an availability and relationship boundary.



It is not a second normalisation or collection pipeline.



\---



\# 5. FEDERATION BOUNDARY



The federation boundary is:



&#x20;   Durable Intelligence Record

&#x20;           |

&#x20;           v

&#x20;   Federation Eligibility

&#x20;           |

&#x20;           v

&#x20;   Identity / Relationship Resolution

&#x20;           |

&#x20;           v

&#x20;   Federation Representation

&#x20;           |

&#x20;           v

&#x20;   Intelligence Platform Surface



The federation layer shall preserve the distinction between:



&#x20;   persisted source observation

&#x20;   federated representation

&#x20;   derived intelligence



Federation shall not silently convert source observations into unsupported facts.



\---



\# 6. FEDERATION INPUT



PR-019E receives durable records produced by PR-019D.



Each federated record shall contain sufficient information to establish:



\- platform record identity;

\- record type;

\- source identity;

\- provenance;

\- normalised content;

\- persistence state;

\- collection context;

\- processing context.



Records that do not satisfy the minimum federation contract shall not be silently

published as complete intelligence.



\---



\# 7. FEDERATION STATES



Each federation attempt shall produce an observable outcome.



Permitted outcomes include:



&#x20;   FEDERATED

&#x20;   UPDATED

&#x20;   UNCHANGED

&#x20;   SKIPPED

&#x20;   REJECTED

&#x20;   FAILED



`FEDERATED` means a durable record has been successfully made available through

the authorised federation boundary.



`UPDATED` means an already federated representation has been updated from an

accepted durable record.



`UNCHANGED` means the federated representation already reflects the durable

record.



`SKIPPED` means the record was intentionally not federated.



`REJECTED` means the record failed federation acceptance conditions.



`FAILED` means the federation operation encountered an unexpected failure.



\---



\# 8. FEDERATION ELIGIBILITY



A record is eligible for federation only when:



1\. durable persistence has been confirmed;

2\. platform record identity is available;

3\. record type is established;

4\. source provenance is available;

5\. the record satisfies the applicable federation contract;

6\. the destination federation boundary is available.



A record shall not be federated merely because it exists temporarily in memory.



\---



\# 9. SOURCE PROVENANCE



Federation shall preserve source provenance.



At minimum, where available:



&#x20;   sourceId

&#x20;   sourceName

&#x20;   sourceUrl

&#x20;   finalUrl

&#x20;   discoveryMethod

&#x20;   parentSource

&#x20;   adapter

&#x20;   capturedAt



Federation shall not replace source identity with the JustDefenders platform as

the apparent origin of the information.



The platform is the consumer and federation host, not the originating source.



\---



\# 10. RECORD IDENTITY



Federation shall preserve the stable platform identity established by persistence.



The following identities remain distinct:



&#x20;   platform record identity

&#x20;   source identity

&#x20;   source record identity

&#x20;   external identifier

&#x20;   supplier identifier

&#x20;   manufacturer identifier



Federation shall not generate a new identity merely because a record crosses the

federation boundary.



\---



\# 11. SOURCE RELATIONSHIPS



Where multiple durable records originate from different sources, federation shall

preserve their independent source relationships.



For example:



&#x20;   Source A

&#x20;      |

&#x20;      +----> Record X

&#x20;      |

&#x20;      +----> Record Y



&#x20;   Source B

&#x20;      |

&#x20;      +----> Record X observation

&#x20;      |

&#x20;      +----> Record Z



Federation must not erase the distinction between these source observations.



This establishes the foundation for future intelligence composition.



\---



\# 12. MULTI-SOURCE FEDERATION



PR-019E shall support records originating from multiple independent sources.



The implementation shall not:



\- require one supplier;

\- require one community source;

\- overwrite all observations with the latest source;

\- discard source identity;

\- assume one source is authoritative for every field.



Independent source observations shall remain attributable.



\---



\# 13. FEDERATION REPRESENTATION



The federated representation shall expose the durable intelligence required by

authorised platform consumers.



Where applicable, it may include:



&#x20;   id

&#x20;   type

&#x20;   title

&#x20;   description

&#x20;   content

&#x20;   source

&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   supplier

&#x20;   manufacturer

&#x20;   product

&#x20;   identifiers

&#x20;   price

&#x20;   currency

&#x20;   availability

&#x20;   capturedAt

&#x20;   publishedAt

&#x20;   provenance

&#x20;   metadata



The exact representation shall remain compatible with the existing platform

intelligence boundary.



\---



\# 14. PARTS INTELLIGENCE FEDERATION



Where persisted records represent parts intelligence, federation may expose:



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



The following distinctions must remain intact:



\- JLR / Land Rover part number;

\- manufacturer part number;

\- supplier reference;

\- platform record identity.



Federation shall not collapse these identifiers.



\---



\# 15. SUPPLIER INTELLIGENCE FEDERATION



Where persisted records contain supplier information, federation may expose:



&#x20;   supplierId

&#x20;   supplierName

&#x20;   supplierUrl

&#x20;   supplierLocation

&#x20;   sourceId



Supplier information shall remain attributable to its originating source.



Federation shall not create unsupported supplier relationships.



\---



\# 16. KNOWLEDGE FEDERATION



Where persisted records contain knowledge information, federation may expose:



&#x20;   title

&#x20;   summary

&#x20;   content

&#x20;   category

&#x20;   topic

&#x20;   author

&#x20;   publishedAt

&#x20;   sourceUrl

&#x20;   sourceId



The source shall remain visible through the provenance boundary.



Federation does not independently verify the technical correctness of source

claims.



\---



\# 17. VEHICLE INTELLIGENCE FEDERATION



Where persisted records contain vehicle information, federation may expose:



&#x20;   model

&#x20;   variant

&#x20;   generation

&#x20;   year

&#x20;   engine

&#x20;   transmission

&#x20;   vehicleReference



Federation shall not invent a specific vehicle identity where the durable record

does not contain sufficient evidence.



\---



\# 18. PRICE FEDERATION



Price information shall retain:



&#x20;   amount

&#x20;   currency

&#x20;   source

&#x20;   capturedAt



Price observation time shall remain distinguishable from platform federation time.



A currency-unknown price shall not be presented as a known-currency price.



\---



\# 19. AVAILABILITY FEDERATION



Availability shall preserve the normalised state:



&#x20;   IN\_STOCK

&#x20;   OUT\_OF\_STOCK

&#x20;   BACKORDER

&#x20;   UNKNOWN



Availability remains associated with its source and observation time.



Federation shall not convert an unknown state into a definitive state.



\---



\# 20. TEMPORAL INFORMATION



Federation shall preserve the distinction between:



&#x20;   source publication time

&#x20;   source observation time

&#x20;   collection time

&#x20;   normalisation time

&#x20;   persistence time

&#x20;   federation time

&#x20;   update time



These timestamps represent different events.



Federation shall not collapse them into one timestamp.



\---



\# 21. PROVENANCE CHAIN



The complete evidence chain shall remain reconstructable:



&#x20;   Source

&#x20;      |

&#x20;      v

&#x20;   Discovery

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

&#x20;      |

&#x20;      v

&#x20;   Federated Representation



This chain is a fundamental requirement of MS-006.



\---



\# 22. FEDERATION DOES NOT INVENT INTELLIGENCE



PR-019E shall not create intelligence merely to populate platform surfaces.



The following are prohibited:



\- invented suppliers;

\- invented products;

\- invented part numbers;

\- invented prices;

\- invented availability;

\- invented technical claims;

\- fabricated relationships;

\- synthetic source observations.



Federation represents durable intelligence.



It does not manufacture it.



\---



\# 23. RELATIONSHIP COMPOSITION



Where durable records contain relationships supported by source evidence, federation

may expose those relationships to authorised platform consumers.



Examples include:



&#x20;   part -> supplier

&#x20;   part -> manufacturer

&#x20;   record -> source

&#x20;   record -> source observation

&#x20;   product -> identifier



Relationships must be evidence-backed.



Federation shall not imply a relationship solely because two records contain

similar text.



\---



\# 24. SOURCE OBSERVATION PRESERVATION



Where multiple sources provide observations concerning the same entity, federation

shall preserve those observations independently.



For example:



&#x20;   Part 346849

&#x20;       |

&#x20;       +---- Supplier A observation

&#x20;       |

&#x20;       +---- Supplier B observation

&#x20;       |

&#x20;       +---- Manufacturer observation



This permits future intelligence composition without destroying the underlying

evidence.



\---



\# 25. FEDERATION IDEMPOTENCE



Repeated federation of the same durable record shall not create uncontrolled

duplicate platform representations.



Given the same stable platform identity:



&#x20;   first execution  -> FEDERATED

&#x20;   subsequent       -> UNCHANGED



Where the durable record changes:



&#x20;   first execution  -> FEDERATED

&#x20;   later execution  -> UPDATED



The exact outcome depends on the established federation representation.



\---



\# 26. FEDERATION UPDATE CONTROL



An updated durable record may update its federated representation.



Updates shall:



\- preserve source provenance;

\- preserve platform identity;

\- preserve source relationships;

\- preserve valid historical context where supported;

\- avoid replacing valid information with unsupported values.



Federation shall not rewrite durable source evidence.



\---



\# 27. PARTIAL FAILURE ISOLATION



A federation failure affecting one record shall not unnecessarily terminate

federation of unrelated valid records.



For example:



&#x20;   Record A -> FEDERATED

&#x20;   Record B -> FAILED

&#x20;   Record C -> UPDATED

&#x20;   Record D -> SKIPPED



Each outcome shall remain observable.



\---



\# 28. FEDERATION BATCH



PR-019E shall operate against a durable record batch or equivalent persistence

query boundary.



The federation operation shall be capable of identifying:



&#x20;   batchId

&#x20;   startedAt

&#x20;   completedAt

&#x20;   inputCount

&#x20;   federatedCount

&#x20;   updatedCount

&#x20;   unchangedCount

&#x20;   skippedCount

&#x20;   rejectedCount

&#x20;   failedCount

&#x20;   results



The batch represents a federation event.



It does not replace individual platform record identity.



\---



\# 29. FEDERATION METRICS



Operational metrics shall distinguish:



&#x20;   recordsReceived

&#x20;   recordsFederated

&#x20;   recordsUpdated

&#x20;   recordsUnchanged

&#x20;   recordsSkipped

&#x20;   recordsRejected

&#x20;   recordsFailed



Where available:



&#x20;   newRecords

&#x20;   changedRecords

&#x20;   relationshipCount

&#x20;   federationDuration



Metrics shall represent genuine federation outcomes.



\---



\# 30. DURABLE INPUT REQUIREMENT



A record shall only be considered eligible for federation after durable persistence

has been confirmed.



The following do not constitute federation eligibility:



\- an in-memory record;

\- a raw harvest result;

\- a normalised but unpersisted record;

\- a temporary queue item;

\- a successful collection response.



The federation boundary begins with durable intelligence.



\---



\# 31. PLATFORM AVAILABILITY



The federated representation shall be made available through the existing

authorised JustDefenders intelligence boundary.



PR-019E shall not create an unrelated parallel intelligence platform.



Where an existing platform intelligence representation or service boundary exists,

federation shall use that established boundary.



\---



\# 32. MANAGED SERVICE INTEGRATION



PR-019E remains part of the established Harvester managed-service architecture.



It shall not:



\- create another Harvester service;

\- create another scheduler;

\- bypass the Operational Service Host;

\- replace the Harvester runtime;

\- alter unrelated managed services.



Federation is a capability of the existing operational intelligence pipeline.



\---



\# 33. RUNTIME INTEGRATION



The Harvester runtime remains responsible for:



\- lifecycle;

\- running state;

\- health;

\- heartbeat;

\- execution timestamps;

\- operational status.



Federation remains responsible for:



\- durable-record eligibility;

\- federation representation;

\- relationship exposure;

\- federation outcomes.



The federation layer shall not replace the Harvester runtime state model.



\---



\# 34. SECURITY



Federation shall preserve applicable security boundaries.



The implementation shall:



\- use authorised platform access;

\- avoid exposing secrets;

\- validate persisted values before exposure;

\- respect applicable access controls;

\- avoid arbitrary writes to unrelated platform surfaces;

\- avoid exposing internal diagnostic information through public intelligence

&#x20; representations.



Source content shall continue to be treated as externally originated data.



\---



\# 35. DATA INTEGRITY



Federation shall preserve the distinction between:



&#x20;   source evidence

&#x20;   normalised representation

&#x20;   durable record

&#x20;   federated representation

&#x20;   derived intelligence



Federation does not independently verify a source claim.



It establishes controlled availability of the durable representation.



\---



\# 36. FAILURE AND RECOVERY



Transient federation failures may be retried where appropriate.



Retries shall be bounded.



A failed federation operation shall remain observable.



Recovery shall use stable platform identity wherever possible so that retrying a

record does not create duplicate representations.



\---



\# 37. OBSERVABILITY



PR-019E shall provide sufficient information to establish:



\- when federation occurred;

\- which persistence batch or record set was processed;

\- how many records were received;

\- how many were federated;

\- how many were updated;

\- how many were unchanged;

\- how many were rejected;

\- how many failed;

\- which federation boundary was used.



Diagnostics shall not expose secrets or unnecessary sensitive source material.



\---



\# 38. FIRST REAL HARVEST FEDERATION



The first real harvest produced by PR-019B, normalised by PR-019C, and persisted by

PR-019D becomes the first real input to PR-019E.



The complete MS-006 path is therefore:



&#x20;   REAL SOURCE

&#x20;       |

&#x20;       v

&#x20;   REAL ACQUISITION

&#x20;       |

&#x20;       v

&#x20;   NORMALISED RESULT

&#x20;       |

&#x20;       v

&#x20;   DURABLE RECORD

&#x20;       |

&#x20;       v

&#x20;   FEDERATED REPRESENTATION

&#x20;       |

&#x20;       v

&#x20;   PLATFORM INTELLIGENCE



A synthetic record shall not be used as evidence that the complete MS-006 pipeline

is operational.



\---



\# 39. FIRST FEDERATION EVIDENCE



A successful first federation operation shall leave sufficient evidence to

establish:



&#x20;   platform record identity

&#x20;   source identity

&#x20;   source provenance

&#x20;   persistence state

&#x20;   federation outcome

&#x20;   federation timestamp

&#x20;   destination federation boundary



The evidence must allow the complete source-to-platform chain to be demonstrated.



\---



\# 40. MS-006 COMPLETION RELATIONSHIP



PR-019E is the final implementation stage specified by the MS-006 Operational

Intelligence Baseline.



The operational chain is:



&#x20;   PR-018A

&#x20;   Operational Assessment

&#x20;         |

&#x20;         v

&#x20;   PR-018B

&#x20;   Harvester Commissioning

&#x20;         |

&#x20;         v

&#x20;   PR-019A

&#x20;   Source Discovery

&#x20;         |

&#x20;         v

&#x20;   PR-019B

&#x20;   Harvest Execution

&#x20;         |

&#x20;         v

&#x20;   PR-019C

&#x20;   Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   PR-019D

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   PR-019E

&#x20;   Federation



Successful completion of this chain establishes the complete controlled

source-to-platform intelligence path defined for MS-006.



\---



\# 41. ACCEPTANCE CONDITIONS



PR-019E is accepted when:



1\. Durable records from PR-019D can be received.

2\. Federation eligibility can be established.

3\. Stable platform record identity is preserved.

4\. Source provenance is preserved.

5\. Collection context is preserved.

6\. Temporal information is preserved.

7\. Multiple independent sources can be represented.

8\. Source observations remain attributable.

9\. Supported relationships can be exposed.

10\. Duplicate federation is controlled.

11\. Existing federated records can be updated where appropriate.

12\. Unchanged records can be identified.

13\. Federation failures are observable.

14\. One record failure does not unnecessarily terminate unrelated federation.

15\. Federation metrics are observable.

16\. Security boundaries are preserved.

17\. The existing managed-service architecture remains intact.

18\. The existing platform intelligence boundary remains intact.

19\. The first real harvest can traverse the complete federation boundary.

20\. The complete source-to-platform evidence chain remains reconstructable.

21\. No synthetic intelligence is introduced.

22\. Federated records are suitable for authorised platform intelligence consumers.



\---



\# 42. NON-CONDITIONS



PR-019E shall not be considered failed merely because:



\- one record is rejected;

\- one source relationship cannot be resolved;

\- one optional field is unavailable;

\- one source observation conflicts with another;

\- one federation operation encounters a transient failure.



These are record-level or relationship-level outcomes.



PR-019E fails when the authorised federation boundary cannot reliably make valid

durable intelligence available to the platform.



\---



\# 43. OUTPUT



The principal output of PR-019E is:



&#x20;   FEDERATED INTELLIGENCE REPRESENTATION



Each federated record shall retain:



&#x20;   platform identity

&#x20;   source identity

&#x20;   provenance

&#x20;   durable intelligence

&#x20;   collection context

&#x20;   temporal context

&#x20;   supported relationships

&#x20;   federation state



The output is available to authorised JustDefenders intelligence consumers.



\---



\# 44. MS-006 FINAL TRANSITION



The completed operational intelligence path is:



&#x20;   SOURCE DISCOVERY

&#x20;         |

&#x20;         v

&#x20;   HARVEST EXECUTION

&#x20;         |

&#x20;         v

&#x20;   RESULT NORMALISATION

&#x20;         |

&#x20;         v

&#x20;   PERSISTENCE

&#x20;         |

&#x20;         v

&#x20;   FEDERATION

&#x20;         |

&#x20;         v

&#x20;   JUSTDEFENDERS INTELLIGENCE



This completes the PR-018 / PR-019 execution sequence defined for MS-006.



\---



\# 45. PROGRAMME SIGNIFICANCE



Successful PR-019E completion establishes that the Harvester is no longer merely

a registered or operational service.



It establishes a controlled intelligence pipeline capable of:



&#x20;   discovering sources

&#x20;         |

&#x20;         v

&#x20;   acquiring real source material

&#x20;         |

&#x20;         v

&#x20;   normalising results

&#x20;         |

&#x20;         v

&#x20;   persisting intelligence

&#x20;         |

&#x20;         v

&#x20;   federating intelligence



This is the operational transition from Harvester infrastructure to an actual

intelligence-producing platform capability.



\---



\# 46. NEXT PROGRAMME STATE



Upon successful completion of the MS-006 execution chain, the next programme

activity shall be determined by the authoritative Alpha roadmap and milestone

register.



The Harvester pipeline itself shall not be expanded into unrelated capabilities

merely because MS-006 is complete.



Future capabilities remain subject to their authorised programme work packages.



\---



\# 47. OUTCOME



PR-019E establishes the controlled federation capability required by MS-006.



Status:



&#x20;   PR-019E — FEDERATION

&#x20;   STATUS: READY FOR MS-006 COMPLETION



The complete authorised MS-006 pipeline is now defined as:



&#x20;   PR-018A — Operational Assessment

&#x20;   PR-018B — Harvester Commissioning

&#x20;   PR-019A — Source Discovery

&#x20;   PR-019B — Harvest Execution

&#x20;   PR-019C — Result Normalisation

&#x20;   PR-019D — Persistence

&#x20;   PR-019E — Federation



The next engineering activity is no longer another PR-019 work package.



The next activity is:



&#x20;   EXECUTE THE CONTROLLED MS-006 END-TO-END HARVEST



That execution must demonstrate:



&#x20;   REAL SOURCE

&#x20;       ->

&#x20;   REAL ACQUISITION

&#x20;       ->

&#x20;   REAL NORMALISATION

&#x20;       ->

&#x20;   REAL PERSISTENCE

&#x20;       ->

&#x20;   REAL FEDERATION



before MS-006 is declared operationally complete.



\# ==================================================================================================

\# END OF PR-019E — FEDERATION

\# ==================================================================================================

