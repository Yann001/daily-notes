> [深度学习word2vec笔记之基础篇](http://blog.csdn.net/mytestmy/article/details/26961315###;)

## 背景知识

### 词向量

- one-hot representation
- distributed representation

主成分分析（PCA）降维



## 语言模型

**基本概念**

$${{p}}\left( s \right) = {\rm{p}}\left( {{w_1},{w_2}, \cdots {w_T}} \right)={\rm{p}}\left( {{w_1}} \right){\rm{p(}}{w_2}{\rm{|}}{w_1}){\rm{p}}({w_3}|{w_1},{w_2}) \cdots {\rm{p}}({w_t}|{w_1},{w_2}, \cdots {w_{T - 1}})$$

$${\rm{p}}\left( {\rm{s}} \right) = {\rm{p}}\left( {{w_1},{w_2}, \cdots {w_T}} \right) =  \prod \limits_{i = 1}^T p({w_i}|Contex{t_i})$$

**N-gram模型**

$${\rm{p}}\left( {{w_i}{\rm{|}}Contex{t_i}} \right) = {\rm{p}}({w_i}|{w_{i - n + 1}},{w_{i - n + 2}}, \cdots ,{w_{i - 1}})$$

**N-Pos模型**

$${\rm{p}}\left( {{w_i}{\rm{|}}Contex{t_i}} \right) = {\rm{p}}\left( {{w_i}|{\rm{c}}\left( {{w_{i - n + 1}}} \right),{\rm{c}}\left( {{w_{i - n + 2}}} \right), \cdots ,{\rm{c}}\left( {{w_{i - 1}}} \right)} \right)$$

其中c是类别映射函数，功能是把V个词映射到K个类别（1=<K<=V）

**模型的问题与目标**

极大似然函数：

$${\rm{L}} =  \prod \limits_{i = 1}^T p\left( {{w_i}{\rm{|}}Contex{t_i}} \right)$$

对数似然：

$${\rm{l}} = {\rm{logL}} = \frac{1}{V} \sum \limits_{i = 1}^T logp\left( {{w_i}{\rm{|}}Contex{t_i}} \right)$$

另一种表达

$${\rm{L}} =  \prod \limits_j^{\rm{S}} \left( { \prod \limits_{{i_j} = 1}^{{T_j}} p\left( {{w_{{i_j}}}{\rm{|}}Contex{t_{{i_j}}}} \right)} \right)$$

$${\rm{l}} = {\rm{logL}} = \frac{1}{V} \sum \limits_{j = 1}^{\rm{S}} \left( { \sum \limits_{{i_j} = 1}^{{T_j}} logp\left( {{w_{{i_j}}}{\rm{|}}Contex{t_{{i_j}}}} \right)} \right)$$

利用函数拟合计算：

$$p\left( {{w_i}{\rm{|}}Contex{t_i}} \right) = {\rm{f}}\left( {{w_i},Contex{t_i};{\rm{\theta }}} \right)$$



>[word2vec 中的数学原理详解](http://suanfazu.com/t/word2vec-zhong-de-shu-xue-yuan-li-xiang-jie-duo-tu-wifixia-yue-du/178)

