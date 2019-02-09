---
title: Expected Cisco Questions
id: 137
categories:
  - Interview Preparation
date: 2015-06-03 00:38:48
tags:
---

Expected Cisco Questions:

50% C programming

30% OS

20% TCP/IP network questions

10% behavior/previous experience

*   **Networking**

    1.  Webex, networking TCP vs UDP.

            1.  TCP(transmission control protocol) is reliable data transfer service, connection-oriented, need a 3-steps handshaking to build the  connection， it provides multiplexing,  full-duplex service, point-to point and congestion control. Most application which need high reliable data transfer service are based on TCP. costs more time and resource.
        2.  UDP(user datagram protocol) is unreliable, connectionless, doesn't keep the connection state and no flow control, but the datagram header is small. faster.

        2.  OSI Model

            1.  Open System Interconnection 7 Layers/5 Layers
        2.  1\. Physical Layer 2.Data Link Layer 3\. Network Layer(IP) 4\. Transport Layer 5\. Session Layer 6\. Presentation Layer 7\. Application Layer

        3.  LAN

            1.  Local Area Network, a local area network (LAN) is a computer network that interconnects computers within a relatively small area, a limited area such as a home, school, computer laboratory, or office building, using network media. The huge number of LANs consists the WAN(wide area network) or Internet.
        2.  Ethernet over twisted pair cabling, and Wi-Fi are the two most common technologies currently used to build LANs.
        3.  TCP/IP is the most common protocol used in the LAN.

        4.  Explain the process when you login to a website

            1.  DNS, send domain name and request to DNS server and get the corresponding ip address of the website. DNS is based on UDP. The ARP protocol was used during the transmission, to get the MAC address of the IP address.
        2.  Browser send TCP connection request to the website. After three-step handshaking the connection is built.
        3.  Http GET request was sent to the website server and get the webpage object.
        4.  Http send TCP end session request to the website server, and the server send back ACK packet to end the session.

        5.  Difference between switch and router

            1.  Switch works in the datalink layer, so switch works with the MAC address, it can't recognize IP address. Router works in the network layer, so it works with IP address.
        2.  Switch filters and forwards packets between LAN segments,it knows exactly which port to send it to, it is designed for transmitting frames.
        3.  Router is to route packets to other networks until that packet ultimately reaches its destination. One of the key features of a packet is that it not only contains data, but the destination address of where it's going.Router use protocols such as ICMP to communicate with each other and configure the best route between any two hosts.

        6.  how to prevent looping in layer-3: Routing Information Protocol (RIP)

            1.  split horizon, router doesn't send a routing table update to the port where the update come from
        2.  route poisoning, set the unreachable node to be infinite instead of deleting it.
        3.  holddown timer, if a router receive a bigger routing update, it mark the node is unreachable and start holddown timer, after the timer stop, if it didn't receive update from that node, it  update the routing table.
        4.  Timer, if a router didn't get the response from another one for a period , it will define that router is unreachable and modify the route table, and inform its neighbours.

*   **Programming**

    1.  Linked List in C
    2.  program in ring buffer.

            1.  circular buffer, designed for FIFO
        2.  need four pointers, start, end, read and write.
        3.  [circular buffer implementation](http://zh.wikipedia.org/wiki/%E7%92%B0%E5%BD%A2%E7%B7%A9%E8%A1%9D%E5%8D%80)

        3.  Array and linked list reversal.
    4.  how would you find a issue and debug a program.
    5.  bit operation in C
    6.  Count the number of 1’s and 0’s

            1.  int countOnes(int value) {for(int count =0; value!=0; count++, value&amp;=value-1)}

        7.  A series of duplicate number, print the number only once in a efficient way.

            1.  a array check[10], all equal 0; traver色 the numbers set the is check[n] = 0, print, set to 1.

        8.  how to understand linked list is planar or loop?

            1.  planar means linear
        2.  loop means the end node point to the head of the linked list.

        9.  sorting merging and searching
    10.  singly and doubly linked list
    11.  Write code to implement a Binary search. Then construct a Binary search tree. Talk about AVL tree. Describe the
    12.  Do factorial calculation using recursion
    13.  Write a reverse linked list

*   **OS**

    1.  what’s the difference between process and thread?

            1.  A process is a executing instance of an application. A thread is a path within a process, so a process can contain multiple threads.
        2.  Since a process can consist of multiple threads, a thread could be considered a ‘lightweight’ process. Thus, the essential difference between a thread and a process is the work that each one is used to accomplish. Threads are used for small tasks, whereas processes are used for more ‘heavyweight’ tasks – basically the execution of applications.
        3.  Another difference between a thread and a process is that threads within the same process share the same address space, whereas different processes do not. This allows threads to read from and write to the same data structures and variables, and also facilitates communication between threads. Communication between processes is quite difficult and resource-intensive.
        4.  1\. Threads are easier to create than processes since they don't require a separate address space.
2\. Multithreading requires careful programming since threads share data structures(critical section) that should only be modified by one thread at a time. Unlike threads, processes don't share the same address space.
3\. Threads are considered lightweight because they use far less resources than processes.
4\. Processes are independent of each other. Threads, since they share the same address space are interdependent, so caution must be taken so that different sections don't step on each other.
5\. A process can consist of multiple threads.

        2.  OS concept, what is Mutex and Semaphore

            1.  Mutexes are typically used to serialise access to a section of re-entrant code that cannot be executed concurrently by more than one thread. A mutex object only allows one thread into a controlled section, forcing other threads which attempt to gain access to that section to wait until the first thread has exited from that section.                                                                                                                              MYWORDS: mutex is used to lock the resource which only allows to be accessed by one thread at one time. After the thread exits, the mutex is open, and allow the following thread to access the resource.
        2.  A semaphore restricts the number of simultaneous users of a shared resource up to a maximum number. Threads can request access to the resource (decrementing the semaphore), and can signal that they have finished using the resource (incrementing the semaphore).                                                             MYWORDS: A semaphore is restricts the number of threads of a shared resource, it equals the maximum number that the resource allows the threads to access. if a thread access the resource the semaphore -1, if a thread finish using the resource, the semaphore +1, if the semaphore = 0, on more thread can access the resource.

        3.  Disadvantages of thread

            1.  Multithreaded programs must be carefully programmed to prevent those bad things from happening. Sections of code that modify data structures shared by multiple threads are called critical sections. When a critical section is running in one thread it’s extremely important that no other thread be allowed into that critical section. This is called synchronization, which we wont get into any further over here. But, the point is that multithreading requires careful programming.
        2.  No security between threads.
One thread can stomp on another thread's data.
If one thread blocks, all threads in task block.

        4.  why use thread?

            1.  thread requires far less resources than processes, it's faster to start a thread than process.
        2.  threads can communicate with each other since they share the same resource within a process. The communication is very difficult for different processes.
        3.  Multithreading can increase the utilization rate of the CPU.
        4.  thread can increase the response speed of an application, since it runs faster and requires less resource.

        5.  difference between binary semaphore and mutex.

            1.  while mutex is used to implement mutual exclusion, Mutex can be released only by thread that had acquired it,
        2.  binary signal can be release by any other threads (or process), binary semaphore is used to implement synchronization.

        6.  write a real time clock.
    7.  memory management.