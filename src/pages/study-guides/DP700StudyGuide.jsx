import { Head as Helmet } from "vite-react-ssg";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, BookOpen, Database, Shield, Activity } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { EXAM_META, SLUG_TO_EXAM } from "../../lib/questionBank.jsx";
import { Footer } from "../../components/Shared.jsx";

// DP-700 Exam Topics based on Skills Measured
export const DP700_TOPICS = [
  {
    id: "ingestion",
    title: "Ingest and Transform Data",
    description: "Implement data ingestion pipelines, transformations, and data movement using Microsoft Fabric",
    icon: Database,
    weight: "40-45%",
    sections: [
      {
        title: "Data Ingestion",
        content: `Microsoft Fabric provides multiple ways to ingest data into Lakehouses and Warehouses:

**Copy Jobs**
- Use COPY INTO statements for bulk loading from Azure Data Lake Storage
- Support for Parquet, CSV, JSON, and Delta formats
- Configurable error handling and file pattern matching

**Pipelines**
- Data Factory pipelines for orchestrated data movement
- Support for 100+ connectors (SQL Server, Salesforce, REST APIs, etc.)
- Parameterized pipelines for reusable patterns
- Scheduling and monitoring capabilities

**Shortcuts**
- OneLake shortcuts for zero-copy data access
- Link external storage without data duplication
- Support for ADLS Gen2, S3, and Dataverse shortcuts

**Dataflows Gen2**
- Power Query Online for visual data transformation
- M language for complex transformations
- Incremental refresh for large datasets`,
      },
      {
        title: "Data Transformation",
        content: `Transform data using Spark, SQL, or visual tools:

**Spark/PySpark**
- Notebooks for interactive development
- Spark Job Definitions for production workloads
- Delta Lake operations (OPTIMIZE, VACUUM, Z-ORDER)
- Structured Streaming for real-time processing

**T-SQL in Warehouse**
- Stored procedures for complex transformations
- CTAS (CREATE TABLE AS SELECT) patterns
- MERGE statements for upsert operations
- Materialized views for query acceleration

** medallion Architecture**
- Bronze: Raw ingestion layer
- Silver: Cleansed and conformed data
- Gold: Business-ready aggregated data`,
      },
      {
        title: "Data Movement Patterns",
        content: `Common patterns for moving data within Fabric:

**Lakehouse Federation**
- Query across multiple lakehouses without copying data
- Use shortcuts to create logical data marts

**Cross-workspace Sharing**
- Share lakehouses across workspaces
- Manage permissions at item level

**Delta Lake Operations**
- Time travel with version history
- Optimize file sizes with OPTIMIZE
- Remove old versions with VACUUM
- Improve query performance with Z-ORDER`,
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitor and Maintain Data",
    description: "Monitor pipeline runs, optimize performance, and maintain data quality",
    icon: Activity,
    weight: "30-35%",
    sections: [
      {
        title: "Pipeline Monitoring",
        content: `Monitor and troubleshoot data pipelines:

**Pipeline Monitoring Hub**
- View all pipeline runs across workspaces
- Filter by status, date range, and pipeline name
- Drill into run details and error messages

**Logging and Diagnostics**
- Enable diagnostic settings for detailed logs
- Send logs to Log Analytics or Event Hub
- Query logs using KQL

**Alerts and Notifications**
- Set up alerts for pipeline failures
- Configure email/Teams notifications
- Use Fabric Activator for business rule-based alerts`,
      },
      {
        title: "Performance Optimization",
        content: `Optimize query and pipeline performance:

**Spark Optimization**
- Configure cluster sizes based on workload
- Use adaptive query execution
- Cache frequently accessed DataFrames
- Optimize partition sizes (128MB-1GB recommended)

**SQL Endpoint Optimization**
- Create appropriate indexes
- Use statistics for query optimization
- Partition large tables
- Materialized views for repeated queries

**Lakehouse Optimization**
- OPTIMIZE tables regularly
- VACUUM old snapshots
- Use Z-ORDER for frequently filtered columns
- Monitor table sizes and file counts`,
      },
      {
        title: "Data Quality",
        content: `Implement data quality checks:

**Great Expectations Integration**
- Define expectations for data validation
- Run validation checks in notebooks
- Generate data quality reports

**Data Profiling**
- Use built-in data profiling in Lakehouse explorer
- Identify nulls, uniqueness, and distributions

**Lineage Tracking**
- View end-to-end data lineage
- Impact analysis for changes
- Column-level lineage in notebooks`,
      },
    ],
  },
  {
    id: "security",
    title: "Secure Data",
    description: "Implement security controls, access management, and compliance",
    icon: Shield,
    weight: "25-30%",
    sections: [
      {
        title: "Access Control",
        content: `Manage access to data and resources:

**Workspace Permissions**
- Admin, Member, Contributor, Viewer roles
- Item-level permissions (Read, Reshare, Build)
- Share individual items without workspace access

**Lakehouse Security**
- SQL endpoint security with T-SQL GRANT statements
- Row-level security (RLS) for fine-grained access
- Column-level security for sensitive data

**OneLake Security**
- Inherits workspace permissions
- Support for ACLs at folder/file level
- Integration with Microsoft Entra ID`,
      },
      {
        title: "Data Protection",
        content: `Protect sensitive data:

**Microsoft Purview Integration**
- Sensitivity labels for classification
- Label inheritance across Fabric items
- Protection policies for export control

**Encryption**
- Data encrypted at rest by default
- Customer-managed keys (CMK) support
- Encryption in transit (TLS 1.2+)

**Private Connectivity**
- Managed private endpoints
- VNet integration for secure access
- Private Link for secure connectivity`,
      },
      {
        title: "Compliance and Auditing",
        content: `Meet compliance requirements:

**Audit Logging**
- Track user activities across Fabric
- Export audit logs for analysis
- Retention policies for audit data

**Data Residency**
- Choose region for data storage
- Understand data movement boundaries

**Certifications**
- SOC 2, ISO 27001, HIPAA BAA, GDPR compliance
- Review compliance documentation for requirements`,
      },
    ],
  },
];

export function DP700StudyGuide() {
  const { topicId } = useParams();
  const { theme } = useOutletContext();
  const TOKENS = useTheme();

  const topic = DP700_TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return <Navigate to="/study-guides/dp-700" replace />;
  }

  const Icon = topic.icon;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{topic.title} | DP-700 Study Guide | FabricPrep</title>
        <link rel="canonical" href={`https://fabricprep.com/study-guides/dp-700/${topicId}`} />
        <meta
          name="description"
          content={`Study guide for ${topic.title} - DP-700 Microsoft Fabric Data Engineer Associate exam. Covers ${topic.weight} of the exam.`}
        />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <Link to="/study-guides" style={{ color: TOKENS.inkMuted }}>Study Guides</Link>
          <span>/</span>
          <Link to="/study-guides/dp-700" style={{ color: TOKENS.inkMuted }}>DP-700</Link>
          <span>/</span>
          <span style={{ color: TOKENS.ink }}>{topic.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${TOKENS.azure}20` }}
          >
            <Icon size={24} color={TOKENS.azure} />
          </div>
          <div>
            <div
              className="text-xs uppercase mb-1 px-2 py-0.5 rounded-full inline-block"
              style={{ color: TOKENS.azure, letterSpacing: "0.1em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
            >
              {topic.weight} of exam
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {topic.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: TOKENS.inkMuted }}>
              {topic.description}
            </p>
          </div>
        </div>

        {/* Topic Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DP700_TOPICS.map((t) => {
            const TopicIcon = t.icon;
            const isActive = t.id === topicId;
            return (
              <Link
                key={t.id}
                to={`/study-guides/dp-700/${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: isActive ? TOKENS.azure : TOKENS.panel,
                  color: isActive ? TOKENS.bg : TOKENS.ink,
                  border: `1px solid ${isActive ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                <TopicIcon size={14} />
                {t.title}
              </Link>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-6">
          {topic.sections.map((section, index) => (
            <div
              key={section.title}
              className="rounded-xl p-5 sm:p-6"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <h2 className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                {section.title}
              </h2>
              <div className="prose prose-sm max-w-none" style={{ color: TOKENS.inkMuted }}>
                {section.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    // Subheading
                    return (
                      <h3 key={i} className="text-sm font-semibold mt-4 mb-2" style={{ color: TOKENS.ink }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    // List
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 my-2">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j}>{item.replace('- ', '').replace(/\*\*/g, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Regular paragraph
                  return (
                    <p key={i} className="mb-3 leading-relaxed">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
          <Link
            to="/study-guides/dp-700"
            className="flex items-center gap-1 text-sm"
            style={{ color: TOKENS.inkMuted }}
          >
            <ChevronLeft size={16} />
            Back to DP-700 Overview
          </Link>
          <Link
            to={`/${EXAM_META['DP-700'].slug}`}
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg"
            style={{ background: TOKENS.azure, color: TOKENS.bg }}
          >
            <BookOpen size={16} />
            Practice Questions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Import OutletContext
import { useOutletContext } from "react-router-dom";
import { Navigate } from "react-router-dom";
