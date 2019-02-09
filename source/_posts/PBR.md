---
title: 基于物理渲染的基础理论[Progressing...]
id: 497
categories:
  - Computer Vision/Graphics
date: 2016-06-23 23:10:30
tags:
---

# 基于物理渲染的基础理论

---翻译自[Basic Theory of Physically-Based Rendering](https://www.marmoset.co/toolbag/learn/pbr-theory) By [Jeff Russell](https://twitter.com/j3ffdr)

---【译】李仲锐

Physcially-based Rendering（PBR）基于物理渲染是令人兴奋的技术，因为缺少定义，近年来倾向于用实时渲染（Real-time Rendering）来指代。这项技术中杂糅了很多概念，所以经常让人困惑它的真实含义是什么。最简短的回答是:许多事物，和它有关于，这个回答显然不令人满意，所以我尝试用我的方法来在一定程度上解释PBR代表的含义和它有别于其他渲染方法的地方。这篇文章是为了那些非工程出身的读者，主要是艺术工作者而写的，其中不包含任何的数学知识与计算机代码。

基于物理的着色（shading）系统与以往技术的最大不同在于对光线与物体表面行为属性的关注。一些以往的方法的着色能力已经足够先进，使那些近似而不精确的视觉效果可以被忽略，这些方法已被用于艺术相关的创作中。工程人员和艺术工作者应该理解这些方法改变与演进的动机。

我们将会从一些基础开始，对于基础深刻的理解有助于我们开始探究PBR的新鲜技术。但是如果你能忍受我讲述你已经知道的部分，你将发现这些内容是值得一读的。你可能还会想去查看Joe Wilson的文章 《[Creating PBR artwork](http://www.marmoset.co/toolbag/learn/pbr-practice)》

## Diffusion Reflection 漫反射和反射

漫反射和反射 - 对应于漫射光和镜面反射光，是两个用来描述最为基本的物体表面和光线交汇情况分类。实践上，大多数人比较熟悉这些概念，但是可能不清楚其具体的物理区别。

When light hits a surface boundary some of it will reflect that is, bounce off from the surface and leave heading in a direction on the opposing side of the surface normal. This behavior is very similar to a ball thrown against the ground or a wall it will bounce off at the opposite angle. On a smooth surface this will result in a mirror-like appearance. The word specular, often used to describe the effect, is derived from the latin for mirror (it seems specularity sounds less awkward than mirrorness).

Not all light reflects from a surface, however. Usually some will penetrate into the interior of the illuminated object. There it will either be absorbed by the material (usually converting to heat) or scattered internally. Some of this scattered light may make its way back out of the surface, then becoming visible once more to eyeballs and cameras. This is known by many names: Diffuse Light, Diffusion, Subsurface Scattering all describe the same effect.

The absorption and scattering of diffuse light are often quite different for different wavelengths of light, which is what gives objects their color (e.g. if an object absorbs most light but scatters blue, it will appear blue). The scattering is often so uniformly chaotic that it can be said to appear the same from all directions quite different from the case of a mirror! A shader using this approximation really just needs one input: albedo, a color which describes the fractions of various colors of light that will scatter back out of a surface. Diffuse color is a phrase sometimes used synonymously.
