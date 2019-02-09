---
title: Git Command
id: 503
categories:
  - Tech
date: 2015-10-01 17:03:01
tags:
---

# 
	`<span style="font-family:arial,helvetica,sans-serif;">1.Git configuration</span>`

*   `$ git config --global user.name &quot;Your Name&quot;`
*   `$ git config --global user.email &quot;email@example.com&quot;`

# 
	<span style="font-family:arial,helvetica,sans-serif;">`2.Great Respository`</span>

*   `$ git init`
*   `$ git add &lt;file&gt;`
*   `$ git commit -m &quot;XXXXXX&quot;`

# 
	3\. Respository Reset

*   `$ git status`
*   `$ git diff`
*   `$ git diff reset --hard commit_id`&nbsp;
*   `$ git log --pretty=oneline`
*   `$ git reflog`
*   `$ git checkout --file`
*   `$ git rm`

# 
	4\. Add remote Responsitory

*   `$ git remote add origin gitaddress`
*   `$ git clone gitaddress`

# 
	`5.Branch Manage`

*   查看分支：`git branch`
*   创建分支：`git branch &lt;name&gt;`
*   切换分支：`git checkout &lt;name&gt;`
*   创建+切换分支：`git checkout -b &lt;name&gt;`
*   合并某分支到当前分支：`git merge &lt;name&gt;`
*   删除分支：`git branch -d &lt;name&gt;`
*   <font face="monospace">查看分支图： git log --graph</font>
*   当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场

# 
	6\. Coorpration

*   查看远程库信息，使用`git remote -v`；
*   本地新建的分支如果不推送到远程，对其他人就是不可见的；
*   从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
*   在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
*   建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
*   从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

	&nbsp;