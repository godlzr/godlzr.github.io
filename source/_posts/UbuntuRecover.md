---
title: [Issue] 恢复Ubuntu启动项
id:11
categories:
  - Issues Solution
date: 2015-02-26 06:45:45
tags:
  - Ubuntu
---

使用ubuntu的启动盘，然后改系统从光盘启动，进入临时ubuntu系统，选择试用ubuntu。

运行命令：sudo fdisk -l （这里不是数字1，是字母l），找到ubuntu所在分区。由于我的是装在G盘，所以显示为sda8。

运行命令：sudo -i 进入到root用户，方便后面的操作。

运行命令：mkdir /media/tmpdir 建立临时文件夹，然后输入命令：mount /dev/sda8 /media/tmpdir挂载系统。

接下来输入命令: sudo grub-install --root-directory=/media/tmpdir/dev/sda （注意，这里就是sda，后面不要写成sda8），如果显示no error report，则表示基本成功了。

接下来，重启系统，不要进入[windows](http://www.2cto.com/os/windows/)，先进入ubuntu，在终端中输入命令：sudo update-grub2 更新grub后方成功完成，这时候就可以重启进入任意一个系统了。

以上经过windows7和windows8系统测试都没有问题，最终很完美的解决了启动项问题