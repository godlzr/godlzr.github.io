---
title: "[Issue] QTCreater调试时提示ptrace不允许的操作"
id: 191
categories:
  - Issues Solution
date: 22015-03-15 21:46:30
tags:
  - QT
---

## 问题描述

- 用 QTCreater 建立了一个纯 C++的项目，但是在 F5 调试时，竟然提示 ptrace 不允许的操作，修改工程配置为 Debug 也不管用，经过网上搜索，原来还需要修改一下系统 ptrace 的配置。

## 解决办法

- 临时性的解决方法

```
    $ sudo echo 0 /proc/sys/kernel/yama/ptrace_scope
```

- 这样不过重启电脑之后就又恢复成原来的样子了，一劳永逸的方法：

```
    $ sudo vi /etc/sysctl.d/10-ptrace.conf
    $ kernel.yama.ptrace_scope = 0
    重启电脑就好了，
```

- 据说在 Ubuntu 11.04 之后都会出现这种问题，貌似是为了安全

## ptrace

- 那么 ptrace 是个什么东西，可能是 Linux 下边调试时用到的？目前还不知道，以后要做一下研究
