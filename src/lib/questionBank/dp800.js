export const DP_800 = {
  label: "Developing AI-Enabled Database Solutions",
  questions: [
    {
      id: "dp800-1",
      domain: "Design and develop database solutions",
      question:
        "You need to store audit-quality historical versions of every change to a table automatically, without writing trigger logic. Which table type should you implement?",
      options: [
        { id: "a", text: "Temporal table" },
        { id: "b", text: "In-memory table" },
        { id: "c", text: "External table" },
        { id: "d", text: "Ledger table" },
      ],
      correct: "a",
      explanation:
        "System-versioned temporal tables automatically keep a full history of data changes, letting you query the table as of any point in time without custom trigger code.",
    },
    {
      id: "dp800-2",
      domain: "Design and develop database solutions",
      question:
        "Which table type provides cryptographically verifiable proof that data has not been tampered with, making it suitable for regulatory compliance scenarios?",
      options: [
        { id: "a", text: "Ledger table" },
        { id: "b", text: "Graph table" },
        { id: "c", text: "Partitioned table" },
        { id: "d", text: "Column store table" },
      ],
      correct: "a",
      explanation:
        "Ledger tables maintain a tamper-evident record of all data modifications using cryptographic hashing, so you can prove the integrity of historical data.",
    },
    {
      id: "dp800-3",
      domain: "Design and develop database solutions",
      question:
        "You are designing a column to store variable JSON payloads with different keys per row, and you need efficient querying on a few specific properties inside that JSON. What should you do?",
      options: [
        {
          id: "a",
          text: "Use a native JSON column and create a JSON index on the frequently queried properties",
        },
        { id: "b", text: "Store the JSON as NVARCHAR(MAX) with no indexing" },
        { id: "c", text: "Split every possible property into its own nullable column" },
        { id: "d", text: "Store the JSON in a separate NoSQL database" },
      ],
      correct: "a",
      explanation:
        "Native JSON columns support JSON indexes on specific paths, giving you efficient querying of semi-structured data without forcing a rigid relational schema.",
    },
    {
      id: "dp800-4",
      domain: "Design and develop database solutions",
      question:
        "Which constraint would you use to guarantee that a column's value is unique across a table while still allowing NULLs?",
      options: [
        { id: "a", text: "UNIQUE constraint" },
        { id: "b", text: "PRIMARY KEY constraint" },
        { id: "c", text: "CHECK constraint" },
        { id: "d", text: "FOREIGN KEY constraint" },
      ],
      correct: "a",
      explanation:
        "A UNIQUE constraint enforces distinct non-NULL values but, unlike PRIMARY KEY, permits a NULL value (in most configurations only one NULL, depending on engine specifics).",
    },
    {
      id: "dp800-5",
      domain: "Design and develop database solutions",
      question:
        "You need auto-generated, gap-tolerant numeric values shared across multiple tables, independent of any single table's identity column. What should you implement?",
      options: [
        { id: "a", text: "A SEQUENCE object" },
        { id: "b", text: "An IDENTITY column" },
        { id: "c", text: "A computed column" },
        { id: "d", text: "A ROWVERSION column" },
      ],
      correct: "a",
      explanation:
        "SEQUENCE objects generate numeric values independently of any specific table, so multiple tables can share the same numbering sequence — something IDENTITY columns can't do.",
    },
    {
      id: "dp800-6",
      domain: "Design and develop database solutions",
      question:
        "A large fact table is queried almost exclusively by date range. Which technique will most directly improve manageability and query performance for this pattern?",
      options: [
        { id: "a", text: "Partition the table and its indexes by date" },
        { id: "b", text: "Convert the table to an in-memory table" },
        { id: "c", text: "Add a graph edge table" },
        { id: "d", text: "Enable Dynamic Data Masking" },
      ],
      correct: "a",
      explanation:
        "Partitioning by the date column aligns with the query pattern, enabling partition elimination for faster scans and easier maintenance such as sliding-window archival.",
    },
    {
      id: "dp800-7",
      domain: "Design and develop database solutions",
      question:
        "Which programmability object should you create to encapsulate reusable business logic that returns a single scalar value and can be used inline in a SELECT statement?",
      options: [
        { id: "a", text: "A scalar function" },
        { id: "b", text: "A stored procedure" },
        { id: "c", text: "A trigger" },
        { id: "d", text: "A table-valued function" },
      ],
      correct: "a",
      explanation:
        "A scalar function accepts parameters and returns a single value, and unlike a stored procedure, it can be referenced directly within a SELECT expression.",
    },
    {
      id: "dp800-8",
      domain: "Design and develop database solutions",
      question:
        "You want a query that references itself to walk a hierarchical employee-manager relationship. Which T-SQL construct should you use?",
      options: [
        { id: "a", text: "A recursive common table expression (CTE)" },
        { id: "b", text: "A window function" },
        { id: "c", text: "A scalar function" },
        { id: "d", text: "A CHECK constraint" },
      ],
      correct: "a",
      explanation:
        "A recursive CTE references itself to traverse hierarchical or graph-like relationships, such as an org chart, one level at a time.",
    },
    {
      id: "dp800-9",
      domain: "Design and develop database solutions",
      question:
        "Which T-SQL function would you use to rank rows within partitions of a result set, assigning the same rank to ties and leaving gaps afterward?",
      options: [
        { id: "a", text: "RANK()" },
        { id: "b", text: "ROW_NUMBER()" },
        { id: "c", text: "NTILE()" },
        { id: "d", text: "DENSE_RANK()" },
      ],
      correct: "a",
      explanation:
        "RANK() assigns the same rank to tied rows and then skips the subsequent rank values, unlike DENSE_RANK(), which leaves no gaps, or ROW_NUMBER(), which never ties.",
    },
    {
      id: "dp800-10",
      domain: "Design and develop database solutions",
      question:
        "You need to query relationships in a graph table using pattern-matching syntax, such as finding all people who follow a given person. Which clause should you use?",
      options: [
        { id: "a", text: "MATCH" },
        { id: "b", text: "PIVOT" },
        { id: "c", text: "APPLY" },
        { id: "d", text: "MERGE" },
      ],
      correct: "a",
      explanation:
        "The MATCH clause is used with SQL graph node and edge tables to express pattern-matching traversal queries, such as multi-hop relationship lookups.",
    },
    {
      id: "dp800-11",
      domain: "Design and develop database solutions",
      question:
        "You are exposing a stored procedure and several views as REST and GraphQL endpoints without writing custom API code. Which capability should you configure?",
      options: [
        { id: "a", text: "Data API builder (DAB)" },
        { id: "b", text: "Azure Functions with a SQL trigger" },
        { id: "c", text: "Change data capture (CDC)" },
        { id: "d", text: "Query Store" },
      ],
      correct: "a",
      explanation:
        "Data API builder generates REST and GraphQL endpoints directly from database objects such as tables, views, and stored procedures, based on a configuration file.",
    },
    {
      id: "dp800-12",
      domain: "Design and develop database solutions",
      question:
        "Which combination lets a GitHub Copilot chat session in your IDE directly query live schema and data from your Microsoft SQL Server instance during development?",
      options: [
        { id: "a", text: "Connecting to a Model Context Protocol (MCP) server endpoint for SQL Server" },
        { id: "b", text: "Enabling Dynamic Data Masking" },
        { id: "c", text: "Creating a GitHub Copilot instruction file only" },
        { id: "d", text: "Enabling Always Encrypted" },
      ],
      correct: "a",
      explanation:
        "Connecting Copilot to an MCP server endpoint for SQL Server or a Fabric lakehouse gives the AI assistant grounded, live context about your actual schema and data.",
    },
    {
      id: "dp800-13",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need to protect sensitive column values so that even database administrators with full permissions cannot view the plaintext, while the application can still decrypt it client-side. Which feature should you use?",
      options: [
        { id: "a", text: "Always Encrypted" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Row-Level Security" },
        { id: "d", text: "Transparent Data Encryption" },
      ],
      correct: "a",
      explanation:
        "Always Encrypted keeps sensitive data encrypted at all times inside the database, with keys held client-side, so even privileged database roles can't see plaintext values.",
    },
    {
      id: "dp800-14",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Customer support staff should see only the last four digits of a stored credit card number in query results, without the underlying data actually being altered. Which feature fits this requirement?",
      options: [
        { id: "a", text: "Dynamic Data Masking" },
        { id: "b", text: "Always Encrypted" },
        { id: "c", text: "Row-Level Security" },
        { id: "d", text: "Column-level encryption" },
      ],
      correct: "a",
      explanation:
        "Dynamic Data Masking obscures sensitive data in query results for non-privileged users in real time, while leaving the underlying stored data unchanged.",
    },
    {
      id: "dp800-15",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "A multi-tenant application stores all tenants in one shared table, and each tenant must only ever see their own rows regardless of which query is written. Which feature enforces this at the database engine level?",
      options: [
        { id: "a", text: "Row-Level Security (RLS)" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Object-level permissions" },
        { id: "d", text: "Auditing" },
      ],
      correct: "a",
      explanation:
        "Row-Level Security uses a predicate function tied to session context to automatically filter which rows a user can access, enforced consistently no matter how the query is written.",
    },
    {
      id: "dp800-16",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want application services to connect to the database without embedding or managing credentials such as connection strings and secrets. Which approach should you implement?",
      options: [
        { id: "a", text: "Passwordless authentication using managed identities" },
        { id: "b", text: "SQL authentication with rotated passwords" },
        { id: "c", text: "Shared access signature tokens" },
        { id: "d", text: "Dynamic Data Masking" },
      ],
      correct: "a",
      explanation:
        "Passwordless authentication using a managed identity lets an application authenticate to the database without storing or rotating a secret, reducing credential exposure risk.",
    },
    {
      id: "dp800-17",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You suspect two transactions are repeatedly blocking each other and one is eventually chosen as a victim and rolled back. What is this situation called?",
      options: [
        { id: "a", text: "A deadlock" },
        { id: "b", text: "A dirty read" },
        { id: "c", text: "Schema drift" },
        { id: "d", text: "A phantom read" },
      ],
      correct: "a",
      explanation:
        "A deadlock occurs when two or more transactions hold locks the others need, forming a cycle; the engine detects this and terminates one transaction as the deadlock victim.",
    },
    {
      id: "dp800-18",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Which transaction isolation level allows a transaction to read row versions as they existed at the start of the transaction, avoiding blocking reads without allowing dirty reads?",
      options: [
        { id: "a", text: "Snapshot isolation" },
        { id: "b", text: "Read uncommitted" },
        { id: "c", text: "Serializable" },
        { id: "d", text: "Read committed (default, lock-based)" },
      ],
      correct: "a",
      explanation:
        "Snapshot isolation uses row versioning so readers see a consistent view of data as of the transaction's start, without blocking writers or seeing uncommitted changes.",
    },
    {
      id: "dp800-19",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need to identify which specific operator in a slow query is consuming the most time and resources. Which tool should you examine first?",
      options: [
        { id: "a", text: "A query execution plan" },
        { id: "b", text: "Dynamic Data Masking configuration" },
        { id: "c", text: "A SQL Database Project manifest" },
        { id: "d", text: "Row-Level Security predicates" },
      ],
      correct: "a",
      explanation:
        "An execution plan (estimated or actual) shows each operator the engine used to run a query along with cost estimates, pinpointing where time and resources are being spent.",
    },
    {
      id: "dp800-20",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want to track query performance trends over time and be able to force a previously good execution plan if the optimizer regresses to a worse one. Which feature should you use?",
      options: [
        { id: "a", text: "Query Store" },
        { id: "b", text: "Change Tracking" },
        { id: "c", text: "Always Encrypted" },
        { id: "d", text: "Data API builder" },
      ],
      correct: "a",
      explanation:
        "Query Store captures a history of query execution plans and runtime statistics, and lets you force a specific historical plan to correct performance regressions.",
    },
    {
      id: "dp800-21",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Your team wants schema changes to be version-controlled, validated in CI, and deployed through a repeatable pipeline rather than made ad hoc on the production server. What should you build?",
      options: [
        { id: "a", text: "A SQL Database Project with CI/CD pipeline integration" },
        { id: "b", text: "A single ad hoc T-SQL script run manually each release" },
        { id: "c", text: "A Dynamic Data Masking policy" },
        { id: "d", text: "An in-memory table" },
      ],
      correct: "a",
      explanation:
        "SQL Database Projects let you define your schema as source-controlled code, validate it at build time, and deploy changes consistently through CI/CD pipelines.",
    },
    {
      id: "dp800-22",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Before deploying a SQL Database Project, you want to detect whether the target database has been changed outside of source control since the last deployment. What should you check for?",
      options: [
        { id: "a", text: "Schema drift" },
        { id: "b", text: "A deadlock" },
        { id: "c", text: "A phantom read" },
        { id: "d", text: "An orphaned sequence" },
      ],
      correct: "a",
      explanation:
        "Schema drift detection compares the live target database against the source-controlled definition to surface unauthorized or undocumented changes before deployment.",
    },
    {
      id: "dp800-23",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Which technique lets downstream systems react to row-level inserts, updates, and deletes by capturing them into change tables that can be consumed incrementally?",
      options: [
        { id: "a", text: "Change data capture (CDC)" },
        { id: "b", text: "Row-Level Security" },
        { id: "c", text: "Always Encrypted" },
        { id: "d", text: "Query Store" },
      ],
      correct: "a",
      explanation:
        "Change data capture records insert, update, and delete activity on source tables into change tables, letting downstream consumers process changes incrementally.",
    },
    {
      id: "dp800-24",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need to numerically represent the semantic meaning of product descriptions so similar descriptions end up close together in vector space. What should you generate?",
      options: [
        { id: "a", text: "Embeddings" },
        { id: "b", text: "Row-Level Security predicates" },
        { id: "c", text: "Ledger digests" },
        { id: "d", text: "Query Store baselines" },
      ],
      correct: "a",
      explanation:
        "Embeddings are numeric vector representations of text (or other data) generated by a model, capturing semantic meaning so similar content is positioned close together.",
    },
    {
      id: "dp800-25",
      domain: "Implement AI capabilities in database solutions",
      question:
        "A source column is frequently updated, and you need your stored embeddings to stay in sync automatically without a batch reprocessing job. Which approach best fits this requirement?",
      options: [
        { id: "a", text: "A table trigger or Change Tracking mechanism that regenerates embeddings on change" },
        { id: "b", text: "A one-time manual export to a spreadsheet" },
        { id: "c", text: "Increasing the vector dimension size" },
        { id: "d", text: "Enabling Dynamic Data Masking on the column" },
      ],
      correct: "a",
      explanation:
        "Using a table trigger, Change Tracking, CDC, or an Azure Function bound to a SQL trigger lets you regenerate embeddings automatically whenever the source data changes.",
    },
    {
      id: "dp800-26",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You are preparing long documents for embedding generation, and each document exceeds the model's context limit. What should you do first?",
      options: [
        { id: "a", text: "Design chunks that split the document into smaller, semantically coherent pieces" },
        { id: "b", text: "Store the entire document as a single BLOB with no processing" },
        { id: "c", text: "Truncate the document to its first 100 characters" },
        { id: "d", text: "Convert the document to a graph table" },
      ],
      correct: "a",
      explanation:
        "Chunking breaks long text into smaller, semantically coherent pieces that fit within a model's context window, improving both embedding quality and retrieval relevance.",
    },
    {
      id: "dp800-27",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Which T-SQL function computes the similarity or distance between two stored vector values, such as for cosine or Euclidean comparisons?",
      options: [
        { id: "a", text: "VECTOR_DISTANCE" },
        { id: "b", text: "JSON_VALUE" },
        { id: "c", text: "EDIT_DISTANCE" },
        { id: "d", text: "REGEXP_INSTR" },
      ],
      correct: "a",
      explanation:
        "VECTOR_DISTANCE calculates the distance (for example cosine or Euclidean) between two vector values, which is the core operation behind vector similarity search.",
    },
    {
      id: "dp800-28",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need a search approach that combines traditional keyword matching with semantic vector similarity and merges the two rankings into one result list. What should you implement?",
      options: [
        { id: "a", text: "Hybrid search with reciprocal rank fusion (RRF)" },
        { id: "b", text: "Full-text search only" },
        { id: "c", text: "Row-Level Security" },
        { id: "d", text: "Change data capture" },
      ],
      correct: "a",
      explanation:
        "Hybrid search combines full-text (keyword) and vector (semantic) search, and reciprocal rank fusion merges the separate ranked result lists into a single combined ranking.",
    },
    {
      id: "dp800-29",
      domain: "Implement AI capabilities in database solutions",
      question:
        "For a small dataset where you need guaranteed exact nearest-neighbor results rather than an approximation, which vector search approach should you choose?",
      options: [
        { id: "a", text: "ENN (exact nearest neighbor)" },
        { id: "b", text: "ANN (approximate nearest neighbor)" },
        { id: "c", text: "Full-text search" },
        { id: "d", text: "Fuzzy string matching" },
      ],
      correct: "a",
      explanation:
        "ENN scans and compares all vectors to guarantee exact results, which is practical for smaller datasets, while ANN trades some accuracy for speed on larger datasets.",
    },
    {
      id: "dp800-30",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You are building a retrieval-augmented generation (RAG) pattern entirely from T-SQL, and need to send a prompt containing retrieved rows to an external language model endpoint. Which stored procedure is designed for this?",
      options: [
        { id: "a", text: "sp_invoke_external_rest_endpoint" },
        { id: "b", text: "sp_executesql" },
        { id: "c", text: "sp_who2" },
        { id: "d", text: "sp_helptext" },
      ],
      correct: "a",
      explanation:
        "The sp_invoke_external_rest_endpoint stored procedure lets T-SQL call an external REST endpoint, such as a language model, directly from within the database as part of a RAG pattern.",
    },
  ],
};
