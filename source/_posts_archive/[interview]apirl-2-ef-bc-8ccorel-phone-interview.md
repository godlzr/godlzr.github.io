---
title: Apirl 2，Corel Phone Interview
id: 64
categories:
  - Interview Logs
date: 2015-04-09 21:43:13
tags:
---

3 parts：

*   Behavioral Questions.

1.  Introduce yourself
2.  Describe the tongue project
3.  Describe the haptic game project
4.  Describe the hair project

*   Technique Questions

1.  Any mistakes? How to improve the code

###### class ColorManager

###### {

######  public:

######      double CalculateBrightnessFromRGB( BYTE r, BYTE g, BYTE b );

######      //...

###### };

###### double MaxBrightnessRGB( std::vector&lt;BYTE&gt; srcImage )

###### {

######  ColorManager* pColorManager = new ColorManager();

######  double maxBrightness = 0;

######  for( int i=0; i&lt;srcImage.size(); i++ )

###### {

###### double brightness = pColorManager-&gt;

###### CalculateBrightnessFromRGB( srcImage.at(i*3), srcImage.at(i *3+1), srcImage.at( i *3+2) );

######       if( brightness &gt;= maxBrightness )

######    maxBrightness = brightness;

###### }

######  }

######  delete pColorManager;

######  return maxBrightness;

###### }

面试时没有看出来如何优化，事后想想可能是让用stl iterator？

2.

In C++, design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. NOTE: This is not necessarily a binary search tree.

Define the data structure for a TreeNode

**<strong> **</strong>

template&lt;typename T&gt;

class Node

{

Node *parent = new Node();

Node *lchild = new Node();

Node *rchild = new Node();

T value;

Node(){ };

}

Node* FindFirstCommonAncestor( Node* pNode1, Node* pNode2)

{

if(pNode1 ==NULL||pNode2 ==NULL)

return NULL;

map&lt;Node*, bool&gt; ancestor;

while(pNode1)

{

ancestor(pNode1) = true;

pNode1 = pNode1-&gt;parent;

}

while(pNode2 &amp;&amp; ! ancestor(pNode2))

{

pNode2 = pNode2-&gt;parent;

}

return pNode2;

}

这个程序的时间复杂度?：O(n);

map的时间复杂度?O(1);

**这里犯了大错误， STL map是红黑树实现的与hashmap的原理不同，其时间复杂度是O(logn), 所以整体的时间复杂度是O(nlogn).**

*   Asking Questions