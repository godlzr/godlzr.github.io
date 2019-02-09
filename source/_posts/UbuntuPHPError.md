---
title: [Issue] 开启UBUNTU php错误提示
id:8
categories:
  - Issues Solution
date: 2015-02-17 00:03:44
tags:
---

PHP编码出错不提示，这对于开发来说，是很不方便的。下面讲解如何开启错误提示步骤：

	1. 打开php.ini文件。

	以我的ubuntu为例，这个文件在： /etc/php5/apache2 目录下。

	2. 搜索并修改下行，把Off值改成On

	display_errors = Off

	3. 搜索下行

	error_reporting = E_ALL &amp; ~E_NOTICE

	error_reporting = E_ALL | E_STRICT

	4. 修改Apache的 apache2.conf，

	以我的 Ubuntu 为例， 这个文件在：/etc/apache2/&nbsp; 目录下。

	在末端添加以下两行：

	php_flag display_errors on

	php_value error_reporting 2039

	5. 重启Apache，就OK了。

	重启命令： ：sudo /etc/init.d/apache2 restart

	在修改配置文件时可能会遇到权限不够的问题，可在命令行中用

	sudo chmod 777 (FILENAME)

	进行修改。