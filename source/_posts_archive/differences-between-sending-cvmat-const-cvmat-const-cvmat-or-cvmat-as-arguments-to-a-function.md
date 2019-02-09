---
title: >-
  Differences between sending cv::Mat, const cv::Mat, const cv::Mat& or cv::Mat&
  as arguments to a function
id: 151
categories:
  - OpenCV
date: 2015-06-26 15:45:56
tags:
---

<div class="post-text">

1.  `cv::Mat Input`: pass a copy of `Input`'s header, its header will not be changed after this function, but can be changed within the function. For example:

    <span class="kwd">void</span><span class="pln"> sillyFunc</span><span class="pun">(</span><span class="pln">cv</span><span class="pun">::</span><span class="typ">Mat</span> <span class="typ">Input</span><span class="pun">,</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Output</span><span class="pun">){</span>
        <span class="typ">Input</span> <span class="pun">=</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">::</span><span class="pln">ones</span><span class="pun">(</span><span class="lit">4</span><span class="pun">,</span> <span class="lit">4</span><span class="pun">,</span><span class="pln"> CV_32F</span><span class="pun">);</span> <span class="com">// OK, but only changed within the function</span>
        <span class="com">//...</span>
    <span class="pun">}</span>`</pre>
2.  `const cv::Mat Input`: pass a copy of `Input`'s header, its header will not be changed after this function and within the function. For example:
    <pre class="lang-cpp prettyprint prettyprinted">`<span class="kwd">void</span><span class="pln"> sillyFunc</span><span class="pun">(</span><span class="kwd">const</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span> <span class="typ">Input</span><span class="pun">,</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Output</span><span class="pun">){</span>
        <span class="typ">Input</span> <span class="pun">=</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">::</span><span class="pln">ones</span><span class="pun">(</span><span class="lit">4</span><span class="pun">,</span> <span class="lit">4</span><span class="pun">,</span><span class="pln"> CV_32F</span><span class="pun">);</span> <span class="com">// Error even change within the function</span>
        <span class="com">//...</span>
    <span class="pun">}</span>`</pre>
3.  `const cv::Mat&amp; Input`: pass a reference of `Input`'s header, guarantee that `Input`'s header will not be changed after the function and within the function. For example:
    <pre class="lang-cpp prettyprint prettyprinted">`<span class="kwd">void</span><span class="pln"> sillyFunc</span><span class="pun">(</span><span class="kwd">const</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Input</span><span class="pun">,</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Output</span><span class="pun">){</span>
        <span class="typ">Input</span> <span class="pun">=</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">::</span><span class="pln">ones</span><span class="pun">(</span><span class="lit">4</span><span class="pun">,</span> <span class="lit">4</span><span class="pun">,</span><span class="pln"> CV_32F</span><span class="pun">);</span> <span class="com">// Error when changing its header</span>
        <span class="pun">...</span>
    <span class="pun">}</span>`</pre>
4.  `cv::Mat&amp; Input`: pass a reference of `Input`'s header, `Input`'s header can be changed after the function and within the function. For example:
    <pre class="lang-cpp prettyprint prettyprinted">`<span class="kwd">void</span><span class="pln"> sillyFunc</span><span class="pun">(</span><span class="pln">cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Input</span><span class="pun">,</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">&amp;</span> <span class="typ">Output</span><span class="pun">){</span>
        <span class="typ">Input</span> <span class="pun">=</span><span class="pln"> cv</span><span class="pun">::</span><span class="typ">Mat</span><span class="pun">::</span><span class="pln">ones</span><span class="pun">(</span><span class="lit">4</span><span class="pun">,</span> <span class="lit">4</span><span class="pun">,</span><span class="pln"> CV_32F</span><span class="pun">);</span> <span class="com">// totally OK and does changed</span>
        <span class="pun">...</span>
    <span class="pun">}</span>`</pre>
    **P.S.2**: I must point out that, for all the four situations (`cv::Mat`, `const cv::Mat`, `const cv::Mat&amp;` or `cv::Mat&amp;`), they only constrain the access to its header, not to the data it pointers to. For example, you can change its data in all the four situations and its data will indeed change after and within the function:
    <pre class="lang-cpp prettyprint prettyprinted">`<span class="com">/*** will work for all the four situations ***/</span>
    <span class="com">//void sillyFunc(cv::Mat Input){</span>
    <span class="com">//void sillyFunc(const cv::Mat Input){</span>
    <span class="com">//void sillyFunc(const cv::Mat &amp;Input){</span>
    <span class="kwd">void</span><span class="pln"> sillyFunc</span><span class="pun">(</span><span class="pln">cv</span><span class="pun">::</span><span class="typ">Mat</span> <span class="pun">&amp;</span><span class="typ">Input</span><span class="pun">){</span>
        <span class="typ">Input</span><span class="pun">.</span><span class="pln">data</span><span class="pun">[</span><span class="lit">0</span><span class="pun">]</span> <span class="pun">=</span> <span class="lit">5</span><span class="pun">;</span> <span class="com">// its data will be changed here</span>
    <span class="pun">}</span>

</div>