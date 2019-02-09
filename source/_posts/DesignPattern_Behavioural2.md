---
title: Design Pattern - Behavioural 2
categories:
  - Design Pattern
date: 2015-09-02 12:29:39
tags:
---

# 命令模式[Command](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/command)

* 将一个请求封装为一个对象，从而使我们可用不同的请求对客户进行参数化； 对请求排队或者记录请求日志，以及支持可撤销的操作。也称为：动作模式action 事务模式transaction.
* 结构：
	1.  Command 抽象命令类
	2.  ConcreteCommand具体命令类
	3.  Invoker调用者
	4.  Receiver接受者
* 开发中的场景：Struts2中，action的整个调用过程就是命令模式，数据库事务机制的底层实现

# 解释器模式 Interpreter

* 不常用，开发新的语言时，可以考虑使用解释器模式。主要用于描述如何构成一个简单的语言解释器，主要用于使用面向对象语言开发的编译器和解释器设计。
* 在项目中可以使用js引擎等动态语言来替代解释器的作用，弥补java语言的不足。
开发中的场景：EL表达式，正则表达式，SQL语法，数学表达式

# 访问者模式 Visitor

* 对于存储在一个集合中的对象，他们可能具有不同的类型，对于该集合中的对象，可以接受一类称为访问者的对象来访问，不同的访问者其访问方式也有所不同
* 开发中的场景：XML文档解释器设计，编译器设计，复杂集合对象的处理

# 策略模式 [Strategy](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/strategy)

* 策略模式对应于解决某一个问题的一个算法族，允许用户从该算法族中任选一个算法解决某一个问题，同时可以方便的更换算法或者增加新的算法。并且由客户端决定调用哪个算法。
* 策略接口，具体的策略类，上下文类管理策略
* 开发中的场景：spring中 resource接口，资源访问策略

# 模板方法模式 [Template](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/templateMethod)

* 场景：客户到银行办理业务，1.取号排队2.办理具体业务3.给柜员评分。
* 定义了算法的骨架，某些步骤延迟到子类中实现，新的子类可以在不改变一个算法结构的前提下重新定义该算法的某些特定步骤。
* 又称为方法回调，钩子方法，
* 实现算法时整体步骤固定，某些步骤易变，易变的部分可以抽象出来供子类实现。
开发中的场景：数据库访问封装，Junit，hibernate模板。