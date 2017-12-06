# Python 自然语言处理



## 第1章 语言处理与Python

### 1.1 语言计算：文本和词汇

#### NTLK 入门

**搜索文本**

- text1.concordance("keyword")
- text1.similar("keyword")
- text1.common_contexts(["word1", "word2"])，共用两个或两个以上词汇的上下文
- text1.generate()，产生随机文本，nltk3 废弃

**计数词汇**

- len()
- set()
- sorted()
- `from __future__ import division` (use real division in python2)
- def



### 1.2 进观Python：将文本当做词链表



### 1.3 计算语言：简单的统计

**频率分布**

``` python
from nltk.book import *
FreqDist(text) # frequency distributions
```

**细粒度的选择词**

``` python
# 找出text5中长度超过7个字符并且次数超过7次的词
fdist5 = FreqDist(text5)
sorted(w for w in set(text5) if len(w) > 7 and fdist5[w] > 7)
```

**词语搭配与双连词**

``` python
bigrams(['more', 'is', 'said', 'than', 'done'])
# output: [('more', 'is'), ('is', 'said'), ('said', 'than'), ('than', 'done')]
text4.collocations()
```



### 1.4 回到Python：决策与控制

```python
# 链表推导
len(set([w.lower() for w in text1 if w.isalpha()]))
```

 

### 1.5 自动理解自然语言

- 词义消歧
- 指代消解
- 自动生成语言
- 机器翻译 （文本对齐）
- 人机对话系统
- 文本的含义



### 1.6 总结



### 1.7 深入阅读

ACL（The Association for Computational Linguistics，计算机语言协会）

Language Log（博客）



## 第2章 获得文本预料和词汇资源

### 2.1 获取文本语料库

**古腾堡语料库**

``` python
import nltk
nltk.corpus.gutenberg.fileids()
nltk.corpus.gutenberg.words('austen-emma.txt')

emma = nltk.Text(nltk.corpus.gutenberg.words('austen-emma.txt'))
emma.concordance('surprize')

# from nltk.corpus import gutenberg
# gutenberg.fileids()
```

nltk 方法：

- fileids()


- raw()
- words()
- sents()

**网络和聊天文本**

```python
from nltk.corpus import webtext
webtext.fileids()

from nltk.corpus import nps_chat
nps_chat.fileids()
```

**布朗语料库**

```python
from nltk.corpus import brown
brown.categories()
cfd = nltk.ConditionFreqDist()
```

**路透社语料库**

```python
from nltk.corpus import reuters
```

**就职演说语料库**

```python
from nltk.corpus import inaugural
```

**标注文本语料库**

**其他语言语料库**

**文本语料库结构**

**载入自己的语料库**

```python
from nltk.corpus import PlaintextCorpusReader
from nltk.corpus import BracketParseCorpusReader
```



### 2.2 条件频率分布

**条件和事件**

**按文体计数词汇**

```py
from nltk.corpus import brown
cfd = nltk.ConditionFreqDist(
	(genre, word)
	for genre in brown.categories()
	for word in brown.words(categories=genre))
```

**绘制频率分布图和分布表**

- plot()
- tabulate()

**使用双连词生成随机文本**



### 2.3 更多关于Python：代码重用

**使用文本编辑器创建程序**

- IDLE，Python自带GUI

**函数**

**模块**



### 2.4 词典资源

```python
vocabulary = sorted(set(my_text))
word_freq = FreqDist(my_text)
```

**词项** 包括 **词目**（**词条**）

**词汇列表语料库**

```python
# 词汇列表
from nltk.corpus import words
# 停用词
from nltk.corpus import stopwords
# 名字语料库
from nltk.corpus import names
```

**发音的词典**

```python
from nltk.corpus import cmudict
```

**比较词表**

```python
from nltk.corpus import swadesh
```

**词汇工具：Toolbox和Shoebox**

``` python
from nltk.corpus import toolbox
```



### 2.5 WordNet

WordNet是面向语义的英语词典

**意义与同义词**

```python
from nltk.corpus import wordnet as wn

# 同意词集
wn.synsets('motorcar')
```

**WordNet 层次结构**

词汇关系：

- 下位词（更加具体的概念）
- 上位词

**更多词汇关系**

- 反义词

**语义相似度**



### 2.6 小结

- 文本语料库是一个大型结构化文本的集合。
- 有些文本语料库是分类的，例如可以通过文体或主题进行分类；有时语料库的分类弧相互重叠。
- 条件频率分布式频率分布的集合，每个分布都有不同的条件。可用于计数内容或者文体中指定词的频率。
- WordNet 是一个面向语义的英语词典，由同义词的集合——或称为同义词集（synsets）组成，并组成一个网络。



### 2.7 深入阅读



公开发行语料库的重要来源是 语言数据联盟（LDC）和 欧洲语言资源局（ELRA）。

Ethnologue 有着世界上最完整的语言清单，地址：http://www.ethnologue.com/



## 第3章 处理原始文本

### 3.1 从网络和硬盘访问文本

**电子书**

- 古腾堡项目，http://www.gutenberg.org ，

```python
import nltk
from urllib import urlopen
url = 'http://www.gutenberg.org/files/2554/2554-0.txt'
raw = urlopen(url).read()
raw[:80]

# 分词， 产生词汇和标点符号的链表
tokens = nltk.word_tokenize(raw)
tokens[:10]
```

**处理HTML**

```python
html = urlopen('xxx').read()
raw = nltk.clean_html(html) # error
tokens = nltk.word_tokenize(raw) # error
```

更复杂的HTML处理：

Beautiful Soup软件包，https://www.crummy.com/software/BeautifulSoup/

**处理搜索引擎的结果**

**处理RSS订阅**

第三方库：feedparser

**读取本地文件**

- open()
- read()

```python
file = open('document.txt', 'rU')
file.read()
for line in file:
    print(line.strip())
```

**从PDF，MS Word及其他二进制格式中提取文本**

ASCLL文本和HTML文本是可读格式。文字常常以二进制格式出现，如PDF何MS Word，只能用专门的软件打开。利用第三方库如pypdf和pywin32可访问这些格式。

- pypdf
- pywin32

**捕获用户输入**

`raw_input()`

**NLP的流程**

```python
# html -> ASCll
html = orlopen(url).read()
raw = nltk.clean_html(html)
raw = raw[100: 10000]
# ASCll -> Text
tokens = nltk.wordpunct_tokenize(raw)
tokens = tokens[20: 1000]
text = nltk.Text(tokens)
# Text -> Vocab
words = [w.lower() for w in text]
vocab = sorted(set(words))
```



### 3.2 字符串：最底层的文本处理

**基本操作**

- +
- *

**输出字符串**

- print

**访问单个字符**

- str[0]
- str[-1]

**访问子字符串**

- str[5:10] （包含5不包含10）



### 3.3 使用Unicode 进行文字处理



### 3.4 使用正则表达式检测词组搭配

```python
import re
re.search(regexp, word)
```



### 3.5 正则表达式的有益应用

**提取字符快**

`re.findall(regexp, word)`

**查找词干**

```python
def stem(word):
    regexp = r'^(.*?)(ing|ly|ed|ious|ies|ive|es|s|ment)?$'
    stem, suffix = re.findall(regexp, word)[0]
    return stem
```



### 3.6 规范化文本

**词干提取器**

```python
import nltk
porter = nltk.PorterStemmer() # 效果好一些
lancaster = nltk.LancasterStemmer()
[porter.stem(w) for w in tokens]
[lancaster.stem(w) for w in tokens]
```

**词形归并**

WordNet词形归并器

```python
import nltk
wnl = nltk.WordNetLemmatizer()
[wnl.lemmatize(w) for w in tokens]
```



### 3.7 用正则表达式为文本分词

**分词的简单方法**

```python
import re
re.split(regexp, raw)
re,findall(regexp, raw)
# regexp = r'[ \t\n]+' or regexp = r'\s+'
```

**NLTK 正则表达式分词器**

```python
import nltk
nltk.regexp_tokenize(text, pattern)
```

**分词的进一步问题**

NLTK语料库集合中的宾州树库的数据样本

```python
# 华尔街日报原始文本
nltk.corpus.treebank_raw.raw()
# 华尔街日报分好词的版本
nltk.corpus.treebank.words()
```



### 3.8 分割

**断句**

**分词**

模拟退火算法



### 3.9 格式化：从链表到字符串

**从链表到字符串**

- join()

**字符串与格式**

- %s
- %d

**排列**

- %6s
- %-6d

**将结果写入文件**

```python
output_file = open('output.txt', 'w')
output_file.write(text)
output_file.close()
```

**文本换行**

```python
from textwrap import fill
fill(output)
```



## 第4章 编写结构化程序

### 4.1 回到基础

**赋值**

**等式**

**条件语句**



### 4.2 序列

- 字符串 （join(), str()）
- 链表（list()）
- 元组（tuple()）

方法：

- zip()
- enumerate()

SAMPA ，计算机可读音标

产生器表达式



### 4.3 风格的问题



### 4.4 函数：结构化编程的基础

docstring



### 4.5 更多关于函数

- 作为参数的函数
- 累计函数
- 高阶函数
- 参数的命名



### 4.6 程序开发



### 4.7 算法设计

- 递归
- 空间与时间的权衡
- 动态规划

Python装饰器：memoize



### 4.8 Python 库的样例

**Matplotlib 绘图工具**

**NetworkX**

**CSV**

**NumPy**

包括线性代数函数。矩阵的奇异值分解，是在**潜在语义分析**中使用的操作，它能帮助识别一个文档集合中的隐含概念。



### 4.9 小结



### 4.10 深入阅读



## 第5章 分类和标注词汇

词性，parts-of-speech，POS

词性标注，part-of-speech tagging，POS tagging



### 5.1 使用词性标注器



