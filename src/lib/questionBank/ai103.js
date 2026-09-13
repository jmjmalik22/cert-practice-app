export const AI_103 = {
  label: "Azure AI Apps and Agents Developer Associate",
  questions: [
    {
      id: "ai103-001",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Your team needs to classify short support-ticket titles into one of five categories. The workload runs millions of times a day, and low cost and low latency matter more than handling open-ended conversation. Which type of model should you deploy?",
      options: [
        { id: "a", text: "A general-purpose large language model with a long context window" },
        { id: "b", text: "A small language model tuned for the classification task" },
        { id: "c", text: "A multimodal model that also accepts images" },
        { id: "d", text: "A model that only supports batch (non-real-time) inference" },
      ],
      correct: "b",
      explanation:
        "For narrow, high-volume tasks like short-text classification, a small language model gives comparable accuracy at a fraction of the cost and latency of a large general-purpose LLM, which is better suited to complex, open-ended reasoning.",
    },
    {
      id: "ai103-002",
      domain: "Plan and manage an Azure AI solution",
      question:
        "You're building a Foundry-based assistant that must answer questions using your organization's internal knowledge base articles, and answers must stay current as articles change. Which approach should you choose?",
      options: [
        { id: "a", text: "Fine-tune the base model on a one-time export of the articles" },
        { id: "b", text: "Retrieval-augmented generation (RAG) backed by a search index over the articles" },
        { id: "c", text: "Increase the model's temperature so it produces more varied answers" },
        { id: "d", text: "Rely on the model's general training data instead of the internal content" },
      ],
      correct: "b",
      explanation:
        "RAG retrieves the most relevant, up-to-date content from an index at query time and grounds the model's response in it, avoiding the cost and staleness of repeatedly fine-tuning on every content update.",
    },
    {
      id: "ai103-003",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Users searching your product catalog expect both semantically similar results (\"warm jacket\" matching \"insulated coat\") and exact matches on model numbers. Which retrieval method should you configure?",
      options: [
        { id: "a", text: "Keyword search only" },
        { id: "b", text: "Vector search only" },
        { id: "c", text: "Hybrid search combining vector and keyword search" },
        { id: "d", text: "A single cached FAQ lookup" },
      ],
      correct: "c",
      explanation:
        "Hybrid search combines vector similarity for semantic matches with keyword search for exact-term matches such as model numbers, covering both needs that pure vector or pure keyword search would miss individually.",
    },
    {
      id: "ai103-004",
      domain: "Plan and manage an Azure AI solution",
      question:
        "An agent needs to remember details a customer mentioned earlier in a multi-turn conversation, such as an order number, without the client application resending the full history on every call. What should you use?",
      options: [
        { id: "a", text: "A stateless single-turn completion call for every message" },
        { id: "b", text: "The agent service's built-in conversation/thread state" },
        { id: "c", text: "A new agent instance for every message" },
        { id: "d", text: "Storing the order number only in the client's local cache" },
      ],
      correct: "b",
      explanation:
        "Foundry's agent/thread model persists conversation state server-side across turns, so the agent can recall earlier details without the client having to resend the entire conversation history each time.",
    },
    {
      id: "ai103-005",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Compliance requires that traffic between your application and your Foundry resource never traverse the public internet. What should you configure?",
      options: [
        { id: "a", text: "A public endpoint with a strong API key" },
        { id: "b", text: "A private endpoint using Azure Private Link" },
        { id: "c", text: "A wildcard CORS policy" },
        { id: "d", text: "A shared access signature on the storage account only" },
      ],
      correct: "b",
      explanation:
        "A private endpoint backed by Azure Private Link routes traffic over the Microsoft backbone network to the Foundry resource, keeping it off the public internet, which an API key on a public endpoint does not do.",
    },
    {
      id: "ai103-006",
      domain: "Plan and manage an Azure AI solution",
      question:
        "A production workload needs predictable, guaranteed low-latency throughput at high, steady volume, and cost predictability matters more than flexibility. Which deployment option best fits?",
      options: [
        { id: "a", text: "Pay-as-you-go, consumption-based deployment" },
        { id: "b", text: "Provisioned throughput (reserved capacity) deployment" },
        { id: "c", text: "A free-tier evaluation deployment" },
        { id: "d", text: "Deploying only in a non-production sandbox" },
      ],
      correct: "b",
      explanation:
        "Provisioned throughput reserves dedicated capacity, giving predictable latency and cost at high, steady volume, whereas pay-as-you-go throughput can vary under shared, variable load.",
    },
    {
      id: "ai103-007",
      domain: "Plan and manage an Azure AI solution",
      question:
        "You want every change to your Foundry project's model and agent configuration to go through code review and be automatically promoted from a dev workspace to production. What should you do?",
      options: [
        { id: "a", text: "Manually copy configuration through the Foundry portal each release" },
        { id: "b", text: "Integrate the Foundry project with a CI/CD pipeline that deploys configuration as code" },
        { id: "c", text: "Grant every developer direct write access to the production workspace" },
        { id: "d", text: "Disable versioning on the project" },
      ],
      correct: "b",
      explanation:
        "Integrating the Foundry project with a CI/CD pipeline lets configuration changes be reviewed, tested, and promoted automatically between environments, which manual copying or unrestricted direct access does not provide.",
    },
    {
      id: "ai103-008",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Your application starts receiving HTTP 429 throttling responses from a model deployment during traffic bursts. Which combination of actions should you take first?",
      options: [
        { id: "a", text: "Ignore the errors since they resolve on their own" },
        { id: "b", text: "Implement retry with exponential backoff and evaluate increasing provisioned capacity or quota" },
        { id: "c", text: "Switch every request to a different, unrelated Azure subscription" },
        { id: "d", text: "Remove all error handling from the client" },
      ],
      correct: "b",
      explanation:
        "429 responses indicate you're exceeding the deployment's rate limit; retrying with backoff smooths bursts, and increasing quota or provisioned throughput addresses sustained demand — simply ignoring the errors or removing error handling leaves the failures unhandled.",
    },
    {
      id: "ai103-009",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Multiple teams share one Foundry resource, and finance wants to understand and control spend per team before costs grow further. What should you do?",
      options: [
        { id: "a", text: "Give every team unlimited quota so nothing is throttled" },
        { id: "b", text: "Track cost and usage per project/deployment and configure budgets and alerts" },
        { id: "c", text: "Delete usage logs to simplify billing" },
        { id: "d", text: "Move all teams onto a single shared deployment with no separation" },
      ],
      correct: "b",
      explanation:
        "Tracking cost and usage at the project or deployment level and setting budgets/alerts gives visibility and guardrails per team, while removing limits or logs would make cost control harder, not easier.",
    },
    {
      id: "ai103-010",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Over several months, a deployed model's response quality on a fixed evaluation set has been gradually declining compared to its baseline. What should you set up to catch this going forward?",
      options: [
        { id: "a", text: "A one-time manual spot check before initial launch only" },
        { id: "b", text: "Continuous evaluation that compares live output quality against baseline metrics over time" },
        { id: "c", text: "Disabling monitoring to reduce log volume" },
        { id: "d", text: "Re-deploying the same model version without any evaluation" },
      ],
      correct: "b",
      explanation:
        "Continuous evaluation against baseline metrics over time is what surfaces gradual drift in model or grounding quality; a one-time pre-launch check or disabling monitoring would miss changes that emerge later.",
    },
    {
      id: "ai103-011",
      domain: "Plan and manage an Azure AI solution",
      question:
        "You need visibility into how often your generative application's responses are being flagged or blocked by content-safety policies, and to be alerted on spikes. What should you configure?",
      options: [
        { id: "a", text: "Turn off content filtering so no responses are blocked" },
        { id: "b", text: "Route content-safety signals into your monitoring stack and configure alerts on flagged/blocked events" },
        { id: "c", text: "Only check for safety issues manually once a quarter" },
        { id: "d", text: "Store safety flags only in the model's own internal memory" },
      ],
      correct: "b",
      explanation:
        "Routing content-safety signals into your observability stack and alerting on flagged/blocked events gives ongoing visibility into safety incidents; disabling filtering or checking infrequently would leave issues undetected.",
    },
    {
      id: "ai103-012",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Answers from your RAG solution have become less accurate, and you suspect the underlying search index is stale or poorly matching queries. What should you monitor?",
      options: [
        { id: "a", text: "Only the generative model's token usage" },
        { id: "b", text: "Data ingestion quality, index freshness, and query relevance metrics" },
        { id: "c", text: "The client application's UI rendering time" },
        { id: "d", text: "The number of agents deployed in the workspace" },
      ],
      correct: "b",
      explanation:
        "Because RAG answer quality depends on what the index returns, monitoring ingestion quality, index freshness, and relevance metrics identifies whether stale or poorly matching content is causing degraded answers.",
    },
    {
      id: "ai103-013",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Security review flags that your application authenticates to the Foundry resource using a long-lived API key embedded in configuration files. What should you change it to?",
      options: [
        { id: "a", text: "Keep the API key but rotate it once a year" },
        { id: "b", text: "Use managed identity with role-based access control instead of embedded keys" },
        { id: "c", text: "Share the API key over email so the on-call team has a backup" },
        { id: "d", text: "Hardcode a second API key for redundancy" },
      ],
      correct: "b",
      explanation:
        "Managed identity lets the application authenticate without any stored secret, and RBAC scopes exactly what it can do — eliminating the risk of a leaked long-lived key that rotation or a backup copy would not remove.",
    },
    {
      id: "ai103-014",
      domain: "Plan and manage an Azure AI solution",
      question:
        "You need to automatically block prompts and completions containing certain categories of harmful content before they reach end users. What should you configure?",
      options: [
        { id: "a", text: "Content safety filters/guardrails on both prompts and completions" },
        { id: "b", text: "A longer maximum response length" },
        { id: "c", text: "A higher model temperature" },
        { id: "d", text: "Disabling logging for compliance" },
      ],
      correct: "a",
      explanation:
        "Content safety filters applied to both prompts and completions block disallowed categories of harmful content automatically; response length, temperature, and logging settings don't provide that protection.",
    },
    {
      id: "ai103-015",
      domain: "Plan and manage an Azure AI solution",
      question:
        "Before releasing your RAG-based assistant, you want an automated way to flag answers that aren't actually supported by the retrieved source documents. What should you use?",
      options: [
        { id: "a", text: "A groundedness (fabrication) evaluator that checks answers against retrieved context" },
        { id: "b", text: "A spellchecker on the final answer text" },
        { id: "c", text: "A count of how many tokens the answer used" },
        { id: "d", text: "A manual review of every single response in production" },
      ],
      correct: "a",
      explanation:
        "A groundedness evaluator specifically checks whether a generated answer is supported by the retrieved context, catching fabricated or unsupported claims — something spellchecking or token counts cannot detect.",
    },
    {
      id: "ai103-016",
      domain: "Plan and manage an Azure AI solution",
      question:
        "For an autonomous agent that can take high-risk actions, compliance requires an immutable record of what the agent did, why, and who approved it. What should you implement?",
      options: [
        { id: "a", text: "Trace logging with provenance metadata and an approval workflow" },
        { id: "b", text: "Deleting logs after 24 hours to save storage" },
        { id: "c", text: "Allowing the agent to act with no logging to reduce latency" },
        { id: "d", text: "Recording only the final output, not the decision path" },
      ],
      correct: "a",
      explanation:
        "Trace logging combined with provenance metadata and an approval workflow creates the auditable record of the agent's actions and who signed off on them, which is exactly what compliance is asking for.",
    },
    {
      id: "ai103-017",
      domain: "Plan and manage an Azure AI solution",
      question:
        "You want to prevent an autonomous agent from calling any external API other than the small set your team has explicitly approved. What should you configure?",
      options: [
        { id: "a", text: "Give the agent unrestricted internet access and monitor it after the fact" },
        { id: "b", text: "A constrained tool schema / allowlist that limits which tools and APIs the agent can invoke" },
        { id: "c", text: "A larger context window" },
        { id: "d", text: "A faster model deployment" },
      ],
      correct: "b",
      explanation:
        "Defining a constrained tool schema or allowlist restricts the agent to only the explicitly approved tools/APIs, directly enforcing the boundary rather than relying on after-the-fact monitoring of unrestricted access.",
    },
    {
      id: "ai103-018",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You're building a developer assistant that primarily generates and explains source code. Which model characteristic should most influence your model choice?",
      options: [
        { id: "a", text: "A model specialized/optimized for code generation and understanding" },
        { id: "b", text: "A model optimized purely for image generation" },
        { id: "c", text: "A model with no support for structured output" },
        { id: "d", text: "The cheapest model regardless of code capability" },
      ],
      correct: "a",
      explanation:
        "A code-specialized model is trained and evaluated on code tasks, giving materially better code generation and explanation quality than a general-purpose or image-focused model.",
    },
    {
      id: "ai103-019",
      domain: "Implement generative AI and agentic solutions",
      question:
        "In a typical RAG implementation, what is the correct order of operations when a user asks a question?",
      options: [
        { id: "a", text: "Generate an answer first, then retrieve documents to verify it afterward" },
        { id: "b", text: "Retrieve the most relevant content for the query, then include it in the prompt sent to the model for generation" },
        { id: "c", text: "Skip retrieval entirely and rely only on the model's parametric knowledge" },
        { id: "d", text: "Retrieve documents at random regardless of the query" },
      ],
      correct: "b",
      explanation:
        "RAG retrieves the most relevant content for the query first and includes it as context in the generation prompt, grounding the answer — generating first or retrieving randomly defeats the purpose of grounding.",
    },
    {
      id: "ai103-020",
      domain: "Implement generative AI and agentic solutions",
      question:
        "A task requires the assistant to look up an order status via an API, then calculate a refund amount, then draft a customer email — all before responding. How should you design this?",
      options: [
        { id: "a", text: "A single prompt asking the model to guess all three outcomes at once" },
        { id: "b", text: "A multistep, tool-augmented workflow that calls each tool in sequence and passes results forward" },
        { id: "c", text: "Three unrelated agents that never share context" },
        { id: "d", text: "A static, hardcoded email template with no tool calls" },
      ],
      correct: "b",
      explanation:
        "Chaining tool calls in sequence — lookup, then calculation, then drafting — with results passed forward is the tool-augmented multistep pattern; asking the model to guess or hardcoding a template skips the actual work needed.",
    },
    {
      id: "ai103-021",
      domain: "Implement generative AI and agentic solutions",
      question:
        "During evaluation, you notice the assistant sometimes states facts that don't appear anywhere in the retrieved documents. Which evaluation metric specifically targets this problem?",
      options: [
        { id: "a", text: "Latency" },
        { id: "b", text: "Fabrication/groundedness" },
        { id: "c", text: "Token cost" },
        { id: "d", text: "Number of retrieved documents" },
      ],
      correct: "b",
      explanation:
        "Fabrication (groundedness) evaluation specifically measures whether stated facts are actually supported by the retrieved context, which is the exact issue described — latency, cost, and document count don't measure factual support.",
    },
    {
      id: "ai103-022",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You want an automated metric that scores how well the documents your retrieval step returned actually match the user's query, independent of the final generated answer. What should you use?",
      options: [
        { id: "a", text: "A relevance evaluator on the retrieved context" },
        { id: "b", text: "A safety evaluator on the final answer" },
        { id: "c", text: "A count of API calls made" },
        { id: "d", text: "The model's temperature setting" },
      ],
      correct: "a",
      explanation:
        "A relevance evaluator scores how well retrieved content matches the query, which is precisely what's needed to judge retrieval quality separately from the generated answer.",
    },
    {
      id: "ai103-023",
      domain: "Implement generative AI and agentic solutions",
      question:
        "As part of your release checklist, you want an automated score for whether generated responses contain harmful or inappropriate content across many test prompts. What should you run?",
      options: [
        { id: "a", text: "A safety evaluator over a representative set of test prompts and responses" },
        { id: "b", text: "A manual read of ten responses chosen at random" },
        { id: "c", text: "A check of only response length" },
        { id: "d", text: "A check that only inspects the system prompt, never the output" },
      ],
      correct: "a",
      explanation:
        "A safety evaluator run systematically across a representative test set gives a repeatable, scalable score for harmful content, unlike a small manual sample or checks that never inspect the actual output.",
    },
    {
      id: "ai103-024",
      domain: "Implement generative AI and agentic solutions",
      question:
        "Your application code needs to call a deployed generative model and parse its response as part of a web app. What should you use?",
      options: [
        { id: "a", text: "Manually craft raw HTTP requests with no client library and no error handling" },
        { id: "b", text: "A Foundry SDK/client library that handles authentication, requests, and responses to the deployed model" },
        { id: "c", text: "Embed the model weights directly inside the web app" },
        { id: "d", text: "Bypass the deployment and call the base model's public research paper" },
      ],
      correct: "b",
      explanation:
        "The Foundry SDK/client library provides authenticated, supported access to call and parse responses from a deployed model, which is the standard integration path rather than hand-rolled raw requests.",
    },
    {
      id: "ai103-025",
      domain: "Implement generative AI and agentic solutions",
      question:
        "Before your application can call any model or agent, what must it first do?",
      options: [
        { id: "a", text: "Nothing — models can be called without any project or authentication context" },
        { id: "b", text: "Configure a connection to the Foundry project, including its endpoint and credentials" },
        { id: "c", text: "Only configure a connection to the client's local database" },
        { id: "d", text: "Hardcode the model's internal weights file path" },
      ],
      correct: "b",
      explanation:
        "An application must configure a connection to the Foundry project — endpoint plus credentials — before it can invoke any model or agent hosted there; there's no calling it without that context.",
    },
    {
      id: "ai103-026",
      domain: "Implement generative AI and agentic solutions",
      question:
        "When defining a new agent, which of the following is essential to specify so the agent behaves predictably and knows what actions it can take?",
      options: [
        { id: "a", text: "Its role/goal, instructions, and the schema of the tools it can call" },
        { id: "b", text: "Only the color of the chat UI" },
        { id: "c", text: "The number of end users who will use it" },
        { id: "d", text: "The programming language the frontend is written in" },
      ],
      correct: "a",
      explanation:
        "An agent's role/goal, instructions, and a well-defined tool schema determine what it's trying to do and what actions it's allowed to take — UI color, user count, and frontend language have no bearing on agent behavior.",
    },
    {
      id: "ai103-027",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You need an agent that can answer questions from a knowledge base, call a billing API when asked, and remember earlier turns in the conversation. Which capability combination does this require?",
      options: [
        { id: "a", text: "Retrieval grounding, function/tool calling, and conversation memory together" },
        { id: "b", text: "Only function calling, with no retrieval or memory" },
        { id: "c", text: "Only conversation memory, with no tools" },
        { id: "d", text: "A single static FAQ page with no agent at all" },
      ],
      correct: "a",
      explanation:
        "Answering from a knowledge base needs retrieval grounding, calling billing needs function/tool calling, and remembering earlier turns needs conversation memory — the agent needs all three combined, not just one.",
    },
    {
      id: "ai103-028",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You want an agent to be able to create a support ticket in your internal ticketing system when a user reports a bug. How should you enable this?",
      options: [
        { id: "a", text: "Ask the model to describe the ticket in free text only, with no actual system integration" },
        { id: "b", text: "Define a custom function/tool that calls your ticketing system's API, and let the agent invoke it" },
        { id: "c", text: "Manually create tickets after reading chat transcripts once a week" },
        { id: "d", text: "Disable tool calling for this agent entirely" },
      ],
      correct: "b",
      explanation:
        "Defining a custom tool that wraps the ticketing API and allowing the agent to invoke it gives the agent an actual, real-time way to create tickets, rather than just describing one in text or relying on manual follow-up.",
    },
    {
      id: "ai103-029",
      domain: "Implement generative AI and agentic solutions",
      question:
        "A complex workflow needs a research step, a drafting step, and a compliance-review step, each requiring different expertise. What design should you use?",
      options: [
        { id: "a", text: "One monolithic agent trying to do all three tasks with a single generic prompt" },
        { id: "b", text: "An orchestrated multi-agent solution where a coordinating agent delegates each step to a specialist agent" },
        { id: "c", text: "Three completely independent apps with no shared context or handoff" },
        { id: "d", text: "Skipping compliance review to simplify the pipeline" },
      ],
      correct: "b",
      explanation:
        "An orchestrator delegating to specialist agents for research, drafting, and compliance review lets each step use focused instructions and tools, which a single generic agent or disconnected apps handle poorly.",
    },
    {
      id: "ai103-030",
      domain: "Implement generative AI and agentic solutions",
      question:
        "An agent can autonomously issue refunds, but for refunds over a certain dollar amount, a human must approve before the action executes. How should you implement this?",
      options: [
        { id: "a", text: "Let the agent execute every refund immediately regardless of amount" },
        { id: "b", text: "Add an approval-gate safeguard so high-value actions pause for human sign-off before executing" },
        { id: "c", text: "Remove the refund capability entirely" },
        { id: "d", text: "Only log the refund after it has already been issued" },
      ],
      correct: "b",
      explanation:
        "An approval gate that pauses high-value actions for human sign-off before execution is exactly the safeguard needed; letting every action execute immediately or only logging after the fact removes the required human check.",
    },
    {
      id: "ai103-031",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You want an agent to draft a customer-facing email but never send it without a person reviewing the wording first. What best describes this pattern?",
      options: [
        { id: "a", text: "Fully autonomous execution with no review step" },
        { id: "b", text: "A semi-autonomous workflow where the agent produces a draft and waits for human approval before the final action" },
        { id: "c", text: "A workflow where the human writes the entire email and the agent does nothing" },
        { id: "d", text: "Disabling the agent's ability to draft any content" },
      ],
      correct: "b",
      explanation:
        "A semi-autonomous workflow has the agent produce output and pause for human approval before the final action (sending), matching the requirement that a person review wording first — full autonomy would skip that review.",
    },
    {
      id: "ai103-032",
      domain: "Implement generative AI and agentic solutions",
      question:
        "An agent occasionally fails partway through a multi-tool task, but you can't tell which tool call failed or why. What should you set up?",
      options: [
        { id: "a", text: "Detailed tracing of each tool call and its result, to support error/root-cause analysis" },
        { id: "b", text: "Turning off logging so failures don't clutter the dashboard" },
        { id: "c", text: "Restarting the agent service on a fixed schedule regardless of errors" },
        { id: "d", text: "Ignoring intermittent failures since they're rare" },
      ],
      correct: "a",
      explanation:
        "Detailed per-tool-call tracing captures exactly where and why a multi-step task failed, enabling root-cause analysis — disabling logging or ignoring failures leaves you unable to diagnose the problem.",
    },
    {
      id: "ai103-033",
      domain: "Implement generative AI and agentic solutions",
      question:
        "Responses from your assistant are technically correct but too verbose and occasionally inconsistent in tone. Which combination of changes should you try first?",
      options: [
        { id: "a", text: "Refine the system prompt/instructions and adjust generation parameters such as temperature" },
        { id: "b", text: "Redeploy the model to a different region" },
        { id: "c", text: "Increase the model's maximum quota" },
        { id: "d", text: "Switch to a completely different modality, such as image generation" },
      ],
      correct: "a",
      explanation:
        "Verbosity and tone inconsistency are addressed by refining prompt instructions and tuning generation parameters like temperature — region, quota, and modality changes don't affect response style.",
    },
    {
      id: "ai103-034",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You want the model to review its own draft answer for errors and revise it before returning a final response to the user. What pattern does this describe?",
      options: [
        { id: "a", text: "A reflection/self-critique loop" },
        { id: "b", text: "A one-shot completion with no review step" },
        { id: "c", text: "Reducing the context window to zero" },
        { id: "d", text: "Disabling all evaluation" },
      ],
      correct: "a",
      explanation:
        "Having the model critique and revise its own draft before finalizing is the reflection/self-critique pattern — a one-shot completion by definition skips that extra review step.",
    },
    {
      id: "ai103-035",
      domain: "Implement generative AI and agentic solutions",
      question:
        "For a math-heavy task, you want to assess not just whether the final answer is correct, but whether the intermediate reasoning steps make sense. What should you evaluate?",
      options: [
        { id: "a", text: "Only the final numeric answer" },
        { id: "b", text: "The chain-of-thought reasoning steps leading to the answer" },
        { id: "c", text: "The length of the prompt" },
        { id: "d", text: "The name of the deployed model" },
      ],
      correct: "b",
      explanation:
        "Evaluating the chain-of-thought reasoning steps checks whether the intermediate logic is sound, not just whether the final number happens to be correct — which could be right by coincidence.",
    },
    {
      id: "ai103-036",
      domain: "Implement generative AI and agentic solutions",
      question:
        "You need to see the full path a request took — from the initial user message, through each tool call, to the final response — in one place for debugging. What should you enable?",
      options: [
        { id: "a", text: "End-to-end tracing across the agent's tool calls and generation steps" },
        { id: "b", text: "Only client-side browser console logs" },
        { id: "c", text: "A single aggregate count of total requests per day" },
        { id: "d", text: "Disabling all telemetry to reduce noise" },
      ],
      correct: "a",
      explanation:
        "End-to-end tracing stitches together the full request path across tool calls and generation steps into one view, which browser logs or a simple daily count cannot provide.",
    },
    {
      id: "ai103-037",
      domain: "Implement generative AI and agentic solutions",
      question:
        "Some requests are simple, deterministic lookups (like \"what's my account balance\"), while others need open-ended reasoning. How should you design the system for cost and reliability?",
      options: [
        { id: "a", text: "Route simple deterministic requests to a rules engine or direct API call, and reserve the LLM for requests needing open-ended reasoning" },
        { id: "b", text: "Send every request, no matter how simple, through the largest available LLM" },
        { id: "c", text: "Handle all requests, including complex reasoning, with a fixed rules engine only" },
        { id: "d", text: "Randomly choose between the two approaches for each request" },
      ],
      correct: "a",
      explanation:
        "Routing deterministic lookups to a rules engine or direct API call is cheaper and more reliable for that class of request, reserving the LLM for genuinely open-ended reasoning — sending everything through the LLM or a fixed rules engine alone wastes cost or loses capability.",
    },
    {
      id: "ai103-038",
      domain: "Implement computer vision solutions",
      question:
        "A marketing team wants to generate new promotional images from written descriptions, without hiring a designer for every variation. Which capability should you implement?",
      options: [
        { id: "a", text: "Text-to-image generation from prompts" },
        { id: "b", text: "Sentiment analysis on customer reviews" },
        { id: "c", text: "Speech-to-text transcription" },
        { id: "d", text: "Document field extraction" },
      ],
      correct: "a",
      explanation:
        "Text-to-image generation directly produces new images from written prompts, which is what the marketing team needs — the other options are unrelated text, speech, or document capabilities.",
    },
    {
      id: "ai103-039",
      domain: "Implement computer vision solutions",
      question:
        "You need to replace only the background of a product photo while keeping the product itself untouched, using an AI-generated background. What technique fits?",
      options: [
        { id: "a", text: "Mask-based inpainting that edits only the selected region" },
        { id: "b", text: "Regenerating the entire image from scratch with a new prompt" },
        { id: "c", text: "Manually cropping the image in a non-AI photo editor only" },
        { id: "d", text: "Running sentiment analysis on the product description" },
      ],
      correct: "a",
      explanation:
        "Mask-based inpainting confines the edit to the selected region (the background) while leaving the rest of the image (the product) untouched, unlike full regeneration which would risk altering the product too.",
    },
    {
      id: "ai103-040",
      domain: "Implement computer vision solutions",
      question:
        "You need to automatically generate a short caption for each image in a batch of thousands of product photos. What should you implement?",
      options: [
        { id: "a", text: "Multimodal image captioning applied across the batch" },
        { id: "b", text: "Manual captioning by a human reviewer for each photo" },
        { id: "c", text: "Text-only sentiment analysis of the product name" },
        { id: "d", text: "Speech translation of an unrelated audio file" },
      ],
      correct: "a",
      explanation:
        "Multimodal captioning models can generate a caption per image automatically at batch scale, which is far more scalable than manual review and is the correct capability for an image-based task.",
    },
    {
      id: "ai103-041",
      domain: "Implement computer vision solutions",
      question:
        "A user uploads a photo of a broken part and asks, \"What's wrong with this?\" The app must answer based on what's visible in the image. What capability is required?",
      options: [
        { id: "a", text: "Question-answering grounded in visual evidence from a multimodal model" },
        { id: "b", text: "Text-only entity extraction" },
        { id: "c", text: "Speech-to-text conversion" },
        { id: "d", text: "Document layout analysis on a PDF" },
      ],
      correct: "a",
      explanation:
        "Answering a question about the content of an uploaded image requires visual question-answering from a multimodal model that can reason over image content, not text-only or document-specific capabilities.",
    },
    {
      id: "ai103-042",
      domain: "Implement computer vision solutions",
      question:
        "Your e-commerce site needs auto-generated alt-text for product images to meet accessibility guidelines. What should you configure?",
      options: [
        { id: "a", text: "Alt-text/extended image description generation aligned to accessibility guidelines" },
        { id: "b", text: "A pop-up asking sighted users to describe each image manually" },
        { id: "c", text: "Removing all images that lack existing alt-text" },
        { id: "d", text: "Speech-to-text transcription of a product demo video only" },
      ],
      correct: "a",
      explanation:
        "Configuring generation of alt-text/extended descriptions aligned to accessibility guidelines directly meets the requirement, rather than relying on manual descriptions or unrelated video transcription.",
    },
    {
      id: "ai103-043",
      domain: "Implement computer vision solutions",
      question:
        "You need to extract structured attributes (color, material, category) from thousands of product photos to populate a catalog database. What should you use?",
      options: [
        { id: "a", text: "A Content Understanding analyzer configured to extract visual characteristics into structured output" },
        { id: "b", text: "A generic text summarizer with no image input" },
        { id: "c", text: "A speech translation pipeline" },
        { id: "d", text: "Manual tagging by a small team, with no automation" },
      ],
      correct: "a",
      explanation:
        "A Content Understanding analyzer set up for visual characteristic extraction can turn image content into structured attributes at scale, which text summarization, speech tools, or purely manual tagging cannot do efficiently.",
    },
    {
      id: "ai103-044",
      domain: "Implement computer vision solutions",
      question:
        "You need to identify and flag whenever a specific type of safety equipment is missing from segments of security camera video. What should you implement?",
      options: [
        { id: "a", text: "A video analysis workflow that detects and identifies objects/regions across video segments" },
        { id: "b", text: "A static image classifier that only processes single photos, never video" },
        { id: "c", text: "A text sentiment model on the video's file name" },
        { id: "d", text: "An audio transcription service with no visual analysis" },
      ],
      correct: "a",
      explanation:
        "Detecting objects/regions across video segments requires a video analysis workflow built for that purpose; a single-image classifier or non-visual tools like sentiment or transcription can't process video content for object presence.",
    },
    {
      id: "ai103-045",
      domain: "Implement computer vision solutions",
      question:
        "An attacker embeds hidden instructions as text within an uploaded image, hoping the model will follow them instead of your system instructions. What should your solution do?",
      options: [
        { id: "a", text: "Trust all text found inside any uploaded image as if it were a legitimate system instruction" },
        { id: "b", text: "Detect and mitigate this as indirect prompt injection embedded in visual content" },
        { id: "c", text: "Disable all image uploads' captions permanently as the only possible response" },
        { id: "d", text: "Ignore the risk since text in images cannot influence a multimodal model" },
      ],
      correct: "b",
      explanation:
        "Text embedded in an image can be read by a multimodal model and used as an indirect prompt injection attempt, so the solution must specifically detect and mitigate this — treating embedded text as trusted, or assuming it has no effect, ignores the real risk.",
    },
    {
      id: "ai103-046",
      domain: "Implement text analysis solutions",
      question:
        "You need to pull structured fields — customer name, order number, issue type — out of free-form support emails into a JSON object for your ticketing system. What approach fits?",
      options: [
        { id: "a", text: "Generative prompting with a defined output schema to extract structured JSON" },
        { id: "b", text: "Manually retyping each email's content into a spreadsheet" },
        { id: "c", text: "A generic image classifier" },
        { id: "d", text: "A text-to-speech engine" },
      ],
      correct: "a",
      explanation:
        "Prompting a generative model with a defined schema to extract entities into structured JSON directly produces the fields needed for the ticketing system, unlike manual retyping or unrelated image/speech tools.",
    },
    {
      id: "ai103-047",
      domain: "Implement text analysis solutions",
      question:
        "Executives want a two-sentence summary automatically generated for every long incident report submitted. What capability should you use?",
      options: [
        { id: "a", text: "Generative text summarization" },
        { id: "b", text: "Object detection on report attachments only" },
        { id: "c", text: "Speech-to-text on a report's audio recording, if one exists, with no text summarization" },
        { id: "d", text: "A keyword search index with no summarization step" },
      ],
      correct: "a",
      explanation:
        "Generative text summarization condenses a long report into a short summary automatically, which is exactly the requirement — object detection and speech-to-text address different, unrelated media.",
    },
    {
      id: "ai103-048",
      domain: "Implement text analysis solutions",
      question:
        "You want to flag chat transcripts where the customer's tone becomes increasingly frustrated over the conversation. What should you implement?",
      options: [
        { id: "a", text: "Sentiment/tone detection applied across the conversation" },
        { id: "b", text: "Image captioning of the customer's profile picture" },
        { id: "c", text: "Translating the transcript into a language nobody on the team reads" },
        { id: "d", text: "Deleting transcripts after each session to save storage" },
      ],
      correct: "a",
      explanation:
        "Sentiment/tone detection run across the conversation identifies shifts toward frustration, which is the actual signal needed — profile picture captioning or deleting transcripts don't address tone at all.",
    },
    {
      id: "ai103-049",
      domain: "Implement text analysis solutions",
      question:
        "Before displaying user-submitted text in a public forum, you need to automatically catch content containing sensitive personal information or unsafe language. What should you configure?",
      options: [
        { id: "a", text: "Detection of sensitive content and safety issues in text prior to display" },
        { id: "b", text: "A spellchecker with no safety awareness" },
        { id: "c", text: "A word count limit only" },
        { id: "d", text: "Automatic translation into another language, without any safety check" },
      ],
      correct: "a",
      explanation:
        "Configuring detection of sensitive content and safety issues specifically screens for that risk before display; a spellchecker, word-count limit, or translation alone provide no safety screening.",
    },
    {
      id: "ai103-050",
      domain: "Implement text analysis solutions",
      question:
        "Your support team receives messages in many languages and needs them translated into English for triage, then replies translated back to the customer's language. What should you use?",
      options: [
        { id: "a", text: "A translation solution, such as Azure Translator or LLM-powered translation flows" },
        { id: "b", text: "An image object detector" },
        { id: "c", text: "A document layout analyzer" },
        { id: "d", text: "A speech-to-text engine used without any translation step" },
      ],
      correct: "a",
      explanation:
        "A translation capability — Translator or LLM-powered translation — is what converts messages between languages in both directions, which the other listed capabilities don't provide.",
    },
    {
      id: "ai103-051",
      domain: "Implement text analysis solutions",
      question:
        "Generic summarization is missing important compliance-specific terminology when summarizing regulatory documents. What should you do?",
      options: [
        { id: "a", text: "Customize the model's outputs for the domain task, such as tailoring prompts or fine-tuning for compliance summarization" },
        { id: "b", text: "Switch to image captioning instead of text summarization" },
        { id: "c", text: "Stop summarizing entirely and only show raw documents" },
        { id: "d", text: "Use a shorter, generic prompt with no domain context" },
      ],
      correct: "a",
      explanation:
        "Customizing prompts (or fine-tuning) specifically for the compliance domain improves handling of specialized terminology, whereas switching modality, dropping summarization, or using a generic prompt doesn't address the domain gap.",
    },
    {
      id: "ai103-052",
      domain: "Implement text analysis solutions",
      question:
        "You're adding a voice channel to your agent so customers can speak their question and hear a spoken response. What must you integrate?",
      options: [
        { id: "a", text: "Speech-to-text and text-to-speech as part of the agent's interaction pipeline" },
        { id: "b", text: "Only text-based chat with no audio support" },
        { id: "c", text: "A video generation model with no audio component" },
        { id: "d", text: "An image classifier applied to a photo of the customer's phone" },
      ],
      correct: "a",
      explanation:
        "A voice channel requires converting spoken input to text (speech-to-text) and converting the response back to speech (text-to-speech) as part of the pipeline — text-only chat or unrelated image/video capabilities don't provide voice interaction.",
    },
    {
      id: "ai103-053",
      domain: "Implement text analysis solutions",
      question:
        "You need to translate a customer's live spoken question in French into an English response the support agent can understand, in near real time. What capability addresses this?",
      options: [
        { id: "a", text: "Speech translation using language models/Foundry Tools" },
        { id: "b", text: "Static text templates unrelated to the actual question" },
        { id: "c", text: "Image-based object detection" },
        { id: "d", text: "A batch job that runs once a day" },
      ],
      correct: "a",
      explanation:
        "Speech translation converts spoken input in one language into another, which directly serves the near-real-time cross-language support scenario — static templates, image detection, and a daily batch job don't provide this.",
    },
    {
      id: "ai103-054",
      domain: "Implement information extraction solutions",
      question:
        "You want your agent to ground its answers using a mixed corpus of PDFs, scanned images, and recorded audio calls. What should you build first?",
      options: [
        { id: "a", text: "An ingestion and indexing pipeline that processes and indexes all of these content types" },
        { id: "b", text: "A single index built only from PDF files, ignoring the images and audio" },
        { id: "c", text: "A model that only accepts one input type at inference time, with no indexing" },
        { id: "d", text: "A manual transcript typed by hand for each audio call, with no indexing" },
      ],
      correct: "a",
      explanation:
        "Grounding across mixed content types requires an ingestion pipeline that processes and indexes all of them (documents, images, audio) — indexing only PDFs, or skipping indexing altogether, would leave most of the corpus unusable for retrieval.",
    },
    {
      id: "ai103-055",
      domain: "Implement information extraction solutions",
      question:
        "During ingestion pipeline design, you need the grounding search to catch both close semantic matches and precise exact-term matches like part numbers, for the RAG pipeline you're building. What retrieval configuration should the pipeline use?",
      options: [
        { id: "a", text: "Semantic (vector) search only" },
        { id: "b", text: "Keyword search only" },
        { id: "c", text: "Hybrid search combining vector and keyword approaches" },
        { id: "d", text: "No search at all — pass the entire corpus into every prompt" },
      ],
      correct: "c",
      explanation:
        "Hybrid search combines vector search for semantic matches with keyword search for exact terms like part numbers, covering both needs during ingestion-time retrieval configuration for the RAG pipeline.",
    },
    {
      id: "ai103-056",
      domain: "Implement information extraction solutions",
      question:
        "Before content is indexed for grounding, you need to automatically redact personally identifiable information found in the source documents. What should you add to the pipeline?",
      options: [
        { id: "a", text: "A custom enrichment skill that redacts PII during ingestion" },
        { id: "b", text: "A step that only compresses file sizes, with no content inspection" },
        { id: "c", text: "Indexing the raw documents first and worrying about PII later, if ever" },
        { id: "d", text: "Disabling ingestion entirely so nothing gets indexed" },
      ],
      correct: "a",
      explanation:
        "A custom enrichment skill applied during ingestion can detect and redact PII before content is indexed, addressing the requirement directly — compressing files or indexing raw content first would leave PII exposed.",
    },
    {
      id: "ai103-057",
      domain: "Implement information extraction solutions",
      question:
        "Some of the documents you need to ground answers on are scanned PDF images with no selectable text layer. What must the ingestion flow include?",
      options: [
        { id: "a", text: "An OCR step to extract text from the scanned images before indexing" },
        { id: "b", text: "Skipping these files since they can't be used" },
        { id: "c", text: "Converting the PDFs to audio and transcribing that audio instead" },
        { id: "d", text: "Only indexing the file names, not their content" },
      ],
      correct: "a",
      explanation:
        "Scanned PDFs without a text layer need OCR to extract usable text before that content can be indexed and used for grounding — skipping the files or indexing only file names would lose all the actual content.",
    },
    {
      id: "ai103-058",
      domain: "Implement information extraction solutions",
      question:
        "You want an agent to be able to search your knowledge base directly as one of its available actions during a conversation, rather than the app pre-fetching results before every call. What should you do?",
      options: [
        { id: "a", text: "Connect the retrieval pipeline directly to the agent as a callable tool/function" },
        { id: "b", text: "Require a human to manually search and paste results into the chat every time" },
        { id: "c", text: "Remove the search index entirely and rely on the model's built-in knowledge" },
        { id: "d", text: "Only allow retrieval before the conversation starts, never during it" },
      ],
      correct: "a",
      explanation:
        "Exposing the retrieval pipeline as a callable tool lets the agent invoke search itself mid-conversation as needed, rather than being limited to pre-fetched results or requiring manual human intervention.",
    },
    {
      id: "ai103-059",
      domain: "Implement information extraction solutions",
      question:
        "You need to pull vendor name, invoice date, and total amount out of thousands of scanned invoices with varying layouts. What approach should you use?",
      options: [
        { id: "a", text: "A multimodal pipeline combining OCR, layout analysis, and field extraction" },
        { id: "b", text: "A generic sentiment analysis model" },
        { id: "c", text: "A speech-to-text service with no document analysis" },
        { id: "d", text: "Manually typing every field from every invoice" },
      ],
      correct: "a",
      explanation:
        "Combining OCR, layout analysis, and field extraction in one multimodal pipeline reliably pulls named fields from documents whose layouts vary, unlike sentiment analysis, speech tools, or fully manual entry.",
    },
    {
      id: "ai103-060",
      domain: "Implement information extraction solutions",
      question:
        "You need a clean, structured markdown representation of a long contract PDF so a downstream LLM can reason over its sections reliably. What should you use to produce it?",
      options: [
        { id: "a", text: "A Content Understanding analyzer configured to generate structured/markdown output from the document" },
        { id: "b", text: "A raw image screenshot of each page with no text extraction" },
        { id: "c", text: "A translation service with no structural analysis" },
        { id: "d", text: "A random sample of a few paragraphs from the document" },
      ],
      correct: "a",
      explanation:
        "A Content Understanding analyzer configured for structured/markdown output turns the document into a clean, well-organized representation an LLM can reason over section by section, unlike raw screenshots, translation alone, or an incomplete random sample.",
    },
  ],
};
