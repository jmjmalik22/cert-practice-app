export const DP_700 = {
  "label": "Fabric Data Engineer Associate",
  "questions": [
    {
      "id": "700-1",
      "domain": "Implement and manage an analytics solution",
      "question": "You need to ingest data from an on-premises SQL Server into a Fabric Lakehouse on a recurring schedule with minimal setup. Which Fabric item should you use?",
      "options": [
        {
          "id": "a",
          "text": "A Dataflow Gen2"
        },
        {
          "id": "b",
          "text": "A Data Pipeline with a Copy activity"
        },
        {
          "id": "c",
          "text": "A KQL Database"
        },
        {
          "id": "d",
          "text": "A Semantic model"
        }
      ],
      "correct": "b",
      "explanation": "A Data Pipeline with a Copy activity, using the on-premises data gateway, is the standard way to schedule recurring ingestion into a Lakehouse from an on-prem source."
    },
    {
      "id": "700-2",
      "domain": "Ingest and transform data",
      "question": "Which file format is the default storage format for tables in a Fabric Lakehouse?",
      "options": [
        {
          "id": "a",
          "text": "CSV"
        },
        {
          "id": "b",
          "text": "Parquet"
        },
        {
          "id": "c",
          "text": "Delta"
        },
        {
          "id": "d",
          "text": "Avro"
        }
      ],
      "correct": "c",
      "explanation": "Fabric Lakehouse tables are stored as Delta tables (Delta Lake format, itself built on Parquet), which gives you ACID transactions and time travel."
    },
    {
      "id": "700-3",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You notice a Fabric Spark job is spending excessive time on small file reads. What is the recommended remediation?",
      "options": [
        {
          "id": "a",
          "text": "Disable V-Order"
        },
        {
          "id": "b",
          "text": "Run OPTIMIZE (compaction) on the table"
        },
        {
          "id": "c",
          "text": "Convert the table to CSV"
        },
        {
          "id": "d",
          "text": "Increase the Spark pool node count only"
        }
      ],
      "correct": "b",
      "explanation": "Small-file problems are solved by compacting files with OPTIMIZE, which merges small Parquet/Delta files into larger ones for more efficient reads."
    },
    {
      "id": "700-4",
      "domain": "Implement and manage an analytics solution",
      "question": "Which Fabric workload would you use to run real-time analytics over streaming event data using KQL?",
      "options": [
        {
          "id": "a",
          "text": "Data Warehouse"
        },
        {
          "id": "b",
          "text": "Eventhouse / KQL Database"
        },
        {
          "id": "c",
          "text": "Lakehouse SQL analytics endpoint"
        },
        {
          "id": "d",
          "text": "Dataflow Gen1"
        }
      ],
      "correct": "b",
      "explanation": "Eventhouse (backed by a KQL Database) is Fabric's real-time analytics workload, purpose-built for querying streaming and time-series data with KQL."
    },
    {
      "id": "700-5",
      "domain": "Ingest and transform data",
      "question": "In a medallion architecture built on Fabric, what is the primary purpose of the silver layer?",
      "options": [
        {
          "id": "a",
          "text": "Store raw, unmodified source data"
        },
        {
          "id": "b",
          "text": "Store cleansed, validated, and conformed data"
        },
        {
          "id": "c",
          "text": "Store business-level aggregates only"
        },
        {
          "id": "d",
          "text": "Store semantic model metadata"
        }
      ],
      "correct": "b",
      "explanation": "Bronze holds raw data, silver holds cleansed/validated/conformed data, and gold holds business-level, aggregated data ready for reporting."
    },
    {
      "id": "700-6",
      "domain": "Monitor and optimize an analytics solution",
      "question": "Which tool would you use to monitor the run history and status of Fabric Data Pipelines and Spark jobs across a workspace?",
      "options": [
        {
          "id": "a",
          "text": "Monitoring hub"
        },
        {
          "id": "b",
          "text": "Power BI Service usage metrics"
        },
        {
          "id": "c",
          "text": "Azure Monitor Workbooks only"
        },
        {
          "id": "d",
          "text": "Purview Data Catalog"
        }
      ],
      "correct": "a",
      "explanation": "The Fabric Monitoring hub gives a centralized view of item activity — pipeline runs, Spark jobs, refreshes — across a tenant or workspace."
    },
    {
      "id": "700-7",
      "domain": "Implement and manage an analytics solution",
      "question": "You want row-level security enforced on a Fabric Warehouse table so different sales reps see only their own region's rows. What should you implement?",
      "options": [
        {
          "id": "a",
          "text": "A Dataflow filter"
        },
        {
          "id": "b",
          "text": "A security predicate function bound via CREATE SECURITY POLICY"
        },
        {
          "id": "c",
          "text": "A Power BI RLS role only"
        },
        {
          "id": "d",
          "text": "Object-level permissions (GRANT SELECT)"
        }
      ],
      "correct": "b",
      "explanation": "Row-level security in a Fabric Warehouse is implemented with a predicate function bound to the table through CREATE SECURITY POLICY, similar to SQL Server RLS."
    },
    {
      "id": "700-8",
      "domain": "Ingest and transform data",
      "question": "Which Fabric item provides a low-code, Power Query-based experience for transforming data before loading it to a Lakehouse or Warehouse?",
      "options": [
        {
          "id": "a",
          "text": "Notebook"
        },
        {
          "id": "b",
          "text": "Dataflow Gen2"
        },
        {
          "id": "c",
          "text": "KQL Queryset"
        },
        {
          "id": "d",
          "text": "Data Activator"
        }
      ],
      "correct": "b",
      "explanation": "Dataflow Gen2 uses the familiar Power Query editor for low-code transformations and can write output directly to a Lakehouse or Warehouse."
    },
    {
      "id": "700-9",
      "domain": "Fabric foundations and OneLake",
      "question": "What is the correct relationship between a workspace, OneLake, and a lakehouse in Microsoft Fabric?",
      "options": [
        {
          "id": "a",
          "text": "OneLake is an item stored inside a workspace"
        },
        {
          "id": "b",
          "text": "A workspace is an organisational/security boundary; OneLake is the storage foundation; a lakehouse is an item inside a workspace"
        },
        {
          "id": "c",
          "text": "A lakehouse is the storage foundation for OneLake"
        },
        {
          "id": "d",
          "text": "Workspaces and OneLake are the same concept"
        }
      ],
      "correct": "b",
      "explanation": "A workspace organizes items for collaboration and access control, OneLake is the shared storage foundation underneath, and a lakehouse (like a warehouse or eventhouse) is an item that lives inside a workspace."
    },
    {
      "id": "700-10",
      "domain": "Data ingestion and orchestration",
      "question": "In a Fabric data pipeline, what is the key difference between a parameter and a variable?",
      "options": [
        {
          "id": "a",
          "text": "A parameter stores a value during a run; a variable is supplied to make the pipeline reusable"
        },
        {
          "id": "b",
          "text": "A parameter is supplied to make the pipeline reusable; a variable stores or updates a value during a specific run"
        },
        {
          "id": "c",
          "text": "They are interchangeable terms for the same feature"
        },
        {
          "id": "d",
          "text": "Only variables can be used with ForEach activities"
        }
      ],
      "correct": "b",
      "explanation": "A parameter is passed in so the same pipeline can process different files, dates, or entities. A variable holds or updates a value while a specific pipeline run is executing."
    },
    {
      "id": "700-11",
      "domain": "Data ingestion and orchestration",
      "question": "You need to move a large volume of data from a source to a Lakehouse largely as-is, with transformation planned for later in a notebook. Which activity is the best fit?",
      "options": [
        {
          "id": "a",
          "text": "Dataflow Gen2"
        },
        {
          "id": "b",
          "text": "Copy Data activity"
        },
        {
          "id": "c",
          "text": "Activator rule"
        },
        {
          "id": "d",
          "text": "KQL update policy"
        }
      ],
      "correct": "b",
      "explanation": "Copy Data is designed for efficient, high-performance movement of data with little or no transformation, leaving reshaping work to a later notebook or SQL step."
    },
    {
      "id": "700-12",
      "domain": "Apache Spark and notebooks",
      "question": "In Fabric Spark notebooks, what is the difference between a temporary view and a table saved to the catalog?",
      "options": [
        {
          "id": "a",
          "text": "A temporary view is session-based; a catalog table is persistent"
        },
        {
          "id": "b",
          "text": "A temporary view is persistent; a catalog table is session-based"
        },
        {
          "id": "c",
          "text": "Both persist permanently across sessions"
        },
        {
          "id": "d",
          "text": "Temporary views can only be created in SQL, not PySpark"
        }
      ],
      "correct": "a",
      "explanation": "createOrReplaceTempView() creates a view that only exists for the current session, while a managed table saved to the catalog (typically Delta) persists beyond the session."
    },
    {
      "id": "700-13",
      "domain": "Lakehouse, Delta Lake and medallion architecture",
      "question": "What is the primary purpose of the _delta_log folder in a Delta table?",
      "options": [
        {
          "id": "a",
          "text": "It stores a backup copy of the raw CSV source files"
        },
        {
          "id": "b",
          "text": "It records the transaction history that enables ACID behaviour, schema enforcement, and time travel"
        },
        {
          "id": "c",
          "text": "It stores the Power BI semantic model definition"
        },
        {
          "id": "d",
          "text": "It caches query results for the SQL analytics endpoint"
        }
      ],
      "correct": "b",
      "explanation": "The _delta_log folder holds the transaction log that gives Delta tables ACID transactions, schema enforcement, CRUD support, and the ability to time travel to previous versions."
    },
    {
      "id": "700-14",
      "domain": "Lakehouse, Delta Lake and medallion architecture",
      "question": "A lakehouse table has accumulated many small files after frequent small writes. Which maintenance operation compacts the existing small files?",
      "options": [
        {
          "id": "a",
          "text": "VACUUM"
        },
        {
          "id": "b",
          "text": "OPTIMIZE"
        },
        {
          "id": "c",
          "text": "Optimize Write"
        },
        {
          "id": "d",
          "text": "V-Order"
        }
      ],
      "correct": "b",
      "explanation": "OPTIMIZE compacts existing small files after the fact, whereas Optimize Write reduces small-file creation during the write itself — a subtly different, commonly-confused pair."
    },
    {
      "id": "700-15",
      "domain": "Fabric Data Warehouse",
      "question": "Under a Type 2 slowly changing dimension, how is a change to an existing dimension attribute handled?",
      "options": [
        {
          "id": "a",
          "text": "The existing row's value is overwritten and history is lost"
        },
        {
          "id": "b",
          "text": "A new row is inserted so full history is retained"
        },
        {
          "id": "c",
          "text": "The change is stored in an extra column alongside the original value"
        },
        {
          "id": "d",
          "text": "The attribute is dropped from the dimension"
        }
      ],
      "correct": "b",
      "explanation": "Type 2 SCD preserves history by inserting a new row for each change, unlike Type 1 (overwrite, no history) or Type 3 (limited history kept in extra columns)."
    },
    {
      "id": "700-16",
      "domain": "Fabric Data Warehouse",
      "question": "Why are dimension tables typically loaded before fact tables in a warehouse ETL process?",
      "options": [
        {
          "id": "a",
          "text": "Fact tables must map incoming business keys to the correct dimension surrogate keys"
        },
        {
          "id": "b",
          "text": "Dimension tables are always smaller so they load faster"
        },
        {
          "id": "c",
          "text": "Fabric enforces this order automatically and it cannot be changed"
        },
        {
          "id": "d",
          "text": "Fact tables cannot contain foreign keys"
        }
      ],
      "correct": "a",
      "explanation": "Fact rows need to look up the correct dimension surrogate keys, so dimensions generally need to already contain the relevant records before facts are loaded."
    },
    {
      "id": "700-17",
      "domain": "Real-Time Intelligence",
      "question": "You need to filter, reshape, and route streaming events while they are still in transit, before they land in storage. Which Fabric component fits best?",
      "options": [
        {
          "id": "a",
          "text": "Eventhouse"
        },
        {
          "id": "b",
          "text": "Eventstream"
        },
        {
          "id": "c",
          "text": "KQL queryset"
        },
        {
          "id": "d",
          "text": "Real-Time Dashboard"
        }
      ],
      "correct": "b",
      "explanation": "Eventstream is the no-code experience for capturing, transforming, and routing data in motion, before it reaches a destination like an Eventhouse or Lakehouse."
    },
    {
      "id": "700-18",
      "domain": "Security and access control",
      "question": "In Fabric's permission model, what happens when a user has both a GRANT and a DENY on the same object?",
      "options": [
        {
          "id": "a",
          "text": "GRANT always overrides DENY"
        },
        {
          "id": "b",
          "text": "DENY overrides GRANT"
        },
        {
          "id": "c",
          "text": "The most recently applied permission wins regardless of type"
        },
        {
          "id": "d",
          "text": "Access defaults to allowed unless explicitly revoked"
        }
      ],
      "correct": "b",
      "explanation": "As in standard SQL security models, an explicit DENY always overrides a GRANT for the same object and principal."
    },
    {
      "id": "700-19",
      "domain": "Monitoring and performance",
      "question": "Which set of dynamic management views would you join to identify who is currently running a long query against a Fabric Warehouse and how long it has been active?",
      "options": [
        {
          "id": "a",
          "text": "sys.dm_exec_connections, sys.dm_exec_sessions, sys.dm_exec_requests"
        },
        {
          "id": "b",
          "text": "queryinsights.exec_requests_history only"
        },
        {
          "id": "c",
          "text": "sys.dm_exec_query_stats only"
        },
        {
          "id": "d",
          "text": "Monitor Hub API logs only"
        }
      ],
      "correct": "a",
      "explanation": "Joining sys.dm_exec_connections, sys.dm_exec_sessions, and sys.dm_exec_requests reveals active connections, the authenticated session, and what each session is currently executing."
    },
    {
      "id": "700-20",
      "domain": "CI/CD and lifecycle management",
      "question": "What is the key difference between Git integration and a deployment pipeline in Fabric?",
      "options": [
        {
          "id": "a",
          "text": "Git integration synchronises a workspace with source control; a deployment pipeline promotes items between environment workspaces"
        },
        {
          "id": "b",
          "text": "They perform the same function and only one should be configured"
        },
        {
          "id": "c",
          "text": "Deployment pipelines manage source control; Git integration promotes to production"
        },
        {
          "id": "d",
          "text": "Git integration is only available in the Production stage"
        }
      ],
      "correct": "a",
      "explanation": "Git integration handles version control, branching, and rollback for a workspace, while deployment pipelines promote validated content across Development, Test, and Production stages — complementary but distinct processes."
    },
    {
      "id": "700-21",
      "domain": "Ingest and transform data",
      "question": "Your source system stores data in a proprietary format and you need the entire database available in Fabric as a unit, kept continuously in sync. Which capability should you use?",
      "options": [
        {
          "id": "a",
          "text": "A OneLake shortcut"
        },
        {
          "id": "b",
          "text": "Mirroring"
        },
        {
          "id": "c",
          "text": "A Dataflow Gen2 scheduled refresh"
        },
        {
          "id": "d",
          "text": "V-Order optimization"
        }
      ],
      "correct": "b",
      "explanation": "Mirroring can bring in an entire external database or catalog, and when the source uses a proprietary format it is the only option — shortcuts only work with data already in open formats."
    },
    {
      "id": "700-22",
      "domain": "Ingest and transform data",
      "question": "What is the key difference between a OneLake shortcut and mirroring when the source data is already in an open format like Delta or Parquet?",
      "options": [
        {
          "id": "a",
          "text": "A shortcut references the data in place with zero copy; mirroring can replicate it into OneLake"
        },
        {
          "id": "b",
          "text": "A shortcut always copies the data; mirroring never does"
        },
        {
          "id": "c",
          "text": "They are functionally identical for open-format sources"
        },
        {
          "id": "d",
          "text": "Shortcuts only work for streaming sources"
        }
      ],
      "correct": "a",
      "explanation": "Shortcuts add a reference to data that stays at its source (zero-copy). Mirroring can use replication or shortcuts depending on the source, but for proprietary formats it must replicate — for open formats, a plain shortcut may be simpler."
    },
    {
      "id": "700-23",
      "domain": "Implement and manage an analytics solution",
      "question": "Besides Spark, OneLake, and domain settings, which additional workspace setting can now be configured in Fabric for orchestrating Python-based workflows?",
      "options": [
        {
          "id": "a",
          "text": "Apache Airflow workspace settings"
        },
        {
          "id": "b",
          "text": "Kubernetes workspace settings"
        },
        {
          "id": "c",
          "text": "Terraform workspace settings"
        },
        {
          "id": "d",
          "text": "Docker workspace settings"
        }
      ],
      "correct": "a",
      "explanation": "Fabric workspace settings include configuring Apache Airflow, alongside Spark, domain, and OneLake settings, for orchestrating Python-based data workflows."
    },
    {
      "id": "700-24",
      "domain": "Real-Time Intelligence",
      "question": "Which shortcut-related capability lets you automatically convert data format or remove personally identifiable information as part of referencing external data through OneLake?",
      "options": [
        {
          "id": "a",
          "text": "Shortcut transformations"
        },
        {
          "id": "b",
          "text": "V-Order"
        },
        {
          "id": "c",
          "text": "Query acceleration"
        },
        {
          "id": "d",
          "text": "Dynamic data masking"
        }
      ],
      "correct": "a",
      "explanation": "Shortcut transformations let you apply automatic changes to shortcut-referenced data, such as converting the file format or removing PII, without duplicating the underlying data."
    },
    {
      "id": "700-25",
      "domain": "Real-Time Intelligence",
      "question": "You need fixed, non-overlapping one-minute aggregation windows over streaming sales events grouped by city. Which windowing function fits this requirement?",
      "options": [
        {
          "id": "a",
          "text": "HoppingWindow"
        },
        {
          "id": "b",
          "text": "TumblingWindow"
        },
        {
          "id": "c",
          "text": "SlidingWindow"
        },
        {
          "id": "d",
          "text": "SessionWindow"
        }
      ],
      "correct": "b",
      "explanation": "TumblingWindow produces fixed, non-overlapping time intervals, ideal for periodic aggregations like per-minute sales totals grouped by a dimension such as city."
    },
    {
      "id": "700-26",
      "domain": "Real-Time Intelligence",
      "question": "You want to detect users placing an unusually high number of orders within a rolling 5-minute window, re-evaluated every minute. Which windowing approach is appropriate?",
      "options": [
        {
          "id": "a",
          "text": "TumblingWindow"
        },
        {
          "id": "b",
          "text": "HoppingWindow"
        },
        {
          "id": "c",
          "text": "A single static aggregation"
        },
        {
          "id": "d",
          "text": "VACUUM"
        }
      ],
      "correct": "b",
      "explanation": "HoppingWindow supports overlapping windows — e.g. a 5-minute window evaluated every 1 minute — which suits burst or anomaly detection scenarios like this one."
    },
    {
      "id": "700-27",
      "domain": "Monitor and optimize an analytics solution",
      "question": "In a KQL Eventhouse, which object precomputes a recurring aggregation query so subsequent reads are faster than querying the source table directly?",
      "options": [
        {
          "id": "a",
          "text": "A stored function"
        },
        {
          "id": "b",
          "text": "A materialized view"
        },
        {
          "id": "c",
          "text": "A KQL queryset"
        },
        {
          "id": "d",
          "text": "An update policy"
        }
      ],
      "correct": "b",
      "explanation": "A materialized view returns an up-to-date result of an aggregation query and is faster to query than running the aggregation directly over the source table each time."
    },
    {
      "id": "700-28",
      "domain": "Ingest and transform data",
      "question": "Which KQL operator is required before you can apply window functions to a row set, since window functions depend on row order?",
      "options": [
        {
          "id": "a",
          "text": "project"
        },
        {
          "id": "b",
          "text": "serialize (or an operator that produces a sorted/serialized result, like sort)"
        },
        {
          "id": "c",
          "text": "summarize"
        },
        {
          "id": "d",
          "text": "extend"
        }
      ],
      "correct": "b",
      "explanation": "Window functions require the row set to be serialized — given a specific order — which is achieved with the serialize operator or an operator like sort that emits a sorted row set."
    },
    {
      "id": "700-29",
      "domain": "Implement and manage an analytics solution",
      "question": "Which Fabric feature lets item owners mark content as reviewed and trustworthy, with 'Promoted', 'Certified', and 'Master data' as the available badges?",
      "options": [
        {
          "id": "a",
          "text": "Endorsement"
        },
        {
          "id": "b",
          "text": "Deployment pipelines"
        },
        {
          "id": "c",
          "text": "Sensitivity labels"
        },
        {
          "id": "d",
          "text": "Row-level security"
        }
      ],
      "correct": "a",
      "explanation": "Endorsement provides Promoted, Certified, and Master data badges to help users identify trustworthy, high-quality items. Certification and master data status require authorized reviewers; promotion only requires write permission."
    },
    {
      "id": "700-30",
      "domain": "Implement and manage an analytics solution",
      "question": "Any user with write permissions on an item can apply which endorsement badge without needing special authorization?",
      "options": [
        {
          "id": "a",
          "text": "Certified"
        },
        {
          "id": "b",
          "text": "Master data"
        },
        {
          "id": "c",
          "text": "Promoted"
        },
        {
          "id": "d",
          "text": "None — all badges require admin authorization"
        }
      ],
      "correct": "c",
      "explanation": "Promotion only requires write permissions on the item. Certified and Master data badges require authorization from the Fabric administrator (or delegated domain admins)."
    },
    {
      "id": "700-31",
      "domain": "Implement and manage an analytics solution",
      "question": "Which Fabric governance feature applies classification labels from Microsoft Purview Information Protection to guard sensitive items against unauthorized access?",
      "options": [
        {
          "id": "a",
          "text": "Sensitivity labels"
        },
        {
          "id": "b",
          "text": "Deployment pipelines"
        },
        {
          "id": "c",
          "text": "Workspace roles"
        },
        {
          "id": "d",
          "text": "Audit logs"
        }
      ],
      "correct": "a",
      "explanation": "Sensitivity labels from Microsoft Purview Information Protection classify and protect content, helping meet governance and compliance requirements around who can access sensitive data."
    },
    {
      "id": "700-32",
      "domain": "Implement and manage an analytics solution",
      "question": "You need a record of who accessed or modified Fabric items, for compliance and troubleshooting purposes. Which capability provides this?",
      "options": [
        {
          "id": "a",
          "text": "Fabric audit logs"
        },
        {
          "id": "b",
          "text": "The Monitoring hub"
        },
        {
          "id": "c",
          "text": "OneLake catalog"
        },
        {
          "id": "d",
          "text": "Deployment pipelines"
        }
      ],
      "correct": "a",
      "explanation": "Fabric audit logs capture user and admin activity across the tenant, supporting compliance reviews and investigation of who performed which actions on which items."
    },
    {
      "id": "700-33",
      "domain": "Implement and manage an analytics solution",
      "question": "You're choosing between a Dataflow Gen2, a pipeline, and a notebook to implement a transformation step. Which factor most influences using a notebook over the other two?",
      "options": [
        {
          "id": "a",
          "text": "The transformation requires large-scale, code-first logic beyond what low-code tools support"
        },
        {
          "id": "b",
          "text": "The step just needs to run other items on a schedule"
        },
        {
          "id": "c",
          "text": "The transformation is simple and best expressed visually with Power Query"
        },
        {
          "id": "d",
          "text": "No compute is required at all"
        }
      ],
      "correct": "a",
      "explanation": "Notebooks are the right choice for complex, large-scale, code-first transformations using Spark; Dataflow Gen2 suits low-code Power Query-style transforms, and pipelines primarily orchestrate and schedule other items."
    },
    {
      "id": "700-34",
      "domain": "Implement and manage an analytics solution",
      "question": "You want a Fabric pipeline to run automatically whenever a new file lands in a storage location, rather than on a fixed schedule. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "An event-based trigger"
        },
        {
          "id": "b",
          "text": "A tumbling window trigger only"
        },
        {
          "id": "c",
          "text": "A manual trigger"
        },
        {
          "id": "d",
          "text": "A workspace role change"
        }
      ],
      "correct": "a",
      "explanation": "Event-based triggers start a pipeline run in response to an event, such as a new file arriving in storage, rather than relying solely on a fixed time schedule."
    },
    {
      "id": "700-35",
      "domain": "Ingest and transform data",
      "question": "You are loading a large fact table nightly and want to process only new or changed records rather than reloading everything. Which loading pattern should you design?",
      "options": [
        {
          "id": "a",
          "text": "Full load"
        },
        {
          "id": "b",
          "text": "Incremental load"
        },
        {
          "id": "c",
          "text": "VACUUM"
        },
        {
          "id": "d",
          "text": "Shortcut transformation"
        }
      ],
      "correct": "b",
      "explanation": "An incremental load processes only new or changed records since the last run, which is more efficient than a full load that truncates and reloads the entire target each time."
    },
    {
      "id": "700-36",
      "domain": "Ingest and transform data",
      "question": "Before loading fact data into a dimensional model, incoming records must be matched to the correct dimension surrogate keys. What is this preparation step generally called?",
      "options": [
        {
          "id": "a",
          "text": "Key lookup / surrogate key mapping"
        },
        {
          "id": "b",
          "text": "V-Order compression"
        },
        {
          "id": "c",
          "text": "Query folding"
        },
        {
          "id": "d",
          "text": "Endorsement"
        }
      ],
      "correct": "a",
      "explanation": "Preparing fact data for a dimensional model involves mapping source business keys to the warehouse-generated surrogate keys already present in the dimension tables."
    },
    {
      "id": "700-37",
      "domain": "Ingest and transform data",
      "question": "You need to choose a data store for a new Fabric solution that will support both files and structured Delta tables, queried by Spark and T-SQL alike. Which store fits best?",
      "options": [
        {
          "id": "a",
          "text": "A Lakehouse"
        },
        {
          "id": "b",
          "text": "A KQL database"
        },
        {
          "id": "c",
          "text": "A Power BI report"
        },
        {
          "id": "d",
          "text": "A paginated report"
        }
      ],
      "correct": "a",
      "explanation": "A Lakehouse supports both unstructured/semi-structured files and structured Delta tables, and can be queried through Spark notebooks or the SQL analytics endpoint."
    },
    {
      "id": "700-38",
      "domain": "Ingest and transform data",
      "question": "You're joining a customer dimension and a sales fact table into a single flattened table to simplify downstream reporting queries. What is this transformation called?",
      "options": [
        {
          "id": "a",
          "text": "Denormalization"
        },
        {
          "id": "b",
          "text": "Partitioning"
        },
        {
          "id": "c",
          "text": "Endorsement"
        },
        {
          "id": "d",
          "text": "Mirroring"
        }
      ],
      "correct": "a",
      "explanation": "Denormalizing combines related tables (such as a fact and its dimensions) into a flatter structure, which can simplify and speed up downstream reporting queries."
    },
    {
      "id": "700-39",
      "domain": "Ingest and transform data",
      "question": "A source feed occasionally delivers records for a business day after that day's batch has already been processed. Which concern does this describe?",
      "options": [
        {
          "id": "a",
          "text": "Late-arriving data"
        },
        {
          "id": "b",
          "text": "Query acceleration"
        },
        {
          "id": "c",
          "text": "Shortcut security"
        },
        {
          "id": "d",
          "text": "Semantic model refresh"
        }
      ],
      "correct": "a",
      "explanation": "Late-arriving data refers to records that show up after their related batch has already been processed, requiring specific handling logic so they aren't lost or double-counted."
    },
    {
      "id": "700-40",
      "domain": "Ingest and transform data",
      "question": "You need to choose a streaming engine in Fabric to process high-throughput event data with low-code transformations before it lands in storage. Which is the most direct choice?",
      "options": [
        {
          "id": "a",
          "text": "Eventstream"
        },
        {
          "id": "b",
          "text": "Dataflow Gen2"
        },
        {
          "id": "c",
          "text": "A Fabric Warehouse"
        },
        {
          "id": "d",
          "text": "A paginated report"
        }
      ],
      "correct": "a",
      "explanation": "Eventstream is Fabric's no-code streaming engine for capturing, transforming, and routing high-throughput event data before or as it lands in a destination."
    },
    {
      "id": "700-41",
      "domain": "Ingest and transform data",
      "question": "In Real-Time Intelligence, when should you prefer native Eventhouse tables over OneLake shortcuts as the data source?",
      "options": [
        {
          "id": "a",
          "text": "When you need the fastest possible ingestion and query performance for high-velocity, append-heavy event data"
        },
        {
          "id": "b",
          "text": "When the data already exists elsewhere in OneLake and duplication should be avoided"
        },
        {
          "id": "c",
          "text": "When the data changes only once a year"
        },
        {
          "id": "d",
          "text": "Native tables and shortcuts perform identically in all cases"
        }
      ],
      "correct": "a",
      "explanation": "Native Eventhouse tables are optimized for high-velocity, append-heavy time-series ingestion and querying. Shortcuts avoid duplicating data already available elsewhere in OneLake but may trade off on raw ingestion/query speed."
    },
    {
      "id": "700-42",
      "domain": "Ingest and transform data",
      "question": "Which Real-Time Intelligence feature is designed to speed up queries against OneLake shortcut data by caching or indexing it, compared to a standard shortcut?",
      "options": [
        {
          "id": "a",
          "text": "Query acceleration"
        },
        {
          "id": "b",
          "text": "V-Order"
        },
        {
          "id": "c",
          "text": "Mirroring"
        },
        {
          "id": "d",
          "text": "Endorsement"
        }
      ],
      "correct": "a",
      "explanation": "Query acceleration for OneLake shortcuts improves query performance over shortcut-referenced data compared to a standard shortcut, at the cost of some additional resource use."
    },
    {
      "id": "700-43",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You want to be notified automatically whenever a critical pipeline fails, without checking the Monitoring hub manually. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "An alert"
        },
        {
          "id": "b",
          "text": "A sensitivity label"
        },
        {
          "id": "c",
          "text": "A workspace role"
        },
        {
          "id": "d",
          "text": "A shortcut transformation"
        }
      ],
      "correct": "a",
      "explanation": "Alerts can be configured to automatically notify you when specific conditions occur, such as a pipeline or refresh failure, instead of relying on manually checking the Monitoring hub."
    },
    {
      "id": "700-44",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A Dataflow Gen2 fails intermittently during a scheduled refresh. Where would you look first to identify the root cause?",
      "options": [
        {
          "id": "a",
          "text": "The Dataflow's refresh history and error details in the Monitoring hub"
        },
        {
          "id": "b",
          "text": "The OneLake catalog"
        },
        {
          "id": "c",
          "text": "Workspace roles"
        },
        {
          "id": "d",
          "text": "Sensitivity label settings"
        }
      ],
      "correct": "a",
      "explanation": "The Monitoring hub surfaces Dataflow Gen2 refresh history and error details, which is the natural first place to diagnose an intermittent refresh failure."
    },
    {
      "id": "700-45",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A notebook run fails with a Spark executor out-of-memory error. Which change is most directly relevant to resolving this?",
      "options": [
        {
          "id": "a",
          "text": "Adjust Spark pool sizing or partitioning to reduce memory pressure per task"
        },
        {
          "id": "b",
          "text": "Apply a sensitivity label to the notebook"
        },
        {
          "id": "c",
          "text": "Enable OneLake security roles"
        },
        {
          "id": "d",
          "text": "Certify the notebook"
        }
      ],
      "correct": "a",
      "explanation": "Out-of-memory errors in Spark are typically addressed by adjusting pool/node sizing, increasing partitioning to reduce per-task data volume, or optimizing the transformation logic itself."
    },
    {
      "id": "700-46",
      "domain": "Monitor and optimize an analytics solution",
      "question": "An Eventstream shows data arriving but no records reaching the configured Eventhouse destination. What should you check first?",
      "options": [
        {
          "id": "a",
          "text": "The Eventstream's routing/transformation configuration and destination connection status"
        },
        {
          "id": "b",
          "text": "The semantic model's DirectLakeBehavior setting"
        },
        {
          "id": "c",
          "text": "The warehouse's row-level security policy"
        },
        {
          "id": "d",
          "text": "The deployment pipeline stage assignment"
        }
      ],
      "correct": "a",
      "explanation": "When data enters an Eventstream but doesn't reach its destination, the routing/transformation steps and the destination connection are the most direct things to check for a break in the flow."
    },
    {
      "id": "700-47",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A T-SQL query against a Fabric Warehouse returns a permission error for a specific column. Which security feature most likely explains this behavior?",
      "options": [
        {
          "id": "a",
          "text": "Column-level security or dynamic data masking"
        },
        {
          "id": "b",
          "text": "V-Order"
        },
        {
          "id": "c",
          "text": "OPTIMIZE"
        },
        {
          "id": "d",
          "text": "Endorsement"
        }
      ],
      "correct": "a",
      "explanation": "Column-level security blocks access to specific columns outright, producing permission errors; dynamic data masking instead obscures values without necessarily erroring, so both are worth checking for column-specific access issues."
    },
    {
      "id": "700-48",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A OneLake shortcut suddenly stops returning data. Mirroring on the source item was recently paused. What's the likely relationship?",
      "options": [
        {
          "id": "a",
          "text": "Shortcuts to mirrored tables reflect the same state as the mirrored item, so a paused mirror breaks the shortcut"
        },
        {
          "id": "b",
          "text": "Shortcuts are entirely independent of mirroring status"
        },
        {
          "id": "c",
          "text": "Pausing mirroring only affects Warehouse items, never shortcuts"
        },
        {
          "id": "d",
          "text": "Shortcuts automatically switch to a cached copy when mirroring pauses"
        }
      ],
      "correct": "a",
      "explanation": "If a mirrored source is paused, deleted, or hits a replication error, every shortcut pointing to it reflects that same state — so pausing mirroring directly breaks dependent shortcuts."
    },
    {
      "id": "700-49",
      "domain": "Monitor and optimize an analytics solution",
      "question": "Queries against a large Lakehouse table are slow due to excessive small files from frequent incremental writes. Besides OPTIMIZE, which setting helps prevent this from recurring?",
      "options": [
        {
          "id": "a",
          "text": "Optimize Write"
        },
        {
          "id": "b",
          "text": "Dynamic data masking"
        },
        {
          "id": "c",
          "text": "Row-level security"
        },
        {
          "id": "d",
          "text": "A deployment pipeline"
        }
      ],
      "correct": "a",
      "explanation": "Optimize Write reduces the creation of small files during writes themselves, complementing OPTIMIZE (which compacts files that already exist) to prevent the small-file problem from recurring."
    },
    {
      "id": "700-50",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A Fabric Warehouse query performs a full table scan when a WHERE clause filters on a large table's date column. Which optimization is most likely to help?",
      "options": [
        {
          "id": "a",
          "text": "Partitioning or indexing/statistics tuned around the date column"
        },
        {
          "id": "b",
          "text": "Applying a sensitivity label"
        },
        {
          "id": "c",
          "text": "Enabling OneLake security roles"
        },
        {
          "id": "d",
          "text": "Switching to Import mode in Power BI"
        }
      ],
      "correct": "a",
      "explanation": "For large tables filtered by a common column like date, partitioning or ensuring statistics/indexes support that filter helps the engine skip irrelevant data instead of scanning the whole table."
    },
    {
      "id": "700-51",
      "domain": "Monitor and optimize an analytics solution",
      "question": "An Eventhouse KQL query scanning a large table is slow even with a time filter applied early. What KQL practice most directly improves this?",
      "options": [
        {
          "id": "a",
          "text": "Project only the required columns after filtering, and consider a materialized view for repeated aggregations"
        },
        {
          "id": "b",
          "text": "Remove the time filter entirely"
        },
        {
          "id": "c",
          "text": "Switch the query to T-SQL syntax"
        },
        {
          "id": "d",
          "text": "Increase the KQL queryset's row limit"
        }
      ],
      "correct": "a",
      "explanation": "Projecting only needed columns reduces processing overhead, and materialized views precompute recurring aggregations — both directly reduce the cost of repeated large-scale KQL queries."
    },
    {
      "id": "700-52",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A Spark job in a notebook spends most of its time on a single task while other executors sit idle. What does this pattern usually indicate?",
      "options": [
        {
          "id": "a",
          "text": "Data skew across partitions"
        },
        {
          "id": "b",
          "text": "A missing sensitivity label"
        },
        {
          "id": "c",
          "text": "A misconfigured deployment pipeline stage"
        },
        {
          "id": "d",
          "text": "An expired workspace role assignment"
        }
      ],
      "correct": "a",
      "explanation": "When one task runs far longer than others while executors sit idle, it usually points to data skew — an uneven distribution of data across partitions — which can be addressed with better partitioning or salting keys."
    },
    {
      "id": "700-53",
      "domain": "Implement and manage an analytics solution",
      "question": "You need to move data between two Fabric workspaces that are in different development stages (Dev, Test, Prod) while keeping item names consistent and swapping only environment-specific connections. What should you use?",
      "options": [
        { "id": "a", "text": "Deployment pipelines" },
        { "id": "b", "text": "A Dataflow Gen2" },
        { "id": "c", "text": "OneLake shortcuts" },
        { "id": "d", "text": "Data Activator" }
      ],
      "correct": "a",
      "explanation": "Fabric deployment pipelines move content across Dev/Test/Prod stages, and deployment rules let you swap environment-specific connections while keeping item names the same."
    },
    {
      "id": "700-54",
      "domain": "Implement and manage an analytics solution",
      "question": "Your organization wants every workspace change to be tracked in version control and deployed through pull requests instead of manual promotion. Which Fabric capability should you configure?",
      "options": [
        { "id": "a", "text": "Git integration for the workspace" },
        { "id": "b", "text": "A Lakehouse shortcut" },
        { "id": "c", "text": "A Capacity Metrics app alert" },
        { "id": "d", "text": "Row-level security on a semantic model" }
      ],
      "correct": "a",
      "explanation": "Git integration connects a Fabric workspace to a repository (such as Azure DevOps or GitHub), so changes are tracked as commits and can flow through branches and pull requests."
    },
    {
      "id": "700-55",
      "domain": "Implement and manage an analytics solution",
      "question": "You want to programmatically create and update Fabric items (like Lakehouses and Pipelines) as part of an automated provisioning script rather than clicking through the portal. What should you use?",
      "options": [
        { "id": "a", "text": "The Fabric REST API" },
        { "id": "b", "text": "The Capacity Metrics app" },
        { "id": "c", "text": "Data Activator" },
        { "id": "d", "text": "A KQL queryset" }
      ],
      "correct": "a",
      "explanation": "The Fabric REST API exposes item-level operations (create, update, delete) so item provisioning and management can be automated outside the portal UI."
    },
    {
      "id": "700-56",
      "domain": "Implement and manage an analytics solution",
      "question": "Two workspaces need to query the same underlying Delta table in OneLake without duplicating the data or setting up a separate ingestion pipeline. What should you create?",
      "options": [
        { "id": "a", "text": "A OneLake shortcut" },
        { "id": "b", "text": "A Dataflow Gen2 with staging" },
        { "id": "c", "text": "A Data Activator reflex" },
        { "id": "d", "text": "A deployment pipeline rule" }
      ],
      "correct": "a",
      "explanation": "OneLake shortcuts create a virtual reference to data stored elsewhere in OneLake (or external storage), letting multiple items or workspaces access the same data without copying it."
    },
    {
      "id": "700-57",
      "domain": "Implement and manage an analytics solution",
      "question": "You need to grant a specific team read access to only certain tables and rows in a Lakehouse, without giving them workspace-level admin rights. Which capability fits best?",
      "options": [
        { "id": "a", "text": "OneLake data access roles" },
        { "id": "b", "text": "A workspace Admin role assignment" },
        { "id": "c", "text": "A deployment pipeline stage" },
        { "id": "d", "text": "A capacity smoothing policy" }
      ],
      "correct": "a",
      "explanation": "OneLake data access roles let you define fine-grained, table- and folder-level (and with additional configuration, row-level) permissions without granting broader workspace roles."
    },
    {
      "id": "700-58",
      "domain": "Implement and manage an analytics solution",
      "question": "Your Fabric capacity is regularly hitting throttling during peak ingestion windows even though average utilization looks fine. Which capacity behavior explains smoothing out short bursts over time?",
      "options": [
        { "id": "a", "text": "Capacity smoothing and bursting" },
        { "id": "b", "text": "Row-level security evaluation" },
        { "id": "c", "text": "Git branch merging" },
        { "id": "d", "text": "Shortcut caching" }
      ],
      "correct": "a",
      "explanation": "Fabric capacities use smoothing to spread compute consumption over a rolling window and allow bursting for short spikes, which is why average utilization can look fine while peak windows still trigger throttling."
    },
    {
      "id": "700-59",
      "domain": "Implement and manage an analytics solution",
      "question": "You want a workspace administrator to be alerted automatically before a capacity is projected to run out of available compute for the day. What should you configure?",
      "options": [
        { "id": "a", "text": "An alert in the Capacity Metrics app" },
        { "id": "b", "text": "A Data Activator reflex on a semantic model" },
        { "id": "c", "text": "A deployment pipeline rule" },
        { "id": "d", "text": "A OneLake shortcut" }
      ],
      "correct": "a",
      "explanation": "The Capacity Metrics app provides visibility into capacity consumption trends and lets admins set alerts before compute is exhausted, so they can act proactively."
    },
    {
      "id": "700-60",
      "domain": "Implement and manage an analytics solution",
      "question": "A dataset column contains customer national ID numbers, and you need to prevent even workspace viewers from seeing the raw values in Power BI reports built on a Direct Lake semantic model. Which control should you apply?",
      "options": [
        { "id": "a", "text": "Column-level or object-level security on the semantic model" },
        { "id": "b", "text": "A OneLake shortcut" },
        { "id": "c", "text": "A Dataflow Gen2 staging area" },
        { "id": "d", "text": "Capacity bursting" }
      ],
      "correct": "a",
      "explanation": "Object-level (including column-level) security on the semantic model restricts which fields are visible to report viewers, regardless of their broader workspace access."
    },
    {
      "id": "700-61",
      "domain": "Implement and manage an analytics solution",
      "question": "You need to classify a Lakehouse containing regulated financial data so downstream sharing and export are governed automatically according to your organization's data protection policy. What should you apply?",
      "options": [
        { "id": "a", "text": "A sensitivity label" },
        { "id": "b", "text": "A OneLake shortcut" },
        { "id": "c", "text": "A capacity smoothing rule" },
        { "id": "d", "text": "A deployment pipeline stage" }
      ],
      "correct": "a",
      "explanation": "Sensitivity labels, integrated with Microsoft Purview, classify items like Lakehouses so protection and governance policies (such as restricting export) are enforced automatically."
    },
    {
      "id": "700-62",
      "domain": "Ingest and transform data",
      "question": "You need a low-code, visual way to connect to dozens of source systems, apply Power Query transformations, and land the result in a Lakehouse table on a schedule. Which item should you use?",
      "options": [
        { "id": "a", "text": "A Dataflow Gen2" },
        { "id": "b", "text": "A Spark notebook" },
        { "id": "c", "text": "An Eventstream" },
        { "id": "d", "text": "A KQL queryset" }
      ],
      "correct": "a",
      "explanation": "Dataflow Gen2 provides a low-code, Power Query-based experience for connecting to many source types, transforming data visually, and loading it into a Lakehouse or Warehouse."
    },
    {
      "id": "700-63",
      "domain": "Ingest and transform data",
      "question": "You need to orchestrate a sequence of activities — copy data, then run a notebook, then refresh a semantic model — with conditional branching and scheduling. What should you build?",
      "options": [
        { "id": "a", "text": "A Data Pipeline" },
        { "id": "b", "text": "A single Dataflow Gen2" },
        { "id": "c", "text": "A KQL Database" },
        { "id": "d", "text": "A Data Activator reflex" }
      ],
      "correct": "a",
      "explanation": "Data Pipelines orchestrate multiple activities — copy, notebook execution, dataflow runs, semantic model refresh — with control flow, conditions, and scheduling."
    },
    {
      "id": "700-64",
      "domain": "Ingest and transform data",
      "question": "You need to write custom, highly performant transformation logic against a very large dataset using distributed processing, including complex joins and window functions on DataFrames. What should you use?",
      "options": [
        { "id": "a", "text": "A Spark notebook using PySpark or Spark SQL" },
        { "id": "b", "text": "A Dataflow Gen2 only" },
        { "id": "c", "text": "A KQL queryset" },
        { "id": "d", "text": "A Data Activator rule" }
      ],
      "correct": "a",
      "explanation": "Spark notebooks give you full programmatic control with PySpark or Spark SQL for complex, large-scale distributed transformations that go beyond what a low-code dataflow easily supports."
    },
    {
      "id": "700-65",
      "domain": "Ingest and transform data",
      "question": "A Lakehouse table has accumulated thousands of small Parquet files from frequent small writes, slowing down read performance. Which command should you run to compact them?",
      "options": [
        { "id": "a", "text": "OPTIMIZE" },
        { "id": "b", "text": "VACUUM" },
        { "id": "c", "text": "MERGE" },
        { "id": "d", "text": "DESCRIBE HISTORY" }
      ],
      "correct": "a",
      "explanation": "The Delta Lake OPTIMIZE command compacts many small files into larger ones, improving read performance for tables that receive frequent small writes."
    },
    {
      "id": "700-66",
      "domain": "Ingest and transform data",
      "question": "After running OPTIMIZE on a Delta table repeatedly, storage costs keep climbing because old file versions are retained. What should you run to remove files no longer referenced beyond the retention window?",
      "options": [
        { "id": "a", "text": "VACUUM" },
        { "id": "b", "text": "OPTIMIZE" },
        { "id": "c", "text": "ALTER TABLE" },
        { "id": "d", "text": "CREATE SHORTCUT" }
      ],
      "correct": "a",
      "explanation": "VACUUM removes stale, unreferenced Delta files beyond the configured retention period, reclaiming storage after operations like OPTIMIZE leave old versions behind."
    },
    {
      "id": "700-67",
      "domain": "Ingest and transform data",
      "question": "You want writes to a Delta table to automatically use an optimized file layout that improves downstream Power BI Direct Lake query performance, without manually scheduling maintenance jobs. Which Fabric capability should you rely on?",
      "options": [
        { "id": "a", "text": "V-Order write optimization" },
        { "id": "b", "text": "A OneLake shortcut" },
        { "id": "c", "text": "A capacity smoothing rule" },
        { "id": "d", "text": "A deployment pipeline rule" }
      ],
      "correct": "a",
      "explanation": "V-Order applies a special sort and compression optimization to Parquet files as they're written in Fabric, improving read performance for Direct Lake and other Fabric engines without extra jobs."
    },
    {
      "id": "700-68",
      "domain": "Ingest and transform data",
      "question": "You are merging daily incremental customer updates into a Delta table, matching on customer ID and updating changed rows while inserting new ones. Which Delta Lake statement is designed for this?",
      "options": [
        { "id": "a", "text": "MERGE INTO" },
        { "id": "b", "text": "TRUNCATE TABLE" },
        { "id": "c", "text": "CREATE SHORTCUT" },
        { "id": "d", "text": "DESCRIBE DETAIL" }
      ],
      "correct": "a",
      "explanation": "MERGE INTO (upsert) matches incoming rows against existing rows on a key and applies inserts, updates, or deletes in a single atomic operation — exactly the pattern for incremental change application."
    },
    {
      "id": "700-69",
      "domain": "Ingest and transform data",
      "question": "You need to ingest a continuous stream of IoT sensor readings, apply light filtering, and route the results to both a Lakehouse for storage and an Eventhouse for real-time querying. What should you use?",
      "options": [
        { "id": "a", "text": "An Eventstream" },
        { "id": "b", "text": "A Dataflow Gen2" },
        { "id": "c", "text": "A Data Pipeline Copy activity" },
        { "id": "d", "text": "A semantic model refresh" }
      ],
      "correct": "a",
      "explanation": "Eventstream ingests continuous streaming data, applies transformations, and routes it to multiple destinations such as a Lakehouse and an Eventhouse simultaneously."
    },
    {
      "id": "700-70",
      "domain": "Ingest and transform data",
      "question": "You need to write and run ad hoc analytical queries against high-volume, time-series event data stored in an Eventhouse. Which query language should you use?",
      "options": [
        { "id": "a", "text": "Kusto Query Language (KQL)" },
        { "id": "b", "text": "DAX" },
        { "id": "c", "text": "Power Query M" },
        { "id": "d", "text": "MDX" }
      ],
      "correct": "a",
      "explanation": "KQL is the query language for Eventhouse (KQL Database), purpose-built for fast, ad hoc analysis of high-volume time-series and log-style event data."
    },
    {
      "id": "700-71",
      "domain": "Ingest and transform data",
      "question": "You need to append complex, nested Spark transformation logic that reads from one Lakehouse and writes curated output to another within the same pipeline run. Which pipeline activity should you use?",
      "options": [
        { "id": "a", "text": "A Notebook activity" },
        { "id": "b", "text": "A Copy activity only" },
        { "id": "c", "text": "A Web activity" },
        { "id": "d", "text": "A Wait activity" }
      ],
      "correct": "a",
      "explanation": "A Notebook activity in a Data Pipeline runs a Spark notebook as an orchestrated step, letting you embed complex transformation logic within the broader pipeline flow."
    },
    {
      "id": "700-72",
      "domain": "Ingest and transform data",
      "question": "You need each stage of a multi-step pipeline to only run if the prior stage succeeded, and to send a notification if any stage fails. What should you configure?",
      "options": [
        { "id": "a", "text": "Activity dependencies (success/failure conditions) with a notification activity" },
        { "id": "b", "text": "A single Dataflow Gen2 with no branching" },
        { "id": "c", "text": "A OneLake shortcut" },
        { "id": "d", "text": "A capacity smoothing policy" }
      ],
      "correct": "a",
      "explanation": "Data Pipeline activities support success, failure, and completion dependency conditions, and can be paired with notification activities (such as Teams or Outlook) to alert on failure."
    },
    {
      "id": "700-73",
      "domain": "Ingest and transform data",
      "question": "A source table only exposes a last-modified timestamp column, and you want each pipeline run to pull only rows changed since the previous run. Which pattern should you implement?",
      "options": [
        { "id": "a", "text": "Incremental (watermark-based) ingestion using the timestamp column" },
        { "id": "b", "text": "A full table reload on every run" },
        { "id": "c", "text": "A OneLake shortcut" },
        { "id": "d", "text": "A capacity bursting policy" }
      ],
      "correct": "a",
      "explanation": "Watermark-based incremental ingestion tracks the last processed value of a change-indicating column (like a modified timestamp) and only pulls rows newer than that on each run."
    },
    {
      "id": "700-74",
      "domain": "Ingest and transform data",
      "question": "You need to reshape a wide table with one column per month into a long, normalized format with a 'month' and 'value' column for downstream analysis. Which Power Query transformation fits?",
      "options": [
        { "id": "a", "text": "Unpivot columns" },
        { "id": "b", "text": "Merge queries" },
        { "id": "c", "text": "Append queries" },
        { "id": "d", "text": "Group by" }
      ],
      "correct": "a",
      "explanation": "Unpivot columns transforms wide, column-per-category data into a long, normalized format, which is the standard shape for further modeling and analysis."
    },
    {
      "id": "700-75",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You need a single place to see the recent run history, status, and duration of every pipeline, notebook, and dataflow run across a workspace. Which Fabric feature should you use?",
      "options": [
        { "id": "a", "text": "The Monitoring hub" },
        { "id": "b", "text": "Query Store" },
        { "id": "c", "text": "A deployment pipeline" },
        { "id": "d", "text": "A OneLake shortcut" }
      ],
      "correct": "a",
      "explanation": "The Fabric Monitoring hub centralizes run history and status across pipelines, notebooks, dataflows, and other items, giving a single place to check recent activity."
    },
    {
      "id": "700-76",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A Data Pipeline run failed partway through. What should you check first to identify which specific activity failed and why?",
      "options": [
        { "id": "a", "text": "The pipeline run's activity-level output and error details" },
        { "id": "b", "text": "The Capacity Metrics app trend chart" },
        { "id": "c", "text": "The workspace Git history" },
        { "id": "d", "text": "The semantic model's refresh schedule" }
      ],
      "correct": "a",
      "explanation": "Drilling into a specific pipeline run shows per-activity status and output, including the error message from the activity that failed, which is the fastest way to diagnose it."
    },
    {
      "id": "700-77",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A Dataflow Gen2 that used to run in minutes now times out on a specific query step after a source schema change. What is the most direct next step to identify the issue?",
      "options": [
        { "id": "a", "text": "Review the query diagnostics for that specific step" },
        { "id": "b", "text": "Delete and recreate the entire workspace" },
        { "id": "c", "text": "Increase the Fabric capacity SKU without investigating" },
        { "id": "d", "text": "Disable Git integration" }
      ],
      "correct": "a",
      "explanation": "Query diagnostics in Dataflow Gen2 show step-by-step timing and row counts, letting you pinpoint exactly which transformation step is now slow or failing after a schema change."
    },
    {
      "id": "700-78",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You need to be notified in near real time if a streaming metric from an Eventhouse crosses a threshold, without building a separate polling pipeline. Which Fabric item should you use?",
      "options": [
        { "id": "a", "text": "Data Activator" },
        { "id": "b", "text": "A Dataflow Gen2" },
        { "id": "c", "text": "A deployment pipeline" },
        { "id": "d", "text": "A capacity smoothing rule" }
      ],
      "correct": "a",
      "explanation": "Data Activator monitors data (including from Eventhouse/Eventstream) for defined conditions and triggers actions or notifications automatically when thresholds are crossed."
    },
    {
      "id": "700-79",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A notebook error message references a Py4JJavaError originating deep in the Spark executor logs. Where should you look to get the full underlying stack trace?",
      "options": [
        { "id": "a", "text": "The Spark application's driver and executor logs" },
        { "id": "b", "text": "The Capacity Metrics app" },
        { "id": "c", "text": "The Git commit history" },
        { "id": "d", "text": "A sensitivity label audit log" }
      ],
      "correct": "a",
      "explanation": "Spark driver and executor logs contain the full stack trace behind a Py4JJavaError, which is typically only summarized in the notebook cell output."
    },
    {
      "id": "700-80",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You want a T-SQL query against a Fabric Warehouse to reuse a previously computed, up-to-date row count and column statistics instead of scanning the full table for cardinality estimates. What should you make sure is current?",
      "options": [
        { "id": "a", "text": "Table statistics" },
        { "id": "b", "text": "The deployment pipeline stage" },
        { "id": "c", "text": "The OneLake shortcut cache" },
        { "id": "d", "text": "The sensitivity label" }
      ],
      "correct": "a",
      "explanation": "Up-to-date table statistics let the query optimizer make accurate cardinality estimates and choose efficient plans, without needing to scan the full table at query time."
    },
    {
      "id": "700-81",
      "domain": "Monitor and optimize an analytics solution",
      "question": "A shared Fabric capacity is being consumed heavily by one workspace's background jobs, starving interactive Power BI users in other workspaces. What should you investigate first?",
      "options": [
        { "id": "a", "text": "Per-workspace and per-operation consumption in the Capacity Metrics app" },
        { "id": "b", "text": "The Git branch protection rules" },
        { "id": "c", "text": "The Dataflow Gen2 staging lakehouse only" },
        { "id": "d", "text": "The sensitivity label taxonomy" }
      ],
      "correct": "a",
      "explanation": "The Capacity Metrics app breaks down consumption by workspace and operation, letting you identify which background jobs are consuming shared capacity and starving other users."
    },
    {
      "id": "700-82",
      "domain": "Monitor and optimize an analytics solution",
      "question": "You want historical Delta table versions to remain queryable with time travel for the next 30 days, but not longer, to control storage growth. What should you configure?",
      "options": [
        { "id": "a", "text": "The Delta table's retention/VACUUM settings" },
        { "id": "b", "text": "A OneLake shortcut expiration" },
        { "id": "c", "text": "A deployment pipeline stage rule" },
        { "id": "d", "text": "A capacity bursting window" }
      ],
      "correct": "a",
      "explanation": "Delta Lake retention settings determine how long old file versions are kept before VACUUM can remove them, directly controlling how far back time travel queries can go."
    }
  ]
};
