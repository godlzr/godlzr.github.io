---
title: 1. Adapter and Proxy Patterns 适配器模式和代理模式
id: 329
categories:
  - Structural Patterns
date: 2015-08-16 21:04:56
tags:
---

# 结构型模式
*   核心作用：是从程序的结构上实现松耦合，从而可以扩大整体的类结构，用来解决更大的问题
*   分类：适配器模式，代理模式，桥接模式，装饰模式，组合模式，外观模式，享元模式。


1.[适配器模式 Adapter](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/adapter)

* 将一个类的接口转成希望的另一个接口，使得原来接口不兼容的类可以一起工作.
* 模型中的角色
	* 目标接口（[Target](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/adapter/Target.java)）：期待的接口，目标可以是具体的或抽象的类，也可以是接口。
	* 需要适配的类（[Adaptee](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/adapter/Adaptee.java)）：需要适配的类或者适配者类
	* 适配器（Adapter）：通过包装一个需要适配的对象，把原接口转换成目标接口
	* 两种方式：[类继承](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/adapter/Adapter.java)，或者[类组合](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/adapter/Adapter2.java)的方式.
	* 场景：旧系统改造和升级

2.代理模式 Proxy Pattern

* 通过代理，控制对对象的访问。可以详细控制访问某个对象的方法，在调用这个方法前做前置处理，后做后置处理，从而将统一流程代码放到代理类中处理。
AOP Aspect Oriented Programming面向切面编程的核心实现机制。

* 核心角色：
	*  抽象角色：定义代理角色和真实角色的公开对外方法
	*  真实角色：实现抽象角色，真正的业务逻辑，定义真实角色所需要实现的业务逻辑，供代理角色调用
	*  代理角色：实现抽象角色， 统一的控制流程在代理角色中处理，是真实角色的代理通过真实角色的业务逻辑方法来实现抽象方法，并可以附加自己的操作。
	 应用：安全代理，远程代理，延迟加载 

* 分类：
	* [静态代理static](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/staticProxy)
	* [自己定义代理类](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/staticProxy/ProxySinger.java)
	* [动态代理dynamic](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.structural/dynamicProxy)（由程序生成代理类）动态代理:动态生成代理类，灵活统一 

* JDK自带的动态代理 

* java.lang.reflect.Proxy 

* java.lang.reflect.[InvocationHandler(](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.structural/dynamicProxy/SingerHandler.java)处理器接口) javaassist字节码操作库实现 

* CGLIB

* ASM（底层使用指令，可维护性差）