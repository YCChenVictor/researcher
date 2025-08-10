---
layout: post
title: How OS Works
description: ''
date: '2021-12-04'
categories: OS
note: p5 要加一個可以打字的功能，我可能要切一個 develop 分支
publish: true
---

## Introduction

Operating System serves as the communicator between computer hardware and computer software applications.

<div id='os' class='h-screen justify-center items-center'>
  <div id='os_toggle_erase' class=''></div>
  <div id='os_image_save' class=''></div>
  <div id='os_canvas' class='border'></div>
</div>

<script>
  const id = 'os'
  let binarySearchTree = p5Draw(id)
  let binarySearchTreeP5 = new p5(binarySearchTree, id);
</script>

## Why?

Without it, the computer will not operate the Apps we want.

## How?

Typically, functions as follow:

* memory management
* process management
* device management
* file management
* security
* performance monitoring
* job accounting
* error detecting aids
* coordination between other software and users

### memory management

Given processes in a computer, memory management checks how much memory to be allocated, what time to allocate the memory, and update the status of memory once some memory gets freed or unallocated.

### device management

In order to handle physical and virtual devices, device controller born in OS. Physical device includes all Input/Output devices and virtual devices mimics physical device in software, serving as device in system, making system to believe a particular hardware exists.

### file management

Recorded on secondary or non-volatile storage such as optical disks and used as medium for input and output of data.

### security

To prevent threats and attacks, several ways: regular OS patch updates, antivirus engines and software, firewall, stratification of authorization.

### performance monitoring

To optimize the OS, we need logs from performance monitoring for further optimization.

### job accounting

For tracking the time and resources used by various jobs and users.

### error detecting

Given noise in transmission of data, error detecting ensures reliable delivery of data by patching the data on time.

### coordination

Given lots of program at the sametime, OS corrdination serves to schedule these programs.

## What?

In this section, let's take a look at the above functions in operating systems and explore them with following steps:

1. user click an app on the computer UI
2. the app start to run and it need some computation
3. the data flow to operation system
4. operation system call hardware (CPU, RAM, I/O) to compute it
5. data sent back to OS
6. OS send data back to app
7. user get what they want in UI

### Mac OS

(to be continued)

## Reference

[Operating system](https://en.wikipedia.org/wiki/Operating_system)

[os_overview](https://www.tutorialspoint.com/operating_system/os_overview.htm)

[Operating System - Memory Management](https://www.tutorialspoint.com/operating_system/os_memory_management.htm)

[Device Management in Operating System](https://www.javatpoint.com/device-management-in-operating-system)

[ile Systems in Operating System: Structure, Attributes, Types](https://www.guru99.com/file-systems-operating-system.html)

[What Does Operating System Security (OS Security) Mean?](https://www.techopedia.com/definition/24774/operating-system-security-os-security)

[Operating System and Process Monitoring Tools](https://www.cse.wustl.edu/~jain/cse567-06/ftp/os_monitors/)

[Job accounting keeping track of time and resources](https://www.coursehero.com/file/p1lu4vm/Job-accounting-Keeping-track-of-time-and-resources-used-by-various-jobs-and/)

[Error detection and correction](https://en.wikipedia.org/wiki/Error_detection_and_correction)
