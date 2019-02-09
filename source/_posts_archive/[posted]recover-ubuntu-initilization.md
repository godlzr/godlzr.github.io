---
title: 恢复Ubuntu启动项
tags:
  - Ubuntu
id: 11
categories:
  - Issues Solution
date: 2015-02-26 06:45:45
---

使用ubuntu的启动盘，然后改系统从光盘启动，进入临时ubuntu系统，选择&ldquo;试用ubuntu&rdquo;。

	运行命令：sudo fdisk -l （这里不是数字1，是字母l），找到ubuntu所在分区。由于我的是装在G盘，所以显示为sda8。

	运行命令：sudo -i 进入到root用户，方便后面的操作。

	运行命令：mkdir /media/tmpdir 建立临时文件夹，然后输入命令：mount&nbsp; /dev/sda8&nbsp; /media/tmpdir挂载系统。

	接下来输入命令: sudo grub-install&nbsp; --root-directory=/media/tmpdir&nbsp;&nbsp; /dev/sda （注意，这里就是sda，后面不要写成sda8），如果显示no error report，则表示基本成功了。

	接下来，重启系统，不要进入[windows](http://www.2cto.com/os/windows/)，先进入ubuntu，在终端中输入命令：sudo update-grub2 更新grub后方成功完成，这时候就可以重启进入任意一个系统了。

	以上经过windows7和windows8系统测试都没有问题，最终很完美的解决了启动项问题