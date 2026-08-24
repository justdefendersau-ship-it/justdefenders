\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# PR-019B — HARVEST EXECUTION

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\# Predecessor: PR-019A — Source Discovery

\#

\# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



PR-019B establishes the controlled real source-collection execution stage of MS-006.



PR-019A established the qualified source candidate set.



PR-019B consumes that candidate set and performs actual external source acquisition

through the commissioned Harvester collection boundary.



This is the first stage in the MS-006 sequence authorised to perform real external

harvesting.



PR-019B does not own result normalisation, canonical persistence, or federation.



Those responsibilities remain downstream:



&#x20;   PR-019C — Result Normalisation

&#x20;   PR-019D — Persistence

&#x20;   PR-019E — Federation



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



PR-019B therefore represents the transition from source discovery into actual

external intelligence acquisition.



\---



\# 3. PREDECESSOR



PR-019A — Source Discovery



PR-019A establishes:



\- configured source enumeration;

\- additional source discovery;

\- candidate source identity;

\- source provenance;

\- candidate qualification;

\- collection eligibility;

\- multi-source source-set construction.



PR-019B shall consume that source set.



PR-019B shall not silently replace the discovery process with an unrelated source

list.



\---



\# 4. HARVEST EXECUTION OBJECTIVE



The objective of PR-019B is to:



1\. receive qualified sources;

2\. determine the appropriate collection adapter;

3\. perform controlled external acquisition;

4\. capture the actual source response;

5\. preserve source provenance;

6\. classify the collection result;

7\. isolate source-level failures;

8\. produce structured raw results;

9\. pass those results to PR-019C.



The result must represent actual acquired source material.



Synthetic records shall not be represented as harvested intelligence.



\---



\# 5. EXECUTION BOUNDARY



The execution boundary is:



&#x20;   Qualified Source

&#x20;         |

&#x20;         v

&#x20;   Collection Adapter

&#x20;         |

&#x20;         v

&#x20;   External Source

&#x20;         |

&#x20;         v

&#x20;   Raw Source Material

&#x20;         |

&#x20;         v

&#x20;   Structured Raw Result

&#x20;         |

&#x20;         v

&#x20;   PR-019C Result Normalisation



The collection adapter is the owner of external acquisition.



The Harvester runtime remains the owner of runtime execution state.



The Source Registry remains the owner of source state.



\---



\# 6. REAL HARVEST REQUIREMENT



PR-019B is the first authorised work package to perform real external collection.



A successful harvest execution must involve actual acquisition from the configured

or qualified external source.



The following do not constitute a real harvest:



\- synthetic records;

\- hard-coded result objects;

\- incrementing collection counters without acquisition;

\- copying source metadata into result records;

\- returning source configuration as harvested content;

\- treating source registration as collection;

\- treating source health as collection;

\- treating a successful HTTP request for a non-source control endpoint as

&#x20; intelligence collection.



A real harvest result must be traceable to an actual source acquisition.



\---



\# 7. SOURCE INPUT



PR-019B receives the qualified source candidate set produced by PR-019A.



Each collection candidate must retain sufficient information to identify:



\- source;

\- source identifier;

\- source URL;

\- source type;

\- source provenance;

\- discovery method;

\- qualification state;

\- collection eligibility.



The execution engine shall reject candidates that do not satisfy the minimum

collection contract.



\---



\# 8. ADAPTER SELECTION



The collection engine shall select an adapter appropriate to the source type.



The adapter boundary shall support extension without changing the Harvester

managed-service architecture.



Possible adapter classes include:



\- web;

\- feed;

\- API;

\- other authorised source mechanisms.



An unsupported source type shall produce a source-level `SKIPPED` or `FAILED`

outcome according to the applicable error condition.



Unsupported sources shall not terminate the complete harvest cycle.



\---



\# 9. WEB COLLECTION



Where the selected adapter is a web collection adapter, it shall:



1\. establish the source URL;

2\. perform bounded retrieval;

3\. capture the response;

4\. record response metadata;

5\. preserve the final URL where redirects occur;

6\. capture the content type;

7\. capture the response status;

8\. preserve the acquired payload;

9\. return a structured raw result.



The web adapter shall not silently transform the payload into canonical intelligence.



That responsibility belongs to PR-019C.



\---



\# 10. SOURCE ACCESS



Collection shall remain subject to applicable source access controls.



Where applicable, the collection engine shall:



\- identify the Harvester appropriately;

\- observe source access policy;

\- respect disallowed collection paths;

\- avoid unrestricted recursive traversal;

\- apply configured request limits;

\- stop collection when the source is not eligible.



Discovery does not override source access restrictions.



Qualification does not override source access restrictions.



\---



\# 11. BOUNDED EXECUTION



Each source collection operation shall be bounded.



The execution engine shall support limits for:



\- request timeout;

\- response size;

\- number of collection requests;

\- collection depth where applicable;

\- maximum source result count;

\- overall execution duration.



A source must not be permitted to consume unlimited runtime resources.



\---



\# 12. MULTI-SOURCE EXECUTION



PR-019B shall execute against multiple qualified sources.



The engine shall not:



\- stop after the first successful source;

\- replace the complete source set with one source;

\- require manual URL replacement between sources;

\- treat one supplier as the complete collection network.



Each source shall have an independent execution outcome.



The collection cycle shall continue while the Harvester runtime remains healthy.



\---



\# 13. SOURCE EXECUTION STATES



Each collection attempt shall produce an observable outcome.



Permitted outcomes are:



&#x20;   EXECUTED

&#x20;   SKIPPED

&#x20;   FAILED



`EXECUTED` means the collection adapter performed an acquisition attempt and

returned a collection result.



`SKIPPED` means the source was not collected because it did not satisfy the

execution conditions.



`FAILED` means the source was eligible for collection but acquisition failed.



A source execution state shall not be confused with Harvester runtime health.



\---



\# 14. RAW COLLECTION RESULT



Each execution result shall be capable of representing:



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



Where a source returns no usable content, the result shall still preserve the

collection outcome and diagnostic information.



\---



\# 15. SOURCE PROVENANCE



Every raw collection result must preserve provenance.



At minimum:



&#x20;   sourceId

&#x20;   sourceUrl

&#x20;   sourceName

&#x20;   discoveryMethod

&#x20;   parentSource

&#x20;   adapter

&#x20;   capturedAt



Where the source was discovered through another source, that relationship shall

remain available.



The provenance must survive the transition into PR-019C.



\---



\# 16. RESPONSE METADATA



Where available, the collection adapter shall capture:



\- HTTP status;

\- content type;

\- response URL;

\- response timestamp;

\- content length;

\- relevant response headers required for diagnostics.



The adapter shall avoid storing unnecessary sensitive response metadata.



Only metadata required for operational traceability and downstream processing

should be retained.



\---



\# 17. CONTENT HANDLING



The collection engine shall preserve acquired content sufficiently for downstream

normalisation.



The collection engine shall not assume that every source uses the same content

format.



Supported content formats may include:



\- HTML;

\- JSON;

\- XML;

\- RSS;

\- Atom;

\- other authorised structured source formats.



Unsupported content shall produce an observable source-level outcome rather than

causing an uncontrolled runtime failure.



\---



\# 18. SOURCE-LEVEL FAILURE ISOLATION



A source failure shall not terminate the complete harvest cycle.



For example:



&#x20;   Source A -> EXECUTED

&#x20;   Source B -> FAILED

&#x20;   Source C -> EXECUTED

&#x20;   Source D -> SKIPPED



The overall Harvester cycle remains operational.



The failed source remains observable for later diagnostics or retry.



\---



\# 19. RETRY POLICY



Retries shall be bounded.



The implementation may retry transient failures where appropriate.



Retries must not create uncontrolled request loops.



A source that continues to fail after the configured retry boundary shall be

classified as `FAILED`.



The source failure shall remain available to the diagnostic layer.



\---



\# 20. DUPLICATE CONTROL



The execution layer shall avoid unnecessary duplicate collection.



Where the same source is represented more than once in the execution set:



\- source identity shall be normalised;

\- duplicate execution shall be prevented where possible;

\- provenance shall remain available.



The same source must not be repeatedly collected merely because it was discovered

through multiple paths.



\---



\# 21. COLLECTION CYCLE



A controlled collection cycle is:



&#x20;   Load Qualified Sources

&#x20;           |

&#x20;           v

&#x20;   Validate Collection Eligibility

&#x20;           |

&#x20;           v

&#x20;   Select Adapter

&#x20;           |

&#x20;           v

&#x20;   Execute Acquisition

&#x20;           |

&#x20;           v

&#x20;   Capture Raw Result

&#x20;           |

&#x20;           v

&#x20;   Record Source Outcome

&#x20;           |

&#x20;           v

&#x20;   Continue Next Source

&#x20;           |

&#x20;           v

&#x20;   Produce Harvest Batch

&#x20;           |

&#x20;           v

&#x20;   PR-019C Result Normalisation



The cycle must continue through all eligible sources unless the Harvester runtime

itself becomes unavailable.



\---



\# 22. HARVEST BATCH



PR-019B shall group collection results into an observable harvest batch.



The batch shall be capable of identifying:



&#x20;   batchId

&#x20;   startedAt

&#x20;   completedAt

&#x20;   sourceCount

&#x20;   attemptedCount

&#x20;   executedCount

&#x20;   skippedCount

&#x20;   failedCount

&#x20;   results



The batch represents a collection execution event.



It is not the canonical intelligence dataset.



\---



\# 23. HARVEST METRICS



The Harvester shall expose operational metrics sufficient to establish that a real

collection occurred.



At minimum:



&#x20;   sourcesAvailable

&#x20;   sourcesAttempted

&#x20;   sourcesExecuted

&#x20;   sourcesSkipped

&#x20;   sourcesFailed

&#x20;   resultsCollected

&#x20;   lastHarvestAt



Where possible, metrics shall distinguish:



\- source attempts;

\- successful acquisitions;

\- empty responses;

\- failed acquisitions.



Counters shall only be incremented in response to genuine execution outcomes.



\---



\# 24. REAL COLLECTION EVIDENCE



A successful PR-019B execution shall produce evidence capable of establishing:



1\. which source was selected;

2\. when acquisition occurred;

3\. which adapter performed acquisition;

4\. whether an external response was received;

5\. what response type was received;

6\. whether content was captured;

7\. what the collection outcome was.



This evidence is required before the MS-006 first real harvest can be considered

executed.



\---



\# 25. NO FALSE SUCCESS



The implementation shall not report successful collection when:



\- the source was never contacted;

\- the request failed;

\- the source was skipped;

\- the adapter was unavailable;

\- the response could not be acquired;

\- only source metadata was returned;

\- synthetic data was generated.



`EXECUTED` and `FAILED` must represent genuine execution outcomes.



\---



\# 26. RUNTIME INTEGRATION



PR-019B executes through the commissioned Harvester runtime.



The runtime remains responsible for:



\- lifecycle;

\- running state;

\- paused state;

\- health;

\- heartbeat;

\- execution timestamps;

\- operational counters.



The collection engine remains responsible for source acquisition.



The collection engine must not replace the Harvester runtime state model.



\---



\# 27. MANAGED SERVICE INTEGRATION



The Harvester remains a managed service of the Operational Service Host.



PR-019B shall not:



\- create a second Harvester service;

\- bypass the managed-service lifecycle;

\- create an independent daemon;

\- replace the Operational Service Host;

\- alter unrelated managed services.



The collection engine is a capability of the existing Harvester managed service.



\---



\# 28. SCHEDULER INTEGRATION



Where collection is invoked through the Harvester scheduler, the scheduler shall

trigger the established Harvester execution path.



Scheduler ownership remains separate from source acquisition.



The scheduler determines when an execution occurs.



The collection engine determines what qualified sources are collected.



\---



\# 29. NORMALISATION HAND-OFF



PR-019B terminates its primary responsibility at the raw-result boundary.



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



PR-019B shall not silently perform canonical normalisation.



\---



\# 30. PERSISTENCE HAND-OFF



Persistence remains downstream.



The intended sequence is:



&#x20;   Raw Collection

&#x20;         |

&#x20;         v

&#x20;   Normalisation

&#x20;         |

&#x20;         v

&#x20;   Persistence



PR-019B shall not bypass PR-019C to write canonical intelligence directly into

persistent storage.



\---



\# 31. FEDERATION HAND-OFF



Federation remains downstream of persistence.



The intended sequence is:



&#x20;   Raw Collection

&#x20;         |

&#x20;         v

&#x20;   Normalisation

&#x20;         |

&#x20;         v

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   Federation



PR-019B shall not publish raw external source material directly into federation.



\---



\# 32. SOURCE DISCOVERY FEEDBACK



Where execution identifies useful source relationships, the result may provide

feedback to the discovery layer.



For example:



&#x20;   collected source

&#x20;         |

&#x20;         v

&#x20;   relevant external link

&#x20;         |

&#x20;         v

&#x20;   candidate source

&#x20;         |

&#x20;         v

&#x20;   future PR-019A discovery



This feedback must remain controlled.



Collection shall not recursively convert every encountered link into an active

collection target.



\---



\# 33. SOURCE NETWORK EXPANSION



The Harvester is intended to grow its source network.



PR-019B therefore supports the longer-term model:



&#x20;   Discover

&#x20;      |

&#x20;      v

&#x20;   Qualify

&#x20;      |

&#x20;      v

&#x20;   Collect

&#x20;      |

&#x20;      v

&#x20;   Extract useful relationships

&#x20;      |

&#x20;      v

&#x20;   Discover additional sources

&#x20;      |

&#x20;      v

&#x20;   Qualify

&#x20;      |

&#x20;      v

&#x20;   Collect



This cycle remains governed by the source discovery and collection boundaries.



\---



\# 34. COLLECTION SAFETY



The execution engine shall fail safely.



It shall:



\- enforce request limits;

\- enforce response limits;

\- isolate source failures;

\- preserve runtime health;

\- preserve source provenance;

\- avoid uncontrolled recursion;

\- avoid uncontrolled retries;

\- avoid uncontrolled concurrency.



A hostile or malformed source response shall not be permitted to compromise the

Harvester runtime.



\---



\# 35. COLLECTION CONCURRENCY



The initial implementation may execute sources sequentially where that provides

the safest operational baseline.



Parallel execution may be introduced only where bounded concurrency can be

maintained.



Concurrency shall not be allowed to defeat:



\- request limits;

\- source isolation;

\- runtime stability;

\- diagnostics;

\- persistence ordering requirements.



\---



\# 36. HARVEST COMPLETION



A harvest cycle is complete when all eligible source execution attempts have

reached an observable terminal state:



&#x20;   EXECUTED

&#x20;   SKIPPED

&#x20;   FAILED



The cycle shall record:



&#x20;   startedAt

&#x20;   completedAt

&#x20;   sourceCount

&#x20;   attemptedCount

&#x20;   executedCount

&#x20;   skippedCount

&#x20;   failedCount



The completion state must remain observable through the Harvester runtime.



\---



\# 37. FIRST CONTROLLED REAL HARVEST



PR-019B is the authorised stage for the first controlled real harvest.



The first execution shall:



1\. use the qualified source set;

2\. perform actual external acquisition;

3\. capture real source material;

4\. preserve source provenance;

5\. produce structured raw results;

6\. record source-level outcomes;

7\. expose harvest metrics;

8\. hand results to PR-019C.



The first harvest shall not be represented as complete merely because the Harvester

service is running.



\---



\# 38. FIRST HARVEST ACCEPTANCE



The first controlled real harvest is accepted when at least one eligible source has

produced a genuine external acquisition result and that result is observable at the

raw collection boundary.



Where multiple eligible sources are available, the execution shall continue through

the qualified source set subject to source-level limits and failures.



A single source failure does not invalidate successful acquisition from other

eligible sources.



\---



\# 39. PR-019B ACCEPTANCE CONDITIONS



PR-019B is accepted when:



1\. A qualified source set can be received from PR-019A.

2\. Collection eligibility is enforced.

3\. An appropriate collection adapter can be selected.

4\. Actual external acquisition can occur.

5\. Multiple sources can be processed.

6\. Source provenance is retained.

7\. Raw source material is captured.

8\. Structured raw results are produced.

9\. Source-level outcomes are recorded.

10\. Source-level failures are isolated.

11\. Collection is bounded.

12\. Retries are bounded.

13\. Duplicate execution is controlled.

14\. Harvest metrics are observable.

15\. False successful collection is prevented.

16\. The existing Harvester runtime remains operational.

17\. The existing managed-service boundary remains intact.

18\. Results can be handed to PR-019C.

19\. Canonical persistence is not bypassed.

20\. Federation is not bypassed.

21\. The first real harvest is demonstrably based on external source acquisition.



\---



\# 40. NON-CONDITIONS



PR-019B shall not be considered failed merely because:



\- one source is unavailable;

\- one source rejects collection;

\- one source returns no relevant content;

\- one source returns malformed content;

\- one adapter reports a source-level failure;

\- one discovered candidate is no longer reachable.



These are source-level outcomes.



PR-019B fails when the Harvester cannot perform controlled external acquisition

through its commissioned collection boundary.



\---



\# 41. FIRST HARVEST EVIDENCE



The first harvest shall leave sufficient evidence to establish:



&#x20;   HARVEST BATCH

&#x20;   SOURCE

&#x20;   ADAPTER

&#x20;   REQUEST / ACQUISITION TIME

&#x20;   RESPONSE STATUS

&#x20;   CONTENT TYPE

&#x20;   RAW RESULT

&#x20;   COLLECTION OUTCOME



This evidence becomes the basis for the downstream normalisation and persistence

stages.



\---



\# 42. MS-006 TRANSITION



The operational transition is:



&#x20;   PR-019A

&#x20;   Source Discovery

&#x20;         |

&#x20;         v

&#x20;   QUALIFIED SOURCE SET

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

&#x20;   PR-019D

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   PR-019E

&#x20;   Federation



PR-019B therefore represents the first actual acquisition boundary of MS-006.



\---



\# 43. OUTCOME



PR-019B establishes the controlled real source-collection execution capability

required by MS-006.



Status:



&#x20;   PR-019B — HARVEST EXECUTION

&#x20;   STATUS: READY FOR FIRST CONTROLLED REAL HARVEST



The next authorised activity after successful PR-019B execution is:



&#x20;   PR-019C — RESULT NORMALISATION



The first controlled real harvest must produce actual source-acquisition evidence

before PR-019C is treated as having received a real harvest result.



\# ==================================================================================================

\# END OF PR-019B — HARVEST EXECUTION

\# ==================================================================================================

