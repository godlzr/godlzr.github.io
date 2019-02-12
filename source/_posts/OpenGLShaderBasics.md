---
title: "[转] OpenGL Shader Basics"
id: 273
categories: 
  - OpenGL
date: 2015-08-02 23:24:00
tags:
---

# [转] OpenGL Shader Basics

使用 OpenGL 创造的物体，在最终被绘制出来之前，有一个流水线处理过程，该过程被称为 graphics pipeline,或者 rendering pipeline，期间大部分工作由 GPU 执行，跟 GPU 紧密相关。

The pipeline of OpenGL is used for display 2D/3D objects, it is called graphics pipeline or rendering pipeline, during the pipeline most of the work are done by GPU, the work of pipeline has high relevence with GPU.

随着 GPU 的发展，现在的 GPU 加入了可编程处理器，开发人员可直接控制 GPU 的行为。所谓 Shader，就是控制 GPU 的一堆指令集，程序员写出 shader，输入到 GPU 中，GPU 执行。

Along the development of GPU, the programable processor has become a common part of GPU, developer can control GPU directly by the programmable processor. Shader is a command set of GPU control, developer code the shader and send it to the GPU, and then GPU can execute the shader.

早期的 Shader 是直接使用汇编。后来 OpenGL ARB 组织开发了一种新的编程语言，叫做 GLslang 或者 GLSL, OpenGL shading language.该语言类似于 C 风格，在官方网站上有详细的语法解释，这样，程序员们就可以很方便的写出可直接控制 GPU 的代码了。

Shader was coded using assembly in the early time, then OpenGL ARB group developed a new program language named GLslang or GLSL(OpenGL shading language). The GLSL is similiar to C style, so the developer can easily program the shader to control GPU.

所谓控制 GPU，就是控制 GPU 的处理器，现阶段，GPU 有以下几个处理器：

To control GPU mean control the processors of GPU, right common GPU consist of these processors:

1. Vertext processor

2. Tessellation Control processor

3. Tessellation Evaluation processor

4. Geometry processor

5. Fragment processor

于是，shader 就分为：

So, here are the related shaders:

1. Vertext shader

2. Tessellation Control shader

3. Tessellation Evaluation shader

4. Geometry shader

5. Fragment shader
