廖雪峰Git教程学习笔记

> https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/


## git 基本命令：

- git init
- git add file
- git commit -m 'message'
- git status [-s]
- git diff [file]
- git log [--pretty=oneline] (查看提交历史)
- git reset --hard commit_id (`HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭)
- git reflog (查看命令历史，会带有commit的id，可以实现向前回退)
- git checkout -- file (丢弃工作区的修改，回到最近一次`git commit`或`git add`时的状态)
- git reset HEAD file (暂存区的修改回退到工作区，`HEAD`表示最新版本)
- git rm file (删除文件，在版本库里存在的情况下，可用`git checkout -- file`恢复到最新)


## 工作区和暂存区



git 版本库示意图：

![repository](http://opzww7anw.bkt.clouddn.com/mk/image/blog/repository.jpeg)



## 远程仓库



1. 添加远程仓库：`git remote add origin git@github.com:yourName/yourRepository.git` 。添加后远程库的名字就是`origin`，这是Git的默认叫法，也可以改成别的，但是`origin`这个民资一看就是知道是远程库。
2. 本地内容推送到远程：`git push [-u] origin master` 。把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。
3. 从远程库克隆：`git clone git@github.com:youName/yourRepository.git` 。GitHub给出的地址不止一个，还可以用`https://github.com/michaelliao/gitskills.git`这样的地址。实际上，Git支持多种协议，默认的`git://`使用ssh，但也可以使用`https`等其他协议。使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。

## 分支管理

- git checkout -b dev，创建并切换到分支，等价于 git branch dev -> git checkout dev。
- git branch [-a]，查看当前分支
- git merge [--no-ff -m -m 'merge with no-ff'] dev，合并指定分支到当前分支，如有冲突，需要手动解除冲突在进行合并。通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
- git branch -d dev (删除dev分支，删除未合并的分支时使用`git branch -D dev` ，进行强行删除)
- git stash，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作
- git stash list，查看stash
- git stash pop，恢复工作现场，同时删掉stash内容，等效于git stash apply stash@{0} -> git stash drop

## 多人协作

- git remote，查看远程仓库信息，或用git remote -v 显示更详细的信息，如：

  ``` 
  $ git remote -v
  origin git@github.com:yourName/yourRepository.git (fetch)
  origin git@github.com:yourName/yourRepository.git (push)
  ```

  上面显示了可以抓取和推送的`origin`的地址。如果没有推送权限，就看不到push的地址。

- git branch --set-upstream dev origin/dev，

- git push origin dev，推送分支。

- git pull，拉取分支。

## 标签管理

