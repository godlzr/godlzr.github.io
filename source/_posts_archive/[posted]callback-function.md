---
title: Callback Function 回调函数
id: 250
categories:
  - C/C++
date: 2015-07-30 14:50:57
tags:
---

<span style="font-family: arial, 宋体, sans-serif; font-size: 14px; line-height: 24px; text-indent: 28px;">回调函数就是一个通过</span>函数指针<span style="font-family: arial, 宋体, sans-serif; font-size: 14px; line-height: 24px; text-indent: 28px;">调用的函数。如果你把函数的</span>指针<span style="font-family: arial, 宋体, sans-serif; font-size: 14px; line-height: 24px; text-indent: 28px;">（地址）作为</span>参数传递<span style="font-family: arial, 宋体, sans-serif; font-size: 14px; line-height: 24px; text-indent: 28px;">给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方法直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。</span>

	**<span style="background-color:#FFFFFF;">为什么要使用回调函数？</span>**

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">　　因为可以把调用者与被调用者分开。调用者不关心谁是被调用者，所有它需知道的，只是存在一个具有某种特定原型、某些限制条件（如返回值为int）的被调用函数。</span></span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">　　如果想知道回调函数在实际中有什么作用，先假设有这样一种情况，我们要编写一个库，它提供了某些排序算法的实现，如冒泡排序、快速排序、shell排序、shake排序等等，但为使库更加通用，不想在函数中嵌入排序逻辑，而让使用者来实现相应的逻辑；或者，想让库可用于多种数据类型（int、float、string），此时，该怎么办呢？可以使用函数指针，并进行回调。</span></span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">　　回调可用于通知机制，例如，有时要在程序中设置一个计时器，每到一定时间，程序会得到相应的通知，但通知机制的实现者对我们的程序一无所知。而此时，就需有一个特定原型的函数指针，用这个指针来进行回调，来通知我们的程序事件已经发生。实际上，SetTimer() API使用了一个回调函数来通知计时器，而且，万一没有提供回调函数，它还会把一个消息发往程序的消息队列。</span></span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">　　另一个使用回调机制的API函数是EnumWindow()，它枚举屏幕上所有的顶层窗口，为每个窗口调用一个程序提供的函数，并传递窗口的处理程序。如果被调用者返回一个值，就继续进行迭代，否则，退出。EnumWindow()并不关心被调用者在何处，也不关心被调用者用它传递的处理程序做了什么，它只关心返回值，因为基于返回值，它将继续执行或退出。</span></span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">　　不管怎么说，回调函数是继续自C语言的，因而，在C++中，应只在与C代码建立接口，或与已有的回调接口打交道时，才使用回调函数。除了上述情况，在C++中应使用虚拟方法或函数符（functor），而不是回调函数。</span></span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.3999996185303px; line-height: 16.7999992370605px;"><span style="background-color:#FFFFFF;">&nbsp; &nbsp; &nbsp; &nbsp;下面是一个简单的回调函数，相比其他的那些复杂的代码，这个更容易理解：</span></span>

<pre class="brush:cpp;">
#include&lt;stdio.h&gt;
#include&lt;stdlib.h&gt;
void perfect(int n)
{
    int i=1;
    int count=0;
    for(i=1;i&lt;n;i++)
    {
        if(0==n%i)
        {
           count+=i;
        }
     }
     if(count==n)
         printf(&quot;%d是完数\n&quot;,n);
     else 
         printf(&quot;%d不是完数\n&quot;,n);
}

void myCallback(void (*perfect)(int ),int n)
{
     perfect(n);
}

int main()
{
     int n;
     printf(&quot;请输入一个正整数\n&quot;);
     scanf(&quot;%d&quot;,&amp;n);

     myCallback(perfect,n);
     return 0;
}</pre>

	&nbsp;