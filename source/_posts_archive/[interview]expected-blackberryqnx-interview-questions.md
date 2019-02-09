---
title: Expected BlackBerry/QNX Interview Questions
id: 153
categories:
  - Interview Preparation
date: 2015-07-11 15:27:45
tags:
---

1.Behaviour Questions

*   3.What did you find the most challenging while working on your project?

    *   I thought the new stuff is always the most challenging but is the most enjoyable thing during my work. such as qt, as opencv, matlab,webgl, you know before i start my master study, i never tried them, but after i begin my research i found that the new technologies are the most attractive for me. I really enjoy learning new thing and coding with new technologies for me.you know at beginning, there are lots of difficulties, you need to read the documents, you need to understand their mechanism, the api, the different data structure and what the methods exactly do.  And during the learning, sometime you may want to give up even there is some little issues which you cannot resolve, but i just keep moving, testing and searching, and sometime you can ask for help in community, and feel exciting when you getting the solution or even if some little achievement. And you will feel confident after you become familiar with them, and you will have confidence to face the next big challenging. Yes, i think learning new technology the challenging but i really enjoy this kind of challenging.

*   4.About yourself, why I wanted to work there.

    *   So, firstly, I want a developer position, in which i can contribute my c/c++ programming ability and related knowledge about the os, the graphics, memory and network maybe. And i am very interested in technologies, especial the different os, and one of my hobbies is to try and install different os, I really like fashion and new technique stuff. I really cars, And I know QNX is really a succeed real time operating system in the world, and it is widely adopted in different hardware, especially cars, I watched some video about the concept car with qnx technologies, and many amazing features of qnx system. I think it's really cool to develop software for automobiles, and you know I also have interest  in computer vision and graphics, I believe it's really a cool way to implement the graphics-related stuff inside the car. I really have great passion and enthusiasm | in su z i zem| on that.

*   5.tell me about yourself, talk about resume, projects and extra-curriculars
*   7.have you had experience in resolving conflict, what makes you get up everyday for work.

    *   passion, interesting, teamwork, communication, learning new technology.

*   16."What defines a good manager to you?" "What is the biggest flop you made?" "If you and I were to get into a conflict, what would you do?" "Tell me about something you do outside of school and work, that you think would differentiate yourself from others."

    *   I think i am different with other engineering student is that I like art related knowledge, I not only interesting in computer science, but also like reading, novel, art, history, cultural, music. I think I have unique feeling of the beauty, life, society and the world.

*   20.solving conflicts between co-workers, types of managers I preferred.

    *   good manager: well, first I think he should have strong background of technology, so he can define the aim of the team based on engineering knowledge and real situation,he can set challenging but realistic targets.  He should be fair and treat his team members equally and objectively. He can develop good working relationships with his team memebers, and easy to work with.

*   22.If you had unlimited budget and unlimited time what would work on?

    *   because at first I don't have much knowledge about everything, I think I will find the top 10 interesting things for me. and i will try them one by one, and after that I would know the best direction for me. And I would focus on one direction at one time.

*   24.When you get a new new task, how do you begin with and make it done

    *   And I would do some research about the background,collect more helpful information.
    *   the first thing I do is to review the task and divide it into small pieces and I will sort them by their priorities, and I prefer to finish the most important and urgent part first.
    *   Then I would make a schedule to allocate my time properly, and I would follow this schedule strictly, so that I can finish my daily work and make sure the whole plan can be completed.
    *   that's my approach.
2.Technique Questions

*   1.How would you debug software in user space?

    *   [Kernel space and user space](http://stackoverflow.com/questions/5957570/what-is-the-difference-between-the-kernel-space-and-the-user-space)
    *   [5 user space debugging tools](http://linoxide.com/linux-how-to/user-space-debugging-tools-linux/)

*   2.how to I test timing issues, and what are the main issues that a task misses its deadline,
*   6.OOD
*   8.implement insert function for a binary tree.
*   9.threading and some simple logic.
*   10.esoteric C pointer
*   11.mergesort and binary trees
*   12.Given an input string and a dictionary of words, segment the input string into a space-separated sequence of dictionary words if possible. For example, if the input string is "applepie" and the dictionary is a standard set of English words, then we would return the string "apple pie" as output.
*   13.difference between stack and heap, process and thread

    *   code segment, global segment, heap(dynamic memory, malloc, free), stack(functions and local variable)

*   14.Compare and contrast the differences between developing a desktop application vs developing a mobile application.
*   15.Describe what design patterns you have used in solving a tough problem.
*   17.How to detect Memory Leak... What is Volatile key word

    *   [valgrind](http://www.cnblogs.com/sunyubo/archive/2010/05/05/2282170.html)
    *   [volatile](http://www.cnblogs.com/chio/archive/2007/11/24/970632.html) keyword tells the compiler that the variable with volatile may be changed unexpected, and don't not make any optimization on the variable, so the compiler while read the value of this variable from it's original location.

*   18.[what different between overload and override?"](http://stackoverflow.com/questions/429125/override-and-overload-in-c)

    *   overload means in a same class you defined some functions with same name but different signatures.overloading is resolved at compile time.
    *   override means you can redefine a method in the subclass which is already defined in it's superclass, the function name and signature are all same. override is resolved at run time.

*   19.Check if an integer is a power of 2 using the least number of operations.

    *   (x != 0) &amp;&amp; !(x &amp; (x-1))
    *   判断是否二进制只有一个1 for(int count = 0; n!=0; count++){n = n&amp;(n-1)} if count ==1 ,yes.

*   21.Given an unsorted list of numbers 1 to N, one number occurs twice all other numbers appear once. How would find the duplicate number.

    *   sum(all number) - sum(1 to n)

*   23.[different between abstract class and interface, ](http://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class)

    *   An abstract class is a class that is only partially implemented by the programmer. It may contain one or more abstract methods. An abstract method is simply a function definition that serves to tell the programmer that the method must be implemented in a child class.
    *   An interface is similar to an abstract class; indeed interfaces occupy the same namespace as classes and abstract classes. For that reason, you cannot define an interface with the same name as a class. An interface is a fully abstract class; none of its methods are implemented and instead of a class sub-classing from it, it is said to implement that interface。

*   what is the difference between i<span class="moreContent">nheritance and composition.</span>

    *   inheritance mean class b is a kind of class a
    *   composition means b is a part of a.

*   25\. STL, why would you use a vector instead of a list

    *   the efficiency of random access of vector is higher than list, because vector has a continuous memory buffer, but element address of list is not continuous。

*   26\. How to put a number of strings together

    *   add opt

*   27\. Implement a stack using queue, think about run time performance and optimization ,Implement a queue using stack, think about run time performance and optimization

    *   出队列的重新从尾部入队列，知道最后一个出队列
    *   用两个stack实现队列，一个入一个出，出队为空时倒压入队元素进入出队

*   28.How to do a search for a text file? And its efficiency?
*   29.Given this small set of some imaginary assembly instructions, write a function to multiply the argument by 7.
*   30.Define polymorphism.

    *   Polymorphism means for one interface, it can have several different implementations.  for a virtual function of a superclass, you can redefine it in different way in it's subclasses, but these different definitions share the same interface. So the superclass can call the corresponding method for different inputs. It allows us to assign a pointer of subclass object to the pointer of the superclass object. There are dynamic(run) and static(compile) .
**Position Description**

**Position Summary:**

Our Graphics &amp; Multimedia Development Department are looking for a Multimedia Senior Developer. This position reports directly to the Graphics &amp; Multimedia Manager. The purpose of this position is to develop multimedia software technologies, capabilities and solutions that meet the needs of automotive and other markets.

**Responsibilities:**

*   Provide technical leadership for QNX multimedia research and development.
*   Research multimedia technologies and standards and make recommendations for the creation of software solutions that meet the needs of QNX customers, especially in the automotive space. Create and document software specifications and designs that address the needs of QNX customers.
*   Conduct reviews to ensure that software specifications meet market requirements.
*   Conduct reviews with technical peers to ensure that designs meet QNX software design guidelines.
*   Write code based on approved design spec’s. using high level software languages and potentially assembly.
*   Unit test implementations on all relevant target architectures for the project (ex. ppc, sh, x86, mips, arm).
*   Identify, analyze and resolve potentially complex problems and inadequacies in software.
*   Provide project estimates for requirement, design, implementation and test efforts.
*   Maintain an in-depth understanding of current software department approaches and standards through communication with development team members, technical leads, and management.
**Additional Duties and Responsibilities**:

The above describes essential responsibilities and activities that are typical for an incumbent in this job. This in not an exhaustive list of tasks performed. Depending on organizational requirements, other duties may be assigned.

**Education:**

*   Bachelor’s degree in Computer Science or equivalent.
*   5 years or more experience in embedded multimedia software development.
*   Specialized Skills: Enthusiasm, and genuine interest in developing multimedia technologies and applications for embedded systems.
*   In-depth technical understanding of multimedia frameworks, codecs, and related technologies is required.
*   Experience with developing multimedia applications or frameworks is required. Codec development experience is an asset (ex. MP3, AAC, MP3, MPEG4, WMA).
*   Strong background in software development using applicable programming languages (C, C++, Assembly) and operating systems (QNX, pSOS+, VxWorks, Windows CE, RTLinux, Solaris/HPUX/AIX, etc.) is required.
*   Working knowledge of development host operating systems (Windows NT/XP/2k, QNX, Solaris, Linux) is required.
*   Prior experience in developing for embedded systems is required. Understanding of major processor architectures (ARM, x86, SuperHitachi, MIPS, PPC, etc.) is an asset.
*   Excellent communication and interpersonal skills are required.