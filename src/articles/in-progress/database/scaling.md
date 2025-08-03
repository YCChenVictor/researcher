# Title

## Purpose

Ensures robustness of databases as they grow.

## Concept

There are two way, vertical and horizontal. Vertical scaling has quicker improvements than horizontal. However, horizontal scaling brings flexibility through mechanism in multiple machines.

### vertical scaling

Vertical scaling involves increasing the capacity of a single server by adding more resources such as CPU, RAM, or storage. Typical steps is as follow:

* Analyze Performance Metrics: Before scaling, it's essential to understand the performance bottlenecks of your database system. Monitor metrics such as CPU usage, memory usage, disk I/O, and query response times to identify areas that need improvement.
* Upgrade Hardware: The simplest way to vertically scale a database is to upgrade the hardware of the server it runs on. This could involve increasing the CPU capacity (e.g., upgrading from a dual-core to a quad-core processor), adding more RAM, or using faster storage devices (e.g., SSD instead of HDD).
* Adjust Configuration Parameters: Many database management systems allow you to fine-tune various configuration parameters to optimize performance based on the available hardware resources. This could involve adjusting parameters related to memory usage, caching, query execution, and concurrency control.
* Optimize Queries and Indexes: Poorly written queries and missing or inefficient indexes can significantly degrade database performance. Review and optimize your database queries to ensure they are executing efficiently. Create appropriate indexes to speed up data retrieval operations.
* Partitioning: Partitioning involves dividing large tables into smaller, more manageable chunks called partitions based on certain criteria (e.g., range, hash, list). Partitioning can improve query performance by reducing the amount of data that needs to be scanned for each query.
* Use In-Memory Databases: In-memory databases store data entirely in RAM, eliminating the need for disk I/O and significantly improving read and write performance. Consider migrating to an in-memory database system if your workload is primarily read-heavy and requires low-latency responses.
* Consider Database Vertical Scaling Tools: Some database management systems offer built-in tools or features specifically designed for vertical scaling. For example, some relational database systems support adding more CPU cores or increasing memory dynamically without downtime.
* Monitor and Iterate: After implementing vertical scaling measures, continue to monitor the performance of your database system. Iterate on your scaling strategy as necessary to address any new performance bottlenecks that may arise.

### horizontal scaling

Horizontal scaling involves distributing the workload across multiple servers to handle increased demand. Methods:

* Database Sharding: Database sharding involves horizontally partitioning a database into smaller, more manageable subsets called shards. Each shard contains a portion of the data and is hosted on a separate server or cluster of servers. Sharding can be based on various criteria such as range-based sharding, hash-based sharding, or key-based sharding.
* Replication: Database replication involves creating and maintaining multiple copies of the database, known as replicas, on separate servers. Changes made to the primary database are asynchronously propagated to the replicas, allowing read queries to be distributed across multiple servers. Replication can improve both scalability and fault tolerance.
* Load Balancing: Load balancing distributes incoming client requests across multiple servers to ensure optimal resource utilization and prevent any single server from becoming a bottleneck. A load balancer sits in front of the database servers and routes requests based on predefined algorithms such as round-robin, least connections, or weighted distribution.
* Distributed Databases: Distributed databases are designed from the ground up to support horizontal scaling by distributing data and processing across multiple servers or nodes. These databases often employ techniques such as consistent hashing, data partitioning, and distributed transactions to ensure data consistency and reliability across the cluster.
* Partitioning: Partitioning involves dividing a large table or dataset into smaller partitions based on certain criteria such as ranges, hashes, or lists. Each partition can then be stored on a separate server or node, allowing queries to be parallelized and distributed across the partitioned servers.
* Elastic Scaling: Elastic scaling allows you to dynamically add or remove servers based on workload demand. Cloud platforms often provide auto-scaling features that automatically provision or de-provision database instances based on predefined metrics such as CPU utilization, memory usage, or request rates.
* Microservices Architecture: In a microservices architecture, different components of an application are decoupled and run as independent services. Each microservice can have its own database or database instance, allowing horizontal scaling at the service level.
* Caching: Caching frequently accessed data in memory can help reduce the load on the database servers by serving read queries directly from the cache. Distributed caching solutions like Redis or Memcached can be deployed across multiple servers to further improve scalability and performance.

## Example
