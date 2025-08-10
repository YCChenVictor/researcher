# Title

## Purpose

Caching is used to store frequently accessed data closer to where it's needed, reducing latency and improving performance by avoiding the need to repeatedly fetch data from slower sources like disks or remote servers. By keeping frequently accessed data readily available in a faster cache, systems can respond to user requests more quickly and efficiently.

## Concept

* Web Browser Caches: Web browsers cache static resources such as HTML files, CSS stylesheets, JavaScript files, images, and multimedia content. This allows subsequent visits to websites to load faster by retrieving the cached resources instead of downloading them again.
* Content Delivery Network (CDN) Caches: CDNs cache static content like images, videos, and other files across their distributed network of servers. This helps deliver content to users from servers located closer to their geographic location, reducing latency and improving load times.
* Database Caches: Database management systems often employ caches to store frequently accessed data in memory. This reduces the need for disk reads and speeds up database query responses.
  * Example
    ```mermaid
    graph LR
      id1(user 1) --#1--> id2(browser 1)
      id1(user 1) --#2--> id2(browser 1)
    
      id3(user 2) --#3--> id4(browser 2)
      id3(user 2) --#4--> id4(browser 2)
    
      id2(browser 1) --request from #1--> id5(data processing)
      id2(browser 1) --request from #2--> id5(data processing)
      id4(browser 2) --request from #3--> id5(data processing)
      id4(browser 2) --request from #4--> id5(data processing)
    
      id5(data processing) --query from #1--> id6(database)
      id5(data processing) --query from #2--> id6(database)
      id5(data processing) --query from #3--> id6(database)
      id5(data processing) --query from #4--> id6(database)
    ```
    * denote # as the order of the usages from users
    * Cache the request results between browsers and the layer of data processing, so that the #2~#4 requests can directly use it without request again:
      ```mermaid
      graph LR
        id1(user 1) --#1--> id2(browser 1)
        id1(user 1) --#2--> id2(browser 1)
      
        id3(user 2) --#3--> id4(browser 2)
        id3(user 2) --#4--> id4(browser 2)
      
        id2(browser 1) --request<br>from #1--> id7(server<br>side<br>cache)
        id2(browser 1) --request<br>from #2--> id7(server<br>side<br>cache)
        id4(browser 2) --request<br>from #3--> id7(server<br>side<br>cache)
        id4(browser 2) --request<br>from #4--> id7(server<br>side<br>cache)
      
        id7(server<br>side<br>cache) --request<br>from #1--> id5(data<br>processing)
        id5(data<br>processing) --store<br>results--> id7(server<br>side<br>cache)
      
        id5(data processing) --query from #1--> id6(database)
      ```
* Operating System File Caches: Operating systems use file caches to store frequently accessed disk data in memory, reducing the need for disk I/O operations and improving overall system performance.
* CPU Caches: These include the L1, L2, and L3 caches present in modern CPUs. They store frequently accessed instructions and data to accelerate the processor's access to memory.
* Disk Caches: Hard drives and solid-state drives (SSDs) may have built-in caches that temporarily store frequently accessed data to improve read and write speeds.
* Compiler Caches: Compiler tools can employ caching mechanisms to store compiled object code or intermediate representations of source code. This speeds up subsequent compilations by reusing the cached results, rather than recompiling from scratch.
* Network Caches: Network devices like routers and proxies may use caches to store frequently accessed web pages, images, or other network resources, reducing the need for repeated requests to the origin server.
* GPU Caches: Graphics Processing Units (GPUs) have their own caches, such as texture caches and global memory caches, which store frequently accessed data for graphics rendering and parallel computation.
* Proxy Caches: Proxy servers can employ caches to store and serve frequently accessed web content on behalf of clients, reducing the load on origin servers and improving response times.
* Middleware Caches: Middleware components, like caching servers or caching plugins, can be used to cache frequently accessed data or responses in software architectures, improving performance and reducing the load on backend systems.
* Application-Level Caches: Applications themselves may implement caching mechanisms to store frequently accessed data, such as caching query results or computed values, enhancing performance and reducing the need for repeated computations.
* Session Caches: Session caches are used to store session data related to user sessions in web applications. This helps improve session management and allows for quick access to session information.
* Memory Caches: Memory caches, sometimes referred to as general-purpose caches, are used to cache data from various sources in memory for fast retrieval. They are often employed in distributed systems or high-performance computing environments.
* Message Caches: Message caches are used in messaging systems to cache messages or message queues. This helps improve the efficiency of message delivery and reduces the load on the underlying messaging infrastructure.
* API Caches: API caches store responses from API calls in memory for subsequent requests. This reduces the need for repeated API calls and improves the responsiveness and performance of applications that rely on external APIs.
* Reverse Proxy Caches: Reverse proxy caches sit between clients and web servers, caching responses from web servers and serving them to clients. This helps reduce the load on web servers, improves response times, and enhances scalability.
* DNS Caches: DNS caches store DNS records for domain name resolution. They help reduce DNS lookup times by caching previously resolved domain name mappings.

## Reference
