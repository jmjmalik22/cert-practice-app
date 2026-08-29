// Question bank — grouped by exam, each item tagged with a domain.
// Add more objects to any array to expand coverage.
export const QUESTION_BANK = {
  "DP-700": {
    label: "Fabric Data Engineer Associate",
    questions: [
      {
        id: "700-1",
        domain: "Implement and manage an analytics solution",
        question:
          "You need to ingest data from an on-premises SQL Server into a Fabric Lakehouse on a recurring schedule with minimal setup. Which Fabric item should you use?",
        options: [
          { id: "a", text: "A Dataflow Gen2" },
          { id: "b", text: "A Data Pipeline with a Copy activity" },
          { id: "c", text: "A KQL Database" },
          { id: "d", text: "A Semantic model" },
        ],
        correct: "b",
        explanation:
          "A Data Pipeline with a Copy activity, using the on-premises data gateway, is the standard way to schedule recurring ingestion into a Lakehouse from an on-prem source.",
      },
      {
        id: "700-2",
        domain: "Ingest and transform data",
        question:
          "Which file format is the default storage format for tables in a Fabric Lakehouse?",
        options: [
          { id: "a", text: "CSV" },
          { id: "b", text: "Parquet" },
          { id: "c", text: "Delta" },
          { id: "d", text: "Avro" },
        ],
        correct: "c",
        explanation:
          "Fabric Lakehouse tables are stored as Delta tables (Delta Lake format, itself built on Parquet), which gives you ACID transactions and time travel.",
      },
      {
        id: "700-3",
        domain: "Monitor and optimize an analytics solution",
        question:
          "You notice a Fabric Spark job is spending excessive time on small file reads. What is the recommended remediation?",
        options: [
          { id: "a", text: "Disable V-Order" },
          { id: "b", text: "Run OPTIMIZE (compaction) on the table" },
          { id: "c", text: "Convert the table to CSV" },
          { id: "d", text: "Increase the Spark pool node count only" },
        ],
        correct: "b",
        explanation:
          "Small-file problems are solved by compacting files with OPTIMIZE, which merges small Parquet/Delta files into larger ones for more efficient reads.",
      },
      {
        id: "700-4",
        domain: "Implement and manage an analytics solution",
        question:
          "Which Fabric workload would you use to run real-time analytics over streaming event data using KQL?",
        options: [
          { id: "a", text: "Data Warehouse" },
          { id: "b", text: "Eventhouse / KQL Database" },
          { id: "c", text: "Lakehouse SQL analytics endpoint" },
          { id: "d", text: "Dataflow Gen1" },
        ],
        correct: "b",
        explanation:
          "Eventhouse (backed by a KQL Database) is Fabric's real-time analytics workload, purpose-built for querying streaming and time-series data with KQL.",
      },
      {
        id: "700-5",
        domain: "Ingest and transform data",
        question:
          "In a medallion architecture built on Fabric, what is the primary purpose of the silver layer?",
        options: [
          { id: "a", text: "Store raw, unmodified source data" },
          { id: "b", text: "Store cleansed, validated, and conformed data" },
          { id: "c", text: "Store business-level aggregates only" },
          { id: "d", text: "Store semantic model metadata" },
        ],
        correct: "b",
        explanation:
          "Bronze holds raw data, silver holds cleansed/validated/conformed data, and gold holds business-level, aggregated data ready for reporting.",
      },
      {
        id: "700-6",
        domain: "Monitor and optimize an analytics solution",
        question:
          "Which tool would you use to monitor the run history and status of Fabric Data Pipelines and Spark jobs across a workspace?",
        options: [
          { id: "a", text: "Monitoring hub" },
          { id: "b", text: "Power BI Service usage metrics" },
          { id: "c", text: "Azure Monitor Workbooks only" },
          { id: "d", text: "Purview Data Catalog" },
        ],
        correct: "a",
        explanation:
          "The Fabric Monitoring hub gives a centralized view of item activity — pipeline runs, Spark jobs, refreshes — across a tenant or workspace.",
      },
      {
        id: "700-7",
        domain: "Implement and manage an analytics solution",
        question:
          "You want row-level security enforced on a Fabric Warehouse table so different sales reps see only their own region's rows. What should you implement?",
        options: [
          { id: "a", text: "A Dataflow filter" },
          { id: "b", text: "A security predicate function bound via CREATE SECURITY POLICY" },
          { id: "c", text: "A Power BI RLS role only" },
          { id: "d", text: "Object-level permissions (GRANT SELECT)" },
        ],
        correct: "b",
        explanation:
          "Row-level security in a Fabric Warehouse is implemented with a predicate function bound to the table through CREATE SECURITY POLICY, similar to SQL Server RLS.",
      },
      {
        id: "700-8",
        domain: "Ingest and transform data",
        question:
          "Which Fabric item provides a low-code, Power Query-based experience for transforming data before loading it to a Lakehouse or Warehouse?",
        options: [
          { id: "a", text: "Notebook" },
          { id: "b", text: "Dataflow Gen2" },
          { id: "c", text: "KQL Queryset" },
          { id: "d", text: "Data Activator" },
        ],
        correct: "b",
        explanation:
          "Dataflow Gen2 uses the familiar Power Query editor for low-code transformations and can write output directly to a Lakehouse or Warehouse.",
      },
      {
        id: "700-9",
        domain: "Fabric foundations and OneLake",
        question:
          "What is the correct relationship between a workspace, OneLake, and a lakehouse in Microsoft Fabric?",
        options: [
          { id: "a", text: "OneLake is an item stored inside a workspace" },
          { id: "b", text: "A workspace is an organisational/security boundary; OneLake is the storage foundation; a lakehouse is an item inside a workspace" },
          { id: "c", text: "A lakehouse is the storage foundation for OneLake" },
          { id: "d", text: "Workspaces and OneLake are the same concept" },
        ],
        correct: "b",
        explanation:
          "A workspace organizes items for collaboration and access control, OneLake is the shared storage foundation underneath, and a lakehouse (like a warehouse or eventhouse) is an item that lives inside a workspace.",
      },
      {
        id: "700-10",
        domain: "Data ingestion and orchestration",
        question:
          "In a Fabric data pipeline, what is the key difference between a parameter and a variable?",
        options: [
          { id: "a", text: "A parameter stores a value during a run; a variable is supplied to make the pipeline reusable" },
          { id: "b", text: "A parameter is supplied to make the pipeline reusable; a variable stores or updates a value during a specific run" },
          { id: "c", text: "They are interchangeable terms for the same feature" },
          { id: "d", text: "Only variables can be used with ForEach activities" },
        ],
        correct: "b",
        explanation:
          "A parameter is passed in so the same pipeline can process different files, dates, or entities. A variable holds or updates a value while a specific pipeline run is executing.",
      },
      {
        id: "700-11",
        domain: "Data ingestion and orchestration",
        question:
          "You need to move a large volume of data from a source to a Lakehouse largely as-is, with transformation planned for later in a notebook. Which activity is the best fit?",
        options: [
          { id: "a", text: "Dataflow Gen2" },
          { id: "b", text: "Copy Data activity" },
          { id: "c", text: "Activator rule" },
          { id: "d", text: "KQL update policy" },
        ],
        correct: "b",
        explanation:
          "Copy Data is designed for efficient, high-performance movement of data with little or no transformation, leaving reshaping work to a later notebook or SQL step.",
      },
      {
        id: "700-12",
        domain: "Apache Spark and notebooks",
        question:
          "In Fabric Spark notebooks, what is the difference between a temporary view and a table saved to the catalog?",
        options: [
          { id: "a", text: "A temporary view is session-based; a catalog table is persistent" },
          { id: "b", text: "A temporary view is persistent; a catalog table is session-based" },
          { id: "c", text: "Both persist permanently across sessions" },
          { id: "d", text: "Temporary views can only be created in SQL, not PySpark" },
        ],
        correct: "a",
        explanation:
          "createOrReplaceTempView() creates a view that only exists for the current session, while a managed table saved to the catalog (typically Delta) persists beyond the session.",
      },
      {
        id: "700-13",
        domain: "Lakehouse, Delta Lake and medallion architecture",
        question:
          "What is the primary purpose of the _delta_log folder in a Delta table?",
        options: [
          { id: "a", text: "It stores a backup copy of the raw CSV source files" },
          { id: "b", text: "It records the transaction history that enables ACID behaviour, schema enforcement, and time travel" },
          { id: "c", text: "It stores the Power BI semantic model definition" },
          { id: "d", text: "It caches query results for the SQL analytics endpoint" },
        ],
        correct: "b",
        explanation:
          "The _delta_log folder holds the transaction log that gives Delta tables ACID transactions, schema enforcement, CRUD support, and the ability to time travel to previous versions.",
      },
      {
        id: "700-14",
        domain: "Lakehouse, Delta Lake and medallion architecture",
        question:
          "A lakehouse table has accumulated many small files after frequent small writes. Which maintenance operation compacts the existing small files?",
        options: [
          { id: "a", text: "VACUUM" },
          { id: "b", text: "OPTIMIZE" },
          { id: "c", text: "Optimize Write" },
          { id: "d", text: "V-Order" },
        ],
        correct: "b",
        explanation:
          "OPTIMIZE compacts existing small files after the fact, whereas Optimize Write reduces small-file creation during the write itself — a subtly different, commonly-confused pair.",
      },
      {
        id: "700-15",
        domain: "Fabric Data Warehouse",
        question:
          "Under a Type 2 slowly changing dimension, how is a change to an existing dimension attribute handled?",
        options: [
          { id: "a", text: "The existing row's value is overwritten and history is lost" },
          { id: "b", text: "A new row is inserted so full history is retained" },
          { id: "c", text: "The change is stored in an extra column alongside the original value" },
          { id: "d", text: "The attribute is dropped from the dimension" },
        ],
        correct: "b",
        explanation:
          "Type 2 SCD preserves history by inserting a new row for each change, unlike Type 1 (overwrite, no history) or Type 3 (limited history kept in extra columns).",
      },
      {
        id: "700-16",
        domain: "Fabric Data Warehouse",
        question:
          "Why are dimension tables typically loaded before fact tables in a warehouse ETL process?",
        options: [
          { id: "a", text: "Fact tables must map incoming business keys to the correct dimension surrogate keys" },
          { id: "b", text: "Dimension tables are always smaller so they load faster" },
          { id: "c", text: "Fabric enforces this order automatically and it cannot be changed" },
          { id: "d", text: "Fact tables cannot contain foreign keys" },
        ],
        correct: "a",
        explanation:
          "Fact rows need to look up the correct dimension surrogate keys, so dimensions generally need to already contain the relevant records before facts are loaded.",
      },
      {
        id: "700-17",
        domain: "Real-Time Intelligence",
        question:
          "You need to filter, reshape, and route streaming events while they are still in transit, before they land in storage. Which Fabric component fits best?",
        options: [
          { id: "a", text: "Eventhouse" },
          { id: "b", text: "Eventstream" },
          { id: "c", text: "KQL queryset" },
          { id: "d", text: "Real-Time Dashboard" },
        ],
        correct: "b",
        explanation:
          "Eventstream is the no-code experience for capturing, transforming, and routing data in motion, before it reaches a destination like an Eventhouse or Lakehouse.",
      },
      {
        id: "700-18",
        domain: "Security and access control",
        question:
          "In Fabric's permission model, what happens when a user has both a GRANT and a DENY on the same object?",
        options: [
          { id: "a", text: "GRANT always overrides DENY" },
          { id: "b", text: "DENY overrides GRANT" },
          { id: "c", text: "The most recently applied permission wins regardless of type" },
          { id: "d", text: "Access defaults to allowed unless explicitly revoked" },
        ],
        correct: "b",
        explanation:
          "As in standard SQL security models, an explicit DENY always overrides a GRANT for the same object and principal.",
      },
      {
        id: "700-19",
        domain: "Monitoring and performance",
        question:
          "Which set of dynamic management views would you join to identify who is currently running a long query against a Fabric Warehouse and how long it has been active?",
        options: [
          { id: "a", text: "sys.dm_exec_connections, sys.dm_exec_sessions, sys.dm_exec_requests" },
          { id: "b", text: "queryinsights.exec_requests_history only" },
          { id: "c", text: "sys.dm_exec_query_stats only" },
          { id: "d", text: "Monitor Hub API logs only" },
        ],
        correct: "a",
        explanation:
          "Joining sys.dm_exec_connections, sys.dm_exec_sessions, and sys.dm_exec_requests reveals active connections, the authenticated session, and what each session is currently executing.",
      },
      {
        id: "700-20",
        domain: "CI/CD and lifecycle management",
        question:
          "What is the key difference between Git integration and a deployment pipeline in Fabric?",
        options: [
          { id: "a", text: "Git integration synchronises a workspace with source control; a deployment pipeline promotes items between environment workspaces" },
          { id: "b", text: "They perform the same function and only one should be configured" },
          { id: "c", text: "Deployment pipelines manage source control; Git integration promotes to production" },
          { id: "d", text: "Git integration is only available in the Production stage" },
        ],
        correct: "a",
        explanation:
          "Git integration handles version control, branching, and rollback for a workspace, while deployment pipelines promote validated content across Development, Test, and Production stages — complementary but distinct processes.",
      },
      {
        id: "700-21",
        domain: "Ingest and transform data",
        question:
          "Your source system stores data in a proprietary format and you need the entire database available in Fabric as a unit, kept continuously in sync. Which capability should you use?",
        options: [
          { id: "a", text: "A OneLake shortcut" },
          { id: "b", text: "Mirroring" },
          { id: "c", text: "A Dataflow Gen2 scheduled refresh" },
          { id: "d", text: "V-Order optimization" },
        ],
        correct: "b",
        explanation:
          "Mirroring can bring in an entire external database or catalog, and when the source uses a proprietary format it is the only option — shortcuts only work with data already in open formats.",
      },
      {
        id: "700-22",
        domain: "Ingest and transform data",
        question:
          "What is the key difference between a OneLake shortcut and mirroring when the source data is already in an open format like Delta or Parquet?",
        options: [
          { id: "a", text: "A shortcut references the data in place with zero copy; mirroring can replicate it into OneLake" },
          { id: "b", text: "A shortcut always copies the data; mirroring never does" },
          { id: "c", text: "They are functionally identical for open-format sources" },
          { id: "d", text: "Shortcuts only work for streaming sources" },
        ],
        correct: "a",
        explanation:
          "Shortcuts add a reference to data that stays at its source (zero-copy). Mirroring can use replication or shortcuts depending on the source, but for proprietary formats it must replicate — for open formats, a plain shortcut may be simpler.",
      },
      {
        id: "700-23",
        domain: "Implement and manage an analytics solution",
        question:
          "Besides Spark, OneLake, and domain settings, which additional workspace setting can now be configured in Fabric for orchestrating Python-based workflows?",
        options: [
          { id: "a", text: "Apache Airflow workspace settings" },
          { id: "b", text: "Kubernetes workspace settings" },
          { id: "c", text: "Terraform workspace settings" },
          { id: "d", text: "Docker workspace settings" },
        ],
        correct: "a",
        explanation:
          "Fabric workspace settings include configuring Apache Airflow, alongside Spark, domain, and OneLake settings, for orchestrating Python-based data workflows.",
      },
      {
        id: "700-24",
        domain: "Real-Time Intelligence",
        question:
          "Which shortcut-related capability lets you automatically convert data format or remove personally identifiable information as part of referencing external data through OneLake?",
        options: [
          { id: "a", text: "Shortcut transformations" },
          { id: "b", text: "V-Order" },
          { id: "c", text: "Query acceleration" },
          { id: "d", text: "Dynamic data masking" },
        ],
        correct: "a",
        explanation:
          "Shortcut transformations let you apply automatic changes to shortcut-referenced data, such as converting the file format or removing PII, without duplicating the underlying data.",
      },
      {
        id: "700-25",
        domain: "Real-Time Intelligence",
        question:
          "You need fixed, non-overlapping one-minute aggregation windows over streaming sales events grouped by city. Which windowing function fits this requirement?",
        options: [
          { id: "a", text: "HoppingWindow" },
          { id: "b", text: "TumblingWindow" },
          { id: "c", text: "SlidingWindow" },
          { id: "d", text: "SessionWindow" },
        ],
        correct: "b",
        explanation:
          "TumblingWindow produces fixed, non-overlapping time intervals, ideal for periodic aggregations like per-minute sales totals grouped by a dimension such as city.",
      },
      {
        id: "700-26",
        domain: "Real-Time Intelligence",
        question:
          "You want to detect users placing an unusually high number of orders within a rolling 5-minute window, re-evaluated every minute. Which windowing approach is appropriate?",
        options: [
          { id: "a", text: "TumblingWindow" },
          { id: "b", text: "HoppingWindow" },
          { id: "c", text: "A single static aggregation" },
          { id: "d", text: "VACUUM" },
        ],
        correct: "b",
        explanation:
          "HoppingWindow supports overlapping windows — e.g. a 5-minute window evaluated every 1 minute — which suits burst or anomaly detection scenarios like this one.",
      },
      {
        id: "700-27",
        domain: "Monitor and optimize an analytics solution",
        question:
          "In a KQL Eventhouse, which object precomputes a recurring aggregation query so subsequent reads are faster than querying the source table directly?",
        options: [
          { id: "a", text: "A stored function" },
          { id: "b", text: "A materialized view" },
          { id: "c", text: "A KQL queryset" },
          { id: "d", text: "An update policy" },
        ],
        correct: "b",
        explanation:
          "A materialized view returns an up-to-date result of an aggregation query and is faster to query than running the aggregation directly over the source table each time.",
      },
      {
        id: "700-28",
        domain: "Ingest and transform data",
        question:
          "Which KQL operator is required before you can apply window functions to a row set, since window functions depend on row order?",
        options: [
          { id: "a", text: "project" },
          { id: "b", text: "serialize (or an operator that produces a sorted/serialized result, like sort)" },
          { id: "c", text: "summarize" },
          { id: "d", text: "extend" },
        ],
        correct: "b",
        explanation:
          "Window functions require the row set to be serialized — given a specific order — which is achieved with the serialize operator or an operator like sort that emits a sorted row set.",
      },
      {
        id: "700-29",
        domain: "Implement and manage an analytics solution",
        question:
          "Which Fabric feature lets item owners mark content as reviewed and trustworthy, with 'Promoted', 'Certified', and 'Master data' as the available badges?",
        options: [
          { id: "a", text: "Endorsement" },
          { id: "b", text: "Deployment pipelines" },
          { id: "c", text: "Sensitivity labels" },
          { id: "d", text: "Row-level security" },
        ],
        correct: "a",
        explanation:
          "Endorsement provides Promoted, Certified, and Master data badges to help users identify trustworthy, high-quality items. Certification and master data status require authorized reviewers; promotion only requires write permission.",
      },
      {
        id: "700-30",
        domain: "Implement and manage an analytics solution",
        question:
          "Any user with write permissions on an item can apply which endorsement badge without needing special authorization?",
        options: [
          { id: "a", text: "Certified" },
          { id: "b", text: "Master data" },
          { id: "c", text: "Promoted" },
          { id: "d", text: "None — all badges require admin authorization" },
        ],
        correct: "c",
        explanation:
          "Promotion only requires write permissions on the item. Certified and Master data badges require authorization from the Fabric administrator (or delegated domain admins).",
      },
      {
        id: "700-31",
        domain: "Implement and manage an analytics solution",
        question:
          "Which Fabric governance feature applies classification labels from Microsoft Purview Information Protection to guard sensitive items against unauthorized access?",
        options: [
          { id: "a", text: "Sensitivity labels" },
          { id: "b", text: "Deployment pipelines" },
          { id: "c", text: "Workspace roles" },
          { id: "d", text: "Audit logs" },
        ],
        correct: "a",
        explanation:
          "Sensitivity labels from Microsoft Purview Information Protection classify and protect content, helping meet governance and compliance requirements around who can access sensitive data.",
      },
      {
        id: "700-32",
        domain: "Implement and manage an analytics solution",
        question:
          "You need a record of who accessed or modified Fabric items, for compliance and troubleshooting purposes. Which capability provides this?",
        options: [
          { id: "a", text: "Fabric audit logs" },
          { id: "b", text: "The Monitoring hub" },
          { id: "c", text: "OneLake catalog" },
          { id: "d", text: "Deployment pipelines" },
        ],
        correct: "a",
        explanation:
          "Fabric audit logs capture user and admin activity across the tenant, supporting compliance reviews and investigation of who performed which actions on which items.",
      },
      {
        id: "700-33",
        domain: "Implement and manage an analytics solution",
        question:
          "You're choosing between a Dataflow Gen2, a pipeline, and a notebook to implement a transformation step. Which factor most influences using a notebook over the other two?",
        options: [
          { id: "a", text: "The transformation requires large-scale, code-first logic beyond what low-code tools support" },
          { id: "b", text: "The step just needs to run other items on a schedule" },
          { id: "c", text: "The transformation is simple and best expressed visually with Power Query" },
          { id: "d", text: "No compute is required at all" },
        ],
        correct: "a",
        explanation:
          "Notebooks are the right choice for complex, large-scale, code-first transformations using Spark; Dataflow Gen2 suits low-code Power Query-style transforms, and pipelines primarily orchestrate and schedule other items.",
      },
      {
        id: "700-34",
        domain: "Implement and manage an analytics solution",
        question:
          "You want a Fabric pipeline to run automatically whenever a new file lands in a storage location, rather than on a fixed schedule. What should you configure?",
        options: [
          { id: "a", text: "An event-based trigger" },
          { id: "b", text: "A tumbling window trigger only" },
          { id: "c", text: "A manual trigger" },
          { id: "d", text: "A workspace role change" },
        ],
        correct: "a",
        explanation:
          "Event-based triggers start a pipeline run in response to an event, such as a new file arriving in storage, rather than relying solely on a fixed time schedule.",
      },
      {
        id: "700-35",
        domain: "Ingest and transform data",
        question:
          "You are loading a large fact table nightly and want to process only new or changed records rather than reloading everything. Which loading pattern should you design?",
        options: [
          { id: "a", text: "Full load" },
          { id: "b", text: "Incremental load" },
          { id: "c", text: "VACUUM" },
          { id: "d", text: "Shortcut transformation" },
        ],
        correct: "b",
        explanation:
          "An incremental load processes only new or changed records since the last run, which is more efficient than a full load that truncates and reloads the entire target each time.",
      },
      {
        id: "700-36",
        domain: "Ingest and transform data",
        question:
          "Before loading fact data into a dimensional model, incoming records must be matched to the correct dimension surrogate keys. What is this preparation step generally called?",
        options: [
          { id: "a", text: "Key lookup / surrogate key mapping" },
          { id: "b", text: "V-Order compression" },
          { id: "c", text: "Query folding" },
          { id: "d", text: "Endorsement" },
        ],
        correct: "a",
        explanation:
          "Preparing fact data for a dimensional model involves mapping source business keys to the warehouse-generated surrogate keys already present in the dimension tables.",
      },
      {
        id: "700-37",
        domain: "Ingest and transform data",
        question:
          "You need to choose a data store for a new Fabric solution that will support both files and structured Delta tables, queried by Spark and T-SQL alike. Which store fits best?",
        options: [
          { id: "a", text: "A Lakehouse" },
          { id: "b", text: "A KQL database" },
          { id: "c", text: "A Power BI report" },
          { id: "d", text: "A paginated report" },
        ],
        correct: "a",
        explanation:
          "A Lakehouse supports both unstructured/semi-structured files and structured Delta tables, and can be queried through Spark notebooks or the SQL analytics endpoint.",
      },
      {
        id: "700-38",
        domain: "Ingest and transform data",
        question:
          "You're joining a customer dimension and a sales fact table into a single flattened table to simplify downstream reporting queries. What is this transformation called?",
        options: [
          { id: "a", text: "Denormalization" },
          { id: "b", text: "Partitioning" },
          { id: "c", text: "Endorsement" },
          { id: "d", text: "Mirroring" },
        ],
        correct: "a",
        explanation:
          "Denormalizing combines related tables (such as a fact and its dimensions) into a flatter structure, which can simplify and speed up downstream reporting queries.",
      },
      {
        id: "700-39",
        domain: "Ingest and transform data",
        question:
          "A source feed occasionally delivers records for a business day after that day's batch has already been processed. Which concern does this describe?",
        options: [
          { id: "a", text: "Late-arriving data" },
          { id: "b", text: "Query acceleration" },
          { id: "c", text: "Shortcut security" },
          { id: "d", text: "Semantic model refresh" },
        ],
        correct: "a",
        explanation:
          "Late-arriving data refers to records that show up after their related batch has already been processed, requiring specific handling logic so they aren't lost or double-counted.",
      },
      {
        id: "700-40",
        domain: "Ingest and transform data",
        question:
          "You need to choose a streaming engine in Fabric to process high-throughput event data with low-code transformations before it lands in storage. Which is the most direct choice?",
        options: [
          { id: "a", text: "Eventstream" },
          { id: "b", text: "Dataflow Gen2" },
          { id: "c", text: "A Fabric Warehouse" },
          { id: "d", text: "A paginated report" },
        ],
        correct: "a",
        explanation:
          "Eventstream is Fabric's no-code streaming engine for capturing, transforming, and routing high-throughput event data before or as it lands in a destination.",
      },
      {
        id: "700-41",
        domain: "Ingest and transform data",
        question:
          "In Real-Time Intelligence, when should you prefer native Eventhouse tables over OneLake shortcuts as the data source?",
        options: [
          { id: "a", text: "When you need the fastest possible ingestion and query performance for high-velocity, append-heavy event data" },
          { id: "b", text: "When the data already exists elsewhere in OneLake and duplication should be avoided" },
          { id: "c", text: "When the data changes only once a year" },
          { id: "d", text: "Native tables and shortcuts perform identically in all cases" },
        ],
        correct: "a",
        explanation:
          "Native Eventhouse tables are optimized for high-velocity, append-heavy time-series ingestion and querying. Shortcuts avoid duplicating data already available elsewhere in OneLake but may trade off on raw ingestion/query speed.",
      },
      {
        id: "700-42",
        domain: "Ingest and transform data",
        question:
          "Which Real-Time Intelligence feature is designed to speed up queries against OneLake shortcut data by caching or indexing it, compared to a standard shortcut?",
        options: [
          { id: "a", text: "Query acceleration" },
          { id: "b", text: "V-Order" },
          { id: "c", text: "Mirroring" },
          { id: "d", text: "Endorsement" },
        ],
        correct: "a",
        explanation:
          "Query acceleration for OneLake shortcuts improves query performance over shortcut-referenced data compared to a standard shortcut, at the cost of some additional resource use.",
      },
      {
        id: "700-43",
        domain: "Monitor and optimize an analytics solution",
        question:
          "You want to be notified automatically whenever a critical pipeline fails, without checking the Monitoring hub manually. What should you configure?",
        options: [
          { id: "a", text: "An alert" },
          { id: "b", text: "A sensitivity label" },
          { id: "c", text: "A workspace role" },
          { id: "d", text: "A shortcut transformation" },
        ],
        correct: "a",
        explanation:
          "Alerts can be configured to automatically notify you when specific conditions occur, such as a pipeline or refresh failure, instead of relying on manually checking the Monitoring hub.",
      },
      {
        id: "700-44",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A Dataflow Gen2 fails intermittently during a scheduled refresh. Where would you look first to identify the root cause?",
        options: [
          { id: "a", text: "The Dataflow's refresh history and error details in the Monitoring hub" },
          { id: "b", text: "The OneLake catalog" },
          { id: "c", text: "Workspace roles" },
          { id: "d", text: "Sensitivity label settings" },
        ],
        correct: "a",
        explanation:
          "The Monitoring hub surfaces Dataflow Gen2 refresh history and error details, which is the natural first place to diagnose an intermittent refresh failure.",
      },
      {
        id: "700-45",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A notebook run fails with a Spark executor out-of-memory error. Which change is most directly relevant to resolving this?",
        options: [
          { id: "a", text: "Adjust Spark pool sizing or partitioning to reduce memory pressure per task" },
          { id: "b", text: "Apply a sensitivity label to the notebook" },
          { id: "c", text: "Enable OneLake security roles" },
          { id: "d", text: "Certify the notebook" },
        ],
        correct: "a",
        explanation:
          "Out-of-memory errors in Spark are typically addressed by adjusting pool/node sizing, increasing partitioning to reduce per-task data volume, or optimizing the transformation logic itself.",
      },
      {
        id: "700-46",
        domain: "Monitor and optimize an analytics solution",
        question:
          "An Eventstream shows data arriving but no records reaching the configured Eventhouse destination. What should you check first?",
        options: [
          { id: "a", text: "The Eventstream's routing/transformation configuration and destination connection status" },
          { id: "b", text: "The semantic model's DirectLakeBehavior setting" },
          { id: "c", text: "The warehouse's row-level security policy" },
          { id: "d", text: "The deployment pipeline stage assignment" },
        ],
        correct: "a",
        explanation:
          "When data enters an Eventstream but doesn't reach its destination, the routing/transformation steps and the destination connection are the most direct things to check for a break in the flow.",
      },
      {
        id: "700-47",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A T-SQL query against a Fabric Warehouse returns a permission error for a specific column. Which security feature most likely explains this behavior?",
        options: [
          { id: "a", text: "Column-level security or dynamic data masking" },
          { id: "b", text: "V-Order" },
          { id: "c", text: "OPTIMIZE" },
          { id: "d", text: "Endorsement" },
        ],
        correct: "a",
        explanation:
          "Column-level security blocks access to specific columns outright, producing permission errors; dynamic data masking instead obscures values without necessarily erroring, so both are worth checking for column-specific access issues.",
      },
      {
        id: "700-48",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A OneLake shortcut suddenly stops returning data. Mirroring on the source item was recently paused. What's the likely relationship?",
        options: [
          { id: "a", text: "Shortcuts to mirrored tables reflect the same state as the mirrored item, so a paused mirror breaks the shortcut" },
          { id: "b", text: "Shortcuts are entirely independent of mirroring status" },
          { id: "c", text: "Pausing mirroring only affects Warehouse items, never shortcuts" },
          { id: "d", text: "Shortcuts automatically switch to a cached copy when mirroring pauses" },
        ],
        correct: "a",
        explanation:
          "If a mirrored source is paused, deleted, or hits a replication error, every shortcut pointing to it reflects that same state — so pausing mirroring directly breaks dependent shortcuts.",
      },
      {
        id: "700-49",
        domain: "Monitor and optimize an analytics solution",
        question:
          "Queries against a large Lakehouse table are slow due to excessive small files from frequent incremental writes. Besides OPTIMIZE, which setting helps prevent this from recurring?",
        options: [
          { id: "a", text: "Optimize Write" },
          { id: "b", text: "Dynamic data masking" },
          { id: "c", text: "Row-level security" },
          { id: "d", text: "A deployment pipeline" },
        ],
        correct: "a",
        explanation:
          "Optimize Write reduces the creation of small files during writes themselves, complementing OPTIMIZE (which compacts files that already exist) to prevent the small-file problem from recurring.",
      },
      {
        id: "700-50",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A Fabric Warehouse query performs a full table scan when a WHERE clause filters on a large table's date column. Which optimization is most likely to help?",
        options: [
          { id: "a", text: "Partitioning or indexing/statistics tuned around the date column" },
          { id: "b", text: "Applying a sensitivity label" },
          { id: "c", text: "Enabling OneLake security roles" },
          { id: "d", text: "Switching to Import mode in Power BI" },
        ],
        correct: "a",
        explanation:
          "For large tables filtered by a common column like date, partitioning or ensuring statistics/indexes support that filter helps the engine skip irrelevant data instead of scanning the whole table.",
      },
      {
        id: "700-51",
        domain: "Monitor and optimize an analytics solution",
        question:
          "An Eventhouse KQL query scanning a large table is slow even with a time filter applied early. What KQL practice most directly improves this?",
        options: [
          { id: "a", text: "Project only the required columns after filtering, and consider a materialized view for repeated aggregations" },
          { id: "b", text: "Remove the time filter entirely" },
          { id: "c", text: "Switch the query to T-SQL syntax" },
          { id: "d", text: "Increase the KQL queryset's row limit" },
        ],
        correct: "a",
        explanation:
          "Projecting only needed columns reduces processing overhead, and materialized views precompute recurring aggregations — both directly reduce the cost of repeated large-scale KQL queries.",
      },
      {
        id: "700-52",
        domain: "Monitor and optimize an analytics solution",
        question:
          "A Spark job in a notebook spends most of its time on a single task while other executors sit idle. What does this pattern usually indicate?",
        options: [
          { id: "a", text: "Data skew across partitions" },
          { id: "b", text: "A missing sensitivity label" },
          { id: "c", text: "A misconfigured deployment pipeline stage" },
          { id: "d", text: "An expired workspace role assignment" },
        ],
        correct: "a",
        explanation:
          "When one task runs far longer than others while executors sit idle, it usually points to data skew — an uneven distribution of data across partitions — which can be addressed with better partitioning or salting keys.",
      },
    ],
  },
  "DP-600": {
    label: "Fabric Analytics Engineer Associate",
    questions: [
      {
        id: "600-1",
        domain: "Plan, implement, and manage a solution for data analytics",
        question:
          "What is the smallest unit of compute capacity purchase that enables Fabric workloads for an organization?",
        options: [
          { id: "a", text: "A Power BI Pro license" },
          { id: "b", text: "A Fabric capacity (F SKU)" },
          { id: "c", text: "An Azure Synapse pool" },
          { id: "d", text: "A Premium Per User license" },
        ],
        correct: "b",
        explanation:
          "Fabric workloads are enabled by purchasing a Fabric capacity (an F SKU), which provides the compute pool shared across all Fabric items in assigned workspaces.",
      },
      {
        id: "600-2",
        domain: "Prepare data",
        question:
          "You are modeling a star schema in a Fabric semantic model. Which type of table should contain the numeric measures used in analysis?",
        options: [
          { id: "a", text: "Dimension table" },
          { id: "b", text: "Fact table" },
          { id: "c", text: "Bridge table" },
          { id: "d", text: "Staging table" },
        ],
        correct: "b",
        explanation:
          "Fact tables hold the quantitative, measurable data (sales amount, quantity, etc.) and typically connect to surrounding dimension tables via keys.",
      },
      {
        id: "600-3",
        domain: "Implement and manage semantic models",
        question:
          "Which storage mode should you choose for a Power BI semantic model when you need sub-second query performance over a very large fact table without importing all the data?",
        options: [
          { id: "a", text: "Import mode" },
          { id: "b", text: "DirectQuery mode" },
          { id: "c", text: "Direct Lake mode" },
          { id: "d", text: "Live Connection to Analysis Services" },
        ],
        correct: "c",
        explanation:
          "Direct Lake mode reads Delta tables directly from OneLake without a separate import step, giving near-Import performance without duplicating the data.",
      },
      {
        id: "600-4",
        domain: "Explore and analyze data",
        question:
          "Which DAX function would you use to calculate a running total of Sales across a date column?",
        options: [
          { id: "a", text: "CALCULATE with a filter on the date column" },
          { id: "b", text: "TOTALYTD" },
          { id: "c", text: "SUMX over a related table" },
          { id: "d", text: "ALLEXCEPT" },
        ],
        correct: "a",
        explanation:
          "A running total is typically built with CALCULATE combined with a filter such as FILTER(ALL('Date'), 'Date'[Date] <= MAX('Date'[Date])) to accumulate values up to the current date.",
      },
      {
        id: "600-5",
        domain: "Prepare data",
        question:
          "In a Fabric Lakehouse, what is the purpose of the SQL analytics endpoint?",
        options: [
          { id: "a", text: "It lets you run T-SQL read-only queries against Delta tables" },
          { id: "b", text: "It provides write access via stored procedures" },
          { id: "c", text: "It replaces the need for a semantic model" },
          { id: "d", text: "It is used only for streaming ingestion" },
        ],
        correct: "a",
        explanation:
          "The SQL analytics endpoint auto-generates a read-only, T-SQL-queryable layer over the Delta tables in a Lakehouse, so BI tools can query with familiar SQL.",
      },
      {
        id: "600-6",
        domain: "Implement and manage semantic models",
        question:
          "Which feature would you use to define reusable business logic and metrics centrally so they're consistent across multiple reports?",
        options: [
          { id: "a", text: "Calculation groups" },
          { id: "b", text: "Bookmarks" },
          { id: "c", text: "Q&A visual" },
          { id: "d", text: "Drillthrough pages" },
        ],
        correct: "a",
        explanation:
          "Calculation groups let you define reusable calculation logic (e.g. time intelligence variants) once and apply it across many measures, keeping metrics consistent.",
      },
      {
        id: "600-7",
        domain: "Explore and analyze data",
        question:
          "A stakeholder wants to type a natural-language question and get a chart back from a Power BI report. Which feature supports this?",
        options: [
          { id: "a", text: "Q&A visual" },
          { id: "b", text: "Paginated reports" },
          { id: "c", text: "Composite models" },
          { id: "d", text: "Deployment pipelines" },
        ],
        correct: "a",
        explanation:
          "The Q&A visual lets users type natural-language questions against the semantic model and returns an auto-generated visual as the answer.",
      },
      {
        id: "600-8",
        domain: "Implement and manage semantic models",
        question:
          "A Direct Lake on SQL semantic model has its DirectLakeBehavior property set to Automatic. What happens when a query can't meet Direct Lake conditions?",
        options: [
          { id: "a", text: "The query fails immediately with an error" },
          { id: "b", text: "The query silently falls back to DirectQuery mode, possibly with slower performance" },
          { id: "c", text: "The report stops refreshing until the issue is fixed" },
          { id: "d", text: "The semantic model automatically switches to Import mode" },
        ],
        correct: "b",
        explanation:
          "Automatic (the default) means the query silently falls back to DirectQuery mode when Direct Lake conditions aren't met, so reports keep working but may be slower — DirectLakeOnly would instead fail the query with an error.",
      },
      {
        id: "600-9",
        domain: "Implement and manage semantic models",
        question:
          "Which Direct Lake variant never falls back to DirectQuery and can combine Delta tables from multiple Fabric data sources in one semantic model?",
        options: [
          { id: "a", text: "Direct Lake on SQL" },
          { id: "b", text: "Direct Lake on OneLake" },
          { id: "c", text: "DirectQuery mode" },
          { id: "d", text: "Import mode" },
        ],
        correct: "b",
        explanation:
          "Direct Lake on OneLake runs exclusively in DirectLakeOnly mode with no DirectQuery fallback, and can use Delta tables from multiple Fabric data sources rather than being limited to a single lakehouse or warehouse.",
      },
      {
        id: "600-10",
        domain: "Implement and manage semantic models",
        question:
          "You need row-level security enforced consistently even when Direct Lake falls back to DirectQuery via the SQL analytics endpoint. Where should RLS be defined for the most reliable behavior?",
        options: [
          { id: "a", text: "Only in the semantic model, using a fixed identity cloud connection" },
          { id: "b", text: "Only as SQL RLS at the SQL analytics endpoint" },
          { id: "c", text: "RLS cannot be used with Direct Lake at all" },
          { id: "d", text: "Only inside individual report visuals" },
        ],
        correct: "a",
        explanation:
          "Semantic model RLS works with Direct Lake, but Microsoft recommends using a fixed identity cloud connection; note that tables with SQL RLS defined at the SQL analytics endpoint will always force a DirectQuery fallback for Direct Lake on SQL.",
      },
      {
        id: "600-11",
        domain: "Prepare data",
        question:
          "Which OneLake capability lets a workspace reference a table from another Fabric workspace or external storage without physically copying the data?",
        options: [
          { id: "a", text: "Mirroring" },
          { id: "b", text: "A OneLake shortcut" },
          { id: "c", text: "Dataflow Gen2 staging" },
          { id: "d", text: "Deployment pipeline promotion" },
        ],
        correct: "b",
        explanation:
          "A OneLake shortcut is a reference to data in another location — within the same workspace, another workspace, or external storage — that makes it appear local without copying it.",
      },
      {
        id: "600-12",
        domain: "Prepare data",
        question:
          "Your source data lives in an operational Azure SQL Database and you want it continuously synchronized into OneLake in near real time without building an ETL pipeline. What should you use?",
        options: [
          { id: "a", text: "A OneLake shortcut" },
          { id: "b", text: "Database mirroring" },
          { id: "c", text: "A paginated report" },
          { id: "d", text: "A calculation group" },
        ],
        correct: "b",
        explanation:
          "Database mirroring continuously replicates an external operational database like Azure SQL Database into OneLake in Delta format, without requiring a traditional ETL pipeline.",
      },
      {
        id: "600-13",
        domain: "Maintain a data analytics solution",
        question:
          "Which file type lets you create and manage a Power BI Desktop project for source control, as part of the analytics development lifecycle in Fabric?",
        options: [
          { id: "a", text: ".pbix" },
          { id: "b", text: ".pbip" },
          { id: "c", text: ".pbit" },
          { id: "d", text: ".pbids" },
        ],
        correct: "b",
        explanation:
          "A Power BI Desktop project (.pbip) is designed for source control and collaborative development, unlike the single-file .pbix format.",
      },
      {
        id: "600-14",
        domain: "Maintain a data analytics solution",
        question:
          "You want to deploy and manage a Fabric semantic model programmatically from an external tool like SSMS or a script. Which endpoint should you use?",
        options: [
          { id: "a", text: "The XMLA endpoint" },
          { id: "b", text: "The Q&A visual" },
          { id: "c", text: "The Real-Time Hub" },
          { id: "d", text: "The OneLake catalog" },
        ],
        correct: "a",
        explanation:
          "The XMLA endpoint allows semantic models to be deployed and managed programmatically using external tools such as SSMS, Tabular Editor, or scripts.",
      },
      {
        id: "600-15",
        domain: "Prepare data",
        question:
          "A colleague changes a lakehouse table that several downstream semantic models depend on. Which practice helps you understand what else might break before making the change?",
        options: [
          { id: "a", text: "Impact analysis of downstream dependencies" },
          { id: "b", text: "Dynamic format strings" },
          { id: "c", text: "Field parameters" },
          { id: "d", text: "Query folding" },
        ],
        correct: "a",
        explanation:
          "Performing impact analysis of downstream dependencies from lakehouses, warehouses, dataflows, and semantic models helps identify what else is affected before making a breaking change.",
      },
      {
        id: "600-16",
        domain: "Implement and manage semantic models",
        question:
          "Which DAX modeling feature standardises reusable, parameterised time-intelligence-style calculations that can be applied to many different measures at once?",
        options: [
          { id: "a", text: "Field parameters" },
          { id: "b", text: "Calculation groups" },
          { id: "c", text: "Dynamic format strings" },
          { id: "d", text: "Bridge tables" },
        ],
        correct: "b",
        explanation:
          "Calculation groups let you define reusable calculation logic — such as time-intelligence variants — once, and apply it consistently across many measures.",
      },
      {
        id: "600-17",
        domain: "Implement and manage semantic models",
        question:
          "Your semantic model has grown past 10 GB in the Power BI service and you're using XMLA-based tools for write operations. Which setting should you enable?",
        options: [
          { id: "a", text: "Large semantic model storage format" },
          { id: "b", text: "Field parameters" },
          { id: "c", text: "Direct Lake behavior" },
          { id: "d", text: "Dynamic data masking" },
        ],
        correct: "a",
        explanation:
          "Large semantic model storage format is required for models to grow beyond 10 GB, and enabling it also improves XMLA write performance even for models not considered particularly large.",
      },
      {
        id: "600-18",
        domain: "Implement and manage semantic models",
        question:
          "A semantic model contains some tables in Import mode and others in DirectQuery mode. What is this type of model called?",
        options: [
          { id: "a", text: "A dual model" },
          { id: "b", text: "A composite model" },
          { id: "c", text: "A thin report" },
          { id: "d", text: "A push model" },
        ],
        correct: "b",
        explanation:
          "A composite model is a semantic model containing tables in more than one storage mode, such as a mix of Import and DirectQuery tables.",
      },
      {
        id: "600-19",
        domain: "Implement and manage semantic models",
        question:
          "You convert a DirectQuery table to Import mode. Power BI offers to convert the remaining DirectQuery tables to which storage mode to help keep relationships regular?",
        options: [
          { id: "a", text: "Dual mode" },
          { id: "b", text: "Hybrid mode" },
          { id: "c", text: "Direct Lake mode" },
          { id: "d", text: "Live connect mode" },
        ],
        correct: "a",
        explanation:
          "Dual mode tables can behave as either Import or DirectQuery depending on the query context, which helps preserve regular relationships when mixing storage modes in a composite model.",
      },
      {
        id: "600-20",
        domain: "Prepare data",
        question:
          "Which Fabric feature lets business users discover existing data sources and streams across the organization before deciding how to bring data into their solution?",
        options: [
          { id: "a", text: "OneLake catalog and Real-Time hub" },
          { id: "b", text: "Deployment pipelines" },
          { id: "c", text: "Calculation groups" },
          { id: "d", text: "The XMLA endpoint" },
        ],
        correct: "a",
        explanation:
          "The OneLake catalog and Real-Time hub support discovery of data and streams already available across the Fabric estate, helping avoid duplicate ingestion.",
      },
      {
        id: "600-21",
        domain: "Maintain a data analytics solution",
        question:
          "You want to make a high-quality semantic model visible with priority in search and clearly labeled as reviewed by an authorized reviewer. Which endorsement badge fits?",
        options: [
          { id: "a", text: "Certified" },
          { id: "b", text: "Promoted only" },
          { id: "c", text: "No badge is needed" },
          { id: "d", text: "Draft" },
        ],
        correct: "a",
        explanation:
          "Certified means an organization-authorized reviewer has confirmed the item meets quality standards and is reliable — a stronger signal than Promoted, which any item owner with write access can apply.",
      },
      {
        id: "600-22",
        domain: "Maintain a data analytics solution",
        question:
          "Which reusable Power BI file lets you distribute a pre-built report/model structure without including the underlying data, so others start from a common template?",
        options: [
          { id: "a", text: ".pbit (Power BI template)" },
          { id: "b", text: ".pbids (Power BI data source)" },
          { id: "c", text: ".pbix" },
          { id: "d", text: ".pbip" },
        ],
        correct: "a",
        explanation:
          "A Power BI template (.pbit) packages the report and model structure without the data itself, letting others create new reports from a shared starting point.",
      },
      {
        id: "600-23",
        domain: "Maintain a data analytics solution",
        question:
          "Which file lets you predefine a connection to a specific data source so users can quickly start a new report against it, without sharing an entire model?",
        options: [
          { id: "a", text: ".pbids (Power BI data source)" },
          { id: "b", text: ".pbit" },
          { id: "c", text: ".pbix" },
          { id: "d", text: "model.bim" },
        ],
        correct: "a",
        explanation:
          "A .pbids file defines a data source connection so users can launch Power BI Desktop pointed at that source without needing a full template or shared model.",
      },
      {
        id: "600-24",
        domain: "Maintain a data analytics solution",
        question:
          "A shared semantic model is reused by several downstream reports. What is the benefit of connecting reports to it instead of building separate models each time?",
        options: [
          { id: "a", text: "Consistent metrics and definitions are reused across reports instead of being duplicated and potentially diverging" },
          { id: "b", text: "It removes the need for row-level security" },
          { id: "c", text: "It automatically certifies the model" },
          { id: "d", text: "It disables Direct Lake mode" },
        ],
        correct: "a",
        explanation:
          "Reusing a shared semantic model keeps business definitions and metrics consistent across reports, avoiding the drift that happens when each report builds its own separate model.",
      },
      {
        id: "600-25",
        domain: "Prepare data",
        question:
          "You need to establish a reusable connection to a source system before building any transformations. What is this first step called?",
        options: [
          { id: "a", text: "Creating a data connection" },
          { id: "b", text: "Applying a calculation group" },
          { id: "c", text: "Enabling Direct Lake" },
          { id: "d", text: "Publishing a deployment pipeline" },
        ],
        correct: "a",
        explanation:
          "Creating a data connection establishes how Fabric authenticates and connects to a source system, which is the prerequisite before ingesting or transforming any data from it.",
      },
      {
        id: "600-26",
        domain: "Prepare data",
        question:
          "You need Eventhouse data available for consumption by other Fabric experiences like Power BI and notebooks without duplicating it. What enables this?",
        options: [
          { id: "a", text: "OneLake integration for Eventhouse, reflecting data as one logical copy" },
          { id: "b", text: "Manually exporting KQL results to CSV" },
          { id: "c", text: "Creating a separate Warehouse and copying the data" },
          { id: "d", text: "Disabling the SQL analytics endpoint" },
        ],
        correct: "a",
        explanation:
          "Eventhouse data integrates with OneLake as one logical copy, so it can be consumed by Power BI, notebooks, and other Fabric experiences without physically duplicating the data.",
      },
      {
        id: "600-27",
        domain: "Prepare data",
        question:
          "Which T-SQL object encapsulates a repeatable multi-step data preparation task, such as a series of inserts and updates, so it can be called with a single command?",
        options: [
          { id: "a", text: "A stored procedure" },
          { id: "b", text: "A view" },
          { id: "c", text: "A function" },
          { id: "d", text: "A field parameter" },
        ],
        correct: "a",
        explanation:
          "A stored procedure encapsulates repeatable, potentially multi-step operational logic, letting it be executed as a single named call rather than re-writing the same statements each time.",
      },
      {
        id: "600-28",
        domain: "Prepare data",
        question:
          "Which T-SQL object standardises a reusable, read-only query — such as a common join and filter — so multiple consumers reference the same logic?",
        options: [
          { id: "a", text: "A view" },
          { id: "b", text: "A stored procedure" },
          { id: "c", text: "A trigger" },
          { id: "d", text: "A calculation group" },
        ],
        correct: "a",
        explanation:
          "A view standardizes a reusable SELECT query — joins, filters, and column selections — so multiple consumers can reference the same consistent logic instead of duplicating it.",
      },
      {
        id: "600-29",
        domain: "Prepare data",
        question:
          "You want to enrich a lakehouse table by adding a calculated column derived from two existing columns. What kind of transformation is this?",
        options: [
          { id: "a", text: "Data enrichment (adding new columns or tables)" },
          { id: "b", text: "Denormalization" },
          { id: "c", text: "Endorsement" },
          { id: "d", text: "Mirroring" },
        ],
        correct: "a",
        explanation:
          "Enrichment means adding new columns or tables — such as a calculated column derived from existing data — to increase the analytical value of a dataset.",
      },
      {
        id: "600-30",
        domain: "Prepare data",
        question:
          "You are designing a lakehouse's Gold layer for reporting and want fast, well-understood joins between a large fact table and descriptive dimension tables. Which structure should you implement?",
        options: [
          { id: "a", text: "A star schema" },
          { id: "b", text: "A single flat unindexed table" },
          { id: "c", text: "A fully normalized third-normal-form schema" },
          { id: "d", text: "A KQL database" },
        ],
        correct: "a",
        explanation:
          "A star schema — a fact table connected directly to denormalized dimension tables — is the standard structure for fast, understandable reporting queries in a Gold layer or warehouse.",
      },
      {
        id: "600-31",
        domain: "Prepare data",
        question:
          "Two source tables use different column names and formats for the same customer identifier. Before you can join them reliably, what should you do first?",
        options: [
          { id: "a", text: "Convert column data types and standardise/align the identifier columns" },
          { id: "b", text: "Apply a sensitivity label to both tables" },
          { id: "c", text: "Enable Direct Lake mode" },
          { id: "d", text: "Create a calculation group" },
        ],
        correct: "a",
        explanation:
          "Before merging or joining data reliably, you typically need to convert data types and align formats so that matching values (like a shared identifier) actually correspond across the two sources.",
      },
      {
        id: "600-32",
        domain: "Prepare data",
        question:
          "A source table has some rows with NULL in a required 'Region' column. Which category of data quality issue does this represent?",
        options: [
          { id: "a", text: "Missing data / null values" },
          { id: "b", text: "Duplicate data" },
          { id: "c", text: "Late-arriving data" },
          { id: "d", text: "Data skew" },
        ],
        correct: "a",
        explanation:
          "NULL values in a required column represent missing data, which needs identification and a resolution strategy — such as default values, exclusion, or flagging — before reliable analysis.",
      },
      {
        id: "600-33",
        domain: "Prepare data",
        question:
          "You need to summarise total sales by product category from a large fact table before loading it into a reporting layer. Which operation are you performing?",
        options: [
          { id: "a", text: "Aggregation" },
          { id: "b", text: "Partitioning" },
          { id: "c", text: "Mirroring" },
          { id: "d", text: "Endorsement" },
        ],
        correct: "a",
        explanation:
          "Aggregating data — summarizing values like totals or counts, often grouped by a dimension such as category — reduces granularity to the level needed for reporting.",
      },
      {
        id: "600-34",
        domain: "Prepare data",
        question:
          "In the Fabric Visual Query Editor, what is the primary benefit compared to writing raw SQL by hand?",
        options: [
          { id: "a", text: "A no-code canvas builds filters, joins, and aggregations, generating the SQL automatically" },
          { id: "b", text: "It only works with KQL, not SQL" },
          { id: "c", text: "It replaces the need for a semantic model entirely" },
          { id: "d", text: "It can only be used for streaming data" },
        ],
        correct: "a",
        explanation:
          "The Visual Query Editor provides a no-code canvas for building queries — filtering, joining, aggregating — and generates the underlying SQL automatically, useful for less SQL-fluent users.",
      },
      {
        id: "600-35",
        domain: "Prepare data",
        question:
          "You need to filter and aggregate high-velocity time-series data stored in an Eventhouse. Which query language should you use?",
        options: [
          { id: "a", text: "KQL" },
          { id: "b", text: "DAX" },
          { id: "c", text: "M / Power Query" },
          { id: "d", text: "PL/SQL" },
        ],
        correct: "a",
        explanation:
          "KQL (Kusto Query Language) is the native, optimized language for filtering and aggregating time-series and event data stored in an Eventhouse's KQL database.",
      },
      {
        id: "600-36",
        domain: "Implement and manage semantic models",
        question:
          "You are modeling many-to-many relationships between two dimension tables that don't share a direct key. Which modeling technique commonly resolves this?",
        options: [
          { id: "a", text: "A bridge table" },
          { id: "b", text: "A calculation group" },
          { id: "c", text: "Dynamic data masking" },
          { id: "d", text: "V-Order" },
        ],
        correct: "a",
        explanation:
          "A bridge table sits between two tables to resolve many-to-many relationships, avoiding ambiguous filter propagation that a direct many-to-many relationship can cause.",
      },
      {
        id: "600-37",
        domain: "Implement and manage semantic models",
        question:
          "Which type of DAX function, like SUMX or AVERAGEX, evaluates an expression row-by-row over a table before aggregating the result?",
        options: [
          { id: "a", text: "An iterator function" },
          { id: "b", text: "A table filtering function" },
          { id: "c", text: "An information function" },
          { id: "d", text: "A time intelligence function" },
        ],
        correct: "a",
        explanation:
          "Iterator functions (those ending in X, like SUMX and AVERAGEX) evaluate a given expression for each row of a table and then aggregate the row-level results.",
      },
      {
        id: "600-38",
        domain: "Implement and manage semantic models",
        question:
          "Which DAX function family, such as FILTER or ALL, is used to modify or override the filter context applied to a table before a calculation runs?",
        options: [
          { id: "a", text: "Table filtering functions" },
          { id: "b", text: "Windowing functions" },
          { id: "c", text: "Information functions" },
          { id: "d", text: "Text functions" },
        ],
        correct: "a",
        explanation:
          "Table filtering functions like FILTER and ALL modify or remove filter context on a table, which is foundational to writing calculations like running totals or year-over-year comparisons.",
      },
      {
        id: "600-39",
        domain: "Implement and manage semantic models",
        question:
          "You want a measure to rank products by sales within each category, referencing preceding or following rows in a sorted result. Which DAX function category applies?",
        options: [
          { id: "a", text: "Windowing functions" },
          { id: "b", text: "Information functions" },
          { id: "c", text: "Iterator functions only" },
          { id: "d", text: "Table constructor functions" },
        ],
        correct: "a",
        explanation:
          "Windowing functions (such as those used with OFFSET/rank-style logic) operate over an ordered set of rows, letting a calculation reference preceding or following rows relative to the current one.",
      },
      {
        id: "600-40",
        domain: "Implement and manage semantic models",
        question:
          "A DAX measure needs to check whether a column contains a BLANK value before performing a calculation, to avoid errors. Which function category helps here?",
        options: [
          { id: "a", text: "Information functions, such as ISBLANK" },
          { id: "b", text: "Windowing functions" },
          { id: "c", text: "Calculation groups" },
          { id: "d", text: "Field parameters" },
        ],
        correct: "a",
        explanation:
          "Information functions like ISBLANK, ISERROR, and HASONEVALUE return details about a value or context, commonly used to guard calculations against unexpected blanks or errors.",
      },
      {
        id: "600-41",
        domain: "Implement and manage semantic models",
        question:
          "You want a measure's displayed format to switch between currency and percentage depending on which metric a user selects in a slicer. Which feature supports this?",
        options: [
          { id: "a", text: "Dynamic format strings" },
          { id: "b", text: "Bridge tables" },
          { id: "c", text: "Row-level security" },
          { id: "d", text: "Incremental refresh" },
        ],
        correct: "a",
        explanation:
          "Dynamic format strings let a single measure's display format change based on context, such as switching between currency and percentage depending on a user's slicer selection.",
      },
      {
        id: "600-42",
        domain: "Implement and manage semantic models",
        question:
          "You want users to switch which measure or column a visual displays via a slicer, without duplicating visuals for each option. Which feature enables this?",
        options: [
          { id: "a", text: "Field parameters" },
          { id: "b", text: "Calculation groups" },
          { id: "c", text: "Composite models" },
          { id: "d", text: "Mirroring" },
        ],
        correct: "a",
        explanation:
          "Field parameters let report users dynamically switch which fields or measures a visual uses via a slicer, avoiding the need to build a separate visual for every combination.",
      },
      {
        id: "600-43",
        domain: "Implement and manage semantic models",
        question:
          "A report visual is slow because it triggers many separate DAX queries for each data point. Which technique most directly reduces this kind of query overhead?",
        options: [
          { id: "a", text: "Simplifying the visual or combining queries to reduce the number of separate DAX requests" },
          { id: "b", text: "Enabling dynamic data masking" },
          { id: "c", text: "Increasing the model's row-level security complexity" },
          { id: "d", text: "Switching to a bridge table" },
        ],
        correct: "a",
        explanation:
          "Reducing the number of separate DAX queries a visual generates — by simplifying visuals or consolidating requests — is a core technique for improving report visual performance.",
      },
      {
        id: "600-44",
        domain: "Implement and manage semantic models",
        question:
          "A complex DAX measure is slow. Using DAX Studio, you find most of the time is spent in the storage engine rather than the formula engine. What does this suggest?",
        options: [
          { id: "a", text: "The bottleneck is likely data volume or scan efficiency, not the DAX formula's logical complexity" },
          { id: "b", text: "The measure has a syntax error" },
          { id: "c", text: "Row-level security is misconfigured" },
          { id: "d", text: "The model needs a bridge table" },
        ],
        correct: "a",
        explanation:
          "High storage engine time usually points to how much data is being scanned or how efficiently it's being retrieved, rather than the complexity of the DAX formula logic itself (formula engine time).",
      },
      {
        id: "600-45",
        domain: "Implement and manage semantic models",
        question:
          "You want a large Import-mode fact table to only reprocess recent data on each scheduled refresh instead of reloading the entire table. What should you configure?",
        options: [
          { id: "a", text: "Incremental refresh" },
          { id: "b", text: "Dynamic format strings" },
          { id: "c", text: "A bridge table" },
          { id: "d", text: "Query acceleration" },
        ],
        correct: "a",
        explanation:
          "Incremental refresh partitions a table by date ranges and only reprocesses recent partitions on each refresh, dramatically reducing refresh time and resource use for large fact tables.",
      },
      {
        id: "600-46",
        domain: "Implement and manage semantic models",
        question:
          "You choose Direct Lake on SQL analytics endpoint over Direct Lake on OneLake. Which capability becomes available as a result?",
        options: [
          { id: "a", text: "Delegated SQL analytics endpoint security (RLS/CLS/OLS) applied through the endpoint" },
          { id: "b", text: "Guaranteed no DirectQuery fallback under any condition" },
          { id: "c", text: "Support for combining Delta tables from multiple unrelated Fabric items" },
          { id: "d", text: "Calculated columns become fully supported" },
        ],
        correct: "a",
        explanation:
          "Direct Lake on SQL depends on security rules defined at the SQL analytics endpoint (RLS, CLS, OLS) via delegated identity, which Direct Lake on OneLake does not use in the same way.",
      },
      {
        id: "600-47",
        domain: "Maintain a data analytics solution",
        question:
          "Which access control lets you grant a user permission to just one lakehouse item without giving them broader workspace collaboration rights?",
        options: [
          { id: "a", text: "Item-level access control" },
          { id: "b", text: "Workspace-level access control" },
          { id: "c", text: "A sensitivity label" },
          { id: "d", text: "A deployment pipeline" },
        ],
        correct: "a",
        explanation:
          "Item-level access control grants targeted permission to a single item, such as one lakehouse, without extending broader collaboration rights across the entire workspace.",
      },
      {
        id: "600-48",
        domain: "Maintain a data analytics solution",
        question:
          "You need to block a specific business unit's users from seeing rows belonging to other business units in a shared semantic model. Which control fits best?",
        options: [
          { id: "a", text: "Row-level security" },
          { id: "b", text: "Column-level security" },
          { id: "c", text: "Object-level security" },
          { id: "d", text: "File-level access control" },
        ],
        correct: "a",
        explanation:
          "Row-level security filters which rows a user can see based on their identity or role, which is the right control for restricting visibility to specific business units within a shared model.",
      },
      {
        id: "600-49",
        domain: "Maintain a data analytics solution",
        question:
          "You need to entirely hide a sensitive table (not just some rows or columns) from a group of users in the semantic model. Which control fits best?",
        options: [
          { id: "a", text: "Object-level security" },
          { id: "b", text: "Row-level security" },
          { id: "c", text: "Dynamic data masking" },
          { id: "d", text: "Incremental refresh" },
        ],
        correct: "a",
        explanation:
          "Object-level security hides entire tables or columns from specified users, unlike row-level security (which filters rows) or masking (which obscures values but doesn't hide the object).",
      },
      {
        id: "600-50",
        domain: "Maintain a data analytics solution",
        question:
          "A file stored in a lakehouse's Files section needs to be restricted so only certain users can read it, without restricting the rest of the lakehouse. Which control applies?",
        options: [
          { id: "a", text: "File-level access control" },
          { id: "b", text: "Row-level security" },
          { id: "c", text: "Calculation groups" },
          { id: "d", text: "Field parameters" },
        ],
        correct: "a",
        explanation:
          "File-level (and folder-level) access control lets you restrict access to specific files or folders within a lakehouse without changing access to the rest of the item.",
      },
      {
        id: "600-51",
        domain: "Maintain a data analytics solution",
        question:
          "Before merging a feature branch into your workspace's connected Git repository, you want teammates to review the changes. What Fabric lifecycle practice supports this?",
        options: [
          { id: "a", text: "Committing to a feature branch and opening a pull request before merging" },
          { id: "b", text: "Skipping Git integration and editing directly in the shared workspace" },
          { id: "c", text: "Disabling version control for the workspace" },
          { id: "d", text: "Applying a sensitivity label to the branch" },
        ],
        correct: "a",
        explanation:
          "Developing in a feature branch, committing changes, and opening a pull request for review before merging into main is the standard Git-based workflow for safe collaborative development.",
      },
      {
        id: "600-52",
        domain: "Maintain a data analytics solution",
        question:
          "You need to promote validated content from a Test workspace to Production without manually recreating every item. Which Fabric capability handles this?",
        options: [
          { id: "a", text: "A deployment pipeline" },
          { id: "b", text: "A OneLake shortcut" },
          { id: "c", text: "A calculation group" },
          { id: "d", text: "Sensitivity labels" },
        ],
        correct: "a",
        explanation:
          "Deployment pipelines promote validated content across lifecycle stages — such as Test to Production — cloning or updating the supported items in the target workspace automatically.",
      },
    ],
  },
  "AZ-900": {
    label: "Azure Fundamentals",
    questions: [
      { id: "az900-1", domain: "Describe cloud concepts", question: "Which model means the cloud provider secures the physical datacenter while the customer remains responsible for securing their data and access?", options: [{ id: "a", text: "The shared responsibility model" }, { id: "b", text: "The Zero Trust model" }, { id: "c", text: "The consumption-based model" }, { id: "d", text: "The defense-in-depth model" }], correct: "a", explanation: "The shared responsibility model divides security duties between the cloud provider (physical infrastructure, host security) and the customer (data, identities, access), with the split varying by service type." },
      { id: "az900-2", domain: "Describe cloud concepts", question: "A company wants full control over hardware and networking for compliance reasons, while another workload can run entirely in the public cloud. Which model combines both approaches?", options: [{ id: "a", text: "Public cloud" }, { id: "b", text: "Private cloud" }, { id: "c", text: "Hybrid cloud" }, { id: "d", text: "Community cloud" }], correct: "c", explanation: "A hybrid cloud combines private/on-premises infrastructure with public cloud resources, letting an organization keep some workloads on-prem while running others in the cloud." },
      { id: "az900-3", domain: "Describe cloud concepts", question: "Which pricing model charges customers only for the resources they actually use, rather than a fixed upfront cost?", options: [{ id: "a", text: "Consumption-based model" }, { id: "b", text: "Capital expenditure model" }, { id: "c", text: "Perpetual licensing" }, { id: "d", text: "Fixed subscription only" }], correct: "a", explanation: "The consumption-based (pay-as-you-go) model charges for actual resource usage, shifting spending from capital expenditure (CapEx) to operational expenditure (OpEx)." },
      { id: "az900-4", domain: "Describe cloud concepts", question: "Which cloud service type gives you the most control over the operating system and installed software, while the provider manages the physical hardware?", options: [{ id: "a", text: "SaaS" }, { id: "b", text: "PaaS" }, { id: "c", text: "IaaS" }, { id: "d", text: "FaaS only" }], correct: "c", explanation: "Infrastructure as a Service (IaaS) gives customers control over the OS, storage, and applications while the provider manages physical hardware, networking, and virtualization." },
      { id: "az900-5", domain: "Describe cloud concepts", question: "A developer wants to deploy code without provisioning or managing any servers, and only pay when the code executes. Which cloud service type fits best?", options: [{ id: "a", text: "IaaS" }, { id: "b", text: "PaaS with serverless (e.g. Azure Functions)" }, { id: "c", text: "SaaS" }, { id: "d", text: "On-premises hosting" }], correct: "b", explanation: "Serverless compute, a PaaS-style offering like Azure Functions, lets developers run code without managing servers, scaling automatically and billing based on execution." },
      { id: "az900-6", domain: "Describe cloud concepts", question: "Which benefit of cloud computing refers to a system's ability to handle increased load by adding resources automatically or on demand?", options: [{ id: "a", text: "Scalability" }, { id: "b", text: "High availability" }, { id: "c", text: "Fault tolerance" }, { id: "d", text: "Disaster recovery" }], correct: "a", explanation: "Scalability is the ability to increase or decrease resources to match demand, whether by scaling up (bigger resources) or scaling out (more instances)." },
      { id: "az900-7", domain: "Describe cloud concepts", question: "Which term describes a cloud application's ability to continue functioning, and recover quickly, in the face of failures?", options: [{ id: "a", text: "Reliability" }, { id: "b", text: "Elasticity" }, { id: "c", text: "Serverless" }, { id: "d", text: "Consumption-based pricing" }], correct: "a", explanation: "Reliability describes a system's ability to recover from failures and continue functioning, which cloud platforms support through redundancy and automated recovery." },
      { id: "az900-8", domain: "Describe Azure architecture and services", question: "Which Azure concept represents a set of datacenters deployed within a defined perimeter, connected via a low-latency network?", options: [{ id: "a", text: "A region" }, { id: "b", text: "A resource group" }, { id: "c", text: "A management group" }, { id: "d", text: "An availability zone" }], correct: "a", explanation: "An Azure region is a geographic area containing one or more datacenters, connected through a dedicated low-latency network." },
      { id: "az900-9", domain: "Describe Azure architecture and services", question: "Which Azure feature provides physically separate datacenters within a region, each with independent power, cooling, and networking, to protect against datacenter-level failures?", options: [{ id: "a", text: "Availability zones" }, { id: "b", text: "Region pairs" }, { id: "c", text: "Resource groups" }, { id: "d", text: "Management groups" }], correct: "a", explanation: "Availability zones are physically separate locations within a region, each with independent power, cooling, and networking, protecting applications from datacenter-level failures." },
      { id: "az900-10", domain: "Describe Azure architecture and services", question: "Which Azure organizational unit is a logical container that holds related resources, such as a VM, its storage, and its networking, for lifecycle management?", options: [{ id: "a", text: "A resource group" }, { id: "b", text: "A subscription" }, { id: "c", text: "A management group" }, { id: "d", text: "A region" }], correct: "a", explanation: "A resource group is a logical container for resources that share the same lifecycle, permissions, and policies, making them easier to manage together." },
      { id: "az900-11", domain: "Describe Azure architecture and services", question: "Which Azure construct sits above subscriptions in the hierarchy and lets you apply policies or access controls across multiple subscriptions at once?", options: [{ id: "a", text: "A management group" }, { id: "b", text: "A resource group" }, { id: "c", text: "An availability set" }, { id: "d", text: "A region pair" }], correct: "a", explanation: "Management groups sit above subscriptions in the Azure hierarchy, letting you apply governance conditions (like Azure Policy or RBAC) across many subscriptions at once." },
      { id: "az900-12", domain: "Describe Azure architecture and services", question: "Which billing and access boundary in Azure defines a unit tied to an account, under which resource groups and resources are created?", options: [{ id: "a", text: "A subscription" }, { id: "b", text: "A resource group" }, { id: "c", text: "A region" }, { id: "d", text: "A tenant only" }], correct: "a", explanation: "A subscription is a billing and access-management boundary that logically associates user accounts with the resources they create, sitting between management groups and resource groups." },
      { id: "az900-13", domain: "Describe Azure architecture and services", question: "Which Azure compute option automatically increases or decreases the number of identical VM instances to match demand?", options: [{ id: "a", text: "Azure Virtual Machine Scale Sets" }, { id: "b", text: "Availability sets" }, { id: "c", text: "Azure Virtual Desktop" }, { id: "d", text: "A single standalone VM" }], correct: "a", explanation: "Virtual Machine Scale Sets let you deploy and manage a group of identical, load-balanced VMs, automatically increasing or decreasing instance count based on demand or a schedule." },
      { id: "az900-14", domain: "Describe Azure architecture and services", question: "Which Azure feature groups VMs across multiple fault domains and update domains to reduce the chance of correlated failures affecting an entire application?", options: [{ id: "a", text: "Availability sets" }, { id: "b", text: "Resource groups" }, { id: "c", text: "Management groups" }, { id: "d", text: "Region pairs" }], correct: "a", explanation: "Availability sets distribute VMs across multiple fault domains (separate hardware) and update domains (separate maintenance windows), reducing the chance of a single failure or update taking down the whole application." },
      { id: "az900-15", domain: "Describe Azure architecture and services", question: "Which compute option lets you package an application with its dependencies for consistent deployment across environments, typically using less overhead than a full VM?", options: [{ id: "a", text: "Containers" }, { id: "b", text: "Availability sets" }, { id: "c", text: "Azure DNS" }, { id: "d", text: "Azure ExpressRoute" }], correct: "a", explanation: "Containers package an application and its dependencies together, running with less overhead than a full VM since they share the host OS kernel, while still providing environment consistency." },
      { id: "az900-16", domain: "Describe Azure architecture and services", question: "Which Azure networking service allows two virtual networks to communicate with each other directly over the Microsoft backbone, without traversing the public internet?", options: [{ id: "a", text: "VNet peering" }, { id: "b", text: "Azure DNS" }, { id: "c", text: "Azure VPN Gateway" }, { id: "d", text: "Azure ExpressRoute" }], correct: "a", explanation: "Virtual network (VNet) peering connects two Azure virtual networks so resources in each can communicate directly over the Microsoft backbone network, without public internet exposure." },
      { id: "az900-17", domain: "Describe Azure architecture and services", question: "Which Azure service provides a private, dedicated connection from an on-premises network to Azure, bypassing the public internet entirely?", options: [{ id: "a", text: "Azure ExpressRoute" }, { id: "b", text: "Azure DNS" }, { id: "c", text: "VNet peering" }, { id: "d", text: "Azure CDN" }], correct: "a", explanation: "Azure ExpressRoute provides a private, dedicated connection between on-premises infrastructure and Azure, avoiding the public internet for improved reliability, speed, and security." },
      { id: "az900-18", domain: "Describe Azure architecture and services", question: "Which Azure networking service establishes an encrypted connection over the public internet between an on-premises network and Azure?", options: [{ id: "a", text: "Azure VPN Gateway" }, { id: "b", text: "Azure ExpressRoute" }, { id: "c", text: "Azure DNS" }, { id: "d", text: "Azure Firewall only" }], correct: "a", explanation: "Azure VPN Gateway creates an encrypted tunnel over the public internet between on-premises networks (or other VNets) and Azure, unlike ExpressRoute which uses a private dedicated connection." },
      { id: "az900-19", domain: "Describe Azure architecture and services", question: "A resource needs a publicly reachable address so external clients can connect to it over the internet. Which type of endpoint does it need?", options: [{ id: "a", text: "A public endpoint" }, { id: "b", text: "A private endpoint" }, { id: "c", text: "A resource group" }, { id: "d", text: "A management group" }], correct: "a", explanation: "A public endpoint has a publicly reachable IP address, allowing external clients to connect over the internet; a private endpoint instead uses a private IP within a VNet." },
      { id: "az900-20", domain: "Describe Azure architecture and services", question: "Which Azure Storage service is designed for storing large amounts of unstructured data, such as images, videos, and documents, accessible via HTTP/HTTPS?", options: [{ id: "a", text: "Azure Blob storage" }, { id: "b", text: "Azure Table storage" }, { id: "c", text: "Azure Queue storage" }, { id: "d", text: "Azure Files" }], correct: "a", explanation: "Azure Blob storage is optimized for storing massive amounts of unstructured data such as images, videos, and documents, accessible over HTTP/HTTPS." },
      { id: "az900-21", domain: "Describe Azure architecture and services", question: "A team wants a fully managed file share accessible via the standard SMB protocol, mountable from both cloud and on-premises machines. Which service fits?", options: [{ id: "a", text: "Azure Files" }, { id: "b", text: "Azure Blob storage" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure Queue storage" }], correct: "a", explanation: "Azure Files provides fully managed file shares accessible via the SMB (and NFS) protocol, mountable from Windows, Linux, and macOS, both in the cloud and on-premises." },
      { id: "az900-22", domain: "Describe Azure architecture and services", question: "Which storage tier is designed for data that is rarely accessed and can tolerate several hours of retrieval latency, at the lowest storage cost?", options: [{ id: "a", text: "Archive tier" }, { id: "b", text: "Hot tier" }, { id: "c", text: "Cool tier" }, { id: "d", text: "Premium tier" }], correct: "a", explanation: "The Archive tier offers the lowest storage cost but highest retrieval latency (hours), suited for data accessed rarely and tolerant of delayed retrieval, such as long-term backups." },
      { id: "az900-23", domain: "Describe Azure architecture and services", question: "Which redundancy option synchronously replicates data across three availability zones within a region, protecting against a datacenter-level outage?", options: [{ id: "a", text: "Zone-redundant storage (ZRS)" }, { id: "b", text: "Locally redundant storage (LRS)" }, { id: "c", text: "Geo-redundant storage (GRS) only" }, { id: "d", text: "No redundancy" }], correct: "a", explanation: "Zone-redundant storage (ZRS) synchronously replicates data across three availability zones in a region, protecting against a single datacenter failure while LRS only replicates within one datacenter." },
      { id: "az900-24", domain: "Describe Azure architecture and services", question: "Which tool is designed for fast, high-throughput command-line copying of data into and out of Azure Blob storage or Azure Files?", options: [{ id: "a", text: "AzCopy" }, { id: "b", text: "Azure Storage Explorer" }, { id: "c", text: "Azure File Sync" }, { id: "d", text: "Azure Data Box" }], correct: "a", explanation: "AzCopy is a command-line utility optimized for fast, high-throughput data transfer into and out of Azure Storage." },
      { id: "az900-25", domain: "Describe Azure architecture and services", question: "An organization needs to migrate hundreds of terabytes of on-premises data to Azure, but their internet bandwidth would take months. Which service is designed for this?", options: [{ id: "a", text: "Azure Data Box" }, { id: "b", text: "Azure DNS" }, { id: "c", text: "Azure VPN Gateway" }, { id: "d", text: "AzCopy" }], correct: "a", explanation: "Azure Data Box is a physical device Microsoft ships to your site so you can load large volumes of data offline and ship it back, bypassing slow network transfer for massive migrations." },
      { id: "az900-26", domain: "Describe Azure architecture and services", question: "Which Azure identity service is the cloud-based directory used for authentication and access management, replacing what was formerly called Azure AD?", options: [{ id: "a", text: "Microsoft Entra ID" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Azure Resource Manager" }, { id: "d", text: "Azure Monitor" }], correct: "a", explanation: "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service used for authentication across Azure and Microsoft 365." },
      { id: "az900-27", domain: "Describe Azure architecture and services", question: "Which authentication method requires users to provide two or more verification factors, such as a password plus a mobile app approval, to gain access?", options: [{ id: "a", text: "Multifactor authentication (MFA)" }, { id: "b", text: "Single sign-on (SSO)" }, { id: "c", text: "Passwordless authentication" }, { id: "d", text: "Conditional Access" }], correct: "a", explanation: "Multifactor authentication (MFA) requires two or more independent verification factors, significantly increasing security compared to a password alone." },
      { id: "az900-28", domain: "Describe Azure architecture and services", question: "Which feature lets a user authenticate once and then access multiple applications without re-entering credentials for each one?", options: [{ id: "a", text: "Single sign-on (SSO)" }, { id: "b", text: "Multifactor authentication" }, { id: "c", text: "Role-based access control" }, { id: "d", text: "Resource locks" }], correct: "a", explanation: "Single sign-on (SSO) lets a user authenticate once and gain access to multiple related applications and resources without needing to sign in again for each." },
      { id: "az900-29", domain: "Describe Azure architecture and services", question: "Which Azure security feature evaluates signals (like user location or device state) to enforce policies, such as requiring MFA only when a sign-in looks risky?", options: [{ id: "a", text: "Microsoft Entra Conditional Access" }, { id: "b", text: "Azure role-based access control" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "Resource locks" }], correct: "a", explanation: "Conditional Access evaluates signals like user location, device compliance, and risk level to enforce access policies dynamically, such as requiring MFA only under certain conditions." },
      { id: "az900-30", domain: "Describe Azure architecture and services", question: "Which Azure feature grants permissions to users, groups, or applications based on their assigned role, scoped to a management group, subscription, resource group, or resource?", options: [{ id: "a", text: "Azure role-based access control (RBAC)" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Resource locks" }, { id: "d", text: "Microsoft Purview" }], correct: "a", explanation: "Azure RBAC assigns permissions to identities based on roles (like Reader, Contributor, Owner), scoped at various levels of the Azure resource hierarchy." },
      { id: "az900-31", domain: "Describe Azure architecture and services", question: "Which security principle assumes breach and requires explicit verification of every access request, rather than trusting anything inside a network perimeter by default?", options: [{ id: "a", text: "Zero Trust" }, { id: "b", text: "Shared responsibility model" }, { id: "c", text: "Consumption-based model" }, { id: "d", text: "Defense-in-depth" }], correct: "a", explanation: "Zero Trust operates on the principle of 'never trust, always verify' — explicitly validating every access request rather than assuming trust based on network location." },
      { id: "az900-32", domain: "Describe Azure architecture and services", question: "Which security strategy layers multiple defensive measures (physical, identity, network, application, data) so that if one layer is breached, others still provide protection?", options: [{ id: "a", text: "Defense-in-depth" }, { id: "b", text: "Zero Trust" }, { id: "c", text: "Single sign-on" }, { id: "d", text: "Resource locks" }], correct: "a", explanation: "Defense-in-depth layers multiple security controls across physical, identity, perimeter, network, compute, application, and data layers, so a single point of failure doesn't compromise the whole system." },
      { id: "az900-33", domain: "Describe Azure architecture and services", question: "Which Azure service provides unified security management and advanced threat protection across hybrid cloud workloads?", options: [{ id: "a", text: "Microsoft Defender for Cloud" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Service Health" }, { id: "d", text: "Azure Monitor" }], correct: "a", explanation: "Microsoft Defender for Cloud provides unified security posture management and threat protection across Azure, hybrid, and multicloud workloads." },
      { id: "az900-34", domain: "Describe Azure management and governance", question: "Which factor most directly affects the cost of an Azure virtual machine besides its size?", options: [{ id: "a", text: "Region, and whether it runs continuously or is deallocated when idle" }, { id: "b", text: "The name given to the resource group" }, { id: "c", text: "The number of tags applied" }, { id: "d", text: "The subscription's display name" }], correct: "a", explanation: "VM cost is affected by factors like region (pricing varies by location), VM size/type, and usage duration — a VM billed while running costs more than one properly deallocated when idle." },
      { id: "az900-35", domain: "Describe Azure management and governance", question: "Which tool helps you estimate the cost of Azure services before deploying them, based on your expected configuration?", options: [{ id: "a", text: "The Azure pricing calculator" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "Azure Monitor" }], correct: "a", explanation: "The Azure pricing calculator lets you estimate costs for Azure products and services based on your planned configuration, before you actually deploy anything." },
      { id: "az900-36", domain: "Describe Azure management and governance", question: "Which Azure feature lets you attach metadata, like 'CostCenter' or 'Environment', to resources for organizing and reporting on spending?", options: [{ id: "a", text: "Tags" }, { id: "b", text: "Resource locks" }, { id: "c", text: "Management groups" }, { id: "d", text: "Availability zones" }], correct: "a", explanation: "Tags are name/value pairs attached to resources that help organize, categorize, and report on resources — commonly used to track cost by department, project, or environment." },
      { id: "az900-37", domain: "Describe Azure management and governance", question: "Which Azure governance service enforces organizational standards by evaluating resources for compliance and can block non-compliant deployments?", options: [{ id: "a", text: "Azure Policy" }, { id: "b", text: "Azure Monitor" }, { id: "c", text: "Azure Advisor" }, { id: "d", text: "Microsoft Purview" }], correct: "a", explanation: "Azure Policy evaluates resources against defined rules (like 'only allow VMs in specific regions') and can audit, deny, or remediate non-compliant resources." },
      { id: "az900-38", domain: "Describe Azure management and governance", question: "Which Azure feature prevents a critical resource from being accidentally deleted or modified, regardless of a user's RBAC permissions?", options: [{ id: "a", text: "A resource lock" }, { id: "b", text: "A tag" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "A management group" }], correct: "a", explanation: "Resource locks (CanNotDelete or ReadOnly) prevent accidental deletion or modification of critical resources, overriding what a user's RBAC role would otherwise allow." },
      { id: "az900-39", domain: "Describe Azure management and governance", question: "Which Azure service helps organizations discover, classify, and govern sensitive data across their estate for compliance purposes?", options: [{ id: "a", text: "Microsoft Purview" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Resource Manager" }, { id: "d", text: "Azure Monitor" }], correct: "a", explanation: "Microsoft Purview provides unified data governance, helping organizations discover, classify, and protect sensitive data across their Azure and hybrid estate." },
      { id: "az900-40", domain: "Describe Azure management and governance", question: "Which web-based tool provides a graphical interface for creating, managing, and monitoring Azure resources?", options: [{ id: "a", text: "The Azure portal" }, { id: "b", text: "Azure Cloud Shell" }, { id: "c", text: "Azure CLI" }, { id: "d", text: "Azure PowerShell" }], correct: "a", explanation: "The Azure portal is a web-based, graphical console for creating, configuring, and managing Azure resources through a visual interface." },
      { id: "az900-41", domain: "Describe Azure management and governance", question: "Which tool provides a browser-based, authenticated command-line environment for managing Azure resources, supporting both Bash and PowerShell?", options: [{ id: "a", text: "Azure Cloud Shell" }, { id: "b", text: "Azure Resource Manager" }, { id: "c", text: "Azure Arc" }, { id: "d", text: "Azure Monitor" }], correct: "a", explanation: "Azure Cloud Shell is a browser-accessible, pre-authenticated shell that supports both Bash and PowerShell for managing Azure resources without installing anything locally." },
      { id: "az900-42", domain: "Describe Azure management and governance", question: "Which Azure service extends Azure management capabilities, like policy and monitoring, to on-premises and multicloud resources outside Azure itself?", options: [{ id: "a", text: "Azure Arc" }, { id: "b", text: "Azure Resource Manager" }, { id: "c", text: "Azure Cloud Shell" }, { id: "d", text: "Azure Advisor" }], correct: "a", explanation: "Azure Arc extends Azure management — including policy, RBAC, and monitoring — to resources running outside Azure, such as on-premises servers or other clouds." },
      { id: "az900-43", domain: "Describe Azure management and governance", question: "Which approach to deploying infrastructure defines resources declaratively in code (like JSON or Bicep), enabling consistent, repeatable deployments?", options: [{ id: "a", text: "Infrastructure as code (IaC)" }, { id: "b", text: "Manual portal clicking" }, { id: "c", text: "Resource locking" }, { id: "d", text: "Tagging" }], correct: "a", explanation: "Infrastructure as code (IaC) defines and deploys infrastructure through declarative code, such as ARM templates or Bicep, enabling consistent, version-controlled, repeatable deployments." },
      { id: "az900-44", domain: "Describe Azure management and governance", question: "Which service and template format is Azure's native infrastructure-as-code mechanism for declaratively deploying resources using JSON?", options: [{ id: "a", text: "Azure Resource Manager (ARM) templates" }, { id: "b", text: "Azure Advisor recommendations" }, { id: "c", text: "Azure Policy initiatives" }, { id: "d", text: "Azure Service Health alerts" }], correct: "a", explanation: "Azure Resource Manager (ARM) templates are JSON files that declaratively define the resources to deploy, serving as Azure's native infrastructure-as-code mechanism." },
      { id: "az900-45", domain: "Describe Azure management and governance", question: "Which Azure tool analyzes your resource configuration and usage to provide personalized recommendations for cost savings, security, and performance?", options: [{ id: "a", text: "Azure Advisor" }, { id: "b", text: "Azure Service Health" }, { id: "c", text: "Azure Monitor" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Azure Advisor analyzes your resource configuration and usage telemetry to provide personalized recommendations across cost, security, reliability, and performance." },
      { id: "az900-46", domain: "Describe Azure management and governance", question: "Which service provides a personalized view of the health of Azure services you're using, including planned maintenance and outage notifications?", options: [{ id: "a", text: "Azure Service Health" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Monitor" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Azure Service Health provides personalized alerts and guidance about Azure service issues, planned maintenance, and health advisories that affect the resources you actually use." },
      { id: "az900-47", domain: "Describe Azure management and governance", question: "Which Azure service collects, analyzes, and acts on telemetry data (metrics and logs) from your cloud and on-premises environments?", options: [{ id: "a", text: "Azure Monitor" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Service Health" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Azure Monitor collects, analyzes, and acts on telemetry — metrics and logs — from applications and infrastructure, providing a full observability platform." },
      { id: "az900-48", domain: "Describe Azure management and governance", question: "Within Azure Monitor, which component lets you query and analyze log data collected from various Azure resources using a query language called KQL?", options: [{ id: "a", text: "Log Analytics" }, { id: "b", text: "Application Insights" }, { id: "c", text: "Azure Advisor" }, { id: "d", text: "Resource locks" }], correct: "a", explanation: "Log Analytics, part of Azure Monitor, lets you query and analyze collected log data using Kusto Query Language (KQL) to investigate and troubleshoot." },
      { id: "az900-49", domain: "Describe Azure management and governance", question: "Which Azure Monitor feature specifically provides application performance monitoring (APM), such as tracking requests, dependencies, and exceptions in your app?", options: [{ id: "a", text: "Application Insights" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Service Health" }, { id: "d", text: "Resource locks" }], correct: "a", explanation: "Application Insights, part of Azure Monitor, is an application performance monitoring feature for detecting anomalies, tracking requests/dependencies, and diagnosing issues in live applications." },
      { id: "az900-50", domain: "Describe Azure management and governance", question: "Which Azure Monitor capability automatically notifies you when a defined metric or log condition, such as high CPU usage, is met?", options: [{ id: "a", text: "Azure Monitor alerts" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Resource locks" }, { id: "d", text: "Tags" }], correct: "a", explanation: "Azure Monitor alerts proactively notify you when specified conditions are found in your monitoring data, such as a metric crossing a threshold." },
      { id: "az900-51", domain: "Describe cloud concepts", question: "A retail company experiences huge traffic spikes during holiday sales but low traffic the rest of the year. Which cloud benefit most directly addresses this pattern cost-effectively?", options: [{ id: "a", text: "Elastic scalability combined with consumption-based pricing" }, { id: "b", text: "A fixed on-premises server sized for peak load" }, { id: "c", text: "A single availability zone" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "Cloud elasticity lets resources scale up during peak demand and back down afterward, and consumption-based pricing means you only pay for what you use — well suited to spiky workloads like holiday sales." },
      { id: "az900-52", domain: "Describe Azure architecture and services", question: "Which Azure service lets end users connect to a full Windows desktop and applications hosted in the cloud, accessible from various devices?", options: [{ id: "a", text: "Azure Virtual Desktop" }, { id: "b", text: "Azure Virtual Machine Scale Sets" }, { id: "c", text: "Availability sets" }, { id: "d", text: "Azure Files" }], correct: "a", explanation: "Azure Virtual Desktop provides a virtualized, cloud-hosted Windows desktop and application experience accessible from many devices, centrally managed by IT." },
    ],
  },
  "DP-900": {
    label: "Azure Data Fundamentals",
    questions: [
      { id: "dp900-1", domain: "Describe core data concepts", question: "Which type of data is organized into a predefined schema with rows and columns, such as data in a relational database table?", options: [{ id: "a", text: "Structured data" }, { id: "b", text: "Semi-structured data" }, { id: "c", text: "Unstructured data" }, { id: "d", text: "Streaming data only" }], correct: "a", explanation: "Structured data conforms to a fixed schema of rows and columns, like tables in a relational database, making it straightforward to query with SQL." },
      { id: "dp900-2", domain: "Describe core data concepts", question: "Which type of data has some organizational structure, such as tags or key-value pairs, but doesn't conform to a fixed relational schema — for example, JSON?", options: [{ id: "a", text: "Semi-structured data" }, { id: "b", text: "Structured data" }, { id: "c", text: "Unstructured data" }, { id: "d", text: "Relational data only" }], correct: "a", explanation: "Semi-structured data, like JSON or XML, has some organizational markers (tags, keys) but doesn't require a fixed relational schema, allowing flexible or nested structures." },
      { id: "dp900-3", domain: "Describe core data concepts", question: "Which type of data has no predefined structure at all, such as images, videos, or free-form text documents?", options: [{ id: "a", text: "Unstructured data" }, { id: "b", text: "Structured data" }, { id: "c", text: "Semi-structured data" }, { id: "d", text: "Tabular data" }], correct: "a", explanation: "Unstructured data has no predefined data model or organization, such as images, audio, video, and free-form text — it requires different storage and processing approaches than structured data." },
      { id: "dp900-4", domain: "Describe core data concepts", question: "Which file format stores data in a compressed, column-oriented layout that's efficient for analytical queries scanning specific columns?", options: [{ id: "a", text: "Parquet" }, { id: "b", text: "CSV" }, { id: "c", text: "Plain text" }, { id: "d", text: "BMP image" }], correct: "a", explanation: "Parquet is a compressed, columnar storage format optimized for analytical workloads, since queries can read only the columns they need rather than scanning entire rows." },
      { id: "dp900-5", domain: "Describe core data concepts", question: "Which type of database organizes data into related tables with defined schemas and relationships, typically queried using SQL?", options: [{ id: "a", text: "A relational database" }, { id: "b", text: "A key-value store" }, { id: "c", text: "A document database" }, { id: "d", text: "A graph database" }], correct: "a", explanation: "A relational database organizes structured data into tables with defined schemas and relationships (via keys), and is queried using SQL." },
      { id: "dp900-6", domain: "Describe core data concepts", question: "Which Azure data store is purpose-built for storing large binary objects, like images and videos, and is not optimized for structured relational queries?", options: [{ id: "a", text: "Azure Blob storage" }, { id: "b", text: "Azure SQL Database" }, { id: "c", text: "Azure Synapse Analytics" }, { id: "d", text: "Azure Database for MySQL" }], correct: "a", explanation: "Azure Blob storage is designed for storing massive amounts of unstructured binary data, such as images and videos, rather than structured relational data." },
      { id: "dp900-7", domain: "Describe core data concepts", question: "Which type of data workload is characterized by many small, fast read/write operations, like processing individual customer orders in real time?", options: [{ id: "a", text: "A transactional (OLTP) workload" }, { id: "b", text: "An analytical (OLAP) workload" }, { id: "c", text: "A batch ETL workload" }, { id: "d", text: "A data archival workload" }], correct: "a", explanation: "Transactional (OLTP) workloads involve frequent, small, fast operations — like inserting or updating individual records — supporting real-time business processes." },
      { id: "dp900-8", domain: "Describe core data concepts", question: "Which type of data workload involves complex queries over large volumes of historical data to support reporting and business intelligence?", options: [{ id: "a", text: "An analytical (OLAP) workload" }, { id: "b", text: "A transactional (OLTP) workload" }, { id: "c", text: "A real-time messaging workload" }, { id: "d", text: "A file synchronization workload" }], correct: "a", explanation: "Analytical (OLAP) workloads run complex, often aggregate queries over large historical datasets to support reporting, dashboards, and business intelligence." },
      { id: "dp900-9", domain: "Describe core data concepts", question: "Which role is primarily responsible for designing, implementing, and maintaining database systems, ensuring performance, security, and availability?", options: [{ id: "a", text: "Database administrator" }, { id: "b", text: "Data engineer" }, { id: "c", text: "Data analyst" }, { id: "d", text: "Business stakeholder" }], correct: "a", explanation: "A database administrator (DBA) manages the ongoing operation of database systems, focusing on performance, security, backup/recovery, and availability." },
      { id: "dp900-10", domain: "Describe core data concepts", question: "Which role focuses on building and maintaining the pipelines and infrastructure that move and transform data from source systems into analytical stores?", options: [{ id: "a", text: "Data engineer" }, { id: "b", text: "Database administrator" }, { id: "c", text: "Data analyst" }, { id: "d", text: "Solution architect only" }], correct: "a", explanation: "A data engineer designs and builds the data pipelines and infrastructure that ingest, transform, and move data from source systems into stores ready for analysis." },
      { id: "dp900-11", domain: "Describe core data concepts", question: "Which role focuses on exploring data, building reports and visualizations, and deriving business insights from prepared data?", options: [{ id: "a", text: "Data analyst" }, { id: "b", text: "Database administrator" }, { id: "c", text: "Data engineer" }, { id: "d", text: "Network administrator" }], correct: "a", explanation: "A data analyst explores and analyzes prepared data, building reports and visualizations to help the business make informed decisions." },
      { id: "dp900-12", domain: "Identify considerations for relational data on Azure", question: "Which relational database design process reduces data redundancy by organizing tables so each fact is stored only once?", options: [{ id: "a", text: "Normalization" }, { id: "b", text: "Denormalization" }, { id: "c", text: "Partitioning" }, { id: "d", text: "Sharding" }], correct: "a", explanation: "Normalization organizes tables to eliminate redundant data, ensuring each fact is stored in only one place, which improves data integrity though it may require more joins to query." },
      { id: "dp900-13", domain: "Identify considerations for relational data on Azure", question: "Which SQL statement type is used to retrieve rows of data from one or more tables?", options: [{ id: "a", text: "SELECT" }, { id: "b", text: "INSERT" }, { id: "c", text: "UPDATE" }, { id: "d", text: "DELETE" }], correct: "a", explanation: "SELECT is the SQL statement used to query and retrieve data from one or more tables, optionally filtering, joining, and aggregating results." },
      { id: "dp900-14", domain: "Identify considerations for relational data on Azure", question: "Which SQL statement adds new rows of data into an existing table?", options: [{ id: "a", text: "INSERT" }, { id: "b", text: "SELECT" }, { id: "c", text: "UPDATE" }, { id: "d", text: "CREATE" }], correct: "a", explanation: "INSERT adds new rows of data into a table, while SELECT retrieves data, UPDATE modifies existing rows, and DELETE removes rows." },
      { id: "dp900-15", domain: "Identify considerations for relational data on Azure", question: "Which database object uniquely identifies each row in a table and is often used to enforce referential integrity when referenced by other tables?", options: [{ id: "a", text: "A primary key" }, { id: "b", text: "A view" }, { id: "c", text: "A stored procedure" }, { id: "d", text: "An index only" }], correct: "a", explanation: "A primary key uniquely identifies each row in a table; other tables reference it via a foreign key to establish and enforce relationships." },
      { id: "dp900-16", domain: "Identify considerations for relational data on Azure", question: "Which database object stores a saved, reusable SELECT query that can be queried like a virtual table?", options: [{ id: "a", text: "A view" }, { id: "b", text: "A stored procedure" }, { id: "c", text: "A trigger" }, { id: "d", text: "A primary key" }], correct: "a", explanation: "A view is a saved SQL query that can be queried like a table, providing a reusable and simplified way to access commonly needed data combinations." },
      { id: "dp900-17", domain: "Identify considerations for relational data on Azure", question: "Which Azure relational database service gives you a fully managed, single database with minimal administrative overhead and built-in high availability?", options: [{ id: "a", text: "Azure SQL Database" }, { id: "b", text: "SQL Server on Azure Virtual Machines" }, { id: "c", text: "Azure Blob storage" }, { id: "d", text: "Azure Cosmos DB" }], correct: "a", explanation: "Azure SQL Database is a fully managed platform-as-a-service (PaaS) relational database, handling patching, backups, and high availability automatically." },
      { id: "dp900-18", domain: "Identify considerations for relational data on Azure", question: "An organization needs full control over the SQL Server operating system and instance-level configuration for legacy compatibility. Which option fits best?", options: [{ id: "a", text: "SQL Server on Azure Virtual Machines" }, { id: "b", text: "Azure SQL Database" }, { id: "c", text: "Azure SQL Managed Instance" }, { id: "d", text: "Azure Cosmos DB" }], correct: "a", explanation: "SQL Server on Azure Virtual Machines (IaaS) gives full control over the OS and SQL Server instance, useful when legacy features or full instance-level configuration control is required." },
      { id: "dp900-19", domain: "Identify considerations for relational data on Azure", question: "Which Azure SQL offering provides near-100% compatibility with on-premises SQL Server at the instance level, while remaining a managed PaaS service?", options: [{ id: "a", text: "Azure SQL Managed Instance" }, { id: "b", text: "Azure SQL Database" }, { id: "c", text: "SQL Server on Azure VMs" }, { id: "d", text: "Azure Table storage" }], correct: "a", explanation: "Azure SQL Managed Instance offers near-complete SQL Server instance-level compatibility while still being a fully managed PaaS offering, bridging the gap between Azure SQL Database and SQL Server on VMs." },
      { id: "dp900-20", domain: "Identify considerations for relational data on Azure", question: "Which Azure services let you run popular open-source relational database engines, like PostgreSQL or MySQL, as managed services?", options: [{ id: "a", text: "Azure Database for PostgreSQL and Azure Database for MySQL" }, { id: "b", text: "Azure Cosmos DB only" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure Blob storage" }], correct: "a", explanation: "Azure offers managed database services for popular open-source engines, including Azure Database for PostgreSQL and Azure Database for MySQL." },
      { id: "dp900-21", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Storage service organizes unstructured data into containers and blobs, commonly used for media files, backups, and data lake storage?", options: [{ id: "a", text: "Azure Blob storage" }, { id: "b", text: "Azure Table storage" }, { id: "c", text: "Azure Files" }, { id: "d", text: "Azure SQL Database" }], correct: "a", explanation: "Azure Blob storage organizes unstructured data into containers holding blobs, commonly used for media, backups, logs, and as the foundation for data lakes." },
      { id: "dp900-22", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Storage service provides fully managed file shares accessible over standard file-sharing protocols like SMB?", options: [{ id: "a", text: "Azure Files" }, { id: "b", text: "Azure Blob storage" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure Queue storage" }], correct: "a", explanation: "Azure Files provides managed file shares accessible via SMB (and NFS), letting you replace or supplement on-premises file servers." },
      { id: "dp900-23", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Storage service stores simple key-attribute data (NoSQL) suited for flexible schemas without complex joins, at massive scale?", options: [{ id: "a", text: "Azure Table storage" }, { id: "b", text: "Azure Files" }, { id: "c", text: "Azure Blob storage archive tier" }, { id: "d", text: "Azure SQL Database" }], correct: "a", explanation: "Azure Table storage is a NoSQL key-attribute store designed for large volumes of structured, non-relational data with a flexible schema and fast key-based lookups." },
      { id: "dp900-24", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure service is a globally distributed, multi-model NoSQL database offering low-latency reads and writes across multiple regions?", options: [{ id: "a", text: "Azure Cosmos DB" }, { id: "b", text: "Azure SQL Database" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure Blob storage" }], correct: "a", explanation: "Azure Cosmos DB is a globally distributed, multi-model NoSQL database service designed for low-latency, high-throughput access across multiple regions." },
      { id: "dp900-25", domain: "Describe considerations for working with non-relational data on Azure", question: "A gaming company needs a database for player profiles with flexible, evolving schemas and guaranteed sub-10ms latency for millions of concurrent users globally. Which service fits best?", options: [{ id: "a", text: "Azure Cosmos DB" }, { id: "b", text: "Azure SQL Database" }, { id: "c", text: "Azure Files" }, { id: "d", text: "Azure Blob storage archive tier" }], correct: "a", explanation: "Azure Cosmos DB is purpose-built for exactly this scenario: flexible schemas, global distribution, and guaranteed low single-digit millisecond latency at any scale." },
      { id: "dp900-26", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Cosmos DB API is designed for applications that need MongoDB wire-protocol compatibility while running on Cosmos DB's underlying engine?", options: [{ id: "a", text: "The API for MongoDB" }, { id: "b", text: "The API for Table" }, { id: "c", text: "The API for Cassandra" }, { id: "d", text: "The Core (SQL) API only" }], correct: "a", explanation: "Azure Cosmos DB's API for MongoDB lets existing MongoDB applications and drivers work against Cosmos DB with minimal code changes, using wire-protocol compatibility." },
      { id: "dp900-27", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Cosmos DB API is optimized for storing and traversing highly connected data, such as social networks or recommendation engines?", options: [{ id: "a", text: "The Gremlin API (graph)" }, { id: "b", text: "The API for Table" }, { id: "c", text: "The Core (SQL) API" }, { id: "d", text: "The API for MongoDB" }], correct: "a", explanation: "The Gremlin API in Cosmos DB is optimized for graph data — entities and their relationships — well suited for scenarios like social networks, fraud detection, and recommendation engines." },
      { id: "dp900-28", domain: "Describe an analytics workload on Azure", question: "Which stage of large-scale analytics involves collecting raw data from source systems and preparing it for storage and analysis?", options: [{ id: "a", text: "Data ingestion and processing" }, { id: "b", text: "Data visualization" }, { id: "c", text: "Data archival only" }, { id: "d", text: "Report distribution" }], correct: "a", explanation: "Data ingestion and processing is the stage where raw data is collected from source systems, cleaned, and transformed before landing in an analytical data store." },
      { id: "dp900-29", domain: "Describe an analytics workload on Azure", question: "Which Microsoft cloud service is a unified analytics platform bringing together data engineering, data warehousing, real-time analytics, and Power BI in one SaaS experience?", options: [{ id: "a", text: "Microsoft Fabric" }, { id: "b", text: "Azure Files" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "Microsoft Fabric unifies data engineering, warehousing, real-time analytics, data science, and Power BI into a single SaaS analytics platform built on OneLake." },
      { id: "dp900-30", domain: "Describe an analytics workload on Azure", question: "Which Microsoft cloud service is built on Apache Spark and is widely used for big data processing and collaborative data science notebooks?", options: [{ id: "a", text: "Azure Databricks" }, { id: "b", text: "Azure Files" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "Azure Databricks is an Apache Spark-based analytics platform widely used for big data processing, machine learning, and collaborative notebook-based data science." },
      { id: "dp900-31", domain: "Describe an analytics workload on Azure", question: "Which type of data processing handles large volumes of data collected over a period of time and processed together, rather than immediately as it arrives?", options: [{ id: "a", text: "Batch processing" }, { id: "b", text: "Streaming processing" }, { id: "c", text: "Interactive querying only" }, { id: "d", text: "Ad hoc querying only" }], correct: "a", explanation: "Batch processing collects data over a period of time and processes it together in scheduled runs, as opposed to streaming processing which handles data continuously as it arrives." },
      { id: "dp900-32", domain: "Describe an analytics workload on Azure", question: "Which type of data processing analyzes data continuously as it's generated, typically within seconds, to support near-instant insights?", options: [{ id: "a", text: "Streaming (real-time) processing" }, { id: "b", text: "Batch processing" }, { id: "c", text: "Archival processing" }, { id: "d", text: "Cold storage retrieval" }], correct: "a", explanation: "Streaming (real-time) processing analyzes data continuously as it's generated, typically producing insights within seconds, unlike batch processing which runs on a schedule." },
      { id: "dp900-33", domain: "Describe an analytics workload on Azure", question: "Which Azure service is commonly used to orchestrate and automate data movement and transformation pipelines, similar to Fabric's Data Factory experience?", options: [{ id: "a", text: "Azure Data Factory" }, { id: "b", text: "Azure Table storage" }, { id: "c", text: "Azure Files" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "Azure Data Factory is a cloud-based data integration service used to orchestrate and automate the movement and transformation of data across sources." },
      { id: "dp900-34", domain: "Describe an analytics workload on Azure", question: "Which Microsoft service is used to build interactive reports and dashboards, connecting to a wide variety of data sources for business intelligence?", options: [{ id: "a", text: "Power BI" }, { id: "b", text: "Azure Files" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "Power BI is Microsoft's business intelligence tool for building interactive reports and dashboards, connecting to many data sources for visualization and analysis." },
      { id: "dp900-35", domain: "Describe an analytics workload on Azure", question: "In Power BI, which component defines the relationships, measures, and structure that underlie reports, separate from the visuals themselves?", options: [{ id: "a", text: "A semantic model (dataset)" }, { id: "b", text: "A dashboard tile" }, { id: "c", text: "A workspace" }, { id: "d", text: "A gateway" }], correct: "a", explanation: "A Power BI semantic model (formerly called a dataset) defines the data structure, relationships, and measures that reports and visuals are built on top of." },
      { id: "dp900-36", domain: "Describe an analytics workload on Azure", question: "Which Power BI visualization type is best suited for showing a trend in a numeric value over a continuous period of time, like monthly revenue?", options: [{ id: "a", text: "A line chart" }, { id: "b", text: "A pie chart" }, { id: "c", text: "A single card/KPI" }, { id: "d", text: "A matrix without any date field" }], correct: "a", explanation: "A line chart is well suited for showing trends over a continuous dimension like time, making it easy to spot patterns such as growth, decline, or seasonality." },
      { id: "dp900-37", domain: "Describe an analytics workload on Azure", question: "Which Power BI visualization type is best suited for comparing values across a small number of discrete categories, like sales by product category?", options: [{ id: "a", text: "A bar or column chart" }, { id: "b", text: "A line chart" }, { id: "c", text: "A scatter plot" }, { id: "d", text: "A gauge only" }], correct: "a", explanation: "Bar and column charts are well suited for comparing values across a small number of discrete categories, making differences in magnitude easy to see." },
      { id: "dp900-38", domain: "Describe core data concepts", question: "A hospital stores patient vitals as time-stamped sensor readings that arrive continuously. Which data workload characteristic best describes this scenario?", options: [{ id: "a", text: "Streaming/real-time analytical processing" }, { id: "b", text: "A one-time batch import" }, { id: "c", text: "A purely relational transactional system only" }, { id: "d", text: "Unstructured archival storage only" }], correct: "a", explanation: "Continuously arriving, time-stamped sensor data is a classic streaming scenario, best handled by real-time analytics rather than a single batch import." },
      { id: "dp900-39", domain: "Identify considerations for relational data on Azure", question: "Which SQL statement permanently removes rows from a table based on a specified condition?", options: [{ id: "a", text: "DELETE" }, { id: "b", text: "SELECT" }, { id: "c", text: "INSERT" }, { id: "d", text: "CREATE" }], correct: "a", explanation: "DELETE removes rows from a table matching a specified WHERE condition; without a condition, it removes all rows." },
      { id: "dp900-40", domain: "Identify considerations for relational data on Azure", question: "Which SQL statement modifies existing values in one or more columns of a table?", options: [{ id: "a", text: "UPDATE" }, { id: "b", text: "INSERT" }, { id: "c", text: "SELECT" }, { id: "d", text: "DROP" }], correct: "a", explanation: "UPDATE modifies the values of existing rows in a table, typically filtered by a WHERE clause to target specific records." },
      { id: "dp900-41", domain: "Identify considerations for relational data on Azure", question: "Which database object references the primary key of another table, enforcing referential integrity between related tables?", options: [{ id: "a", text: "A foreign key" }, { id: "b", text: "A view" }, { id: "c", text: "A stored procedure" }, { id: "d", text: "A trigger only" }], correct: "a", explanation: "A foreign key is a column (or set of columns) in one table that references the primary key of another table, enforcing referential integrity between the two." },
      { id: "dp900-42", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Storage service is designed for reliable message queuing between application components, decoupling producers and consumers?", options: [{ id: "a", text: "Azure Queue storage" }, { id: "b", text: "Azure Blob storage" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure Files" }], correct: "a", explanation: "Azure Queue storage provides a simple, reliable message queuing service that decouples application components, letting producers and consumers operate independently." },
      { id: "dp900-43", domain: "Describe considerations for working with non-relational data on Azure", question: "Which Azure Cosmos DB API most closely matches the traditional Cosmos DB native experience with SQL-like query syntax over JSON documents?", options: [{ id: "a", text: "The Core (SQL) API" }, { id: "b", text: "The API for Table" }, { id: "c", text: "The Gremlin API" }, { id: "d", text: "The API for MongoDB" }], correct: "a", explanation: "The Core (SQL) API is Cosmos DB's native API, using a SQL-like query language over JSON documents, and is generally recommended for new applications without a specific compatibility requirement." },
      { id: "dp900-44", domain: "Describe an analytics workload on Azure", question: "Which term describes the practice of consolidating large volumes of structured and unstructured data from many sources into a central analytical store for reporting?", options: [{ id: "a", text: "Data warehousing" }, { id: "b", text: "Message queuing" }, { id: "c", text: "Single sign-on" }, { id: "d", text: "Resource locking" }], correct: "a", explanation: "Data warehousing consolidates data from multiple sources into a central, structured analytical store optimized for reporting and business intelligence queries." },
      { id: "dp900-45", domain: "Describe an analytics workload on Azure", question: "Which term describes a centralized repository that can store vast amounts of raw structured, semi-structured, and unstructured data at scale, often before it's fully modeled?", options: [{ id: "a", text: "A data lake" }, { id: "b", text: "A relational database" }, { id: "c", text: "A message queue" }, { id: "d", text: "A key-value store" }], correct: "a", explanation: "A data lake stores vast amounts of raw data in its native format — structured, semi-structured, and unstructured alike — often before it's transformed and modeled for specific analytical uses." },
      { id: "dp900-46", domain: "Describe an analytics workload on Azure", question: "Which term describes the process of extracting data from a source, transforming it into a target-compatible format, and loading it into a destination store?", options: [{ id: "a", text: "ETL (Extract, Transform, Load)" }, { id: "b", text: "Normalization" }, { id: "c", text: "Sharding" }, { id: "d", text: "Replication" }], correct: "a", explanation: "ETL (Extract, Transform, Load) describes the common pattern of pulling data from a source, transforming it to fit the target schema, and loading it into a destination data store." },
      { id: "dp900-47", domain: "Describe an analytics workload on Azure", question: "Which variant of the ETL pattern loads raw data into the target first, then performs transformations within the destination system itself?", options: [{ id: "a", text: "ELT (Extract, Load, Transform)" }, { id: "b", text: "OLTP" }, { id: "c", text: "Normalization" }, { id: "d", text: "Sharding" }], correct: "a", explanation: "ELT (Extract, Load, Transform) loads raw data into the destination system first and performs transformations there, taking advantage of the destination's processing power — a common pattern in modern cloud data warehouses and lakehouses." },
      { id: "dp900-48", domain: "Describe core data concepts", question: "A logistics company wants to store GPS coordinates, timestamps, and free-text delivery notes together for each shipment, with fields that vary between shipment types. Which data representation fits best?", options: [{ id: "a", text: "Semi-structured data (e.g. JSON documents)" }, { id: "b", text: "Strictly structured relational rows only" }, { id: "c", text: "Purely unstructured binary blobs only" }, { id: "d", text: "A fixed-width flat file only" }], correct: "a", explanation: "Semi-structured formats like JSON handle varying fields per record well, since they don't require every document to share an identical rigid schema, unlike strict relational tables." },
      { id: "dp900-49", domain: "Identify considerations for relational data on Azure", question: "Which relational design technique intentionally introduces some redundancy by combining related tables, often to improve read query performance for reporting?", options: [{ id: "a", text: "Denormalization" }, { id: "b", text: "Normalization" }, { id: "c", text: "Indexing removal" }, { id: "d", text: "Sharding" }], correct: "a", explanation: "Denormalization intentionally combines related, normalized tables to reduce the number of joins needed, trading some redundancy for faster read performance — common in reporting/warehouse scenarios." },
      { id: "dp900-50", domain: "Describe an analytics workload on Azure", question: "Which Microsoft cloud service for real-time analytics lets you ingest, store, and query high-velocity event data using KQL, similar to Fabric's Eventhouse?", options: [{ id: "a", text: "Azure Data Explorer" }, { id: "b", text: "Azure Files" }, { id: "c", text: "Azure Table storage" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "Azure Data Explorer (the standalone Azure service behind Fabric's Eventhouse/KQL databases) is optimized for ingesting, storing, and querying high-velocity time-series and event data using KQL." },
      { id: "dp900-51", domain: "Describe an analytics workload on Azure", question: "Which Power BI visualization type is best suited for showing a single important metric at a glance, such as total revenue for the current month?", options: [{ id: "a", text: "A card (KPI) visual" }, { id: "b", text: "A scatter plot" }, { id: "c", text: "A line chart" }, { id: "d", text: "A matrix with many columns" }], correct: "a", explanation: "A card (or KPI) visual displays a single important number prominently, ideal for at-a-glance metrics like total revenue, without the complexity of a chart." },
      { id: "dp900-52", domain: "Describe core data concepts", question: "A company wants to store product catalog data with a fixed set of fields (SKU, name, price, category) that rarely change and must support complex multi-table joins for reporting. Which data representation and store type fit best?", options: [{ id: "a", text: "Structured data in a relational database" }, { id: "b", text: "Unstructured data in Blob storage" }, { id: "c", text: "Semi-structured JSON with no fixed schema" }, { id: "d", text: "Streaming event data in an Eventhouse" }], correct: "a", explanation: "A fixed schema with complex multi-table join requirements is the classic use case for structured data in a relational database, which is purpose-built for exactly this kind of querying." },
    ],
  },
  "AZ-104": {
    label: "Azure Administrator Associate",
    questions: [
      { id: "az104-1", domain: "Manage Azure identities and governance", question: "You need to let an external partner sign in to your organization's Azure resources using their own corporate credentials. What should you do?", options: [{ id: "a", text: "Invite them as a Microsoft Entra guest (B2B) user" }, { id: "b", text: "Create a new Microsoft Entra user with a temporary password" }, { id: "c", text: "Add them to the DefaultReader OneLake role" }, { id: "d", text: "Give them the subscription's service principal credentials" }], correct: "a", explanation: "Microsoft Entra B2B collaboration lets you invite external users as guests, allowing them to sign in with their own organizational credentials rather than creating a new managed identity for them." },
      { id: "az104-2", domain: "Manage Azure identities and governance", question: "Users keep contacting the helpdesk to reset forgotten passwords. Which Microsoft Entra ID feature lets users reset their own password without helpdesk involvement?", options: [{ id: "a", text: "Self-service password reset (SSPR)" }, { id: "b", text: "Conditional Access" }, { id: "c", text: "Privileged Identity Management" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Self-service password reset (SSPR) lets users reset or unlock their own accounts using verification methods they registered in advance, reducing helpdesk load." },
      { id: "az104-3", domain: "Manage Azure identities and governance", question: "Which Azure RBAC role grants full management access to resources, including the ability to grant access to others, but not to manage the underlying Azure subscription itself?", options: [{ id: "a", text: "Owner" }, { id: "b", text: "Contributor" }, { id: "c", text: "Reader" }, { id: "d", text: "User Access Administrator" }], correct: "b", explanation: "Contributor grants full management access to resources but cannot grant access to others; that additional capability is what distinguishes Owner from Contributor." },
      { id: "az104-4", domain: "Manage Azure identities and governance", question: "You want to enforce that all storage accounts in a subscription must use only approved SKUs. Which service should you use?", options: [{ id: "a", text: "Azure Policy" }, { id: "b", text: "Azure Blueprints only" }, { id: "c", text: "Resource locks" }, { id: "d", text: "Management groups" }], correct: "a", explanation: "Azure Policy evaluates resources against defined rules — such as allowed SKUs — and can audit or deny non-compliant deployments." },
      { id: "az104-5", domain: "Manage Azure identities and governance", question: "Which feature prevents a critical production resource from being accidentally deleted, even by a user with Contributor access?", options: [{ id: "a", text: "A CanNotDelete resource lock" }, { id: "b", text: "A read-only RBAC role" }, { id: "c", text: "Azure Advisor" }, { id: "d", text: "A management group" }], correct: "a", explanation: "A CanNotDelete resource lock overrides normal RBAC permissions to prevent deletion, regardless of what role a user otherwise holds." },
      { id: "az104-6", domain: "Manage Azure identities and governance", question: "Which construct lets you organize multiple subscriptions and apply governance policies across all of them at once?", options: [{ id: "a", text: "A management group" }, { id: "b", text: "A resource group" }, { id: "c", text: "A tag" }, { id: "d", text: "An availability set" }], correct: "a", explanation: "Management groups sit above subscriptions in the hierarchy, letting you apply policies and access controls across many subscriptions simultaneously." },
      { id: "az104-7", domain: "Manage Azure identities and governance", question: "Which feature helps you organize costs by department or project by attaching name/value metadata to resources?", options: [{ id: "a", text: "Tags" }, { id: "b", text: "Resource locks" }, { id: "c", text: "Availability zones" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Tags are name/value pairs applied to resources that help categorize and report on spending, ownership, or environment." },
      { id: "az104-8", domain: "Manage Azure identities and governance", question: "A user needs Contributor access to just one resource group, not the entire subscription. What is the recommended scope for the role assignment?", options: [{ id: "a", text: "The resource group" }, { id: "b", text: "The management group" }, { id: "c", text: "The tenant root" }, { id: "d", text: "The subscription" }], correct: "a", explanation: "Following least privilege, RBAC role assignments should be scoped as narrowly as possible — the resource group level here, rather than the whole subscription." },
      { id: "az104-9", domain: "Manage Azure identities and governance", question: "Which Microsoft Entra ID object type is used to grant permissions to a group of users at once, rather than assigning roles individually?", options: [{ id: "a", text: "A group" }, { id: "b", text: "A managed identity" }, { id: "c", text: "A service principal" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "Groups let administrators assign roles and licenses once to the group, and every member inherits that access, simplifying management at scale." },
      { id: "az104-10", domain: "Manage Azure identities and governance", question: "You want to track how much a specific project is spending in Azure and get notified when spending approaches a threshold. What should you configure?", options: [{ id: "a", text: "A budget with an alert" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A management group" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Budgets let you set spending thresholds for a scope and configure alerts that notify stakeholders as actual or forecasted costs approach that threshold." },
      { id: "az104-11", domain: "Manage Azure identities and governance", question: "Which report in the Azure portal helps you understand why a specific user does or doesn't have access to a resource?", options: [{ id: "a", text: "The Check access / IAM view for that resource" }, { id: "b", text: "Azure Monitor Logs" }, { id: "c", text: "Azure Advisor" }, { id: "d", text: "Cost Management" }], correct: "a", explanation: "The Check access feature under Access control (IAM) shows which role assignments apply to a given user at a given scope, helping troubleshoot access issues." },
      { id: "az104-12", domain: "Manage Azure identities and governance", question: "Which Microsoft Entra ID feature lets administrators assign licenses (like Microsoft 365) automatically to all members of a group?", options: [{ id: "a", text: "Group-based licensing" }, { id: "b", text: "Conditional Access" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "Resource tagging" }], correct: "a", explanation: "Group-based licensing automatically assigns and removes licenses as users join or leave a group, avoiding manual per-user license management." },
      { id: "az104-13", domain: "Implement and manage storage", question: "You need to grant temporary, time-limited access to a specific blob without sharing your storage account key. What should you generate?", options: [{ id: "a", text: "A shared access signature (SAS) token" }, { id: "b", text: "A new storage account key" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A management certificate" }], correct: "a", explanation: "A SAS token grants delegated, time-limited access to specific storage resources without exposing the account's full access keys." },
      { id: "az104-14", domain: "Implement and manage storage", question: "Which storage redundancy option replicates data synchronously across three availability zones within a single region?", options: [{ id: "a", text: "Zone-redundant storage (ZRS)" }, { id: "b", text: "Locally redundant storage (LRS)" }, { id: "c", text: "Geo-redundant storage (GRS) alone" }, { id: "d", text: "No redundancy" }], correct: "a", explanation: "Zone-redundant storage (ZRS) synchronously replicates data across three availability zones, protecting against a single datacenter failure — LRS only replicates within one datacenter." },
      { id: "az104-15", domain: "Implement and manage storage", question: "Which Azure Storage feature restricts network access to a storage account to only specific virtual networks or IP ranges?", options: [{ id: "a", text: "Azure Storage firewalls and virtual network rules" }, { id: "b", text: "Shared access signatures" }, { id: "c", text: "Storage account encryption" }, { id: "d", text: "Blob versioning" }], correct: "a", explanation: "Storage account firewall and virtual network rules restrict which networks or public IP ranges are allowed to reach the storage account at all, independent of authentication." },
      { id: "az104-16", domain: "Implement and manage storage", question: "Which storage tier offers the lowest per-GB storage cost, at the expense of higher retrieval latency, best suited for long-term backups rarely accessed?", options: [{ id: "a", text: "Archive tier" }, { id: "b", text: "Hot tier" }, { id: "c", text: "Cool tier" }, { id: "d", text: "Premium tier" }], correct: "a", explanation: "The Archive tier offers the lowest storage cost but requires rehydration (hours of latency) before data can be read, making it suited to rarely accessed long-term data." },
      { id: "az104-17", domain: "Implement and manage storage", question: "Which tool is optimized for fast, high-throughput command-line data transfer into and out of Azure Blob Storage?", options: [{ id: "a", text: "AzCopy" }, { id: "b", text: "Azure Storage Explorer" }, { id: "c", text: "Azure CLI's generic 'az' commands only" }, { id: "d", text: "Azure Data Box" }], correct: "a", explanation: "AzCopy is a command-line utility purpose-built for fast, high-throughput copying of data into and out of Azure Storage." },
      { id: "az104-18", domain: "Implement and manage storage", question: "You want files accidentally deleted from a blob container to be recoverable for a set retention period. What should you enable?", options: [{ id: "a", text: "Soft delete for blobs" }, { id: "b", text: "Object replication" }, { id: "c", text: "A SAS token" }, { id: "d", text: "A stored access policy" }], correct: "a", explanation: "Soft delete for blobs retains deleted blobs for a configured retention period, allowing recovery from accidental deletion or overwrite." },
      { id: "az104-19", domain: "Implement and manage storage", question: "Which feature lets you automatically move blobs to a cooler storage tier or delete them after a defined number of days since last modification?", options: [{ id: "a", text: "Blob lifecycle management" }, { id: "b", text: "Object replication" }, { id: "c", text: "Stored access policies" }, { id: "d", text: "Encryption scopes" }], correct: "a", explanation: "Lifecycle management policies automate tiering or deleting blobs based on rules like age since last modification, reducing storage costs without manual intervention." },
      { id: "az104-20", domain: "Implement and manage storage", question: "You need to grant an Azure VM's managed identity access to read files in Azure Files without managing storage account keys. What should you configure?", options: [{ id: "a", text: "Identity-based access for Azure Files" }, { id: "b", text: "A SAS token shared via email" }, { id: "c", text: "A stored access policy only" }, { id: "d", text: "Object replication" }], correct: "a", explanation: "Identity-based access for Azure Files lets Microsoft Entra identities (including managed identities) authenticate via Kerberos over SMB, avoiding the need to manage and distribute storage keys." },
      { id: "az104-21", domain: "Implement and manage storage", question: "Which feature automatically copies changes made to blobs in a source storage account to a destination storage account, potentially in another region?", options: [{ id: "a", text: "Object replication" }, { id: "b", text: "Blob versioning" }, { id: "c", text: "A stored access policy" }, { id: "d", text: "Soft delete" }], correct: "a", explanation: "Object replication asynchronously copies block blobs between a source and destination storage account, commonly used for minimizing latency or maintaining a copy in another region." },
      { id: "az104-22", domain: "Deploy and manage Azure compute resources", question: "Which Azure Resource Manager artifact declaratively defines infrastructure to deploy, using a domain-specific language that transpiles to ARM JSON?", options: [{ id: "a", text: "A Bicep file" }, { id: "b", text: "A PowerShell script" }, { id: "c", text: "An Azure Policy definition" }, { id: "d", text: "A management group" }], correct: "a", explanation: "Bicep is a domain-specific language for deploying Azure resources declaratively; it compiles down to standard ARM JSON templates but is more concise and readable to author." },
      { id: "az104-23", domain: "Deploy and manage Azure compute resources", question: "Which feature distributes identical VMs across fault domains and update domains to reduce the chance of a single failure taking down an entire application?", options: [{ id: "a", text: "Availability sets" }, { id: "b", text: "Resource groups" }, { id: "c", text: "Management groups" }, { id: "d", text: "Tags" }], correct: "a", explanation: "Availability sets spread VMs across separate fault domains (hardware) and update domains (maintenance windows), reducing correlated failure risk." },
      { id: "az104-24", domain: "Deploy and manage Azure compute resources", question: "Which Azure compute service automatically scales a group of identical, load-balanced VM instances up or down based on demand?", options: [{ id: "a", text: "Virtual Machine Scale Sets" }, { id: "b", text: "Availability sets" }, { id: "c", text: "Azure Container Instances" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Virtual Machine Scale Sets manage a group of identical, load-balanced VMs and can automatically increase or decrease instance count based on demand or a schedule." },
      { id: "az104-25", domain: "Deploy and manage Azure compute resources", question: "You need to run a single container quickly without managing orchestration, VMs, or a cluster. Which service is the simplest fit?", options: [{ id: "a", text: "Azure Container Instances" }, { id: "b", text: "Azure Kubernetes Service" }, { id: "c", text: "Virtual Machine Scale Sets" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Azure Container Instances (ACI) lets you run a single container quickly and simply, without provisioning VMs or managing a full orchestration cluster." },
      { id: "az104-26", domain: "Deploy and manage Azure compute resources", question: "Which App Service feature lets you deploy a new version of your app to a separate environment and swap it into production with minimal downtime?", options: [{ id: "a", text: "Deployment slots" }, { id: "b", text: "Scaling rules" }, { id: "c", text: "Custom domains" }, { id: "d", text: "App Service plan tiers" }], correct: "a", explanation: "Deployment slots let you stage a new version in a separate slot, warm it up, and then swap it into production, minimizing downtime and enabling easy rollback." },
      { id: "az104-27", domain: "Deploy and manage Azure compute resources", question: "Which Azure Resource Manager capability lets you move an existing VM to a different resource group without recreating it?", options: [{ id: "a", text: "Resource move" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A deployment slot" }, { id: "d", text: "An availability zone" }], correct: "a", explanation: "Azure supports moving many resource types, including VMs, between resource groups, subscriptions, or regions using the resource move capability, without needing to delete and recreate them." },
      { id: "az104-28", domain: "Deploy and manage Azure compute resources", question: "You need encryption of a VM's OS and data disks that occurs at the host level, before data reaches the storage service. Which feature provides this?", options: [{ id: "a", text: "Encryption at host" }, { id: "b", text: "Azure Storage firewall" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A shared access signature" }], correct: "a", explanation: "Encryption at host encrypts VM disk data on the host itself, ensuring data is encrypted end-to-end before it's written to the underlying storage." },
      { id: "az104-29", domain: "Deploy and manage Azure compute resources", question: "Which Azure service lets you build and manage a private registry to store and version your own container images?", options: [{ id: "a", text: "Azure Container Registry" }, { id: "b", text: "Azure Container Instances" }, { id: "c", text: "Azure App Service" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Azure Container Registry (ACR) is a private registry for storing and managing container images and related artifacts across your deployments." },
      { id: "az104-30", domain: "Deploy and manage Azure compute resources", question: "You want to configure automatic HTTPS certificates and a custom DNS name for a web app hosted in App Service. What should you configure?", options: [{ id: "a", text: "TLS/SSL bindings and a custom domain mapping" }, { id: "b", text: "A resource lock" }, { id: "c", text: "An availability set" }, { id: "d", text: "A management group" }], correct: "a", explanation: "App Service lets you map a custom DNS name to your app and configure TLS/SSL certificates and bindings so the custom domain is served securely over HTTPS." },
      { id: "az104-31", domain: "Deploy and manage Azure compute resources", question: "Which serverless container option in Azure lets you run microservices and event-driven applications without managing the underlying VMs or a Kubernetes cluster?", options: [{ id: "a", text: "Azure Container Apps" }, { id: "b", text: "Azure Virtual Machine Scale Sets" }, { id: "c", text: "Azure Bastion" }, { id: "d", text: "Availability sets" }], correct: "a", explanation: "Azure Container Apps is a fully managed serverless container platform for running microservices and event-driven apps without directly managing infrastructure or Kubernetes." },
      { id: "az104-32", domain: "Implement and manage virtual networking", question: "You want two virtual networks in different regions to communicate directly using private IP addresses over the Microsoft backbone. What should you configure?", options: [{ id: "a", text: "VNet peering" }, { id: "b", text: "A network security group" }, { id: "c", text: "Azure DNS" }, { id: "d", text: "A load balancer" }], correct: "a", explanation: "VNet peering connects two virtual networks so resources in each can communicate using private IP addresses over Microsoft's backbone network, without public internet exposure." },
      { id: "az104-33", domain: "Implement and manage virtual networking", question: "Which resource acts as a distributed firewall, controlling inbound and outbound traffic to network interfaces or subnets based on rules?", options: [{ id: "a", text: "A network security group (NSG)" }, { id: "b", text: "Azure DNS" }, { id: "c", text: "A public IP address" }, { id: "d", text: "A load balancer" }], correct: "a", explanation: "Network security groups (NSGs) contain rules that allow or deny inbound and outbound network traffic to Azure resources, based on source, destination, port, and protocol." },
      { id: "az104-34", domain: "Implement and manage virtual networking", question: "You need to securely RDP or SSH into VMs inside a virtual network without exposing them to the public internet or giving each one a public IP. What should you deploy?", options: [{ id: "a", text: "Azure Bastion" }, { id: "b", text: "A public load balancer" }, { id: "c", text: "Azure DNS" }, { id: "d", text: "A user-defined route" }], correct: "a", explanation: "Azure Bastion provides secure RDP/SSH connectivity to VMs directly through the Azure portal over TLS, without needing to expose the VM's public IP address." },
      { id: "az104-35", domain: "Implement and manage virtual networking", question: "Which feature lets you override Azure's default system routes to force traffic through a network virtual appliance or specific next hop?", options: [{ id: "a", text: "A user-defined route (UDR)" }, { id: "b", text: "A network security group" }, { id: "c", text: "VNet peering" }, { id: "d", text: "A public IP address" }], correct: "a", explanation: "User-defined routes (UDRs) override Azure's default system routing, letting you direct traffic through a specific next hop such as a firewall appliance." },
      { id: "az104-36", domain: "Implement and manage virtual networking", question: "You want a PaaS service like Azure SQL Database to be reachable only via a private IP address inside your VNet, not over the public internet. What should you configure?", options: [{ id: "a", text: "A private endpoint" }, { id: "b", text: "A service endpoint" }, { id: "c", text: "A public load balancer" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "A private endpoint assigns a private IP address from your VNet to a PaaS service, allowing traffic to stay entirely on the Microsoft backbone without a public endpoint." },
      { id: "az104-37", domain: "Implement and manage virtual networking", question: "Which Azure service provides managed, scalable DNS hosting for your domains, including private DNS zones resolvable only within a VNet?", options: [{ id: "a", text: "Azure DNS" }, { id: "b", text: "Azure Bastion" }, { id: "c", text: "Network Watcher" }, { id: "d", text: "A network security group" }], correct: "a", explanation: "Azure DNS hosts DNS zones and records, including private DNS zones that resolve only within linked virtual networks, alongside public zone hosting." },
      { id: "az104-38", domain: "Implement and manage virtual networking", question: "You need to distribute incoming traffic across multiple VMs behind a single public IP address for high availability. What should you deploy?", options: [{ id: "a", text: "An Azure Load Balancer" }, { id: "b", text: "Azure Bastion" }, { id: "c", text: "A user-defined route" }, { id: "d", text: "Azure DNS" }], correct: "a", explanation: "A load balancer distributes incoming network traffic across multiple backend VM instances, improving availability and scaling out application capacity." },
      { id: "az104-39", domain: "Implement and manage virtual networking", question: "A VM in your VNet can't reach the internet or other resources. Which built-in tool helps diagnose connectivity issues step by step?", options: [{ id: "a", text: "Azure Network Watcher" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "Azure Cost Management" }], correct: "a", explanation: "Network Watcher provides tools like IP flow verify, next hop, and connection troubleshoot to diagnose network connectivity problems within Azure." },
      { id: "az104-40", domain: "Implement and manage virtual networking", question: "Which resource lets applications inside a PaaS service like Azure SQL reach a specific VNet subnet over the Microsoft backbone, without needing a private endpoint, by extending the VNet identity to the service?", options: [{ id: "a", text: "A service endpoint" }, { id: "b", text: "A public IP address" }, { id: "c", text: "A network security group" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Service endpoints extend a VNet's private address space identity to Azure PaaS services, allowing the subnet to reach the service over the Microsoft backbone rather than the public internet, without needing the dedicated private IP a private endpoint provides." },
      { id: "az104-41", domain: "Implement and manage virtual networking", question: "You want to evaluate which combination of NSG rules actually applies and takes effect for a specific network interface. Which tool should you use?", options: [{ id: "a", text: "Effective security rules in Network Watcher" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Cost Management + Billing" }, { id: "d", text: "Azure Policy compliance view" }], correct: "a", explanation: "Network Watcher's effective security rules view shows the combined result of NSGs applied at both the subnet and NIC level, helping you understand what's actually enforced." },
      { id: "az104-42", domain: "Monitor and maintain Azure resources", question: "Which Azure Monitor component lets you write and run KQL queries against collected log data to investigate an issue?", options: [{ id: "a", text: "Log Analytics" }, { id: "b", text: "Azure Advisor" }, { id: "c", text: "Application Insights alone" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Log Analytics, part of Azure Monitor, lets you query collected log data using Kusto Query Language (KQL) to investigate issues and build custom analysis." },
      { id: "az104-43", domain: "Monitor and maintain Azure resources", question: "You want to be automatically notified when a VM's CPU usage exceeds 90% for 5 minutes. What should you configure?", options: [{ id: "a", text: "An Azure Monitor alert rule" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A tag" }, { id: "d", text: "A management group" }], correct: "a", explanation: "Azure Monitor alert rules evaluate metrics or logs against defined conditions and trigger notifications or automated actions when the condition, such as sustained high CPU, is met." },
      { id: "az104-44", domain: "Monitor and maintain Azure resources", question: "Which Azure Backup component is required to protect on-premises files and folders, or to back up Azure VMs and other Azure workloads?", options: [{ id: "a", text: "A Recovery Services vault" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A network security group" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "A Recovery Services vault is the storage entity used by Azure Backup and Azure Site Recovery to hold backup data and recovery points for supported workloads, including Azure VMs." },
      { id: "az104-45", domain: "Monitor and maintain Azure resources", question: "Which service lets you replicate VMs to a secondary Azure region and fail over to it if the primary region becomes unavailable?", options: [{ id: "a", text: "Azure Site Recovery" }, { id: "b", text: "Azure Backup alone" }, { id: "c", text: "Network Watcher" }, { id: "d", text: "Azure Bastion" }], correct: "a", explanation: "Azure Site Recovery replicates workloads to a secondary region for disaster recovery, and orchestrates failover and failback when needed." },
      { id: "az104-46", domain: "Monitor and maintain Azure resources", question: "Where would you configure how long diagnostic logs and metrics for a resource are retained, and where they're sent (e.g. Log Analytics, storage, or Event Hub)?", options: [{ id: "a", text: "Diagnostic settings" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A management group" }, { id: "d", text: "A stored access policy" }], correct: "a", explanation: "Diagnostic settings define which log and metric categories a resource emits and where they're routed — to Log Analytics, storage, or Event Hubs — and for how long." },
      { id: "az104-47", domain: "Monitor and maintain Azure resources", question: "You need pre-built dashboards showing VM performance, dependency maps, and health for a group of VMs without writing custom queries. Which capability should you use?", options: [{ id: "a", text: "Azure Monitor VM Insights" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Resource locks" }, { id: "d", text: "Network Watcher topology" }], correct: "a", explanation: "VM Insights, part of Azure Monitor, provides pre-built performance charts, health monitoring, and dependency maps for VMs without needing custom query authoring." },
      { id: "az104-48", domain: "Monitor and maintain Azure resources", question: "Which action group destination could you configure an alert rule to notify when a threshold is breached?", options: [{ id: "a", text: "An email, SMS, or webhook, among others" }, { id: "b", text: "Only the Azure portal notification bell" }, { id: "c", text: "Only a resource lock" }, { id: "d", text: "Only Azure Policy" }], correct: "a", explanation: "Action groups define a set of notification and action destinations — such as email, SMS, voice, webhook, or Automation runbooks — that alert rules trigger when conditions are met." },
      { id: "az104-49", domain: "Monitor and maintain Azure resources", question: "Which backup policy setting determines how often backups run and how long each recovery point is retained?", options: [{ id: "a", text: "The backup policy schedule and retention settings" }, { id: "b", text: "A resource lock" }, { id: "c", text: "A network security group rule" }, { id: "d", text: "A management group policy" }], correct: "a", explanation: "A backup policy defines the backup schedule (how often) and retention duration (how long recovery points are kept), applied to the resources protected by that policy." },
      { id: "az104-50", domain: "Monitor and maintain Azure resources", question: "After configuring Azure Site Recovery, which action moves workloads from the primary region back to it after a disaster has been resolved?", options: [{ id: "a", text: "A failback" }, { id: "b", text: "A resource move" }, { id: "c", text: "A VNet peering reset" }, { id: "d", text: "A tag update" }], correct: "a", explanation: "After failing over to a secondary region during a disaster, a failback operation moves the workload back to the primary region once it's available again." },
      { id: "az104-51", domain: "Manage Azure identities and governance", question: "Which Azure governance tool provides personalized recommendations across cost, security, reliability, and performance based on your actual resource configuration?", options: [{ id: "a", text: "Azure Advisor" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Resource locks" }, { id: "d", text: "Management groups" }], correct: "a", explanation: "Azure Advisor analyzes your resource configuration and usage telemetry to provide personalized, actionable recommendations across several categories, including cost and security." },
      { id: "az104-52", domain: "Deploy and manage Azure compute resources", question: "You've modified resources manually in the portal and want to capture the current state as reusable infrastructure-as-code. What can you export?", options: [{ id: "a", text: "The deployment as an ARM template or convert it to Bicep" }, { id: "b", text: "A resource lock definition" }, { id: "c", text: "A network security group's effective rules only" }, { id: "d", text: "A cost analysis report" }], correct: "a", explanation: "Azure lets you export the current configuration of a resource group as an ARM template, which can then be converted to Bicep, providing a reusable infrastructure-as-code starting point." },
    ],
  },
  "AI-901": {
    label: "Azure AI Fundamentals (Foundry)",
    questions: [
      { id: "ai901-1", domain: "Identify AI concepts and capabilities", question: "An AI system trained on historical loan approvals systematically denies more loans to one demographic group due to biased training data. Which responsible AI principle is most directly violated?", options: [{ id: "a", text: "Fairness" }, { id: "b", text: "Transparency" }, { id: "c", text: "Accountability" }, { id: "d", text: "Reliability and safety" }], correct: "a", explanation: "Fairness requires that AI systems treat all groups equitably and avoid embedding or amplifying bias present in training data, which is exactly the failure described." },
      { id: "ai901-2", domain: "Identify AI concepts and capabilities", question: "Which responsible AI principle is concerned with ensuring users understand how and why an AI system produced a particular output?", options: [{ id: "a", text: "Transparency" }, { id: "b", text: "Inclusiveness" }, { id: "c", text: "Privacy and security" }, { id: "d", text: "Reliability and safety" }], correct: "a", explanation: "Transparency means AI systems should be understandable — people should be able to know how a system works and why it produced a given output, especially for decisions that affect them." },
      { id: "ai901-3", domain: "Identify AI concepts and capabilities", question: "Which responsible AI principle specifically addresses ensuring AI systems perform consistently and safely, even under unexpected conditions?", options: [{ id: "a", text: "Reliability and safety" }, { id: "b", text: "Inclusiveness" }, { id: "c", text: "Fairness" }, { id: "d", text: "Accountability" }], correct: "a", explanation: "Reliability and safety means AI systems should perform consistently and handle edge cases or unexpected inputs gracefully, without causing harm." },
      { id: "ai901-4", domain: "Identify AI concepts and capabilities", question: "A generative AI model produces a highly confident but factually incorrect response. What is this phenomenon commonly called?", options: [{ id: "a", text: "Hallucination" }, { id: "b", text: "Fine-tuning" }, { id: "c", text: "Tokenization" }, { id: "d", text: "Grounding" }], correct: "a", explanation: "Hallucination refers to a generative AI model producing plausible-sounding but factually incorrect or fabricated output, a key consideration for responsible use of generative AI." },
      { id: "ai901-5", domain: "Identify AI concepts and capabilities", question: "Which type of AI model architecture underpins most modern large language models, using self-attention to process input sequences?", options: [{ id: "a", text: "The Transformer architecture" }, { id: "b", text: "A decision tree" }, { id: "c", text: "K-means clustering" }, { id: "d", text: "Linear regression" }], correct: "a", explanation: "The Transformer architecture, built around self-attention mechanisms, is the foundation of most modern large language models used in generative AI." },
      { id: "ai901-6", domain: "Identify AI concepts and capabilities", question: "Which AI workload is best suited to automatically extracting key fields (like vendor name, amount, and date) from scanned invoices?", options: [{ id: "a", text: "A document processing / information extraction workload" }, { id: "b", text: "A speech synthesis workload" }, { id: "c", text: "A clustering workload" }, { id: "d", text: "A regression workload" }], correct: "a", explanation: "Document processing and information extraction workloads are designed to identify and extract structured fields from unstructured or semi-structured documents like invoices." },
      { id: "ai901-7", domain: "Identify AI concepts and capabilities", question: "Which AI workload category covers tasks like classifying whether an image contains a cat or a dog?", options: [{ id: "a", text: "Computer vision" }, { id: "b", text: "Natural language processing" }, { id: "c", text: "Speech recognition" }, { id: "d", text: "Document processing" }], correct: "a", explanation: "Computer vision workloads process and interpret visual input from images or video, including tasks like image classification." },
      { id: "ai901-8", domain: "Identify AI concepts and capabilities", question: "Which technique summarizes the sentiment of customer reviews as positive, negative, or neutral?", options: [{ id: "a", text: "Sentiment analysis, a natural language processing technique" }, { id: "b", text: "Object detection" }, { id: "c", text: "Facial recognition" }, { id: "d", text: "Anomaly detection" }], correct: "a", explanation: "Sentiment analysis is an NLP technique that classifies text according to the emotional tone it conveys, such as positive, negative, or neutral." },
      { id: "ai901-9", domain: "Identify AI concepts and capabilities", question: "Which technique identifies and extracts key terms that best represent the content of a document, useful for tagging or search?", options: [{ id: "a", text: "Keyword extraction" }, { id: "b", text: "Speech synthesis" }, { id: "c", text: "Object detection" }, { id: "d", text: "Image generation" }], correct: "a", explanation: "Keyword extraction identifies the most important terms or phrases in a body of text, commonly used for tagging, indexing, or summarizing content." },
      { id: "ai901-10", domain: "Identify AI concepts and capabilities", question: "Which technique identifies specific named items in text — such as people, organizations, or locations — and categorizes them?", options: [{ id: "a", text: "Entity recognition" }, { id: "b", text: "Speech recognition" }, { id: "c", text: "Object detection" }, { id: "d", text: "Clustering" }], correct: "a", explanation: "Entity recognition (or named entity recognition) identifies and classifies named items in text, such as people, places, organizations, or dates." },
      { id: "ai901-11", domain: "Identify AI concepts and capabilities", question: "Converting spoken audio into written text is an example of which capability?", options: [{ id: "a", text: "Speech recognition (speech-to-text)" }, { id: "b", text: "Speech synthesis" }, { id: "c", text: "Sentiment analysis" }, { id: "d", text: "Entity recognition" }], correct: "a", explanation: "Speech recognition, also called speech-to-text, converts spoken audio into written text — the inverse of speech synthesis, which converts text to spoken audio." },
      { id: "ai901-12", domain: "Identify AI concepts and capabilities", question: "Which generative AI capability produces entirely new images based on a text description?", options: [{ id: "a", text: "Image generation" }, { id: "b", text: "Object detection" }, { id: "c", text: "Optical character recognition" }, { id: "d", text: "Facial analysis" }], correct: "a", explanation: "Image generation is a generative AI capability that creates new visual content from a text prompt or other input, distinct from analyzing existing images." },
      { id: "ai901-13", domain: "Identify AI concepts and capabilities", question: "Which AI workload identifies and draws bounding boxes around multiple distinct items within a single image, such as cars and pedestrians?", options: [{ id: "a", text: "Object detection" }, { id: "b", text: "Image classification" }, { id: "c", text: "Optical character recognition" }, { id: "d", text: "Sentiment analysis" }], correct: "a", explanation: "Object detection identifies and locates multiple distinct objects within an image, typically returning bounding boxes and labels, unlike image classification which labels the whole image." },
      { id: "ai901-14", domain: "Identify AI concepts and capabilities", question: "Which workload extracts printed or handwritten text from an image, such as a scanned document?", options: [{ id: "a", text: "Optical character recognition (OCR)" }, { id: "b", text: "Object detection" }, { id: "c", text: "Facial detection" }, { id: "d", text: "Sentiment analysis" }], correct: "a", explanation: "Optical character recognition (OCR) extracts text from images, converting printed or handwritten characters into machine-readable text." },
      { id: "ai901-15", domain: "Identify AI concepts and capabilities", question: "In a supervised machine learning dataset, what is the term for the known outcome value the model is trained to predict?", options: [{ id: "a", text: "The label" }, { id: "b", text: "The feature" }, { id: "c", text: "The hyperparameter" }, { id: "d", text: "The embedding" }], correct: "a", explanation: "In supervised learning, the label is the known outcome or target value in the training data that the model learns to predict from the input features." },
      { id: "ai901-16", domain: "Identify AI concepts and capabilities", question: "Which machine learning technique is used when the goal is to predict a continuous numeric value, such as a house price?", options: [{ id: "a", text: "Regression" }, { id: "b", text: "Classification" }, { id: "c", text: "Clustering" }, { id: "d", text: "Object detection" }], correct: "a", explanation: "Regression predicts a continuous numeric value based on input features, unlike classification which predicts discrete categories." },
      { id: "ai901-17", domain: "Identify AI concepts and capabilities", question: "Which machine learning technique groups similar data points together without using any predefined labels?", options: [{ id: "a", text: "Clustering" }, { id: "b", text: "Regression" }, { id: "c", text: "Classification" }, { id: "d", text: "Entity recognition" }], correct: "a", explanation: "Clustering is an unsupervised learning technique that groups similar data points together based on shared characteristics, without relying on labeled training data." },
      { id: "ai901-18", domain: "Identify AI concepts and capabilities", question: "Which term describes a numeric representation of text, images, or other data that captures semantic meaning for use by AI models?", options: [{ id: "a", text: "An embedding" }, { id: "b", text: "A hyperparameter" }, { id: "c", text: "A label" }, { id: "d", text: "A checkpoint" }], correct: "a", explanation: "An embedding is a numeric vector representation of data (like text or images) that captures semantic meaning, allowing AI models to compare and process it mathematically." },
      { id: "ai901-19", domain: "Identify AI concepts and capabilities", question: "What is the primary purpose of a system prompt when working with a generative AI chat model?", options: [{ id: "a", text: "To set the model's behavior, role, and constraints for the conversation" }, { id: "b", text: "To store the model's trained weights" }, { id: "c", text: "To define the model's pricing tier" }, { id: "d", text: "To encrypt the conversation" }], correct: "a", explanation: "A system prompt establishes the model's role, tone, and behavioral constraints at the start of a conversation, shaping how it responds to subsequent user messages." },
      { id: "ai901-20", domain: "Identify AI concepts and capabilities", question: "Which term describes providing a generative AI model with relevant external data at query time so its response is based on that specific information rather than only its training data?", options: [{ id: "a", text: "Grounding" }, { id: "b", text: "Tokenization" }, { id: "c", text: "Fine-tuning" }, { id: "d", text: "Quantization" }], correct: "a", explanation: "Grounding supplies a model with relevant, current, or domain-specific data at query time (such as via retrieval-augmented generation), reducing hallucination and improving factual accuracy." },
      { id: "ai901-21", domain: "Identify AI concepts and capabilities", question: "Which AI workload identifies the presence and location of human faces within an image, without necessarily identifying who the person is?", options: [{ id: "a", text: "Facial detection" }, { id: "b", text: "Facial recognition/verification" }, { id: "c", text: "Sentiment analysis" }, { id: "d", text: "Object tracking" }], correct: "a", explanation: "Facial detection identifies that a face is present and where it is located in an image, distinct from facial recognition, which attempts to identify or verify who the person is." },
      { id: "ai901-22", domain: "Identify AI concepts and capabilities", question: "Which consideration is most relevant when an AI model is deployed to make decisions affecting people's healthcare or finances, and something goes wrong?", options: [{ id: "a", text: "Accountability — clear ownership and human oversight of the AI system's decisions" }, { id: "b", text: "Only the model's inference speed" }, { id: "c", text: "Only the model's file size" }, { id: "d", text: "Only the deployment region" }], correct: "a", explanation: "Accountability means organizations and individuals remain responsible for how AI systems behave, ensuring there's human oversight and clear ownership when high-stakes decisions are made." },
      { id: "ai901-23", domain: "Identify AI concepts and capabilities", question: "Which capability lets a generative AI model take actions — like calling an API or running a calculation — rather than only generating text?", options: [{ id: "a", text: "Agentic AI / tool use" }, { id: "b", text: "Tokenization" }, { id: "c", text: "Embedding generation" }, { id: "d", text: "Image classification" }], correct: "a", explanation: "Agentic AI extends generative models beyond text generation, allowing them to invoke tools, call APIs, or take multi-step actions to accomplish a task." },
      { id: "ai901-24", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which Microsoft platform provides a unified portal for deploying, testing, and managing generative AI models and agents?", options: [{ id: "a", text: "Microsoft Foundry" }, { id: "b", text: "Azure Data Factory" }, { id: "c", text: "Azure DevOps" }, { id: "d", text: "Microsoft Purview" }], correct: "a", explanation: "Microsoft Foundry is the unified platform for deploying, testing, and managing generative AI models, agents, and related tooling." },
      { id: "ai901-25", domain: "Implement AI solutions by using Microsoft Foundry", question: "Within Foundry, where would you select and deploy a specific generative AI model before using it in an application?", options: [{ id: "a", text: "The Foundry model catalog" }, { id: "b", text: "Azure Monitor" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "Azure Backup" }], correct: "a", explanation: "The Foundry model catalog lets you browse, compare, and deploy available generative AI models before integrating them into an application." },
      { id: "ai901-26", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which Foundry component would you use to write and test the code that sends prompts to a deployed model from a client application?", options: [{ id: "a", text: "The Foundry SDK" }, { id: "b", text: "Azure Policy" }, { id: "c", text: "Azure Advisor" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "The Foundry SDK provides the libraries needed to build a client application that sends prompts to and receives responses from a deployed model." },
      { id: "ai901-27", domain: "Implement AI solutions by using Microsoft Foundry", question: "You want to create an AI solution that can autonomously break a task into steps and use tools to complete it, rather than just responding to a single prompt. What should you build in Foundry?", options: [{ id: "a", text: "A single-agent solution" }, { id: "b", text: "A static system prompt only" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A blob container" }], correct: "a", explanation: "Foundry's agent capabilities let you create a single-agent solution that can reason, plan steps, and use tools to accomplish a task, going beyond a single prompt-response exchange." },
      { id: "ai901-28", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which practice most directly improves the quality and reliability of responses from a deployed generative AI model, without retraining it?", options: [{ id: "a", text: "Writing effective system and user prompts" }, { id: "b", text: "Increasing the storage account's redundancy" }, { id: "c", text: "Changing the VM size" }, { id: "d", text: "Adding a network security group rule" }], correct: "a", explanation: "Prompt engineering — crafting clear, well-structured system and user prompts — is one of the most direct ways to improve a deployed model's output quality without retraining." },
      { id: "ai901-29", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which Foundry Tools component would you use to build an application that responds to spoken user input by converting speech to text and back?", options: [{ id: "a", text: "Azure Speech in Foundry Tools" }, { id: "b", text: "Azure Content Understanding" }, { id: "c", text: "The Foundry model catalog alone" }, { id: "d", text: "Azure Policy" }], correct: "a", explanation: "Azure Speech, available through Foundry Tools, provides speech-to-text and text-to-speech capabilities for building applications that interact via spoken audio." },
      { id: "ai901-30", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which capability would you use to extract structured information — like line items and totals — from scanned receipts within Foundry?", options: [{ id: "a", text: "Azure Content Understanding" }, { id: "b", text: "Azure Speech" }, { id: "c", text: "The Foundry SDK chat client only" }, { id: "d", text: "A system prompt alone" }], correct: "a", explanation: "Azure Content Understanding extracts structured information from documents, images, audio, and video, such as line items and totals from a scanned receipt." },
      { id: "ai901-31", domain: "Implement AI solutions by using Microsoft Foundry", question: "You want a deployed multimodal model to interpret an image included alongside a text prompt. Which capability supports this?", options: [{ id: "a", text: "Multimodal input — interpreting visual input within prompts" }, { id: "b", text: "Speech synthesis only" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A blob lifecycle policy" }], correct: "a", explanation: "Multimodal models can accept and interpret visual input (such as an attached image) alongside text within a single prompt, rather than handling only text." },
      { id: "ai901-32", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which deployment configuration choice most directly affects a model's cost and throughput once deployed in Foundry?", options: [{ id: "a", text: "The chosen deployment type and compute/throughput tier" }, { id: "b", text: "The name given to the resource group" }, { id: "c", text: "The number of tags applied" }, { id: "d", text: "The subscription's display name" }], correct: "a", explanation: "The deployment type and throughput/compute tier selected when deploying a model directly determine its cost structure and how much traffic it can handle." },
      { id: "ai901-33", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which lightweight application pattern lets a user ask questions and get answers grounded in a specific set of documents, using a Foundry-deployed model?", options: [{ id: "a", text: "A chat client with text analysis / grounding over the document set" }, { id: "b", text: "A speech-only client" }, { id: "c", text: "An image-generation-only client" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "Building a chat client that grounds a model's responses in a specific document set (often via retrieval-augmented generation) lets users ask questions answered from that content specifically." },
      { id: "ai901-34", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which factor should guide your choice of which AI model to deploy in Foundry for a given application?", options: [{ id: "a", text: "The model's capabilities relative to the task requirements" }, { id: "b", text: "Only the model's release date" }, { id: "c", text: "Only the alphabetical order of model names" }, { id: "d", text: "Only the region where you're physically located" }], correct: "a", explanation: "Choosing an appropriate model means matching its documented capabilities (modality support, context length, reasoning strength) to what the specific application actually needs." },
      { id: "ai901-35", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which Content Understanding capability would you use to pull key moments or spoken content out of a video file?", options: [{ id: "a", text: "Extracting information from audio and video" }, { id: "b", text: "Image generation" }, { id: "c", text: "A system prompt" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "Content Understanding supports extracting structured information from audio and video content, such as transcribed speech or key moments, not just static images." },
      { id: "ai901-36", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which practice helps ensure a generative AI application handles unexpected or malicious user input safely, aligning with the reliability and safety principle?", options: [{ id: "a", text: "Testing the deployed model and agent against edge cases before release" }, { id: "b", text: "Skipping testing to deploy faster" }, { id: "c", text: "Disabling all system prompts" }, { id: "d", text: "Using the largest available model regardless of task" }], correct: "a", explanation: "Testing a deployed model or agent against edge cases and adversarial input before release is a key practice for ensuring the reliability and safety of a generative AI application." },
      { id: "ai901-37", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which lightweight application component is responsible for actually sending the user's message to the deployed model and displaying the response?", options: [{ id: "a", text: "The chat client built with the Foundry SDK" }, { id: "b", text: "The model catalog" }, { id: "c", text: "Azure Policy" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "The chat client, built using the Foundry SDK, is the application component that sends user messages to the deployed model's endpoint and renders the returned response." },
      { id: "ai901-38", domain: "Implement AI solutions by using Microsoft Foundry", question: "A single-agent solution in Foundry needs to check current weather before answering a user's travel question. What capability enables this?", options: [{ id: "a", text: "Tool/function calling within the agent" }, { id: "b", text: "A static system prompt with no tools" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A blob container" }], correct: "a", explanation: "Tool or function calling lets an agent invoke external tools or APIs — like a weather service — as part of reasoning through a task, rather than relying only on its training data." },
      { id: "ai901-39", domain: "Identify AI concepts and capabilities", question: "Which principle addresses designing AI systems so they work well for people with diverse abilities, backgrounds, and needs?", options: [{ id: "a", text: "Inclusiveness" }, { id: "b", text: "Transparency" }, { id: "c", text: "Reliability and safety" }, { id: "d", text: "Accountability" }], correct: "a", explanation: "Inclusiveness means designing AI systems to bring benefit to and be usable by people of all abilities, backgrounds, and life experiences." },
      { id: "ai901-40", domain: "Identify AI concepts and capabilities", question: "Which principle is most relevant when an AI system processes sensitive personal data, such as medical records?", options: [{ id: "a", text: "Privacy and security" }, { id: "b", text: "Inclusiveness" }, { id: "c", text: "Transparency alone" }, { id: "d", text: "Fairness alone" }], correct: "a", explanation: "Privacy and security governs how AI systems handle sensitive data, ensuring it's protected and used only in ways users have consented to." },
      { id: "ai901-41", domain: "Identify AI concepts and capabilities", question: "Which term describes breaking input text into smaller units (words or sub-words) that a language model processes numerically?", options: [{ id: "a", text: "Tokenization" }, { id: "b", text: "Clustering" }, { id: "c", text: "Regression" }, { id: "d", text: "Object detection" }], correct: "a", explanation: "Tokenization splits text into tokens — words or sub-word units — which are then converted into numeric representations a language model can process." },
      { id: "ai901-42", domain: "Identify AI concepts and capabilities", question: "Which term refers to further training a pre-trained model on a smaller, domain-specific dataset to specialize its behavior?", options: [{ id: "a", text: "Fine-tuning" }, { id: "b", text: "Tokenization" }, { id: "c", text: "Clustering" }, { id: "d", text: "Grounding" }], correct: "a", explanation: "Fine-tuning takes a pre-trained model and further trains it on a smaller, task- or domain-specific dataset to adapt its behavior for specialized use cases." },
      { id: "ai901-43", domain: "Identify AI concepts and capabilities", question: "A generative AI text summarization scenario is an example of which broader AI workload category?", options: [{ id: "a", text: "Natural language processing" }, { id: "b", text: "Computer vision" }, { id: "c", text: "Speech synthesis" }, { id: "d", text: "Object detection" }], correct: "a", explanation: "Summarization is a natural language processing task, since it involves understanding and condensing the meaning of written text." },
      { id: "ai901-44", domain: "Identify AI concepts and capabilities", question: "Which technique detects unusual or unexpected data points that deviate significantly from the norm, such as fraudulent transactions?", options: [{ id: "a", text: "Anomaly detection" }, { id: "b", text: "Sentiment analysis" }, { id: "c", text: "Speech synthesis" }, { id: "d", text: "Image generation" }], correct: "a", explanation: "Anomaly detection identifies data points that deviate significantly from expected patterns, commonly applied to fraud detection or equipment failure prediction." },
      { id: "ai901-45", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which application pattern lets a deployed multimodal model respond to a user's spoken question with a spoken answer, combining speech and language capabilities?", options: [{ id: "a", text: "Responding to spoken prompts with a deployed multimodal model" }, { id: "b", text: "Image generation only" }, { id: "c", text: "A static FAQ page" }, { id: "d", text: "A resource lock" }], correct: "a", explanation: "A multimodal model deployed in Foundry can accept spoken input, process it, and generate a spoken response, combining speech recognition, language understanding, and speech synthesis in one flow." },
      { id: "ai901-46", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which factor is most important when deciding whether to use a smaller, faster model versus a larger, more capable one for a production application?", options: [{ id: "a", text: "The tradeoff between task complexity/quality needs and cost/latency requirements" }, { id: "b", text: "Only the model's release year" }, { id: "c", text: "Only the number of available deployment regions" }, { id: "d", text: "Only the model's file naming convention" }], correct: "a", explanation: "Choosing between model sizes involves balancing the complexity of the task and required response quality against cost and latency constraints for the application." },
      { id: "ai901-47", domain: "Identify AI concepts and capabilities", question: "Which capability lets an AI system translate spoken or written content from one language into another?", options: [{ id: "a", text: "Translation, an NLP capability" }, { id: "b", text: "Object detection" }, { id: "c", text: "Clustering" }, { id: "d", text: "Anomaly detection" }], correct: "a", explanation: "Translation is a natural language processing capability that converts text or speech from one language into another while preserving meaning." },
      { id: "ai901-48", domain: "Identify AI concepts and capabilities", question: "Which scenario is a classic example of a generative AI workload, as opposed to a traditional predictive AI workload?", options: [{ id: "a", text: "Generating a new marketing email draft from a short prompt" }, { id: "b", text: "Predicting next month's sales using historical data" }, { id: "c", text: "Classifying whether an email is spam" }, { id: "d", text: "Detecting an anomaly in sensor readings" }], correct: "a", explanation: "Generative AI creates new content — text, images, code — from a prompt, distinct from predictive workloads like classification, regression, or anomaly detection which estimate or categorize based on existing data." },
      { id: "ai901-49", domain: "Identify AI concepts and capabilities", question: "Which consideration is essential before deploying a generative AI chatbot to the public, regarding the content it might produce?", options: [{ id: "a", text: "Responsible AI considerations for generative AI, including content filtering and misuse prevention" }, { id: "b", text: "Only its response speed" }, { id: "c", text: "Only its hosting region" }, { id: "d", text: "Only its subscription tier" }], correct: "a", explanation: "Before public deployment, generative AI applications need responsible AI safeguards such as content filtering, abuse monitoring, and mitigations against harmful or inappropriate output." },
      { id: "ai901-50", domain: "Implement AI solutions by using Microsoft Foundry", question: "Which Foundry capability would best support building an app that both transcribes a customer call and analyzes the sentiment of what was said?", options: [{ id: "a", text: "Combining Azure Speech with text analysis capabilities" }, { id: "b", text: "Image generation alone" }, { id: "c", text: "A resource lock" }, { id: "d", text: "A management group" }], correct: "a", explanation: "Combining speech-to-text (via Azure Speech) with text analysis (like sentiment analysis) lets an application transcribe spoken content and then analyze its sentiment in one pipeline." },
      { id: "ai901-51", domain: "Identify AI concepts and capabilities", question: "Which term describes the process of adjusting internal model parameters during training so predictions increasingly match the labeled training data?", options: [{ id: "a", text: "Model training" }, { id: "b", text: "Tokenization" }, { id: "c", text: "Deployment" }, { id: "d", text: "Grounding" }], correct: "a", explanation: "Model training is the process where a machine learning algorithm iteratively adjusts internal parameters so its predictions increasingly align with the labeled training data provided." },
      { id: "ai901-52", domain: "Identify AI concepts and capabilities", question: "Why are validation datasets kept separate from training datasets in machine learning?", options: [{ id: "a", text: "To evaluate how well the model generalizes to data it wasn't trained on" }, { id: "b", text: "To make the model train faster" }, { id: "c", text: "To reduce storage costs" }, { id: "d", text: "To encrypt the model's parameters" }], correct: "a", explanation: "A validation dataset, held out from training data, lets you evaluate how well a model generalizes to unseen data, helping detect overfitting before deployment." },
    ],
  },
  "PL-300": {
    label: "Power BI Data Analyst Associate",
    questions: [
      { id: "pl300-1", domain: "Prepare the data", question: "You need near-Import query performance in a Power BI report while reading data directly from OneLake without a separate import step. Which storage mode should you choose?", options: [{ id: "a", text: "Direct Lake" }, { id: "b", text: "DirectQuery" }, { id: "c", text: "Import" }, { id: "d", text: "Live Connection to Analysis Services" }], correct: "a", explanation: "Direct Lake reads Delta tables from OneLake directly, giving near-Import performance without requiring a separate data import step, unlike DirectQuery which queries the source live." },
      { id: "pl300-2", domain: "Prepare the data", question: "A Power Query step lets a user supply a value (like a year or a folder path) at refresh time to control what data loads. What should you create?", options: [{ id: "a", text: "A parameter" }, { id: "b", text: "A calculated column" }, { id: "c", text: "A relationship" }, { id: "d", text: "A bookmark" }], correct: "a", explanation: "Parameters in Power Query let users or administrators supply a configurable value that controls query behavior, such as which year or path to load data from." },
      { id: "pl300-3", domain: "Prepare the data", question: "A column you're loading contains an unexpectedly high proportion of null values. Which Power Query feature helps you spot this quickly during data preparation?", options: [{ id: "a", text: "Column quality and column distribution statistics" }, { id: "b", text: "A calculated table" }, { id: "c", text: "A calculation group" }, { id: "d", text: "A bookmark" }], correct: "a", explanation: "Power Query's column quality, distribution, and profile statistics surface issues like null percentages, error counts, and value distribution directly in the query editor." },
      { id: "pl300-4", domain: "Prepare the data", question: "You need to convert a column of text dates like '2026-01-15' into an actual Date type before building relationships on it. What should you do?", options: [{ id: "a", text: "Change the column's data type to Date" }, { id: "b", text: "Create a calculation group" }, { id: "c", text: "Enable row-level security" }, { id: "d", text: "Configure a stored access policy" }], correct: "a", explanation: "Selecting the appropriate column data type — here, Date — ensures the column behaves correctly for sorting, filtering, and relationships in the model." },
      { id: "pl300-5", domain: "Prepare the data", question: "You want to summarize daily transaction rows into monthly totals per product before loading into the model, to reduce data volume. What Power Query operation achieves this?", options: [{ id: "a", text: "Group and aggregate rows" }, { id: "b", text: "Merge queries" }, { id: "c", text: "Pivot columns" }, { id: "d", text: "Duplicate a query" }], correct: "a", explanation: "Grouping and aggregating rows reduces granularity by summarizing values — like summing daily transactions into monthly totals — before the data reaches the model." },
      { id: "pl300-6", domain: "Prepare the data", question: "A source table has one row per customer, with separate columns for Jan, Feb, and Mar sales. You want one row per customer per month instead. What should you do?", options: [{ id: "a", text: "Unpivot the month columns" }, { id: "b", text: "Pivot the table" }, { id: "c", text: "Merge two queries" }, { id: "d", text: "Reference the query" }], correct: "a", explanation: "Unpivoting converts columns (like Jan, Feb, Mar) into rows, transforming wide data into the long/tall format typically needed for proper data modeling." },
      { id: "pl300-7", domain: "Prepare the data", question: "You want a downstream query to reuse the transformation steps of an existing query, but as an independent copy that can be modified separately. What should you use?", options: [{ id: "a", text: "Duplicate the query" }, { id: "b", text: "Reference the query" }, { id: "c", text: "Merge the query" }, { id: "d", text: "Append the query" }], correct: "a", explanation: "Duplicating a query creates an independent copy including all steps, which can then be modified without affecting the original — unlike referencing, which stays linked to the source query's steps." },
      { id: "pl300-8", domain: "Prepare the data", question: "You want a new query that starts from the output of an existing query, so future changes to the original automatically flow through. What should you use?", options: [{ id: "a", text: "Reference the query" }, { id: "b", text: "Duplicate the query" }, { id: "c", text: "Merge the query" }, { id: "d", text: "Change the column data type" }], correct: "a", explanation: "Referencing a query builds a new query on top of the original's output, so any upstream changes to the referenced query automatically propagate downstream." },
      { id: "pl300-9", domain: "Prepare the data", question: "You have two queries — Orders and Customers — and need to combine columns from both based on a shared CustomerID. What operation should you use?", options: [{ id: "a", text: "Merge queries" }, { id: "b", text: "Append queries" }, { id: "c", text: "Pivot columns" }, { id: "d", text: "Group rows" }], correct: "a", explanation: "Merging queries joins two tables based on a common key column (like CustomerID), combining columns from both into a single result — similar to a SQL join." },
      { id: "pl300-10", domain: "Prepare the data", question: "You have monthly sales files with identical columns, and want to stack them into a single table with all rows combined. What operation should you use?", options: [{ id: "a", text: "Append queries" }, { id: "b", text: "Merge queries" }, { id: "c", text: "Pivot columns" }, { id: "d", text: "Unpivot columns" }], correct: "a", explanation: "Appending queries stacks rows from multiple queries with matching columns into a single combined table, unlike merging which joins columns side-by-side." },
      { id: "pl300-11", domain: "Prepare the data", question: "In a star schema, which table type holds descriptive attributes like product category, customer name, or region?", options: [{ id: "a", text: "A dimension table" }, { id: "b", text: "A fact table" }, { id: "c", text: "A bridge table" }, { id: "d", text: "A calculation group table" }], correct: "a", explanation: "Dimension tables provide descriptive context — like product, customer, or region attributes — that fact tables' numeric measures can be filtered and grouped by." },
      { id: "pl300-12", domain: "Prepare the data", question: "You need to configure a query so it loads to the data model but the intermediate staging query used to build it does not. What should you configure?", options: [{ id: "a", text: "Data loading / 'Enable load' settings per query" }, { id: "b", text: "A calculation group" }, { id: "c", text: "A relationship's cross-filter direction" }, { id: "d", text: "A bookmark" }], correct: "a", explanation: "Each query's load setting can be toggled independently, letting you keep staging/helper queries out of the final model while still loading the queries built from them." },
      { id: "pl300-13", domain: "Prepare the data", question: "A JSON column in your source data contains nested fields you need as separate columns. What should you do in Power Query?", options: [{ id: "a", text: "Convert the semi-structured data to a table by expanding the column" }, { id: "b", text: "Merge the query with itself" }, { id: "c", text: "Apply row-level security" }, { id: "d", text: "Create a calculation group" }], correct: "a", explanation: "Power Query can expand semi-structured data like JSON or nested records into a proper tabular format with individual columns for each nested field." },
      { id: "pl300-14", domain: "Prepare the data", question: "A CSV import shows errors on some rows because a column expected numbers but found text. What should you check first?", options: [{ id: "a", text: "The column's data type and any conversion errors flagged during import" }, { id: "b", text: "The report's color theme" }, { id: "c", text: "The workspace's storage mode" }, { id: "d", text: "The dashboard's tile layout" }], correct: "a", explanation: "Data import errors are commonly caused by data type mismatches; reviewing the column's assigned type and the specific rows flagged with errors is the first troubleshooting step." },
      { id: "pl300-15", domain: "Model the data", question: "You have a Date dimension used by both an Order Date and a Ship Date column on the same fact table, but only one active relationship is allowed. What technique addresses this?", options: [{ id: "a", text: "Implement a role-playing dimension" }, { id: "b", text: "Create a calculation group" }, { id: "c", text: "Enable Direct Lake mode" }, { id: "d", text: "Apply dynamic row-level security" }], correct: "a", explanation: "A role-playing dimension lets one physical dimension table (like Date) serve multiple logical roles (Order Date, Ship Date) via separate relationships, often using DAX USERELATIONSHIP for inactive ones." },
      { id: "pl300-16", domain: "Model the data", question: "Which relationship cardinality is most common between a dimension table and a fact table in a well-designed star schema?", options: [{ id: "a", text: "One-to-many (one dimension row relates to many fact rows)" }, { id: "b", text: "Many-to-many" }, { id: "c", text: "One-to-one" }, { id: "d", text: "No relationship needed" }], correct: "a", explanation: "In a star schema, a dimension table typically has a one-to-many relationship with a fact table — one customer relates to many orders, for example." },
      { id: "pl300-17", domain: "Model the data", question: "Which model object provides a centralized, consistent list of dates for time intelligence calculations, ideally marked as a date table?", options: [{ id: "a", text: "A common date table" }, { id: "b", text: "A bridge table" }, { id: "c", text: "A calculation group" }, { id: "d", text: "A composite model" }], correct: "a", explanation: "A common date table, marked as the model's official date table, provides a consistent calendar for time intelligence functions like year-to-date or prior-period comparisons." },
      { id: "pl300-18", domain: "Model the data", question: "Which DAX function is central to modifying filter context, commonly used to build measures like year-over-year comparisons?", options: [{ id: "a", text: "CALCULATE" }, { id: "b", text: "CONCATENATE" }, { id: "c", text: "SUBSTITUTE" }, { id: "d", text: "FORMAT" }], correct: "a", explanation: "CALCULATE evaluates an expression in a modified filter context, making it the foundational function for building measures like time comparisons or conditional aggregations." },
      { id: "pl300-19", domain: "Model the data", question: "Which type of DAX function, like SUMX or AVERAGEX, evaluates an expression for each row of a table before aggregating?", options: [{ id: "a", text: "An iterator function" }, { id: "b", text: "A time intelligence function" }, { id: "c", text: "A table constructor function" }, { id: "d", text: "A logical function" }], correct: "a", explanation: "Iterator functions (ending in X) evaluate an expression row-by-row across a table before aggregating the results, useful when a calculation can't be expressed as a simple column aggregation." },
      { id: "pl300-20", domain: "Model the data", question: "You need a measure that always shows the most recent inventory count rather than summing counts across time. Which measure type fits this?", options: [{ id: "a", text: "A semi-additive measure" }, { id: "b", text: "A fully additive measure" }, { id: "c", text: "A calculated column" }, { id: "d", text: "A bridge table" }], correct: "a", explanation: "Semi-additive measures, like inventory or account balances, shouldn't simply sum across time — they need special handling (like taking the last non-blank value) rather than full additivity." },
      { id: "pl300-21", domain: "Model the data", question: "Which feature lets you build a measure interactively through a guided UI, without writing DAX manually?", options: [{ id: "a", text: "Quick measures" }, { id: "b", text: "Calculation groups" }, { id: "c", text: "Field parameters" }, { id: "d", text: "Composite models" }], correct: "a", explanation: "Quick measures provide a guided dialog for common calculation patterns, generating the underlying DAX automatically without the user writing it by hand." },
      { id: "pl300-22", domain: "Model the data", question: "Which DAX modeling feature lets you define reusable calculation logic (like time-intelligence variants) once and apply it to many measures via a slicer?", options: [{ id: "a", text: "A calculation group" }, { id: "b", text: "A calculated table" }, { id: "c", text: "A bridge table" }, { id: "d", text: "A hierarchy" }], correct: "a", explanation: "Calculation groups let you define reusable calculation items — such as YTD, prior year, or variance versions — once, and apply them across multiple base measures via a single slicer." },
      { id: "pl300-23", domain: "Model the data", question: "You suspect a measure is slow. Which built-in Power BI Desktop tool helps identify whether the bottleneck is DAX or a specific visual?", options: [{ id: "a", text: "Performance Analyzer" }, { id: "b", text: "The Selection pane" }, { id: "c", text: "Bookmarks pane" }, { id: "d", text: "The Sync slicers pane" }], correct: "a", explanation: "Performance Analyzer records how long each visual and its underlying DAX queries take to render, helping isolate whether a slowdown comes from a specific visual or query." },
      { id: "pl300-24", domain: "Model the data", question: "Which optimization removes unused columns and rows from the model to reduce memory footprint and improve refresh and query performance?", options: [{ id: "a", text: "Removing unnecessary rows and columns" }, { id: "b", text: "Adding more calculated columns" }, { id: "c", text: "Increasing report page count" }, { id: "d", text: "Disabling all relationships" }], correct: "a", explanation: "Removing columns and rows that aren't actually used in reports reduces the model's in-memory size, which directly improves both refresh time and query performance." },
      { id: "pl300-25", domain: "Model the data", question: "Which technique reduces a model's granularity — for example, storing daily data as monthly aggregates — to improve performance when detail-level rows aren't needed?", options: [{ id: "a", text: "Reducing granularity" }, { id: "b", text: "Adding a bridge table" }, { id: "c", text: "Enabling row-level security" }, { id: "d", text: "Creating a calculation group" }], correct: "a", explanation: "Reducing granularity — pre-aggregating data to a coarser level like monthly instead of daily — reduces row counts and improves performance when fine-grained detail isn't required." },
      { id: "pl300-26", domain: "Model the data", question: "Which DAX query tool in Power BI Desktop lets you inspect and iterate on DAX queries directly against the model, useful for troubleshooting measures?", options: [{ id: "a", text: "DAX query view" }, { id: "b", text: "The Format pane" }, { id: "c", text: "The Bookmarks pane" }, { id: "d", text: "The Filters pane" }], correct: "a", explanation: "DAX query view lets you write and run DAX queries directly against the model within Power BI Desktop, useful for testing and troubleshooting measure logic." },
      { id: "pl300-27", domain: "Model the data", question: "Which model object is created from a DAX expression at model-load time, functioning like a physical table but generated by a formula?", options: [{ id: "a", text: "A calculated table" }, { id: "b", text: "A calculated column" }, { id: "c", text: "A calculation group" }, { id: "d", text: "A bridge table" }], correct: "a", explanation: "A calculated table is generated by a DAX expression when the model is refreshed, producing a full table (rather than a single column) that behaves like any other model table." },
      { id: "pl300-28", domain: "Visualize and analyze the data", question: "A stakeholder wants a single Power BI report to render correctly for both a desktop screen and a mobile phone. What should you configure?", options: [{ id: "a", text: "Design reports for mobile devices using the mobile layout view" }, { id: "b", text: "Only apply conditional formatting" }, { id: "c", text: "Only configure bookmarks" }, { id: "d", text: "Only adjust the report's theme" }], correct: "a", explanation: "Power BI Desktop's mobile layout view lets you rearrange visuals into a phone-optimized layout independent of the desktop layout, so the same report adapts to different devices." },
      { id: "pl300-29", domain: "Visualize and analyze the data", question: "You want to save a specific state of filters and visual selections so users can jump back to that exact view with one click. What should you create?", options: [{ id: "a", text: "A bookmark" }, { id: "b", text: "A custom tooltip" }, { id: "c", text: "A drillthrough page" }, { id: "d", text: "A paginated report" }], correct: "a", explanation: "Bookmarks capture the current state of a report page — filters, slicer selections, and visual visibility — so users can return to that exact view with a single click." },
      { id: "pl300-30", domain: "Visualize and analyze the data", question: "You want hovering over a data point to show a separate, richer mini-report instead of the default hover box. What should you configure?", options: [{ id: "a", text: "A custom tooltip page" }, { id: "b", text: "A bookmark" }, { id: "c", text: "A drillthrough page" }, { id: "d", text: "Sync slicers" }], correct: "a", explanation: "Custom tooltips let you design a dedicated report page that renders as a rich hover tooltip, replacing the default single-value tooltip box." },
      { id: "pl300-31", domain: "Visualize and analyze the data", question: "You want users to right-click a data point on a summary chart and jump to a page showing full detail filtered to that exact item. What should you configure?", options: [{ id: "a", text: "Drillthrough" }, { id: "b", text: "A bookmark" }, { id: "c", text: "A custom tooltip" }, { id: "d", text: "Sync slicers" }], correct: "a", explanation: "Drillthrough lets users right-click a data point and navigate to a detail page automatically filtered to that specific context, such as a single customer or product." },
      { id: "pl300-32", domain: "Visualize and analyze the data", question: "You want a slicer selection on one report page to automatically apply to a matching slicer on a different page. What should you configure?", options: [{ id: "a", text: "Sync slicers" }, { id: "b", text: "Bookmarks" }, { id: "c", text: "Drillthrough" }, { id: "d", text: "Custom tooltips" }], correct: "a", explanation: "The Sync slicers feature lets a slicer's selection apply across multiple report pages, keeping filter context consistent as users navigate." },
      { id: "pl300-33", domain: "Visualize and analyze the data", question: "Which pane lets you group and layer overlapping visuals, and control which ones are visible for a given bookmark state?", options: [{ id: "a", text: "The Selection pane" }, { id: "b", text: "The Filters pane" }, { id: "c", text: "The Fields pane" }, { id: "d", text: "The Format pane" }], correct: "a", explanation: "The Selection pane lists all objects on a report page, letting you group, reorder, and toggle visibility — commonly combined with bookmarks to build interactive show/hide effects." },
      { id: "pl300-34", domain: "Visualize and analyze the data", question: "Which reporting object is best suited for a highly formatted, print-ready, operational report like an invoice, rather than an interactive dashboard-style page?", options: [{ id: "a", text: "A paginated report" }, { id: "b", text: "A standard Power BI report page" }, { id: "c", text: "A dashboard tile" }, { id: "d", text: "A bookmark" }], correct: "a", explanation: "Paginated reports are designed for pixel-perfect, print-ready, and highly formatted output like invoices or regulatory reports, unlike standard interactive Power BI report pages." },
      { id: "pl300-35", domain: "Visualize and analyze the data", question: "Which built-in Power BI feature automatically highlights outliers and suggests possible explanations for why a value in a visual differs from the rest?", options: [{ id: "a", text: "The Analyze feature (Explain the increase/decrease)" }, { id: "b", text: "Bookmarks" }, { id: "c", text: "Custom tooltips" }, { id: "d", text: "Sync slicers" }], correct: "a", explanation: "The Analyze feature (sometimes called 'Explain the increase/decrease') automatically investigates a data point and suggests contributing factors, helping users spot patterns without manual digging." },
      { id: "pl300-36", domain: "Visualize and analyze the data", question: "Which visual type is best suited to displaying a forecasted trend line alongside historical data, with a confidence interval?", options: [{ id: "a", text: "A line chart with the forecasting analytics feature enabled" }, { id: "b", text: "A pie chart" }, { id: "c", text: "A card visual" }, { id: "d", text: "A matrix with no date field" }], correct: "a", explanation: "Line charts support the built-in forecasting analytics feature, which projects a trend forward and displays a confidence interval band alongside historical data." },
      { id: "pl300-37", domain: "Visualize and analyze the data", question: "Which feature groups continuous numeric values, like age, into discrete ranges for easier visualization?", options: [{ id: "a", text: "Binning" }, { id: "b", text: "Drillthrough" }, { id: "c", text: "A custom tooltip" }, { id: "d", text: "A calculation group" }], correct: "a", explanation: "Binning groups a continuous numeric field into a set number of discrete ranges (bins), making patterns easier to visualize than plotting every individual value." },
      { id: "pl300-38", domain: "Visualize and analyze the data", question: "Which Copilot capability in Power BI can generate a written narrative summarizing key insights from a report page automatically?", options: [{ id: "a", text: "A narrative visual created with Copilot" }, { id: "b", text: "A bookmark" }, { id: "c", text: "A custom tooltip" }, { id: "d", text: "A paginated report" }], correct: "a", explanation: "Copilot can generate a narrative visual — a natural-language summary of key trends and insights on a report page — reducing the need for manual written commentary." },
      { id: "pl300-39", domain: "Visualize and analyze the data", question: "Which accessibility feature ensures screen reader users can navigate a report's visuals in a logical order?", options: [{ id: "a", text: "Configuring the tab order in the Selection pane" }, { id: "b", text: "Enabling row-level security" }, { id: "c", text: "Adding a bookmark" }, { id: "d", text: "Using a paginated report instead" }], correct: "a", explanation: "Setting a logical tab order for visuals (via the Selection pane) helps screen reader users navigate a report's content in a sensible sequence, supporting accessibility design." },
      { id: "pl300-40", domain: "Visualize and analyze the data", question: "You want a semantic model to refresh automatically on a nightly schedule without manual intervention. What should you configure?", options: [{ id: "a", text: "A scheduled refresh" }, { id: "b", text: "A bookmark" }, { id: "c", text: "A custom tooltip" }, { id: "d", text: "Row-level security" }], correct: "a", explanation: "Configuring scheduled refresh on a published semantic model lets Power BI automatically re-import or reprocess data at defined times, without requiring manual refreshes." },
      { id: "pl300-41", domain: "Manage and secure Power BI", question: "You want to restrict a specific set of users so they only see rows belonging to their own sales region in a report. What should you configure?", options: [{ id: "a", text: "Row-level security (RLS) roles" }, { id: "b", text: "A workspace role" }, { id: "c", text: "Item-level access" }, { id: "d", text: "A sensitivity label" }], correct: "a", explanation: "Row-level security (RLS) roles define DAX filter expressions that restrict which rows a given user can see, commonly used to scope data by region, department, or similar attribute." },
      { id: "pl300-42", domain: "Manage and secure Power BI", question: "Which workspace role allows a user to publish and modify content but not manage workspace access or settings?", options: [{ id: "a", text: "Contributor" }, { id: "b", text: "Viewer" }, { id: "c", text: "Admin" }, { id: "d", text: "Member (when scoped narrower than Admin)" }], correct: "a", explanation: "Contributor lets users create, publish, and edit content within a workspace, but doesn't grant the ability to manage workspace-level access or settings the way Admin does." },
      { id: "pl300-43", domain: "Manage and secure Power BI", question: "Which mechanism lets an external application connect to an on-premises data source that Power BI Service can't reach directly?", options: [{ id: "a", text: "An on-premises data gateway" }, { id: "b", text: "A workspace role" }, { id: "c", text: "A sensitivity label" }, { id: "d", text: "A calculation group" }], correct: "a", explanation: "An on-premises data gateway acts as a bridge, letting Power BI Service securely connect to on-premises data sources it couldn't otherwise reach over the internet." },
      { id: "pl300-44", domain: "Manage and secure Power BI", question: "Which Power BI feature applies classification labels (like Confidential or Public) to content, integrating with Microsoft Purview Information Protection?", options: [{ id: "a", text: "Sensitivity labels" }, { id: "b", text: "Row-level security" }, { id: "c", text: "Deployment pipelines" }, { id: "d", text: "Calculation groups" }], correct: "a", explanation: "Sensitivity labels, integrated with Microsoft Purview Information Protection, classify and can restrict access to Power BI content based on its sensitivity level." },
      { id: "pl300-45", domain: "Manage and secure Power BI", question: "Which capability lets an authorized reviewer mark a semantic model as trustworthy and high-quality, distinct from a user simply promoting it themselves?", options: [{ id: "a", text: "Certifying content" }, { id: "b", text: "Promoting content" }, { id: "c", text: "Applying a sensitivity label" }, { id: "d", text: "Configuring RLS" }], correct: "a", explanation: "Certification requires an organization-authorized reviewer to confirm content meets quality standards, distinct from promotion, which any user with write access can apply themselves." },
      { id: "pl300-46", domain: "Manage and secure Power BI", question: "You need to grant a specific user access to just one report, without giving them broader access to the entire workspace. What should you configure?", options: [{ id: "a", text: "Item-level access" }, { id: "b", text: "A workspace role" }, { id: "c", text: "Sensitivity labels" }, { id: "d", text: "Deployment pipeline stages" }], correct: "a", explanation: "Item-level access grants permission to a single item, like one report, without extending broader collaboration rights across the entire workspace." },
      { id: "pl300-47", domain: "Manage and secure Power BI", question: "Which feature lets you promote validated Power BI content through Development, Test, and Production workspace stages?", options: [{ id: "a", text: "Deployment pipelines" }, { id: "b", text: "Row-level security" }, { id: "c", text: "Sensitivity labels" }, { id: "d", text: "Calculation groups" }], correct: "a", explanation: "Deployment pipelines promote content across lifecycle stages — Development, Test, and Production — cloning or updating supported items in the target workspace." },
      { id: "pl300-48", domain: "Manage and secure Power BI", question: "You want end users to receive an email whenever a report is refreshed with new data, without them needing to open Power BI. What should you configure?", options: [{ id: "a", text: "A subscription" }, { id: "b", text: "A dashboard" }, { id: "c", text: "An app" }, { id: "d", text: "A workspace role" }], correct: "a", explanation: "Subscriptions send users a periodic email snapshot of a report or dashboard, notifying them of updates without requiring them to actively open Power BI." },
      { id: "pl300-49", domain: "Manage and secure Power BI", question: "Which distribution method packages multiple reports and dashboards from a workspace into a single, easily consumable experience for end users?", options: [{ id: "a", text: "A Power BI app" }, { id: "b", text: "A single report export" }, { id: "c", text: "A calculation group" }, { id: "d", text: "A stored access policy" }], correct: "a", explanation: "A Power BI app packages related reports and dashboards from a workspace into a single, curated navigation experience for consumers." },
      { id: "pl300-50", domain: "Manage and secure Power BI", question: "You want to be notified automatically when a KPI in a report crosses a defined threshold, without manually checking the report. What should you configure?", options: [{ id: "a", text: "A data alert" }, { id: "b", text: "A bookmark" }, { id: "c", text: "A custom tooltip" }, { id: "d", text: "Sync slicers" }], correct: "a", explanation: "Data alerts monitor a specific visual or tile for a defined threshold and notify you automatically when the value crosses it, without needing to check the report manually." },
      { id: "pl300-51", domain: "Manage and secure Power BI", question: "Which security membership determines who is affected by a given row-level security role once it's defined?", options: [{ id: "a", text: "RLS group membership assignment" }, { id: "b", text: "The report's color theme" }, { id: "c", text: "The dashboard's tile layout" }, { id: "d", text: "The paginated report's page size" }], correct: "a", explanation: "Assigning users or groups as members of a defined RLS role determines whose queries get filtered by that role's DAX expression when they view the report." },
      { id: "pl300-52", domain: "Manage and secure Power BI", question: "Which condition typically requires a gateway to be configured for a scheduled refresh to succeed?", options: [{ id: "a", text: "When the semantic model connects to an on-premises or private-network data source" }, { id: "b", text: "When the model uses only cloud-native sources with no private network requirement" }, { id: "c", text: "When the report has fewer than 10 visuals" }, { id: "d", text: "When the workspace has fewer than 5 members" }], correct: "a", explanation: "A gateway is required when a scheduled refresh needs to reach a data source that isn't directly reachable from the cloud, such as an on-premises database or private network resource." },
    ],
  },
};


export const EXAM_META = {
  "DP-700": { slug: "dp-700", title: "Microsoft Fabric DP-700 Practice Exam", metaTitle: "DP-700 Practice Exams | FabricPrep", metaDescription: "Free DP-700 practice questions for the Microsoft Fabric Data Engineer Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "DP-600": { slug: "dp-600", title: "Microsoft Fabric DP-600 Practice Exam", metaTitle: "DP-600 Practice Exams | FabricPrep", metaDescription: "Free DP-600 practice questions for the Microsoft Fabric Analytics Engineer Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "AZ-900": { slug: "az-900", title: "Microsoft Azure AZ-900 Practice Exam", metaTitle: "AZ-900 Practice Exams | FabricPrep", metaDescription: "Free AZ-900 practice questions for the Microsoft Azure Fundamentals exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "DP-900": { slug: "dp-900", title: "Microsoft Azure DP-900 Practice Exam", metaTitle: "DP-900 Practice Exams | FabricPrep", metaDescription: "Free DP-900 practice questions for the Microsoft Azure Data Fundamentals exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "AZ-104": { slug: "az-104", title: "Microsoft Azure AZ-104 Practice Exam", metaTitle: "AZ-104 Practice Exams | FabricPrep", metaDescription: "Free AZ-104 practice questions for the Microsoft Azure Administrator Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "AI-901": { slug: "ai-901", title: "Microsoft Azure AI-901 Practice Exam", metaTitle: "AI-901 Practice Exams | FabricPrep", metaDescription: "Free AI-901 practice questions for the Microsoft Azure AI Fundamentals (Foundry) exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
  "PL-300": { slug: "pl-300", title: "Microsoft Power BI PL-300 Practice Exam", metaTitle: "PL-300 Practice Exams | FabricPrep", metaDescription: "Free PL-300 practice questions for the Microsoft Power BI Data Analyst Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included." },
};

export const SLUG_TO_EXAM = Object.fromEntries(
  Object.entries(EXAM_META).map(([code, meta]) => [meta.slug, code])
);
