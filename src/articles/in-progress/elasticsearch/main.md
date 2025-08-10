# Title

## Purpose

## Concept

* Nodes: These are individual instances of Elasticsearch running on a machine or server. Nodes can be categorized into different roles, such as data nodes, master nodes, and coordinating nodes.
* Cluster: A cluster is a collection of one or more nodes that collectively store your data and provide indexing and search capabilities. Nodes within a cluster communicate with each other to distribute data and coordinate operations.
* Index: An index is a collection of documents that share similar characteristics or belong to the same data category. Each document is a JSON object containing one or more fields with associated values.
* Shards: Elasticsearch indexes are divided into shards, which are smaller, manageable parts of the index. Sharding allows Elasticsearch to distribute data across multiple nodes in a cluster, enabling scalability and parallelism.
* Replicas: Replicas are duplicate copies of shards that provide redundancy and fault tolerance. Elasticsearch automatically distributes replicas across nodes to ensure high availability and data resilience.
* Document: A document is the basic unit of information stored in Elasticsearch. It consists of fields with associated values, similar to a row in a relational database table.
* Query DSL (Domain Specific Language): Elasticsearch provides a rich set of APIs for querying and retrieving data. The Query DSL allows users to construct complex search queries using a JSON-based syntax.

## Example

Imagine you're building a web application that allows users to search for products in an online store. You have millions of products in your inventory, and you want to provide fast and relevant search results to your users.

Here's how Elasticsearch's architecture and concepts come into play:

Nodes: You deploy Elasticsearch on multiple servers to distribute the workload and handle the large volume of data. Each node in your cluster contributes its computing power and storage capacity to handle search requests and store indexed data.

Cluster: Your Elasticsearch cluster consists of multiple nodes working together. If one node fails, the cluster can continue to operate seamlessly, ensuring high availability and fault tolerance. The cluster also dynamically rebalances data and workload across nodes to optimize performance and resource utilization.

Index: You create an index named "products" to store information about your products. Each product is represented as a document within this index, with fields such as name, description, price, and category.

Shards: Since you have millions of products, Elasticsearch automatically divides the "products" index into multiple shards. These shards distribute the data across nodes in your cluster, allowing Elasticsearch to parallelize search and indexing operations for improved performance and scalability.

Replicas: To ensure data resilience and high availability, Elasticsearch creates replica shards for each primary shard. These replica shards are distributed across different nodes in the cluster, providing redundancy. If a node goes down, Elasticsearch can still serve search requests from replica shards on other nodes.

Document: Each product in your inventory is stored as a document in Elasticsearch. For example, a document might represent a laptop with fields like "name: MacBook Pro," "description: Thin and powerful laptop," "price: $1,299," and "category: Electronics."

Query DSL: When a user enters a search query, your application constructs a query using Elasticsearch's Query DSL. For example, you might construct a query to search for laptops with a price range between $1,000 and $2,000. Elasticsearch efficiently executes this query across the distributed shards, aggregates the results, and returns relevant products to the user.
