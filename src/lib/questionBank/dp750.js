export const DP_750 = {
  label: "Azure Databricks Data Engineer Associate",
  questions: [
    {
      id: "dp750-001",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A team runs short, ad hoc SQL queries against Unity Catalog tables throughout the day and wants compute that starts quickly and scales automatically without them managing cluster sizing. Which compute type should you recommend?",
      options: [
        { id: "a", text: "A serverless SQL warehouse" },
        { id: "b", text: "A manually sized classic all-purpose cluster left running 24/7" },
        { id: "c", text: "A single-node job cluster with autoscaling disabled" },
        { id: "d", text: "A shared cluster pinned to one fixed worker count" },
      ],
      correct: "a",
      explanation:
        "A serverless SQL warehouse provides near-instant startup and automatic scaling for ad hoc SQL workloads without requiring manual cluster sizing or capacity management — exactly the profile of unpredictable, bursty query traffic.",
    },
    {
      id: "dp750-002",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A scheduled ETL pipeline runs once nightly and doesn't need to stay warm between runs. Which compute type minimizes cost for this workload?",
      options: [
        { id: "a", text: "Job compute, created for the run and terminated when it finishes" },
        { id: "b", text: "An interactive all-purpose cluster left running all day" },
        { id: "c", text: "A shared cluster used simultaneously by many notebooks" },
        { id: "d", text: "A warehouse sized for peak interactive BI load" },
      ],
      correct: "a",
      explanation:
        "Job compute is provisioned specifically for a job run and automatically terminates afterward, avoiding the cost of an all-purpose cluster that stays available for interactive use between runs.",
    },
    {
      id: "dp750-003",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A cluster's workload is bursty, with periods of no activity followed by short spikes in demand. You want compute cost to track actual load without manual intervention. Which setting should you configure?",
      options: [
        { id: "a", text: "Autoscaling with a defined minimum and maximum worker count" },
        { id: "b", text: "A fixed worker count sized for the highest possible load" },
        { id: "c", text: "Disabling cluster termination entirely" },
        { id: "d", text: "A single always-on worker node" },
      ],
      correct: "a",
      explanation:
        "Autoscaling lets the cluster add and remove worker nodes within a configured range based on current load, so cost tracks actual demand instead of being fixed at worst-case capacity.",
    },
    {
      id: "dp750-004",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A Spark job spends significant time on repeated columnar aggregations over Delta tables, and the team wants better performance without changing application code. Which compute feature should you enable?",
      options: [
        { id: "a", text: "Photon acceleration" },
        { id: "b", text: "A smaller Databricks runtime version with fewer features" },
        { id: "c", text: "Disabling caching on the cluster" },
        { id: "d", text: "Reducing the cluster to a single core" },
      ],
      correct: "a",
      explanation:
        "Photon is a native vectorized query engine that accelerates SQL and DataFrame operations — including aggregations — transparently, without requiring code changes.",
    },
    {
      id: "dp750-005",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A notebook requires a third-party Python package that isn't included in the Databricks runtime. What should you do to make it available to the cluster?",
      options: [
        { id: "a", text: "Install the library as a cluster-scoped or notebook-scoped library" },
        { id: "b", text: "Rewrite the notebook to avoid needing any external package" },
        { id: "c", text: "Wait for Microsoft to add it to a future runtime release" },
        { id: "d", text: "Copy the package's source files into every notebook manually" },
      ],
      correct: "a",
      explanation:
        "Databricks supports installing libraries at the cluster or notebook scope (from PyPI, Maven, or a file), making the dependency available to the workload without waiting for a runtime update.",
    },
    {
      id: "dp750-006",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "Only the data engineering team should be able to attach notebooks to a production cluster, while other users should be blocked from using it. What should you configure?",
      options: [
        { id: "a", text: "Cluster access control (permissions) restricting who can attach to the cluster" },
        { id: "b", text: "Leaving the cluster's permissions at the default, open to all workspace users" },
        { id: "c", text: "Renaming the cluster so others can't find it" },
        { id: "d", text: "Deleting the cluster whenever it isn't in active use" },
      ],
      correct: "a",
      explanation:
        "Cluster access control lets you assign specific permission levels (e.g., Can Attach To, Can Restart, Can Manage) to particular users or groups, restricting who can use a given compute resource.",
    },
    {
      id: "dp750-007",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "Several business units need Unity Catalog objects organized so each unit's data is isolated, with a clear separation between development and production data. Which naming and structuring approach should guide your catalog design?",
      options: [
        { id: "a", text: "A naming convention that reflects isolation boundaries and environment (e.g., per business-unit catalogs, with dev/prod segregated by catalog or schema)" },
        { id: "b", text: "Naming every object identically regardless of owner or environment" },
        { id: "c", text: "Storing all data for every business unit in a single unnamed schema" },
        { id: "d", text: "Ignoring environment separation and mixing dev and prod tables together" },
      ],
      correct: "a",
      explanation:
        "A naming convention that encodes isolation requirements — business unit, environment, and external-sharing needs — into catalog and schema names is the recommended way to structure Unity Catalog objects so boundaries stay clear as the catalog grows.",
    },
    {
      id: "dp750-008",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "A team wants a Unity Catalog object to store arbitrary files (e.g., model artifacts, images) that aren't structured as tables, governed the same way as tables. What should you create?",
      options: [
        { id: "a", text: "A volume" },
        { id: "b", text: "A materialized view" },
        { id: "c", text: "An external table" },
        { id: "d", text: "A foreign catalog" },
      ],
      correct: "a",
      explanation:
        "Volumes in Unity Catalog govern access to non-tabular files (arbitrary files, artifacts) using the same catalog/schema-based permission model applied to tables, unlike materialized views or tables which are for structured data.",
    },
    {
      id: "dp750-009",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "You need Unity Catalog to query tables that live in an external system (e.g., another Databricks metastore or a federated source) without physically copying the data in. What should you implement?",
      options: [
        { id: "a", text: "A foreign catalog with a configured connection to the external source" },
        { id: "b", text: "A manual nightly export/import job" },
        { id: "c", text: "Duplicating the external tables into a new managed catalog" },
        { id: "d", text: "A materialized view with no underlying connection" },
      ],
      correct: "a",
      explanation:
        "A foreign catalog, backed by a connection object, lets Unity Catalog present and query objects from an external data source directly, without needing to physically replicate the data.",
    },
    {
      id: "dp750-010",
      domain: "Set up and configure an Azure Databricks environment",
      question:
        "Business analysts want to ask natural-language questions about governed tables and get accurate answers grounded in the actual schema and business context. What should you configure in Unity Catalog to support this?",
      options: [
        { id: "a", text: "AI/BI Genie instructions on the relevant tables/schemas" },
        { id: "b", text: "Disabling all table descriptions" },
        { id: "c", text: "A materialized view with no metadata" },
        { id: "d", text: "Removing column comments to reduce clutter" },
      ],
      correct: "a",
      explanation:
        "AI/BI Genie instructions let you supply business context, sample queries, and definitions tied to Unity Catalog objects, grounding natural-language question answering in accurate, curated context rather than raw schema alone.",
    },
    {
      id: "dp750-011",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "A data analyst group needs read access to a specific schema's tables but shouldn't be able to modify or drop any objects. What should you grant?",
      options: [
        { id: "a", text: "SELECT privilege on the schema (or its tables) to the analyst group" },
        { id: "b", text: "ALL PRIVILEGES on the catalog to every analyst individually" },
        { id: "c", text: "OWNER of each table to the analyst group" },
        { id: "d", text: "No privileges, relying on analysts to request access verbally each time" },
      ],
      correct: "a",
      explanation:
        "Granting the SELECT privilege scoped to the schema (or specific tables) gives read-only access without the ability to alter or drop objects — broader grants like ALL PRIVILEGES or OWNER would exceed what's needed.",
    },
    {
      id: "dp750-012",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "Regulatory requirements state that only HR staff may see the salary column in an employee table, while everyone else with table access should see it masked. What should you implement?",
      options: [
        { id: "a", text: "Column-level access control (a column mask) on the salary column" },
        { id: "b", text: "Revoking all access to the table for every user" },
        { id: "c", text: "Splitting the salary values into a separate unsecured file" },
        { id: "d", text: "Relying on application code alone to hide the column" },
      ],
      correct: "a",
      explanation:
        "Column-level access control (column masking) in Unity Catalog lets you dynamically mask a sensitive column's values for users who lack a specific privilege, enforced at the platform level regardless of which tool queries the table.",
    },
    {
      id: "dp750-013",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "A notebook running as an automated job needs to retrieve a database password stored in Azure Key Vault, without a human typing it in. What should you configure?",
      options: [
        { id: "a", text: "A Databricks secret scope backed by Azure Key Vault" },
        { id: "b", text: "Hardcoding the password directly in the notebook" },
        { id: "c", text: "Emailing the password to the job's owner each run" },
        { id: "d", text: "Storing the password in a public workspace file" },
      ],
      correct: "a",
      explanation:
        "An Azure Key Vault–backed secret scope lets notebooks and jobs reference secrets by scope/key at runtime, without ever exposing the actual secret value in code or configuration.",
    },
    {
      id: "dp750-014",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "An automated pipeline needs to authenticate to Unity Catalog resources without a human's credentials being tied to it, so it keeps working even if the original author leaves the company. What should you use?",
      options: [
        { id: "a", text: "A service principal with the required Unity Catalog privileges" },
        { id: "b", text: "The pipeline author's personal access token" },
        { id: "c", text: "A shared personal login used by the whole team" },
        { id: "d", text: "No authentication, since the pipeline runs inside the workspace" },
      ],
      correct: "a",
      explanation:
        "A service principal is a non-human identity you can grant permissions directly, so automated pipelines keep working independent of any individual user's account status — the recommended pattern for unattended jobs.",
    },
    {
      id: "dp750-015",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "A job running in Azure Databricks needs to read from an Azure Data Lake Storage account without embedding a storage key or connection string anywhere. What should you use for authentication?",
      options: [
        { id: "a", text: "A managed identity assigned the appropriate storage RBAC role" },
        { id: "b", text: "A shared access signature pasted into the notebook" },
        { id: "c", text: "The storage account's primary access key stored in plaintext" },
        { id: "d", text: "Public anonymous access to the storage account" },
      ],
      correct: "a",
      explanation:
        "A managed identity, granted the appropriate RBAC role on the storage account, lets Databricks authenticate to Azure resources without any credential ever being stored or embedded in code.",
    },
    {
      id: "dp750-016",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "Data stewards need to see who created a table, what upstream tables it was built from, and every downstream table that depends on it. Which Unity Catalog capability should you use?",
      options: [
        { id: "a", text: "Data lineage tracking in Catalog Explorer" },
        { id: "b", text: "Manually maintained spreadsheets of table relationships" },
        { id: "c", text: "Deleting old tables to simplify the catalog" },
        { id: "d", text: "Table comments alone, with no lineage graph" },
      ],
      correct: "a",
      explanation:
        "Unity Catalog automatically tracks data lineage — including owner, history, and upstream/downstream dependencies — and surfaces it visually in Catalog Explorer, without manual tracking.",
    },
    {
      id: "dp750-017",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "Compliance needs a record of every query and access action performed against sensitive Unity Catalog tables, for later review. What should you enable?",
      options: [
        { id: "a", text: "Unity Catalog audit logging" },
        { id: "b", text: "Disabling logging to reduce storage cost" },
        { id: "c", text: "Asking users to self-report their queries" },
        { id: "d", text: "Relying on cluster event logs only" },
      ],
      correct: "a",
      explanation:
        "Unity Catalog's audit logging captures detailed access and query events against governed objects, giving compliance a durable record for later review — something ad hoc self-reporting or cluster logs alone can't guarantee.",
    },
    {
      id: "dp750-018",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "Two separate organizations need to securely share specific Delta tables with each other without either side copying the data or granting direct workspace access. What should you design?",
      options: [
        { id: "a", text: "Delta Sharing, sharing only the specific tables needed" },
        { id: "b", text: "Exporting the tables to CSV and emailing them" },
        { id: "c", text: "Granting the partner organization a full workspace account" },
        { id: "d", text: "Copying the entire catalog to the partner's storage account" },
      ],
      correct: "a",
      explanation:
        "Delta Sharing is an open protocol purpose-built for securely sharing specific tables across organizational boundaries without copying data or granting broader workspace access than necessary.",
    },
    {
      id: "dp750-019",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "A retail table should hide rows for regions a given user isn't authorized to see, while showing all columns normally to authorized users. What should you configure?",
      options: [
        { id: "a", text: "A row filter on the table based on the user's group/attribute" },
        { id: "b", text: "A separate physical table per region, manually maintained" },
        { id: "c", text: "Revoking all access and rebuilding the table from scratch" },
        { id: "d", text: "A column mask, since row-level filtering isn't relevant here" },
      ],
      correct: "a",
      explanation:
        "Row filters apply a function that dynamically restricts which rows a querying user can see, based on attributes like group membership — the right tool for row-level, not column-level, restriction.",
    },
    {
      id: "dp750-020",
      domain: "Secure and govern Unity Catalog objects",
      question:
        "An organization wants to grant access based on data classification tags (e.g., 'confidential') rather than maintaining a separate grant per table as new tables are created. What should you implement?",
      options: [
        { id: "a", text: "Attribute-based access control (ABAC) using tags and policies" },
        { id: "b", text: "A manually updated grant statement for every new table" },
        { id: "c", text: "No access control, relying on table names alone" },
        { id: "d", text: "A single shared account for all users regardless of classification" },
      ],
      correct: "a",
      explanation:
        "ABAC policies evaluate tags (like a classification label) rather than requiring a grant per individual object, so access rules automatically apply to new tables carrying the same tag — reducing ongoing manual grant maintenance.",
    },
    {
      id: "dp750-021",
      domain: "Prepare and process data",
      question:
        "A pipeline ingests JSON files from a partner that occasionally change their schema without notice, and the team wants new columns to be added automatically without pipeline failures. What should you design for?",
      options: [
        { id: "a", text: "Schema drift handling, allowing schema evolution as part of the ingestion logic" },
        { id: "b", text: "A rigid schema enforced with no tolerance for any new column" },
        { id: "c", text: "Manually rewriting the pipeline every time the schema changes" },
        { id: "d", text: "Rejecting all files whenever any new field appears" },
      ],
      correct: "a",
      explanation:
        "Designing ingestion logic to handle schema drift (schema evolution) lets a pipeline adapt to new columns automatically, avoiding failures every time an upstream schema shifts slightly.",
    },
    {
      id: "dp750-022",
      domain: "Prepare and process data",
      question:
        "You need to bring data continuously from an on-premises SQL Server into Unity Catalog on a schedule, using an orchestrated pipeline rather than manual notebook runs. Which ingestion tool best fits?",
      options: [
        { id: "a", text: "Azure Data Factory orchestrating the ingestion into Databricks/Unity Catalog" },
        { id: "b", text: "A one-time manual file upload" },
        { id: "c", text: "A local script run by hand on a laptop" },
        { id: "d", text: "Emailing exported spreadsheets on a schedule" },
      ],
      correct: "a",
      explanation:
        "Azure Data Factory is one of the recommended ingestion tools for orchestrated, scheduled data movement from sources like on-premises SQL Server into Databricks-managed storage, alongside Lakeflow Connect and notebooks.",
    },
    {
      id: "dp750-023",
      domain: "Prepare and process data",
      question:
        "A dashboard must reflect new sensor events within seconds of them arriving, rather than in a scheduled nightly load. Which data loading method should you choose?",
      options: [
        { id: "a", text: "Streaming ingestion instead of a batch load" },
        { id: "b", text: "A nightly batch job only" },
        { id: "c", text: "A manual export run once a week" },
        { id: "d", text: "Loading data only when someone remembers to trigger it" },
      ],
      correct: "a",
      explanation:
        "Streaming ingestion processes events continuously as they arrive, meeting a near-real-time freshness requirement that a scheduled batch load — which only reflects data as of its last run — cannot satisfy.",
    },
    {
      id: "dp750-024",
      domain: "Prepare and process data",
      question:
        "A table stores raw event data that will be queried heavily for time-range analysis, and files are growing very large. Which technique should you choose to keep queries fast without manual file layout tuning?",
      options: [
        { id: "a", text: "Liquid clustering on the relevant timestamp/key columns" },
        { id: "b", text: "Storing the entire table as a single unpartitioned CSV file" },
        { id: "c", text: "Disabling all indexing or clustering features" },
        { id: "d", text: "Manually re-writing the entire table by hand weekly" },
      ],
      correct: "a",
      explanation:
        "Liquid clustering automatically maintains efficient data layout on the chosen columns as data is written, improving query performance for common filter patterns without the manual tuning that fixed partitioning or Z-ordering can require.",
    },
    {
      id: "dp750-025",
      domain: "Prepare and process data",
      question:
        "A dimension table's attributes (like a customer's address) change occasionally, and the business needs to preserve the full history of prior values for historical reporting, not just the latest value. Which design should you choose?",
      options: [
        { id: "a", text: "A slowly changing dimension (SCD) Type 2 design" },
        { id: "b", text: "Overwriting the row in place with only the current value (SCD Type 1)" },
        { id: "c", text: "Deleting old records whenever an attribute changes" },
        { id: "d", text: "Ignoring changes and keeping the original value forever" },
      ],
      correct: "a",
      explanation:
        "SCD Type 2 preserves historical versions of a changing dimension row (typically with effective-dating columns), while SCD Type 1 simply overwrites the old value — the business requirement to keep history rules out Type 1.",
    },
    {
      id: "dp750-026",
      domain: "Prepare and process data",
      question:
        "You need to decide whether Unity Catalog manages a table's underlying data files or whether they remain in a location you control outside Unity Catalog's default storage. What determines this?",
      options: [
        { id: "a", text: "Choosing a managed table (Unity Catalog owns the files) vs. an external table (files live at a location you specify)" },
        { id: "b", text: "All tables in Unity Catalog are identical with no distinction" },
        { id: "c", text: "Only views can reference externally located files" },
        { id: "d", text: "External tables are not supported in Unity Catalog" },
      ],
      correct: "a",
      explanation:
        "Managed tables have their data files fully owned and located by Unity Catalog, while external tables reference data at a location you specify and control — the choice affects lifecycle behavior like what happens on DROP TABLE.",
    },
    {
      id: "dp750-027",
      domain: "Prepare and process data",
      question:
        "A pipeline needs to load only the rows that changed in a source database since the last run, rather than reprocessing the entire source table each time. Which ingestion approach should you use?",
      options: [
        { id: "a", text: "Ingest via a change data capture (CDC) feed" },
        { id: "b", text: "Reload the entire source table on every run" },
        { id: "c", text: "Manually compare full snapshots row by row in a spreadsheet" },
        { id: "d", text: "Ignore incremental changes entirely" },
      ],
      correct: "a",
      explanation:
        "A CDC feed captures only inserted, updated, or deleted rows since the last capture point, letting the pipeline process just the deltas instead of reprocessing the full source table on every run.",
    },
    {
      id: "dp750-028",
      domain: "Prepare and process data",
      question:
        "New files land continuously in cloud storage from an upstream export process, and you want Databricks to automatically and incrementally pick up only new files as they arrive, without you tracking what's already been processed. What should you use?",
      options: [
        { id: "a", text: "Auto Loader within a Lakeflow Spark Declarative Pipeline" },
        { id: "b", text: "A manual script that lists and compares every file in the folder each run" },
        { id: "c", text: "Reprocessing the entire folder from scratch on every run" },
        { id: "d", text: "A one-time notebook run with no ongoing ingestion" },
      ],
      correct: "a",
      explanation:
        "Auto Loader incrementally and efficiently discovers new files as they land in cloud storage, tracking processing state automatically — avoiding both manual file-tracking logic and reprocessing the entire folder each run.",
    },
    {
      id: "dp750-029",
      domain: "Prepare and process data",
      question:
        "A pipeline needs to create a new managed table from the result of a SQL query in one atomic step, without a separate CREATE and INSERT statement. Which SQL construct should you use?",
      options: [
        { id: "a", text: "CREATE TABLE ... AS SELECT (CTAS)" },
        { id: "b", text: "MERGE INTO an existing empty table" },
        { id: "c", text: "VACUUM the target table first" },
        { id: "d", text: "ALTER TABLE with no SELECT logic" },
      ],
      correct: "a",
      explanation:
        "CTAS (CREATE TABLE ... AS SELECT) creates and populates a new table in a single atomic statement directly from a query result, rather than requiring separate table-creation and load steps.",
    },
    {
      id: "dp750-030",
      domain: "Prepare and process data",
      question:
        "You need to combine new incoming records with an existing Delta table, updating rows that already exist and inserting rows that don't, in a single operation. Which SQL command should you use?",
      options: [
        { id: "a", text: "MERGE INTO" },
        { id: "b", text: "DROP TABLE followed by a full reload" },
        { id: "c", text: "A plain INSERT with no matching logic" },
        { id: "d", text: "TRUNCATE TABLE" },
      ],
      correct: "a",
      explanation:
        "MERGE INTO performs an upsert in a single statement — matching rows are updated and unmatched rows are inserted — which is exactly the semantics needed for combining incremental data with an existing table.",
    },
    {
      id: "dp750-031",
      domain: "Prepare and process data",
      question:
        "You're ingesting real-time telemetry that's already flowing through Azure Event Hubs into Databricks for processing. What should your ingestion approach be built on?",
      options: [
        { id: "a", text: "Spark Structured Streaming reading from the Event Hubs connector" },
        { id: "b", text: "A nightly batch export from Event Hubs to a file share" },
        { id: "c", text: "Manually polling Event Hubs from a notebook every hour" },
        { id: "d", text: "Ignoring Event Hubs and asking the source system to write files instead" },
      ],
      correct: "a",
      explanation:
        "Spark Structured Streaming can consume directly from Azure Event Hubs as a streaming source, processing telemetry continuously as it arrives rather than through slower batch or manual polling approaches.",
    },
    {
      id: "dp750-032",
      domain: "Prepare and process data",
      question:
        "Before transforming a new dataset, an engineer wants to understand value distributions, null rates, and potential outliers across all columns. What should they do first?",
      options: [
        { id: "a", text: "Profile the data to generate summary statistics" },
        { id: "b", text: "Immediately write the raw data to a production table with no inspection" },
        { id: "c", text: "Delete columns that look unfamiliar without checking their content" },
        { id: "d", text: "Skip data quality checks to save time" },
      ],
      correct: "a",
      explanation:
        "Profiling data — generating summary statistics and distribution information — is the recommended first step before transformation, surfacing null rates, outliers, and data issues that should shape the transformation logic.",
    },
    {
      id: "dp750-033",
      domain: "Prepare and process data",
      question:
        "A source table has some rows with an identical primary key value, which shouldn't be possible according to business rules. What data cleansing step addresses this before loading?",
      options: [
        { id: "a", text: "Identify and resolve the duplicate records" },
        { id: "b", text: "Loading all duplicates as-is into the target table" },
        { id: "c", text: "Deleting the entire table rather than fixing individual rows" },
        { id: "d", text: "Ignoring the issue since it's rare" },
      ],
      correct: "a",
      explanation:
        "Identifying and resolving duplicate, missing, or null values is a standard data cleansing step before loading, ensuring downstream consumers of the table don't inherit a broken uniqueness assumption.",
    },
    {
      id: "dp750-034",
      domain: "Prepare and process data",
      question:
        "A wide sales fact table needs to be reshaped so that monthly columns (Jan, Feb, Mar, ...) become rows with a 'month' and 'value' column instead, for easier aggregation. Which transformation should you apply?",
      options: [
        { id: "a", text: "Unpivoting the table" },
        { id: "b", text: "Pivoting the table further" },
        { id: "c", text: "Denormalizing the table into more wide columns" },
        { id: "d", text: "Dropping the monthly columns entirely" },
      ],
      correct: "a",
      explanation:
        "Unpivoting converts columns into rows — turning per-month columns into a single 'month' and 'value' column pair — which is the opposite operation of pivoting, and what's needed here.",
    },
    {
      id: "dp750-035",
      domain: "Prepare and process data",
      question:
        "You need to enforce that a 'quantity' column can never be negative and that an 'email' column is never null, and have the pipeline flag or reject violating rows automatically. What should you implement?",
      options: [
        { id: "a", text: "Data quality constraints (validation checks) such as pipeline expectations" },
        { id: "b", text: "No validation, trusting the source system completely" },
        { id: "c", text: "A manual visual review of a sample of rows each week" },
        { id: "d", text: "Deleting the columns rather than validating them" },
      ],
      correct: "a",
      explanation:
        "Implementing validation checks — including range checks (like non-negative quantity) and nullability checks — as pipeline expectations lets the pipeline automatically flag, drop, or fail on rows that violate them.",
    },
    {
      id: "dp750-036",
      domain: "Prepare and process data",
      question:
        "A pipeline occasionally receives a string value in a column that should always be an integer, which used to silently corrupt downstream calculations. What should you configure to catch this going forward?",
      options: [
        { id: "a", text: "A data type check as part of the pipeline's quality constraints" },
        { id: "b", text: "Casting every column to a string to avoid type errors" },
        { id: "c", text: "Removing type information from the table schema entirely" },
        { id: "d", text: "Ignoring the column since the issue is rare" },
      ],
      correct: "a",
      explanation:
        "Explicit data type checks catch values that don't conform to the expected type before they propagate downstream and silently corrupt calculations, rather than relying on implicit, permissive casting.",
    },
    {
      id: "dp750-037",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A pipeline has several independent transformation steps that must run only after their specific upstream steps succeed, in a defined order. What should you design in the pipeline?",
      options: [
        { id: "a", text: "Explicit task dependencies (precedence constraints) between pipeline steps" },
        { id: "b", text: "Running every step at the same time with no ordering" },
        { id: "c", text: "A single task that does everything with no separation of steps" },
        { id: "d", text: "Manually running each step by hand in sequence every day" },
      ],
      correct: "a",
      explanation:
        "Defining explicit task dependencies (precedence constraints) ensures each step only runs after the specific upstream tasks it depends on have completed successfully, rather than relying on manual sequencing or arbitrary parallel execution.",
    },
    {
      id: "dp750-038",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A team wants to declaratively define a pipeline's flow — sources, transformations, and quality expectations — and let the platform manage execution details, checkpointing, and incremental processing automatically. What should they choose over a plain notebook-based pipeline?",
      options: [
        { id: "a", text: "Lakeflow Spark Declarative Pipelines" },
        { id: "b", text: "A single monolithic notebook with no structure" },
        { id: "c", text: "A shell script scheduled with cron" },
        { id: "d", text: "Manual step-by-step execution with no automation" },
      ],
      correct: "a",
      explanation:
        "Lakeflow Spark Declarative Pipelines let engineers declare the pipeline's intent (sources, transforms, expectations) and have the platform handle orchestration details like checkpointing and incremental processing — a declarative alternative to hand-orchestrating a notebook.",
    },
    {
      id: "dp750-039",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A step in a pipeline occasionally fails due to a transient upstream timeout, and the team wants it to retry automatically rather than requiring manual intervention every time. What should you design into the job?",
      options: [
        { id: "a", text: "Error handling with automatic retries/restarts for the failing task" },
        { id: "b", text: "No error handling, requiring a human to notice and rerun manually" },
        { id: "c", text: "Deleting the failing task from the pipeline entirely" },
        { id: "d", text: "Ignoring failures and letting downstream tasks run on incomplete data" },
      ],
      correct: "a",
      explanation:
        "Designing explicit error handling — including automatic restarts for tasks that fail due to transient issues — lets a pipeline recover on its own rather than depending on a person noticing and manually rerunning it.",
    },
    {
      id: "dp750-040",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A pipeline should run automatically every morning at 6 AM without anyone manually starting it. What should you configure on the job?",
      options: [
        { id: "a", text: "A scheduled trigger on the Lakeflow Job" },
        { id: "b", text: "A manual trigger only, requiring someone to click run" },
        { id: "c", text: "No trigger configuration at all" },
        { id: "d", text: "A file-arrival trigger unrelated to time" },
      ],
      correct: "a",
      explanation:
        "Configuring a scheduled (cron-based) trigger on a Lakeflow Job runs it automatically at the specified time, without requiring a person to manually start it each day.",
    },
    {
      id: "dp750-041",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "Stakeholders need to be notified immediately by email if a critical nightly job fails, rather than discovering it the next day. What should you configure?",
      options: [
        { id: "a", text: "Job alerts/notifications configured for failure events" },
        { id: "b", text: "No notifications, checking job history manually each morning" },
        { id: "c", text: "Disabling the job's logging entirely" },
        { id: "d", text: "Relying on stakeholders to notice missing data on their own" },
      ],
      correct: "a",
      explanation:
        "Configuring job alerts for failure (and other) events sends notifications automatically as soon as the condition occurs, rather than depending on someone manually checking job history the next day.",
    },
    {
      id: "dp750-042",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "Multiple engineers work on the same Databricks notebooks and need to review each other's changes before merging, with a clear history of who changed what. What practice should you adopt?",
      options: [
        { id: "a", text: "Version control with Git, using branches and pull requests" },
        { id: "b", text: "Editing the same notebook simultaneously with no coordination" },
        { id: "c", text: "Emailing notebook files back and forth" },
        { id: "d", text: "Keeping only one copy of the notebook with no history" },
      ],
      correct: "a",
      explanation:
        "Applying standard Git version control practices — branching, pull requests, and code review — to Databricks notebooks and code gives engineers a clear change history and a review gate before changes merge, matching standard SDLC practice.",
    },
    {
      id: "dp750-043",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "Before deploying a new transformation to production, the team wants automated checks confirming individual functions work correctly and that the end-to-end pipeline produces the expected output. What should be part of their testing strategy?",
      options: [
        { id: "a", text: "A combination of unit tests, integration tests, and end-to-end tests" },
        { id: "b", text: "No automated tests, relying only on manual production review" },
        { id: "c", text: "Testing only in production after deployment" },
        { id: "d", text: "Skipping tests entirely to move faster" },
      ],
      correct: "a",
      explanation:
        "A layered testing strategy — unit tests for individual functions, integration tests for component interactions, and end-to-end tests for the full pipeline — catches issues before deployment far more reliably than testing only in production.",
    },
    {
      id: "dp750-044",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A team wants to package a Databricks project's notebooks, jobs, and infrastructure configuration as versioned code that can be deployed consistently across dev, test, and prod workspaces. What should they use?",
      options: [
        { id: "a", text: "Databricks Asset Bundles" },
        { id: "b", text: "Manually re-creating each job by clicking through the UI in every environment" },
        { id: "c", text: "Copy-pasting notebook content between workspaces by hand" },
        { id: "d", text: "Storing configuration only in each engineer's local environment" },
      ],
      correct: "a",
      explanation:
        "Databricks Asset Bundles let you define notebooks, jobs, and infrastructure as code in a bundle configuration, deployable consistently and repeatably across environments — replacing manual, error-prone UI-based recreation.",
    },
    {
      id: "dp750-045",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A CI/CD pipeline running in a hosted build agent needs to deploy a Databricks Asset Bundle without a human running commands interactively. Which deployment method fits this automation scenario?",
      options: [
        { id: "a", text: "Deploying the bundle via the Databricks CLI or REST APIs from the CI/CD pipeline" },
        { id: "b", text: "A person manually typing commands in a terminal for every release" },
        { id: "c", text: "Uploading files one at a time through the workspace UI" },
        { id: "d", text: "Skipping deployment automation and doing it by hand each time" },
      ],
      correct: "a",
      explanation:
        "The Databricks CLI and REST APIs are both designed to support scripted, non-interactive deployment of bundles from an automated CI/CD pipeline — the manual alternatives don't fit an unattended automation scenario.",
    },
    {
      id: "dp750-046",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A team wants ongoing visibility into whether clusters are appropriately sized for their workloads, to avoid paying for idle or oversized capacity. What should they regularly monitor?",
      options: [
        { id: "a", text: "Cluster consumption metrics (utilization, autoscaling behavior, idle time)" },
        { id: "b", text: "Nothing, assuming initial sizing will always remain correct" },
        { id: "c", text: "Only the number of notebooks in the workspace" },
        { id: "d", text: "The color scheme of the workspace UI" },
      ],
      correct: "a",
      explanation:
        "Monitoring cluster consumption — utilization, autoscaling behavior, and idle time — is how teams identify and correct oversized or underused compute, optimizing both performance and cost on an ongoing basis.",
    },
    {
      id: "dp750-047",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A Lakeflow Job run failed partway through due to a transient issue that has since resolved, and you want to resume from the point of failure rather than rerunning the whole job. What feature should you use?",
      options: [
        { id: "a", text: "The job's repair run function" },
        { id: "b", text: "Deleting the job and recreating it from scratch" },
        { id: "c", text: "Manually re-running every task, including the ones that already succeeded" },
        { id: "d", text: "Ignoring the failure and leaving the run incomplete" },
      ],
      correct: "a",
      explanation:
        "The repair run capability lets you rerun only the failed (and downstream) tasks of a job run, rather than restarting every task including ones that already completed successfully.",
    },
    {
      id: "dp750-048",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A Spark job is running much slower than expected, and initial checks point to one task taking far longer than the others processing similar-sized data. What should you investigate first?",
      options: [
        { id: "a", text: "Data skew, using the Spark UI/DAG and query profile to identify the imbalance" },
        { id: "b", text: "Increasing the number of notebooks in the workspace" },
        { id: "c", text: "Renaming the job to something more descriptive" },
        { id: "d", text: "Disabling the cluster's logging" },
      ],
      correct: "a",
      explanation:
        "A single task taking disproportionately longer than similar peers is a classic symptom of data skew — uneven partition sizes — which the Spark UI, DAG visualization, and query profile are the standard tools for diagnosing.",
    },
    {
      id: "dp750-049",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A Delta table used for frequent updates has accumulated a large number of small files over time, degrading read performance. What command should you run to consolidate them?",
      options: [
        { id: "a", text: "OPTIMIZE" },
        { id: "b", text: "VACUUM with an aggressive retention of zero hours as the only fix" },
        { id: "c", text: "DROP TABLE and never rebuild it" },
        { id: "d", text: "Disabling Delta Lake features on the table" },
      ],
      correct: "a",
      explanation:
        "OPTIMIZE compacts small files into larger ones (and can apply Z-ordering), directly addressing the small-file problem and improving read performance — VACUUM instead removes old, unreferenced data files and doesn't address file compaction.",
    },
    {
      id: "dp750-050",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A Delta table's storage is growing rapidly because of retained historical versions from frequent MERGE and DELETE operations, and the team wants to reclaim space for data past the required time-travel window. What should you run?",
      options: [
        { id: "a", text: "VACUUM, with an appropriate retention period" },
        { id: "b", text: "OPTIMIZE, since it removes old file versions" },
        { id: "c", text: "Disabling MERGE operations entirely" },
        { id: "d", text: "Deleting the entire table and recreating it" },
      ],
      correct: "a",
      explanation:
        "VACUUM removes data files that are no longer referenced by the table's current version and past the configured retention period, reclaiming storage — OPTIMIZE addresses file layout and size, not stale version cleanup.",
    },
    {
      id: "dp750-051",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "Operations wants Databricks cluster event logs and Spark logs centralized alongside other Azure resource logs for correlation and long-term retention. What should you configure?",
      options: [
        { id: "a", text: "Log streaming from the workspace into Log Analytics via Azure Monitor" },
        { id: "b", text: "Leaving logs only on local cluster disk, which is cleared on termination" },
        { id: "c", text: "Manually copying logs by hand after each run" },
        { id: "d", text: "Disabling logging to reduce noise" },
      ],
      correct: "a",
      explanation:
        "Streaming Databricks logs into Log Analytics through Azure Monitor centralizes them with other Azure resource telemetry for correlation and durable retention, rather than leaving them only on ephemeral cluster-local disk.",
    },
    {
      id: "dp750-052",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "The operations team wants to be paged automatically if a critical job's duration exceeds a defined threshold, rather than discovering slow runs after the fact. What should you configure?",
      options: [
        { id: "a", text: "An Azure Monitor alert based on the relevant job/run duration metric" },
        { id: "b", text: "A calendar reminder to manually check job duration once a week" },
        { id: "c", text: "No monitoring, relying on downstream data-freshness complaints" },
        { id: "d", text: "Disabling metrics collection to reduce cost" },
      ],
      correct: "a",
      explanation:
        "An Azure Monitor alert rule configured against the job duration metric can page the team automatically the moment the threshold is crossed, rather than depending on manual checks or downstream complaints.",
    },
    {
      id: "dp750-053",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A notebook-based streaming job repeatedly stops due to an intermittent upstream connectivity blip and currently requires someone to notice and manually restart it. What job/pipeline setting addresses this?",
      options: [
        { id: "a", text: "Automatic restarts configured for the job or pipeline" },
        { id: "b", text: "Removing the streaming source entirely" },
        { id: "c", text: "Switching the job to run only once a year" },
        { id: "d", text: "Disabling the job so it never runs again" },
      ],
      correct: "a",
      explanation:
        "Configuring automatic restarts lets a job or pipeline recover from transient failures like brief upstream connectivity issues without requiring a person to notice and manually restart it.",
    },
    {
      id: "dp750-054",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "Query profile output shows a large amount of 'shuffle' activity for a join between two large Delta tables, correlating with poor performance. What is this diagnostic signal pointing toward as a likely cause?",
      options: [
        { id: "a", text: "Data movement across the cluster from a suboptimal join/partitioning strategy" },
        { id: "b", text: "A missing job schedule trigger" },
        { id: "c", text: "An issue with Git branch naming conventions" },
        { id: "d", text: "A missing column comment on the table" },
      ],
      correct: "a",
      explanation:
        "High shuffle activity in the query profile indicates significant data movement across cluster nodes, often caused by a join or aggregation strategy that doesn't align well with the data's partitioning — a common performance bottleneck to investigate and tune.",
    },
    {
      id: "dp750-055",
      domain: "Deploy and maintain data pipelines and workloads",
      question:
        "A Lakeflow Job task keeps failing, and you want to stop it cleanly mid-run without leaving the cluster in an inconsistent state, so you can investigate before rerunning. What job control should you use?",
      options: [
        { id: "a", text: "The job's stop function" },
        { id: "b", text: "Terminating the underlying cloud VM directly from the cloud portal" },
        { id: "c", text: "Deleting the job definition entirely" },
        { id: "d", text: "Waiting indefinitely with no way to intervene" },
      ],
      correct: "a",
      explanation:
        "Using the job's built-in stop function halts the run in a controlled way, letting you investigate the failure before deciding to repair or rerun it — a cleaner approach than terminating infrastructure directly outside the platform.",
    },
    {
      id: "dp750-056",
      domain: "Prepare and process data",
      question:
        "A pipeline must choose between storing raw ingested data as Parquet, Delta, or JSON. The team wants ACID transactions, schema enforcement, and time travel on this table. Which format should you choose?",
      options: [
        { id: "a", text: "Delta" },
        { id: "b", text: "Plain JSON with no schema enforcement" },
        { id: "c", text: "Plain Parquet with no transaction log" },
        { id: "d", text: "CSV with no type information" },
      ],
      correct: "a",
      explanation:
        "Delta adds a transaction log on top of Parquet, providing ACID transactions, schema enforcement, and time travel — capabilities plain Parquet, JSON, or CSV don't offer on their own.",
    },
    {
      id: "dp750-057",
      domain: "Prepare and process data",
      question:
        "An events table is queried almost exclusively by filtering on a date column, and the table is very large. Which design choice most directly improves query performance for this access pattern?",
      options: [
        { id: "a", text: "Partitioning (or clustering) the table by the date column" },
        { id: "b", text: "Storing the table as a single unsplit file with no organization" },
        { id: "c", text: "Removing the date column from the table entirely" },
        { id: "d", text: "Randomizing row order on every write" },
      ],
      correct: "a",
      explanation:
        "Partitioning or clustering by the column that's almost always used to filter (here, date) lets queries skip irrelevant data files entirely, directly improving performance for that dominant access pattern.",
    },
    {
      id: "dp750-058",
      domain: "Prepare and process data",
      question:
        "A reporting table should show pre-aggregated results that stay fresh as new data lands, without a separate scheduled batch job recomputing it in full each time. Which Unity Catalog object type fits this need?",
      options: [
        { id: "a", text: "A materialized view" },
        { id: "b", text: "A plain external table with manual refresh scripts" },
        { id: "c", text: "A volume" },
        { id: "d", text: "A foreign catalog" },
      ],
      correct: "a",
      explanation:
        "A materialized view stores precomputed query results and can be incrementally refreshed as underlying data changes, avoiding the need for a hand-built full-recompute batch job.",
    },
    {
      id: "dp750-059",
      domain: "Prepare and process data",
      question:
        "A very large fact table needs the finest possible level of detail preserved (one row per transaction line item) to support arbitrary future aggregation needs. What granularity decision should you make?",
      options: [
        { id: "a", text: "Store the table at the lowest (most granular) level, transaction line item, rather than pre-aggregating" },
        { id: "b", text: "Pre-aggregate to monthly totals only, discarding the line-item detail" },
        { id: "c", text: "Store only a random 1% sample of transactions" },
        { id: "d", text: "Discard the table after 30 days regardless of need" },
      ],
      correct: "a",
      explanation:
        "Choosing to persist data at its most granular level keeps every future aggregation possible, whereas pre-aggregating (like to monthly totals) would permanently discard detail that can't be recovered later.",
    },
    {
      id: "dp750-060",
      domain: "Prepare and process data",
      question:
        "A finance table must record the exact state of an account balance as of any historical date for audit purposes, not just its current value. Which design should you implement?",
      options: [
        { id: "a", text: "A temporal (history) table capturing changes over time" },
        { id: "b", text: "A table that only ever stores the current balance, with old values discarded" },
        { id: "c", text: "A table with no timestamp columns at all" },
        { id: "d", text: "Deleting historical records once a quarter to save space" },
      ],
      correct: "a",
      explanation:
        "A temporal (history) table explicitly records changes over time with effective periods, letting you reconstruct the exact state as of any historical date — something a current-value-only table can't support for audit purposes.",
    },
  ],
};
