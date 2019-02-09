---
title: SQL 其他
id: 127
categories:
  - SQL
date: 2015-05-27 04:28:29
tags:
---

### 
	1、索引

	索引是一种与表有关的结构，它的作用相当于书的目录，可以根据目录中的页码快速找到所需的内容。 当表中有大量记录时，若要对表进行查询，没有索引的情况是全表搜索：将所有记录一一取出，和查询条件进行一一对比，然后返回满足条件的记录。这样做会消耗大量数据库系统时间，并造成大量磁盘I/O操作。 而如果在表中已建立索引，在索引中找到符合查询条件的索引值，通过索引值就可以快速找到表中的数据，可以**大大加快查询速度**。

	对一张表中的某个列建立索引，有以下两种语句格式：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> 表名字 <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">INDEX</span> 索引名 (列名);</span>

<span class="hljs-operator"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">INDEX</span> 索引名 <span class="hljs-keyword">ON</span> 表名字 (列名);</span>
`</pre>

	我们用这两种语句分别建立索引：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> employee <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">INDEX</span> idx_id (id);</span>  #在employee表的id列上建立名为idx_id的索引

<span class="hljs-operator"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">INDEX</span> idx_name <span class="hljs-keyword">ON</span> employee (name);</span>   #在employee表的name列上建立名为idx_name的索引
`</pre>

	索引的效果是加快查询速度，当表中数据不够多的时候是感受不出它的效果的。这里我们使用命令 **SHOW INDEX FROM 表名字;** 查看刚才新建的索引：

	![01](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-01.png)

	在使用SELECT语句查询的时候，语句中WHERE里面的条件，会**自动判断有没有可用的索引**。

### 
	2、视图

	视图是从一个或多个表中导出来的表，是一种**虚拟存在的表**。它就像一个窗口，通过这个窗口可以看到系统专门提供的数据，这样，用户可以不用看到整个数据库中的数据，而只关心对自己有用的数据。

	注意理解视图是虚拟的表：

*   数据库中只存放了视图的定义，而没有存放视图中的数据，这些数据存放在原来的表中；
*   使用视图查询数据时，数据库系统会从原来的表中取出对应的数据；
*   视图中的数据依赖于原来表中的数据，一旦表中数据发生改变，显示在视图中的数据也会发生改变；
*   在使用视图的时候，可以把它当作一张表。

	创建视图的语句格式为：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> 视图名(列a,列b,列c) <span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> 列<span class="hljs-number">1</span>,列<span class="hljs-number">2</span>,列<span class="hljs-number">3</span> <span class="hljs-keyword">FROM</span> 表名字;</span>
`</pre>

	可见创建视图的语句，后半句是一个SELECT查询语句，所以**视图也可以建立在多张表上**，只需在SELECT语句中使用**子查询**或**连接查询**，这些在之前的实验已经进行过。

	现在我们创建一个简单的视图，名为 **v_emp**，包含**v_name**，**v_age**，**v_phone**三个列：

	![02](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-02.png/logoblackfont)

### 
	3、导入

	导入操作，可以把一个文件里的数据保存进一张表。导入语句格式为：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">LOAD</span> <span class="hljs-keyword">DATA</span> <span class="hljs-keyword">INFILE</span> <span class="hljs-string">&#39;文件路径&#39;</span> <span class="hljs-keyword">INTO</span> <span class="hljs-keyword">TABLE</span> 表名字;</span>
`</pre>

	现在 /tmp/SQL6 目录下有一个名为 **in.txt** 的文件，我们尝试把这个文件中的数据导入数据库 **mysql_shiyan** 的 **employee** 表中。

	先按住 **Ctrl+Z** 退出MySQL，再使用命令 **gedit /tmp/SQL6/in.txt** 查看 **test.txt** 文件中的内容：

	![03](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-03.png)

	再使用以下命令以root用户登录数据库，再连接 **mysql_shiyan** 数据库：

<pre>
`<span class="hljs-title">mysql</span> -u root

use mysql_shiyan
`</pre>

	查看一下没有导入数据之前，employee表中的数据：

	![04](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-04.png)

	现在执行导入语句，文件中的数据成功导入employee表：

	![05](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-05.png/logoblackfont)

### 
	4、导出

	导出与导入是相反的过程，是把数据库某个表中的数据保存到一个文件之中。导出语句基本格式为：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> 列<span class="hljs-number">1</span>，列<span class="hljs-number">2</span> <span class="hljs-keyword">INTO</span> <span class="hljs-keyword">OUTFILE</span> <span class="hljs-string">&#39;文件路径和文件名&#39;</span> <span class="hljs-keyword">FROM</span> 表名字;</span>
`</pre>

	**注意：语句中 &ldquo;文件路径&rdquo; 之下不能已经有同名文件。**

	现在我们把整个employee表的数据导出到 /tmp 目录下，导出文件命名为 **out.txt** 具体语句为：

<pre>
`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">INTO</span> <span class="hljs-keyword">OUTFILE</span> <span class="hljs-string">&#39;/tmp/out.txt&#39;</span> <span class="hljs-keyword">FROM</span> employee;</span>
`</pre>

	用gedit可以查看导出文件 out.txt 的内容：

	![06](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-06.png/logoblackfont)

### 
	5、备份

	数据库中的数据或许十分重要，出于安全性考虑，在数据库的使用中，应该注意使用备份功能。

> 备份与导出的区别：导出的文件只是保存数据库中的数据；而备份，则是把数据库的结构，包括数据、约束、索引、视图等全部另存为一个文件。

	**mysqldump**是MySQL用于备份数据库的实用程序。它主要产生一个SQL脚本文件，其中包含从头重新创建数据库所必需的命令CREATE TABLE INSERT等。

	使用mysqldump备份的语句：

<pre>
`<span class="hljs-title">mysqldump</span> -u root 数据库名&gt;备份文件名;   <span class="hljs-comment">#备份整个数据库</span>

<span class="hljs-title">mysqldump</span> -u root 数据库名 表名字&gt;备份文件名;  <span class="hljs-comment">#备份整个表</span>
`</pre>

	我们尝试备份整个数据库 **mysql_shiyan**，将备份文件命名为 **bak.sql**，先 **Ctrl+Z** 退出MySQL，再使用语句：

<pre>
`<span class="hljs-title">mysqldump</span> -u root mysql_shiyan &gt; bak.sql;
`</pre>

	使用命令&ldquo;ls&rdquo;可见已经生成备份文件bak.sql：

	![07](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-07.png/logoblackfont)

> 你可以用gedit查看备份文件的内容，可以看见里面不止保存了数据，还有所备份的数据库的其他信息。

### 
	6、恢复

	用备份文件恢复数据库，其实我们早就使用过了。在本次实验的开始，我们使用过这样一条命令：

<pre>
`<span class="hljs-built_in">source</span> /tmp/SQL6/MySQL-<span class="hljs-number">06</span>.sql
`</pre>

	这就是一条恢复语句，它把MySQL-06.sql文件中保存的mysql_shiyan数据库恢复。

	还有另一种方式恢复数据库，但是在这之前我们先使用命令新建一个**空的数据库 test**：

<pre>
`mysql -u root          <span class="hljs-comment">#因为在上一步已经退出了MySQL，现在需要重新登录</span>

CREATE DATABASE <span class="hljs-built_in">test</span>;  <span class="hljs-comment">#新建一个名为test的数据库</span>
`</pre>

	再次 **Ctrl+Z** 退出MySQL，然后输入语句进行恢复，把刚才备份的 **bak.sql** 恢复到**test** 数据库：

<pre>
`mysql -u root <span class="hljs-built_in">test</span> &lt; bak.sql
`</pre>

	我们输入命令查看tset数据库的表，便可验证是否恢复成功：

<pre>
`mysql -u root          <span class="hljs-comment">#因为在上一步已经退出了MySQL，现在需要重新登录</span>

use <span class="hljs-built_in">test</span>               <span class="hljs-comment">#连接数据库test</span>

SHOW TABLES;           <span class="hljs-comment">#查看test数据库的表</span>
`</pre>

	可以看见原数据库的4张表和1个视图，现在已经恢复到test数据库中：

	![08](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-08.png/logoblackfont)

	再查看employee表的恢复情况：

	![09](https://dn-anything-about-doc.qbox.me/MySQL/sql-06-09.png/logoblackfont)