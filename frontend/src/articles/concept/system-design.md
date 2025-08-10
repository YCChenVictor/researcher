# Title

## Purpose

System design is essential to ensure that a software is well-structured, efficient, and capable of meeting its intended goals and requirements, providing a roadmap for the development process and enabling successful implementation.

## Concept

In this section, there are two kinds of designs, designing whole system and designing algorithm.

### Design Whole System

For example, let's design TinyURL, which can shorten the URLs.

#### Step 1: Scope the Problem

Ask lots of questions to define user stories and get the requirements. After the questions, we should know the requirements:

* Shortening a URL to a TinyURL
* Analytics for a URL
* Retrieving the URL associated with a TinyURL
* User accounts and link management

#### Step 2: Make Reasonable Assumptions

Based on step 1, given the requirements, we need to think about Feasibility, Impact Analysis, Scalability and Extensibility. We can just consider these factors and finish features first and then optimize them later.

* Feasibility
  * Technical constraints
  * Resource availability
  * Time constraints
* Impact Analysis
  * Functionality
  * Performance
  * Security
  * User experience
* Scalability and Extensibility
  * Increasing user load
  * Additional features
  * Integration with new technologies

#### Step 3: Draw the Major Components (on whiteboard)

* Frontend
  * User Interface: The UI component serves as the visual gateway for users to interact with the system, enabling them to input URLs, access analytics, manage links, and perform various actions through pages, forms, buttons, and other interface elements.
  * URL Shortening Form: The URL Shortening Form component captures user-inputted long URLs, validating and handling potential errors, before forwarding the data to the backend for processing.
  * Analytics Dashboard: The analytics dashboard component presents visually appealing and user-friendly statistics and insights, including click counts, referral sources, and geographical data, for the shortened URLs.
  * User Account Management: The User Account Management component facilitates user registration, login, and account management functionalities, providing forms for actions such as registration, login, password reset, and profile management.
* Backend
  * API: The backend exposes APIs that define the contract for request and response formats, allowing seamless communication and interaction between the frontend and backend components of the system.
  * URL Shortening Service: The URL Shortening Service component generates unique and concise aliases (TinyURLs) for long URLs received from the frontend, utilizing algorithms or mapping mechanisms to create and store mappings between the TinyURLs and their corresponding original URLs.
  * Analytics Engine: The Analytics Engine component processes and aggregates data on URL clicks, referral sources, and other metrics, storing the information to generate reports and provide valuable analytics insights, while the User Management System component handles user account management, authentication, authorization, and tasks such as registration, login, password management, and link ownership.
  * Database: The Database component efficiently stores and retrieves the required data for the system, encompassing tables or collections that hold information such as URLs, analytics data, user accounts, and link management.
  * External Services Integration: The backend may need to integrate with external services, such as geo-location services for gathering geographical data or third-party authentication services for user account management.

#### Step 4: Identify the Key Issues

Based on information in step 2 and step 3, determine the priorities and know which bottleneck should be solved first; for example, the frontend and backend for user to input URL has the highest priority and the boss actually care security more than performance, so although we know cache the urls on frontend will be faster, we still let user to query them because we do not want to store the urls on frontend for hackers.

#### Step 5: Redesign for the Key Issues
  
After step 4, we should adjust our design; for example, some components take too much time but is not that important, so we can remove it currently from the major components.

#### Step 6: Choose the right frameworks

If you do not know which frontend, backend, database to choose, just choose the most popular one.

#### Step 7: Start to code

Ok, based on above design, we now should have components, user interface, URL shortening, analytics, user account management, APIs, services, database, and external integrations and we can start to think about the design patterns for them.

Any user interface related frontend and backend, we should use [MVC structure]. That is, we break Create, Read, Update, Destroy (CRUD) of links and CRUD of users into [RESTful] design, which is going to return us methods mapping GET (Read), POST (Create), PUT (Update), DELETE (Destroy).

Now we can successfully CRUD the data. The next step is to return desired services for users with [design pattern].

* URL shortening service should use singleton pattern to avoid multiple shortened URL to be created for one URL.
* Analytics service should use observer or strategy pattern
  * If the calculations take time, we can use observer pattern to trigger analytics data calculations right after key information updates. But I think it will not be the case in this system.
  * If we need multiple same key statistics with some difference on different environments, we may need strategy pattern; for example, users all care about the click rate of tinyURL but definition of denominator and numerator may be the same of different on different components. Then we can initiate multiple services with the combinations of the methods to calculate denominator and numerator.
* User management service should use decorator pattern to return different data given the type of users; for example, we may need to examine the authentication of users before they use an API. Then we can have decorator to decorate the ability based on the identity of the users.
* External service should use adapter pattern to connect different data source with same method; for example, we know google and facebook both provide statistics and we can write a method to deal with these two different APIs. Then although both use `connect` method, based on the adaptor, we can connect the APIs successfully and do the next steps.

### Design Algorithm

Sometimes we do not need to re-design a system but we want to solve an algorithm.

* Step 1: Ask Questions, try to find out the input and output of this function.
* Step 2: Make Believe, assume there is no limitations first, so that we can find the general solutions.
* Step 3: Get Real, try to write down pseudocode first and even start compose the functions.
* Step 4: Solve Problems, during step 3, there will be more problems occurs and keep iterating.

### Post-Event Solutions

As the traffic increases, we may need some common solutions to solve this issue.

* [scalability]
* [distributed system]
* [cloud computing]
* failures: Systems are prone to failures, and it's crucial to plan for them. Identify potential points of failure in your system and design appropriate measures to handle them.
  * Redundancy
  * Fault tolerance
  * Error handling
  * Disaster recovery strategies
* Availability and Reliability: Availability refers to the percentage of time a system is operational and accessible to users. Reliability is the probability that the system will remain operational over a specified period.
  * Load balancing
  * Clustering
  * Monitoring
  * Automated failover
* Read-heavy vs. Write-heavy: Depending on whether your system is more read-heavy or write-heavy, you can design strategies such as queuing writes for write-intensive applications or utilizing caching mechanisms for read-intensive applications to optimize performance and mitigate potential failures.
  * Read-heavy systems often benefit from distributed systems and caching strategies.
  * Write-heavy systems require careful design to ensure data consistency and handle the high volume of write operations.
* Security threats pose significant risks to a system. Identify potential security vulnerabilities and design appropriate security measures to protect your system. This can include authentication mechanisms, access controls, encryption, input validation, and robust error handling to prevent attacks like injection, cross-site scripting, and data breaches.
* Networking Metrics: Networking metrics are essential for monitoring and optimizing network performance. Metrics such as bandwidth, latency, packet loss, and throughput provide insights into the health and efficiency of a network. By regularly measuring and analyzing these metrics, network administrators can identify bottlenecks, troubleshoot issues, and make informed decisions to improve overall network performance.

## Reference

cracking the coding interview

chatGPT
