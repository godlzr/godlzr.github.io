---
title: 1.Singleton 单例模式
id: 304
categories:
  - Creational Patterns
date: 2015-08-13 12:37:50
tags:
---

<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 255); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">1.[单例模式](https://github.com/godlzr/GOF23_DesignPattern/tree/master/src/com/godlzr/GOF23/singleton)，一个类只有一个对象，并且提供一个访问该实例的全局访问点</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">例如，windows的任务管理器，回收站。</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">调用效率，线程安全，懒加载</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">优点：只有一个实例，内存占用和系统开销小，</span></span>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">饿汉式：</span></span>

        *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">线程安全，调用效率高，不能延时加载</span></span>

<pre class="brush:java;">
/*
 * 测试饿汉式单例模式
 */
public class SingletonDemo1 {

	//由于加载类时天然的线程安全
	private static SingletonDemo1 instance = new SingletonDemo1();//2.类初始化时立即直接构造函数实例（饿汉式）（没有延时加载的优势）

	private SingletonDemo1(){
	}//1.构造函数私有化

	//方法没有同步，调用效率高
	public static SingletonDemo1 getInstance(){
		return instance;
	}//3.实例唯一的访问方法
}</pre>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">懒汉式：</span></span>

        *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">线程安全，调用效率低，延时加载（懒加载，只有用的时候才new实例),</span></span>

    *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">需要同步，并发效率低。</span></span>

<pre class="brush:java;">
/*
 * 单例模式懒汉式
 */
public class SingletonDemo2 {

	private static SingletonDemo2 instance;//2.类初始化时不初始化对象实例，延时加载，真正使用的时候再加载

	private SingletonDemo2(){ }//1.构造函数私有化

	//4.SYNCHRONIZED 需要同步，调用效率低，保证同一时间只有一个线程访问获取实例函数，这样就不会有多个实例被创建
	public static synchronized SingletonDemo2 getInstance(){
		if( instance == null)
		{
			instance = new SingletonDemo2();//3.使用的时候才真正构造对象实例，加载对象
		}
		return instance;
	} 
}</pre>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">双重检测锁 double check lock</span></span>

        *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">将同步检测放在if下，提高了调用的效率</span></span>

<pre class="brush:java;">
/*
 * 双重检查锁实现单例模式
 */
public class SingletonDemo3 {
	private static SingletonDemo3 instance = null;

	private SingletonDemo3(){}

	public static SingletonDemo3 getInstance(){

		if(instance == null){
			SingletonDemo3 sc;
			synchronized (SingletonDemo3.class){
				sc = instance;
				if(sc == null){
					synchronized (SingletonDemo3.class){
						if(sc == null){
							sc = new SingletonDemo3();
						}
					}
					instance  = sc;
				}
			}
		}
		return instance;
	}
}</pre>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">静态内部类 *（并发高效调用，和延时加载）</span></span>

        *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">也是一种懒加载</span></span>

    *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">使用静态内部类</span></span>

<pre class="brush:java;">
/*
 * 静态内部类实现单例模式
 * 这种方式线程安全，调用效率高，实现了延时加载
 */

public class SingletonDemo4 {

	//静态内部类
	private static class SingletonClassInstance{
		private static final SingletonDemo4 instance =  new SingletonDemo4();
	}
	private SingletonDemo4(){}

	//方法没有同步，调用效率高
	public static SingletonDemo4 getInstance(){
		return SingletonClassInstance.instance;//调用时才加载静态内部类，并由静态内部类获取实例
	}
}</pre>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">枚举单例 （最安全）</span></span>

        *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">枚举对象天然是单例的</span></span>

    *   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">天然防止反射和反序列化</span></span>

<pre class="brush:java;">
/*
 * 枚举模式实现单例，枚举没有延时加载
 */
public enum SingletonDemo5 {

	//这个枚举元素本身就是单例
	INSTANCE;
	//添加自己需要的操作
	public void singletonOperation(){
	}
}</pre>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(152, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">如何选用</span></span>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">单例对象 占用资源少 不需要延时加载：枚举 好于 饿汉</span></span>

*   <span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">单例对象 占用资源多 需要延时加载：静态内部类 好于 懒汉</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(152, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">问题</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(152, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[反射破解除枚举外的单例模式，](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/singleton/Client2.java)（[在构造器中判断实例是否为空](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/singleton/SingletonDemo6.java)，不是的话抛出异常，不初始化新实例）</span></span>

	<span id="docs-internal-guid-0a891e64-27e9-c0b1-bd6e-8d7ca9e765e7"><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 14.6666666666667px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">[反序列化破解除枚举外的单例模式](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/singleton/Client2.java)。（[使用 readResolve() 防止](https://github.com/godlzr/GOF23_DesignPattern/blob/master/src/com/godlzr/GOF23/singleton/SingletonDemo6.java)）。</span></span>