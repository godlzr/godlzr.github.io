---
title: OpenGL and OpenGL ES
tags:
  - OpenGL
id: 168
categories:
  - OpenGL
date: 2015-07-20 18:08:10
---

**OpenGL** (**Open Graphics Library**)<span style="font-size:10px;"> </span>is a cross-language, multi-platform application programming interface(API) for rendering 2D and 3D vector graphics. The API is typically used to interact with a graphics processing unit(GPU), to achieve hardware-accelerated rendering. It is widely used in CAD, scientific visualization,  virtual reality, flight simulation, video game. Lastest version 4.5\. It's a common accepted industry standard and most driver for pc graphics cards have OpenGL implementation.

OpenGL consists of three libraries GL, GLU,glx/wgl/agl

*   GL: geometric primitive operations. Texturing/Image primitive operations. Set states of OpenGL state machine.
*   GLU: Higher-level utility functions for NURBS, tessellators, quadric shapes etc.
*   GLX/WGL/AGL: connects OpenGL and the windowing system of the OS.
*   GLUT: OpenGL utility toolkit is a simple platform-independent GUI and is contained in the lib glut.
**OpenGL ES (OpenGL for Embedded System) **is a subset<span style="font-size:10px;"> </span>of the OpenGL computer graphics rendering API(application programming interface) for rendering 2D and 3D computer graphics such as those used by video games, typically hardware-accelerated using a GPU(graphics processing unit). It is designed for embedded systems like smartphones, computer tablets, video game consoles and PDAs.

The API is cross-language and multi-platform. The libraries GLUT and GLU are not available for OpenGL ES. Lastest version 3.1<sup id="cite_ref-3" class="reference"></sup>

**Difference between OpenGL and OpenGL ES**

OpenGL ES 1.1 and OpenGL ES 2.0 are subsets of the full OpenGL standard. When using the OpenGL ES API, there are limitations that you must be aware of when developing your applications. For example, the following OpenGL functionality is not present in either OpenGL ES 1.1 or OpenGL ES 2.0:

*   There is no support for `glBegin` or `glEnd`. Use vertex arrays and vertex buffer objects instead.
*   The only supported rasterization primitives are points, lines and triangles. Quads are not supported.
*   There is no polynomial function evaluation stage.
*   You cannot send blocks of fragments directly to individual fragment operations.
*   There is no support for display lists.
In addition, the following OpenGL functionality is not present in OpenGL ES 2.0:

*   There is no support for the fixed-function graphics pipeline. You must use your own vertex and fragment shader programs.
*   There is no support for viewing transforms such as `glFrustumf`. You must compute your own transformation matrix, pass it to the vertex shader as a uniform variable, and perform the matrix multiplication in the shader.
*   There is no support for specialized functions such as `glVertexPointer` and `glNormalPointer`. Use `glVertexAttribPointer`instead.