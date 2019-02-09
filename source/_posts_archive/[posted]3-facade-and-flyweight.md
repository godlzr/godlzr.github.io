---
title: 3. Facade and FlyWeight 外观模式和享元模式
id: 340
categories:
  - Structural Patterns
date: 2015-08-17 19:23:33
tags:
---

<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">6.外观模式 [Facade](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/facade)</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">迪米特法则：（最少知识原则）一个软件实体应当尽可能少的与其他实体发生相互作用。</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">为子系统提供一个入口，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">封装</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">子系统的复习性，便于客户端使用。最简单的设计模式。</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">使用频率很高。</span></span>

	![](https://upload.wikimedia.org/wikipedia/en/5/57/Example_of_Facade_design_pattern_in_UML.png)

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">7.享元模式 [FlyWeight](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/flyweight)（轻量级）</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">如果存在很多完全相同或相似的对象，我们可以通过享元模式，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">节省内存</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">。</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">以共享的方式高效的支持大量细粒度对象的重用。</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">区分了内部状态和外部状态：</span></span>

*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">内部状态：可以共享，不会随环境的变化而改变。</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">外部状体：不可以共享，会随环境变化而改变。</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">例如围棋软件中的棋子对象有属性：颜色，形状，大小（内部状态，不会改变都一样，可以恭喜那个）位置（外部状态，不同，不可共享）</span></span>

*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[FlyweightFactory](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/flyweight/ChessFlyWeightFactory.java): 享元工厂类，创建并管理享元对象，享元池一般设计成键对值</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[Flyweight](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/flyweight/ChessFlyWeight.java)：抽象享元类，通常是一个接口或抽象类，声明公共方法，这些方法可以向外界提供对象的内部状态，设置外部状态。</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[ConcreteFlyWeight](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/flyweight/ChessFlyWeight.java)：具体的享元类，为内部状态提供成员变量进行存储</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[UnsharedConcreteFlyweight](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/flyweight/Coordinate.java)：非共享享元类，不能被共享的子类可以设计外部状态</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">应用场景主要是线程池，数据连接池</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">优点：</span></span>

*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">极大减少内存的对象数量</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">相同相似的对象内存中只存一份，极大结缘资源，提高系统性能</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">外部状态相对独立，不影响内部状态</span></span>

	<span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">缺点：</span></span>

*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">模式复杂，使程序逻辑复杂化</span></span>
*   <span id="docs-internal-guid-0a891e64-3df4-f04a-a18f-7201516ee00b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">节省内存，共享内部状态，分离出外部状态，而读取外部状态是运行时间变长，时间换空间。</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">&nbsp;&nbsp; &nbsp;</span></span>

<div>
	![](http://www.dofactory.com/images/diagrams/net/flyweight.gif)
</div>