export const DP_600 = {
  "label": "Fabric Analytics Engineer Associate",
  "questions": [
    {
      "id": "600-1",
      "domain": "Plan, implement, and manage a solution for data analytics",
      "question": "What is the smallest unit of compute capacity purchase that enables Fabric workloads for an organization?",
      "options": [
        {
          "id": "a",
          "text": "A Power BI Pro license"
        },
        {
          "id": "b",
          "text": "A Fabric capacity (F SKU)"
        },
        {
          "id": "c",
          "text": "An Azure Synapse pool"
        },
        {
          "id": "d",
          "text": "A Premium Per User license"
        }
      ],
      "correct": "b",
      "explanation": "Fabric workloads are enabled by purchasing a Fabric capacity (an F SKU), which provides the compute pool shared across all Fabric items in assigned workspaces."
    },
    {
      "id": "600-2",
      "domain": "Prepare data",
      "question": "You are modeling a star schema in a Fabric semantic model. Which type of table should contain the numeric measures used in analysis?",
      "options": [
        {
          "id": "a",
          "text": "Dimension table"
        },
        {
          "id": "b",
          "text": "Fact table"
        },
        {
          "id": "c",
          "text": "Bridge table"
        },
        {
          "id": "d",
          "text": "Staging table"
        }
      ],
      "correct": "b",
      "explanation": "Fact tables hold the quantitative, measurable data (sales amount, quantity, etc.) and typically connect to surrounding dimension tables via keys."
    },
    {
      "id": "600-3",
      "domain": "Implement and manage semantic models",
      "question": "Which storage mode should you choose for a Power BI semantic model when you need sub-second query performance over a very large fact table without importing all the data?",
      "options": [
        {
          "id": "a",
          "text": "Import mode"
        },
        {
          "id": "b",
          "text": "DirectQuery mode"
        },
        {
          "id": "c",
          "text": "Direct Lake mode"
        },
        {
          "id": "d",
          "text": "Live Connection to Analysis Services"
        }
      ],
      "correct": "c",
      "explanation": "Direct Lake mode reads Delta tables directly from OneLake without a separate import step, giving near-Import performance without duplicating the data."
    },
    {
      "id": "600-4",
      "domain": "Explore and analyze data",
      "question": "Which DAX function would you use to calculate a running total of Sales across a date column?",
      "options": [
        {
          "id": "a",
          "text": "CALCULATE with a filter on the date column"
        },
        {
          "id": "b",
          "text": "TOTALYTD"
        },
        {
          "id": "c",
          "text": "SUMX over a related table"
        },
        {
          "id": "d",
          "text": "ALLEXCEPT"
        }
      ],
      "correct": "a",
      "explanation": "A running total is typically built with CALCULATE combined with a filter such as FILTER(ALL('Date'), 'Date'[Date] <= MAX('Date'[Date])) to accumulate values up to the current date."
    },
    {
      "id": "600-5",
      "domain": "Prepare data",
      "question": "In a Fabric Lakehouse, what is the purpose of the SQL analytics endpoint?",
      "options": [
        {
          "id": "a",
          "text": "It lets you run T-SQL read-only queries against Delta tables"
        },
        {
          "id": "b",
          "text": "It provides write access via stored procedures"
        },
        {
          "id": "c",
          "text": "It replaces the need for a semantic model"
        },
        {
          "id": "d",
          "text": "It is used only for streaming ingestion"
        }
      ],
      "correct": "a",
      "explanation": "The SQL analytics endpoint auto-generates a read-only, T-SQL-queryable layer over the Delta tables in a Lakehouse, so BI tools can query with familiar SQL."
    },
    {
      "id": "600-6",
      "domain": "Implement and manage semantic models",
      "question": "Which feature would you use to define reusable business logic and metrics centrally so they're consistent across multiple reports?",
      "options": [
        {
          "id": "a",
          "text": "Calculation groups"
        },
        {
          "id": "b",
          "text": "Bookmarks"
        },
        {
          "id": "c",
          "text": "Q&A visual"
        },
        {
          "id": "d",
          "text": "Drillthrough pages"
        }
      ],
      "correct": "a",
      "explanation": "Calculation groups let you define reusable calculation logic (e.g. time intelligence variants) once and apply it across many measures, keeping metrics consistent."
    },
    {
      "id": "600-7",
      "domain": "Explore and analyze data",
      "question": "A stakeholder wants to type a natural-language question and get a chart back from a Power BI report. Which feature supports this?",
      "options": [
        {
          "id": "a",
          "text": "Q&A visual"
        },
        {
          "id": "b",
          "text": "Paginated reports"
        },
        {
          "id": "c",
          "text": "Composite models"
        },
        {
          "id": "d",
          "text": "Deployment pipelines"
        }
      ],
      "correct": "a",
      "explanation": "The Q&A visual lets users type natural-language questions against the semantic model and returns an auto-generated visual as the answer."
    },
    {
      "id": "600-8",
      "domain": "Implement and manage semantic models",
      "question": "A Direct Lake on SQL semantic model has its DirectLakeBehavior property set to Automatic. What happens when a query can't meet Direct Lake conditions?",
      "options": [
        {
          "id": "a",
          "text": "The query fails immediately with an error"
        },
        {
          "id": "b",
          "text": "The query silently falls back to DirectQuery mode, possibly with slower performance"
        },
        {
          "id": "c",
          "text": "The report stops refreshing until the issue is fixed"
        },
        {
          "id": "d",
          "text": "The semantic model automatically switches to Import mode"
        }
      ],
      "correct": "b",
      "explanation": "Automatic (the default) means the query silently falls back to DirectQuery mode when Direct Lake conditions aren't met, so reports keep working but may be slower — DirectLakeOnly would instead fail the query with an error."
    },
    {
      "id": "600-9",
      "domain": "Implement and manage semantic models",
      "question": "Which Direct Lake variant never falls back to DirectQuery and can combine Delta tables from multiple Fabric data sources in one semantic model?",
      "options": [
        {
          "id": "a",
          "text": "Direct Lake on SQL"
        },
        {
          "id": "b",
          "text": "Direct Lake on OneLake"
        },
        {
          "id": "c",
          "text": "DirectQuery mode"
        },
        {
          "id": "d",
          "text": "Import mode"
        }
      ],
      "correct": "b",
      "explanation": "Direct Lake on OneLake runs exclusively in DirectLakeOnly mode with no DirectQuery fallback, and can use Delta tables from multiple Fabric data sources rather than being limited to a single lakehouse or warehouse."
    },
    {
      "id": "600-10",
      "domain": "Implement and manage semantic models",
      "question": "You need row-level security enforced consistently even when Direct Lake falls back to DirectQuery via the SQL analytics endpoint. Where should RLS be defined for the most reliable behavior?",
      "options": [
        {
          "id": "a",
          "text": "Only in the semantic model, using a fixed identity cloud connection"
        },
        {
          "id": "b",
          "text": "Only as SQL RLS at the SQL analytics endpoint"
        },
        {
          "id": "c",
          "text": "RLS cannot be used with Direct Lake at all"
        },
        {
          "id": "d",
          "text": "Only inside individual report visuals"
        }
      ],
      "correct": "a",
      "explanation": "Semantic model RLS works with Direct Lake, but Microsoft recommends using a fixed identity cloud connection; note that tables with SQL RLS defined at the SQL analytics endpoint will always force a DirectQuery fallback for Direct Lake on SQL."
    },
    {
      "id": "600-11",
      "domain": "Prepare data",
      "question": "Which OneLake capability lets a workspace reference a table from another Fabric workspace or external storage without physically copying the data?",
      "options": [
        {
          "id": "a",
          "text": "Mirroring"
        },
        {
          "id": "b",
          "text": "A OneLake shortcut"
        },
        {
          "id": "c",
          "text": "Dataflow Gen2 staging"
        },
        {
          "id": "d",
          "text": "Deployment pipeline promotion"
        }
      ],
      "correct": "b",
      "explanation": "A OneLake shortcut is a reference to data in another location — within the same workspace, another workspace, or external storage — that makes it appear local without copying it."
    },
    {
      "id": "600-12",
      "domain": "Prepare data",
      "question": "Your source data lives in an operational Azure SQL Database and you want it continuously synchronized into OneLake in near real time without building an ETL pipeline. What should you use?",
      "options": [
        {
          "id": "a",
          "text": "A OneLake shortcut"
        },
        {
          "id": "b",
          "text": "Database mirroring"
        },
        {
          "id": "c",
          "text": "A paginated report"
        },
        {
          "id": "d",
          "text": "A calculation group"
        }
      ],
      "correct": "b",
      "explanation": "Database mirroring continuously replicates an external operational database like Azure SQL Database into OneLake in Delta format, without requiring a traditional ETL pipeline."
    },
    {
      "id": "600-13",
      "domain": "Maintain a data analytics solution",
      "question": "Which file type lets you create and manage a Power BI Desktop project for source control, as part of the analytics development lifecycle in Fabric?",
      "options": [
        {
          "id": "a",
          "text": ".pbix"
        },
        {
          "id": "b",
          "text": ".pbip"
        },
        {
          "id": "c",
          "text": ".pbit"
        },
        {
          "id": "d",
          "text": ".pbids"
        }
      ],
      "correct": "b",
      "explanation": "A Power BI Desktop project (.pbip) is designed for source control and collaborative development, unlike the single-file .pbix format."
    },
    {
      "id": "600-14",
      "domain": "Maintain a data analytics solution",
      "question": "You want to deploy and manage a Fabric semantic model programmatically from an external tool like SSMS or a script. Which endpoint should you use?",
      "options": [
        {
          "id": "a",
          "text": "The XMLA endpoint"
        },
        {
          "id": "b",
          "text": "The Q&A visual"
        },
        {
          "id": "c",
          "text": "The Real-Time Hub"
        },
        {
          "id": "d",
          "text": "The OneLake catalog"
        }
      ],
      "correct": "a",
      "explanation": "The XMLA endpoint allows semantic models to be deployed and managed programmatically using external tools such as SSMS, Tabular Editor, or scripts."
    },
    {
      "id": "600-15",
      "domain": "Prepare data",
      "question": "A colleague changes a lakehouse table that several downstream semantic models depend on. Which practice helps you understand what else might break before making the change?",
      "options": [
        {
          "id": "a",
          "text": "Impact analysis of downstream dependencies"
        },
        {
          "id": "b",
          "text": "Dynamic format strings"
        },
        {
          "id": "c",
          "text": "Field parameters"
        },
        {
          "id": "d",
          "text": "Query folding"
        }
      ],
      "correct": "a",
      "explanation": "Performing impact analysis of downstream dependencies from lakehouses, warehouses, dataflows, and semantic models helps identify what else is affected before making a breaking change."
    },
    {
      "id": "600-16",
      "domain": "Implement and manage semantic models",
      "question": "Which DAX modeling feature standardises reusable, parameterised time-intelligence-style calculations that can be applied to many different measures at once?",
      "options": [
        {
          "id": "a",
          "text": "Field parameters"
        },
        {
          "id": "b",
          "text": "Calculation groups"
        },
        {
          "id": "c",
          "text": "Dynamic format strings"
        },
        {
          "id": "d",
          "text": "Bridge tables"
        }
      ],
      "correct": "b",
      "explanation": "Calculation groups let you define reusable calculation logic — such as time-intelligence variants — once, and apply it consistently across many measures."
    },
    {
      "id": "600-17",
      "domain": "Implement and manage semantic models",
      "question": "Your semantic model has grown past 10 GB in the Power BI service and you're using XMLA-based tools for write operations. Which setting should you enable?",
      "options": [
        {
          "id": "a",
          "text": "Large semantic model storage format"
        },
        {
          "id": "b",
          "text": "Field parameters"
        },
        {
          "id": "c",
          "text": "Direct Lake behavior"
        },
        {
          "id": "d",
          "text": "Dynamic data masking"
        }
      ],
      "correct": "a",
      "explanation": "Large semantic model storage format is required for models to grow beyond 10 GB, and enabling it also improves XMLA write performance even for models not considered particularly large."
    },
    {
      "id": "600-18",
      "domain": "Implement and manage semantic models",
      "question": "A semantic model contains some tables in Import mode and others in DirectQuery mode. What is this type of model called?",
      "options": [
        {
          "id": "a",
          "text": "A dual model"
        },
        {
          "id": "b",
          "text": "A composite model"
        },
        {
          "id": "c",
          "text": "A thin report"
        },
        {
          "id": "d",
          "text": "A push model"
        }
      ],
      "correct": "b",
      "explanation": "A composite model is a semantic model containing tables in more than one storage mode, such as a mix of Import and DirectQuery tables."
    },
    {
      "id": "600-19",
      "domain": "Implement and manage semantic models",
      "question": "You convert a DirectQuery table to Import mode. Power BI offers to convert the remaining DirectQuery tables to which storage mode to help keep relationships regular?",
      "options": [
        {
          "id": "a",
          "text": "Dual mode"
        },
        {
          "id": "b",
          "text": "Hybrid mode"
        },
        {
          "id": "c",
          "text": "Direct Lake mode"
        },
        {
          "id": "d",
          "text": "Live connect mode"
        }
      ],
      "correct": "a",
      "explanation": "Dual mode tables can behave as either Import or DirectQuery depending on the query context, which helps preserve regular relationships when mixing storage modes in a composite model."
    },
    {
      "id": "600-20",
      "domain": "Prepare data",
      "question": "Which Fabric feature lets business users discover existing data sources and streams across the organization before deciding how to bring data into their solution?",
      "options": [
        {
          "id": "a",
          "text": "OneLake catalog and Real-Time hub"
        },
        {
          "id": "b",
          "text": "Deployment pipelines"
        },
        {
          "id": "c",
          "text": "Calculation groups"
        },
        {
          "id": "d",
          "text": "The XMLA endpoint"
        }
      ],
      "correct": "a",
      "explanation": "The OneLake catalog and Real-Time hub support discovery of data and streams already available across the Fabric estate, helping avoid duplicate ingestion."
    },
    {
      "id": "600-21",
      "domain": "Maintain a data analytics solution",
      "question": "You want to make a high-quality semantic model visible with priority in search and clearly labeled as reviewed by an authorized reviewer. Which endorsement badge fits?",
      "options": [
        {
          "id": "a",
          "text": "Certified"
        },
        {
          "id": "b",
          "text": "Promoted only"
        },
        {
          "id": "c",
          "text": "No badge is needed"
        },
        {
          "id": "d",
          "text": "Draft"
        }
      ],
      "correct": "a",
      "explanation": "Certified means an organization-authorized reviewer has confirmed the item meets quality standards and is reliable — a stronger signal than Promoted, which any item owner with write access can apply."
    },
    {
      "id": "600-22",
      "domain": "Maintain a data analytics solution",
      "question": "Which reusable Power BI file lets you distribute a pre-built report/model structure without including the underlying data, so others start from a common template?",
      "options": [
        {
          "id": "a",
          "text": ".pbit (Power BI template)"
        },
        {
          "id": "b",
          "text": ".pbids (Power BI data source)"
        },
        {
          "id": "c",
          "text": ".pbix"
        },
        {
          "id": "d",
          "text": ".pbip"
        }
      ],
      "correct": "a",
      "explanation": "A Power BI template (.pbit) packages the report and model structure without the data itself, letting others create new reports from a shared starting point."
    },
    {
      "id": "600-23",
      "domain": "Maintain a data analytics solution",
      "question": "Which file lets you predefine a connection to a specific data source so users can quickly start a new report against it, without sharing an entire model?",
      "options": [
        {
          "id": "a",
          "text": ".pbids (Power BI data source)"
        },
        {
          "id": "b",
          "text": ".pbit"
        },
        {
          "id": "c",
          "text": ".pbix"
        },
        {
          "id": "d",
          "text": "model.bim"
        }
      ],
      "correct": "a",
      "explanation": "A .pbids file defines a data source connection so users can launch Power BI Desktop pointed at that source without needing a full template or shared model."
    },
    {
      "id": "600-24",
      "domain": "Maintain a data analytics solution",
      "question": "A shared semantic model is reused by several downstream reports. What is the benefit of connecting reports to it instead of building separate models each time?",
      "options": [
        {
          "id": "a",
          "text": "Consistent metrics and definitions are reused across reports instead of being duplicated and potentially diverging"
        },
        {
          "id": "b",
          "text": "It removes the need for row-level security"
        },
        {
          "id": "c",
          "text": "It automatically certifies the model"
        },
        {
          "id": "d",
          "text": "It disables Direct Lake mode"
        }
      ],
      "correct": "a",
      "explanation": "Reusing a shared semantic model keeps business definitions and metrics consistent across reports, avoiding the drift that happens when each report builds its own separate model."
    },
    {
      "id": "600-25",
      "domain": "Prepare data",
      "question": "You need to establish a reusable connection to a source system before building any transformations. What is this first step called?",
      "options": [
        {
          "id": "a",
          "text": "Creating a data connection"
        },
        {
          "id": "b",
          "text": "Applying a calculation group"
        },
        {
          "id": "c",
          "text": "Enabling Direct Lake"
        },
        {
          "id": "d",
          "text": "Publishing a deployment pipeline"
        }
      ],
      "correct": "a",
      "explanation": "Creating a data connection establishes how Fabric authenticates and connects to a source system, which is the prerequisite before ingesting or transforming any data from it."
    },
    {
      "id": "600-26",
      "domain": "Prepare data",
      "question": "You need Eventhouse data available for consumption by other Fabric experiences like Power BI and notebooks without duplicating it. What enables this?",
      "options": [
        {
          "id": "a",
          "text": "OneLake integration for Eventhouse, reflecting data as one logical copy"
        },
        {
          "id": "b",
          "text": "Manually exporting KQL results to CSV"
        },
        {
          "id": "c",
          "text": "Creating a separate Warehouse and copying the data"
        },
        {
          "id": "d",
          "text": "Disabling the SQL analytics endpoint"
        }
      ],
      "correct": "a",
      "explanation": "Eventhouse data integrates with OneLake as one logical copy, so it can be consumed by Power BI, notebooks, and other Fabric experiences without physically duplicating the data."
    },
    {
      "id": "600-27",
      "domain": "Prepare data",
      "question": "Which T-SQL object encapsulates a repeatable multi-step data preparation task, such as a series of inserts and updates, so it can be called with a single command?",
      "options": [
        {
          "id": "a",
          "text": "A stored procedure"
        },
        {
          "id": "b",
          "text": "A view"
        },
        {
          "id": "c",
          "text": "A function"
        },
        {
          "id": "d",
          "text": "A field parameter"
        }
      ],
      "correct": "a",
      "explanation": "A stored procedure encapsulates repeatable, potentially multi-step operational logic, letting it be executed as a single named call rather than re-writing the same statements each time."
    },
    {
      "id": "600-28",
      "domain": "Prepare data",
      "question": "Which T-SQL object standardises a reusable, read-only query — such as a common join and filter — so multiple consumers reference the same logic?",
      "options": [
        {
          "id": "a",
          "text": "A view"
        },
        {
          "id": "b",
          "text": "A stored procedure"
        },
        {
          "id": "c",
          "text": "A trigger"
        },
        {
          "id": "d",
          "text": "A calculation group"
        }
      ],
      "correct": "a",
      "explanation": "A view standardizes a reusable SELECT query — joins, filters, and column selections — so multiple consumers can reference the same consistent logic instead of duplicating it."
    },
    {
      "id": "600-29",
      "domain": "Prepare data",
      "question": "You want to enrich a lakehouse table by adding a calculated column derived from two existing columns. What kind of transformation is this?",
      "options": [
        {
          "id": "a",
          "text": "Data enrichment (adding new columns or tables)"
        },
        {
          "id": "b",
          "text": "Denormalization"
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
      "explanation": "Enrichment means adding new columns or tables — such as a calculated column derived from existing data — to increase the analytical value of a dataset."
    },
    {
      "id": "600-30",
      "domain": "Prepare data",
      "question": "You are designing a lakehouse's Gold layer for reporting and want fast, well-understood joins between a large fact table and descriptive dimension tables. Which structure should you implement?",
      "options": [
        {
          "id": "a",
          "text": "A star schema"
        },
        {
          "id": "b",
          "text": "A single flat unindexed table"
        },
        {
          "id": "c",
          "text": "A fully normalized third-normal-form schema"
        },
        {
          "id": "d",
          "text": "A KQL database"
        }
      ],
      "correct": "a",
      "explanation": "A star schema — a fact table connected directly to denormalized dimension tables — is the standard structure for fast, understandable reporting queries in a Gold layer or warehouse."
    },
    {
      "id": "600-31",
      "domain": "Prepare data",
      "question": "Two source tables use different column names and formats for the same customer identifier. Before you can join them reliably, what should you do first?",
      "options": [
        {
          "id": "a",
          "text": "Convert column data types and standardise/align the identifier columns"
        },
        {
          "id": "b",
          "text": "Apply a sensitivity label to both tables"
        },
        {
          "id": "c",
          "text": "Enable Direct Lake mode"
        },
        {
          "id": "d",
          "text": "Create a calculation group"
        }
      ],
      "correct": "a",
      "explanation": "Before merging or joining data reliably, you typically need to convert data types and align formats so that matching values (like a shared identifier) actually correspond across the two sources."
    },
    {
      "id": "600-32",
      "domain": "Prepare data",
      "question": "A source table has some rows with NULL in a required 'Region' column. Which category of data quality issue does this represent?",
      "options": [
        {
          "id": "a",
          "text": "Missing data / null values"
        },
        {
          "id": "b",
          "text": "Duplicate data"
        },
        {
          "id": "c",
          "text": "Late-arriving data"
        },
        {
          "id": "d",
          "text": "Data skew"
        }
      ],
      "correct": "a",
      "explanation": "NULL values in a required column represent missing data, which needs identification and a resolution strategy — such as default values, exclusion, or flagging — before reliable analysis."
    },
    {
      "id": "600-33",
      "domain": "Prepare data",
      "question": "You need to summarise total sales by product category from a large fact table before loading it into a reporting layer. Which operation are you performing?",
      "options": [
        {
          "id": "a",
          "text": "Aggregation"
        },
        {
          "id": "b",
          "text": "Partitioning"
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
      "explanation": "Aggregating data — summarizing values like totals or counts, often grouped by a dimension such as category — reduces granularity to the level needed for reporting."
    },
    {
      "id": "600-34",
      "domain": "Prepare data",
      "question": "In the Fabric Visual Query Editor, what is the primary benefit compared to writing raw SQL by hand?",
      "options": [
        {
          "id": "a",
          "text": "A no-code canvas builds filters, joins, and aggregations, generating the SQL automatically"
        },
        {
          "id": "b",
          "text": "It only works with KQL, not SQL"
        },
        {
          "id": "c",
          "text": "It replaces the need for a semantic model entirely"
        },
        {
          "id": "d",
          "text": "It can only be used for streaming data"
        }
      ],
      "correct": "a",
      "explanation": "The Visual Query Editor provides a no-code canvas for building queries — filtering, joining, aggregating — and generates the underlying SQL automatically, useful for less SQL-fluent users."
    },
    {
      "id": "600-35",
      "domain": "Prepare data",
      "question": "You need to filter and aggregate high-velocity time-series data stored in an Eventhouse. Which query language should you use?",
      "options": [
        {
          "id": "a",
          "text": "KQL"
        },
        {
          "id": "b",
          "text": "DAX"
        },
        {
          "id": "c",
          "text": "M / Power Query"
        },
        {
          "id": "d",
          "text": "PL/SQL"
        }
      ],
      "correct": "a",
      "explanation": "KQL (Kusto Query Language) is the native, optimized language for filtering and aggregating time-series and event data stored in an Eventhouse's KQL database."
    },
    {
      "id": "600-36",
      "domain": "Implement and manage semantic models",
      "question": "You are modeling many-to-many relationships between two dimension tables that don't share a direct key. Which modeling technique commonly resolves this?",
      "options": [
        {
          "id": "a",
          "text": "A bridge table"
        },
        {
          "id": "b",
          "text": "A calculation group"
        },
        {
          "id": "c",
          "text": "Dynamic data masking"
        },
        {
          "id": "d",
          "text": "V-Order"
        }
      ],
      "correct": "a",
      "explanation": "A bridge table sits between two tables to resolve many-to-many relationships, avoiding ambiguous filter propagation that a direct many-to-many relationship can cause."
    },
    {
      "id": "600-37",
      "domain": "Implement and manage semantic models",
      "question": "Which type of DAX function, like SUMX or AVERAGEX, evaluates an expression row-by-row over a table before aggregating the result?",
      "options": [
        {
          "id": "a",
          "text": "An iterator function"
        },
        {
          "id": "b",
          "text": "A table filtering function"
        },
        {
          "id": "c",
          "text": "An information function"
        },
        {
          "id": "d",
          "text": "A time intelligence function"
        }
      ],
      "correct": "a",
      "explanation": "Iterator functions (those ending in X, like SUMX and AVERAGEX) evaluate a given expression for each row of a table and then aggregate the row-level results."
    },
    {
      "id": "600-38",
      "domain": "Implement and manage semantic models",
      "question": "Which DAX function family, such as FILTER or ALL, is used to modify or override the filter context applied to a table before a calculation runs?",
      "options": [
        {
          "id": "a",
          "text": "Table filtering functions"
        },
        {
          "id": "b",
          "text": "Windowing functions"
        },
        {
          "id": "c",
          "text": "Information functions"
        },
        {
          "id": "d",
          "text": "Text functions"
        }
      ],
      "correct": "a",
      "explanation": "Table filtering functions like FILTER and ALL modify or remove filter context on a table, which is foundational to writing calculations like running totals or year-over-year comparisons."
    },
    {
      "id": "600-39",
      "domain": "Implement and manage semantic models",
      "question": "You want a measure to rank products by sales within each category, referencing preceding or following rows in a sorted result. Which DAX function category applies?",
      "options": [
        {
          "id": "a",
          "text": "Windowing functions"
        },
        {
          "id": "b",
          "text": "Information functions"
        },
        {
          "id": "c",
          "text": "Iterator functions only"
        },
        {
          "id": "d",
          "text": "Table constructor functions"
        }
      ],
      "correct": "a",
      "explanation": "Windowing functions (such as those used with OFFSET/rank-style logic) operate over an ordered set of rows, letting a calculation reference preceding or following rows relative to the current one."
    },
    {
      "id": "600-40",
      "domain": "Implement and manage semantic models",
      "question": "A DAX measure needs to check whether a column contains a BLANK value before performing a calculation, to avoid errors. Which function category helps here?",
      "options": [
        {
          "id": "a",
          "text": "Information functions, such as ISBLANK"
        },
        {
          "id": "b",
          "text": "Windowing functions"
        },
        {
          "id": "c",
          "text": "Calculation groups"
        },
        {
          "id": "d",
          "text": "Field parameters"
        }
      ],
      "correct": "a",
      "explanation": "Information functions like ISBLANK, ISERROR, and HASONEVALUE return details about a value or context, commonly used to guard calculations against unexpected blanks or errors."
    },
    {
      "id": "600-41",
      "domain": "Implement and manage semantic models",
      "question": "You want a measure's displayed format to switch between currency and percentage depending on which metric a user selects in a slicer. Which feature supports this?",
      "options": [
        {
          "id": "a",
          "text": "Dynamic format strings"
        },
        {
          "id": "b",
          "text": "Bridge tables"
        },
        {
          "id": "c",
          "text": "Row-level security"
        },
        {
          "id": "d",
          "text": "Incremental refresh"
        }
      ],
      "correct": "a",
      "explanation": "Dynamic format strings let a single measure's display format change based on context, such as switching between currency and percentage depending on a user's slicer selection."
    },
    {
      "id": "600-42",
      "domain": "Implement and manage semantic models",
      "question": "You want users to switch which measure or column a visual displays via a slicer, without duplicating visuals for each option. Which feature enables this?",
      "options": [
        {
          "id": "a",
          "text": "Field parameters"
        },
        {
          "id": "b",
          "text": "Calculation groups"
        },
        {
          "id": "c",
          "text": "Composite models"
        },
        {
          "id": "d",
          "text": "Mirroring"
        }
      ],
      "correct": "a",
      "explanation": "Field parameters let report users dynamically switch which fields or measures a visual uses via a slicer, avoiding the need to build a separate visual for every combination."
    },
    {
      "id": "600-43",
      "domain": "Implement and manage semantic models",
      "question": "A report visual is slow because it triggers many separate DAX queries for each data point. Which technique most directly reduces this kind of query overhead?",
      "options": [
        {
          "id": "a",
          "text": "Simplifying the visual or combining queries to reduce the number of separate DAX requests"
        },
        {
          "id": "b",
          "text": "Enabling dynamic data masking"
        },
        {
          "id": "c",
          "text": "Increasing the model's row-level security complexity"
        },
        {
          "id": "d",
          "text": "Switching to a bridge table"
        }
      ],
      "correct": "a",
      "explanation": "Reducing the number of separate DAX queries a visual generates — by simplifying visuals or consolidating requests — is a core technique for improving report visual performance."
    },
    {
      "id": "600-44",
      "domain": "Implement and manage semantic models",
      "question": "A complex DAX measure is slow. Using DAX Studio, you find most of the time is spent in the storage engine rather than the formula engine. What does this suggest?",
      "options": [
        {
          "id": "a",
          "text": "The bottleneck is likely data volume or scan efficiency, not the DAX formula's logical complexity"
        },
        {
          "id": "b",
          "text": "The measure has a syntax error"
        },
        {
          "id": "c",
          "text": "Row-level security is misconfigured"
        },
        {
          "id": "d",
          "text": "The model needs a bridge table"
        }
      ],
      "correct": "a",
      "explanation": "High storage engine time usually points to how much data is being scanned or how efficiently it's being retrieved, rather than the complexity of the DAX formula logic itself (formula engine time)."
    },
    {
      "id": "600-45",
      "domain": "Implement and manage semantic models",
      "question": "You want a large Import-mode fact table to only reprocess recent data on each scheduled refresh instead of reloading the entire table. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Incremental refresh"
        },
        {
          "id": "b",
          "text": "Dynamic format strings"
        },
        {
          "id": "c",
          "text": "A bridge table"
        },
        {
          "id": "d",
          "text": "Query acceleration"
        }
      ],
      "correct": "a",
      "explanation": "Incremental refresh partitions a table by date ranges and only reprocesses recent partitions on each refresh, dramatically reducing refresh time and resource use for large fact tables."
    },
    {
      "id": "600-46",
      "domain": "Implement and manage semantic models",
      "question": "You choose Direct Lake on SQL analytics endpoint over Direct Lake on OneLake. Which capability becomes available as a result?",
      "options": [
        {
          "id": "a",
          "text": "Delegated SQL analytics endpoint security (RLS/CLS/OLS) applied through the endpoint"
        },
        {
          "id": "b",
          "text": "Guaranteed no DirectQuery fallback under any condition"
        },
        {
          "id": "c",
          "text": "Support for combining Delta tables from multiple unrelated Fabric items"
        },
        {
          "id": "d",
          "text": "Calculated columns become fully supported"
        }
      ],
      "correct": "a",
      "explanation": "Direct Lake on SQL depends on security rules defined at the SQL analytics endpoint (RLS, CLS, OLS) via delegated identity, which Direct Lake on OneLake does not use in the same way."
    },
    {
      "id": "600-47",
      "domain": "Maintain a data analytics solution",
      "question": "Which access control lets you grant a user permission to just one lakehouse item without giving them broader workspace collaboration rights?",
      "options": [
        {
          "id": "a",
          "text": "Item-level access control"
        },
        {
          "id": "b",
          "text": "Workspace-level access control"
        },
        {
          "id": "c",
          "text": "A sensitivity label"
        },
        {
          "id": "d",
          "text": "A deployment pipeline"
        }
      ],
      "correct": "a",
      "explanation": "Item-level access control grants targeted permission to a single item, such as one lakehouse, without extending broader collaboration rights across the entire workspace."
    },
    {
      "id": "600-48",
      "domain": "Maintain a data analytics solution",
      "question": "You need to block a specific business unit's users from seeing rows belonging to other business units in a shared semantic model. Which control fits best?",
      "options": [
        {
          "id": "a",
          "text": "Row-level security"
        },
        {
          "id": "b",
          "text": "Column-level security"
        },
        {
          "id": "c",
          "text": "Object-level security"
        },
        {
          "id": "d",
          "text": "File-level access control"
        }
      ],
      "correct": "a",
      "explanation": "Row-level security filters which rows a user can see based on their identity or role, which is the right control for restricting visibility to specific business units within a shared model."
    },
    {
      "id": "600-49",
      "domain": "Maintain a data analytics solution",
      "question": "You need to entirely hide a sensitive table (not just some rows or columns) from a group of users in the semantic model. Which control fits best?",
      "options": [
        {
          "id": "a",
          "text": "Object-level security"
        },
        {
          "id": "b",
          "text": "Row-level security"
        },
        {
          "id": "c",
          "text": "Dynamic data masking"
        },
        {
          "id": "d",
          "text": "Incremental refresh"
        }
      ],
      "correct": "a",
      "explanation": "Object-level security hides entire tables or columns from specified users, unlike row-level security (which filters rows) or masking (which obscures values but doesn't hide the object)."
    },
    {
      "id": "600-50",
      "domain": "Maintain a data analytics solution",
      "question": "A file stored in a lakehouse's Files section needs to be restricted so only certain users can read it, without restricting the rest of the lakehouse. Which control applies?",
      "options": [
        {
          "id": "a",
          "text": "File-level access control"
        },
        {
          "id": "b",
          "text": "Row-level security"
        },
        {
          "id": "c",
          "text": "Calculation groups"
        },
        {
          "id": "d",
          "text": "Field parameters"
        }
      ],
      "correct": "a",
      "explanation": "File-level (and folder-level) access control lets you restrict access to specific files or folders within a lakehouse without changing access to the rest of the item."
    },
    {
      "id": "600-51",
      "domain": "Maintain a data analytics solution",
      "question": "Before merging a feature branch into your workspace's connected Git repository, you want teammates to review the changes. What Fabric lifecycle practice supports this?",
      "options": [
        {
          "id": "a",
          "text": "Committing to a feature branch and opening a pull request before merging"
        },
        {
          "id": "b",
          "text": "Skipping Git integration and editing directly in the shared workspace"
        },
        {
          "id": "c",
          "text": "Disabling version control for the workspace"
        },
        {
          "id": "d",
          "text": "Applying a sensitivity label to the branch"
        }
      ],
      "correct": "a",
      "explanation": "Developing in a feature branch, committing changes, and opening a pull request for review before merging into main is the standard Git-based workflow for safe collaborative development."
    },
    {
      "id": "600-52",
      "domain": "Maintain a data analytics solution",
      "question": "You need to promote validated content from a Test workspace to Production without manually recreating every item. Which Fabric capability handles this?",
      "options": [
        {
          "id": "a",
          "text": "A deployment pipeline"
        },
        {
          "id": "b",
          "text": "A OneLake shortcut"
        },
        {
          "id": "c",
          "text": "A calculation group"
        },
        {
          "id": "d",
          "text": "Sensitivity labels"
        }
      ],
      "correct": "a",
      "explanation": "Deployment pipelines promote validated content across lifecycle stages — such as Test to Production — cloning or updating the supported items in the target workspace automatically."
    }
  ]
};
