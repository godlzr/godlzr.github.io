---
title: Ubuntu 下安装googletest
tags:
  - GoogleTest
  - Ubuntu
id: 14
categories:
  - Issues Solution
date: 2015-03-02 07:24:18
---

1.下载googletest

	2.解压gtest包

	3.配置gtest

	cmake CMakeList.txt

	make

	gtest 不需要make install, 我们只使用gtest库

	3.编译libgtest.a包， 这个包包含了gtest的核心，将来会被用于qt工程的单元测试中将该包拷贝到系统目录下

	cp *.a /usr/lib/