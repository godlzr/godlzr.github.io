---
title: OpenGL is a State Machine（OpenGL状态机）
id: 261
categories:
  - OpenGL
date: 2015-08-02 18:46:18
tags:
---

1\. OpenGL is a state machine, so the first question is &quot;what is the&nbsp;state machine?&quot;

*   State machine: is a kind of machine which keep various of state in its memory. It can accept input and change the corresponding state in its memory, and it can also output its current state when getting inqurie. So for a time, and a state, it only have one value for&nbsp;this state. And it may get into a special state(stop state), and it stop to accept input, and turned off.

	So OpenGL works as a state machine. First of all, OpenGL keep various of states values, such as current color, l<span style="line-height: 20.7999992370605px;">urrent viewing and projection transformations, line and polygon stipple patterns, polygon drawing modes, pixel-packing conventions, positions and characteristics of lights, and material properties of the objects being drawn,&nbsp;</span>etc.&nbsp;Programmer&nbsp;puts it into various states (or modes) that then remain in effect until changing&nbsp;them. The current color is a state variable. You can set the current color to white, red, or any other color, and thereafter every object is drawn with that color until you set the current color to something else. The current color is only one of many state variables that OpenGL maintains. Many state variables refer to modes that are enabled or disabled with the command&nbsp;glEnable()&nbsp;or&nbsp;glDisable().

	2\. Each state variable or mode has a default value, and at any point you can query the system for each variable&#39;s current value. Typically, you use one of the six following commands to do this:&nbsp;

*   glGetBooleanv(), &nbsp;
*   glGetDoublev(),
*   glGetFloatv(),
*   glGetIntegerv(),&nbsp;
*   glGetPointerv(),
*   or&nbsp;glIsEnabled().

	Which of these commands you select depends on what data type you want the answer to be given in. Some state variables have a more specific query command (such as&nbsp;glGetLight*(),&nbsp;glGetError(), or&nbsp;glGetPolygonStipple()). In addition, you can save a collection of state variables on an attribute stack with&nbsp;glPushAttrib()&nbsp;or&nbsp;glPushClientAttrib(), temporarily modify them, and later restore the values with&nbsp;glPopAttrib()&nbsp;or&nbsp;glPopClientAttrib(). For temporary state changes, you should use these commands rather than any of the query commands, since they&#39;re likely to be more efficient.

	3\. So how to set the state of OpenGL? Although you need to use getXXX to check the current state of OpenGL, but there is no set function as setXXX to set or change the state of OpenGL. OpenGL provides many functions such as&nbsp;<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px;">glColor*, glMaterial*, glEnable, glDisable, to give the programmer the control of state change. So there is no need to have setXXX functions for OpenGL.</span>&nbsp;**Important:&nbsp;From the prespective of state machine, it changes its state itself based on&nbsp;the external input, and it is not allowed to change its&nbsp;state directly by the outside, this is the reason why no need of the kind of setXXX function for OpenGL.**