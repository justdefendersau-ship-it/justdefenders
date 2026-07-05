\# ============================================================================



\# JustDefenders©



\#



\# File:



\# C:\\dev\\justdefenders\\frontend\\docs\\knowledge-registers\\



\# KR-007-Operational-Insight-Rules.md



\#



\# Timestamp:



\# 29 June 2026 18:05 Sydney



\#



\# Knowledge Register



\#



\# KR-007



\#



\# Operational Insight Rules



\#



\# Status:



\# Canonical Register



\#



\# ============================================================================



\# Purpose



This Knowledge Register defines the principles governing the creation,

presentation and lifecycle of Operational Insights within the JustDefenders

Operational Intelligence Platform.



Operational Insights represent the primary mechanism through which the

platform communicates meaningful information to the owner.



Every Operational Insight should improve understanding, increase Decision

Confidence and reduce cognitive load.



\---



\# Architectural Principle



The platform shall notify the owner only when there is genuine operational

value.



More notifications do not represent better intelligence.



Better intelligence produces fewer, more meaningful notifications.



\---



\# Insight Lifecycle



Every Operational Insight progresses through a defined lifecycle.



Observed



↓



Evaluated



↓



Corroborated



↓



Presented



↓



Owner Response



↓



Recorded in Operational History



↓



Operational Memory Updated



↓



Digital Twin Updated



Every owner interaction contributes additional operational knowledge.



\---



\# Insight Categories



Operational Insights shall be classified as:



\* Informational

\* Advisory

\* Preventative

\* Expedition

\* Financial

\* Compliance

\* Safety

\* Critical



Each category shall have an appropriate presentation style and priority.



\---



\# Evidence Requirements



Operational Insights should, wherever possible, reference:



\* Operational History

\* Evidence

\* Fuel Intelligence

\* Parts Intelligence

\* Supplier Intelligence

\* Community Knowledge

\* Previous maintenance

\* Vehicle configuration



Recommendations without supporting context should be avoided.



\---



\# Expedition Intelligence



Expedition-specific insights may include:



\* Vehicle readiness

\* Outstanding maintenance

\* Recommended spare parts

\* Recommended consumables

\* Expedition-critical components

\* Associated part numbers

\* Related workshop references

\* Supplier availability

\* Previous expedition outcomes



Expedition recommendations shall be generated using the owner's Digital Twin

rather than generic vehicle assumptions.



\---



\# Owner Interaction



Owners should be able to:



\* Accept

\* Defer

\* Mark as completed

\* Record investigation

\* Add Evidence

\* Record observations

\* Identify contextual factors

\* Dismiss with explanation



The platform should learn from every interaction.



\---



\# Alert Fatigue



Operational Intelligence should actively minimise unnecessary alerts.



Repeated notifications for unchanged conditions should be avoided.



The platform should remember previous owner responses and incorporate them

into future reasoning.



The objective is meaningful assistance rather than constant interruption.



\---



\# Continuous Improvement



Operational Insight Rules shall evolve as additional operational knowledge is

acquired.



Changes should be based upon:



\* verified outcomes;

\* validated Evidence;

\* owner feedback;

\* Defender community knowledge;

\* and operational experience.



\---



\# Architectural References



Referenced by:



\* ADR-001 Operational Intelligence Philosophy

\* ADR-004 Fuel Intelligence

\* ADR-005 Mobile Operational Capture

\* Digital Twin

\* Expedition Intelligence

\* Parts Intelligence

\* Evidence Intelligence



This register defines the canonical rules governing Operational Insights

within the JustDefenders platform.



