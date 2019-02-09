---
title: Cracking the Coding Interview - Chapter 13 C and C++
id: 71
categories:
  - Cracking the Coding Interview (Fifth edition)
date: 2015-04-09 14:59:05
tags:
---

## Chapter 13 C and C++

###### 13.1 Write a method to print the last K lines of an input file using C++.

*   用c++，写一个方法可以打印一个文件的最后k行
*   使用一个大小为K的string数组来循环保存每行字符串，这样最后到文件结尾，数组中就剩下的是最后K行
*   倒数第K行（正数i行）保存在数组 i%k的位置
*   [Q13.1_Implementation](https://github.com/godlzr/CrackingCodingInterviewCpp/blob/master/CrackingCodingInterviewCpp/printLastKLines.cpp)

###### 13.2 Compare and contrast a hash table and an STL map. How is a hash table implemented? If the number of inputs is small, which data structure options can be used instead of a hash table?

*   **对比哈希表和STL map**
在哈希表中，实值的存储位置由其键值对应的哈希函数值决定。因此， 存储在哈希表中的值是无序的。在哈希表中插入元素和查找元素的时间复杂度都是O(1)。 (假设冲突很少)。实现一个哈希表，冲突处理是必须要考虑的。

对于STL中的map，键/值对在其中是根据键进行排序的。它使用一根**红黑树**来保存数据， 因此插入和查找元素的时间复杂度都是**O(logn)**。而且不需要处理冲突问题。 STL中的map适合以下情况使用：

1.  查找最小元素
2.  查找最大元素
3.  有序地输出元素
4.  查找某个元素，或是当元素找不到时，查找比它大的最小元素

*   **哈希表是怎么实现**

1.  首先需要一个好的哈希函数来确保哈希值是均匀分布的。比如：对大质数取模
2.  其次需要一个好的冲突解决方法：链表法(chaining，表中元素比较密集时用此法)， 探测法(probing，开放地址法，表中元素比较稀疏时用此法)。
3.  动态地增加或减少哈希表的大小。比如，(表中元素数量)/(表大小)大于一个阈值时， 就增加哈希表的大小。我们新建一个大的哈希表，然后将旧表中的元素值， 通过新的哈希函数映射到新表。

*   **如果输入数据规模不大，我们可以使用什么数据结构来代替哈希表。**
你可以使用STL map来代替哈希表，尽管插入和查找元素的时间复杂度是O(logn)， 但由于输入数据的规模不大，因此这点时间差别可以忽略不计。

###### 13.3 How do virtual functions work in C++?

*   虚函数依赖虚函数表进行工作。如果一个类中，有函数被关键词virtual进行修饰， 那么一个虚函数表就会被构建起来保存这个类中虚函数的地址。同时， 编译器会为这个类添加一个隐藏指针指向虚函数表。如果在派生类中没有重写虚函数， 那么，派生类中虚表存储的是父类虚函数的地址。每当虚函数被调用时， 虚表会决定具体去调用哪个函数。因此，C++中的动态绑定是通过虚函数表机制进行的。
*   当我们用基类指针指向派生类时，虚表指针vptr指向派生类的虚函数表。 这个机制可以保证派生类中的虚函数被调用到。
*   C++中非虚函数的调用是在编译期静态绑定的， 而虚函数的调用则是在执行时才进行动态绑定。

###### 13.4 What is the difference between deep cop and shallow copy? Explain how you would usd each.

*   浅拷贝并不复制数据，只复制指向数据的指针，因此是多个指针指向同一份数据。 深拷贝会复制原始数据，每个指针指向一份独立的数据。
*   浅拷贝在构造和删除对象时容易产生问题，因此使用时要十分小心。如无必要， 尽量不用浅拷贝。当我们要传递复杂结构的信息，而又不想产生另一份数据时， 可以使用浅拷贝，比如引用传参。浅拷贝特别需要注意的就是析构时的问题， 当多个指针指向同一份内存时，删除这些指针将导致多次释放同一内存而出错。
*   实际情况下是很少使用浅拷贝的，而智能指针是浅拷贝概念的增强。 比如智能指针可以维护一个引用计数来表明指向某块内存的指针数量， 只有当引用计数减至0时，才真正释放内存。
*   大部分时候，我们用的是深拷贝，特别是当拷贝的结构不大的时候。

###### 13.5 What is the significance of the keyword "volatile" in C?

*   volatile的意思是"易变的"，因为访问寄存器比访问内存要快得多， 所以编译器一般都会做减少存取内存的优化。volatile 这个关键字会提醒编译器，它声明的变量随时可能发生变化(在外部被修改)， 因此，与该变量相关的代码不要进行编译优化，以免出错。
*   volatile在声明上的使用和const是一样的。volatile在*号左边， 修饰的是指针所指物；在*号右边修饰的是指针。
*

###### 13.6 Why does a destructor in base class need to be declared virtual?

*   用对象指针来调用一个函数，有以下两种情况：

    1.  如果是虚函数，会调用派生类中的版本。
    2.  如果是非虚函数，会调用指针所指类型的实现版本。

*   析构函数也会遵循以上两种情况，因为析构函数也是函数嘛，不要把它看得太特殊。 当对象出了作用域或是我们删除对象指针，析构函数就会被调用。
*   当派生类对象出了作用域，派生类的析构函数会先调用，然后再调用它父类的析构函数， 这样能保证分配给对象的内存得到正确释放。
*   但是，如果我们删除一个指向派生类对象的基类指针，而基类析构函数又是非虚的话， 那么就会先调用基类的析构函数(上面第2种情况)，派生类的析构函数得不到调用。
*   如果我们把基类的析构函数声明为虚析构函数，这会使得所有派生类的析构函数也为虚。 从而使析构函数得到正确调用。
*   因此，如果我们可能会删除一个指向派生类的基类指针时，应该把析构函数声明为虚函数。 事实上，《Effective C++》中的观点是，只要一个类有可能会被其它类所继承， 就应该声明虚析构函数。

###### 13.7 Write a method that takes a pointer to a Node structure as a parameter na dreturns a complete copy of the passed in data structure. The Node data structure contains two pointers to other Nodes.

###### 13.8 Write a smart pointer class. A smart pointer is a data type, usually implemented with templates, that simulates a pointer while also providing automatic garbage collection. It automatically counts the number of references to a SmartPointer&lt;T*&gt; object and frees the object of type T when the reference count hits zero.

###### 13.9 Write an aligned malloc and free function that supports allocating memory such that the memory address returned is divisible by a specific power of two.

###### EXAMPLE

###### align_malloc(1000, 128) will return a memory address that is a multiple of 128 and that points to memory of size 1000 bytes.

###### aligned_free() will free memory allocated by align_malloc.

###### 13.10 Write a function in C called my2DAlloc which allocates a two-dimensional array. Minimize the number of calls to malloc and make sure that the memory is accessible by the notation arr[i][j].