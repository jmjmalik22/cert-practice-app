export const AZ_305 = {
  label: "Azure Solutions Architect Expert",
  questions: [
    {
      id: "az305-001",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Your organization runs workloads across 40 subscriptions and wants a single place to query resource logs and metrics from all of them, with a consistent retention policy. What should you recommend?",
      options: [
        { id: "a", text: "A separate Log Analytics workspace per subscription" },
        { id: "b", text: "A centralized Log Analytics workspace that all subscriptions send diagnostic data to" },
        { id: "c", text: "Local disk logging on each virtual machine" },
        { id: "d", text: "Exporting logs manually to a spreadsheet each week" },
      ],
      correct: "b",
      explanation:
        "A centralized Log Analytics workspace lets you configure diagnostic settings across subscriptions to send logs and metrics to one place, giving a single query surface and one retention policy instead of managing many isolated workspaces.",
    },
    {
      id: "az305-002",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "A security team needs Azure resource logs forwarded in near real time to their third-party SIEM for correlation with on-premises events. Which approach should you recommend?",
      options: [
        { id: "a", text: "Export a monthly CSV of Log Analytics query results" },
        { id: "b", text: "Configure diagnostic settings to stream logs to an Event Hub the SIEM consumes" },
        { id: "c", text: "Have analysts sign in to the Azure portal to view each resource's logs" },
        { id: "d", text: "Disable logging to reduce noise" },
      ],
      correct: "b",
      explanation:
        "Diagnostic settings can route platform logs to an Event Hub, which external SIEM tools can consume as a near-real-time stream — the standard pattern for getting Azure telemetry into a third-party security tool.",
    },
    {
      id: "az305-003",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Developers report intermittent slow response times in a multi-tier web application, but can't tell which tier is responsible. Which monitoring solution should you recommend?",
      options: [
        { id: "a", text: "Application Insights with distributed tracing enabled" },
        { id: "b", text: "A single Azure Monitor metric chart for CPU usage" },
        { id: "c", text: "Manually adding print statements to the code" },
        { id: "d", text: "Azure Service Health only" },
      ],
      correct: "a",
      explanation:
        "Application Insights provides end-to-end distributed tracing across application tiers and dependencies, letting you pinpoint exactly which component or call is causing the latency — something a single infrastructure metric can't show.",
    },
    {
      id: "az305-004",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "You want an Azure Monitor alert that automatically restarts a virtual machine's application pool when CPU exceeds 90% for 10 minutes, without manual intervention. What should you configure alongside the alert rule?",
      options: [
        { id: "a", text: "An action group that triggers an Automation runbook" },
        { id: "b", text: "A dashboard tile showing the CPU trend" },
        { id: "c", text: "A budget alert in Cost Management" },
        { id: "d", text: "A Log Analytics saved search" },
      ],
      correct: "a",
      explanation:
        "An Azure Monitor alert rule paired with an action group that calls an Automation runbook (or Logic App) enables automated remediation — the alert condition triggers the action group, which runs the corrective script.",
    },
    {
      id: "az305-005",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "You need employees to sign in without typing a password, using a hardware security key or their device's built-in biometrics. Which authentication method should you recommend?",
      options: [
        { id: "a", text: "SMS-based one-time passcodes" },
        { id: "b", text: "FIDO2 security keys or Windows Hello for Business (passwordless authentication)" },
        { id: "c", text: "Shared service account credentials" },
        { id: "d", text: "Basic authentication with a long password policy" },
      ],
      correct: "b",
      explanation:
        "FIDO2 security keys and Windows Hello for Business are Microsoft Entra ID's passwordless authentication methods, letting users sign in with a hardware key or device biometrics instead of a password.",
    },
    {
      id: "az305-006",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "You need to require multi-factor authentication only when users sign in from outside your corporate network, without prompting users on trusted networks every time. What should you design?",
      options: [
        { id: "a", text: "A Conditional Access policy that requires MFA based on network location" },
        { id: "b", text: "A blanket MFA requirement for every sign-in regardless of location" },
        { id: "c", text: "Disabling MFA entirely to simplify sign-in" },
        { id: "d", text: "A password expiration policy" },
      ],
      correct: "a",
      explanation:
        "Conditional Access policies can evaluate signals such as network location (named locations/trusted IP ranges) and require MFA only when the sign-in doesn't originate from a trusted network, balancing security with user experience.",
    },
    {
      id: "az305-007",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Your company has an on-premises Active Directory and wants users to sign in to Azure resources with the same identity, without deploying and maintaining federation servers. Which solution should you recommend?",
      options: [
        { id: "a", text: "Microsoft Entra Connect with password hash synchronization" },
        { id: "b", text: "A separate Microsoft Entra ID account for every user with a different password" },
        { id: "c", text: "Active Directory Federation Services (AD FS) with dedicated federation servers" },
        { id: "d", text: "Manually re-creating each user account in the cloud" },
      ],
      correct: "a",
      explanation:
        "Microsoft Entra Connect with password hash synchronization provides hybrid identity with a single sign-in experience, without the infrastructure overhead of deploying and maintaining AD FS federation servers.",
    },
    {
      id: "az305-008",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "A team needs permission to restart and monitor virtual machines in a resource group, but must not be able to delete them or modify networking. Which approach best fits the principle of least privilege?",
      options: [
        { id: "a", text: "Assign the built-in Owner role at the subscription" },
        { id: "b", text: "Create a custom RBAC role scoped to the resource group with only the required actions" },
        { id: "c", text: "Assign Contributor at the subscription level" },
        { id: "d", text: "Share the subscription administrator's credentials" },
      ],
      correct: "b",
      explanation:
        "A custom RBAC role scoped to the specific resource group, granting only VM start/restart/read actions, follows least privilege far more precisely than a broad built-in role like Owner or Contributor at a wider scope.",
    },
    {
      id: "az305-009",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "A legacy on-premises web application needs to be securely published to external users, authenticated with Microsoft Entra ID, without exposing the server directly to the internet or rewriting the app. What should you recommend?",
      options: [
        { id: "a", text: "Microsoft Entra application proxy" },
        { id: "b", text: "Opening an inbound firewall rule directly to the web server" },
        { id: "c", text: "Migrating the entire application to a new codebase first" },
        { id: "d", text: "A public IP address assigned directly to the on-premises server" },
      ],
      correct: "a",
      explanation:
        "Microsoft Entra application proxy publishes on-premises web applications for secure remote access with Microsoft Entra authentication, using an outbound-only connector — no inbound firewall exposure or app rewrite is needed.",
    },
    {
      id: "az305-010",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Multiple application teams need to retrieve database connection strings and API keys at runtime without storing them in source code or app settings. What should you design?",
      options: [
        { id: "a", text: "Store secrets in a shared spreadsheet accessible to developers" },
        { id: "b", text: "Hardcode secrets into each application's configuration file" },
        { id: "c", text: "Azure Key Vault, accessed via managed identities assigned to each application" },
        { id: "d", text: "Email secrets to each team when they're rotated" },
      ],
      correct: "c",
      explanation:
        "Azure Key Vault centralizes secret storage, and managed identities let applications authenticate to Key Vault without any credentials embedded in code or configuration — the standard secure pattern for secrets, keys, and certificates.",
    },
    {
      id: "az305-011",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "A large enterprise has hundreds of subscriptions across several business units and wants Azure Policy assignments to automatically apply to every subscription under a given business unit, without assigning policies subscription by subscription. What should you design?",
      options: [
        { id: "a", text: "A management group hierarchy with policy assigned at each business unit's management group" },
        { id: "b", text: "Assigning the same policy manually to each subscription" },
        { id: "c", text: "A single resource group containing all resources" },
        { id: "d", text: "Tagging resources instead of using Azure Policy" },
      ],
      correct: "a",
      explanation:
        "Management groups let you organize subscriptions hierarchically and assign Azure Policy (or RBAC) at a management group scope, which then inherits down to every subscription and resource beneath it automatically.",
    },
    {
      id: "az305-012",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Finance wants to break down monthly Azure spend by department and environment (dev/test/prod) across thousands of resources. What should you design before resources are deployed?",
      options: [
        { id: "a", text: "A consistent resource tagging strategy (e.g., department and environment tags) enforced by Azure Policy" },
        { id: "b", text: "Naming resources randomly" },
        { id: "c", text: "Reviewing the invoice manually line by line each month" },
        { id: "d", text: "Creating one subscription per resource" },
      ],
      correct: "a",
      explanation:
        "A tagging strategy applied consistently — and enforced with Azure Policy so untagged resources are denied or flagged — lets Cost Management reports and exports break down spend by any tag dimension, like department or environment.",
    },
    {
      id: "az305-013",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "An auditor needs a single view showing how compliant Azure resources are against a specific regulatory standard (e.g., ISO 27001), with remediation recommendations. What should you use?",
      options: [
        { id: "a", text: "Microsoft Defender for Cloud's regulatory compliance dashboard" },
        { id: "b", text: "A manually maintained Excel checklist" },
        { id: "c", text: "The Azure Service Health page" },
        { id: "d", text: "Individual resource activity logs" },
      ],
      correct: "a",
      explanation:
        "Microsoft Defender for Cloud's regulatory compliance dashboard maps assessed controls to specific regulatory standards and highlights gaps with recommendations, purpose-built for this compliance-reporting scenario.",
    },
    {
      id: "az305-014",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "You need to guarantee that no one can create a storage account without encryption in transit enabled, across every subscription in the tenant, going forward. What should you recommend?",
      options: [
        { id: "a", text: "An Azure Policy definition with a 'deny' effect assigned at a high management group scope" },
        { id: "b", text: "An email reminder sent to all engineers" },
        { id: "c", text: "A wiki page documenting the requirement" },
        { id: "d", text: "Reviewing storage accounts manually once a quarter" },
      ],
      correct: "a",
      explanation:
        "An Azure Policy with a deny effect, assigned at a management group scope so it inherits tenant-wide, actively blocks non-compliant resource creation — a documentation-only approach can't prevent misconfiguration.",
    },
    {
      id: "az305-015",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Your organization invites external partners as Microsoft Entra guest users for project collaboration. Security wants guest access automatically reviewed and revoked if no longer needed. What should you design?",
      options: [
        { id: "a", text: "Microsoft Entra access reviews scheduled periodically for guest accounts" },
        { id: "b", text: "Never removing guest accounts once created" },
        { id: "c", text: "Asking guests to email IT when they no longer need access" },
        { id: "d", text: "Disabling guest access entirely" },
      ],
      correct: "a",
      explanation:
        "Microsoft Entra access reviews let you schedule recurring reviews of guest account access, routing the decision to a designated reviewer and automatically removing access that isn't confirmed as still needed.",
    },
    {
      id: "az305-016",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "Administrators currently hold standing Global Administrator rights at all times, which security flags as a risk. You need administrators to activate elevated access only when needed, with approval and a time limit. What should you design?",
      options: [
        { id: "a", text: "Microsoft Entra Privileged Identity Management (PIM) with just-in-time role activation" },
        { id: "b", text: "Keeping all administrators permanently assigned to Global Administrator" },
        { id: "c", text: "Sharing one administrator account among the team" },
        { id: "d", text: "Removing all administrative roles entirely" },
      ],
      correct: "a",
      explanation:
        "Privileged Identity Management (PIM) enables just-in-time, time-bound, and approval-gated activation of privileged roles, eliminating standing access while still letting administrators do their job when genuinely needed.",
    },
    {
      id: "az305-017",
      domain: "Design identity, governance, and monitoring solutions",
      question:
        "External contractors from a partner company need time-limited access to a specific set of internal applications, requested through a self-service catalog rather than individual RBAC assignments from IT. What should you design?",
      options: [
        { id: "a", text: "Microsoft Entra entitlement management access packages" },
        { id: "b", text: "Permanent Owner role assignments for each contractor" },
        { id: "c", text: "A shared password distributed by email" },
        { id: "d", text: "Manually creating a new custom role for every contractor" },
      ],
      correct: "a",
      explanation:
        "Entitlement management access packages let external users request bundled access to apps, groups, and sites through a self-service catalog, with approval workflows and automatic expiration — purpose-built for this governance scenario.",
    },
    {
      id: "az305-018",
      domain: "Design data storage solutions",
      question:
        "An application needs a relational database that requires SQL Agent jobs, cross-database queries, and linked servers, capabilities not available in the platform-as-a-service single database tier. Which service should you recommend?",
      options: [
        { id: "a", text: "Azure SQL Database (single database)" },
        { id: "b", text: "Azure SQL Managed Instance" },
        { id: "c", text: "Azure Table Storage" },
        { id: "d", text: "Azure Cosmos DB" },
      ],
      correct: "b",
      explanation:
        "Azure SQL Managed Instance offers near-complete SQL Server engine compatibility, including SQL Agent, cross-database queries, and linked servers — features Azure SQL Database's single-database tier does not support.",
    },
    {
      id: "az305-019",
      domain: "Design data storage solutions",
      question:
        "A development team's Azure SQL Database is used sporadically throughout the day with long idle periods, and they want to avoid paying for compute during idle time. Which compute tier should you recommend?",
      options: [
        { id: "a", text: "Provisioned compute tier sized for peak load, running 24/7" },
        { id: "b", text: "Serverless compute tier, which auto-pauses during inactivity" },
        { id: "c", text: "A dedicated SQL pool in Synapse" },
        { id: "d", text: "An on-premises SQL Server VM" },
      ],
      correct: "b",
      explanation:
        "The serverless compute tier for Azure SQL Database automatically scales compute and can auto-pause during inactive periods, billing only for storage while paused — ideal for intermittent dev/test workloads.",
    },
    {
      id: "az305-020",
      domain: "Design data storage solutions",
      question:
        "You manage 200 small Azure SQL databases for different customers, each with unpredictable and non-overlapping usage spikes. Provisioning fixed compute per database is too costly. What should you recommend?",
      options: [
        { id: "a", text: "An elastic pool that shares compute resources across the databases" },
        { id: "b", text: "A separate Premium-tier database for every customer" },
        { id: "c", text: "Consolidating all customers into a single unencrypted table" },
        { id: "d", text: "Manually scaling each database up and down throughout the day" },
      ],
      correct: "a",
      explanation:
        "Elastic pools let many databases share a pool of compute resources, so they collectively pay for capacity that matches aggregate usage rather than each database's individual peak — a good fit for many databases with unpredictable, non-simultaneous spikes.",
    },
    {
      id: "az305-021",
      domain: "Design data storage solutions",
      question:
        "A reporting workload runs heavy analytical queries against a production Azure SQL Database, and it's starting to affect transactional performance for the primary application. What should you recommend?",
      options: [
        { id: "a", text: "Route reporting queries to a read replica" },
        { id: "b", text: "Run reports directly against the primary database during business hours" },
        { id: "c", text: "Disable indexing on the production database" },
        { id: "d", text: "Reduce the production database's compute tier" },
      ],
      correct: "a",
      explanation:
        "A read replica (via read scale-out or geo-replication) offloads read-only reporting queries from the primary database, isolating analytical load from the transactional workload without impacting production performance.",
    },
    {
      id: "az305-022",
      domain: "Design data storage solutions",
      question:
        "A healthcare application stores sensitive patient identifiers in a SQL database. Compliance requires that even database administrators cannot view the plaintext values, only the application. What should you recommend?",
      options: [
        { id: "a", text: "Transparent Data Encryption (TDE) alone" },
        { id: "b", text: "Always Encrypted, so data is encrypted client-side and DBAs only see ciphertext" },
        { id: "c", text: "Storing the values in plaintext with restricted database permissions only" },
        { id: "d", text: "Firewall rules restricting who can connect to the database" },
      ],
      correct: "b",
      explanation:
        "Always Encrypted encrypts sensitive columns client-side, so the encryption keys never reach the database engine — administrators and anyone with database access see only ciphertext, unlike TDE which protects data at rest but not from privileged database users.",
    },
    {
      id: "az305-023",
      domain: "Design data storage solutions",
      question:
        "A global gaming company needs a database for player profiles with single-digit-millisecond reads/writes and automatic replication across five Azure regions. Which service should you recommend?",
      options: [
        { id: "a", text: "Azure Cosmos DB with multi-region distribution" },
        { id: "b", text: "A single-region Azure SQL Database" },
        { id: "c", text: "Azure Files" },
        { id: "d", text: "An on-premises NoSQL cluster" },
      ],
      correct: "a",
      explanation:
        "Azure Cosmos DB is purpose-built for globally distributed, low-latency access with turnkey multi-region replication and configurable consistency levels, directly matching this requirement.",
    },
    {
      id: "az305-024",
      domain: "Design data storage solutions",
      question:
        "A big-data analytics team needs to store petabytes of files with a hierarchical folder structure and fine-grained POSIX-style access control for Spark-based processing. Which storage solution should you recommend?",
      options: [
        { id: "a", text: "Azure Data Lake Storage Gen2 (hierarchical namespace enabled)" },
        { id: "b", text: "Azure Table Storage" },
        { id: "c", text: "A single virtual machine's local disk" },
        { id: "d", text: "Azure SQL Database" },
      ],
      correct: "a",
      explanation:
        "Azure Data Lake Storage Gen2 adds a hierarchical namespace and POSIX-style ACLs on top of Blob Storage, purpose-built for large-scale analytics workloads that need directory structure and granular access control.",
    },
    {
      id: "az305-025",
      domain: "Design data storage solutions",
      question:
        "A media company stores large video archives that are rarely accessed after 90 days but must be retrievable within hours if needed, and cost is the primary concern. What should you recommend?",
      options: [
        { id: "a", text: "Keep all videos in the Hot access tier indefinitely" },
        { id: "b", text: "A lifecycle management policy that moves blobs to the Cool then Archive tier over time" },
        { id: "c", text: "Delete the videos after 90 days" },
        { id: "d", text: "Store all videos on Premium SSD-backed disks" },
      ],
      correct: "b",
      explanation:
        "A blob lifecycle management policy can automatically transition data through Hot, Cool, and Archive tiers based on age, minimizing storage cost for infrequently accessed data while keeping it retrievable when needed.",
    },
    {
      id: "az305-026",
      domain: "Design data storage solutions",
      question:
        "A finance team accidentally deleted a container of critical blobs, and this has happened before. They want to be able to recover deleted or overwritten blobs going forward. What should you recommend?",
      options: [
        { id: "a", text: "Soft delete and blob versioning enabled on the storage account" },
        { id: "b", text: "Disabling access to the storage account for all users" },
        { id: "c", text: "Manually re-uploading files from local backups every time" },
        { id: "d", text: "Reducing the storage account's redundancy level" },
      ],
      correct: "a",
      explanation:
        "Soft delete retains deleted blobs/containers for a configurable retention period, and blob versioning preserves prior versions on overwrite — together they let you recover from accidental deletion or overwrite without external backups.",
    },
    {
      id: "az305-027",
      domain: "Design data storage solutions",
      question:
        "A financial services firm must retain trade records in an unmodifiable, tamper-proof state for 7 years to satisfy regulatory requirements. What should you recommend?",
      options: [
        { id: "a", text: "Immutable blob storage with a time-based retention policy" },
        { id: "b", text: "Standard blob storage with no special configuration" },
        { id: "c", text: "Storing records only in application memory" },
        { id: "d", text: "Deleting records after each fiscal year" },
      ],
      correct: "a",
      explanation:
        "Immutable storage policies (time-based retention or legal hold) on blob storage enforce WORM (write once, read many) behavior, preventing modification or deletion until the retention period expires — exactly what regulatory record retention requires.",
    },
    {
      id: "az305-028",
      domain: "Design data storage solutions",
      question:
        "You need to regularly copy data from an on-premises SQL Server into Azure Data Lake Storage, transforming it along the way, without exposing the on-premises server directly to the internet. What should you recommend?",
      options: [
        { id: "a", text: "Azure Data Factory with a self-hosted integration runtime" },
        { id: "b", text: "Manually exporting CSV files and emailing them" },
        { id: "c", text: "Opening an inbound port on the on-premises firewall for direct internet access" },
        { id: "d", text: "A single one-time manual migration with no ongoing pipeline" },
      ],
      correct: "a",
      explanation:
        "Azure Data Factory's self-hosted integration runtime establishes an outbound-only connection from the on-premises network, letting scheduled pipelines securely extract, transform, and load data into Azure without inbound firewall exposure.",
    },
    {
      id: "az305-029",
      domain: "Design data storage solutions",
      question:
        "A logistics company needs to ingest and analyze GPS telemetry from thousands of vehicles in real time to detect route deviations as they happen. Which combination should you recommend?",
      options: [
        { id: "a", text: "Azure Event Hubs for ingestion and Azure Stream Analytics for real-time processing" },
        { id: "b", text: "A nightly batch job that processes yesterday's data" },
        { id: "c", text: "Manually querying a database every hour" },
        { id: "d", text: "Storing telemetry in a spreadsheet for later review" },
      ],
      correct: "a",
      explanation:
        "Event Hubs provides high-throughput event ingestion at scale, and Stream Analytics processes that data with low-latency windowed queries — the standard pairing for real-time streaming analytics scenarios like this.",
    },
    {
      id: "az305-030",
      domain: "Design data storage solutions",
      question:
        "Analysts need to run occasional ad hoc SQL queries directly against files sitting in a data lake, without provisioning and paying for a dedicated cluster or warehouse that runs continuously. What should you recommend?",
      options: [
        { id: "a", text: "A Synapse serverless SQL pool" },
        { id: "b", text: "A dedicated SQL pool sized for peak load" },
        { id: "c", text: "A single always-on virtual machine running SQL Server" },
        { id: "d", text: "Exporting the entire data lake to Excel first" },
      ],
      correct: "a",
      explanation:
        "A Synapse serverless SQL pool lets you query data directly in the data lake using a pay-per-query, on-demand model, with no cluster to provision or manage — ideal for occasional ad hoc analysis.",
    },
    {
      id: "az305-031",
      domain: "Design data storage solutions",
      question:
        "An enterprise needs a large-scale, MPP data warehouse that supports complex joins and aggregations across terabytes of structured historical data for BI reporting, with predictable, dedicated performance. What should you recommend?",
      options: [
        { id: "a", text: "A dedicated SQL pool in Azure Synapse Analytics" },
        { id: "b", text: "Azure Table Storage" },
        { id: "c", text: "A single-node relational database with no partitioning" },
        { id: "d", text: "Local Excel workbooks" },
      ],
      correct: "a",
      explanation:
        "A dedicated SQL pool provides a massively parallel processing (MPP) architecture with provisioned, predictable compute, built for large-scale enterprise data warehousing and complex analytical queries.",
    },
    {
      id: "az305-032",
      domain: "Design business continuity solutions",
      question:
        "A regulated workload requires that, in the event of a regional Azure outage, virtual machines can be recovered in a secondary region within a defined RTO and RPO. What should you recommend?",
      options: [
        { id: "a", text: "Azure Site Recovery replicating the VMs to a secondary region" },
        { id: "b", text: "Relying on the primary region never failing" },
        { id: "c", text: "Taking a one-time manual VM export with no ongoing replication" },
        { id: "d", text: "Deleting the VMs and redeploying from scratch after an outage" },
      ],
      correct: "a",
      explanation:
        "Azure Site Recovery continuously replicates VM disks to a secondary region and orchestrates failover, letting you meet defined recovery time and recovery point objectives for disaster recovery — a one-time export or ad hoc redeployment cannot guarantee this.",
    },
    {
      id: "az305-033",
      domain: "Design business continuity solutions",
      question:
        "You need to back up a fleet of Azure VMs with the ability to restore individual files, and the backups must remain available even if the source region is lost. What should you recommend?",
      options: [
        { id: "a", text: "Azure Backup with a Recovery Services vault configured for geo-redundant storage" },
        { id: "b", text: "Manual VM snapshots stored on the same disk" },
        { id: "c", text: "No backup, relying on VM uptime SLAs" },
        { id: "d", text: "Copying VHD files to a folder on the same VM" },
      ],
      correct: "a",
      explanation:
        "Azure Backup with a geo-redundant (GRS) Recovery Services vault stores recovery points in a paired region, and supports file-level and full VM restore, protecting against both accidental loss and regional failure.",
    },
    {
      id: "az305-034",
      domain: "Design business continuity solutions",
      question:
        "An e-commerce database must automatically fail over to a secondary Azure region during an outage with minimal data loss and minimal application reconfiguration. What should you recommend for Azure SQL Database?",
      options: [
        { id: "a", text: "Auto-failover groups pointing the app at a stable listener endpoint" },
        { id: "b", text: "A single database with no replication" },
        { id: "c", text: "Manually restoring from a backup taken the previous week" },
        { id: "d", text: "Hardcoding the database's connection string to a specific region" },
      ],
      correct: "a",
      explanation:
        "Auto-failover groups provide a stable read-write listener endpoint that automatically redirects to the new primary after failover, minimizing both data loss (via synchronous/near-synchronous replication) and the application changes needed during a regional outage.",
    },
    {
      id: "az305-035",
      domain: "Design business continuity solutions",
      question:
        "A company stores critical documents in Blob Storage and wants protection against both accidental deletion and a full regional outage, using the least operational overhead. What should you recommend?",
      options: [
        { id: "a", text: "Geo-redundant storage (GRS) combined with soft delete" },
        { id: "b", text: "Locally redundant storage (LRS) only" },
        { id: "c", text: "Storing a single copy on one VM's local disk" },
        { id: "d", text: "No redundancy configuration at all" },
      ],
      correct: "a",
      explanation:
        "Geo-redundant storage replicates data to a paired region for protection against regional outages, while soft delete guards against accidental deletion — combined, they cover both risks with minimal ongoing operational effort.",
    },
    {
      id: "az305-036",
      domain: "Design business continuity solutions",
      question:
        "A web application runs on a set of virtual machines and must remain available even if an entire Azure datacenter within a region experiences a power or network failure. What should you recommend?",
      options: [
        { id: "a", text: "Deploy the VMs across multiple Availability Zones behind a load balancer" },
        { id: "b", text: "Deploy all VMs in a single rack in one datacenter" },
        { id: "c", text: "Rely on a single VM with no redundancy" },
        { id: "d", text: "Use only availability sets within a single physical datacenter" },
      ],
      correct: "a",
      explanation:
        "Availability Zones are physically separate datacenters within a region, each with independent power, cooling, and networking — spreading VMs across zones (behind a load balancer) protects against a single datacenter failure, unlike availability sets which only protect against rack-level failures within one datacenter.",
    },
    {
      id: "az305-037",
      domain: "Design business continuity solutions",
      question:
        "A latency-sensitive trading application needs its VMs placed as physically close together as possible to minimize network latency between them. Which design consideration should you weigh against high availability?",
      options: [
        { id: "a", text: "Proximity placement groups reduce inter-VM latency but constrain VMs to one datacenter, trading off zone-level resiliency" },
        { id: "b", text: "Proximity placement groups automatically span multiple regions" },
        { id: "c", text: "Proximity placement groups increase latency between VMs" },
        { id: "d", text: "Proximity placement groups replace the need for any load balancer" },
      ],
      correct: "a",
      explanation:
        "Proximity placement groups colocate VMs physically close together to minimize latency, but this constrains them to a single datacenter — a deliberate tradeoff against the resiliency benefits of spreading VMs across Availability Zones.",
    },
    {
      id: "az305-038",
      domain: "Design business continuity solutions",
      question:
        "An organization runs Azure SQL Managed Instance and needs it to remain available if an entire datacenter (zone) within the region fails, without provisioning a separate secondary instance to manage manually. What should you recommend?",
      options: [
        { id: "a", text: "Deploy the managed instance with zone-redundant configuration" },
        { id: "b", text: "Deploy the managed instance in a single, non-redundant zone" },
        { id: "c", text: "Take manual backups once a month as the only protection" },
        { id: "d", text: "Disable automated patching to avoid downtime" },
      ],
      correct: "a",
      explanation:
        "Zone-redundant configuration for Azure SQL Managed Instance automatically maintains replicas across Availability Zones and fails over transparently, without requiring you to provision and manage a separate secondary instance yourself.",
    },
    {
      id: "az305-039",
      domain: "Design business continuity solutions",
      question:
        "A retail company uses Cosmos DB for its shopping cart service and needs both writes and reads to continue with low latency even if an entire Azure region becomes unavailable. What should you recommend?",
      options: [
        { id: "a", text: "Multi-region writes across at least two Cosmos DB regions" },
        { id: "b", text: "A single-region Cosmos DB account with manual failover only" },
        { id: "c", text: "Storing cart data only in browser local storage" },
        { id: "d", text: "Disabling automatic failover" },
      ],
      correct: "a",
      explanation:
        "Cosmos DB's multi-region writes let every configured region accept both reads and writes, so if one region becomes unavailable, traffic continues to be served with low latency from the remaining regions with no single point of failure.",
    },
    {
      id: "az305-040",
      domain: "Design business continuity solutions",
      question:
        "A company needs read access to its blob data to continue even if the primary region has an outage, without necessarily needing write access during the outage. Which redundancy option best fits, at lower cost than a fully active-active design?",
      options: [
        { id: "a", text: "Read-access geo-redundant storage (RA-GRS)" },
        { id: "b", text: "Locally redundant storage (LRS) only" },
        { id: "c", text: "No replication configured" },
        { id: "d", text: "Zone-redundant storage (ZRS) only, within a single region" },
      ],
      correct: "a",
      explanation:
        "RA-GRS replicates data to a secondary region and exposes a read-only endpoint there, so reads can continue during a primary region outage — a lower-cost option than a fully active-active multi-region write architecture.",
    },
    {
      id: "az305-041",
      domain: "Design business continuity solutions",
      question:
        "A manufacturing company has on-premises virtual machines running a legacy line-of-business application and needs a disaster recovery target in Azure in case the on-premises datacenter fails. What should you recommend?",
      options: [
        { id: "a", text: "Azure Site Recovery configured to replicate the on-premises VMs to Azure" },
        { id: "b", text: "Taking periodic manual backups to an external hard drive" },
        { id: "c", text: "No DR plan, since the datacenter has never failed before" },
        { id: "d", text: "Recreating the application from scratch after a failure occurs" },
      ],
      correct: "a",
      explanation:
        "Azure Site Recovery supports replicating on-premises (hybrid) VMware, Hyper-V, or physical servers into Azure, enabling orchestrated failover to Azure as the recovery site if the on-premises datacenter becomes unavailable.",
    },
    {
      id: "az305-042",
      domain: "Design business continuity solutions",
      question:
        "During annual disaster recovery testing, the business wants to validate a full regional failover of its VMs without impacting the production environment currently running. What Azure Site Recovery capability should you recommend?",
      options: [
        { id: "a", text: "A test failover, which spins up VMs in an isolated network without affecting production replication" },
        { id: "b", text: "A full production failover during business hours" },
        { id: "c", text: "Deleting the primary VMs to simulate an outage" },
        { id: "d", text: "Disabling replication before testing" },
      ],
      correct: "a",
      explanation:
        "Azure Site Recovery's test failover creates recovered VMs in an isolated test network, validating the DR plan end-to-end without disrupting ongoing replication or impacting the live production environment.",
    },
    {
      id: "az305-043",
      domain: "Design infrastructure solutions",
      question:
        "A workload consists of short-lived, independent processing tasks that scale to zero when there's no work and must scale out rapidly during bursts, with no need to manage the underlying servers. Which compute characteristic should drive your recommendation?",
      options: [
        { id: "a", text: "A serverless, event-driven compute model" },
        { id: "b", text: "A single, always-on virtual machine sized for peak load" },
        { id: "c", text: "A fixed cluster of VMs that never scales" },
        { id: "d", text: "An on-premises physical server" },
      ],
      correct: "a",
      explanation:
        "Workload requirements — short-lived tasks, scale-to-zero, rapid burst scaling, and no server management — point directly to a serverless, event-driven compute model rather than a fixed VM footprint.",
    },
    {
      id: "az305-044",
      domain: "Design infrastructure solutions",
      question:
        "A team needs to run a GPU-accelerated deep learning training job on Azure virtual machines. Which factor should primarily drive the VM size selection?",
      options: [
        { id: "a", text: "Choosing a VM series that includes GPU hardware (e.g., an N-series size)" },
        { id: "b", text: "Choosing the cheapest general-purpose VM size available" },
        { id: "c", text: "Choosing a burstable B-series VM" },
        { id: "d", text: "Choosing a VM size based only on disk size" },
      ],
      correct: "a",
      explanation:
        "GPU-accelerated workloads require a VM series that actually includes GPU hardware; general-purpose or burstable VM sizes don't provide GPUs regardless of their CPU/memory specs.",
    },
    {
      id: "az305-045",
      domain: "Design infrastructure solutions",
      question:
        "A team wants full control over Kubernetes configuration, custom networking (CNI plugins), and node pool scaling policies for a complex microservices platform. Which compute option should you recommend over a simpler managed-container service?",
      options: [
        { id: "a", text: "Azure Kubernetes Service (AKS)" },
        { id: "b", text: "Azure Container Apps" },
        { id: "c", text: "Azure Functions" },
        { id: "d", text: "A single virtual machine running Docker manually" },
      ],
      correct: "a",
      explanation:
        "AKS exposes the full Kubernetes API and control plane, giving teams fine-grained control over networking, node pools, and cluster configuration — capabilities beyond what the simpler, more opinionated Container Apps platform exposes.",
    },
    {
      id: "az305-046",
      domain: "Design infrastructure solutions",
      question:
        "A team wants to run containerized microservices with built-in autoscaling and traffic splitting for blue-green deployments, without managing Kubernetes infrastructure themselves. What should you recommend?",
      options: [
        { id: "a", text: "Azure Container Apps" },
        { id: "b", text: "A self-managed Kubernetes cluster on IaaS VMs" },
        { id: "c", text: "A single dedicated VM per microservice" },
        { id: "d", text: "On-premises bare-metal servers" },
      ],
      correct: "a",
      explanation:
        "Azure Container Apps provides a serverless container platform (built on Kubernetes under the hood) with built-in autoscaling and revision-based traffic splitting, without exposing or requiring management of the Kubernetes control plane.",
    },
    {
      id: "az305-047",
      domain: "Design infrastructure solutions",
      question:
        "An organization needs to run a large, parallel scientific simulation across hundreds of compute cores, on demand, without maintaining a permanent cluster. What should you recommend?",
      options: [
        { id: "a", text: "Azure Batch" },
        { id: "b", text: "A single small VM" },
        { id: "c", text: "Azure Functions Consumption plan" },
        { id: "d", text: "Azure App Service" },
      ],
      correct: "a",
      explanation:
        "Azure Batch is purpose-built for large-scale parallel and high-performance batch computing jobs, automatically provisioning a pool of compute nodes on demand and scaling it down when the job completes.",
    },
    {
      id: "az305-048",
      domain: "Design infrastructure solutions",
      question:
        "An order-processing system must guarantee that each order message is processed exactly once, in order, and failed messages should be moved aside for later inspection rather than lost. Which messaging service should you recommend?",
      options: [
        { id: "a", text: "Azure Service Bus queues with dead-lettering" },
        { id: "b", text: "Azure Event Grid" },
        { id: "c", text: "A shared in-memory list within the application" },
        { id: "d", text: "Storing messages in a plaintext log file only" },
      ],
      correct: "a",
      explanation:
        "Azure Service Bus provides FIFO ordering (with sessions), at-least-once delivery guarantees, and dead-letter queues for messages that can't be processed — the right fit for order-critical, guaranteed-delivery messaging scenarios.",
    },
    {
      id: "az305-049",
      domain: "Design infrastructure solutions",
      question:
        "You want several independent downstream services to automatically react whenever a new file is uploaded to Blob Storage, without those services polling storage continuously. What should you recommend?",
      options: [
        { id: "a", text: "Azure Event Grid subscriptions triggered by blob-created events" },
        { id: "b", text: "Each service polling the storage account every few seconds" },
        { id: "c", text: "Manual notification via email" },
        { id: "d", text: "A nightly batch job that checks for new files" },
      ],
      correct: "a",
      explanation:
        "Azure Event Grid natively supports Blob Storage events and can fan out a single event (like a blob-created event) to multiple independent subscriber endpoints in near real time, avoiding wasteful and slower polling.",
    },
    {
      id: "az305-050",
      domain: "Design infrastructure solutions",
      question:
        "A company exposes several backend APIs to external partners and needs centralized rate limiting, API key management, and request/response transformation without modifying each backend service. What should you recommend?",
      options: [
        { id: "a", text: "Azure API Management as a gateway in front of the backend APIs" },
        { id: "b", text: "Giving partners direct network access to each backend service" },
        { id: "c", text: "Building rate limiting separately into every backend service" },
        { id: "d", text: "No gateway, relying on partners to self-throttle" },
      ],
      correct: "a",
      explanation:
        "Azure API Management sits in front of backend APIs as a gateway, centralizing concerns like throttling, key management, versioning, and transformation policies without requiring changes to each individual backend service.",
    },
    {
      id: "az305-051",
      domain: "Design infrastructure solutions",
      question:
        "A high-traffic web app performs the same expensive database query for many concurrent users and needs to reduce database load and improve response times. What should you recommend?",
      options: [
        { id: "a", text: "Azure Cache for Redis in front of the database for frequently read data" },
        { id: "b", text: "Increasing the database's compute tier indefinitely" },
        { id: "c", text: "Running the query fresh for every single request" },
        { id: "d", text: "Removing the database entirely" },
      ],
      correct: "a",
      explanation:
        "Azure Cache for Redis provides a low-latency, in-memory cache for frequently accessed data, reducing repeated load on the database and improving response times far more cost-effectively than continuously scaling up database compute.",
    },
    {
      id: "az305-052",
      domain: "Design infrastructure solutions",
      question:
        "A company is planning a large-scale migration to Azure and wants a structured, phased approach covering strategy, planning, readiness, adoption, governance, and management. What should guide the overall approach?",
      options: [
        { id: "a", text: "The Microsoft Cloud Adoption Framework for Azure" },
        { id: "b", text: "Migrating all workloads simultaneously with no plan" },
        { id: "c", text: "A framework designed only for on-premises datacenter design" },
        { id: "d", text: "Ad hoc migration decided independently by each team" },
      ],
      correct: "a",
      explanation:
        "The Cloud Adoption Framework for Azure provides Microsoft's structured methodology — strategy, plan, ready, adopt (migrate/innovate), govern, and manage — specifically designed to guide large-scale, phased cloud migrations.",
    },
    {
      id: "az305-053",
      domain: "Design infrastructure solutions",
      question:
        "Before migrating hundreds of on-premises virtual machines to Azure, you need to right-size target Azure VMs and understand dependencies between servers to group them into migration waves. What should you recommend?",
      options: [
        { id: "a", text: "Azure Migrate, using its discovery, assessment, and dependency mapping features" },
        { id: "b", text: "Guessing VM sizes without any assessment" },
        { id: "c", text: "Migrating servers one at a time with no dependency analysis" },
        { id: "d", text: "Skipping assessment and moving straight to migration" },
      ],
      correct: "a",
      explanation:
        "Azure Migrate discovers on-premises servers, assesses Azure readiness and right-sized target VM configurations, and maps dependencies between servers — exactly the data needed to plan accurate, well-sequenced migration waves.",
    },
    {
      id: "az305-054",
      domain: "Design infrastructure solutions",
      question:
        "A company is moving a web application to Azure and wants to minimize ongoing patching and infrastructure management, accepting some loss of low-level OS control in exchange. What migration approach should you recommend?",
      options: [
        { id: "a", text: "Re-platform the app to Azure App Service (PaaS) instead of lifting it to an IaaS VM" },
        { id: "b", text: "Lift-and-shift the app to an IaaS virtual machine unchanged" },
        { id: "c", text: "Keep the application entirely on-premises" },
        { id: "d", text: "Move the app to an unmanaged bare-metal server" },
      ],
      correct: "a",
      explanation:
        "Re-platforming to a PaaS service like Azure App Service offloads OS patching, scaling infrastructure, and platform management to Azure, at the cost of some low-level control — the right tradeoff when minimizing operational overhead is the priority.",
    },
    {
      id: "az305-055",
      domain: "Design infrastructure solutions",
      question:
        "A company must migrate a 5 TB on-premises SQL Server database to Azure SQL Managed Instance with minimal application downtime. What should you recommend?",
      options: [
        { id: "a", text: "Azure Database Migration Service in online (continuous replication) mode" },
        { id: "b", text: "Taking the database offline for a multi-day manual export/import" },
        { id: "c", text: "Manually scripting every table and re-entering data by hand" },
        { id: "d", text: "Emailing a backup file between administrators" },
      ],
      correct: "a",
      explanation:
        "Azure Database Migration Service's online migration mode continuously replicates changes from the source database during migration, allowing a final quick cutover and minimizing downtime compared to an offline export/import approach.",
    },
    {
      id: "az305-056",
      domain: "Design infrastructure solutions",
      question:
        "A global e-commerce site needs its public-facing web traffic accelerated and cached at the edge, with a web application firewall, and traffic routed to the closest healthy regional backend. What should you recommend?",
      options: [
        { id: "a", text: "Azure Front Door with WAF enabled" },
        { id: "b", text: "A single regional Azure Load Balancer" },
        { id: "c", text: "DNS round-robin with no health checks" },
        { id: "d", text: "A single VM with a public IP and no CDN" },
      ],
      correct: "a",
      explanation:
        "Azure Front Door is a global, edge-based entry point offering caching, WAF integration, and latency-based routing to the nearest healthy backend — matching every requirement in this global HTTP(S) scenario.",
    },
    {
      id: "az305-057",
      domain: "Design infrastructure solutions",
      question:
        "A financial company needs a private, dedicated, high-throughput, low-latency connection between its on-premises datacenter and Azure that doesn't traverse the public internet. What should you recommend?",
      options: [
        { id: "a", text: "Azure ExpressRoute" },
        { id: "b", text: "A site-to-site VPN over the public internet" },
        { id: "c", text: "A single point-to-site VPN for one laptop" },
        { id: "d", text: "No connectivity, using only public endpoints" },
      ],
      correct: "a",
      explanation:
        "ExpressRoute provides a private, dedicated connection through a connectivity provider that bypasses the public internet entirely, offering higher throughput, lower latency, and more predictable performance than a VPN.",
    },
    {
      id: "az305-058",
      domain: "Design infrastructure solutions",
      question:
        "An organization already uses ExpressRoute but notices extra latency because traffic between on-premises and certain Azure PaaS services routes through the Microsoft edge network non-optimally. What feature should you recommend to reduce that latency for supported SKUs?",
      options: [
        { id: "a", text: "ExpressRoute FastPath" },
        { id: "b", text: "Switching entirely to a site-to-site VPN" },
        { id: "c", text: "Disabling ExpressRoute" },
        { id: "d", text: "Adding more virtual network peerings with no other change" },
      ],
      correct: "a",
      explanation:
        "ExpressRoute FastPath forwards traffic directly to the destination virtual network (bypassing the ExpressRoute gateway data path), reducing latency for supported connections and SKUs.",
    },
    {
      id: "az305-059",
      domain: "Design infrastructure solutions",
      question:
        "A hub-and-spoke network design must centrally filter and log all outbound internet traffic from every spoke virtual network, and also allow private, non-internet-routed access from spokes to PaaS services like a storage account. What combination should you recommend?",
      options: [
        { id: "a", text: "Azure Firewall in the hub for centralized egress control, and Private Link/Private Endpoint for private PaaS access" },
        { id: "b", text: "No security appliance and public endpoints for every PaaS service" },
        { id: "c", text: "A separate, unmanaged NSG per virtual machine with no central policy" },
        { id: "d", text: "Allowing unrestricted outbound traffic from every spoke" },
      ],
      correct: "a",
      explanation:
        "Azure Firewall centralized in the hub gives a single point of egress filtering and logging for all spokes, while Private Link/Private Endpoint provides private connectivity to PaaS services over the virtual network instead of the public internet — together satisfying both requirements.",
    },
    {
      id: "az305-060",
      domain: "Design infrastructure solutions",
      question:
        "A company runs a regional web application on VMs behind a load balancer and separately needs global DNS-based failover between two independently deployed regional stacks. Which two services, used together, best fit these different needs?",
      options: [
        { id: "a", text: "Azure Load Balancer for regional load distribution, and Traffic Manager for DNS-based global failover" },
        { id: "b", text: "Azure Load Balancer alone for both regional and global routing" },
        { id: "c", text: "Traffic Manager alone, handling Layer 4 load balancing inside the region" },
        { id: "d", text: "No load balancing, relying on client-side retries" },
      ],
      correct: "a",
      explanation:
        "Azure Load Balancer operates at Layer 4 within a region to distribute traffic across VMs, while Traffic Manager works at the DNS layer to route or fail over between entirely separate regional deployments — each solving a different layer of this problem, which is why they're combined rather than substituted for one another.",
    },
  ],
};
