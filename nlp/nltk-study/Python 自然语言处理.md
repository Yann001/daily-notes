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



