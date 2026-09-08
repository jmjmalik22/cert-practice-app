export const SC_900 = {
  "label": "Security, Compliance, and Identity Fundamentals",
  "questions": [
    {
      "id": "sc900-1",
      "domain": "Describe security and compliance concepts",
      "question": "Which security model assumes breach and requires explicit verification for every access request, regardless of where it originates?",
      "options": [
        { "id": "a", "text": "Zero Trust" },
        { "id": "b", "text": "Defense in depth" },
        { "id": "c", "text": "Shared responsibility" },
        { "id": "d", "text": "Least privilege" }
      ],
      "correct": "a",
      "explanation": "Zero Trust operates on the principle of 'never trust, always verify,' requiring explicit verification, least-privileged access, and assuming breach for every request."
    },
    {
      "id": "sc900-2",
      "domain": "Describe security and compliance concepts",
      "question": "In the shared responsibility model, which of the following is always the customer's responsibility, regardless of whether the deployment is IaaS, PaaS, or SaaS?",
      "options": [
        { "id": "a", "text": "Physical datacenter security" },
        { "id": "b", "text": "Data and identities" },
        { "id": "c", "text": "The physical network" },
        { "id": "d", "text": "The physical hosts" }
      ],
      "correct": "b",
      "explanation": "Regardless of cloud service model, the customer always retains responsibility for their own data and identities; the cloud provider always retains responsibility for the physical infrastructure."
    },
    {
      "id": "sc900-3",
      "domain": "Describe security and compliance concepts",
      "question": "A security strategy that layers multiple defensive controls (physical, identity, perimeter, network, compute, application, and data) is best described as which concept?",
      "options": [
        { "id": "a", "text": "Defense in depth" },
        { "id": "b", "text": "Federation" },
        { "id": "c", "text": "Single sign-on" },
        { "id": "d", "text": "Role-based access control" }
      ],
      "correct": "a",
      "explanation": "Defense in depth uses multiple layers of security controls so that if one layer is breached, additional layers continue to protect resources."
    },
    {
      "id": "sc900-4",
      "domain": "Describe security and compliance concepts",
      "question": "Which term refers to encrypting data while it is stored on disk, as opposed to while it is being transmitted?",
      "options": [
        { "id": "a", "text": "Encryption at rest" },
        { "id": "b", "text": "Encryption in transit" },
        { "id": "c", "text": "Hashing" },
        { "id": "d", "text": "Tokenization" },
      ],
      "correct": "a",
      "explanation": "Encryption at rest protects data stored on disks or in databases; encryption in transit protects data as it moves across a network."
    },
    {
      "id": "sc900-5",
      "domain": "Describe security and compliance concepts",
      "question": "Which of the following best describes the goal of a governance, risk, and compliance (GRC) approach within an organization?",
      "options": [
        { "id": "a", "text": "Aligning IT security practices with business objectives while managing risk and meeting regulatory obligations" },
        { "id": "b", "text": "Encrypting all data at rest and in transit" },
        { "id": "c", "text": "Replacing passwords with biometric authentication" },
        { "id": "d", "text": "Deploying firewalls at every network boundary" }
      ],
      "correct": "a",
      "explanation": "GRC is a strategic approach that aligns IT and security activities with business goals while effectively managing risk and satisfying compliance requirements."
    },
    {
      "id": "sc900-6",
      "domain": "Describe identity concepts",
      "question": "In identity terminology, what is the primary difference between authentication and authorization?",
      "options": [
        { "id": "a", "text": "Authentication proves who you are; authorization determines what you can access" },
        { "id": "b", "text": "Authentication determines what you can access; authorization proves who you are" },
        { "id": "c", "text": "They are two terms for the same process" },
        { "id": "d", "text": "Authentication applies to devices only; authorization applies to users only" }
      ],
      "correct": "a",
      "explanation": "Authentication (AuthN) verifies the identity of a user or device, while authorization (AuthZ) determines what resources or actions that verified identity is permitted to access."
    },
    {
      "id": "sc900-7",
      "domain": "Describe identity concepts",
      "question": "Which identity concept allows a user to sign in once and gain access to multiple independent applications without re-entering credentials?",
      "options": [
        { "id": "a", "text": "Single sign-on (SSO)" },
        { "id": "b", "text": "Multifactor authentication" },
        { "id": "c", "text": "Federation" },
        { "id": "d", "text": "Conditional Access" }
      ],
      "correct": "a",
      "explanation": "Single sign-on lets a user authenticate once and then access multiple applications and services without being prompted to sign in again for each one."
    },
    {
      "id": "sc900-8",
      "domain": "Describe identity concepts",
      "question": "What is the primary purpose of federation between two organizations' identity systems?",
      "options": [
        { "id": "a", "text": "To let users in one domain access resources in another domain using their existing identity" },
        { "id": "b", "text": "To encrypt data shared between two organizations" },
        { "id": "c", "text": "To merge two Microsoft Entra tenants into one" },
        { "id": "d", "text": "To disable multifactor authentication across both domains" }
      ],
      "correct": "a",
      "explanation": "Federation establishes a trust relationship between identity providers so users can use a single set of credentials to access resources across organizational boundaries."
    },
    {
      "id": "sc900-9",
      "domain": "Describe identity concepts",
      "question": "Which of these is an example of something you have, used as one factor in multifactor authentication?",
      "options": [
        { "id": "a", "text": "A one-time code generated by an authenticator app on a registered phone" },
        { "id": "b", "text": "A memorized PIN" },
        { "id": "c", "text": "A fingerprint scan" },
        { "id": "d", "text": "A security question answer" }
      ],
      "correct": "a",
      "explanation": "An authenticator app on a registered device is a 'something you have' factor, distinct from 'something you know' (PIN, password) and 'something you are' (biometrics)."
    },
    {
      "id": "sc900-10",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "What is Microsoft Entra ID primarily used for?",
      "options": [
        { "id": "a", "text": "Cloud-based identity and access management for users and applications" },
        { "id": "b", "text": "Endpoint antivirus protection" },
        { "id": "c", "text": "Network firewall configuration" },
        { "id": "d", "text": "Data loss prevention policy enforcement" }
      ],
      "correct": "a",
      "explanation": "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service, used to authenticate and authorize users and applications."
    },
    {
      "id": "sc900-11",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "Which Microsoft Entra feature evaluates signals such as user location, device compliance, and sign-in risk to enforce access decisions like requiring MFA or blocking access?",
      "options": [
        { "id": "a", "text": "Conditional Access" },
        { "id": "b", "text": "Identity Protection" },
        { "id": "c", "text": "Privileged Identity Management" },
        { "id": "d", "text": "Entra Connect" }
      ],
      "correct": "a",
      "explanation": "Conditional Access policies evaluate signals (user, location, device, application, risk) to make automated access-control decisions, such as requiring MFA or blocking access."
    },
    {
      "id": "sc900-12",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "Which Microsoft Entra capability provides just-in-time, time-bound elevation to privileged roles, requiring approval and automatically expiring access?",
      "options": [
        { "id": "a", "text": "Privileged Identity Management (PIM)" },
        { "id": "b", "text": "Conditional Access" },
        { "id": "c", "text": "Self-service password reset" },
        { "id": "d", "text": "Entra Connect Sync" }
      ],
      "correct": "a",
      "explanation": "Privileged Identity Management provides just-in-time privileged access, requiring approval, justification, and time-bound activation, reducing standing access to sensitive roles."
    },
    {
      "id": "sc900-13",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "Which Microsoft Entra service uses machine learning to detect risky sign-ins and risky users, and can automatically remediate identified risks?",
      "options": [
        { "id": "a", "text": "Microsoft Entra ID Protection" },
        { "id": "b", "text": "Microsoft Entra Connect" },
        { "id": "c", "text": "Microsoft Entra Domain Services" },
        { "id": "d", "text": "Microsoft Entra External ID" }
      ],
      "correct": "a",
      "explanation": "Microsoft Entra ID Protection uses adaptive machine learning to detect anomalies and risky sign-ins, and can trigger automated responses such as requiring a password change or blocking access."
    },
    {
      "id": "sc900-14",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "What is the purpose of Microsoft Entra Connect (or Cloud Sync) in a hybrid identity environment?",
      "options": [
        { "id": "a", "text": "Synchronizing on-premises Active Directory identities with Microsoft Entra ID" },
        { "id": "b", "text": "Encrypting Microsoft 365 email messages" },
        { "id": "c", "text": "Managing device compliance policies" },
        { "id": "d", "text": "Scanning for malware on endpoints" }
      ],
      "correct": "a",
      "explanation": "Microsoft Entra Connect (and Cloud Sync) synchronizes identity data between on-premises Active Directory and Microsoft Entra ID, enabling a consistent hybrid identity experience."
    },
    {
      "id": "sc900-15",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "Which feature allows users to reset their own forgotten password without contacting the help desk, provided they've registered authentication methods?",
      "options": [
        { "id": "a", "text": "Self-service password reset (SSPR)" },
        { "id": "b", "text": "Conditional Access" },
        { "id": "c", "text": "Identity Governance" },
        { "id": "d", "text": "Access reviews" }
      ],
      "correct": "a",
      "explanation": "Self-service password reset lets users unlock their account or reset a forgotten password using previously registered verification methods, without help desk involvement."
    },
    {
      "id": "sc900-16",
      "domain": "Describe the capabilities of Microsoft Entra",
      "question": "Which Microsoft Entra Identity Governance feature periodically requires reviewers to confirm whether users still need their current access or group membership?",
      "options": [
        { "id": "a", "text": "Access reviews" },
        { "id": "b", "text": "Entitlement management" },
        { "id": "c", "text": "Password protection" },
        { "id": "d", "text": "Workload identities" }
      ],
      "correct": "a",
      "explanation": "Access reviews let organizations periodically re-certify user access, group memberships, and role assignments, helping to remove unnecessary or stale access over time."
    },
    {
      "id": "sc900-17",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which Microsoft solution provides extended detection and response (XDR) by correlating signals across identities, endpoints, email, and cloud apps?",
      "options": [
        { "id": "a", "text": "Microsoft Defender XDR" },
        { "id": "b", "text": "Microsoft Purview" },
        { "id": "c", "text": "Microsoft Entra ID" },
        { "id": "d", "text": "Azure Policy" }
      ],
      "correct": "a",
      "explanation": "Microsoft Defender XDR (formerly Microsoft 365 Defender) correlates signals across endpoints, identities, email, and cloud apps to provide unified detection, investigation, and response."
    },
    {
      "id": "sc900-18",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which Azure service acts as a unified infrastructure security management system that strengthens the security posture of cloud resources and provides threat protection?",
      "options": [
        { "id": "a", "text": "Microsoft Defender for Cloud" },
        { "id": "b", "text": "Microsoft Sentinel" },
        { "id": "c", "text": "Azure Key Vault" },
        { "id": "d", "text": "Azure Bastion" }
      ],
      "correct": "a",
      "explanation": "Microsoft Defender for Cloud provides cloud security posture management (CSPM) and workload protection, giving recommendations to harden resources and detecting active threats."
    },
    {
      "id": "sc900-19",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which Microsoft product is a cloud-native SIEM (security information and event management) and SOAR (security orchestration, automation, and response) solution?",
      "options": [
        { "id": "a", "text": "Microsoft Sentinel" },
        { "id": "b", "text": "Microsoft Defender for Identity" },
        { "id": "c", "text": "Microsoft Purview Compliance Manager" },
        { "id": "d", "text": "Microsoft Entra Permissions Management" }
      ],
      "correct": "a",
      "explanation": "Microsoft Sentinel is a cloud-native SIEM/SOAR platform that collects security data at scale, detects threats using analytics and threat intelligence, and can automate responses."
    },
    {
      "id": "sc900-20",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which Defender product specifically protects email and collaboration tools such as Exchange Online, SharePoint, and Teams from phishing and malware?",
      "options": [
        { "id": "a", "text": "Microsoft Defender for Office 365" },
        { "id": "b", "text": "Microsoft Defender for Endpoint" },
        { "id": "c", "text": "Microsoft Defender for Cloud Apps" },
        { "id": "d", "text": "Microsoft Defender for IoT" }
      ],
      "correct": "a",
      "explanation": "Microsoft Defender for Office 365 protects email and collaboration content against threats such as phishing, malicious links, and malware attachments."
    },
    {
      "id": "sc900-21",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which Microsoft Defender product is a cloud access security broker (CASB) that provides visibility and control over the use of third-party SaaS applications?",
      "options": [
        { "id": "a", "text": "Microsoft Defender for Cloud Apps" },
        { "id": "b", "text": "Microsoft Defender for Endpoint" },
        { "id": "c", "text": "Microsoft Defender for Identity" },
        { "id": "d", "text": "Microsoft Defender Vulnerability Management" }
      ],
      "correct": "a",
      "explanation": "Microsoft Defender for Cloud Apps is a CASB that discovers shadow IT, assesses SaaS app risk, and enforces policies such as blocking downloads of sensitive data to unmanaged apps."
    },
    {
      "id": "sc900-22",
      "domain": "Describe the capabilities of Microsoft security solutions",
      "question": "Which score in Microsoft Defender for Cloud provides a measurable assessment of an organization's overall security posture, with recommendations to improve it?",
      "options": [
        { "id": "a", "text": "Secure Score" },
        { "id": "b", "text": "Compliance Score" },
        { "id": "c", "text": "Risk Score" },
        { "id": "d", "text": "Trust Score" }
      ],
      "correct": "a",
      "explanation": "Secure Score in Microsoft Defender for Cloud (and Microsoft 365) measures the current security posture and provides prioritized recommendations to reduce risk."
    },
    {
      "id": "sc900-23",
      "domain": "Describe the capabilities of Microsoft compliance solutions",
      "question": "Which Microsoft Purview capability translates complex regulatory requirements into recommended actions and tracks an organization's progress toward compliance?",
      "options": [
        { "id": "a", "text": "Compliance Manager" },
        { "id": "b", "text": "Information Barriers" },
        { "id": "c", "text": "Communication Compliance" },
        { "id": "d", "text": "eDiscovery" }
      ],
      "correct": "a",
      "explanation": "Microsoft Purview Compliance Manager assesses risk against regulatory requirements, assigns a compliance score, and recommends improvement actions to help meet obligations."
    },
    {
      "id": "sc900-24",
      "domain": "Describe the capabilities of Microsoft compliance solutions",
      "question": "Which Microsoft Purview feature applies labels to classify and protect content, such as marking a document 'Confidential' and automatically encrypting it?",
      "options": [
        { "id": "a", "text": "Sensitivity labels" },
        { "id": "b", "text": "Retention labels" },
        { "id": "c", "text": "Insider risk management" },
        { "id": "d", "text": "Audit" }
      ],
      "correct": "a",
      "explanation": "Sensitivity labels classify and protect content by applying settings such as encryption, access restrictions, and visual markings based on the label's sensitivity level."
    },
    {
      "id": "sc900-25",
      "domain": "Describe the capabilities of Microsoft compliance solutions",
      "question": "Which Microsoft Purview solution helps organizations identify, investigate, and act on potentially risky or malicious activity by internal users?",
      "options": [
        { "id": "a", "text": "Insider Risk Management" },
        { "id": "b", "text": "Data Loss Prevention" },
        { "id": "c", "text": "Records Management" },
        { "id": "d", "text": "Litigation Hold" }
      ],
      "correct": "a",
      "explanation": "Insider Risk Management uses signals across the Microsoft 365 environment to detect, investigate, and act on risky behaviors from internal users, such as data theft or policy violations."
    },
    {
      "id": "sc900-26",
      "domain": "Describe the capabilities of Microsoft compliance solutions",
      "question": "Which Microsoft Purview capability lets legal teams identify, hold, and export content relevant to an investigation or litigation across Exchange, SharePoint, and Teams?",
      "options": [
        { "id": "a", "text": "eDiscovery" },
        { "id": "b", "text": "Data Loss Prevention" },
        { "id": "c", "text": "Sensitivity labels" },
        { "id": "d", "text": "Communication Compliance" }
      ],
      "correct": "a",
      "explanation": "eDiscovery tools in Microsoft Purview allow organizations to search for, hold, and export content across Microsoft 365 services for legal or investigative purposes."
    }
  ]
};
