---
title: 2. Bridge，Decorator and Composite桥建，装饰和组合模式
id: 333
categories:
  - Structural Patterns
date: 2015-08-17 19:17:57
tags:
---

<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">3.桥接模式 [Bridge](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/bridge)</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">多层继承结构 </span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">扩展性问题，类个数膨胀问题，违反单一职责原则</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">处理</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">多层继承</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">结构，处理</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">多维度</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">变化场景，将各个维度设计成独立的继承结构，使各个维度可以独立的扩展在抽象层建立关系。</span></span>

	[![](https://upload.wikimedia.org/wikipedia/commons/c/cf/Bridge_UML_class_diagram.svg)](https://en.wikipedia.org/wiki/File:Bridge_UML_class_diagram.svg)

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">4.装饰模式 [Decorator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/decorator)</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">动态的为一个对象</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">增加新的功能</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">, 降低系统耦合度，具体类和装饰类可以独立变换。</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">装饰模式是一种用于代替继承的技术，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">无须通过继承增加子类就能扩展对象的新功能</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">。使用对象</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">的关联关系代替继承关系更加灵活，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">避免类型体系的快速膨胀。</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Component抽象构件</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">ConcreteComponent具体构件（真实对象）</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Decorator装饰器</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">ConcreteDecorator具体装饰器</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">也可称为Wrapper.</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">缺点：产生很多小对象，易出错，调试麻烦</span></span>

	![](https://upload.wikimedia.org/wikipedia/commons/e/e9/Decorator_UML_class_diagram.svg)

	&nbsp;

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">5.组合模式 [Composite](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/composite)</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">组合（A类中定义B类的对象b属性）与组合模式不同。</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">把部分和整体的关系用</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">树形结构</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">来表示，从而使客户端可以使用统一的方式处理部分对象和整体对象。</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">组合模式核心：</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Component抽象构件角色：定义了叶子和容器构件的共同点</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Leaf叶子构件角色：无子节点</span></span>

*   <span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Composite容器构件角色：有容器特征，可以包含子节点</span></span>

	<span id="docs-internal-guid-0a891e64-3dea-190f-6ea8-bda5c7b9570b"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">场景：资源管理器，GUI容器层次，XML文件解析，组织结构处理，Junit单元测试框架</span></span>

	![](https://upload.wikimedia.org/wikipedia/commons/5/5a/Composite_UML_class_diagram_%28fixed%29.svg)