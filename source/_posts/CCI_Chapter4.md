---
title: Cracking the Coding Interview - Chapter 4 Tree and Graph
id: 73
categories:
  - Cracking the Coding Interview (Fifth edition)
date: 2015-04-15 17:14:24
tags:
---

# Chapter 4 Tree and Graph

4.1 Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.

*   根据题目，一颗二叉树的平衡是指深度最小和最大的叶子节点深度差不超过1.
*   我们可以遍历二叉树找出最小深度和最大深度的叶子节点，然后求深度差.
*   我们使用vector来存储每个节点的深度，之后比较最大深度与最小深度.
*   [Q4.1_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.2 Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

*   从给定的点遍历图如果不用回退能到达另一个节点说明两个节点之间存在路径
*   可以简单的修改BFS算法，在a节点遍历完之后，不回退，如果访问过b节点则存在路径
*   [Q4.2_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/GraphHelper.java)

4.3 Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.

*   要构建BST，它的中序遍历也应该是一个递增序列.
*   要使树的高度最小，我们需要是左右子树的高度尽可能相同，所以中分数组，之后再中分
*   [Q4.3_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.4 Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g. if you have a tree with depth D, you'll have D linked lists).

*   遍历二叉树，计算当前节点的深度，构造Vector<Vector<TreeNode>>, 将当前节点存入其链表，
*   比如depth是n，就存入index 为n的链表中.
*   [Q4.4_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.5 Implement a function to check if a binary tree is a binary search tree.

*   二叉搜索树的左节点<父节点<右节点
*   使用中序遍历得到的结果如果是一组由小到大排序的数组，则是二叉搜索树。
*   [Q4.5_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.6 Write an algorithm to find the 'next' node(i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.

*   分两种情况，如果一个节点有右子树，其successor即位右子树上的最左节点，
*   如果一个节点没有右子树，其successor为第一个大于它的祖先节点.
*   [Q4.6_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.7 Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a structure. NOTE: This is not necessarily a binary search tree.

*   使用map，将第一个节点的所有父节点存入map
*   遍历第二个节点的父节存入map中，第一个重复的即为第一个共同的祖先节点
*   [Q4.7_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)

4.8 You have two very large binary trees: T1, with millions of nodes, and T2, with hundreds of nodes. Create an algorithm to decide if T2 is a subtree of T1.

A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2\. That is, if you cut off the tree at node n, the two tree would be identical.

*   暴力方法，在T1中找到T2的根节点，然后开始匹配左右子树
*   如果二叉树中节点的值都不相同，则可以使用一种相同的遍历，将两棵树的遍历存成数组，然后比较一个是不是另一个的子串。

4.9 You are given a binary tree in which each node contains a value. Design an algorithm to print all paths which sum to a given value. The path does not need to start or end at the root or a leaf, but it must go in a straight line down.

*   这道题可以直观的转化为查找路径，我们要找和为规定值的所有路径，
*   因为要求路径必须是从上直接到下即不能回退，所以这些路一定包含在从跟节点到所有叶子的全部路径中
*   所以我们可以在查找全部根节点至叶子节点的路径中计算路径和
*   思路即查找所有根节点至叶子节点的路径，将他们存成vector，在每个vector中在查找和为规定值的路径
*   有多少叶子节点，就要存多少个vector。
*   [Q4.9_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/DataStructures/TreeGraph/BinaryTreeHelper.java)