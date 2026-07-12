===============================================================================
JustDefenders© Engineering Documentation
===============================================================================

Document ID:
JD-DOC-000

Document:
99_Document_Standards.md

Title:
JustDefenders Engineering Documentation Standard

Repository Path:
C:\dev\justdefenders\frontend\tooling\common\handover\99_Document_Standards.md

Version:
2.0.0

Status:
Engineering Baseline

Engineering Baseline:
WP-S004_COMPLETE

Current Work Package:
WP-D001A-01

Git Branch:
wave5b-platform-validation

Git Commit:
45b085a

Git Tag:
WP-S004_COMPLETE

Classification:
Engineering Governance

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

# 1. Executive Summary

The JustDefenders Engineering Documentation Standard defines the mandatory
governance, structure, lifecycle and configuration management requirements for
every controlled engineering document within the JustDefenders repository.

Engineering documentation is regarded as a permanent engineering asset equal in
importance to the platform source code.

The objective of this standard is to ensure that every engineering decision,
architectural design, validation result, recovery procedure and work package
remains fully recoverable independently of conversation history or individual
developers.

This document establishes the Engineering Documentation Framework (JEDF) that
governs the complete documentation library.

-------------------------------------------------------------------------------

# 2. Purpose

This standard exists to ensure engineering documentation is:

• Accurate.

• Traceable.

• Recoverable.

• Version controlled.

• Reviewable.

• Consistent.

• Maintainable.

• Professionally governed.

The documentation library shall provide sufficient information for an engineer
to recover, understand, maintain and continue development of the
JustDefenders platform without requiring access to historical conversations.

-------------------------------------------------------------------------------

# 3. Engineering Documentation Vision

The Engineering Documentation Library shall become the authoritative knowledge
repository for the JustDefenders platform.

Documentation shall evolve alongside the source code and remain synchronised
with the engineering baseline at all times.

Engineering documentation shall never become an afterthought.

Instead, documentation forms part of every completed Work Package.

No Work Package shall be considered complete until:

• Engineering implementation is complete.

• Validation has passed.

• Documentation has been updated.

• Source control has been committed.

-------------------------------------------------------------------------------

# 4. Engineering Documentation Principles

The documentation framework is governed by the following principles.

## 4.1 Documentation is Engineering

Engineering documentation is considered a software artefact rather than a
project note.

Documentation shall therefore receive the same engineering discipline as
production source code.

-------------------------------------------------------------------------------

## 4.2 Single Source of Truth

Each engineering topic shall have one authoritative document.

Duplicate documentation shall be avoided.

Where duplication is unavoidable, one document shall clearly identify itself as
the governing authority.

-------------------------------------------------------------------------------

## 4.3 Whole Document Engineering

Controlled engineering documents shall always be maintained as complete
documents.

Partial edits shall be avoided where practical.

Major revisions should regenerate the complete document rather than accumulate
incremental inconsistencies.

-------------------------------------------------------------------------------

## 4.4 Continuous Synchronisation

Documentation shall remain synchronised with:

• Source code

• Git history

• Engineering Baselines

• Work Packages

• Validation results

• Platform architecture

-------------------------------------------------------------------------------

## 4.5 Traceability

Every engineering statement shall be traceable back to one or more of:

• Work Package

• Git Commit

• Git Tag

• Validation Record

• Architecture Decision

-------------------------------------------------------------------------------

# 5. Engineering Documentation Framework (JEDF)

The JustDefenders Engineering Documentation Framework consists of five layers.

Layer 1

Engineering Governance

Defines policy, standards and document control.

-------------------------------------------------------------------------------

Layer 2

Architecture

Defines the platform architecture and engineering decisions.

-------------------------------------------------------------------------------

Layer 3

Engineering Management

Defines project execution, work packages, risk management and current state.

-------------------------------------------------------------------------------

Layer 4

Validation

Captures engineering validation, testing and release evidence.

-------------------------------------------------------------------------------

Layer 5

Reference

Supporting engineering information including release notes, standards,
templates and historical records.

-------------------------------------------------------------------------------

# 6. Engineering Configuration Management (ECM)

Engineering documentation is managed under formal Engineering Configuration
Management.

Every controlled document is treated as an Engineering Configuration Item
(ECI).

Every Engineering Configuration Item shall possess:

• Permanent Document ID

• Repository Path

• Semantic Version

• Engineering Baseline

• Git Traceability

• Review Status

• Approval Status

• Work Package Ownership

• Change History

-------------------------------------------------------------------------------

# 7. Controlled Document Metadata

Every controlled document shall begin with the following metadata.

Document ID

Document Title

Repository Path

Version

Status

Engineering Baseline

Current Work Package

Git Branch

Git Commit

Git Tag

Classification

Document Owner

Project

Review Status

Approval Status

Created

Last Engineering Review

Next Scheduled Review

Author

No controlled engineering document shall omit mandatory metadata.

-------------------------------------------------------------------------------

# 8. Engineering Configuration Items (ECIs)

Every document shall receive a permanent Engineering Configuration Item ID.

Example:

JD-DOC-000

Engineering Documentation Standard

JD-DOC-001

Document Control

JD-DOC-002

Project Context

JD-DOC-003

Master Handover

JD-DOC-004

Platform Recovery

JD-DOC-005

Engineering Toolkit

Engineering Configuration Item identifiers never change even when filenames or
document titles evolve.

-------------------------------------------------------------------------------

# 9. Document Classification

Every controlled document shall belong to one primary engineering class.

Permitted classifications include:

• Governance

• Architecture

• Engineering

• Validation

• Operations

• Release

• Reference

Classification shall remain stable throughout the document lifecycle unless
the document purpose fundamentally changes.

-------------------------------------------------------------------------------

# 10. Document Status

Every controlled document shall possess one engineering status.

Permitted status values are:

Draft

Engineering Review

Approved

Engineering Baseline

Production Baseline

Superseded

Archived

Status reflects engineering maturity rather than document completeness.

===============================================================================
PART 1 END
===============================================================================

-------------------------------------------------------------------------------

# 11. Semantic Versioning Standard

All controlled engineering documents shall implement Semantic Versioning.

Version format:

MAJOR.MINOR.PATCH

Where:

MAJOR

Represents a significant architectural or governance change.

Examples include:

• Engineering Baseline changes

• Alpha baseline completion

• Beta baseline completion

• Production baseline completion

• Major document restructuring

-------------------------------------------------------------------------------

MINOR

Represents completion of one or more Engineering Work Packages that
substantially change the documented subject.

Typical examples:

• Completion of WP-S004

• Completion of WP-S005

• New subsystem integration

• Significant engineering capability additions

-------------------------------------------------------------------------------

PATCH

Represents documentation-only corrections.

Examples:

• Typographical corrections

• Clarifications

• Formatting improvements

• Reference updates

• Broken cross-reference repairs

-------------------------------------------------------------------------------

Example Version Progression

1.0.0

Initial Engineering Baseline

↓

1.1.0

WP-S004 Completed

↓

1.2.0

WP-S005 Completed

↓

1.2.1

Documentation corrections

↓

2.0.0

Alpha Engineering Baseline

-------------------------------------------------------------------------------

# 12. Version History Requirements

Every controlled document shall contain a Version History table.

Minimum structure:

| Version | Date | Work Package | Engineer | Summary |
|----------|------|--------------|----------|---------|

Each version entry shall include:

• Version Number

• Engineering Date

• Responsible Work Package

• Engineering Owner

• Summary of Changes

Version history shall remain permanently within the document.

Historical entries shall never be removed.

-------------------------------------------------------------------------------

# 13. Work Package Integration

Engineering documentation is fully integrated with the JustDefenders Work
Package Framework.

Every document shall identify:

Owning Work Package

Current Work Package

Related Work Packages

Future Work Packages (where applicable)

Example

Owning Work Package

WP-D001A-01

Related Work Packages

WP-S004

WP-S005

WP-003F

Future Work Packages

WP-S006

-------------------------------------------------------------------------------

Every completed Work Package shall perform the following sequence.

1.

Engineering Implementation

↓

2.

Validation

↓

3.

Documentation Update

↓

4.

Git Commit

↓

5.

Git Tag (if applicable)

↓

6.

Engineering Baseline Updated

This workflow is mandatory.

-------------------------------------------------------------------------------

# 14. Git Integration

Engineering documentation shall always identify the exact source code
baseline that it documents.

Mandatory metadata

Git Branch

Git Commit

Git Tag

Engineering Baseline

Repository Path

-------------------------------------------------------------------------------

Every document shall therefore be recoverable to a specific repository state.

Example

Git Branch

wave5b-platform-validation

Git Commit

45b085a

Git Tag

WP-S004_COMPLETE

-------------------------------------------------------------------------------

Engineering documentation shall never describe software that cannot be
identified within Git.

-------------------------------------------------------------------------------

# 15. Repository Standards

The Engineering Documentation Library resides within:

tooling\common\handover

This location is considered part of the controlled engineering repository.

The documentation library shall remain under source control.

Documentation shall never exist solely within conversation history.

-------------------------------------------------------------------------------

Repository Structure

Governance

Architecture

Engineering

Validation

Release Notes

Reference Material

Templates

Historical Archives

-------------------------------------------------------------------------------

Each document shall occupy a single authoritative location.

Duplicate copies are prohibited unless explicitly archived.

-------------------------------------------------------------------------------

# 16. Engineering Lifecycle

Engineering documentation follows the same lifecycle as production software.

Stage 1

Draft

Engineering concept under development.

-------------------------------------------------------------------------------

Stage 2

Engineering Review

Under technical review.

-------------------------------------------------------------------------------

Stage 3

Approved

Engineering accepted.

-------------------------------------------------------------------------------

Stage 4

Engineering Baseline

Forms part of an official engineering baseline.

-------------------------------------------------------------------------------

Stage 5

Production Baseline

Approved for Production release.

-------------------------------------------------------------------------------

Stage 6

Superseded

Replaced by a newer engineering document.

-------------------------------------------------------------------------------

Stage 7

Archived

Retained for historical reference only.

-------------------------------------------------------------------------------

# 17. Engineering Review Process

Every controlled document shall undergo Engineering Review.

Engineering Review verifies:

Technical accuracy

Architecture consistency

Repository references

Cross references

Version correctness

Metadata completeness

Markdown quality

Engineering terminology

Traceability

Review outcome shall be recorded as one of:

Approved

Approved with Minor Changes

Requires Revision

Rejected

-------------------------------------------------------------------------------

Engineering Review shall be completed before the document becomes part of an
Engineering Baseline.

-------------------------------------------------------------------------------

# 18. Change Control

Engineering documentation shall follow formal Change Control.

Every modification shall identify:

Reason for change

Work Package

Affected Architecture

Affected Modules

Validation completed

Engineering decision

-------------------------------------------------------------------------------

Major engineering changes shall also reference:

Architecture Decision Register

Engineering Change Log

Master Handover

Current State

-------------------------------------------------------------------------------

Documentation shall never be modified without an identifiable engineering
reason.

===============================================================================
PART 2 END
===============================================================================

-------------------------------------------------------------------------------

# 19. Cross Reference Standards

Engineering documentation shall not exist in isolation.

Every controlled document shall identify its relationship to other controlled
engineering artefacts.

Each document shall contain the following sections where applicable:

Related Documents

Related Architecture

Related Work Packages

Related Validation

Related Git Tags

Related Modules

Related Engineering Decisions

-------------------------------------------------------------------------------

Cross references shall always use the controlled document title rather than
informal names.

Broken cross references shall be considered an Engineering Documentation
Defect and corrected during the next documentation review.

-------------------------------------------------------------------------------

# 20. Markdown Standards

All controlled documentation shall use standard GitHub-compatible Markdown.

The following conventions are mandatory.

-------------------------------------------------------------------------------

Headings

Use hierarchical heading levels.

# Level 1

## Level 2

### Level 3

#### Level 4

Heading levels shall not be skipped.

-------------------------------------------------------------------------------

Lists

Bullet lists shall use

•

or

-

Numbered procedures shall use sequential numbering.

-------------------------------------------------------------------------------

Code Blocks

Source code shall always be enclosed using fenced code blocks.

Examples shall identify the language where practical.

Example

```powershell
Get-JDOperationalHostStatus
```

-------------------------------------------------------------------------------

Tables

Tables shall be used where they improve readability.

Avoid excessively large tables.

-------------------------------------------------------------------------------

Emphasis

Bold shall identify engineering terminology.

Italic shall be used sparingly.

Underlining shall be avoided.

-------------------------------------------------------------------------------

Line Length

Where practical, line lengths should remain readable within GitHub without
horizontal scrolling.

-------------------------------------------------------------------------------

# 21. Diagram Standards

Engineering diagrams form part of controlled documentation.

Permitted diagram types include:

Architecture

Component

Sequence

Deployment

Workflow

State Machine

Dependency

Data Flow

-------------------------------------------------------------------------------

Preferred notation:

Mermaid

PlantUML

SVG

PNG

-------------------------------------------------------------------------------

Images shall never replace written engineering descriptions.

Every diagram shall include accompanying explanatory text.

-------------------------------------------------------------------------------

# 22. Table Standards

Tables shall be used for:

Configuration

Version History

Risk Registers

Work Package Registers

Validation Results

Architecture Summaries

Release Notes

-------------------------------------------------------------------------------

Every table shall contain meaningful headings.

Abbreviations shall be avoided unless previously defined.

-------------------------------------------------------------------------------

# 23. Engineering Templates

Every controlled document shall follow the standard document template.

Mandatory sections include:

Document Metadata

Executive Summary

Purpose

Scope

Architecture

Engineering Details

Validation

Dependencies

Future Work

Version History

Cross References

Engineering Status

-------------------------------------------------------------------------------

Individual document types may introduce additional sections provided mandatory
sections remain present.

-------------------------------------------------------------------------------

# 24. Quality Assurance

Engineering documentation shall undergo quality assurance before approval.

Quality Assurance shall verify:

Metadata completeness

Version correctness

Markdown compliance

Cross-reference integrity

Repository paths

Work Package traceability

Git traceability

Architecture consistency

Engineering terminology

Grammar and readability

-------------------------------------------------------------------------------

Quality Assurance findings shall be resolved prior to approval.

-------------------------------------------------------------------------------

# 25. Compliance Requirements

Compliance with this Engineering Documentation Standard is mandatory.

Every controlled engineering document shall comply with:

Metadata Standard

Semantic Versioning

Engineering Configuration Management

Review Process

Change Control

Traceability

Markdown Standards

Quality Assurance

-------------------------------------------------------------------------------

Non-compliant documentation shall not form part of an Engineering Baseline.

-------------------------------------------------------------------------------

# 26. Engineering Governance

The Engineering Documentation Library forms part of the JustDefenders
Engineering Configuration Management system.

Documentation governance shall be maintained with the same discipline as the
software source code.

Engineering governance principles include:

Accuracy

Completeness

Recoverability

Consistency

Traceability

Repeatability

Maintainability

-------------------------------------------------------------------------------

Engineering documentation shall be updated immediately following completion of
each Work Package.

Deferred documentation updates are prohibited except by explicit engineering
decision.

-------------------------------------------------------------------------------

# 27. Future Evolution

The Engineering Documentation Framework is expected to evolve alongside the
JustDefenders platform.

Future enhancements may include:

Automated document validation

Repository metadata generation

Cross-reference automation

Architecture diagram generation

Validation report generation

Release documentation generation

Engineering dashboard integration

AI-assisted documentation validation

-------------------------------------------------------------------------------

All future enhancements shall remain backward compatible wherever practical.

-------------------------------------------------------------------------------

# Appendix A — Mandatory Metadata

Every controlled engineering document shall contain, as a minimum:

• Document ID

• Document Title

• Repository Path

• Version

• Status

• Engineering Baseline

• Current Work Package

• Git Branch

• Git Commit

• Git Tag

• Classification

• Document Owner

• Project

• Review Status

• Approval Status

• Created

• Last Engineering Review

• Next Scheduled Review

• Author

-------------------------------------------------------------------------------

# Appendix B — Mandatory Version History

Every controlled engineering document shall include a Version History table.

Minimum columns:

Version

Date

Work Package

Engineer

Summary

-------------------------------------------------------------------------------

# Appendix C — Mandatory Cross References

Where applicable, documents shall identify:

Related Documents

Related Modules

Related Work Packages

Related Validation

Related Git Tags

Related Architecture Decisions

-------------------------------------------------------------------------------

# Appendix D — Engineering Completion Checklist

Before a Work Package is declared complete, the following checklist shall be
satisfied.

☐ Engineering implementation complete

☐ Validation complete

☐ Documentation updated

☐ Version history updated

☐ Git commit completed

☐ Git tag created (where applicable)

☐ Current State updated

☐ Work Package Register updated

☐ Engineering Change Log updated

☐ Master Handover updated

☐ Cross references verified

☐ Engineering review completed

-------------------------------------------------------------------------------

# Conclusion

This document defines the governing Engineering Documentation Standard for the
JustDefenders platform.

All controlled engineering documentation shall comply with this standard.

The Engineering Documentation Framework (JEDF) establishes documentation as a
first-class engineering artefact, ensuring that engineering knowledge remains
recoverable, traceable, maintainable and aligned with the platform source code
throughout the lifecycle of the JustDefenders project.

===============================================================================

Version History

| Version | Date | Work Package | Engineer | Summary |
|----------|------|--------------|----------|---------|
| 2.0.0 | 12 July 2026 | WP-D001A-01 | JustDefenders Engineering | Initial release of the Engineering Documentation Framework (JEDF). Introduced Engineering Configuration Management, semantic versioning, document lifecycle, Git traceability, mandatory metadata, review workflow, quality assurance requirements and governance standards for all controlled engineering documentation. |

-------------------------------------------------------------------------------

Engineering Status

Document ID:
JD-DOC-000

Status:
Engineering Baseline

Review Status:
Engineering Review

Approval Status:
Pending

Current Engineering Baseline:
WP-S004_COMPLETE

Current Work Package:
WP-D001A-01

Next Related Work Package:
WP-D001A-02 — 00_Document_Control.md Modernisation

JustDefenders©

===============================================================================
END OF DOCUMENT
===============================================================================