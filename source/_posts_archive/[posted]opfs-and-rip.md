---
title: OSPF and RIP
tags:
  - Networking and Protocol
id: 113
categories:
  - Networking and Protocol
date: 2015-05-04 04:10:01
---

1\. OSPF, open shortest path first is a IGP routing protocol, it works in local area network based on shortest path first algorithm (dijkstra algorithm), it keeps track the topology of the entire network. And each router in the network maintain a shortest path tree indicate the shortest path to each destination and the closet router to send for each communication.

2\. While RIP only track the closet router for each destination, and maintain a routing table for the fastest route from computer to computer. It is commonly used for the small network, because it count hops as metric, and it is only works for 15 hops, It use UDP to broadcast .

1.  RIP takes hop count into consideration but OSPF takes Path Cost into consideration to exchange routing information between the routers.
2.  RIP serves good when small network is taken care of while OSPF is mostly used for large network.