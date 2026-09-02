export const PL_300 = {
  "label": "Power BI Data Analyst Associate",
  "questions": [
    {
      "id": "pl300-1",
      "domain": "Prepare the data",
      "question": "You need near-Import query performance in a Power BI report while reading data directly from OneLake without a separate import step. Which storage mode should you choose?",
      "options": [
        {
          "id": "a",
          "text": "Direct Lake"
        },
        {
          "id": "b",
          "text": "DirectQuery"
        },
        {
          "id": "c",
          "text": "Import"
        },
        {
          "id": "d",
          "text": "Live Connection to Analysis Services"
        }
      ],
      "correct": "a",
      "explanation": "Direct Lake reads Delta tables from OneLake directly, giving near-Import performance without requiring a separate data import step, unlike DirectQuery which queries the source live."
    },
	
	
	
	
	// PL-300 — 20 new questions (pl300-53 through pl300-72)
// Paste this block into src/lib/questionBank/pl300.js
// Insert it right BEFORE the closing "  ]\n};" at the end of the file
// (i.e., right after the pl300-52 question object, adding a comma after that object's closing "}")

    {
      "id": "pl300-53",
      "domain": "Prepare the data",
      "question": "In Power Query, each transformation you apply (filter rows, change type, split column) is recorded as a discrete, reorderable, and editable item. What are these called?",
      "options": [
        { "id": "a", "text": "Applied steps" },
        { "id": "b", "text": "Measures" },
        { "id": "c", "text": "Relationships" },
        { "id": "d", "text": "Bookmarks" }
      ],
      "correct": "a",
      "explanation": "Applied steps in Power Query represent each transformation in sequence, and because they're recorded individually, you can reorder, edit, or remove them, with the underlying M code updating automatically."
    },
    {
      "id": "pl300-54",
      "domain": "Prepare the data",
      "question": "You try to combine data from two sources in Power Query, but the merge fails with a formula.firewall error. What is the most likely cause?",
      "options": [
        { "id": "a", "text": "The sources have conflicting privacy levels (e.g., one Private, one Public) that prevent data from being sent between them" },
        { "id": "b", "text": "One of the tables has too many columns" },
        { "id": "c", "text": "The report has not been published yet" },
        { "id": "d", "text": "DAX measures haven't been created for either table" }
      ],
      "correct": "a",
      "explanation": "Power Query's privacy levels (Public, Organizational, Private) control whether data can be combined between sources; conflicting privacy levels can trigger the formula firewall and block the operation to prevent unintended data leakage."
    },
    {
      "id": "pl300-55",
      "domain": "Model the data",
      "question": "A data model has one central fact table connected directly to several dimension tables, each of which is a single flat table with no further branching. What is this modeling pattern called?",
      "options": [
        { "id": "a", "text": "A star schema" },
        { "id": "b", "text": "A snowflake schema" },
        { "id": "c", "text": "A many-to-many schema" },
        { "id": "d", "text": "A composite model" }
      ],
      "correct": "a",
      "explanation": "A star schema has a central fact table connected directly to flat, denormalized dimension tables, forming a shape like a star, in contrast to a snowflake schema where dimensions are further normalized into sub-tables."
    },
    {
      "id": "pl300-56",
      "domain": "Model the data",
      "question": "A single row in a Customers table can relate to many rows in a Sales table, but each Sales row relates to only one customer. What relationship cardinality does this describe, from Customers to Sales?",
      "options": [
        { "id": "a", "text": "One-to-many" },
        { "id": "b", "text": "Many-to-many" },
        { "id": "c", "text": "One-to-one" },
        { "id": "d", "text": "Many-to-one, from Customers' perspective" }
      ],
      "correct": "a",
      "explanation": "A one-to-many relationship means one row on the 'one' side (Customers) can relate to many rows on the 'many' side (Sales), which is the most common and recommended relationship type in Power BI models."
    },
    {
      "id": "pl300-57",
      "domain": "Model the data",
      "question": "Which statement correctly distinguishes a calculated column from a measure in Power BI?",
      "options": [
        { "id": "a", "text": "A calculated column is computed row-by-row and stored in the model, while a measure is calculated dynamically at query time based on the current filter context" },
        { "id": "b", "text": "A measure is stored in the model and takes up storage space per row, while a calculated column is computed only when a visual requests it" },
        { "id": "c", "text": "Calculated columns and measures are functionally identical in every way" },
        { "id": "d", "text": "Measures cannot use DAX, only calculated columns can" }
      ],
      "correct": "a",
      "explanation": "Calculated columns evaluate DAX for each row and are materialized (stored) in the model, increasing its size, whereas measures are calculated on the fly at query time using the current filter and row context, without being stored per row."
    },
    {
      "id": "pl300-58",
      "domain": "Model the data",
      "question": "You write a DAX measure using CALCULATE to override the report's existing Year filter and always show sales for 2023 regardless of what year slicer value is selected. What is this technique called?",
      "options": [
        { "id": "a", "text": "Modifying filter context" },
        { "id": "b", "text": "Creating a calculated column" },
        { "id": "c", "text": "Defining a relationship" },
        { "id": "d", "text": "Applying row-level security" }
      ],
      "correct": "a",
      "explanation": "CALCULATE lets you modify the filter context that a DAX expression is evaluated in, such as overriding an existing filter (like the selected year) with a new one you specify directly in the formula."
    },
    {
      "id": "pl300-59",
      "domain": "Model the data",
      "question": "Which DAX time intelligence function returns the value of a measure evaluated for the same period one year earlier, useful for year-over-year comparisons?",
      "options": [
        { "id": "a", "text": "SAMEPERIODLASTYEAR" },
        { "id": "b", "text": "RELATED" },
        { "id": "c", "text": "ALLEXCEPT" },
        { "id": "d", "text": "SUMMARIZE" }
      ],
      "correct": "a",
      "explanation": "SAMEPERIODLASTYEAR shifts the current filter context on a date column back by one year, making it a common building block for year-over-year comparison measures."
    },
    {
      "id": "pl300-60",
      "domain": "Model the data",
      "question": "When a DAX measure iterates row-by-row inside a function like SUMX, evaluating an expression for each individual row before aggregating, what is that per-row evaluation environment called?",
      "options": [
        { "id": "a", "text": "Row context" },
        { "id": "b", "text": "Filter context" },
        { "id": "c", "text": "Query context" },
        { "id": "d", "text": "Visual context" }
      ],
      "correct": "a",
      "explanation": "Row context is the evaluation environment that exists when DAX processes one row at a time, such as inside iterator functions like SUMX, as distinct from filter context which comes from slicers, filters, and visuals."
    },
    {
      "id": "pl300-61",
      "domain": "Model the data",
      "question": "A model combines an Import-mode table (fast, cached) with a DirectQuery table (always live against the source) in the same data model. What is this combination called?",
      "options": [
        { "id": "a", "text": "A composite model" },
        { "id": "b", "text": "A snowflake schema" },
        { "id": "c", "text": "Row-level security" },
        { "id": "d", "text": "A paginated report" }
      ],
      "correct": "a",
      "explanation": "A composite model mixes storage modes, such as Import and DirectQuery tables, within a single Power BI data model, letting you balance performance and data freshness across different tables."
    },
    {
      "id": "pl300-62",
      "domain": "Model the data",
      "question": "You want users to be able to drill from Year down to Quarter down to Month down to Day on a single visual axis, using one field well entry. What model feature should you create?",
      "options": [
        { "id": "a", "text": "A hierarchy (e.g., a date hierarchy)" },
        { "id": "b", "text": "A calculated table" },
        { "id": "c", "text": "A many-to-many relationship" },
        { "id": "d", "text": "A row-level security role" }
      ],
      "correct": "a",
      "explanation": "A hierarchy groups related fields (like Year, Quarter, Month, Day) into a single drillable structure, letting users navigate between levels of detail directly within a visual."
    },
    {
      "id": "pl300-63",
      "domain": "Visualize and analyze the data",
      "question": "A user right-clicks a data point in a summary chart and navigates to a detailed page filtered to just that context, such as clicking a region to see that region's individual transactions. What report feature enables this?",
      "options": [
        { "id": "a", "text": "A drillthrough page" },
        { "id": "b", "text": "A bookmark" },
        { "id": "c", "text": "A slicer" },
        { "id": "d", "text": "A calculated column" }
      ],
      "correct": "a",
      "explanation": "Drillthrough pages let users right-click a data point in one report page to navigate to a detail page that's automatically filtered to the context of what they clicked."
    },
    {
      "id": "pl300-64",
      "domain": "Visualize and analyze the data",
      "question": "A report author wants to save the current state of filters, slicers, and visual visibility so a button can restore that exact view later, for guided data storytelling. Which feature should they use?",
      "options": [
        { "id": "a", "text": "Bookmarks" },
        { "id": "b", "text": "Row-level security roles" },
        { "id": "c", "text": "A composite model" },
        { "id": "d", "text": "A calculated table" }
      ],
      "correct": "a",
      "explanation": "Bookmarks capture the current state of a report page, including filters, slicer selections, and visual visibility, so that state can be restored later, commonly used to build guided, story-like navigation."
    },
    {
      "id": "pl300-65",
      "domain": "Visualize and analyze the data",
      "question": "A business user wants to type a plain-language question like 'total sales by region last quarter' directly into a report and get an automatically generated visual as the answer. Which Power BI feature supports this?",
      "options": [
        { "id": "a", "text": "The Q&A visual" },
        { "id": "b", "text": "A paginated report" },
        { "id": "c", "text": "A DAX measure" },
        { "id": "d", "text": "A gateway" }
      ],
      "correct": "a",
      "explanation": "The Q&A visual uses natural language processing to interpret a typed question and automatically generate an appropriate visualization as the answer, without the user needing to build a chart manually."
    },
    {
      "id": "pl300-66",
      "domain": "Visualize and analyze the data",
      "question": "In a matrix visual, you want cells with sales values above target to automatically appear in green and cells below target to appear in red, without manually coloring each cell. Which feature should you configure?",
      "options": [
        { "id": "a", "text": "Conditional formatting" },
        { "id": "b", "text": "A bookmark" },
        { "id": "c", "text": "A drillthrough filter" },
        { "id": "d", "text": "A calculated column with fixed colors typed in" }
      ],
      "correct": "a",
      "explanation": "Conditional formatting lets you apply rules or DAX-based color scales to a visual's cells, backgrounds, or data bars automatically based on the underlying values, such as highlighting values above or below a target."
    },
    {
      "id": "pl300-67",
      "domain": "Visualize and analyze the data",
      "question": "When a user hovers over a data point, you want a mini report page with extra measures and a small chart to appear instead of the default single-value tooltip. What should you configure?",
      "options": [
        { "id": "a", "text": "A custom (report page) tooltip" },
        { "id": "b", "text": "A drillthrough page" },
        { "id": "c", "text": "A bookmark group" },
        { "id": "d", "text": "A calculated table" }
      ],
      "correct": "a",
      "explanation": "Custom (report page) tooltips let you design a dedicated small report page containing multiple visuals and measures, which then displays as a rich tooltip when a user hovers over a data point."
    },
    {
      "id": "pl300-68",
      "domain": "Visualize and analyze the data",
      "question": "An analyst wants an AI-driven visual that automatically identifies the key drivers behind an increase in a metric, letting users expand branches to see which categories contribute most. Which visual should they use?",
      "options": [
        { "id": "a", "text": "The decomposition tree visual" },
        { "id": "b", "text": "A basic bar chart" },
        { "id": "c", "text": "A card visual" },
        { "id": "d", "text": "A slicer" }
      ],
      "correct": "a",
      "explanation": "The decomposition tree is an AI visual designed for root-cause and ad hoc exploration, letting users drill into a metric across multiple dimensions or use AI to automatically find the highest or lowest contributing values."
    },
    {
      "id": "pl300-69",
      "domain": "Manage and secure Power BI",
      "question": "A workspace member should be able to publish reports and edit content, but must not be allowed to add or remove other members from the workspace. Which workspace role fits?",
      "options": [
        { "id": "a", "text": "Contributor" },
        { "id": "b", "text": "Admin" },
        { "id": "c", "text": "Viewer" },
        { "id": "d", "text": "Member (with full admin rights)" }
      ],
      "correct": "a",
      "explanation": "The Contributor role allows publishing and editing content within a workspace but does not grant permission to manage workspace access or membership, which is reserved for Admin (and, for member management, the Member role)."
    },
    {
      "id": "pl300-70",
      "domain": "Manage and secure Power BI",
      "question": "An organization wants content to move through Dev, Test, and Production stages with controlled promotion and the ability to compare versions, rather than manually republishing to different workspaces. Which feature should they use?",
      "options": [
        { "id": "a", "text": "Deployment pipelines" },
        { "id": "b", "text": "Row-level security roles" },
        { "id": "c", "text": "A composite model" },
        { "id": "d", "text": "A drillthrough page" }
      ],
      "correct": "a",
      "explanation": "Deployment pipelines let organizations manage content through distinct Dev, Test, and Production stages, with the ability to compare stages and promote content in a controlled, repeatable way."
    },
    {
      "id": "pl300-71",
      "domain": "Manage and secure Power BI",
      "question": "A report contains highly confidential financial data, and the organization wants a visible classification tag applied to it that also integrates with Microsoft Purview data protection policies. What should be applied?",
      "options": [
        { "id": "a", "text": "A sensitivity label" },
        { "id": "b", "text": "A bookmark" },
        { "id": "c", "text": "A calculated column" },
        { "id": "d", "text": "A gateway" }
      ],
      "correct": "a",
      "explanation": "Sensitivity labels classify and protect content based on its confidentiality level, integrating with Microsoft Purview information protection to enforce policies like encryption or access restrictions."
    },
    {
      "id": "pl300-72",
      "domain": "Manage and secure Power BI",
      "question": "A dataset has been reviewed and approved by the organization's data governance team as an authoritative, trusted source for others to build reports on. Which action reflects this status in Power BI?",
      "options": [
        { "id": "a", "text": "Marking the dataset as Certified" },
        { "id": "b", "text": "Applying a resource lock to the dataset" },
        { "id": "c", "text": "Setting the dataset's storage mode to DirectQuery" },
        { "id": "d", "text": "Deleting all existing relationships in the dataset" }
      ],
      "correct": "a",
      "explanation": "Certification is an endorsement level (above Promoted) typically granted by a governance team, signaling to the organization that a dataset is a trusted, high-quality, authoritative source for building further content."
    },
    {
      "id": "pl300-2",
      "domain": "Prepare the data",
      "question": "A Power Query step lets a user supply a value (like a year or a folder path) at refresh time to control what data loads. What should you create?",
      "options": [
        {
          "id": "a",
          "text": "A parameter"
        },
        {
          "id": "b",
          "text": "A calculated column"
        },
        {
          "id": "c",
          "text": "A relationship"
        },
        {
          "id": "d",
          "text": "A bookmark"
        }
      ],
      "correct": "a",
      "explanation": "Parameters in Power Query let users or administrators supply a configurable value that controls query behavior, such as which year or path to load data from."
    },
    {
      "id": "pl300-3",
      "domain": "Prepare the data",
      "question": "A column you're loading contains an unexpectedly high proportion of null values. Which Power Query feature helps you spot this quickly during data preparation?",
      "options": [
        {
          "id": "a",
          "text": "Column quality and column distribution statistics"
        },
        {
          "id": "b",
          "text": "A calculated table"
        },
        {
          "id": "c",
          "text": "A calculation group"
        },
        {
          "id": "d",
          "text": "A bookmark"
        }
      ],
      "correct": "a",
      "explanation": "Power Query's column quality, distribution, and profile statistics surface issues like null percentages, error counts, and value distribution directly in the query editor."
    },
    {
      "id": "pl300-4",
      "domain": "Prepare the data",
      "question": "You need to convert a column of text dates like '2026-01-15' into an actual Date type before building relationships on it. What should you do?",
      "options": [
        {
          "id": "a",
          "text": "Change the column's data type to Date"
        },
        {
          "id": "b",
          "text": "Create a calculation group"
        },
        {
          "id": "c",
          "text": "Enable row-level security"
        },
        {
          "id": "d",
          "text": "Configure a stored access policy"
        }
      ],
      "correct": "a",
      "explanation": "Selecting the appropriate column data type — here, Date — ensures the column behaves correctly for sorting, filtering, and relationships in the model."
    },
    {
      "id": "pl300-5",
      "domain": "Prepare the data",
      "question": "You want to summarize daily transaction rows into monthly totals per product before loading into the model, to reduce data volume. What Power Query operation achieves this?",
      "options": [
        {
          "id": "a",
          "text": "Group and aggregate rows"
        },
        {
          "id": "b",
          "text": "Merge queries"
        },
        {
          "id": "c",
          "text": "Pivot columns"
        },
        {
          "id": "d",
          "text": "Duplicate a query"
        }
      ],
      "correct": "a",
      "explanation": "Grouping and aggregating rows reduces granularity by summarizing values — like summing daily transactions into monthly totals — before the data reaches the model."
    },
    {
      "id": "pl300-6",
      "domain": "Prepare the data",
      "question": "A source table has one row per customer, with separate columns for Jan, Feb, and Mar sales. You want one row per customer per month instead. What should you do?",
      "options": [
        {
          "id": "a",
          "text": "Unpivot the month columns"
        },
        {
          "id": "b",
          "text": "Pivot the table"
        },
        {
          "id": "c",
          "text": "Merge two queries"
        },
        {
          "id": "d",
          "text": "Reference the query"
        }
      ],
      "correct": "a",
      "explanation": "Unpivoting converts columns (like Jan, Feb, Mar) into rows, transforming wide data into the long/tall format typically needed for proper data modeling."
    },
    {
      "id": "pl300-7",
      "domain": "Prepare the data",
      "question": "You want a downstream query to reuse the transformation steps of an existing query, but as an independent copy that can be modified separately. What should you use?",
      "options": [
        {
          "id": "a",
          "text": "Duplicate the query"
        },
        {
          "id": "b",
          "text": "Reference the query"
        },
        {
          "id": "c",
          "text": "Merge the query"
        },
        {
          "id": "d",
          "text": "Append the query"
        }
      ],
      "correct": "a",
      "explanation": "Duplicating a query creates an independent copy including all steps, which can then be modified without affecting the original — unlike referencing, which stays linked to the source query's steps."
    },
    {
      "id": "pl300-8",
      "domain": "Prepare the data",
      "question": "You want a new query that starts from the output of an existing query, so future changes to the original automatically flow through. What should you use?",
      "options": [
        {
          "id": "a",
          "text": "Reference the query"
        },
        {
          "id": "b",
          "text": "Duplicate the query"
        },
        {
          "id": "c",
          "text": "Merge the query"
        },
        {
          "id": "d",
          "text": "Change the column data type"
        }
      ],
      "correct": "a",
      "explanation": "Referencing a query builds a new query on top of the original's output, so any upstream changes to the referenced query automatically propagate downstream."
    },
    {
      "id": "pl300-9",
      "domain": "Prepare the data",
      "question": "You have two queries — Orders and Customers — and need to combine columns from both based on a shared CustomerID. What operation should you use?",
      "options": [
        {
          "id": "a",
          "text": "Merge queries"
        },
        {
          "id": "b",
          "text": "Append queries"
        },
        {
          "id": "c",
          "text": "Pivot columns"
        },
        {
          "id": "d",
          "text": "Group rows"
        }
      ],
      "correct": "a",
      "explanation": "Merging queries joins two tables based on a common key column (like CustomerID), combining columns from both into a single result — similar to a SQL join."
    },
    {
      "id": "pl300-10",
      "domain": "Prepare the data",
      "question": "You have monthly sales files with identical columns, and want to stack them into a single table with all rows combined. What operation should you use?",
      "options": [
        {
          "id": "a",
          "text": "Append queries"
        },
        {
          "id": "b",
          "text": "Merge queries"
        },
        {
          "id": "c",
          "text": "Pivot columns"
        },
        {
          "id": "d",
          "text": "Unpivot columns"
        }
      ],
      "correct": "a",
      "explanation": "Appending queries stacks rows from multiple queries with matching columns into a single combined table, unlike merging which joins columns side-by-side."
    },
    {
      "id": "pl300-11",
      "domain": "Prepare the data",
      "question": "In a star schema, which table type holds descriptive attributes like product category, customer name, or region?",
      "options": [
        {
          "id": "a",
          "text": "A dimension table"
        },
        {
          "id": "b",
          "text": "A fact table"
        },
        {
          "id": "c",
          "text": "A bridge table"
        },
        {
          "id": "d",
          "text": "A calculation group table"
        }
      ],
      "correct": "a",
      "explanation": "Dimension tables provide descriptive context — like product, customer, or region attributes — that fact tables' numeric measures can be filtered and grouped by."
    },
    {
      "id": "pl300-12",
      "domain": "Prepare the data",
      "question": "You need to configure a query so it loads to the data model but the intermediate staging query used to build it does not. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Data loading / 'Enable load' settings per query"
        },
        {
          "id": "b",
          "text": "A calculation group"
        },
        {
          "id": "c",
          "text": "A relationship's cross-filter direction"
        },
        {
          "id": "d",
          "text": "A bookmark"
        }
      ],
      "correct": "a",
      "explanation": "Each query's load setting can be toggled independently, letting you keep staging/helper queries out of the final model while still loading the queries built from them."
    },
    {
      "id": "pl300-13",
      "domain": "Prepare the data",
      "question": "A JSON column in your source data contains nested fields you need as separate columns. What should you do in Power Query?",
      "options": [
        {
          "id": "a",
          "text": "Convert the semi-structured data to a table by expanding the column"
        },
        {
          "id": "b",
          "text": "Merge the query with itself"
        },
        {
          "id": "c",
          "text": "Apply row-level security"
        },
        {
          "id": "d",
          "text": "Create a calculation group"
        }
      ],
      "correct": "a",
      "explanation": "Power Query can expand semi-structured data like JSON or nested records into a proper tabular format with individual columns for each nested field."
    },
    {
      "id": "pl300-14",
      "domain": "Prepare the data",
      "question": "A CSV import shows errors on some rows because a column expected numbers but found text. What should you check first?",
      "options": [
        {
          "id": "a",
          "text": "The column's data type and any conversion errors flagged during import"
        },
        {
          "id": "b",
          "text": "The report's color theme"
        },
        {
          "id": "c",
          "text": "The workspace's storage mode"
        },
        {
          "id": "d",
          "text": "The dashboard's tile layout"
        }
      ],
      "correct": "a",
      "explanation": "Data import errors are commonly caused by data type mismatches; reviewing the column's assigned type and the specific rows flagged with errors is the first troubleshooting step."
    },
    {
      "id": "pl300-15",
      "domain": "Model the data",
      "question": "You have a Date dimension used by both an Order Date and a Ship Date column on the same fact table, but only one active relationship is allowed. What technique addresses this?",
      "options": [
        {
          "id": "a",
          "text": "Implement a role-playing dimension"
        },
        {
          "id": "b",
          "text": "Create a calculation group"
        },
        {
          "id": "c",
          "text": "Enable Direct Lake mode"
        },
        {
          "id": "d",
          "text": "Apply dynamic row-level security"
        }
      ],
      "correct": "a",
      "explanation": "A role-playing dimension lets one physical dimension table (like Date) serve multiple logical roles (Order Date, Ship Date) via separate relationships, often using DAX USERELATIONSHIP for inactive ones."
    },
    {
      "id": "pl300-16",
      "domain": "Model the data",
      "question": "Which relationship cardinality is most common between a dimension table and a fact table in a well-designed star schema?",
      "options": [
        {
          "id": "a",
          "text": "One-to-many (one dimension row relates to many fact rows)"
        },
        {
          "id": "b",
          "text": "Many-to-many"
        },
        {
          "id": "c",
          "text": "One-to-one"
        },
        {
          "id": "d",
          "text": "No relationship needed"
        }
      ],
      "correct": "a",
      "explanation": "In a star schema, a dimension table typically has a one-to-many relationship with a fact table — one customer relates to many orders, for example."
    },
    {
      "id": "pl300-17",
      "domain": "Model the data",
      "question": "Which model object provides a centralized, consistent list of dates for time intelligence calculations, ideally marked as a date table?",
      "options": [
        {
          "id": "a",
          "text": "A common date table"
        },
        {
          "id": "b",
          "text": "A bridge table"
        },
        {
          "id": "c",
          "text": "A calculation group"
        },
        {
          "id": "d",
          "text": "A composite model"
        }
      ],
      "correct": "a",
      "explanation": "A common date table, marked as the model's official date table, provides a consistent calendar for time intelligence functions like year-to-date or prior-period comparisons."
    },
    {
      "id": "pl300-18",
      "domain": "Model the data",
      "question": "Which DAX function is central to modifying filter context, commonly used to build measures like year-over-year comparisons?",
      "options": [
        {
          "id": "a",
          "text": "CALCULATE"
        },
        {
          "id": "b",
          "text": "CONCATENATE"
        },
        {
          "id": "c",
          "text": "SUBSTITUTE"
        },
        {
          "id": "d",
          "text": "FORMAT"
        }
      ],
      "correct": "a",
      "explanation": "CALCULATE evaluates an expression in a modified filter context, making it the foundational function for building measures like time comparisons or conditional aggregations."
    },
    {
      "id": "pl300-19",
      "domain": "Model the data",
      "question": "Which type of DAX function, like SUMX or AVERAGEX, evaluates an expression for each row of a table before aggregating?",
      "options": [
        {
          "id": "a",
          "text": "An iterator function"
        },
        {
          "id": "b",
          "text": "A time intelligence function"
        },
        {
          "id": "c",
          "text": "A table constructor function"
        },
        {
          "id": "d",
          "text": "A logical function"
        }
      ],
      "correct": "a",
      "explanation": "Iterator functions (ending in X) evaluate an expression row-by-row across a table before aggregating the results, useful when a calculation can't be expressed as a simple column aggregation."
    },
    {
      "id": "pl300-20",
      "domain": "Model the data",
      "question": "You need a measure that always shows the most recent inventory count rather than summing counts across time. Which measure type fits this?",
      "options": [
        {
          "id": "a",
          "text": "A semi-additive measure"
        },
        {
          "id": "b",
          "text": "A fully additive measure"
        },
        {
          "id": "c",
          "text": "A calculated column"
        },
        {
          "id": "d",
          "text": "A bridge table"
        }
      ],
      "correct": "a",
      "explanation": "Semi-additive measures, like inventory or account balances, shouldn't simply sum across time — they need special handling (like taking the last non-blank value) rather than full additivity."
    },
    {
      "id": "pl300-21",
      "domain": "Model the data",
      "question": "Which feature lets you build a measure interactively through a guided UI, without writing DAX manually?",
      "options": [
        {
          "id": "a",
          "text": "Quick measures"
        },
        {
          "id": "b",
          "text": "Calculation groups"
        },
        {
          "id": "c",
          "text": "Field parameters"
        },
        {
          "id": "d",
          "text": "Composite models"
        }
      ],
      "correct": "a",
      "explanation": "Quick measures provide a guided dialog for common calculation patterns, generating the underlying DAX automatically without the user writing it by hand."
    },
    {
      "id": "pl300-22",
      "domain": "Model the data",
      "question": "Which DAX modeling feature lets you define reusable calculation logic (like time-intelligence variants) once and apply it to many measures via a slicer?",
      "options": [
        {
          "id": "a",
          "text": "A calculation group"
        },
        {
          "id": "b",
          "text": "A calculated table"
        },
        {
          "id": "c",
          "text": "A bridge table"
        },
        {
          "id": "d",
          "text": "A hierarchy"
        }
      ],
      "correct": "a",
      "explanation": "Calculation groups let you define reusable calculation items — such as YTD, prior year, or variance versions — once, and apply them across multiple base measures via a single slicer."
    },
    {
      "id": "pl300-23",
      "domain": "Model the data",
      "question": "You suspect a measure is slow. Which built-in Power BI Desktop tool helps identify whether the bottleneck is DAX or a specific visual?",
      "options": [
        {
          "id": "a",
          "text": "Performance Analyzer"
        },
        {
          "id": "b",
          "text": "The Selection pane"
        },
        {
          "id": "c",
          "text": "Bookmarks pane"
        },
        {
          "id": "d",
          "text": "The Sync slicers pane"
        }
      ],
      "correct": "a",
      "explanation": "Performance Analyzer records how long each visual and its underlying DAX queries take to render, helping isolate whether a slowdown comes from a specific visual or query."
    },
    {
      "id": "pl300-24",
      "domain": "Model the data",
      "question": "Which optimization removes unused columns and rows from the model to reduce memory footprint and improve refresh and query performance?",
      "options": [
        {
          "id": "a",
          "text": "Removing unnecessary rows and columns"
        },
        {
          "id": "b",
          "text": "Adding more calculated columns"
        },
        {
          "id": "c",
          "text": "Increasing report page count"
        },
        {
          "id": "d",
          "text": "Disabling all relationships"
        }
      ],
      "correct": "a",
      "explanation": "Removing columns and rows that aren't actually used in reports reduces the model's in-memory size, which directly improves both refresh time and query performance."
    },
    {
      "id": "pl300-25",
      "domain": "Model the data",
      "question": "Which technique reduces a model's granularity — for example, storing daily data as monthly aggregates — to improve performance when detail-level rows aren't needed?",
      "options": [
        {
          "id": "a",
          "text": "Reducing granularity"
        },
        {
          "id": "b",
          "text": "Adding a bridge table"
        },
        {
          "id": "c",
          "text": "Enabling row-level security"
        },
        {
          "id": "d",
          "text": "Creating a calculation group"
        }
      ],
      "correct": "a",
      "explanation": "Reducing granularity — pre-aggregating data to a coarser level like monthly instead of daily — reduces row counts and improves performance when fine-grained detail isn't required."
    },
    {
      "id": "pl300-26",
      "domain": "Model the data",
      "question": "Which DAX query tool in Power BI Desktop lets you inspect and iterate on DAX queries directly against the model, useful for troubleshooting measures?",
      "options": [
        {
          "id": "a",
          "text": "DAX query view"
        },
        {
          "id": "b",
          "text": "The Format pane"
        },
        {
          "id": "c",
          "text": "The Bookmarks pane"
        },
        {
          "id": "d",
          "text": "The Filters pane"
        }
      ],
      "correct": "a",
      "explanation": "DAX query view lets you write and run DAX queries directly against the model within Power BI Desktop, useful for testing and troubleshooting measure logic."
    },
    {
      "id": "pl300-27",
      "domain": "Model the data",
      "question": "Which model object is created from a DAX expression at model-load time, functioning like a physical table but generated by a formula?",
      "options": [
        {
          "id": "a",
          "text": "A calculated table"
        },
        {
          "id": "b",
          "text": "A calculated column"
        },
        {
          "id": "c",
          "text": "A calculation group"
        },
        {
          "id": "d",
          "text": "A bridge table"
        }
      ],
      "correct": "a",
      "explanation": "A calculated table is generated by a DAX expression when the model is refreshed, producing a full table (rather than a single column) that behaves like any other model table."
    },
    {
      "id": "pl300-28",
      "domain": "Visualize and analyze the data",
      "question": "A stakeholder wants a single Power BI report to render correctly for both a desktop screen and a mobile phone. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Design reports for mobile devices using the mobile layout view"
        },
        {
          "id": "b",
          "text": "Only apply conditional formatting"
        },
        {
          "id": "c",
          "text": "Only configure bookmarks"
        },
        {
          "id": "d",
          "text": "Only adjust the report's theme"
        }
      ],
      "correct": "a",
      "explanation": "Power BI Desktop's mobile layout view lets you rearrange visuals into a phone-optimized layout independent of the desktop layout, so the same report adapts to different devices."
    },
    {
      "id": "pl300-29",
      "domain": "Visualize and analyze the data",
      "question": "You want to save a specific state of filters and visual selections so users can jump back to that exact view with one click. What should you create?",
      "options": [
        {
          "id": "a",
          "text": "A bookmark"
        },
        {
          "id": "b",
          "text": "A custom tooltip"
        },
        {
          "id": "c",
          "text": "A drillthrough page"
        },
        {
          "id": "d",
          "text": "A paginated report"
        }
      ],
      "correct": "a",
      "explanation": "Bookmarks capture the current state of a report page — filters, slicer selections, and visual visibility — so users can return to that exact view with a single click."
    },
    {
      "id": "pl300-30",
      "domain": "Visualize and analyze the data",
      "question": "You want hovering over a data point to show a separate, richer mini-report instead of the default hover box. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A custom tooltip page"
        },
        {
          "id": "b",
          "text": "A bookmark"
        },
        {
          "id": "c",
          "text": "A drillthrough page"
        },
        {
          "id": "d",
          "text": "Sync slicers"
        }
      ],
      "correct": "a",
      "explanation": "Custom tooltips let you design a dedicated report page that renders as a rich hover tooltip, replacing the default single-value tooltip box."
    },
    {
      "id": "pl300-31",
      "domain": "Visualize and analyze the data",
      "question": "You want users to right-click a data point on a summary chart and jump to a page showing full detail filtered to that exact item. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Drillthrough"
        },
        {
          "id": "b",
          "text": "A bookmark"
        },
        {
          "id": "c",
          "text": "A custom tooltip"
        },
        {
          "id": "d",
          "text": "Sync slicers"
        }
      ],
      "correct": "a",
      "explanation": "Drillthrough lets users right-click a data point and navigate to a detail page automatically filtered to that specific context, such as a single customer or product."
    },
    {
      "id": "pl300-32",
      "domain": "Visualize and analyze the data",
      "question": "You want a slicer selection on one report page to automatically apply to a matching slicer on a different page. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Sync slicers"
        },
        {
          "id": "b",
          "text": "Bookmarks"
        },
        {
          "id": "c",
          "text": "Drillthrough"
        },
        {
          "id": "d",
          "text": "Custom tooltips"
        }
      ],
      "correct": "a",
      "explanation": "The Sync slicers feature lets a slicer's selection apply across multiple report pages, keeping filter context consistent as users navigate."
    },
    {
      "id": "pl300-33",
      "domain": "Visualize and analyze the data",
      "question": "Which pane lets you group and layer overlapping visuals, and control which ones are visible for a given bookmark state?",
      "options": [
        {
          "id": "a",
          "text": "The Selection pane"
        },
        {
          "id": "b",
          "text": "The Filters pane"
        },
        {
          "id": "c",
          "text": "The Fields pane"
        },
        {
          "id": "d",
          "text": "The Format pane"
        }
      ],
      "correct": "a",
      "explanation": "The Selection pane lists all objects on a report page, letting you group, reorder, and toggle visibility — commonly combined with bookmarks to build interactive show/hide effects."
    },
    {
      "id": "pl300-34",
      "domain": "Visualize and analyze the data",
      "question": "Which reporting object is best suited for a highly formatted, print-ready, operational report like an invoice, rather than an interactive dashboard-style page?",
      "options": [
        {
          "id": "a",
          "text": "A paginated report"
        },
        {
          "id": "b",
          "text": "A standard Power BI report page"
        },
        {
          "id": "c",
          "text": "A dashboard tile"
        },
        {
          "id": "d",
          "text": "A bookmark"
        }
      ],
      "correct": "a",
      "explanation": "Paginated reports are designed for pixel-perfect, print-ready, and highly formatted output like invoices or regulatory reports, unlike standard interactive Power BI report pages."
    },
    {
      "id": "pl300-35",
      "domain": "Visualize and analyze the data",
      "question": "Which built-in Power BI feature automatically highlights outliers and suggests possible explanations for why a value in a visual differs from the rest?",
      "options": [
        {
          "id": "a",
          "text": "The Analyze feature (Explain the increase/decrease)"
        },
        {
          "id": "b",
          "text": "Bookmarks"
        },
        {
          "id": "c",
          "text": "Custom tooltips"
        },
        {
          "id": "d",
          "text": "Sync slicers"
        }
      ],
      "correct": "a",
      "explanation": "The Analyze feature (sometimes called 'Explain the increase/decrease') automatically investigates a data point and suggests contributing factors, helping users spot patterns without manual digging."
    },
    {
      "id": "pl300-36",
      "domain": "Visualize and analyze the data",
      "question": "Which visual type is best suited to displaying a forecasted trend line alongside historical data, with a confidence interval?",
      "options": [
        {
          "id": "a",
          "text": "A line chart with the forecasting analytics feature enabled"
        },
        {
          "id": "b",
          "text": "A pie chart"
        },
        {
          "id": "c",
          "text": "A card visual"
        },
        {
          "id": "d",
          "text": "A matrix with no date field"
        }
      ],
      "correct": "a",
      "explanation": "Line charts support the built-in forecasting analytics feature, which projects a trend forward and displays a confidence interval band alongside historical data."
    },
    {
      "id": "pl300-37",
      "domain": "Visualize and analyze the data",
      "question": "Which feature groups continuous numeric values, like age, into discrete ranges for easier visualization?",
      "options": [
        {
          "id": "a",
          "text": "Binning"
        },
        {
          "id": "b",
          "text": "Drillthrough"
        },
        {
          "id": "c",
          "text": "A custom tooltip"
        },
        {
          "id": "d",
          "text": "A calculation group"
        }
      ],
      "correct": "a",
      "explanation": "Binning groups a continuous numeric field into a set number of discrete ranges (bins), making patterns easier to visualize than plotting every individual value."
    },
    {
      "id": "pl300-38",
      "domain": "Visualize and analyze the data",
      "question": "Which Copilot capability in Power BI can generate a written narrative summarizing key insights from a report page automatically?",
      "options": [
        {
          "id": "a",
          "text": "A narrative visual created with Copilot"
        },
        {
          "id": "b",
          "text": "A bookmark"
        },
        {
          "id": "c",
          "text": "A custom tooltip"
        },
        {
          "id": "d",
          "text": "A paginated report"
        }
      ],
      "correct": "a",
      "explanation": "Copilot can generate a narrative visual — a natural-language summary of key trends and insights on a report page — reducing the need for manual written commentary."
    },
    {
      "id": "pl300-39",
      "domain": "Visualize and analyze the data",
      "question": "Which accessibility feature ensures screen reader users can navigate a report's visuals in a logical order?",
      "options": [
        {
          "id": "a",
          "text": "Configuring the tab order in the Selection pane"
        },
        {
          "id": "b",
          "text": "Enabling row-level security"
        },
        {
          "id": "c",
          "text": "Adding a bookmark"
        },
        {
          "id": "d",
          "text": "Using a paginated report instead"
        }
      ],
      "correct": "a",
      "explanation": "Setting a logical tab order for visuals (via the Selection pane) helps screen reader users navigate a report's content in a sensible sequence, supporting accessibility design."
    },
    {
      "id": "pl300-40",
      "domain": "Visualize and analyze the data",
      "question": "You want a semantic model to refresh automatically on a nightly schedule without manual intervention. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A scheduled refresh"
        },
        {
          "id": "b",
          "text": "A bookmark"
        },
        {
          "id": "c",
          "text": "A custom tooltip"
        },
        {
          "id": "d",
          "text": "Row-level security"
        }
      ],
      "correct": "a",
      "explanation": "Configuring scheduled refresh on a published semantic model lets Power BI automatically re-import or reprocess data at defined times, without requiring manual refreshes."
    },
    {
      "id": "pl300-41",
      "domain": "Manage and secure Power BI",
      "question": "You want to restrict a specific set of users so they only see rows belonging to their own sales region in a report. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Row-level security (RLS) roles"
        },
        {
          "id": "b",
          "text": "A workspace role"
        },
        {
          "id": "c",
          "text": "Item-level access"
        },
        {
          "id": "d",
          "text": "A sensitivity label"
        }
      ],
      "correct": "a",
      "explanation": "Row-level security (RLS) roles define DAX filter expressions that restrict which rows a given user can see, commonly used to scope data by region, department, or similar attribute."
    },
    {
      "id": "pl300-42",
      "domain": "Manage and secure Power BI",
      "question": "Which workspace role allows a user to publish and modify content but not manage workspace access or settings?",
      "options": [
        {
          "id": "a",
          "text": "Contributor"
        },
        {
          "id": "b",
          "text": "Viewer"
        },
        {
          "id": "c",
          "text": "Admin"
        },
        {
          "id": "d",
          "text": "Member (when scoped narrower than Admin)"
        }
      ],
      "correct": "a",
      "explanation": "Contributor lets users create, publish, and edit content within a workspace, but doesn't grant the ability to manage workspace-level access or settings the way Admin does."
    },
    {
      "id": "pl300-43",
      "domain": "Manage and secure Power BI",
      "question": "Which mechanism lets an external application connect to an on-premises data source that Power BI Service can't reach directly?",
      "options": [
        {
          "id": "a",
          "text": "An on-premises data gateway"
        },
        {
          "id": "b",
          "text": "A workspace role"
        },
        {
          "id": "c",
          "text": "A sensitivity label"
        },
        {
          "id": "d",
          "text": "A calculation group"
        }
      ],
      "correct": "a",
      "explanation": "An on-premises data gateway acts as a bridge, letting Power BI Service securely connect to on-premises data sources it couldn't otherwise reach over the internet."
    },
    {
      "id": "pl300-44",
      "domain": "Manage and secure Power BI",
      "question": "Which Power BI feature applies classification labels (like Confidential or Public) to content, integrating with Microsoft Purview Information Protection?",
      "options": [
        {
          "id": "a",
          "text": "Sensitivity labels"
        },
        {
          "id": "b",
          "text": "Row-level security"
        },
        {
          "id": "c",
          "text": "Deployment pipelines"
        },
        {
          "id": "d",
          "text": "Calculation groups"
        }
      ],
      "correct": "a",
      "explanation": "Sensitivity labels, integrated with Microsoft Purview Information Protection, classify and can restrict access to Power BI content based on its sensitivity level."
    },
    {
      "id": "pl300-45",
      "domain": "Manage and secure Power BI",
      "question": "Which capability lets an authorized reviewer mark a semantic model as trustworthy and high-quality, distinct from a user simply promoting it themselves?",
      "options": [
        {
          "id": "a",
          "text": "Certifying content"
        },
        {
          "id": "b",
          "text": "Promoting content"
        },
        {
          "id": "c",
          "text": "Applying a sensitivity label"
        },
        {
          "id": "d",
          "text": "Configuring RLS"
        }
      ],
      "correct": "a",
      "explanation": "Certification requires an organization-authorized reviewer to confirm content meets quality standards, distinct from promotion, which any user with write access can apply themselves."
    },
    {
      "id": "pl300-46",
      "domain": "Manage and secure Power BI",
      "question": "You need to grant a specific user access to just one report, without giving them broader access to the entire workspace. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "Item-level access"
        },
        {
          "id": "b",
          "text": "A workspace role"
        },
        {
          "id": "c",
          "text": "Sensitivity labels"
        },
        {
          "id": "d",
          "text": "Deployment pipeline stages"
        }
      ],
      "correct": "a",
      "explanation": "Item-level access grants permission to a single item, like one report, without extending broader collaboration rights across the entire workspace."
    },
    {
      "id": "pl300-47",
      "domain": "Manage and secure Power BI",
      "question": "Which feature lets you promote validated Power BI content through Development, Test, and Production workspace stages?",
      "options": [
        {
          "id": "a",
          "text": "Deployment pipelines"
        },
        {
          "id": "b",
          "text": "Row-level security"
        },
        {
          "id": "c",
          "text": "Sensitivity labels"
        },
        {
          "id": "d",
          "text": "Calculation groups"
        }
      ],
      "correct": "a",
      "explanation": "Deployment pipelines promote content across lifecycle stages — Development, Test, and Production — cloning or updating supported items in the target workspace."
    },
    {
      "id": "pl300-48",
      "domain": "Manage and secure Power BI",
      "question": "You want end users to receive an email whenever a report is refreshed with new data, without them needing to open Power BI. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A subscription"
        },
        {
          "id": "b",
          "text": "A dashboard"
        },
        {
          "id": "c",
          "text": "An app"
        },
        {
          "id": "d",
          "text": "A workspace role"
        }
      ],
      "correct": "a",
      "explanation": "Subscriptions send users a periodic email snapshot of a report or dashboard, notifying them of updates without requiring them to actively open Power BI."
    },
    {
      "id": "pl300-49",
      "domain": "Manage and secure Power BI",
      "question": "Which distribution method packages multiple reports and dashboards from a workspace into a single, easily consumable experience for end users?",
      "options": [
        {
          "id": "a",
          "text": "A Power BI app"
        },
        {
          "id": "b",
          "text": "A single report export"
        },
        {
          "id": "c",
          "text": "A calculation group"
        },
        {
          "id": "d",
          "text": "A stored access policy"
        }
      ],
      "correct": "a",
      "explanation": "A Power BI app packages related reports and dashboards from a workspace into a single, curated navigation experience for consumers."
    },
    {
      "id": "pl300-50",
      "domain": "Manage and secure Power BI",
      "question": "You want to be notified automatically when a KPI in a report crosses a defined threshold, without manually checking the report. What should you configure?",
      "options": [
        {
          "id": "a",
          "text": "A data alert"
        },
        {
          "id": "b",
          "text": "A bookmark"
        },
        {
          "id": "c",
          "text": "A custom tooltip"
        },
        {
          "id": "d",
          "text": "Sync slicers"
        }
      ],
      "correct": "a",
      "explanation": "Data alerts monitor a specific visual or tile for a defined threshold and notify you automatically when the value crosses it, without needing to check the report manually."
    },
    {
      "id": "pl300-51",
      "domain": "Manage and secure Power BI",
      "question": "Which security membership determines who is affected by a given row-level security role once it's defined?",
      "options": [
        {
          "id": "a",
          "text": "RLS group membership assignment"
        },
        {
          "id": "b",
          "text": "The report's color theme"
        },
        {
          "id": "c",
          "text": "The dashboard's tile layout"
        },
        {
          "id": "d",
          "text": "The paginated report's page size"
        }
      ],
      "correct": "a",
      "explanation": "Assigning users or groups as members of a defined RLS role determines whose queries get filtered by that role's DAX expression when they view the report."
    },
    {
      "id": "pl300-52",
      "domain": "Manage and secure Power BI",
      "question": "Which condition typically requires a gateway to be configured for a scheduled refresh to succeed?",
      "options": [
        {
          "id": "a",
          "text": "When the semantic model connects to an on-premises or private-network data source"
        },
        {
          "id": "b",
          "text": "When the model uses only cloud-native sources with no private network requirement"
        },
        {
          "id": "c",
          "text": "When the report has fewer than 10 visuals"
        },
        {
          "id": "d",
          "text": "When the workspace has fewer than 5 members"
        }
      ],
      "correct": "a",
      "explanation": "A gateway is required when a scheduled refresh needs to reach a data source that isn't directly reachable from the cloud, such as an on-premises database or private network resource."
    }
  ]
};
