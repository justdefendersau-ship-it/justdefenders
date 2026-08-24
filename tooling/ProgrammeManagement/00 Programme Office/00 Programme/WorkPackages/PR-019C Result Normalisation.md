\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# PR-019C — RESULT NORMALISATION

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\# Predecessor: PR-019B — Harvest Execution

\#

\# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



PR-019C establishes the Result Normalisation stage of the MS-006 Harvester pipeline.



PR-019B produces raw results from controlled external source acquisition.



PR-019C converts those raw source results into a consistent structured representation

suitable for persistence and subsequent federation.



The normalisation boundary exists between:



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



PR-019C does not own external acquisition.



PR-019C does not own durable persistence.



PR-019C does not own federation.



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



PR-019C therefore consumes the output of real source acquisition and produces the

normalised representation required by the persistence boundary.



\---



\# 3. PREDECESSOR



PR-019B — Harvest Execution



PR-019B establishes:



\- qualified source execution;

\- actual external acquisition;

\- raw source material;

\- source provenance;

\- collection adapter identity;

\- response metadata;

\- collection status;

\- source-level execution outcomes.



PR-019C consumes those results.



PR-019C shall not re-run source discovery merely to normalise a result.



PR-019C shall not perform external collection merely to obtain a result.



\---



\# 4. NORMALISATION OBJECTIVE



The objective of PR-019C is to transform heterogeneous raw source results into a

consistent normalised representation.



The normalisation process shall:



1\. identify the source;

2\. preserve source provenance;

3\. identify the acquired material;

4\. extract supported structured information;

5\. standardise fields;

6\. remove irrelevant transport-level differences;

7\. retain source attribution;

8\. classify the normalised result;

9\. produce a persistence-ready record.



The normalisation process must not discard provenance required for downstream

intelligence traceability.



\---



\# 5. NORMALISATION BOUNDARY



The normalisation boundary is:



&#x20;   Raw Collection Result

&#x20;           |

&#x20;           v

&#x20;   Source Identification

&#x20;           |

&#x20;           v

&#x20;   Content Classification

&#x20;           |

&#x20;           v

&#x20;   Field Extraction

&#x20;           |

&#x20;           v

&#x20;   Field Normalisation

&#x20;           |

&#x20;           v

&#x20;   Record Validation

&#x20;           |

&#x20;           v

&#x20;   Normalised Result

&#x20;           |

&#x20;           v

&#x20;   PR-019D Persistence



This boundary shall remain separate from collection and persistence.



\---



\# 6. RAW RESULT INPUT



A raw collection result may contain:



&#x20;   source

&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   finalUrl

&#x20;   adapter

&#x20;   status

&#x20;   statusCode

&#x20;   contentType

&#x20;   capturedAt

&#x20;   payload

&#x20;   metadata

&#x20;   error



PR-019C shall accept only results that contain sufficient information to establish

their origin and collection state.



A failed collection result may be retained as an operational event, but shall not

be represented as a successful intelligence record.



\---



\# 7. SOURCE PROVENANCE



Every normalised result shall preserve source provenance.



At minimum, where available:



&#x20;   sourceId

&#x20;   sourceName

&#x20;   sourceUrl

&#x20;   finalUrl

&#x20;   discoveryMethod

&#x20;   parentSource

&#x20;   adapter

&#x20;   capturedAt



Source provenance shall remain attached to the normalised result through the

persistence boundary.



The normalisation process shall not replace the original source with the

normalising system as the apparent origin of the information.



\---



\# 8. CONTENT CLASSIFICATION



The normalisation process shall identify the type of source material being processed.



Supported classes may include:



&#x20;   HTML

&#x20;   JSON

&#x20;   XML

&#x20;   RSS

&#x20;   ATOM

&#x20;   TEXT

&#x20;   OTHER



The content classification shall be based on available response metadata and

content characteristics.



Unsupported content shall produce an observable normalisation outcome rather than

causing an uncontrolled runtime failure.



\---



\# 9. NORMALISATION STATES



Each result shall have an observable normalisation outcome.



Permitted outcomes include:



&#x20;   NORMALISED

&#x20;   SKIPPED

&#x20;   REJECTED

&#x20;   FAILED



`NORMALISED` means the raw result produced a valid normalised representation.



`SKIPPED` means the result was intentionally not normalised because it was outside

the supported processing boundary.



`REJECTED` means the result failed the normalisation acceptance conditions.



`FAILED` means processing encountered an unexpected or recoverable processing

failure.



\---



\# 10. SOURCE-LEVEL FAILURE ISOLATION



A normalisation failure affecting one result shall not terminate processing of all

other results in the harvest batch.



For example:



&#x20;   Result A -> NORMALISED

&#x20;   Result B -> REJECTED

&#x20;   Result C -> NORMALISED

&#x20;   Result D -> FAILED



The remaining eligible results shall continue through normalisation.



Each outcome shall remain observable.



\---



\# 11. FIELD NORMALISATION



Where supported, normalisation shall standardise:



\- field names;

\- whitespace;

\- textual representation;

\- URL representation;

\- identifiers;

\- dates;

\- timestamps;

\- quantities;

\- currency representation;

\- source references.



Normalisation shall not invent values that are absent from the source material.



Where a value cannot be reliably determined, the normalised representation shall

retain an empty or explicitly unknown value rather than fabricating information.



\---



\# 12. TEXT NORMALISATION



Textual content may be normalised for:



\- leading and trailing whitespace;

\- repeated whitespace;

\- HTML presentation artefacts;

\- encoding inconsistencies;

\- non-content markup.



Normalisation shall preserve the substantive meaning of the source material.



The process shall not rewrite source content into an interpretation that cannot be

traced back to the original source.



\---



\# 13. URL NORMALISATION



URLs shall be normalised sufficiently to provide stable source identification.



Where applicable:



\- relative URLs may be resolved against the source URL;

\- redundant URL formatting may be removed;

\- final redirected URLs may be retained;

\- source URLs shall remain distinguishable from content URLs.



The original source URL shall not be discarded.



\---



\# 14. IDENTIFIER NORMALISATION



Where source material contains identifiable values such as:



\- part numbers;

\- supplier identifiers;

\- product identifiers;

\- manufacturer identifiers;

\- vehicle identifiers;

\- reference numbers;



the values may be normalised into consistent representations.



The original source representation shall remain recoverable through provenance or

raw-source linkage where available.



No identifier shall be converted into a different identifier merely because it

appears similar.



\---



\# 15. PARTS INTELLIGENCE



Where a source result contains parts-related information, normalisation may extract

supported fields including:



&#x20;   partNumber

&#x20;   manufacturerPartNumber

&#x20;   supplierPartNumber

&#x20;   manufacturer

&#x20;   productName

&#x20;   description

&#x20;   price

&#x20;   currency

&#x20;   availability

&#x20;   sourceUrl

&#x20;   supplier



The normalisation process shall preserve the distinction between:



\- JLR / Land Rover part numbers;

\- manufacturer part numbers;

\- supplier references;

\- internal supplier identifiers.



Values shall not be conflated merely because they occur in the same source result.



\---



\# 16. SUPPLIER INFORMATION



Where source material identifies a supplier, normalisation may extract:



&#x20;   supplier

&#x20;   supplierName

&#x20;   supplierUrl

&#x20;   supplierLocation

&#x20;   sourceUrl



Supplier identity shall remain attributable to the source from which it was

obtained.



Normalisation shall not assign an unrelated supplier to a result.



\---



\# 17. KNOWLEDGE INFORMATION



Where source material contains technical or knowledge information, normalisation

may extract supported fields including:



&#x20;   title

&#x20;   summary

&#x20;   content

&#x20;   category

&#x20;   topic

&#x20;   author

&#x20;   publishedAt

&#x20;   sourceUrl

&#x20;   source



The normalised representation shall preserve the originating source.



Technical content shall not be presented as independently verified engineering

fact merely because it was successfully normalised.



\---



\# 18. VEHICLE INFORMATION



Where source material contains Defender or Land Rover vehicle information,

normalisation may identify supported fields including:



&#x20;   model

&#x20;   variant

&#x20;   generation

&#x20;   year

&#x20;   engine

&#x20;   transmission

&#x20;   vehicleReference



The normalisation process shall not infer a specific vehicle configuration where

the source does not provide sufficient evidence.



\---



\# 19. PRICE NORMALISATION



Where price information is available, normalisation shall preserve:



&#x20;   amount

&#x20;   currency

&#x20;   source



The normalisation process shall not silently convert currencies without recording

the conversion basis.



A price without a reliably identifiable currency shall not be represented as though

its currency were known.



\---



\# 20. AVAILABILITY NORMALISATION



Supplier availability information may be represented using a consistent state such

as:



&#x20;   IN\_STOCK

&#x20;   OUT\_OF\_STOCK

&#x20;   BACKORDER

&#x20;   UNKNOWN



The normalisation process shall not convert ambiguous supplier wording into a

definitive availability state without sufficient evidence.



\---



\# 21. DATE AND TIME NORMALISATION



Where source timestamps are available, normalisation shall preserve the source

timestamp and, where possible, establish a consistent machine-readable timestamp.



The original captured-at timestamp remains part of collection provenance.



Publication dates and collection dates shall remain distinct.



\---



\# 22. DUPLICATE CONTROL



Normalisation shall identify duplicate representations where possible.



Potential duplicate records may be identified using combinations of:



\- source;

\- source URL;

\- source identifier;

\- part number;

\- supplier;

\- product identifier;

\- title;

\- content identity.



Duplicate detection shall not merge records solely because they appear similar.



Where duplicate confidence is insufficient, records shall remain separate.



\---



\# 23. CANONICAL REPRESENTATION



A normalised result shall provide a consistent representation for downstream

persistence.



The canonical representation may contain:



&#x20;   id

&#x20;   type

&#x20;   source

&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   title

&#x20;   description

&#x20;   content

&#x20;   identifiers

&#x20;   supplier

&#x20;   manufacturer

&#x20;   product

&#x20;   price

&#x20;   currency

&#x20;   availability

&#x20;   capturedAt

&#x20;   publishedAt

&#x20;   metadata

&#x20;   provenance



Only fields supported by the source material shall be populated.



\---



\# 24. PROVENANCE REQUIREMENT



The normalised record must remain traceable to the raw collection result.



At minimum, provenance shall allow determination of:



&#x20;   originating source

&#x20;   originating URL

&#x20;   collection time

&#x20;   adapter

&#x20;   discovery relationship where applicable



The normalisation process shall not sever the evidence chain.



\---



\# 25. RAW MATERIAL PRESERVATION



PR-019C shall not require the raw collection material to be discarded after

normalisation.



Where the existing persistence architecture provides a raw-result or evidence

boundary, the normalised result shall retain the relationship to that material.



The normalised record is an interpretation of collected source material, not a

replacement for its provenance.



\---



\# 26. VALIDATION



Before a result is accepted as `NORMALISED`, it shall satisfy the minimum

normalisation contract.



At minimum:



\- source identity is available;

\- source provenance is available;

\- result type can be established;

\- required fields for that result type are valid;

\- no fabricated source values have been introduced.



Results failing these conditions shall be classified as `REJECTED` or `FAILED`

according to the nature of the failure.



\---



\# 27. NO SYNTHETIC INTELLIGENCE



PR-019C shall not create intelligence merely to satisfy downstream record counts.



The following are prohibited:



\- invented product records;

\- invented part numbers;

\- invented suppliers;

\- invented prices;

\- invented availability;

\- invented technical claims;

\- placeholder records represented as genuine source intelligence.



A missing source value remains missing.



\---



\# 28. NORMALISATION BATCH



Normalisation shall operate against the harvest batch produced by PR-019B.



The batch shall be capable of identifying:



&#x20;   batchId

&#x20;   startedAt

&#x20;   completedAt

&#x20;   inputCount

&#x20;   normalisedCount

&#x20;   skippedCount

&#x20;   rejectedCount

&#x20;   failedCount

&#x20;   results



The batch represents a transformation event.



It is not itself the persistence layer.



\---



\# 29. NORMALISATION METRICS



Operational metrics shall distinguish:



&#x20;   resultsReceived

&#x20;   resultsNormalised

&#x20;   resultsSkipped

&#x20;   resultsRejected

&#x20;   resultsFailed



Where available:



&#x20;   recordsProduced

&#x20;   duplicateCandidates

&#x20;   invalidRecords



Metrics shall reflect genuine processing outcomes.



\---



\# 30. NORMALISATION OBSERVABILITY



The normalisation process shall provide sufficient information to determine:



\- when normalisation occurred;

\- which harvest batch was processed;

\- how many raw results were received;

\- how many results were normalised;

\- how many were skipped;

\- how many were rejected;

\- how many failed;

\- which result types were produced.



The information shall remain available to the Harvester diagnostic surface.



\---



\# 31. RUNTIME INTEGRATION



PR-019C shall operate through the existing Harvester runtime.



The runtime remains responsible for:



\- lifecycle;

\- running state;

\- health;

\- heartbeat;

\- execution timestamps;

\- operational status.



Normalisation remains a processing capability.



The normalisation layer shall not replace the runtime state model.



\---



\# 32. MANAGED SERVICE INTEGRATION



PR-019C remains part of the existing Harvester managed-service architecture.



It shall not:



\- create another Harvester service;

\- create another scheduler;

\- bypass the Operational Service Host;

\- replace the Harvester runtime;

\- alter unrelated managed services.



\---



\# 33. PERSISTENCE HAND-OFF



PR-019C terminates at the normalised-result boundary.



The intended hand-off is:



&#x20;   PR-019B

&#x20;   Harvest Execution

&#x20;         |

&#x20;         v

&#x20;   Raw Collection Results

&#x20;         |

&#x20;         v

&#x20;   PR-019C

&#x20;   Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   Normalised Intelligence Records

&#x20;         |

&#x20;         v

&#x20;   PR-019D

&#x20;   Persistence



PR-019C shall not directly assume persistence ownership.



\---



\# 34. FEDERATION HAND-OFF



Federation remains downstream of persistence.



The intended sequence is:



&#x20;   Collection

&#x20;       |

&#x20;       v

&#x20;   Normalisation

&#x20;       |

&#x20;       v

&#x20;   Persistence

&#x20;       |

&#x20;       v

&#x20;   Federation



PR-019C shall not publish normalised records directly into federation.



\---



\# 35. MULTI-SOURCE NORMALISATION



PR-019C shall normalise results from multiple sources through the same general

normalisation boundary.



The implementation shall not require a separate canonical pipeline for every

supplier or community source unless a source-specific parser is genuinely required.



Where source-specific parsing is required, it shall remain behind the established

normalisation boundary.



\---



\# 36. SOURCE-SPECIFIC PARSING



A source-specific parser may be used where source structure requires it.



Such a parser shall:



\- receive the raw result;

\- preserve source provenance;

\- extract supported fields;

\- return the common normalised representation.



Source-specific parsing shall not become a separate persistence architecture.



\---



\# 37. NORMALISATION FAILURE ISOLATION



A malformed result shall not terminate the entire normalisation batch.



For example:



&#x20;   Result A -> NORMALISED

&#x20;   Result B -> REJECTED

&#x20;   Result C -> NORMALISED

&#x20;   Result D -> FAILED



The batch shall continue while the runtime remains healthy.



\---



\# 38. IDEMPOTENCE



Where practical, normalisation should be repeatable without creating divergent

representations from the same raw source result.



Given the same raw result and normalisation rules, repeated processing should

produce materially equivalent normalised output.



Normalisation must not introduce random values or non-deterministic identifiers

into the canonical intelligence fields.



\---



\# 39. DATA INTEGRITY



The normalisation process shall preserve the distinction between:



&#x20;   source evidence

&#x20;   normalised representation

&#x20;   derived interpretation



Normalisation itself is not permission to assert that a source claim is true.



It establishes a structured representation of what was collected.



\---



\# 40. FIRST REAL HARVEST RELATIONSHIP



The first controlled real harvest produced by PR-019B becomes the first real input

to PR-019C.



PR-019C shall therefore be capable of demonstrating:



&#x20;   REAL SOURCE

&#x20;       |

&#x20;       v

&#x20;   REAL ACQUIRED MATERIAL

&#x20;       |

&#x20;       v

&#x20;   NORMALISED RESULT

&#x20;       |

&#x20;       v

&#x20;   PR-019D PERSISTENCE



A synthetic PR-019B result shall not be used as evidence that the full MS-006

normalisation path is operational.



\---



\# 41. ACCEPTANCE CONDITIONS



PR-019C is accepted when:



1\. Raw results from PR-019B can be received.

2\. Source provenance is retained.

3\. Content type can be classified.

4\. Supported fields can be extracted.

5\. Fields can be normalised consistently.

6\. Source identifiers remain attributable.

7\. Supplier identifiers remain distinguishable.

8\. Part identifiers remain distinguishable.

9\. Prices retain currency context.

10\. Availability remains evidence-based.

11\. Unsupported values are not fabricated.

12\. Duplicate handling is controlled.

13\. Invalid results are rejected or failed observably.

14\. One malformed result does not terminate the complete batch.

15\. Normalisation metrics are observable.

16\. Normalised records are suitable for persistence.

17\. Persistence ownership remains downstream.

18\. Federation ownership remains downstream.

19\. The first real harvest can traverse the normalisation boundary.

20\. The normalised result remains traceable to the source evidence.



\---



\# 42. NON-CONDITIONS



PR-019C shall not be considered failed merely because:



\- one source uses an unsupported content structure;

\- one result is malformed;

\- one optional field is absent;

\- one source result contains no relevant intelligence;

\- one source-specific parser cannot extract a particular optional field.



These are result-level outcomes.



PR-019C fails when the normalisation boundary cannot reliably transform eligible

raw collection results into the established persistence-ready representation.



\---



\# 43. OUTPUT



The principal output of PR-019C is:



&#x20;   NORMALISED INTELLIGENCE RECORD SET



Each accepted record shall retain:



&#x20;   source

&#x20;   provenance

&#x20;   normalised fields

&#x20;   collection context

&#x20;   processing context



The output is suitable for:



&#x20;   PR-019D — Persistence



\---



\# 44. MS-006 TRANSITION



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

&#x20;   NORMALISED INTELLIGENCE RECORDS

&#x20;         |

&#x20;         v

&#x20;   PR-019D

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   PR-019E

&#x20;   Federation



PR-019C is therefore the transformation boundary between external source evidence

and persistence-ready JustDefenders intelligence records.



\---



\# 45. OUTCOME



PR-019C establishes the controlled result-normalisation capability required by MS-006.



Status:



&#x20;   PR-019C — RESULT NORMALISATION

&#x20;   STATUS: READY FOR PERSISTENCE



The next authorised engineering activity is:



&#x20;   PR-019D — PERSISTENCE



No additional architectural redesign is required by PR-019C.



\# ==================================================================================================

\# END OF PR-019C — RESULT NORMALISATION

\# ==================================================================================================

