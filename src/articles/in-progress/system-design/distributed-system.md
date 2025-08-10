# Title

## Purpose

Learning distributed system is essential for understanding how to design, build, and manage robust and scalable applications that can handle the complexities of modern distributed environments.

## Concept

### Distributed Computing Models

* client-server architecture
  * Purpose: By separating client and server, we can focus on optimizing only one side. For example, some computation require heavy resources on the server, we can scale it up without amending any structure of the client side.
  * Concept: Clients are typically user devices such as computers, smartphones, or tablets, which request services or resources from servers. Servers, on the other hand, are powerful computers or software applications that provide these services or resources to clients.
  * Example: A classic example of client-server architecture is the World Wide Web. In this setup, web browsers (clients) on users' devices send requests for web pages or resources to web servers. The web servers then process these requests and send back the requested web pages to the clients, which are displayed in the users' browsers. This client-server interaction allows users to access and view web content stored on remote servers from their own devices.
* peer-to-peer networks
  * Purpose: The purpose of peer-to-peer (P2P) architecture is to enable distributed communication, collaboration, and resource sharing among individual nodes in a network without the need for centralized control or authority.
  * Concept: Peer-to-peer (P2P) architecture is a decentralized computing model where individual nodes in a network act both as clients and as servers, sharing resources directly with each other without the need for a central server.
  * Example: A classic example of peer-to-peer architecture is file-sharing networks like BitTorrent, where users share files directly with each other without relying on a central server. Other examples include decentralized cryptocurrency networks like Bitcoin, where nodes in the network collaborate to validate and record transactions without the need for a central authority.

### Distributed Data Storage

Understanding distributed data storage systems, including distributed databases, key-value stores, and distributed file systems.

### Distributed Algorithms

Studying algorithms and protocols specifically designed for distributed systems, such as leader election, mutual exclusion, and distributed locking.

### Distributed File Systems

Learning about distributed file systems like Hadoop Distributed File System (HDFS) or Google File System (GFS), including their architecture, data replication, and fault tolerance mechanisms.

### Communication and Coordination

Learning about message passing, remote procedure calls (RPC), distributed transactions, and consensus protocols for coordinating actions across multiple nodes.

### Fault Tolerance and Replication

Exploring techniques for fault tolerance, replication, and consistency in distributed systems, including approaches like replication, redundancy, and distributed consensus algorithms.

### Horizontally and Vertically Scalability

Horizontal scalability refers to the ability to increase the capacity of a system by adding more machines or nodes in a distributed manner, allowing for distributed processing and workload distribution. In contrast, vertical scalability involves increasing the resources of an individual machine or node, such as CPU, memory, or storage capacity, to handle increased workload and user demand. For more information, please refer to [Horizontally and Vertically Scalability]()

### Load Balancer

A load balancer is a critical component in computer networks and web infrastructure that evenly distributes incoming network traffic across multiple servers or resources. It helps optimize performance, improve reliability, and prevent overload by efficiently managing the workload across the system. For more information, please refer to [Load Balancer]()

* Purpose: To ensure efficient and reliable system performance, a load balancer distributes incoming network traffic across multiple servers.
* Concept:
  * Round-robin: Round-robin evenly distributes requests among servers in a **sequential manner**, ensuring each server gets an equal share, but it doesn't consider server load or capacity.
  * Least connections: It directs incoming network traffic to the server with the **fewest active connections**, aiming to distribute the load more evenly among servers based on their current workload and capacity.
  * Weighted distribution: It assigns different capacities or priorities to servers, allowing them to handle varying proportions of incoming traffic **based on their weight**, typically set by system administrators.
* Example: AWS Elastic Load Balancer, Nginx, Kubernetes

### Sharding

[Sharding] is a database partitioning technique used to horizontally distribute data across multiple servers or nodes, enabling systems to scale horizontally and handle large volumes of data and high transaction rates. By dividing data into shards based on a shard key, sharding improves system performance, scalability, and fault tolerance in distributed database architectures.

### MapReduce

* Purpose: Enable efficient processing and analysis of large-scale data by dividing tasks into parallelizable units, thereby leveraging the computing power of distributed systems and facilitating scalability, fault tolerance, and high-performance data processing.
* Concept: A programming model where data is divided, processed, and combined in parallel across multiple nodes, consisting of a map phase to process data and generate intermediate results, followed by a reduce phase to aggregate and produce the final output.
* Calculate the total sales amount for each product in a large dataset of customer transactions by mapping each transaction to key-value pairs of product and sales amount, and then reducing the intermediate results by summing the sales amounts for each product to obtain the final total. The trick here is that we can calculate the sub results at the same time in parallel.

### elastic resource management

### Distributed Security

Understanding security challenges in distributed systems, including authentication, access control, data privacy, and distributed security protocols.

### Cloud Computing and Virtualization

Exploring the concepts of cloud computing, virtualization technologies, and how they enable scalable and flexible distributed systems.

### Case Studies and Real-World Examples

Examining real-world distributed systems like Google's Bigtable, Apache Kafka, or Amazon DynamoDB to gain insights into the design and architecture of large-scale distributed applications.

## Reference
