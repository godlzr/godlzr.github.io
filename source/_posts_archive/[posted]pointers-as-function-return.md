---
title: Pointers as function return
id: 289
categories:
  - C/C++
date: 2015-08-11 22:03:17
tags:
---

我们可以将指针作为返回值，但是要注意的是，如果是在栈中分配的内存空间，函数中内存空间在函数执行完之后就释放了，同理，函数中的局部变量也会释放，如果这段空间被其他代码占用，则该指针指向的内存单元所保存的值就不再是我们期望的了，这种做法很明显是危险的。

	使用指针作为返回值有两种情况，一种是该指针指向的是在heap中由程序员申请的内存空间，这种情况下程序员可清楚的知道内存的分配情况。另一种是全局变量，全局变量的内存空间在程序执行完之后才会释放，所以可以放心的访问。

	[![Screen Shot 2015-08-11 at 9.51.24 PM](http://godlzr.com/wp-content/uploads/2015/08/Screen-Shot-2015-08-11-at-9.51.24-PM.png)](http://godlzr.com/wp-content/uploads/2015/08/Screen-Shot-2015-08-11-at-9.51.24-PM.png)

	This image is cropped from youtube channel mycodeschool, &quot;[<span class="watch-title " dir="ltr" id="eow-title" style="margin: 0px; padding: 0px; border: 0px; background: transparent;" title="Pointers as function returns in C/C++">Pointers as function returns in C/C++</span>](https://www.youtube.com/watch?v=E8Yh4dw6Diw&amp;list=PL2_aWCzGMAwLZp6LMUKI3cc7pgGsasm2_&amp;index=14)&quot;.