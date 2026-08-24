# ==================================================================================================
#
# JustDefenders Product Platform (JPP)
#
# PR-019A — SOURCE DISCOVERY
#
# Programme  : PP-001 — Product Platform
# Milestone  : MS-006 — Operational Intelligence Baseline
# Workstream : Harvester
# Predecessor: PR-018B — Harvester Commissioning
#
# Authority  : MS-005 / MS-006 Controlled Source and Collection Boundary
# Timestamp  : 14 August 2026
#
# ==================================================================================================

# 1. PURPOSE

PR-019A activates the commissioned Harvester source discovery capability established
by PR-018A and PR-018B.

The purpose of this work package is to establish the source set that will be supplied
to PR-019B — Harvest Execution.

Source discovery is responsible for finding and qualifying relevant intelligence
sources.

Source discovery is not responsible for performing the first controlled harvest.

The first controlled harvest remains the responsibility of:

    PR-019B — Harvest Execution

---

# 2. AUTHORITY

The authorised MS-006 execution sequence is:

    PR-018A — Operational Assessment
            |
            v
    PR-018B — Harvester Commissioning
            |
            v
    PR-019A — Source Discovery
            |
            v
    PR-019B — Harvest Execution
            |
            v
    PR-019C — Result Normalisation
            |
            v
    PR-019D — Persistence
            |
            v
    PR-019E — Federation

PR-019A therefore provides the source-discovery input to PR-019B.

---

# 3. DISCOVERY OBJECTIVE

The objective of PR-019A is to establish a controlled, multi-source collection
candidate set.

The candidate set shall contain:

- configured sources;
- known sources;
- newly discovered relevant sources;
- source provenance;
- source relevance information;
- source qualification state;
- collection eligibility.

The candidate set shall not contain uncontrolled or unqualified URLs merely because
they were encountered during discovery.

---

# 4. DISCOVERY MODEL

The Harvester source discovery process is:

    Configured Sources
            |
            v
    Source Inspection
            |
            +----------------------+
            |                      |
            v                      v
    Existing Source          Additional Sources
                                  |
                                  v
                           Candidate Discovery
                                  |
                                  v
                         Candidate Qualification
                                  |
                                  v
                           Collection Eligibility
                                  |
                                  v
                         PR-019B Harvest Execution

The discovery process must preserve the distinction between:

- discovered;
- qualified;
- authorised;
- collectible;
- collected.

These are separate states.

---

# 5. CONFIGURED SOURCES

Configured sources form the initial discovery input.

The discovery engine shall enumerate configured sources through the established
Harvester source boundary.

Configured sources shall not be assumed to be healthy merely because they are
registered.

Each configured source shall be inspected sufficiently to establish:

- source identity;
- source URL;
- source type;
- source availability;
- source relevance;
- source collection eligibility.

---

# 6. ADDITIONAL SOURCE DISCOVERY

The Harvester is required to actively identify additional relevant sources.

Additional discovery shall not be restricted to the existing supplier registry.

The discovery process may identify relevant:

- Defender community sites;
- Land Rover community sites;
- Defender forums;
- Land Rover forums;
- club sites;
- technical knowledge sites;
- parts suppliers;
- specialist suppliers;
- workshop information sources;
- relevant public information sources.

The purpose is to expand the intelligence source network while retaining controlled
qualification.

---

# 7. DISCOVERY METHODS

The discovery engine may identify candidate sources through:

- configured source inspection;
- source-page links;
- relevant same-origin links;
- relevant external links;
- sitemap locations;
- known source metadata;
- other authorised discovery mechanisms.

Each discovered candidate must retain its discovery method.

Example:

    discoveryMethod = configured
    discoveryMethod = source-link
    discoveryMethod = external-link
    discoveryMethod = sitemap

---

# 8. SOURCE PROVENANCE

Every candidate source shall retain provenance.

At minimum:

    sourceId
    sourceName
    sourceUrl
    discoveryMethod
    discoveredAt
    parentSource
    confidence
    status

Where a candidate was discovered from another source, the originating source shall
be retained as:

    parentSource

This permits the discovery graph to remain observable.

---

# 9. SOURCE RELEVANCE

Candidate sources shall be assessed for relevance to the JustDefenders intelligence
mission.

Relevant source indicators include:

- Land Rover content;
- Defender content;
- Defender model references;
- Defender technical information;
- Defender parts information;
- Defender maintenance information;
- Defender repair information;
- Land Rover community content;
- Land Rover club content;
- supplier content relevant to Defender vehicles.

Relevance is a qualification signal.

It is not by itself collection authorisation.

---

# 10. CANDIDATE QUALIFICATION

Each candidate source shall be capable of being classified as:

    CANDIDATE
    QUALIFIED
    REJECTED
    AUTHORISED

A candidate may only proceed to collection when it satisfies the applicable
collection conditions.

A rejected candidate shall not be silently collected.

---

# 11. COLLECTION ELIGIBILITY

A source is collection-eligible only when:

1. the source URL is valid;
2. the source type is supported;
3. an appropriate collection adapter exists;
4. the source is relevant;
5. the source is not explicitly prohibited;
6. the source satisfies applicable access restrictions;
7. the source is authorised for collection under the programme's controlled
   collection boundary.

Discovery alone does not establish collection eligibility.

---

# 12. ROBOTS AND ACCESS POLICY

Where applicable, discovery shall inspect the source's access policy before
presenting the source for collection.

The discovery layer shall retain sufficient information to determine whether
collection is permitted.

Where a source explicitly disallows the applicable collection path, the source shall
not be presented to PR-019B as collection-eligible.

Access restrictions shall be treated as source-level qualification information.

---

# 13. SAME-ORIGIN DISCOVERY

Same-origin discovery may be used to identify relevant sections of a known source.

Examples include:

    /forum
    /forums
    /community
    /club
    /defender
    /land-rover
    /parts
    /technical
    /workshop
    /knowledge
    /blog

Same-origin discovery shall remain bounded.

It shall not become uncontrolled recursive crawling.

---

# 14. EXTERNAL SOURCE DISCOVERY

Relevant external links may be promoted into candidate sources.

An external source candidate shall retain:

    parentSource

and:

    discoveryMethod = external-link

The external candidate must then pass normal qualification.

The discovery engine shall not automatically collect an external source merely
because it was linked from a trusted source.

---

# 15. SITEMAP DISCOVERY

Where available, sitemap information may be used to identify additional relevant
source locations.

Sitemap-derived candidates shall retain:

    discoveryMethod = sitemap

Sitemap discovery shall remain bounded by the configured discovery limits.

Sitemap discovery shall not imply that every sitemap entry is collectible.

---

# 16. DISCOVERY LIMITS

Discovery shall remain operationally bounded.

The discovery implementation shall support limits for:

- maximum discovery depth;
- maximum links inspected;
- maximum candidates retained;
- maximum source pages inspected;
- maximum request duration;
- maximum response size.

The limits exist to prevent an otherwise valid discovery operation from becoming an
uncontrolled crawler.

---

# 17. DUPLICATE CONTROL

Duplicate candidates shall be removed before the collection set is produced.

Candidate identity shall be based primarily on normalised source URL.

Where multiple discovery paths identify the same source:

- one source candidate shall be retained;
- the strongest available qualification information shall be retained;
- provenance shall remain available;
- discovery method shall remain observable.

---

# 18. SOURCE CONFIDENCE

Candidate sources may carry a confidence score.

Confidence may consider:

- source relevance;
- source URL characteristics;
- discovery method;
- source relationship;
- known Defender relevance;
- known supplier/community characteristics.

Confidence is an operational qualification signal.

It does not override explicit collection restrictions.

---

# 19. MULTI-SOURCE REQUIREMENT

PR-019A shall produce a multi-source candidate set.

The implementation shall not:

- stop after finding one source;
- replace the existing source set with one newly discovered source;
- require manual source replacement;
- assume that one supplier is the complete intelligence network.

Multiple sources must remain independently represented.

---

# 20. DISCOVERY RESULT CONTRACT

PR-019A shall produce a structured discovery result.

The result shall be capable of representing:

    discoveredAt
    configuredSources
    sources
    sourceResults
    summary

Each source candidate shall be capable of representing:

    id
    name
    url
    sourceType
    discoveryMethod
    confidence
    discoveredAt
    parentSource
    status

---

# 21. DISCOVERY SUMMARY

The discovery result shall expose, at minimum:

    configured
    candidates
    externalCandidates
    sitemapCandidates

Where appropriate, additional discovery statistics may be exposed without changing
the established contract.

---

# 22. DISCOVERY FAILURE ISOLATION

A failure inspecting one source shall not terminate discovery of all other sources.

Source-level discovery outcomes shall remain independently observable.

Permitted source-level outcomes include:

    DISCOVERED
    QUALIFIED
    REJECTED
    FAILED

The overall discovery operation shall continue where the runtime remains healthy.

---

# 23. DISCOVERY AND COLLECTION SEPARATION

PR-019A shall not perform the first real harvest.

Its responsibility ends when it has produced the collection candidate set.

The boundary is:

    PR-019A
    Source Discovery
          |
          v
    Qualified Collection Candidates
          |
          v
    PR-019B
    Harvest Execution

This separation is mandatory.

---

# 24. HAND-OFF TO PR-019B

The output of PR-019A shall be suitable for direct consumption by PR-019B.

PR-019B shall receive candidates containing sufficient information to:

- identify the source;
- identify the source URL;
- identify the source type;
- identify the discovery provenance;
- determine collection eligibility;
- select an appropriate adapter.

PR-019B shall not need to rediscover the source merely to execute collection.

---

# 25. NO SYNTHETIC COLLECTION

PR-019A shall not manufacture collection results.

The following are not discovery evidence:

- `recordsCollected = 1`;
- synthetic product records;
- copied supplier metadata presented as harvested content;
- a successful source registration;
- a successful source connection state.

PR-019A establishes source candidates.

PR-019B acquires actual source material.

---

# 26. OBSERVABILITY

The discovery operation shall expose sufficient information to determine:

- when discovery occurred;
- which configured sources were inspected;
- how many candidates were found;
- how many external candidates were found;
- how many sitemap candidates were found;
- which sources failed;
- which candidates were rejected;
- which candidates were eligible for collection.

This information shall remain available to Harvester operational diagnostics.

---

# 27. SOURCE NETWORK GROWTH

The discovery system is intentionally capable of expanding the Harvester's source
network over time.

The intended model is:

    Known Sources
         |
         v
    Discover Related Sources
         |
         v
    Qualify Candidates
         |
         v
    Add Eligible Sources
         |
         v
    Future Discovery Cycles

Source-network growth remains controlled.

Discovery must not create an unbounded accumulation of arbitrary URLs.

---

# 28. SOURCE REGISTRY INTEGRATION

PR-019A shall not bypass the existing Source Registry.

Where a candidate is accepted into the operational source set, its registration
state shall remain represented through the established source registry boundary.

The registry remains the source-state owner.

The discovery engine remains the discovery owner.

---

# 29. RUNTIME INTEGRATION

PR-019A shall execute through the commissioned Harvester runtime.

The Harvester runtime remains responsible for:

- lifecycle;
- execution state;
- health;
- metrics;
- timestamps;
- operational status.

The discovery engine remains responsible for:

- source discovery;
- candidate construction;
- qualification;
- discovery results.

---

# 30. ACCEPTANCE CONDITIONS

PR-019A is accepted when:

1. Configured sources can be enumerated.
2. Configured sources can be inspected.
3. Additional relevant sources can be discovered.
4. Discovery provenance is retained.
5. Candidate source identity is retained.
6. Candidate relevance can be assessed.
7. Candidate qualification exists.
8. Collection eligibility is distinct from discovery.
9. Multiple sources are supported.
10. Duplicate candidates are controlled.
11. Discovery is bounded.
12. Source access restrictions are respected.
13. Source-level discovery failures are isolated.
14. Discovery results are structured.
15. The result can be handed to PR-019B.
16. PR-019A does not perform the first real harvest.
17. No synthetic collection results are generated.

---

# 31. PR-019A OUTPUT

The principal output of PR-019A is:

    QUALIFIED SOURCE CANDIDATE SET

The output shall contain the sources that PR-019B is authorised to consider for
controlled collection.

The output is not itself a harvested intelligence dataset.

---

# 32. NEXT AUTHORISED WORK

Upon successful completion of PR-019A, the next authorised activity is:

# PR-019B — HARVEST EXECUTION

PR-019B shall:

- receive the qualified source candidate set;
- select the appropriate collection adapter;
- perform controlled external acquisition;
- produce real raw source results;
- preserve source provenance;
- isolate source failures;
- hand raw results to PR-019C.

---

# 33. MS-006 TRANSITION

The transition is:

    PR-018B
    Harvester Commissioning
            |
            v
    PR-019A
    Source Discovery
            |
            v
    QUALIFIED SOURCE SET
            |
            v
    PR-019B
    Harvest Execution
            |
            v
    REAL RAW SOURCE RESULTS
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

The first actual external acquisition occurs in PR-019B.

---

# 34. OUTCOME

PR-019A establishes the controlled source discovery capability required for MS-006.

Status:

    PR-019A — SOURCE DISCOVERY
    STATUS: READY FOR CONTROLLED HARVEST EXECUTION

The Harvester has a qualified multi-source candidate boundary.

The next authorised engineering activity is:

    PR-019B — HARVEST EXECUTION

No additional architectural redesign is required by PR-019A.

# ==================================================================================================
# END OF PR-019A — SOURCE DISCOVERY
# ==================================================================================================