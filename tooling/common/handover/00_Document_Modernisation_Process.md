===============================================================================

JustDefenders© Engineering Documentation

===============================================================================



Document ID:

JD-DOC-001C



Document:

00\_Document\_Modernisation\_Process.md



Title:

Engineering Documentation Modernisation Process



Repository Path:

C:\\dev\\justdefenders\\frontend\\tooling\\common\\handover\\00\_Document\_Modernisation\_Process.md



Version:

1.0.0



Status:

Engineering Baseline



Engineering Baseline:

WP-S004\_COMPLETE



Current Work Package:

WP-D001A-05



Git Branch:

wave5b-platform-validation



Git Commit:

45b085a



Git Tag:

WP-S004\_COMPLETE



Classification:

Engineering Governance



Framework:

JustDefenders Engineering Documentation Modernisation Framework (JEDMF)



Document Owner:

JustDefenders Engineering



Project:

JustDefenders



Review Status:

Engineering Review



Approval Status:

Pending



Created:

12 July 2026 14:45 Sydney



Last Engineering Review:

12 July 2026 14:45 Sydney



Next Scheduled Review:

Completion of WP-D001



Author:

JustDefenders Engineering



===============================================================================



\# 1. Executive Summary



The Engineering Documentation Modernisation Process defines the controlled

engineering workflow for converting existing documentation into compliant

Engineering Configuration Items (ECIs) managed under the JustDefenders

Engineering Documentation Modernisation Framework (JEDMF).



The process ensures engineering knowledge is preserved while introducing

consistent governance, configuration management, traceability and validation.



This process applies to every controlled engineering document within the

JustDefenders repository.



\-------------------------------------------------------------------------------



\# 2. Purpose



The objectives of the modernisation process are to:



• Preserve existing engineering knowledge.



• Standardise document structure.



• Apply Engineering Documentation Standards.



• Improve traceability.



• Improve maintainability.



• Improve recoverability.



• Enable documentation validation.



• Align documentation with Engineering Baselines.



\-------------------------------------------------------------------------------



\# 3. Scope



This process applies to:



• Legacy engineering documentation.



• Newly discovered engineering documents.



• Historical engineering records.



• Operational documentation.



• Architecture documentation.



• Validation documentation.



• Governance documentation.



Documents not registered within the Authoritative Engineering Documentation

Register (JD-DOC-001A) shall not be considered controlled engineering

documentation.



\-------------------------------------------------------------------------------



\# 4. Engineering Principles



Documentation modernisation shall always preserve engineering intent.



The process shall never prioritise formatting over engineering accuracy.



The following principles govern every migration.



• Preserve engineering knowledge.



• Preserve engineering history.



• Preserve repository traceability.



• Preserve version history where available.



• Preserve architectural intent.



• Apply governance consistently.



• Avoid unnecessary restructuring.



• Minimise engineering risk.



\-------------------------------------------------------------------------------



\# 5. Modernisation Workflow



Every document shall follow the standard engineering workflow.



Legacy Document



↓



Discovery



↓



Classification



↓



Template Selection



↓



Metadata Standardisation



↓



Content Modernisation



↓



Engineering Review



↓



Technical Validation



↓



Repository Integration



↓



Engineering Baseline



\-------------------------------------------------------------------------------



No document shall bypass any mandatory stage.



\-------------------------------------------------------------------------------



\# 6. Phase 1 — Discovery



The Discovery phase establishes the current state of the document.



Discovery activities include:



• Locate repository file.



• Confirm repository path.



• Identify document purpose.



• Determine engineering owner.



• Identify current version.



• Determine current status.



• Identify related Work Packages.



• Identify related modules.



\-------------------------------------------------------------------------------



Discovery Output



Engineering Discovery Record



\-------------------------------------------------------------------------------



\# 7. Phase 2 — Classification



Following Discovery, each document shall be classified.



Classification activities include:



• Assign permanent Document ID.



• Assign document family.



• Assign classification.



• Identify governing template.



• Assign Engineering Work Package.



• Record Engineering Baseline.



• Register within JD-DOC-001A.



\-------------------------------------------------------------------------------



Classification Output



Registered Engineering Configuration Item (ECI)



===============================================================================



PART 1 END



===============================================================================



\-------------------------------------------------------------------------------



\# 8. Phase 3 — Template Application



Following successful classification, the appropriate approved template shall be

selected from the Engineering Document Template Library (JD-DOC-001B).



Template selection shall be based upon the engineering purpose of the

document rather than its historical format.



\-------------------------------------------------------------------------------



Approved Template Families



• Governance



• Architecture



• Engineering



• Validation



• Work Package



• Operational Runbook



• Recovery Guide



• Release Notes



• API Specification



• Module Specification



• Reference



\-------------------------------------------------------------------------------



Template Application Activities



• Select approved template.



• Populate mandatory metadata.



• Confirm document classification.



• Confirm engineering ownership.



• Confirm Work Package ownership.



• Confirm Engineering Baseline.



• Confirm Git baseline.



\-------------------------------------------------------------------------------



Template Application Output



Controlled Engineering Document Skeleton



\-------------------------------------------------------------------------------



\# 9. Phase 4 — Content Modernisation



Following template application, engineering content shall be migrated into the

approved document structure.



The objective of this phase is to improve structure without compromising

engineering intent.



\-------------------------------------------------------------------------------



Modernisation Activities



• Preserve engineering knowledge.



• Preserve engineering decisions.



• Preserve historical context.



• Remove duplicated information.



• Normalise engineering terminology.



• Apply approved heading hierarchy.



• Update obsolete references.



• Introduce mandatory governance sections.



• Record Version History.



\-------------------------------------------------------------------------------



Content modernisation shall not alter the technical meaning of engineering

information without an approved Engineering Work Package.



\-------------------------------------------------------------------------------



Modernisation Output



Modernised Engineering Document



\-------------------------------------------------------------------------------



\# 10. Phase 5 — Engineering Review



Every modernised document shall undergo Engineering Review.



The Engineering Review confirms:



• Technical accuracy.



• Architecture consistency.



• Engineering terminology.



• Repository references.



• Metadata completeness.



• Work Package traceability.



• Git traceability.



• Cross-reference integrity.



• Compliance with JD-DOC-000.



\-------------------------------------------------------------------------------



Engineering Review Outcomes



Approved



Approved with Minor Changes



Requires Revision



Rejected



\-------------------------------------------------------------------------------



Documents requiring revision shall return to Phase 4 until review criteria are

satisfied.



\-------------------------------------------------------------------------------



Engineering Review Output



Engineering Review Record



\-------------------------------------------------------------------------------



\# 11. Phase 6 — Technical Validation



Following Engineering Review, documentation shall undergo Technical

Validation.



Technical Validation verifies compliance with the Engineering Documentation

Framework.



Validation Activities



• Metadata validation.



• Semantic version validation.



• Document ID validation.



• Template compliance.



• Version History validation.



• Repository path validation.



• Cross-reference validation.



• Markdown validation.



• Engineering status validation.



\-------------------------------------------------------------------------------



Future versions of the Documentation Validation Toolkit shall automate these

validation activities.



\-------------------------------------------------------------------------------



Technical Validation Output



Documentation Validation Report



\-------------------------------------------------------------------------------



\# 12. Phase 7 — Repository Integration



Validated documents shall be integrated into the controlled engineering

repository.



Repository Integration Activities



• Save document to approved repository path.



• Update JD-DOC-001A (Document Matrix).



• Update JD-DOC-001 (Document Control), where applicable.



• Update related documents.



• Record Git Commit.



• Record Git Tag, if applicable.



• Record Engineering Baseline.



\-------------------------------------------------------------------------------



Repository integration completes the documentation migration process.



\-------------------------------------------------------------------------------



Repository Integration Output



Controlled Engineering Configuration Item



\-------------------------------------------------------------------------------



\# 13. Engineering Quality Gates



Every document shall successfully pass the following quality gates.



Quality Gate 1



Discovery Complete



\-------------------------------------------------------------------------------



Quality Gate 2



Classification Complete



\-------------------------------------------------------------------------------



Quality Gate 3



Template Applied



\-------------------------------------------------------------------------------



Quality Gate 4



Content Modernised



\-------------------------------------------------------------------------------



Quality Gate 5



Engineering Review Approved



\-------------------------------------------------------------------------------



Quality Gate 6



Technical Validation Passed



\-------------------------------------------------------------------------------



Quality Gate 7



Repository Integration Completed



\-------------------------------------------------------------------------------



Documents failing any quality gate shall return to the previous applicable

phase before progressing.



\-------------------------------------------------------------------------------



\# 14. Migration Decision Matrix



The following decision matrix shall be used during document migration.



| Condition | Required Action |

|-----------|-----------------|

| Existing controlled document | Modernise using approved template |

| Legacy engineering document | Register and modernise |

| Duplicate document | Consolidate and archive duplicate |

| Superseded document | Archive and cross-reference replacement |

| New engineering document | Create using approved template |

| Historical reference | Preserve with Reference template |



\-------------------------------------------------------------------------------



Engineering decisions made during migration shall be recorded within the

appropriate Engineering Work Package and reflected in the Version History of

the affected document.



===============================================================================



PART 2 END



===============================================================================



\-------------------------------------------------------------------------------



\# 15. Roles and Responsibilities



The Engineering Documentation Modernisation Framework defines clear

responsibilities for every stage of the documentation lifecycle.



The following roles apply throughout the modernisation process.



\-------------------------------------------------------------------------------



Engineering Author



Responsibilities



• Perform document discovery.



• Select the appropriate approved template.



• Migrate engineering content.



• Preserve engineering intent.



• Populate mandatory metadata.



• Maintain Version History.



\-------------------------------------------------------------------------------



Engineering Reviewer



Responsibilities



• Review engineering accuracy.



• Verify architecture consistency.



• Verify compliance with JD-DOC-000.



• Verify template compliance.



• Approve or reject engineering changes.



\-------------------------------------------------------------------------------



Engineering Configuration Manager



Responsibilities



• Assign Document IDs.



• Maintain the Authoritative Engineering Documentation Register

&#x20; (JD-DOC-001A).



• Maintain repository consistency.



• Maintain Engineering Baseline alignment.



• Verify repository traceability.



\-------------------------------------------------------------------------------



Engineering Approver



Responsibilities



• Approve Engineering Baselines.



• Approve governance changes.



• Approve template changes.



• Approve document retirement.



\-------------------------------------------------------------------------------



\# 16. Engineering Modernisation Checklist



Every documentation migration shall complete the following checklist.



Discovery



☐ Repository location verified



☐ Existing version identified



☐ Engineering owner identified



☐ Related Work Packages identified



☐ Related engineering modules identified



\-------------------------------------------------------------------------------



Classification



☐ Document ID assigned



☐ Classification assigned



☐ Template selected



☐ Work Package assigned



☐ Engineering Baseline assigned



\-------------------------------------------------------------------------------



Migration



☐ Mandatory metadata completed



☐ Standard headings applied



☐ Existing engineering knowledge preserved



☐ Version History created or updated



☐ Cross references updated



\-------------------------------------------------------------------------------



Engineering Review



☐ Technical review completed



☐ Architecture review completed



☐ Terminology review completed



☐ Compliance review completed



\-------------------------------------------------------------------------------



Validation



☐ Metadata validated



☐ Template validated



☐ Repository path validated



☐ Cross references validated



☐ Markdown validated



\-------------------------------------------------------------------------------



Repository Integration



☐ Document committed to repository



☐ Document Matrix updated



☐ Document Control updated (if required)



☐ Git Commit recorded



☐ Git Tag recorded (where applicable)



☐ Engineering Baseline updated



\-------------------------------------------------------------------------------



\# 17. Documentation Validation Roadmap



The documentation modernisation process is designed to integrate with the

JustDefenders Validation Toolkit.



Future automation shall provide validation for:



• Metadata compliance



• Semantic versioning



• Mandatory sections



• Repository paths



• Cross references



• Document identifiers



• Engineering status



• Version history



• Markdown compliance



\-------------------------------------------------------------------------------



Future validation capability will be delivered through:



Invoke-JDDocumentationValidation



\-------------------------------------------------------------------------------



The validation capability shall become a mandatory Engineering Quality Gate

prior to establishing new Engineering Baselines.



\-------------------------------------------------------------------------------



\# 18. Continuous Modernisation



Engineering documentation shall be modernised continuously rather than through

periodic large-scale rewrites.



Modernisation shall occur:



• At completion of every Engineering Work Package.



• Following major architecture changes.



• Following Engineering Baseline creation.



• During engineering recovery activities.



• During engineering governance reviews.



\-------------------------------------------------------------------------------



Documentation shall evolve together with the engineering platform.



\-------------------------------------------------------------------------------



\# 19. Success Criteria



The Engineering Documentation Modernisation Programme shall be considered

successful when:



• Every controlled document is registered within JD-DOC-001A.



• Every document complies with JD-DOC-000.



• Every document is based upon an approved template.



• Every document contains mandatory metadata.



• Every document contains Version History.



• Every document identifies its Engineering Baseline.



• Every document is traceable to Git.



• Every document is traceable to an Engineering Work Package.



• Documentation validation passes.



• Documentation is synchronised with the platform.



\-------------------------------------------------------------------------------



\# 20. Future Evolution



Future enhancements to the Engineering Documentation Modernisation Process may

include:



• Automated document discovery.



• Automatic template selection.



• Automatic metadata generation.



• Automatic Git metadata insertion.



• Automated cross-reference analysis.



• Repository dependency mapping.



• Engineering knowledge graph generation.



• AI-assisted engineering review.



• Automated documentation metrics.



• Continuous documentation quality monitoring.



\-------------------------------------------------------------------------------



All future enhancements shall remain compatible with:



• JD-DOC-000 — Engineering Documentation Standard



• JD-DOC-001 — Engineering Documentation Control



• JD-DOC-001A — Authoritative Engineering Documentation Register



• JD-DOC-001B — Engineering Document Template Library



\-------------------------------------------------------------------------------



\# Appendix A — Modernisation Pipeline



Legacy Document



↓



Discovery



↓



Classification



↓



Template Selection



↓



Metadata Standardisation



↓



Content Modernisation



↓



Engineering Review



↓



Technical Validation



↓



Repository Integration



↓



Engineering Baseline



\-------------------------------------------------------------------------------



\# Appendix B — Quality Gate Summary



| Quality Gate | Required Outcome |

|--------------|------------------|

| QG-1 | Discovery Complete |

| QG-2 | Classification Complete |

| QG-3 | Approved Template Applied |

| QG-4 | Content Modernised |

| QG-5 | Engineering Review Approved |

| QG-6 | Technical Validation Passed |

| QG-7 | Repository Integration Complete |



\-------------------------------------------------------------------------------



\# Appendix C — Related Framework Documents



| Document ID | Document |

|-------------|----------|

| JD-DOC-000 | Engineering Documentation Standard |

| JD-DOC-001 | Engineering Documentation Control |

| JD-DOC-001A | Authoritative Engineering Documentation Register |

| JD-DOC-001B | Engineering Document Template Library |



\-------------------------------------------------------------------------------



\# Conclusion



The Engineering Documentation Modernisation Process establishes the

authoritative operating procedure for migrating, governing and maintaining

engineering documentation within the JustDefenders Engineering Documentation

Modernisation Framework (JEDMF).



Together with the Documentation Standard, Documentation Control, Documentation

Register and Template Library, it completes the governance foundation required

to manage engineering documentation as a controlled engineering asset.



===============================================================================



Version History



| Version | Date | Work Package | Engineer | Summary |

|----------|------|--------------|----------|---------|

| 1.0.0 | 12 July 2026 | WP-D001A-05 | JustDefenders Engineering | Initial release of the Engineering Documentation Modernisation Process. Established the controlled migration workflow, engineering quality gates, responsibility model, validation roadmap, repository integration process and continuous documentation modernisation lifecycle. |



\-------------------------------------------------------------------------------



Engineering Status



Document ID:

JD-DOC-001C



Status:

Engineering Baseline



Review Status:

Engineering Review



Approval Status:

Pending



Current Engineering Baseline:

WP-S004\_COMPLETE



Current Work Package:

WP-D001A-05



Framework Version:

JEDMF v1.0.0



Related Documents



JD-DOC-000 — Engineering Documentation Standard



JD-DOC-001 — Engineering Documentation Control



JD-DOC-001A — Authoritative Engineering Documentation Register



JD-DOC-001B — Engineering Document Template Library



Next Programme Phase



WP-D001B — Documentation Family Modernisation



JustDefenders©



===============================================================================

END OF DOCUMENT

===============================================================================

