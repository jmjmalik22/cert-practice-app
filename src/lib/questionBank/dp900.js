export const DP_900 = {
  "label": "Azure Data Fundamentals",
  "questions": [
    {
      "id": "dp900-1",
      "domain": "Describe core data concepts",
      "question": "Which type of data is organized into a predefined schema with rows and columns, such as data in a relational database table?",
      "options": [
        {
          "id": "a",
          "text": "Structured data"
        },
        {
          "id": "b",
          "text": "Semi-structured data"
        },
        {
          "id": "c",
          "text": "Unstructured data"
        },
        {
          "id": "d",
          "text": "Streaming data only"
        }
      ],
      "correct": "a",
      "explanation": "Structured data conforms to a fixed schema of rows and columns, like tables in a relational database, making it straightforward to query with SQL."
    },
    {
      "id": "dp900-2",
      "domain": "Describe core data concepts",
      "question": "Which type of data has some organizational structure, such as tags or key-value pairs, but doesn't conform to a fixed relational schema — for example, JSON?",
      "options": [
        {
          "id": "a",
          "text": "Semi-structured data"
        },
        {
          "id": "b",
          "text": "Structured data"
        },
        {
          "id": "c",
          "text": "Unstructured data"
        },
        {
          "id": "d",
          "text": "Relational data only"
        }
      ],
      "correct": "a",
      "explanation": "Semi-structured data, like JSON or XML, has some organizational markers (tags, keys) but doesn't require a fixed relational schema, allowing flexible or nested structures."
    },
    {
      "id": "dp900-3",
      "domain": "Describe core data concepts",
      "question": "Which type of data has no predefined structure at all, such as images, videos, or free-form text documents?",
      "options": [
        {
          "id": "a",
          "text": "Unstructured data"
        },
        {
          "id": "b",
          "text": "Structured data"
        },
        {
          "id": "c",
          "text": "Semi-structured data"
        },
        {
          "id": "d",
          "text": "Tabular data"
        }
      ],
      "correct": "a",
      "explanation": "Unstructured data has no predefined data model or organization, such as images, audio, video, and free-form text — it requires different storage and processing approaches than structured data."
    },
    {
      "id": "dp900-4",
      "domain": "Describe core data concepts",
      "question": "Which file format stores data in a compressed, column-oriented layout that's efficient for analytical queries scanning specific columns?",
      "options": [
        {
          "id": "a",
          "text": "Parquet"
        },
        {
          "id": "b",
          "text": "CSV"
        },
        {
          "id": "c",
          "text": "Plain text"
        },
        {
          "id": "d",
          "text": "BMP image"
        }
      ],
      "correct": "a",
      "explanation": "Parquet is a compressed, columnar storage format optimized for analytical workloads, since queries can read only the columns they need rather than scanning entire rows."
    },
    {
      "id": "dp900-5",
      "domain": "Describe core data concepts",
      "question": "Which type of database organizes data into related tables with defined schemas and relationships, typically queried using SQL?",
      "options": [
        {
          "id": "a",
          "text": "A relational database"
        },
        {
          "id": "b",
          "text": "A key-value store"
        },
        {
          "id": "c",
          "text": "A document database"
        },
        {
          "id": "d",
          "text": "A graph database"
        }
      ],
      "correct": "a",
      "explanation": "A relational database organizes structured data into tables with defined schemas and relationships (via keys), and is queried using SQL."
    },
    {
      "id": "dp900-6",
      "domain": "Describe core data concepts",
      "question": "Which Azure data store is purpose-built for storing large binary objects, like images and videos, and is not optimized for structured relational queries?",
      "options": [
        {
          "id": "a",
          "text": "Azure Blob storage"
        },
        {
          "id": "b",
          "text": "Azure SQL Database"
        },
        {
          "id": "c",
          "text": "Azure Synapse Analytics"
        },
        {
          "id": "d",
          "text": "Azure Database for MySQL"
        }
      ],
      "correct": "a",
      "explanation": "Azure Blob storage is designed for storing massive amounts of unstructured binary data, such as images and videos, rather than structured relational data."
    },
    {
      "id": "dp900-7",
      "domain": "Describe core data concepts",
      "question": "Which type of data workload is characterized by many small, fast read/write operations, like processing individual customer orders in real time?",
      "options": [
        {
          "id": "a",
          "text": "A transactional (OLTP) workload"
        },
        {
          "id": "b",
          "text": "An analytical (OLAP) workload"
        },
        {
          "id": "c",
          "text": "A batch ETL workload"
        },
        {
          "id": "d",
          "text": "A data archival workload"
        }
      ],
      "correct": "a",
      "explanation": "Transactional (OLTP) workloads involve frequent, small, fast operations — like inserting or updating individual records — supporting real-time business processes."
    },
    {
      "id": "dp900-8",
      "domain": "Describe core data concepts",
      "question": "Which type of data workload involves complex queries over large volumes of historical data to support reporting and business intelligence?",
      "options": [
        {
          "id": "a",
          "text": "An analytical (OLAP) workload"
        },
        {
          "id": "b",
          "text": "A transactional (OLTP) workload"
        },
        {
          "id": "c",
          "text": "A real-time messaging workload"
        },
        {
          "id": "d",
          "text": "A file synchronization workload"
        }
      ],
      "correct": "a",
      "explanation": "Analytical (OLAP) workloads run complex, often aggregate queries over large historical datasets to support reporting, dashboards, and business intelligence."
    },
    {
      "id": "dp900-9",
      "domain": "Describe core data concepts",
      "question": "Which role is primarily responsible for designing, implementing, and maintaining database systems, ensuring performance, security, and availability?",
      "options": [
        {
          "id": "a",
          "text": "Database administrator"
        },
        {
          "id": "b",
          "text": "Data engineer"
        },
        {
          "id": "c",
          "text": "Data analyst"
        },
        {
          "id": "d",
          "text": "Business stakeholder"
        }
      ],
      "correct": "a",
      "explanation": "A database administrator (DBA) manages the ongoing operation of database systems, focusing on performance, security, backup/recovery, and availability."
    },
    {
      "id": "dp900-10",
      "domain": "Describe core data concepts",
      "question": "Which role focuses on building and maintaining the pipelines and infrastructure that move and transform data from source systems into analytical stores?",
      "options": [
        {
          "id": "a",
          "text": "Data engineer"
        },
        {
          "id": "b",
          "text": "Database administrator"
        },
        {
          "id": "c",
          "text": "Data analyst"
        },
        {
          "id": "d",
          "text": "Solution architect only"
        }
      ],
      "correct": "a",
      "explanation": "A data engineer designs and builds the data pipelines and infrastructure that ingest, transform, and move data from source systems into stores ready for analysis."
    },
    {
      "id": "dp900-11",
      "domain": "Describe core data concepts",
      "question": "Which role focuses on exploring data, building reports and visualizations, and deriving business insights from prepared data?",
      "options": [
        {
          "id": "a",
          "text": "Data analyst"
        },
        {
          "id": "b",
          "text": "Database administrator"
        },
        {
          "id": "c",
          "text": "Data engineer"
        },
        {
          "id": "d",
          "text": "Network administrator"
        }
      ],
      "correct": "a",
      "explanation": "A data analyst explores and analyzes prepared data, building reports and visualizations to help the business make informed decisions."
    },
    {
      "id": "dp900-12",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which relational database design process reduces data redundancy by organizing tables so each fact is stored only once?",
      "options": [
        {
          "id": "a",
          "text": "Normalization"
        },
        {
          "id": "b",
          "text": "Denormalization"
        },
        {
          "id": "c",
          "text": "Partitioning"
        },
        {
          "id": "d",
          "text": "Sharding"
        }
      ],
      "correct": "a",
      "explanation": "Normalization organizes tables to eliminate redundant data, ensuring each fact is stored in only one place, which improves data integrity though it may require more joins to query."
    },
    {
      "id": "dp900-13",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which SQL statement type is used to retrieve rows of data from one or more tables?",
      "options": [
        {
          "id": "a",
          "text": "SELECT"
        },
        {
          "id": "b",
          "text": "INSERT"
        },
        {
          "id": "c",
          "text": "UPDATE"
        },
        {
          "id": "d",
          "text": "DELETE"
        }
      ],
      "correct": "a",
      "explanation": "SELECT is the SQL statement used to query and retrieve data from one or more tables, optionally filtering, joining, and aggregating results."
    },
    {
      "id": "dp900-14",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which SQL statement adds new rows of data into an existing table?",
      "options": [
        {
          "id": "a",
          "text": "INSERT"
        },
        {
          "id": "b",
          "text": "SELECT"
        },
        {
          "id": "c",
          "text": "UPDATE"
        },
        {
          "id": "d",
          "text": "CREATE"
        }
      ],
      "correct": "a",
      "explanation": "INSERT adds new rows of data into a table, while SELECT retrieves data, UPDATE modifies existing rows, and DELETE removes rows."
    },
    {
      "id": "dp900-15",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which database object uniquely identifies each row in a table and is often used to enforce referential integrity when referenced by other tables?",
      "options": [
        {
          "id": "a",
          "text": "A primary key"
        },
        {
          "id": "b",
          "text": "A view"
        },
        {
          "id": "c",
          "text": "A stored procedure"
        },
        {
          "id": "d",
          "text": "An index only"
        }
      ],
      "correct": "a",
      "explanation": "A primary key uniquely identifies each row in a table; other tables reference it via a foreign key to establish and enforce relationships."
    },
    {
      "id": "dp900-16",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which database object stores a saved, reusable SELECT query that can be queried like a virtual table?",
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
          "text": "A primary key"
        }
      ],
      "correct": "a",
      "explanation": "A view is a saved SQL query that can be queried like a table, providing a reusable and simplified way to access commonly needed data combinations."
    },
    {
      "id": "dp900-17",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which Azure relational database service gives you a fully managed, single database with minimal administrative overhead and built-in high availability?",
      "options": [
        {
          "id": "a",
          "text": "Azure SQL Database"
        },
        {
          "id": "b",
          "text": "SQL Server on Azure Virtual Machines"
        },
        {
          "id": "c",
          "text": "Azure Blob storage"
        },
        {
          "id": "d",
          "text": "Azure Cosmos DB"
        }
      ],
      "correct": "a",
      "explanation": "Azure SQL Database is a fully managed platform-as-a-service (PaaS) relational database, handling patching, backups, and high availability automatically."
    },
    {
      "id": "dp900-18",
      "domain": "Identify considerations for relational data on Azure",
      "question": "An organization needs full control over the SQL Server operating system and instance-level configuration for legacy compatibility. Which option fits best?",
      "options": [
        {
          "id": "a",
          "text": "SQL Server on Azure Virtual Machines"
        },
        {
          "id": "b",
          "text": "Azure SQL Database"
        },
        {
          "id": "c",
          "text": "Azure SQL Managed Instance"
        },
        {
          "id": "d",
          "text": "Azure Cosmos DB"
        }
      ],
      "correct": "a",
      "explanation": "SQL Server on Azure Virtual Machines (IaaS) gives full control over the OS and SQL Server instance, useful when legacy features or full instance-level configuration control is required."
    },
    {
      "id": "dp900-19",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which Azure SQL offering provides near-100% compatibility with on-premises SQL Server at the instance level, while remaining a managed PaaS service?",
      "options": [
        {
          "id": "a",
          "text": "Azure SQL Managed Instance"
        },
        {
          "id": "b",
          "text": "Azure SQL Database"
        },
        {
          "id": "c",
          "text": "SQL Server on Azure VMs"
        },
        {
          "id": "d",
          "text": "Azure Table storage"
        }
      ],
      "correct": "a",
      "explanation": "Azure SQL Managed Instance offers near-complete SQL Server instance-level compatibility while still being a fully managed PaaS offering, bridging the gap between Azure SQL Database and SQL Server on VMs."
    },
    {
      "id": "dp900-20",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which Azure services let you run popular open-source relational database engines, like PostgreSQL or MySQL, as managed services?",
      "options": [
        {
          "id": "a",
          "text": "Azure Database for PostgreSQL and Azure Database for MySQL"
        },
        {
          "id": "b",
          "text": "Azure Cosmos DB only"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure Blob storage"
        }
      ],
      "correct": "a",
      "explanation": "Azure offers managed database services for popular open-source engines, including Azure Database for PostgreSQL and Azure Database for MySQL."
    },
    {
      "id": "dp900-21",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Storage service organizes unstructured data into containers and blobs, commonly used for media files, backups, and data lake storage?",
      "options": [
        {
          "id": "a",
          "text": "Azure Blob storage"
        },
        {
          "id": "b",
          "text": "Azure Table storage"
        },
        {
          "id": "c",
          "text": "Azure Files"
        },
        {
          "id": "d",
          "text": "Azure SQL Database"
        }
      ],
      "correct": "a",
      "explanation": "Azure Blob storage organizes unstructured data into containers holding blobs, commonly used for media, backups, logs, and as the foundation for data lakes."
    },
    {
      "id": "dp900-22",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Storage service provides fully managed file shares accessible over standard file-sharing protocols like SMB?",
      "options": [
        {
          "id": "a",
          "text": "Azure Files"
        },
        {
          "id": "b",
          "text": "Azure Blob storage"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure Queue storage"
        }
      ],
      "correct": "a",
      "explanation": "Azure Files provides managed file shares accessible via SMB (and NFS), letting you replace or supplement on-premises file servers."
    },
    {
      "id": "dp900-23",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Storage service stores simple key-attribute data (NoSQL) suited for flexible schemas without complex joins, at massive scale?",
      "options": [
        {
          "id": "a",
          "text": "Azure Table storage"
        },
        {
          "id": "b",
          "text": "Azure Files"
        },
        {
          "id": "c",
          "text": "Azure Blob storage archive tier"
        },
        {
          "id": "d",
          "text": "Azure SQL Database"
        }
      ],
      "correct": "a",
      "explanation": "Azure Table storage is a NoSQL key-attribute store designed for large volumes of structured, non-relational data with a flexible schema and fast key-based lookups."
    },
    {
      "id": "dp900-24",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure service is a globally distributed, multi-model NoSQL database offering low-latency reads and writes across multiple regions?",
      "options": [
        {
          "id": "a",
          "text": "Azure Cosmos DB"
        },
        {
          "id": "b",
          "text": "Azure SQL Database"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure Blob storage"
        }
      ],
      "correct": "a",
      "explanation": "Azure Cosmos DB is a globally distributed, multi-model NoSQL database service designed for low-latency, high-throughput access across multiple regions."
    },
    {
      "id": "dp900-25",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "A gaming company needs a database for player profiles with flexible, evolving schemas and guaranteed sub-10ms latency for millions of concurrent users globally. Which service fits best?",
      "options": [
        {
          "id": "a",
          "text": "Azure Cosmos DB"
        },
        {
          "id": "b",
          "text": "Azure SQL Database"
        },
        {
          "id": "c",
          "text": "Azure Files"
        },
        {
          "id": "d",
          "text": "Azure Blob storage archive tier"
        }
      ],
      "correct": "a",
      "explanation": "Azure Cosmos DB is purpose-built for exactly this scenario: flexible schemas, global distribution, and guaranteed low single-digit millisecond latency at any scale."
    },
    {
      "id": "dp900-26",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Cosmos DB API is designed for applications that need MongoDB wire-protocol compatibility while running on Cosmos DB's underlying engine?",
      "options": [
        {
          "id": "a",
          "text": "The API for MongoDB"
        },
        {
          "id": "b",
          "text": "The API for Table"
        },
        {
          "id": "c",
          "text": "The API for Cassandra"
        },
        {
          "id": "d",
          "text": "The Core (SQL) API only"
        }
      ],
      "correct": "a",
      "explanation": "Azure Cosmos DB's API for MongoDB lets existing MongoDB applications and drivers work against Cosmos DB with minimal code changes, using wire-protocol compatibility."
    },
    {
      "id": "dp900-27",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Cosmos DB API is optimized for storing and traversing highly connected data, such as social networks or recommendation engines?",
      "options": [
        {
          "id": "a",
          "text": "The Gremlin API (graph)"
        },
        {
          "id": "b",
          "text": "The API for Table"
        },
        {
          "id": "c",
          "text": "The Core (SQL) API"
        },
        {
          "id": "d",
          "text": "The API for MongoDB"
        }
      ],
      "correct": "a",
      "explanation": "The Gremlin API in Cosmos DB is optimized for graph data — entities and their relationships — well suited for scenarios like social networks, fraud detection, and recommendation engines."
    },
    {
      "id": "dp900-28",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which stage of large-scale analytics involves collecting raw data from source systems and preparing it for storage and analysis?",
      "options": [
        {
          "id": "a",
          "text": "Data ingestion and processing"
        },
        {
          "id": "b",
          "text": "Data visualization"
        },
        {
          "id": "c",
          "text": "Data archival only"
        },
        {
          "id": "d",
          "text": "Report distribution"
        }
      ],
      "correct": "a",
      "explanation": "Data ingestion and processing is the stage where raw data is collected from source systems, cleaned, and transformed before landing in an analytical data store."
    },
    {
      "id": "dp900-29",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Microsoft cloud service is a unified analytics platform bringing together data engineering, data warehousing, real-time analytics, and Power BI in one SaaS experience?",
      "options": [
        {
          "id": "a",
          "text": "Microsoft Fabric"
        },
        {
          "id": "b",
          "text": "Azure Files"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "Microsoft Fabric unifies data engineering, warehousing, real-time analytics, data science, and Power BI into a single SaaS analytics platform built on OneLake."
    },
    {
      "id": "dp900-30",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Microsoft cloud service is built on Apache Spark and is widely used for big data processing and collaborative data science notebooks?",
      "options": [
        {
          "id": "a",
          "text": "Azure Databricks"
        },
        {
          "id": "b",
          "text": "Azure Files"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "Azure Databricks is an Apache Spark-based analytics platform widely used for big data processing, machine learning, and collaborative notebook-based data science."
    },
    {
      "id": "dp900-31",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which type of data processing handles large volumes of data collected over a period of time and processed together, rather than immediately as it arrives?",
      "options": [
        {
          "id": "a",
          "text": "Batch processing"
        },
        {
          "id": "b",
          "text": "Streaming processing"
        },
        {
          "id": "c",
          "text": "Interactive querying only"
        },
        {
          "id": "d",
          "text": "Ad hoc querying only"
        }
      ],
      "correct": "a",
      "explanation": "Batch processing collects data over a period of time and processes it together in scheduled runs, as opposed to streaming processing which handles data continuously as it arrives."
    },
    {
      "id": "dp900-32",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which type of data processing analyzes data continuously as it's generated, typically within seconds, to support near-instant insights?",
      "options": [
        {
          "id": "a",
          "text": "Streaming (real-time) processing"
        },
        {
          "id": "b",
          "text": "Batch processing"
        },
        {
          "id": "c",
          "text": "Archival processing"
        },
        {
          "id": "d",
          "text": "Cold storage retrieval"
        }
      ],
      "correct": "a",
      "explanation": "Streaming (real-time) processing analyzes data continuously as it's generated, typically producing insights within seconds, unlike batch processing which runs on a schedule."
    },
    {
      "id": "dp900-33",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Azure service is commonly used to orchestrate and automate data movement and transformation pipelines, similar to Fabric's Data Factory experience?",
      "options": [
        {
          "id": "a",
          "text": "Azure Data Factory"
        },
        {
          "id": "b",
          "text": "Azure Table storage"
        },
        {
          "id": "c",
          "text": "Azure Files"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "Azure Data Factory is a cloud-based data integration service used to orchestrate and automate the movement and transformation of data across sources."
    },
    {
      "id": "dp900-34",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Microsoft service is used to build interactive reports and dashboards, connecting to a wide variety of data sources for business intelligence?",
      "options": [
        {
          "id": "a",
          "text": "Power BI"
        },
        {
          "id": "b",
          "text": "Azure Files"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "Power BI is Microsoft's business intelligence tool for building interactive reports and dashboards, connecting to many data sources for visualization and analysis."
    },
    {
      "id": "dp900-35",
      "domain": "Describe an analytics workload on Azure",
      "question": "In Power BI, which component defines the relationships, measures, and structure that underlie reports, separate from the visuals themselves?",
      "options": [
        {
          "id": "a",
          "text": "A semantic model (dataset)"
        },
        {
          "id": "b",
          "text": "A dashboard tile"
        },
        {
          "id": "c",
          "text": "A workspace"
        },
        {
          "id": "d",
          "text": "A gateway"
        }
      ],
      "correct": "a",
      "explanation": "A Power BI semantic model (formerly called a dataset) defines the data structure, relationships, and measures that reports and visuals are built on top of."
    },
    {
      "id": "dp900-36",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Power BI visualization type is best suited for showing a trend in a numeric value over a continuous period of time, like monthly revenue?",
      "options": [
        {
          "id": "a",
          "text": "A line chart"
        },
        {
          "id": "b",
          "text": "A pie chart"
        },
        {
          "id": "c",
          "text": "A single card/KPI"
        },
        {
          "id": "d",
          "text": "A matrix without any date field"
        }
      ],
      "correct": "a",
      "explanation": "A line chart is well suited for showing trends over a continuous dimension like time, making it easy to spot patterns such as growth, decline, or seasonality."
    },
    {
      "id": "dp900-37",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Power BI visualization type is best suited for comparing values across a small number of discrete categories, like sales by product category?",
      "options": [
        {
          "id": "a",
          "text": "A bar or column chart"
        },
        {
          "id": "b",
          "text": "A line chart"
        },
        {
          "id": "c",
          "text": "A scatter plot"
        },
        {
          "id": "d",
          "text": "A gauge only"
        }
      ],
      "correct": "a",
      "explanation": "Bar and column charts are well suited for comparing values across a small number of discrete categories, making differences in magnitude easy to see."
    },
    {
      "id": "dp900-38",
      "domain": "Describe core data concepts",
      "question": "A hospital stores patient vitals as time-stamped sensor readings that arrive continuously. Which data workload characteristic best describes this scenario?",
      "options": [
        {
          "id": "a",
          "text": "Streaming/real-time analytical processing"
        },
        {
          "id": "b",
          "text": "A one-time batch import"
        },
        {
          "id": "c",
          "text": "A purely relational transactional system only"
        },
        {
          "id": "d",
          "text": "Unstructured archival storage only"
        }
      ],
      "correct": "a",
      "explanation": "Continuously arriving, time-stamped sensor data is a classic streaming scenario, best handled by real-time analytics rather than a single batch import."
    },
    {
      "id": "dp900-39",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which SQL statement permanently removes rows from a table based on a specified condition?",
      "options": [
        {
          "id": "a",
          "text": "DELETE"
        },
        {
          "id": "b",
          "text": "SELECT"
        },
        {
          "id": "c",
          "text": "INSERT"
        },
        {
          "id": "d",
          "text": "CREATE"
        }
      ],
      "correct": "a",
      "explanation": "DELETE removes rows from a table matching a specified WHERE condition; without a condition, it removes all rows."
    },
    {
      "id": "dp900-40",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which SQL statement modifies existing values in one or more columns of a table?",
      "options": [
        {
          "id": "a",
          "text": "UPDATE"
        },
        {
          "id": "b",
          "text": "INSERT"
        },
        {
          "id": "c",
          "text": "SELECT"
        },
        {
          "id": "d",
          "text": "DROP"
        }
      ],
      "correct": "a",
      "explanation": "UPDATE modifies the values of existing rows in a table, typically filtered by a WHERE clause to target specific records."
    },
    {
      "id": "dp900-41",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which database object references the primary key of another table, enforcing referential integrity between related tables?",
      "options": [
        {
          "id": "a",
          "text": "A foreign key"
        },
        {
          "id": "b",
          "text": "A view"
        },
        {
          "id": "c",
          "text": "A stored procedure"
        },
        {
          "id": "d",
          "text": "A trigger only"
        }
      ],
      "correct": "a",
      "explanation": "A foreign key is a column (or set of columns) in one table that references the primary key of another table, enforcing referential integrity between the two."
    },
    {
      "id": "dp900-42",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Storage service is designed for reliable message queuing between application components, decoupling producers and consumers?",
      "options": [
        {
          "id": "a",
          "text": "Azure Queue storage"
        },
        {
          "id": "b",
          "text": "Azure Blob storage"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure Files"
        }
      ],
      "correct": "a",
      "explanation": "Azure Queue storage provides a simple, reliable message queuing service that decouples application components, letting producers and consumers operate independently."
    },
    {
      "id": "dp900-43",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure Cosmos DB API most closely matches the traditional Cosmos DB native experience with SQL-like query syntax over JSON documents?",
      "options": [
        {
          "id": "a",
          "text": "The Core (SQL) API"
        },
        {
          "id": "b",
          "text": "The API for Table"
        },
        {
          "id": "c",
          "text": "The Gremlin API"
        },
        {
          "id": "d",
          "text": "The API for MongoDB"
        }
      ],
      "correct": "a",
      "explanation": "The Core (SQL) API is Cosmos DB's native API, using a SQL-like query language over JSON documents, and is generally recommended for new applications without a specific compatibility requirement."
    },
    {
      "id": "dp900-44",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which term describes the practice of consolidating large volumes of structured and unstructured data from many sources into a central analytical store for reporting?",
      "options": [
        {
          "id": "a",
          "text": "Data warehousing"
        },
        {
          "id": "b",
          "text": "Message queuing"
        },
        {
          "id": "c",
          "text": "Single sign-on"
        },
        {
          "id": "d",
          "text": "Resource locking"
        }
      ],
      "correct": "a",
      "explanation": "Data warehousing consolidates data from multiple sources into a central, structured analytical store optimized for reporting and business intelligence queries."
    },
    {
      "id": "dp900-45",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which term describes a centralized repository that can store vast amounts of raw structured, semi-structured, and unstructured data at scale, often before it's fully modeled?",
      "options": [
        {
          "id": "a",
          "text": "A data lake"
        },
        {
          "id": "b",
          "text": "A relational database"
        },
        {
          "id": "c",
          "text": "A message queue"
        },
        {
          "id": "d",
          "text": "A key-value store"
        }
      ],
      "correct": "a",
      "explanation": "A data lake stores vast amounts of raw data in its native format — structured, semi-structured, and unstructured alike — often before it's transformed and modeled for specific analytical uses."
    },
    {
      "id": "dp900-46",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which term describes the process of extracting data from a source, transforming it into a target-compatible format, and loading it into a destination store?",
      "options": [
        {
          "id": "a",
          "text": "ETL (Extract, Transform, Load)"
        },
        {
          "id": "b",
          "text": "Normalization"
        },
        {
          "id": "c",
          "text": "Sharding"
        },
        {
          "id": "d",
          "text": "Replication"
        }
      ],
      "correct": "a",
      "explanation": "ETL (Extract, Transform, Load) describes the common pattern of pulling data from a source, transforming it to fit the target schema, and loading it into a destination data store."
    },
    {
      "id": "dp900-47",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which variant of the ETL pattern loads raw data into the target first, then performs transformations within the destination system itself?",
      "options": [
        {
          "id": "a",
          "text": "ELT (Extract, Load, Transform)"
        },
        {
          "id": "b",
          "text": "OLTP"
        },
        {
          "id": "c",
          "text": "Normalization"
        },
        {
          "id": "d",
          "text": "Sharding"
        }
      ],
      "correct": "a",
      "explanation": "ELT (Extract, Load, Transform) loads raw data into the destination system first and performs transformations there, taking advantage of the destination's processing power — a common pattern in modern cloud data warehouses and lakehouses."
    },
    {
      "id": "dp900-48",
      "domain": "Describe core data concepts",
      "question": "A logistics company wants to store GPS coordinates, timestamps, and free-text delivery notes together for each shipment, with fields that vary between shipment types. Which data representation fits best?",
      "options": [
        {
          "id": "a",
          "text": "Semi-structured data (e.g. JSON documents)"
        },
        {
          "id": "b",
          "text": "Strictly structured relational rows only"
        },
        {
          "id": "c",
          "text": "Purely unstructured binary blobs only"
        },
        {
          "id": "d",
          "text": "A fixed-width flat file only"
        }
      ],
      "correct": "a",
      "explanation": "Semi-structured formats like JSON handle varying fields per record well, since they don't require every document to share an identical rigid schema, unlike strict relational tables."
    },
    {
      "id": "dp900-49",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which relational design technique intentionally introduces some redundancy by combining related tables, often to improve read query performance for reporting?",
      "options": [
        {
          "id": "a",
          "text": "Denormalization"
        },
        {
          "id": "b",
          "text": "Normalization"
        },
        {
          "id": "c",
          "text": "Indexing removal"
        },
        {
          "id": "d",
          "text": "Sharding"
        }
      ],
      "correct": "a",
      "explanation": "Denormalization intentionally combines related, normalized tables to reduce the number of joins needed, trading some redundancy for faster read performance — common in reporting/warehouse scenarios."
    },
    {
      "id": "dp900-50",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Microsoft cloud service for real-time analytics lets you ingest, store, and query high-velocity event data using KQL, similar to Fabric's Eventhouse?",
      "options": [
        {
          "id": "a",
          "text": "Azure Data Explorer"
        },
        {
          "id": "b",
          "text": "Azure Files"
        },
        {
          "id": "c",
          "text": "Azure Table storage"
        },
        {
          "id": "d",
          "text": "Azure DNS"
        }
      ],
      "correct": "a",
      "explanation": "Azure Data Explorer (the standalone Azure service behind Fabric's Eventhouse/KQL databases) is optimized for ingesting, storing, and querying high-velocity time-series and event data using KQL."
    },
    {
      "id": "dp900-51",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Power BI visualization type is best suited for showing a single important metric at a glance, such as total revenue for the current month?",
      "options": [
        {
          "id": "a",
          "text": "A card (KPI) visual"
        },
        {
          "id": "b",
          "text": "A scatter plot"
        },
        {
          "id": "c",
          "text": "A line chart"
        },
        {
          "id": "d",
          "text": "A matrix with many columns"
        }
      ],
      "correct": "a",
      "explanation": "A card (or KPI) visual displays a single important number prominently, ideal for at-a-glance metrics like total revenue, without the complexity of a chart."
    },
	
	// DP-900 — 20 new questions (dp900-53 through dp900-72)
// Paste this block into src/lib/questionBank/dp900.js
// Insert it right BEFORE the closing "  ]\n};" at the end of the file
// (i.e., right after the dp900-52 question object, adding a comma after that object's closing "}")

    {
      "id": "dp900-53",
      "domain": "Describe core data concepts",
      "question": "A retailer stores sales transactions in rigid tables with predefined columns, customer emails as free-form text logs, and product photos as image files. Which term correctly groups these three by data type?",
      "options": [
        { "id": "a", "text": "Structured (transactions), unstructured (logs and images)" },
        { "id": "b", "text": "All three are structured data" },
        { "id": "c", "text": "All three are semi-structured data" },
        { "id": "d", "text": "Structured (transactions), semi-structured (logs), structured (images)" }
      ],
      "correct": "a",
      "explanation": "Structured data fits a fixed schema (rows/columns), like the sales transactions. Free-form text and image files don't follow a fixed schema and are classified as unstructured data."
    },
    {
      "id": "dp900-54",
      "domain": "Describe core data concepts",
      "question": "A banking system needs to process thousands of individual account transactions per second with immediate consistency for balance checks. Which type of workload is this?",
      "options": [
        { "id": "a", "text": "Online transaction processing (OLTP)" },
        { "id": "b", "text": "Online analytical processing (OLAP)" },
        { "id": "c", "text": "Batch reporting" },
        { "id": "d", "text": "Data archiving" }
      ],
      "correct": "a",
      "explanation": "OLTP workloads handle high volumes of short, frequent read/write transactions that must be processed quickly and consistently, such as banking transactions."
    },
    {
      "id": "dp900-55",
      "domain": "Describe core data concepts",
      "question": "Which data professional role is primarily responsible for designing and building pipelines that move and transform data from source systems into a form ready for analysis?",
      "options": [
        { "id": "a", "text": "Data engineer" },
        { "id": "b", "text": "Database administrator" },
        { "id": "c", "text": "Data analyst" },
        { "id": "d", "text": "Data scientist" }
      ],
      "correct": "a",
      "explanation": "Data engineers build and maintain the data pipelines and infrastructure that ingest, transform, and prepare data, distinct from DBAs (who manage database systems) and analysts (who interpret data)."
    },
    {
      "id": "dp900-56",
      "domain": "Describe core data concepts",
      "question": "A system processes sensor readings the instant they arrive so a dashboard can show near real-time equipment status, rather than waiting to process readings in scheduled groups. Which processing approach is this?",
      "options": [
        { "id": "a", "text": "Streaming (real-time) processing" },
        { "id": "b", "text": "Batch processing" },
        { "id": "c", "text": "Extract, load, transform (ELT) on a nightly schedule" },
        { "id": "d", "text": "Offline archival processing" }
      ],
      "correct": "a",
      "explanation": "Streaming processing handles data continuously as it arrives, enabling near real-time insights, in contrast to batch processing which groups and processes data at scheduled intervals."
    },
    {
      "id": "dp900-57",
      "domain": "Describe core data concepts",
      "question": "For a large analytical table that is frequently queried by aggregating just a few columns (e.g., summing sales by region), which file storage format is generally most efficient?",
      "options": [
        { "id": "a", "text": "A columnar format such as Parquet" },
        { "id": "b", "text": "A row-based format such as CSV" },
        { "id": "c", "text": "A binary image format" },
        { "id": "d", "text": "An XML document" }
      ],
      "correct": "a",
      "explanation": "Columnar formats like Parquet store data column-by-column, letting analytical queries read only the columns they need, which is far more efficient than row-based formats for aggregation-heavy workloads."
    },
    {
      "id": "dp900-58",
      "domain": "Identify considerations for relational data on Azure",
      "question": "In a relational database, which type of key uniquely identifies each row in a table and cannot contain NULL values?",
      "options": [
        { "id": "a", "text": "Primary key" },
        { "id": "b", "text": "Foreign key" },
        { "id": "c", "text": "Composite index" },
        { "id": "d", "text": "Candidate column" }
      ],
      "correct": "a",
      "explanation": "A primary key uniquely identifies each row in a table and, by definition, must always contain a value (never NULL)."
    },
    {
      "id": "dp900-59",
      "domain": "Identify considerations for relational data on Azure",
      "question": "A database designer splits a large, redundant Customers table into separate Customers and Addresses tables linked by a key, to reduce duplicate data. What is this process called?",
      "options": [
        { "id": "a", "text": "Normalization" },
        { "id": "b", "text": "Denormalization" },
        { "id": "c", "text": "Sharding" },
        { "id": "d", "text": "Indexing" }
      ],
      "correct": "a",
      "explanation": "Normalization organizes data into related tables to reduce redundancy and improve data integrity, typically by splitting data based on functional dependencies."
    },
    {
      "id": "dp900-60",
      "domain": "Identify considerations for relational data on Azure",
      "question": "Which category of T-SQL statements is used to define and modify the structure of database objects, such as CREATE TABLE and ALTER TABLE?",
      "options": [
        { "id": "a", "text": "Data Definition Language (DDL)" },
        { "id": "b", "text": "Data Manipulation Language (DML)" },
        { "id": "c", "text": "Data Control Language (DCL)" },
        { "id": "d", "text": "Transaction Control Language (TCL)" }
      ],
      "correct": "a",
      "explanation": "DDL statements (CREATE, ALTER, DROP) define and modify database object structure, while DML statements (SELECT, INSERT, UPDATE, DELETE) manipulate the data itself."
    },
    {
      "id": "dp900-61",
      "domain": "Identify considerations for relational data on Azure",
      "question": "A company wants a single, fully isolated Azure SQL database with its own dedicated resources and predictable performance for one specific application. Which deployment option best fits?",
      "options": [
        { "id": "a", "text": "A single database in Azure SQL Database" },
        { "id": "b", "text": "An elastic pool" },
        { "id": "c", "text": "Azure SQL Managed Instance" },
        { "id": "d", "text": "SQL Server on an Azure VM" }
      ],
      "correct": "a",
      "explanation": "A single database provides isolated compute and storage resources for one workload, which is appropriate when you don't need to share resources across multiple databases (as an elastic pool would allow)."
    },
    {
      "id": "dp900-62",
      "domain": "Identify considerations for relational data on Azure",
      "question": "A workload has highly unpredictable, intermittent usage and the team wants Azure SQL Database to automatically pause and resume compute to save cost during idle periods. Which compute tier should they choose?",
      "options": [
        { "id": "a", "text": "Serverless compute tier" },
        { "id": "b", "text": "Provisioned compute tier" },
        { "id": "c", "text": "Business Critical service tier" },
        { "id": "d", "text": "Hyperscale with fixed vCores" }
      ],
      "correct": "a",
      "explanation": "The serverless compute tier automatically scales compute based on workload demand and can pause during inactive periods, billing only for compute used — ideal for intermittent, unpredictable workloads."
    },
    {
      "id": "dp900-63",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "A team is migrating a MongoDB application and wants to keep using existing MongoDB drivers and tools while running on a fully managed Azure service. Which Azure Cosmos DB API should they use?",
      "options": [
        { "id": "a", "text": "The API for MongoDB" },
        { "id": "b", "text": "The Core (SQL) API" },
        { "id": "c", "text": "The API for Table" },
        { "id": "d", "text": "The API for Cassandra" }
      ],
      "correct": "a",
      "explanation": "Azure Cosmos DB's API for MongoDB implements the MongoDB wire protocol, letting existing MongoDB drivers, SDKs, and tools work with minimal changes while data is stored in Cosmos DB."
    },
    {
      "id": "dp900-64",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "An application needs extremely fast lookups of user session data by a single unique session ID, with no need for complex queries across other fields. Which NoSQL data model is best suited?",
      "options": [
        { "id": "a", "text": "Key-value store" },
        { "id": "b", "text": "Graph database" },
        { "id": "c", "text": "Columnar database" },
        { "id": "d", "text": "Relational database" }
      ],
      "correct": "a",
      "explanation": "Key-value stores are optimized for simple, extremely fast lookups by a unique key, making them ideal for use cases like session state or caching where queries are always by a single known key."
    },
    {
      "id": "dp900-65",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "A content management system stores articles where each item can have a different, flexible set of fields (some have images, some have videos, some have neither), all serialized as JSON. Which data store type fits best?",
      "options": [
        { "id": "a", "text": "Document database" },
        { "id": "b", "text": "Relational database with a fixed schema" },
        { "id": "c", "text": "Block blob storage without indexing" },
        { "id": "d", "text": "Graph database" }
      ],
      "correct": "a",
      "explanation": "Document databases store semi-structured data (commonly JSON) where each document's schema can vary, making them well suited to content with flexible, evolving fields."
    },
    {
      "id": "dp900-66",
      "domain": "Describe considerations for working with non-relational data on Azure",
      "question": "Which Azure storage service is purpose-built for storing large amounts of simple, schemaless key-attribute data (like NoSQL rows) at low cost, distinct from storing files or unstructured blobs?",
      "options": [
        { "id": "a", "text": "Azure Table Storage" },
        { "id": "b", "text": "Azure Blob Storage" },
        { "id": "c", "text": "Azure Files" },
        { "id": "d", "text": "Azure Disk Storage" }
      ],
      "correct": "a",
      "explanation": "Azure Table Storage is a low-cost NoSQL key-value store for structured, schemaless data, whereas Blob Storage is designed for unstructured binary objects like documents, images, and videos."
    },
    {
      "id": "dp900-67",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Azure service brings together big data exploration, data warehousing, and data integration into a single unified analytics platform?",
      "options": [
        { "id": "a", "text": "Azure Synapse Analytics" },
        { "id": "b", "text": "Azure SQL Database" },
        { "id": "c", "text": "Azure Table Storage" },
        { "id": "d", "text": "Azure Cosmos DB" }
      ],
      "correct": "a",
      "explanation": "Azure Synapse Analytics combines data warehousing, big data analytics (via Spark), and data integration pipelines into one unified analytics service."
    },
    {
      "id": "dp900-68",
      "domain": "Describe an analytics workload on Azure",
      "question": "An organization stores massive amounts of raw data in its native format at low cost, planning to define structure only when the data is later read for analysis. Which storage concept does this describe?",
      "options": [
        { "id": "a", "text": "A data lake" },
        { "id": "b", "text": "A data warehouse" },
        { "id": "c", "text": "A relational OLTP database" },
        { "id": "d", "text": "An in-memory cache" }
      ],
      "correct": "a",
      "explanation": "A data lake stores large volumes of raw data in its native format, applying schema only at read time (schema-on-read), unlike a data warehouse which enforces a defined schema upfront."
    },
    {
      "id": "dp900-69",
      "domain": "Describe an analytics workload on Azure",
      "question": "A team loads raw data into a cloud data platform first, then uses the platform's own compute engine to transform it into a clean, query-ready form. Which pattern does this describe, as opposed to transforming data before loading it?",
      "options": [
        { "id": "a", "text": "Extract, Load, Transform (ELT)" },
        { "id": "b", "text": "Extract, Transform, Load (ETL)" },
        { "id": "c", "text": "Online transaction processing" },
        { "id": "d", "text": "Data replication" }
      ],
      "correct": "a",
      "explanation": "ELT loads raw data into the target platform first and transforms it there using the platform's compute power, whereas ETL transforms data before loading it into the destination."
    },
    {
      "id": "dp900-70",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which Azure service is primarily used to visually design and orchestrate data pipelines that move and transform data between various sources on a schedule?",
      "options": [
        { "id": "a", "text": "Azure Data Factory" },
        { "id": "b", "text": "Power BI" },
        { "id": "c", "text": "Azure Table Storage" },
        { "id": "d", "text": "Azure SQL Database" }
      ],
      "correct": "a",
      "explanation": "Azure Data Factory is a cloud-based data integration service used to create, schedule, and orchestrate ETL/ELT pipelines that move and transform data across sources."
    },
    {
      "id": "dp900-71",
      "domain": "Describe an analytics workload on Azure",
      "question": "In a data warehouse designed with a star schema, what role do dimension tables play?",
      "options": [
        { "id": "a", "text": "They provide descriptive attributes (like product name or region) used to filter and group the numeric data in fact tables" },
        { "id": "b", "text": "They store only numeric measures such as sales totals" },
        { "id": "c", "text": "They enforce transactional consistency for OLTP writes" },
        { "id": "d", "text": "They replace the need for a fact table entirely" }
      ],
      "correct": "a",
      "explanation": "In a star schema, dimension tables hold descriptive attributes (who, what, where, when) that surround a central fact table, which stores the numeric measures being analyzed, such as sales amounts."
    },
    {
      "id": "dp900-72",
      "domain": "Describe an analytics workload on Azure",
      "question": "Which tool is most commonly used at the end of an analytics workload to create interactive reports and dashboards for business users?",
      "options": [
        { "id": "a", "text": "Power BI" },
        { "id": "b", "text": "Azure Data Factory" },
        { "id": "c", "text": "Azure Table Storage" },
        { "id": "d", "text": "Azure Resource Manager" }
      ],
      "correct": "a",
      "explanation": "Power BI is the business intelligence tool used to build interactive visualizations, reports, and dashboards that let business users explore and consume the results of an analytics workload."
    }
	,
    {
      "id": "dp900-52",
      "domain": "Describe core data concepts",
      "question": "A company wants to store product catalog data with a fixed set of fields (SKU, name, price, category) that rarely change and must support complex multi-table joins for reporting. Which data representation and store type fit best?",
      "options": [
        {
          "id": "a",
          "text": "Structured data in a relational database"
        },
        {
          "id": "b",
          "text": "Unstructured data in Blob storage"
        },
        {
          "id": "c",
          "text": "Semi-structured JSON with no fixed schema"
        },
        {
          "id": "d",
          "text": "Streaming event data in an Eventhouse"
        }
      ],
      "correct": "a",
      "explanation": "A fixed schema with complex multi-table join requirements is the classic use case for structured data in a relational database, which is purpose-built for exactly this kind of querying."
    }
  ]
};
