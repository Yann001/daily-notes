# CSS 中的百分数值

[TOC]

## CSS中的百分数值到底相对于什么的百分数

| 属性                                | 相对于                                      | 说明                       |
| --------------------------------- | ---------------------------------------- | ------------------------ |
| width（position不是absolute或fixed时）  | 直接父元素宽度                                  | 不管父元素宽度是百分数还是具体px，未脱离文档流 |
| height（position不是absolute或fixed时） | 直接父元素高度                                  | 不管父元素高度是百分数还是具体px，未脱离文档流 |
| width（position是absolute或fixed时）   | position为非static的父元素或[包含块](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details)的宽度 | 不管包含块宽度是百分数还是具体px，脱离文档流  |
| height（position是absolute或fixed时）  | position为非static的父元素或[包含块](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details)的高度 | 不管包含块高度是百分数还是具体px，脱离文档流  |
| top、bottom                        | 包含块高度                                    | position属性为static时无效     |
| left、right                        | 包含块宽度                                    | position属性为static时无效     |
| margin、padding                    | 包含块宽度                                    | position属性为static时无效     |

