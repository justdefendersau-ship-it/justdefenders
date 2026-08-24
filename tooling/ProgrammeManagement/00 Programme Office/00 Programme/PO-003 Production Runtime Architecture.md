\# JustDefenders Programme Office



\# Production Runtime Architecture



\*\*Document ID:\*\* PRA-001



\*\*Version:\*\* 1.0



\*\*Status:\*\* Approved Baseline



\*\*Last Updated:\*\* 6 August 2026



\---



\# Purpose



This document defines the production runtime architecture of the JustDefenders platform.



It describes the operational runtime components, their responsibilities, startup sequence, and interactions.



This document is descriptive.



It does not define future architecture or proposed designs.



\---



\# Runtime Overview



The JustDefenders platform currently consists of two primary runtime environments operating together.



```

&#x20;                  JustDefenders Platform



&#x20;       ┌────────────────────────────────────┐

&#x20;       │     PowerShell Operational Host    │

&#x20;       └────────────────────────────────────┘

&#x20;                      │

&#x20;                      │

&#x20;                      ▼

&#x20;            Managed Service Framework

&#x20;                      │

&#x20;      ┌───────────────┼────────────────┐

&#x20;      │               │                │

&#x20;  Harvester      Notifications    Future Services

&#x20;      │

&#x20;      ▼

Operational Runtime State



────────────────────────────────────────────────────



&#x20;       ┌────────────────────────────────────┐

&#x20;       │      Node / Next.js Runtime        │

&#x20;       └────────────────────────────────────┘

&#x20;                      │

&#x20;                      ▼

&#x20;             server/server.js

&#x20;                      │

&#x20;       ┌──────────────┼──────────────┐

&#x20;       │              │              │

&#x20;    Express        API Routes     Web UI

&#x20;       │              │

&#x20;       │              ▼

&#x20;       │       Runtime Endpoints

&#x20;       │

&#x20;       ▼

&#x20;   Harvester Runtime

```



\---



\# Runtime Components



\## 1. PowerShell Operational Platform



Purpose



Provides operational orchestration for engineering and managed services.



Responsibilities



\- Operational Service Host

\- Managed Service lifecycle

\- Runtime state

\- Scheduler

\- Diagnostics

\- Service registration

\- Health monitoring

\- Engineering runtime



Startup



```powershell

Import-Module .\\tooling\\engineering\\Services\\Platform-Runtime.psm1 -Force



Initialize-JDPlatform

```



Runtime Validation



Successful initialisation returns:



```

Status = Ready

```



\---



\## 2. Operational Service Host



Purpose



Coordinates all managed services.



Responsibilities



\- service registration

\- lifecycle management

\- scheduler participation

\- runtime ownership

\- diagnostics

\- health

\- recovery



Current Managed Services



\- Harvester



Future Managed Services



\- Notification Runtime

\- Knowledge Runtime

\- Intelligence Runtime

\- Federation Runtime



\---



\## 3. Managed Harvester



Purpose



Provides operational intelligence harvesting.



Current Capability



\- Managed Service registration

\- Source discovery

\- Harvest execution

\- Runtime reporting

\- Execution history

\- Runtime artefact persistence



Current Runtime Artefacts



\- harvester-runtime.json

\- supplier-live.json



\---



\## 4. Node / Next.js Runtime



Purpose



Hosts the operational web platform.



Current Startup



```

npm run dev

```



Current Entrypoint



```

server/server.js

```



Responsibilities



\- Express runtime

\- Next.js application

\- API routes

\- Runtime endpoints

\- Scheduler integration

\- Harvester integration



Expected Runtime Port



```

8081

```



\---



\# Startup Sequence



Recommended operational startup



Step 1



Initialise Operational Platform



```powershell

Import-Module .\\tooling\\engineering\\Services\\Platform-Runtime.psm1 -Force



Initialize-JDPlatform

```



Step 2



Start Node Runtime



```powershell

npm run dev

```



Expected Result



PowerShell



```

Platform Ready

```



Node



```

JustDefenders Operational Platform running on 8081



Bootstrapping service: harvester

Registered service: harvester

harvester online

Harvester managed-service cycle executing

```



\---



\# Runtime Boundaries



PowerShell Runtime



Owns



\- managed services

\- scheduler

\- diagnostics

\- engineering lifecycle



Node Runtime



Owns



\- HTTP services

\- API endpoints

\- user interface

\- runtime web services



Harvester



Participates in both environments through the managed-service framework.



\---



\# Current Operational Baseline



Programme Milestones



\- MS-004 Foundation Engineering Baseline

\- MS-005 Harvester Operational Baseline

\- MS-006 First Operational Harvest Executed



Repository Tag



```

MS-006\_OPERATIONAL\_HARVEST\_BASELINE

```



\---



\# Future Evolution



The current runtime architecture supports future expansion through additional managed services without requiring redesign of the Operational Service Host.



Planned future capability includes:



\- Result Normalisation

\- Persistence

\- Federation

\- Operational Intelligence

\- Predictive Intelligence



\---



\# Programme Office Statement



This document records the production runtime architecture as commissioned and validated on 6 August 2026.



Future revisions shall update this document only after Programme Office acceptance of the relevant engineering work packages.

