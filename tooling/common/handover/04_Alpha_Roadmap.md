Repository Path:
C:\dev\justdefenders\frontend\tooling\common\handover\04_Alpha_Roadmap.md

Owning Work Package:
WP-006

Document Owner:
JustDefenders Engineering

Source Repository:
C:\dev\justdefenders\frontend

Engineering Baseline:
ALPHA_BASELINE_20260701

Review Status:
Approved

===============================================================================

JustDefenders© Engineering Documentation

===============================================================================



Document:

04\_Alpha\_Roadmap.md



Title:

Alpha Engineering Roadmap



Repository Path:

C:\\dev\\justdefenders\\frontend\\tooling\\handover\\04\_Alpha\_Roadmap.md



Version:

1.0.0



Status:

Engineering Baseline



Checkpoint:

ALPHA\_BASELINE\_20260701



Timestamp:

01 July 2026 08:30 Sydney



Project:

JustDefenders Engineering Toolkit



Classification:

Internal Engineering Documentation



Owner:

JustDefenders



Purpose:

Defines the engineering programme required to achieve the JustDefenders

Alpha Engineering Baseline including work packages, dependencies,

milestones, acceptance criteria and engineering checkpoints.



Related Documents:



01\_Master\_Handover.md



02\_Platform\_Recovery.md



03\_Engineering\_Toolkit.md



05\_AI\_Engineering\_Protocol.md



08\_Work\_Package\_Register.md



===============================================================================



\# 1. Executive Summary



The Alpha Engineering Roadmap defines the structured engineering programme

required to transition the JustDefenders platform from its current recovered

state to a validated Alpha Engineering Baseline.



Alpha represents the completion of the engineering foundation rather than the

completion of every planned platform feature.



The objective of Alpha is to establish a stable, maintainable and fully

documented engineering platform upon which Beta development can safely proceed.



\-------------------------------------------------------------------------------



\# 2. Alpha Engineering Objectives



The Alpha programme has six primary objectives.



1\.



Complete the shared Engineering Toolkit.



2\.



Complete the Engineering Dashboard.



3\.



Complete the Platform API Validation Framework.



4\.



Complete the Engineering Handover Pack.



5\.



Validate the recovered platform.



6\.



Establish the Alpha Engineering Baseline.



\-------------------------------------------------------------------------------



\# 3. Engineering Principles



The Alpha programme follows the established Engineering Development Standard.



Core principles include:



• Shared modules before applications.



• Whole-file development.



• Engineering documentation alongside source code.



• Automated self-tests.



• Engineering checkpoints.



• Version-controlled documentation.



• Preservation of engineering knowledge.



\-------------------------------------------------------------------------------



\# 4. Alpha Work Package Overview



| Work Package | Description | Status |

|--------------|-------------|--------|

| WP-003C | Platform Discovery | Complete |

| WP-003D | Engineering Toolkit | Active |

| WP-003E | Platform API Validation | Planned |

| WP-004 | Engineering Dashboard Expansion | Planned |

| WP-005 | Platform Intelligence | Future |

| WP-006 | Alpha Validation | Future |



\-------------------------------------------------------------------------------



\# 5. Engineering Programme



\## Phase 1 – Engineering Foundation



Objectives:



• Complete Toolkit-Reporting.



• Complete Toolkit-Http.



• Complete Toolkit documentation.



Deliverables:



• Stable shared modules.



• Passing self-tests.



• Versioned engineering documentation.



Acceptance Criteria:



All shared modules operational.



\-------------------------------------------------------------------------------



\## Phase 2 – Engineering Applications



Objectives:



• Rebuild Engineering Dashboard.



• Build Platform API Validator.



Deliverables:



• Dashboard operational.



• API validation framework operational.



Acceptance Criteria:



Applications built exclusively upon the shared toolkit.



\-------------------------------------------------------------------------------



\## Phase 3 – Platform Validation



Objectives:



• Validate runtime.



• Validate APIs.



• Validate discovery.



• Validate reporting.



Deliverables:



• Engineering validation reports.



• Platform health reports.



Acceptance Criteria:



Platform operates without critical engineering defects.



\-------------------------------------------------------------------------------



\## Phase 4 – Documentation Completion



Objectives:



Complete the Engineering Handover Pack.



Deliverables:



• All engineering documents completed.



• Architecture documentation.



• Decision register.



• Project DNA.



Acceptance Criteria:



Engineering documentation aligned with source code.



\-------------------------------------------------------------------------------



\## Phase 5 – Alpha Baseline



Objectives:



Freeze Alpha Engineering Baseline.



Deliverables:



• Alpha checkpoint.



• Engineering baseline.



• Complete documentation.



Acceptance Criteria:



Engineering review completed.



\-------------------------------------------------------------------------------



\# 6. Work Package Dependencies



```text

Platform Recovery

&#x20;       │

&#x20;       ▼

Engineering Toolkit

&#x20;       │

&#x20;       ▼

Engineering Dashboard

&#x20;       │

&#x20;       ▼

Platform API Validator

&#x20;       │

&#x20;       ▼

Platform Validation

&#x20;       │

&#x20;       ▼

Engineering Documentation

&#x20;       │

&#x20;       ▼

Alpha Baseline

```



Engineering activities should follow this sequence to minimise risk and

rework.



\-------------------------------------------------------------------------------



\# 7. Engineering Checkpoints



\## Checkpoint



ALPHA\_BASELINE\_20260701



Status



Active



Future checkpoints include:



ALPHA\_ENGINEERING\_01



ALPHA\_ENGINEERING\_02



ALPHA\_COMPLETE



\-------------------------------------------------------------------------------



\# 8. Alpha Acceptance Criteria



The Alpha Engineering Baseline shall be achieved when:



Engineering Toolkit complete.



Engineering Dashboard operational.



Platform API Validator operational.



Discovery Engine validated.



Engineering documentation complete.



Shared module self-tests passing.



Platform runtime operational.



Platform database operational.



Engineering review completed.



\-------------------------------------------------------------------------------



\# 9. Current Progress



Current engineering assessment.



Platform Recovery



████████████████████ 100%



Discovery Platform



████████████████████ 100%



Engineering Toolkit



█████████████░░░░░░ 70%



Engineering Dashboard



██░░░░░░░░░░░░░░░░░ 10%



Platform API Validator



░░░░░░░░░░░░░░░░░░░ 0%



Engineering Documentation



██████░░░░░░░░░░░░░ 35%



Overall Alpha Progress



███████████░░░░░░░░ 60%



\-------------------------------------------------------------------------------



\# 10. Risks to Alpha



Current risks include:



• Remaining shared module implementation.



• Dashboard completion.



• API validation framework.



• Integration testing.



• Maintaining engineering discipline.



• Documentation alignment.



Mitigation strategies are maintained within the Risk Register.



\-------------------------------------------------------------------------------



===============================================================================
\# 11 Current Remaining Work to Achieve Alpha
===============================================================================

The Engineering Handover Pack Version 1.0 is now established and becomes the
authoritative engineering knowledge repository for the JustDefenders platform.

The remaining work required to achieve the Alpha Engineering Baseline is as
follows.

-------------------------------------------------------------------------------

Priority 1 — WP-003D Engineering Toolkit

Status

Active

Objective

Complete the shared engineering toolkit that will underpin all engineering
applications.

Remaining Deliverables

• Complete Toolkit-Reporting.psm1

• Complete Toolkit-Http.psm1

• Validate all toolkit self-tests

• Finalise shared engineering module documentation

Success Criteria

All shared toolkit modules pass validation and are adopted by downstream
applications.

-------------------------------------------------------------------------------

Priority 2 — WP-003F Platform Security Hardening

Status

Active

Objective

Complete the Supabase security review and resolve all outstanding Security
Advisor findings.

Remaining Deliverables

• Complete Supabase security audit

• Review Row-Level Security implementation

• Review database role grants

• Resolve the remaining Security Advisor warning

• Document the platform security model

Success Criteria

No unresolved critical Security Advisor findings.

-------------------------------------------------------------------------------

Priority 3 — WP-003E Platform API Validation

Status

Planned

Objective

Develop the Platform API Validation Framework using the shared toolkit.

Remaining Deliverables

• Build Test-PlatformApis.ps1 Version 2

• Validate all production API endpoints

• Produce engineering validation reports

Success Criteria

All critical platform APIs validated successfully.

-------------------------------------------------------------------------------

Priority 4 — WP-004 Engineering Dashboard

Status

Planned

Objective

Rebuild the Engineering Dashboard using only shared toolkit modules.

Remaining Deliverables

• Replace duplicated logic

• Integrate Toolkit-Reporting

• Integrate Toolkit-Http

• Validate dashboard reporting

Success Criteria

Dashboard operates entirely on shared engineering modules.

-------------------------------------------------------------------------------

Priority 5 — WP-006 Alpha Engineering Baseline

Status

Planned

Objective

Complete engineering validation and formally establish the Alpha Engineering
Baseline.

Remaining Deliverables

• Complete regression testing

• Review documentation

• Review architecture

• Review security

• Complete engineering sign-off

Success Criteria

Alpha Engineering Baseline approved.

-------------------------------------------------------------------------------

Alpha Completion Criteria

The platform shall be considered Alpha complete when:

✓ Engineering Toolkit completed

✓ Platform Security Hardening completed

✓ Platform API Validation completed

✓ Engineering Dashboard completed

✓ Engineering documentation current

✓ No unresolved critical security findings

✓ Alpha Engineering Baseline approved

===============================================================================



\# 12. Transition to Beta



Completion of Alpha enables the project to transition into Beta development.



Beta activities are expected to include:



• Platform intelligence.



• Advanced reporting.



• Expanded engineering automation.



• User-facing feature development.



• Performance optimisation.



• Operational readiness.



\-------------------------------------------------------------------------------



\# 13. Conclusion



The Alpha Engineering Roadmap provides a structured engineering programme for

completing the JustDefenders engineering foundation.



By focusing first on shared tooling, engineering governance, validation and

documentation, the project establishes a robust platform capable of supporting

future feature development with reduced engineering risk.



Successful completion of this roadmap will establish the JustDefenders Alpha

Engineering Baseline and provide a stable foundation for Beta development.



===============================================================================



Document:

04\_Alpha\_Roadmap.md



Version:

1.0.0



Status:

Engineering Baseline



Checkpoint:

ALPHA\_BASELINE\_20260701



Last Updated:

01 July 2026 08:30 Sydney



JustDefenders©



===============================================================================

