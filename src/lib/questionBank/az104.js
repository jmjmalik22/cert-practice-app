export const AZ_104 = {
  "label": "Azure Administrator Associate",
  "questions": [
    {
      "id": "az104-1",
      "domain": "Manage Azure identities and governance",
      "question": "You need to let an external partner sign in to your organization's Azure resources using their own corporate credentials. What should you do?",
      "options": [
        {
          "id": "a",
          "text": "Invite them as a Microsoft Entra guest (B2B) user"
        },
        {
          "id": "b",
          "text": "Create a new Microsoft Entra user with a temporary password"
        },
        {
          "id": "c",
          "text": "Add them to the DefaultReader OneLake role"
        },
        {
          "id": "d",
          "text": "Give them the subscription's service principal credentials"
        }
      ],
      "correct": "a",
      "explanation": "Microsoft Entra B2B collaboration lets you invite external users as guests, allowing them to sign in with their own organizational credentials rather than creating a new managed identity for them."
    },
    {
      "id": "az104-2",
      "domain": "Manage Azure identities and governance",
      "question": "Users keep contacting the helpdesk to reset forgotten passwords. Which Microsoft Entra ID feature lets users reset their own password without helpdesk involvement?",
      "options": [
        {
          "id": "a",
          "text": "Self-service password reset (SSPR)"
        },
        {
          "id": "b",
          "text": "Conditional Access"
        },
        {
          "id": "c",
          "text": "Privileged Identity Management"
        },
        {
          "id": "d",
          "text": "Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Self-service password reset (SSPR) lets users reset or unlock their own accounts using verification methods they registered in advance, reducing helpdesk load."
    },
    {
      "id": "az104-3",
      "domain": "Manage Azure identities and governance",
      "question": "Which Azure RBAC role grants full management access to resources, including the ability to grant access to others, but not to manage the underlying Azure subscription itself?",
      "options": [
        {
          "id": "a",
          "text": "Owner"
        },
        {
          "id": "b",
          "text": "Contributor"
        },
        {
          "id": "c",
          "text": "Reader"
        },
        {
          "id": "d",
          "text": "User Access Administrator"
        }
      ],
      "correct": "b",
      "explanation": "Contributor grants full management access to resources but cannot grant access to others; that additional capability is what distinguishes Owner from Contributor."
    },
    {
      "id": "az104-4",
      "domain": "Manage Azure identities and governance",
      "question": "You want to enforce that all storage accounts in a subscription must use only approved SKUs. Which service should you use?",
      "options": [
        {
          "id": "a",
          "text": "Azure Policy"
        },
        {
          "id": "b",
          "text": "Azure Blueprints only"
        },
        {
          "id": "c",
          "text": "Resource locks"
        },
        {
          "id": "d",
          "text": "Management groups"
        }
      ],
      "correct": "a",
      "explanation": "Azure Policy evaluates resources against defined rules — such as allowed SKUs — and can audit or deny non-compliant deployments."
    },
    {
      "id": "az104-5",
      "domain": "Manage Azure identities and governance",
      "question": "Which feature prevents a critical production resource from being accidentally deleted, even by a user with Contributor access?",
      "options": [
        {
          "id": "a",
          "text": "A CanNotDelete resource lock"
        },
        {
          "id": "b",
          "text": "A read-only RBAC role"
        },
        {
          "id": "c",
          "text": "Azure Advisor"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "A CanNotDelete resource lock overrides normal RBAC permissions to prevent deletion, regardless of what role a user otherwise holds."
    },
    {
      "id": "az104-6",
      "domain": "Manage Azure identities and governance",
      "question": "Which construct lets you organize multiple subscriptions and apply governance policies across all of them at once?",
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
          "text": "A tag"
        },
        {
          "id": "d",
          "text": "An availability set"
        }
      ],
      "correct": "a",
      "explanation": "Management groups sit above subscriptions in the hierarchy, letting you apply policies and access controls across many subscriptions simultaneously."
    },
    {
      "id": "az104-7",
      "domain": "Manage Azure identities and governance",
      "question": "Which feature helps you organize costs by department or project by attaching name/value metadata to resources?",
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
          "text": "Availability zones"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Tags are name/value pairs applied to resources that help categorize and report on spending, ownership, or environment."
    },
    {
      "id": "az104-8",
      "domain": "Manage Azure identities and governance",
      "question": "A user needs Contributor access to just one resource group, not the entire subscription. What is the recommended scope for the role assignment?",
      "options": [
        {
          "id": "a",
          "text": "The resource group"
        },
        {
          "id": "b",
          "text": "The management group"
        },
        {
          "id": "c",
          "text": "The tenant root"
        },
        {
          "id": "d",
          "text": "The subscription"
        }
      ],
      "correct": "a",
      "explanation": "Following least privilege, RBAC role assignments should be scoped as narrowly as possible — the resource group level here, rather than the whole subscription."
    },
    {
      "id": "az104-9",
      "domain": "Manage Azure identities and governance",
      "question": "Which Microsoft Entra ID object type is used to grant permissions to a group of users at once, rather than assigning roles individually?",
      "options": [
        {
          "id": "a",
          "text": "A group"
        },
        {
          "id": "b",
          "text": "A managed identity"
        },
        {
          "id": "c",
          "text": "A service principal"
        },
        {
          "id": "d",
          "text": "A resource lock"
        }
      ],
      "correct": "a",
      "explanation": "Groups let administrators assign roles and licenses once to the group, and every member inherits that access, simplifying management at scale."
    },
    {
      "id": "az104-10",
      "domain": "Manage Azure identities and governance",
      "question": "You want to track how much a specific project is spending in Azure and get notified when spending approaches a threshold. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A budget with an alert"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A management group"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Budgets let you set spending thresholds for a scope and configure alerts that notify stakeholders as actual or forecasted costs approach that threshold."
    },
    {
      "id": "az104-11",
      "domain": "Manage Azure identities and governance",
      "question": "Which report in the Azure portal helps you understand why a specific user does or doesn't have access to a resource?",
      "options": [
        {
          "id": "a",
          "text": "The Check access / IAM view for that resource"
        },
        {
          "id": "b",
          "text": "Azure Monitor Logs"
        },
        {
          "id": "c",
          "text": "Azure Advisor"
        },
        {
          "id": "d",
          "text": "Cost Management"
        }
      ],
      "correct": "a",
      "explanation": "The Check access feature under Access control (IAM) shows which role assignments apply to a given user at a given scope, helping troubleshoot access issues."
    },
    {
      "id": "az104-12",
      "domain": "Manage Azure identities and governance",
      "question": "Which Microsoft Entra ID feature lets administrators assign licenses (like Microsoft 365) automatically to all members of a group?",
      "options": [
        {
          "id": "a",
          "text": "Group-based licensing"
        },
        {
          "id": "b",
          "text": "Conditional Access"
        },
        {
          "id": "c",
          "text": "Azure Policy"
        },
        {
          "id": "d",
          "text": "Resource tagging"
        }
      ],
      "correct": "a",
      "explanation": "Group-based licensing automatically assigns and removes licenses as users join or leave a group, avoiding manual per-user license management."
    },
    {
      "id": "az104-13",
      "domain": "Implement and manage storage",
      "question": "You need to grant temporary, time-limited access to a specific blob without sharing your storage account key. What should you generate?",
      "options": [
        {
          "id": "a",
          "text": "A shared access signature (SAS) token"
        },
        {
          "id": "b",
          "text": "A new storage account key"
        },
        {
          "id": "c",
          "text": "A resource lock"
        },
        {
          "id": "d",
          "text": "A management certificate"
        }
      ],
      "correct": "a",
      "explanation": "A SAS token grants delegated, time-limited access to specific storage resources without exposing the account's full access keys."
    },
    {
      "id": "az104-14",
      "domain": "Implement and manage storage",
      "question": "Which storage redundancy option replicates data synchronously across three availability zones within a single region?",
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
          "text": "Geo-redundant storage (GRS) alone"
        },
        {
          "id": "d",
          "text": "No redundancy"
        }
      ],
      "correct": "a",
      "explanation": "Zone-redundant storage (ZRS) synchronously replicates data across three availability zones, protecting against a single datacenter failure — LRS only replicates within one datacenter."
    },
    {
      "id": "az104-15",
      "domain": "Implement and manage storage",
      "question": "Which Azure Storage feature restricts network access to a storage account to only specific virtual networks or IP ranges?",
      "options": [
        {
          "id": "a",
          "text": "Azure Storage firewalls and virtual network rules"
        },
        {
          "id": "b",
          "text": "Shared access signatures"
        },
        {
          "id": "c",
          "text": "Storage account encryption"
        },
        {
          "id": "d",
          "text": "Blob versioning"
        }
      ],
      "correct": "a",
      "explanation": "Storage account firewall and virtual network rules restrict which networks or public IP ranges are allowed to reach the storage account at all, independent of authentication."
    },
    {
      "id": "az104-16",
      "domain": "Implement and manage storage",
      "question": "Which storage tier offers the lowest per-GB storage cost, at the expense of higher retrieval latency, best suited for long-term backups rarely accessed?",
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
      "explanation": "The Archive tier offers the lowest storage cost but requires rehydration (hours of latency) before data can be read, making it suited to rarely accessed long-term data."
    },
    {
      "id": "az104-17",
      "domain": "Implement and manage storage",
      "question": "Which tool is optimized for fast, high-throughput command-line data transfer into and out of Azure Blob Storage?",
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
          "text": "Azure CLI's generic 'az' commands only"
        },
        {
          "id": "d",
          "text": "Azure Data Box"
        }
      ],
      "correct": "a",
      "explanation": "AzCopy is a command-line utility purpose-built for fast, high-throughput copying of data into and out of Azure Storage."
    },
    {
      "id": "az104-18",
      "domain": "Implement and manage storage",
      "question": "You want files accidentally deleted from a blob container to be recoverable for a set retention period. What should you enable?",
      "options": [
        {
          "id": "a",
          "text": "Soft delete for blobs"
        },
        {
          "id": "b",
          "text": "Object replication"
        },
        {
          "id": "c",
          "text": "A SAS token"
        },
        {
          "id": "d",
          "text": "A stored access policy"
        }
      ],
      "correct": "a",
      "explanation": "Soft delete for blobs retains deleted blobs for a configured retention period, allowing recovery from accidental deletion or overwrite."
    },
    {
      "id": "az104-19",
      "domain": "Implement and manage storage",
      "question": "Which feature lets you automatically move blobs to a cooler storage tier or delete them after a defined number of days since last modification?",
      "options": [
        {
          "id": "a",
          "text": "Blob lifecycle management"
        },
        {
          "id": "b",
          "text": "Object replication"
        },
        {
          "id": "c",
          "text": "Stored access policies"
        },
        {
          "id": "d",
          "text": "Encryption scopes"
        }
      ],
      "correct": "a",
      "explanation": "Lifecycle management policies automate tiering or deleting blobs based on rules like age since last modification, reducing storage costs without manual intervention."
    },
    {
      "id": "az104-20",
      "domain": "Implement and manage storage",
      "question": "You need to grant an Azure VM's managed identity access to read files in Azure Files without managing storage account keys. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Identity-based access for Azure Files"
        },
        {
          "id": "b",
          "text": "A SAS token shared via email"
        },
        {
          "id": "c",
          "text": "A stored access policy only"
        },
        {
          "id": "d",
          "text": "Object replication"
        }
      ],
      "correct": "a",
      "explanation": "Identity-based access for Azure Files lets Microsoft Entra identities (including managed identities) authenticate via Kerberos over SMB, avoiding the need to manage and distribute storage keys."
    },
    {
      "id": "az104-21",
      "domain": "Implement and manage storage",
      "question": "Which feature automatically copies changes made to blobs in a source storage account to a destination storage account, potentially in another region?",
      "options": [
        {
          "id": "a",
          "text": "Object replication"
        },
        {
          "id": "b",
          "text": "Blob versioning"
        },
        {
          "id": "c",
          "text": "A stored access policy"
        },
        {
          "id": "d",
          "text": "Soft delete"
        }
      ],
      "correct": "a",
      "explanation": "Object replication asynchronously copies block blobs between a source and destination storage account, commonly used for minimizing latency or maintaining a copy in another region."
    },
    {
      "id": "az104-22",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which Azure Resource Manager artifact declaratively defines infrastructure to deploy, using a domain-specific language that transpiles to ARM JSON?",
      "options": [
        {
          "id": "a",
          "text": "A Bicep file"
        },
        {
          "id": "b",
          "text": "A PowerShell script"
        },
        {
          "id": "c",
          "text": "An Azure Policy definition"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "Bicep is a domain-specific language for deploying Azure resources declaratively; it compiles down to standard ARM JSON templates but is more concise and readable to author."
    },
    {
      "id": "az104-23",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which feature distributes identical VMs across fault domains and update domains to reduce the chance of a single failure taking down an entire application?",
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
          "text": "Tags"
        }
      ],
      "correct": "a",
      "explanation": "Availability sets spread VMs across separate fault domains (hardware) and update domains (maintenance windows), reducing correlated failure risk."
    },
    {
      "id": "az104-24",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which Azure compute service automatically scales a group of identical, load-balanced VM instances up or down based on demand?",
      "options": [
        {
          "id": "a",
          "text": "Virtual Machine Scale Sets"
        },
        {
          "id": "b",
          "text": "Availability sets"
        },
        {
          "id": "c",
          "text": "Azure Container Instances"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Virtual Machine Scale Sets manage a group of identical, load-balanced VMs and can automatically increase or decrease instance count based on demand or a schedule."
    },
    {
      "id": "az104-25",
      "domain": "Deploy and manage Azure compute resources",
      "question": "You need to run a single container quickly without managing orchestration, VMs, or a cluster. Which service is the simplest fit?",
      "options": [
        {
          "id": "a",
          "text": "Azure Container Instances"
        },
        {
          "id": "b",
          "text": "Azure Kubernetes Service"
        },
        {
          "id": "c",
          "text": "Virtual Machine Scale Sets"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Azure Container Instances (ACI) lets you run a single container quickly and simply, without provisioning VMs or managing a full orchestration cluster."
    },
    {
      "id": "az104-26",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which App Service feature lets you deploy a new version of your app to a separate environment and swap it into production with minimal downtime?",
      "options": [
        {
          "id": "a",
          "text": "Deployment slots"
        },
        {
          "id": "b",
          "text": "Scaling rules"
        },
        {
          "id": "c",
          "text": "Custom domains"
        },
        {
          "id": "d",
          "text": "App Service plan tiers"
        }
      ],
      "correct": "a",
      "explanation": "Deployment slots let you stage a new version in a separate slot, warm it up, and then swap it into production, minimizing downtime and enabling easy rollback."
    },
    {
      "id": "az104-27",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which Azure Resource Manager capability lets you move an existing VM to a different resource group without recreating it?",
      "options": [
        {
          "id": "a",
          "text": "Resource move"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A deployment slot"
        },
        {
          "id": "d",
          "text": "An availability zone"
        }
      ],
      "correct": "a",
      "explanation": "Azure supports moving many resource types, including VMs, between resource groups, subscriptions, or regions using the resource move capability, without needing to delete and recreate them."
    },
    {
      "id": "az104-28",
      "domain": "Deploy and manage Azure compute resources",
      "question": "You need encryption of a VM's OS and data disks that occurs at the host level, before data reaches the storage service. Which feature provides this?",
      "options": [
        {
          "id": "a",
          "text": "Encryption at host"
        },
        {
          "id": "b",
          "text": "Azure Storage firewall"
        },
        {
          "id": "c",
          "text": "A resource lock"
        },
        {
          "id": "d",
          "text": "A shared access signature"
        }
      ],
      "correct": "a",
      "explanation": "Encryption at host encrypts VM disk data on the host itself, ensuring data is encrypted end-to-end before it's written to the underlying storage."
    },
    {
      "id": "az104-29",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which Azure service lets you build and manage a private registry to store and version your own container images?",
      "options": [
        {
          "id": "a",
          "text": "Azure Container Registry"
        },
        {
          "id": "b",
          "text": "Azure Container Instances"
        },
        {
          "id": "c",
          "text": "Azure App Service"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Azure Container Registry (ACR) is a private registry for storing and managing container images and related artifacts across your deployments."
    },
    {
      "id": "az104-30",
      "domain": "Deploy and manage Azure compute resources",
      "question": "You want to configure automatic HTTPS certificates and a custom DNS name for a web app hosted in App Service. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "TLS/SSL bindings and a custom domain mapping"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "An availability set"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "App Service lets you map a custom DNS name to your app and configure TLS/SSL certificates and bindings so the custom domain is served securely over HTTPS."
    },
    {
      "id": "az104-31",
      "domain": "Deploy and manage Azure compute resources",
      "question": "Which serverless container option in Azure lets you run microservices and event-driven applications without managing the underlying VMs or a Kubernetes cluster?",
      "options": [
        {
          "id": "a",
          "text": "Azure Container Apps"
        },
        {
          "id": "b",
          "text": "Azure Virtual Machine Scale Sets"
        },
        {
          "id": "c",
          "text": "Azure Bastion"
        },
        {
          "id": "d",
          "text": "Availability sets"
        }
      ],
      "correct": "a",
      "explanation": "Azure Container Apps is a fully managed serverless container platform for running microservices and event-driven apps without directly managing infrastructure or Kubernetes."
    },
    {
      "id": "az104-32",
      "domain": "Implement and manage virtual networking",
      "question": "You want two virtual networks in different regions to communicate directly using private IP addresses over the Microsoft backbone. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "VNet peering"
        },
        {
          "id": "b",
          "text": "A network security group"
        },
        {
          "id": "c",
          "text": "Azure DNS"
        },
        {
          "id": "d",
          "text": "A load balancer"
        }
      ],
      "correct": "a",
      "explanation": "VNet peering connects two virtual networks so resources in each can communicate using private IP addresses over Microsoft's backbone network, without public internet exposure."
    },
    {
      "id": "az104-33",
      "domain": "Implement and manage virtual networking",
      "question": "Which resource acts as a distributed firewall, controlling inbound and outbound traffic to network interfaces or subnets based on rules?",
      "options": [
        {
          "id": "a",
          "text": "A network security group (NSG)"
        },
        {
          "id": "b",
          "text": "Azure DNS"
        },
        {
          "id": "c",
          "text": "A public IP address"
        },
        {
          "id": "d",
          "text": "A load balancer"
        }
      ],
      "correct": "a",
      "explanation": "Network security groups (NSGs) contain rules that allow or deny inbound and outbound network traffic to Azure resources, based on source, destination, port, and protocol."
    },
    {
      "id": "az104-34",
      "domain": "Implement and manage virtual networking",
      "question": "You need to securely RDP or SSH into VMs inside a virtual network without exposing them to the public internet or giving each one a public IP. What should you deploy?",
      "options": [
        {
          "id": "a",
          "text": "Azure Bastion"
        },
        {
          "id": "b",
          "text": "A public load balancer"
        },
        {
          "id": "c",
          "text": "Azure DNS"
        },
        {
          "id": "d",
          "text": "A user-defined route"
        }
      ],
      "correct": "a",
      "explanation": "Azure Bastion provides secure RDP/SSH connectivity to VMs directly through the Azure portal over TLS, without needing to expose the VM's public IP address."
    },
    {
      "id": "az104-35",
      "domain": "Implement and manage virtual networking",
      "question": "Which feature lets you override Azure's default system routes to force traffic through a network virtual appliance or specific next hop?",
      "options": [
        {
          "id": "a",
          "text": "A user-defined route (UDR)"
        },
        {
          "id": "b",
          "text": "A network security group"
        },
        {
          "id": "c",
          "text": "VNet peering"
        },
        {
          "id": "d",
          "text": "A public IP address"
        }
      ],
      "correct": "a",
      "explanation": "User-defined routes (UDRs) override Azure's default system routing, letting you direct traffic through a specific next hop such as a firewall appliance."
    },
    {
      "id": "az104-36",
      "domain": "Implement and manage virtual networking",
      "question": "You want a PaaS service like Azure SQL Database to be reachable only via a private IP address inside your VNet, not over the public internet. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A private endpoint"
        },
        {
          "id": "b",
          "text": "A service endpoint"
        },
        {
          "id": "c",
          "text": "A public load balancer"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "A private endpoint assigns a private IP address from your VNet to a PaaS service, allowing traffic to stay entirely on the Microsoft backbone without a public endpoint."
    },
    {
      "id": "az104-37",
      "domain": "Implement and manage virtual networking",
      "question": "Which Azure service provides managed, scalable DNS hosting for your domains, including private DNS zones resolvable only within a VNet?",
      "options": [
        {
          "id": "a",
          "text": "Azure DNS"
        },
        {
          "id": "b",
          "text": "Azure Bastion"
        },
        {
          "id": "c",
          "text": "Network Watcher"
        },
        {
          "id": "d",
          "text": "A network security group"
        }
      ],
      "correct": "a",
      "explanation": "Azure DNS hosts DNS zones and records, including private DNS zones that resolve only within linked virtual networks, alongside public zone hosting."
    },
    {
      "id": "az104-38",
      "domain": "Implement and manage virtual networking",
      "question": "You need to distribute incoming traffic across multiple VMs behind a single public IP address for high availability. What should you deploy?",
      "options": [
        {
          "id": "a",
          "text": "An Azure Load Balancer"
        },
        {
          "id": "b",
          "text": "Azure Bastion"
        },
        {
          "id": "c",
          "text": "A user-defined route"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "A load balancer distributes incoming network traffic across multiple backend VM instances, improving availability and scaling out application capacity."
    },
    {
      "id": "az104-39",
      "domain": "Implement and manage virtual networking",
      "question": "A VM in your VNet can't reach the internet or other resources. Which built-in tool helps diagnose connectivity issues step by step?",
      "options": [
        {
          "id": "a",
          "text": "Azure Network Watcher"
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
          "text": "Azure Cost Management"
        }
      ],
      "correct": "a",
      "explanation": "Network Watcher provides tools like IP flow verify, next hop, and connection troubleshoot to diagnose network connectivity problems within Azure."
    },
    {
      "id": "az104-40",
      "domain": "Implement and manage virtual networking",
      "question": "Which resource lets applications inside a PaaS service like Azure SQL reach a specific VNet subnet over the Microsoft backbone, without needing a private endpoint, by extending the VNet identity to the service?",
      "options": [
        {
          "id": "a",
          "text": "A service endpoint"
        },
        {
          "id": "b",
          "text": "A public IP address"
        },
        {
          "id": "c",
          "text": "A network security group"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Service endpoints extend a VNet's private address space identity to Azure PaaS services, allowing the subnet to reach the service over the Microsoft backbone rather than the public internet, without needing the dedicated private IP a private endpoint provides."
    },
    {
      "id": "az104-41",
      "domain": "Implement and manage virtual networking",
      "question": "You want to evaluate which combination of NSG rules actually applies and takes effect for a specific network interface. Which tool should you use?",
      "options": [
        {
          "id": "a",
          "text": "Effective security rules in Network Watcher"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Cost Management + Billing"
        },
        {
          "id": "d",
          "text": "Azure Policy compliance view"
        }
      ],
      "correct": "a",
      "explanation": "Network Watcher's effective security rules view shows the combined result of NSGs applied at both the subnet and NIC level, helping you understand what's actually enforced."
    },
    {
      "id": "az104-42",
      "domain": "Monitor and maintain Azure resources",
      "question": "Which Azure Monitor component lets you write and run KQL queries against collected log data to investigate an issue?",
      "options": [
        {
          "id": "a",
          "text": "Log Analytics"
        },
        {
          "id": "b",
          "text": "Azure Advisor"
        },
        {
          "id": "c",
          "text": "Application Insights alone"
        },
        {
          "id": "d",
          "text": "Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Log Analytics, part of Azure Monitor, lets you query collected log data using Kusto Query Language (KQL) to investigate issues and build custom analysis."
    },
    {
      "id": "az104-43",
      "domain": "Monitor and maintain Azure resources",
      "question": "You want to be automatically notified when a VM's CPU usage exceeds 90% for 5 minutes. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "An Azure Monitor alert rule"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A tag"
        },
        {
          "id": "d",
          "text": "A management group"
        }
      ],
      "correct": "a",
      "explanation": "Azure Monitor alert rules evaluate metrics or logs against defined conditions and trigger notifications or automated actions when the condition, such as sustained high CPU, is met."
    },
    {
      "id": "az104-44",
      "domain": "Monitor and maintain Azure resources",
      "question": "Which Azure Backup component is required to protect on-premises files and folders, or to back up Azure VMs and other Azure workloads?",
      "options": [
        {
          "id": "a",
          "text": "A Recovery Services vault"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A network security group"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "A Recovery Services vault is the storage entity used by Azure Backup and Azure Site Recovery to hold backup data and recovery points for supported workloads, including Azure VMs."
    },
    {
      "id": "az104-45",
      "domain": "Monitor and maintain Azure resources",
      "question": "Which service lets you replicate VMs to a secondary Azure region and fail over to it if the primary region becomes unavailable?",
      "options": [
        {
          "id": "a",
          "text": "Azure Site Recovery"
        },
        {
          "id": "b",
          "text": "Azure Backup alone"
        },
        {
          "id": "c",
          "text": "Network Watcher"
        },
        {
          "id": "d",
          "text": "Azure Bastion"
        }
      ],
      "correct": "a",
      "explanation": "Azure Site Recovery replicates workloads to a secondary region for disaster recovery, and orchestrates failover and failback when needed."
    },
    {
      "id": "az104-46",
      "domain": "Monitor and maintain Azure resources",
      "question": "Where would you configure how long diagnostic logs and metrics for a resource are retained, and where they're sent (e.g. Log Analytics, storage, or Event Hub)?",
      "options": [
        {
          "id": "a",
          "text": "Diagnostic settings"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A management group"
        },
        {
          "id": "d",
          "text": "A stored access policy"
        }
      ],
      "correct": "a",
      "explanation": "Diagnostic settings define which log and metric categories a resource emits and where they're routed — to Log Analytics, storage, or Event Hubs — and for how long."
    },
    {
      "id": "az104-47",
      "domain": "Monitor and maintain Azure resources",
      "question": "You need pre-built dashboards showing VM performance, dependency maps, and health for a group of VMs without writing custom queries. Which capability should you use?",
      "options": [
        {
          "id": "a",
          "text": "Azure Monitor VM Insights"
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
          "text": "Network Watcher topology"
        }
      ],
      "correct": "a",
      "explanation": "VM Insights, part of Azure Monitor, provides pre-built performance charts, health monitoring, and dependency maps for VMs without needing custom query authoring."
    },
    {
      "id": "az104-48",
      "domain": "Monitor and maintain Azure resources",
      "question": "Which action group destination could you configure an alert rule to notify when a threshold is breached?",
      "options": [
        {
          "id": "a",
          "text": "An email, SMS, or webhook, among others"
        },
        {
          "id": "b",
          "text": "Only the Azure portal notification bell"
        },
        {
          "id": "c",
          "text": "Only a resource lock"
        },
        {
          "id": "d",
          "text": "Only Azure Policy"
        }
      ],
      "correct": "a",
      "explanation": "Action groups define a set of notification and action destinations — such as email, SMS, voice, webhook, or Automation runbooks — that alert rules trigger when conditions are met."
    },
    {
      "id": "az104-49",
      "domain": "Monitor and maintain Azure resources",
      "question": "Which backup policy setting determines how often backups run and how long each recovery point is retained?",
      "options": [
        {
          "id": "a",
          "text": "The backup policy schedule and retention settings"
        },
        {
          "id": "b",
          "text": "A resource lock"
        },
        {
          "id": "c",
          "text": "A network security group rule"
        },
        {
          "id": "d",
          "text": "A management group policy"
        }
      ],
      "correct": "a",
      "explanation": "A backup policy defines the backup schedule (how often) and retention duration (how long recovery points are kept), applied to the resources protected by that policy."
    },
    {
      "id": "az104-50",
      "domain": "Monitor and maintain Azure resources",
      "question": "After configuring Azure Site Recovery, which action moves workloads from the primary region back to it after a disaster has been resolved?",
      "options": [
        {
          "id": "a",
          "text": "A failback"
        },
        {
          "id": "b",
          "text": "A resource move"
        },
        {
          "id": "c",
          "text": "A VNet peering reset"
        },
        {
          "id": "d",
          "text": "A tag update"
        }
      ],
      "correct": "a",
      "explanation": "After failing over to a secondary region during a disaster, a failback operation moves the workload back to the primary region once it's available again."
    },
    {
      "id": "az104-51",
      "domain": "Manage Azure identities and governance",
      "question": "Which Azure governance tool provides personalized recommendations across cost, security, reliability, and performance based on your actual resource configuration?",
      "options": [
        {
          "id": "a",
          "text": "Azure Advisor"
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
          "text": "Management groups"
        }
      ],
      "correct": "a",
      "explanation": "Azure Advisor analyzes your resource configuration and usage telemetry to provide personalized, actionable recommendations across several categories, including cost and security."
    },
    {
      "id": "az104-52",
      "domain": "Deploy and manage Azure compute resources",
      "question": "You've modified resources manually in the portal and want to capture the current state as reusable infrastructure-as-code. What can you export?",
      "options": [
        {
          "id": "a",
          "text": "The deployment as an ARM template or convert it to Bicep"
        },
        {
          "id": "b",
          "text": "A resource lock definition"
        },
        {
          "id": "c",
          "text": "A network security group's effective rules only"
        },
        {
          "id": "d",
          "text": "A cost analysis report"
        }
      ],
      "correct": "a",
      "explanation": "Azure lets you export the current configuration of a resource group as an ARM template, which can then be converted to Bicep, providing a reusable infrastructure-as-code starting point."
    }
  ]
};
