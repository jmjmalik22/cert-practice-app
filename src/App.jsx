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
                  className="text-left rounded-xl p-4 transition-all relative overflow-hidden"
                  style={{
                    background: exam === code ? `linear-gradient(135deg, ${TOKENS.azure}22, transparent)` : "transparent",
                    border: `1px solid ${exam === code ? TOKENS.azure : TOKENS.panelBorder}`,
                  }}
                >
                  <div className="font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>{code}</div>
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