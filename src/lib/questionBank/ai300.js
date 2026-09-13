export const AI_300 = {
  label: "Machine Learning Operations Engineer Associate",
  questions: [
    {
      id: "ai300-001",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Your data science team needs a single top-level container in Azure to organize experiments, compute, data, and models for a project. What should you create first?",
      options: [
        { id: "a", text: "A Machine Learning workspace" },
        { id: "b", text: "A single virtual machine with nothing else configured" },
        { id: "c", text: "A Blob Storage container with no other services attached" },
        { id: "d", text: "A local folder on one data scientist's laptop" },
      ],
      correct: "a",
      explanation:
        "A Machine Learning workspace is the top-level container that ties together compute, data, experiments, and models for a project — a bare VM, a storage container, or a local folder don't provide that organizing structure.",
    },
    {
      id: "ai300-002",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Multiple training jobs need to read from the same Blob Storage account without every data scientist re-entering storage credentials in their scripts. What should you configure?",
      options: [
        { id: "a", text: "A registered datastore that abstracts the storage connection and credentials" },
        { id: "b", text: "Hardcoding the storage account key into every training script" },
        { id: "c", text: "Emailing the storage key to each team member individually" },
        { id: "d", text: "Copying the data to each data scientist's local disk manually" },
      ],
      correct: "a",
      explanation:
        "A datastore registers the connection once and lets jobs reference it securely without embedding credentials in every script — hardcoding or emailing keys spreads secrets around, and manual copies don't scale or stay in sync.",
    },
    {
      id: "ai300-003",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "You need compute that automatically scales out for parallel training jobs and scales back to zero nodes when idle to save cost. What compute target should you use?",
      options: [
        { id: "a", text: "A compute cluster configured with autoscaling" },
        { id: "b", text: "A single always-on compute instance sized for peak load" },
        { id: "c", text: "A developer's local laptop" },
        { id: "d", text: "No compute target at all" },
      ],
      correct: "a",
      explanation:
        "A compute cluster with autoscaling adds nodes for parallel jobs and scales to zero when idle, matching the cost and scaling requirement — an always-on instance keeps costing money while idle, and a laptop isn't a managed, scalable target.",
    },
    {
      id: "ai300-004",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "You need to control exactly which users and service principals can create or modify assets in a Machine Learning workspace. What should you configure?",
      options: [
        { id: "a", text: "Role-based access control (RBAC) and managed identities for the workspace" },
        { id: "b", text: "A single shared password known to the entire company" },
        { id: "c", text: "No access control, relying on nobody misusing the workspace" },
        { id: "d", text: "Giving every employee owner rights by default" },
      ],
      correct: "a",
      explanation:
        "RBAC combined with managed identities lets you grant precisely scoped permissions to users and service principals — a shared password, no access control, or blanket owner rights for everyone all fail to limit access appropriately.",
    },
    {
      id: "ai300-005",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Your training pipeline references \"the latest CSV in a folder,\" which has caused reproducibility problems when the folder's contents changed. What should you do instead?",
      options: [
        { id: "a", text: "Register the data as a versioned data asset and reference a specific version in the pipeline" },
        { id: "b", text: "Keep referencing the folder path directly, but rename it more descriptively" },
        { id: "c", text: "Ask everyone to remember not to change the folder" },
        { id: "d", text: "Delete the folder after each training run" },
      ],
      correct: "a",
      explanation:
        "A versioned data asset pins the pipeline to a specific, immutable version of the data, which is exactly what reproducibility requires — a renamed folder or relying on people's memory doesn't prevent the underlying data from changing.",
    },
    {
      id: "ai300-006",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Training works on one data scientist's machine but fails on another's due to different library versions. What should you create to ensure consistency?",
      options: [
        { id: "a", text: "A registered environment (e.g., a Conda/Docker spec) used consistently across training and inference" },
        { id: "b", text: "A shared document listing which versions everyone should try to install" },
        { id: "c", text: "Nothing — differences between machines don't matter" },
        { id: "d", text: "A single global Python installation shared by remote desktop" },
      ],
      correct: "a",
      explanation:
        "A registered environment captures the exact dependency specification and is reused consistently across runs, eliminating \"works on my machine\" drift — a shared document or informal convention doesn't enforce the same guarantee.",
    },
    {
      id: "ai300-007",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "You want a reusable, versioned \"data cleaning\" step that multiple pipelines across your team can reference instead of each pipeline reimplementing it. What should you create?",
      options: [
        { id: "a", text: "A registered component" },
        { id: "b", text: "A copy-pasted script duplicated into each pipeline" },
        { id: "c", text: "A single hardcoded notebook cell with no reuse mechanism" },
        { id: "d", text: "A manual checklist for each team member to follow by hand" },
      ],
      correct: "a",
      explanation:
        "A registered component packages a reusable, versioned pipeline step that any pipeline can reference — copy-pasting the same script into each pipeline creates duplication and drift instead of reuse.",
    },
    {
      id: "ai300-008",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Several teams in different workspaces need to reuse the same approved model and environment definitions without duplicating them. What should you use?",
      options: [
        { id: "a", text: "A registry that shares assets across multiple workspaces" },
        { id: "b", text: "Manually re-uploading the same files to every workspace" },
        { id: "c", text: "Emailing model files between teams as attachments" },
        { id: "d", text: "Keeping each workspace completely isolated with no sharing mechanism" },
      ],
      correct: "a",
      explanation:
        "A registry is built specifically to share models, environments, and components across workspaces without duplication — re-uploading or emailing files creates copies that can drift out of sync.",
    },
    {
      id: "ai300-009",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "You want to be able to recreate an entire Machine Learning workspace and its supporting resources reproducibly in a new environment. What should you use?",
      options: [
        { id: "a", text: "Infrastructure as code, such as Bicep templates deployed via Azure CLI" },
        { id: "b", text: "Manually clicking through the Azure portal each time, from memory" },
        { id: "c", text: "A screenshot of the previous workspace's settings" },
        { id: "d", text: "Asking a colleague to describe what they remember configuring" },
      ],
      correct: "a",
      explanation:
        "Bicep templates deployed via Azure CLI make workspace creation declarative and repeatable — manual portal clicks, screenshots, or relying on someone's memory can't reliably reproduce the exact same configuration.",
    },
    {
      id: "ai300-010",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "You want new compute and datastore resources provisioned automatically whenever infrastructure code is merged to your main branch, without a person running commands by hand. What should you set up?",
      options: [
        { id: "a", text: "A GitHub Actions workflow that provisions the resources on merge" },
        { id: "b", text: "A person manually running deployment commands after every merge" },
        { id: "c", text: "No automation, since manual provisioning is simpler" },
        { id: "d", text: "A workflow that only sends a Slack message with no actual provisioning" },
      ],
      correct: "a",
      explanation:
        "A GitHub Actions workflow triggered on merge can provision resources automatically and consistently — manual provisioning after each merge is exactly the error-prone, easy-to-forget step automation is meant to remove.",
    },
    {
      id: "ai300-011",
      domain: "Design and implement an MLOps infrastructure",
      question:
        "Security requires that your Machine Learning workspace not be reachable from the public internet, and that all pipeline/notebook code be tracked with full history in Git. What should you configure together?",
      options: [
        { id: "a", text: "Restricted network access (private endpoint, no public access) for the workspace, plus Git-based source control for ML project code" },
        { id: "b", text: "A fully public workspace with no network restriction, and no version control at all" },
        { id: "c", text: "Public access left open, but code stored only in a local, unshared folder" },
        { id: "d", text: "Network restrictions with code changes tracked only in an email thread" },
      ],
      correct: "a",
      explanation:
        "Restricting network access via a private endpoint meets the connectivity requirement, and Git-based source control gives full history and traceability for ML project code — leaving the workspace public or tracking changes outside Git satisfies neither requirement.",
    },
    {
      id: "ai300-012",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You're running dozens of training experiments and need to compare their parameters and metrics later without manually recording each run in a spreadsheet. What should you use?",
      options: [
        { id: "a", text: "Experiment tracking with MLflow" },
        { id: "b", text: "A shared spreadsheet updated by hand after every run" },
        { id: "c", text: "Relying on memory of which run performed best" },
        { id: "d", text: "Deleting older runs immediately after they finish" },
      ],
      correct: "a",
      explanation:
        "MLflow experiment tracking automatically logs parameters and metrics per run so they can be compared later — manual spreadsheets or memory don't scale and are error-prone across dozens of runs.",
    },
    {
      id: "ai300-013",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You want to quickly explore which algorithm and hyperparameter combination performs best on your dataset without manually trying each one yourself. What should you use?",
      options: [
        { id: "a", text: "Automated machine learning (AutoML)" },
        { id: "b", text: "Manually writing and running a separate script for every possible combination" },
        { id: "c", text: "Picking the first algorithm you think of and stopping there" },
        { id: "d", text: "Asking a colleague to guess the best algorithm" },
      ],
      correct: "a",
      explanation:
        "AutoML systematically searches across algorithms and hyperparameters to find strong candidates automatically, which manual trial-and-error or guessing can't do efficiently at scale.",
    },
    {
      id: "ai300-014",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "A data scientist wants to interactively explore a new dataset, visualize distributions, and try quick modeling ideas before building a formal pipeline. What should they use?",
      options: [
        { id: "a", text: "A notebook for experimentation and exploration" },
        { id: "b", text: "A fully automated production pipeline with no interactive step" },
        { id: "c", text: "Directly editing the production model in place" },
        { id: "d", text: "Skipping exploration and going straight to a fixed pipeline" },
      ],
      correct: "a",
      explanation:
        "Notebooks are built for exactly this kind of interactive, iterative exploration before formalizing a pipeline — a production pipeline is the wrong tool for early, exploratory work, and editing production directly is unsafe.",
    },
    {
      id: "ai300-015",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You need to find the best combination of learning rate and batch size for a model, and manually trying combinations is too slow. What should you automate?",
      options: [
        { id: "a", text: "Hyperparameter tuning via a sweep job" },
        { id: "b", text: "Retraining with the exact same hyperparameters every time" },
        { id: "c", text: "Randomly picking a single combination and never revisiting it" },
        { id: "d", text: "Skipping hyperparameter tuning entirely" },
      ],
      correct: "a",
      explanation:
        "An automated hyperparameter sweep job systematically searches the parameter space far faster and more thoroughly than manual trial-and-error, directly addressing the slowness problem.",
    },
    {
      id: "ai300-016",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You have a training script that works locally and now needs to run against a specific compute target and environment as a tracked job. What should you do?",
      options: [
        { id: "a", text: "Submit the script as a training job, specifying the compute target and environment" },
        { id: "b", text: "Copy the script by hand onto a VM and run it with no tracking" },
        { id: "c", text: "Run it only ever on the original developer's laptop" },
        { id: "d", text: "Paste the script into a chat message and ask someone else to run it" },
      ],
      correct: "a",
      explanation:
        "Submitting the script as a job with a defined compute target and environment gives you tracked, reproducible execution — running it ad hoc on a VM or a laptop with no tracking loses that reproducibility.",
    },
    {
      id: "ai300-017",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "Training a large deep learning model on a single GPU is too slow for your deadline. What should you implement?",
      options: [
        { id: "a", text: "Distributed training across multiple nodes/GPUs" },
        { id: "b", text: "Reducing the dataset to a handful of rows to finish faster" },
        { id: "c", text: "Training on a laptop CPU instead" },
        { id: "d", text: "Skipping training and shipping an untrained model" },
      ],
      correct: "a",
      explanation:
        "Distributed training spreads the workload across multiple nodes/GPUs to reduce wall-clock training time for large models — shrinking the dataset or moving to a weaker CPU would hurt model quality or speed even further.",
    },
    {
      id: "ai300-018",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You want data preparation, training, and evaluation to run as one connected, repeatable sequence rather than as separate manual steps each time. What should you build?",
      options: [
        { id: "a", text: "A training pipeline chaining the steps together" },
        { id: "b", text: "Three unrelated scripts run in an arbitrary, undocumented order" },
        { id: "c", text: "A single script that only does evaluation, skipping training" },
        { id: "d", text: "Manually running each step by hand every single time" },
      ],
      correct: "a",
      explanation:
        "A pipeline connects data prep, training, and evaluation into one repeatable, orchestrated sequence — running disconnected scripts manually and in no fixed order reintroduces exactly the inconsistency a pipeline avoids.",
    },
    {
      id: "ai300-019",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You've run several training jobs with different configurations and need to identify which one produced the best-performing model before promoting it. What should you do?",
      options: [
        { id: "a", text: "Compare the logged metrics across jobs to select the best-performing one" },
        { id: "b", text: "Always promote whichever job finished first, regardless of metrics" },
        { id: "c", text: "Promote a model at random" },
        { id: "d", text: "Skip comparison and reuse last year's model unchanged" },
      ],
      correct: "a",
      explanation:
        "Comparing logged metrics across jobs is how you objectively identify the best-performing candidate — picking by finish order, randomly, or reusing an old model ignores the actual performance data available.",
    },
    {
      id: "ai300-020",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "At inference time, your model needs the exact same engineered features that were used during training, computed the same way. What should you package with the model artifact?",
      options: [
        { id: "a", text: "A feature retrieval specification alongside the model artifact" },
        { id: "b", text: "Nothing — assume the serving code will happen to compute features identically" },
        { id: "c", text: "Only the raw training data, with no feature logic" },
        { id: "d", text: "A separate, undocumented script kept on one engineer's machine" },
      ],
      correct: "a",
      explanation:
        "Packaging a feature retrieval spec with the model artifact ensures inference uses the same feature computation as training — assuming serving code will match by coincidence, or keeping the logic undocumented, invites training/serving skew.",
    },
    {
      id: "ai300-021",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You've trained a model and want to formally track it with a version number and metadata in your workspace's model registry. What should you do?",
      options: [
        { id: "a", text: "Register the model as an MLflow model in the workspace registry" },
        { id: "b", text: "Save the model file only to a personal folder with no registry entry" },
        { id: "c", text: "Rename the file with today's date and consider it \"versioned\"" },
        { id: "d", text: "Keep the model only in the training job's temporary output, with no registration" },
      ],
      correct: "a",
      explanation:
        "Registering the model as an MLflow model in the registry gives it a tracked version and metadata that other processes and people can reference — a personal folder, a date in the filename, or unregistered temporary output all lack that structured tracking.",
    },
    {
      id: "ai300-022",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "Before promoting a new model to production, you need to check it for fairness issues across demographic groups and understand which features drive its predictions. What should you perform?",
      options: [
        { id: "a", text: "A responsible AI evaluation covering fairness and explainability" },
        { id: "b", text: "Only a raw accuracy check, ignoring fairness and explainability" },
        { id: "c", text: "No evaluation, since the model already passed training metrics" },
        { id: "d", text: "A check of the model file's size only" },
      ],
      correct: "a",
      explanation:
        "A responsible AI evaluation specifically assesses fairness across groups and explains which features drive predictions — accuracy alone, skipping evaluation, or checking file size don't surface those issues before production promotion.",
    },
    {
      id: "ai300-023",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "Your registry has accumulated dozens of old model versions that are no longer used in production but shouldn't be permanently deleted for audit reasons. What should you do?",
      options: [
        { id: "a", text: "Archive the outdated model versions as part of lifecycle management" },
        { id: "b", text: "Permanently delete them immediately with no record" },
        { id: "c", text: "Leave them all marked as the active production version" },
        { id: "d", text: "Ignore the registry entirely going forward" },
      ],
      correct: "a",
      explanation:
        "Archiving keeps the version available for audit while removing it from active consideration — permanent deletion loses the audit trail, and leaving old versions marked active creates confusion about what's really in production.",
    },
    {
      id: "ai300-024",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "Your application needs predictions returned within milliseconds as individual requests arrive. What deployment option should you choose?",
      options: [
        { id: "a", text: "A real-time (online) inference endpoint" },
        { id: "b", text: "A batch endpoint that processes data once a day" },
        { id: "c", text: "No deployment at all — run the model manually per request" },
        { id: "d", text: "A model file emailed on request" },
      ],
      correct: "a",
      explanation:
        "A real-time endpoint is designed for low-latency, per-request inference — a batch endpoint processes large volumes on a schedule and isn't built for millisecond-level individual responses.",
    },
    {
      id: "ai300-025",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You need to score a large file of millions of records overnight, and latency for any individual record doesn't matter. What deployment option fits best?",
      options: [
        { id: "a", text: "A batch endpoint" },
        { id: "b", text: "A real-time endpoint sized for millisecond responses" },
        { id: "c", text: "Manually scoring each record one at a time in a spreadsheet" },
        { id: "d", text: "No endpoint — leave the records unscored" },
      ],
      correct: "a",
      explanation:
        "A batch endpoint is optimized for large-volume, offline scoring jobs where individual latency doesn't matter — a real-time endpoint is over-engineered (and often more costly) for this use case, and manual scoring doesn't scale to millions of records.",
    },
    {
      id: "ai300-026",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "A deployed model endpoint has started returning errors for some requests, and you need to diagnose the cause without guessing. What should you do?",
      options: [
        { id: "a", text: "Inspect the endpoint's logs and test it with representative sample requests" },
        { id: "b", text: "Immediately delete the endpoint with no investigation" },
        { id: "c", text: "Assume it will resolve itself over time" },
        { id: "d", text: "Redeploy the exact same broken version again without changes" },
      ],
      correct: "a",
      explanation:
        "Inspecting logs and testing with sample requests is the systematic way to find the root cause — deleting the endpoint, assuming it'll self-resolve, or redeploying unchanged code doesn't diagnose or fix anything.",
    },
    {
      id: "ai300-027",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You want to roll out a new model version to a small percentage of production traffic first, with the ability to revert quickly if it underperforms. What should you implement?",
      options: [
        { id: "a", text: "A progressive (canary) rollout with a safe rollback strategy" },
        { id: "b", text: "Switching 100% of traffic to the new version immediately with no fallback" },
        { id: "c", text: "Leaving the old version running with the new version never actually receiving traffic" },
        { id: "d", text: "Deleting the old version before the new one is validated" },
      ],
      correct: "a",
      explanation:
        "A canary rollout with rollback lets you validate the new version on limited traffic and revert quickly if needed — switching all traffic immediately or deleting the old version first removes your safety net if something goes wrong.",
    },
    {
      id: "ai300-028",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "Over time, the real-world input data your production model receives has started to look statistically different from its training data, and accuracy is slipping. What should you set up to catch this?",
      options: [
        { id: "a", text: "Data drift detection and analysis" },
        { id: "b", text: "A one-time check performed only before the original launch" },
        { id: "c", text: "Disabling monitoring to reduce noise" },
        { id: "d", text: "Assuming input data never changes after deployment" },
      ],
      correct: "a",
      explanation:
        "Data drift detection continuously compares production input distributions to training data, catching the kind of gradual shift described — a one-time pre-launch check or disabled monitoring would miss drift that emerges later.",
    },
    {
      id: "ai300-029",
      domain: "Implement machine learning model lifecycle and operations",
      question:
        "You want to be alerted automatically, and possibly trigger retraining, whenever a production model's accuracy drops below a defined threshold. What should you configure?",
      options: [
        { id: "a", text: "Monitoring of production performance metrics with configured retraining/alert triggers" },
        { id: "b", text: "Manually checking accuracy once a year" },
        { id: "c", text: "No monitoring, and retraining only when someone happens to complain" },
        { id: "d", text: "A fixed retraining schedule with no regard for actual performance" },
      ],
      correct: "a",
      explanation:
        "Configuring metric monitoring with threshold-based alert/retraining triggers responds automatically to actual degradation — infrequent manual checks or a fixed schedule with no performance awareness can both miss real problems or retrain unnecessarily.",
    },
    {
      id: "ai300-030",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "Your team needs an isolated project environment in Foundry for a new generative AI initiative, separate from other teams' resources. What should you create?",
      options: [
        { id: "a", text: "A dedicated Foundry project/environment for the initiative" },
        { id: "b", text: "One shared, unscoped environment used by every team for everything" },
        { id: "c", text: "No environment at all — deploy directly against production" },
        { id: "d", text: "A personal environment on one developer's laptop only" },
      ],
      correct: "a",
      explanation:
        "A dedicated Foundry project/environment isolates the initiative's resources and configuration from other teams — a single shared environment for everyone, or deploying straight to production, removes that isolation.",
    },
    {
      id: "ai300-031",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You need your deployment pipeline to authenticate to Foundry resources without embedding any credentials, while precisely scoping what actions it's allowed to perform. What should you configure?",
      options: [
        { id: "a", text: "A managed identity combined with RBAC role assignments" },
        { id: "b", text: "A shared admin password hardcoded in the pipeline" },
        { id: "c", text: "No authentication at all" },
        { id: "d", text: "One personal account's credentials shared across the whole team" },
      ],
      correct: "a",
      explanation:
        "A managed identity with RBAC lets the pipeline authenticate without stored credentials while scoping exactly what it can do — a hardcoded password or shared personal account both introduce unnecessary credential risk.",
    },
    {
      id: "ai300-032",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "Compliance requires that your Foundry resource never be reachable from the public internet. What should you configure?",
      options: [
        { id: "a", text: "Private networking (private endpoints) for the Foundry resource" },
        { id: "b", text: "A public endpoint protected only by a shared secret in a URL parameter" },
        { id: "c", text: "No network configuration at all" },
        { id: "d", text: "A firewall rule that allows every IP address" },
      ],
      correct: "a",
      explanation:
        "Private networking via private endpoints keeps traffic off the public internet entirely, which a URL-parameter secret or an allow-all firewall rule does not achieve.",
    },
    {
      id: "ai300-033",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You want your Foundry environment and its resources to be reproducible across dev, test, and production without manual reconfiguration each time. What should you use?",
      options: [
        { id: "a", text: "Bicep templates deployed via Azure CLI" },
        { id: "b", text: "Manually reconfiguring each environment by hand every time" },
        { id: "c", text: "A single environment reused for dev, test, and production simultaneously" },
        { id: "d", text: "Screenshots of the dev environment's settings" },
      ],
      correct: "a",
      explanation:
        "Bicep templates deployed via CLI make environment setup declarative and repeatable across stages — manual reconfiguration, a single shared environment, or screenshots don't give you reliable, reproducible infrastructure.",
    },
    {
      id: "ai300-034",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You want to get a foundation model into production quickly for a moderate-traffic use case without provisioning or managing dedicated compute. What deployment option fits?",
      options: [
        { id: "a", text: "A serverless API endpoint" },
        { id: "b", text: "Manually provisioning and patching dedicated GPU VMs yourself" },
        { id: "c", text: "Running the model only on a personal laptop" },
        { id: "d", text: "Skipping deployment and running the model manually per request" },
      ],
      correct: "a",
      explanation:
        "A serverless API endpoint gets a foundation model into production without you managing dedicated compute — provisioning and patching your own VMs is exactly the operational burden serverless deployment avoids.",
    },
    {
      id: "ai300-035",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You need fine-grained control over the underlying compute (instance type, scaling rules) hosting a foundation model for a specialized, high-throughput workload. What should you choose?",
      options: [
        { id: "a", text: "A managed compute deployment option" },
        { id: "b", text: "A fully serverless option with no visibility into compute" },
        { id: "c", text: "No deployment, relying only on local inference" },
        { id: "d", text: "A random, unmonitored compute tier chosen without regard to the workload" },
      ],
      correct: "a",
      explanation:
        "Managed compute gives you control over instance type and scaling behavior for demanding, specialized workloads — a fully serverless option abstracts that control away, which is the opposite of what's needed here.",
    },
    {
      id: "ai300-036",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You're choosing between several available foundation models for a customer-facing summarization feature with tight latency and cost budgets. What should drive the choice?",
      options: [
        { id: "a", text: "Matching model capability, latency, and cost characteristics to the specific use case" },
        { id: "b", text: "Always picking the single largest available model regardless of cost or latency" },
        { id: "c", text: "Picking a model at random" },
        { id: "d", text: "Choosing based solely on which model has the longest name" },
      ],
      correct: "a",
      explanation:
        "Selecting a model based on its fit to the use case's capability, latency, and cost requirements is the deliberate approach needed — always defaulting to the largest model, or choosing randomly, ignores the actual constraints of a customer-facing feature.",
    },
    {
      id: "ai300-037",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You want a new foundation model version validated before it ever serves production traffic, with a clear promotion path from testing to live. What should you implement?",
      options: [
        { id: "a", text: "A model versioning and staged production deployment strategy" },
        { id: "b", text: "Pointing production directly at whatever model version was updated most recently" },
        { id: "c", text: "Testing only in production, with no separate validation stage" },
        { id: "d", text: "Never updating the model version once deployed" },
      ],
      correct: "a",
      explanation:
        "A versioning and staged deployment strategy ensures a new model version is validated before promotion — pointing production at the newest version automatically, or testing only in production, skips that validation step.",
    },
    {
      id: "ai300-038",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "A production generative AI feature has high, steady request volume and needs predictable latency rather than variable shared-capacity performance. What should you configure?",
      options: [
        { id: "a", text: "Provisioned throughput units (PTUs) for the deployment" },
        { id: "b", text: "The cheapest possible shared-capacity tier with no guarantees" },
        { id: "c", text: "No capacity planning at all" },
        { id: "d", text: "A single request queue with unlimited wait times" },
      ],
      correct: "a",
      explanation:
        "Provisioned throughput units reserve dedicated capacity for predictable latency under steady high volume — a variable shared-capacity tier or no planning at all can't guarantee that consistency.",
    },
    {
      id: "ai300-039",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You want to release a new model version to a small slice of production traffic, watch its metrics, and only fully promote it if it performs well. What deployment approach is this?",
      options: [
        { id: "a", text: "A canary/progressive production deployment strategy" },
        { id: "b", text: "An immediate full cutover with no monitoring period" },
        { id: "c", text: "Never releasing the new version" },
        { id: "d", text: "Releasing to production with the old version fully removed beforehand" },
      ],
      correct: "a",
      explanation:
        "A canary/progressive strategy exposes the new version to limited traffic first and promotes it based on observed metrics — an immediate full cutover, or removing the fallback before validating, both remove the safety this approach provides.",
    },
    {
      id: "ai300-040",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You're iterating on a system prompt for a customer support assistant, refining it based on how the model responds to sample questions. What are you doing?",
      options: [
        { id: "a", text: "Designing and developing a prompt iteratively" },
        { id: "b", text: "Fine-tuning the model's underlying weights" },
        { id: "c", text: "Changing the model's deployment region" },
        { id: "d", text: "Reconfiguring the network security of the Foundry resource" },
      ],
      correct: "a",
      explanation:
        "Iteratively refining wording and instructions based on observed responses is prompt design/development — it doesn't change model weights, deployment region, or network configuration.",
    },
    {
      id: "ai300-041",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You have two candidate versions of a prompt and want a data-driven way to decide which produces better responses before choosing one for production. What should you do?",
      options: [
        { id: "a", text: "Create prompt variants and compare their performance systematically" },
        { id: "b", text: "Pick whichever prompt was written first, without comparison" },
        { id: "c", text: "Ask one person's opinion and treat it as final" },
        { id: "d", text: "Deploy both simultaneously to 100% of traffic with no comparison plan" },
      ],
      correct: "a",
      explanation:
        "Creating variants and systematically comparing their performance gives a data-driven basis for choosing between them — picking by order written or a single opinion isn't a rigorous comparison.",
    },
    {
      id: "ai300-042",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You need to track every change made to a production prompt over time, with the ability to see who changed what and roll back a bad edit. What should you use?",
      options: [
        { id: "a", text: "Version control for prompts in a Git repository" },
        { id: "b", text: "Editing the prompt directly in production with no history kept" },
        { id: "c", text: "Storing the current prompt only in one person's notes" },
        { id: "d", text: "Overwriting the prompt file each time with no commit history" },
      ],
      correct: "a",
      explanation:
        "Storing prompts in a Git repository gives full change history, attribution, and rollback capability — editing production directly with no history, or keeping the prompt only in someone's notes, provides none of that traceability.",
    },
    {
      id: "ai300-043",
      domain: "Design and implement a GenAIOps infrastructure",
      question:
        "You want every proposed prompt change to be automatically evaluated against a test set before it can be merged into the version-controlled prompt repository. What should you set up?",
      options: [
        { id: "a", text: "An automated evaluation step wired into the prompt's Git-based change workflow" },
        { id: "b", text: "Merging every prompt change immediately with no evaluation" },
        { id: "c", text: "Evaluating prompts only once a year, regardless of how many changes occurred" },
        { id: "d", text: "Allowing anyone to edit the production prompt directly, bypassing Git entirely" },
      ],
      correct: "a",
      explanation:
        "Wiring automated evaluation into the Git-based prompt workflow ensures every change is checked before merging — merging without evaluation, evaluating rarely, or bypassing version control entirely all remove that safety net.",
    },
    {
      id: "ai300-044",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "Before releasing a generative feature, you want a consistent set of inputs with expected/reference outputs to measure model quality against, rather than testing ad hoc. What should you create?",
      options: [
        { id: "a", text: "A test dataset with input-to-expected-output mapping for evaluation" },
        { id: "b", text: "No test dataset — rely on spot-checking a few responses informally" },
        { id: "c", text: "A dataset with inputs only, and no reference outputs at all" },
        { id: "d", text: "A dataset copied from an unrelated project with different requirements" },
      ],
      correct: "a",
      explanation:
        "A test dataset with defined input/expected-output mappings enables repeatable, objective evaluation — informal spot-checking or a dataset with no reference outputs (or from an unrelated domain) can't support consistent measurement.",
    },
    {
      id: "ai300-045",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "You need automated scores for whether generated answers are factually supported, on-topic, well-structured, and grammatically sound. Which set of metrics should you implement?",
      options: [
        { id: "a", text: "Groundedness, relevance, coherence, and fluency" },
        { id: "b", text: "Only the total number of tokens generated" },
        { id: "c", text: "Only the response's HTTP status code" },
        { id: "d", text: "Only how quickly the response was returned" },
      ],
      correct: "a",
      explanation:
        "Groundedness, relevance, coherence, and fluency together cover factual support, topical relevance, structure, and grammar — token count, status code, and latency don't measure any of those quality dimensions.",
    },
    {
      id: "ai300-046",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "You need an automated check that flags generated content containing harmful or disallowed material before it ships. What should you configure?",
      options: [
        { id: "a", text: "Risk and safety evaluations for harmful content detection" },
        { id: "b", text: "A check that only measures response length" },
        { id: "c", text: "No safety checks, since manual review will catch everything eventually" },
        { id: "d", text: "A check that only runs after the content has already been shown to users" },
      ],
      correct: "a",
      explanation:
        "Risk and safety evaluations specifically detect harmful content before release — response length isn't a safety signal, and skipping checks (or only checking after users have already seen the content) doesn't prevent harm.",
    },
    {
      id: "ai300-047",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "You want every new prompt or model change to be automatically evaluated against your quality and safety metrics, without a person remembering to run it manually each time. What should you set up?",
      options: [
        { id: "a", text: "An automated evaluation workflow using built-in and custom metrics" },
        { id: "b", text: "A manual checklist that's only followed when someone remembers to" },
        { id: "c", text: "Evaluating only the very first release, and never again" },
        { id: "d", text: "No evaluation workflow at all" },
      ],
      correct: "a",
      explanation:
        "An automated evaluation workflow runs consistently on every change without depending on someone remembering to trigger it manually — a manual checklist or a one-time-only evaluation leaves later changes unchecked.",
    },
    {
      id: "ai300-048",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "You need ongoing visibility into how a deployed generative application is behaving in production, not just a one-time pre-launch check. What should you implement?",
      options: [
        { id: "a", text: "Continuous monitoring within Foundry" },
        { id: "b", text: "A single evaluation run before launch, with nothing afterward" },
        { id: "c", text: "Disabling monitoring once the app is stable" },
        { id: "d", text: "Checking on the app only when a user happens to complain" },
      ],
      correct: "a",
      explanation:
        "Continuous monitoring gives ongoing visibility into production behavior over time — a one-time pre-launch check, disabling monitoring once stable, or waiting for user complaints all miss issues that emerge later.",
    },
    {
      id: "ai300-049",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "Users report that responses feel slower than usual, and you need concrete numbers on latency, throughput, and response times for the production endpoint. What should you monitor?",
      options: [
        { id: "a", text: "Performance metrics: latency, throughput, and response times" },
        { id: "b", text: "Only the number of registered users, unrelated to actual performance" },
        { id: "c", text: "Only the color scheme of the client application" },
        { id: "d", text: "Nothing, since user reports are unreliable and should be ignored" },
      ],
      correct: "a",
      explanation:
        "Monitoring latency, throughput, and response times gives concrete, measurable data on the reported slowness — user count or UI color have no bearing on performance, and ignoring user reports discards a useful early signal.",
    },
    {
      id: "ai300-050",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "Finance wants to know how much of your generative app's cost is driven by token usage versus underlying compute/resource usage. What should you track?",
      options: [
        { id: "a", text: "Cost metrics covering token consumption and resource usage" },
        { id: "b", text: "Only the number of files in your source repository" },
        { id: "c", text: "Only the length of the system prompt, without measuring actual usage" },
        { id: "d", text: "Nothing — cost tracking isn't possible for generative AI workloads" },
      ],
      correct: "a",
      explanation:
        "Tracking token consumption alongside resource usage gives finance the actual cost drivers they're asking about — repository file counts or prompt length alone don't reflect real usage-based cost.",
    },
    {
      id: "ai300-051",
      domain: "Implement generative AI quality assurance and observability",
      question:
        "A production issue is hard to reproduce, and you need detailed request/response and internal-step visibility to debug it after the fact. What should you have configured in advance?",
      options: [
        { id: "a", text: "Detailed logging, tracing, and debugging capabilities" },
        { id: "b", text: "No logging at all, to keep storage costs at zero" },
        { id: "c", text: "Logging only successful requests, never failures" },
        { id: "d", text: "Deleting logs immediately after each request completes" },
      ],
      correct: "a",
      explanation:
        "Detailed logging and tracing configured in advance gives you the historical detail needed to debug hard-to-reproduce issues after the fact — no logging, logging only successes, or deleting logs immediately all leave you with nothing to investigate.",
    },
    {
      id: "ai300-052",
      domain: "Optimize generative AI systems and model performance",
      question:
        "Your RAG system retrieves chunks so large that irrelevant content dilutes the context sent to the model, hurting answer quality. What should you tune?",
      options: [
        { id: "a", text: "The chunk size used when splitting and indexing documents" },
        { id: "b", text: "The name of the search index" },
        { id: "c", text: "The color scheme of the front-end application" },
        { id: "d", text: "The number of registered users" },
      ],
      correct: "a",
      explanation:
        "Chunk size directly controls how much (and how focused) content is packed into each retrieved passage — index naming, UI color, and user counts have no effect on retrieval quality.",
    },
    {
      id: "ai300-053",
      domain: "Optimize generative AI systems and model performance",
      question:
        "Your retrieval step is returning many loosely related passages alongside the truly relevant ones, adding noise to the prompt. What should you adjust?",
      options: [
        { id: "a", text: "The similarity threshold used to decide which retrieved passages are included" },
        { id: "b", text: "The database's backup schedule" },
        { id: "c", text: "The client application's font" },
        { id: "d", text: "The number of available compute regions" },
      ],
      correct: "a",
      explanation:
        "Tightening the similarity threshold filters out loosely related passages before they reach the prompt, directly reducing noise — backup schedules, fonts, and region counts don't affect which passages get included.",
    },
    {
      id: "ai300-054",
      domain: "Optimize generative AI systems and model performance",
      question:
        "Your RAG system's generic embedding model performs poorly on highly domain-specific terminology in your industry. What should you do?",
      options: [
        { id: "a", text: "Select or fine-tune a domain-specific embedding model" },
        { id: "b", text: "Switch to a keyword-only search with no embeddings at all" },
        { id: "c", text: "Ignore the accuracy gap since embeddings can't be improved" },
        { id: "d", text: "Increase the chatbot's response length instead" },
      ],
      correct: "a",
      explanation:
        "Selecting or fine-tuning an embedding model for your domain improves how well it captures domain-specific terminology and meaning — dropping embeddings entirely or just making responses longer doesn't address the underlying retrieval accuracy problem.",
    },
    {
      id: "ai300-055",
      domain: "Optimize generative AI systems and model performance",
      question:
        "Pure vector search sometimes misses documents that use the user's exact keywords but phrase concepts differently, while pure keyword search misses semantically similar content. What should you implement?",
      options: [
        { id: "a", text: "A hybrid search approach combining semantic and keyword-based retrieval" },
        { id: "b", text: "Keyword search only, dropping semantic search entirely" },
        { id: "c", text: "Semantic search only, dropping keyword search entirely" },
        { id: "d", text: "No retrieval at all, relying purely on the model's built-in knowledge" },
      ],
      correct: "a",
      explanation:
        "Hybrid search combines both approaches so you catch exact-term matches and semantically similar content together — dropping either method alone reintroduces the exact gap described, and skipping retrieval entirely abandons grounding altogether.",
    },
    {
      id: "ai300-056",
      domain: "Optimize generative AI systems and model performance",
      question:
        "You've made several changes to your RAG pipeline and need objective evidence of whether retrieval and answer quality actually improved, not just a gut feeling. What should you do?",
      options: [
        { id: "a", text: "Evaluate using relevance metrics and an A/B testing framework" },
        { id: "b", text: "Assume the changes helped because they seemed reasonable" },
        { id: "c", text: "Ask a single user for their opinion and treat it as conclusive" },
        { id: "d", text: "Skip evaluation to save time before the next release" },
      ],
      correct: "a",
      explanation:
        "Relevance metrics combined with A/B testing give objective, comparative evidence of whether a change actually improved quality — assuming, relying on one opinion, or skipping evaluation entirely leaves the question unanswered.",
    },
    {
      id: "ai300-057",
      domain: "Optimize generative AI systems and model performance",
      question:
        "You need to adapt a foundation model to a specialized task efficiently, without the cost of retraining all of its parameters from scratch. What technique fits?",
      options: [
        { id: "a", text: "An advanced, parameter-efficient fine-tuning method (such as LoRA/PEFT)" },
        { id: "b", text: "Retraining every parameter of the model from a random initialization" },
        { id: "c", text: "Making no changes to the model at all" },
        { id: "d", text: "Only changing the deployment region" },
      ],
      correct: "a",
      explanation:
        "Parameter-efficient fine-tuning methods like LoRA adapt a model to a specialized task at a fraction of the cost of full retraining — retraining from scratch is far more expensive, and region changes or no changes don't adapt the model at all.",
    },
    {
      id: "ai300-058",
      domain: "Optimize generative AI systems and model performance",
      question:
        "You want to fine-tune a model for a niche task but don't have enough real labeled examples to do so effectively. What should you consider?",
      options: [
        { id: "a", text: "Creating and managing synthetic data to supplement fine-tuning" },
        { id: "b", text: "Fine-tuning with zero examples of any kind" },
        { id: "c", text: "Using completely unrelated data from a different domain" },
        { id: "d", text: "Abandoning fine-tuning permanently with no alternative considered" },
      ],
      correct: "a",
      explanation:
        "Generating and managing synthetic data can fill the gap when real labeled examples are scarce, supporting effective fine-tuning — using zero examples or unrelated data would actively hurt the fine-tuned model's quality.",
    },
    {
      id: "ai300-059",
      domain: "Optimize generative AI systems and model performance",
      question:
        "After fine-tuning and deploying a model, you need to keep checking that it continues to meet quality expectations as real usage patterns evolve. What should you do?",
      options: [
        { id: "a", text: "Monitor and optimize the fine-tuned model's performance over time" },
        { id: "b", text: "Consider the job done immediately after deployment, with no follow-up" },
        { id: "c", text: "Only check performance once, a year after deployment" },
        { id: "d", text: "Assume fine-tuned models never need re-evaluation" },
      ],
      correct: "a",
      explanation:
        "Ongoing monitoring and optimization catches quality regressions as real-world usage evolves after fine-tuning — treating deployment as the finish line, or checking only rarely, misses drift that happens in between.",
    },
    {
      id: "ai300-060",
      domain: "Optimize generative AI systems and model performance",
      question:
        "You need a clear, repeatable process for moving a fine-tuned model from initial development through validation and into production, with accountability at each stage. What should you establish?",
      options: [
        { id: "a", text: "A managed lifecycle for the fine-tuned model spanning development through production deployment" },
        { id: "b", text: "Pushing directly from a developer's notebook straight to production with no stages" },
        { id: "c", text: "No defined process, deciding case by case with no consistency" },
        { id: "d", text: "Skipping validation entirely to save time" },
      ],
      correct: "a",
      explanation:
        "A managed lifecycle with defined stages from development through production gives structure and accountability to the fine-tuned model's journey — pushing straight from a notebook to production, or skipping validation, removes exactly the safeguards that process provides.",
    },
  ],
};
