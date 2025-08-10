# Title

## Purpose

The internet is a system to connect all computers globally, mainly using internet protocol suite, which includes protocols like TCP and IP, to communicate with all the devices in the network.

## Concept

### TCP/IP Model

* foundation
  * Transmission Control Protocol (TCP)
  * Internet Protocol (IP)

A simple structure of TCP/IP is as follow:

![stack](assets/img/TCP_IP)

* Application layer: This is where high-level protocols like HTTP and FTP operate. It's responsible for handling specific details of the application-level communication.
* Transport layer: This layer is responsible for end-to-end communication services for applications. It provides services such as connection-oriented data stream support, reliability, flow control, and multiplexing.
* Network layer (IP): This layer is responsible for packet forwarding including routing through different routers. When the number of computers grows, we need to specify the address (IP address) to identify the receiver. All the computers in this network are referred to as nodes.
* Link layer: This layer is responsible for network access and communication of data on a physical network link. A computer (sender) wants to send data to another computer (receiver), the sender will send electromagnetic signals. These signals travel through wired or wireless connections from sender to receiver.

The visualization of network:
![stack](assets/img/internet_network)

* **Packet Switching**: The concept of packet switching is that it **breaks down the data** into small pieces and transfer these pieces with any possible routes to the destination and reassemble these pieces to show the complete data to the users at the destination.

At the moment when the data is going to be sent, the available routes may be as follow:
![stack](assets/img/network_routes)

1. If there is arrows between nodes, then there is connection between the two computers and we call it the **path**.
2. The number near the arrow is the cost to send a unit of data from sender to receiver.

Based on these two concepts, we can define algorithms such as walk through minimum path and walk through minimum cost.

**TCP is used to make sure the packets are truly transported:**

* The sender wants to send data to the receiver.
* The data is broken down into packets.
* An algorithm determines the best path for each packet to take through the network.
* The packets travel through the network and are reassembled at the destination.
* TCP ensures reliable transmission by requiring the receiver to send an acknowledgment back to the sender for each packet it receives. If the sender does not receive an acknowledgment within a certain timeframe, it assumes the packet was lost and resends it.

### 7 Layers of OSI Model

The OSI model is a conceptual framework that standardizes the functions of a communication system into seven distinct categories. Here they are, from top to bottom:

* Application Layer: This is where network applications and application protocols (HTTP, FTP, SMTP, etc.) reside. It interacts directly with the software application.
* Presentation Layer: This layer is responsible for data translation, encryption, and compression. It ensures that data is in a usable format and is where data encryption occurs.
* Session Layer: This layer establishes, manages, and terminates connections between applications at each end. It handles the setup and teardown of conversations, exchanges, and dialogs between the applications.
* Transport Layer: This layer provides reliable data transport services to the upper layers. The protocols at this layer (like TCP) can provide error checking and recovery of data which wasn't properly received.
* Network Layer: This layer is responsible for data routing, packet switching, and control of network congestion. Routers operate at this layer.
* Data Link Layer: This layer provides error-free transfer of frames from one node to another, and controls access to the physical media. Switches operate at this layer.
* Physical Layer: This is the lowest layer of the OSI model. It deals with the physical characteristics of the transmission medium, including connectors, voltage levels, and timing.

### Application Layer

After the data arrives at destination, the receiver use Hypertext Transfer Protocol, abbreviated to [HTTP]({{site.baseurl}}/internet/2021/04/09/http.html), to translate the data from sender and then the page will show up on the receiver’s browsers.

### Domain Name System (DNS)

This operates at the Application layer. It's a service that translates human-friendly domain names into IP addresses.

### Internet Service Providers (ISPs)

ISPs operate at all layers. They provide the physical infrastructure (Link layer), route your data packets (Network layer), ensure reliable communication (Transport layer), and may also provide application-level services like email or web hosting (Application layer).

### Networking Hardware

Devices like routers, switches, and hubs primarily operate at the Link layer (for devices like hubs and switches) and Network layer (for routers), facilitating the transmission and routing of data.

### Security

Security spans all layers. Encryption can occur at the Transport layer (like with TLS) or the Application layer (like with HTTPS). Firewalls can operate at various layers, blocking traffic based on IP address (Network layer) or based on the type of application (Application layer).

### Internet Governance

This isn't tied to a specific layer but is an overarching concept that impacts the entire structure and operation of the Internet.

### Networking Metrics

* Bandwidth:
  * Purpose: Determines the maximum data transfer rate of a network connection.
  * Concept: Measures the capacity of a network to transmit data, typically expressed in bits per second (bps).
  * Example: A network connection with a bandwidth of 100 Mbps can transfer up to 100 megabits of data per second.
* Latency:
  * Purpose: Measures the time it takes for data packets to travel from source to destination.
  * Concept: Represented in milliseconds (ms), it indicates the delay or responsiveness of the network.
  * Example: A network with a latency of 50 ms means it takes 50 milliseconds for data to travel from one point to another.
* Packet Loss:
  * Purpose: Indicates the percentage of packets that fail to reach their destination.
  * Concept: Caused by various factors like network congestion or faulty equipment.
  * Example: If 5 out of 100 packets fail to reach their destination, the packet loss rate is 5%.
* Jitter:
  * Purpose: Measures the variation in latency over time.
  * Concept: High jitter can lead to inconsistent or poor-quality audio and video streams.
  * Example: If one packet experiences a delay of 30 ms and the next 50 ms, the jitter is 20 ms.
* Throughput:
  * Purpose: Indicates the actual data transfer rate over a network.
  * Concept: Measured in bits per second (bps).
  * Example: A network with a throughput of 50 Mbps can transfer 50 megabits of data per second.
* Round-trip time (RTT):
  * Purpose: Measures the time for a packet to travel from source to destination and back.
  * Concept: Often used in network diagnostics.
  * Example: If the RTT is 100 ms, it takes 50 ms for the packet to reach the destination and another 50 ms to return.
* Network Availability:
  * Purpose: Represents the percentage of time a network is operational and accessible.
  * Concept: Critical for measuring network reliability and downtime.
  * Example: A network with 99% availability is operational for 99% of the time.
* Network Utilization:
  * Purpose: Measures the percentage of available network resources being used.
  * Concept: Indicates network efficiency and potential bottlenecks.
  * Example: If 50% of network resources are being utilized, the network utilization is 50%.
* Error Rate:
  * Purpose: Measures the frequency of errors or corrupted data packets.
  * Concept: High error rates can indicate network issues or transmission medium problems.
  * Example: If 10 out of 100 packets are corrupted, the error rate is 10%.
* Quality of Service (QoS):
  * Purpose: Ensures that critical applications receive necessary resources and bandwidth for optimal performance.
  * Concept: Prioritizes certain types of traffic over others.
  * Example: Video conferencing traffic might be given higher priority than file downloads to ensure smooth communication.

## Reference

[Internet - Wikipedia](https://en.wikipedia.org/wiki/Internet)
[Transmission Control Protocol - Wikipedia](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
[The Internet protocol suite (article) | Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:the-internet-protocol-suite/a/the-internet-protocols)

[**What is Packet Switching? Definition & FAQs | Avi Networks**  
_Back to Technical Glossary Packet Switching transmits data across digital networks by breaking it down into blocks or…_avinetworks.com](https://avinetworks.com/glossary/packet-switching/ "https://avinetworks.com/glossary/packet-switching/")[](https://avinetworks.com/glossary/packet-switching/)

[http://www2.cs.uidaho.edu/~krings/CS420/Notes-F16/420-16-18-DCC10-Chap-19.pdf](http://www2.cs.uidaho.edu/~krings/CS420/Notes-F16/420-16-18-DCC10-Chap-19.pdf)

[https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http)