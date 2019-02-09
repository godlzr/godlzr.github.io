---
title: Projection Matrix
id: 483
categories:
  - OpenGL
date: 2015-09-15 17:12:25
tags:
---

# 
	投影矩阵的推导&nbsp;<wbr />（OpenGL&nbsp;<wbr />D3D）

## 
	**OpenGL矩阵推导&mdash;&mdash;模型视图变化**

	在三维编程中，模型视图变换是从三维世界到二维屏幕中一个很重要的变换，但是这个变换往往很多人都不太理解，要么是事而非。而这方面的文章不是太少就是讲的太浅没有真正的理解模型视图变换，本人在这个过程中曾经走过很多歪路，不过好在最终在自己的不懈努力下终于降伏了这只猛虎。本人就以自己的理解，通过矩阵推导过程一步一步来了解模型视图变化，最后通过两个OpenGl的程序来进一步理解模型视图矩阵。先从一个基本的模型视图&mdash;透视投影变换讲起。

	透射投影是将相机空间中的点从视锥体(frustum)变换到规则观察体(Canonical View Volume 以下简称CVV)中，待裁剪完毕后进行透视除法的行为。

	透视投影变换是令很多刚刚进入3D图形领域的开发人员感到迷惑乃至神秘的一个图形技术。其中的理解困难在于步骤繁琐，对一些基础知识过分依赖，一旦对它们中的任何地方感到陌生，立刻导致理解停止不前。

	主流的3D APIs 都把透射投影的具体细节进行了封装，从而只需一个函数便可生成一个透射投影矩阵比如gluPerspective()，使得我们不需要了解其算法便可实现三维到二维的转化，然而实事是，一些三维图形或游戏开发人员遇到一些视图矩阵的问题往往会不知所措,比如视景体裁剪。

	以下部分内容是从别处那转过来的，主要感谢Twinsen和一个叫丁欧南的高中生。

	透视投影变换是在齐次坐标下进行的，而齐次坐标本身就是一个令人迷惑的概念，这里我们先把它理解清楚。齐次坐标

	对于一个_向量_**v**以及基**oabc**，![](http://hi.csdn.net/attachment/201203/6/0_13310356323GGi.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	可以找到一组坐标(v1,v2,v3)，使得

<pre class="brush:php;">
v&nbsp;= v1&nbsp;a&nbsp;+ v2&nbsp;b +&nbsp;v3&nbsp;c （1）</pre>

	而对于一个_点_**p**，则可以找到一组坐标（p1,p2,p3），使得

<pre class="brush:php;">
p&nbsp;&ndash;&nbsp;o&nbsp;= p1&nbsp;a +&nbsp;p2&nbsp;b&nbsp;+ p3&nbsp;c （2）</pre>

	从上面对_向量_和_点_的表达，我们可以看出为了在坐标系中表示一个_点_（如**p**），我们把点的位置看作是对这个基的原点**o**所进行的一个位移，即一个向量&mdash;&mdash;**p &ndash; o**（有的书中把这样的向量叫做**_位置向量_**&mdash;&mdash;起始于坐标原点的特殊向量），我们在表达这个向量的同时用等价的方式表达出了点**p**:

<pre class="brush:php;">
p&nbsp;=&nbsp;o&nbsp;+ p1&nbsp;a +&nbsp;p2&nbsp;b&nbsp;+ p3&nbsp;c (3)</pre>

	(1)(3)是坐标系下表达一个_向量_和_点_的不同表达方式。这里可以看出，虽然都是用代数分量的形式表达向量和点，但表达一个点比一个向量需要额外的信息。如果我写出一个代数分量表达(1, 4, 7)，谁知道它是个向量还是个点！

	我们现在把（1）（3）写成矩阵的形式：

	![](http://hi.csdn.net/attachment/201203/6/0_1331035691E3HE.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	这里**(a,b,c,o)**是坐标基矩阵，右边的列向量分别是向量**v**和点**p**在基下的坐标。这样，向量和点在同一个基下就有了不同的表达：_3D向量_的第4个代数分量是0，而_3D点_的第4个代数分量是1。像这种这种用4个代数分量表示3D几何概念的方式是一种齐次坐标表示。

	**&ldquo;齐次坐标表示是计算机图形学的重要手段之一，它既能够用来明确区分向量和点，同时也更易用于进行仿射（线性）几何变换。&rdquo;**_&mdash;&mdash;_F.S. Hill, JR

	这样，上面的(1, 4, 7)如果写成（1,4,7,0），它就是个向量；如果是(1,4,7,1)，它就是个点。

	下面是如何在普通坐标(OrdinaryCoordinate)和齐次坐标(Homogeneous Coordinate)之间进行转换：

	从普通坐标转换成齐次坐标时，

	如果(x,y,z)是个点，则变为(x,y,z,1);

	如果(x,y,z)是个向量，则变为(x,y,z,0)

	从齐次坐标转换成普通坐标时，

	如果是(x,y,z,1)，则知道它是个点，变成(x,y,z);

	如果是(x,y,z,0)，则知道它是个向量，仍然变成(x,y,z)

	以上是通过齐次坐标来区分向量和点的方式。从中可以思考得知，对于平移T、旋转R、缩放S这3个最常见的仿射变换，平移变换只对于点才有意义，因为普通向量没有位置概念，只有大小和方向，这可以通过下面的式子清楚地看出：

	![](http://hi.csdn.net/attachment/201203/6/0_1331035732h32x.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	而旋转和缩放对于向量和点都有意义，你可以用类似上面齐次表示来检测。从中可以看出，齐次坐标用于仿射变换非常方便。

	此外，对于一个普通坐标的_点_P=(Px, Py, Pz)，有对应的一族齐次坐标(wPx, wPy,wPz, w)，其中w不等于零。比如，P(1, 4, 7)的齐次坐标有(1, 4, 7, 1)、（2, 8, 14, 2）、（-0.1, -0.4, -0.7, -0.1）等等。因此，如果把一个点从普通坐标变成齐次坐标，给x,y,z乘上同一个非零数w，然后增加第4个分量w；如果把一个齐次坐标转换成普通坐标，把前三个坐标同时除以第4个坐标，然后去掉第4个分量。

	由于齐次坐标使用了4个分量来表达3D概念，使得平移变换可以使用矩阵进行，从而如F.S. Hill, JR所说，仿射（线性）变换的进行更加方便。由于图形硬件已经普遍地支持齐次坐标与矩阵乘法，因此更加促进了齐次坐标使用，使得它似乎成为图形学中的一个标准。

## 
	**简单的线性插值**

	线性插值我举的是丁欧南的温度计的例子：

	已知有一破温度计(何以谓破?刻度之间间距虽平均,但间距或大于或小于标准值,谓之破),当其插入0&nbsp;<wbr /><sup><font>0</font></sup>C水里时显示为5<sup><font>0</font></sup>C,当其插入100<sup><font>0</font></sup>C的沸水中时显示为90<sup><font>0</font></sup>C,问:当实际水温为50<sup><font>0</font></sup>C时此破温度计显示的值是多少?

	解:因刻度均匀,所以刻度之间的比例与好温度计相同,由此:设显示的数为T,

	(90-T)/(T-5)=(100-50)/(50-0) 解出T=47.5&nbsp;<wbr /><sup><font>0</font></sup>C.

	结论:由一个数域(如题目中的好温度计两个端点[0,100])映射到另一个数域(如题目中的破温度计的两个端点[5,90])时,如果两个数域都是线性(就如题目中暗示的刻度平均),那么它们对应点成比例(比如50和47.5这一对端点).

	这道题的应用是把一组坐标映射到另一个范围,这将在介绍NDC(Normalized Device Coordinate,归一化的设备坐标)时用到.

## 
	**透视投影变换**

	好，有了上面两个理论知识，我们开始分析这次的主角&mdash;&mdash;透视投影变换。这里我们选择OpenGL的透视投影变换进行分析，其他的APIs会存在一些差异，但主体思想是相似的，可以类似地推导。经过相机矩阵的变换，顶点被变换到了相机空间。这个时候的多边形也许会被视锥体裁剪，但在这个不规则的体中进行裁剪并非那么容易的事情，所以经过图形学前辈们的精心分析，裁剪被安排到规则观察体(CanonicalView Volume, CVV)中进行，CVV是一个正方体，x, y, z的范围都是[-1，1]，多边形裁剪就是用这个规则体完成的。所以，事实上是透视投影变换由两步组成：

	1） 用透视变换矩阵把顶点从视锥体中变换到裁剪空间的CVV中。

	2） CVV裁剪完成后进行_透视除法_（一会进行解释）。

	![](http://hi.csdn.net/attachment/201203/6/0_1331035790zAv8.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	我们一步一步来，我们先从一个方向考察投影关系。

	![](http://hi.csdn.net/attachment/201203/6/0_1331035842gETT.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	上图是右手坐标系中顶点在相机空间中的情形。设P(x,z)是经过相机变换之后的点，视锥体由eye&mdash;&mdash;眼睛位置，np&mdash;&mdash;近裁剪平面，fp&mdash;&mdash;远裁剪平面组成。N是眼睛到近裁剪平面的距离，F是眼睛到远裁剪平面的距离。投影面可以选择任何平行于近裁剪平面的平面，这里我们选择近裁剪平面作为投影平面。设P&rsquo;(x&rsquo;,z&rsquo;)是投影之后的点，则有z&rsquo; = -N。通过相似三角形性质，我们有关系：

	![](http://hi.csdn.net/attachment/201203/6/0_1331036046g8L9.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	同理，有

	![](http://hi.csdn.net/attachment/201203/6/0_1331036101kt2h.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	这样，我们便得到了P投影后的点P&rsquo;

	![](http://hi.csdn.net/attachment/201203/6/0_1331036128mJLY.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	从上面可以看出，投影的结果z&rsquo;始终等于-N，在投影面上。实际上，z&rsquo;对于投影后的P&rsquo;已经没有意义了，这个信息点已经没用了。但对于3D图形管线来说，为了便于进行后面的片元操作，例如z缓冲消隐算法，有必要把投影之前的z保存下来，方便后面使用。因此，我们利用这个没用的信息点存储z，处理成：

	![](http://hi.csdn.net/attachment/201203/6/0_13310361798BJy.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	这个形式最大化地使用了3个信息点，达到了最原始的投影变换的目的，但是它太直白了，有一点蛮干的意味，我感觉我们最终的结果不应该是它，你说呢？我们开始结合CVV进行思考，把它写得在数学上更优雅一致，更易于程序处理。假入能够把上面写成这个形式：

	![](http://hi.csdn.net/attachment/201203/6/0_1331036244oj6y.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	那么我们就可以非常方便的用矩阵以及齐次坐标理论来表达投影变换：

	![](http://hi.csdn.net/attachment/201203/6/0_1331036341eFzQ.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	其中![](http://hi.csdn.net/attachment/201203/6/0_1331036358gkKE.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	哈，看到了齐次坐标的使用，这对于你来说已经不陌生了吧？这个新的形式不仅达到了上面原始投影变换的目的，而且使用了齐次坐标理论，使得处理更加规范化。注意在把![](http://hi.csdn.net/attachment/201203/6/0_13310363917Xip.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")变成![](http://hi.csdn.net/attachment/201203/6/0_13310364141hmq.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")的一步我们是使用齐次坐标变普通坐标的规则完成的。这一步在透视投影过程中称为_透视除法（Perspective Division）_，这是透视投影变换的第2步，经过这一步，就丢弃了原始的z值（得到了CVV中对应的z值，后面解释），顶点才算完成了投影。而在这两步之间的就是CVV裁剪过程，所以裁剪空间使用的是齐次坐标![](http://hi.csdn.net/attachment/201203/6/0_13310363917Xip.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")，主要原因在于透视除法会损失一些必要的信息（如原始z，第4个-z保留的）从而使裁剪变得更加难以处理，这里我们不讨论CVV裁剪的细节，只关注透视投影变换的两步。

	矩阵![](http://hi.csdn.net/attachment/201203/6/0_1331036516v5Vi.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	就是我们投影矩阵的第一个版本。你一定会问为什么要把z写成

	![](http://hi.csdn.net/attachment/201203/6/0_1331036541HNv3.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	有两个原因：

	1） P&rsquo;的3个代数分量统一地除以分母-z，易于使用齐次坐标变为普通坐标来完成，使得处理更加一致、高效。

	2）后面的CVV是一个x,y,z的范围都为[-1，1]的规则体，便于进行多边形裁剪。而我们可以适当的选择系数a和b，使得![](http://hi.csdn.net/attachment/201203/6/0_1331036541HNv3.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")这个式子在z = -N的时候值为-1，而在z = -F的时候值为1，从而在z方向上构建CVV。

	接下来我们就求出a和b：![](http://hi.csdn.net/attachment/201203/6/0_1331036603DvuQ.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	这样我们就得到了透视投影矩阵的第一个版本：

	![](http://hi.csdn.net/attachment/201203/6/0_13310366817eCw.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	使用这个版本的透视投影矩阵可以从z方向上构建CVV，但是x和y方向仍然没有限制在[-1,1]中，我们的透视投影矩阵的下一个版本就要解决这个问题。

	为了能在x和y方向把顶点从Frustum情形变成CVV情形，我们开始对x和y进行处理。先来观察我们目前得到的最终变换结果：

	![](http://hi.csdn.net/attachment/201203/6/0_1331036738p5De.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	我们知道-Nx / z的有效范围是投影平面的左边界值（记为left）和右边界值（记为right），即[left, right]，-Ny / z则为[bottom, top]。而现在我们想把-Nx / z属于[left, right]映射到x属于[-1, 1]中，-Ny / z属于[bottom, top]映射到y属于[-1, 1]中。你想到了什么？哈，就是我们简单的线性插值，你都已经掌握了！我们解决掉它：

	![](http://hi.csdn.net/attachment/201203/6/0_1331036766qZIe.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	则我们得到了最终的投影点：

	![](http://hi.csdn.net/attachment/201203/6/0_13310368733aWN.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	下面要做的就是从这个新形式出发反推出下一个版本的透视投影矩阵。注意到![](http://hi.csdn.net/attachment/201203/6/0_1331037069ElpE.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")是![](http://hi.csdn.net/attachment/201203/6/0_1331037098UENE.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")经过透视除法的形式，而P&rsquo;只变化了x和y分量的形式，az+b和-z是不变的，则我们做透视除法的逆处理&mdash;&mdash;给P&rsquo;每个分量乘上-z，得到

	![](http://hi.csdn.net/attachment/201203/6/0_133103712487q6.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	而这个结果又是这么来的：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037299hEvO.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	则我们最终得到：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037379hfsh.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	上面是一般情况，我们要把它变成特殊性版本，即gluPerspective，它是一种左右对称的投影形式，因此我们从对x和y进行插值的那一步来看：

	那一步来看：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037414a8GT.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	销掉两边的1/2，得到：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037425kHAf.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	则我们反推出透视投影矩阵：

	![](http://hi.csdn.net/attachment/201203/6/0_13310374416cpk.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	这就是gluPerspective的投影矩阵了。

	**结论和用法：**相机空间中的顶点，如果在视锥体中，则变换后就在CVV中。如果在视锥体外，变换后就在CVV外。而CVV本身的规则性对于多边形的裁剪很有利。OpenGL在构建透视投影矩阵的时候就使用了M的形式。注意到M的最后一行不是(0 0 0 1)而是(0 0 -1 0)，因此可以看出透视变换不是一种仿射变换，它是非线性的。另外一点你可能已经想到，对于投影面来说，它的宽和高大多数情况下不同，即宽高比不为1，比如640/480。而CVV的宽高是相同的，即宽高比永远是1。这就造成了多边形的失真现象，比如一个投影面上的正方形在CVV的面上可能变成了一个长方形。解决这个问题的方法就是在对多变形进行透视变换、裁剪、透视除法之后，在归一化的设备坐标(NormalizedDevice Coordinates)上进行的视口(viewport)变换中进行校正，它会把归一化的顶点之间按照和投影面上相同的比例变换到视口中，从而解除透视投影变换带来的失真现象。进行校正前提就是要使投影平面的宽高比和视口的宽高比相同。

	而r-l和t-b可以分别看作是投影平面的宽w和高h。如果我们不知道right、left、top以及bottom这几个参量，也可以根据视野（FOV &ndash; Field Of View）参量来求得。下面是两个平面的视野关系图：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037762i2ru.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	![](http://hi.csdn.net/attachment/201203/6/0_1331037767a4uH.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	其中，两个fov分别是在x-z以及y-z平面上的视野。如果只给了一个视野，也可以通过投影平面的宽高比计算出来：

	![](http://hi.csdn.net/attachment/201203/6/0_1331037772vbqk.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	用一个视野算出w或者h，然后用宽高比算出h或者w。

	我们可以通过一个例子来证明我们矩阵的正确性：

	&nbsp;<wbr /><wbr />

<pre class="brush:cpp;">
void OpenGlCom::ReSize()

{

RECTrct ;

GetClientRect(m_Hwnd,&amp;rct);

intm_view_width = rct.right- rct.left;

intm_view_height = rct.bottom - rct.top;

glViewport(0,0,m_view_width,m_view_height);

float nearz =5.0;

float farz =80000;

float AspectRatio =float(m_view_height)/ float(m_view_width);

float ViewAngleH =90 * (PI / 180);//90度

float ViewAngleV = atan(tan(ViewAngleH/2) * AspectRatio)* 2;

glMatrixMode(GL_PROJECTION);

glLoadIdentity();

GLfloatm[16];

::ZeroMemory(m,16*sizeof(float));

//////m[8],m[9]=0表示对称视椎体即gluPerspective///////////

m[0] = 1.0 /tan(ViewAngleV / 2);

m[5] = m[0]*AspectRatio;

m[10] = -(farz +nearz) / (farz - nearz);

m[11] = -1;

m[14] = - 2 * farz *nearz / (farz - nearz);

glMultMatrixf(m);

glMatrixMode(GL_MODELVIEW);

glLoadIdentity();

}

void OpenGlCom::draw()

{

glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);

glMatrixMode(GL_MODELVIEW);

glLoadIdentity();

glPushMatrix();

glDepthFunc(GL_LEQUAL);

glEnable(GL_DEPTH_TEST);

glBegin(GL_TRIANGLE_FAN);

glTranslatef(0, 0,10.0f);//往视点方向平移10单位显示更大

glColor3f(0.8f, 0.8f, 0.6f);

glVertex3f(0,0,-20);

glVertex3f(30,20,-40);

glVertex3f(40,10,-30);

glPopMatrix();

}</pre>

	![](http://hi.csdn.net/attachment/201203/6/0_1331035076AIgp.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	我们看看在gluPerspective图形有什么变化呢

	将ReSize()改成：

<pre class="brush:cpp;">
{

RECTrct ;

GetClientRect(m_Hwnd,&amp;rct);

intm_view_width = rct.right- rct.left;

intm_view_height = rct.bottom - rct.top;

glViewport(0,0,m_view_width,m_view_height);

glMatrixMode(GL_PROJECTION);

glLoadIdentity();

floatfAspect = float(m_view_width) / float(m_view_height);

gluPerspective(90.0,fAspect, 5.0, 80000.0);

glMatrixMode(GL_MODELVIEW);

glLoadIdentity();

}</pre>

	![](http://hi.csdn.net/attachment/201203/6/0_1331035338p8zS.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	接下来，再试试看glFrustum()实现的效果：

	&nbsp;<wbr /><wbr />

	将ReSize()改成：

<pre class="brush:cpp;">
{

RECTrct ;

GetClientRect(m_Hwnd,&amp;rct);

intm_view_width = rct.right- rct.left;

intm_view_height = rct.bottom - rct.top;

glViewport(0,0,m_view_width,m_view_height);

glMatrixMode(GL_PROJECTION);

glLoadIdentity();

GLdouble left =-nearz*tan(ViewAngleV/2);

GLdouble right =nearz*tan(ViewAngleV/2);

GLdouble bottom =-nearz*tan(ViewAngleH/2);

GLdouble top =nearz*tan(ViewAngleH/2);

glFrustum(left,right,bottom,top,nearz,farz); glMatrixMode(GL_MODELVIEW);

glLoadIdentity();

}</pre>

	![](http://hi.csdn.net/attachment/201203/6/0_13310352642YM5.gif "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")

	从三幅图中可以看出图形位置是一样的，这就验证了我们的矩阵是正确的！

	&nbsp;<wbr /><wbr />

	&nbsp;<wbr /><wbr />

	相关图片：

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s7.sinaimg.cn/mw690/a401a1eatd11dc7a07f16&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s7.sinaimg.cn/orignal/a401a1eatd11dc7a07f16)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s2.sinaimg.cn/mw690/a401a1eatd11dc7adcd21&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s2.sinaimg.cn/orignal/a401a1eatd11dc7adcd21)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s5.sinaimg.cn/mw690/a401a1eatd11dc7aeb124&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s5.sinaimg.cn/orignal/a401a1eatd11dc7aeb124)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s10.sinaimg.cn/mw690/a401a1eatd11dc7c1c6b9&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s10.sinaimg.cn/orignal/a401a1eatd11dc7c1c6b9)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s6.sinaimg.cn/mw690/a401a1eat7b4fc72e9f15&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s6.sinaimg.cn/orignal/a401a1eat7b4fc72e9f15)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eatd11dc7e40802&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eatd11dc7e40802)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s4.sinaimg.cn/mw690/a401a1eatd11dc7db3ec3&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s4.sinaimg.cn/orignal/a401a1eatd11dc7db3ec3)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eat02b29cf23fc2&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eat02b29cf23fc2)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s4.sinaimg.cn/mw690/a401a1eatd11dc7f3aed3&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s4.sinaimg.cn/orignal/a401a1eatd11dc7f3aed3)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s13.sinaimg.cn/mw690/a401a1eatd11dc806097c&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s13.sinaimg.cn/orignal/a401a1eatd11dc806097c)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s10.sinaimg.cn/mw690/a401a1eatd11dc80da7e9&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s10.sinaimg.cn/orignal/a401a1eatd11dc80da7e9)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s4.sinaimg.cn/mw690/a401a1eatd11dc81fef33&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s4.sinaimg.cn/orignal/a401a1eatd11dc81fef33)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s2.sinaimg.cn/mw690/a401a1eatd11dc8216b31&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s2.sinaimg.cn/orignal/a401a1eatd11dc8216b31)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s6.sinaimg.cn/mw690/a401a1eatd11dc82bb2d5&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s6.sinaimg.cn/orignal/a401a1eatd11dc82bb2d5)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eatd11dc846c232&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eatd11dc846c232)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s15.sinaimg.cn/mw690/a401a1eatd11dc855665e&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s15.sinaimg.cn/orignal/a401a1eatd11dc855665e)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s11.sinaimg.cn/mw690/a401a1eatd11dc864ccca&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s11.sinaimg.cn/orignal/a401a1eatd11dc864ccca)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s9.sinaimg.cn/mw690/a401a1eatd11dc878ed38&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s9.sinaimg.cn/orignal/a401a1eatd11dc878ed38)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s12.sinaimg.cn/mw690/a401a1eatd11dc875ad5b&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s12.sinaimg.cn/orignal/a401a1eatd11dc875ad5b)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eat02b29d481332&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eat02b29d481332)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s15.sinaimg.cn/mw690/a401a1eatd11dca05f28e&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s15.sinaimg.cn/orignal/a401a1eatd11dca05f28e)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eatd11dca1bfee2&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eatd11dca1bfee2)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s2.sinaimg.cn/mw690/a401a1eatd11dca4c79d1&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s2.sinaimg.cn/orignal/a401a1eatd11dca4c79d1)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s10.sinaimg.cn/mw690/a401a1eatd11dca4daf49&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s10.sinaimg.cn/orignal/a401a1eatd11dca4daf49)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s15.sinaimg.cn/mw690/a401a1eatd11dca9b6d5e&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s15.sinaimg.cn/orignal/a401a1eatd11dca9b6d5e)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s12.sinaimg.cn/mw690/a401a1eatd11dcac05ddb&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s12.sinaimg.cn/orignal/a401a1eatd11dcac05ddb)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s15.sinaimg.cn/mw690/a401a1eatd11dcabbbf6e&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s15.sinaimg.cn/orignal/a401a1eatd11dcabbbf6e)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s9.sinaimg.cn/mw690/a401a1eatd11dcadb8328&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s9.sinaimg.cn/orignal/a401a1eatd11dcadb8328)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s8.sinaimg.cn/mw690/a401a1eatd11dcaed1d97&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s8.sinaimg.cn/orignal/a401a1eatd11dcaed1d97)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s7.sinaimg.cn/mw690/a401a1eatd11dcaf44c86&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s7.sinaimg.cn/orignal/a401a1eatd11dcaf44c86)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s4.sinaimg.cn/mw690/a401a1eatd11dcb04c723&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s4.sinaimg.cn/orignal/a401a1eatd11dcb04c723)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s1.sinaimg.cn/mw690/a401a1eatd11dcb0d2ce0&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s1.sinaimg.cn/orignal/a401a1eatd11dcb0d2ce0)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s14.sinaimg.cn/mw690/a401a1eatd11dcb13851d&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s14.sinaimg.cn/orignal/a401a1eatd11dcb13851d)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s6.sinaimg.cn/mw690/a401a1eatd11dcb22a955&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s6.sinaimg.cn/orignal/a401a1eatd11dcb22a955)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s15.sinaimg.cn/mw690/a401a1eatd11dcb36db8e&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s15.sinaimg.cn/orignal/a401a1eatd11dcb36db8e)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s3.sinaimg.cn/mw690/a401a1eat7b4fc786ba62&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s3.sinaimg.cn/orignal/a401a1eat7b4fc786ba62)

	[![投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）](http://s2.sinaimg.cn/mw690/a401a1eatd11dcb602981&amp;690 "投影矩阵的推导 &lt;wbr&gt;&lt;wbr&gt;（OpenGL &lt;wbr&gt;&lt;wbr&gt;D3D）")](http://photo.blog.sina.com.cn/showpic.html#blogid=a401a1ea0101f1k3&amp;url=http://s2.sinaimg.cn/orignal/a401a1eatd11dcb602981)