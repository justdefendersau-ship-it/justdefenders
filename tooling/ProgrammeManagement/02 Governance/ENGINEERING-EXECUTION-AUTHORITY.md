JUSTDEFENDERS®



FOUNDATION ENGINEERING



ENGINEERING EXECUTION AUTHORITY



Timestamp



05 August 2026



──────────────────────────────────────────────────────────────────────────────



PROGRAMME DIRECTION



The engineering workflow has been refined following execution of PR-016A.



The objective of these refinements is to reduce Programme Director workload, eliminate unnecessary pauses, improve engineering throughput and ensure every work package concludes with a complete production handover.



These instructions supersede previous workflow guidance for this work package and all subsequent engineering work packages unless explicitly overridden by the Programme Office.



Proceed under the following Engineering Execution Authority.



──────────────────────────────────────────────────────────────────────────────



ENGINEERING AUTHORITY



This Engineering Work Package operates under the authority of:



• PROGRAMME-000 — Authoritative Programme Blueprint

• ENGINEERING-000 — Engineering Constitution



The Recovery Engineering Constitution applies in full.



Recover.



Understand.



Validate.



Preserve.



Complete.



Nothing Material Is Lost.



──────────────────────────────────────────────────────────────────────────────



ENGINEERING EXECUTION MODEL



Proceed continuously from commencement until one of the following occurs:



• the work package is complete;

• a genuine architectural decision requiring Programme Office approval is identified;

• an unrecoverable technical blocker is encountered;

• additional production source files are genuinely required.



Do not stop after each engineering stage waiting for further approval.



Do not stop after discovery.



Do not stop after implementation.



Do not stop after engineering review.



Do not stop after runtime validation.



Continue autonomously through the approved engineering workflow until a genuine hard stop is reached.



──────────────────────────────────────────────────────────────────────────────



WORK PACKAGE DISCIPLINE



Remain strictly within the approved scope of the current work package.



If additional engineering opportunities are discovered:



• record them as recommendations for future work packages;



• do not expand the current work package unless:



&#x20; • the additional work is essential to achieve the approved objective; or



&#x20; • runtime validation proves the current work package cannot be completed without it.



Avoid scope creep.



Complete the approved work package before recommending subsequent work packages.



──────────────────────────────────────────────────────────────────────────────



APPROVED ENGINEERING WORKFLOW



Execute the following stages continuously:



1\. Recover and validate the relevant production implementation.



2\. Confirm the approved engineering objective.



3\. Produce the minimum engineering completion consistent with the recovered architecture.



4\. Perform an Engineering Review confirming that only authorised engineering changes have been made.



5\. Perform Runtime Validation.



6\. If runtime defects are identified:



&#x20;  • determine whether the defect belongs to the current work package;



&#x20;  • determine whether the defect pre-existed the current work package;



&#x20;  • correct defects that fall within the approved scope;



&#x20;  • if a new work package is required, produce an Engineering Change Proposal and stop.



7\. Produce every mandatory engineering deliverable.



8\. Stop only after producing the complete Engineering Handover Report or reaching a genuine hard stop.



──────────────────────────────────────────────────────────────────────────────



HARD STOP CONDITIONS



Stop only if:



• additional production source files are genuinely required;



• a change would alter the recovered architecture;



• a public interface must change outside the approved work package;



• Programme Office approval is required;



• runtime validation identifies a defect outside the approved work package;



• implementation cannot continue without further engineering authority.



Do not stop for routine engineering decisions.



Do not stop simply to request permission to continue.



──────────────────────────────────────────────────────────────────────────────



MANDATORY DELIVERABLES



Every Engineering Work Package shall conclude with:



1\. Production Artefact(s).



2\. Engineering Handover Report.



The Engineering Handover Report shall be delivered as ONE complete production document.



Do not fragment the report across multiple responses.



Do not produce multiple partial reports.



The Engineering Handover Report shall include, as a minimum:



• Executive Summary



• Engineering Change Summary



• Engineering Review



• Runtime Validation Procedure



• Runtime Validation Results



• Deployment Recommendation



• Files Modified

&#x20; (complete repository paths)



• Files Created

&#x20; (complete repository paths)



• Files Replaced

&#x20; (exact replacement instructions)



• Repository Archive Locations



• Runtime Commands

&#x20; (complete commands)



• Expected Results

&#x20; (for every command)



• Rollback Procedure



• Git Commands

&#x20; (complete commands)



• Programme Impact



• Engineering Decisions



• Programme Director Checklist



• Recommended Next Work Package



──────────────────────────────────────────────────────────────────────────────



ARCHIVING REQUIREMENTS



The Engineering Handover Report shall specify:



• the complete repository path of every production file modified;



• the complete repository path of every engineering report generated;



• the folder into which every report shall be archived;



• the folder into which every production artefact shall be stored;



• whether each artefact replaces an existing production file or is retained as engineering evidence.



The Programme Director shall never be required to determine where engineering artefacts are to be filed.



Unless otherwise directed by the Programme Office, engineering work package documentation shall be archived beneath:



tooling\\engineering\\WorkPackages\\<Work Package>\\



──────────────────────────────────────────────────────────────────────────────



COMMUNICATION STANDARD



Report progress only at significant engineering milestones.



Avoid unnecessary intermediate updates.



Continue engineering until:



• the work package is complete; or



• a genuine hard stop is reached.



If a hard stop is reached, explain:



• why engineering cannot continue;



• what evidence supports that conclusion;



• exactly what information or approval is required;



• the precise next action required from the Programme Director.



──────────────────────────────────────────────────────────────────────────────



ENGINEERING OBJECTIVE



Deliver production-quality engineering outcomes while minimising Programme Director workload.



Engineering shall reduce operational complexity, not increase it.



The Programme Director should only be required to:



• review the Engineering Handover Report;



• execute the documented commands;



• confirm validation results;



• execute the documented Git commands;



• archive the documented artefacts;



• close the work package;



• commence the next approved work package.



If the Programme Director needs to ask "What do I do next?", the Engineering Work Package is not complete.



END OF ENGINEERING EXECUTION AUTHORITY

