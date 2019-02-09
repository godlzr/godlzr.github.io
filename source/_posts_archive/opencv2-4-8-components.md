---
title: 一览众山小：OpenCV 2.4.8组件结构全解析
id: 286
categories:
  - OpenCV
date: 2015-08-07 12:14:53
tags:
---

> # > 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 16px;"><span style="color: rgb(51, 51, 255);">本系列文章由zhmxy555（毛星云）编写，转载请注明出处。&nbsp;</span></span><span style="color: rgb(51, 51, 255);">&nbsp;</span></span>> 
> 
> 		<span style="font-size: 16px;"><span style="font-family: 'Microsoft YaHei';"><span style="color: rgb(102, 0, 204);">文章链接：</span>[&nbsp;](http://blog.csdn.net/poem_qianmo/article/details/19809337)[http://blog.csdn.net/poem_qianmo/article/details/19925819](http://blog.csdn.net/poem_qianmo/article/details/19925819)</span></span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-size: 16px;"><span style="font-family: 'Microsoft YaHei';"><span style="color: rgb(0, 153, 0);">作者：毛星云（浅墨）&nbsp;&nbsp;&nbsp;&nbsp;邮箱：&nbsp;</span><span style="color: rgb(0, 153, 0);">[happylifemxy@163.com](mailto:happylifemxy@163.com)&nbsp;</span></span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="white-space: pre; font-size: 16px;"><span style="color: rgb(255, 0, 0);">写作当前博文时配套使用OpenCV版本：2.4.8</span></span></span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">之前啃了不少OpenCV的官方文档，发现如果了解了一些OpenCV整体的模块架构后，再重点学习自己感兴趣的部分的话，就会有一览众山小的感觉，于是，就决定写出这篇文章，作为启程OpenCV系列博文的第二篇。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">至于OpenCV组件结构的研究方法，我们不妨管中窥豹，通过opencv安装路径下include目录里面头文件的分类存放，来一窥OpenCV这些年迅猛发展起来的庞杂组件架构。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">我们进入到D:\ProgramFiles\opencv\build\include目录，可以看到有opencv和opencv2这两个文件夹。显然，opencv这个文件夹里面包含着旧版的头文件。</span><span style="font-family: 'Microsoft YaHei';">而opencv2这个文件夹里面包含着具有时代意义的新版OpenCV2系列的头文件。</span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;![](http://img.blog.csdn.net/20140225181139578?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcG9lbV9xaWFubW8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">在opencv这个文件夹里面，也就是D:\Program Files\opencv\build\include\opencv目录下，可以看到如下的各种头文件。这里面大概就是opencv 1.0最核心的，而且保留下来的内容的头文件，可以把它们整体理解为一个组件。</span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;![](http://img.blog.csdn.net/20140225181220281?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcG9lbV9xaWFubW8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)</span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;再来看看我们重点关注的opencv2这边，</span><span style="font-family: 'Microsoft YaHei';">在D:\ProgramFiles\opencv\build\include\opencv2目录下，我们可以看到这些文件夹：</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">![](http://img.blog.csdn.net/20140225181302390?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcG9lbV9xaWFubW8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)</span>> 
> 
> 		&nbsp;> 
> 
> 		&nbsp;> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">我们灵机一动，发现下面有个叫opencv_modules.hpp的hpp文件，一看就知道里面存放的是opencv2中的新模块构造相关的说明代码，打开一看，果不其然，定义的是OpenCV2所有组件的宏：</span>> 
> 
> 		&nbsp;> 
> 
> 	<div class="dp-highlighter bg_cpp" style="font-family: Consolas, 'Courier New', Courier, mono, serif; font-size: 12px; width: 895.03125px; overflow: auto; padding-top: 1px; margin: 18px 0px !important; background-color: rgb(231, 229, 220);">> 
> 		<div class="bar" style="padding-left: 45px;">> 
> 			<div class="tools" style="padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; border-left-width: 3px; border-left-style: solid; border-left-color: rgb(153, 153, 153); background-color: rgb(248, 248, 248);">> 
> 				**[cpp][/cpp]**&nbsp;[view plain](http://blog.csdn.net/poem_qianmo/article/details/19925819# "view plain")[copy](http://blog.csdn.net/poem_qianmo/article/details/19925819# "copy")[![在CODE上查看代码片](https://code.csdn.net/assets/CODE_ico.png)](https://code.csdn.net/snippets/204804 "在CODE上查看代码片")[![派生到我的代码片](https://code.csdn.net/assets/ico_fork.svg)](https://code.csdn.net/snippets/204804/fork "派生到我的代码片")> 
> 
> 					&nbsp;> 
> 
> 				<div style="position: absolute; left: 467px; top: 1884px; width: 29px; height: 14px; z-index: 99;">> 
> 					&nbsp;> 
> 				</div>> 
> 
> 					&nbsp;> 
> 
> 			</div>> 
> 
> 				&nbsp;> 
> 
> 		</div>> 
> 
> 1.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">/*</span>&nbsp;</span>> 
> 2.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**&nbsp;File&nbsp;generated&nbsp;automatically,&nbsp;do&nbsp;not&nbsp;modify&nbsp;**</span>&nbsp;</span>> 
> 3.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">&nbsp;*</span>&nbsp;</span>> 
> 4.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">&nbsp;*This&nbsp;file&nbsp;defines&nbsp;the&nbsp;list&nbsp;of&nbsp;modules&nbsp;available&nbsp;in&nbsp;current&nbsp;build&nbsp;configuration</span>&nbsp;</span>> 
> 5.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">&nbsp;*</span>&nbsp;</span>> 
> 6.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">&nbsp;*</span>&nbsp;</span>> 
> 7.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="comment" style="margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;">*/</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 8.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;">&nbsp;&nbsp;&nbsp;</span>> 
> 9.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_CALIB3D</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 10.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_CONTRIB</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 11.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_CORE</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 12.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_FEATURES2D</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 13.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_FLANN</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 14.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_GPU</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 15.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_HIGHGUI</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 16.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_IMGPROC</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 17.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_LEGACY</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 18.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_ML</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 19.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_NONFREE</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 20.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_OBJDETECT</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 21.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_OCL</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 22.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_PHOTO</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 23.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_STITCHING</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 24.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_SUPERRES</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 25.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_TS</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 26.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_VIDEO</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 27.  <span style="margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;"><span class="preprocessor" style="margin: 0px; padding: 0px; border: none; color: gray; background-color: inherit;">#define&nbsp;HAVE_OPENCV_VIDEOSTAB</span><span style="margin: 0px; padding: 0px; border: none; background-color: inherit;">&nbsp;&nbsp;</span></span>> 
> 	</div>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">OK，就不多客套了，下面就是OpenCV的所有模块介绍，按照顺序来：</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(204, 0, 0);">【calib3d】</span>&mdash;&mdash;其实就是就是Calibration（校准）加3D这两个词的组合缩写。这个模块主要是相机校准和三维重建相关的内容。基本的多视角几何算法，单个立体摄像头标定，物体姿态估计，立体相似性算法，3D信息的重建等等。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(0, 153, 0);">【contrib】</span>&mdash;&mdash;也就是Contributed/Experimental Stuf的缩写， 该模块包含了一些最近添加的不太稳定的可选功能，不用去多管。2.4.8里的这个模块有新型人脸识别，</span><span style="font-family: 'Microsoft YaHei'; color: rgb(49, 49, 49);">立体匹配</span><span style="font-family: 'Microsoft YaHei';">，人工视网膜模型等技术。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(255, 102, 0);">【core】</span>&mdash;&mdash;核心功能模块，包含如下内容：</span>

> > > # > > > 
> > > 				<a name="t2" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">OpenCV基本数据结构</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">动态数据结构</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">绘图函数</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">数组操作相关函数</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">辅助功能与系统函数和宏</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">与OpenGL的互操作</span></span>> > > 
> > > 
> > > 				&nbsp;

> # > 
> 		<a name="t3" style="color: rgb(202, 0, 0);" target="_blank"></a>> 
> 
> 		&nbsp;> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei'; font-size: 18px; color: rgb(153, 51, 153);">&nbsp;【imgproc</span><span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(153, 51, 153);">】</span><span style="font-size: 14px;">&mdash;&mdash;Image和Processing这两个单词的缩写组合。图像处理模块，这个模块包含了如下内容：</span></span>

> > > # > > > 
> > > 				<a name="t4" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">线性和非线性的图像滤波</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">图像的几何变换</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">其它（Miscellaneous）图像转换</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">直方图相关</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">结构分析和形状描述</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">运动分析和对象跟踪</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">特征检测</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">目标检测等内容</span></span>> > > 
> > > 
> > > 				&nbsp;

> # > 
> 		<a name="t5" style="color: rgb(202, 0, 0);" target="_blank"></a>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(51, 51, 255);">【features2d】</span><span style="font-size: 14px;">&nbsp;&mdash;&mdash;也就是Features2D， 2D功能框架 ，包含如下内容：</span></span>

> > > *   <span style="font-family: 'Microsoft YaHei';">**特征检测和描述**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**特征检测器（Feature Detectors）通用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**描述符提取器（Descriptor Extractors）通用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**描述符匹配器（Descriptor Matchers）通用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**通用描述符（Generic Descriptor）匹配器通用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**关键点绘制函数和匹配功能绘制函数**</span>

> > > > > # > > > > > 
> > > > > 						<a name="t6" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > > > 
> > > > > 
> > > > > 						&nbsp;> > > > > 
> > > > > 
> > > > > 						&nbsp;

> # > 
> 		<a name="t7" style="color: rgb(202, 0, 0);" target="_blank"></a>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(255, 102, 102);">【flann】</span><span style="font-size: 14px;">&mdash;&mdash;&nbsp;Fast Library for Approximate Nearest Neighbors，高维的近似近邻快速搜索算法库，</span></span><span style="font-size: 14px; font-family: 'Microsoft YaHei';">包含两个部分：</span>

> > > # > > > 
> > > 				<a name="t8" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">快速近似最近邻搜索</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">聚类</span></span>> > > 
> > > 
> > > 				&nbsp;

> > > # > > > 
> > > 				<a name="t9" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>

> # > 
> 		&nbsp;> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(153, 102, 51);">【gpu】</span><span style="font-size: 14px;">&mdash;&mdash;运用GPU加速的计算机视觉模块</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(51, 102, 255);">【highgui】</span><span style="font-size: 14px;">&mdash;&mdash;也就是high gui，高层GUI图形用户界面，包含媒体的I / O输入输出，</span></span><span style="font-family: 'Microsoft YaHei'; font-size: 14px;">视频捕捉、图像和视频的编码解码、图形交互界面的接口等内容</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(255, 0, 0);">【legacy】</span><span style="font-size: 14px;">&mdash;&mdash;一些已经废弃的代码库，保留下来作为向下兼容，包含如下相关的内容：</span></span><span style="font-family: 'Microsoft YaHei'; font-size: 14px;">&nbsp;</span>

> > > *   <span style="font-family: 'Microsoft YaHei';">**运动分析**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**期望最大化**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**直方图**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**平面细分（C API）**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**特征检测和描述（Feature Detection and Description）**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**描述符提取器（Descriptor Extractors）的通用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**通用描述符（Generic Descriptor Matchers）的常用接口**</span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';">**匹配器**</span>

> # > 
> 		<a name="t11" style="color: rgb(202, 0, 0);" target="_blank"></a>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(204, 0, 0);">【ml】</span><span style="font-size: 14px;">&mdash;&mdash;Machine Learning，机器学习模块，&nbsp;基本上是统计模型和分类算法，包含如下内容：</span></span>

> > > # > > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">统计模型 （Statistical Models）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">一般贝叶斯分类器 （Normal Bayes Classifier）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">K-近邻 （K-NearestNeighbors）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">支持向量机 （Support Vector Machines）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">决策树 （Decision Trees）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">提升（Boosting）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">梯度提高树（Gradient Boosted Trees）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">随机树 （Random Trees）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">超随机树 （Extremely randomized trees）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">期望最大化 （Expectation Maximization）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">神经网络 （Neural Networks）</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">MLData</span></span>

> # > 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(204, 0, 0);">【nonfree】</span><span style="font-size: 14px;">，也就是一些具有专利的算法模块 ，包含特征检测和GPU相关的内容。最好不要商用，可能会被告哦。</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(102, 51, 255);">【objdetect】</span><span style="font-size: 14px;">&mdash;&mdash;目标检测模块，包含Cascade Classification（级联分类）和Latent SVM这两个部分。</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(51, 204, 0);">【ocl】</span><span style="font-size: 14px;">&mdash;&mdash;即OpenCL-accelerated Computer Vision，运用OpenCL加速的计算机视觉组件模块</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(255, 102, 0);">【photo】</span><span style="font-size: 14px;">&mdash;&mdash;也就是Computational Photography，包含图像修复和图像去噪两部分</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(0, 204, 204);">【stitching】</span><span style="font-size: 14px;">&mdash;&mdash;images stitching，图像拼接模块，包含如下部分：</span></span>

> > > # > > > 
> > > 				<a name="t14" style="color: rgb(202, 0, 0);" target="_blank"></a>> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > 				&nbsp;> > > 
> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">拼接流水线</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">特点寻找和匹配图像</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">估计旋转</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">自动校准</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">图片歪斜</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">接缝估测</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">曝光补偿</span></span>> > > 
> > > *   <span style="font-family: 'Microsoft YaHei';"><span style="font-size: 14px;">图片混合</span></span>> > > 
> > > 
> > > 				&nbsp;

> # > 
> 		&nbsp;> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(51, 204, 0);">【superres】</span><span style="font-size: 14px;">&mdash;&mdash;SuperResolution，超分辨率技术的相关功能模块</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(255, 102, 0);">【ts】</span><span style="font-size: 14px;">&mdash;&mdash;opencv测试相关代码，不用去管他</span></span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(102, 0, 204);">【video】</span><span style="font-size: 14px;">&mdash;&mdash;视频分析组件，</span></span><span style="font-family: 'Microsoft YaHei'; font-size: 14px;">该模块包括运动估计，背景分离，对象跟踪等视频处理相关内容。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';"><span style="font-size: 18px; color: rgb(204, 0, 0);">【Videostab】</span><span style="font-size: 14px;">&mdash;&mdash;Video stabilization，视频稳定相关的组件，官方文档中没有多作介绍，不管它了。</span></span>> 
> 
> 		&nbsp;> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">&nbsp;</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">看到到这里，相信大家已经对OpenCV的模块架构设计有了一定的认识。</span>> 
> 
> 		<span style="font-family: 'Microsoft YaHei';">OpenCV其实就是这么多模块作为代码容器组合起来的一个SDK而已，没什么稀奇的，对吧。</span>