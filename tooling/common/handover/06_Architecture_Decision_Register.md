<!--

===============================================================================

JustDefenders© Engineering Governance Framework

===============================================================================



File:

C:\\dev\\justdefenders\\frontend\\tooling\\common\\handover\\

06\_Architecture\_Decision\_Register.md



Document:

Architecture Decision Register



Author:

Simon Barclay



Platform:

JustDefenders



Classification:

Architecture



Document Type:

Normative



Status:

Authoritative



Work Package:

WP-000A – Engineering Governance Hardening



Version:

2.0.0



Timestamp:

2nd July 2026, 16:15 AEST



Copyright © 2026 JustDefenders.

All Rights Reserved.



===============================================================================

\-->



\# 06 – Architecture Decision Register



\## Authoritative Architectural Decisions



\---



\# Purpose



The Architecture Decision Register (ADR) records significant architectural

decisions affecting the JustDefenders Platform.



Each Architecture Decision Record documents the engineering context, decision,

alternatives considered and long-term consequences associated with a major

architectural change.



The ADR Register preserves engineering rationale independently of source code,

ensuring future engineers understand not only what was implemented, but why

the implementation was chosen.



\---



\# Scope



The ADR Register records decisions relating to:



\- platform architecture

\- engineering governance

\- repository structure

\- validation architecture

\- security architecture

\- deployment architecture

\- operational architecture

\- engineering workflow

\- documentation architecture



Routine implementation decisions shall not normally require an ADR.



\---



\# Architecture Decision Principles



Architecture shall evolve deliberately rather than accidentally.



Every significant architectural decision shall remain:



\- documented

\- reviewable

\- traceable

\- recoverable

\- evidence-based



Architecture shall support long-term maintainability and operational

continuity.



\---



\# ADR Lifecycle



Each Architecture Decision Record progresses through the following lifecycle.



1\. Proposed

2\. Under Review

3\. Accepted

4\. Implemented

5\. Superseded (if applicable)

6\. Archived (if applicable)



The status of each ADR shall be clearly identified.



\---



\# Architecture Decision Format



Every ADR shall include:



\- Decision Identifier

\- Status

\- Date

\- Work Package

\- Context

\- Decision

\- Alternatives Considered

\- Consequences

\- Related Documents

\- Related Git Commit

\- Related Git Tag



This structure provides complete engineering traceability.



\---



\# ADR-0001



\## Engineering Governance Becomes Part of the Production Platform



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



The JustDefenders Platform had evolved beyond a traditional software project.



Engineering governance, documentation quality and project recoverability had

become essential platform capabilities.



Existing engineering knowledge required permanent preservation independent of

individual development sessions.



\### Decision



Engineering governance shall be considered part of the production platform.



Governance documentation shall therefore be engineered, version controlled,

validated and maintained with the same discipline as production source code.



\-------------------------------------------------------------------------------

Continues in Part 2

\-------------------------------------------------------------------------------



\# ADR-0001 (Continued)



\### Alternatives Considered



\- Continue treating governance as informal project documentation.

\- Maintain governance solely within conversation history.

\- Separate governance from the production repository.



These alternatives were rejected because they reduced long-term

recoverability, traceability and engineering continuity.



\### Consequences



The Engineering Handover becomes a governed production subsystem.



Engineering governance shall evolve through controlled Work Packages and

remain subject to the same review and version control processes as production

code.



\### Related Documents



\- 05\_AI\_Engineering\_Protocol.md

\- 10\_Engineering\_Change\_Log.md

\- 99\_Document\_Standards.md



\### Related Git Commit



64bce3b



\### Related Git Tag



WP000A\_PROTOCOL\_V2



\---



\# ADR-0002



\## The Engineering Handover Becomes the Operational Knowledge Base



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



Critical engineering knowledge had become distributed across engineering

sessions, temporary notes and implementation discussions.



This reduced recoverability and increased engineering risk.



\### Decision



The Engineering Handover shall become the authoritative operational knowledge

base for the JustDefenders Platform.



Permanent engineering knowledge shall be transferred into the Handover rather

than remaining within transient development conversations.



\### Alternatives Considered



\- Continue relying primarily upon conversation history.

\- Record only implementation details within Git.

\- Maintain informal engineering notes.



These alternatives were rejected because they do not provide durable

institutional knowledge.



\### Consequences



Engineering continuity becomes independent of individual contributors.



Future engineers shall be capable of understanding the platform through the

combination of:



\- Engineering Handover

\- Git Repository

\- Architecture Decision Register



\### Related Documents



\- 01\_Master\_Handover.md

\- 07\_Rediscovered\_Platform\_Knowledge.md

\- CURRENT\_STATE.md



\### Related Git Commit



64bce3b



\### Related Git Tag



WP000A\_PROTOCOL\_V2



\---



\# ADR-0003



\## Governance-First Engineering



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



As the JustDefenders Platform increased in scale and complexity, consistent

engineering practices became essential to maintain quality, recoverability and

long-term maintainability.



\### Decision



Engineering governance shall precede implementation.



Work Packages shall be planned, documented, validated and checkpointed before

being considered complete.



\### Alternatives Considered



\- Feature-driven engineering.

\- Conversation-driven engineering.

\- Documentation after implementation.



These approaches were rejected because they increase engineering debt and

reduce project continuity.



\### Consequences



Engineering governance becomes the framework within which all future

implementation is performed.



The Engineering Protocol becomes the authoritative governance document for the

platform.



\### Related Documents



\- 05\_AI\_Engineering\_Protocol.md

\- 08\_Work\_Package\_Register.md

\- 10\_Engineering\_Change\_Log.md



\### Related Git Commit



64bce3b



\### Related Git Tag



WP000A\_PROTOCOL\_V2



\-------------------------------------------------------------------------------

Continues in Part 3

\-------------------------------------------------------------------------------



\# ADR-0004



\## Recover Before Rewrite



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



Engineering recovery activities throughout the Alpha programme demonstrated

that valuable engineering assets were frequently recoverable despite appearing

to require complete replacement.



Premature rewrites increased engineering effort, reduced traceability and

risked the permanent loss of engineering knowledge.



\### Decision



Existing production implementation shall always be evaluated for recovery

before replacement is authorised.



Recovery shall be considered the default engineering strategy.



Replacement shall occur only where:



\- recovery is technically impractical

\- replacement has demonstrable engineering benefit

\- architectural approval has been recorded



\### Alternatives Considered



\- Rewrite damaged modules immediately.

\- Replace incomplete implementation without investigation.

\- Ignore engineering history during recovery.



These alternatives were rejected because they unnecessarily discard proven

implementation and engineering knowledge.



\### Consequences



Engineering recovery becomes the preferred strategy throughout the platform.



Repository history and existing implementation shall remain primary sources of

engineering evidence.



\### Related Documents



\- 02\_Platform\_Recovery.md

\- 05\_AI\_Engineering\_Protocol.md

\- 10\_Engineering\_Change\_Log.md



\### Related Git Commit



64bce3b



\### Related Git Tag



WP000A\_PROTOCOL\_V2



\---



\# ADR-0005



\## Platform Memory Established



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



Long-term engineering continuity depends upon preserving implementation,

operational knowledge and engineering rationale independently of individual

contributors.



The project therefore required a formal architectural model describing how

engineering knowledge is retained.



\### Decision



The JustDefenders Platform shall maintain three permanent forms of Platform

Memory.



Repository Memory



\- Source code

\- Git history

\- Git tags

\- Engineering baselines



Operational Memory



\- Engineering Handover

\- Operational documentation

\- Recovery documentation



Engineering Memory



\- Architecture Decision Register

\- Engineering Change Log

\- Work Package Register

\- CURRENT\_STATE

\- Validation artefacts



Together these form the enduring institutional knowledge of the platform.



\### Alternatives Considered



\- Repository history alone.

\- Documentation without engineering rationale.

\- Conversation-based engineering knowledge.



These alternatives were rejected because no single artefact preserves all

engineering knowledge required for long-term continuity.



\### Consequences



Platform Memory becomes a permanent architectural concept supporting future

engineering, recovery and project handover.



\### Related Documents



\- 11\_Project\_DNA.md

\- 10\_Engineering\_Change\_Log.md

\- CURRENT\_STATE.md



\### Related Git Commit



3e203e9



\### Related Git Tag



WP000A\_PROJECT\_DNA\_V2



\---



\# ADR-0006



\## Mandatory Engineering Checkpoints



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



Engineering work had previously relied upon periodic repository snapshots,

creating the possibility that significant completed work could exist outside

authoritative repository history.



\### Decision



Every significant engineering milestone shall conclude with:



\- Engineering review

\- Git checkpoint

\- Git tag where appropriate

\- Documentation update

\- Safe engineering restart point



Engineering completion is not achieved until checkpointed.



\### Alternatives Considered



\- End-of-day commits.

\- Feature-only commits.

\- Documentation updates without repository checkpoints.



These alternatives were rejected because they reduce engineering

recoverability and increase project risk.



\### Consequences



Repository history becomes a reliable sequence of recoverable engineering

milestones rather than an inconsistent record of implementation.



\### Related Documents



\- 05\_AI\_Engineering\_Protocol.md

\- 99\_Document\_Standards.md

\- 10\_Engineering\_Change\_Log.md



\### Related Git Commit



0dcbce6



\### Related Git Tag



WP000A\_DOCUMENT\_STANDARDS\_V2



\-------------------------------------------------------------------------------

Continues in Final Part

\-------------------------------------------------------------------------------



\# ADR-0007



\## Documentation as a Production Asset



\### Status



Accepted



\### Date



2nd July 2026



\### Work Package



WP-000A – Engineering Governance Hardening



\### Context



Historically, engineering documentation was frequently treated as secondary to

source code.



Experience during platform recovery demonstrated that engineering

documentation often became the primary source of project continuity,

architectural understanding and operational recovery.



\### Decision



Engineering documentation shall be recognised as a production asset.



Authoritative documentation shall therefore:



\- be engineered

\- be version controlled

\- undergo engineering review

\- participate in Git checkpoints

\- remain synchronised with implementation

\- evolve together with the platform



Documentation shall never be considered complete after implementation.



Documentation forms part of implementation.



\### Alternatives Considered



\- Documentation maintained independently.

\- Documentation updated only at release milestones.

\- Documentation regarded as supplementary guidance.



These alternatives were rejected because they weaken engineering continuity,

reduce recoverability and increase institutional knowledge loss.



\### Consequences



Engineering documentation becomes an integral architectural component of the

JustDefenders Platform.



Future engineering activities shall treat documentation updates as mandatory

deliverables.



\### Related Documents



\- 05\_AI\_Engineering\_Protocol.md

\- 99\_Document\_Standards.md

\- 10\_Engineering\_Change\_Log.md



\### Related Git Commit



0dcbce6



\### Related Git Tag



WP000A\_DOCUMENT\_STANDARDS\_V2



\---



\# ADR Register Maintenance



The Architecture Decision Register shall remain current throughout the life of

the project.



New ADRs shall be created whenever engineering decisions materially affect:



\- platform architecture

\- engineering governance

\- deployment architecture

\- operational architecture

\- repository organisation

\- validation framework

\- security architecture

\- platform scalability

\- engineering methodology



Routine implementation decisions shall continue to be recorded through Git

history and the Engineering Change Log.



\---



\# Relationship to the Engineering Constitution



This register records the implementation of the constitutional engineering

principles defined within:



\- 05\_AI\_Engineering\_Protocol.md



Each Architecture Decision Record provides the engineering rationale for

significant governance and architectural evolution.



\---



\# Relationship to the Project DNA



Architectural decisions shall remain consistent with the enduring philosophy

defined within:



\- 11\_Project\_DNA.md



The Project DNA provides the long-term direction.



The Architecture Decision Register records the significant engineering

decisions taken while pursuing that direction.



\---



\# Revision History



| Version | Date | Description |

|----------|------|-------------|

| 1.x | Previous Releases | Original Architecture Decision Register |

| 2.0.0 | 2nd July 2026 | WP-000A Engineering Governance Hardening. Expanded into the authoritative register of architectural and engineering governance decisions for the JustDefenders Platform. |



\---



\# Approval



\*\*Project:\*\* JustDefenders



\*\*Document Owner:\*\* Simon Barclay



\*\*Engineering Authority:\*\* Project Owner



\*\*Classification:\*\* Architecture



\*\*Document Type:\*\* Normative



\*\*Status:\*\* Authoritative



\*\*Effective Date:\*\* 2nd July 2026



\---



> \*\*Architecture is the record of deliberate engineering decisions.\*\*



> \*Every Architecture Decision Record preserves not only what was decided, but the engineering context, alternatives and consequences that shaped the future of the JustDefenders Platform.\*



<!-- End of Document -->

