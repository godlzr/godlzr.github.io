---
title: Xcode debugging cannot see the value of the local variable
id: 108
categories:
  - Issues Solution
date: 2015-04-24 02:08:19
tags:
---

Resolution:

1.in Scheme Setting: set run to debug

[![QQ20140401-2](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-2-300x149.png)](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-2.png)

2.in build settings, set optim to O0

[![QQ20140401-3](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-3-300x139.png)](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-3.png)

3.build settings, Custom Compiler Flags change O2 to g.

[![QQ20140401-1](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-1-300x90.png)](https://laoyur.com/wp-content/uploads/2014/04/QQ20140401-1.png)