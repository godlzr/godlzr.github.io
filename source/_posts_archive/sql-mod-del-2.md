---
title: SQL 修改和删除
id: 124
categories:
  - SQL
date: 2015-05-27 04:24:46
tags:
---

# 
	修改和删除

## 
	实验简介

	对数据库的内容做修改，删除，重命名等操作。

## 
	一、实验说明

### 
	1、环境登录

	无需密码自动登录，系统用户名shiyanlou，密码shiyanlou

### 
	2、环境介绍

	本实验环境采用Ubuntu Linux桌面环境，实验中会用到的程序：

	1、MySQL：流行的数据库管理系统，实验楼环境已经安装

	2、Gedit：简单、快捷的文档编辑器

	3、github：有的实验会需要从github下载代码，点这里，了解[怎么使用github](http://forum.shiyanlou.com/forum.php?mod=viewthread&amp;tid=541&amp;extra=)。

## 
	二、实验准备

	在正式开始本实验内容之前，需要先从github下载相关代码。该代码可以新建两个数据库，分别名为**test_01**和**mysql_shiyan** ，并在**mysql_shiyan**数据库中建4个表（department，employee，project，table_1），然后向其中插入数据。

	具体操作如下,首先输入命令进入Desktop：

<pre>
`<span class="hljs-built_in">cd</span> Desktop
`</pre>

	然后再输入命令，下载代码：

<pre>
`<span class="hljs-title">git</span> clone <span class="hljs-url">http://git.shiyanlou.com/shiyanlou/SQL5</span>
`</pre>

	下载完成后，输入&ldquo;cd ~&rdquo;（注意有空格）退回到原先目录，然后输入命令开启MySQL服务并使用root用户登录：

<pre>
`<span class="hljs-title">sudo</span> service mysql start        <span class="hljs-comment">#打开MySQL服务</span>

mysql -u root                   <span class="hljs-comment">#使用root用户登录</span>
`</pre>

	刚才从github下载的SQL5目录下,有1个文件**MySQL-05.sql** （**SQL5目录在桌面上，你可以用Gedit查看、编辑里面的文件。**）

	输入命令运行这个文件，完成实验准备：

<pre>
`<span class="hljs-built_in">source</span> /home/shiyanlou/Desktop/SQL5/MySQL-<span class="hljs-number">05</span>.sql
`</pre>

## 
	三、实验内容

### 
	1、对数据库的修改

	使用命令 **SHOW DATABASES;** 可以看到刚才运行**MySQL-05.sql**文件生成的两个数据库：

	![01](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-01.png/logoblackfont)

	现在我们运行命令删除名为**test_01**的数据库：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">DROP</span> <span class="hljs-keyword">DATABASE</span> test_01;</span>
`</pre>

	现在再次使用命令 **SHOW DATABASES;** 可以发现，**test_01**数据库已经被成功删除：

	![02](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-02.png/logoblackfont)

### 
	2、对一张表的修改

#### 
	(1)重命名一张表

	重命名一张表的语句有多种形式，以下3种格式效果是一样的：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">RENAME</span> <span class="hljs-keyword">TABLE</span> 原名 <span class="hljs-keyword">TO</span> 新名字;</span>

<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 原名 <span class="hljs-keyword">RENAME</span> 新名;</span>

<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 原名 <span class="hljs-keyword">RENAME</span> <span class="hljs-keyword">TO</span> 新名;</span>
`</pre>

	使用命令尝试修改 **table_1** 的名字为 **table_2** ：

	![03](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-03.png/logoblackfont)

#### 
	(2)删除一张表

	删除一张表的语句，类似于刚才用过的删除数据库的语句，格式是这样的：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> 表名字;</span>
`</pre>

	比如我们把 **table_2** 表删除：

	![04](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-04.png/logoblackfont)

### 
	3、对一列的修改(即对表结构的修改)

	对表结构的修改，是本节实验的难点，有时候一些小的错误会造成不可挽回的后果，所以请细心操作。

#### 
	(1)增加一列

	在表中增加一列的语句格式为：

<pre>
`    <span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">COLUMN</span> 列名字 数据类型 约束;</span>

或： <span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">ADD</span> 列名字 数据类型 约束;</span>
`</pre>

	现在**employee**表中有id、name、age、salary、phone、in_dpt这6个列，我们尝试加入**height** (身高)一个列并指定DEFAULT约束：

	![05](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-05.png/logoblackfont)

	可以发现：新增加的列，被默认放置在这张表的最右边。如果要把增加的列插入在指定位置，则需要在语句的最后使用AFTER关键词(**&ldquo;AFTER 列1&rdquo; 表示新增的列被放置在 &ldquo;列1&rdquo; 的后面**)。

	比如我们新增一列 **weight** (体重)放置在 **age** (年龄)的后面：

	![06](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-06.png/logoblackfont)

	上面的效果是把新增的列加在某位置的后面，如果想放在第一列的位置，则使用**FIRST** 关键词，如语句：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> employee <span class="hljs-keyword">ADD</span> test <span class="hljs-built_in">INT</span>(<span class="hljs-number">10</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">11</span> <span class="hljs-keyword">FIRST</span>;</span>
`</pre>

	效果如下：

	![07](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-07.png/logoblackfont)

#### 
	(2)删除一列

	删除表中的一列和刚才使用的新增一列的语句格式十分相似，只是把关键词**ADD** 改为 **DROP** ，语句后面不需要有数据类型、约束或位置信息。具体语句格式：

<pre>
`    <span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">COLUMN</span> 列名字;</span>

或： <span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">DROP</span> 列名字;</span>
`</pre>

	我们把刚才新增的 **test** 删除：

	![08](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-08.png/logoblackfont)

#### 
	(3)重命名一列

	这条语句其实不只可用于重命名一列，准确地说，它是对一个列做修改(CHANGE) ：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">CHANGE</span> 原列名 新列名 数据类型 约束;</span>
`</pre>

> **注意：这条重命名语句后面的 &ldquo;数据类型&rdquo; 不能省略，否则重命名失败。**

	当**原列名**和**新列名**相同的时候，指定新的**数据类型**或**约束**，就可以用于修改数据类型或约束。需要注意的是，修改数据类型可能会导致数据丢失，所以要慎重使用。

	我们用这条语句将 &ldquo;height&rdquo; 一列重命名为汉语拼音 &ldquo;shengao&rdquo; ，效果如下：

	![09](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-09.png/logoblackfont)

#### 
	(4)改变数据类型

	要修改一列的数据类型，除了使用刚才的**CHANGE**语句外，还可以用这样的**MODIFY**语句：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 MODIFY 列名字 新数据类型;</span>
`</pre>

	再次提醒，修改数据类型必须小心，因为这可能会导致数据丢失。在尝试修改数据类型之前，请慎重考虑。

### 
	4、对表的内容修改

#### 
	(1)修改表中某个值

	大多数时候我们需要做修改的不会是整个数据库或整张表，而是表中的某一个或几个数据，这就需要我们用下面这条命令达到精确的修改：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">UPDATE</span> 表名字 <span class="hljs-keyword">SET</span> 列<span class="hljs-number">1</span>=值<span class="hljs-number">1</span>,列<span class="hljs-number">2</span>=值<span class="hljs-number">2</span> <span class="hljs-keyword">WHERE</span> 条件;</span>
`</pre>

	比如，我们要把Tom的age改为21，salary改为3000：

	![10](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-10.png/logoblackfont)

> **注意：一定要有WHERE条件，否则会出现你不想看到的后果**

#### 
	(2)删除一行记录

	删除表中的一行数据，也必须加上WHERE条件，否则整列的数据都会被删除。删除语句：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> 表名字 <span class="hljs-keyword">WHERE</span> 条件;</span>
`</pre>

	我们尝试把Tom的数据删除：

	![11](https://dn-anything-about-doc.qbox.me/MySQL/sql-05-11.png/logoblackfont)