---
title: Design Pattern - Structural 2
id: 333
categories:
  - Design Pattern
date: 2015-08-17 19:17:57
tags:
---

# 桥接模式 [Bridge](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/bridge)

* 多层继承结构 扩展性问题，类个数膨胀问题，违反单一职责原则
* 处理多层继承 结构，处理 多维度变化场景，将各个维度设计成独立的继承结构，使各个维度可以独立的扩展在抽象层建立关系。

	[![](https://upload.wikimedia.org/wikipedia/commons/c/cf/Bridge_UML_class_diagram.svg)](https://en.wikipedia.org/wiki/File:Bridge_UML_class_diagram.svg)

# 装饰模式 [Decorator](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/decorator)

* 动态的为一个对象增加新的功能降低系统耦合度，具体类和装饰类可以独立变换。
* 装饰模式是一种用于代替继承的技术，无须通过继承增加子类就能扩展对象的新功能。
* 使用对象的关联关系代替继承关系更加灵活，避免类型体系的快速膨胀。
* Component抽象构件
	*   ConcreteComponent具体构件（真实对象）
	*   Decorator装饰器
	*   ConcreteDecorator具体装饰器
* 也可称为Wrapper
* 缺点：产生很多小对象，易出错，调试麻烦

	![](https://upload.wikimedia.org/wikipedia/commons/e/e9/Decorator_UML_class_diagram.svg)

# 组合模式 [Composite](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/composite)

* 组合（A类中定义B类的对象b属性）与组合模式不同。
* 把部分和整体的关系用树形结构来表示，从而使客户端可以使用统一的方式处理部分对象和整体对象。
* 组合模式核心：
	*   Component抽象构件角色：定义了叶子和容器构件的共同点
	*   Leaf叶子构件角色：无子节点
	*   Composite容器构件角色：有容器特征，可以包含子节点
* 场景：资源管理器，GUI容器层次，XML文件解析，组织结构处理，Junit单元测试框架

	![](https://upload.wikimedia.org/wikipedia/commons/5/5a/Composite_UML_class_diagram_%28fixed%29.svg)