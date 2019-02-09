---
title: GNU Toolchain
id: 170
categories:
  - Operating System
date: 2015-07-23 21:23:10
tags:
---

GNU toolchain is a free C/C++ programming toolchain, it is an important part during the improvement of Linux system. Most of CPU manufacturers support the GNU compiler toolchain include the native- compile toolchain and cross-compile toolchain, that also makes the GNU toolchain become the most popular toolchain of embedded software development. It supports wide range of CPU architecture, such as x86, IA-32, MIPS,tile, PowerPC, Spark etc.

In common, GNU toolchain consists of these parts:

1.  GUN C Library.
2.  GNU Compiler Collection(GCC).
3.  Binutils(GNU Binary Utilities), includes objdump, readelf, strip, ar, nm, ldd, ngprof, gcov etc.
4.  GNU Remote Debugger(GDB).
5.  GNU make
6.  kernel debugger (KGDB).

Generally, GNU toolchain also includes:
	1. GNU code editor (vi, emacs, vim etc.
	2. GNU automake tool, in order to improve the portability of the code。

[翻译]
GNU编译工具链是一个“免费”的C/C++工具链，有力的支撑了Linux系统的发展。众多的处理器厂家都提供了对GNU编译工具链的支持（本地编译工具链（native-compile toolchain）、交叉编译（cross-compile toolchain）），这也使得其成为了嵌入式软件开发中最流行的工具集。其支持的体系结构非常广泛，其中包括：X86, IA-32, MIPS, tile, PowerPC, Spark etc.

通常来讲，我们认为GNU工具链主要由以下几个大的单元构成：

1.  GNU C Library，也就是通常所说的glibc，另外在嵌入式领域，往往采用glibc兼容的uclibc、newlib等。glibc是由GNU项目提供的标准C运行库，它针对PC应用设计，较庞大，但能提供最优的兼容性。如果一般的嵌入式开发可选用uClibc。uClibc原本是uCLinux开发过程中的一个C语言库，现已经独立于uCLinux项目并且进一步完善。它对glibc的大部分函数进行了重写，并且目标就定位于嵌入式，所以其相对glibc而言要小巧很多。此外由于它的函数与glibc保持一致，这样很多原本基于glibc开发的软件基本无需改动便可改用uClibc编译运行，使得在嵌入式系统上占用的内存和磁盘空间更少。但由于毕竟不是标准的C运行库，因此uClibc拥有着一定的兼容性问题。 Newlib是一个面向嵌入式系统的C运行库.最初是由Solutions收集组装的一个源代码集合,取名为newlib, 现在由Red Hat维护,对于与GNU兼容的嵌入式C运行库,Newlib并不是唯一的选择,但是从成熟度来讲,newlib是最优秀的.newlib具有独特的体系结构,使得它能够非常好地满足深度嵌入式系统的要求.newlib可移植性强, 具有可重入特性,功能完备等特点,已广泛应用于各种嵌入式系统中.
2.  编译工具GNU Compiler Collection (GCC)，
3.  二进制实用程序Binutils (GNU binary utilities)，其中包括：objdump、readelf、strip、ar、nm、ldd、ngprof、gcov等。
4.  调试工具GNU Remote Debugger (GDB)
5.  GNU make
6.  内核调试工具kgdb.

从广义上来讲，GNU的工具链还包括如下几个单元：
1.  GNU代码编辑器(vi, emacs, vim etc.)
2.  GNU自动化工具，旨在提高程序可移植性。