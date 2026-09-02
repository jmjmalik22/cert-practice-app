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
    {
      id: "dp800-31",
      domain: "Design and develop database solutions",
      question:
        "You need a table that keeps its entire working set resident in memory and uses optimistic, lock-free concurrency for extremely high-throughput OLTP workloads. Which table type should you use?",
      options: [
        { id: "a", text: "An in-memory (memory-optimized) table" },
        { id: "b", text: "A temporal table" },
        { id: "c", text: "An external table" },
        { id: "d", text: "A partitioned column store table" },
      ],
      correct: "a",
      explanation:
        "Memory-optimized (in-memory) tables keep data in memory and use optimistic concurrency control, dramatically reducing locking and latency for high-throughput OLTP scenarios.",
    },
    {
      id: "dp800-32",
      domain: "Design and develop database solutions",
      question:
        "You need to query data that physically resides in another data source, such as a file in a data lake, as if it were a local table, without copying the data in. What should you create?",
      options: [
        { id: "a", text: "An external table" },
        { id: "b", text: "A temporal table" },
        { id: "c", text: "A ledger table" },
        { id: "d", text: "A graph node table" },
      ],
      correct: "a",
      explanation:
        "An external table maps to data stored outside the database (such as a data lake file), letting you query it with T-SQL without physically importing the data.",
    },
    {
      id: "dp800-33",
      domain: "Design and develop database solutions",
      question:
        "Which JSON function would you use to construct a JSON object directly from a T-SQL SELECT statement's column values?",
      options: [
        { id: "a", text: "JSON_OBJECT" },
        { id: "b", text: "OPENJSON" },
        { id: "c", text: "JSON_VALUE" },
        { id: "d", text: "JSON_MODIFY" },
      ],
      correct: "a",
      explanation:
        "JSON_OBJECT builds a JSON object literal from a list of key-value pairs, letting you produce JSON output directly in a SELECT statement.",
    },
    {
      id: "dp800-34",
      domain: "Design and develop database solutions",
      question:
        "You have a column containing a JSON array and need to shred it into a relational rowset so you can join it to other tables. Which function should you use?",
      options: [
        { id: "a", text: "OPENJSON" },
        { id: "b", text: "JSON_ARRAY" },
        { id: "c", text: "JSON_OBJECT" },
        { id: "d", text: "STRING_SPLIT" },
      ],
      correct: "a",
      explanation:
        "OPENJSON parses JSON text and returns it as a rowset, letting you shred JSON arrays or objects into relational rows for joining and filtering.",
    },
    {
      id: "dp800-35",
      domain: "Design and develop database solutions",
      question:
        "You need to extract a single scalar value from a specific path inside a JSON column, such as a customer's email address, for use in a WHERE clause. Which function fits best?",
      options: [
        { id: "a", text: "JSON_VALUE" },
        { id: "b", text: "JSON_QUERY" },
        { id: "c", text: "OPENJSON" },
        { id: "d", text: "JSON_ARRAYAGG" },
      ],
      correct: "a",
      explanation:
        "JSON_VALUE extracts a single scalar value from a JSON path, which is exactly what's needed to filter or compare against a specific property in a WHERE clause.",
    },
    {
      id: "dp800-36",
      domain: "Design and develop database solutions",
      question:
        "A dataset contains free-text customer names with inconsistent spelling, and you need to find likely duplicate entries even when the spelling doesn't match exactly. Which function family should you use?",
      options: [
        { id: "a", text: "Fuzzy string matching functions such as JARO_WINKLER_DISTANCE" },
        { id: "b", text: "Window functions such as RANK()" },
        { id: "c", text: "VECTOR_DISTANCE" },
        { id: "d", text: "JSON_VALUE" },
      ],
      correct: "a",
      explanation:
        "Fuzzy matching functions like EDIT_DISTANCE, EDIT_DISTANCE_SIMILARITY, and JARO_WINKLER_DISTANCE measure string similarity, helping surface likely duplicates despite spelling variations.",
    },
    {
      id: "dp800-37",
      domain: "Design and develop database solutions",
      question:
        "You need a query to validate that a text column matches a specific pattern, such as a phone number format, using pattern syntax more expressive than LIKE wildcards. Which function should you use?",
      options: [
        { id: "a", text: "REGEXP_LIKE" },
        { id: "b", text: "EDIT_DISTANCE" },
        { id: "c", text: "STRING_AGG" },
        { id: "d", text: "VECTOR_NORMALIZE" },
      ],
      correct: "a",
      explanation:
        "REGEXP_LIKE tests whether a string matches a regular expression pattern, providing far more expressive pattern matching than the LIKE operator's wildcards.",
    },
    {
      id: "dp800-38",
      domain: "Design and develop database solutions",
      question:
        "A subquery in your WHERE clause needs to reference a column from the outer query for each row it evaluates. What type of query is this?",
      options: [
        { id: "a", text: "A correlated subquery" },
        { id: "b", text: "A recursive CTE" },
        { id: "c", text: "A windowed aggregate" },
        { id: "d", text: "A cross join" },
      ],
      correct: "a",
      explanation:
        "A correlated subquery references one or more columns from the outer query, so it's re-evaluated for each row processed by the outer query.",
    },
    {
      id: "dp800-39",
      domain: "Design and develop database solutions",
      question:
        "You want a stored procedure to gracefully catch a divide-by-zero or constraint violation error and log it instead of failing the entire batch. What should you implement?",
      options: [
        { id: "a", text: "A TRY...CATCH block" },
        { id: "b", text: "A recursive CTE" },
        { id: "c", text: "A CHECK constraint" },
        { id: "d", text: "A SEQUENCE object" },
      ],
      correct: "a",
      explanation:
        "TRY...CATCH lets T-SQL code catch runtime errors, inspect error details with functions like ERROR_MESSAGE(), and handle them gracefully instead of terminating the batch.",
    },
    {
      id: "dp800-40",
      domain: "Design and develop database solutions",
      question:
        "You need logic to run automatically whenever a row is inserted into an audit-sensitive table, without the calling application needing to know about it. What should you create?",
      options: [
        { id: "a", text: "A trigger" },
        { id: "b", text: "A scalar function" },
        { id: "c", text: "A table-valued function" },
        { id: "d", text: "A view" },
      ],
      correct: "a",
      explanation:
        "A trigger automatically fires in response to a data modification event such as an INSERT, without requiring any explicit call from the application.",
    },
    {
      id: "dp800-41",
      domain: "Design and develop database solutions",
      question:
        "You need a reusable object that returns a full result set (multiple rows and columns) and can be referenced in the FROM clause of another query, accepting parameters. What should you create?",
      options: [
        { id: "a", text: "A table-valued function" },
        { id: "b", text: "A scalar function" },
        { id: "c", text: "A stored procedure" },
        { id: "d", text: "A trigger" },
      ],
      correct: "a",
      explanation:
        "A table-valued function returns a table result set and, unlike a stored procedure, can be used directly in the FROM clause of another query and accept parameters.",
    },
    {
      id: "dp800-42",
      domain: "Design and develop database solutions",
      question:
        "You want to simplify a complex multi-join query for report writers by exposing a single, reusable, named object without duplicating the underlying data. What should you create?",
      options: [
        { id: "a", text: "A view" },
        { id: "b", text: "A partitioned table" },
        { id: "c", text: "A SEQUENCE" },
        { id: "d", text: "A ledger table" },
      ],
      correct: "a",
      explanation:
        "A view packages a query definition under a reusable name, simplifying access to complex joins for consumers without duplicating or materializing the underlying data.",
    },
    {
      id: "dp800-43",
      domain: "Design and develop database solutions",
      question:
        "In a Data API builder configuration, which setting would you adjust to control how large result sets are broken into pages for API consumers?",
      options: [
        { id: "a", text: "Pagination settings on the entity" },
        { id: "b", text: "The REST endpoint's authentication mode" },
        { id: "c", text: "The GraphQL schema's root type name" },
        { id: "d", text: "The database's isolation level" },
      ],
      correct: "a",
      explanation:
        "Data API builder entity configuration includes pagination settings that control page size and continuation behavior for REST and GraphQL result sets.",
    },
    {
      id: "dp800-44",
      domain: "Design and develop database solutions",
      question:
        "You want API consumers to be able to filter and search entities exposed through Data API builder without writing custom endpoint code. What should you configure?",
      options: [
        { id: "a", text: "Entity-level filtering and searching options in the DAB configuration" },
        { id: "b", text: "A new stored procedure per filter combination" },
        { id: "c", text: "Row-Level Security only" },
        { id: "d", text: "A separate external table" },
      ],
      correct: "a",
      explanation:
        "Data API builder lets you configure filtering and searching directly for an entity, automatically generating the corresponding REST query parameters or GraphQL arguments.",
    },
    {
      id: "dp800-45",
      domain: "Design and develop database solutions",
      question:
        "You want DAB responses for a rarely changing lookup entity to avoid re-querying the database on every request. Which DAB capability addresses this?",
      options: [
        { id: "a", text: "Data caching configured on the entity" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Change data capture" },
        { id: "d", text: "A recursive CTE" },
      ],
      correct: "a",
      explanation:
        "Data API builder supports entity-level data caching, reducing repeated database round-trips for data that doesn't change frequently.",
    },
    {
      id: "dp800-46",
      domain: "Design and develop database solutions",
      question:
        "After configuring Data API builder locally, you need to make the generated REST and GraphQL endpoints available to consumers in a hosted environment. What should you do?",
      options: [
        { id: "a", text: "Configure and implement DAB deployment to a hosting target" },
        { id: "b", text: "Enable Always Encrypted on every entity" },
        { id: "c", text: "Convert entities into ledger tables" },
        { id: "d", text: "Rewrite the entities as views only" },
      ],
      correct: "a",
      explanation:
        "DAB deployment packages the configuration and runtime so the generated REST and GraphQL endpoints can run in a hosted environment, such as a container service.",
    },
    {
      id: "dp800-47",
      domain: "Design and develop database solutions",
      question:
        "You want centralized telemetry and custom alerting for a database-backed application, capturing traces, dependencies, and exceptions across the whole app. Which Azure Monitor component should you configure?",
      options: [
        { id: "a", text: "Application Insights" },
        { id: "b", text: "Query Store" },
        { id: "c", text: "Change Tracking" },
        { id: "d", text: "Data API builder" },
      ],
      correct: "a",
      explanation:
        "Application Insights, part of Azure Monitor, collects application-level telemetry such as traces, dependency calls, and exceptions, giving end-to-end observability.",
    },
    {
      id: "dp800-48",
      domain: "Design and develop database solutions",
      question:
        "You need to run complex analytical queries across aggregated log data from multiple resources and build custom dashboards. Which Azure Monitor feature is best suited?",
      options: [
        { id: "a", text: "Log Analytics" },
        { id: "b", text: "Query Store" },
        { id: "c", text: "Dynamic Data Masking" },
        { id: "d", text: "Data API builder" },
      ],
      correct: "a",
      explanation:
        "Log Analytics lets you write Kusto queries against aggregated log and metric data collected by Azure Monitor, enabling custom analysis and dashboards.",
    },
    {
      id: "dp800-49",
      domain: "Design and develop database solutions",
      question:
        "You need near-real-time notification of row changes so an Azure Function can process each change as it happens, rather than polling on a schedule. Which approach fits best?",
      options: [
        { id: "a", text: "Azure Functions with a SQL trigger binding" },
        { id: "b", text: "A nightly scheduled batch export" },
        { id: "c", text: "A ledger table" },
        { id: "d", text: "A SEQUENCE object" },
      ],
      correct: "a",
      explanation:
        "Azure Functions with a SQL trigger binding invoke the function automatically in response to row changes, avoiding the latency and overhead of polling.",
    },
    {
      id: "dp800-50",
      domain: "Design and develop database solutions",
      question:
        "You want to give a GitHub Copilot chat session persistent, project-specific guidance — such as your team's naming conventions and preferred patterns — every time it responds. What should you create?",
      options: [
        { id: "a", text: "A GitHub Copilot instruction file" },
        { id: "b", text: "A Query Store baseline" },
        { id: "c", text: "An external table" },
        { id: "d", text: "A Dynamic Data Masking rule" },
      ],
      correct: "a",
      explanation:
        "A GitHub Copilot instruction file provides persistent, project-specific context and conventions that Copilot applies automatically across chat sessions.",
    },
    {
      id: "dp800-51",
      domain: "Design and develop database solutions",
      question:
        "Before letting developers use an AI-assisted coding tool against a production-adjacent database, what should you evaluate first?",
      options: [
        { id: "a", text: "The security impact of using AI-assisted tools against that data" },
        { id: "b", text: "Whether the tool supports dark mode" },
        { id: "c", text: "The number of CPU cores on the developer's machine" },
        { id: "d", text: "The font used in the IDE" },
      ],
      correct: "a",
      explanation:
        "Before enabling AI-assisted tools like Copilot against real data, teams need to interpret the security impact — such as what data the assistant can see or send externally.",
    },
    {
      id: "dp800-52",
      domain: "Design and develop database solutions",
      question:
        "You want to control exactly which language model and which external tools are available during a specific GitHub Copilot chat session in Fabric. What should you configure?",
      options: [
        { id: "a", text: "Model and Model Context Protocol (MCP) tool options for the chat session" },
        { id: "b", text: "A CHECK constraint on the model table" },
        { id: "c", text: "Row-Level Security predicates" },
        { id: "d", text: "A partition function" },
      ],
      correct: "a",
      explanation:
        "Copilot in Fabric and GitHub Copilot chat sessions let you configure which model and which MCP tools are available, controlling scope and capability per session.",
    },
    {
      id: "dp800-53",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need to restrict which specific database objects a given login can SELECT, INSERT, or EXECUTE against, at a fine-grained level. What should you configure?",
      options: [
        { id: "a", text: "Object-level permissions" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "A ledger digest" },
        { id: "d", text: "A CHECK constraint" },
      ],
      correct: "a",
      explanation:
        "Object-level permissions grant or deny specific actions (SELECT, INSERT, EXECUTE, and so on) on individual database objects to specific principals.",
    },
    {
      id: "dp800-54",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Compliance requires you to record who ran which queries against a sensitive database and when, for later review. What should you implement?",
      options: [
        { id: "a", text: "Auditing" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Snapshot isolation" },
        { id: "d", text: "Query Store" },
      ],
      correct: "a",
      explanation:
        "Auditing tracks and logs database events such as logins, queries, and permission changes, producing a record you can review for compliance purposes.",
    },
    {
      id: "dp800-55",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Your application calls an external AI model endpoint from the database and must authenticate to that endpoint without storing an API key in T-SQL code. What should you use?",
      options: [
        { id: "a", text: "A Managed Identity to secure the model endpoint" },
        { id: "b", text: "A hardcoded bearer token in the stored procedure" },
        { id: "c", text: "Dynamic Data Masking on the response column" },
        { id: "d", text: "A CHECK constraint on the endpoint URL" },
      ],
      correct: "a",
      explanation:
        "Using a Managed Identity to secure the model endpoint lets the database authenticate to the external AI service without embedding secrets in code.",
    },
    {
      id: "dp800-56",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You are exposing database entities through Data API builder and need to make sure only authenticated, authorized callers can invoke the REST, GraphQL, and MCP endpoints. What is this concern called?",
      options: [
        { id: "a", text: "Securing GraphQL, REST, and MCP endpoints" },
        { id: "b", text: "Schema drift detection" },
        { id: "c", text: "Table partitioning" },
        { id: "d", text: "Query Store baseline capture" },
      ],
      correct: "a",
      explanation:
        "Endpoints generated by DAB, including REST, GraphQL, and MCP endpoints, need their own authentication and authorization configuration to prevent unauthorized access.",
    },
    {
      id: "dp800-57",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Which database configuration recommendation would most directly help avoid excessive blocking on a table with heavy concurrent read and write activity?",
      options: [
        { id: "a", text: "Enabling an appropriate isolation level such as read committed snapshot isolation" },
        { id: "b", text: "Increasing the number of columns in the primary key" },
        { id: "c", text: "Disabling all indexes" },
        { id: "d", text: "Removing all foreign keys" },
      ],
      correct: "a",
      explanation:
        "Read committed snapshot isolation uses row versioning so readers don't block writers and vice versa, reducing blocking under heavy concurrent read/write activity.",
    },
    {
      id: "dp800-58",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Which system objects would you query to see currently active sessions, their wait types, and what resources they're waiting on?",
      options: [
        { id: "a", text: "Dynamic management views (DMVs)" },
        { id: "b", text: "JSON functions" },
        { id: "c", text: "Ledger digests" },
        { id: "d", text: "Data API builder entities" },
      ],
      correct: "a",
      explanation:
        "Dynamic management views (DMVs) expose real-time server and database state, including active sessions, wait statistics, and resource consumption.",
    },
    {
      id: "dp800-59",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want a lightweight, built-in dashboard specifically for monitoring and diagnosing query performance issues on an Azure SQL Database without configuring Log Analytics. What should you use?",
      options: [
        { id: "a", text: "Query Performance Insight" },
        { id: "b", text: "Row-Level Security" },
        { id: "c", text: "Always Encrypted" },
        { id: "d", text: "A SEQUENCE object" },
      ],
      correct: "a",
      explanation:
        "Query Performance Insight provides a built-in, low-configuration view of top resource-consuming queries and performance trends for Azure SQL Database.",
    },
    {
      id: "dp800-60",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Two concurrent transactions are waiting on each other's locks and neither can proceed, though it hasn't yet been detected as a full deadlock. What is this temporary state called?",
      options: [
        { id: "a", text: "Blocking" },
        { id: "b", text: "Schema drift" },
        { id: "c", text: "A phantom read" },
        { id: "d", text: "Partition elimination" },
      ],
      correct: "a",
      explanation:
        "Blocking occurs whenever one transaction holds a lock that another transaction needs; if blocking forms a cycle with no resolution, it becomes a deadlock.",
    },
    {
      id: "dp800-61",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Before merging a schema change into your SQL Database Project, you want automated verification that stored procedures return the expected results against sample data. What should you implement?",
      options: [
        { id: "a", text: "A testing strategy including unit tests and integration tests" },
        { id: "b", text: "A manual peer review only" },
        { id: "c", text: "A CHECK constraint on every table" },
        { id: "d", text: "Increasing the connection pool size" },
      ],
      correct: "a",
      explanation:
        "A testing strategy with unit and integration tests validates database logic like stored procedures automatically as part of the CI/CD pipeline, catching regressions early.",
    },
    {
      id: "dp800-62",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Your SQL Database Project needs consistent lookup values (like country codes) deployed identically across every environment. Where should these values live?",
      options: [
        { id: "a", text: "As reference or static data managed in source control" },
        { id: "b", text: "Hardcoded inside application code only" },
        { id: "c", text: "In a spreadsheet emailed to the DBA before each release" },
        { id: "d", text: "In session-scoped temp tables" },
      ],
      correct: "a",
      explanation:
        "Managing reference and static data in source control ensures lookup values are versioned and deployed consistently across environments alongside schema changes.",
    },
    {
      id: "dp800-63",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want your SQL Database Project to use the newer, more flexible project format that supports SDK-based tooling and cross-platform builds. What should you use?",
      options: [
        { id: "a", text: "An SDK-style database project model" },
        { id: "b", text: "A legacy .dbproj-only format" },
        { id: "c", text: "A raw .bak file" },
        { id: "d", text: "A single unversioned .sql script" },
      ],
      correct: "a",
      explanation:
        "SDK-style SQL Database Projects use a leaner, MSBuild-SDK-based format that supports cross-platform builds and integrates more cleanly with modern CI/CD tooling.",
    },
    {
      id: "dp800-64",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need your SQL Database Project's build and deployment pipeline to pull a connection secret without storing it in plaintext in the repository or pipeline YAML. What should you implement?",
      options: [
        { id: "a", text: "Secrets management, such as a key vault-backed pipeline variable" },
        { id: "b", text: "Committing the secret in a .env file to the repo" },
        { id: "c", text: "A CHECK constraint on the secret column" },
        { id: "d", text: "A ledger table" },
      ],
      correct: "a",
      explanation:
        "Proper secrets management, such as referencing a key vault from the pipeline, keeps sensitive values out of source control and pipeline definitions entirely.",
    },
    {
      id: "dp800-65",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Multiple developers are working on the same SQL Database Project and their branches modify overlapping schema objects. What should your workflow include to manage this safely?",
      options: [
        { id: "a", text: "Branching, pull requests, and conflict resolution practices" },
        { id: "b", text: "Direct commits straight to the production branch" },
        { id: "c", text: "Disabling source control for the project folder" },
        { id: "d", text: "A single shared local database with no versioning" },
      ],
      correct: "a",
      explanation:
        "A branching strategy with pull requests and defined conflict resolution steps lets multiple developers safely evolve the same database project without overwriting each other's changes.",
    },
    {
      id: "dp800-66",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want deployments to a production database to require review from designated database owners before merging, and to run only from an approved branch. What should you configure in your deployment pipeline?",
      options: [
        { id: "a", text: "Controls such as branching policies, approvals, and code owners" },
        { id: "b", text: "A wider connection pool" },
        { id: "c", text: "A recursive CTE" },
        { id: "d", text: "Column-level encryption only" },
      ],
      correct: "a",
      explanation:
        "Deployment pipeline controls — branching policies, required approvals, and code owners — enforce governance so changes to production only happen through a reviewed, approved path.",
    },
    {
      id: "dp800-67",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need to guarantee that a multi-step financial transfer either fully commits or fully rolls back, with no partial state visible to other sessions. Which concept governs this behavior?",
      options: [
        { id: "a", text: "Transaction isolation and atomicity" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Schema drift detection" },
        { id: "d", text: "Data API builder caching" },
      ],
      correct: "a",
      explanation:
        "Transaction atomicity, governed by isolation level and proper transaction boundaries, ensures a multi-step operation commits completely or not at all, with no partial results exposed.",
    },
    {
      id: "dp800-68",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "Which encryption approach protects data specifically at the column level, letting you encrypt only the sensitive columns (like SSNs) rather than the entire database?",
      options: [
        { id: "a", text: "Column-level encryption" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Row-Level Security" },
        { id: "d", text: "Ledger verification" },
      ],
      correct: "a",
      explanation:
        "Column-level encryption lets you selectively encrypt individual sensitive columns, rather than encrypting the entire database uniformly.",
    },
    {
      id: "dp800-69",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need every write to a table to also be captured with the identity of the app/service, and you want a report of who changed what schema object over the last quarter. Which capability satisfies this?",
      options: [
        { id: "a", text: "Auditing configured at the database or server level" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "A table-valued function" },
        { id: "d", text: "A SEQUENCE object" },
      ],
      correct: "a",
      explanation:
        "Server- or database-level auditing logs schema and data change events along with the executing principal, supporting reports on who changed what and when.",
    },
    {
      id: "dp800-70",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "A report shows a query's estimated plan differs significantly from what actually executed, causing a performance issue. What should you compare to diagnose this?",
      options: [
        { id: "a", text: "The estimated execution plan against the actual execution plan" },
        { id: "b", text: "The row-level security predicate against the CHECK constraint" },
        { id: "c", text: "The vector index type against the embedding dimension" },
        { id: "d", text: "The DAB entity cache against Query Store retention" },
      ],
      correct: "a",
      explanation:
        "Comparing the estimated plan (based on statistics) to the actual plan (based on runtime row counts) reveals cardinality estimate errors that often explain performance issues.",
    },
    {
      id: "dp800-71",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need to grant a service principal the ability to call your database-backed REST API without ever handling a database password. What best supports this?",
      options: [
        { id: "a", text: "Passwordless, identity-based authentication" },
        { id: "b", text: "A shared SQL login and password distributed to every service" },
        { id: "c", text: "Dynamic Data Masking" },
        { id: "d", text: "A ledger table" },
      ],
      correct: "a",
      explanation:
        "Passwordless, identity-based authentication (such as a managed identity or Microsoft Entra token) removes the need to distribute or manage a shared database password.",
    },
    {
      id: "dp800-72",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You are deploying a change that renames a column referenced by an existing view. Which SQL Database Project capability helps catch this break before it reaches production?",
      options: [
        { id: "a", text: "Build-time validation across dependent objects" },
        { id: "b", text: "Dynamic Data Masking" },
        { id: "c", text: "Query Performance Insight" },
        { id: "d", text: "Row-Level Security" },
      ],
      correct: "a",
      explanation:
        "SQL Database Projects validate the whole model at build time, so a renamed column that breaks a dependent view surfaces as a build error before it's ever deployed.",
    },
    {
      id: "dp800-73",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You want to reduce fragmentation and improve read performance on a large, infrequently updated reporting table by changing its physical storage format. What should you consider?",
      options: [
        { id: "a", text: "A column store index" },
        { id: "b", text: "Row-Level Security" },
        { id: "c", text: "Always Encrypted" },
        { id: "d", text: "A GraphQL entity" },
      ],
      correct: "a",
      explanation:
        "Column store indexes store data column-wise with heavy compression, which is well suited to large, read-heavy analytical tables and improves scan performance.",
    },
    {
      id: "dp800-74",
      domain: "Secure, optimize, and deploy database solutions",
      question:
        "You need a way to detect and resolve write-write conflicts when two transactions try to update the same row under snapshot isolation. What error should your application be prepared to handle?",
      options: [
        { id: "a", text: "An update conflict / concurrency exception" },
        { id: "b", text: "A schema drift warning" },
        { id: "c", text: "A DAB pagination error" },
        { id: "d", text: "A ledger digest mismatch" },
      ],
      correct: "a",
      explanation:
        "Under snapshot isolation, if two transactions modify the same row concurrently, the engine raises an update conflict, and the application must retry or resolve it.",
    },
    {
      id: "dp800-75",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You are evaluating candidate external models for a product-image tagging feature and need one that accepts both images and text in the same request. Which model characteristic should you prioritize?",
      options: [
        { id: "a", text: "Multimodal support" },
        { id: "b", text: "Multilanguage support only" },
        { id: "c", text: "Structured output only" },
        { id: "d", text: "The smallest available model size" },
      ],
      correct: "a",
      explanation:
        "Multimodal models can accept multiple input types, such as images and text together, which is required for a feature that tags images using both visual and textual context.",
    },
    {
      id: "dp800-76",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Your application needs a model response returned as a strict, predictable JSON schema so downstream T-SQL can parse it without extra cleanup. Which model capability should you require?",
      options: [
        { id: "a", text: "Structured output support" },
        { id: "b", text: "The largest available context window" },
        { id: "c", text: "Multilanguage support" },
        { id: "d", text: "The cheapest per-token pricing tier" },
      ],
      correct: "a",
      explanation:
        "Structured output support lets you constrain a model's response to a defined schema (such as strict JSON), making it reliably parseable by downstream code.",
    },
    {
      id: "dp800-77",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Once you've chosen an external model for embeddings, what must you do before T-SQL code can call it from within the database?",
      options: [
        { id: "a", text: "Create and manage it as an external model object in the database" },
        { id: "b", text: "Recompile every stored procedure in the database" },
        { id: "c", text: "Convert it into a ledger table" },
        { id: "d", text: "Disable Query Store" },
      ],
      correct: "a",
      explanation:
        "External models must be registered and managed as external model objects in the database, which store connection and authentication details for T-SQL to invoke them.",
    },
    {
      id: "dp800-78",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You're deciding which columns of a product table to include when generating embeddings. What should primarily guide that decision?",
      options: [
        { id: "a", text: "Which columns carry the semantic meaning relevant to the search or RAG use case" },
        { id: "b", text: "Including every column in the table regardless of relevance" },
        { id: "c", text: "Only including numeric columns" },
        { id: "d", text: "Only including the primary key column" },
      ],
      correct: "a",
      explanation:
        "Identifying which columns to include in embeddings means choosing the fields that actually carry the semantic content relevant to how the embeddings will be searched or used.",
    },
    {
      id: "dp800-79",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Which T-SQL data type is used to store an embedding vector so it can be indexed and searched with vector functions?",
      options: [
        { id: "a", text: "The VECTOR data type" },
        { id: "b", text: "VARCHAR(MAX)" },
        { id: "c", text: "XML" },
        { id: "d", text: "GEOGRAPHY" },
      ],
      correct: "a",
      explanation:
        "The VECTOR data type is purpose-built to store embedding values, enabling vector indexing and use with vector functions like VECTOR_DISTANCE and VECTOR_SEARCH.",
    },
    {
      id: "dp800-80",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need to standardize embedding vectors to unit length before computing cosine similarity, to make the comparison consistent. Which function should you use?",
      options: [
        { id: "a", text: "VECTOR_NORMALIZE" },
        { id: "b", text: "VECTOR_SEARCH" },
        { id: "c", text: "VECTORPROPERTY" },
        { id: "d", text: "JSON_MODIFY" },
      ],
      correct: "a",
      explanation:
        "VECTOR_NORMALIZE scales a vector to unit length, which is a common preprocessing step before cosine-similarity-based comparisons for consistency.",
    },
    {
      id: "dp800-81",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You want to inspect metadata about a stored vector value, such as its dimension count, without manually parsing it. Which function should you use?",
      options: [
        { id: "a", text: "VECTORPROPERTY" },
        { id: "b", text: "VECTOR_DISTANCE" },
        { id: "c", text: "JSON_VALUE" },
        { id: "d", text: "OPENJSON" },
      ],
      correct: "a",
      explanation:
        "VECTORPROPERTY returns metadata about a vector value, such as its dimension count, useful for validation and diagnostics.",
    },
    {
      id: "dp800-82",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need a single function call that performs the full vector similarity search operation — comparing a query vector against an indexed vector column and returning the closest matches. Which function fits?",
      options: [
        { id: "a", text: "VECTOR_SEARCH" },
        { id: "b", text: "VECTOR_NORMALIZE" },
        { id: "c", text: "REGEXP_MATCHES" },
        { id: "d", text: "EDIT_DISTANCE" },
      ],
      correct: "a",
      explanation:
        "VECTOR_SEARCH performs the end-to-end similarity search against a vector index, returning the nearest matches to a given query vector.",
    },
    {
      id: "dp800-83",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need to search product documentation for exact keyword and phrase matches, weighted by relevance, without involving embeddings at all. Which capability fits?",
      options: [
        { id: "a", text: "Full-text search" },
        { id: "b", text: "Vector search" },
        { id: "c", text: "Hybrid search with RRF" },
        { id: "d", text: "Row-Level Security" },
      ],
      correct: "a",
      explanation:
        "Full-text search performs linguistic keyword and phrase matching with relevance ranking, independent of embeddings or vector representations.",
    },
    {
      id: "dp800-84",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Before choosing an ANN index configuration for a very large vector column, what should you evaluate to balance recall against query latency?",
      options: [
        { id: "a", text: "Vector index types and their distance metrics" },
        { id: "b", text: "The CHECK constraints on the table" },
        { id: "c", text: "The DAB pagination page size" },
        { id: "d", text: "The ledger digest schedule" },
      ],
      correct: "a",
      explanation:
        "Different vector index types and distance metrics trade off recall (accuracy) against query latency differently, so evaluating them is key to tuning large-scale vector search.",
    },
    {
      id: "dp800-85",
      domain: "Implement AI capabilities in database solutions",
      question:
        "After implementing a vector search feature, how should you validate that it's actually returning relevant results at acceptable speed before rolling it out broadly?",
      options: [
        { id: "a", text: "Evaluate the performance of vector and hybrid search against representative queries" },
        { id: "b", text: "Assume default settings are always optimal" },
        { id: "c", text: "Only test with a single sample row" },
        { id: "d", text: "Skip evaluation and go straight to production" },
      ],
      correct: "a",
      explanation:
        "Evaluating vector and hybrid search performance against representative queries — measuring both relevance and latency — is necessary before relying on it in production.",
    },
    {
      id: "dp800-86",
      domain: "Implement AI capabilities in database solutions",
      question:
        "A customer support scenario needs the language model to answer questions using only your company's current order data, not its general training knowledge. Which use case is this?",
      options: [
        { id: "a", text: "Retrieval-augmented generation (RAG)" },
        { id: "b", text: "Fine-tuning the base model" },
        { id: "c", text: "Dynamic Data Masking" },
        { id: "d", text: "Column-level encryption" },
      ],
      correct: "a",
      explanation:
        "RAG grounds a language model's answers in retrieved, current data (such as live order records) rather than relying solely on the model's static training knowledge.",
    },
    {
      id: "dp800-87",
      domain: "Implement AI capabilities in database solutions",
      question:
        "Before sending retrieved order rows to a language model as part of a RAG prompt, what must you typically do to the relational result set?",
      options: [
        { id: "a", text: "Convert the structured data to JSON for language model processing" },
        { id: "b", text: "Encrypt it with Always Encrypted" },
        { id: "c", text: "Partition it by date" },
        { id: "d", text: "Apply Dynamic Data Masking" },
      ],
      correct: "a",
      explanation:
        "Converting structured relational rows to JSON puts the data in a format the language model can readily consume as part of the prompt context.",
    },
    {
      id: "dp800-88",
      domain: "Implement AI capabilities in database solutions",
      question:
        "After a language model responds to a RAG prompt sent from T-SQL, what must your code do to make the response usable in downstream logic?",
      options: [
        { id: "a", text: "Extract and parse the language model's response from the REST call" },
        { id: "b", text: "Immediately discard the response" },
        { id: "c", text: "Store the raw HTTP headers only" },
        { id: "d", text: "Re-run VECTOR_NORMALIZE on the response text" },
      ],
      correct: "a",
      explanation:
        "After invoking the external endpoint, the response payload must be extracted and parsed (for example with JSON functions) so the result can be used in downstream T-SQL logic.",
    },
    {
      id: "dp800-89",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You need each product review's embedding to reflect edits made to the review text within seconds, using a lightweight mechanism rather than a full CDC pipeline. Which option fits best?",
      options: [
        { id: "a", text: "Change Tracking paired with a lightweight refresh process" },
        { id: "b", text: "A nightly full-table re-embedding job only" },
        { id: "c", text: "Row-Level Security" },
        { id: "d", text: "Always Encrypted" },
      ],
      correct: "a",
      explanation:
        "Change Tracking provides a lightweight way to identify which rows changed since the last check, letting you refresh just those embeddings quickly without a heavier CDC pipeline.",
    },
    {
      id: "dp800-90",
      domain: "Implement AI capabilities in database solutions",
      question:
        "You're deciding between full-text, semantic vector, and hybrid search for a documentation search feature where users mix exact error codes with natural-language questions. Which approach best serves both patterns at once?",
      options: [
        { id: "a", text: "Hybrid search combining full-text and vector search" },
        { id: "b", text: "Full-text search alone" },
        { id: "c", text: "Vector search alone" },
        { id: "d", text: "Row-Level Security" },
      ],
      correct: "a",
      explanation:
        "Hybrid search combines exact keyword matching (good for error codes) with semantic vector search (good for natural-language questions), covering both query patterns.",
    },
  ],
};
