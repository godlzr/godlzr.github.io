---
title: Cracking the Coding Interview - Chapter 2 Linked List
id: 56
categories:
  - Cracking the Coding Interview (Fifth edition)
date: 2015-04-06 00:06:19
tags:
---

# Chapter 2 Linked List

###### 2.1 Write code to remove duplicates from an unsorted linked list.

###### FOLLOW UP

###### How would you solve this problem if a temporary buffer is now allowed?

*   如果可以使用临时区域，我们使用hash表来判断元素是否重复
*   如果不使用临时区域，我们用两个指针，从前向后依次遍历判断是否有后继节点与之前的节点相同
*   [Q2.1_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)

###### 2.2 Implement an algorithm to find the kth to last element of a singly linked list.

*   在单链表中找到倒数第k个元素
*   如果链表的长度已知， 则倒数k个元素即正数（length-k），这种情况太简单，明显不是要考察的
*   一种方法是使用递归，依次遍历到最后一个元素，然后向前递归查找第k个,需要一个全局变量来计数
*   另种方法是双指针，两个指针差k位，同时向后移动至后指针指到最后一个元素，返回前指针指向的元素即可
*   [Q2.2_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)

###### 2.3 Implement an algorithm to delete a node in the middle of a singly linked list, given only access to that node.

###### EXAMPLE

###### Input: the node c from the linked list a->b->c->d->e

###### Result: nothing is returned, but the new linked list looks like a->b->d->e

*   middle指的是中间的某个不是正中间
*   需要考虑4种情况即，A: c为头节点，B: c 为中间节点， C: c为尾节点，D: c为null
*   情况C比较特殊，因为你无法删除c，可以增加标志位，不打印c，来处理这种情况
*   [Q2.3_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)

###### 2.4 Write code to partition a linked list around a value x, such that all nodes less than x come before all node greater than or equal to x.

*   不要求排序
*   建立两个链表，一个大于x，一个小于x
*   遍历链表，将元素加入这两个链表，然后将其拼接
*   [Q2.4_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)

###### 2.5 You have tow numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list, Write a function that adds the two numbers and returns the sum as a linked list.

###### EXAMPLE

###### Input: (7->1->6) + (5->9->2). That is, 617+ 295.

###### Ouput: 2->1->9. That is, 912.

###### FOLLOW UP

###### Suppose the digits are stored in forward order. Repeat the above problem.

###### EXAMPLE

###### Input: (6->1->7) + (2->9->5). That is, 617 + 295.

###### Output: 9->1->2. That is, 912.

*   答案给的是使用递归，建立新链表，按位相加。
*   我自己写的是，先按位相加得到和，然后根据和构造sum链表
*   [Q2.5_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)

###### 2.6 Given a circular linked list, implement an algorithm which returns the node at the beginning of the loop.

###### DEFINITION

###### Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.

###### EXAMPLE

###### Input: A->B->C->D->E->C [the same C as earlier]

###### Output: C

*   最简单的思路是使用hashmap，将元素一个个存入判断是否已存在
*   返回第一个重复的元素，即环入口
*   [Q2.6_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java).
  
###### 2.7 implement a function to check if a linked list is palindrome.

*   思路是比较前一半的元素和后一半的元素
*   可以使用栈，将前一半的元素压栈，然后和后一半的逐个比较。
*   需要注意的是元素的个数是可能是奇数，加一个判断，为奇数就跳过中间的元素。
*   [Q2.7_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/LinkedList/linkedListHelper.java)