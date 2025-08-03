# Title

## Concept

### Data Model

* Relational databases organize data into structured tables consisting of rows and columns. Each table represents an entity or a relationship between entities, and rows represent individual records or instances of the entity. Relationships between tables are established using foreign keys.
* Non-relational databases have various data models, including document-oriented, key-value pairs, wide-column stores, and graph databases.
  * Document-oriented databases store data in flexible, schema-less documents (e.g., JSON or BSON).
  * Key-value stores store data as key-value pairs, allowing for efficient retrieval and storage of data without enforcing a rigid schema.
  * Wide-column stores organize data into columns rather than rows, enabling efficient storage and retrieval of large datasets.
  * Graph databases model data as nodes and edges, representing complex relationships between entities.

### Schema

* Relational databases enforce a rigid schema, where the structure of the data (i.e., tables, columns, and relationships) is predefined and enforced by the database system. Any changes to the schema typically require altering the database schema definition, which can impact existing data and applications.
* Non-relational databases often have flexible schemas or no schema at all.
  * Document-oriented and key-value stores allow each document or key-value pair to have its own structure, enabling dynamic schema evolution.
  * Wide-column stores may allow column families to have different schemas within the same database. Check out [wide column databases](https://dandkim.com/wide-column-databases/)
  * Graph databases model schema as nodes and edges, where the structure of relationships can evolve over time.

### Query Language

* Relational databases primarily use SQL (Structured Query Language) for querying and manipulating data.
  * SQL provides a standardized language for expressing complex queries, joins, aggregations, and transactions.
* Non-relational databases may offer their own query languages or APIs tailored to their specific data models.
  * Document-oriented databases often provide query languages or APIs for querying documents using JSON-like syntax.
  * Key-value stores typically offer simple get/set operations for retrieving and storing data by keys.
  * Wide-column stores may support query languages or APIs for performing column-based queries.
  * Graph databases provide specialized query languages for traversing and querying relationships between nodes and edges.

#### Should Use NoSQL

NoSQL databases are well-suited for various scenarios where traditional relational databases may encounter limitations. Here are some common scenarios where NoSQL databases excel:

* Big Data and High Volume Transactions: NoSQL databases are designed to handle large volumes of data and high transaction rates. They can scale horizontally across multiple nodes, allowing them to efficiently manage massive datasets and handle concurrent transactions.
* Unstructured or Semi-Structured Data: NoSQL databases are flexible and schema-less, making them ideal for storing unstructured or semi-structured data such as documents, JSON, XML, or key-value pairs. This makes them suitable for use cases like content management, user profiles, and product catalogs where the data structure may vary.
* Scalability and Performance: NoSQL databases are designed for horizontal scalability, allowing them to scale out by adding more nodes to the database cluster. This makes them well-suited for applications with rapidly growing datasets or unpredictable workloads that require elastic scalability and high performance.
* Real-Time Analytics and Streaming Data: NoSQL databases are often used in real-time analytics and stream processing applications where data needs to be ingested, processed, and analyzed in real-time. They can efficiently handle high-speed data streams and provide low-latency access to data for real-time decision-making.
* Distributed Data Storage and High Availability: NoSQL databases are typically distributed databases that replicate data across multiple nodes for fault tolerance and high availability. They can withstand node failures and ensure data consistency and availability even in distributed environments.
* Complex Relationships and Graph Data: NoSQL databases, particularly graph databases, excel at managing complex relationships between data entities. They are suitable for applications such as social networks, recommendation engines, fraud detection, and network analysis, where relationships between data entities are critical.
* Caching and Session Management: NoSQL databases, particularly in-memory databases like Redis, are commonly used for caching frequently accessed data and managing session state in web applications. They provide fast read and write access to data stored in memory, improving application performance and scalability.
