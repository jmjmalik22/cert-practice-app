import { useState, useEffect, useRef } from "react";
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, Flag, ChevronLeft } from "lucide-react";

// ---------------------------------------------------------------------------
// Question bank — grouped by exam, each item tagged with a domain so the
// bank can grow without touching any UI code. Add more objects to either
// array to expand coverage.
// ---------------------------------------------------------------------------
const QUESTION_BANK = {
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
};

const TOKENS = {
  bg: "#0B1220",
  bgDeep: "#070C16",
  panel: "#121C2F",
  panelBorder: "#213050",
  ink: "#EAF0FB",
  inkMuted: "#8FA0C2",
  azure: "#3FA7FF",
  azureDeep: "#1E6FCC",
  amber: "#F0A93A",
  green: "#3ED9A0",
  red: "#FF6B7A",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

const MOCK_LENGTH = 5;
const MOCK_SECONDS = 5 * 60;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Chip({ children, tone = "azure" }) {
  const colors = { azure: TOKENS.azure, amber: TOKENS.amber, green: TOKENS.green, red: TOKENS.red };
  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full"
      style={{ color: colors[tone], background: `${colors[tone]}1A`, border: `1px solid ${colors[tone]}40`, fontFamily: FONT_MONO }}
    >
      {children}
    </span>
  );
}

// Medallion pipeline motif — bronze/silver/gold layers, the same
// architecture the study guide teaches, rendered as line art.
function MedallionMotif({ opacity = 1 }) {
  const nodes = [
    { x: 60, cy: "Bronze", color: "#C58A5A" },
    { x: 260, cy: "Silver", color: "#B9C2D0" },
    { x: 460, cy: "Gold", color: "#E8B84B" },
  ];
  return (
    <svg viewBox="0 0 520 140" width="100%" style={{ maxWidth: 520, opacity }}>
      <line x1="60" y1="70" x2="460" y2="70" stroke={TOKENS.panelBorder} strokeWidth="1.5" strokeDasharray="4 6" />
      {nodes.map((n, i) => (
        <g key={n.cy}>
          <circle cx={n.x} cy="70" r="26" fill={TOKENS.bg} stroke={n.color} strokeWidth="1.5" />
          <circle cx={n.x} cy="70" r="5" fill={n.color} />
          <text x={n.x} y="112" textAnchor="middle" fontSize="12" fill={TOKENS.inkMuted} fontFamily={FONT_MONO} letterSpacing="0.05em">
            {n.cy.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between px-6 sm:px-10 py-5">
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
          style={{ background: `linear-gradient(135deg, ${TOKENS.azure}, ${TOKENS.azureDeep})`, color: "#04101F", fontFamily: FONT_MONO }}
        >
          FP
        </div>
        <span className="text-sm font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          FabricPrep
        </span>
      </div>
      <span className="text-xs hidden sm:block" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
        by Jitendra Singh Malik
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div className="text-center py-8 px-6">
      <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
        Built by <span style={{ color: TOKENS.azure }}>Jitendra Singh Malik</span> · Independent DP-700 / DP-600 study resource
      </p>
      <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted, opacity: 0.6 }}>
        Not affiliated with or endorsed by Microsoft.
      </p>
    </div>
  );
}

function Home({ onStart }) {
  const [exam, setExam] = useState("DP-700");
  const totalQuestions = Object.values(QUESTION_BANK).reduce((sum, d) => sum + d.questions.length, 0);

  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center flex flex-col items-center">
            <div
              className="text-xs uppercase mb-4 px-3 py-1 rounded-full inline-block"
              style={{ color: TOKENS.azure, letterSpacing: "0.18em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
            >
              Bronze → Silver → Gold
            </div>
            <MedallionMotif />
            <h1 className="text-3xl sm:text-4xl font-semibold mt-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Sit the exam before you sit the exam
            </h1>
            <p className="mt-3 text-sm max-w-sm" style={{ color: TOKENS.inkMuted }}>
              {totalQuestions} practice questions across Fabric Data Engineer and Analytics Engineer certifications.
            </p>
          </div>

          <div className="rounded-2xl p-5 mb-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="text-xs mb-3 font-medium tracking-wide" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
              CHOOSE AN EXAM
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(QUESTION_BANK).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => setExam(code)}
                  className="text-left rounded-xl p-3 transition-all relative overflow-hidden"
                  style={{
                    background: exam === code ? `linear-gradient(135deg, ${TOKENS.azure}22, transparent)` : "transparent",
                    border: `1px solid ${exam === code ? TOKENS.azure : TOKENS.panelBorder}`,
                  }}
                >
                  <div className="font-semibold text-sm" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>{code}</div>
                  <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{data.label}</div>
                  <div className="text-xs mt-2" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>
                    {data.questions.length} questions
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onStart(exam, "practice")}
              className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <RotateCcw size={16} color={TOKENS.azure} />
                <span className="font-semibold" style={{ color: TOKENS.ink }}>Practice mode</span>
              </div>
              <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                Untimed. Instant feedback and explanations after every question.
              </p>
            </button>

            <button
              onClick={() => onStart(exam, "mock")}
              className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} color={TOKENS.amber} />
                <span className="font-semibold" style={{ color: TOKENS.ink }}>Mock exam</span>
              </div>
              <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                {MOCK_LENGTH} questions, {Math.round(MOCK_SECONDS / 60)}-minute timer, scored at the end.
              </p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Practice({ exam, onExit }) {
  const pool = QUESTION_BANK[exam].questions;
  const [order] = useState(() => shuffle(pool));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, seen: 0 });

  const q = order[idx % order.length];

  function choose(optId) {
    if (revealed) return;
    setSelected(optId);
    setRevealed(true);
    setScore((s) => ({ correct: s.correct + (optId === q.correct ? 1 : 0), seen: s.seen + 1 }));
  }

  function next() {
    setSelected(null);
    setRevealed(false);
    setIdx((i) => i + 1);
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={<Chip tone="azure">{exam} · Practice</Chip>}
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{q.domain}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
          <span style={{ fontFamily: FONT_MONO }}>Score: {score.correct}/{score.seen}</span>
        </span>
      </div>

      <QuestionCard q={q} selected={selected} revealed={revealed} onChoose={choose} />

      {revealed && (
        <div className="flex justify-end mt-5">
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: "#04101F" }}
          >
            Next question <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function MockExam({ exam, onExit }) {
  const pool = QUESTION_BANK[exam].questions;
  const [order] = useState(() => shuffle(pool).slice(0, Math.min(MOCK_LENGTH, pool.length)));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(MOCK_SECONDS);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (finished) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [finished]);

  const q = order[idx];
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  function choose(optId) {
    setAnswers((a) => ({ ...a, [q.id]: optId }));
  }

  function goto(i) {
    setIdx(Math.max(0, Math.min(order.length - 1, i)));
  }

  if (finished) {
    const correctCount = order.filter((qq) => answers[qq.id] === qq.correct).length;
    return (
      <div className="min-h-full px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar left={<span className="text-sm font-medium" style={{ color: TOKENS.ink }}>Results</span>} right={<Chip tone="amber">{exam} · Mock exam</Chip>} />

        <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-5xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>
            {correctCount}/{order.length}
          </div>
          <div className="text-sm mt-2" style={{ color: TOKENS.inkMuted }}>
            {Math.round((correctCount / order.length) * 100)}% correct
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.map((qq, i) => {
            const given = answers[qq.id];
            const isCorrect = given === qq.correct;
            return (
              <div key={qq.id} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <div className="flex items-start gap-2">
                  {isCorrect ? <CheckCircle2 size={18} color={TOKENS.green} /> : <XCircle size={18} color={TOKENS.red} />}
                  <div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                      Q{i + 1}. {qq.question}
                    </div>
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>
                      {given ? (
                        <>Your answer: <span style={{ color: isCorrect ? TOKENS.green : TOKENS.red }}>{qq.options.find((o) => o.id === given)?.text}</span></>
                      ) : (
                        <span style={{ color: TOKENS.amber }}>Not answered</span>
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-xs mt-1" style={{ color: TOKENS.green }}>
                        Correct: {qq.options.find((o) => o.id === qq.correct)?.text}
                      </div>
                    )}
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>{qq.explanation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={onExit} className="px-5 py-2.5 rounded-full font-medium text-sm" style={{ background: TOKENS.azure, color: "#04101F" }}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={
          <div className="flex items-center gap-2">
            <Clock size={14} color={secondsLeft < 30 ? TOKENS.red : TOKENS.amber} />
            <span className="text-sm font-mono" style={{ color: secondsLeft < 30 ? TOKENS.red : TOKENS.ink }}>{mm}:{ss}</span>
          </div>
        }
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>Question {idx + 1} of {order.length}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{Object.keys(answers).length} answered</span>
      </div>

      <div className="flex gap-1 mb-5">
        {order.map((qq, i) => (
          <div
            key={qq.id}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: answers[qq.id] ? TOKENS.azure : i === idx ? TOKENS.panelBorder : "#1B2740" }}
          />
        ))}
      </div>

      <QuestionCard q={q} selected={answers[q.id] || null} revealed={false} onChoose={choose} />

      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => goto(idx - 1)}
          disabled={idx === 0}
          className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30"
          style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
        >
          Back
        </button>
        {idx === order.length - 1 ? (
          <button
            onClick={() => setFinished(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.green, color: "#04101F" }}
          >
            <Flag size={16} /> Submit exam
          </button>
        ) : (
          <button
            onClick={() => goto(idx + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: "#04101F" }}
          >
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function TopBar({ left, right }) {
  return (
    <div className="flex items-center justify-between">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function QuestionCard({ q, selected, revealed, onChoose }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="text-base font-medium mb-5" style={{ color: TOKENS.ink }}>{q.question}</div>
      <div className="space-y-2.5">
        {q.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrectOpt = opt.id === q.correct;
          let border = TOKENS.panelBorder;
          let bg = "transparent";
          if (revealed) {
            if (isCorrectOpt) { border = TOKENS.green; bg = `${TOKENS.green}14`; }
            else if (isSelected) { border = TOKENS.red; bg = `${TOKENS.red}14`; }
          } else if (isSelected) {
            border = TOKENS.azure; bg = `${TOKENS.azure}14`;
          }
          return (
            <button
              key={opt.id}
              onClick={() => onChoose(opt.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-colors"
              style={{ border: `1px solid ${border}`, background: bg, color: TOKENS.ink }}
            >
              <span>{opt.text}</span>
              {revealed && isCorrectOpt && <CheckCircle2 size={16} color={TOKENS.green} />}
              {revealed && isSelected && !isCorrectOpt && <XCircle size={16} color={TOKENS.red} />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4 text-xs leading-relaxed p-3 rounded-lg" style={{ color: TOKENS.inkMuted, background: "#0E1626" }}>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [exam, setExam] = useState("DP-700");

  function start(examCode, mode) {
    setExam(examCode);
    setScreen(mode);
  }

  return (
    <div className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "'Inter', sans-serif" }}>
      {screen === "home" && <Home onStart={start} />}
      {screen === "practice" && <Practice exam={exam} onExit={() => setScreen("home")} />}
      {screen === "mock" && <MockExam exam={exam} onExit={() => setScreen("home")} />}
    </div>
  );
}