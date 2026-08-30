export const AZ_900 = {
  "label": "Azure Fundamentals",
  "questions": [
    {
      "id": "az900-1",
      "domain": "Describe cloud concepts",
      "question": "Which model means the cloud provider secures the physical datacenter while the customer remains responsible for securing their data and access?",
      "options": [
        {
          "id": "a",
          "text": "The shared responsibility model"
        },
        {
          "id": "b",
          "text": "The Zero Trust model"
        },
        {
          "id": "c",
          "text": "The consumption-based model"
        },
        {
          "id": "d",
          "text": "The defense-in-depth model"
        }
      ],
      "correct": "a",
      "explanation": "The shared responsibility model divides security duties between the cloud provider (physical infrastructure, host security) and the customer (data, identities, access), with the split varying by service type."
    },
    {
      "id": "az900-2",
      "domain": "Describe cloud concepts",
      "question": "A company wants full control over hardware and networking for compliance reasons, while another workload can run entirely in the public cloud. Which model combines both approaches?",
      "options": [
        {
          "id": "a",
          "text": "Public cloud"
        },
        {
          "id": "b",
          "text": "Private cloud"
        },
        {
          "id": "c",
          "text": "Hybrid cloud"
        },
        {
          "id": "d",
          "text": "Community cloud"
        }
      ],
      "correct": "c",
      "explanation": "A hybrid cloud combines private/on-premises infrastructure with public cloud resources, letting an organization keep some workloads on-prem while running others in the cloud."
    },
    {
      "id": "az900-3",
      "domain": "Describe cloud concepts",
      "question": "Which pricing model charges customers only for the resources they actually use, rather than a fixed upfront cost?",
      "options": [
        {
          "id": "a",
          "text": "Consumption-based model"
        },
        {
          "id": "b",
          "text": "Capital expenditure model"
        },
        {
          "id": "c",
          "text": "Perpetual licensing"
        },
        {
          "id": "d",
          "text": "Fixed subscription only"
        }
      ],
      "correct": "a",
      "explanation": "The consumption-based (pay-as-you-go) model charges for actual resource usage, shifting spending from capital expenditure (CapEx) to operational expenditure (OpEx)."
    },
    {
      "id": "az900-4",
      "domain": "Describe cloud concepts",
      "question": "Which cloud service type gives you the most control over the operating system and installed software, while the provider manages the physical hardware?",
      "options": [
        {
          "id": "a",
          "text": "SaaS"
        },
        {
          "id": "b",
          "text": "PaaS"
        },
        {
          "id": "c",
          "text": "IaaS"
        },
        {
          "id": "d",
          "text": "FaaS only"
        }
      ],
      "correct": "c",
      "explanation": "Infrastructure as a Service (IaaS) gives customers control over the OS, storage, and applications while the provider manages physical hardware, networking, and virtualization."
    },
    {
      "id": "az900-5",
      "domain": "Describe cloud concepts",
      "question": "A developer wants to deploy code without provisioning or managing any servers, and only pay when the code executes. Which cloud service type fits best?",
      "options": [
        {
          "id": "a",
          "text": "IaaS"
        },
        {
          "id": "b",
          "text": "PaaS with serverless (e.g. Azure Functions)"
        },
        {
          "id": "c",
          "text": "SaaS"
        },
        {
          "id": "d",
          "text": "On-premises hosting"
        }
      ],
      "correct": "b",
      "explanation": "Serverless compute, a PaaS-style offering like Azure Functions, lets developers run code without managing servers, scaling automatically and billing based on execution."
    },
    {
      "id": "az900-6",
      "domain": "Describe cloud concepts",
      "question": "Which benefit of cloud computing refers to a system's ability to handle increased load by adding resources automatically or on demand?",
      "options": [
        {
          "id": "a",
          "text": "Scalability"
        },
        {
          "id": "b",
          "text": "High availability"
        },
        {
          "id": "c",
          "text": "Fault tolerance"
        },
        {
          "id": "d",
          "text": "Disaster recovery"
        }
      ],
      "correct": "a",
      "explanation": "Scalability is the ability to increase or decrease resources to match demand, whether by scaling up (bigger resources) or scaling out (more instances)."
    },
    {
      "id": "az900-7",
      "domain": "Describe cloud concepts",
      "question": "Which term describes a cloud application's ability to continue functioning, and recover quickly, in the face of failures?",
      "options": [
        {
          "id": "a",
          "text": "Reliability"
        },
        {
          "id": "b",
          "text": "Elasticity"
        },
        {
          "id": "c",
          "text": "Serverless"
        },
        {
          "id": "d",
          "text": "Consumption-based pricing"
        }
      ],
      "correct": "a",
      "explanation": "Reliability describes a system's ability to recover from failures and continue functioning, which cloud platforms support through redundancy and automated recovery."
    },
    {
      "id": "az900-8",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure concept represents a set of datacenters deployed within a defined perimeter, connected via a low-latency network?",
      "options": [
        {
          "id": "a",
          "text": "A region"
        },
        {
          "id": "b",
          "text": "A resource group"
        },
        {
          "id": "c",
          "text": "A management group"
        },
        {
          "id": "d",
          "text": "An availability zone"
        }
      ],
      "correct": "a",
      "explanation": "An Azure region is a geographic area containing one or more datacenters, connected through a dedicated low-latency network."
    },
    {
      "id": "az900-9",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure feature provides physically separate datacenters within a region, each with independent power, cooling, and networking, to protect against datacenter-level failures?",
      "options": [
        {
          "id": "a",
          "text": "Availability zones"
        },
        {
          "id": "b",
          "text": "Region pairs"
        },
        {
          "id": "c",
          "text": "Resource groups"
        },
        {
          "id": "d",
          "text": "Management groups"
        }
      ],
      "correct": "a",
      "explanation": "Availability zones are physically separate locations within a region, each with independent power, cooling, and networking, protecting applications from datacenter-level failures."
    },
    {
      "id": "az900-10",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure organizational unit is a logical container that holds related resources, such as a VM, its storage, and its networking, for lifecycle management?",
      "options": [
        {
          "id": "a",
          "text": "A resource group"
        },
        {
          "id": "b",
          "text": "A subscription"
        },
        {
          "id": "c",
          "text": "A management group"
        },
        {
          "id": "d",
          "text": "A region"
        }
      ],
      "correct": "a",
      "explanation": "A resource group is a logical container for resources that share the same lifecycle, permissions, and policies, making them easier to manage together."
    },
    {
      "id": "az900-11",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure construct sits above subscriptions in the hierarchy and lets you apply policies or access controls across multiple subscriptions at once?",
      "options": [
        {
          "id": "a",
          "text": "A management group"
        },
        {
          "id": "b",
          "text": "A resource group"
        },
        {
          "id": "c",
          "text": "An availability set"
        },
        {
          "id": "d",
          "text": "A region pair"
        }
      ],
      "correct": "a",
      "explanation": "Management groups sit above subscriptions in the Azure hierarchy, letting you apply governance conditions (like Azure Policy or RBAC) across many subscriptions at once."
    },
    {
      "id": "az900-12",
      "domain": "Describe Azure architecture and services",
      "question": "Which billing and access boundary in Azure defines a unit tied to an account, under which resource groups and resources are created?",
      "options": [
        {
          "id": "a",
          "text": "A subscription"
        },
        {
          "id": "b",
          "text": "A resource group"
        },
        {
          "id": "c",
          "text": "A region"
        },
        {
          "id": "d",
          "text": "A tenant only"
        }
      ],
      "correct": "a",
      "explanation": "A subscription is a billing and access-management boundary that logically associates user accounts with the resources they create, sitting between management groups and resource groups."
    },
    {
      "id": "az900-13",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure compute option automatically increases or decreases the number of identical VM instances to match demand?",
      "options": [
        {
          "id": "a",
          "text": "Azure Virtual Machine Scale Sets"
        },
        {
          "id": "b",
          "text": "Availability sets"
        },
        {
          "id": "c",
          "text": "Azure Virtual Desktop"
        },
        {
          "id": "d",
          "text": "A single standalone VM"
        }
      ],
      "correct": "a",
      "explanation": "Virtual Machine Scale Sets let you deploy and manage a group of identical, load-balanced VMs, automatically increasing or decreasing instance count based on demand or a schedule."
    },
    {
      "id": "az900-14",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure feature groups VMs across multiple fault domains and update domains to reduce the chance of correlated failures affecting an entire application?",
      "options": [
        {
          "id": "a",
          "text": "Availability sets"
        },
        {
          "id": "b",
          "text": "Resource groups"
        },
        {
          "id": "c",
          "text": "Management groups"
        },
        {
          "id": "d",
          "text": "Region pairs"
        }
      ],
      "correct": "a",
      "explanation": "Availability sets distribute VMs across multiple fault domains (separate hardware) and update domains (separate maintenance windows), reducing the chance of a single failure or update taking down the whole application."
    },
    {
      "id": "az900-15",
      "domain": "Describe Azure architecture and services",
      "question": "Which compute option lets you package an application with its dependencies for consistent deployment across environments, typically using less overhead than a full VM?",
      "options": [
        {
          "id": "a",
          "text": "Containers"
        },
        {
          "id": "b",
          "text": "Availability sets"
        },
        {
          "id": "c",
          "text": "Azure DNS"
        },
        {
          "id": "d",
          "text": "Azure ExpressRoute"
        }
      ],
      "correct": "a",
      "explanation": "Containers package an application and its dependencies together, running with less overhead than a full VM since they share the host OS kernel, while still providing environment consistency."
    },
    {
      "id": "az900-16",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure networking service allows two virtual networks to communicate with each other directly over the Microsoft backbone, without traversing the public internet?",
      "options": [
        {
          "id": "a",
          "text": "VNet peering"
        },
        {
          "id": "b",
          "text": "Azure DNS"
        },
        {
          "id": "c",
          "text": "Azure VPN Gateway"
        },
        {
          "id": "d",
          "text": "Azure ExpressRoute"
        }
      ],
      "correct": "a",
      "explanation": "Virtual network (VNet) peering connects two Azure virtual networks so resources in each can communicate directly over the Microsoft backbone network, without public internet exposure."
    },
    {
      "id": "az900-17",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure service provides a private, dedicated connection from an on-premises network to Azure, bypassing the public internet entirely?",
      "options": [
        {
          "id": "a",
          "text": "Azure ExpressRoute"
        },
        {
          "id": "b",
          "text": "Azure DNS"
        },
        {
          "id": "c",
          "text": "VNet peering"
        },
        {
          "id": "d",
          "text": "Azure CDN"
        }
      ],
      "correct": "a",
      "explanation": "Azure ExpressRoute provides a private, dedicated connection between on-premises infrastructure and Azure, avoiding the public internet for improved reliability, speed, and security."
    },
    {
      "id": "az900-18",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure networking service establishes an encrypted connection over the public internet between an on-premises network and Azure?",
      "options": [
        {
          "id": "a",
          "text": "Azure VPN Gateway"
        },
        {
          "id": "b",
          "text": "Azure ExpressRoute"
        },
        {
          "id": "c",
          "text": "Azure DNS"
        },
        {
          "id": "d",
          "text": "Azure Firewall only"
        }
      ],
      "correct": "a",
      "explanation": "Azure VPN Gateway creates an encrypted tunnel over the public internet between on-premises networks (or other VNets) and Azure, unlike ExpressRoute which uses a private dedicated connection."
    },
    {
      "id": "az900-19",
      "domain": "Describe Azure architecture and services",
      "question": "A resource needs a publicly reachable address so external clients can connect to it over the internet. Which type of endpoint does it need?",
      "options": [
        {
          "id": "a",
          "text": "A public endpoint"
        },
        {
          "id": "b",
          "text": "A private endpoint"
        },
        {
          "id": "c",
          "text": "A resource group"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "A public endpoint has a publicly reachable IP address, allowing external clients to connect over the internet; a private endpoint instead uses a private IP within a VNet."
    },
    {
      "id": "az900-20",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure Storage service is designed for storing large amounts of unstructured data, such as images, videos, and documents, accessible via HTTP/HTTPS?",
      "options": [
        {
          "id": "a",
          "text": "Azure Blob storage"
        },
        {
          "id": "b",
          "text": "Azure Table storage"
        },
        {
          "id": "c",
          "text": "Azure Queue storage"
        },
        {
          "id": "d",
          "text": "Azure Files"
        }
      ],
      "correct": "a",
      "explanation": "Azure Blob storage is optimized for storing massive amounts of unstructured data such as images, videos, and documents, accessible over HTTP/HTTPS."
    },
    {
      "id": "az900-21",
      "domain": "Describe Azure architecture and services",
      "question": "A team wants a fully managed file share accessible via the standard SMB protocol, mountable from both cloud and on-premises machines. Which service fits?",
      "options": [
        {
          "id": "a",
          "text": "Azure Files"
        },
        {
          "id": "b",
          "text": "Azure Blob storage"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure Queue storage"
        }
      ],
      "correct": "a",
      "explanation": "Azure Files provides fully managed file shares accessible via the SMB (and NFS) protocol, mountable from Windows, Linux, and macOS, both in the cloud and on-premises."
    },
    {
      "id": "az900-22",
      "domain": "Describe Azure architecture and services",
      "question": "Which storage tier is designed for data that is rarely accessed and can tolerate several hours of retrieval latency, at the lowest storage cost?",
      "options": [
        {
          "id": "a",
          "text": "Archive tier"
        },
        {
          "id": "b",
          "text": "Hot tier"
        },
        {
          "id": "c",
          "text": "Cool tier"
        },
        {
          "id": "d",
          "text": "Premium tier"
        }
      ],
      "correct": "a",
      "explanation": "The Archive tier offers the lowest storage cost but highest retrieval latency (hours), suited for data accessed rarely and tolerant of delayed retrieval, such as long-term backups."
    },
    {
      "id": "az900-23",
      "domain": "Describe Azure architecture and services",
      "question": "Which redundancy option synchronously replicates data across three availability zones within a region, protecting against a datacenter-level outage?",
      "options": [
        {
          "id": "a",
          "text": "Zone-redundant storage (ZRS)"
        },
        {
          "id": "b",
          "text": "Locally redundant storage (LRS)"
        },
        {
          "id": "c",
          "text": "Geo-redundant storage (GRS) only"
        },
        {
          "id": "d",
          "text": "No redundancy"
        }
      ],
      "correct": "a",
      "explanation": "Zone-redundant storage (ZRS) synchronously replicates data across three availability zones in a region, protecting against a single datacenter failure while LRS only replicates within one datacenter."
    },
    {
      "id": "az900-24",
      "domain": "Describe Azure architecture and services",
      "question": "Which tool is designed for fast, high-throughput command-line copying of data into and out of Azure Blob storage or Azure Files?",
      "options": [
        {
          "id": "a",
          "text": "AzCopy"
        },
        {
          "id": "b",
          "text": "Azure Storage Explorer"
        },
        {
          "id": "c",
          "text": "Azure File Sync"
        },
        {
          "id": "d",
          "text": "Azure Data Box"
        }
      ],
      "correct": "a",
      "explanation": "AzCopy is a command-line utility optimized for fast, high-throughput data transfer into and out of Azure Storage."
    },
    {
      "id": "az900-25",
      "domain": "Describe Azure architecture and services",
      "question": "An organization needs to migrate hundreds of terabytes of on-premises data to Azure, but their internet bandwidth would take months. Which service is designed for this?",
      "options": [
        {
          "id": "a",
          "text": "Azure Data Box"
        },
        {
          "id": "b",
          "text": "Azure DNS"
        },
        {
          "id": "c",
          "text": "Azure VPN Gateway"
        },
        {
          "id": "d",
          "text": "AzCopy"
        }
      ],
      "correct": "a",
      "explanation": "Azure Data Box is a physical device Microsoft ships to your site so you can load large volumes of data offline and ship it back, bypassing slow network transfer for massive migrations."
    },
    {
      "id": "az900-26",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure identity service is the cloud-based directory used for authentication and access management, replacing what was formerly called Azure AD?",
      "options": [
        {
          "id": "a",
          "text": "Microsoft Entra ID"
        },
        {
          "id": "b",
          "text": "Azure Policy"
        },
        {
          "id": "c",
          "text": "Azure Resource Manager"
        },
        {
          "id": "d",
          "text": "Azure Monitor"
        }
      ],
      "correct": "a",
      "explanation": "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service used for authentication across Azure and Microsoft 365."
    },
    {
      "id": "az900-27",
      "domain": "Describe Azure architecture and services",
      "question": "Which authentication method requires users to provide two or more verification factors, such as a password plus a mobile app approval, to gain access?",
      "options": [
        {
          "id": "a",
          "text": "Multifactor authentication (MFA)"
        },
        {
          "id": "b",
          "text": "Single sign-on (SSO)"
        },
        {
          "id": "c",
          "text": "Passwordless authentication"
        },
        {
          "id": "d",
          "text": "Conditional Access"
        }
      ],
      "correct": "a",
      "explanation": "Multifactor authentication (MFA) requires two or more independent verification factors, significantly increasing security compared to a password alone."
    },
    {
      "id": "az900-28",
      "domain": "Describe Azure architecture and services",
      "question": "Which feature lets a user authenticate once and then access multiple applications without re-entering credentials for each one?",
      "options": [
        {
          "id": "a",
          "text": "Single sign-on (SSO)"
        },
        {
          "id": "b",
          "text": "Multifactor authentication"
        },
        {
          "id": "c",
          "text": "Role-based access control"
        },
        {
          "id": "d",
          "text": "Resource locks"
        }
      ],
      "correct": "a",
      "explanation": "Single sign-on (SSO) lets a user authenticate once and gain access to multiple related applications and resources without needing to sign in again for each."
    },
    {
      "id": "az900-29",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure security feature evaluates signals (like user location or device state) to enforce policies, such as requiring MFA only when a sign-in looks risky?",
      "options": [
        {
          "id": "a",
          "text": "Microsoft Entra Conditional Access"
        },
        {
          "id": "b",
          "text": "Azure role-based access control"
        },
        {
          "id": "c",
          "text": "Azure Policy"
        },
        {
          "id": "d",
          "text": "Resource locks"
        }
      ],
      "correct": "a",
      "explanation": "Conditional Access evaluates signals like user location, device compliance, and risk level to enforce access policies dynamically, such as requiring MFA only under certain conditions."
    },
    {
      "id": "az900-30",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure feature grants permissions to users, groups, or applications based on their assigned role, scoped to a management group, subscription, resource group, or resource?",
      "options": [
        {
          "id": "a",
          "text": "Azure role-based access control (RBAC)"
        },
        {
          "id": "b",
          "text": "Azure Policy"
        },
        {
          "id": "c",
          "text": "Resource locks"
        },
        {
          "id": "d",
          "text": "Microsoft Purview"
        }
      ],
      "correct": "a",
      "explanation": "Azure RBAC assigns permissions to identities based on roles (like Reader, Contributor, Owner), scoped at various levels of the Azure resource hierarchy."
    },
    {
      "id": "az900-31",
      "domain": "Describe Azure architecture and services",
      "question": "Which security principle assumes breach and requires explicit verification of every access request, rather than trusting anything inside a network perimeter by default?",
      "options": [
        {
          "id": "a",
          "text": "Zero Trust"
        },
        {
          "id": "b",
          "text": "Shared responsibility model"
        },
        {
          "id": "c",
          "text": "Consumption-based model"
        },
        {
          "id": "d",
          "text": "Defense-in-depth"
        }
      ],
      "correct": "a",
      "explanation": "Zero Trust operates on the principle of 'never trust, always verify' — explicitly validating every access request rather than assuming trust based on network location."
    },
    {
      "id": "az900-32",
      "domain": "Describe Azure architecture and services",
      "question": "Which security strategy layers multiple defensive measures (physical, identity, network, application, data) so that if one layer is breached, others still provide protection?",
      "options": [
        {
          "id": "a",
          "text": "Defense-in-depth"
        },
        {
          "id": "b",
          "text": "Zero Trust"
        },
        {
          "id": "c",
          "text": "Single sign-on"
        },
        {
          "id": "d",
          "text": "Resource locks"
        }
      ],
      "correct": "a",
      "explanation": "Defense-in-depth layers multiple security controls across physical, identity, perimeter, network, compute, application, and data layers, so a single point of failure doesn't compromise the whole system."
    },
    {
      "id": "az900-33",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure service provides unified security management and advanced threat protection across hybrid cloud workloads?",
      "options": [
        {
          "id": "a",
          "text": "Microsoft Defender for Cloud"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Service Health"
        },
        {
          "id": "d",
          "text": "Azure Monitor"
        }
      ],
      "correct": "a",
      "explanation": "Microsoft Defender for Cloud provides unified security posture management and threat protection across Azure, hybrid, and multicloud workloads."
    },
    {
      "id": "az900-34",
      "domain": "Describe Azure management and governance",
      "question": "Which factor most directly affects the cost of an Azure virtual machine besides its size?",
      "options": [
        {
          "id": "a",
          "text": "Region, and whether it runs continuously or is deallocated when idle"
        },
        {
          "id": "b",
          "text": "The name given to the resource group"
        },
        {
          "id": "c",
          "text": "The number of tags applied"
        },
        {
          "id": "d",
          "text": "The subscription's display name"
        }
      ],
      "correct": "a",
      "explanation": "VM cost is affected by factors like region (pricing varies by location), VM size/type, and usage duration — a VM billed while running costs more than one properly deallocated when idle."
    },
    {
      "id": "az900-35",
      "domain": "Describe Azure management and governance",
      "question": "Which tool helps you estimate the cost of Azure services before deploying them, based on your expected configuration?",
      "options": [
        {
          "id": "a",
          "text": "The Azure pricing calculator"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Policy"
        },
        {
          "id": "d",
          "text": "Azure Monitor"
        }
      ],
      "correct": "a",
      "explanation": "The Azure pricing calculator lets you estimate costs for Azure products and services based on your planned configuration, before you actually deploy anything."
    },
    {
      "id": "az900-36",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure feature lets you attach metadata, like 'CostCenter' or 'Environment', to resources for organizing and reporting on spending?",
      "options": [
        {
          "id": "a",
          "text": "Tags"
        },
        {
          "id": "b",
          "text": "Resource locks"
        },
        {
          "id": "c",
          "text": "Management groups"
        },
        {
          "id": "d",
          "text": "Availability zones"
        }
      ],
      "correct": "a",
      "explanation": "Tags are name/value pairs attached to resources that help organize, categorize, and report on resources — commonly used to track cost by department, project, or environment."
    },
    {
      "id": "az900-37",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure governance service enforces organizational standards by evaluating resources for compliance and can block non-compliant deployments?",
      "options": [
        {
          "id": "a",
          "text": "Azure Policy"
        },
        {
          "id": "b",
          "text": "Azure Monitor"
        },
        {
          "id": "c",
          "text": "Azure Advisor"
        },
        {
          "id": "d",
          "text": "Microsoft Purview"
        }
      ],
      "correct": "a",
      "explanation": "Azure Policy evaluates resources against defined rules (like 'only allow VMs in specific regions') and can audit, deny, or remediate non-compliant resources."
    },
    {
      "id": "az900-38",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure feature prevents a critical resource from being accidentally deleted or modified, regardless of a user's RBAC permissions?",
      "options": [
        {
          "id": "a",
          "text": "A resource lock"
        },
        {
          "id": "b",
          "text": "A tag"
        },
        {
          "id": "c",
          "text": "Azure Policy"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "Resource locks (CanNotDelete or ReadOnly) prevent accidental deletion or modification of critical resources, overriding what a user's RBAC role would otherwise allow."
    },
    {
      "id": "az900-39",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure service helps organizations discover, classify, and govern sensitive data across their estate for compliance purposes?",
      "options": [
        {
          "id": "a",
          "text": "Microsoft Purview"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Resource Manager"
        },
        {
          "id": "d",
          "text": "Azure Monitor"
        }
      ],
      "correct": "a",
      "explanation": "Microsoft Purview provides unified data governance, helping organizations discover, classify, and protect sensitive data across their Azure and hybrid estate."
    },
    {
      "id": "az900-40",
      "domain": "Describe Azure management and governance",
      "question": "Which web-based tool provides a graphical interface for creating, managing, and monitoring Azure resources?",
      "options": [
        {
          "id": "a",
          "text": "The Azure portal"
        },
        {
          "id": "b",
          "text": "Azure Cloud Shell"
        },
        {
          "id": "c",
          "text": "Azure CLI"
        },
        {
          "id": "d",
          "text": "Azure PowerShell"
        }
      ],
      "correct": "a",
      "explanation": "The Azure portal is a web-based, graphical console for creating, configuring, and managing Azure resources through a visual interface."
    },
    {
      "id": "az900-41",
      "domain": "Describe Azure management and governance",
      "question": "Which tool provides a browser-based, authenticated command-line environment for managing Azure resources, supporting both Bash and PowerShell?",
      "options": [
        {
          "id": "a",
          "text": "Azure Cloud Shell"
        },
        {
          "id": "b",
          "text": "Azure Resource Manager"
        },
        {
          "id": "c",
          "text": "Azure Arc"
        },
        {
          "id": "d",
          "text": "Azure Monitor"
        }
      ],
      "correct": "a",
      "explanation": "Azure Cloud Shell is a browser-accessible, pre-authenticated shell that supports both Bash and PowerShell for managing Azure resources without installing anything locally."
    },
    {
      "id": "az900-42",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure service extends Azure management capabilities, like policy and monitoring, to on-premises and multicloud resources outside Azure itself?",
      "options": [
        {
          "id": "a",
          "text": "Azure Arc"
        },
        {
          "id": "b",
          "text": "Azure Resource Manager"
        },
        {
          "id": "c",
          "text": "Azure Cloud Shell"
        },
        {
          "id": "d",
          "text": "Azure Advisor"
        }
      ],
      "correct": "a",
      "explanation": "Azure Arc extends Azure management — including policy, RBAC, and monitoring — to resources running outside Azure, such as on-premises servers or other clouds."
    },
    {
      "id": "az900-43",
      "domain": "Describe Azure management and governance",
      "question": "Which approach to deploying infrastructure defines resources declaratively in code (like JSON or Bicep), enabling consistent, repeatable deployments?",
      "options": [
        {
          "id": "a",
          "text": "Infrastructure as code (IaC)"
        },
        {
          "id": "b",
          "text": "Manual portal clicking"
        },
        {
          "id": "c",
          "text": "Resource locking"
        },
        {
          "id": "d",
          "text": "Tagging"
        }
      ],
      "correct": "a",
      "explanation": "Infrastructure as code (IaC) defines and deploys infrastructure through declarative code, such as ARM templates or Bicep, enabling consistent, version-controlled, repeatable deployments."
    },
    {
      "id": "az900-44",
      "domain": "Describe Azure management and governance",
      "question": "Which service and template format is Azure's native infrastructure-as-code mechanism for declaratively deploying resources using JSON?",
      "options": [
        {
          "id": "a",
          "text": "Azure Resource Manager (ARM) templates"
        },
        {
          "id": "b",
          "text": "Azure Advisor recommendations"
        },
        {
          "id": "c",
          "text": "Azure Policy initiatives"
        },
        {
          "id": "d",
          "text": "Azure Service Health alerts"
        }
      ],
      "correct": "a",
      "explanation": "Azure Resource Manager (ARM) templates are JSON files that declaratively define the resources to deploy, serving as Azure's native infrastructure-as-code mechanism."
    },
    {
      "id": "az900-45",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure tool analyzes your resource configuration and usage to provide personalized recommendations for cost savings, security, and performance?",
      "options": [
        {
          "id": "a",
          "text": "Azure Advisor"
        },
        {
          "id": "b",
          "text": "Azure Service Health"
        },
        {
          "id": "c",
          "text": "Azure Monitor"
        },
        {
          "id": "d",
          "text": "Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Azure Advisor analyzes your resource configuration and usage telemetry to provide personalized recommendations across cost, security, reliability, and performance."
    },
    {
      "id": "az900-46",
      "domain": "Describe Azure management and governance",
      "question": "Which service provides a personalized view of the health of Azure services you're using, including planned maintenance and outage notifications?",
      "options": [
        {
          "id": "a",
          "text": "Azure Service Health"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Monitor"
        },
        {
          "id": "d",
          "text": "Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Azure Service Health provides personalized alerts and guidance about Azure service issues, planned maintenance, and health advisories that affect the resources you actually use."
    },
    {
      "id": "az900-47",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure service collects, analyzes, and acts on telemetry data (metrics and logs) from your cloud and on-premises environments?",
      "options": [
        {
          "id": "a",
          "text": "Azure Monitor"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Service Health"
        },
        {
          "id": "d",
          "text": "Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Azure Monitor collects, analyzes, and acts on telemetry — metrics and logs — from applications and infrastructure, providing a full observability platform."
    },
    {
      "id": "az900-48",
      "domain": "Describe Azure management and governance",
      "question": "Within Azure Monitor, which component lets you query and analyze log data collected from various Azure resources using a query language called KQL?",
      "options": [
        {
          "id": "a",
          "text": "Log Analytics"
        },
        {
          "id": "b",
          "text": "Application Insights"
        },
        {
          "id": "c",
          "text": "Azure Advisor"
        },
        {
          "id": "d",
          "text": "Resource locks"
        }
      ],
      "correct": "a",
      "explanation": "Log Analytics, part of Azure Monitor, lets you query and analyze collected log data using Kusto Query Language (KQL) to investigate and troubleshoot."
    },
    {
      "id": "az900-49",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure Monitor feature specifically provides application performance monitoring (APM), such as tracking requests, dependencies, and exceptions in your app?",
      "options": [
        {
          "id": "a",
          "text": "Application Insights"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Azure Service Health"
        },
        {
          "id": "d",
          "text": "Resource locks"
        }
      ],
      "correct": "a",
      "explanation": "Application Insights, part of Azure Monitor, is an application performance monitoring feature for detecting anomalies, tracking requests/dependencies, and diagnosing issues in live applications."
    },
    {
      "id": "az900-50",
      "domain": "Describe Azure management and governance",
      "question": "Which Azure Monitor capability automatically notifies you when a defined metric or log condition, such as high CPU usage, is met?",
      "options": [
        {
          "id": "a",
          "text": "Azure Monitor alerts"
        },
        {
          "id": "b",
          "text": "Azure Policy"
        },
        {
          "id": "c",
          "text": "Resource locks"
        },
        {
          "id": "d",
          "text": "Tags"
        }
      ],
      "correct": "a",
      "explanation": "Azure Monitor alerts proactively notify you when specified conditions are found in your monitoring data, such as a metric crossing a threshold."
    },
    {
      "id": "az900-51",
      "domain": "Describe cloud concepts",
      "question": "A retail company experiences huge traffic spikes during holiday sales but low traffic the rest of the year. Which cloud benefit most directly addresses this pattern cost-effectively?",
      "options": [
        {
          "id": "a",
          "text": "Elastic scalability combined with consumption-based pricing"
        },
        {
          "id": "b",
          "text": "A fixed on-premises server sized for peak load"
        },
        {
          "id": "c",
          "text": "A single availability zone"
        },
        {
          "id": "d",
          "text": "A resource lock"
        }
      ],
      "correct": "a",
      "explanation": "Cloud elasticity lets resources scale up during peak demand and back down afterward, and consumption-based pricing means you only pay for what you use — well suited to spiky workloads like holiday sales."
    },
    {
      "id": "az900-52",
      "domain": "Describe Azure architecture and services",
      "question": "Which Azure service lets end users connect to a full Windows desktop and applications hosted in the cloud, accessible from various devices?",
      "options": [
        {
          "id": "a",
          "text": "Azure Virtual Desktop"
        },
        {
          "id": "b",
          "text": "Azure Virtual Machine Scale Sets"
        },
        {
          "id": "c",
          "text": "Availability sets"
        },
        {
          "id": "d",
          "text": "Azure Files"
        }
      ],
      "correct": "a",
      "explanation": "Azure Virtual Desktop provides a virtualized, cloud-hosted Windows desktop and application experience accessible from many devices, centrally managed by IT."
    }
  ]
};
