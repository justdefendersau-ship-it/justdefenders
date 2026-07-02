<!--

===============================================================================

JustDefenders© Engineering Governance Framework

===============================================================================



File:

C:\\dev\\justdefenders\\frontend\\tooling\\common\\handover\\

05\_AI\_Engineering\_Protocol.md



Document:

AI Engineering Protocol

(Project Constitution \& Engineering Operating Standard)



Author:

Simon Barclay



Platform:

JustDefenders



Classification:

Engineering Governance



Status:

Authoritative



Work Package:

WP-000A – Engineering Governance Hardening



Version:

2.0.0



Timestamp:

2nd July 2026, 14:30 AEST



Copyright © 2026 JustDefenders.

All Rights Reserved.



===============================================================================

\-->



\# 05 – AI Engineering Protocol

\## Project Constitution \& Engineering Operating Standard



\---



\# Purpose



This document establishes the constitutional engineering rules governing the

development, maintenance, recovery and long-term evolution of the

JustDefenders Platform.



Unlike traditional development guidelines, this protocol forms part of the

production platform and is therefore treated as an engineering artefact.



Every engineering activity undertaken within the JustDefenders Platform shall

comply with this protocol unless an Architecture Decision Record (ADR)

explicitly authorises an exception.



This protocol applies equally to:



\- Human engineers

\- AI engineering assistants

\- Contractors

\- Future maintainers

\- Automated engineering tooling



This document is considered authoritative.



Where conflict exists between engineering practice and this protocol, this

protocol shall prevail until formally amended.



\---



\# Scope



This protocol governs:



\- Engineering governance

\- AI-assisted software development

\- Source code production

\- Validation procedures

\- Documentation standards

\- Git governance

\- Engineering recovery

\- Work Package execution

\- Architecture governance

\- Platform continuity

\- Engineering handover



\---



\# Project Constitution



\## Statement



The Project Constitution defines the immutable engineering principles of the

JustDefenders Platform.



These constitutional principles remain in force regardless of:



\- Programming language

\- Framework

\- Technology stack

\- AI model

\- Human contributor

\- Repository structure

\- Project phase



Amendments may only be authorised by the Project Owner and shall be recorded

within the Architecture Decision Register before implementation.



\---



\# Constitutional Articles



\## Article I

\### Engineering Quality



Engineering quality shall always take precedence over engineering speed.



No implementation shall knowingly reduce platform quality in order to achieve

delivery deadlines or rapid feature completion.



\---



\## Article II

\### Recover Before Rewrite



Existing engineering assets shall always be recovered where practical before

replacement is considered.



Rewriting production components shall only occur where recovery is impossible

or where replacement has been formally authorised.



\---



\## Article III

\### Git Authority



Git shall remain the authoritative engineering history for the platform.



Chat conversations, notes and temporary files shall never be considered

authoritative engineering artefacts.



\---



\## Article IV

\### Handover Authority



The Engineering Handover forms part of the production platform.



Documentation shall be maintained with the same discipline as source code.



Incomplete documentation constitutes incomplete engineering.



\---



\## Article V

\### Validation Before Completion



No Work Package shall be considered complete until all mandatory validation

activities have successfully completed.



Successful compilation alone does not constitute completion.



\---



\## Article VI

\### Documentation As Deliverable



Engineering documentation is a production deliverable.



Documentation shall evolve together with the platform and shall accurately

reflect the implementation at every engineering milestone.



\---



\## Article VII

\### Engineering Continuity



The platform shall remain recoverable following:



\- Interrupted development sessions

\- AI conversation failure

\- Engineering handover

\- Repository recovery

\- Developer transition

\- Workstation replacement



Engineering decisions shall therefore favour recoverability over convenience.



\---



\## Article VIII

\### Architectural Governance



Platform architecture shall evolve through controlled engineering decisions.



Architectural changes require formal approval through the Architecture Decision

Register.



Silent architectural migration is prohibited.



\---



\## Article IX

\### Evidence-Based Engineering



Engineering decisions shall be based upon observable evidence.



Assumptions shall never be represented as verified implementation facts.



Where uncertainty exists, it shall be documented until resolved.



\---



\## Article X

\### Engineering Integrity



Engineering integrity shall take precedence over convenience.



Neither human contributors nor AI assistants shall knowingly:



\- fabricate implementation

\- conceal engineering uncertainty

\- misrepresent validation status

\- declare incomplete work as complete

\- bypass governance requirements



The integrity of the engineering record is considered a production asset.



\---



\# Engineering Philosophy



The JustDefenders Platform is engineered as a long-term operational system.



Engineering decisions shall therefore favour:



\- Maintainability

\- Recoverability

\- Traceability

\- Simplicity

\- Auditability

\- Operational resilience



over:



\- Short-term optimisation

\- Rapid implementation

\- Unverified architectural change

\- Temporary engineering shortcuts



Engineering excellence is achieved through consistency rather than speed.



\-------------------------------------------------------------------------------

Continues in Part 2

\-------------------------------------------------------------------------------



\# Engineering Principles



The JustDefenders Platform is engineered using a governance-first methodology.



Engineering governance exists to ensure the platform remains maintainable,

recoverable, auditable and transferable throughout its lifecycle.



The engineering process shall therefore prioritise:



\- Correctness

\- Consistency

\- Traceability

\- Recoverability

\- Validation

\- Documentation

\- Repeatability



Engineering decisions shall always favour long-term platform stability over

short-term implementation speed.



\---



\# Engineering Standards



All engineering work shall comply with the following mandatory standards.



\## Source Code Standards



Production source code shall:



\- compile successfully

\- import successfully

\- execute without parser errors

\- satisfy validation requirements

\- maintain backward compatibility unless approved

\- include appropriate comments

\- preserve public interfaces

\- avoid unnecessary architectural change



Production code shall never intentionally contain:



\- placeholder logic

\- incomplete implementations

\- dead code

\- commented-out production functionality

\- undocumented architectural changes



\---



\## Documentation Standards



Engineering documentation shall:



\- accurately reflect the implementation

\- be maintained together with source code

\- be written using clear technical language

\- preserve engineering history

\- reference related documents where appropriate



Documentation shall never become detached from implementation.



\---



\## File Standards



Every production engineering file shall include:



\- JustDefenders© copyright

\- file name

\- full repository path

\- timestamp

\- version

\- purpose

\- author where appropriate



Engineering artefacts shall remain self-describing.



\---



\# AI Engineering Rules



Artificial Intelligence may assist engineering activities but shall always

operate within this Engineering Protocol.



AI assistance is considered an engineering tool rather than an engineering

authority.



Responsibility for engineering governance remains with the Project Owner.



\---



\## Mandatory AI Behaviour



AI shall:



\- preserve existing engineering conventions

\- preserve project terminology

\- preserve architectural consistency

\- preserve public interfaces

\- explain engineering decisions

\- identify uncertainty

\- distinguish verified implementation from assumption

\- favour recovery before replacement

\- avoid unnecessary rewrites



\---



\## AI Prohibitions



AI shall not:



\- fabricate implementation details

\- invent completed functionality

\- misrepresent validation status

\- silently rename interfaces

\- silently alter architecture

\- overwrite production assets without justification

\- declare incomplete work complete

\- remove engineering traceability



When uncertainty exists, uncertainty shall be explicitly stated.



\---



\# Work Package Lifecycle



Every engineering activity shall be executed through an approved Work Package.



Each Work Package progresses through the following lifecycle.



1\. Planning

2\. Design

3\. Implementation

4\. Validation

5\. Documentation

6\. Engineering Review

7\. Git Checkpoint

8\. Handover Update

9\. Completion



Progression to the next phase shall only occur when the current phase has

completed successfully.



\---



\# Work Package Ownership



Each Work Package shall define:



\- objective

\- scope

\- deliverables

\- dependencies

\- validation criteria

\- completion criteria

\- engineering risks

\- recommended recovery point



No Work Package shall expand beyond its approved scope without explicit

authorisation.



\-------------------------------------------------------------------------------

Continues in Part 3

\-------------------------------------------------------------------------------



\# Engineering Completion Criteria



A Work Package shall not be considered complete until every mandatory

completion criterion has been satisfied.



Completion is determined by engineering evidence rather than engineering

opinion.



The following criteria are mandatory.



\---



\## Implementation



Implementation shall satisfy all of the following.



\- Production files complete

\- Whole files delivered

\- No placeholder logic

\- No incomplete sections

\- Public interfaces preserved

\- Engineering standards satisfied



Partial implementation shall not constitute completion.



\---



\## Validation



Validation shall confirm:



\- successful import

\- successful execution

\- successful unit validation

\- successful integration validation

\- successful regression validation where applicable



Engineering validation shall always precede completion.



\---



\## Documentation



The following documentation shall be updated where applicable.



\- Engineering Change Log

\- Work Package Register

\- Architecture Decision Register

\- CURRENT\_STATE

\- Handover documentation

\- Project DNA



Documentation forms part of the engineering deliverable.



\---



\## Repository



Prior to completion:



\- all files saved

\- validation completed

\- repository reviewed

\- Git checkpoint created

\- milestone tag created where applicable



Repository integrity forms part of engineering governance.



\---



\## Completion Checklist



A Work Package is complete only when the following checklist has been

satisfied.



✓ Engineering complete



✓ Validation complete



✓ Documentation complete



✓ Engineering review complete



✓ Git checkpoint complete



✓ Handover complete



✓ Recovery point established



\---



\# Engineering Session Lifecycle



Engineering sessions shall follow a consistent lifecycle.



1\. Review current platform state.

2\. Review CURRENT\_STATE.md.

3\. Confirm active Work Package.

4\. Confirm dependencies.

5\. Perform implementation.

6\. Validate implementation.

7\. Update documentation.

8\. Create Git checkpoint.

9\. Record session outcome.

10\. Prepare safe restart point.



Engineering sessions shall remain recoverable at all times.



\---



\# Engineering Session Closure



Every engineering session shall conclude with the following mandatory

activities.



\## Source Code



\- Save all files.

\- Resolve parser errors.

\- Resolve validation failures.

\- Confirm repository consistency.



\---



\## Validation



Perform all required validation activities.



No unresolved validation failure shall remain without documented justification.



\---



\## Documentation



Update:



\- CURRENT\_STATE.md

\- Engineering Change Log

\- Work Package Register

\- relevant handover documents



\---



\## Repository



Create a Git checkpoint.



Where appropriate:



\- create milestone tag

\- record checkpoint identifier

\- record restart point



\---



\## Engineering Review



Confirm:



\- objectives achieved

\- risks recorded

\- outstanding work documented

\- next engineering activity identified



Engineering work shall not be abandoned without establishing a documented

restart point.



\---



\# Chat Recovery Protocol



Engineering shall remain resilient to interruption.



If an engineering conversation becomes unstable:



1\. Complete the current engineering task where practical.

2\. Save all modified files.

3\. Execute mandatory validation.

4\. Update CURRENT\_STATE.md.

5\. Create Git checkpoint.

6\. Update Engineering Change Log.

7\. Record outstanding work.

8\. Continue within a new engineering session.



Conversation interruption shall never result in undocumented engineering loss.



\---



\# Recovery Principles



Engineering recovery shall always proceed using the following order.



1\. Recover existing implementation.

2\. Recover repository history.

3\. Recover engineering documentation.

4\. Recover conversation artefacts.

5\. Replace implementation only when recovery is no longer practical.



Recover before rewrite remains a constitutional principle.



\-------------------------------------------------------------------------------

Continues in Part 4

\-------------------------------------------------------------------------------



\# Architecture Governance



Platform architecture shall evolve through deliberate engineering rather than

incremental, undocumented change.



Architectural integrity is considered a production asset.



All architectural decisions shall remain:



\- documented

\- reviewable

\- traceable

\- reversible where practical



\---



\## Architecture Decision Records



Significant architectural decisions shall be recorded within the

Architecture Decision Register.



Examples include:



\- platform architecture

\- framework replacement

\- repository restructuring

\- database architecture

\- API architecture

\- security architecture

\- engineering workflow

\- deployment strategy



No significant architectural change shall occur without an accompanying ADR.



\---



\## Architectural Stability



Existing production architecture shall remain authoritative until formally

superseded.



Engineering work shall not introduce competing architectural patterns within

the same subsystem.



Where a replacement architecture is proposed:



\- existing architecture remains operational

\- replacement is developed independently

\- migration strategy is documented

\- validation is completed

\- formal approval is recorded



\---



\## Architectural Recovery



When engineering recovery is required:



1\. Preserve existing implementation.

2\. Identify engineering evidence.

3\. Determine recoverability.

4\. Recover where practical.

5\. Replace only where recovery is no longer feasible.



Architecture shall never be rewritten solely for convenience.



\---



\# Git Governance



Git forms the authoritative engineering history of the JustDefenders Platform.



Every significant engineering milestone shall be recoverable through repository

history.



\---



\## Mandatory Git Checkpoints



A Git checkpoint shall be created after:



\- completion of every Work Package

\- successful validation

\- architectural change

\- production bug resolution

\- repository restructuring

\- engineering governance updates

\- major documentation updates



\---



\## Checkpoint Procedure



The minimum checkpoint procedure shall include:



1\. Review repository status.

2\. Review modified files.

3\. Confirm validation success.

4\. Stage engineering artefacts.

5\. Create commit.

6\. Create milestone tag where applicable.

7\. Update Engineering Change Log.



Engineering work is not considered complete until checkpointed.



\---



\## Commit Standards



Commit messages shall:



\- describe completed engineering work

\- reference the Work Package

\- avoid ambiguous wording

\- remain concise

\- accurately reflect implementation



Example:



WP-003E – Validation Execution Engine repaired and validated



\---



\## Engineering Tags



Major engineering milestones shall be identified through Git tags.



Examples:



\- ALPHA\_BASELINE

\- ENGINEERING\_BASELINE

\- PLATFORM\_VALIDATED

\- SECURITY\_COMPLETE

\- WP\_COMPLETE



Tags provide stable engineering recovery points.



\---



\# Documentation Governance



Engineering documentation forms part of the production platform.



Documentation shall evolve together with implementation.



Engineering documentation shall therefore remain:



\- accurate

\- current

\- complete

\- traceable

\- version controlled



\---



\## Mandatory Documentation Updates



Where applicable, engineering work shall update:



\- CURRENT\_STATE.md

\- Engineering Change Log

\- Work Package Register

\- Architecture Decision Register

\- Rediscovered Platform Knowledge

\- Project DNA

\- Document Control



Documentation updates shall occur before Work Package completion.



\---



\## Handover Integrity



The handover documentation shall always provide sufficient information for an

engineer unfamiliar with the current engineering session to safely continue the

project.



Engineering knowledge shall never exist solely within conversation history.



The handover shall therefore remain the authoritative operational knowledge

base for the platform.



\---



\# Engineering Knowledge Preservation



Knowledge generated during engineering activities shall be preserved within the

appropriate engineering artefact.



Engineering knowledge shall not remain exclusively within:



\- AI conversations

\- personal notes

\- temporary files

\- undocumented implementation



Permanent engineering knowledge shall be transferred into the production

handover.



\---



\# Engineering Traceability



Every significant engineering activity shall remain traceable through:



\- source code

\- documentation

\- Work Packages

\- Architecture Decision Records

\- Engineering Change Log

\- Git history



Engineering traceability shall support future maintenance, recovery and audit.



\-------------------------------------------------------------------------------

Continues in Final Part

\-------------------------------------------------------------------------------



\# Quality Assurance



Engineering quality shall be demonstrated through evidence.



Quality shall never be assumed.



Every production engineering artefact shall satisfy the appropriate quality

requirements before being considered complete.



\---



\## Mandatory Quality Gates



The following quality gates apply to all production engineering work.



\### Engineering Gate



\- Engineering standards satisfied.

\- Constitutional principles maintained.

\- Public interfaces preserved.

\- Architecture remains consistent.



\---



\### Validation Gate



\- Module imports successfully.

\- Validation executes successfully.

\- Test failures investigated.

\- Integration verified.



\---



\### Documentation Gate



\- Documentation updated.

\- Handover synchronised.

\- Engineering Change Log updated.

\- CURRENT\_STATE updated.



\---



\### Repository Gate



\- Repository reviewed.

\- Git checkpoint completed.

\- Milestone tag created where appropriate.

\- Repository left in a recoverable state.



No engineering activity shall bypass mandatory quality gates.



\---



\# Engineering Ethics



Engineering integrity underpins the JustDefenders Platform.



Every contributor shall act in a manner that preserves the quality,

traceability and long-term maintainability of the platform.



Engineering ethics apply equally to:



\- Human engineers

\- AI engineering assistants

\- Contractors

\- Future maintainers

\- Automated engineering tooling



\---



\## Engineering Commitments



Contributors shall:



\- act honestly

\- preserve engineering evidence

\- distinguish verified facts from assumptions

\- protect engineering history

\- maintain architectural integrity

\- document uncertainty

\- support recoverability

\- preserve project knowledge



\---



\## Prohibited Behaviour



No contributor shall knowingly:



\- fabricate implementation

\- fabricate validation results

\- conceal engineering uncertainty

\- overwrite production assets without justification

\- remove engineering traceability

\- bypass governance

\- misrepresent engineering completion

\- weaken platform recoverability



Engineering trust is considered a production asset.



\---



\# Governance Review



This Engineering Protocol shall be reviewed whenever:



\- major architecture changes occur

\- engineering governance changes

\- development methodology changes

\- repository structure changes

\- project ownership changes

\- significant lessons are identified



Governance improvements shall be documented through:



\- Architecture Decision Records

\- Engineering Change Log

\- Work Package Register



\---



\# Relationship to Other Handover Documents



This document provides the governing engineering protocol for the

JustDefenders Platform.



The remaining handover documents shall support this protocol.



Document relationships include:



| Document | Purpose |

|----------|---------|

| 00\_Document\_Control.md | Document governance |

| 00\_Project\_Context.md | Project overview |

| 01\_Master\_Handover.md | Master navigation |

| 02\_Platform\_Recovery.md | Recovery procedures |

| 03\_Engineering\_Toolkit.md | Toolkit overview |

| 04\_Alpha\_Roadmap.md | Engineering roadmap |

| 06\_Architecture\_Decision\_Register.md | Architectural governance |

| 07\_Rediscovered\_Platform\_Knowledge.md | Engineering knowledge capture |

| 08\_Work\_Package\_Register.md | Work Package governance |

| 09\_Risk\_Register.md | Engineering risk management |

| 10\_Engineering\_Change\_Log.md | Engineering history |

| 11\_Project\_DNA.md | Long-term engineering philosophy |

| CURRENT\_STATE.md | Safe engineering restart point |

| 99\_Document\_Standards.md | Documentation standards |



\---



\# WP-000A Outcomes



Completion of WP-000A establishes:



\- A constitutional engineering framework.

\- A standard engineering lifecycle.

\- Mandatory completion criteria.

\- Mandatory validation requirements.

\- Architecture governance.

\- Git governance.

\- Documentation governance.

\- Engineering recovery procedures.

\- AI engineering governance.

\- Long-term project continuity.



This document becomes the authoritative engineering protocol for the

JustDefenders Platform.



\---



\# Revision History



| Version | Date | Description |

|----------|------|-------------|

| 1.x | Previous Releases | Original AI Engineering Protocol |

| 2.0.0 | 2nd July 2026 | WP-000A Engineering Governance Hardening. Expanded into the constitutional engineering governance document for the JustDefenders Platform. |



\---



\# Approval



\*\*Project:\*\* JustDefenders



\*\*Document Owner:\*\* Simon Barclay



\*\*Engineering Authority:\*\* Project Owner



\*\*Status:\*\* Authoritative



\*\*Effective Date:\*\* 2nd July 2026



\---



> \*\*Engineering Excellence Through Discipline, Validation, Recoverability and Knowledge Preservation.\*\*



> \*The engineering process shall always leave the platform in a better, safer and more recoverable state than it was found.\*



<!-- End of Document -->



