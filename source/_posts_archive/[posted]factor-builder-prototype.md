---
title: '2. Factor, Builder, Prototype 工厂模式, 建造者模式和原型模式'
id: 307
categories:
  - Creational Patterns
date: 2015-08-14 13:57:13
tags:
---

<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">2.工厂模式，实现创建者和调用者的分离</span></span>

	<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">分为 </span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">简单工厂模式</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">工厂方法模式</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">抽象工厂模式</span></span>

	<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">面向对象的基本设计原则，</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">分工</span></span>

	<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">OCP(open close principle): 一个软件的实体应当对扩展开发对修改关闭，添加新类来扩展功能</span></span>

	<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">DIP(dependency Inversion Principle): 针对接口编程，不要针对实现编程</span></span>

	<span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">LoD(Law of Demeter): 只与你直接的朋友通信，而避免和陌生人通信</span></span>

*   <span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">_<u>**[<span style="color:#FF0000;">简单工厂模式</span>](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/simpleFactory)**</u>_</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(56, 118, 29); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">:</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> </span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">静态工厂，方法都是静态的， 通过接受不同参数创建不同实例， 增加新的类需要修改已有方法，扩展困难, 实际使用最多。</span></span>
*   <span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(56, 118, 29); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[工厂方法模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/facotryMethod)：</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">避免了简单工厂不满足ocp的缺点，简单工厂只有一个工厂类，而工厂方法模式有一组实现了相同接口的工厂类（</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">一般都用简单工厂模式</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">), 不修改已有类的前提下，增加新的工厂类来实现扩展</span></span>
*   <span id="docs-internal-guid-4aa9959f-2d58-0d77-87de-ff60ff20a0e6"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(56, 118, 29); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[抽象工厂模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/factory/abstractFactory)：</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">用来生成不同</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(255, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">产品族</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">的全部产品， 工厂方法的升级版，不能增加产品，但能增加产品族。</span></span>

	<span id="docs-internal-guid-4aa9959f-2d59-3f8c-0b02-4fd6a6d4fb76"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">3.[建造者模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/builder)</span></span>

	<span id="docs-internal-guid-4aa9959f-2d59-3f8c-0b02-4fd6a6d4fb76"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">对象的组件多，装配顺序复杂</span></span>

	<span id="docs-internal-guid-4aa9959f-2d59-3f8c-0b02-4fd6a6d4fb76"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">装配的问题，零件之间有一个装配顺序，分离了对象子组件的单独构造（[builder](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/builder/godlzrAirshipBuilder.java)）和装配（[director](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/builder/godlzrAirshipDirector.java)）</span></span>

	<span id="docs-internal-guid-4aa9959f-2d59-3f8c-0b02-4fd6a6d4fb76"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">实现了构建和装配的解耦，不同的构建器，相同的装配器，构建不同的对象。相同的构建器，不同的装配器，构建不同的对象。实现了构建算法和装配算法的解耦，有很好的复用性。</span></span>

	&nbsp;

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">4.</span><span style="color:#FF0000;"><span style="font-size: 14.6666666666667px; font-family: Arial; font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">原型模式 </span></span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[Prototype](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/prototype)（克隆模式）</span></span>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">以</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">某个对象为原型，复制拷贝出新的对象，实现数据的复用。新对象具备原型对象的特点。</span></span>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">优势：效率高</span></span>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">克隆类似于new，但new的对象的属性采用默认值，克隆的对象属性与原型一样。克隆的对象改变不会影响原型。例如，opencv中 mat 的clone(), copyTo().</span></span>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">有</span>[<span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(153, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">深克隆</span>](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Sheep.java)<span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">，</span>[<span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(153, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">浅克隆</span>](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Sheep2.java)<span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">之分。 对浅克隆来说，如果对象中的某些属性也是对象，则克隆的对象与原型对象的同一个属性对象在内存中只有一个，该属性对象并没有被复制。如果修改了该属性，则无论是克隆对象和原型对象的该属性都被修改。</span></span>

<pre class="brush:java;">
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
}</pre>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">实现深克隆就要把原型对象的所有属性都复制。</span></span>

	<span id="docs-internal-guid-4aa9959f-3415-2f2f-5dba-5ed82fea99fe"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(153, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">深克隆</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">可以利用[序列化和反序列化技术实现](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Client2.java)。</span></span>

<pre class="brush:java;">
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
}</pre>

	<span id="docs-internal-guid-4aa9959f-3427-993b-7b1b-0597efd2c0fb"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(153, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[使用情景](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/prototype/Client3.java)：使用new创建对象很耗时间时，利用原型模式拷贝来提高效率。</span></span>

	<span id="docs-internal-guid-4aa9959f-3427-993b-7b1b-0597efd2c0fb"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">原型模式一般和工厂模式结合起来</span></span>

<div>
	&nbsp;
</div>