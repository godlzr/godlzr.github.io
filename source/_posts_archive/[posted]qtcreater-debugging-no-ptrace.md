---
title: QTCreater调试时提示ptrace不允许的操作
tags:
  - QT
id: 19
categories:
  - Issues Solution
date: 2015-03-15 21:46:30
---

## 
	1\. 问题描述

*   用QTCreater建立了一个纯C++的项目，但是在F5调试时，竟然提示ptrace不允许的操作，修改工程配置为Debug也不管用，经过网上搜索，原来还需要修改一下系统ptrace的配置。

## 
	<a name="t2"></a>2\. 解决办法

*   临时性的解决方法

			&nbsp;

        *   $ sudo echo 0 &gt; /proc/sys/kernel/yama/ptrace_scope

*   这样不过重启电脑之后就又恢复成原来的样子了，一劳永逸的方法：

			&nbsp;

        *   $ sudo vi /etc/sysctl.d/10-ptrace.conf
    *   $ kernel.yama.ptrace_scope = 0
    *   重启电脑就好了，

*   据说在Ubuntu 11.04之后都会出现这种问题，貌似是为了安全

## 
	<a name="t3"></a>3\. ptrace

*   那么ptrace是个什么东西，可能是Linux下边调试时用到的？目前还不知道，以后要做一下研究