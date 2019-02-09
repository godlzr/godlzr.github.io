---
title: Cracking the Coding Interview - Chapter 3 Stacks and Queues
id: 67
categories:
  - Cracking the Coding Interview (Fifth edition)
date: 2015-04-09 03:29:22
tags:
---

## Chapter 3 Stacks and Queues

3.1 Describe how you could use a single array to implement three stacks.

*   We can divide the array into three equal parts,
*   And the bases of each stack are 0, n/3, 2n/3,
*   We can set a array to store the top of the stack,
*   So we can implement pop() push(), peek().

3.2 How would you design a stack which, in addition to push and pop, also has a function min which returns the minimum element? Push, pop and min should all operate in O(1) time.

* 设计一个stack，使他拥有方法min可以返回stack中的最小值，保证所有操作都是O(1).
*   可以在stack中新增一个栈minStack，
*   有元素压栈时判断其与minStack栈顶大小，小于栈顶，将其压入minStack栈
*   弹栈时，判断是否为minStack栈顶元素，是一起弹栈
*   [Q3.2_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/StackWithMin.java)

3.3 Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure _SetOfStacks_ that mimics this. _SetOfStacks_ should be composed of several stacks and should create a new stack once the previous one exceeds capacity. _SetOfStacks.push()_ and _SetOfStacks.pop(_) should behave identically to single stack (that is, pop() should return the same values as it would if there were just a singly stack).

FOLLOW UP

Implement a function _popAt(int index_) which performs a pop operation on a specific sub-stack.

*   这里我们使用Vector Stack 来模拟这个SetOfStacks，需要给stack类添加一个length变量来保存其长度
*   push：当当前的stack达到阀值长度，增加一个新的stack到vector中，在新的stack中push，标记加一
*   pop：当单签的stack长度为1时，pop(),将该stack从vector中删除，并将标记减一
*   popAt:对指定stack 弹栈操作，这里有一个问题，当弹位于中间的栈时，按照理论，之后的stack中的元素应该向下滑一位。
*   这里较难处理，我们用一个新的栈tmpstack，当弹中部的栈时，将前面的栈中所有元素依次压入tmpstack，
*   再将tmpstack中的所有元素依次弹栈俨如SetOfStacks.
*   [Q3.3_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/SetOfStacks.java)

3.4 In the classic problem of the Towers of Hanoi, you have 3 towers and N disks f different sizes which can slide onto any tower. The puzzle starts with disks sorted in ascending order of size from top to bottom (i.e., each disk sits on top of an even larger one). You have the following constraints:

(1) Only one disk can be moved at a time.

(2) A disk is slid off the top of one tower onto the next tower.

(3) A disk can only be placed on top of a larger disk.

Write a program to move the disks from the first tower to the last using stacks.

*   汉诺塔的解法很简单，要把n个盘子移到最右柱子上，就要把n-1个移到中间，再把第n个移到右柱
*   同理就要把就要把n-1个移到中间，就要n-2 移到右柱
*   使用递归
*   [Q3.4_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/HanoiTower.java)

3.5 Implement a MyQueue class which implements a queue using two stacks.

*   queue 是FIFO，stack是LIFO.
*   使用两个栈，一个为入栈，一个为出栈
*   enqueue时将所有元素压入入栈，进队的元素压入入栈栈顶，
*   dequeue时将所有元素压入出栈，出队的元素从出栈栈顶弹出.
*   为了减少不必要的移动我们在入队时不考虑出栈是否为空
*   我们只要在出对是判断出栈是否为空，为空则将入栈元素压入出栈再出队即可.
*   两实现

*   [Q3.5_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/MyQueue.java)

3.6 Write a program to sort a stack in ascending order (with biggest items on top). You may use at most one additional stack to hold items, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.

*   第二个stack可以用来排序，
*   当第一个stack栈顶元素弹出时，将第二个stack中的比该元素大的依次弹出压入第一个stack中
*   再将该元素压入二栈，第一个stack栈顶元素弹出，如果大于第二栈顶元素则直接压入第二个栈中。
*   [Q3.6_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/StackHelper.java)

3.7 An animal shelter holds only dogs and cats, and operates on a strictly "first in, first out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like, Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog and dequeueCat. You may use the built-in LinkedList data structure.

*   我使用两个queue来分别保存dog和cat，
*   但是在dog和cat的父类中加入index来区分dog和cat的顺序
*   当dequeueAny时，判断 dog和cat 队头的顺序来确定哪种动物出队
*   这个类完成的比较完整！！！！
*   [Q3.7_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/StacksQueues/Shelter.java)