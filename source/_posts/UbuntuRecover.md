---
title: "[Issue] 恢复Ubuntu启动项"
id: 11
categories:
  - Issues Solution
date: 2015-02-26 06:45:45
tags:
  - Ubuntu
---

使用 ubuntu 的启动盘，然后改系统从光盘启动，进入临时 ubuntu 系统，选择试用 ubuntu。

运行命令：sudo fdisk -l （这里不是数字 1，是字母 l），找到 ubuntu 所在分区。由于我的是装在 G 盘，所以显示为 sda8。

运行命令：sudo -i 进入到 root 用户，方便后面的操作。

运行命令：mkdir /media/tmpdir 建立临时文件夹，然后输入命令：mount /dev/sda8 /media/tmpdir 挂载系统。

接下来输入命令: sudo grub-install --root-directory=/media/tmpdir/dev/sda （注意，这里就是 sda，后面不要写成 sda8），如果显示 no error report，则表示基本成功了。

接下来，重启系统，不要进入[windows](http://www.2cto.com/os/windows/)，先进入 ubuntu，在终端中输入命令：sudo update-grub2 更新 grub 后方成功完成，这时候就可以重启进入任意一个系统了。

以上经过 windows7 和 windows8 系统测试都没有问题，最终很完美的解决了启动项问题
