
var DirectionType = 0;//默认为0 0，表示上下滑；1，表示左右滑
var CurrentChpater = undefined;
var IsScrollByHands = false;//用于判断是否认为滚动

var RD = {};
currentRange = {
    'startRange': null,
    'endRange': null,
    'left': 0,
    'top': 0,
    'right': 0,
    'bottom': 0
};
var screen = {};
var HighLightClass = 'HighLightBg0';
var BackgroundColor = '#f2f2f2';
var iconNote1 = null;
var iconNote2 = null;
var iconNote3 = null;
var iconNote4 = null;

RD.initChap = function (screenWidth, screenHeight, themeMode) {
    //初始化操作
    screen = {
    width:  parseInt(screenWidth),
    height: parseInt(screenHeight) //window.devicePixelRatio几倍图
    };
//    CallBack('log:测试长度单位'+' ios宽='+screenWidth+' js window宽度='+document.body.offsetWidth+' devicePixelRatio='+window.devicePixelRatio);
    //绑定全局事件
//    $(document.body).on("touchstart", ".BookNoteLine1,.BookNoteLine2,.BookNoteLine3,.BookNoteLine4,.BookNoteLine5", function () {
//                        CallBack('log:开始触摸-> '+$(this).attr('class'));
//                        RD.bookNoteClick(this);
//                        });
//    $(document.body).on('click', '.BookNoteLine1,.BookNoteLine2,.BookNoteLine3,.BookNoteLine4,.BookNoteLine5', function () {
//                        CallBack('log:书签被点击');
////                        window.do_question.webTouchEnd($(this).attr('class'));
//                        RD.bookNoteClick(this);
//                        });
    
    switch (parseInt(themeMode)) {
        case -1:
            HighLightClass = 'HighLightBg4';
            BackgroundColor = '#1d1d1f';
            break;
        case 0:
            HighLightClass = 'HighLightBg0';
            $(document.body).attr('class', 'day-mode15');
            BackgroundColor = '#f2f2f2';
            break;
        case 1:
            HighLightClass = 'HighLightBg1';
            $(document.body).attr('class', 'day-mode17');
            BackgroundColor = '#faf5ed';
            break;
        case 2:
            HighLightClass = 'HighLightBg2';
            $(document.body).attr('class', 'day-mode18');
            BackgroundColor = '#ceebce';
            break;
        case 3:
            HighLightClass = 'HighLightBg3';
            $(document.body).attr('class', 'day-mode19');
            BackgroundColor = '#d4daee';
            break;
        default:
            HighLightClass = 'HighLightBg0';
            $(document.body).attr('class', 'day-mode15');
            BackgroundColor = '#f2f2f2';
            break;
    }
    
    ConfigureHtmlStyle();
    AddHeaderMeta();
}

RD.AddEndLineImagePath = function (path,type){
    if (parseInt(type)==1) {
        iconNote1 = path;
    }
    if (parseInt(type)==2) {
        iconNote2 = path;
    }
    if (parseInt(type)==3) {
        iconNote3 = path;
    }
    if (parseInt(type)==4) {
        iconNote4 = path;
    }
};
RD.cancerSearch = function () {
    //取消所有搜索结果高亮效果
    try {
        $(document.body).find('.HighLightBg0,.HighLightBg1,.HighLightBg2,.HighLightBg3,.HighLightBg4').removeClass('HighLightBg0 HighLightBg1 HighLightBg2 HighLightBg3 HighLightBg4');
    } catch (e) {
        CallBack('log:error cancerSearch' + e);
    }
}

RD.bookNoteClick = function (obj) {
    //笔记点击事件
    try {
        var id = $(obj).attr('id');
        RD.cancerSearch();
        $(document.body).find("[id='" + id + "']").addClass(HighLightClass);
        var first = $(document.body).find("[id='" + id + "']").eq(0);
        var last = $(document.body).find("[id='" + id + "']").eq(-1);
        var left = first.offset().left - $(document).scrollLeft();
        var top = first.offset().top - $(document).scrollTop();
        var right = last.offset().left - $(document).scrollLeft();
        var bottom = last.offset().top + last.height() - $(document).scrollTop();
        CallBack('BookNoteClick//:'+id+','+left+','+top+','+right+','+bottom+','+RD.getChapterIndex(obj));
    } catch (e) {
        CallBack('log:bookNoteClick' + e);
    }
}

//MARK: - 响应长按事件
RD.onLongClickNew = function (downX, downY) {
    //长按事件
    try {
        var x = parseFloat(downX);
        var y = parseFloat(downY);
        //RD.clearNoteSelection();
        var range = document.caretRangeFromPoint(x, y);
        //range.expand("word");
        var n = 1;
        while (range.toString().length <= 0 && n < 20) {
            var caretRangeStart = document.caretRangeFromPoint(x - n, y - n);
            var caretRangeEnd = document.caretRangeFromPoint(x + n, y + n);
            range.setStart(caretRangeStart.startContainer, caretRangeStart.startOffset);
            range.setEnd(caretRangeEnd.endContainer, caretRangeEnd.endOffset);
            n++;
        }
        var text = range.toString();
        if (text.length == 1) {
            //扩充选中内容
            var baseKind = jpntext.kind(text);
            if (baseKind != jpntext.KIND['ascii']) {
                try {
                    do {
                        range.setEnd(range.endContainer, range.endOffset + 1);
                        text = range.toString();
                        var kind = jpntext.kind(text);
                    } while (baseKind == kind);
                    range.setEnd(range.endContainer, range.endOffset - 1);
                } catch (e) {
                    CallBack('log:'+e);
                }
                try {
                    do {
                        range.setStart(range.startContainer,
                                       range.startOffset - 1);
                        text = range.toString();
                        var kind = jpntext.kind(text);
                    } while (baseKind == kind);
                    range.setStart(range.startContainer, range.startOffset + 1);
                } catch (e) {
                    CallBack('log:'+e);
                }
            }
        }
        if (text.length > 0) {
            RD.selectionTextChangedNew(range);
        }
    } catch (e) {
        CallBack('log:onLongClickNew' + e);
    }
}

RD.selectionTextChangedNew = function (range) {
    //告知APP显示笔记菜单
    try {
        var text = range.toString();
        //获取选中文字的区域
        var selectionStart = $('<span id="selectionStart" style="width:0px;display:inline-block;vertical-align:top;font-size:0;"></span>');
        var selectionEnd = $('<span id="selectionEnd" style="width:0px;display:inline-block;vertical-align:bottom;font-size:0;"></span>');
        //添加起点标志
        var startRange = document.createRange();
        startRange.setStart(range.startContainer, range.startOffset);
        startRange.insertNode(selectionStart[0]);
        var left = selectionStart.offset().left;
        var top = selectionStart.offset().top;
        
        //添加终点标志
        var endRange = document.createRange();
        endRange.setStart(range.endContainer, range.endOffset);
        endRange.insertNode(selectionEnd[0]);
        var right = selectionEnd.offset().left;
        var bottom = selectionEnd.offset().top + selectionEnd.height();
//        return;
        selectionStart.remove();
        selectionEnd.remove();
        
        CallBack('log:'+'position'+' left:' + left + ',top:' + top + ',right:' + right + ',bottom:' + bottom);
        //获取选中文字的起始位置
        var startPosition = RD.getPositionOfNode(range, range.startContainer, range.startOffset);
        var endPosition = RD.getPositionOfNode(range, range.endContainer, range.endOffset);
        if (parseInt(startPosition.chapIndex != parseInt(endPosition.chapIndex))) return;
        //设置高亮和光标位置
        RD.cancerSearch();

        RD.AttrChooseText(startPosition.chapIndex, startPosition.pIndex, startPosition.index, endPosition.chapIndex, endPosition.pIndex, endPosition.index, 'class', HighLightClass);
        var objStart = $(document.body).find('.' + HighLightClass).eq(0);
        var objEnd = $(document.body).find('.' + HighLightClass).eq(-1);

        currentRange = {
            'startRange': objStart[0],
            'endRange': objEnd[0],
            'left': left,
            'top': top,
            'right': right,
            'bottom': bottom
        };
        var scrollLeft = $(document).scrollLeft();
        var scrollTop = $(document).scrollTop();
        CallBack('SelectionNewRange//:'+RD.CreateSelectionChangeData(startPosition.chapIndex,false, left - scrollLeft, top - scrollTop, right - scrollLeft, bottom - scrollTop, text, startPosition.pIndex, startPosition.index, endPosition.pIndex, endPosition.index));
    } catch (e) {
        CallBack('log:error selectionChanged=' + e);
    }
//    window.do_question.jsEnd();
}

RD.getChapterIndex = function(node) {
    try {
        var position = {};
        var parent = node;
        var child = node;
        while (parent != null && !$(parent).hasClass('chapTab')) {
            child = parent;
            parent = child.parentNode;
        }
        return $(parent).index();
    }catch(e){
        CallBack('log:error getChapterIndex=' + e);
    }
}
RD.getPositionOfNode = function (range, node, offset) {
    //获取标签所在的章节位置
    try {
        var position = {};
        var parent = node;
        var child = node;
        while (parent != null && !$(parent).hasClass('chapTab')) {
            child = parent;
            parent = child.parentNode;
        }
        position.chapIndex = $(parent).index();
        position.pIndex = $(child).index();
        // 获取标签在当前段落中的文本位置
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(child);
        preSelectionRange.setEnd(node, offset);
        var start = preSelectionRange.toString().length;
        position.index = start;
        //RD.logger('getPositionOfNode', position.chapIndex + '章' + position.pIndex + '段' + position.index);
        return position;
    } catch (e) {
        CallBack('log:getPositionOfNode=' + e);
    }
}

RD.AttrChooseText = function (startChap, startP, start, endChap, endP, end, attrType, attrValue) {
    //选中区域添加指定属性，可跨章节标签
    try {
        var chapIndex = -1;
        $(document.body).find(".chapTab").each(function () {
               chapIndex++;
               if (chapIndex < startChap) {
               return true;
               }
               if (chapIndex > endChap) {
               return false;
               }
               var pIndex = -1;
               $(this).children().each(function () {
                   pIndex++;
                   if (chapIndex == startChap && pIndex < startP) {
                   return true;
                   }
                   if (chapIndex == endChap && pIndex > endP) {
                   return false;
                   }
                   if (chapIndex == startChap && pIndex == startP) {
                   if (chapIndex == endChap && pIndex == endP) {
                   RD.AttrChoose(this, start, end, attrType, attrValue);
                   } else {
                   RD.AttrChoose(this, start, this.textContent.length, attrType, attrValue);
                   }
                   } else if (chapIndex == endChap && pIndex == endP) {
                   if (chapIndex == startChap && pIndex == startP) {
                   RD.AttrChoose(this, start, end, attrType, attrValue);
                   } else {
                   RD.AttrChoose(this, 0, end, attrType, attrValue);
                   }
                   } else {
                   RD.AttrChoose(this, 0, this.textContent.length, attrType, attrValue);
                   }
                   });
               });
    } catch (e) {
        CallBack('log:HighLightText=' + e);
    }
}

RD.AttrChoose = function (obj, start, end, attrType, attrValue) {
    //将标签指定段落添加一个属性
    try {
        var index = 0;
        for (var i = 0; i < obj.childNodes.length; i++) {
            var child = obj.childNodes[i];
            var text = child.textContent;
            var length = text.length;
            var childStart = index;
            var childEnd = index + length;
            if (length > 0 && childStart < end && childEnd > start) {
                //标签在高亮区间内
                if (childStart < start) {
                    childStart = start;
                }
                if (childEnd > end) {
                    childEnd = end;
                }
                if (child.childNodes.length > 0 && RD.childAllText(child) == false) {
                    //还有子标签，继续判断
                    RD.AttrChoose(child, childStart - index, childEnd - index, attrType, attrValue);
                } else {
                    //没有子标签
                    var lstr = text.substring(0, childStart - index);
                    var cstr = text.substring(childStart - index, childEnd - index);
                    var rstr = text.substring(childEnd - index, length);
                    if (child.nodeName.toLowerCase() == '#text') {
                        //是文本
                        $(child).replaceWith(lstr + '<span ' + attrType + '="' + attrValue + '">' + cstr + '</span>' + rstr);
                    } else {
                        //是标签
                        if (childStart - index == 0 && childEnd - index == length) {
                            if (attrType == 'class') {
                                $(child).addClass(attrValue);
                            } else {
                                $(child).attr(attrType, attrValue);
                            }
                        } else {
                            child.innerHTML = lstr + '<span ' + attrType + '="' + attrValue + '">' + cstr + '</span>' + rstr;
                            if(child.nodeName.toLowerCase() == '#span'){
                                RD.meshSpan(child);
                            }
                        }
                    }
                }
            }
            index = index + length;
        }
    } catch (e) {
        CallBack('log:AttrChoose' + e);
    }
}

RD.meshSpan = function (newSpan) {
    //格式化span合并冗余标签
    
}

RD.childAllText = function (obj) {
    //检查子标签是否全部是文本
    for (var i = 0; i < obj.childNodes.length; i++) {
        var child = obj.childNodes[i];
        if (child.nodeName.toLowerCase() != '#text') {
            return false;
        }
    }
    return true;
}
RD.clearNoteSelection = function () {
    //清除选中
    try {
//        currentColor = "initial";
        if (window.getSelection) {
            if (window.getSelection().empty) {
                // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            // IE?
            document.selection.empty();
        }
//        $(document.body).find('.' + HighLightClass).each(function(){
//                                                         this.outerHTML = this.innerHTML;
//                                                         });
    } catch (e) {
        CallBack('log:error clearSelection' + e);
    }
}
//MARK: - 移动光标的位置
RD.moveSelection = function (handleType, downX, downY) {
    try {
        var range = document.createRange();
        range.setStart(currentRange.startRange, 0);
        range.setEnd(currentRange.endRange, 1);
        var left = parseFloat(downX);
        var top = parseFloat(downY);
        if (parseInt(handleType) == 0) {
            var startRange = document.caretRangeFromPoint(left, top);
            if (startRange != null) {
                range.setStart(startRange.startContainer, startRange.startOffset);
            }
        } else {
            var endRange = document.caretRangeFromPoint(left, top);
            if (endRange != null) {
                range.setEnd(endRange.endContainer, endRange.endOffset);
            }
        }
        var rightOrder = range.toString().length;
        if (rightOrder > 0) {
            RD.selectionTextChangedMove(range, false, handleType);
            return;
        } else {
            //反向选中
            var range2 = document.createRange();
            range2.setStart(currentRange.startRange, 0);
            range2.setEnd(currentRange.endRange, 1);
            if (parseInt(handleType) == 0) {
                range2.collapse(false);
                var endRange = document.caretRangeFromPoint(left, top);
                if (endRange != null) {
                    range2.setEnd(endRange.endContainer, endRange.endOffset);
                }
            } else {
                range2.collapse(true);
                var startRange = document.caretRangeFromPoint(left, top);
                if (startRange != null) {
                    range2.setStart(startRange.startContainer, startRange.startOffset);
                }
            }
            rightOrder = range2.toString().length;
            if (rightOrder > 0) {
                RD.selectionTextChangedMove(range2, true, handleType);
                return;
            }
        }
    } catch (e) {
        CallBack('log:upSelection' + e);
    }
//    window.do_question.jsEnd();
}

RD.selectionTextChangedMove = function (range, isHandleChange, handleType) {
    //告知APP笔记内容变化
    try {
        var text = range.toString();
        //获取选中文字的区域
        var selectionStart = $('<span id="selectionStart" style="width:0px;display:inline-block;vertical-align:top;font-size:0;"></span>');
        var selectionEnd = $('<span id="selectionEnd" style="width:0px;display:inline-block;vertical-align:bottom;font-size:0;"></span>');
        var startRange = document.createRange();
        startRange.setStart(range.startContainer, range.startOffset);
        startRange.insertNode(selectionStart[0]);
        var endRange = document.createRange();
        endRange.setStart(range.endContainer, range.endOffset);
        endRange.insertNode(selectionEnd[0]);
        var left = selectionStart.offset().left;
        var top = selectionStart.offset().top;
        var right = selectionEnd.offset().left;
        var bottom = selectionEnd.offset().top + selectionEnd.height();
        selectionStart.remove();
        selectionEnd.remove();
        //获取选中文字的起始位置
        var startPosition = RD.getPositionOfNode(range, range.startContainer, range.startOffset);
        var endPosition = RD.getPositionOfNode(range, range.endContainer, range.endOffset);
        if (parseInt(startPosition.chapIndex != parseInt(endPosition.chapIndex))) return;
        
        //保存当前range
        var objStart = $(document.body).find('.' + HighLightClass).eq(0);
        var objEnd = $(document.body).find('.' + HighLightClass).eq(-1);
        //保存当前选中的文本信息

        currentRange = {
            'startRange': objStart[0],
            'endRange': objEnd[0],
            'left': left,
            'top': top,
            'right': right,
            'bottom': bottom
        };

        //设置高亮和光标位置
        RD.cancerSearch();
        
        RD.AttrChooseText(startPosition.chapIndex, startPosition.pIndex, startPosition.index, endPosition.chapIndex, endPosition.pIndex, endPosition.index, 'class', HighLightClass);
        
        
        var scrollLeft = $(document).scrollLeft();
        var scrollTop = $(document).scrollTop();
        CallBack('SelectionChangedRangeInfo//:'+RD.CreateSelectionChangeData(startPosition.chapIndex,isHandleChange, left - scrollLeft, top - scrollTop, right - scrollLeft, bottom - scrollTop, text, startPosition.pIndex, startPosition.index, endPosition.pIndex, endPosition.index));
    } catch (e) {
        CallBack('log:selectionTextChangedMove' + e);
    }
//    window.do_question.jsEnd();
}

RD.cancerSearch = function () {
    //取消所有搜索结果
    try {
        $(document.body).find('.HighLightBg0,.HighLightBg1,.HighLightBg2,.HighLightBg3,.HighLightBg4').removeClass('HighLightBg0 HighLightBg1 HighLightBg2 HighLightBg3 HighLightBg4');
    } catch (e) {
        CallBack('log:cancerSearch' + e);
    }
}

RD.CreateSelectionChangeData= function(chapterIndex,isHandleChange,left,top,right,bottom,text,startPIndex,startIndex,endPIndex,endIndex) {
    var resultDicStr = '';
    var keyArray = new Array('chapterIndex','isHandleChange','left','top','right','bottom','text','startPIndex','startIndex','endPIndex','endIndex');
    var valueArray = new Array(chapterIndex,isHandleChange,left,top,right,bottom,text,startPIndex,startIndex,endPIndex,endIndex);
    for (var i=0;i<keyArray.length;i++) {
        if (i==0) {
            resultDicStr += '"'+keyArray[i]+'":"'+valueArray[i]+'"';
        } else {
            resultDicStr += ',"'+keyArray[i]+'":"'+valueArray[i]+'"';
        }
    }
    CallBack('log:'+'{'+resultDicStr+'}');
    return '{'+resultDicStr+'}';
}

//MARK: - 笔记下划线
RD.setUnderLine = function (id, type) {
    try {
        //window.do_question.updateCurrent(parseInt($(document).scrollLeft()));
//        $('#'+id).each(function(){
//                       $(this).removeClass("BookNoteLine1 BookNoteLine2 BookNoteLine3 BookNoteLine4 BookNoteLine5");
//                       $(this).removeClass(HighLightClass);
//                       $(this).removeAttr(id);
//                       });
        $(document.body).find('.' + HighLightClass).removeClass("BookNoteLine1 BookNoteLine2 BookNoteLine3 BookNoteLine4 BookNoteLine5");
        $(document.body).find('.' + HighLightClass).addClass('BookNoteLine' + type);
        $(document.body).find('.' + HighLightClass).attr('id', id);
        var startPosition = document.getElementById('startPosition');
        $(startPosition).css('display', 'none');
        var endPosition = document.getElementById('endPosition');
        $(endPosition).css('display', 'none');
        var src = iconNote1;
        switch (parseInt(type)) {
            case 2:
                src = iconNote2;
                break;
            case 3:
                src = iconNote3;
                break;
            case 4:
                src = iconNote4;
                break;
            default:
                break;
        }
        var objEnd = $(document.body).find('.' + HighLightClass).eq(-1);
        if (objEnd[0].nodeName.toLowerCase() == 'icnote') {
            //下标已经存在
            objEnd.find('img').attr('src', src);
            //$('html, body').animate({
            //    scrollLeft: $(document).scrollLeft() + 1
            //}, 0);
            return;
        }
        var obj = objEnd[0].nextSibling;
        if (obj != null && $(obj).attr('id') == id) {
            //下标已经存在
            $(obj).find('img').attr('src', src);
        } else {
            //下标不存在
            //objEnd.after('<sub id="' + id + '"><icnote z-index="1" position=absolute><img src="' + src + '"/></icnote></sub>');
            objEnd.after('<icnote id="' + id + '" style="position: relative;"><icnote position="absolute" style="position: absolute;width: 28px;bottom: -8px;"><img src="' + src + '" style="float: left;"></icnote></icnote>');
        }
    } catch (e) {
        CallBack('log:error setUnderLine' + e);
    }
}

RD.deleteSelection = function (id) {
    //删除笔记
    try {
        //window.do_question.updateCurrent(parseInt($(document).scrollLeft()));
        $(document.body).find("[id='" + id + "']").find('icnote').remove();
        $(document.body).find("[id='" + id + "']").removeClass("BookNoteLine1 BookNoteLine2 BookNoteLine3 BookNoteLine4 BookNoteLine5 " + HighLightClass).removeAttr('id');
        RD.cancerSearch();
        var startPosition = document.getElementById('startPosition');
        $(startPosition).css('display', 'none');
        var endPosition = document.getElementById('endPosition');
        $(endPosition).css('display', 'none');
        //$('html, body').animate({
        //    scrollLeft: $(document).scrollLeft() + 1
        //}, 0);
    } catch (e) {
        CallBack('log:deleteSelection' + e);
    }
}

//MARK: - 恢复某个笔记
RD.resumeBookNoteNew = function (id, startChap,startP, start, endChap,endP, end, colorType) {
    
    try {
        RD.AttrChooseText(startChap, startP, start, endChap, endP, end, 'id', id);
        $(document.body).find("[id='" + id + "']").addClass('BookNoteLine' + colorType);
        var src = iconNote1;
        switch (parseInt(colorType)) {
            case 2:
                src = iconNote2;
                break;
            case 3:
                src = iconNote3;
                break;
            case 4:
                src = iconNote4;
                break;
            default:
                break;
        }
        var objEnd = $(document.body).find("[id='" + id + "']").eq(-1);
        if (objEnd[0].nodeName.toLowerCase() == 'icnote') {
            //下标已经存在
            objEnd.find('img').attr('src', src);
            return;
        }
        var obj = objEnd[0].nextSibling;
        if (obj != null && $(obj).attr('id') == id) {
            //下标已经存在
            $(obj).find('img').attr('src', src);
        } else {
            //下标不存在
            //objEnd.after('<sub id="' + id + '"><icnote z-index="1" position=absolute><img src="' + src + '"/></icnote></sub>');
            objEnd.after('<icnote id="' + id + '" style="position: relative;"><icnote position="absolute" style="position: absolute;width: 28px;bottom: -8px;"><img src="' + src + '" style="float: left;"></icnote></icnote>');
        }
    } catch (e) {
        CallBack('log:error resumeBookNoteNew' + e);
    }
}

RD.prepareSpeakingContent = function () {
    //获取当前页的内容，用于语音朗读
    try {
        var chapIndex = -1;
        var findCount = 0;
        if (parseInt(DirectionType) == 0) {
            //上下模式
            var scrollStart = $(document).scrollTop();
            var scrollEnd = scrollStart + screen.height;
            $(document.body).find(".chapTab").each(function () {
               chapIndex++;
               var chapBottom = $(this).offset().top + this.offsetHeight;
               if (chapBottom < scrollStart) {
               return true;
               }
               var chapTop = $(this).offset().top;
               if (chapTop > scrollEnd && findCount > 3) {
               return false;
               }
               var pIndex = -1;
               $(this).children().each(function () {
                   pIndex++;
                   var objTop = $(this).offset().top;
                   if (objTop < scrollStart) {
                   return true;
                   }
                   if (objTop > scrollEnd && findCount > 3) {
                   return false;
                   }
                   var content = this.textContent.replace(new RegExp('\r\n', 'gm'), "");
                   if (content.length > 0) {
                   findCount++;
                   CallBack('SpeechInfo//:'+'{"chapIndex":"'+chapIndex+'","pIndex":"'+pIndex+'","content":"'+content+'"}');
                                       
                   }
                   });
               });
        } else {
            var screenH = screen.height - 40;
            var screenW = screen.width;
            var scrollStart = $(document).scrollLeft() * screenH / (screenW);
            var scrollEnd = scrollStart + screenH;
            $(document.body).find(".chapTab").each(function () {
               chapIndex++;
               var chapBottom = this.offsetTop + this.offsetHeight;
               if (chapBottom < scrollStart) {
               return true;
               }
               var chapTop = this.offsetTop;
               if (chapTop > scrollEnd && findCount > 3) {
               return false;
               }
               var pIndex = -1;
               $(this).children().each(function () {
                   pIndex++;
                   var objTop = this.offsetTop;
                   if (objTop < scrollStart) {
                   return true;
                   }
                   if (objTop > scrollEnd && findCount > 3) {
                   return false;
                   }
                   var content = this.textContent.replace(new RegExp('\r\n', 'gm'), "");
                   if (content.length > 0) {
                   findCount++;
                   CallBack('SpeechInfo//:'+'{"chapIndex":"'+chapIndex+'","pIndex":"'+pIndex+'","content":"'+content+'"}');
                   }
                   });
               });
        }
        if (findCount == 0) {
            //没找到阅读内容
            CallBack('log:未找到朗读内容');
        }
    } catch (e) {
        CallBack('log:error prepareSpeakingContent ' + e);
    }
}

//MARK: - 从指定标签后面获取语音朗读内容 index1 表示当前章节号 index2 p标签的位置
RD.prepareSpeakingNext = function (index1, index2) {
    try {
        var chapIndex = -1;
        var findCount = 0;
        $(document.body).find(".chapTab").each(function () {
           chapIndex++;
           if (chapIndex < parseInt(index1)) {
           return true;
           }
           if (findCount > 3) {
           return false;
           }
           var pIndex = -1;
           $(this).children().each(function () {
               pIndex++;
               if (chapIndex == parseInt(index1) && pIndex <= parseInt(index2)) {
               return true;
               }
               if (findCount > 3) {
               return false;
               }
               var content = this.textContent.replace(new RegExp('\r\n', 'gm'), "").trim();
               if (content.length > 0) {
               findCount++;
               CallBack('SpeechInfo//:'+'{"chapIndex":"'+chapIndex+'","pIndex":"'+pIndex+'","content":"'+content+'"}');
               }
               });
           });
        if (findCount == 0) {
            //没找到阅读内容
            window.do_question.unFindSpeakingContent();
        }
    } catch (e) {
        CallBack('log:error prepareSpeakingNext' + e);
    }
}

//MARK: - 高亮显示某个标签
RD.showSpeakingContent = function (chapIndex, pIndex) {
    
    try {
        var chap = $(document.body).find(".chapTab").eq(parseInt(chapIndex))[0];
        if (!chap) {
        } else {
            var obj = $(chap).children().eq(parseInt(pIndex))[0];
            if (!obj) {
            } else {
                RD.cancerSearch();
                $(obj).addClass(HighLightClass);
                $(obj).find('.BtnShowAnsCon').addClass(HighLightClass);
                //如果到了翻页的位置，自动翻页
                if (DirectionType == 0) {
                    //上下模式
                    var objBottom = $(obj).offset().top + obj.offsetHeight;
                    var objTop = $(obj).offset().top - 30;
                    var scrollEnd = $(document).scrollTop() + screen.height;
                    if (objBottom > scrollEnd) {
                        $('html, body').animate({
                                                scrollTop: objTop
                                                }, 200);
                    }
                } else {
                    var screenW = screen.width;
                    var screenH = screen.height - 40;
                    var objBottom = obj.offsetTop + obj.offsetHeight;
                    var objLeft = screenW * parseInt(obj.offsetTop / screenH);
                    var scrollEnd = screenH * $(document).scrollLeft() / screenW + screenH;
                    if (objBottom > scrollEnd) {
                        $('html, body').animate({
                                                scrollLeft: objLeft
                                                }, 200);
                    }
                }
            }
        }
    } catch (e) {
        CallBack('log:showSpeakingContent' + e);
    }
}

//获取加载失败后的图片位置信息
RD.getFailedPictureLocationInfo = function(x,y){
    try{
        var picNode = document.elementFromPoint(parseFloat(x),parseFloat(y));
        var url = picNode.getAttribute('data-src');
        //获取当前图片所在章节index
        var parent = picNode;
        var child = picNode;
        while (parent != null && !$(parent).hasClass('chapTab')) {
            child = parent;
            parent = child.parentNode;
        }
        var chapIndex = $(parent).index();
        //找到本章所有无效的图片并通知oc下载替换
        var findStr = 'img[src^="'+picNode.getAttribute('src')+'"]';
        $(parent).find(findStr).each(function(){
                                     CallBack('UnloadPicDataSrc//:'+this.getAttribute('data-src')+'='+chapIndex);
                                     });
        
        
        return url+'='+chapIndex;
    }catch(e){
        CallBack('log:getFailedPictureLocationInfo=' + e);
    }
    
}
RD.CloseAudio = function () {
    $('audio').each(function(){
                    this.pause();
                    });
}
function addCSSRule(selector, newRule){
        var mySheet = document.styleSheets[0];
        var ruleIndex = mySheet.cssRules.length;
        mySheet.insertRule(selector + '{' + newRule + ';}', ruleIndex);
    }
function removeCSSRule(){
     var mySheet = document.styleSheets[0];
     while(mySheet.cssRules.length>0){
         mySheet.deleteRule(0);
     }
}
//head中添加禁止系统超链接效果和监测滚动事件,手势监听事件
function AddHeaderMeta(){
    if ($('meta[name="format-detection"]').length==0) {
        var newMeta = '<meta name="format-detection" content="telephone=no" >';
        $('head').append(newMeta);
    }
    
    //禁止缩放
    var foreceScale = '<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">';
    $('head').append(foreceScale);
    
    var listenScroll = '<script>'+
    'window.onscroll=function(){'+
    'WindowHasScroll();'+
    '}'+
    '</script>';
    $('head').append(listenScroll);
    
    var listenOnload = '<script type="text/JavaScript">'
    +'window.onload=function(){'
    +'document.documentElement.style.webkitTouchCallout="none";'
    +'};'
    +'</script>';
    $('head').append(listenOnload);
    
    
    document.documentElement.style.webkitTouchCallout='none';
    document.body.style.webkitTouchCallout='none';
    
//    document.documentElement.style.webkitUserSelect='text'
}
function AddLocalCssFile(path) {
    var fileref=document.createElement("link")
    fileref.rel="stylesheet";
    fileref.type="text/css";
    fileref.href=path;
    if (path.indexOf('Note.css')>=0){
        fileref.charset = "utf-8";
    }
//    fileref.media="screen";
    var headobj=document.getElementsByTagName('head')[0];
    headobj.appendChild(fileref);
//    var fileNode = '<link href="'+path+'" type="text/css" rel="Note">';
//    $('head').append(fileNode);
}
//修改图片尺寸
 function ResizeImages(chapterIndex,width,height) {
     if (document.getElementById(chapterIndex) != undefined){
         var chapterObj = document.getElementById('chapter'+chapterIndex);
         var myimg,oldwidth,oldheight;
         var maxwidth=width;
         var maxheight=height;
         for(i=0;i <chapterObj.images.length;i++){
             myimg = chapterObj.images[i];
             $(myimg).css('width',$(myimg).attr('width')).css('height',parseInt($(myimg).css('width'))/$(myimg).attr('width')*$(myimg).attr('height') );
             if(maxheight > maxwidth){
                 if(myimg.width > maxwidth){
                     oldwidth = myimg.width;
                     myimg.width = maxwidth;
                     myimg.height = myimg.height * (maxwidth/oldwidth);
                 }}else{
                     if(myimg.height > maxheight){
                         oldheight = myimg.height;
                         myimg.height = maxheight;
                         myimg.width = myimg.width * (maxheight/oldheight);
                     }
                 }
             myimg.setAttribute('style','');
         }
     }
     
 }
function CleanInvalidDiv(){
    if (document.getElementsByClassName('placeholder').length>0){
        document.getElementsByClassName('placeholder')[0].outerHTML='';
    }
}

 function showAllQuote(){
     var obj = event.target;
     var HideAreaObj = obj.parentNode.getElementsByClassName('M-Art-Quote-HideArea')[0];
     if(HideAreaObj.style.display == 'block'){
     obj.innerHTML='查看全文';
     HideAreaObj.style.display='none';
     
     }
     else{
     obj.innerHTML= '收起';
     HideAreaObj.style.display='block';
     
     }
     loadURL('reloadwebwidth://');
 }

 function loadURL(){
     var iFrame;
     iFrame = document.createElement('iframe');
     iFrame.setAttribute('src', url);
     iFrame.setAttribute('style', 'display:none;');
     iFrame.setAttribute('height', '0px');
     iFrame.setAttribute('width', '0px');
     iFrame.setAttribute('frameborder', '0');
     document.body.appendChild(iFrame);
     // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
     iFrame.parentNode.removeChild(iFrame);
     iFrame = null;
 }
 //获取每个column文本内容
function getTextInColumn(left,top,width,height){
    //获取某个区域的文字内容
    var caretRangeStart = null;
    var caretRangeEnd = null;
    var txt = "";
    try{
        if (document.caretRangeFromPoint) {
            caretRangeStart = document.caretRangeFromPoint(left, top);
            caretRangeEnd = document.caretRangeFromPoint(left + width - 1, top + height - 1);
        } else {
            txt = "抱歉，获取文本失败.";
        }
        if (caretRangeStart == null || caretRangeEnd == null) {
            txt = "";
        } else {
            var range = document.createRange();
            range.setStart(caretRangeStart.startContainer, caretRangeStart.startOffset);
            range.setEnd(caretRangeEnd.endContainer, caretRangeEnd.endOffset);
            txt = range.toString();
        }
    }catch(e){
        CallBack('log='+e);
    };
    
    
    
    return txt;
}

function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
 　}
 //点击笔记用的
 function clicknote() {
 var e = event.target;
 document.location='clicknote://'+e.className+'content'+encodeURI(e.innerHTML);
 }
 //划线的时候修改标签用的
 function replaceInnerHTML(x,y,newhtml) {
     var e = document.elementFromPoint(x,y);
     if (e.tagName != 'body') {
         e.innerHTML=newhtml;
     }
 }
 //答案标签点击事件
 function answerclick() {
     var e = event.target;
     
     if (e.className == 'BtnShowAnsCon') {
         if(e.style.opacity!=1.0){//查看答案透明，显示答案
             e.style.opacity=1.0;
             e.previousSibling.setAttribute( 'class', 'AnsConHide');
         }else{//查看答案不透明，模糊答案
             e.previousSibling.setAttribute( 'class', 'operateAnswer');
             e.style.opacity=0;
         }
     }else if (e.className == 'AnsConHide') {//多行时候模糊的答案可以点
         e.setAttribute( 'class', 'operateAnswer');
         e.nextSibling.style.opacity=0;
     }else if (e.className == 'operateAnswer'){
         e.setAttribute( 'class', 'AnsConHide');
         e.nextSibling.style.opacity=1.0;
     }
     
     //阻止冒泡
//     e.preventDefault();
//     e.stopPropagation();
 }

//处理用户出书加载后的标签
function DealAppMakerChapter(chapterIndex) {
    var chapterId = 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined) {
        //去掉目录中的封面
        for (var i=0;i<chapterNode.getElementsByClassName('CatH1').length;i++){
            var CatH1Node = chapterNode.getElementsByClassName('CatH1')[i];
            if (CatH1Node.innerHTML.length > 0 && CatH1Node.innerHTML.indexOf('cover.html') >= 0){
                CatH1Node.outerHTML = '';
            }
        }
        
        //去掉目录中的空节
        //noinspection JSDuplicatedDeclaration
        for (var i=0;i<chapterNode.getElementsByClassName('CatH2').length;i++){
            var CatH2Node = chapterNode.getElementsByClassName('CatH2')[i];
            if (CatH2Node.innerHTML.length >0 && CatH2Node.innerHTML.indexOf('.html')<0){
                CatH2Node.outerHTML = '';
            }
        }
        
        //去掉目录中的空章
        for (var i=0;i<chapterNode.getElementsByClassName('CatH1').length;i++){
            var CatH1Node = chapterNode.getElementsByClassName('CatH1')[i];
            if (CatH1Node.innerHTML.length > 0&&CatH1Node.innerHTML.indexOf('.html')<0){
                CatH1Node.outerHTML = '';
            }
        }
        
        //整理ImgBox标签
//        for (var i=0;i<chapterNode.getElementsByClassName('M-Art-ImgGroup').length;i++){
//            var groupNode = chapterNode.getElementsByClassName('M-Art-ImgGroup')[i];
//            for (var j=0;j<groupNode.getElementsByClassName('M-Art-ImgBox').length;j++) {
//                var boxNode = groupNode.getElementsByClassName('M-Art-ImgBox')[j];
//                groupNode.outerHTML = '<div class="M-Art-ImgGroup"><p class="M-Art-ImgBox">'+boxNode.innerHTML+'</p></div>';
//            }
//        }
        //去除图片样式
        $('.M-Art-ImgBox-Active').removeClass('M-Art-ImgBox-Active');
        //去掉空标签
        for (var i=0;i<chapterNode.getElementsByClassName('M-Art-P').length;i++) {
            var pNode = chapterNode.getElementsByClassName('M-Art-P')[i];
            pNode.setAttribute('contenteditable','false');
            if (pNode.innerHTML.length==0 || pNode.innerHTML.indexOf('<br>') >=0 || pNode.outerHTML.indexOf('mediaBrTag')>=0){
                pNode.style.display = 'none';
            }
        }
        
        //处理span标签
        for (var i=0;i<chapterNode.getElementsByTagName('span').length;i++) {
            var spanNode = chapterNode.getElementsByTagName('span')[i];
            spanNode.setAttribute('contenteditable','false');
            if (spanNode.innerHTML==''||spanNode.innerHTML == '<br>') {
                spanNode.outerHTML = '';
            } else {
                var parentTag = spanNode.parentNode.tagName;
                if (parentTag.toLowerCase() == 'body') {
                    spanNode.outerHTML = '<p class="M-Art-P">'+spanNode.innerHTML+'</p>';
                }
            }
        }
    }
}

//处理非用户出书加载后的标签
function DealNoneAppMakerChapter(chapterID,ansBgColor) {
    var chapterNode = document.getElementById('chapter'+chapterID);
    
    if (chapterNode.getElementsByClassName('BtnShowAnsCon').length>0) {
        for (var i=0;i<chapterNode.getElementsByClassName('BtnShowAnsCon').length;i++) {
            var BtnShowAnsConNode = chapterNode.getElementsByClassName('BtnShowAnsCon')[i];
            BtnShowAnsConNode.outerHTML = '';
        }
    }
    if (chapterNode.getElementsByClassName('AnsConHide').length>0) {
        for (var i=0;i<chapterNode.getElementsByClassName('AnsConHide').length;i++) {
            var AnsConHideNode = chapterNode.getElementsByClassName('AnsConHide')[i];
            AnsConHideNode.outerHTML =  AnsConHideNode.innerHTML;
        }
    }
    if (chapterNode.getElementsByClassName('AnsTag').length>0) {
        for (var i=0;i<chapterNode.getElementsByClassName('AnsTag').length;i++) {
            var AnsTagNode = chapterNode.getElementsByClassName('AnsTag')[i];
            var AnsTagNodeOuterStr = AnsTagNode.outerHTML;
            var parInnerStr = AnsTagNode.parentNode.innerHTML;
            var afterHtml = parInnerStr.replace(AnsTagNodeOuterStr,'');
            AnsTagNode.parentNode.innerHTML = AnsTagNodeOuterStr + '<span onclick="answerclick()" class="AnsConHide">'+afterHtml+'</span>' +'<span onclick="answerclick()" class="BtnShowAnsCon" style="opacity:1;background-color:'+ansBgColor+';">查看答案</span>';
        }
    }
    
    if (chapterNode.getElementsByClassName('phonetic').length>0) {
        for (var i=0;i<chapterNode.getElementsByClassName('phonetic').length;i++) {
            var phoneticNode = chapterNode.getElementsByClassName('phonetic')[i];
            phoneticNode.style.fontFamily = 'Kingsoft-Phonetic';
        } 
    }
    
}
//设置<html>的style
function ConfigureHtmlStyle() {
    $('html').attr('style','height: 100%;width: 100%;padding-top: 20px; padding-bottom: 20px;box-sizing:border-box;');//padding-top: 20px; padding-bottom: 20px; -webkit-user-select: none;
}
//MARK: -  切换横竖模式
function ChangeDirection(modeType,screenW) {
    if (modeType == '0') {
        //上下滑
        $('html').css({
                      '-webkit-column-gap': ' ',
                      '-webkit-column-width': ''
                      });
//        $('html').css('none');
        DirectionType = 0;
    }
    
    if (modeType == '1') {
        //左右滑
        $('html').css({
                      '-webkit-column-gap': '0px',
                      '-webkit-column-width': screenW + 'px'
                      });
        DirectionType = 1;
    }
    
    ConfigureCoverDiv();
}

//设置封面位置
function ConfigureCoverDiv(){
    if (document.getElementsByClassName('coverOuter').length>0) {
        var coverNode = document.getElementsByClassName('coverOuter')[0];
        var coverImgNode = document.getElementsByClassName('coverimg')[0];
        var ratio = 297.0/210.0;
        if (DirectionType == 0) {
            var height = screen.height-20;
            var width = screen.width;
            var left = 0;
            var top = 0;
            var styleStr = '';
            if (height/width > ratio) {
                height = width*ratio;
                top = (screen.height-20 - height)/2;
                style = 'padding-top:'+top+'px;padding-left:0px;padding-right:0px';
            }
            else{
                width = height/ratio;
                left = (screen.width-width)/2;
                style = 'padding-left:'+left+'px;padding-right:'+left+'px;padding-top:0px;padding-bottom:0px;width:'+width+'px;height:'+height+'px';
            }
            coverNode.style.marginLeft = '-16px';
            coverNode.style.marginRight = '-16px';
            coverNode.style.marginTop = '-30px';
            coverImgNode.setAttribute('style',style);
        } else {
            var height = screen.height-65;
            var width = screen.width-32;
            var left = 0;
            var top = 0;
            var styleStr = '';
            if (height/width > ratio) {
                height = width*ratio;
                top = (screen.height-65 - height)/2;
                style = 'padding-top:'+top+'px;padding-bottom:'+top+'px;padding-left:0px;padding-right:0px;width:'+width+'px;height:'+height+'px;';
            }else{
                width = height/ratio;
                left = (screen.width-32-width)/2;
                style = 'padding-left:'+left+'px;padding-right:'+left+'px;padding-top:0px;padding-bottom:0px;width:'+width+'px;height:'+height+'px;';
            }
            coverNode.style.marginLeft = '0px';
            coverNode.style.marginRight = '0px';
            coverNode.style.marginTop = '-30px';
            coverImgNode.setAttribute('style',style);
        }
    }
    
}
//MARK: - 设置背景色
function SetBgColor(hexStr) {
    document.body.style.backgroundColor= hexStr;
    $('.BtnShowAnsCon').each(function(){
                             this.style.backgroundColor = hexStr;
                             });
}
//添加body中的章节容器
function AddContainerToBody(chapterCount,height) {
    if ($('body').children().length==0) {
        var container = '';
        for (var i=0;i<chapterCount;i++) {
            container += '<div id="chapter'+i+'" style="height:'+height+'px;-webkit-touch-callout: none;'+'" class="chapTab"></div>';//'<div id="topMargin'+i+'"></div> <div id="bottomMargin'+i+'"></div>
        }
        document.body.innerHTML = container;
        
        //绑定笔记点击事件
        for (var i=0;i<chapterCount;i++) {
            $('#chapter'+i).on('click', '.BookNoteLine1,.BookNoteLine2,.BookNoteLine3,.BookNoteLine4,.BookNoteLine5', function () {
                                RD.bookNoteClick(this);
                                });
        }
    }
}

//加载chapter内容
function AddContentToChapter(chapterIndex,content) {
    var chapterId= 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined && $(chapterNode).children().length==0) {
        chapterNode.innerHTML = content;
        $(chapterNode).removeAttr('style');
    }
    
    //每次添加都要检测配置封面div
    ConfigureCoverDiv();
    //每次添加都执行该监听事件，用于章节加载完成的回调
    $(document).ready(function(){
                      //MARK: - 这里应改为判断本章所有图片加载完成才算章节加载完成
                      CallBack('ChapterLoaded//:'+chapterIndex);
                      CallBack('log:加载完成：'+chapterId);
                      });
}

//修改封面图片途径
function ChangeCoverImagePath(path) {
    if (document.getElementsByClassName('coverimg').length>0) {
        var coverImgNode = document.getElementsByClassName('coverimg')[0];
        coverImgNode.setAttribute('src',path);
    }
}
//替换图片路径
function ChangeImagePath(ImgId,ImgSrc) {
//    if (document.getElementById(ImgId) != undefined){
//        document.getElementById(ImgId).setAttribute('src',ImgSrc);
//    }
    $('body').find('img[id^="'+ImgId+'"]').each(function(){
                                                this.setAttribute('src',ImgSrc);
                                                });
}

//获取章节高度
function GetChpaterHeight(chapterIndex) {
    var chapterId= 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined) {
        return chapterNode.offsetHeight;
    }
}
//获取章节上偏移量
function GetChpaterOffsetTop(chapterIndex) {
    var chapterId= 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined) {
        return chapterNode.offsetTop;
    }
}
//获取章节宽度
function GetChpaterWidth(chapterIndex) {
    var chapterId= 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined) {
        return chapterNode.offsetWidth;
    }
}

//获取章节左偏移量
function GetChpaterOffsetLeft(chapterIndex) {
    var chapterId= 'chapter'+chapterIndex;
    var chapterNode = document.getElementById(chapterId);
    if (chapterNode != undefined) {
        return chapterNode.offsetLeft;
    }
}
//MARK: - 跳转到指定搜索关键词位置
function ScrollToSearchKey(index) {
    var keyNode = document.getElementsByTagName('highlight')[parseInt(index)];
    if (keyNode != undefined) {
        keyNode.style.backgroundColor = '#ffd700';
        var top = keyNode.offsetTop; //获取该元素对应父容器的上边距
        var left = keyNode.offsetLeft; //对应父容器的上边距
        //判断是否有父容器，如果存在则累加其边距
        var obj = keyNode;
        while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
            top += obj.offsetTop; //叠加父容器的上边距
            left += obj.offsetLeft; //叠加父容器的左边距
        }
        
        if (DirectionType == 0) {
            document.body.scrollTop = top-40;
        } else {
            var pageIndex = parseInt(top/(screen.height-40));
            document.body.scrollLeft = pageIndex * screen.width;
            CallBack('log'+': pageIndex='+pageIndex);
        }
    }
    
}
//MARK: - 移动到指定章节 #chapterIndex 章节序号，#percent 已读到当前章节百分比 #type：0，上下模式；1，左右模式
function ScrollToChapter(chapterIndex,percent,type) {
    if (document.getElementById('chapter'+chapterIndex) != undefined) {
        var chapterNode = document.getElementById('chapter'+chapterIndex);
        chapterNode.scrollIntoView(true);

        if (percent != undefined) {
            if (parseInt(type) == 0) {//上下模式
//                $(document).scrollTop($(chapterNode).offset().top+$(chapterNode).height() * parseFloat(percent));
                document.body.scrollTop = chapterNode.offsetTop + chapterNode.offsetHeight*parseFloat(percent);
            } else {//左右模式
                var top =chapterNode.offsetTop;
                var height = chapterNode.offsetHeight;
                var firstPageH = screen.height - parseInt(top%(screen.height-40));
                var displayedH = height * parseFloat(percent);
                if (displayedH>firstPageH) {
                    var pages = Math.ceil(parseInt(top+displayedH)/parseInt(screen.height));//向上整除

//                    $(document).scrollLeft(pages*screen.width);
                    document.body.scrollLeft = pages*screen.width;
                }
                return 'top='+top+' height='+height+' firstPageH='+firstPageH+' displayedH='+displayedH;
            }
        } else {
            
        }
        
    }
}

//MARK: - 获取阅读进度信息 返回值是 章节序号+当前阅读进度百分比
function  getCurPercent(type) {
    var percent = 0;
    if (parseInt(type) == 0) {
        //上下模式
        if (document.getElementsByClassName('chapTab').length>0) {
            var scrollH = document.body.scrollTop;
            var currentNode ;
            for (var i=0;i<document.getElementsByClassName('chapTab').length;i++) {
                var chapterNode = document.getElementsByClassName('chapTab')[i];
                if (chapterNode.offsetTop>scrollH) {
                    if (i-1>=0) {
                        currentNode = document.getElementsByClassName('chapTab')[i-1];
                    }
                    break;
                }
                if (i==document.getElementsByClassName('chapTab').length-1) {
                    if (chapterNode.offsetTop<scrollH) {
                        currentNode = document.getElementsByClassName('chapTab')[i];
                        break;
                    }
                        
                }
            }
            if (currentNode != undefined) {
                var scrollOffsetH = scrollH-currentNode.offsetTop;//相对当前章节的滚动距离
//                if (scrollOffsetH+20<=$(currentNode).height()) {
//                    scrollOffsetH = scrollOffsetH+20;
//                }
                percent = parseFloat(scrollOffsetH)/currentNode.offsetHeight;
                var chapterIndexStr = $(currentNode).attr('id').replace('chapter','');
//                CallBack('currentchapter= '+chapterIndexStr+' , percent= '+percent+' scrollH='+scrollH+' currentNode.offsetTop='+currentNode.offsetTop);
                return chapterIndexStr+','+percent;
            } else {
                return '0,0';
            }
            
        }
    } else  {
        //左右模式
        if (document.getElementsByClassName('chapTab').length>0) {
            var scrollW = document.body.scrollLeft;
            var scrollPageIndex = Math.floor(parseInt(scrollW)/parseInt(screen.width));
            var scrollTop = scrollPageIndex*(screen.height)-40*scrollPageIndex;
            var currentNode ;
            for (var i=0;i<document.getElementsByClassName('chapTab').length;i++) {
                var chapterNode = document.getElementsByClassName('chapTab')[i];
                if (chapterNode.offsetTop+chapterNode.offsetHeight>=scrollTop) {
                    currentNode = document.getElementsByClassName('chapTab')[i];
                    break;
                }
            }
//            CallBack('左右滑'+' chapterTop='+chapterNode.offsetTop+' scrollPageIndex='+scrollPageIndex+' scrollTop='+scrollTop);
            
            if (currentNode != undefined) {
                percent = parseFloat(scrollTop-currentNode.offsetTop)/currentNode.offsetHeight;
                var chapterIndexStr = $(currentNode).attr('id').replace('chapter','');
                
//                CallBack('currentchapter= '+chapterIndexStr+' , percent= '+percent);
                
                return chapterIndexStr+','+percent;
            } else  {
                return '0,0';
            }
            
        }
    }
}
//MARK: - 获取当前页位置信息（用于保存书签信息）
function getCurrentBookMarkInfo(){
    var startInfo = getCurPercent(DirectionType);
    var strs= new Array(); //定义一数组
    strs=startInfo.split(","); //字符分割
    var startChapter = strs[0];
    var startPercent = strs[1];
    
    var endChapter;
    var endPercent;
    if (DirectionType ==0) {
        var endTop = document.body.scrollTop+screen.height;
        if (document.getElementsByClassName('chapTab').length>0) {
            var scrollH = endTop;
            var endNode ;
            for (var i=0;i<document.getElementsByClassName('chapTab').length;i++) {
                var chapterNode = document.getElementsByClassName('chapTab')[i];
                if (chapterNode.offsetTop>scrollH) {
                    if (i-1>=0) {
                        endNode = document.getElementsByClassName('chapTab')[i-1];
                    }
                    break;
                }
            }
            if (endNode != undefined) {
                var scrollOffsetH = scrollH-endNode.offsetTop;//相对当前章节的滚动距离
                percent = parseFloat(scrollOffsetH)/endNode.offsetHeight;
                var chapterIndexStr = $(endNode).attr('id').replace('chapter','');
                endChapter = chapterIndexStr;
                endPercent = percent;
            } else {
                endChapter = 0;
                endPercent = 0;
            }
        }
    } else {
        if (document.getElementsByClassName('chapTab').length>0) {
            var scrollW = document.body.scrollLeft+screen.width;
            var scrollPageIndex = Math.floor(parseInt(scrollW)/parseInt(screen.width));
            var scrollTop = scrollPageIndex*(screen.height)-40*scrollPageIndex;
            var endNode ;
            for (var i=0;i<document.getElementsByClassName('chapTab').length;i++) {
                var chapterNode = document.getElementsByClassName('chapTab')[i];
                if (chapterNode.offsetTop+chapterNode.offsetHeight>=scrollTop) {
                    endNode = document.getElementsByClassName('chapTab')[i];
                    break;
                }
            }
            
            if (endNode != undefined) {
                percent = parseFloat(scrollTop-endNode.offsetTop)/endNode.offsetHeight;
                var chapterIndexStr = $(endNode).attr('id').replace('chapter','');
                
                //                CallBack('currentchapter= '+chapterIndexStr+' , percent= '+percent);
                endChapter = chapterIndexStr;
                endPercent = percent;
            } else  {
                endChapter = 0;
                endPercent = 0;
            }
        }
    }
    //返回内容为当前标签页位置信息和屏幕内文字信息
    return startChapter+','+startPercent+','+endChapter+','+endPercent+','+getTextInColumn(0,0,screen.width,screen.height);
}
//MARK: - 用于js to oc 回调
function CallBack(message){
    window.webkit.messageHandlers.CallBack.postMessage(message);
}

//MARK: - 记录touchstart时的滚动坐标，用于滑动时做比较加载数据
var startx, starty;

function SetScrollByHandsToFalse(){
    IsScrollByHands = false;
}
//MARK: - 用于仿真
function SetScrollByHandsToTrue(){
    IsScrollByHands = true;
}
//MARK: - 用于仿真
//function saveCurrentLocation(){
//    IsScrollByHands = true;
//    startx = document.body.scrollLeft;
//    starty = document.body.scrollTop;
//}
//MARK: - 开始滚动的监听事件
function WindowHasScroll(){
    var curInfo = getCurPercent(DirectionType);
    var strs= new Array(); //定义一数组
    strs=curInfo.split(","); //字符分割
    CurrentChpater = document.getElementById('chapter'+strs[0]);
    CallBack('CurrentReadInfo//:'+curInfo+','+CurrentChpater.offsetHeight);
    
    if (IsScrollByHands != true) return;

    if (DirectionType == 0) {
        //上下模式
        if (starty<document.body.scrollTop) {
            //加载尾部
            if (document.body.scrollTop+screen.height>=CurrentChpater.offsetTop+CurrentChpater.offsetHeight) {
                var nextIndex = parseInt(strs[0])+1 ;
                var nextChapter = document.getElementById('chapter'+nextIndex);
                if (nextChapter!=undefined && $(nextChapter).children().length==0){
                    CallBack("向上！");
                    CallBack('loadMoreData//:'+'{"currentIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","startLoadIndex":"'+nextIndex+'","loadType":"T"}');
                }
            }
        }
        if (starty>document.body.scrollTop) {
            //下拉加载头部（此时应该判断当前章节是否为空）
            if (document.body.scrollTop<CurrentChpater.offsetTop+CurrentChpater.offsetHeight) {
                //加载头部
                var lastIndex = parseInt(strs[0])+1 ;
                var lastChapter = document.getElementById('chapter'+lastIndex);
                if (CurrentChpater!=undefined && $(CurrentChpater).children().length==0){
                    CallBack("向下！");
                    CallBack('loadMoreData//:'+'{"currentIndex":"'+lastIndex+'","startLoadIndex":"'+parseInt(strs[0])+'","loadType":"H"}');
                }
            }
        }

    } else {
//        CallBack('startx='+startx+' document.body.scrollLeft='+document.body.scrollLeft);
        //左右模式
        if (startx<document.body.scrollLeft) {
            //加载尾部
            var scrollW = document.body.scrollLeft;
            var scrollPageIndex = Math.floor(parseInt(scrollW)/parseInt(screen.width));
            if (scrollPageIndex*screen.height-40*scrollPageIndex <= CurrentChpater.offsetTop+CurrentChpater.offsetHeight){
                if ($(CurrentChpater).children().length==0) {
                    CallBack('loadMoreData//:'+'{"currentIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","startLoadIndex":"'+parseInt(strs[0])+'","loadType":"T"}');
                } else {
                    var nextIndex = parseInt(strs[0])+1 ;
                    var nextChapter = document.getElementById('chapter'+nextIndex);
                    if (nextChapter!=undefined && $(nextChapter).children().length==0) {
                        if (nextChapter!=undefined && $(nextChapter).children().length==0) {
                            CallBack('loadMoreData//:'+'{"currentIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","startLoadIndex":"'+nextIndex+'","loadType":"T"}');
//                            CallBack('加载更多');
                        }
                    }
                }
                
            }
            
        }
        if (startx>document.body.scrollLeft) {
            //加载头部
//            CallBack('index='+strs[0]+' percent='+strs[1]);
            var scrollW = document.body.scrollLeft;
            var scrollPageIndex = Math.floor(parseInt(scrollW)/parseInt(screen.width));
            if (scrollPageIndex*screen.height-40*scrollPageIndex <= CurrentChpater.offsetTop){
                if ($(CurrentChpater).children().length==0) {
                    CallBack('loadMoreData//:'+'{"currentIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","startLoadIndex":"'+(parseInt(strs[0])+1)+'","loadType":"H"}');
                } else {
                    var preIndex = parseInt(strs[0])-1 ;
                    var preChapter = document.getElementById('chapter'+nextIndex);
                    if (preChapter!=undefined && $(preChapter).children().length==0) {
                        CallBack('loadMoreData//:'+'{"currentIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","startLoadIndex":"'+preIndex+'","loadType":"H"}');
                    }
                }
                
            } else {
                if ($(CurrentChpater).children().length==0) {
                    CallBack('loadMoreData//:'+'{"currentIndex":"'+(parseInt(strs[0])+1)+'","startLoadIndex":"'+CurrentChpater.getAttribute('id').replace('chapter','')+'","loadType":"H"}');
                }
            }
        }
    }
}

//手指接触屏幕
document.addEventListener("touchstart", function(e) {
                          IsScrollByHands = true;
                          startx = document.body.scrollLeft;
                          starty = document.body.scrollTop;
//                          e.preventDefault();
//                          CallBack('将要开始拖动');
                          }, false);

//document.addEventListener('click', function(e){
//                          var $_ClickedNode = $(e.target);
//                          CallBack('click: '+$_ClickedNode.outerHTML);
//                          },false);
