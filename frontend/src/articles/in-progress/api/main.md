## Purpose

An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate and interact with each other. It defines the methods, data formats, and rules for exchanging information between applications. With API, developers can access the functionality of one system within another system, without having to know the details of how the underlying system works.

## Concept

### Web APIs

APIs enable communication between web applications, allowing access to resources and data over the internet using protocols like HTTP.

* The CRUD operations (create, read, update, delete) correspond to POST, GET, PATCH/PUT, DELETE in [HTTP]({{site.baseurl}}/internet/2021/04/09/hypertext-transfer-protocol.html).
* Format
  * JSON API
  * RESTful API
* Authentication: APIs often require [authentication]({{site.baseurl}}/api/2022/08/17/authentication.html) to ensure that only authorized users or applications can access certain resources or perform specific actions. Common authentication methods include API keys, OAuth, and token-based authentication.

### Library/APIs
  
These are collections of pre-written functions and methods that provide specific functionalities and can be utilized by developers within their applications.

* Usage: Developers typically import the library/API into their projects and utilize its functions or methods according to the provided documentation.
* Format: APIs can be available as standalone libraries, modules, or packages, which developers include in their projects through dependency management systems like npm for JavaScript, pip for Python, or Maven for Java.
* Example: Axios is a popular library API in JavaScript that simplifies making HTTP requests and handling responses, allowing developers to easily communicate with web servers and retrieve data.

### Operating System APIs

Operating systems provide APIs that allow developers to interact with the underlying system resources and services.

* Usage: Developers can utilize operating system APIs to perform various tasks such as file management, process control, memory allocation, and hardware interaction within their applications. APIs are typically accessed through programming languages like C, C++, or through language-specific wrappers or libraries.
* Format: Operating system APIs are typically provided as libraries or sets of header files that developers include in their source code. They consist of functions, data structures, and constants defined according to the operating system's specifications.
* Example: Windows API or POSIX API for Unix-like systems.

## references

[表现层状态转换](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)

https://ihower.tw/rails/restful.html

[REpresentational State Transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)