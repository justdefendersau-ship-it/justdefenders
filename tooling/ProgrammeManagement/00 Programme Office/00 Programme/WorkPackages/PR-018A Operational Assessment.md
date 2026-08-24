\# ==================================================================================================

\#

\# JustDefenders Product Platform (JPP)

\#

\# PR-018A — OPERATIONAL ASSESSMENT

\#

\# Programme  : PP-001 — Product Platform

\# Milestone  : MS-006 — Operational Intelligence Baseline

\# Workstream : Harvester

\# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary

\#

\# Timestamp  : 14 August 2026

\#

\# ==================================================================================================



\# 1. PURPOSE



PR-018A establishes the operational assessment for the JustDefenders Harvester prior to

the first controlled real harvest.



The assessment exists to establish whether the recovered Harvester runtime, source

registry, discovery boundary, collection boundary, normalisation path, persistence

path and federation path provide a coherent implementation surface for MS-006.



PR-018A does not itself execute a real harvest.



The first controlled real harvest belongs to MS-006.



\---



\# 2. AUTHORITY



MS-005 establishes Harvester operational readiness and the controlled collection boundary.



MS-006 performs the first controlled real harvest.



The MS-006 delivery sequence is:



\- PR-018A — Operational Assessment

\- PR-018B — Harvester Commissioning

\- PR-019A — Source Discovery

\- PR-019B — Harvest Execution

\- PR-019C — Result Normalisation

\- PR-019D — Persistence

\- PR-019E — Federation



This artefact therefore establishes the implementation authority for the transition

from Harvester operational readiness into controlled real collection.



\---



\# 3. CURRENT OPERATIONAL BASELINE



The following conditions have been established prior to PR-018A:



\- Operational Service Host is operational.

\- Operational Service Host is running.

\- Operational Service Host scheduler is running.

\- Harvester is registered as a managed service.

\- Harvester registration contract has been checkpointed.

\- Harvester runtime is operational.

\- Harvester runtime reports HEALTHY.

\- Harvester runtime can be queried through its public status and health functions.

\- Harvester source registry exists.

\- Harvester source registration and source state functions exist.

\- Existing source discovery exists.

\- Existing normalisation exists.

\- Existing persistence exists.

\- Existing federation exists.



PR-001 checkpoint:



&#x20;   38e0157 — PR-001: complete Harvester registration contract



The PR-001 checkpoint established the Harvester registration contract and the

Operational Service Host registration contract.



\---



\# 4. ARCHITECTURAL ASSESSMENT



\## 4.1 Operational Service Host



The Operational Service Host remains the lifecycle and managed-service hosting boundary.



It is not the owner of source collection logic.



No change to the Operational Service Host ownership model is authorised by PR-018A.



\---



\## 4.2 Harvester Runtime



The Harvester Runtime remains responsible for Harvester runtime state and lifecycle

coordination.



The runtime state layer is not the owner of source acquisition.



No source collection implementation shall be placed into the runtime state layer merely

to satisfy MS-006.



\---



\## 4.3 Harvester Source Registry



The Harvester Source Registry remains responsible for:



\- source registration;

\- source discovery metadata;

\- source enablement;

\- source disablement;

\- source connection state;

\- source health state;

\- source execution statistics;

\- source failure recording;

\- source metrics.



The Source Registry is not itself the external collection engine.



The `Connected` state of a source shall not be interpreted as proof that external

source data has actually been acquired.



Real external acquisition must occur through the authorised collection boundary.



\---



\# 5. SOURCE DISCOVERY ASSESSMENT



The current source discovery mechanism is capable of enumerating configured source

information.



That capability is insufficient by itself to satisfy the intended MS-006 intelligence

collection model.



The MVP Harvester is required to support:



1\. known configured sources;

2\. discovery of additional candidate sources;

3\. qualification of candidate sources;

4\. controlled collection from authorised sources.



Source discovery must therefore remain separate from source collection.



A discovered source is a candidate until it satisfies the applicable collection

conditions.



Discovery shall not automatically imply collection authority.



\---



\# 6. COLLECTION BOUNDARY



The MS-006 collection boundary is:



&#x20;   Source Registry

&#x20;         |

&#x20;         v

&#x20;   Source Discovery

&#x20;         |

&#x20;         v

&#x20;   Candidate Source

&#x20;         |

&#x20;         v

&#x20;   Source Qualification

&#x20;         |

&#x20;         v

&#x20;   Collection Adapter

&#x20;         |

&#x20;         v

&#x20;   Raw Source Material

&#x20;         |

&#x20;         v

&#x20;   Result Normalisation

&#x20;         |

&#x20;         v

&#x20;   Persistence

&#x20;         |

&#x20;         v

&#x20;   Federation



The collection adapter is the boundary at which actual external source acquisition

occurs.



The collection adapter must remain replaceable and extensible.



The initial implementation shall not make the Harvester dependent upon a single

hard-coded source.



\---



\# 7. MULTI-SOURCE REQUIREMENT



The Harvester is a multi-source intelligence component.



The implementation shall support multiple known sources and the discovery of

additional relevant sources.



The implementation shall not reduce MS-006 to a single-site proof of concept.



Known sources shall be capable of entering the same collection pipeline as sources

discovered during operation.



The source model shall retain sufficient provenance to identify:



\- source;

\- source URL or endpoint;

\- discovery method;

\- discovery time;

\- collection time;

\- collection adapter;

\- collection result;

\- collection status.



\---



\# 8. COLLECTION ADAPTER REQUIREMENT



The collection implementation shall use an adapter boundary.



The initial adapter boundary shall permit future support for, at minimum:



\- web sources;

\- feeds;

\- APIs;

\- other authorised source mechanisms.



An adapter shall:



1\. receive an authorised source definition;

2\. establish whether the adapter supports that source;

3\. acquire the source material;

4\. return structured raw collection output;

5\. preserve source attribution;

6\. report collection status;

7\. report collection failures without corrupting downstream state.



An adapter shall not own:



\- managed-service lifecycle;

\- source registry state;

\- canonical persistence ownership;

\- federation ownership.



\---



\# 9. CONTROLLED COLLECTION REQUIREMENT



MS-006 shall not perform uncontrolled broad crawling.



Collection shall be bounded by the source and collection policy established by the

programme.



The collection implementation shall:



\- use bounded requests;

\- retain source attribution;

\- respect applicable source access controls;

\- avoid uncontrolled recursive crawling;

\- maintain collection limits;

\- expose collection failures;

\- prevent a single failing source from terminating the entire Harvester cycle.



Source discovery and collection must remain observable through runtime statistics.



\---



\# 10. RESULT CONTRACT



The collection boundary shall return structured raw results.



At minimum, the raw result shall be capable of identifying:



\- source;

\- source identifier;

\- source URL;

\- final URL where applicable;

\- collection timestamp;

\- adapter;

\- response status;

\- content type;

\- payload;

\- collection status;

\- error information where applicable.



The raw result is not itself the canonical intelligence record.



It is the input to PR-019C Result Normalisation.



\---



\# 11. NORMALISATION BOUNDARY



PR-018A confirms that normalisation remains downstream of collection.



The collection layer shall not silently replace or duplicate the canonical

normalisation layer.



The intended sequence is:



&#x20;   Raw Source Material

&#x20;           |

&#x20;           v

&#x20;   PR-019C Result Normalisation

&#x20;           |

&#x20;           v

&#x20;   Canonical Result

&#x20;           |

&#x20;           v

&#x20;   PR-019D Persistence



The collection layer therefore produces evidence for normalisation rather than

inventing final canonical records.



\---



\# 12. PERSISTENCE BOUNDARY



Persistence remains downstream of normalisation.



The collection implementation shall not directly become the owner of canonical

persistence state.



The intended sequence is:



&#x20;   Collection

&#x20;       |

&#x20;       v

&#x20;   Normalisation

&#x20;       |

&#x20;       v

&#x20;   Persistence



PR-019D remains responsible for the persistence stage of MS-006.



\---



\# 13. FEDERATION BOUNDARY



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



PR-019E remains responsible for the federation stage.



The collection engine shall not bypass the persistence boundary to publish

intelligence directly into federation.



\---



\# 14. FAILURE ISOLATION



A source failure shall not cause the entire Harvester cycle to fail unless the

runtime itself becomes unavailable.



Individual source results shall be independently classified.



Permitted source-level outcomes include:



\- EXECUTED

\- SKIPPED

\- FAILED



A source failure shall retain sufficient information to support diagnostics and

subsequent retry or remediation.



\---



\# 15. OBSERVABILITY



The Harvester shall retain operational visibility of collection activity.



At minimum the operational result must allow determination of:



\- number of configured sources;

\- number of discovered candidates;

\- number of collection attempts;

\- number of successful collections;

\- number of skipped collections;

\- number of failed collections;

\- records collected;

\- collection timestamp;

\- source-level failure information.



This information must remain compatible with the existing Harvester runtime

diagnostic and status surfaces.



\---



\# 16. IMPLEMENTATION DECISION



PR-018A establishes the following implementation decision:



\## AUTHORISED



The Harvester may proceed from managed-service operational readiness into

implementation of the MS-006 source discovery and collection boundary.



The implementation shall:



1\. preserve the existing managed-service architecture;

2\. preserve the Harvester Source Registry ownership boundary;

3\. preserve the Harvester Runtime ownership boundary;

4\. introduce a dedicated source discovery / collection implementation boundary;

5\. support multiple configured sources;

6\. support discovery of additional candidate sources;

7\. use pluggable collection adapters;

8\. produce structured raw collection results;

9\. feed existing normalisation;

10\. feed existing persistence;

11\. feed existing federation;

12\. preserve source provenance;

13\. isolate individual source failures.



\---



\# 17. NOT AUTHORISED



PR-018A does not authorise:



\- replacement of the Operational Service Host architecture;

\- replacement of the Harvester Runtime architecture;

\- conversion of the Source Registry into a collection engine;

\- direct persistence from an external connector;

\- direct federation from an external connector;

\- uncontrolled recursive crawling;

\- a single-source-only implementation;

\- synthetic results being represented as real external harvest results;

\- bypassing the existing normalisation boundary;

\- bypassing the existing persistence boundary;

\- bypassing the existing federation boundary.



\---



\# 18. MS-006 IMPLEMENTATION SURFACE



The implementation surface established by this assessment is:



\### Source / Discovery



&#x20;   Harvester source registry

&#x20;           +

&#x20;   Harvester source discovery / collection engine



\### Runtime Integration



&#x20;   server/platform/harvester-service.js



\### Downstream pipeline



&#x20;   Existing normalisation

&#x20;           |

&#x20;           v

&#x20;   Existing persistence

&#x20;           |

&#x20;           v

&#x20;   Existing federation



The implementation must preserve unchanged production behaviour outside the

authorised MS-006 surface.



\---



\# 19. DELIVERY SEQUENCE



Following PR-018A, implementation proceeds in the following order:



\## PR-018B — Harvester Commissioning



Establish the commissioned Harvester source/collection runtime boundary.



\## PR-019A — Source Discovery



Activate discovery of known and additional candidate sources.



\## PR-019B — Harvest Execution



Execute controlled real source collection through the collection adapter boundary.



\## PR-019C — Result Normalisation



Convert collected raw material into the established canonical result form.



\## PR-019D — Persistence



Persist normalised results through the existing persistence boundary.



\## PR-019E — Federation



Expose persisted intelligence through the established federation boundary.



\---



\# 20. FIRST REAL HARVEST



No real external harvest is performed by PR-018A.



PR-018A establishes the authority and implementation boundary.



The first controlled real harvest occurs only as part of:



&#x20;   MS-006

&#x20;   PR-019B — Harvest Execution



The first real harvest must produce evidence demonstrating:



&#x20;   Source discovered

&#x20;       ->

&#x20;   Source qualified

&#x20;       ->

&#x20;   Source collected

&#x20;       ->

&#x20;   Raw result obtained

&#x20;       ->

&#x20;   Result normalised

&#x20;       ->

&#x20;   Result persisted

&#x20;       ->

&#x20;   Result federated



This is the transition from Harvester operational readiness to actual

JustDefenders intelligence acquisition.



\---



\# 21. ACCEPTANCE CONDITIONS



PR-018A is accepted when:



\- the Harvester operational baseline remains intact;

\- the source registry remains the source-state owner;

\- source discovery and collection are separated;

\- a dedicated collection boundary exists;

\- multiple sources are supported;

\- additional candidate source discovery is supported;

\- collection adapters are pluggable;

\- raw collection output is structured;

\- provenance is retained;

\- normalisation remains downstream;

\- persistence remains downstream;

\- federation remains downstream;

\- source failures are isolated;

\- no real harvest is performed during the assessment itself.



\---



\# 22. PR-018A OUTCOME



PR-018A establishes the operational assessment required to proceed.



Outcome:



&#x20;   PR-018A — OPERATIONAL ASSESSMENT

&#x20;   STATUS: COMPLETE



The Harvester is operationally ready for controlled implementation of the

MS-006 source discovery and collection capability.



The next authorised engineering activity is:



&#x20;   PR-018B — HARVESTER COMMISSIONING



followed by:



&#x20;   PR-019A — SOURCE DISCOVERY

&#x20;   PR-019B — HARVEST EXECUTION

&#x20;   PR-019C — RESULT NORMALISATION

&#x20;   PR-019D — PERSISTENCE

&#x20;   PR-019E — FEDERATION



No additional architectural redesign is required by PR-018A.



\# ==================================================================================================

\# END OF PR-018A — OPERATIONAL ASSESSMENT

\# ==================================================================================================

