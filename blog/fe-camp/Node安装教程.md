# Node安装教程

> 注意：以下步骤只针对Windows系统

## 第一步 文件下载

下载群里的`node-v6.11.4-win-x64.zip` 文件。

## 第二步 文件解压

在资源管理器中找到第一步下载文件，右键单击，进行解压，双击打开解压后的文件夹，这时候使用 `Ctrl + C` 复制资源管理器地址栏的地址。

## 第三步 环境变量配置

1. 电脑左下角搜索栏输入 **系统** 二字进行搜索，Win7系统单击搜索结果中 **控制面板** 下的 **系统** 进入系统页面，Win10系统单击搜索结果中 **设置** 下的 **系统** 进入系统页面，分别如图1、2所示。

   ​                                  ![win7-search-system](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win7-search-sys.png) 

   ​                                                            图 1 Win7搜索 **系统** 结果

   ​                                   ![win7-search-system](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win10-search-sys.png)    

   ​                                                          图 2 Win10搜索 **系统** 结果

2. 点击左侧 **高级系统设置** 弹出系统属性对话框。

   ​                                  ![win7-system](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win7-sys.png)

3. 选择 **高级** 选项卡，点击右下角位置 **环境变量** 按钮，弹出环境变量设置对话框。。

   ​                          ![win7-system-property](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win7-sys-prop.jpg)

4. 在系统变量栏找到 `Path` ，单击后点击下方的 **编辑** 按钮，弹出编辑系统变量对话框。

   ​                          ![win7-env-var](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win7-env-var.jpg)

5. Win7系统在变量值得输入框中末尾添加一个英文分号 `;` ，再将第二步复制的内容 `Ctrl + V` 粘贴进去即可，**注意千万不能把原来的那些字符删掉，也不要修改**  如图3所示，Win10系统在环境变量编辑对话框中点击右侧 **新建** 按钮，再将第二步复制的内容 `Ctrl + V` 粘贴到图5 中的 ②处框中即可，如图4所示。

   ​                                              ![win7-env-var-edit](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win7-env-var-edit.jpg)

   ​                                                                图 3 Win7 编辑系统变量

   ​                         ![win10-env-var-edit](http://opzww7anw.bkt.clouddn.com/mk/image/blog/win10-env-var-edit.png)

   ​                                                               图 4 Win10 编辑系统变量     

6. 依次点击每个弹出对话框的 **确定** 按钮关闭所有对话框即可。

## 第四步 验证是否安装成功

按 `Win + R` 键，在弹出的框中输入 `cmd` ，然后点击确定或按 `enter`键打开命令行，在命令行中输入 `node -v` ，如图所示，如果输出 `v6.11.4` ，则说明node安装成功，如图5所示。

​              ![node-v](http://opzww7anw.bkt.clouddn.com/mk/image/blog/node-v.png)



本教程完 :blush: 。
