---
title: Design Pattern - Behavioural 3
categories:
  - Design Pattern
date: 2015-09-08 16:10:18
tags:
---

# 状态模式 [State](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/state)

* 不同的状态对应不同的行为，如红绿灯，电梯运行的各种状态。
* 解决复杂对象的状态切换以及不同状态下行为的封装问题.
* 结构：[context](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/state/Context.java)上下文类（维护state对象，定义了当前的状态），[state抽象状态类](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/state/State.java)，concretestate具体状态类（封装了状态对应的行为


# 观察者模式[Observer](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/observer)

* 实现群发广播机制，群体广播信息时使用，类比广播站和收音机，收音机就是观察者，广播站发送信号。
* 广播的订阅者，客户称为观察者，需要同步给多个订阅者的数据封装到对象中，称之为目标。
* 用于1：N的通知，当目标对象subject的状态变化时，他需要及时告知一系列对象（观察者）令他们做出响应。
* 有推（观察者被动接受），拉（观察者自己决定什么时候获取内容）两个动作。
* javase 提供了java.util.Observable 和java.util.Observer来实现[观察者模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/javaseObserver)
* 开发中的场景: 聊天室中服务器转发给所有客户端。网络游戏中，服务器将客户状态分发，邮件订阅，android广播机制

# 备忘录模式[Memento](https://github.com/godlzr/GOF23_DesignPattern/tree/master/com.godlzr.GOF23.behavioural/memento)（纪念章）

* 保持对象状态的功能，保存某个对象内部状态的拷贝，这样以后就可以将该对象恢复到原先的状态。
* 结构:
	* 源发器类[Originator](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/memento/EmpMemento.java)
	*  备忘录类[Memento](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/memento/Emp.java)
	*  负责人类[CareTaker](https://github.com/godlzr/GOF23_DesignPattern/blob/master/com.godlzr.GOF23.behavioural/memento/CareTaker.java)
* 开发中的场景: 撤销操作，事务管理，回滚操作，历史记录