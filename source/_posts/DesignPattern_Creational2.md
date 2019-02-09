---
title: Design Pattern - Creational 2
id: 307
categories:
  - Design Pattern
date: 2015-08-14 13:57:13
tags:
---

# 工厂模式

* 实现创建者和调用者的分离
* 面向对象的基本设计原则，分工
	* OCP(open close principle): 一个软件的实体应当对扩展开发对修改关闭，添加新类来扩展功能
	* DIP(dependency Inversion Principle): 针对接口编程，不要针对实现编程
	LoD(Law of Demeter): 只与你直接的朋友通信，而避免和陌生人通信
* 分为 简单工厂模式，工厂方法模式，抽象工厂模式
	*   [简单工厂模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/simpleFactory)静态工厂，方法都是静态的， 通过接受不同参数创建不同实例， 增加新的类需要修改已有方法，扩展困难, 实际使用最多。
	*   [工厂方法模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/facotryMethod)：避免了简单工厂不满足ocp的缺点，简单工厂只有一个工厂类，而工厂方法模式有一组实现了相同接口的工厂类（一般都用简单工厂模式), 不修改已有类的前提下，增加新的工厂类来实现扩展
	*   [抽象工厂模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/abstractFactory)：用来生成不同产品族的全部产品， 工厂方法的升级版，不能增加产品，但能增加产品族。

# [建造者模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/builder)

* 对象的组件多，装配顺序复杂
* 装配的问题，零件之间有一个装配顺序，分离了对象子组件的单独构造（[builder](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/builder/godlzrAirshipBuilder.java)）和装配（[director](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/builder/godlzrAirshipDirector.java)）
* 实现了构建和装配的解耦，不同的构建器，相同的装配器，构建不同的对象。相同的构建器，不同的装配器，构建不同的对象。实现了构建算法和装配算法的解耦，有很好的复用性。

# 原型模式 [Prototype](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/prototype)（克隆模式)

* 以某个对象为原型，复制拷贝出新的对象，实现数据的复用。新对象具备原型对象的特点。
* 优势：效率高
* 克隆类似于new，但new的对象的属性采用默认值，克隆的对象属性与原型一样。克隆的对象改变不会影响原型。例如，opencv中 mat 的clone(), copyTo().
* 有[深克隆](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Sheep.java)浅克隆</span>](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Sheep2.java) 之分。 对浅克隆来说，如果对象中的某些属性也是对象，则克隆的对象与原型对象的同一个属性对象在内存中只有一个，该属性对象并没有被复制。如果修改了该属性，则无论是克隆对象和原型对象的该属性都被修改。

``` java
public class Sheep implements Cloneable{ 

	private String sname;
	private Date birthday;

	@Override
	protected Object clone() throws CloneNotSupportedException {
		Object obj = super.clone();//直接调用object的clone方法

		//实现deep clone
		Sheep s = (Sheep)obj;
		s.birthday = (Date) this.birthday.clone();//把属性也进行克隆
		return obj;
	}
}
```

* 实现深克隆就要把原型对象的所有属性都复制。
* 深克隆可以利用[序列化和反序列化技术实现](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Client2.java).

```java
public static void main(String[] args) throws  IOException, ClassNotFoundException {
		Date date = new Date(11123123L);
		Sheep2 s1 = new Sheep2(&quot;Dori&quot;, date);

		//使用序列化将对象输出到数据流
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(bos);
		oos.writeObject(s1);//输出s1的拷贝
		byte[] bytes = bos.toByteArray();

		//使用反序列化将数据流中的对象读入并实现深克隆
		ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
		ObjectInputStream ois = new ObjectInputStream(bis);
		Sheep2 s2 = (Sheep2) ois.readObject();//拷贝给s2
}
```

* [使用情景](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Client3.java)：使用new创建对象很耗时间时，利用原型模式拷贝来提高效率。
* 原型模式一般和工厂模式结合起来
