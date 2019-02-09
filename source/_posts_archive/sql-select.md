---
title: SQL Select
id: 129
categories:
  - SQL
date: 2015-05-27 14:49:13
tags:
---

在数据库操作语句中，使用最频繁，也被认为最重要的是SELECT查询语句。之前的实验中，我们已经在不少地方用到了 **SELECT * FROM table_name;** 这条语句用于查看一张表中的所有内容。 而SELECT与各种限制条件关键词搭配使用，具有各种丰富的功能，这次实验就进行详细介绍。

### 1、基本的SELECT语句

SELECT语句的基本格式为：

    <span class="hljs-operator"><span class="hljs-keyword">SELECT</span> 要查询的列名 <span class="hljs-keyword">FROM</span> 表名字 <span class="hljs-keyword">WHERE</span> 限制条件;</span>
    `</pre>
    如果要查询表的所有内容，则把**要查询的列名**用一个 * 号表示(实验2、3中都已经使用过)，代表要查询表中所有的列。 而大多数情况，我们只需要查看某个表的指定的列，比如要查看employee表的name和age：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age <span class="hljs-keyword">FROM</span> employee;</span>
    `</pre>
    ![01](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-01.png/logoblackfont)

    ### 2、数学符号条件

    SELECT语句常常会有WHERE限制条件，用于达到更加精确的查询。WHERE限制条件可以有数学符号 (**=,&lt;,&gt;,&gt;=,&lt;=**) ，刚才我们查询了name和age，现在稍作修改：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> age&gt;<span class="hljs-number">25</span>;</span>
    `</pre>
    筛选出age大于25的结果：

    ![02](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-02.png/logoblackfont)

    或者查找一个名字为Mary的员工：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,phone <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> name=<span class="hljs-string">'Mary'</span>;</span>
    `</pre>
    结果当然是：

    ![03](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-03.png/logoblackfont)

    ### 3、“AND”与“OR”

    从这两个单词就能够理解它们的作用。WHERE后面可以有不止一条限制，而根据条件之间的逻辑关系，可以用**OR(或)**和**AND(且)**连接：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> age&lt;<span class="hljs-number">25</span> <span class="hljs-keyword">OR</span> age&gt;<span class="hljs-number">30</span>;</span>     #筛选出age小于25，或age大于30
    `</pre>
    ![04](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-04.png/logoblackfont)
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> age&gt;<span class="hljs-number">25</span> <span class="hljs-keyword">AND</span> age&lt;<span class="hljs-number">30</span>;</span>    #筛选出age大于25，且age小于30
    `</pre>
    ![05](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-05.png/logoblackfont)

    而刚才的限制条件 **age&gt;25 AND age&lt;30** 可以替换为 **age BETWEEN 25 AND 30** ，结果是一样的：

    ![06](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-06.png/logoblackfont)

    ### 4、IN和NOT IN

    关键词**IN**和**NOT IN**的作用和它们的名字一样明显，用于筛选**“在”**或**“不在”**某个范围内的结果，比如说我们要查询在**dpt3**或**dpt4**的人:
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,phone,in_dpt <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> in_dpt <span class="hljs-keyword">IN</span> (<span class="hljs-string">'dpt3'</span>,<span class="hljs-string">'dpt4'</span>);</span>
    `</pre>
    ![07](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-07.png/logoblackfont)

    而**NOT IN**的效果则是，如下面这条命令，查询出了不在**dpt1**也不在**dpt3**的人：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,phone,in_dpt <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> in_dpt <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">IN</span> (<span class="hljs-string">'dpt1'</span>,<span class="hljs-string">'dpt3'</span>);</span>
    `</pre>
    ![08](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-08.png/logoblackfont)

    ### 5、通配符

    关键字 **LIKE** 在SQL语句中和通配符一起使用，通配符代表未知字符。SQL中的通配符是 _ 和 % 。其中 _ 代表一个未指定字符，% 代表**不定个**未指定字符。

    比如，要只记得电话号码前四位数为1101，而后两位忘记了，则可以用两个 _ 通配符代替：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,phone <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> phone <span class="hljs-keyword">LIKE</span> <span class="hljs-string">'1101__'</span>;</span>
    `</pre>
    这样就查找出了**1101开头的6位数电话号码**：

    ![09](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-09.png/logoblackfont)

    另一种情况，比如只记名字的首字母，又不知道名字长度，则用 % 通配符代替不定个字符：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,phone <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> name <span class="hljs-keyword">LIKE</span> <span class="hljs-string">'J%'</span>;</span>
    `</pre>
    这样就查找出了首字母为 **J** 的人：

    ![10](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-10.png/logoblackfont)

    ### 6、对结果排序

    为了使查询结果看起来更顺眼，我们可能需要对结果按某一列来排序，这就要用到**ORDER BY** 排序关键词。默认情况下，**ORDER BY**的结果是**升序**排列，而使用关键词**ASC**和**DESC**可指定**升序**或**降序**排序。 比如，我们**按salary降序排列**，SQL语句为：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> name,age,salary,phone <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> salary <span class="hljs-keyword">DESC</span>;</span>
    `</pre>
    ![11](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-11.png/logoblackfont)

    ### 7、SQL内置函数和计算

    SQL允许对表中的数据进行计算。对此，SQL有5个内置函数，这些函数都对SELECT的结果做操作：
    <table>
    <thead>
    <tr>
    <th>函数名：</th>
    <th>COUNT</th>
    <th>SUM</th>
    <th>AVG</th>
    <th>MAX</th>
    <th>MIN</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>作用：</td>
    <td>计数</td>
    <td>求和</td>
    <td>求平均值</td>
    <td>最大值</td>
    <td>最小值</td>
    </tr>
    </tbody>
    </table>
    > 其中COUNT函数可用于任何数据类型(因为它只是计数)，而另4个函数都只能对数字类数据类型做计算。
    具体举例，比如计算出salary的最大、最小值，用这样的一条语句：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">MAX</span>(salary) <span class="hljs-keyword">AS</span> max_salary,<span class="hljs-keyword">MIN</span>(salary) <span class="hljs-keyword">FROM</span> employee;</span>
    `</pre>
    有一个细节你或许注意到了，**使用AS关键词可以给值重命名**，比如最大值被命名为了max_salary：

    ![12](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-12.png/logoblackfont)

    ### 8、子查询

    上面讨论的SELECT语句都仅涉及一个表中的数据，然而有时必须处理多个表才能获得所需的信息。例如：想要知道名为"Tom"的员工所在部门做了几个工程。员工信息储存在employee表中，但工程信息储存在project表中。 对于这样的情况，我们可以用子查询：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> of_dpt,<span class="hljs-keyword">COUNT</span>(proj_name) <span class="hljs-keyword">AS</span> count_project <span class="hljs-keyword">FROM</span> project
    <span class="hljs-keyword">WHERE</span> of_dpt <span class="hljs-keyword">IN</span>
    (<span class="hljs-keyword">SELECT</span> in_dpt <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">WHERE</span> name=<span class="hljs-string">'Tom'</span>);</span>
    `</pre>
    ![13](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-13.png/logoblackfont)
    > 子查询还可以扩展到3层、4层或更多层。

    ### 9、连接查询

    在处理多个表时，子查询只有在结果来自一个表时才有用。但如果需要显示两个表或多个表中的数据，这时就必须使用连接**(join)**操作。 连接的基本思想是把两个或多个表当作一个新的表来操作，如下：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> id,name,people_num
    <span class="hljs-keyword">FROM</span> employee,department
    <span class="hljs-keyword">WHERE</span> employee.in_dpt = department.dpt_name
    <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id;</span>
    `</pre>
    这条语句查询出的是，各员工所在部门的人数，其中员工的id和name来自employee表，people_num来自department表：

    ![14](https://dn-anything-about-doc.qbox.me/MySQL/sql-04-14.png/logoblackfont)

    另一个连接语句格式是使用JOIN ON语法，刚才的语句等同于：
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">SELECT</span> id,name,people_num
    <span class="hljs-keyword">FROM</span> employee <span class="hljs-keyword">JOIN</span> department
    <span class="hljs-keyword">ON</span> employee.in_dpt = department.dpt_name
    <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id;</span>

结果也与刚才的语句相同。