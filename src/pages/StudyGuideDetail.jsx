import { Head as Helmet } from "vite-react-ssg";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, FileText, BookOpen } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { EXAM_META, SLUG_TO_EXAM, QUESTION_BANK } from "../lib/questionBank/index.js";
import { buildBreadcrumbSchema, EXAM_CATEGORIES } from "../lib/examCatalog.js";
import { getStudyTopics } from "../lib/studyTopics/index.js";
import { Footer } from "../components/Shared.jsx";

// Content grounded in Microsoft's official study guides (learn.microsoft.com/credentials/certifications/resources/study-guides).
// Kept generic where a resource type applies to any exam, exam-specific where it doesn't.
const GUIDES = {
  "DP-700": {
    prereq: "No strict prerequisites, but the exam assumes hands-on exposure to Microsoft Fabric — navigating the UI, working with workspaces and permissions, and understanding OneLake. If you're new to Fabric, Microsoft's DP-900 (Azure Data Fundamentals) now covers Fabric basics and is a good on-ramp first.",
    background: [
      "Microsoft Fabric fundamentals — Lakehouse, Warehouse, Eventhouse, and how workloads fit together",
      "Batch ingestion patterns and file formats like Parquet and Delta",
      "Basic SQL (joins, aggregations) and awareness of Spark/PySpark",
      "Power BI awareness — semantic models, Import vs DirectQuery vs Direct Lake",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-700",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-700",
    docsUrl: "https://learn.microsoft.com/en-us/fabric/data-engineering/data-engineering-overview",
    glance: {
      length: "120 min (140 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    certPath: {
      before: [{ code: "DP-900", label: "recommended groundwork" }],
      after: [{ code: "DP-600", label: "pairs with — Fabric Analytics Engineer" }],
    },
    resources: [
      { label: "Official DP-700 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-700", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "DP-700 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/", why: "Official exam facts — format, renewal period, and prerequisites" },
      { label: "Fabric data engineering docs", url: "https://learn.microsoft.com/en-us/fabric/data-engineering/data-engineering-overview", why: "Core lakehouse, pipeline, and Spark concepts the exam draws from" },
      { label: "Learn Microsoft Fabric with Will — DP-700 Exam Full Course", url: "https://www.youtube.com/watch?v=KiB4eAeFRsw", why: "A single long-form video walkthrough of every DP-700 skill area, good for a structured one-sitting review" },
    ],
  },
  "DP-600": {
    prereq: "No strict prerequisites, but the exam assumes practical experience building semantic models and reports. Comfort with Power BI, DAX basics, and Microsoft Fabric's analytics workloads will make this much easier.",
    background: [
      "Star schema modeling — facts, dimensions, and relationships",
      "DAX fundamentals — measures, calculated columns, filter context",
      "Power BI semantic models and storage modes (Import, DirectQuery, Direct Lake)",
      "Basic T-SQL and KQL for querying prepared data",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-600",
    docsUrl: "https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview",
    glance: {
      length: "120 min (140 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Maintain a data analytics solution", weight: "25-30%", description: "Deployment pipelines, workspace and item governance, source control for Fabric items" },
      { title: "Prepare data", weight: "45-50%", description: "Dataflows, pipelines, and transformations that feed semantic models" },
      { title: "Implement and manage semantic models", weight: "25-30%", description: "Star schema design, DAX, storage modes, and Direct Lake" },
    ],
    certPath: {
      before: [{ code: "PL-300", label: "recommended skills" }],
      after: [{ code: "DP-700", label: "pairs with — Fabric Data Engineer" }],
    },
    resources: [
      { label: "Official DP-600 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "DP-600 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/", why: "Official exam facts — format, renewal period, and prerequisites" },
      { label: "Fabric lakehouse & warehouse docs", url: "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview", why: "Core storage and modeling concepts the exam draws from" },
      { label: "Learn Microsoft Fabric with Will — DP-600 Exam Full Course", url: "https://www.youtube.com/watch?v=Bjk93hi21QM", why: "Comprehensive single-video course spanning semantic models, DAX, and governance topics on the exam" },
      { label: "Data Mozart (Nikola Ilic) — DP-600 Fabric Analytics Engineer free workshop", url: "https://www.youtube.com/watch?v=Xv4_ToKF66U", why: "A live workshop from a Fabric MVP walking through ingestion-to-modeling scenarios the exam draws on" },
      { label: "Learn With Priyanka — DP-600 practice questions with explanations", url: "https://www.youtube.com/watch?v=gFscPTp7hb4", why: "A large bank of practice questions with explanations, useful for self-testing after studying the concepts" },
    ],
  },
  "AZ-900": {
    prereq: "None — AZ-900 is designed as an entry point with no assumed technical background. Basic familiarity with computing concepts (networking, storage, applications) helps but isn't required.",
    background: [
      "General cloud computing concepts — IaaS, PaaS, SaaS",
      "Basic understanding of what a cloud provider does versus on-premises infrastructure",
      "No coding or hands-on Azure experience required",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-900",
    docsUrl: "https://learn.microsoft.com/en-us/azure/",
    glance: {
      length: "45 min (65 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, hot area — no case studies",
      learnAccess: "Not available (closed-book)",
      renewal: "Does not expire",
      prerequisite: null,
    },
    domains: [
      { title: "Describe cloud concepts", weight: "25-30%", description: "Cloud computing models, shared responsibility, and cloud economics" },
      { title: "Describe Azure architecture and services", weight: "35-40%", description: "Regions, availability zones, and core compute, storage, and networking services" },
      { title: "Describe Azure management and governance", weight: "30-35%", description: "Cost management, RBAC, resource locks, tags, policies, and monitoring" },
    ],
    certPath: {
      before: [],
      after: [
        { code: "AZ-104", label: "Administrator Associate" },
        { code: "AZ-305", label: "Solutions Architect Expert" },
        { code: "AZ-400", label: "DevOps Engineer Expert" },
      ],
    },
    resources: [
      { label: "Official AZ-900 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "AZ-900 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", why: "Official exam facts — confirms it never expires, so no renewal to track" },
      { label: "Cloud Adoption Framework", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/", why: "Ties architecture and governance concepts together with real guidance" },
      { label: "John Savill's Technical Training — AZ-900 Study Cram", url: "https://www.youtube.com/watch?v=tQp1YkB2Tgs", why: "A dense, whiteboard-driven last-minute review that hits every exam objective in one sitting" },
      { label: "freeCodeCamp / ExamPro (Andrew Brown) — AZ-900 Full Course", url: "https://www.youtube.com/watch?v=5abffC-K40c", why: "A full beginner-friendly walkthrough of cloud concepts and core Azure services" },
    ],
  },
  "DP-900": {
    prereq: "None — DP-900 is an entry-level exam. General familiarity with core data concepts (what a database is, structured vs unstructured data) is helpful but not assumed.",
    background: [
      "Core data concepts — structured, semi-structured, and unstructured data",
      "Relational vs non-relational database basics",
      "General awareness of analytics workloads (batch vs streaming)",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-900",
    docsUrl: "https://learn.microsoft.com/en-us/azure/",
    glance: {
      length: "45 min (65 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, hot area — no case studies",
      learnAccess: "Not available (closed-book)",
      renewal: "Does not expire",
      prerequisite: null,
    },
    domains: [
      { title: "Describe core data concepts", weight: "25-30%", description: "Structured, semi-structured, and unstructured data, plus common data roles" },
      { title: "Identify considerations for relational data on Azure", weight: "20-25%", description: "Azure SQL, PostgreSQL, MySQL, and SQL Managed Instance" },
      { title: "Describe considerations for non-relational data on Azure", weight: "15-20%", description: "Azure Cosmos DB, storage accounts, and data lake storage" },
      { title: "Describe an analytics workload on Azure", weight: "25-30%", description: "Modern data warehousing, ingestion, processing, and visualization" },
    ],
    certPath: {
      before: [],
      after: [
        { code: "DP-700", label: "Fabric Data Engineer Associate" },
        { code: "DP-600", label: "Fabric Analytics Engineer Associate" },
      ],
    },
    resources: [
      { label: "Official DP-900 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "DP-900 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/", why: "Official exam facts — confirms it never expires, so no renewal to track" },
      { label: "Azure Cosmos DB docs", url: "https://learn.microsoft.com/en-us/azure/cosmos-db/", why: "Canonical reference for the non-relational data domain" },
      { label: "Azure SQL docs", url: "https://learn.microsoft.com/en-us/azure/azure-sql/", why: "Canonical reference for the relational data domain" },
      { label: "ExamPro (Andrew Brown) — DP-900 Full Course to PASS the Exam", url: "https://www.youtube.com/watch?v=P3qmqUZJ7l0", why: "Covers relational vs. non-relational data and the Azure data service lineup in depth with demos" },
      { label: "John Savill's Technical Training — DP-900 Study Cram v2", url: "https://www.youtube.com/watch?v=0gtpasITVnk", why: "A compact, updated review pass that ties the data-service concepts together right before the exam" },
    ],
  },
  "AZ-104": {
    prereq: "No strict prerequisites, but the exam assumes subject matter expertise implementing, managing, and monitoring an Azure environment. You should be familiar with operating systems, networking, servers, and virtualization, plus have experience with PowerShell, Azure CLI, the Azure portal, and ARM templates or Bicep.",
    background: [
      "Managing Microsoft Entra identities, groups, and RBAC role assignments",
      "Azure Storage — accounts, redundancy, access keys, and SAS tokens",
      "Deploying VMs, containers, and App Service using ARM templates or Bicep",
      "Virtual networking — VNets, NSGs, peering, and load balancing",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104",
    docsUrl: "https://learn.microsoft.com/en-us/azure/?product=featured",
    glance: {
      length: "120 min (140 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    certPath: {
      before: [{ code: "AZ-900", label: "recommended groundwork" }],
      after: [
        { code: "AZ-305", label: "Solutions Architect Expert — requires an active AZ-104" },
        { code: "AZ-400", label: "DevOps Engineer Expert" },
      ],
    },
    resources: [
      { label: "Official AZ-104 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "AZ-104 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/", why: "Official exam facts — format, renewal period, and prerequisites" },
      { label: "Azure virtual machines docs", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/", why: "Core compute concepts behind the deploy-and-manage-compute domain" },
      { label: "Azure virtual network docs", url: "https://learn.microsoft.com/en-us/azure/virtual-network/", why: "Core networking concepts behind the virtual-networking domain" },
      { label: "John Savill's Technical Training — AZ-104 Study Cram v2", url: "https://www.youtube.com/watch?v=0Knf9nub4-k", why: "A nearly-4-hour high-density review spanning Entra ID, networking, storage, VMs, and RBAC" },
      { label: "freeCodeCamp / ExamPro (Andrew Brown) — AZ-104 Full Course", url: "https://www.youtube.com/watch?v=10PbGbTUSAg", why: "An 11-hour full-length course that builds and configures the Azure resources AZ-104 covers, giving hands-on context" },
    ],
  },
  "AI-901": {
    prereq: "You should have conceptual knowledge of AI solutions in Azure and foundational technical skills to work with them, including knowledge of Python coding syntax and familiarity with Azure resources. No formal data science or software engineering background is assumed.",
    background: [
      "Responsible AI principles — fairness, reliability, privacy, inclusiveness, transparency, accountability",
      "Core AI workload types — generative AI, computer vision, speech, and information extraction",
      "Basic familiarity with Microsoft Foundry for deploying and testing AI models",
      "Comfort reading and modifying simple Python code",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901",
    docsUrl: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
    glance: {
      length: "45 min (65 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, hot area — no case studies",
      learnAccess: "Not available (closed-book)",
      renewal: "Does not expire",
      prerequisite: null,
    },
    domains: [
      { title: "Identify AI concepts and capabilities", weight: "40-45%", description: "Responsible AI, and the shape of generative AI, vision, speech, and language workloads" },
      { title: "Implement AI solutions by using Microsoft Foundry", weight: "55-60%", description: "Deploying and testing models and agents inside Microsoft Foundry" },
    ],
    certPath: {
      before: [],
      after: [{ code: "AI-103", label: "Apps and Agents Developer Associate" }],
    },
    resources: [
      { label: "Official AI-901 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "AI-901 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/", why: "Official exam facts — confirms it never expires, so no renewal to track" },
      { label: "Azure AI services docs", url: "https://learn.microsoft.com/en-us/azure/ai-services/", why: "Umbrella docs for the Foundry services referenced throughout the exam" },
      { label: "BestITCourses — AI-901 Introduction to AI in Azure (Full Course)", url: "https://www.youtube.com/watch?v=fnNeyj9Y16E", why: "A complete beginner-to-advanced walkthrough of the whole AI-901 syllabus in one sitting" },
      { label: "John Savill's Technical Training — AI-901 Study Cram", url: "https://www.youtube.com/watch?v=a-yuXz_uV30", why: "A dense, fast-paced cram session ideal for last-minute review right before the exam" },
      { label: "Tech with Jaspal — AI-901 Weekend Exam Cram", url: "https://www.youtube.com/watch?v=zVLnZh5opG8", why: "Pairs concept review with sample practice questions and explanations to gauge readiness" },
    ],
  },
  "PL-300": {
    prereq: "No strict prerequisites, but the exam assumes you can deliver actionable insights by working with available data. You should be proficient using Power Query and Data Analysis Expressions (DAX), and comfortable working closely with business stakeholders to identify requirements.",
    background: [
      "Power Query — connecting to sources, transforming, and shaping data",
      "Star schema modeling — fact tables, dimension tables, and relationships",
      "DAX fundamentals — measures, calculated columns, and filter context",
      "Publishing, securing, and distributing reports in the Power BI Service",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300",
    docsUrl: "https://learn.microsoft.com/en-us/power-bi/",
    glance: {
      length: "100 min (120 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Prepare the data", weight: "25-30%", description: "Power Query, data profiling, and shaping data for modeling" },
      { title: "Model the data", weight: "25-30%", description: "Star schema, relationships, DAX measures, and calculation groups" },
      { title: "Visualize and analyze the data", weight: "25-30%", description: "Report design, custom visuals, and accessible, performant dashboards" },
      { title: "Manage and secure Power BI", weight: "15-20%", description: "Workspaces, deployment pipelines, row-level security, and governance" },
    ],
    certPath: {
      before: [],
      after: [
        { code: "DP-600", label: "Fabric Analytics Engineer Associate" },
        { code: "DP-700", label: "Fabric Data Engineer Associate" },
      ],
    },
    resources: [
      { label: "Official PL-300 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "PL-300 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", why: "Official exam facts — format, renewal period, and prerequisites" },
      { label: "Prepare data for analysis with Power BI", url: "https://learn.microsoft.com/en-us/training/paths/prepare-data-power-bi/", why: "Free hands-on learning path covering the largest exam domain" },
      { label: "Power BI docs", url: "https://learn.microsoft.com/en-us/power-bi/", why: "Canonical product reference for every domain" },
      { label: "The Power BI Guy — How to Pass the PL-300 Power BI Exam", url: "https://www.youtube.com/watch?v=nd1oR7w9Cxw", why: "Concise, exam-strategy-focused video aimed specifically at first-time PL-300 candidates" },
      { label: "Pragmatic Works — Conquering PL-300 [Full Course]", url: "https://www.youtube.com/watch?v=BDGzVpt1xCg", why: "An established BI training studio's full-length course covering the exam's data prep, modeling, and visualization domains" },
      { label: "Matt Mike — How to pass the PL-300 Power BI exam", url: "https://www.youtube.com/watch?v=a35rFVTsuh4", why: "A blunt, updated review of what actually shows up on the current exam" },
    ],
  },
  "DP-800": {
    prereq: "No strict prerequisites, but the exam assumes subject matter expertise designing and developing AI-enabled database solutions across Microsoft SQL Server, Azure SQL, and SQL databases in Microsoft Fabric. You should be comfortable writing T-SQL, familiar with CI/CD in GitHub, and know AI concepts such as embeddings, vectors, and models.",
    background: [
      "T-SQL fundamentals — tables, constraints, views, stored procedures, and CTEs",
      "Core database security concepts — encryption, masking, and row-level security",
      "Basic familiarity with AI concepts like embeddings, vector search, and RAG",
      "Comfort with GitHub-based CI/CD and Copilot-assisted development",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-800",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/developing-ai-enabled-database-solutions/",
    docsUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-800",
    glance: {
      length: "100–120 min (may include labs)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Design and develop database solutions", weight: "35-40%", description: "Schema design, T-SQL objects, and cross-platform SQL development" },
      { title: "Secure, optimize, and deploy database solutions", weight: "35-40%", description: "Encryption, row-level security, performance tuning, and CI/CD" },
      { title: "Implement AI capabilities in database solutions", weight: "25-30%", description: "Embeddings, vector search, and RAG patterns built on SQL data" },
    ],
    certPath: {
      before: [{ code: "DP-900", label: "optional groundwork" }],
      after: [],
    },
    resources: [
      { label: "Official DP-800 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-800", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "Microsoft Fabric docs", url: "https://learn.microsoft.com/en-us/fabric/", why: "Covers SQL databases in Fabric, one of the platforms the exam spans" },
      { label: "Azure SQL docs", url: "https://learn.microsoft.com/en-us/sql/", why: "Canonical T-SQL and cross-platform SQL reference" },
    ],
  },
  "SC-900": {
    prereq: "None — SC-900 is an entry-level exam. General familiarity with cloud and networking basics is helpful, but no hands-on security experience is assumed.",
    background: [
      "General security, compliance, and identity concepts — Zero Trust, shared responsibility, defense in depth",
      "Basic authentication and authorization concepts, including MFA and SSO",
      "Awareness of Microsoft cloud services, especially Microsoft Entra and Microsoft 365",
      "No hands-on configuration experience required",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/sc-900",
    docsUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/",
    glance: {
      length: "45 min (65 min seat time)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, hot area — no case studies",
      learnAccess: "Not available (closed-book)",
      renewal: "Does not expire",
      prerequisite: null,
    },
    domains: [
      { title: "Describe security, compliance, and identity concepts", weight: "10-15%", description: "Zero Trust, shared responsibility, and defense in depth" },
      { title: "Describe the capabilities of Microsoft Entra", weight: "25-30%", description: "Identity types, authentication, access management, and identity governance" },
      { title: "Describe the capabilities of Microsoft security solutions", weight: "35-40%", description: "Defender XDR, Sentinel, and Microsoft's security service portfolio" },
      { title: "Describe the capabilities of Microsoft compliance solutions", weight: "20-25%", description: "Purview information protection, data lifecycle, and compliance management" },
    ],
    certPath: {
      before: [],
      after: [
        { code: "SC-200", label: "Security Operations Analyst Associate" },
        { code: "SC-300", label: "Identity and Access Administrator Associate" },
      ],
    },
    resources: [
      { label: "Official SC-900 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "SC-900 certification page", url: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/", why: "Official exam facts — confirms it never expires, so no renewal to track" },
      { label: "Security, compliance, and identity concepts", url: "https://learn.microsoft.com/en-us/training/paths/describe-concepts-of-security-compliance-identity/", why: "Free official 4-part learning path covering the whole exam" },
      { label: "Microsoft Purview docs", url: "https://learn.microsoft.com/en-us/purview/", why: "Canonical reference for the compliance domain" },
      { label: "freeCodeCamp (Andrew Brown/ExamPro) — SC-900 Full Course to PASS the Exam", url: "https://www.youtube.com/watch?v=LLKza5oULAA", why: "A complete, well-structured walkthrough of every SC-900 domain — Zero Trust, shared responsibility, Entra ID, and compliance tooling" },
      { label: "John Savill's Technical Training — SC-900 Study Cram", url: "https://youtu.be/Bz-8jM3jg-8", why: "A dense, fast-paced review video, ideal as a final recap once the fundamentals are covered" },
    ],
  },
  "AI-103": {
    prereq: "No formal prerequisite, but the exam assumes real Python development experience and familiarity with Azure and Microsoft Foundry basics. AI-901 is a good optional on-ramp if you're new to AI concepts.",
    background: [
      "Python development — writing and debugging apps, using SDKs, calling REST APIs",
      "Microsoft Foundry basics — projects, model deployment types, keys vs. managed identity",
      "Generative AI concepts — prompts, tokens, embeddings, RAG, and function calling",
      "Git, environment variables, and basic CI/CD workflow",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-103",
    docsUrl: "https://learn.microsoft.com/en-us/azure/ai-services/",
    glance: {
      length: "100–120 min (may include labs)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Plan and manage an Azure AI solution", weight: "25-30%", description: "Model and service selection, deployment, cost, monitoring, and responsible AI" },
      { title: "Implement generative AI and agentic solutions", weight: "30-35%", description: "RAG, agents, tool calling, and multi-agent workflows" },
      { title: "Implement computer vision solutions", weight: "10-15%", description: "Image/video generation and multimodal understanding" },
      { title: "Implement text analysis solutions", weight: "10-15%", description: "Language-model text analysis, sentiment, translation, and speech" },
      { title: "Implement information extraction solutions", weight: "10-15%", description: "Retrieval, grounding pipelines, and document extraction" },
    ],
    certPath: {
      before: [{ code: "AI-901", label: "recommended groundwork" }],
      after: [
        { code: "AI-200", label: "Cloud Developer Associate" },
        { code: "AI-300", label: "MLOps Engineer Associate" },
        { code: "AI-500", label: "Multi-Agent AI Solutions Expert (beta)" },
      ],
    },
    resources: [
      { label: "Official AI-103 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "Develop AI agents on Azure", url: "https://learn.microsoft.com/en-us/training/paths/develop-ai-agents-on-azure/", why: "Free hands-on learning path matching the largest exam domain" },
      { label: "Azure AI services docs", url: "https://learn.microsoft.com/en-us/azure/ai-services/", why: "Canonical reference for the Foundry Tools covered throughout the exam" },
      { label: "Citizen Developer — AI-103 Full Course: Pass the Exam!", url: "https://www.youtube.com/watch?v=nUIPbpVjOc4", why: "Built specifically around the current AI-103 objectives (Copilot Studio, MCP, agentic AI), reflecting the exam's newest content" },
      { label: "John Savill's Technical Training — AI-103 Study Cram", url: "https://www.youtube.com/watch?v=WK2BvjOYTCQ", why: "A condensed cram session useful for reinforcing terminology and service boundaries after initial study" },
      { label: "Tech with Jaspal — Microsoft Foundry Explained", url: "https://www.youtube.com/watch?v=0AQ1EbiJZhQ", why: "Focuses specifically on Microsoft Foundry, the platform the exam is centered on" },
    ],
  },
  "AI-200": {
    prereq: "No formal prerequisite, but the exam assumes hands-on experience building and deploying cloud applications on Azure. AI-103 is a useful foundation since this exam builds on Foundry basics for the backend and data-management side of AI apps.",
    background: [
      "Containers — Docker images, Container Apps, and AKS basics",
      "Azure data services — Cosmos DB, PostgreSQL, and Redis",
      "REST APIs and backend integration patterns",
      "Secrets and configuration management, plus basic observability",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-200",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-200",
    docsUrl: "https://learn.microsoft.com/en-us/azure/cosmos-db/",
    glance: {
      length: "100–120 min (may include labs)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Develop containerized solutions on Azure", weight: "20-25%", description: "Container Registry, Container Apps, and AKS" },
      { title: "Develop AI solutions using Azure data management services", weight: "25-30%", description: "Cosmos DB, vector storage, and data-layer design for AI apps" },
      { title: "Connect to and consume Azure services", weight: "20-25%", description: "Backend integration, messaging, and service-to-service auth" },
      { title: "Secure, monitor, and troubleshoot Azure solutions", weight: "20-25%", description: "Secrets management, logging, and diagnosing production issues" },
    ],
    certPath: {
      before: [{ code: "AI-103", label: "recommended foundation" }],
      after: [{ code: "AI-500", label: "Multi-Agent AI Solutions Expert (beta)" }],
    },
    resources: [
      { label: "Official AI-200 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-200", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "Implement containerized solutions", url: "https://learn.microsoft.com/en-us/training/paths/az-204-implement-iaas-solutions/", why: "Covers Container Registry, Container Apps, and AKS — the largest exam domain" },
      { label: "Azure Cosmos DB docs", url: "https://learn.microsoft.com/en-us/azure/cosmos-db/", why: "Canonical reference for the data-management domain" },
      { label: "Tech with Jaspal — Weekend Exam Cram: AI-200", url: "https://www.youtube.com/watch?v=7IEDtZlpw9I", why: "One of the few AI-200-specific videos so far, combining concept review with practice questions" },
    ],
  },
  "AI-300": {
    prereq: "No formal prerequisite, but the exam assumes experience operating machine learning and generative AI systems in production. AI-901 or AI-103 are useful optional groundwork if you're newer to Azure AI.",
    background: [
      "ML lifecycle concepts — training, versioning, deployment, and monitoring",
      "GenAIOps concepts — evaluation, observability, and safety for LLM-based systems",
      "Azure Machine Learning basics — workspaces, endpoints, and pipelines",
      "Comfort reading Python and interpreting evaluation metrics",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-300",
    docsUrl: "https://learn.microsoft.com/en-us/azure/machine-learning/",
    glance: {
      length: "100–120 min (may include labs)",
      questionCount: "40–60",
      passingScore: "700 / 1000",
      formats: "Multiple choice, drag-and-drop, case studies, possibly labs",
      learnAccess: "Available (split-screen)",
      renewal: "Every 12 months, free online assessment",
      prerequisite: null,
    },
    domains: [
      { title: "Design and implement an MLOps infrastructure", weight: "15-20%", description: "Workspaces, compute, and CI/CD for ML projects" },
      { title: "Implement machine learning model lifecycle and operations", weight: "25-30%", description: "Training, versioning, deployment, and monitoring models in production" },
      { title: "Design and implement a GenAIOps infrastructure", weight: "20-25%", description: "Infrastructure for deploying and operating LLM-based systems" },
      { title: "Implement generative AI quality assurance and observability", weight: "10-15%", description: "Evaluation for groundedness, relevance, and safety, plus tracing" },
      { title: "Optimize generative AI systems and model performance", weight: "10-15%", description: "Cost, latency, and quality trade-offs for deployed models" },
    ],
    certPath: {
      before: [{ code: "AI-901", label: "optional groundwork" }],
      after: [{ code: "AI-500", label: "Multi-Agent AI Solutions Expert (beta)" }],
    },
    resources: [
      { label: "Official AI-300 study guide", url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300", why: "The authoritative skills-measured breakdown, updated whenever the exam changes" },
      { label: "Operationalize generative AI applications", url: "https://learn.microsoft.com/en-us/training/paths/operationalize-gen-ai-apps/", why: "Matches the GenAIOps and quality-assurance domains directly" },
      { label: "Azure Machine Learning docs", url: "https://learn.microsoft.com/en-us/azure/machine-learning/", why: "Canonical reference for the model-lifecycle domain, the largest single weight" },
    ],
  },
};

// Exam codes with a downloadable PDF cheatsheet in /public, keyed to the filename.
const PDF_GUIDE_FILES = {
  "DP-700": "DP_700_Guide.pdf",
  "AI-200": "AI_200_Guide.pdf",
  "AI-300": "AI_300_Guide.pdf",
  "DP-800": "DP_800_Guide.pdf",
};

// Example activities for the "Get hands-on practice" step, tailored to the
// broad product category (see EXAM_CATEGORIES) so the suggestion doesn't read
// as a non-sequitur on exams outside data engineering.
const HANDS_ON_EXAMPLES = {
  Fabric: "ingestion, transformations, security settings",
  Azure: "resource provisioning, networking, access controls",
  "Power BI": "data modeling, DAX measures, report settings",
  AI: "model deployment, prompt evaluation, monitoring configs",
  Security: "policy configuration, access reviews, compliance settings",
};
const DEFAULT_HANDS_ON_EXAMPLE = "core configuration, security settings, monitoring";

function buildSteps(code, meta, guide) {
  const handsOnExample = HANDS_ON_EXAMPLES[EXAM_CATEGORIES[code]] || DEFAULT_HANDS_ON_EXAMPLE;
  return [
    {
      title: "Review the official study guide",
      body: "Open Microsoft's official skills-measured breakdown and use it as your checklist — it's updated whenever the exam changes.",
      link: { url: guide.officialGuideUrl, label: `Official ${code} study guide` },
    },
    {
      title: "Schedule your exam",
      body: "Pick a date through the official Microsoft certification page and plan your study time backwards from it. Give yourself 2–4 weeks if you already use the tech weekly, 4–8 weeks if you're newer to it.",
      link: { url: guide.examPageUrl, label: "Exam & scheduling page" },
    },
    {
      title: "Go through the official learning path",
      body: "Complete Microsoft's free, self-paced modules for this exam. Take notes on anything you can't explain simply — that's what to revisit.",
      link: { url: guide.docsUrl, label: "Official documentation" },
    },
    {
      title: "Get hands-on practice",
      body: `${code} rewards recognizing real scenarios and trade-offs, not memorization. Spin up a free-tier environment and actually try the concepts — ${handsOnExample} — rather than just reading about them.`,
    },
    {
      title: "Benchmark your knowledge",
      body: `Use FabricPrep's ${code} practice questions to find weak spots, and sit the timed Shield exam to build comfort with exam-day pacing.`,
      internalLink: `/${meta.slug}`,
    },
    {
      title: "Take the exam",
      body: "The day before: review only your weak topics, don't cram new material. On exam day: read each question carefully, eliminate wrong answers first, and watch for wording that implies a constraint (least privilege, cost, performance).",
    },
  ];
}

// A cert-path chip. Links to our own study guide when we cover that exam;
// otherwise renders as plain text since there's nowhere to send the reader.
function CertPathBadge({ entry, TOKENS }) {
  const targetMeta = EXAM_META[entry.code];
  const className = "px-3 py-1.5 rounded-full text-xs";
  const style = { background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink };
  const content = (
    <>
      <span style={{ fontFamily: FONT_MONO }}>{entry.code}</span>
      {entry.label && <span style={{ color: TOKENS.inkMuted }}> · {entry.label}</span>}
    </>
  );
  return targetMeta ? (
    <Link to={`/study-guides/${targetMeta.slug}`} className={className} style={style}>
      {content}
    </Link>
  ) : (
    <span className={className} style={style}>
      {content}
    </span>
  );
}

export function StudyGuideDetail() {
  const { examSlug } = useParams();
  const TOKENS = useTheme();

  const code = SLUG_TO_EXAM[examSlug];
  if (!code) return <Navigate to="/study-guides" replace />;

  const meta = EXAM_META[code];
  const guide = GUIDES[code];
  const total = QUESTION_BANK[code].questions.length;
  const topics = getStudyTopics(code);
  const steps = buildSteps(code, meta, guide);

  const quickLinks = [];
  if (PDF_GUIDE_FILES[code]) {
    quickLinks.push({
      href: `/${PDF_GUIDE_FILES[code]}`,
      icon: FileText,
      label: "Download PDF cheatsheet",
      desc: `Complete ${code} study guide in PDF format`,
    });
  }
  if (code === "DP-700" || code === "DP-600") {
    quickLinks.push({
      to: "/study-guides/shared",
      icon: BookOpen,
      label: "In-depth Fabric learning path",
      desc: "Dataflows Gen2, pipelines, and Copy Data before Spark, Delta, Eventhouse, and KQL",
    });
  }

  const pageTitle = `${code}: ${meta.label} Study Guide | FabricPrep`;
  const pageUrl = `https://fabricprep.com/study-guides/${examSlug}`;
  const pageDescription = `A step-by-step study path for the ${code} (${meta.label}) exam — prerequisites, official resources, and a study plan, plus free practice questions.`;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <meta name="description" content={pageDescription} />
        {/* og:image and og:site_name come from index.html — identical on every route. */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${meta.label} Study Guide`,
            about: meta.title,
            author: { "@type": "Person", name: "Jitendra Singh Malik" },
            publisher: { "@type": "Organization", name: "FabricPrep" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Study Guides", path: "study-guides" },
              { name: `${code}: ${meta.label} Study Guide` },
            ])
          )}
        </script>
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-2xl mx-auto w-full">
        <Link to="/study-guides" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ChevronLeft size={14} /> All study guides
        </Link>

        <div
          className="text-xs uppercase mb-3 px-3 py-1 rounded-full inline-block"
          style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
        >
          {code}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          {meta.label} Study Guide
        </h1>
        <p className="mt-2 text-sm" style={{ color: TOKENS.inkMuted }}>
          A study path for {meta.title} — what to know before you start, and the order worth doing things in.
        </p>

        {/* Exam at a Glance: a quick facts table, present once real numbers are added to GUIDES[code].glance */}
        {guide.glance && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Exam at a glance
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
              {[
                ["Length", guide.glance.length],
                ["Questions", guide.glance.questionCount],
                ["Passing score", guide.glance.passingScore],
                ["Formats", guide.glance.formats],
                ["Microsoft Learn access", guide.glance.learnAccess],
                ["Renewal", guide.glance.renewal],
                ["Prerequisite", guide.glance.prerequisite || "None"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 px-4 py-2.5 text-xs"
                  style={{ background: TOKENS.panel, borderTop: i > 0 ? `1px solid ${TOKENS.panelBorder}` : "none" }}
                >
                  <span style={{ color: TOKENS.inkMuted }}>{label}</span>
                  <span className="text-right" style={{ color: TOKENS.ink }}>{value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Domain breakdown: links to deep-dive topic pages where they exist (topics),
            otherwise plain weighted cards from GUIDES[code].domains as a placeholder
            until deep-dive pages are written for that exam. */}
        {(topics || guide.domains) && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {code}: exam domains
            </h2>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              {topics
                ? "Dive deep into each exam objective with comprehensive study materials."
                : "Key areas covered in the exam, weighted by how much of the exam they make up."}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(topics || guide.domains).map((t) => {
                const TopicIcon = t.icon || BookOpen;
                const card = (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                      <TopicIcon size={20} color={TOKENS.azure} />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>{t.weight}</div>
                      <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>{t.title}</div>
                      <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{t.description}</div>
                    </div>
                  </div>
                );
                return topics ? (
                  <Link
                    key={t.id}
                    to={`/study-guides/${meta.slug}/${t.id}`}
                    className="rounded-xl p-4 transition-colors hover:opacity-90"
                    style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={t.title} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                    {card}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Certification path: where this exam sits relative to others, once GUIDES[code].certPath is set */}
        {guide.certPath && (guide.certPath.before?.length > 0 || guide.certPath.after?.length > 0) && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Where this exam fits
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {guide.certPath.before?.map((c) => (
                <CertPathBadge key={c.code} entry={c} TOKENS={TOKENS} />
              ))}
              {guide.certPath.before?.length > 0 && <ChevronRight size={14} style={{ color: TOKENS.inkMuted }} />}
              <span
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep, fontFamily: FONT_MONO }}
              >
                {code}
              </span>
              {guide.certPath.after?.length > 0 && <ChevronRight size={14} style={{ color: TOKENS.inkMuted }} />}
              {guide.certPath.after?.map((c) => (
                <CertPathBadge key={c.code} entry={c} TOKENS={TOKENS} />
              ))}
            </div>
          </>
        )}

        {quickLinks.length > 0 && (
          <div className="rounded-xl mt-6 overflow-hidden" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
            {quickLinks.map((q, i) => {
              const Icon = q.icon;
              const row = (
                <>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}15` }}>
                    <Icon size={16} color={TOKENS.azure} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>{q.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: TOKENS.inkMuted }}>{q.desc}</div>
                  </div>
                  <ChevronRight size={14} className="flex-shrink-0" style={{ color: TOKENS.inkMuted }} />
                </>
              );
              const className = "flex items-center gap-3 p-4 transition-colors hover:opacity-80";
              const style = { background: TOKENS.panel, borderTop: i > 0 ? `1px solid ${TOKENS.panelBorder}` : "none" };
              return q.to ? (
                <Link key={q.label} to={q.to} className={className} style={style}>{row}</Link>
              ) : (
                <a key={q.label} href={q.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{row}</a>
              );
            })}
          </div>
        )}

        <h2 className="text-sm font-semibold mt-10 mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Prerequisites
        </h2>
        <p className="text-sm" style={{ color: TOKENS.inkMuted }}>{guide.prereq}</p>

        <h2 className="text-sm font-semibold mt-6 mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Recommended background
        </h2>
        <ul className="flex flex-col gap-1.5">
          {guide.background.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.inkMuted }}>
              <CheckCircle2 size={15} color={TOKENS.azure} className="flex-shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Step-by-step study plan
        </h2>
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex gap-3 pb-6 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute left-[9px] top-5 bottom-0 w-px" style={{ background: TOKENS.panelBorder }} />
              )}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep, fontFamily: FONT_MONO }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium mb-1" style={{ color: TOKENS.ink }}>{s.title}</div>
                <p className="text-xs" style={{ color: TOKENS.inkMuted }}>{s.body}</p>
                {s.link && (
                  <a
                    href={s.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs"
                    style={{ color: TOKENS.azure }}
                  >
                    {s.link.label} <ExternalLink size={11} />
                  </a>
                )}
                {s.internalLink && (
                  <Link to={s.internalLink} className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: TOKENS.azure }}>
                    Practice {code} now — {total} free questions <ChevronLeft size={11} style={{ transform: "rotate(180deg)" }} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {guide.resources?.length > 0 && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Additional resources
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
              {guide.resources.map((r, i) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 transition-colors hover:opacity-80"
                  style={{ background: TOKENS.panel, borderTop: i > 0 ? `1px solid ${TOKENS.panelBorder}` : "none" }}
                >
                  <ExternalLink size={14} className="flex-shrink-0 mt-0.5" style={{ color: TOKENS.azure }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>{r.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: TOKENS.inkMuted }}>{r.why}</div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        <div className="rounded-xl p-5 mt-8 text-center" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-sm font-medium mb-1" style={{ color: TOKENS.ink }}>Ready to test yourself?</div>
          <p className="text-xs mb-3" style={{ color: TOKENS.inkMuted }}>
            {total} realistic {code} practice questions with instant feedback and detailed explanations.
          </p>
          <Link
            to={`/${meta.slug}`}
            className="inline-block px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep, textDecoration: "none" }}
          >
            Practice {code} now
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
