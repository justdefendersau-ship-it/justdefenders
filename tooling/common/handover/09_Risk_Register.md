Repository Path:

C:\\dev\\justdefenders\\frontend\\tooling\\common\\handover\\09\_Risk\_Register.md



Owning Work Package:

WP-005



Document Owner:

JustDefenders Engineering



Source Repository:

C:\\dev\\justdefenders\\frontend



Engineering Baseline:

ALPHA\_BASELINE\_20260701



Review Status:

Approved



===============================================================================

JustDefenders© Engineering Documentation

===============================================================================



Document:

09\_Risk\_Register.md



Title:

Engineering Risk Register



Repository Path:

C:\\dev\\justdefenders\\frontend\\tooling\\handover\\

09\_Risk\_Register.md



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

Provides the authoritative engineering risk register for the JustDefenders

programme, identifying technical, operational, programme and commercial risks,

their impact, mitigation strategies and ongoing review status.



Related Documents:



04\_Alpha\_Roadmap.md



08\_Work\_Package\_Register.md



10\_Engineering\_Change\_Log.md



===============================================================================



\# 1. Purpose



The Engineering Risk Register identifies, assesses and manages risks that may

impact the successful delivery of the JustDefenders platform.



The register supports proactive engineering management by documenting:



• Identified risks



• Potential impact



• Probability



• Mitigation strategy



• Contingency planning



• Current status



The register shall be reviewed at every engineering checkpoint.



\-------------------------------------------------------------------------------



\# 2. Risk Assessment Matrix



| Probability | Description |

|-------------|-------------|

| Low | Unlikely |

| Medium | Possible |

| High | Likely |



| Impact | Description |

|---------|-------------|

| Low | Minor engineering impact |

| Medium | Noticeable project impact |

| High | Significant impact to Alpha or production |



Overall Risk Rating



Low



Medium



High



Critical



\-------------------------------------------------------------------------------



\# 3. Active Engineering Risks



\## RISK-001



Category



Engineering



Title



Incomplete Shared Toolkit



Description



Remaining toolkit modules are not yet complete, preventing downstream

engineering applications from being finalised.



Probability



Medium



Impact



High



Overall Rating



High



Mitigation



Complete Toolkit-Reporting and Toolkit-Http before commencing dependent

applications.



Contingency



Delay application development until toolkit completion.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-002



Category



Engineering



Title



Dashboard Integration Risk



Description



Engineering Dashboard may diverge from shared toolkit standards if developed

independently.



Probability



Medium



Impact



Medium



Overall Rating



Medium



Mitigation



Dashboard must consume shared toolkit modules exclusively.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-003



Category



Platform



Title



API Validation Coverage



Description



Platform APIs cannot be confidently maintained until the validation framework

is operational.



Probability



Medium



Impact



High



Overall Rating



High



Mitigation



Implement Test-PlatformApis.ps1 immediately following toolkit completion.



Status



Planned



\-------------------------------------------------------------------------------



\## RISK-004



Category



Documentation



Title



Loss of Engineering Knowledge



Description



Engineering knowledge may be lost if documentation is not maintained alongside

source code.



Probability



Low



Impact



Critical



Overall Rating



High



Mitigation



Maintain the Engineering Handover Pack as an official project artefact.



Status



Mitigated



\-------------------------------------------------------------------------------



\## RISK-005



Category



Architecture



Title



Architectural Drift



Description



Future development may diverge from established engineering standards.



Probability



Medium



Impact



High



Overall Rating



High



Mitigation



Enforce Architecture Decision Register and AI Engineering Protocol.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-006



Category



Compatibility



Title



PowerShell Compatibility



Description



Engineering utilities may become dependent upon features unavailable within

Windows PowerShell 5.1.



Probability



Low



Impact



Medium



Overall Rating



Medium



Mitigation



Validate compatibility using Toolkit-Compatibility before release.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-007



Category



Programme



Title



Scope Expansion During Alpha



Description



Introducing additional platform capabilities before completing the engineering

foundation may delay Alpha.



Probability



High



Impact



High



Overall Rating



Critical



Mitigation



Restrict Alpha work to approved work packages.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-008



Category



Commercial



Title



Platform Vision Dilution



Description



Engineering decisions may prioritise short-term implementation over the

long-term platform vision.



Probability



Medium



Impact



High



Overall Rating



High



Mitigation



Review all major engineering decisions against Project DNA and Master

Handover.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-009



Category



Quality



Title



Regression Introduction



Description



Changes to shared modules may introduce regressions into engineering

applications.



Probability



Medium



Impact



High



Overall Rating



High



Mitigation



Mandatory self-tests for all shared modules and validation before integration.



Status



Active



\-------------------------------------------------------------------------------



\## RISK-010



Category



Programme



Title



Checkpoint Inconsistency



Description



Engineering documentation, source code and work package status may become

misaligned.



Probability



Low



Impact



Medium



Overall Rating



Medium



Mitigation



Mandatory engineering session closeout and checkpoint review.



Status



Active



\-------------------------------------------------------------------------------



\# 4. Risk Ownership



Engineering Lead



Overall engineering governance.



Engineering Toolkit



Shared module risks.



Documentation



Engineering knowledge preservation.



Platform Validation



API and runtime validation.



Programme Management



Work package delivery and milestone management.



\-------------------------------------------------------------------------------



\# 5. Risk Review Procedure



The Engineering Risk Register shall be reviewed:



• At every engineering session.



• At every work package completion.



• At every architecture review.



• Before Alpha approval.



• Before Beta commencement.



• Following significant engineering changes.



\-------------------------------------------------------------------------------



\# 6. Escalation Criteria



A risk shall be escalated when:



• Overall rating becomes Critical.



• Probability increases.



• Impact increases.



• Mitigation becomes ineffective.



• A dependent work package is delayed.



Escalated risks shall be reviewed during the next engineering checkpoint.



\-------------------------------------------------------------------------------



\# 7. Current Programme Risk Summary



| Category | Status |

|----------|--------|

| Engineering | Active |

| Architecture | Active |

| Platform | Active |

| Documentation | Controlled |

| Compatibility | Active |

| Programme | Active |

| Commercial | Active |



Overall Programme Risk



Medium



Engineering governance and structured work package delivery continue to reduce

overall project risk as the platform progresses toward the Alpha Engineering

Baseline.



\-------------------------------------------------------------------------------



\# 8. Conclusion



The Engineering Risk Register provides a structured and proactive approach to

risk management across the JustDefenders programme.



By identifying risks early, defining mitigation strategies and reviewing them

at every engineering checkpoint, the project maintains engineering stability,

protects intellectual property and supports the successful delivery of the

Alpha Engineering Baseline.



===============================================================================



Document:

09\_Risk\_Register.md



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

