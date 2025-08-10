---
layout: post
title:
description: ''
date: '2021-04-09T03:37:42.357Z'
categories: internet
note: 那個圖要改掉，自己畫。what 的部分要跟 how 的內容 match。intention 可以進 RFC 裡看。what section 之前的寫太菜了，現在可以在改好一點
publish: true
---

## Introduction

HTTP is on application layer. With this layer, people use understandable logics to operate and achieve their goals; for example, users can use mouse to click a link on webpage in browsers, and then the client side will send requests which follows HTTP and walk through the layers below application layer to server. Given the informations sent from client, server side will parse these informations to decide the next move.

The layers as follow:

<figure>  
  <img src="{{site.baseurl}}/assets/img/http_example.png" alt="">
  <figcaption>reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview</figcaption>  
 </figure>

## Why?

HTTP (HyperText Transfer Protocol) defines the official way for machines to communicate with each other. It normalizes the communications between client side (browsers in Mac, Pc, iPhone, ...etc) and server side on internet.

## How?

For example, a user uses browser and want to see news on website. Then the following steps occur:

1. User input URL (uniform resource locator) in browsers
2. Browsers identify the specific server
3. Browsers send request to the specific server
4. The specific server response data

### Input URL

User knows the specific URL to locate the website and input it into web browser; for example, `http://www.example.com/index.html`. This URL means please use `http` to `GET` `index.html` file from `www.example.com`.

### Identify Specific Server

The browsers will go to the internet try to get `www.example.com`. The way it uses to identify `www.example.com` is **through IP address** with DNS. DNS will map `www.example.com` to a specific IP address for browsers locate the specific server.

#### DNS (Domain Name System)

* Introduction

It can find the IP address with the URL; for example, after we input the `www.example.com,` it will try to find the IP address like `74.125.20.113;` that is, DNS can map URL to a IP address to locate the server on the internet.

* Why

The numbers has no means for human being, so usually we may want a kind of phone book to check the numbers from website name (Domain Name). With Domain Name registered in the DNS, it is easier to memorize as human-being.

* How
  * Suppose the user now input the URL `www.example.com.` The URL represents `third-level-domain.second-level-domain.first-level-domain.` DNS searching procedure: `first-level-domain` -> `second-level-domain` -> `third-level-domain.`
  * The searching procedure: local cache -> ISP cache -> name server
    * Local cache: After we visit a website, the browsers will save the response in the local machine temporally; for example, <img src="{{site.baseurl}}/assets/img/local_cache.png" alt="" width=500> As you can see, there is url: `www.google.com` maps to ip: `172.217.164.100` with IPV4, the fourth version of communication protocol for IP layer. If it finds the mapping on local machine, it will not get ip address from the internet but directly get it on local machine.
    * ISP cache: ISP (internet service provider) provides internet service via Satellite, DSL, Broadband Cable, Fiber-Optic Cable, or Wi-Fi Broadband. While it letting user connect to internet, during user browsing internet, it saves the url mapping IP; as a result, once other user also browses internet via the same route of ISP, although the user did not browse it before, DNS can still get the mapping accordingly.
    * Name server: As mentioned above, DNS is going to search the IP address via `first-level-domain` -> `second-level-domain` -> `third-level-domain,` which is `Root-Name-Servers` -> `TLD-Name-Servers` -> `Host-Name-Servers`
  * Prevent DNS Spoofing: With the method above, we send request to DNS for mapping url to IP address, meaning we can construct fake server to send malware website to a normal urls. To prevent it, we use cryptographic authentication to DNS data, the DNSSEC (Domain Name System Security Extensions)

### Browsers Send Data to The Specific Server

After it locate the server, it will send a HTTP request to the server through internet and the message will go through bottom layers. For example,

```bash
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

**The meaning of this message:** get `/` through `HTTP/1.1` from `www.example.com` and `HTTP/1.1` means the version, 1.1 of HTTP.

An HTTP request from client side contains:

* Version type
  * Example: HTTP/1.0
  * Intention: let sender to tell receiver the format of this http message and the expected format of further http communication
* URL
  * TBC
* method
  * TBC
* Request headers: key information (refer to [wiki](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields))
* body (optional)

### The Specific Server Response data

If the server successfully get the request from browsers, the browsers will return

```bash
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 155
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    <p>Hello World, this is a very simple HTML document.</p>
  </body>
</html>
```
**The meaning of this message:** Successfully locate `HTTP/1.1` and return status `200` and the type of data to be sent is `text/html`. `200` is a kind of HTTP status, meaning success.

An HTTP response from server side contains:

* Status code
* Response headers: key information (refer to [wiki](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields))
* body (optional)

If it fails, the server will return

```bash
HTTP/1.1 404 NOT FOUND
```
Meaning it cannot found `www.example.com` and return HTTP status, `404`

All the status:

```bash
Informational responses (100–199)
Successful responses (200–299)
Redirection messages (300–399)
Client error responses (400–499)
Server error responses (500–599)
```

### Browser Rendering

After your device get the response from other machine through HTTP, your device needs a mechanism to render the response data, the realization of this mechanism occurs in your browser. The data flow as follow:

1. The response data: HTML, PDF, image, ...etc
2. Browsers combined data from UI backend, JavaScript, and Networking (data from backend) and send it to rendering engine
3. The rendering engine parse data and send it to browser engine
4. Browser display data on UI with specifications maintained by W3C

## What?

TBC

### Reference

[Hypertext Transfer Protocol - Wikipedia](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

[HTTP: Hypertext Transfer Protocol (article) Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http)

[An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

[HTTP Requests Codecademy](https://www.codecademy.com/articles/http-requests)

[什麼叫做 Protocol (通訊協定)](https://www.ithome.com.tw/node/6349)

[5 Advantages and Disadvantages of HTTP Drawbacks & Benefits of HTTP](https://www.hitechwhizz.com/2020/08/5-advantages-and-disadvantages-drawbacks-benefits-of-http.html)

[一文搞懂 HTTP 和 HTTPS 是什麼？兩者有什麼差別｜ALPHA Camp Blog](https://tw.alphacamp.co/blog/http-https-difference)

[什麼是 URL 網址 IP ？網域 Domain 中文 意思是什麼？｜鵠崙設計](https://www.design-hu.com/web-news/domain.html)

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

[What is HTTP?](https://www.cloudflare.com/en-gb/learning/ddos/glossary/hypertext-transfer-protocol-http/)

[List of HTTP header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields)

[RFC 1945, Hypertext Transfer Protocol - HTTP/1.0](https://www.rfc-editor.org/rfc/rfc1945)
