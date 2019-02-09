---
title: 'C language Union，Struct, Enumerations and C++ language Struct, Class.'
tags:
  - C/C++
id: 166
categories:
  - C/C++
date: 2015-07-20 03:24:55
---

**C Enumeration:**

	Enumeration is a set&nbsp;of the ordered elements. Each element corresponds to a number. If you don&#39;t define the corresponding number for each element, they will corresponding from 0 to n by default. And you can define the corresponding number for the element, and the undefined element will corresponding to the number of previous element plus 1 since they are stored in the continuous memory addresses. The enum element are constant, they can&#39;t be changed after definition.

	枚举类型是排序好的一组元素集合，每一个元素可对应一个数字，程序员可以给元素定义它的对应数字，默认的是从0开始一个一个逐次对应，没有定义对应数字的元素默认的对应数字比其前一个元素对应的数字大1，因为他们默认的是保存在地址连续的一串内存当中。

*   枚举元素是常量，定义之后不能赋值。
*   元素有值，编译时按定义时的顺序使它们的值为0，1，2...
*   枚举值可以作比较
*   一个整数不能直接赋值给枚举变量，要转换为相应的枚举类型。

	**C Union:&nbsp;**

	In C programming, sometimes, we need to store some different type of variable in a same memory block. That&#39;s a kind of coverage technique, the value of the latter variable will cover the previous variable. This structure which&nbsp;allows several different types of &nbsp;variable share a same memory block is called &quot;Union&quot; in C.

	在进行某些算法的C语言编程的时候，需要使几种不同类型的变量存放到同一段内存单元中。也就是使用覆盖技术，几个变量互相覆盖。这种几个不同的变量共同占用一段内存的结构，在C语言中，被称作&ldquo;共用体&rdquo;类型结构，简称共用体，也叫联合体。

*   每一瞬间只能存放其中一种。
*   存放的是最后一次存放的成员
*   共用体变量的地址和其各成员的地址都是同一地址
*   不能对共用体变量名赋值，也不能在初始化时赋值
*   共用体变量不能作为函数参数
*   可以在结构体中使用共用体变量

	**C Struct:**

	In C, struct is a kind of data structure, belong to aggregate data type. Struct can be defined as variable, pointer and array. It is a set of different types of data, these data elements are members of struct, and the members can be accessed by their names.

	在C语言中，结构体(struct)指的是一种数据结构，是C语言中聚合数据类型(aggregate data type)的一类。结构体可以被声明为变量、指针或数组等，用以实现较复杂的数据结构。结构体同时也是一些元素的集合，这些元素称为结构体的成员(member)，且这些成员可以为不同的类型，成员一般用名字访问。将不同类型的数据组合成一个整体以便引用，把它们组织成一个组合项, 在一个组合项中包含若干个类型不同的数据项。成为结构体。struct structName{int a = 0, char b =&quot;h&quot;, double c = 1.5;} structVariableName1, structVariableName2;

	**Difference between Union and Struct:**

*   The memory size of struct equal the sum of the length of all members of the struct, each member have its own memory block.
*   结构体变量所占内存长度是各成员的内存长度之和，每个成员分别占有其自己的内存单元。
*   The memory size of union equal the memory length of member which has the longest size in the union
*   共用体变量所占的内存长度等于最长的成员的长度.
*   Sample:
*   结构体共用体使用举例：

	union uq1 {

	long value; /*这就是输入的那个32位数*/

	struct {

	short lowbit; /*这是低位*/

	short highbit; /*这是高位*/

	} bit;

	};

	整个共用体还是4字节没有改变. 解决那题,就象这样:

	uq1 u;

	long v;

	v=0x00FF00FF; /*就先假设输入的数是这个*/

	u.value=v;

	printf(&quot;high=%d,low=%dn&quot;,u.bit.highbit, u.bit.lowbit);

	这题的结果应该是:

	high=255, low=255

	****************************************************************************************************************************************

	**C++ Struct：**

	In c strut can not have method member. But in c++, the struct is extended, it can have method member. The difference between c++ struct and class is that the method is public default in struct, but in class, the default type of method is private.

	在C语言中，可以定义结构体类型，将多个相关的变量包装成为一个整体使用。在结构体中的变量，可以是相同、部分相同，或完全不同的数据类型。_<span style="text-decoration:underline;">在C语言中，结构体不能包含函数</span>_。在面向对象的程序设计中，对象具有状态（属性）和行为，状态保存在成员变量中，行为通过成员方法（函数）来实现。C语言中的结构体只能描述一个对象的状态，不能描述一个对象的行为。在C++中，考虑到C语言到C++语言过渡的连续性，对结构体进行了扩展，_<span style="text-decoration:underline;">C++的结构体可以包含函数</span>_，这样，C++的结构体也具有类的功能，<span style="text-decoration:underline;">_与class不同的是，结构体包含的函数默认为public，而不是private_</span>。

	**The difference between C++ struct and Class：**

*   （1）class中默认的成员访问权限是private的，而struct中则是public的。
*   （2）从class继承默认是private继承，而从struct继承默认是public继承。
*   （3）C++的结构体声明不必有struct关键字，而C语言的结构体声明必须带有关键字（使用typedef别名定义除外）。