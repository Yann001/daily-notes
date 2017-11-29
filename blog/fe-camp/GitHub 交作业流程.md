# Github 交作业流程

> 考虑到很多同学之前没有接触过git，以及简化流程，所以采用了github桌面版，建议大家自学git命令行版。如果你会用git，直接使用命令行版提交作业也是没问题的。
>
> PS：命令行版简单且功能强大，强烈推荐使用。
>
> 以下教程请先安装群里的 `Github_3.3.2.0.7z` 软件。

## 第一步 Github账号注册/登录

浏览器打开Github官网地址（https://github.com)，分别点击 `Sign up` 和 `Sign in` 进行登录和注册。

## 第二步 找到特训营项目并Fork

你可以通过两种方式找到 `fe-camp-2017` 项目：

1. Github搜索栏输入 `leaf-club` 进行搜索，找到Users选项卡中的 leaf-club 组织，然后点击其中的 `Repositories` 选项卡，再点击 `fe-camp-2017` 即可找到项目。
2. 浏览器地址栏直接输入项目地址（https://github.com/leaf-club/fe-camp-2017）也可找到项目。

然后点击右上角 `Fork` 按钮即可，这是会跳转到自己的github账户下，这个步骤只需操作一次即可。

![git-fe-camp-2017](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-fe-camp-2017.jpg)



## 第三步 克隆代码到本地

如果下面方式1步骤操作不成功，则选用方式2。（一般是点击 `Open in Desktop` 时跳转到了下载页面而没有打开github桌面版软件。）

方式1：点击Code选项卡页面的 `Clone or download` 按钮，在弹出的下拉框中选择 `Open in Desktop` 按钮，在弹出的对话框中选择 `允许打开` 即可打开安装的 Github 桌面版进行克隆。

![git-open-in-desktop](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-open-in-desktop.jpg)

方式2：直接打开github桌面版软件，如果没有登录，先登录自己的github账号，然后点击左上角 `+` 按钮 ，选择 `Clone` 选项，如果第二步已经正确fork且软件已经登录，则会出现自己的github用户名和fe-camp-2017仓库，这是单击选择 `fe-camp-2017` 仓库，再点击 `Clone fe-camp-2017` ，等待代码克隆完成即可。

![git-clone](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-clone.jpg)

## 第四步 本地编写代码

克隆完成之后在左侧右键单击 `Open in Explorer` 即可在电脑资源管理器中打开克隆下来的代码。

注意每次作业的命名格式：`第*组/你的姓名/第*次作业/具体代码文件` ，例如：`第1组/杨孝勇/第一次作业/resume.html`

> 注意：文件名尽量不要使用中文，不要有空格。

![git-open-in-explorer](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-open-in-explorer.jpg)

## 第五步 同步代码到自己的github仓库

编写完成代码后打开github桌面版，即可看 `changes` 选项卡下看到更改的内容，填入 `commit` 的信息，然后依次点击 `Commit to master`  和 `Sync` 即可。如下图所示。

![git-commit-push](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-commit-push.jpg)

## 第六步 提交作业

> 其实是通过向开源项目发送pr的方式，懂github的同学应该都明白 :blush:

到github官网登录自己的账号，找到 `fe-camp-2017` 仓库，点击 `New pull request` 按钮，跳转到 `Comparing Changes` 页面，等待出现 绿色的 `√ Able to merge` 后点击下方的 `Create pull request` 按钮，在对话框的Title栏输入 第*次作业，然后再评论框中输入你想说的话或提问或对你的代码进行说明或者什么都不填都可以，（PS:如果你留下了问题，我们一定会查看并回复的），然后点击 `Create pull request`  即完成本次作业的提交。详情如下图所示。

> 注意：第五步你可以操作多次，也就是将自己本地的代码多次提交到自己的仓库，直到满意了自己的此次作业后再进行第六步，也就是一次作业只发一个pr。如果你的pr有问题，比如文件命名格式不对，我们会回复说明原因并拒绝你的这个pr，要求你重新提交pr（你的作业）。

![git-new-pr](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-new-pr.jpg)



![git-create-pr](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-create-pr.jpg)





![git-send-pr](http://opzww7anw.bkt.clouddn.com/mk/image/blog/git-send-pr.jpg)



本教程完 :blush:





