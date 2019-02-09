---
title: Design Pattern - Behavioural
id: 346
categories:
  - Design Patterns
date: 2015-09-02 12:25:58
tags:
---

1.责任链模式[Chain of Responsibility](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/chainOfResponsibility)

* 能够将处理同一类请求的对象连城一条链，所提交的请求沿着链传递，链上的对象逐个判断是否有能力处理该请求，如果能则处理否则传递给链上的下一个对象。所有的对象有[抽象类](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/chainOfResponsibility/Leader.java)控制
* 场景：打牌轮流出牌，接力赛跑，奖学金审批，公文审批
* 开发中的场景：异常机制，javascript时间的冒泡捕获，java是观察者，Servlet过滤器，structs2拦截器的调用。

2.迭代器模式[Iterator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/iterator)

* 提供一种可以遍历聚合对象的方式，又称为：游标cursor模式
* 聚合对象：存储数据 
* 迭代器：遍历对象
* 正向逆向遍历
* 开发中的场景：jdk 内置迭代器

3.中介者模式[Mediator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/mediator)

* 如果一个系统中对象之间的联系呈现为网状结构，对象之间存在大量多对多关系，这些对象称为同事对象，我们可以引入一个中介者对象，使各个同事对象只跟中介者对象打交道，将复杂的网状结构化解为星型结构
* 实现同事对象之间的解耦，通过中介者对象统一的管理交互
* 开发中的场景： MVC中C就是中介