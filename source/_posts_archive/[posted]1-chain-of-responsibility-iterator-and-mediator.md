---
title: '1. Chain of Responsibility, Iterator and Mediator 责任链，迭代器和中介者模式'
id: 346
categories:
  - Behavioural Patterns
date: 2015-09-02 12:25:58
tags:
---

<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">1.责任链模式[Chain of Responsibility](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/chainOfResponsibility)</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">能够将处理同一类请求的对象连城一条链，所提交的请求沿着链传递，链上的对象逐个判断是否有能力处理该请求，如果能则处理否则传递给链上的下一个对象。所有的对象有[抽象类](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/chainOfResponsibility/Leader.java)控制</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">场景：打牌轮流出牌，接力赛跑，奖学金审批，公文审批</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">开发中的场景：异常机制，javascript时间的冒泡捕获，java是观察者，Servlet过滤器，structs2拦截器的调用。</span></span>

	&nbsp;

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">2.迭代器模式[Iterator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/iterator)</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">提供一种可以遍历聚合对象的方式，又称为：游标cursor模式</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">1.聚合对象：存储数据 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.迭代器：遍历对象</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">正向逆向遍历</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">开发中的场景：jdk 内置迭代器</span></span>

	&nbsp;

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">3.中介者模式[Mediator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/mediator)</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">如果一个系统中对象之间的联系呈现为网状结构，对象之间存在大量多对多关系，这些对象称为</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">同事对象</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">，我们可以引入一个</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">中介者对象</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">，使各个同事对象只跟中介者对象打交道，将复杂的网状结构化解为星型结构</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">实现同事对象之间的解耦，通过中介者对象统一的管理交互</span></span>

	<span id="docs-internal-guid-b09b2da6-8edc-5523-32e5-b9158b53060c"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">开发中的场景： MVC中C就是中介</span></span>

<div>
	&nbsp;
</div>