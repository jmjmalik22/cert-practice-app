export const AI_200 = {
  label: "Azure AI Cloud Developer Associate",
  questions: [
    {
      id: "ai200-001",
      domain: "Develop containerized solutions on Azure",
      question:
        "Your team builds a new container image on every merge to main and needs a private, versioned place to store and manage those images before deployment. What should you use?",
      options: [
        { id: "a", text: "Azure Container Registry" },
        { id: "b", text: "A public Docker Hub repository with no access control" },
        { id: "c", text: "Azure Blob Storage with images stored as .zip files" },
        { id: "d", text: "Email attachments shared between team members" },
      ],
      correct: "a",
      explanation:
        "Azure Container Registry is the private, versioned registry built for storing, tagging, and managing container images — a public registry, blob storage, or email doesn't give you access control or proper image versioning.",
    },
    {
      id: "ai200-002",
      domain: "Develop containerized solutions on Azure",
      question:
        "You want a new container image to be built and pushed to your registry automatically whenever source code changes, without a separate CI server. What should you use?",
      options: [
        { id: "a", text: "Azure Container Registry Tasks" },
        { id: "b", text: "Manually running docker build on a developer's laptop for every change" },
        { id: "c", text: "A cron job that does nothing but restart existing containers" },
        { id: "d", text: "Azure Key Vault" },
      ],
      correct: "a",
      explanation:
        "ACR Tasks can automate building and pushing images in response to source changes directly within the registry service, unlike manual local builds or unrelated services like Key Vault.",
    },
    {
      id: "ai200-003",
      domain: "Develop containerized solutions on Azure",
      question:
        "You're deploying a containerized web API to Azure App Service and need to supply a database connection string as a secret without baking it into the image. What should you do?",
      options: [
        { id: "a", text: "Hardcode the connection string in the Dockerfile" },
        { id: "b", text: "Configure App Service application settings/environment variables (backed by Key Vault references) for the container" },
        { id: "c", text: "Store the connection string in a public GitHub repo" },
        { id: "d", text: "Email the connection string to the deployment engineer each release" },
      ],
      correct: "b",
      explanation:
        "App Service lets you supply environment variables/app settings to a deployed container, which can reference Key Vault secrets — baking secrets into the image or sharing them insecurely both violate secret-handling practices.",
    },
    {
      id: "ai200-004",
      domain: "Develop containerized solutions on Azure",
      question:
        "You need to roll out a new revision of a Container Apps deployment while gradually shifting traffic from the old revision to the new one. What capability should you use?",
      options: [
        { id: "a", text: "Container Apps revision management with traffic splitting" },
        { id: "b", text: "Deleting the old revision immediately with no transition" },
        { id: "c", text: "Manually editing DNS records for each user" },
        { id: "d", text: "Redeploying to a completely separate, unrelated Azure subscription" },
      ],
      correct: "a",
      explanation:
        "Container Apps revision management supports keeping multiple revisions active and splitting traffic between them, enabling a gradual rollout — deleting the old revision immediately removes the ability to shift traffic gradually.",
    },
    {
      id: "ai200-005",
      domain: "Develop containerized solutions on Azure",
      question:
        "Several internal microservices need to call each other within a Container Apps environment, but none should be reachable from the public internet. What should you configure?",
      options: [
        { id: "a", text: "A Container Apps environment with internal-only ingress for those apps" },
        { id: "b", text: "Public ingress on every app with no restrictions" },
        { id: "c", text: "A single monolithic container combining all microservices" },
        { id: "d", text: "Disabling ingress entirely so nothing can call the apps" },
      ],
      correct: "a",
      explanation:
        "Configuring the Container Apps environment/ingress as internal-only allows the microservices to reach each other while blocking public internet access — public ingress does the opposite, and disabling ingress entirely would break internal calls too.",
    },
    {
      id: "ai200-006",
      domain: "Develop containerized solutions on Azure",
      question:
        "A Container Apps workload should scale down to zero instances when its Service Bus queue is empty, and scale out as messages arrive. What should you implement?",
      options: [
        { id: "a", text: "Event-driven scaling using KEDA with a Service Bus queue-length scaler" },
        { id: "b", text: "A fixed number of replicas that never changes" },
        { id: "c", text: "Manual scaling performed by an operator checking the queue every hour" },
        { id: "d", text: "Disabling autoscaling entirely" },
      ],
      correct: "a",
      explanation:
        "KEDA event-driven autoscaling in Container Apps can scale based on a queue-length trigger, including scaling to zero when the queue is empty, which fixed replica counts or manual checks can't do responsively.",
    },
    {
      id: "ai200-007",
      domain: "Develop containerized solutions on Azure",
      question:
        "Which KEDA concept do you configure to tell Container Apps which external metric (such as a queue's message count) should drive scaling decisions?",
      options: [
        { id: "a", text: "A KEDA scaler bound to the relevant metric source" },
        { id: "b", text: "The container's Dockerfile" },
        { id: "c", text: "The App Service plan tier" },
        { id: "d", text: "A static replica count in the deployment manifest" },
      ],
      correct: "a",
      explanation:
        "A KEDA scaler is the component that connects an external metric source, like a queue's message count, to the scaling decision — Dockerfiles, App Service plans, and static replica counts don't provide that event-driven trigger.",
    },
    {
      id: "ai200-008",
      domain: "Develop containerized solutions on Azure",
      question:
        "You need to deploy a multi-container application to Azure Kubernetes Service, specifying replica counts, resource limits, and a rolling update strategy. What should you use?",
      options: [
        { id: "a", text: "Kubernetes manifest files applied to the AKS cluster" },
        { id: "b", text: "A single shell script that runs docker run commands with no orchestration" },
        { id: "c", text: "Manually creating each pod through a GUI with no reusable definition" },
        { id: "d", text: "Azure Key Vault access policies" },
      ],
      correct: "a",
      explanation:
        "Kubernetes manifest files (Deployments, Services, etc.) declaratively define replica counts, resource limits, and update strategy for AKS — ad hoc scripts, manual pod creation, or Key Vault policies don't provide that.",
    },
    {
      id: "ai200-009",
      domain: "Develop containerized solutions on Azure",
      question:
        "After applying a manifest update to AKS, you want new pods to roll out gradually while old pods keep serving traffic until the new ones are healthy. What manifest setting controls this?",
      options: [
        { id: "a", text: "The Deployment's rolling update strategy (maxSurge/maxUnavailable)" },
        { id: "b", text: "The container image's file size" },
        { id: "c", text: "The cluster's Azure region" },
        { id: "d", text: "The App Service plan SKU" },
      ],
      correct: "a",
      explanation:
        "The rolling update strategy fields on a Deployment control how many new pods can be added and how many old ones can be unavailable during the rollout — image size, region, and App Service plan SKU have nothing to do with pod rollout behavior.",
    },
    {
      id: "ai200-010",
      domain: "Develop containerized solutions on Azure",
      question:
        "A pod on AKS keeps restarting with a CrashLoopBackOff status, and you need to find out why. What should you inspect first?",
      options: [
        { id: "a", text: "The pod's logs and recent Kubernetes events" },
        { id: "b", text: "The Azure subscription's billing invoice" },
        { id: "c", text: "The container registry's total storage usage" },
        { id: "d", text: "The App Service plan quota" },
      ],
      correct: "a",
      explanation:
        "Pod logs and Kubernetes events reveal why a container is crashing (e.g., an unhandled startup error), which billing, registry storage, or App Service quotas won't show you.",
    },
    {
      id: "ai200-011",
      domain: "Develop containerized solutions on Azure",
      question:
        "Two services deployed to the same Container Apps environment can't reach each other, and you need to determine whether it's a networking or app-level issue. What should you check?",
      options: [
        { id: "a", text: "End-to-end connectivity, ingress configuration, and logs/events for both apps" },
        { id: "b", text: "Only the container image's build date" },
        { id: "c", text: "The Azure Container Registry's retention policy" },
        { id: "d", text: "The App Service custom domain settings, which don't apply to Container Apps" },
      ],
      correct: "a",
      explanation:
        "Checking end-to-end connectivity along with ingress settings and logs/events for both apps is the systematic way to isolate whether the issue is networking or app-level — build dates, registry retention, and unrelated App Service settings don't diagnose connectivity.",
    },
    {
      id: "ai200-012",
      domain: "Develop containerized solutions on Azure",
      question:
        "Security review requires that container images be scanned for known vulnerabilities before deployment, with private access control. Which service best supports this?",
      options: [
        { id: "a", text: "Azure Container Registry, with vulnerability scanning enabled" },
        { id: "b", text: "A public, unauthenticated image registry" },
        { id: "c", text: "Storing images as plain files in a public storage container" },
        { id: "d", text: "Skipping scanning to speed up deployments" },
      ],
      correct: "a",
      explanation:
        "Azure Container Registry supports private access control and integrates with vulnerability scanning, meeting both requirements — a public registry or plain public storage would fail the private-access requirement, and skipping scanning ignores the security requirement entirely.",
    },
    {
      id: "ai200-013",
      domain: "Develop containerized solutions on Azure",
      question:
        "A team wants to run containerized workloads without provisioning or managing any Kubernetes nodes themselves, while still getting environment-scoped configuration and revision-based deployments. What should they choose?",
      options: [
        { id: "a", text: "Azure Container Apps" },
        { id: "b", text: "A self-managed AKS cluster with manually patched nodes" },
        { id: "c", text: "Physical on-premises servers" },
        { id: "d", text: "A single virtual machine running Docker with no orchestration" },
      ],
      correct: "a",
      explanation:
        "Container Apps provides a serverless container platform with environment configuration and revisions without requiring the team to manage Kubernetes nodes, unlike a self-managed AKS cluster or unmanaged VMs.",
    },
    {
      id: "ai200-014",
      domain: "Develop containerized solutions on Azure",
      question:
        "Which hosting choice requires you to author and apply Kubernetes manifest files directly to manage deployments, as opposed to a higher-level, revision-based deployment model?",
      options: [
        { id: "a", text: "Azure Kubernetes Service (AKS)" },
        { id: "b", text: "Azure Container Apps' built-in revision management" },
        { id: "c", text: "Azure App Configuration" },
        { id: "d", text: "Azure Key Vault" },
      ],
      correct: "a",
      explanation:
        "AKS deployments are managed through Kubernetes manifest files, while Container Apps offers a higher-level revision-based model — App Configuration and Key Vault are unrelated to container deployment mechanics.",
    },
    {
      id: "ai200-015",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your application needs to connect to Azure Cosmos DB for NoSQL and run queries against a container of documents. What should you use?",
      options: [
        { id: "a", text: "The Cosmos DB SDK for your application's language" },
        { id: "b", text: "Raw file system access to the underlying storage disks" },
        { id: "c", text: "A generic ODBC driver with no Cosmos DB support" },
        { id: "d", text: "Direct SSH access to the Cosmos DB service host" },
      ],
      correct: "a",
      explanation:
        "The Cosmos DB SDK provides the supported, authenticated way to connect and run queries against Cosmos DB — there's no direct disk, generic ODBC, or SSH access to the managed service.",
    },
    {
      id: "ai200-016",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "A Cosmos DB container is consuming far more Request Units than expected for queries that only ever filter on one property. What should you do to reduce RU consumption?",
      options: [
        { id: "a", text: "Tune the indexing policy to exclude paths that aren't queried, rather than indexing everything by default" },
        { id: "b", text: "Increase the number of unrelated properties indexed" },
        { id: "c", text: "Switch to a weaker consistency level with no regard for read correctness" },
        { id: "d", text: "Delete the container and recreate it with no data" },
      ],
      correct: "a",
      explanation:
        "Tuning the indexing policy to exclude unqueried paths reduces the indexing (and RU) overhead for writes and queries — indexing more unrelated properties would make RU consumption worse, not better.",
    },
    {
      id: "ai200-017",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your app must always read its own most recent write from Cosmos DB, but doesn't need every other client to see writes in strict global order, and you want to keep RU cost reasonable. Which consistency level fits best?",
      options: [
        { id: "a", text: "Session consistency" },
        { id: "b", text: "No consistency guarantee at all" },
        { id: "c", text: "A consistency level that only applies to Blob Storage, not Cosmos DB" },
        { id: "d", text: "Manually re-reading data from a backup file after every write" },
      ],
      correct: "a",
      explanation:
        "Session consistency guarantees a client reads its own writes at a lower cost than strong consistency, matching the described requirement — 'no guarantee' and unrelated or manual workarounds don't provide read-your-writes behavior.",
    },
    {
      id: "ai200-018",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "You want to store document embeddings in Cosmos DB and run similarity search over them for a RAG scenario. What should you use?",
      options: [
        { id: "a", text: "Cosmos DB's vector storage and vector similarity search capability" },
        { id: "b", text: "Storing the embeddings as plain text in a blob with no indexing" },
        { id: "c", text: "A relational join across unrelated tables with no vector support" },
        { id: "d", text: "Encoding the embeddings into the document's partition key" },
      ],
      correct: "a",
      explanation:
        "Cosmos DB's vector storage and similarity search capability is built for storing embeddings and performing vector similarity search, which unindexed blobs, unrelated joins, or misusing the partition key cannot efficiently support.",
    },
    {
      id: "ai200-019",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "You need your application to be notified and react whenever items in a Cosmos DB container are created or updated, without polling the container repeatedly. What should you implement?",
      options: [
        { id: "a", text: "A change feed processor" },
        { id: "b", text: "A scheduled job that re-reads the entire container every minute" },
        { id: "c", text: "Manually asking users to report when they've made a change" },
        { id: "d", text: "Deleting and recreating the container after every update" },
      ],
      correct: "a",
      explanation:
        "A change feed processor delivers a stream of inserted/updated items so your application can react without polling — a scheduled full re-read is inefficient and doesn't match the 'without polling' requirement.",
    },
    {
      id: "ai200-020",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Query costs spike whenever a query has to fan out across many partitions to find matching data. What design change reduces this?",
      options: [
        { id: "a", text: "Choose a partition key that aligns with your most common query patterns" },
        { id: "b", text: "Use a single partition key value for every single item in the container" },
        { id: "c", text: "Add more unrelated indexes to every property" },
        { id: "d", text: "Switch to a weaker consistency level, which has no effect on partition fan-out" },
      ],
      correct: "a",
      explanation:
        "Aligning the partition key with common query filters lets queries target fewer partitions, reducing RU cost from cross-partition fan-out — a single shared partition key value creates a hot partition instead, and consistency level doesn't affect fan-out.",
    },
    {
      id: "ai200-021",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your application needs to connect to Azure Database for PostgreSQL and execute parameterized queries from your backend code. What should you use?",
      options: [
        { id: "a", text: "A PostgreSQL client SDK/driver for your application's language" },
        { id: "b", text: "Direct file access to the database's storage volume" },
        { id: "c", text: "An unrelated NoSQL SDK with no PostgreSQL support" },
        { id: "d", text: "Manually typing SQL into the Azure portal for every request" },
      ],
      correct: "a",
      explanation:
        "A PostgreSQL SDK/driver is the supported way to connect and run parameterized queries from application code — there's no supported direct storage access, and an unrelated SDK or manual portal queries don't serve a running application.",
    },
    {
      id: "ai200-022",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "You're designing a table in PostgreSQL to store document embeddings for similarity search. Which extension and data type should the schema use?",
      options: [
        { id: "a", text: "The pgvector extension with a vector column type" },
        { id: "b", text: "A plain text column with embeddings stored as comma-separated strings" },
        { id: "c", text: "A boolean column, since embeddings are true/false values" },
        { id: "d", text: "No column at all — store embeddings only in application memory" },
      ],
      correct: "a",
      explanation:
        "The pgvector extension adds a proper vector data type designed for storing and searching embeddings efficiently — storing them as plain text or booleans loses the structure similarity search depends on, and in-memory-only storage doesn't persist them.",
    },
    {
      id: "ai200-023",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Vector similarity queries against a large pgvector table are slow. What should you add to speed up retrieval?",
      options: [
        { id: "a", text: "An approximate nearest-neighbor index on the vector column (such as HNSW or IVFFlat)" },
        { id: "b", text: "A full table scan forced on every query" },
        { id: "c", text: "Removing all indexes from the table" },
        { id: "d", text: "Converting the vector column to plain text" },
      ],
      correct: "a",
      explanation:
        "An approximate nearest-neighbor index like HNSW or IVFFlat is specifically designed to speed up vector similarity search at scale — forcing full scans or removing indexes would make queries slower, not faster.",
    },
    {
      id: "ai200-024",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your pgvector index is accurate but consuming more compute than your budget allows during searches. What should you tune to reduce compute overhead, accepting a small accuracy trade-off?",
      options: [
        { id: "a", text: "The index's search parameters (such as candidate list size), trading some recall for lower compute cost" },
        { id: "b", text: "The number of rows in an unrelated table" },
        { id: "c", text: "The PostgreSQL server's time zone setting" },
        { id: "d", text: "The name of the database" },
      ],
      correct: "a",
      explanation:
        "Approximate vector index parameters can be tuned to reduce compute overhead at the cost of some recall, directly addressing the cost/accuracy trade-off — an unrelated table, time zone, or database name have no effect on vector search compute.",
    },
    {
      id: "ai200-025",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your PostgreSQL vector workload is CPU- and memory-bound during peak search traffic. What should you adjust?",
      options: [
        { id: "a", text: "The server's compute, memory, and storage configuration to match the vector workload's demands" },
        { id: "b", text: "Only the database's display language setting" },
        { id: "c", text: "The client application's font size" },
        { id: "d", text: "Nothing — vector workloads never need more resources" },
      ],
      correct: "a",
      explanation:
        "Sizing compute, memory, and storage to the actual vector workload demand directly addresses a CPU/memory-bound server — display language and client font size are irrelevant to database performance.",
    },
    {
      id: "ai200-026",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "For a RAG pattern, you need to retrieve only documents belonging to a specific customer before running vector similarity search over them. What should you implement?",
      options: [
        { id: "a", text: "Vector similarity search combined with a metadata filter (such as customer ID)" },
        { id: "b", text: "Vector similarity search over the entire table with no filter, then discard irrelevant results after the fact" },
        { id: "c", text: "A separate database per customer with no shared query capability" },
        { id: "d", text: "Disabling vector search and using only keyword search" },
      ],
      correct: "a",
      explanation:
        "Combining similarity search with a metadata filter narrows the search to the right customer's documents up front, which is both more accurate and efficient than searching everything and filtering afterward.",
    },
    {
      id: "ai200-027",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your app opens a new database connection for every request, and PostgreSQL connection overhead is becoming a bottleneck under load. What should you implement?",
      options: [
        { id: "a", text: "Connection pooling to reuse connections and reduce per-request overhead" },
        { id: "b", text: "Opening even more new connections per request" },
        { id: "c", text: "Removing all authentication on the database" },
        { id: "d", text: "Switching to a database with no networking at all" },
      ],
      correct: "a",
      explanation:
        "Connection pooling reuses existing connections instead of paying the setup cost per request, directly reducing overhead and improving throughput/latency — opening more raw connections makes the bottleneck worse.",
    },
    {
      id: "ai200-028",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "When designing a PostgreSQL table that stores both structured order fields and embeddings for semantic search, what should guide your column data type choices?",
      options: [
        { id: "a", text: "Using appropriate native types for structured fields (e.g., integer, timestamp) and a vector type for embeddings" },
        { id: "b", text: "Storing every field, including numbers and embeddings, as free-form text" },
        { id: "c", text: "Storing the entire row as a single binary blob with no schema" },
        { id: "d", text: "Randomly choosing data types without regard to the field's purpose" },
      ],
      correct: "a",
      explanation:
        "Using native types for structured data and a dedicated vector type for embeddings keeps queries efficient and correct — storing everything as text or an opaque blob loses type safety, indexing, and search capability.",
    },
    {
      id: "ai200-029",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Your app repeatedly looks up the same reference data (e.g., product metadata) from a database on every request, adding unnecessary latency. What should you implement?",
      options: [
        { id: "a", text: "Caching the data in Azure Managed Redis with an appropriate expiration policy" },
        { id: "b", text: "Querying the database twice per request instead of once" },
        { id: "c", text: "Storing the data only in the client browser with no server-side access" },
        { id: "d", text: "Disabling the database connection entirely" },
      ],
      correct: "a",
      explanation:
        "Caching frequently accessed, rarely changing data in Managed Redis with an expiration policy cuts repeated database round-trips and latency — querying twice per request or removing the database connection doesn't solve the latency problem.",
    },
    {
      id: "ai200-030",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "Cached data in Redis must be automatically invalidated whenever the underlying record is updated, so users never see stale results. What should you implement?",
      options: [
        { id: "a", text: "A cache invalidation strategy that removes or updates the cached entry when the source record changes" },
        { id: "b", text: "A cache with no expiration and no invalidation, ever" },
        { id: "c", text: "Clearing the entire cache once a year regardless of updates" },
        { id: "d", text: "Ignoring cache staleness since users won't notice" },
      ],
      correct: "a",
      explanation:
        "An invalidation strategy tied to the source data's update events keeps the cache in sync — never expiring or invalidating (or only doing so once a year) would leave stale data served to users.",
    },
    {
      id: "ai200-031",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "You want to run low-latency similarity search over embeddings that are already cached in Azure Managed Redis, without a round-trip to a separate vector database. What should you configure?",
      options: [
        { id: "a", text: "Vector indexing within Azure Managed Redis" },
        { id: "b", text: "A plain string cache with no indexing at all" },
        { id: "c", text: "A relational join across two unrelated Redis instances" },
        { id: "d", text: "Storing vectors as unindexed binary blobs only" },
      ],
      correct: "a",
      explanation:
        "Azure Managed Redis supports vector indexing to enable similarity search directly against cached data, avoiding a round-trip to a separate store — plain unindexed storage can't support efficient similarity search.",
    },
    {
      id: "ai200-032",
      domain: "Develop AI solutions by using Azure data management services",
      question:
        "You need extremely low-latency lookups of a small, frequently accessed set of vectors, while your primary, larger vector corpus lives elsewhere for durability and scale. What role should Managed Redis play?",
      options: [
        { id: "a", text: "A fast caching layer for the hot subset of vectors, backed by the primary store for the full corpus" },
        { id: "b", text: "The sole permanent store for all vectors, with no other database involved" },
        { id: "c", text: "A replacement for all container image storage" },
        { id: "d", text: "A tool with no relevant caching or vector capability" },
      ],
      correct: "a",
      explanation:
        "Using Managed Redis as a fast cache for the hot subset of vectors, while a durable primary store holds the full corpus, gives you low latency without sacrificing durability or scale — making Redis the sole store abandons that durability.",
    },
    {
      id: "ai200-033",
      domain: "Connect to and consume Azure services",
      question:
        "A back-end order-processing operation must be reliably queued and processed even if the consumer is briefly unavailable. What should you use?",
      options: [
        { id: "a", text: "Azure Service Bus queues" },
        { id: "b", text: "A synchronous HTTP call with no retry or queuing" },
        { id: "c", text: "An in-memory list inside a single process" },
        { id: "d", text: "A shared spreadsheet updated manually" },
      ],
      correct: "a",
      explanation:
        "Service Bus queues durably hold messages until a consumer is ready to process them, tolerating consumer downtime — a synchronous call, in-memory list, or manual spreadsheet all lose messages if the consumer or process is unavailable.",
    },
    {
      id: "ai200-034",
      domain: "Connect to and consume Azure services",
      question:
        "A message keeps failing processing after exceeding the maximum delivery count and is clogging the main queue. How should Service Bus handle it?",
      options: [
        { id: "a", text: "Automatically move it to the dead-letter queue for separate inspection" },
        { id: "b", text: "Keep retrying it forever with no limit" },
        { id: "c", text: "Silently delete the message with no record" },
        { id: "d", text: "Crash the entire namespace" },
      ],
      correct: "a",
      explanation:
        "Service Bus's dead-letter queue isolates messages that exceed the max delivery count so they can be inspected separately without blocking the main queue — infinite retries or silent deletion either clog processing or lose visibility into the failure.",
    },
    {
      id: "ai200-035",
      domain: "Connect to and consume Azure services",
      question:
        "An order-placed event needs to be delivered to three independent downstream systems (billing, shipping, and analytics) without the publisher knowing about each subscriber. What should you use?",
      options: [
        { id: "a", text: "A Service Bus topic with a subscription per downstream system" },
        { id: "b", text: "A single queue that only one consumer can read from" },
        { id: "c", text: "Three separate hardcoded HTTP calls from the publisher to each system" },
        { id: "d", text: "A shared database table that each system polls constantly" },
      ],
      correct: "a",
      explanation:
        "Topics with per-consumer subscriptions implement publish/subscribe fan-out, decoupling the publisher from each subscriber — a single queue only delivers to one consumer, and hardcoded calls or constant polling reintroduce tight coupling or inefficiency.",
    },
    {
      id: "ai200-036",
      domain: "Connect to and consume Azure services",
      question:
        "Messages related to the same customer conversation must be processed strictly in order, even under concurrent processing. What Service Bus feature addresses this?",
      options: [
        { id: "a", text: "Message sessions, grouping and ordering related messages" },
        { id: "b", text: "Processing every message from every customer in a single random order" },
        { id: "c", text: "Disabling the queue entirely" },
        { id: "d", text: "A dead-letter queue, which is unrelated to ordering" },
      ],
      correct: "a",
      explanation:
        "Message sessions group related messages so they can be processed in order even with concurrent consumers — random ordering or disabling the queue don't provide the required guarantee, and the dead-letter queue exists for failed messages, not ordering.",
    },
    {
      id: "ai200-037",
      domain: "Connect to and consume Azure services",
      question:
        "You need your application to react automatically whenever a new blob is uploaded to a storage account, without polling the storage account. What should you use?",
      options: [
        { id: "a", text: "Azure Event Grid subscribed to blob-created events" },
        { id: "b", text: "A scheduled job that lists every blob every minute" },
        { id: "c", text: "A person manually checking the storage account" },
        { id: "d", text: "Deleting the storage account so no blobs can be created" },
      ],
      correct: "a",
      explanation:
        "Event Grid delivers events like blob creation as they happen, avoiding polling entirely — a scheduled listing job still polls, and manual checking or deleting the storage account clearly doesn't meet the requirement.",
    },
    {
      id: "ai200-038",
      domain: "Connect to and consume Azure services",
      question:
        "Your Event Grid topic emits many event types, but a specific handler should only receive events about failed deployments in a particular resource group. What should you configure?",
      options: [
        { id: "a", text: "An event subscription filter scoped to that event type and subject" },
        { id: "b", text: "No filter, and have the handler ignore everything else at runtime" },
        { id: "c", text: "A separate Event Grid topic for every possible resource group in the subscription" },
        { id: "d", text: "Disabling the topic so no events are delivered" },
      ],
      correct: "a",
      explanation:
        "Event Grid subscription filters let you scope delivery to specific event types and subjects at the platform level, which is more efficient than delivering everything and filtering in the handler.",
    },
    {
      id: "ai200-039",
      domain: "Connect to and consume Azure services",
      question:
        "Your own application has a domain event (e.g., \"OrderShipped\") that other systems should be able to subscribe to, separate from built-in Azure resource events. What should you do?",
      options: [
        { id: "a", text: "Publish a custom event to an Event Grid custom topic" },
        { id: "b", text: "Wait for Azure to add \"OrderShipped\" as a built-in system event" },
        { id: "c", text: "Only log the event to a file that no other system can access" },
        { id: "d", text: "Send it as an unstructured email to an internal mailing list" },
      ],
      correct: "a",
      explanation:
        "Event Grid custom topics let your application publish its own domain events for other systems to subscribe to, which built-in system events, private log files, or ad hoc email don't provide.",
    },
    {
      id: "ai200-040",
      domain: "Connect to and consume Azure services",
      question:
        "An Event Grid subscriber's endpoint is occasionally unavailable for a few seconds, and you don't want events lost during that window. What should you configure?",
      options: [
        { id: "a", text: "A retry policy (with dead-lettering as a fallback) on the event subscription" },
        { id: "b", text: "Delivering each event exactly once with no retry, ever" },
        { id: "c", text: "Deleting the subscription whenever the endpoint has any downtime" },
        { id: "d", text: "Ignoring delivery failures silently" },
      ],
      correct: "a",
      explanation:
        "A retry policy with dead-lettering as a fallback re-attempts delivery during brief outages and preserves events that ultimately fail, rather than losing them on the first failed attempt.",
    },
    {
      id: "ai200-041",
      domain: "Connect to and consume Azure services",
      question:
        "You need to expose a simple HTTP API endpoint that runs your code on demand, without provisioning or managing any servers. What should you use?",
      options: [
        { id: "a", text: "An Azure Function with an HTTP trigger" },
        { id: "b", text: "A dedicated virtual machine you patch and manage yourself" },
        { id: "c", text: "A static HTML file with no backend logic" },
        { id: "d", text: "A physical on-premises server" },
      ],
      correct: "a",
      explanation:
        "An HTTP-triggered Azure Function gives you a serverless API endpoint without managing servers — a self-managed VM or on-premises server requires exactly the infrastructure management you're trying to avoid, and static HTML can't run backend logic.",
    },
    {
      id: "ai200-042",
      domain: "Connect to and consume Azure services",
      question:
        "Your function needs to write a document to Cosmos DB whenever it runs, but you'd rather not hand-write the SDK connection and query code. What should you use?",
      options: [
        { id: "a", text: "A Cosmos DB output binding on the function" },
        { id: "b", text: "A manual SSH session into the Cosmos DB host" },
        { id: "c", text: "Copy-pasting data by hand into the Azure portal after each run" },
        { id: "d", text: "Ignoring persistence entirely" },
      ],
      correct: "a",
      explanation:
        "An output binding lets the function declaratively write to Cosmos DB without hand-writing SDK boilerplate — there's no SSH access to the managed service, and manual portal entry doesn't scale to automated runs.",
    },
    {
      id: "ai200-043",
      domain: "Connect to and consume Azure services",
      question:
        "You want a function to run automatically whenever a new message lands in a Service Bus queue, without your code polling the queue. What should you configure?",
      options: [
        { id: "a", text: "A Service Bus trigger on the function" },
        { id: "b", text: "A timer trigger that checks the queue every few hours regardless of activity" },
        { id: "c", text: "An HTTP trigger with no connection to Service Bus at all" },
        { id: "d", text: "Disabling the function app" },
      ],
      correct: "a",
      explanation:
        "A Service Bus trigger invokes the function automatically as messages arrive, with no manual polling — a timer trigger still polls on a fixed schedule, and an unrelated HTTP trigger wouldn't react to queue messages at all.",
    },
    {
      id: "ai200-044",
      domain: "Connect to and consume Azure services",
      question:
        "Your function app has bursty, unpredictable traffic and mostly sits idle, so you want to pay primarily for actual execution rather than reserved capacity. Which hosting plan fits best?",
      options: [
        { id: "a", text: "The Consumption hosting plan" },
        { id: "b", text: "A Premium plan sized for peak load at all times" },
        { id: "c", text: "A dedicated, always-on VM regardless of traffic" },
        { id: "d", text: "No hosting plan at all" },
      ],
      correct: "a",
      explanation:
        "The Consumption plan scales automatically and bills primarily for actual execution time, fitting bursty, mostly-idle workloads — a Premium plan sized for peak load or an always-on VM would cost more for capacity that sits unused most of the time.",
    },
    {
      id: "ai200-045",
      domain: "Connect to and consume Azure services",
      question:
        "You want every function app deployment to go through an automated pipeline that runs tests before promoting to production. What should you set up?",
      options: [
        { id: "a", text: "A CI/CD pipeline that builds, tests, and deploys the function app" },
        { id: "b", text: "Manually zipping and uploading the code through the portal every time" },
        { id: "c", text: "Skipping tests to deploy faster" },
        { id: "d", text: "Editing the function code directly in production with no review" },
      ],
      correct: "a",
      explanation:
        "A CI/CD pipeline automates build, test, and deployment so every release is validated before reaching production — manual uploads, skipping tests, or editing production directly all remove that safety net.",
    },
    {
      id: "ai200-046",
      domain: "Connect to and consume Azure services",
      question:
        "During a traffic spike, your Consumption-plan function app needs to add more instances automatically to keep up with incoming requests. What should you expect?",
      options: [
        { id: "a", text: "The Consumption plan scales out instances automatically based on incoming trigger load" },
        { id: "b", text: "The function app stays at exactly one instance no matter the load" },
        { id: "c", text: "You must manually add virtual machines during every spike" },
        { id: "d", text: "Scaling requires redeploying the entire function app" },
      ],
      correct: "a",
      explanation:
        "The Consumption plan is designed to scale instances automatically in response to trigger load, which is exactly the elastic behavior expected — manual VM provisioning or full redeployment isn't how consumption-based scaling works.",
    },
    {
      id: "ai200-047",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "Your application currently stores a database connection string directly in its configuration file, which security flagged in a review. What should you do instead?",
      options: [
        { id: "a", text: "Store the connection string as a secret in Azure Key Vault and retrieve it at runtime" },
        { id: "b", text: "Move the connection string to a different configuration file, still in plain text" },
        { id: "c", text: "Post the connection string in the team's public chat channel for visibility" },
        { id: "d", text: "Encode it in Base64 and leave it in the same file" },
      ],
      correct: "a",
      explanation:
        "Azure Key Vault is built to store and control access to secrets like connection strings, retrieved securely at runtime — moving it to another plain-text file, sharing it publicly, or Base64-encoding it doesn't actually protect the secret.",
    },
    {
      id: "ai200-048",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "Compliance requires that a database credential stored in Key Vault be replaced automatically on a fixed schedule without manual intervention. What should you configure?",
      options: [
        { id: "a", text: "Automatic secret rotation in Key Vault" },
        { id: "b", text: "Manually updating the secret by hand once a year, if remembered" },
        { id: "c", text: "Never rotating the secret" },
        { id: "d", text: "Storing the credential in source control so it's easy to find" },
      ],
      correct: "a",
      explanation:
        "Key Vault's automatic rotation capability replaces the secret on a defined schedule without manual steps — manual, infrequent updates or never rotating fail the compliance requirement, and storing it in source control is a security risk, not a rotation solution.",
    },
    {
      id: "ai200-049",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "Your application needs to read a secret from Key Vault at startup without any credentials stored in its configuration. What should you use?",
      options: [
        { id: "a", text: "A managed identity with an access policy/RBAC role granting it read access to the secret" },
        { id: "b", text: "A hardcoded Key Vault access key embedded in the app" },
        { id: "c", text: "Sharing one developer's personal credentials with the whole team" },
        { id: "d", text: "Disabling authentication on the Key Vault" },
      ],
      correct: "a",
      explanation:
        "A managed identity lets the application authenticate to Key Vault without storing any credential itself, with access scoped by RBAC — a hardcoded key, shared personal credentials, or disabling authentication all reintroduce the exact risk you're trying to avoid.",
    },
    {
      id: "ai200-050",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You accidentally deployed a bad secret value to Key Vault and need to revert the application to the previous known-good value without losing history. What Key Vault capability enables this?",
      options: [
        { id: "a", text: "Secret versioning, letting you reference or restore a prior version" },
        { id: "b", text: "Deleting the vault entirely and starting over" },
        { id: "c", text: "Overwriting the secret with no record of the previous value" },
        { id: "d", text: "Manually asking every team member if they remember the old value" },
      ],
      correct: "a",
      explanation:
        "Key Vault keeps versions of a secret, so you can reference or roll back to a prior version — deleting the vault or overwriting with no history both destroy the very record you need to recover from.",
    },
    {
      id: "ai200-051",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You have a dozen microservices that all need the same set of non-secret configuration values (like feature toggles and endpoint URLs), and updating them individually in each service is error-prone. What should you use?",
      options: [
        { id: "a", text: "Azure App Configuration as a centralized configuration store" },
        { id: "b", text: "Copy-pasting the same values into each service's local config file" },
        { id: "c", text: "Hardcoding the values differently in every service" },
        { id: "d", text: "Storing configuration only in each developer's local environment" },
      ],
      correct: "a",
      explanation:
        "App Configuration centralizes shared settings so all services read from one place, avoiding drift — copying values into each service's config, hardcoding them differently, or keeping them only locally all reintroduce the exact inconsistency problem.",
    },
    {
      id: "ai200-052",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You want to enable a new feature for 10% of users first, then gradually increase, without redeploying the application. What should you use?",
      options: [
        { id: "a", text: "A feature flag managed through Azure App Configuration" },
        { id: "b", text: "A hardcoded if-statement that always enables the feature for everyone" },
        { id: "c", text: "Redeploying the whole application every time the rollout percentage changes" },
        { id: "d", text: "Asking users to manually opt in by editing their own configuration files" },
      ],
      correct: "a",
      explanation:
        "Feature flags in App Configuration let you control rollout percentage dynamically without redeploying — a hardcoded always-on flag or a full redeploy per change don't support gradual, configurable rollout.",
    },
    {
      id: "ai200-053",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "A running service should pick up a configuration change (like an updated timeout value) within moments, without restarting the process. What App Configuration capability supports this?",
      options: [
        { id: "a", text: "Dynamic configuration refresh" },
        { id: "b", text: "Reading configuration only once at process startup, forever" },
        { id: "c", text: "Requiring a full server reboot for every configuration change" },
        { id: "d", text: "Storing the value only in the compiled binary" },
      ],
      correct: "a",
      explanation:
        "Dynamic refresh lets a running app pick up configuration changes without a restart — reading configuration only at startup, requiring a reboot, or compiling the value into the binary all require redeployment to change.",
    },
    {
      id: "ai200-054",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "A single user request flows through three separate microservices, and you need to see the full path it took, in order, across all three. What should you instrument the services with?",
      options: [
        { id: "a", text: "The OpenTelemetry SDK, propagating trace context across service calls" },
        { id: "b", text: "Separate, unrelated log files with no shared identifier" },
        { id: "c", text: "No instrumentation at all" },
        { id: "d", text: "A single print statement in only one of the three services" },
      ],
      correct: "a",
      explanation:
        "OpenTelemetry propagates a shared trace context across service boundaries, letting you reconstruct the full request path — disconnected logs or partial instrumentation in only one service can't reconstruct the cross-service flow.",
    },
    {
      id: "ai200-055",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You need to identify which specific downstream call caused a distributed request to take 4 seconds instead of the usual 200ms. What should you use?",
      options: [
        { id: "a", text: "The distributed trace, correlating spans by trace ID across services" },
        { id: "b", text: "A single aggregate metric showing only the overall average latency" },
        { id: "c", text: "Asking the user what they think went wrong" },
        { id: "d", text: "Guessing based on which service was deployed most recently" },
      ],
      correct: "a",
      explanation:
        "Correlating spans by trace ID across services pinpoints exactly which downstream call added the latency — an aggregate average, user guesses, or assumptions based on recent deployments don't isolate the specific slow span.",
    },
    {
      id: "ai200-056",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You've instrumented your services with OpenTelemetry and now need the resulting traces to be collected and visualized somewhere. What should you configure?",
      options: [
        { id: "a", text: "An exporter sending traces to a monitoring backend such as Azure Monitor/Application Insights" },
        { id: "b", text: "No exporter, and rely only on console output" },
        { id: "c", text: "Deleting traces immediately after they're generated" },
        { id: "d", text: "Storing traces only on a single developer's laptop" },
      ],
      correct: "a",
      explanation:
        "An exporter sends collected traces to a monitoring backend like Application Insights where they can be searched and visualized — console-only output, immediate deletion, or a single laptop don't make traces usable for the whole team.",
    },
    {
      id: "ai200-057",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You want to measure exactly how long a specific internal step (like a cache lookup) takes within a larger traced request, separate from the rest of the request's duration. What should you add?",
      options: [
        { id: "a", text: "A custom span around that specific operation" },
        { id: "b", text: "Nothing — the overall request duration already tells you this" },
        { id: "c", text: "A separate, completely untraced request" },
        { id: "d", text: "A manual stopwatch timed by a person watching the screen" },
      ],
      correct: "a",
      explanation:
        "A custom span records the duration of a specific internal operation within the larger trace, giving you the granularity the overall request duration alone can't provide.",
    },
    {
      id: "ai200-058",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You need to find all error-level log entries from a specific service in the last hour to investigate a reported outage. What should you use?",
      options: [
        { id: "a", text: "A KQL query filtering logs by level and time range" },
        { id: "b", text: "Manually scrolling through raw log files on a server" },
        { id: "c", text: "Asking every team member if they remember seeing an error" },
        { id: "d", text: "Waiting for a customer to report it again in more detail" },
      ],
      correct: "a",
      explanation:
        "A KQL query can filter directly on log level and time range to surface exactly the relevant entries — manually scrolling files or relying on people's memory doesn't scale and is far slower for investigating an outage.",
    },
    {
      id: "ai200-059",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "You want a dashboard showing request count and p95 latency per hour over the past week. What kind of KQL query do you need?",
      options: [
        { id: "a", text: "An aggregation query (e.g., summarize with percentile and bin-by-time functions)" },
        { id: "b", text: "A query that returns every single raw log row with no aggregation" },
        { id: "c", text: "A query that only counts rows in the entire table with no time grouping" },
        { id: "d", text: "No query — dashboards can't be built from logs" },
      ],
      correct: "a",
      explanation:
        "An aggregation query using functions like summarize with percentile and a time bin produces the per-hour count and p95 latency needed for the dashboard — raw rows or a single ungrouped count don't give that time-series breakdown.",
    },
    {
      id: "ai200-060",
      domain: "Secure, monitor, and troubleshoot Azure solutions",
      question:
        "A function invocation failed, and you suspect it's because a downstream dependency call also failed around the same time. How should you confirm this in KQL?",
      options: [
        { id: "a", text: "Join the function invocation table with the dependency table on a shared correlation/operation ID" },
        { id: "b", text: "Look at the two tables in entirely separate, unrelated queries with no correlation" },
        { id: "c", text: "Assume the two failures are unrelated without checking" },
        { id: "d", text: "Delete both tables and start monitoring from scratch" },
      ],
      correct: "a",
      explanation:
        "Joining invocation and dependency data on a shared correlation ID lets you confirm whether the two failures happened within the same operation — looking at them separately or assuming a relationship without checking doesn't establish the actual link.",
    },
  ],
};
