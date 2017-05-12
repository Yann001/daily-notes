//配置信息
(function () {

    window.AppTips = AppTips = 0;
    window.__w = __w = $(window).width() > 900 ? 700 : $(window).width(); 
    window.__h = __h = $(window).height() - AppTips;
    window._bbLeft = _bbLeft = 0;
    window._bbTop = _bbTop = 0;
    


    //阅读器默认的界面配置参数
    var _cS = {
        bg: "#ffffff",                                                    //背景颜色
        asbg: "#ffffff",                                                  //答案遮挡板的背景颜色
        asbs: "3px 3px 5px #505050",                                      //
        matalogChBg: "#ffffff",                                           //目录的背景颜色
        flip_way: "roll",                                                  //翻页方式simulation
        simulation_bg: "#FFFFFF",//db9d2e                                 //仿真翻页时，页面背部的颜色
        lh: 1.5,                                                          //行高
        fc: "#333333",                                                    //字体颜色
        fcT: "#334b80",
        fcJDK: "#007874",
        fs: "18px",                                                       //字体大小
        brightness: "100",                                                //屏幕亮度
        moon_sum: "sun",                                                  //白天黑夜模式
        sound: 0,                                                         //语音朗读声音类别  0男 1女
        spd: "50"                                                         //语音朗读的语速
    };

    //阅读器界面配置参数的可选项
    var _eS = {
        //bgColor: ["#fefefe", "#e1d6c4", "#d5bc83", "#CCE8CF", "#cadeef"],//c6dfc8
        color: ["#000000", "#ffffff", "#F0F0F0 ", "#E8E8E8 ", "#E0E0E0 ", "#D8D8D8 ", "#D0D0D0 ", "#C8C8C8 ", "#C0C0C0 "],
        lineHeight: ["1.0", "1.2", "1.5", "1.8", "2.0"],
        //fontSize: ["0.8em", "1em", "1.1em", "1.2em", "1.3em", "1.4em", "1.5em", "1.6em", "1.7em"],
        fontSize: ["14px", "16px","18px", "20px", "22px", "24px", "26px", "28px", "30px", "32px", "34px"],
        mwSound: ["xiaoyu", "vixy"],
        moonBg: "#1d1d1f", //夜晚背景颜色
        moonFc: "#909499",  //夜晚字体颜色
        moonAsbg: "#1d1d1f",//夜晚答案遮挡DIV颜色
        moonAsbs: "3px 3px 5px #ffffff",
        moon_sun: ["moon", "sun"],
        moon_cataC: "#24223d",
        sound: [0, 1],//0 man  1 woman

        bgColor: {
            "itemName": "背景",
            "type": "ul",
            "classN": "SetBg",
            "list": [
                { type: "#ffffff", name: "", classN: "BtnBg01", matalogCheckBgColor: "#ffffff", asColor: "#ffffff", asBoxShadow: "3px 3px 5px #525050" },
                { type: "#faf5ed", name: "", classN: "BtnBg02", matalogCheckBgColor: "#ffffff", asColor: "#faf5ed", asBoxShadow: "3px 3px 5px #525050" },
                { type: "#ceebce", name: "", classN: "BtnBg03", matalogCheckBgColor: "#ffffff", asColor: "#ceebce", asBoxShadow: "3px 3px 5px #525050" },
                { type: "#d4daee", name: "", classN: "BtnBg04", matalogCheckBgColor: "#ffffff", asColor: "#d4daee", asBoxShadow: "3px 3px 5px #525050" },
                //{ type: "#cadeef", name: "", classN: "BtnBg05", matalogCheckBgColor: "#477296", asColor: "#BBCCDC", asBoxShadow: "3px 3px 5px #525050" },
            ]
        },

        flip_way: {
            "itemName": "阅读",
            "type": "ul",
            "classN": "SetFilp",
            "list": [
                { type: "simulation", name: "仿真", classN: "BtnSimulationFlip" },
                { type: "slide", name: "左右滑", classN: "BtnSlideFlip" },
                { type: "roll", name: "上下滑", classN: "BtnRollFlip" },
                //{ type: "series", name: "连续", classN: "BtnSeriesFlip" }   // wanghao  main.css
            ]
        },

        brightness: {
            "itemName": "亮度",
            "type": "range",
            "classN": "SetBrightness",
            "subBtnId": "BrightnessReduce",
            "addBtnId": "BrightnessIncrease",
            "rangeId": "BrightnessNumber",
            "max": 100,
            "min": 40,
            "step": 1,
            "value": 100
        },

        SizeFont: {
            "itemName": "字号",
            "type": "range",
            "classN": "SetFontsize",
            "subBtnId": "WordSizeReduce",
            "addBtnId": "WordSizeIncrease",
            "rangeId": "fontSize",
            "max": 10,
            "min": 0,
            "step": 1,
            "value": 1
        },

        note: {
            id: "conEbookNavA2",
            myId: "NoteA1",
            myName: "我的笔记",
            otherId: "NoteA2",
            otherName: "他人的笔记",
            list: {
                classN: "NoteList",
                myId: "conNoteA1",
                myClass: "MyNoteList",
                myInfoId: "myNote",
                otherId: "conNoteA2",
                otherClass: "OthersNoteList",
                otherInfoId: "otherNote",
            }
        },

        Feedback: {
            id: "conEbookNavA3",
            myId: "FeedbackA1",
            myName: "我的纠错",
            otherId: "FeedbackA2",
            otherName: "他人的纠错",
            list: {
                classN: "FeedbackList",
                myId: "conFeedbackA1",
                myClass: "MyNoteList",
                myInfoId: "myError",
                otherId: "conFeedbackA2",
                otherClass: "OthersNoteList",
                otherInfoId: "otherError",
            }
        },

        answerFlag: "【答案】",
        answerInfo: "查看答案",
        knowledgeFlag: "【考点】",
        analysisFlag: "【解析】",
        videoDefault: "/images/video_default.png",                                          //视频默认的背景图片
        liveDefault: "/images/Mobile_bg0084.jpg",                                           //直播默认的背景图片
        pdferrorImg: "/images/Mobile_bg0014_0.png",                                         //PDF类电子书图片在加载失败后显示的图片
        pdfLoadingImg: "/images/loading-1.gif",                                             //PDF类电子书图片在加载时显示的图片
        promptloginImg: "/images/prompt_login.jpg",                                         //我的笔记 和 我的纠错 界面提示登录的图片"

        specialStr: ["[3D电子书]","[3D题库]","[全套资料]","[考研全套]","[免费下载，送手机版]"]

    };

    //阅读器分页配置参数
    var _pag = {
        pageWidth: __w - 20,                                              //页面宽度
        pageHeight: __h - 20,                                             //页面高度
        textHeight: __h - 20,                                             //页面文本总高度
    };

    window._cS = _cS;
    window._eS = _eS;
    window._pag = _pag;

    window.webConfig = webConfig = {
        host: 'http://' + location.hostname + ":9420",
    };
})();

//touch事件
(function () {
    var touch = {
        isTouch: true,
        longPressT: 1000,
        clickT: 400,
        dblClickT: 500,
        slideT: 400,
        IOSt: 100,
        dblClickImgCount: 0,
        dblClickImgFun: null,
        touchFlag: false,
        clickFlag: false,
        moveFlag: false,
        startFlag: false,


        funName: '',
        fun: null,
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        addX: 0,
        addY: 0,
        angleX: 0,
        angleY: 0,
        X: 0,
        Y: 0,
        maxX: 0,
        maxY: 0,
        minDisplacement: 30,
        transform: {},
        counter: 0,
        refreshT: 50,
        defaultSize: 60,
        upDown: "down",
        simulationSetIntervalFun: null,
        backX: 50,
        backY: 20,
        resetXY: function () {
            this.X = 0; this.Y = 0, this.maxX = 0, this.maxY = 0;
        },
        setStartXY: function (event) {
            if (!this.isTouch) {
                this.startX = event.clientX;
                this.startY = event.clientY;
            } else {
                var touchE = event.targetTouches[0]; //获取第一个触点
                this.startX = Number(touchE.clientX); //触摸目标在可视窗口中的X坐标
                this.startY = Number(touchE.clientY); //触摸目标在可视窗口中的Y坐标
            }
        },
        setEndXY: function (event) {
            if (!this.isTouch) {
                this.endX = event.clientX;
                this.endY = event.clientY;
            } else {
                var touchE = event.changedTouches[0];
                this.endX = Number(touchE.clientX);
                this.endY = Number(touchE.clientY);
            }
        },
        setXY: function () {
            this.X = this.endX - this.startX;
            this.Y = this.endY - this.startY;
        },
        setMaxXY: function () {
            if (Math.abs(this.maxX) < Math.abs(this.X)) this.maxX = this.X;
            if (Math.abs(this.maxY) < Math.abs(this.Y)) this.maxY = this.Y;
        },

        isTouchDevice: function (callback) {
            try {
                document.createEvent("TouchEvent");
                console.log("The device supports the fingers......");
            } catch (e) {
                this.isTouch = false;
                touch.start = 'mousedown', touch.move = 'mousemove', touch.end = 'mouseup';
                layer.msg("该设备不支持手指触摸");
                console.log("The device not supports the fingers......");
            }
            if (callback) callback();
        },

        startTime: function (key) {
            var d = new Date();
            touch["startT" + key] = d.getTime();
        },
        getTime: function (key) {
            var d = new Date();
            touch["thisT" + key] = d.getTime();
            return touch["startT" + key] - touch["thisT" + key];
        },
        thisTime: function () {
            var d = new Date();
            return d.getTime();
        },
    };

    window.touch = touch;
})();

//朗读
function SC_Audio() {
    var SC_A = {
        URL: "http://webapi.openspeech.cn/",
        JSList: ['http://webapi.openspeech.cn/socket.io/socket.io.js', 'http://webapi.openspeech.cn/fingerprint.js', 'http://webapi.openspeech.cn/tts.min.js'],
        VCNList: ["xiaoyu", "xiaoyan", "Catherine", "henry", "vixy", "vixm", "vixl", "vixr", "vixyun"],

        cPageObj: null,                //当前页面的对象
        nPageObj: null,                //下一页的对象
        Pcontent_index: 0,             //当前合成语音的语句元素索引
        Pcontent: null,                //当前合成语音的语句对象
        Pcontent_c: null,              //当前语句对象的副本
        Pcontent_t: "",                //当前语句对象的文本
        PList: [],                     //需要合成语音的语句数组

        Psound_Script: false,           //合成语音需要的专用js是否加载的标志
        session: null,                 //用来合成语音的对象
        SCAudio: null,                 //音频播放器
        SCAudio_Status: "init",       //音频播放器的状态     playing 正在播放 / paused 暂停 / ended 停止播放
        playIndex: 0,                  //当前播放的语句索引

        sound: 0,                      //声音类别   0 男声  /  1 女声  
        spd: 50,                       //语音播放速度

        soundFlag: false,              //语音合成的执行状态
        api: null,                     //语音合成需要的授权参数
        content: "",

        synthesisCount: 1,             //设置合成了多少条语句后开始朗读
        synthesisOK: false,             //语音合成是否成功


        setTimeoutFun: null,           //语句合成的定时函数
        ssynthesisOKSetTimeoutFun: null,
        playEndSetTimeoutFun: null,
        gotoFlipPageTimeoutFun: null,
        setIntervalFun: null,


        currentUrl: "",
        currentDuration: 0,
        currentTime: 0,
        curreentPercentIndex: 0,
        curreentPercentTime: 0,




        //开始语音朗读
        showAudio: function (callback) {
            console.log("/********************************************************************/");
            console.log("Speech synthesis starting");
            console.log("/********************************************************************/");

            SC_SH.closeShakeDiv();
            SC_A.sound = _cS.sound;
            SC_A.spd = _cS.spd;
            SC_A.cPageObj = SC_R._cObj;
            SC_A.nPageObj = SC_R._nObj;

            SC_A.createAudioDiv();
            SC_A.soundFlag = true;
            SC_A.voiceSynthesisPrepare();

            SC_A.JudgeConnection();
            if (callback) callback();
        },

        //开始准备语音合成
        voiceSynthesisPrepare: function () {
            layer.msg("语音朗读连接中...", { icon: 16, time: 0 });
            if (!SC_A.Psound_Script) {
                SC_A.loadScript(SC_A.JSList, function () {
                    SC_A.Psound_Script = true;
                    SC_A.voiceSynthesisPrepare();
                });
            } else {
                var bl = false;
                if (!SC_A.session) {
                    try {
                        SC_A.session = new IFlyTtsSession({
                            'url': SC_A.URL,
                            'reconnection': true,
                            'reconnectionDelay': 30000
                        });
                        bl = true;
                    } catch (e) {
                        bl = false;
                    }
                } else {
                    bl = true;
                }

                if (bl) {
                    SC_A.readChapPage();
                    console.log("/********************************************************************/");
                    console.log("SC_A.PList have been prepared, the length:" + SC_A.PList.length);
                    console.log("/********************************************************************/");
                    //console.log(JSON.stringify(SC_A.PList));
                    SC_A.readP();
                } else {
                    layer.msg("语音朗读连接失败！");
                }

            }
        },

        //处理需要合成语音的页面，生成语句数组PList
        readChapPage: function () {
            console.log("Began to read the text...");
            var thisPage = SC_A.cPageObj;
            if (!SC_A.Pcontent_c) {
                SC_A.readPageP(thisPage);
            } else {
                //console.log(SC_A.Pcontent_c.prop("outterHTML"));
                if (SC_A.Pcontent_c.parent().attr("id") == thisPage.attr("id")) {
                    var thisId = thisPage.attr("id");
                    var thisChap = 0, thisPageNo = 1;
                    if (thisId) {
                        thisPageNo = thisId.substring(thisId.lastIndexOf("_") + 1);
                        thisId = thisId.substring(0, thisId.lastIndexOf("_"));
                        thisChap = thisId.substring(thisId.lastIndexOf("_p") + 2);
                    }
                    SC_A.aaa($(this), thisChap, thisPageNo, $(this).attr("data-noFirst") || false, $(this).attr("data-percent") || "1");

                    SC_A.Pcontent_c.nextAll().each(function () {
                        if ($(this).text() != "") {
                            SC_A.aaa($(this), thisChap, thisPageNo, $(this).attr("data-noFirst") || false, $(this).attr("data-percent") || "1");
                        }
                    });
                } else {
                    SC_A.readPageP(thisPage);
                }
            }
            SC_A.readPageP(SC_A.nPageObj);
            SC_A.Pcontent_c = null;
        },
        readPageP: function (pageObj) {
            var thisId = pageObj.attr("id");
            var thisChap = 0, thisPageNo = 1;
            if (thisId) {
                thisPageNo = thisId.substring(thisId.lastIndexOf("_") + 1);
                thisId = thisId.substring(0, thisId.lastIndexOf("_"));
                thisChap = thisId.substring(thisId.lastIndexOf("_p") + 2);
            }

            pageObj.find("p").each(function () {
                if ($(this).text() && $(this).html() != "&nbsp;") {
                    SC_A.aaa($(this), thisChap, thisPageNo, $(this).attr("data-noFirst") || false, $(this).attr("data-percent") || "1");
                }
            });
        },

        aaa: function (thisP, tC, tPN, tF, p) {
            p = parseFloat(p).toFixed(2);
            if (!tF) {
                var PList = {
                    Pcontent: [],
                    Url: "",
                    Duration: "",
                    chap: tC,
                    page: tPN,
                    compositionF: false,
                    percent: []
                };
                PList.Pcontent.push(thisP);
                PList.percent.push(p);
                SC_A.PList.push(PList);
            } else {
                if (SC_A.PList.length > 1) {
                    SC_A.PList[SC_A.PList.length - 1].Pcontent.push(thisP);
                    SC_A.PList[SC_A.PList.length - 1].percent.push(p);
                }
            }
        },

        //开始读取语句数组PList，把每一个元素合成独立的语音，补充其url和duration
        readP: function (callback) {
            if (SC_A.PList.length > 0) {
                if (SC_A.PList.length < SC_A.synthesisCount) SC_A.PList.length = SC_A.synthesisCount;
                for (var t = 0, t1 = SC_A.PList.length; t < t1; t++) {
                    if (SC_A.PList[t].Url == "" && !SC_A.PList[t].compositionF) {
                        SC_A.Pcontent = SC_A.PList[t].Pcontent[0];
                        SC_A.Pcontent_index = t;
                        break;
                    }
                }

                SC_A.disposePText(callback);
            } else {
                SC_A.voiceSynthesisStop();
                layer.msg("没有可以朗读的文字!");
            }
        },
        disposePText: function (callback) {
            var content = "";   //不能超过8192个字节
            var Pcontent_text = SC_A.Pcontent.text();
            //console.log("disposePText:" + Pcontent_text);
            //if (Pcontent_text.length > 4000) {
            //    for (var t = 0; t < Pcontent_text.length;) {
            //        content = Pcontent_text.substring(t, t + 4000);
            //        t += 4000;
            //        SC_A.getAccredit(content, callback);
            //    }
            //} else {
            //    SC_A.getAccredit(Pcontent_text, callback);
            //}
            SC_A.content = Pcontent_text;
            SC_A.getAccredit(callback);
        },

        //获取语音合成授权
        getAccredit: function (callback) {
            var timestamp = new Date().toLocaleTimeString();
            var expires = 60000;
            $.get(webConfig.host + "/handle/signature.ashx?timestamp=" + timestamp + "&expires=" + expires, function (res) {
                if (res) {
                    var json = JSON.parse(res);
                    SC_A.api = { 'appid': json.appid, 'timestamp': timestamp, 'expires': expires, 'signature': json.signature };
                    SC_A.voiceSynthesisStart(callback);
                }
            })
        },

        //语音合成开始
        voiceSynthesisStart: function (callback) {
            //console.log("voiceSynthesisStart:" + SC_A.content);
            if (!SC_A.content) {
                SC_A.voiceSynthesisStop();
                layer.msg("没有可以朗读的文字!");
                return false;
            }
            var appid = SC_A.api.appid || '';
            var timestamp = SC_A.api.timestamp || '';
            var expires = SC_A.api.expires || 10000;
            var signature = SC_A.api.signature || '';
            var vcn = SC_A.sound || 0;
            //vcn = 7;
            vcn = SC_A.VCNList[vcn];

            var spd = SC_A.spd || 50;
            spd = Math.abs(Math.floor(spd / 10));
            spd = spd > 10 ? 10 : spd;
            spd = 10;
            var params = {
                "params": "aue = speex-wb;7,vcn = " + vcn + ", ent = intp65, spd = " + spd + ", vol = 50, tte = utf8, caller.appid=" + appid + ",timestamp=" + timestamp + ",expires=" + expires,
                "signature": signature,
                "gat": "mp3"
            };
            //console.log(JSON.stringify(SC_A));
            //console.log(JSON.stringify(params));
            SC_A.session.start(params, SC_A.content, function (err, obj) {
                //console.log("err:" + err);
                if (err) {
                    layer.msg("亲，语音功能暂停");
                    console.log("语音合成发生错误，错误代码 ：" + err);
                } else {
                    if (obj.audio_url) {
                        var audioUrl = SC_A.URL + obj.audio_url;
                        var duration = obj.duration;
                        //console.log(SC_A.Pcontent_index + "......" + audioUrl + ".............." + duration);

                        if (SC_A.PList[SC_A.Pcontent_index]) {
                            SC_A.PList[SC_A.Pcontent_index].Url = audioUrl;
                            SC_A.PList[SC_A.Pcontent_index].Duration = duration;
                            SC_A.PList[SC_A.Pcontent_index].compositionF = true;
                        }
                        console.log("/********************************************************************/");
                        //console.log("Plist.push:......chap:" + SC_A.PList[SC_A.Pcontent_index].chap + "......page:" + SC_A.PList[SC_A.Pcontent_index].page + "......index:" + SC_A.Pcontent_index);
                        console.log("/********************************************************************/");

                        if (SC_A.SCAudio_Status == "init" && SC_A.Pcontent_index + 1 >= SC_A.synthesisCount) SC_A.SCAudioPlay();

                        //继续合成下一个P
                        if (SC_A.Pcontent_index < SC_A.PList.length - 1) {
                            SC_A.setTimeoutFun = setTimeout(SC_A.readP, 1000);
                        }
                    }
                }
                if (callback) callback();
            }, function (message) {
                //message = 'onStop' 录音停止
                //message = 'onEnd'  本次会话结束
            });
        },

        //重设了语音合成参数，再重新开始语音合成
        voiceSynthesisRestart: function () {
            SC_A.voiceSynthesisStop();
            SC_A.showAudio();
        },

        //语音合成结束
        voiceSynthesisStop: function () {
            if (!SC_A.session) return false;
            SC_A.session.stop();
            SC_A.session = null;

            clearTimeout(SC_A.setTimeoutFun);
            clearTimeout(SC_A.ssynthesisOKSetTimeoutFun);
            clearTimeout(SC_A.playEndSetTimeoutFun);
            clearInterval(SC_A.setIntervalFun);
            SC_A.SCAudioPause();
            SC_A.SCAudioEmpty();
            if (SC_A.Pcontent_c) SC_A.Pcontent_c.html(SC_A.Pcontent_t);
            SC_A.Pcontent = null;
            //SC_A.Pcontent_c = null;
            SC_A.Pcontent_t = "";
            SC_A.PList.splice(0, SC_A.PList.length);
            SC_A.Pcontent_index = 0;
            SC_A.playIndex = 0;
            SC_A.soundFlag = false;
            SC_A.synthesisOK = false;
            SC_A.SCAudio_Status = "init";



            //保存语音设置到本地
            _cS.sound = SC_A.sound;
            _cS.spd = SC_A.spd;
            SC_R.saveUI();
            console.log("/********************************************************************/");
            console.log("voiceSynthesisStop  stop");
            console.log("/********************************************************************/");
        },

        //音频开始播放
        SCAudioPlay: function () {
            //console.log(JSON.stringify(SC_A.PList));
            //return false;
            layer.closeAll();
            SC_A.SCAudioReset();
            if (SC_A.SCAudio_Status == "paused") {
                SC_A.SCAudio_Status = "playing";
                SC_A.SCAudio.play();

                if (SC_A.PList[SC_A.playIndex].percent.length > 1) {
                    SC_A.bbb(SC_A.curreentPercentIndex);
                } else {
                    SC_A.playEndSetTimeoutFun = setTimeout(function () {
                        SC_A.SCAudioEnd();
                    }, (parseFloat(SC_A.Duration) - parseFloat(SC_A.currentTime)) * 1000);
                }

            } else {
                SC_A.curreentPercentTime = 0;
                if (SC_A.PList.length > 0 && SC_A.playIndex < SC_A.PList.length) {
                    var obj = SC_A.PList[SC_A.playIndex];
                    //console.log(JSON.stringify(obj));
                    if (obj && obj.compositionF) {
                        //准备朗读语音合成成功的语句

                        //判断是否需要翻页
                        if (obj.chap == (SC_R._cI + 1) || (obj.chap == SC_R._cI && obj.page == (SC_R._cP + 1))) {
                            console.log(obj.chap + "......" + obj.page + ".......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......." + SC_R._cI + "........." + SC_R._cI);
                            SC_A.gotoFlipPage();
                        }

                        //是否有语音url   有则直接播放   没有则跳过到下一句
                        if (obj.Url != "" && obj.Duration != "") {
                            SC_A.drawLine(obj.Pcontent[0]);
                            setAudio(obj);
                        } else {
                            SC_A.playIndex++;
                            if (SC_A.playIndex < SC_A.PList.length) {
                                SC_A.SCAudioPlay();
                            }
                        }
                    } else {
                        //没有合成成功的语音，则等待
                        console.log("/********************************************************************/");
                        console.log("Waiting for speech synthesis");
                        console.log("/********************************************************************/");

                        SC_A.SCAudio_Status = "ended";
                        layer.msg("语音朗读连接中...", { icon: 16, time: 0 });
                        SC_A.setIntervalFun = setInterval(function () {
                            var obj = SC_A.PList[SC_A.playIndex];
                            if (obj && obj.compositionF) {
                                clearInterval(SC_A.setIntervalFun);
                                SC_A.SCAudioPlay();
                            }
                        }, 1000);

                        SC_A.JudgeConnection();
                    }


                    function setAudio(obj) {
                        layer.closeAll();
                        SC_A.SCAudio.src = obj.Url;
                        SC_A.SCAudio.play();
                        SC_A.synthesisOK = true;
                        //SC_A.SCAudio.addEventListener('ended', SCAudioEnd, false);
                        SC_A.SCAudio_Status = "playing";

                        SC_A.Duration = !obj.Duration ? 2 : parseFloat(obj.Duration) + 1;
                        SC_A.Url = obj.Url;

                        console.log("/********************************************************************/");
                        console.log("Start playing the audio......" + SC_A.Url + "......" + SC_A.Duration + "......" + SC_A.playIndex);
                        console.log("/********************************************************************/");


                        //判断一个段落是否被拆开,是的话，在一定的时间里面翻页
                        if (obj.percent.length > 1) {
                            SC_A.bbb(0);

                        } else {
                            //模拟语音播放结束
                            SC_A.playEndSetTimeoutFun = setTimeout(function () {
                                SC_A.SCAudioEnd();
                            }, parseFloat(SC_A.Duration) * 1000);
                        }
                    }
                } else {
                    SC_A.voiceSynthesisStop();
                    layer.msg("没有可以朗读的文字!");
                }
            }
        },

        bbb: function (n) {
            SC_A.curreentPercentIndex = n;
            SC_A.gotoFlipPageTimeoutFun = setTimeout(function () {
                if (SC_A.playIndex <= SC_A.PList.length - 1) {
                    if (n < SC_A.PList[SC_A.playIndex].Pcontent.length - 1) {
                        SC_A.gotoFlipPage();
                        SC_A.drawLine(SC_A.PList[SC_A.playIndex].Pcontent[n + 1]);
                        SC_A.bbb(n + 1);
                    } else {
                        SC_A.SCAudioEnd();
                    }
                }
            }, (parseFloat(SC_A.Duration) * parseFloat(SC_A.PList[SC_A.playIndex].percent[n]) - parseFloat(SC_A.curreentPercentTime)) * 1000);
        },

        //音频暂停播放
        SCAudioPause: function () {
            if (!SC_A.SCAudio) return false;
            SC_A.SCAudio.pause();
            SC_A.SCAudio_Status = "paused";
            clearTimeout(SC_A.playEndSetTimeoutFun);
            clearTimeout(SC_A.gotoFlipPageTimeoutFun);
            SC_A.currentTime = SC_A.SCAudio.currentTime;
            var p = 0;
            for (var a = 0; a < SC_A.curreentPercentIndex; a++) {
                p += SC_A.PList[SC_A.playIndex].percent[a];
            }
            SC_A.curreentPercentTime = SC_A.currentTime - (parseFloat(SC_A.Duration)) * p;
        },

        //音频播放结束
        SCAudioEnd: function () {
            if (!SC_A.SCAudio) return false;
            SC_A.SCAudio_Status = "ended";
            SC_A.playIndex++;
            SC_A.SCAudioPlay();
        },

        //生成新的音频对象
        SCAudioReset: function () {
            if (SC_A.SCAudio) return false;
            SC_A.SCAudio = new Audio();
            SC_A.SCAudio_Status = "ended";
        },

        //清空音频对象
        SCAudioEmpty: function () {
            SC_A.SCAudio = null;
            SC_A.SCAudio_Status = "ended";
        },

        //生成语音控制div
        createAudioDiv: function () {
            if ($("#audioDiv").length > 0) return false;
            var $div1 = $('<div>').addClass("audioDiv").attr("id", "audioDiv");

            //var html = '<div class="TopSoundBar Rhead" id="TopSoundBar">';
            //html += '   <a href="#" class="BtnBack" id="BtnBack_sound"></a>';
            //html += '   <a href="#" class="soundBtn" id="playAudioBtn" style="display:none">继续朗读</a>';
            //html += '   <a href="#" class="soundBtn" id="pauseAudioBtn">暂停朗读</a>';
            //html += '  </div>';

            var html = '';
            html += ' <div class="BotSoundBar" id="BotSoundBar">';
            //html += '    <div class="SoundSet">语音设置</div>';
            html += '   <div class="SoundItem">';
            //html += '     <div class="Tag">语速：</div>';
            html += '   <div class="Tag Slow">慢</div>';
            html += '  <div class="Tag Fast">快</div>';
            html += '  <div class="Progress">';
            html += '     <input type="range" name="points" id="spdPoints" class="ProgressBar" max="100" min="1" step="1" data-role="none" />';
            html += '  </div>';
           
            html += ' </div>';
            html += ' <div class="SoundItem">';
            //html += '    <div class="Tag">发音：</div>';
            html += '  <div class="BtnContaienr"><a id="mBtn" class="Btn Selected">男声</a><a id="wBtn" class="Btn">女声</a></div>';
            html += ' </div>';
            html += '   <a href="#" class="BtnSoundExit" id="BtnBack_sound">退出朗读模式</a>';
            html += ' </div>';

            $div1.html(html);
            $("#EbookRead").append($div1);
            SC_A.setSound();

            //停止语音播放
            $("#BtnBack_sound").bind("click", function (event) {
                SC_A.stopEvent(event);
                SC_A.exitAudio();
            });

            //继续语音播放
            $("#playAudioBtn").bind("click", function (event) {
                SC_A.stopEvent(event);
                $("#playAudioBtn").hide();
                $("#pauseAudioBtn").show();
                SC_A.SCAudioPlay();
            });

            //暂停语音播放
            $("#pauseAudioBtn").bind("click", function (event) {
                SC_A.stopEvent(event);
                $("#playAudioBtn").show();
                $("#pauseAudioBtn").hide();
                SC_A.SCAudioPause();
            });

            //声音语速滑动控制
            $("#spdPoints").bind("change", function (event) {
                SC_A.stopEvent(event);
                var val = document.getElementById("spdPoints").value;
                if (val < 0) val = 0;
                if (val > 100) val = 100;
                if (SC_A.spd != val) {
                    SC_A.spd = val;
                    SC_A.voiceSynthesisRestart();
                }
                return;
            });

            //发音   男声
            $("#mBtn").bind("click", function (event) {
                SC_A.stopEvent(event);
                if (!$(this).hasClass("Selected")) {
                    SC_A.sound = 0;
                    SC_A.setSound();
                    SC_A.voiceSynthesisRestart();
                }
                return;
            });

            //发音   女声
            $("#wBtn").bind("click", function (event) {
                SC_A.stopEvent(event);
                if (!$(this).hasClass("Selected")) {
                    SC_A.sound = 1;
                    SC_A.setSound();
                    SC_A.voiceSynthesisRestart();
                }
                return;
            });
        },

        //退出语音朗读
        exitAudio: function () {
            if (SC_A.soundFlag) {
                $("#TopSoundBar").slideUp();
                $("#BotSoundBar").slideUp();
                layer.msg("语音阅读停止!");
                //语音合成停止
                SC_A.voiceSynthesisStop();
            }
        },

        //判断语音连接是否失败
        JudgeConnection: function () {
            SC_A.ssynthesisOKSetTimeoutFun = setTimeout(function () {
                if (!SC_A.synthesisOK) {
                    layer.closeAll();
                    layer.msg("语音朗读连接失败!", function () {
                        SC_A.exitAudio();
                    });
                } else {
                    clearTimeout(SC_A.ssynthesisOKSetTimeoutFun);
                }
            }, 15 * 1000);
        },

        //语音朗读时，同步划线
        drawLine: function (pcontent) {
            if (SC_A.Pcontent_c) SC_A.Pcontent_c.html(SC_A.Pcontent_t);
            SC_A.Pcontent_c = pcontent;

            if (SC_A.Pcontent_c.find("*").length != 0) SC_A.Pcontent_t = SC_A.Pcontent_c.html();
            else SC_A.Pcontent_t = SC_A.Pcontent_c.text();

            SC_A.Pcontent_c.html("<span style='border-bottom: 2px solid #f00;'>" + SC_A.Pcontent_t + "</span>");
        },

        //语音播放自动翻页
        gotoFlipPage: function () {
            SC_R.flipPage(null, __w, __h, function () {
                if (SC_A.nPageObj != SC_R._nObj) {
                    SC_A.nPageObj = SC_R._nObj;
                }
                //翻页之后继续读取下一页面的内容并合成语音
                setTimeout(function () {
                    SC_A.readPageP(SC_A.nPageObj);
                    SC_A.readP();
                }, 1000);
            });
        },

        setSound: function () {
            if (SC_A.sound == 0) {
                $("#mBtn").addClass("Selected");
                $("#wBtn").removeClass("Selected");
            } else {
                $("#mBtn").removeClass("Selected");
                $("#wBtn").addClass("Selected");
            }
            $("#spdPoints").val(SC_A.spd);
        },
        stopEvent: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        loadScript: function (arr, callback) {
            var len = arr.length, num = 0, ref = null;
            if (len == 0) {
                return false;
            }

            for(var i in arr){
                ///创建节点
                ref = document.createElement('script');
                ref.setAttribute('type', 'text/javascript');
                ref.setAttribute('src', arr[i]);

                if(typeof ref != 'undefined'){
                    //将创建的节点插入document
                    document.getElementsByTagName('body')[0].appendChild(ref);
                    ref.onload = ref.onreadystatechane = function(){
                        if(ref.readyState && ref.readyState!='loaded' && ref.readyState!='complete'){
                            return;
                        }
                        num = num + 1;
                        //判断加载的个数是否等于总个数，执行回调
                        if(num==len && typeof callback === 'function'){
                            callback();
                        }
                    }
                }
            }
        }
    };
    return SC_A;
};
var SC_A = null;

//圣才视频
function SC_Video() {
    var SC_V = {
        title: "圣才视频",
        replaceTitle: "",
        isbuy: "Y",
        freeNo: 5,
        __w: 0,
        __h: 0,
        bbLeft: 0,
        splitT: 120,                 //默认每一段视频的时长
        videoTotalT: 123,            //整个视频的总时长
        sliceCount: 3,               //整个视频被切分成的段数
        videoUID: "",                //原视频的uid
        videoSrc: "",                //原视频的src
        srcData: {},                 //分段视频的详细信息
        currentSlice: 1,             //当前分段视频的序号
        currentVideo: null,          //当前分段视频的对象
        currentRealDuration: 0,      //当前分段视频的真实时长，通过video的durationchange获取
        currentDuration: 0,          //当前分段视频的时长
        currentStartT: 0,            //当前分段视频的开始时间
        currentEndT: 0,              //当前分段视频的结束时间
        currentVolume: 0.8,          //当前分段视频的音量
        currentT: 0,                 //当前分段视频的播放时间
        prevSlice: 0,                //前一段视频的序号
        videoW: 300,                 //video的宽度
        videoH: 150,                 //video的高度
        parentDivID: "SCPlayer",     //video所在DIV的ID
        initFlag: false,             //初始化的标识
        seekingF: false,             //是否正在跳转的标记
        preloadT: 1 * 60,            //提前加载下一个视频的时间
        endF: false,                 //整个视频是否播放完的标记
        fixUrl: true,
        ratio: 16 / 9,               //视频长宽比
        gotoSliceNo: 0,              //将要跳转的视频分段序号
        gotoTime: 0,                 //将要跳转的视频时间

        fadeFun: null,               //播放控件定时隐藏函数
        fadeT: 5000,                 //播放控件多长时间后自动隐藏



        AJAX: function (parm, callback) {
            if (SC_V.isbuy == "N") {
                if (parm.sliceNo > SC_V.freeNo) {
                    return false;
                }
            }
            var urlData = null;
            $.ajax({
                async: true,
                url: webConfig.host + "/handle/SplitVideo.ashx",
                data: { VideoUID: SC_V.videoUID, sliceNo: parm.sliceNo },
                success: function (res) {
                    console.log(res);
                    var urlHead = "";
                    if (res != null && res != "") {
                        var arr = res.split("|");
                        if (arr.length >= 5) {
                            SC_V.videoTotalT = arr[4];
                            var sliceCount = 0;
                            if (arr[4] != "" && arr[4] != 0) {
                                SC_V.sliceCount = Math.floor(parseFloat(SC_V.videoTotalT) / parseFloat(SC_V.splitT)) + 1;
                            }
                            urlData = { "url": arr[0], "startT": arr[1], "endT": arr[2], "sliceNo": parseInt(arr[3]), "realDuration": 0, "canplay": false };
                            urlHead = arr[0];
                            urlHead = urlHead.substring(0, urlHead.lastIndexOf("/") + 1);
                        } else {
                            if (res.indexOf("ok") > -1) {
                                SC_V.videoTotalT = 0;
                                SC_V.sliceCount = 1;
                                var a = "http://videofms.100xuexi.com", b = "rtmpt://videofms.100xuexi.com/xxv/mp4:streams";
                                if (SC_V.videoSrc.indexOf(b) >= 0) SC_V.videoSrc = a + SC_V.videoSrc.substring(b.length);
                                urlData = { "url": SC_V.videoSrc, "startT": 0, "endT": 0, "sliceNo": 1, "realDuration": 0, "canplay": false };
                            } else {
                                SC_V.error();
                            }
                        }
                    } else {
                        SC_V.error();
                    }
                    if (parm.flag == "init") {
                        if (urlData) {
                            for (var t = 1; t <= SC_V.sliceCount; t++) {
                                var startT = 0, endT = 0, URL = "";
                                if (SC_V.fixUrl) {
                                    startT = (t - 1) * SC_V.splitT;
                                    endT = t * SC_V.splitT;
                                    if (t == SC_V.sliceCount) endT = SC_V.videoTotalT;
                                    url = urlHead + t + ".mp4";
                                }
                                SC_V.srcData[t] = { "url": url, "startT": startT, "endT": endT, "sliceNo": t, "realDuration": 0, "canplay": false };
                            }
                            SC_V.srcData[urlData.sliceNo].url = urlData.url;
                            SC_V.addVideo(urlData.sliceNo);
                            SC_V.setCurrentVideo(urlData.sliceNo);
                            if (callback) callback();
                        } else {
                            SC_V.error();
                        }
                    } else {
                        if (urlData) {
                            SC_V.srcData[urlData.sliceNo].url = urlData.url;
                            SC_V.srcData[urlData.sliceNo].startT = urlData.startT;
                            SC_V.srcData[urlData.sliceNo].endT = urlData.endT;
                            SC_V.addVideo(urlData.sliceNo);
                            if (parm.flag == "play") {
                                if (!SC_V.getObj(SC_V.getId(parm.sliceNo))) {
                                    addVideo(parm.sliceNo);
                                }
                                SC_V.playNextVideo(parm, callback);
                            }
                            if (callback) callback();
                        } else {
                            console.log("adddddddddddddddddddd............................");
                        }
                    }
                },
                error: function () {
                    SC_V.error();
                }
            });
        },
        isHTML5: function () {
            return !!document.createElement('video').canPlayType;
        },
        initVideo: function (parm, callback) {
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", SC_V.orientation, false);
            if (!parm) return false;
            if (parm.w) {
                this.videoW = parm.w;
                this.videoH = this.videoW / this.ratio;
            }
            if (parm.divID) this.parentDivID = parm.divID;

            this.createHtml(function () {
                touch.isTouchDevice(SC_V.bindEvent);
                if (SC_V.isHTML5()) {
                    this.currentSlice = 1;
                    if (SC_V.isAndroid()) {
                        SC_V.noHtml5(callback);
                    } else {
                        SC_V.orientation();
                        if (callback) callback();
                        $("#scvVideoContent").empty();
                        if (parm.url) {
                            SC_V.videoSrc = parm.url;
                            console.log(SC_V.videoSrc);
                            SC_V.videoUID = parm.url.substring(parm.url.lastIndexOf("/") + 1, parm.url.lastIndexOf("."));
                            SC_V.AJAX({ sliceNo: 1, flag: "init", time: 0 }, function () {
                                SC_V.initFlag = true;
                                SC_V.setTotalTime();
                                $("#" + SC_V.getId(SC_V.currentSlice)).one("progress", function () {
                                    var pro = 0;
                                    var a1 = setInterval(function () {
                                        pro++;
                                        $("#scv_progressText").text(pro + "%");
                                        if (pro == 100) {
                                            clearInterval(a1);
                                            $("#scv_progress").hide();
                                            SC_V.play();
                                        }
                                    }, 10);
                                });

                                $(".video_top").css("position", "fixed");
                                SC_V.fadeFun = setTimeout(function () {
                                    $("#scv_control_bar").fadeOut("slow");
                                }, SC_V.fadeT);
                            });
                        } else {
                            SC_V.error();
                        }
                    }
                } else {
                    SC_V.noHtml5(callback);
                }
            });
        },
        resetVideo: function () {
            this.pause();
            this.videoTotalT = 0;
            this.sliceCount = 1;
            this.srcData = {};
            this.currentSlice = 1;
            this.currentVideo = null;
            this.currentDuration = 0;
            this.currentStartT = 0;
            this.currentEndT = 0;
            this.videoW = 0;
            this.videoH = 0;
            this.endF = false;
            this.seekingF = false;
            $("#scvVideoContent").empty();
            $("#bigPlayBtn").hide();
            $("#rerunBtn").hide();
            $("#scv_v_load").show();
            $("#scv_error").hide();
            $("#scv_progress").hide();
            $("#scv_progressText").text("0%");
            $("#progressT").html("00:00");
            $("#scv_play_progress").width("0%");
            $("#scv_seek_handle").css("left", "0%");
            this.initFlag = false;
        },
        addVideo: function (sliceNo) {
            var wp = "x-webkit-airplay='true' webkit-playsinline='true'";
            var display = "block";
            if (this.currentSlice != sliceNo) display = "none";
            var $video = $("<video " + wp + ">").attr({ "id": this.getId(sliceNo), "width": "100%", "height": "100%", "volume": this.currentVolume, "src": this.srcData[sliceNo].url });
            //x-webkit-airplay
            $video.one("canplaythrough", function () {
                SC_V.srcData[sliceNo].canplay = true;
            });
            $video.bind("loadedmetadata", function () {
                SC_V.loadedmetadata(sliceNo);
            });
            var $div;
            if ($("#video" + sliceNo).length > 0) $div = $("#video" + sliceNo).empty();
            else $div = $('<div>').addClass("scv-video-content").attr({ "id": "video" + sliceNo, "name": "video", "style": "z-index:1000;display:" + display + ";" });
            $div.append($video);
            $("#scvVideoContent").append($div);
            $video.load();
        },
        setCurrentVideo: function (c) {
            if (c > SC_V.sliceCount) return false;
            if (SC_V.currentSlice == c && SC_V.initFlag) return false;
            if (SC_V.currentSlice != c) SC_V.prevSlice = SC_V.currentSlice;
            SC_V.currentSlice = c;
            SC_V.currentVideo = SC_V.getObj(SC_V.getId(c));
            if (!SC_V.srcData[c]) SC_V.srcData[c] = {};
            SC_V.currentStartT = SC_V.srcData[c].startT;
            SC_V.currentEndT = SC_V.srcData[c].endT;
            SC_V.currentDuration = SC_V.currentEndT - SC_V.currentStartT;

            if ($("#" + SC_V.getId(c)).attr("data-fun") != "true") {
                $("#" + SC_V.getId(c)).bind({
                    timeupdate: function () { SC_V.setCurrentTime(); },
                    error: function () { SC_V.error(); }
                }).one("ended", function () { SC_V.ended(); }).attr("data-fun", "true").parent().css("z-index", "2000");
            }
            $("#" + SC_V.parentDivID).find("video").not($("#" + SC_V.getId(c))).attr("data-fun", "false").unbind("timeupdate").unbind("ended").each(function () {
                $(this).parent().css("z-index", "1000");
            });
        },
        getCurrentVideo: function (id) {
            if (!id) id = SC_V.currentSlice;
            return SC_V.getObj(SC_V.getId(id));
        },
        getVideo: function (parm, callback) {
            if (SC_V.isbuy == "N") {
                if (parm.sliceNo > SC_V.freeNo) {
                    return false;
                }
            }

            if (parm.sliceNo <= SC_V.sliceCount) {
                if (SC_V.srcData[parm.sliceNo].url != "") {
                    if (!SC_V.getObj(SC_V.getId(parm.sliceNo))) {
                        SC_V.addVideo(parm.sliceNo);
                    }
                    if (parm.flag == "play") {
                        SC_V.playNextVideo(parm, callback);
                    }
                } else {
                    SC_V.AJAX(parm, function () { });
                }
            }
        },
        playNextVideo: function (parm, callback) {
            if (!SC_V.gotoBuy(parm.sliceNo)) return false;

            if (parm.sliceNo > SC_V.sliceCount) return false;
            //判断需要播放的分段视频是否添加到新的video上面
            if (!SC_V.getObj(SC_V.getId(parm.sliceNo))) {
                SC_V.addVideo(parm.sliceNo);
            }
            $("#scv_v_load").show(function () {
                SC_V.seekingF = true;
                SC_V.getCurrentVideo().pause();
                SC_V.setCurrentVideo(parm.sliceNo);
                var time = 0;
                if (parm.time) time = Math.abs(parm.time - SC_V.currentStartT);
                SC_V.getCurrentVideo().play();
                SC_V.getCurrentVideo().pause();
                if (SC_V.getCurrentVideo()) SC_V.getCurrentVideo().currentTime = time;
                SC_V.seeked();
                if (callback) callback();
            });
        },
        getProgressT: function (c) {
            if (!c) c = SC_V.currentSlice;
            var obj = SC_V.getObj(SC_V.getId(c));
            var len = obj.buffered.length;
            var end = 0;
            try {
                end = obj.buffered.end(0) || 0;
                end = parseInt(end * 1000 + 1) / 1000;
            } catch (e) { }
            return end;
        },
        play: function () {
            console.log("play");
            $("#bigPlayBtn").hide();
            $("#rerunBtn").hide();
            $("#scv_gotobuy").hide();
            $("#playBtn").removeClass().addClass("pauseBtn");
            if (SC_V.getCurrentVideo()) SC_V.getCurrentVideo().play();
        },
        pause: function () {
            console.log("pause");
            $("#bigPlayBtn").show();
            $("#playBtn").removeClass().addClass("playBtn");
            if (SC_V.getCurrentVideo()) SC_V.getCurrentVideo().pause();
        },
        togglePlay: function (e) {
            SC_V.stopEvent(e);
            console.log("play or pause.........");
            if (SC_V.endF) {
                SC_V.rePlay(e);
            } else {
                var state = SC_V.getCurrentVideo().paused;
                if (state) SC_V.play();
                else SC_V.pause();
            }
        },
        rePlay: function (e) {
            SC_V.stopEvent(e);
            SC_V.seeking();
            $("#scv_play_progress").width("0%");
            $("#scv_seek_handle").css("left", "0%");
            $("#progressT").html("00:00");
            SC_V.endF = false;
            SC_V.getVideo({ sliceNo: 1, flag: "play", time: this.srcData["1"].startT }, function () { });
        },
        seeking: function () {
            console.log("seeking");
            SC_V.seekingF = true;
            $("#bigPlayBtn").hide();
            $("#rerunBtn").hide();
            $("#playBtn").removeClass().addClass("pauseBtn");
            $("#scv_v_load").show(function () {
                SC_V.getCurrentVideo().pause();
            });
        },
        seeked: function () {
            console.log("seeked");
            $("#scv_v_load").show(function () {
                if (SC_V.srcData[SC_V.currentSlice].canplay) {
                    $("#" + SC_V.getId(SC_V.currentSlice)).unbind("ended");
                    SC_V.getCurrentVideo().play();
                    setTimeout(function () {
                        SC_V.getCurrentVideo().pause();
                        SC_V.play();
                        $("#" + SC_V.getId(SC_V.currentSlice)).one("ended", function () { SC_V.ended(); });
                        $("#" + SC_V.getId(SC_V.currentSlice)).parent().show();
                        $("#" + SC_V.getId(SC_V.prevSlice)).parent().hide();
                        SC_V.seekingF = false;
                        SC_V.emptyVideo();
                    }, 100);
                } else {
                    SC_V.getCurrentVideo().play();
                    $("#" + SC_V.getId(SC_V.currentSlice)).one("canplaythrough", function () {
                        SC_V.getCurrentVideo().pause();
                        SC_V.srcData[SC_V.currentSlice].canplay = true;
                        SC_V.seeked();
                    });
                }
            });
        },
        ended: function () {
            if (SC_V.currentSlice == SC_V.sliceCount) {
                $("#rerunBtn").show();
                $("#playBtn").removeClass().addClass("playBtn");
                SC_V.endF = true;
            } else {
                var c = SC_V.currentSlice;
                if (!SC_V.gotoBuy(c + 1)) return false;

                $("#scv_v_load").show(function () {
                    SC_V.playNextVideo({ sliceNo: c + 1, time: SC_V.srcData[c + 1].startT }, function () { });
                });
            }
        },
        loadedmetadata: function (n) {
            SC_V.srcData[n].realDuration = SC_V.getObj(SC_V.getId(n)).duration;
            if (SC_V.sliceCount == 1) {
                SC_V.videoTotalT = SC_V.srcData[SC_V.currentSlice].realDuration;
                SC_V.setTotalTime();
            }
            //console.log(JSON.stringify(SC_V.srcData));
        },
        emptyVideo: function () {
            $("#scvVideoContent div[name='video']").each(function () {
                var thisID = $(this).attr("id");
                if (!(thisID == "video" + SC_V.currentSlice || thisID == "video" + SC_V.prevSlice)) {
                    $(this).remove();
                }
            });
        },
        setTotalTime: function () {
            $("#totalT").html(SC_V.formatVideoT(this.videoTotalT));
        },
        setCurrentTime: function () {
            if (SC_V.seekingF) return false;
            var start = SC_V.currentStartT;
            var s = start;
            var currentDuration = SC_V.currentDuration;
            var currentTime = 0;
            if (!SC_V.getCurrentVideo()) return false;
            currentTime = SC_V.getCurrentVideo().currentTime;
            if (Math.abs(currentTime - SC_V.currentT) < 1) return false;
            SC_V.currentT = currentTime;
            $("#scv_v_load").hide();

            s = parseFloat(currentTime) + parseFloat(start);
            if (s >= SC_V.videoTotalT) {
                s = SC_V.videoTotalT;
            }
            if (SC_V.videoTotalT == 0) return false;

            if (SC_V.isbuy == "N") {
                if (s >= SC_V.freeTime) {
                    $("#scv_v_load").hide();
                    $("#scv_progress").hide();
                    $("#scv_gotobuy").show();
                    SC_V.seekingF = false;
                    SC_V.pause();
                    return false;
                }
            }

            var pro = parseFloat(s) / parseFloat(SC_V.videoTotalT) * 100;
            $("#progressT").html(SC_V.formatVideoT(Math.round(s)));
            $("#scv_play_progress").width(pro + "%");
            $("#scv_seek_handle").css("left", pro + "%");
            console.log("currentTime");
            if (SC_V.currentSlice < SC_V.sliceCount) {
                if (!SC_V.getObj(SC_V.getId(SC_V.currentSlice + 1))) {
                    if (currentDuration - currentTime > 0 && currentDuration - currentTime < SC_V.preloadT) {
                        SC_V.getVideo({ sliceNo: SC_V.currentSlice + 1, flag: "" }, function () { });
                    }
                }
            }
        },
        setSlider: function (e) {
            SC_V.stopEvent(e);
            SC_V.seeking();
            SC_V.slideProgress();
            SC_V.getVideo({ sliceNo: SC_V.gotoSliceNo, flag: "play", time: SC_V.gotoTime }, function () { });
        },
        slideProgress: function () {
            var ssPostion = SC_V.getPosition(SC_V.getObj("scv_slider"));
            var sliderW = SC_V.__w;
            if (SC_V.browserRedirect() == "phone") sliderW = window.innerWidth;
            var pro = Math.abs((parseFloat(touch.endX) - parseFloat(ssPostion.left)) / parseFloat(sliderW) * 100);
            pro = pro > 100 ? 100 : pro;
            SC_V.gotoTime = pro * SC_V.videoTotalT / 100;
            SC_V.gotoSliceNo = 1;
            for (var s = 1; s <= SC_V.sliceCount; s++) {
                if (SC_V.gotoTime < SC_V.srcData[s].endT && SC_V.gotoTime >= SC_V.srcData[s].startT) {
                    SC_V.gotoSliceNo = s;
                    break;
                }
            }
            if (!SC_V.gotoBuy(SC_V.gotoSliceNo)) return false;

            $("#scv_play_progress").width(pro + "%");
            $("#scv_seek_handle").css("left", pro + "%");
            $("#progressT").html(SC_V.formatVideoT(Math.round(SC_V.gotoTime)));
        },
        setVolume: function (e) {
            SC_V.stopEvent(e);
            var eX = e.pageX;
            var volumeW = $("#scv_volume").width();
            volumeW = volumeW == null || volumeW == "" ? 100 : volumeW;
            var svPostion = SC_V.getPosition(SC_V.getObj("scv_volume"));
            var pro = Math.abs((parseFloat(eX) - parseFloat(svPostion.left)) / parseFloat(volumeW));
            $("#scv_mute").attr("data-volume", pro);
            SC_V.setVolumeF(pro);
        },
        setMute: function (e) {
            SC_V.stopEvent(e);
            var dataVolume = $("#scv_mute").attr("data-volume");
            var dataMute = $("#scv_mute").attr("data-mute");
            if (dataMute == "true") SC_V.setVolumeF(dataVolume);
            else SC_V.setVolumeF(0);
        },
        setVolumeF: function (v) {
            v = Math.abs(v) > 1 ? 1 : Math.abs(v);
            SC_V.currentVolume = v;
            $("#scv_v_l").width(v * 100 + "%");
            $("#scv_v_h").css("left", v * 100 + "%");
            $("#scv_mute").attr("data-mute", v == 0 ? "true" : "false");
            SC_V.getCurrentVideo().volume = v;
            var muted = false;
            if (v == 0) muted = true;

            for (n = 1; n <= SC_V.sliceCount; n++) {
                if (SC_V.getObj(SC_V.getId(n))) {
                    SC_V.getObj(SC_V.getId(n)).volume = v;
                    SC_V.getObj(SC_V.getId(n)).muted = muted;
                }
            }
        },
        getPosition: function (obj) {
            var topValue = 0, leftValue = 0;
            while (obj) {
                leftValue += obj.offsetLeft;
                topValue += obj.offsetTop;
                obj = obj.offsetParent;
            }
            finalvalue = { "left": leftValue, "top": topValue };
            return finalvalue;
        },
        formatVideoT: function (time) {
            time = time == null || time == "" ? 0 : time;
            var h, m, s;
            if (time >= 60 && time < 60 * 60) {
                m = parseInt(time / 60.0);
                m = this.hms(m);
                s = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
                s = this.hms(s);
                time = m + ":" + s;
            }
            else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                h = parseInt(time / 3600.0);
                h = this.hms(h);
                m = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
                m = this.hms(m);
                s = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
                s = this.hms(s);
                time = h + ":" + m + ":" + s;
            }
            else {
                time = "00:" + this.hms(parseInt(time));
            }
            return time;
        },
        hms: function (a) {
            if (a < 10) return "0" + a;
            return a;
        },
        getId: function (sliceNo) {
            return "video_v" + sliceNo;
        },
        getObj: function (id) {
            if (!id) id = SC_V.getId(SC_V.currentSlice);
            return document.getElementById(id);
        },
        hide: function (id, callback) {
            this.getObj(id).style.display = "none";
            if (callback) callback();
        },
        show: function (id, callback) {
            this.getObj(id).style.display = "inline";
            if (callback) callback();
        },
        hasClass: function (id, cls) {
            var bl = false;
            if (SC_V.getObj(id)) bl = SC_V.getObj(id).className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
            return bl;
        },
        addClass: function (id, cls) {
            if (!SC_V.hasClass(id, cls)) SC_V.getObj(id).className += " " + cls;
        },
        removeClass: function (id, cls) {
            if (SC_V.hasClass(id, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                SC_V.getObj(id).className = SC_V.getObj(id).className.replace(reg, ' ');
            }
        },
        toggleClass: function (id, cls) {
            if (SC_VhasClass(id, cls)) SC_V.removeClass(id, cls);
            else SC_V.addClass(id, cls);
        },
        setAtt: function (id, attr, data) {
            if (SC_V.getObj(id)) SC_V.getObj(id).setAttribute(attr, data);
        },
        getAtt: function (id, attr) {
            if (SC_V.getObj(id)) return SC_V.getObj(id).getAttribute(attr);
        },
        addEvent: function (dom, eventname, func) {
            if (window.addEventListener) {
                if (eventname == 'mouseenter' || eventname == 'mouseleave') {
                    function fn(e) {
                        var a = e.currentTarget, b = e.relatedTarget;
                        if (!elContains(a, b) && a != b) {
                            func.call(e.currentTarget, e);
                        }
                    }
                    function elContains(a, b) {
                        try { return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16); } catch (e) { }
                    }
                    if (eventname == 'mouseenter') {
                        dom.addEventListener('mouseover', fn, false);
                    } else {
                        dom.addEventListener('mouseout', fn, false);
                    }
                } else {
                    dom.addEventListener(eventname, func, false);
                }
            } else if (window.attachEvent) {
                dom.attachEvent('on' + eventname, func);
            }
        },
        error: function () {
            $("#SC_player").css("background", "#000");
            $("#scv_v_load").hide();
            $("#scv_progress").hide();
            $("#scv_error").show();
            //var err = SC_V.getCurrentVideo.error.code;
            //switch (err) {
            //    case 1://媒体资源获取异常
            //        break;
            //    case 2: //网络错误
            //        break;
            //    case 3://媒体解码错误
            //        break;
            //    case 4://视频格式被不支持
            //        break;
            //    default:
            //        console.log(",,,,,,,,,");
            //}
        },
        gotoBuy: function (no) {
            if (SC_V.isbuy == "N") {
                if (no > SC_V.freeNo) {
                    $("#scv_v_load").hide();
                    $("#scv_progress").hide();
                    $("#scv_gotobuy").show();
                    SC_V.seekingF = false;
                    return false;
                }
            }
            return true;
        },
        noHtml5: function (callback) {
            $("#SC_player").css("background", "#000");
            $("#scv_v_load").hide();
            $("#scv_progress").hide();
            $("#scv_noHtml5").show();
            if (callback) callback();
        },
        browserRedirect: function () {
            var sUserAgent = navigator.userAgent.toLowerCase(); playBtn
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return "phone";
            } else {
                return "pc";
            }
        },
        isAndroid: function () {
            var bl = false;
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            if (bIsAndroid) bl = true;
            return bl;
        },
        isIos: function () {
            var bl = false;
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            if (bIsIpad || bIsIphoneOs) bl = true;
            return bl;
        },
        orientationF: "portrait",
        orientation: function () {
            var supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');
            var htmlNode = document.body.parentNode, orientation;
            if (supportOrientation) {
                orientation = window.orientation;
                switch (orientation) {
                    case 90:
                    case -90:
                        orientation = 'landscape'; //横屏
                        break;
                    default:
                        orientation = 'portrait';  //竖屏
                        break;
                }
            } else {
                orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
            }
            SC_V.orientationF = orientation;

            if (orientation == "landscape") {
                SC_V.videoLandscape();
            } else {
                SC_V.videoPortrait();
            }
            SC_V.getScreenWH();
        },
        //自动横屏方法
        videoLandscape: function () {
            var iw = window.innerWidth, ih = window.innerHeight;
            var parentDivID = $("#" + SC_V.parentDivID);
            parentDivID.height(ih).css("margin-top", "-" + (parentDivID.height() / 2) + "px");
            $(".video_top").css("background", "transparent").css("top", "40%").css("width", "44px");
            $("#videoTitle").hide();
        },
        //手动横屏方法
        setFullscreen: function (e) {
            SC_V.stopEvent(e);
            console.log("full screen");

            SC_V.removeOrientationchange();
            SC_V.videoLandscape();
        },
        //自动竖屏方法
        videoPortrait: function () {
            var iw = window.innerWidth, ih = window.innerHeight;
            var parentDivID = $("#" + SC_V.parentDivID);
            parentDivID.height((9 / 16) * iw + 20).css("margin-top", "-" + (parentDivID.height() / 2) + "px");
            $(".video_top").css("background", "#2a2a2a").css("top", AppTips + "px").css("width", "100%");
            $("#videoTitle").show();
        },
        //手动竖屏方法
        setNormalscreen: function (e) {
            SC_V.stopEvent(e);
            console.log("normal screen");

            SC_V.addOrientationchange();
            SC_V.videoPortrait();
        },
        //添加旋转方法
        addOrientationchange: function () {
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", SC_V.orientation, false);
        },
        //删除旋转方法
        removeOrientationchange: function () {
            window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", SC_V.orientation, false);
        },
        videoLandscape0: function () {
            var iw = window.innerWidth, ih = window.innerHeight;
            var parentDivID = $("#" + SC_V.parentDivID);
            parentDivID.parent().css("right", "0px");
            parentDivID.height(ih);
            parentDivID.css("margin-top", "-" + ih / 2 + "px");
            parentDivID.css("margin-left", "-" + iw / 2 + "px");
            //$("#fullscreen").hide();
            //$("#normalscreen").show();

            $(".video_top").css("background", "transparent").css("top", "40%").css("width", "44px");
        },
        videoPortrait0: function () {
            var iw = window.innerWidth, ih = window.innerHeight;
            var parentDivID = $("#" + SC_V.parentDivID);
            parentDivID.parent().css("right", "0px");
            parentDivID.height((9 / 16) * iw + 20);
            parentDivID.css("margin-top", "-" + ((9 / 16) * iw + 20) / 2 + "px");
            parentDivID.css("margin-left", "-" + iw / 2 + "px");
            //$("#fullscreen").show();
            //$("#normalscreen").hide();

            $(".video_top").css("background", "#2a2a2a").css("top", AppTips + "px").css("width", "100%");
        },
        getScreenWH: function () {
            SC_V.__w = $(window).width(), SC_V.__h = $(window).height();
            SC_V.__w = SC_V.__w > 990 ? 770 : SC_V.__w;
            SC_V.__h = SC_V.__h > 990 ? 770 : SC_V.__h;
        },
        createHtml: function (callback) {
            var h = '<div class="scv-video-content" id="scvVideoContent"></div>';
            h += '<div class="scv-loading-spinner" id="scv_v_load">';                                   //加载动画
            h += '    <div class="spinner_v">';
            h += '        <div class="spinner-container container1">';
            h += '            <div class="circle1"></div>';
            h += '            <div class="circle2"></div>';
            h += '            <div class="circle3"></div>';
            h += '            <div class="circle4"></div>';
            h += '        </div>';
            h += '        <div class="spinner-container container2">';
            h += '            <div class="circle1"></div>';
            h += '            <div class="circle2"></div>';
            h += '            <div class="circle3"></div>';
            h += '            <div class="circle4"></div>';
            h += '        </div>';
            h += '        <div class="spinner-container container3">';
            h += '            <div class="circle1"></div>';
            h += '            <div class="circle2"></div>';
            h += '            <div class="circle3"></div>';
            h += '            <div class="circle4"></div>';
            h += '        </div>';
            h += '    </div>';
            h += '</div>';
            h += '<div class="scv-progress" id="scv_progress">';                                      //正在加载
            h += '    <div class="scv-progress-text" id="scv_progressText">0%</div>';
            h += '    <div class="scv-progress-ring">';
            h += '        <div class="scv-progress-point"></div>';
            h += '    </div>';
            h += '</div>';
            h += '<div class="scv-error" id="scv_error">';                                            //加载失败
            h += '    <span>加载失败</span>';
            h += '</div>';
            h += '<div class="scv-gotobuy" id="scv_gotobuy">';                                        //购买提示
            h += '    <span>请购买圣才视频</span>';
            h += '</div>';
            h += '<div class="scv-noHtml5" id="scv_noHtml5" data-model="download">';                  //下载APP提示
            h += '    <span data-model="download">请下载圣才电子书客户端观看</span>';
            h += '</div>';
            h += '<div class="scv-big-play-button" id="bigPlayBtn" data-model="play">';               //播放按钮
            h += '    <a href="#" title="start" id="bigPlayA" data-model="play"></a>  ';
            h += '</div>';
            h += '<div class="scv-rerun-button" id="rerunBtn" data-model="rerun">';                   //重播按钮
            h += '    <span class="arrow arrow-animate" data-model="rerun">';
            h += '        <span class="arrow-item" data-model="rerun"><span class="curve" data-model="rerun"></span></span>';
            h += '        <i data-model="rerun"></i>';
            h += '    <span class="arrow-item" data-model="rerun"><span class="curve" data-model="rerun"></span></span>';
            h += '</span> ';
            h += '</div>'
            h += '<div class="scv-control-bar" id="scv_control_bar">';                                //播放控件
            h += '    <div class="scv-progress-control" id="proCon" data-model="slider">';                    //播放进度条
            h += '        <div class="scv-slider" id="scv_slider" data-model="slider">';
            h += '            <div class="scv-load-progress" id="scv_load_progress" data-model="slider"></div>';
            h += '            <div class="scv-play-progress" id="scv_play_progress" data-model="slider"></div>';
            h += '            <div class="scv-seek-handle" id="scv_seek_handle" data-model="slider"></div>';
            h += '        </div>';
            h += '    </div>';

            h += '    <div class="scv-play-control" id="palyControl" data-model="play">';                     //播放暂停按钮
            h += '        <div class="playBtn" id="playBtn" data-model="play"></div>';
            h += '    </div>';

            h += '    <div class="scv-current-time">';                                                        //播放时间
            h += '        <div class="scv-current-time-display" id="progressT">00:00</div>';
            h += '    </div>';

            h += '    <div class="scv-fullscreen-control" id="fullscreen" data-model="fullscreen">';          //全屏按钮
            h += '        <div class="scv-fullscreen-content" data-model="fullscreen">';
            h += '            <div class="scv-full-left-top" data-model="fullscreen"></div>';
            h += '            <div class="scv-full-center" data-model="fullscreen"></div>';
            h += '            <div class="scv-full-right-bottom" data-model="fullscreen"></div>';
            h += '        </div>';
            h += '    </div>';
            h += '    <div class="scv-normalscreen-control" id="normalscreen" data-model="normalscreen">';    //小屏按钮
            h += '        <div class="scv-normalscreen-content" data-model="normalscreen">';
            h += '            <div class="scv-normal-left" data-model="normalscreen"></div>';
            h += '            <div class="scv-normal-left-top" data-model="normalscreen"></div>';
            h += '            <div class="scv-normal-right" data-model="normalscreen"></div>';
            h += '            <div class="scv-normal-right-bottom" data-model="normalscreen"></div>';
            h += '        </div>';
            h += '    </div>';

            h += '    <div class="scv-duration">';                                                            //视频总时长
            h += '        <div class="scv-duration-display" id="totalT">00:00</div>';
            h += '    </div>';

            //h += '    <div class="scv-volume-control" id="scv_volume_control" data-model="volume">';          //音量调节滑动条
            //h += '        <div class="scv-volume" id="scv_volume" data-model="volume">';
            //h += '            <div class="scv-volume-level" id="scv_v_l" data-model="volume"></div>';
            //h += '            <div class="scv-volume-handle" id="scv_v_h" data-model="volume"></div>';
            //h += '        </div>';
            //h += '    </div>';
            //h += '    <div class="scv-mute-control" id="scv_mute_control" data-model="mute">';                //静音开关
            //h += '        <div class="scv-mute-content" id="scv_mute" data-volume="0.8" data-mute="false" data-model="mute">';
            //h += '            <div class="scv-mute-left" data-model="mute"></div>';
            //h += '            <div class="scv-mute-right" data-model="mute"></div>';
            //h += '        </div>';
            //h += '    </div>';
            h += '</div>';
            var SCPlayer = $("#" + this.parentDivID);
            SCPlayer.height(this.videoH + 20);
            SCPlayer.css("margin-top", "-" + (this.videoH + 20) / 2 + "px");
            SCPlayer.css("margin-left", "-" + this.videoW / 2 + "px");

            if (!this.getObj("scvVideoContent")) {
                this.getObj(this.parentDivID).innerHTML = h;
            }
            if (this.browserRedirect() == "phone") {
                $("#scv_volume_control").hide();
                $("#scv_mute_control").hide();
            }
            $("#scv_progress").show(function () {
                if (callback) callback();
            });

            //$("#fullscreen").hide();
            //$("#normalscreen").hide();
        },
        stopEvent: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        bindEvent: function () {
            document.getElementById("SCPlayer").addEventListener(touch.start, SC_V.touchSatrtFunP, true);
            document.getElementById("SCPlayer").addEventListener(touch.move, SC_V.touchMoveFunP, true);
            document.getElementById("SCPlayer").addEventListener(touch.end, SC_V.touchEndFunP, true);
        },
        touchSatrtFunP: function (e) {
            SC_V.stopEvent(e);
            touch.startTime();
            touch.setStartXY(e);
            touch.resetXY();

            clearTimeout(SC_V.fadeFun);
            touch.touchFlag = true;
        },
        touchMoveFunP: function (e) {
            SC_V.stopEvent(e);
            if (!touch.touchFlag) return false;
            touch.setEndXY(e);
            touch.setXY();
            touch.setMaxXY();

            var dataModel = $(e.target).attr("data-model");
            if (dataModel == "slider") {
                SC_V.seeking();
                SC_V.slideProgress();
            }
        },
        touchEndFunP: function (e) {
            SC_V.stopEvent(e);
            if (!touch.touchFlag) return false;
            touch.setEndXY(e);
            touch.setXY();
            touch.setMaxXY();

            var dataModel = $(e.target).attr("data-model");
            console.log(dataModel);
            if (touch.X == 0 && touch.Y == 0) {
                if (touch.dblClickImgCount < 2) {
                    if (touch.getTime() < touch.clickT) {
                        if (dataModel == "play") {
                            SC_V.togglePlay(e);
                        } else if (dataModel == "rerun") {
                            SC_V.rePlay(e);
                        } else if (dataModel == "slider") {
                            SC_V.setSlider(e);
                        } else if (dataModel == "volume") {
                            SC_V.setVolume(e);
                        } else if (dataModel == "mute") {
                            SC_V.setMute(e);
                        } else if (dataModel == "fullscreen") {
                            //SC_V.setFullscreen(e);
                        } else if (dataModel == "normalscreen") {
                            //SC_V.setNormalscreen(e);
                        } else if (dataModel == "BtnBack") {
                            SC_V.closeVideo();
                        } else if (dataModel == "download") {
                            SC_V.appDoenload();
                        } else {
                            $("#scv_control_bar").fadeToggle("slow");
                        }
                    }
                } else {
                }
            } else {
                if (dataModel == "slider") {
                    SC_V.getVideo({ sliceNo: SC_V.gotoSliceNo, flag: "play", time: SC_V.gotoTime }, function () { });
                }
            }
            touch.touchFlag = false;
            //SC_V.fadeFun = setTimeout(function () {
            //    $("#scv_control_bar").fadeOut("slow");
            //}, SC_V.fadeT);
        },
        appDoenload: function () {
            var isiPad = navigator.userAgent.toLowerCase().match(/ipad/i) != null;
            var isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i) != null;
            var isandroid = navigator.userAgent.toLowerCase().match(/android/i) != null;
            var isWeixin = navigator.userAgent.toLowerCase().match(/micromessenger/i) != null;

            if (isandroid) {
                if (!isWeixin) {
                    document.location = 'ebookapp://192.168.1.1:8080/openapp.html?id=' + SC_R.bookID;
                    setTimeout(function () {
                        if (confirm('亲，你没有安装我们的app，是否现在就去下载?')) {
                            document.location = 'http://www.100xuexi.com/app';
                        }
                    }, 1000);
                } else {
                    document.location = 'http://www.100xuexi.com/app';
                }
            }
            if (isiPad || isiPhone) {
                if (!isWeixin) {
                    document.location = 'shengcaiebook://plat:1/bookid:' + SC_R.bookID;
                    setTimeout(function () {
                        if (confirm('亲，你没有安装我们的app，是否现在就去下载?')) {
                            document.location = 'http://www.100xuexi.com/app';
                        }
                    }, 1000);
                } else {
                    document.location = 'http://www.100xuexi.com/app';
                }
            }
        },
        createVideoDiv: function () {
            if ($("#videoDiv").length > 0) $("#videoDiv").remove();
            var $div1 = $('<div>').addClass("videoDiv rightDiv").attr({ "id": "videoDiv" });
            $("#EbookRead").append($div1);
            var $div11 = $('<div>').addClass("video_top Rhead").bind("click", function () { SC_V.closeVideo(); });
            var $div111 = $('<div>').addClass("BtnBack").attr({ "id": "BtnBack_video", "data-model": "BtnBack" }).bind("click", function () { SC_V.closeVideo(); });
            var $div112 = $('<div>').addClass("video_title").attr({ "id": "video_title", "data-model": "BtnBack" }).html(SC_V.title).bind("click", function () { SC_V.closeVideo(); });
            $div11.append($div111).append($div112);
            var $div12 = $('<div>').addClass("videoContent scv-default-skin").attr({ "id": "SCPlayer" });
            $div1.append($div11).append($div12);
        },
        closeVideo: function () {
            $(".video_top").css({ "position": "absolute", "top": "0px" });
            $("#videoDiv").animate({ left: "110%" }, 500);

            setTimeout(function () {
                $("title").text(SC_V.replaceTitle);
                SC_V.resetVideo();
            }, 500);
        },
        ShowVideoDiv: function (parm, callback) {
            //videoSrc, videoW, videoH, videoImg, callback
            //console.log(JSON.stringify(parm));
            var vw = $(window).width();
            if (!parm) parm = {};

            if (!parm.title) parm.title = "圣才视频";
            SC_V.title = parm.title;

            if (!parm.isbuy) parm.isbuy = "N";
            SC_V.isbuy = parm.isbuy;

            SC_V.getScreenWH();
            SC_V.createVideoDiv();

            var obj = { "url": parm.videoSrc, "w": vw };
            console.log(parm.videoSrc);
            SC_V.initVideo(obj, function () {
                if (callback) {
                    callback(function () {
                        $("#videoDiv").animate({ left: "0px" }, 500);
                        SC_V.replaceTitle = $("title").text();
                        $("title").text(SC_V.title);
                    });
                } else {
                    $("#videoDiv").animate({ left: "0px" }, 500);
                    SC_V.replaceTitle = $("title").text();
                    $("title").text(SC_V.title);
                }
            });
        }
    }
    return SC_V;
};
var SC_V = null;

//摇一摇
/*
function SC_Shake() {
    var SC_SH = {
        userID: "",
        productID: "",
        platID: "1",
        hxGroupID: "",
        hxUserID: "",

        shakeInfo: {
            level_1: [
                { "name": "学友群", "select": true, "url": "" },
                { "name": "好友", "select": false, "url": "" },
                { "name": "聊天", "select": false, "url": "" },
                { "name": "朋友圈", "select": false, "url": "" },
                { "name": "直播", "select": false, "url": "" }
            ],
            level_2: [
                { "name": "本书学友群", "select": true, "url": "" },
                { "name": "全部学友群", "select": false, "url": "" },
                { "name": "本书笔记", "select": false, "url": "" }
            ],
            level_3: [
                { "name": "群聊天", "select": true, "url": "" },
                { "name": "群资料", "select": false, "url": "" },
                { "name": "群成员", "select": false, "url": "" },
                { "name": "学友地图", "select": false, "url": "" }
            ]
        },

        SHAKE_THRESHOLD: 3800,
        last_update: 0,
        x: 0,
        y: 0,
        z: 0,
        last_x: 0,
        last_y: 0,
        last_z: 0,
        callback: null,

        addShake: function (callback) {
            if (callback) SC_SH.callback = callback;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', SC_SH.deviceMotionHandler, false);
            }
        },
        removeShake: function () {
            SC_SH.callback = null;
            window.removeEventListener('devicemotion', SC_SH.deviceMotionHandler, false);
        },
        deviceMotionHandler: function (eventData) {
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();

            if ((curTime - SC_SH.last_update) > 100) {
                var diffTime = curTime - SC_SH.last_update;
                SC_SH.last_update = curTime;
                SC_SH.x = acceleration.x;
                SC_SH.y = acceleration.y;
                SC_SH.z = acceleration.z;
                var speed = Math.abs(SC_SH.x + SC_SH.y + SC_SH.z - SC_SH.last_x - SC_SH.last_y - SC_SH.last_z) / diffTime * 10000;
                var status = document.getElementById("status");

                if (speed > SC_SH.SHAKE_THRESHOLD) {
                    //if (SC_SH.callback) SC_SH.callback();
                    SC_SH.showChitchatDiv();
                }
                SC_SH.last_x = SC_SH.x;
                SC_SH.last_y = SC_SH.y;
                SC_SH.last_z = SC_SH.z;
            }
        },

        stopEvent: function (e) {
            if (!e) return false;
            e.stopPropagation();
            e.preventDefault();
        },

        initURL: function () {
            SC_SH.shakeInfo.level_1[1].url = SC_R.getGotoUrl("friends");
            SC_SH.shakeInfo.level_1[2].url = SC_R.getGotoUrl("chats");
            SC_SH.shakeInfo.level_1[3].url = SC_R.getGotoUrl("group");
            SC_SH.shakeInfo.level_1[4].url = SC_R.getGotoUrl("live");

            SC_SH.shakeInfo.level_2[1].url = SC_R.getGotoUrl("circles");
            SC_SH.shakeInfo.level_2[2].url = SC_R.getGotoUrl("note");

            SC_SH.shakeInfo.level_3[3].url = SC_R.getGotoUrl("nearbyfriends");
        },

        //阅读器底部显示摇一摇的ShakeDiv
        showShakeDiv: function (parm) {
            if (!parm) parm = {};
            if (parm.userID) SC_SH.userID = parm.userID;
            if (parm.productID) SC_SH.productID = parm.productID;

            SC_SH.createShakeDiv();
            $("#shakeDiv" + SC_SH.productID).show();

            if (SC_R.gobackUrl) {
                SC_SH.initURL();
                SC_SH.createChitchatDiv();
                SC_SH.addShake();
            }
        },
        //创建ShakeDiv
        createShakeDiv: function () {
            return false;  //显示这个底部的横栏
            if ($("#shakeDiv" + SC_SH.productID).length > 0) return false;
            var $div = $('<div>').addClass("shakeDiv").attr({ "id": "shakeDiv" + SC_SH.productID }).css("width", __w).css("left", _bbLeft).bind("click", SC_SH.showChitchatDiv);
            var $span = $('<span>').addClass("shakeText").html("摇一摇，与学友畅聊");
            var $leftImg = $('<div>').addClass("leftImg");
            var $rightImg = $('<div>').addClass("rightImg");
            var $closeImg = $('<div>').addClass("BtnClose").attr({ "id": "closeShake" }).bind("click", SC_SH.closeShakeDiv);
            $div.append($span).append($leftImg).append($rightImg).append($closeImg);
            $("#EbookRead").append($div);

            //5秒后自动滑出消失
            setTimeout(SC_SH.closeShakeDiv, 5000);
        },
        //关闭ShakeDiv
        closeShakeDiv: function (e) {
            SC_SH.stopEvent(e);
            if ($("#shakeDiv" + SC_SH.productID)) $("#shakeDiv" + SC_SH.productID).slideUp();
        },

        //显示摇出来的聊天界面ChitchatDiv
        showChitchatDiv: function (e) {
            SC_SH.stopEvent(e);
            //退出语音朗读
            SC_A.exitAudio();
            SC_SH.closeShakeDiv();

            if (!SC_R.gobackUrl) {
                var msg = { flag: "shake", shakeInfo: { ProductID: SC_SH.ProductID, PlatID: SC_SH.PlatID, userID: SC_SH.userID, shake: true } };
                window.parent.postMessage(msg, '*');
            } else {
                $("#chitchatDiv").addClass("comCharLayoutLeft");
            }
        },

        //创建聊天界面ChitchatDiv
        createChitchatDiv: function () {
            var $comCharLayout = $("#chitchatDiv");
            if ($comCharLayout.length > 0) $comCharLayout.remove();
            $comCharLayout = $("<div>").addClass("comCharLayout").attr({ "id": "chitchatDiv" });
            $("#EbookRead").append($comCharLayout);

            var $TabLevel1 = $("<div>").addClass("TabLevel1");
            $TabLevel1.append(listLi(SC_SH.shakeInfo.level_1));
            var $closeBtn = $("<a>").addClass("BtnClose").bind("click", SC_SH.closeChitchatDiv);
            $TabLevel1.append($closeBtn);


            var $TabLevel2 = $("<div>").addClass("TabLevel2");
            $TabLevel2.append(listLi(SC_SH.shakeInfo.level_2));


            var $TabLevel3 = $("<div>").addClass("TabLevel3");
            $TabLevel3.append(listLi(SC_SH.shakeInfo.level_3));

            var $Chat = $("<div>").addClass("Chat");
            var $ChatList = $("<div>").addClass("ChatList").attr({ "id": "ChatList" + SC_SH.productID, "style": "height:" + (__h - 124) + "px;" });
            $ChatList.append($("<img>").attr({ "src": "http://g.100xuexi.com/images/scwaiting.gif", "style": "margin:20px auto;display:block;" }));
            $Chat.append($ChatList);

            $comCharLayout.append($TabLevel1).append($TabLevel2).append($TabLevel3).append($Chat);

            SC_SH.getUrl();

            function listLi(obj) {
                var $ul = $("<ul>");
                var $li;
                for (var a = 0, a1 = obj.length; a < a1; a++) {
                    (function (o) {
                        $li = $("<li>").addClass(o.select ? "Selected" : "").append($("<a>").html(o.name)).bind("click", function () {
                            SC_R.SCLocation(o.url);
                        });
                        $ul.append($li);
                    })(obj[a])
                }
                return $ul;
            }
        },


        //关闭聊天界面ChitchatDiv
        closeChitchatDiv: function () {
            $("#chitchatDiv").removeClass("comCharLayoutLeft");
        },

        //获取聊天URL
        getUrl: function () {
            $.ajax({
                async: true,
                url: webConfig.host + "/handle/shakeChatHandler.ashx?method=GetHuanXinIDByProduct&productID=" + SC_SH.productID + "&PlatID=" + SC_SH.platID,
                success: function (e) {
                    //console.log(e);
                    var json1 = JSON.parse(e);

                    if (json1.result == 1 && json1.hxGroupID != "") {
                        SC_SH.hxGroupID = json1.hxGroupID;
                        SC_R.hxGroupID = json1.hxGroupID;
                        SC_SH.shakeInfo.level_3[1].url = SC_R.getGotoUrl("circlesInfo", SC_SH.hxGroupID);
                        SC_SH.shakeInfo.level_3[2].url = SC_R.getGotoUrl("circlesMember", SC_SH.hxGroupID);
                        $.ajax({
                            async: true,
                            url: webConfig.host + "/handle/shakeChatHandler.ashx?method=GetGroupChatToken&productID=" + SC_SH.productID + "&PlatID=" + SC_SH.platID + "&userID=" + SC_SH.userID,
                            success: function (result) {
                                //console.log(result);
                                var json2 = JSON.parse(result);
                                SC_SH.hxUserID = json2.hxUserID || "sc10009";

                                if (SC_SH.hxUserID != "") {
                                    SC_SH.hxUserID = SC_SH.hxUserID == "sc" ? "sc10009" : SC_SH.hxUserID;
                                    var url = "http://qunliao.100xuexi.com/CircleMessaging.aspx" + "?productID=" + SC_SH.productID + "&platNum=" + SC_SH.platID + "&hxUserID=" + SC_SH.hxUserID + "&token=" + json2.token + "&hxGroupID=" + SC_SH.hxGroupID;
                                    console.log("url:" + url);

                                    var $iframe = $("<iframe>").attr({ "id": "iframe_" + SC_SH.productID, "style": "width: 100%; height: 100%;", "src": url });
                                    $("#ChatList" + SC_SH.productID).empty().append($iframe);
                                }
                            }
                        });
                    }
                }
            });
        }
    };
    return SC_SH;
};
var SC_SH = null;

*/

//添加笔记
(function () {
    var SC_N = {

        Pcontent: null,
        Pcontent_c: null,
        Pcontent_t: "",
        Pcontent_h: "",
        content: "",
        myNoteList: [],
        myLineList: [],
        userID: "",
        bookID: "",
        type: "",
        index: 0,
        eBookNoteColorNo: "1",
        color: "#CC0000",
        page: 0,
        colorName: "Red",
        addClass: "MarkRed",
        showLonFlag: true,

        magnifierF: false,

        //创建放大镜
        createMagnifier: function () {
            var $magnifierDiv = $("#magnifierDiv");
            if ($magnifierDiv.length > 0) $magnifierDiv.remove();
            $magnifierDiv = $("<div>").addClass("MagnifierBox").attr({ "id": "magnifierDiv", "style": "top:" + (parseFloat(touch.startY) - 170) + "px;left:" + (parseFloat(touch.startX) - 75) + "px;" });
            var $WenziBox = $("<div>").addClass("WenziBox");
            var $wenziDiv = $("<div>").addClass("WenziBoxInfo").attr({ "id": "wenziDiv", "style": "" }).html($("#" + SC_R._ecp + SC_R._cI + "_" + SC_R._cP).html());
            $WenziBox.append($wenziDiv);
            $magnifierDiv.append($WenziBox);
            $("#EbookRead").append($magnifierDiv);

            var wenziDivW = $("#wenziDiv").width(), wenziDivH = $("#wenziDiv").height();
            var balanceW = wenziDivW - _pag.pageWidth;
            balanceW = (touch.endX / __w) * balanceW;

            var balanceH = wenziDivH - _pag.textHeight;
            balanceH = (touch.endY / __h) * balanceH;
            $("#wenziDiv").css("left", -1 * balanceW).css("top", -1 * (parseFloat(balanceH) + 75));

            SC_N.magnifierF = true;
        },

        //准备添加笔记和纠错
        addNoteAndError: function (event, userID, bookID, callback) {
            $("#magnifierDiv").remove();
            SC_N.magnifierF = false;
            SC_N.userID = userID;
            //console.log("SC_N.userID:" + SC_N.userID);
            SC_N.bookID = bookID;
            stopEvent(event);
            if (!SC_N.getPcontentText()) return false;

            var bl1 = false, bl2 = false;
            for (var t = 0, t1 = SC_N.myNoteList.length; t < t1; t++) {
                if (SC_N.Pcontent_t.indexOf(SC_N.myNoteList[t].cutOut) > -1) {
                    if (SC_N.myNoteList[t].talkID) {
                        SC_N.Pcontent_t = SC_N.myNoteList[t].cutOut;
                        SC_N.content = SC_N.myNoteList[t].content;

                        SC_N.eBookNoteColorNo = SC_N.myNoteList[t].eBookNoteColorNo;
                        SC_N.setColor();
                        SC_N.index = t;
                        bl1 = true;
                        break;
                    }
                }
            }
            for (var a = 0, a1 = SC_N.myLineList.length; a < a1; a++) {
                if (SC_N.Pcontent_t.indexOf(SC_N.myLineList[a].cutOut) > -1) {
                    bl2 = true;
                    break;
                }
            }

            if (bl1 || bl2) {
                if (bl1) {
                    SC_N.type = "updateNote";
                    SC_N.submitNoteAndError();
                }
                if (bl2) {
                    SC_N.createLongPressDiv();
                    SC_N.showLonFlag = true;
                    SC_N.Pcontent_c = SC_N.Pcontent;
                    $("#LongPressBtns").show();
                }
            } else {
                //设置下划线
                if (SC_N.Pcontent_t.indexOf("<span") < 0) {
                    layer.closeAll();
                    SC_N.Pcontent.html("<span style='border-bottom: 1px solid #f00;'>" + SC_N.Pcontent_h + "</span>");
                    SC_N.Pcontent_c = SC_N.Pcontent;
                    if (!SC_N.showLonFlag) {
                        SC_N.markLine();
                    }

                    SC_N.createLongPressDiv();
                    
                    if (callback) {
                        callback(function () {
                            if (SC_N.showLonFlag) $("#LongPressBtns").show();
                        });
                    } else {
                        if (SC_N.showLonFlag) $("#LongPressBtns").show();
                    }
                }
            }

        },

        createLongPressDiv: function () {
            if ($("#LongPressBtns").length > 0) return false;
            var $LongPressBtns = $('<div>').addClass("LongPressBtns").attr({ "id": "LongPressBtns" });
			var html = '<ul class="Btns2">';
            html += '<li><a href="#" id="addSearch">搜索</a></li>';
            html += '<li><a href="#" id="addNotes">笔记</a></li>';
            html += '<li><a href="#" id="addFeedBack">纠错</a></li>';
            html += '<li><a href="#" id="deleteLine">删除</a></li>';
            html += '</ul>';
            html += '<ul class="ColorList">';
            html += '<li class="Selected"><a href="javascript:void(0)" class="Red" id="RedLon"></a></li>';
            html += '<li><a href="javascript:void(0)" class="Yellow" id="YellowLon"></a></li>';
            html += '<li><a href="javascript:void(0)" class="Green" id="GreenLon"></a></li>';
            //html += '<li><a href="javascript:void(0)" class="Cyan" id="CyanLon"></a></li>';
            html += '<li><a href="javascript:void(0)" class="Blue" id="BlueLon"></a></li>';
            html += '<li><a href="javascript:void(0)" class="Purple" id="PurpleLon"></a></li>';
            html += '</ul>';
            
            $LongPressBtns.html(html);
            $("#EbookRead").append($LongPressBtns);
            

            $LongPressBtns.bind("click", function (e) {
                stopEvent(event);
                var $targetID = $(e.target).attr("id");
                switch ($targetID) {
                    case "addSearch":                       //搜索
                        $("#LongPressBtns").hide();
                        SC_R.showSearchDiv(SC_N.Pcontent_t, function () {
                            $("#UISetMenu").slideUp("normal");
                        });
                        break;
                    case "addNotes":                        //添加笔记
                        $("#LongPressBtns").hide();
                        SC_N.type = "addNote";
                        SC_N.submitNoteAndError();
                        break;
                    case "addFeedBack":                     //纠错
                        $("#LongPressBtns").hide();
                        SC_N.type = "addError";
                        SC_N.submitNoteAndError();
                        break;
                    case "deleteLine":                      //删除
                        //SC_N.showLonFlag = false;
                        SC_N.cancelMarkLine(SC_N.Pcontent_t);
                        SC_N.repealPcontent();
                        $("#LongPressBtns").hide();
                        break;
                    case "RedLon":
                    case "YellowLon":
                    case "GreenLon":
                    //case "CyanLon":
                    case "BlueLon":
                    case "PurpleLon":
                        $(e.target).parent().addClass("Selected").siblings("li").removeClass("Selected");
                        $(".NoteColor .ColorList li").eq($(e.target).parent().index()).addClass("Selected").siblings("li").removeClass("Selected");
                        if ($(e.target).parent().hasClass("Selected")) {
                            SC_N.colorName = $(e.target).attr("class");
                            SC_N.setMarkText();
                        }
                        break;
                    default:
                        return false;
                }
            });
            $LongPressBtns.attr({ "style": "left:" + (($(window).width() - $LongPressBtns.outerWidth()) / 2) + "px;top:150px;" })
            $LongPressBtns = null;
        },
        createNoteDiv: function () {
            var $NoteBox = $("#NoteBox");
            if ($NoteBox.length > 0) {
                $("#textareaV").val("");
            } else {
                $NoteBox = $('<div>').addClass("NoteBox rightDiv").attr("id", "NoteBox");
                $("#EbookRead").append($NoteBox);
                var html = '<div class="NoteBoxTop">';
                html += '<a href="javascript:void(0)" class="BtnCancel"  id="BtnBack_note">取消</a> ';
                html += '<a href="javascript:void(0)" class="BtnSubmit" id="BtnSubmit_note">完成</a>';
                html += '<h1 id="notesTop">添加笔记</h1>';
                html += '</div>';
                html += '<div class="Note" id="Note">';
                html += '<div class="MarkTextColor" id="cutOut"></div>';
                html += '<div class="NoteColor">';
                html += '<div class="Tag">颜色</div>';
                html += '<ul class="ColorList">';
                html += '<li class="Selected"><a href="#" class="Red"></a></li>';
                html += '<li><a href="#" class="Yellow"></a></li>';
                html += '<li><a href="#" class="Green"></a></li>';
                //html += '<li><a href="#" class="Cyan"></a></li>';
                html += '<li><a href="#" class="Blue"></a></li>';
                html += '<li><a href="#" class="Purple"></a></li>';
                html += '</ul>';
                html += '</div>';
                html += '<div class="FeedBackCon">';
                html += '<textarea name="textarea" id="textareaV" cols="45" rows="5" class="TextArea"  placeholder="请填输入内容"></textarea>';
                html += '</div>';
                html += '</div>';
                $NoteBox.html(html);
                $NoteBox.height(__h);
                $NoteBox = null;
                //给文本域绑定两个事件
                $("#textareaV").bind("focus", function () {
                    //$("#Note").css("top", "-48px");
                });
                $("#textareaV").bind("blur", function () {
                    //$("#Note").css("top", "44px");
                });


                $(".NoteColor .ColorList li").bind("click", function () {
                    $(this).addClass("Selected");
                    $(this).siblings("li").removeClass("Selected");
                    $($(".LongPressBtns .ColorList li").get($(this).index())).addClass("Selected").siblings("li").removeClass("Selected");
                    if ($(this).hasClass("Selected")) {
                        SC_N.colorName = $(this).children("a").attr("class");
                        SC_N.setMarkText();
                    }
                });
            }
            SC_N.setColor();
        },
        closeNoteDiv: function () {
            $("#NoteBox").animate({ left: "110%" }, 500);
        },

        getPcontentText: function () {
            //保证划线的时候，是画一整个段落p
            if (SC_N.Pcontent[0].tagName.toLocaleUpperCase() != "P") {
                SC_N.Pcontent = SC_N.Pcontent.parents("p");
            }
            SC_N.Pcontent_t = "";
            var PcontentId = "Pcontent" + (new Date().getTime().toString());
            SC_N.Pcontent.attr({ "id": PcontentId });
            if (!SC_N.showLonFlag) {
                SC_N.markLine();
            }

            SC_N.Pcontent_t = SC_N.Pcontent.text();
            SC_N.Pcontent_h = SC_N.Pcontent.html();
            return true;
        },
        repealPcontent: function () {
            //console.info(SC_N);
            //console.info($(SC_N.Pcontent_h).html());
            //console.info(SC_N.Pcontent_c.html());
            if (SC_N.Pcontent_c) {
                if (SC_N.showLonFlag) {
                    SC_N.Pcontent_c.html($(SC_N.Pcontent_h).html()).removeAttr("data-mark").removeAttr("id");  //原方法去掉了外层html,会删除原来的元素
                    //console.info("test-0");
                    if(!$(SC_N.Pcontent_h).html()){ //如果笔记选中的内容被删除
                        SC_N.Pcontent_c.html(SC_N.Pcontent_h).removeAttr("data-mark").removeAttr("id");
                    }
                } else {
                    SC_N.markLine();
                }
            }
            //console.info("test-1");
            SC_N.resetPcontent();
        },
        resetPcontent: function () {
            SC_N.Pcontent = null;
            SC_N.Pcontent_c = null;
            SC_N.Pcontent_t = "";
            SC_N.Pcontent_h = "";
            SC_N.content = "";
        },
        hideOrShowPcontent: function () {
            var $LongPressBtns = $("#LongPressBtns");
            if ($LongPressBtns.length > 0 && $LongPressBtns.css("display") != "none") {
                SC_N.showLonFlag = false;
                SC_N.repealPcontent();
                $("#LongPressBtns").hide();
            }
        },
        markLine: function () {
            if (SC_N.Pcontent_c) {
                if (SC_N.Pcontent_c.attr("data-mark") != "markLine") {
                    SC_N.Pcontent_c.attr("data-mark", "markLine");
                    var bl=true;
                    for (var a = 0, a1 = SC_N.myLineList.length; a < a1; a++) {
                        if (SC_N.myLineList[a].cutOut == SC_N.Pcontent_t) {
                            bl = false;
                            break;
                        }
                    }
                    if (bl) {
                        SC_N.myLineList.push({ talkID: "", cutOut: SC_N.Pcontent_t, content: "", eBookNoteColorNo: "" });

                        SC_R.ebook.lineList = SC_N.myLineList;
                        console.log("markLine");
                        SC_R.saveEbookLocal();
                    }
                }
            }
        },
        cancelMarkLine: function (cutOut) {
            if (!cutOut) cutOut = SC_N.Pcontent_t;
            for (var a = 0, a1 = SC_N.myLineList.length; a < a1; a++) {
                if (SC_N.myLineList[a].cutOut == cutOut) {
                    SC_N.myLineList.splice(a, 1);
                    break;
                }
            }
            SC_R.ebook.lineList = SC_N.myLineList;
            SC_R.saveEbookLocal();
        },

        submitNoteAndError: function (parm) {
            //console.log(JSON.stringify(parm));
            layer.closeAll();
            SC_N.index = 0;
            if (parm) {
                if (parm.talkID) {
                    for (var t = 0, t1 = SC_N.myNoteList.length; t < t1; t++) {
                        if (SC_N.myNoteList[t].talkID == parm.talkID) {
                            SC_N.Pcontent_t = SC_N.myNoteList[t].cutOut;
                            SC_N.content = SC_N.myNoteList[t].content;
                            SC_N.eBookNoteColorNo = SC_N.myNoteList[t].eBookNoteColorNo;
                            SC_N.setColor();
                            SC_N.index = t;
                            break;
                        }
                    }
                }
                if (parm.userID) SC_N.userID = parm.userID;
                if (parm.bookID) SC_N.bookID = parm.bookID;
                if (parm.page) SC_N.page = parm.page;
                if (parm.flag) SC_N.type = parm.flag;
            }

            var flagT = "", typeT = 0, handleType = "add", layerWidth = $(window).width() - 10;
            if (SC_N.type == "addNote") {
                flagT = "添加笔记";
                typeT = "3";
            } else if (SC_N.type == "addError") {
                flagT = "添加纠错";
                typeT = "1";
            } else if (SC_N.type == "updateNote") {
                flagT = "修改笔记";
                typeT = "3";
                handleType = "update";
            } else {
                return false;
            }

            SC_N.createNoteDiv();

            $("#notesTop").html(flagT);
            $("#cutOut").html(SC_N.Pcontent_t);
            $("#textareaV").val(SC_N.content);

            $("#NoteBox").animate({ left: "0px" }, 500);

            $("#BtnSubmit_note").unbind().bind("click", function (event) {
                stopEvent(event);
                SC_N.content = $("#textareaV").val();
                var cutOut = SC_N.Pcontent_t;
                if (cutOut.length > 450) cutOut = cutOut.substring(0, 450);
                var notesInfo = {
                    "method": handleType,
                    "userID": SC_N.userID,
                    "eBookID": SC_N.bookID,
                    "page": SC_N.page,
                    "cutOut": cutOut,
                    "content": SC_N.content,
                    "type": typeT,
                    "device": "",
                    "eBookNoteColorNo": SC_N.eBookNoteColorNo
                };
                //判断是否登录，没有登录的话，则不提交到服务器，保存在本地
                if (!SC_N.userID) {
                    SC_N.closeNoteDiv();
                    if (SC_N.type == "updateNote") {
                        SC_N.updateNoteList();
                    } else {
                        var obj = { talkID: "ID" + (new Date().getTime().toString()), cutOut: notesInfo.cutOut, content: notesInfo.content, eBookNoteColorNo: SC_N.eBookNoteColorNo };
                        SC_N.addNotesList(obj);
                    }
                    layer.msg(flagT + '成功', { icon: 6, time: 2000 });
                    SC_N.resetPcontent();
                } else {
                    $.ajax({
                        type: "GET",
                        url: webConfig.host + "/handle/EbookAddNotesAndFeedback.ashx",
                        data: notesInfo,
                        dataType: "json",
                        beforeSend: function () {
                            var index = layer.msg(flagT + '提交中', { icon: 16, time: 0 });
                        },
                        success: function (msg) {
                            //console.log(JSON.stringify(msg));
                            if (msg.result == 1) {
                                SC_N.closeNoteDiv();
                                if (SC_N.type == "updateNote") {
                                    SC_N.updateNoteList();
                                } else {
                                    var obj = { talkID: msg.talk.talkID, cutOut: msg.talk.cutOut, content: msg.talk.content, eBookNoteColorNo: SC_N.eBookNoteColorNo };
                                    SC_N.addNotesList(obj);
                                }
                                layer.msg(flagT + '成功', { icon: 6, time: 2000 });
                            }
                            else {
                                layer.msg(flagT + '失败', { icon: 5, time: 2000 });
                            }
                            SC_N.resetPcontent();
                            //console.log(JSON.stringify(SC_N.myNoteList));
                        },
                        error: function () {
                            layer.msg(flagT + '失败');
                        },
                        complete: function () { }
                    });
                }

            });
            $("#BtnBack_note,#notesTop").unbind().bind("click", function (event) {
                stopEvent(event);
                SC_N.repealPcontent();
                SC_N.closeNoteDiv();
            });
        },
        updateNoteList: function (obj) {
            if (obj) SC_N.content = obj.content;
            SC_N.myNoteList[SC_N.index].content = SC_N.content;
            SC_N.myNoteList[SC_N.index].eBookNoteColorNo = SC_N.eBookNoteColorNo;
            SC_N.resetPcontent();

            SC_R.ebook.noteList = SC_N.myNoteList;
            SC_R.saveEbookLocal();
        },
        addNotesList: function (obj) {
            if (obj) {
                SC_N.myNoteList.push(obj);
                var $noteDiv = $('<mark>').addClass("markNote Note" + SC_N.colorName).attr({ "data-talkid": obj.talkID, "name": "markNote"});
                SC_N.Pcontent.removeAttr("data-mark").attr("data-talkid", obj.talkID).append($noteDiv);

                SC_N.cancelMarkLine(obj.cutOut);
            }
            SC_N.resetPcontent();

            SC_R.ebook.noteList = SC_N.myNoteList;
            SC_R.saveEbookLocal();
        },
        
        
        setMarkText: function () {
            if (SC_N.colorName == "Red") SC_N.eBookNoteColorNo = "1";
            else if (SC_N.colorName == "Yellow") SC_N.eBookNoteColorNo = "2";
            else if (SC_N.colorName == "Green") SC_N.eBookNoteColorNo = "3";
            //else if (SC_N.colorName == "Cyan") SC_N.eBookNoteColorNo = "4";
            else if (SC_N.colorName == "Blue") SC_N.eBookNoteColorNo = "4";
            else if (SC_N.colorName == "Purple") SC_N.eBookNoteColorNo = "5";

            SC_N.color = SC_N.getColor(SC_N.eBookNoteColorNo).color;
            SC_N.addClass = "Mark" + SC_N.colorName;
            $(".MarkTextColor").removeClass().addClass("MarkTextColor").addClass(SC_N.addClass);
        },
        setColor: function () {
            SC_N.colorName = SC_N.getColor(SC_N.eBookNoteColorNo).colorName;
            $($(".NoteColor .ColorList li").get(parseInt(SC_N.eBookNoteColorNo) - 1)).addClass("Selected").siblings("li").removeClass("Selected");
            SC_N.setMarkText();
        },
        getColor: function (n) {
            var color = "", colorName = "";
            if (n == "1") color = "#e25656", colorName="Red";
            else if (n == "2") color = "#ffcf3e", colorName = "Yellow";
            else if (n == "3") color = "#00d37c", colorName = "Green";
            //else if (n == "4") color = "#308000", colorName = "Cyan";
            else if (n == "4") color = "#3ea6ff", colorName = "Blue";
            else if (n == "5") color = "#a313ff", colorName = "Purple";
            return { color: color, colorName: colorName };
        },

        //获取用户在该本书上面添加的所有笔记
        getUserNote: function (userID, bookID, callback) {
            if (userID) {
                SC_N.userID = userID;
                SC_N.bookID = bookID;
                $.ajax({
                    async: true,
                    url: webConfig.host + "/handle/usertalk/TalkQuery.ashx?method=GetAllByParam&platID=1&type=3&productID=" + bookID + "&userID=" + userID,
                    success: function (res) {
                        //console.log(JSON.stringify(res));
                        var json = JSON.parse(res);
                        if (json.result == 1) {
                            if (json.talks.length > 0) {
                                for (var i = 0, i1 = json.talks.length; i < i1; i++) {
                                    var josn = { talkID: json.talks[i].talkID, cutOut: json.talks[i].cutOut, content: json.talks[i].content, eBookNoteColorNo: "1" };
                                    SC_N.myNoteList.push(josn);
                                }
                                SC_R.ebook.noteList = SC_N.myNoteList;
                                SC_R.saveEbookLocal();

                                SC_N.myLineList = SC_R.ebook.lineList || [];
                            }
                        }
                        if (callback) callback();
                    },
                    error: function () {
                        if (callback) callback();
                    }
                });
            } else {
                if (SC_R.ebook) {
                    SC_N.myNoteList = SC_R.ebook.noteList || [];
                    SC_N.myLineList = SC_R.ebook.lineList || [];
                    SC_R.saveEbookLocal();
                }

                if (callback) callback();
            }
        },

        //在文本中插入笔记标记
        markNote: function (pageObj) {
            //console.log(JSON.stringify(SC_N.myNoteList));
            pageObj.find("p").each(function () {
                var thisText = "", thisHtml = "";
                if ($(this).text() == "") thisText = $(this).html();
                else thisText = $(this).text();
                thisHtml = $(this).html();

                if (thisText && thisText.length > 2 && SC_N.myNoteList.length > 0) {
                    for (var t = 0, t1 = SC_N.myNoteList.length; t < t1; t++) {
                        if (SC_N.myNoteList[t].cutOut) {
                            if (SC_N.myNoteList[t].cutOut.length > 2) {
                                if (thisText.indexOf(SC_N.myNoteList[t].cutOut) > -1) {
                                    if (SC_N.myNoteList[t].talkID) {
                                        var $noteDiv = $('<mark>').addClass("markNote Note" + SC_N.getColor(SC_N.myNoteList[t].eBookNoteColorNo).colorName).attr({ "data-talkid": SC_N.myNoteList[t].talkID, "name": "markNote" });
                                        $(this).attr("data-talkid", SC_N.myNoteList[t].talkID).html("<span style='border-bottom: 1px solid #f00;'>" + thisText + "</span>").append($noteDiv);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (thisText && thisText.length > 2 && SC_N.myLineList.length > 0) {
                    for (var a = 0, a1 = SC_N.myLineList.length; a < a1; a++) {
                        if (SC_N.myLineList[a].cutOut) {
                            if (SC_N.myLineList[a].cutOut.length > 2) {
                                if (thisText.indexOf(SC_N.myLineList[a].cutOut) > -1) {
                                    $(this).attr("data-mark", "markLine").html("<span style='border-bottom: 1px solid #f00;'>" + thisHtml + "</span>");
                                    break;
                                }
                            }
                        }
                    }
                }
            });
        },
        reacteMark: function () {

        }
    };
    window.SC_N = SC_N;
})();

//考点
function SC_KnowLedge() {
    var knowledgeList = [];
    var bbLeft = 0;

    //标记相关考点
    function MarkKnowledge(pageObj) {
        knowledgeList = SC_R.ebook.knowledgeList || [];
        pageObj.find("p").each(function (i, e) {
            $(this).find("kd").remove();
            var pText = $(this).html();
            if (pText.indexOf(_eS.knowledgeFlag) >= 0) {
                var knowledgeData = "";
                if ($(pText).find("img").length > 0) {
                    $(pText).find("img").each(function (e, i) {
                        knowledgeData += $(this).prop("outerHTML").toString();
                    });
                } else {
                    pText = $(this).text();
                    knowledgeData = pText.substring(pText.lastIndexOf(_eS.knowledgeFlag) + _eS.knowledgeFlag.length);
                }
                var id = (new Date().getTime().toString()) + i, bl = false;
                if (!$(this).attr("data-knowledge")) {
                    $(this).attr("data-knowledge", true);
                    var $em = $('<em>').addClass("knowledge").attr({ "id": id, "data-flag": "knowledge", "data-categorybname": knowledgeData, "style": "color:" + _cS.fcT }).html("&nbsp;(查看同考点内容)");
                    $(this).append($em);
                }

                for (var a = 0, b = knowledgeList.length; a < b; a++) {
                    if (knowledgeList[a].name == knowledgeData) {
                        bl = true;
                        knowledgeList[a].id = id;
                        break;
                    }
                }
                if (!bl) {
                    knowledgeList.push({ id: id, name: knowledgeData, count: 0, query: false });
                }
                getKnowledgeCount(id);
            }
        });
    }

    //查询考点的内容条数
    function getKnowledgeCount(id) {
        for (var a = 0, b = knowledgeList.length; a < b; a++) {
            if (knowledgeList[a].id == id) {
                if (knowledgeList[a].query) {
                    $("#" + id).html("&nbsp;(查看" + knowledgeList[a].count + "条同考点内容)").attr("data-count", knowledgeList[a].count);
                } else {
                    $.ajax({
                        type: "GET",
                        url: webConfig.host + "/handle/tkHandle.ashx?mtype=GetKnowledgeCount&ver=3&name=" + encodeURI(knowledgeList[a].name),
                        success: function (msg) {
                            var json = JSON.parse(msg);
                            var count = 0;
                            if (json.query.run_number == 1) {
                                count = json.Info[0].CategoryNum;
                            }
                            $("#" + id).html("&nbsp;(查看" + count + "条同考点内容)").attr("data-count", count);
                            knowledgeList[a].count = count;
                            knowledgeList[a].query = true;
                            SC_R.ebook.knowledgeList = knowledgeList;
                        }
                    });
                }
                break;
            }
        }
    }

    //展示考点信息
    function showKnowledgeDiv(categoryName, categoryCount) {
        createKnowledgeDiv();
        $("#knowledgeName").html(_eS.knowledgeFlag + categoryName);
        $("#knowledgeDiv").animate({ left: "0px" }, 500);

        if (categoryCount > 0) {
            $("#knowledgeIframe").attr("src", "http://centerp.100xuexi.com/Topper/ProductAbout/KnowledgePointDetail.aspx?action=knowledge_list&display=text&ver=3&name=" + categoryName + "&back=no").show();
            $("#noKnowledge").hide();
        } else {
            $("#knowledgeIframe").hide();
            $("#noKnowledge").show();
        }
    }
    function createKnowledgeDiv() {
        var knowledgeDiv = $("#knowledgeDiv");
        if (knowledgeDiv.length > 0) return false;
        knowledgeDiv = $('<div>').addClass("knowledgeDiv rightDiv").attr({ "id": "knowledgeDiv" });
        var $knowledgeTop = $('<div>').addClass("knowledgeTop Rhead");
        var $backBtn = $("<div>").addClass("BtnBack").attr("id", "BtnBack_knowledge").bind("click", closeKnowledgeDiv);
        var $title = $("<h1>").attr("id", "knowledgeName");
        $knowledgeTop.append($backBtn).append($title);
        $backBtn = $title = null;
        var $knowledgeInfo = $("<div>").addClass("knowledgeInfo").attr({ "id": "knowledgeInfo", "style": "width:100%;height:" + (__h - 44) + "px;" });
        var $iframe = $("<iframe>").attr({ "id": "knowledgeIframe", "style": "width:100%;height:100%;", "frameborder": "0" });
        var $noInfo = $("<div>").attr({ "id": "noKnowledge", "style": "text-align:center;padding-top:50px;height:100px;background:#ffffff;" }).html("<h2 style=\"text-align: center; display: block; height: 30px; line-height: 30px; margin: 10px 0px; color: rgb(0, 0, 0);\">没有相关考点内容</h2>");
        $knowledgeInfo.append($iframe).append($noInfo);
        $iframe = $noInfo = null;
        knowledgeDiv.append($knowledgeTop).append($knowledgeInfo);
        $knowledgeTop = $knowledgeInfo = null;
        $("#EbookRead").append(knowledgeDiv);
        knowledgeDiv = null;
    }
    function fillKnowledgeList(obj) {
        $("#knowledgeInfo").show();
        SC_R.fadeOutLoad(false);
    }
    function noInfo() {
        $("#knowledgeInfo").html("没有相关的考试内容!");
        $("#knowledgeInfo").show();
        SC_R.fadeOutLoad(false);
    }
    function closeKnowledgeDiv(e) {
        stopEvent(e);
        SC_R.fadeOutLoad(false);
        $("#knowledgeDiv").animate({ left: "110%" }, 500);
    }

    return {
        MarkKnowledge: function (pageObj) {
            MarkKnowledge(pageObj);
        },
        showKnowledgeDiv: function (categoryName, categoryCount) {
            showKnowledgeDiv(categoryName, categoryCount);
        }
    }
}

//阻止冒泡,阻止默认行为
function stopEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

////TODO: LocalStorage最大5MB，需要测试
////TODO：没有Web接口，暂时存放在本地
//var db = openDatabase('sc_db', '', 'local database', 20480);

////sql语句执行成功后执行的回调函数  
//function onSuccess(tx, result) {

//    //alert("操作成功");
//}

////sql语句执行失败后执行的回调函数  
//function onError(tx, error) {

//    //alert("操作失败，失败信息：" + error.message);
//}

////创建章节内容表
//function createTableContent(tx, callback) {
//    var columns = 'bookID TEXT,chap TEXT,content TEXT,createdTime TEXT,updateTime TEXT'
//    tx.executeSql("select count(*) cnt from sqlite_master where name=? and sql not like ?", ['ebookContent', '%y%'], function (tx, result) {
//        if (result.rows.item(0).cnt != '0') {
//            tx.executeSql('ALTER TABLE ebookContent RENAME TO ebookContentOld;', [], onSuccess, onError);
//            tx.executeSql('CREATE TABLE ebookContent(' + columns + ');', [], onSuccess, onError);
//            tx.executeSql("INSERT INTO ebookContent SELECT bookID,chap,content,'','' FROM ebookContentOld;", [], onSuccess, onError);
//            tx.executeSql('DROP TABLE ebookContentOld', [], onSuccess, onError);
//        }
//        else {
//            tx.executeSql('create table if not exists ebookContent(' + columns + ')', [], onSuccess, onError);
//        }
//        callback();
//    }, onError)
//}

//function saveContent(ebook) {
//    getContent(function (result, tx) {
//        createTableContent(tx, function () {
//            var time = new Date().getTime();//创建时间
//            if (result) {
//                tx.executeSql('update ebookContent set content=?,updateTime=? where bookID=? and chap=?', [ebook.content, time, ebook.bookID, ebook.chap], null, onError);
//            }
//            else {
//                tx.executeSql('insert into ebookContent values(?,?,?,?,?)', [ebook.bookID, ebook.chap, ebook.content, time, ''], null, onError);
//            }
//        });
//    }, ebook.bookID, ebook.chap)
//}

//function getContent(callback, bookID, chap) {
//    var content;
//    db.transaction(function (tx) {
//        createTableContent(tx, function () {
//            tx.executeSql('select content from ebookContent where bookID=? and chap=?', [bookID, chap],
//                function (tx, result) {
//                    if (result.rows.length > 0) {
//                        content = result.rows.item(0);
//                    }
//                    if (callback) callback.call(null, content, tx);
//                }, onError
//            );
//        });
//    })
//    return content;
//}
