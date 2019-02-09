---
title: Cracking the Coding Interview - Chapter 1 Arrays and Strings
id: 26
categories:
  - Cracking the Coding Interview (Fifth edition)
date: 2015-03-27 21:48:08
tags:
---
# Chapter 1 Arrays and Strings

###### 1.1 Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

*   首先确定构成字符串的字符集有多大？是ASCII字符，还是只是26个字母？ 还是有更大的字符集，对于不同的情况，我们可能会有不同的解决方案。
*   ASCII：标准ASCII 码也叫基础ASCII码，使用8 位二进制数来表示所有的大写和小写字母，数字0 到9、标点符号， 以及在美式英语中使用的特殊控制字符， ASCII 码表共有**258**位字符。
*   如果我们假设字符集是ASCII字符，那么我们可以开一个大小为256的bool数组来表征每个字符的出现。数组初始化为false，遍历一遍字符串中的字符，当bool数组对应位置的值为真， 表明该字符在之前已经出现过，即可得出该字符串中有重复字符。否则将该位置的bool数组 值置为true。
*   [Q1.1_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/stringHelper.java "Implementation")

###### 1.2 Implement a function void reverse(char *str) in C or C++ which reverses a null terminated string.

*   使用C++位操作,做地址交换。

```
	a1              0101110101
	b1              1011101011
	a2 = a1^b1      1110011110
	b2 = a2^b1      0101110101(a1)
	a3 = a2^b2      1011101011(b1)
```

*   获取字符串长度，从首尾两端开始两两交换。
*   [Q1.2_Implementation](https://github.com/godlzr/CrackingCodingInterviewCpp/blob/master/CrackingCodingInterviewCpp/stringHelper.cpp "Q1.2_Imp")

###### 1.3 Given two strings, write a method to decide if one is a permutation of the other.

*   将字符串转换成字符数组（toCharArray()）后排序(Arrays.sort())
*   然后比较两个字符数组(Arrays.equals(string a, string b))
*   [Q1.3_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/stringHelper.java "Implementation")

###### 1.4 Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end of the string to hold the additional characters, and that you are given the "true" length of the string.(Note: if implementing in Java, please use a character array so that you can perform this operation in place.)

EXAMPLE

Input: "Mr_John_Smith",13

Output:"Mr%20John%20Smith"

*   首先遍历字符串记录空格个数，计算新的 字符串长度=原长度+2*空格数
*   将原字符串的内容以此填入新的字符串，遇到空格填入“%20”
*   [Q1.4_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/stringHelper.java "Implementation")

###### 1.5 Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabccccccaaa would become a2b1c5a3\. If the "compressed" string would not become smaller than the original string, you method should return the original string. You can assume the string has only upper and lower case.

*   建立一个新的StringBuffer字符串newstr，和count.
*   遍历字符串str, 计算压缩后的长度, 判断两个字符串长度，如果newstr长度不小于str长度，输出str.
*   第一个字符写入newstr
*   后一个字符和前一个字符相同则count++，不同则将数字写入newstr，后count=0，写入新的字符
*   遍历完成，输出newstr
*   [Q1.5_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/stringHelper.java "Implementation")

###### 1.6 Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

*   Do this in place, 即不开辟新的空间，在原数据结构中操作
*   我们可以将matrix由外之内分层，一层一层进行旋转操作
*   ![](https://lh5.googleusercontent.com/-PYq_I9DzGWo/VRnY2DG2GHI/AAAAAAAAANc/k3vpW6fQHaI/w1258-h1230-no/IMG_20150330_191308~2.jpg)
*   [Q1.6_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/matrixHelper.java)

###### 1.7 Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0

*   建立两个一维数组，分别对应矩阵的长和宽，并赋值false
*   遍历矩阵，遇到0，将对应长款数组中的元素赋值为true
*   遍历矩阵，如果当前元素的行号列号在长宽数组中为true，将该元素置为0
*   [Q1.7_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/matrixHelper.java)

###### 1.8 Assume you have a method _isSubstring( )_ which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to _isString( ) _(e.g., "waterbottle" is a rotation of "erbottlewat").

*   isSubstring( )可以用 String.isContatin()实现
*   如果字符串是一个旋转字符串，则首位应该相连，如“erbottlewat”中 “er”与“wat”相连
*   如果将这个字符串，复制拼接“erbottle**wat**”+“**erbottle**wat”=“erbottle**waterbottle**wat”，则其中一定含有一个完整的字串
*   所以判断(s1+s1).isSubString(s2)
*   [Q1.8_Implementation](https://github.com/godlzr/CrackingCodingInterview/blob/master/src/com/ArrayString/DataStructures/stringHelper.java "im")