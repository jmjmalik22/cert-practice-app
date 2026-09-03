import { Head as Helmet } from "vite-react-ssg";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, BookOpen, Database, Shield, Activity, Layers, Code2, Droplets, Warehouse, Zap, GitBranch, ListChecks } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { EXAM_META } from "../../lib/examCatalog.js";
import { buildBreadcrumbSchema } from "../../lib/examCatalog.js";
import { Footer } from "../../components/Shared.jsx";

// DP-700 Exam Topics based on Skills Measured
export const DP700_TOPICS = [
  {
    id: "ingestion",
    title: "Ingest and Transform Data",
      description: "Design batch and streaming loads, choose the right ingestion tool, and transform data with Dataflows Gen2, pipelines, Spark, SQL, and KQL.",
    icon: Database,
      weight: "30-35%",
    sections: [
      {
    title: "Dataflows Gen2: visual ingestion and transformation",
    content: `Dataflows Gen2 is a low-code ETL tool built on Power Query Online. Its workflow is **Connect → Transform → Land**. Use it when transformation is the main requirement and the team benefits from a visual, reusable process.

  **Core capabilities**
  - Connect to supported cloud, database, file, and Fabric sources.
  - Transform data with the Power Query interface or the Advanced Editor using M.
  - Land results in a Lakehouse, Warehouse, or SQL database.
  - Use Duplicate or Reference queries when several outputs share one source.
  - Preserve query folding where possible so supported transformations execute at the source.

  **Important boundary**
  Dataflows Gen2 prepares and moves data; it is not a replacement for long-term warehouse storage or row-level security. A Fabric capacity workspace is required.`,
      },
      {
    title: "Pipelines, activities, and Copy Data",
    content: `A pipeline orchestrates a sequence of activities. It is the manager around workers such as Dataflows Gen2, notebooks, scripts, and Copy Data.

  **Common activities**
  - Copy Data: move data from a source to a destination, usually with minimal transformation.
  - Dataflow Gen2: run visual Power Query transformations.
  - Notebook or stored procedure: run code-heavy Spark or SQL logic.
  - Get Metadata: inspect files or folders before processing them.
  - Control flow: use dependencies, If Condition, For Each, parameters, variables, schedules, and event-based triggers.

  **Choose the tool deliberately**
  - Choose Copy Data when data should move as-is or transformation happens later.
  - Choose Dataflow Gen2 when visual cleaning, filtering, joins, or reusable Power Query logic is needed.
  - Choose a pipeline when scheduling, sequencing, retries, parameters, or monitoring are central.

  Every pipeline run has a run ID and status that can be used for monitoring and troubleshooting.`,
      },
      {
    title: "Batch and streaming loading patterns",
    content: `Use a full load when rebuilding the target is simple and acceptable. Use an incremental load when only new or changed records should be processed; this requires reliable change detection.

  **Prepare data for analytics**
  - Land source-shaped data in a staging or Bronze area.
  - Clean, deduplicate, validate, and conform data in Silver.
  - Aggregate or model business-ready data in Gold.
  - Handle missing, duplicate, and late-arriving records explicitly.

  **Streaming choices**
  - Use Eventstreams to transform and route events while they are in motion.
  - Use Spark Structured Streaming for code-based streaming transformations.
  - Use KQL when the workload is optimized for real-time event analysis and time windows.
  - Choose native real-time tables or OneLake shortcuts according to whether the data should be copied or accessed in place.`,
      },
    ],
  },
  {
    id: "fabric-foundations",
    title: "Fabric Foundations and OneLake",
    description: "Understand the unified Fabric platform, OneLake storage, and how the core workloads fit together",
    icon: Layers,
    weight: "10-15%",
    sections: [
      {
        title: "Microsoft Fabric at a Glance",
        content: `Microsoft Fabric is an all-in-one analytics platform that brings data ingestion, engineering, warehousing, real-time analytics, data science and Power BI into one SaaS environment. Its shared storage foundation is OneLake.

**Core Fabric Workloads**
- Data Factory: ingest, transform and orchestrate data
- Data Engineering: build lakehouses and Spark-based transformation workflows
- Data Warehouse: create relational analytical stores with transactional T-SQL
- Real-Time Intelligence: ingest, store, query and act on streaming events
- Data Science: explore data and build machine-learning solutions
- Power BI: model, visualise and deliver business insights

**Roles Across Data Teams**
- Data engineer: ingests and transforms data using pipelines, notebooks and lakehouses
- Data scientist: uses notebooks, Spark and Python for exploration and machine learning
- Data analyst: builds semantic models and reports, often using Direct Lake
- Analytics engineer: curates reliable business-ready data and reusable semantic definitions`,
      },
      {
        title: "OneLake: One Logical Data Lake",
        content: `OneLake is the unified storage layer for Fabric. Data is stored in open formats such as Delta-Parquet so multiple engines, including Spark, SQL and Power BI, can work with the same data without unnecessary duplication.

**Key OneLake Concepts**
- Shortcuts reference data in locations such as Amazon S3 or Azure Data Lake without copying it
- Workspaces organise items for collaboration, access control and lifecycle management
- The OneLake catalog supports discovery, metadata and governance across the data estate

**Memory Tip**
- Think of OneLake as the shared foundation, while Fabric workloads are different engines and experiences operating on that foundation`,
      },
      {
        title: "Workspaces and Platform Enablement",
        content: `Fabric must be enabled by an administrator. Workspaces then act as collaboration containers and can provide lineage, Git integration and managed compute. Access can be granted broadly through workspace roles or narrowly through item permissions.

**Common Confusion**
- A workspace is an organisational and security boundary
- OneLake is the storage foundation
- A lakehouse, warehouse, eventhouse or semantic model is an item inside a workspace`,
      },
    ],
  },
  {
    id: "spark-notebooks",
    title: "Apache Spark and Notebooks",
    description: "Use Spark pools, DataFrames, Spark SQL, notebooks, and Delta tables to process data at scale in a Fabric Lakehouse.",
    icon: Code2,
    weight: "30-35%",
    sections: [
      {
        title: "Spark pools, runtimes, and environments",
        content: `Apache Spark is an open-source parallel-processing framework for large-scale analytics. Fabric provides an integrated environment for Spark-based ingestion, transformation and analysis within a lakehouse.

**Core Spark Components**
- Head node / driver: coordinates the application and distributed processing
- Worker nodes / executors: perform the actual processing tasks
- Spark pool: the compute cluster used to execute workloads
- Runtime: defines Spark, Delta Lake and Python versions
- Environment: stores libraries and custom configuration for consistent execution

Fabric also provides starter pools and configurable pools with autoscale and dynamic allocation. Native Execution Engine can accelerate Parquet and Delta processing, while high-concurrency mode can share a Spark session across notebooks when appropriate.`,
      },
      {
        title: "Working with DataFrames",
        content: `A DataFrame is Spark's primary structured-data abstraction. It supports chained transformations and can load from files or tables.

**Spark Operations and Their SQL Equivalents**
- select() maps to a SQL SELECT column list
- where() maps to a SQL WHERE condition
- groupBy().count() maps to GROUP BY with aggregation
- write.mode("overwrite") replaces the existing target data
- partitionBy() physically organises files by a selected column

**Schema Choice**
- Schema inference is convenient, but an explicit schema is more reliable and can be more efficient for repeatable production workloads.

**Saving and partitioning**
- Parquet is a compressed columnar format suited to analytical workloads.
- write.mode("overwrite") replaces the target contents; append adds new output.
- partitionBy() organizes files by a selected column and can reduce disk I/O for selective queries.
- Avoid excessive partitions and choose columns with sensible cardinality and common filtering patterns.`,
      },
      {
        title: "Spark SQL, the catalog, and visualization",
        content: `Spark SQL allows relational querying inside notebooks. A temporary view is session-based, while a table saved to the catalog is persistent.

**SQL Server Concepts vs Spark SQL**
- A local temporary table maps to a temporary view created with createOrReplaceTempView
- A permanent table maps to a managed table, commonly stored in Delta format
- An external table maps to metadata in the catalog with files stored elsewhere
- An SSMS query tab maps to a notebook cell using the %%sql magic command

**Saving and Partitioning Data**
- Parquet is a compressed columnar format suited to analytical workloads
- Delta tables add transactions, schema controls and version history on top of Parquet files
- Partitioning can improve selective queries but should be reserved for large tables and sensible low-cardinality filter columns

**Notebook visualization**
- Fabric can display query results as a table or a built-in chart without additional code.
- Use matplotlib or seaborn for customized Python visualizations.
- Convert a manageable Spark result to Pandas with toPandas() only when the result fits in driver memory.`,
      },
    ],
  },
  {
    id: "lakehouse-delta",
    title: "Lakehouse, Delta Lake and Medallion Architecture",
    description: "Combine flexible data lake storage with reliable Delta tables, structured through Bronze, Silver and Gold layers",
    icon: Droplets,
    weight: "20-25%",
    sections: [
      {
        title: "Lakehouse Fundamentals",
        content: `A lakehouse combines the flexible storage of a data lake with structured querying and relational features associated with a data warehouse. In Fabric, it supports both Spark and a SQL analytics endpoint.

**Lakehouse Areas**
- Files: raw or semi-structured files such as CSV, JSON, images and Parquet
- Tables: Delta tables with metadata, ACID transactions and schema support
- SQL analytics endpoint: read-only T-SQL access to lakehouse Delta tables
- Spark notebooks: engineering, advanced transformation and machine-learning workloads
- Semantic model: relationships, measures and business-ready reporting definitions

**Common Confusion**
- The SQL analytics endpoint is read-only for lakehouse tables
- A Fabric Warehouse supports read-and-write transactional T-SQL`,
      },
      {
        title: "Delta Lake Structure and Optimisation",
        content: `A Delta table is a schema abstraction over Parquet data files plus a transaction log. The _delta_log folder records changes and enables reliable table operations.

**Why Delta Matters**
- ACID transactions protect consistency during concurrent operations
- Schema enforcement prevents incompatible structures from being written
- CRUD operations support insert, update and delete semantics
- Time travel allows access to previous table versions
- Batch and streaming workloads can use the same table
- Open storage keeps Parquet-based data accessible to multiple engines

**Optimising Delta Tables**
- Optimize Write reduces small files during writes and is generally enabled by default
- OPTIMIZE compacts existing small files after large loads or fragmentation
- V-Order improves read efficiency for frequently queried reporting tables
- VACUUM removes obsolete unreferenced files, but can prevent time travel to older versions
- Partitioning enables data skipping for very large tables with logical filter columns`,
      },
      {
        title: "Medallion Architecture",
        content: `The medallion pattern organises data into progressive layers of quality.

**Bronze, Silver, Gold**
- Bronze: raw source-aligned landing data with minimal modification
- Silver: validated, cleaned, deduplicated and integrated data
- Gold: business-ready, enriched or aggregated data for reporting and analytics

**Choosing the Right Tool per Layer**
- Use Dataflows Gen2 for simpler low-code transformations
- Use notebooks for large-scale or complex transformations
- Use pipelines to orchestrate movement between layers

**Design Principle**
- The medallion pattern does not replace dimensional modelling; the Gold layer can still contain fact and dimension structures`,
      },
    ],
  },
  {
    id: "warehouse",
    title: "Fabric Data Warehouse",
    description: "Design, load and query a relational analytical store using transactional T-SQL and dimensional modelling",
    icon: Warehouse,
    weight: "15-20%",
    sections: [
      {
        title: "Warehouse Fundamentals",
        content: `A Fabric Data Warehouse is a fully managed relational analytical store built on OneLake. It supports transactional T-SQL, ACID behaviour and open Delta storage.

**Warehouse vs SQL Analytics Endpoint**
- The Warehouse offers full read-and-write T-SQL including INSERT, UPDATE, DELETE and MERGE, over native warehouse tables
- The SQL analytics endpoint offers a read-only T-SQL experience over lakehouse tables surfaced through SQL

**Connecting External Tools**
- Copy the warehouse SQL connection string from Fabric
- Use Microsoft Entra ID authentication; traditional SQL authentication is not supported
- Specify the warehouse database name when required by the client tool
- Standard ODBC and OLE DB tools can connect when network access permits TCP port 1433`,
      },
      {
        title: "Dimensional Modelling and Slowly Changing Dimensions",
        content: `**Core Dimensional Modelling Objects**
- Fact table: stores quantitative measurements such as sales amount or quantity
- Dimension table: provides descriptive context such as customer, product, store or date
- Surrogate key: warehouse-generated identifier with no business meaning
- Business / alternate key: source-system identifier retained for traceability and lookups
- Star schema: fact table connected directly to denormalised dimensions
- Snowflake schema: dimensions further normalised into related tables

**Slowly Changing Dimension Types**
- Type 0: attributes do not change
- Type 1: overwrite the existing value; history is not retained
- Type 2: insert a new row for each change; full history is retained
- Type 3: store limited history in additional columns

Fact tables are generally loaded after dimensions because incoming business keys must be mapped to the correct dimension surrogate keys.`,
      },
      {
        title: "Loading Strategies and Analytical Functions",
        content: `**Loading Strategies**
- Full load: truncate and reload the complete target; simpler, but more resource intensive
- Incremental load: process only new or changed records; more efficient, but requires change-detection logic
- Staging: land source-shaped data in auxiliary tables before applying business rules
- COPY statement: bulk load supported external files into warehouse tables
- CTAS: create a new table from a SELECT result
- INSERT...SELECT: append query results into an existing target table

**Useful Analytical Functions**
- ROW_NUMBER() returns a unique sequential row number within a partition
- RANK() gives equal values the same rank; subsequent ranks contain gaps
- DENSE_RANK() gives equal values the same rank with no gaps
- NTILE(n) divides rows into ranked groups
- APPROX_COUNT_DISTINCT returns a fast estimate for large distinct-count workloads

**Common Confusion**
- Data ingestion moves raw data into the analytical platform
- Data loading places prepared data into final warehouse structures such as dimensions and facts`,
      },
    ],
  },
  {
    id: "real-time-intelligence",
      title: "Streaming Data and Real-Time Intelligence",
      description: "Ingest, store, query, visualize, and act on continuous data using Eventstreams, Eventhouse, KQL, dashboards, and Activator.",
    icon: Zap,
      weight: "30-35%",
    sections: [
      {
    title: "Eventhouse and KQL databases",
    content: `An Eventhouse is a specialized container for KQL databases that handle large volumes of continuous, append-oriented and time-series data. Data is commonly indexed by ingestion time and is usually queried rather than updated in place.

  **Eventhouse capabilities**
  - Ingest from files, cloud storage, OneLake, Kafka, Azure Event Hubs, and other streaming sources.
  - Use database shortcuts to query supported external data without copying it.
  - Make data available to other Fabric experiences through OneLake integration.
  - Query with Kusto Query Language (KQL) or supported T-SQL experiences.

  **KQL pipeline model**
  KQL uses the pipe character (|) to pass data through operators such as where, project, summarize, join, and limit. The KQL queryset is used to author, save, visualize, and share queries.`,
        },
        {
    title: "Write efficient KQL",
    content: `KQL performance depends heavily on reducing the amount of data scanned and processed.

  - Filter early, especially with a time-based where clause, so indexes can eliminate irrelevant records.
  - Use project to return only the columns needed by the next step.
  - Put the smaller input on the left side of a join when that improves the join's memory use.
  - Use limit while exploring large result sets, especially after an aggregation.
  - Use materialized views for recurring aggregations over large, continuously changing tables.
  - Use stored functions to encapsulate reusable and parameterized KQL logic.`,
      },
      {
    title: "Eventstreams, dashboards, and Activator",
    content: `Eventstreams capture events from sources, optionally transform them, and route them to destinations.

  **Eventstream flow**
  - Sources can include Azure Event Hubs, IoT Hub, Kafka, MQTT, Service Bus, and Fabric events.
  - Transformations can filter, manage fields, aggregate, group by a time window, union, join, or expand data.
  - Destinations can include Eventhouse, Lakehouse, Activator, a derived stream, or a custom endpoint.

  **Real-Time Dashboards**
- Tiles execute KQL queries and refresh automatically
- Base queries allow several tiles to reuse the same core query logic
- Parameters make dashboards interactive for viewers
- Multiple pages organise complex operational monitoring scenarios

**Activator**
Activator detects conditions in changing data and performs actions, following a Connect, Monitor, Act model.
- Object: a real-world entity such as a device, package or customer
- Property: a tracked attribute such as temperature or location
- Event: an incoming record that updates the object state
- Rule: the condition, threshold or pattern that triggers action
- Action: email, Teams, Power Automate, notebook or pipeline execution

**Rule Design**
- Use summarisation windows and duration conditions to avoid triggering on short-lived noise
- Property filters can narrow a rule to selected objects, priorities or locations`,
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitor and Maintain Data",
    description: "Monitor pipeline runs, optimize performance, and maintain data quality",
    icon: Activity,
    weight: "30-35%",
    sections: [
      {
        title: "Pipeline Monitoring",
        content: `Monitor and troubleshoot data pipelines:

**Pipeline Monitoring Hub**
- View all pipeline runs across workspaces
- Filter by status, date range, and pipeline name
- Drill into run details and error messages

**Logging and Diagnostics**
- Enable diagnostic settings for detailed logs
- Send logs to Log Analytics or Event Hub
- Query logs using KQL

**Alerts and Notifications**
- Set up alerts for pipeline failures
- Configure email/Teams notifications
- Use Fabric Activator for business rule-based alerts`,
      },
      {
        title: "Performance Optimization",
        content: `Optimize query and pipeline performance:

**Spark Optimization**
- Configure cluster sizes based on workload
- Use adaptive query execution
- Cache frequently accessed DataFrames
- Optimize partition sizes (128MB-1GB recommended)

**SQL Endpoint Optimization**
- Create appropriate indexes
- Use statistics for query optimization
- Partition large tables
- Materialized views for repeated queries

**Lakehouse Optimization**
- OPTIMIZE tables regularly
- VACUUM old snapshots
- Use Z-ORDER for frequently filtered columns
- Monitor table sizes and file counts`,
      },
      {
        title: "Data Quality",
        content: `Implement data quality checks:

**Great Expectations Integration**
- Define expectations for data validation
- Run validation checks in notebooks
- Generate data quality reports

**Data Profiling**
- Use built-in data profiling in Lakehouse explorer
- Identify nulls, uniqueness, and distributions

**Lineage Tracking**
- View end-to-end data lineage
- Impact analysis for changes
- Column-level lineage in notebooks`,
      },
    ],
  },
  {
    id: "cicd-lifecycle",
    title: "CI/CD and Lifecycle Management",
    description: "Version, test and promote Fabric solutions safely using Git integration, deployment pipelines and the Fabric REST APIs",
    icon: GitBranch,
    weight: "10-15%",
    sections: [
      {
        title: "CI/CD Concepts and Lifecycle Pillars",
        content: `**Core CI/CD Concepts**
- Continuous integration: developers frequently commit and merge changes so issues are identified early
- Continuous delivery: validated changes are automatically prepared or deployed to a staging environment before production release
- Continuous deployment: changes that pass testing are automatically released to production

**Three Lifecycle Pillars in Fabric**
- Git integration: version history, branching, collaboration and rollback
- Deployment pipelines: promote content through Development, Test and Production stages
- Fabric REST APIs: automate Git synchronisation, status checks and deployments`,
      },
      {
        title: "Git Integration Workflow",
        content: `**Typical Git Workflow in Fabric**
- Connect a development workspace to a GitHub or Azure DevOps repository and branch
- Develop in an isolated branch or workspace instead of overwriting shared work
- Commit workspace changes to the feature branch
- Open a pull request and merge approved changes into the main branch
- Synchronise the shared development workspace with the updated branch

**Common Confusion**
- Git integration synchronises a workspace with source control
- A deployment pipeline promotes Fabric items between environment workspaces
- These are complementary but different processes`,
      },
      {
        title: "Deployment Pipelines and Automation",
        content: `Deployment pipelines assign workspaces to lifecycle stages such as Development, Test and Production. Deploying from one stage to another clones or updates supported items in the target environment.

**Recommended Pattern**
- A common clean pattern is to connect only the Development workspace to Git
- Use Git for version control and pull-request review
- Use deployment pipelines to promote validated content to Test and Production

**Automation with Fabric APIs**
- Git integration APIs: commit changes, pull updates and check synchronisation status
- Deployment pipeline APIs: list stage items and deploy stage content programmatically

**Lifecycle Principle**
- Separate development, testing and production, and use repeatable automation to reduce manual error and keep releases auditable`,
      },
    ],
  },
  {
    id: "security",
    title: "Secure Data",
    description: "Implement security controls, access management, and compliance",
    icon: Shield,
    weight: "25-30%",
    sections: [
      {
        title: "Access Control",
        content: `Manage access to data and resources:

**Workspace Permissions**
- Admin, Member, Contributor, Viewer roles
- Item-level permissions (Read, Reshare, Build)
- Share individual items without workspace access

**Lakehouse Security**
- SQL endpoint security with T-SQL GRANT statements
- Row-level security (RLS) for fine-grained access
- Column-level security for sensitive data

**OneLake Security**
- Inherits workspace permissions
- Support for ACLs at folder/file level
- Integration with Microsoft Entra ID`,
      },
      {
        title: "Data Protection",
        content: `Protect sensitive data:

**Microsoft Purview Integration**
- Sensitivity labels for classification
- Label inheritance across Fabric items
- Protection policies for export control

**Encryption**
- Data encrypted at rest by default
- Customer-managed keys (CMK) support
- Encryption in transit (TLS 1.2+)

**Private Connectivity**
- Managed private endpoints
- VNet integration for secure access
- Private Link for secure connectivity`,
      },
      {
        title: "Compliance and Auditing",
        content: `Meet compliance requirements:

**Audit Logging**
- Track user activities across Fabric
- Export audit logs for analysis
- Retention policies for audit data

**Data Residency**
- Choose region for data storage
- Understand data movement boundaries

**Certifications**
- SOC 2, ISO 27001, HIPAA BAA, GDPR compliance
- Review compliance documentation for requirements`,
      },
    ],
  },
  {
    id: "scenario-guide",
    title: "Final Revision: Scenario and Component Guide",
    description: "Quick-recall tables for choosing the right Fabric component and revising commonly confused concepts before exam day",
    icon: ListChecks,
    weight: "Exam-wide",
    sections: [
      {
        title: "Which Fabric Component Should You Choose?",
        content: `Match each scenario to its best starting choice.

**Component Selection**
- Move large volumes of data with minimal transformation: Copy Data activity
- Apply low-code Power Query transformations: Dataflow Gen2
- Coordinate multiple activities with dependencies and schedules: Data pipeline
- Perform complex large-scale transformations: Spark notebook
- Store raw and curated Delta tables: Lakehouse
- Build a relational star schema with full T-SQL DML: Fabric Data Warehouse
- Ingest and route streaming events: Eventstream
- Store and query high-velocity time-series data: Eventhouse / KQL database
- Show auto-refreshing operational visuals: Real-Time Dashboard
- Trigger actions when a live condition is met: Activator
- Read OneLake data directly through Power BI: Direct Lake semantic model`,
      },
      {
        title: "High-Value Comparison Sheet",
        content: `Commonly confused concept pairs and the key distinction between them.

**Concept Comparisons**
- Dataflow Gen2 vs Data pipeline: transformation worker vs orchestration manager
- Copy Data vs Dataflow Gen2: high-speed movement vs visual transformation
- Lakehouse vs Warehouse: Spark, files and Delta tables vs relational SQL-led warehouse
- SQL analytics endpoint vs Warehouse: read-only lakehouse SQL vs read-write transactional T-SQL
- Eventstream vs Eventhouse: ingest, transform and route in motion vs store and query real-time data
- Pipeline parameter vs Pipeline variable: runtime input vs value stored or changed during a run
- Optimize Write vs OPTIMIZE: prevent small files during writes vs compact existing files
- V-Order vs Partitioning: file-level read optimisation vs physical folder layout
- Workspace role vs Item permission: broad workspace collaboration vs targeted item access
- Git integration vs Deployment pipeline: source control synchronisation vs environment promotion`,
      },
      {
        title: "Final Checklist",
        content: `Use these checklists for a last pass before the exam.

**Delta and Lakehouse**
- A Delta table equals Parquet data files plus a _delta_log transaction history
- ACID, schema enforcement, CRUD and time travel are core Delta benefits
- Use OPTIMIZE for existing small files and VACUUM for obsolete files
- Use partitioning selectively on very large tables with sensible filter columns
- The lakehouse SQL analytics endpoint is read-only for table data

**Warehouse**
- Facts hold measurements; dimensions provide context
- Load dimensions before facts when facts require surrogate-key lookups
- Type 1 SCD overwrites; Type 2 inserts a new historical row
- Use full loads for simplicity and incremental loads for efficiency

**Real-Time and Security**
- Eventstream handles in-flight ingestion, transformation and routing
- Eventhouse stores high-velocity time-series data in KQL databases
- Apply least privilege at workspace, item, compute and data layers
- RLS filters rows, CLS blocks columns, and masking obscures displayed values
- DENY always overrides GRANT`,
      },
    ],
  },
];

export function DP700StudyGuide() {
  const { topicId } = useParams();
  const TOKENS = useTheme();

  const topic = DP700_TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return <Navigate to="/study-guides/dp-700" replace />;
  }

  const Icon = topic.icon;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{topic.title} | DP-700 Study Guide | FabricPrep</title>
        <link rel="canonical" href={`https://fabricprep.com/study-guides/dp-700/${topicId}`} />
        <meta
          name="description"
          content={`Study guide for ${topic.title} - DP-700 Microsoft Fabric Data Engineer Associate exam. Covers ${topic.weight} of the exam.`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${topic.title} — DP-700 Study Guide`,
            about: "DP-700: Microsoft Fabric Data Engineer Associate",
            description: `Study guide for ${topic.title} - DP-700 Microsoft Fabric Data Engineer Associate exam. Covers ${topic.weight} of the exam.`,
            author: { "@type": "Person", name: "Jitendra Singh Malik" },
            publisher: { "@type": "Organization", name: "FabricPrep" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Study Guides", path: "study-guides" },
              { name: "DP-700 Study Guide", path: "study-guides/dp-700" },
              { name: topic.title },
            ])
          )}
        </script>
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <Link to="/study-guides" style={{ color: TOKENS.inkMuted }}>Study Guides</Link>
          <span>/</span>
          <Link to="/study-guides/dp-700" style={{ color: TOKENS.inkMuted }}>DP-700</Link>
          <span>/</span>
          <span style={{ color: TOKENS.ink }}>{topic.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${TOKENS.azure}20` }}
          >
            <Icon size={24} color={TOKENS.azure} />
          </div>
          <div>
            <div
              className="text-xs uppercase mb-1 px-2 py-0.5 rounded-full inline-block"
              style={{ color: TOKENS.azure, letterSpacing: "0.1em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
            >
              {topic.weight}{topic.weight.includes("%") ? " of exam" : ""}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {topic.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: TOKENS.inkMuted }}>
              {topic.description}
            </p>
          </div>
        </div>

        {/* Topic Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DP700_TOPICS.map((t) => {
            const TopicIcon = t.icon;
            const isActive = t.id === topicId;
            return (
              <Link
                key={t.id}
                to={`/study-guides/dp-700/${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: isActive ? TOKENS.azure : TOKENS.panel,
                  color: isActive ? TOKENS.bg : TOKENS.ink,
                  border: `1px solid ${isActive ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                <TopicIcon size={14} />
                {t.title}
              </Link>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-6">
          {topic.sections.map((section, index) => (
            <div
              key={section.title}
              className="rounded-xl p-5 sm:p-6"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <h2 className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                {section.title}
              </h2>
              <div className="prose prose-sm max-w-none" style={{ color: TOKENS.inkMuted }}>
                {section.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    // Subheading
                    return (
                      <h3 key={i} className="text-sm font-semibold mt-4 mb-2" style={{ color: TOKENS.ink }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    // List
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 my-2">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j}>{item.replace('- ', '').replace(/\*\*/g, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Regular paragraph
                  return (
                    <p key={i} className="mb-3 leading-relaxed">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
          <Link
            to="/study-guides/dp-700"
            className="flex items-center gap-1 text-sm"
            style={{ color: TOKENS.inkMuted }}
          >
            <ChevronLeft size={16} />
            Back to DP-700 Overview
          </Link>
          <Link
            to={`/${EXAM_META['DP-700'].slug}`}
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg"
            style={{ background: TOKENS.azure, color: TOKENS.bg }}
          >
            <BookOpen size={16} />
            Practice Questions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
