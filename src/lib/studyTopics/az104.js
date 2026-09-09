import { Users, HardDrive, Server, Network, Activity } from "lucide-react";

// AZ-104 Exam Topics based on the official Skills Measured outline
// (learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)
export const AZ104_TOPICS = [
  {
    id: "identities-governance",
    title: "Manage Azure Identities and Governance",
    description: "Manage Microsoft Entra users and groups, assign RBAC roles, and apply governance controls like Azure Policy and management groups.",
    icon: Users,
    weight: "20-25%",
    sections: [
      {
        title: "Microsoft Entra ID: users, groups, and licenses",
        content: `Microsoft Entra ID (formerly Azure AD) is the identity store behind every Azure subscription. Administering it is the first responsibility of an Azure Administrator, separate from managing resources themselves.

**Core objects**
- User: a single identity, either cloud-only or synced from on-premises Active Directory via Microsoft Entra Connect.
- Group: a collection of users (or devices) used to assign access or licenses in bulk instead of one at a time.
- Assigned group: members are added and removed manually.
- Dynamic group: membership is driven by a rule evaluated against user or device attributes.

**Bulk operations**
- Bulk create, invite, and delete users through CSV templates in the Entra admin center.
- Guest users (B2B) let external accounts sign in and be assigned access without creating a managed identity for them.

**Common confusion**
- A group license assignment applies to every current and future member automatically; direct user license assignment does not follow group membership changes.`,
      },
      {
        title: "Role-based access control (RBAC)",
        content: `RBAC controls *what* an already-authenticated identity can do on Azure resources. It is layered on top of authentication, not a replacement for it.

**Key concepts**
- Role definition: a collection of permissions, such as Reader, Contributor, Owner, or a custom role.
- Role assignment: binds a security principal (user, group, or service principal) to a role definition at a scope.
- Scope: the boundary the assignment applies to — management group, subscription, resource group, or a single resource.
- Inheritance: a role assigned at a higher scope flows down to every child scope beneath it.

**Built-in role comparison**
- Owner: full access, including the ability to assign roles to others.
- Contributor: full access to manage resources, but cannot grant access to others.
- Reader: can view resources but not change them.
- User Access Administrator: manages role assignments without managing the resources themselves.

**Design principle**
Assign roles at the highest scope that makes sense and no higher — a subscription-wide Contributor assignment is harder to audit and reason about than one scoped to a single resource group.`,
      },
      {
        title: "Azure Policy, management groups, and resource locks",
        content: `Governance tools constrain *how* resources can be configured, on top of RBAC's control over *who* can act on them.

**Management hierarchy**
- Management groups sit above subscriptions and let policies and RBAC roles apply across many subscriptions at once.
- Subscriptions contain resource groups; resource groups contain resources.

**Azure Policy**
- A policy definition evaluates resources against a rule, for example requiring a specific region or tag.
- Effects include Deny (block non-compliant requests), Audit (log but allow), and Append (add a missing field automatically).
- An initiative groups related policy definitions so they can be assigned together.

**Resource locks**
- CanNotDelete: resources can still be read and modified, but not deleted.
- ReadOnly: no changes or deletions are permitted, including by an Owner, until the lock is removed.
- Locks apply at the scope they're set on and inherit downward, independent of RBAC permissions.`,
      },
    ],
  },
  {
    id: "storage",
    title: "Implement and Manage Storage",
    description: "Configure storage accounts, redundancy, blob lifecycle management, and secure access with SAS tokens and network rules.",
    icon: HardDrive,
    weight: "15-20%",
    sections: [
      {
        title: "Storage accounts and redundancy options",
        content: `A storage account is the top-level namespace for Blob, File, Table, and Queue storage, and determines the redundancy and performance characteristics of everything inside it.

**Redundancy options**
- LRS (locally redundant storage): copies data three times within a single datacenter.
- ZRS (zone-redundant storage): copies data across three availability zones in the same region.
- GRS (geo-redundant storage): copies data to a paired secondary region, asynchronously; the secondary copy isn't readable unless a failover occurs.
- RA-GRS / RA-GZRS: adds read access to the secondary region without waiting for a failover.

**Performance tiers**
- Standard: HDD-backed, general-purpose, lowest cost.
- Premium: SSD-backed, used for workloads needing low latency and high throughput, such as VM disks.

**Common confusion**
- Redundancy protects against hardware and datacenter failure; it is not a backup strategy for accidental deletion or corruption, which requires soft delete, versioning, or a dedicated backup solution.`,
      },
      {
        title: "Blob access tiers and lifecycle management",
        content: `Blob storage supports access tiers that trade cost for retrieval latency and price, and lifecycle policies that move or delete blobs automatically as they age.

**Access tiers**
- Hot: optimized for frequently accessed data; highest storage cost, lowest access cost.
- Cool: for infrequently accessed data stored at least 30 days; lower storage cost, higher access cost.
- Cold: for rarely accessed data stored at least 90 days; lower storage cost than Cool, higher access cost.
- Archive: lowest storage cost, but blobs must be rehydrated (which takes hours) before they can be read.

**Lifecycle management policies**
- Rules are rule-based, defined in JSON, and can move blobs between tiers or delete them based on age since last modification or last access.
- Typical pattern: Hot for 30 days, then Cool, then Archive after a year, then delete after a compliance retention period.

**Common confusion**
- Rehydrating an Archive blob is a request, not instant — plan for a delay before the data becomes readable again.`,
      },
      {
        title: "Securing storage: SAS, access keys, and networking",
        content: `Storage accounts support several distinct ways to control access, and picking the right one matters for both security and the exam.

**Access methods**
- Account access keys: full control over the entire storage account; should be rotated periodically and treated as highly sensitive.
- Shared Access Signature (SAS): a time-limited, scoped token granting specific permissions (read, write, list, delete) to specific resources, without exposing the account key.
- Microsoft Entra ID authentication: assigns RBAC roles like Storage Blob Data Reader directly to identities, avoiding shared secrets entirely.

**SAS types**
- Service SAS: scoped to one storage service (for example, only Blob).
- Account SAS: scoped across multiple services in the account.
- User delegation SAS: signed with Entra ID credentials instead of the account key, and is the recommended approach when RBAC-based access isn't practical.

**Network access controls**
- Firewall rules can restrict access to selected virtual networks or public IP ranges.
- Private endpoints assign the storage account a private IP inside a virtual network, removing public internet exposure entirely.`,
      },
    ],
  },
  {
    id: "compute",
    title: "Deploy and Manage Azure Compute Resources",
    description: "Deploy virtual machines, scale sets, containers, and App Service, and automate deployment with ARM templates and Bicep.",
    icon: Server,
    weight: "20-25%",
    sections: [
      {
        title: "Virtual machines: sizing, disks, and availability",
        content: `A virtual machine's size determines its CPU, memory, and the maximum number and throughput of attached disks — changing size later is possible but requires a restart.

**Disk types**
- OS disk: contains the operating system; every VM has exactly one.
- Data disk: additional managed disk attached for application data; a VM can have several, depending on its size.
- Temporary disk: local, non-persistent storage that can be lost on reallocation — never store data here that must survive a restart.
- Disk tiers: Standard HDD, Standard SSD, Premium SSD, and Ultra Disk, trading cost against IOPS and latency.

**Availability options**
- Availability Set: groups VMs into fault domains (separate hardware/power) and update domains (separate maintenance windows) within one datacenter.
- Availability Zone: spreads VMs across physically separate datacenters within a region, protecting against a full datacenter outage.
- Virtual Machine Scale Set (VMSS): manages a group of identical, load-balanced VMs that can scale in or out automatically based on demand or a schedule.

**Common confusion**
- An Availability Set protects against rack-level and maintenance-related failures; only Availability Zones protect against an entire datacenter going offline.`,
      },
      {
        title: "Containers and App Service",
        content: `Not every compute workload needs a full VM. Azure offers managed options that remove operating-system maintenance entirely.

**Container options**
- Azure Container Instances (ACI): runs a single container or container group quickly, without managing an orchestrator — good for short-lived or simple workloads.
- Azure Kubernetes Service (AKS): a managed Kubernetes cluster for workloads needing orchestration, scaling, and self-healing across many containers.

**App Service**
- Hosts web apps, REST APIs, and mobile backends without managing the underlying VM or OS.
- An App Service Plan defines the underlying compute (size and scaling); multiple apps can share one plan.
- Deployment slots (for example, staging and production) allow a new version to be validated and then swapped into production with no downtime.
- Scaling can be manual, scheduled, or rule-based (autoscale) driven by metrics such as CPU or request queue length.

**Common confusion**
- Scaling up changes the App Service Plan's tier (more CPU/memory per instance); scaling out changes the instance count. Autoscale rules apply to scaling out, not up.`,
      },
      {
        title: "ARM templates, Bicep, and repeatable deployment",
        content: `Manually clicking through the Azure portal doesn't scale and isn't repeatable. Infrastructure as code solves this by describing the desired resource state declaratively.

**ARM templates**
- JSON documents describing resources, their properties, and dependencies between them.
- Support parameters (inputs) and variables (computed or reused values) to make templates reusable across environments.
- Deployments are idempotent — deploying the same template twice converges to the same state rather than duplicating resources.

**Bicep**
- A simpler, more readable domain-specific language that compiles down to ARM template JSON.
- Same deployment engine and capabilities as ARM templates, but with less syntax overhead and better tooling support.

**Deployment modes**
- Incremental (default): adds or updates resources defined in the template, leaving unrelated existing resources in the resource group untouched.
- Complete: adds or updates resources in the template, and deletes any resource in the resource group that isn't defined in it — use with caution.`,
      },
    ],
  },
  {
    id: "networking",
    title: "Implement and Manage Virtual Networking",
    description: "Design virtual networks and subnets, secure traffic with NSGs, and connect networks with peering, load balancing, and DNS.",
    icon: Network,
    weight: "15-20%",
    sections: [
      {
        title: "Virtual networks, subnets, and IP addressing",
        content: `A virtual network (VNet) is an isolated network boundary within a region. Resources inside it can communicate privately, and it's subdivided into subnets for organization and rule scoping.

**Core concepts**
- Address space: the VNet's overall private IP range, defined using CIDR notation (for example, 10.0.0.0/16).
- Subnet: a smaller range carved out of the VNet's address space; resources are deployed into a specific subnet, not directly into the VNet.
- Azure reserves the first four and the last IP address in every subnet for internal use, which reduces the number of usable addresses.
- Private IP: assigned from the VNet/subnet range, used for internal communication.
- Public IP: internet-routable, optionally attached to a VM's NIC or a load balancer's frontend.

**Common confusion**
- A VNet's address space cannot overlap with an on-premises network or another VNet it needs to connect to — plan address ranges before deployment, since resizing later is disruptive.`,
      },
      {
        title: "Network security groups and application security groups",
        content: `Network security groups (NSGs) are the primary way to control inbound and outbound traffic at the network level, independent of what's running inside the VM.

**NSG rules**
- Each rule specifies a priority (lower number evaluated first), source, destination, port, protocol, and action (Allow or Deny).
- NSGs can be associated with a subnet, a network interface, or both — when applied to both, both must allow the traffic.
- Default rules allow traffic within the VNet and outbound to the internet, and deny inbound traffic from the internet, unless overridden by a custom rule with a lower priority number.

**Application security groups (ASGs)**
- Group VMs by application role (for example, "WebServers") so NSG rules can reference the group instead of individual IP addresses.
- Makes rules easier to maintain as VMs are added or removed, since the rule targets the group, not a fixed address list.

**Common confusion**
- NSGs filter traffic; they don't provide routing. A route can exist to a destination that an NSG rule still blocks.`,
      },
      {
        title: "Connecting and resolving names: peering, load balancing, DNS",
        content: `Once VNets and subnets exist, workloads usually need to reach each other across networks and be reachable by a stable name rather than a changing IP address.

**VNet peering**
- Connects two VNets so resources communicate as if on the same network, using Azure's backbone rather than the public internet.
- Non-transitive by default: if VNet A peers with B, and B peers with C, A cannot reach C through B without a direct peering or a hub-and-spoke design using a network virtual appliance.

**Load balancing**
- Azure Load Balancer: Layer 4 (TCP/UDP), distributes traffic across VMs or a scale set based on a hash of source/destination.
- Public Load Balancer: distributes internet-facing traffic.
- Internal Load Balancer: distributes traffic only within a VNet, with no public exposure.

**DNS**
- Azure-provided DNS gives automatic name resolution within a VNet but doesn't support custom records.
- Azure Private DNS zones allow custom domain names resolved privately within one or more linked VNets.
- Azure DNS (public zones) hosts internet-facing domains and their records (A, CNAME, MX, and so on).`,
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitor and Maintain Azure Resources",
    description: "Use Azure Monitor and Log Analytics to track resource health, configure backup and recovery, and manage cost.",
    icon: Activity,
    weight: "10-15%",
    sections: [
      {
        title: "Azure Monitor, metrics, and Log Analytics",
        content: `Azure Monitor is the platform-wide service collecting metrics and logs from virtually every Azure resource, and is the foundation for alerting and diagnostics.

**Data types**
- Metrics: lightweight, numeric, time-series data (for example, CPU percentage) collected automatically at a set interval, well suited to fast alerting.
- Logs: structured records (for example, activity logs, diagnostic logs) stored in a Log Analytics workspace and queried with Kusto Query Language (KQL).

**Key components**
- Diagnostic settings: configured per resource to send its logs and metrics to a Log Analytics workspace, storage account, or event hub.
- Log Analytics workspace: the queryable store for collected log data; one workspace can receive data from many resources and subscriptions.
- Alert rules: evaluate a metric or log query on a schedule and trigger an action group (email, SMS, webhook, or automation) when a condition is met.

**Common confusion**
- Metrics-based alerts react faster and cost less than log-based alerts, but log queries can express far more complex conditions across combined data sources.`,
      },
      {
        title: "Backup and disaster recovery",
        content: `Redundancy protects against infrastructure failure; it does not protect against accidental deletion, corruption, or a ransomware event. Backup and recovery are separate, deliberate configurations.

**Azure Backup**
- Backs up VMs, files, folders, and certain PaaS workloads (like SQL in a VM) to a Recovery Services vault.
- Backup policies define frequency (for example, daily) and retention (how long each recovery point is kept).
- Recovery points allow restoring an entire VM, individual files, or in some cases just specific disks.

**Azure Site Recovery (ASR)**
- Replicates entire VMs to a secondary region so they can be failed over and started there if the primary region becomes unavailable.
- Distinct from backup: ASR is about keeping a workload running elsewhere during an outage, not preserving historical recovery points.

**Common confusion**
- Backup answers "can I get an earlier version of this back?" Site Recovery answers "can this workload keep running if the region goes down?" A complete resiliency plan typically needs both.`,
      },
      {
        title: "Cost management and resource optimization",
        content: `Administering Azure includes keeping spend visible and predictable, not just keeping resources running.

**Cost visibility**
- Cost Management + Billing shows spend broken down by subscription, resource group, service, or tag, and can forecast based on current trends.
- Budgets can be set at a subscription or resource group scope, with alerts triggered as actual or forecasted spend approaches a threshold.

**Optimization levers**
- Azure Advisor surfaces recommendations across cost, reliability, security, and performance, such as resizing an underutilized VM or deleting an unattached disk.
- Reserved Instances and Savings Plans commit to usage over one or three years in exchange for a significant discount versus pay-as-you-go pricing.
- Azure Hybrid Benefit lets an organization apply existing on-premises Windows Server or SQL Server licenses to Azure VMs, reducing the compute cost.

**Common confusion**
- Reservations discount compute capacity regardless of what's deployed against it; Azure Hybrid Benefit discounts the licensing cost specifically — they address different parts of the bill and are often combined.`,
      },
    ],
  },
];
