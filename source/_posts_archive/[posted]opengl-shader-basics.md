---
title: '[转] OpenGL Shader Basics'
id: 273
categories:
  - OpenGL
date: 2015-08-02 23:24:00
tags:
---

使用OpenGL创造的物体，在最终被绘制出来之前，有一个流水线处理过程，该过程被称为graphics pipeline,或者rendering pipeline，期间大部分工作由GPU执行，跟GPU紧密相关。&nbsp;

	The pipeline of OpenGL is used for display 2D/3D objects, it is called graphics pipeline or rendering pipeline, during the pipeline&nbsp;most of the work are done by GPU, the work of pipeline&nbsp;has&nbsp;high relevence with GPU.

	&nbsp;

	随着GPU的发展，现在的GPU加入了可编程处理器，开发人员可直接控制GPU的行为。所谓Shader，就是控制GPU的一堆指令集，程序员写出shader，输入到GPU中，GPU执行。

	Along the development of GPU, the programable processor has become a common part of GPU, developer can control GPU directly by the programmable processor. Shader is a command set of GPU control, developer code the shader and send it to the GPU, and then GPU can execute the shader.

	&nbsp;

	早期的Shader是直接使用汇编。后来OpenGL ARB组织开发了一种新的编程语言，叫做GLslang或者GLSL, OpenGL shading language.该语言类似于C风格，在官方网站上有详细的语法解释，这样，程序员们就可以很方便的写出可直接控制GPU的代码了。

	Shader was coded using assembly in the early time, then OpenGL ARB group developed a new program language named GLslang or GLSL(OpenGL shading language). The GLSL is similiar to C style, so the developer can easily program the shader to control GPU.

	&nbsp;

	所谓控制GPU，就是控制GPU的处理器，现阶段，GPU有以下几个处理器：

	To control GPU mean control the processors&nbsp;of GPU, right common GPU consist of these processors:

	1\. Vertext processor

	2\. Tessellation Control processor

	3\. Tessellation Evaluation processor

	4\. Geometry&nbsp;processor

	5\. Fragment&nbsp;processor

	于是，shader就分为：

	So, here are the related shaders:

	1\. Vertext shader

	2\. Tessellation Control&nbsp;shader

	3\. Tessellation Evaluation&nbsp;shader

	4\. Geometry&nbsp;shader

	5\. Fragment&nbsp;shader

	&nbsp;

<div style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; padding-top: 20px;">
	&nbsp;
</div>