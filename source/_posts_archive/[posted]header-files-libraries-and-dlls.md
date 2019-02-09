---
title: 'Header Files, Libraries and DLLs'
id: 267
categories:
  - C/C++
date: 2015-08-02 19:33:43
tags:
---

DLL: In real world project, you don&#39;t build the program&nbsp;from scratch, instead&nbsp;you download SDK, it comes with DLL, headers and lib files. DLLs are just the a compiled set of functions, the main benefit of DLL is reusable, for example some games in your computer may use the same&nbsp;graphics library, so this library can be packaged into a DLL. And DLL always comes with header files and lib files.

	Header: are usually a text file in a &quot;.h&quot; extension. All these are a description of functions you can call. But there is no implementation of the functions in the header file. Instead the implementations are all in the DLL. You can use keyword &quot;include&quot; in you program, the &quot; &quot; means to search the header file locally and &quot;&lt; &gt;&quot; means to&nbsp;search the header file elsewhere.

	LIB: related header file to DLL. Lib file is a binary file and tell us where in the DLL we can find the funcitons. For example, if we include a header file the project needs the lib file so that when we comilpe it we know where inside the DLL to find the functions, and then during&nbsp;the runtime in thoes exactly where to look inside that DLL for these functions.