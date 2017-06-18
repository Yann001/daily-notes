(function () {
    var SC_R = {

        RemoteSite: "http://e.100xuexi.com",
        iLoad: new iFrameLoader(),

        serviceIload: new ServiceiFrameLoader(),

        versions: "20160909", //定义版本
        userID: "", //用户ID
        bookID: "", //产品ID
        bookKey: "", //电子书对象保存在localStorage中的key
        contentKey: "", //电子书章节内容保存在localStorage中的key
        configKey: "", //阅读器配置参数保存在localStorage中的key
        ebook: null, //电子书对象
        hxGroupID: "",
        orgID: "", //机构
        groupUserName: "", //机构
        host: "", //网站跳转的域名
        sctsg: "", //圣才图书馆

        fatherID:"", //该书所属的圣才视频、大礼包和全套资料的id    //txy20170329


        cCD: {}, //当前章节的数据currentChapData
        _cI: 0, //当前页所在章节的序号chapIndex
        _cP: 1, //当前页的页码（currentPage）
        _cObj: null, //当前页的对象


        _pI: 0, //前一页所在章节的序号
        _pP: 1, //前一页的页码
        _pObj: null, //上一页的对象


        _nI: 0, //下一页所在章节的序号
        _nP: 1, //下一页的页码
        _nObj: null, //下一页的对象

        _tP: 1, //当前章节的总页数
        _ptP: 1, //上一章节的总页数
        _ntP: 1, //下一章节的总页数

        totalPage_All: 1,

        _ecd: "e_div",
        _ecp: "e_p",
        _ecs: "e_s",
        _ecss: "e_ss",
        _ecg: "e_g",

        menuFlag: false,

        readChapFlag: false, //某一章节处理完成的标志
        layerRead: false,

        localDataFlag: false, //是否读取的本地数据

        longPressFun: null, //长按页面，添加笔记和纠错的技计时函数
        clickFun: null, //区分双击图片的计时方法

        showCatalogFlag: false, //是否重新生成目录的标识

        errorImgCount: 0, //PDF类电子书加载失败的图片数量
        loadImgCount: 0, //PDF类电子书加载成功的图片数量

        loadContinueT: 10, //记载电子书的持续时间,超过这个时间提示网速不好
        loadSetTimeoutFun: null,
        showTimeFun: null,

        myNewSearchArray: [],
        searchTXT: null,

        isRePaging: false, //是否正在重新分页

        tagList: ["p", "b", "a", "span", "h1", "h2", "h3", "h4", "h5", "h6", "td"],        

        //阅读器入口
        init: function () {
            //进入阅读器时显示的动画
            //createEnterDiv();

            //禁止选中文字，禁止复制，禁止鼠标右键
            document.body.onselectstart = document.body.oncopy = document.body.oncontextmenu = function () { return false; };

            //页面发生滚动时
            //cxf
            document.onscroll = function () { console.log('scroll'); return _cS.flip_way != "roll" ? false : true; };

            //开始计时,超过时间没有处理好电子书的则弹出提示
            SC_R.loadSetTimeoutFun = setTimeout(function () {
                ebookError("电子书加载超时!", "加载超时--1");
            }, SC_R.loadContinueT * 1000);

            //获取初始数据
            getParameter();//获取URL中其他参数
            getUserID();//获取用户ID
            getKey();//设置localStorage中相应对象的key
            getEbookObj();//从localStorage中获取电子书对象
            GetOrignalStr();

            //判断设备是否支持手指触摸
            touch.isTouchDevice(bindEvent);
            getScreenWH();

            //创建阅读器
            SC_R.fragment = document.createDocumentFragment();
            createCurrentTitle();
            createReaderTop();
            createUISet();
            createReaderBot();
            createReaderRight();
            createReaderNavList();
            document.getElementById("BookAction").appendChild(SC_R.fragment);
            SC_R.fragment = null;
            bookActionBind();//给阅读器绑定事件

            refreshUI();//从localStorage中获取阅读器配置参数
            createLoadingDiv();//创建加载动画

            //先获取这本书当前用户的笔记信息
            SC_N.getUserNote(SC_R.userID, SC_R.bookID, function () {
                //初始化一些设置,背景颜色，阅读模式，亮度，字号
                setFontSize();
                setBrightnessNumber();
                setFilpWay();
                setBackGround();
                setSunMoon();

                if (SC_R.bookID > 0) {
                    //如果本地已经有该电子书的数据，则直接用本地的数据,没有则从服务器加载
                    console.log('---------- SC_R.ebook.info -- from  local--------');
                    //console.log(SC_R.ebook.info);

                    if (!SC_R.ebook.info) {
                        SC_R.localDataFlag = false; // 是否读取的是本地数据
                        SC_R.ebook.info = {};  // 再次清空？？？
                        //www100eshu接口不再维护，使用新接口
                        SC_R.serviceIload.getData("/app/GetBookDetail.ashx?book_id=" + SC_R.bookID, function (res) {
                            var json = JSON.parse(res);
                            var request = getRequest();
                            // console.log("test-------------json---------------------");
                            // console.log(json);
                            if (json.book) {

                                if (json.book.IsPackage == 2) { //如果是圣才视频，则跳转到新的页面
                                    //location.href = "http://" + SC_R.host + "/Ebook/DigitalLibrary/ShowEBook.aspx?plat=1&id=" + json.book.id;
                                    location.href = "/#/products/index/" + json.book.id + "/2/package?orgID=" + request["orgID"] +"&groupUserName="+request["groupUserName"];
                                    return;
                                }
                                if (json.book.IsPackage == 1) { //如果是全套资料，则跳转到新的页面
                                    //location.href = "http://" + SC_R.host + "/Ebook/DigitalLibrary/ShowEBook.aspx?plat=1&id=" + json.book.id;
                                    location.href = "/#/products/index/" + json.book.id + "/1/package?orgID=" + request["orgID"] +"&groupUserName="+request["groupUserName"];
                                    return;
                                }

                                var obj = {};
                                obj.viewPassword = json.book.viewPassword;
                                //qinxiankang 暂存书籍密码，用于和外层frame交互
                                localStorage.setItem("viewPassword", obj.viewPassword);
                                obj.id = SC_R.bookID;
                                obj.name = json.book.name;
                                obj.book_file = json.book.book_file;
                                obj.coverImg = json.book.pic;
                                //提前加载封面
                                var prestrainImg = new Image();
                                prestrainImg.src = obj.coverImg;

                                obj.isPdf = json.book.isPdf;
                                obj.pages = json.book.pages;
                                obj.size = json.book.size;
                                obj.makeTool = json.book.makeTool;
                                obj.freePageNums = 10;
                                obj.price = json.book.price;
                                obj.isbuy = false;
                                obj.catalog = [];
                                obj.content = {};
                                obj.freeFlag = false; //新增加的属性，目录文件是否注明某章节是否免费
                                obj.catalogRead = false; //是否生成了目录的标识
                                obj.MarkRead = false; //是否生成了目录的标识
                                obj.musicUrl = json.book.musicUrl;
                                console.info("musicUrl", obj.musicUrl);

                                //音乐播放
                                if (obj.musicUrl!=null && obj.musicUrl.length > 0) {
                                    var audio = document.getElementById("ReaderProductAudio");
                                    $("#BtnBgMusic").css("display", "block");
                                    //console.info(audio);
                                    audio.src = obj.musicUrl;
                                    audio.loop = false;
                                    audio.play();

                                    $("#BtnBgMusic").bind("click", function () {
                                        console.info("play");
                                        if (audio.paused || audio.ended) {
                                            var audios = $("audio");
                                            for (i = 0; i < audios.length; i++) {
                                                audios[i].pause();
                                            }
                                            if ($(".BtnControl").hasClass("Playing")) {
                                                $(".BtnControl").removeClass("Playing");
                                            }
                                            audio.play();
                                            $("#BtnBgMusic").addClass("BtnBgMusicPlaying");
                                        } else {
                                            $("#BtnBgMusic").removeClass("BtnBgMusicPlaying");
                                            audio.pause();
                                        }
                                    })


                                    audio.addEventListener('ended', function () {
                                        $("#BtnBgMusic").removeClass("BtnBgMusicPlaying");
                                    }, false);

                                    audio.addEventListener('error', function () {
                                        console.info("播放失败");
                                        $("#BtnBgMusic").hide();
                                    }, false);
                                }

                                SC_R.ebook.info = obj;

                                //console.log(SC_R.ebook.info);
                                //saveEbookLocal();
                                //获取电子书的阅读信息
                                if (!SC_R.ebook.read) bookRead("get");


                                //设置阅读器的标题
                                setTitle();

                                //判断该产品是否购买
                                //console.log("判断该产品是否购买");
                                getIsBuy();

                                //判断该产品是否有相关直播
                                getLive();

                                //如果该本书是PDF类电子书
                                if (SC_R.ebook.info.isPdf == true) {
                                    //console.log("test-------------SC_R.ebook----------------");
                                    //console.log(SC_R.ebook);

                                    SC_R.ebook.info.PdfImgUrl = getBaseUrl(json.book.book_file, "images");
                                    SC_R.ebook.info.PdfMediaUrl = getBaseUrl(json.book.book_file, "publish");
                                    SC_R.ebook.info.PdfPages = json.book.pages;
                                    SC_R.ebook.info.freePageNums = Math.ceil(0.1 * SC_R.ebook.info.PdfPages);
                                    SC_R.ebook.info.totalChap = 1;
                                    SC_R.ebook.info.loadCount = 1;
                                    SC_R._cP = 1;

                                    SC_R.ebook.info.catalog[0] = {
                                        lev: 1,
                                        chap: "chap0.html",
                                        free: true,
                                        name: SC_R.ebook.info.name
                                    };
                                    SC_R.ebook.info.content["chap0.html"] = {
                                        lev: 1,
                                        chap: "chap0.html",
                                        free: true,
                                        name: SC_R.ebook.info.name,
                                        paging: 3,
                                        sort: false,
                                        chapDiv: "0",
                                        loadFlag: 3,
                                        chapInfo: "",
                                        startPage: 1,
                                        totalPage: SC_R.ebook.info.pages,
                                        chapData: { 'chap': 'chap0.html', 'chapInfo': 'PDF' }
                                    }
                                    SC_R.ebook.info.chapList = ["chap0.html"];

                                    if (jQuery.isEmptyObject(SC_R.ebook.read)) {
                                        SC_R.ebook.read.chap = "chap0.html";
                                        SC_R.ebook.read.page = 1;
                                        SC_R.ebook.read.fs = _cS.fs;
                                    }

                                    //处理PDF格式的电子书
                                    setPdfConfig();

                                    //默认设置为上下翻页
                                    _cS.flip_way = "roll";
                                    setFilpWay();

                                    console.log("翻页模式为" + _cS.flip_way);


                                    if (SC_R.ebook.info.PdfImgUrl) {
                                        loadPdfMedia(function () {
                                            SC_R.initEnd();
                                        });
                                    } else {
                                        ebookError("", "找不到电子书PDF图片路径--1");
                                        return false;
                                    }
                                } else {
                                    //console.info("load");
                                    changeMoonSunStyle();
                                    setStyle();

                                    SC_R.ebook.info.baseURL = getBaseUrl(json.book.book_file, "oebps");

                                    if (SC_R.ebook.info.baseURL) {

                                        loadEpubCatalog(function () {
                                            SC_R.initEnd();
                                        });
                                    } else {
                                        ebookError("", "找不到电子书目录路径--2");
                                        return false;
                                    }
                                }
                            } else {
                                ebookError("", "获取电子书详情失败--3");
                                return false;
                            }
                        });

                    } else {

                        //console.log( '提前加载封面' );
                        //提前加载封面
                        var prestrainImg = new Image();
                        prestrainImg.src = SC_R.ebook.info.coverImg;

                        SC_R.localDataFlag = true;
                        //设置阅读器的标题
                        setTitle();
                        SC_R.ebook.info.catalogRead = false;
                        SC_R.ebook.info.MarkRead = false;
                        if (!SC_R.ebook.info.content) SC_R.ebook.info.content = {};
                        //for (var t = 0; t < SC_R.ebook.info.content.length; t++) {
                        //    SC_R.ebook.info.content[t].sort = false;
                        //}
                        for (var key in SC_R.ebook.info.content) {
                            SC_R.ebook.info.content[key].sort = false;
                        }
                        console.log("ebook.info is not null");
                        getIsBuy();
                        getLive();

                        if (!SC_R.ebook.read) {
                            if (SC_R.ebook.info.catalog[0].chap) {
                                SC_R.ebook.read = {
                                    'chap': SC_R.ebook.info.catalog[0].chap,
                                    'page': 1,
                                    'fs': _cS.fs
                                };
                            } else {
                                ebookError("", "找不到章节--4");
                                return false;
                            }
                        }

                        if (SC_R.ebook.info.isPdf == true) {
                            //处理PDF格式的电子书
                            setPdfConfig();

                            disposePdf(SC_R.ebook.read, function () {
                                SC_R.initEnd();
                            });
                        } else {
                            loadChapInfo(SC_R.ebook.read, function () {
                                SC_R.initEnd();
                                if (!SC_R.ebook.info.freeFlag) ebookError("", "电子书目录信息有误--5");
                            });
                        }
                    }
                } else {
                    ebookError("", "没有获取到电子书id--6");
                    return false;
                }

            });
        },

        //阅读器加载完成
        initEnd: function () {
            clearTimeout(SC_R.loadSetTimeoutFun);

            //如果当前页是首页，则需要先判断一下首页的图片是否加载完了，需要等待它加载完了再隐藏box-loading
            if (SC_R._cI == 0 && SC_R._cP == 1) {
                $("#box-loading").hide();
            } else {
                $("#box-loading").hide();
            }

            if (SC_R.ebook) {

                if (!SC_R.orgID) {
                    // SC_SH = SC_Shake();
                    // SC_SH.showShakeDiv({ userID: SC_R.userID, productID: SC_R.ebook.info.id }, null);
                    // SC_AD.AddAdvertisement({ productId: SC_R.ebook.info.id, platNum: 1 }, null);
                }

                //购买按钮的显示与隐藏
                if (SC_R.ebook.info.isbuy) {
                    $("#BtnBuy").hide();
                    $("#Separator_b").hide();
                }

                //监听是否横竖屏
                //window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientation, false);
                window.addEventListener("resize", function () {
                    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww");

                }, false);
            }

            //判断是否是电脑访问
            if (checkPc()) {
                $(".UISetMenu").addClass("PcUISetMenu");
                $(".LeftBtns #BtnBack").remove();
            }



            console.log("-------------------------------------");
        },

        //获取跳转的URL
        getGotoUrl: function () {
            getGotoUrl();
        },

        SCLocation: function () {
            SCLocation();
        },

        //保存阅读器配置参数到本地localStorage
        saveUI: function () {
            saveUI();
        },

        //保存ebook对象到本地localStorage
        saveEbookLocal: function () {
            saveEbookLocal();
        },

        //显示加载动画
        fadeInLoad: function (speed, mask, callback) {
            fadeInLoad(speed, mask, callback);
        },

        //隐藏加载动画
        fadeOutLoad: function (speed, callback) {
            fadeOutLoad(speed, callback);
        },

        //点击翻页,供语音朗读使用
        flipPage: function (e, cX, cY, callback) {
            flipPage(e, cX, cY, callback);
        },

        gotoTarget: function (index) { gotoTargetCatalog(index); }


        //loadChapInfo:loadChapInfo
    };

    window.SC_R = SC_R;

    //判断是否是App出的书，添加不同的样式表
    function setStyle() {
        //生成一个随机数，样式表读取线上最新的，解决样式缓存问题
        var rnd = parseInt(1000 * Math.random());
        //console.log("生成随机数" + rnd);
        var styleUrl = "";
        if (SC_R.ebook.info.makeTool == "AppMakerPlat") {
            styleUrl = "http://g.100xuexi.com/CssModel/100eshu/app/M-Art.css?" + rnd;
            //console.log("App出的书，样式是" + styleUrl);
            $("body").css("padding", "0");
        }
        else {
            styleUrl = "http://g.100xuexi.com/CssModel/100eshu/app/stylesheet.css?" + rnd;
            //console.log("考试类书，样式是" + styleUrl);
            $("body").css("padding", "0");
        }
        $("head").append('<link href="' + styleUrl + '" rel="stylesheet" />');
    }

    function changeMoonSunStyle() {
        //生成一个随机数，样式表读取线上最新的，解决样式缓存问题
        var rnd = parseInt(1000 * Math.random());
        //console.log("生成随机数" + rnd);
        var styleUrl = "";
        if (_cS.moon_sum == "sun") {
            styleUrl = "../css/ebook_main.css?" + rnd;
            //console.log("白天模式，样式是" + styleUrl);
            $("body").css("padding", "0");
        }
        else {
            styleUrl = "../css/ebook_main_night.css?" + rnd;
            //console.log("夜晚模式，样式是" + styleUrl);
            $("body").css("padding", "0");
        }

        $("#MoonNightCss").attr("href", styleUrl);
    }

    //*****************************************************阅读器电子书加载处理   start ******************************************************//
    //ebook网页实际地址
    function getBaseUrl(str, flag) {
        var pos1 = str.indexOf('/ebook/');
        var pos2 = str.indexOf('/mobile/');

        //定义电子书内容样式表，默认是考试类电子书样式表


        //如果是app出的书，路径单独处理
        if (SC_R.ebook.info.makeTool == "AppMakerPlat") {
            //http://www.100eshu.com/uploads/MemberPrepareEbook/58c7b004-9ec9-43fc-add3-c69efc6280ec.epub
            var dir = str.replace(".epub", "_online/");

            console.debug("dir", dir);
            if (flag == "oebps") {
                return dir + "OEBPS/";
            } else if (flag == "images") {
                return dir + "images/";
            } else {
                return "";
            }
        }
        if (pos1 > 0 && pos2 > 0 && pos2 - pos1 == 39) {
            var uid = str.substr(pos1 + 7, 32);
            if (flag == "oebps") {
                //return SC_R.RemoteSite + "/uploads/ebook/" + uid + "/mobile/html/OEBPS/";
                return SC_R.RemoteSite + "/uploads/ebook/" + uid + "/mobile/epub/OEBPS/";
            } else if (flag == "images") {
                return SC_R.RemoteSite + "/uploads/ebook/" + uid + "/mobile/images/";
            } else if (flag == "publish") {
                return SC_R.RemoteSite + "/uploads/ebook/" + uid + "/publish/controls.xml";
            } else {
                return "";
            }
        }
        return '';
    }

    //生成  ebook.info.catalog的数据
    function getEbookCatalog(catalog, list, lev) {
        list.each(function (index) {
            var item = {};
            var free = $(this).attr("data-free") || "";
            var href = $(this).find(">content").attr("src");
            var text = $(this).find(">navlabel >text").text();
            var n = href.indexOf("#");
            item.lev = lev;
            item.chap = (n > 0) ? href.substring(0, n) : href;
            item.name = text.replace(/[◆◇]*/g, '');
            item.free = free;

            //有效章节判断
            if (item.name.length > 0 && item.chap.length > 0)
                catalog.push(item);

            if ($(this).find(">navpoint").length > 0) {
                getEbookCatalog(catalog, $(this).find(">navpoint"), lev + 1);
            }
        });
    }

    //生成 ebook.info.content的数据
    function getEbookContent(catalog, content) {
        var chapList = [],
    	count = 0,
    	parentName = "";
        for (var i = 0, i1 = catalog.length; i < i1; i++) {
            if (!content[catalog[i].chap]) {
                chapList.push(catalog[i].chap);
                var obj = {
                    'lev': catalog[i].lev,
                    'chap': catalog[i].chap,
                    'name': catalog[i].name,
                    'free': catalog[i].free,
                    'first': false, //所属大章节的第一小章节
                    'last': false, //所属大章节的最后一小章节
                    'parentName': parentName, //所属大章节的名称
                    'startPage': 1,
                    'totalPage': 1,
                    'loadFlag': 1, //该章节的数据下载状态 1:未下载；2:正在下载；3:已下载；4:下载失败
                    'chapDiv': count,
                    'paging': 1, //该章节的数据分页状态 1:未分页；2:正在分页；3:已分页
                    'sort': false,
                    'chapData': {}
                };
                content[catalog[i].chap] = obj;
                count++;
            } else {
                if (i > 0) {
                    parentName = catalog[i - 1].name;
                    content[catalog[i - 1].chap].parentName = parentName;
                }
                content[catalog[i].chap].name = catalog[i].name;
                content[catalog[i].chap].parentName = parentName;

                if (i > 0 && content[catalog[i - 1].chap]) content[catalog[i - 1].chap].first = true;
                if (i > 1 && content[catalog[i - 1].chap]) content[catalog[i - 2].chap].last = true;
            }
            if (i == i1 - 1) {
                content[catalog[i].chap].last = true;
            }
            //saveContent({ bookID: SC_R.ebook.info.id, chap: catalog[i].chap, content: JSON.stringify(content[catalog[i].chap]) });
        }
        SC_R.ebook.info.chapList = chapList;
        SC_R.ebook.info.totalChap = SC_R.ebook.info.chapList.length;
    }

    //处理那些章节是收费的那些章节是免费的
    //2016-10-25 秦贤康修改 添加对totolaChap=1的判断，一页的书进不去的问题修正
    function getChapFree(freeChapId) {
        var freeCount = 0;
        var freeChap = "";

        for (var t = 0; t < SC_R.ebook.info.catalog.length; t++) {
            if (SC_R.ebook.info.catalog[t].free == "false") {
                SC_R.ebook.info.freeFlag = true;
                freeCount = t;
                freeChap = SC_R.ebook.info.catalog[t].chap;
                break;
            }
        }

        if (!SC_R.ebook.info.freeFlag) {
            SC_R.ebook.info.freeFlag = true;
            if (SC_R.ebook.info.totalChap > 20) {
                freeCount = 3;
            } else if (SC_R.ebook.info.totalChap > 10 && SC_R.ebook.info.totalChap <= 20) {
                freeCount = 2;
            } else if (SC_R.ebook.info.totalChap > 4 && SC_R.ebook.info.totalChap <= 10) {
                freeCount = 1;
            } else if (SC_R.ebook.info.totalChap >= 1 && SC_R.ebook.info.totalChap <= 4) { //添加=1判断
                freeCount = 0;
            } else {
                SC_R.ebook.info.freeFlag = false;
            }
            freeChap = SC_R.ebook.info.chapList[freeCount];
        }

        trigger = false;
        for (var t = 0, a = SC_R.ebook.info.catalog.length; t < a; t++) {
            if (!trigger || SC_R.ebook.info.catalog[t].chap == freeChap || t == freeChapId) {
                SC_R.ebook.info.catalog[t].free = true;
                SC_R.ebook.info.content[SC_R.ebook.info.catalog[t].chap].free = true;
            } else {
                SC_R.ebook.info.catalog[t].free = false;
                SC_R.ebook.info.content[SC_R.ebook.info.catalog[t].chap].free = false;
            }
            if (SC_R.ebook.info.catalog[t].chap == freeChap) {
                trigger = true;
            }
        }
    }

    function requestError(str) {
        if (str) {
            if (str.indexOf("error 500") > -1 || str.indexOf("error 501") > -1 || str.indexOf("error 502") > -1 || str.indexOf("error 503") > -1 || str.indexOf("error 504") > -1 || str.indexOf("error 505") > -1) {
                return false;
            }
            if (str.indexOf("error 400") > -1 || str.indexOf("error 401") > -1 || str.indexOf("error 402") > -1 || str.indexOf("error 403") > -1 || str.indexOf("error 404") > -1 || str.indexOf("error 405") > -1) {
                return false;
            }
            return true;
        }
        return false;
    }

    /////////////////////////////////////    Epub类电子书    ///////////////////////////////////////////
    //获取Epub类电子书的内容 从toc.ncx 读 content（目录）
    function loadEpubCatalog(callback) {
        if (!SC_R.ebook.info.baseURL) {
            ebookError("", "找不到电子书目录路径--7");
        } else {
            SC_R.iLoad.getData(SC_R.ebook.info.baseURL + "toc.ncx", function (res) {
                //console.log("loadEpubCatalog: ebook.info.baseURL:" + SC_R.ebook.info.baseURL + "toc.ncx");
                //console.log(SC_R.ebook.info.book_file);
                if (requestError(res)) {
                    var html = res.substring(res.indexOf('<ncx'), res.indexOf('</ncx') + 6);
                    // console.log( html );
                    getEbookCatalog(SC_R.ebook.info.catalog, $(html).find("navmap >navpoint"), 1);
                    //console.log( 'catalog' );
                    //console.log( SC_R.ebook.info.catalog );
                    //console.log(JSON.stringify(SC_R.ebook));
                    getEbookContent(SC_R.ebook.info.catalog, SC_R.ebook.info.content);
                    // console.log(SC_R.ebook.info.catalog);
                    if (SC_R.ebook.info.catalog.length > 0) {
                        var request = getRequest();
                        var freeChapId = Number(request["chapid"]) || 0;

                        getChapFree(freeChapId);
                        SC_R.ebook.info.loadCount = 0;

                        if (jQuery.isEmptyObject(SC_R.ebook.read) || freeChapId > 0) {
                            SC_R.ebook.read = {
                                'chap': SC_R.ebook.info.catalog[freeChapId].chap,
                                'page': 1,
                                'fs': _cS.fs,
                                'isfree': freeChapId
                            };
                        }
                        SC_R.ebook.info.loadAll = false;
                        loadChapInfo(SC_R.ebook.read, function () {
                            if (SC_R.ebook.info) {
                                saveEbookLocal();
                                if (!SC_R.ebook.info.freeFlag) ebookError("", "电子书目录信息有误--8");
                            }
                            if (callback) callback();
                        });
                        SC_R._cP = 1;
                    } else {
                        ebookError("", "电子书没有目录--9");
                    }
                } else {
                    ebookError("", "没有获取到电子书的目录信息--10");
                }
            });
        }
    }

    //处理Epub类电子书某一章节的数据  
    function loadChapInfo(chap, callback) {
        if (!chap) {
            callback();
            ebookError("", "请传入正确的章节信息--11");
            return false;
        } else {
            if (!chap.chap) {
                callback();
                ebookError("", "请传入正确的章节名--12");
                return false;
            }
        }

        console.log("loadChapInfo: start dispose the chap ----" + chap.chap);

        SC_R.cCD = {};
        var chapRead = "0";
        //查看该章节的数据是否已经下载到页面上
        //如果页面上已经有该章节的数据，则不用重新加载；没有的话，则需要临时加载
        if (!SC_R.ebook.info.content) {
            SC_R.ebook.info.content = {};
        }
        SC_R.cCD = SC_R.ebook.info.content[chap.chap].chapData;
        chapRead = SC_R.ebook.info.content[chap.chap].paging;

        if (jQuery.isEmptyObject(SC_R.cCD)) {
            //临时加载该章节的数据
            iLoadChap(chap, callback);
        } else {
            //如果该章节的数据还没处理，则需要先处理
            //如果该章节的数据已经处理了，则直接显示该章节的chapDiv，隐藏其他章节的chapDiv
            console.log("loadChapInfo: this chap.read=" + chapRead);
            if (chapRead == "3") {
                //fillEpubChap(chap.chap);
                console.log("loadChapInfo: the chap(" + chap.chap + ") is readed");
                disposeBookBody(chap, callback);
            } else {
                var callback0 = callback;
                //针对只有一个章节的电子书
                if (!SC_R.ebook.info.freeFlag && SC_R.ebook.info.totalChap == 1) {
                    callback0 = function () {
                        SC_R.ebook.info.pages = $("#chapDiv0").children().length;
                        SC_R.ebook.info.freePageNums = Math.ceil(0.1 * SC_R.ebook.info.pages);
                        $("#chapDiv0").children().each(function () {
                            if (parseInt($(this).attr("data-page")) <= SC_R.ebook.info.freePageNums) {
                                $(this).attr("data-free", "Y");
                            } else {
                                $(this).attr("data-free", "N");
                            }
                        });
                        if (callback) callback();
                    }
                }
                disposeChapInfo(chap, callback0);
                callback0 = null;
            }
        }
        saveEbookLocal();
    }

    //加载某一章节chap.html的数据
    function iLoadChap(chap, callback) {
        //2 表示正在下载
        SC_R.ebook.info.content[chap.chap].loadFlag = 2;
        chap.disposeChap = chap.disposeChap === false ? false : true;
        console.time("load");
        var aaaaaaaa = setTimeout(function () {
            //加载超时
            if (SC_R.ebook) {
                SC_R.ebook.info.content[chap.chap].loadFlag = 4;
            }
            if (callback) {
                callback();
            }
        }, SC_R.loadContinueT * 1000);

        console.log("iLoadChap: load the chap(" + chap.chap + ")......start loading");


        SC_R.iLoad.getData(SC_R.ebook.info.baseURL + chap.chap, function (res) {
            // console.log(res);
            clearTimeout(aaaaaaaa);
            if (requestError(res) && SC_R.ebook) {
                console.timeEnd("load")
                console.log("iLoadChap: load the chap(" + chap.chap + ")......succeed loading");
                res = res.replace(/autoplay/ig, "");

                SC_R.ebook.info.content[chap.chap].paging = 1;
                SC_R.ebook.info.content[chap.chap].sort = false;
                SC_R.ebook.info.content[chap.chap].totalPage = 0;
                SC_R.ebook.info.content[chap.chap].loadFlag = 3;

                // todo qinxiankang 如果是章节，直接用iframe
                // console.info("iframe",res);
                // var iframeData = "<iframe src='"+SC_R.ebook.info.baseURL + chap.chap+"' style='width:100%;height:100%' />iframe";
                // SC_R.ebook.info.content[chap.chap].chapData = { chap: chap.chap, chapInfo: iframeData };

                SC_R.ebook.info.content[chap.chap].chapData = { chap: chap.chap, chapInfo: processHtml(res, SC_R.ebook.info.baseURL) };

                SC_R.ebook.info.loadCount++;
                saveContentLocal(chap.chap, SC_R.ebook.info.content[chap.chap]);

                if (chap.disposeChap) disposeChapInfo(chap, callback);
                else pagingEpubChap(chap.chap, callback);

            } else {
                if (chap.disposeChap) {
                    ebookError("", "章节加载失败--13");
                } else {
                    SC_R.ebook.info.content[chap.chap].loadFlag = 4;
                    if (callback) callback();
                }
                return false;
            }
        });
    }

    //处理html中字符
    function processHtml(res, baseUrl) {
        //console.log("processHtml",res);
        var html = "";
        var style = null;
        if (res.lastIndexOf('<body') > 0) {

            //获取书中的style 如果有的话
            style = res.match(/<style>([\s\S])*<\/style>*/);
            //if(style&&style.length>0)console.info("get style",style[0]);

            html = res.substring(res.lastIndexOf('<body'), res.lastIndexOf('</body') + 7);
        } else {
            html = res;
            while (html.length > 1 && html.charAt(0) === ' ') html = html.substr(1);
        }

        html = html.replace('\r\n', '').replace('\r', '').replace('\n', '')
        .replace('<!--从word中提取的内容-->', '')
        .replace('<p>&nbsp;</p>', '')
        .replace(/>[\s]+/g, '>')
            //.replace(/【考点】([^<]{2})/g, "<span style=\"color: green;\">【考点】</span>$1") /*处理考点*/
            //.replace(/【答案】([^<]{2})/g, "<span style=\"color: green;\">【答案】</span>$1") /*处理答案*/
            //.replace(/【解析】([^<]{2})/g, "<span style=\"color: green;\">【解析】</span>$1") /*处理解析*/
            .replace(/<([^\/][\S\s]*?)>/g, function (s0, attrs) { /*处理所有标签内容，文本不作处理*/
                attrs = attrs
            	.replace(/\s+/g, ' ') /*所有换行转为空格*/
            	.replace(/[\x20]+([\w]+-[\w]+)[\s]*=[\s]*([\x21\x23-\x26\x28-\x7e]+)/g, ' $1="$2"') /*对属性值加引号*/
            	.replace(/[\x20]+href[\s]*=[\s]*['"]([\S0-9]+)['"]/g, " data-href=\"$1\"") /*将href转为data-href*/
            	.replace(/[\x20]+class[\s]*=[\s]*['"]([1-9]*)['"]/g, " class=\"h$1\"") /*在纯数字class值之前加上前缀h*/
            	.replace(/[\x20]+lang[\s]*=[\s]*['"]([\w]+[-]?[\w]+)['"]/g, "") /*去除lang属性*/
            	.replace(/[\x20]+xml:lang[\s]*=[\s]*['"]([\w]+-[\w]+)['"]/g, "") /*去除xml:lang属性*/
            	.replace(/[\x20]+align[\s]*=[\s]*['"](left|center|right)['"]/g, "") /*去除align属性*/
            	.replace(/[\x20]+style[\s]*=[\s]*('\s*'|"\s*")/g, "") /*处理空样式*/
            	.replace(/[\x20]+style\s*=\s*('[^']*'|"[^"]*")/g, function (s0, s1) { /*处理style样式*/
            	    s1 = s1
            		.replace(/;[\x20]*/g, ";")
            		.replace(/mso-([\w\-]+):([\w\x20\u4E00-\u9FA5'.-]+);/g, "")
            		.replace(/line-height[\s]*:[\s]*[\S]+;/g, "") /*删除line-height这个样式*/
            		.replace(/font-family:宋体[\;]*/g, "") /*删除font-family:宋体这个样式*/
            		.replace(/font-size:(\d+|\d+\.[0-9]{1,2})(px|em|pt|rem)[\;]*/g, "") /*删除font-size:宋体这个样式*/
            		.replace(/color:black[\;]*/g, "") /*删除color:black这个样式*/;
            	    if (s1 && s1 != "''") s1 = ' style=' + s1;
            	    else s1 = "";
            	    return s1;
            	})
            	.replace(/[\x20]+src[\s]*=[\s]*['"](\S+)['"]/g, function (s0, s1) { /*处理src属性，使图片资源链接正常*/

            	    //2016-09-27 秦贤康 修正html为http
            	    //return s1.indexOf("html") === 0 ? " src=\"" + s1 + "\"" : " src=\"" + baseUrl + s1 + "\"";
            	    return s1.indexOf("http") === 0 ? " src=\"" + s1 + "\"" : " src=\"" + baseUrl + s1 + "\"";
            	})
            	.replace(/:[\x20]*([0-9.]+)pt/g, function (s0, s1) { /*处理样式单位，将pt转换为px*/
            	    if (s1.indexOf('.') === 0) s1 = '0' + s1;
            	    return ":" + (Number(s1) * (parseFloat(getDPI()[0]) / 72)).toFixed(2) + "px";
            	});
                var res = "<" + attrs + ">";
                return res;
            });
        //qinxiankang 章模版的样式不在body中，而在style标签里，把style中的样式提取出来，放入一个div中
        if (style && style.length > 0) html = html.replace("</body>", "<div class='StyleContainer'>" + style[0] + "</div></body>");


        //console.log(html);
        return html;
    }

    //填充某一章节的第一页内容
    function fillEpubChap(chap) {
        if (SC_R.ebook.info.isPdf != true) {
            getContentObj(chap);
            var c = SC_R.ebook.info.content[chap].chapDiv;
            var pageList = SC_R.ebook.info.content[chap].chapData.pageList;
            var $chapDiv = $("#chapDiv" + c);
            if ($chapDiv.length <= 0) $chapDiv = createChapDiv(c);
            $chapDiv.empty().html(pageList["1"]);
            pageList = null;
        }
    }

    //判断chap章节是否已经做了分页处理
    function isPagingChap(chap) {
        if (SC_R.ebook.info.content[chap.chap].paging != 3) {
            pagingEpubChap(chap, null);
        }
    }

    //处理epub类电子书的某一章节的内容
    function disposeChapInfo(chap, callback) {
        pagingEpubChap(chap.chap, null);
        disposeBookBody(chap, callback);
    }

    //对Epub类电子书的章节进行分页处理
    function pagingEpubChap(chap, callback) {
        console.log("pagingEpubChap: paging the chap ---" + chap + ".....start paging");
        // 设置页面宽度，高度，行高等
        creatPagConfig();
        // 从localStorage获取章节原始HTML内容，对各种标签进行处理
        preProccessChap(chap);
        //预处理完成后更新了_pag.cCD_P.chapInfo，这里面包含了整个章节的内容
        //每一个章节的数据内容放在一个div（class为chText的div）中
        $("#chapDiv" + _pag.chapIndex_d).remove();
        //var $chapDiv = createChapDiv(_pag.chapIndex_d);
        _pag.chapDiv = createChapDiv(_pag.chapIndex_d);
        //这里需要精准的分页处理
        //封面是否已经处理的标志
        _pag.cover = false;
        if (_pag.chapIndex_d == "0") _pag.cover = false;
        else _pag.cover = true;
        _pag.pCount = $(_pag.cCD_P.chapInfo).size();
        processingChap(); // 开始处理分页
        endProcessChap()

        setChapStartPage(_pag.chapIndex_d);
        resetPagConfig();
        //准备数据分离
        saveContentLocal(chap, SC_R.ebook.info.content[chap]);

        if (callback) callback();
        console.timeEnd("paging end");
        console.log("pagingEpubChap: paging the chap ---" + chap + "......succeed paging");

        //for new 
        if (_cS.flip_way == "roll") {
            $('.chapDiv').remove();
        }
    }

    //计算整个P的高度CalulerLineHeight,模拟真正的页面样式
    function CLH(content) {
        var $clh = $("#clh");
        if ($clh.length <= 0) {
            $clh = $("<div>").addClass("chText").attr({
                "id": "clh",
                "style": "width:" + _pag.pageWidth + "px;word-wrap:break-word;"
            });
            $("#BookBody").append($clh);
        }
        return $clh.html(content).outerHeight();
    }

    function judgeNodeName(nodeName) {
        var nodeNameList = ["P", "B", "IMG", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "TABLE", "BR", "DIV"];
        for (var i = 0; i < nodeNameList.length; i++) {
            if (nodeName == nodeNameList[i]) return true;
        }
        return false;
    }

    //预处理chap的内容,
    function preProccessChap(chap) {
        _pag.pagChap = chap;
        _pag.chapIndex_d = 0;
        _pag.chapStartPage = 1;
        _pag.chapTotalPage = 0;
        _pag.cCD_P = {};
        _pag.chapDiv = null;
        _pag.marginTopH = 0;
        _pag.currentText = "";
        _pag.currentIndex = -1;

        if (!SC_R.ebook.info.content) {
            SC_R.ebook.info.content = {};
        }
        getContentObj(chap, false);
        _pag.cCD_P = SC_R.ebook.info.content[chap].chapData;
        _pag.chapIndex_d = SC_R.ebook.info.content[chap].chapDiv;;
        _pag.chapStartPage = SC_R.ebook.info.content[chap].startPage;
        _pag.chapStartPage = !_pag.chapStartPage ? 1 : _pag.chapStartPage;

        SC_R.ebook.info.content[chap].chapData.pageList = {};

        if (!_pag.cCD_P.chapInfo) {
            _pag.cCD_P.chapInfo = "";
        }
        var newChapInfo = _pag.cCD_P.chapInfo;
        // 去掉<body>标签，取<body></body>里的内容
        if (newChapInfo.lastIndexOf("<body>") > -1) {
            newChapInfo = newChapInfo.substring(newChapInfo.lastIndexOf("<body>") + 6);
        }
        if (newChapInfo.lastIndexOf("</body>") > -1) {
            newChapInfo = newChapInfo.substring(0, newChapInfo.lastIndexOf("</body>"));
        }

        var $chText = $("#chText");
        if ($chText.length > 0) {
            $chText.remove();
        }
        $chText = createTag("div", "chText");
        $chText.width(_pag.pageWidth).empty().html(newChapInfo);

        //console.log('------------------$chText------------------');
        //console.log($chText.html());

        var $this = null,
            $next = null,
            $prev = null,
            $thisColor = null,
            bl = false,
            thisText = "",
            $thisSrc = "",
            $thisW = "",
            $thisH = "",
            hasArticleTitle = false;
        //封面做一下处理,把第一章节里面的第一个<p>里面的img移除(如果有的话)
        if (_pag.chapIndex_d == 0) {
            var $pFirst = $chText.find("p").first();
            if ($pFirst.find("img").length > 0) {
                $pFirst.find("img").remove();
            }
        }
        //*********************************************针对app出的书的特殊处理  开始*********************************************
        //针对app出的书的特殊处理 - 图片路径错误
        $chText.find(".ImgBgEditable").each(function (i, e) {
            $this = $(this);
            var imgsrc = $this.attr("src");
            $this.parent().css("background-image", "url(" + imgsrc + ")");

            var itemsParent = $this.parent().parent().parent();
            var items = itemsParent.children(".Item");

            //增加外包裹的div

            if (items.length == 4) {
                items.wrapAll('<div class="Format-Block-05" style="text-indent: 0em; background-color: rgb(254, 254, 254);"></div>');
            }
        });

        //针对app出的书的特殊处理 - 样式错误1
        $chText.find(".Item-Left").each(function (i, e) {
            $this = $(this);
            var divItems = $this.parent().children();
            if (divItems.length == 3) {
                divItems.wrapAll('<div class="Format-Block-03" style="text-indent: 0em; background-color: rgb(254, 254, 254);"></div>');
            }
        });

        //针对app出的书的特殊处理 - 样式错误1
        $chText.find(".Item-Top").each(function (i, e) {
            $this = $(this);
            var divItemTop = $this;
            var divItemTopItems = divItemTop.parent().children(".Item");
            divItemTopItems.wrapAll('<div class="Format-Block-02" style="text-indent: 0em; background-color: rgb(254, 254, 254);"></div>');
        });
        //*********************************************针对app出的书的特殊处理  结束*********************************************

        //处理<br>
        $chText.find("br").each(function (i, e) {
            $this = $(this);
            if ($this.attr("clear") && $this.attr("style")) {
                if ($this.attr("clear").indexOf("all") > -1 && $this.attr("style").indexOf("page-break-before:always") > -1) {
                    //console.log($this.parent().parent().html());
                    $this.remove();
                }
            }
        });

        //处理<span>
        $chText.find("span").each(function () {
            $this = $(this);
            //如果<span>中text()和html()都是空的话，则移除这个<span>;
            if (!($this.text()) && !($this.html())) $this.remove();
            //如果这个<span>的diaplay=none，则移除这个<span>
            if ($this.css("display") == "none") $this.remove();
        });

        //处理<a>
        $chText.find("a").each(function (i, e) {
            $this = $(this);
            if (!($this.text()) && !($this.html())) {
                //如果<a>中text()和html()都是空的话，则移除这个<a>
                $this.remove();
            } else {
                //如果<a>中没有"data-href"这个属性，则把<a>中的内容提出，替代整个<a>; 如果有这个属性，则把<a>中的文本提出直接放在<a>中
                if (!$this.attr("data-href")) {
                    $this.replaceWith($this.html());
                } else {
                    if ($this.text()) {
                        //针对旧书的处理，目录里面的a后面都带有...
                        if ($this.text().indexOf("...") > -1) {
                            $this.html($this.text().substring(0, $this.text().indexOf("...")));
                        } else {
                            $this.html($this.text());
                        }
                    }
                }
            }
            //如果这个<a>的diaplay=none，则移除这个<a>
            if ($this.css("display") == "none") $this.remove();
        });

        //处理<p>,如果<b>中text()和html()都是空的话，则移除这个<b>;否则设置行高，字体大小，和段落开头空两个字符位置 
        $chText.find("p").each(function () {
            $this = $(this);            
            if (!($this.text()) && !($this.html())) {
                $this.remove();
            }
            //段落开头&nbsp;缩进尺寸过大处理
            $this.html($this.html().replace(/&nbsp;/g, " "));
        });

        $chText.find("p").each(function (i, e) {
            $this = $(this);
            //处理章节标题
            if ($this.hasClass("ArticleTitle") || $this.hasClass("ArticleTitleSecond")) {
                $this.css({ "text-indent": "", "text-align": "" });
                eachChildren($this, { "color": "" });

                $next = $this.next();
                if ($next) {
                    if ($next.hasClass("ArticleTitle") || $next.hasClass("ArticleTitleSecond")) {
                        $next.removeClass().addClass("ArticleTitleSecond");
                        $this.removeClass().addClass("ArticleTitle");
                    } else {
                        //$this.removeClass().addClass("ArticleTitleSecond");
                    }
                }
                $prev = $this.prev();
                if ($prev) {
                    if ($prev.hasClass("ArticleTitle") || $prev.hasClass("ArticleTitleSecond")) {
                        $prev.removeClass().addClass("ArticleTitle");
                        $this.removeClass().addClass("ArticleTitleSecond");
                    }
                }

                //保证一个章节里面只会出现一次ArticleTitle
                if (hasArticleTitle) {
                    $this.removeClass("ArticleTitle");
                }
                if ($this.hasClass("ArticleTitle")) {
                    hasArticleTitle = true;
                }
            }
            thisText = $this.text().replace(/\s+/g, " ");
            if (thisText.indexOf(_eS.answerFlag) > -1) {
                //处理答案遮挡....只有选择题才遮挡答案(根据答案内容全都是字母来判断是否是选择题)
                //填空题也可以遮挡答案 txy20170304
                bl = false;
                thisText = $this.html().toString();
                var answerData = "";
                answerData = thisText.substring(thisText.lastIndexOf(_eS.answerFlag) + _eS.answerFlag.length);

                /*不需要判断答案是否含有图片，通过js和css可以实现图片的显示与隐藏 txy20170309
                if ($(this).find("img").length > 0) {
                    $(this).find("img").each(function (e, i) {
                        answerData += $this.prop("outerHTML").toString();
                    });
                } else {
                    thisText = $this.text();
                    answerData = thisText.substring(thisText.lastIndexOf(_eS.answerFlag) + _eS.answerFlag.length);
                }
                */

                /*********
                var Regx = /^[A-Za-z]+$/;
                if (Regx.test(answerData)) {
                    bl = true;
                }
                *********/
                bl = true;
                if (bl) {
                    if (!$this.attr("data-answer")) {
                        $this.attr("data-answer", true);
                        /*
                        var $span1 = $('<span>').html(_eS.answerFlag).css("color", "green");
                        var $span2 = $('<span>').addClass("answer").css("background-color", getBright(_cS.asbg)).css("width", (_pag.pageWidth - getBrowserFontW() * 5.5) + "px");
                        var $em = $('<em>').addClass("keepOutAnswer").attr({ "data-answer": answerData, "data-flag": "answer" }).html(_eS.answerInfo);
                        $span2.append($em);
                        $this.empty().append($span1).append($span2).css({ "text-indent": "1.5em", "margin-bottom": "0" });
                        $em = $span1 = $span2 = null;
                        */

                        var $span1 = $('<span>').addClass("AnsTag").html(_eS.answerFlag);
                        //var $span2 = $('<span>').addClass("answer AnsConHide").text(answerData).attr("data-flag", "answer");
                        var $span2 = $('<span>').addClass("answer AnsConHide").html(answerData).attr("data-flag", "answer");
                        var $BtnShowAnsCon = $('<span>').addClass("BtnShowAnsCon").css("background-color", getBright(_cS.asbg)).text(_eS.answerInfo).attr("data-flag", "answer");
                        //var $em = $('<em>').addClass("keepOutAnswer").attr({ "data-answer": answerData, "data-flag": "answer" }).html(_eS.answerInfo);
                        $this.empty().append($span1).append($span2).append($BtnShowAnsCon);
                        $BtnShowAnsCon = $span1 = $span2 = null;
                    }
                }
            } else if (thisText.indexOf(_eS.analysisFlag) > -1) {
                //解析
                //$this.css("text-indent", "1.5em");
                eachChildrenJDK($this, _eS.analysisFlag);

            } else if (thisText.indexOf(_eS.knowledgeFlag) > -1) {
                //考点
                $this.append($("<kd>").html("&nbsp;(查看00条同考点内容)"));
                eachChildrenJDK($this, _eS.knowledgeFlag);

            } else if (thisText.indexOf("咨询QQ") > -1) {
                //删除咨询QQ的图片
                $this.find("img").remove();
                $this.empty().html("<span>咨 询 QQ：</span><a style=\"color:blue\">4009008858</a><span>(8:30-00:30)</span>");
            } else if (thisText.indexOf("全国热线") > -1) {
                $this.empty().html("<span>全国热线：</span><a style=\"color:blue\">400-900-8858</a><span>(8:30-00:30)</span>");
            } else if (thisText.indexOf("圣才学习网编辑部") > -1) {
                //处理“圣才学习网编辑部”关键字
                //$this.css({ "text-indent": "0em", "text-align": "right", "margin": "20px" });
                eachChildren($this, { "color": "" });
            } else if (thisText == "内容简介" || thisText == "视频讲解教师简介" || thisText == "目录") {
                //处理“内容简介”，“视频讲解教师简介”，“目录”等关键字
                //$this.removeClass().addClass("CenterTitle");
                //eachChildren($this, { "color": "" });
                $next = $this.next();
                isMarginElement($next);

                $prev = $this.prev();
                isMarginElement($prev);
            } else {
                //中文括号开头的缩进1.5个字，已经有样式表控制 txy2017 - 3 - 9
                /*
                if (thisText.indexOf("（") == 0 || thisText.indexOf("【") == 0) {
                    //$this.css("text-indent", "1.5em");
                }
                */
               
                //删除一些特殊词语                
                bl = false;
                for (var g = 0, g1 = _eS.specialStr.length; g < g1; g++) {
                    if (thisText.indexOf(_eS.specialStr[g]) > -1) {
                        thisText = thisText.replace(_eS.specialStr[g], "");
                        bl = true;
                    }
                }
                if (bl) {
                    $this.html("<span>" + thisText + "</span>");
                }
            }
        });
        //console.log('-----------------处理完p2后的$chText------------------');
        //console.log($chText.html());

        //处理<img>,如果含有img，则需要使该图片的宽度不能超过pageWidth,
        $chText.find("img").each(function (i, e) {
            $this = $(this);
            //var thisSrc = $this.attr("src");
            var $thisW = $this.attr("width") || "1";
            var $thisH = $this.attr("height") || "1";
            if ($thisW > _pag.pageWidth) {
                $this.attr("width", _pag.pageWidth + "px");
                $this.attr("height", ((_pag.pageWidth / $thisW) * $thisH).toFixed() + "px");
            }

            //如果图片的高度大于一定的行高，则把图片变成块级元素，同时添加margin 使左右适中
            //if (imgHeight > _pag.lineCount * _pag.lineH) {
            //    thisImg.css("display", "block").css("margin", "0px auto");
            //}

            //如果图片的高度小于当前行高，则给图片添加margin 使上下适中;如果图片的高度大于当前行高，则把图片变成块级元素，同时添加margin:0px auto,左右适中
            /*图片显示已经全都改成样式表控制，无需处理 txy20170309
            if ($thisH <= _pag.lineH) {
                $this.css("margin", "auto 0px");
            } else {
                $this.css({ "display": "block", "margin": "0px auto" });
            }
            */

            //如果图片的父元素是<p>，同时这个<p>里面没有文本，则给<p>添加样式text-indent：0em；如果图片的父元素是<span>，则给<span>添加样式top:"";
            /*
            if ($this.parent()[0].tagName.toLocaleUpperCase() == "P") {
                if (!($this.parent("p").text())) {
                    $this.parent("p").css({ "text-indent": "0em", "text-align": "center" });
                }
            } else if ($this.parent()[0].tagName.toLocaleUpperCase() == "SPAN") {
                $this.parent().css("top", "");
            }
            */

            // 替换模糊图片
            var data_src = $this.attr("data-src");
            if (data_src && data_src.length > 0) {
                $this.attr("src", data_src);
            }
        });
        //console.log('-----------------处理完图片后的$chText------------------');
        //console.log($chText.html());

        //处理<video>,如果含有video，则用图片代替它，把它剥离当前的父元素，放在一个新的<p>里面
        $chText.find("video").each(function (i, e) {
            $this = $(this);
            $thisW = 320;
            // $thisH = 240; // (4:3)
            $thisH = 180; // (16:9)
            $thisSrc = $this.attr("src") || "";
            if (!$thisSrc) $thisSrc = $this.find("source").attr("src");
            if (parseFloat($thisW) != _pag.pageWidth) {                
                $thisH = (_pag.pageWidth / $thisW) * $thisH;
                $thisW = _pag.pageWidth;
            }

            //$thisSrc = "http://www.baidu.com";
            //正则提取url
            //http://e.100xuexi.com/uploads/ebook/fc4bf35670364fe4a210cc28808684bb/mobile/epub/OEBPS/http://videofms.100xuexi.com/quanguodaxueshengyingyujingsai/quanguodaxueshengyingyujingsaiCleizhentijiexiban/9012nian/VideoC/90151105_092401/96db0bf9-a01a-4db3-afe0-10316a2.mp4
            var reg = /(http:\/\/videofms\.100xuexi\.com[\s|\S]+?\.mp[3|4])/;
            var result = $thisSrc.match(reg);

            if (result != null)
                $thisSrc = result[1];

            //视频预览图
            var videoImg = $this.attr("poster");

            //取消自动播放
            $this.removeAttr("autoplay");
            //TODO qinxiankang 视频预览图片
            //如果没有预览图片
            if (!videoImg) {
                videoImg = _eS.videoDefault;
            } else {
                //如果是书籍目录的相对地址，补全为绝对地址
                //http://e.100xuexi.com/uploads/MemberPrepareEbook/1114dd72-b7cc-4d2e-b5a3-2480dfb2a89e_epub/OEBPS/images/1733577659.jpg
                //改为
                //http://e.100xuexi.com/uploads/MemberPrepareEbook/1114dd72-b7cc-4d2e-b5a3-2480dfb2a89e/OEBPS/images/1733577659.jpg
                if (videoImg.indexOf("http://") < 0) {
                    videoImg = SC_R.ebook.info.baseURL.replace("_epub/OEBPS/", "/OEBPS/") + videoImg;
                }

            }
            //设置封面
            $this.attr("poster", videoImg);
            //设置宽高
            $this.css("width", $thisW);
            $this.css("height", $thisH);
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log($this);
            // $this.bind('play', function() {
            //     console.log('电子书视频' + $this + '播放');
            // });
            // $this.bind('pause', function() {
            //     console.log('电子书视频' + $this + '暂停');
            // });
            // $this.bind('end', function() {
            //     console.log('电子书视频' + $this + '结束');
            // });
            $this[0].addEventListener('play', function() {
                console.log('电子书视频' + $this + '播放');
            });
            $this[0].addEventListener('pause', function() {
                console.log('电子书视频' + $this + '暂停');
            });
            $this[0].addEventListener('end', function() {
                console.log('电子书视频' + $this + '结束');
            });
            //改为使用原生播放器
            //console.info("视频图片地址",SC_R.ebook.info.baseURL+videoImg);
            //
            // var $replaceImg = $('<img>').attr({ "src": videoImg, "data-videoSrc": $thisSrc, "width": $thisW + "px", "height": $thisH + "px" });
            // var thisParent = $this.parent();
            // if (thisParent.text()) {
            //     var $newP = $('<p>').append($replaceImg).css({ "text-indent": "0em", "text-align": "center" });
            //     $this.attr("id", "thisVideo" + i);
            //     thisParent.before($newP);
            //     $this.remove();
            // } else {
            //     thisParent.css({ "text-indent": "0em", "text-align": "center" }).replaceWith($replaceImg);
            // }
        });

        // //处理<audio> 事件绑定函数在 SC_DealAudio 中
        // $chText.find("audio").each(function(){
        //     console.info("定义一个播放器");
        //     //定义一个播放器的html
        //     var AudioPlayerHtml='<span class="M-Art-AudioPlayer2"><span class="BtnControl"><span class="StatusIco"></span></span><span class="Progress"> <span class="ProgressBar"> <span class="ProgressInnerBar" style="width:0%"> <span class="ProgressPoint"><span class="StatusIco"></span></span> </span> </span> </span> <span class="Time">00:00/00:00</span> </span>';

        //     //在当前audio标签后面添加播放器html，同时隐藏该audio标签
        //     $(this).after(AudioPlayerHtml);
        //     $(this).hide(); 

        // })

        //处理带有标题样式的DOM
        var ffss = _cS.fs.substring(0, _cS.fs.indexOf("px"));
        $chText.find(".ArticleTitle").css("font-size", (parseFloat(ffss) + 4) + "px");;
        $chText.find(".ArticleTitleSecond").css("font-size", (parseFloat(ffss) + 2) + "px");

        //console.log('-----------------处理完标题样式后的$chText------------------');
        //console.log($chText.html());

        //如果有默认的字体颜色，保存起来
        for (var j = 0, j1 = SC_R.tagList.length; j < j1; j++) {
            $chText.find(SC_R.tagList[j]).each(function (i, e) {
                $this = $(this);
                $this.css("color");
                $thisColor = $this.css("color");
                if (!!$thisColor) {
                    if ($thisColor == "blue" || $thisColor == "red") {
                        $this.css("color", _cS.fcT).attr({ "data-color": "blueAndRed" });
                    } else if ($thisColor == "green") {
                        $this.css("color", _cS.fcJDK).attr({ "data-color": "green" });
                    } else {
                        $this.attr({ "data-color": $thisColor });
                    }
                }
            });
        }

        //处理标题
        $chText.find(".ArtH1, .ArtH2, .ArtH3, .ArtH4, .ArtH5").each(function (i, e) {
            try {
                var title = $(e).html();
                //给  第一天 xxx  之类的标题添加一个全角空格
                var handledTitle = window.yDisposeTitleHelper.getTitle(title);
                // console.info(handledTitle);
                $(e).html(handledTitle);
            } catch (e) {
                console.error(e);
            }
        })

        //对app出的书，图片相对位置重新设置，已经废弃 txy20170303
        /*
        var baseWidth = __w;
        $chText.find('.M-Art-ImgGroup').each(function () {
            $(this).css('height', $(this).attr('adapth') * baseWidth);
            $(this).find('.M-Art-ImgBox').each(function () {
                $(this).css('width', $(this).attr('adaptw') * baseWidth);
                $(this).css('height', $(this).attr('adapth') * baseWidth);
                $(this).css('left', $(this).attr('adaptl') * baseWidth);
                $(this).css('top', $(this).attr('adaptt') * baseWidth);
            })
        })
        */

        newChapInfo = "<body>" + $chText.html() + "</body>";
        // console.log( '---------- newChapInfo ----------' );
        // console.log(newChapInfo);
        SC_R.ebook.info.content[chap].chapData.chapInfo = newChapInfo;
        _pag.cCD_P.chapInfo = newChapInfo;
        $this = $next = $prev = $thisColor = bl = thisText = $thisSrc = $thisW = $thisH = hasArticleTitle = null;

        function eachChildrenJDK(element, str) {
            if (element && element.children().length > 0) {
                element.children().each(function () {
                    if ($(this).children().length > 0) {
                        eachChildrenJDK($(this), str);
                    } else {
                        if ($(this).text() == str) {
                            $(this).css("color", "green");
                            return false;
                        }
                    }
                });
            }
        }
        //遍历所有子元素,并修改它的样式
        function eachChildren(element, obj) {
            if (element) {
                element.css(obj);
                if (element.children().length > 0) {
                    element.children().each(function () {
                        eachChildren($(this), obj);
                    });
                }
            }
        }

        //console.log('-----------------处理完所有内容后的$chText------------------');
        //console.log($chText.html());
    }

    //开始处理分页
    function processingChap() {
        //如果是第一章节，则先直接生产一张封面页
        if (_pag.chapIndex_d == 0) {
            var img = '<img width="100%" height="100%" src="' + SC_R.ebook.info.coverImg + '" class="coverImg">';
            createDiv(img);
        }
        _pag.cover = true;

        $(_pag.cCD_P.chapInfo).each(function (index, element) {
            if (index <= _pag.currentIndex) return false;
            _pag.currentIndex = index;

            //下一个节点元素
            _pag.nextText = jQuery(element).next().prop("outerHTML");

            if (judgeNodeName(element.nodeName.toLocaleUpperCase())) {
                //单独处理封面
                if (!_pag.cover && _pag.chapIndex_d == 0) {
                    if (!$(element).prop("outerHTML")) {
                        _pag.currentText = "";
                    } else {
                        if ($(element).find("img").size() > 0) {
                            jQuery(element).children().each(function (i, e) {
                                if (e.tagName.toLocaleUpperCase() == "IMG") {
                                    var coverImg = jQuery(e);
                                    coverImg.addClass("coverImg");
                                    createDiv(coverImg);
                                    _pag.currentText = "";

                                    //封面生成
                                    _pag.cover = true;
                                } else {
                                    if (e.tagName.toLocaleUpperCase() != "BR") {
                                        _pag.currentText += jQuery(e).prop("outerHTML");
                                    }
                                }
                            });
                            if ($(_pag.currentText).text().indexOf("内容简介") > -1) {
                                _pag.currentText = $("<p>").attr({ 
                                    "style": "text-indent: 0em; text-align: center;" 
                                }).html(_pag.currentText).prop("outerHTML");
                            } else {
                                _pag.currentText = $("<p>").attr({
                                    "style": "text-indent: 2em; text-align: left;"
                                }).html(_pag.currentText).prop("outerHTML");
                            }

                        } else {
                            _pag.currentText = $(element).prop("outerHTML");
                            _pag.cover = true;
                        }
                    }
                } else {
                    var imgs = jQuery(element).find('img');
                    for (var imgsi = 0; imgsi < imgs.length; imgsi++) {
                        var imgst = imgs[imgsi];
                        var imgsrc = $(imgst).attr('src');
                        if ($(imgst).attr('src').indexOf('http://g.100xuexi.com/CssModel/100eshu/app/images/face') != 0) {
                            var dataimg;
                            var eWidth;
                            var eHeight;
                            $.ajax({
                                type: "get",
                                url: "http://service.100eshu.com/AppMakerPublish.ashx?method=GetImageWidthHeight",
                                data: "imageUrl=" + imgsrc + '&bookId=' + SC_R.bookID,
                                async: false,//取消异步
                                dataType: "json",
                                success: function (data) {
                                    dataimg = data;
                                    if (dataimg.result == 1) {
                                        eWidth = dataimg.width;
                                        eHeight = dataimg.height
                                        if (eHeight > 300) {
                                            eWidth = eWidth / eHeight * 300;
                                            eHeight = 300;
                                        }
                                        if (eWidth > _pag.pageWidth) {
                                            eHeight = _pag.pageWidth * eHeight / eWidth
                                            eWidth = _pag.pageWidth;
                                        }
                                        $(imgst).css('cssText', 'height:' + eHeight + 'px!important;' + 'width:' + eWidth + 'px!important;')
                                    }
                                    // console.log('------cxf------' + imgsrc + ' ' + dataimg.height + 'px!important' + ' ' + dataimg.width + 'px!important')
                                },
                                error: function (data) {
                                    dataimg = false;
                                }                                
                            });
                        }

                        if ($(imgst).attr('src').indexOf('http://g.100xuexi.com/CssModel/100eshu/app/images/face') == 0) {
                            $(imgst).css('width', '24px')
                            $(imgst).css('height', '24px')
                        }
                    }
                    _pag.thisText = jQuery(element).prop("outerHTML");
                    //当前元素的高度
                    _pag.thisH = CLH(_pag.thisText);
                    //判断有大图片直接放在了span里面
                    if (_pag.thisH > 2 * _pag.lineH && jQuery(element).find("img").length > 0 && jQuery(element).text() == "") {
                        jQuery(element).css("text-indent", "0em");
                        _pag.thisText = jQuery(element).prop("outerHTML");
                    }

                    //如果当前节点的文本高度小于textHeight
                    if (_pag.thisH <= _pag.textHeight) {
                        //把当前节点元素的内容加到前面的元素内容中
                        _pag.tempText = _pag.currentText + _pag.thisText;
                        _pag.tempH = CLH(_pag.tempText);
                        //判断上一个节点的内容+当前节点的内容 组成的文本高度 与 textHeight 的大小
                        //如果小于textHeight，分两种情况：一继续遍历下一个节点；二如果下一个节点元素是空的，则直接生成一个div结束
                        if (_pag.tempH <= _pag.textHeight) {
                            _pag.currentText += _pag.thisText;
                        } else {
                            //进一步拆分该节点元素
                            splitNode(element);
                        }
                    } else {
                        //进一步拆分该节点元素
                        splitNode(element);
                    }
                }
            } else {
                //不是<p>和<b>的元素
            }
            //如果是最后一个节点元素，则直接生成页面
            isLastElement();
        });
    }

    //分页结束
    function endProcessChap() {
        if (!SC_R.ebook.info.content[_pag.pagChap]) {
            SC_R.ebook.info.content[_pag.pagChap] = {};
        }
        SC_R.ebook.info.content[_pag.pagChap].totalPage = _pag.chapTotalPage;
        SC_R.ebook.info.content[_pag.pagChap].chapData.chapInfo = _pag.cCD_P.chapInfo;
        SC_R.ebook.info.content[_pag.pagChap].paging = 3;
    }

    //设置当前章节后面的所有章节的起始页
    function setChapStartPage(d) {
        var list = SC_R.ebook.info.chapList;
        if (d + 1 < list.length) {
            for (var t = d + 1, t1 = list.length; t < t1; t++) {
                if (SC_R.ebook.info.content[list[t]].startPage != (SC_R.ebook.info.content[list[t - 1]].startPage + SC_R.ebook.info.content[list[t - 1]].totalPage)) {
                    SC_R.ebook.info.content[list[t]].startPage = SC_R.ebook.info.content[list[t - 1]].startPage + SC_R.ebook.info.content[list[t - 1]].totalPage;
                    if (SC_R.ebook.info.content[list[t]].paging == 3) {
                        $("#chapDiv" + t).children().each(function (index, element) {
                            $(this).attr("data-page", SC_R.ebook.info.content[list[t]].startPage + index);
                        });
                    }
                }
            }
            //暂时不调整ebook.info.freePageNums
        }
    }

    //拆分节点元素
    function splitNode(element) {
        _pag.count = 0;
        _pag.thisText = jQuery(element).prop("outerHTML");

        if ($(element).children().length > 0 && isPjustContainerOneImg(element)) {
            var iimg = isPjustContainerOneImg(element);
            disposeImg(iimg);
            return;
        }
        if ($(element).children().length == 1 && $(element)[0].tagName == "P" && ($(element).prop('outerHTML').indexOf('<p class="CatH') == 0)) {
            abc($(element).prop("outerHTML"))
            return;
        }
        if ($(element).hasClass('TagBoxP') && $(element).find('.answer').length > 0) {
            abc($(element).prop("outerHTML"))
            return;
        }
        if ($(element)[0].tagName == "P" && ($(element).find('img').length == 1 && ($(element).find('img')[0].src.indexOf("http://g.100xuexi.com/CssModel/100eshu/app/images/face/") == -1 && $(element).find('img')[0] == element.childNodes[1]) && $(element).text() != "")) {
            if ($(element).text().indexOf('A.') == 1 || $(element).text().indexOf('D.') == 1 || $(element).text().indexOf('B.') == 1 || $(element).text().indexOf('C.') == 1) {
                abc($(element).prop("outerHTML"))
                return;
            }
        }

        //先判断该节点里面是否有其他的标签
        if ($(element).children().length > 0) {
            //苹果端出的书会在body里直接套一个div
            if (!$(element).text() || (element.tagName.toLocaleUpperCase() == "DIV" && $(element).attr("class") == undefined)) {

                //如果该节点里面没有文本内容
                $(element).children().each(function (i, e) {
                    _pag.currentH = CLH(_pag.currentText);
                    if (e.tagName.toLocaleUpperCase() == "IMG") {
                        disposeImg(e);
                    } else if (e.tagName.toLocaleUpperCase() == "SPAN") {
                        if ($(e).children().length != 0) {
                            splitNode(e);
                        } else {
                            disposeNode(e);
                        }
                    } else if (e.tagName.toLocaleUpperCase() == "P") {
                        if ($(e).children().length != 0) {
                            splitNode(e);
                        } else {
                            disposeNode(e);
                        }
                    } else {
                        if (e.tagName.toLocaleUpperCase() != "BR") {
                            //  var thisP = $('<p class="M-Art-P">').html(e).css("text-indent", "2em").prop("outerHTML");
                            var thisP = $(e).prop("outerHTML");
                            abc(thisP);
                        }
                    }
                });
            } else {
                //如果该节点里面既有子节点，又是有文字和图片的  区分table和非table
                if (element.nodeName.toLocaleUpperCase() == "TABLE") {
                    disposeTable(element);
                } else if ($(element).children().length > 0) {
                    var split = false;
                    var spliti = 0;
                    if ($(element)[0].childNodes[0].nodeType == 3
                        || ($(element)[0].childNodes[0].tagName.toUpperCase() == 'IMG')
                        && $(element)[0].childNodes[0].src.indexOf('http://g.100xuexi.com/CssModel/100eshu/app/images/face/' == 0)
                        || ($(element)[0].childNodes[0].tagName.toUpperCase() == 'SPAN'
                        && $(element)[0].childNodes[0].children.length == 0)) {
                        for (var ti = 0; ti < $(element)[0].childNodes.length; ti++) {
                            var tiE = $(element)[0].childNodes[ti]
                            var ttagName = ""
                            if (tiE.nodeType != 3)
                                ttagName = tiE.tagName.toLocaleUpperCase()
                            if (ttagName == "BR" || ttagName == "DIV" || ttagName == "P") {
                                split = true;
                                spliti = ti;
                                var ss = "";
                                for (var xx = 0; xx < ti; xx++) {
                                    ss = ss + ($(element)[0].childNodes[xx].outerHTML || $(element)[0].childNodes[xx].textContent);
                                }
                                if ($(element)[0].tagName == "P") {
                                    disposeNode($($(element)[0].outerHTML).html(ss))
                                }
                                else {
                                    disposeNode($('<p class="M-Art-P"></p>').html(ss))
                                }
                                break;
                            }
                        }
                    }

                    if (split == false && ($(element)[0].childNodes[0].nodeType == 3 || ($(element)[0].childNodes[0].tagName.toUpperCase() == 'IMG') && $(element)[0].childNodes[0].src.indexOf('http://g.100xuexi.com/CssModel/100eshu/app/images/face/' == 0) || ($(element)[0].childNodes[0].tagName.toUpperCase() == 'SPAN' && $(element)[0].childNodes[0].children.length == 0))) {
                        disposeNode(element);
                        return;
                    }
                    $(element).children().each(function (i, e) {
                        if (i < spliti)
                            return;
                        _pag.currentH = CLH(_pag.currentText);

                        if (e.tagName.toLocaleUpperCase() == "IMG") {
                            disposeImg(e);
                        } else if (e.tagName.toLocaleUpperCase() == "DIV" || e.tagName.toLocaleUpperCase() == "P") {
                            if ($(e).children().length != 0) {
                                splitNode(e);
                            } else {
                                disposeNode(e);
                            }
                        } else {
                            if (e.tagName.toLocaleUpperCase() != "BR") {
                                var thisP = $('<p class="M-Art-P">').html(e).css("text-indent", "2em").prop("outerHTML");
                                abc(thisP);
                            }
                        }
                    });
                } else {
                    disposeNode(element);
                }
            }
        } else {
            if (element.nodeName.toLocaleUpperCase() == "IMG") {
                //如果该节点元素是<img>
                disposeImg(element);
            } else if (element.tagName.toLocaleUpperCase() == "P" || element.tagName.toLocaleUpperCase() == "SPAN" || element.tagName.toLocaleUpperCase() == "B") {
                disposeNode(element);
            } else {
                abc(_pag.thisText);
            }
        }
        //console.info("splitNode end");
        //
        function isPjustContainerOneImg(e) {
            var e1 = $($(e)[0].outerHTML.replace("<BR>", ''))
            var r = false;
            if ($(e1).text() == '') {
                while (true) {
                    if ($(e1).children().length > 1) {
                        return false;
                    } else if ($(e1).children().length == 1) {
                        e1 = $(e1).children()[0];
                    } else {
                        if ($(e1)[0].tagName.toUpperCase() == 'IMG') {
                            return $(e1)[0];
                        } else {
                            return false
                        }
                    }
                }
            }
            return r;
        }
        //分页处理中，处理图片
        function disposeImg(element) {
            var img001 = processImg(element);
            _pag.tempText = _pag.currentText + img001;
            _pag.tempH = CLH(_pag.tempText);
            console.log('_pag.tempH=' + _pag.tempH + ' _pag.textHeight=' + _pag.textHeight)
            if (_pag.tempH <= _pag.textHeight) {
                _pag.currentText += img001;
            } else {
                createDiv(_pag.currentText);
                _pag.currentText = img001;
                _pag.currentH = CLH(_pag.currentText);
            }
            img001 = null;
        }
        //处理章节内容中的图片
        function processImg(img) {
            var eSrc = img.src;
            var data_videosrc = $(img).attr("data-videosrc");
            var dataimg;
            $.ajax({
                type: "get",
                url: "http://service.100eshu.com/AppMakerPublish.ashx?method=GetImageWidthHeight",
                data: "imageUrl=" + eSrc + '&bookId=' + SC_R.bookID,
                async: false,//取消异步
                success: function (data) {
                    dataimg = data;
                },
                error: function (data) {
                    dataimg = false;
                },
                dataType: 'json'
            });

            var eWidth = img.width;
            eWidth = !eWidth ? "1" : eWidth;
            var eHeight = img.height;
            eHeight = !eHeight ? "1" : eHeight;
            var data_width = eWidth,
                data_height = eHeight;
            //{"result":1,"width":"680","height":"968"}
            if (dataimg && dataimg.result == 1) {
                data_width = dataimg.width;
                data_height = dataimg.height;
                eWidth = dataimg.width;
                eHeight = dataimg.height;
            }
            //如果图片的宽度和高度都是100%，则不做处理  680  950   355 338  355 647
            if (!(eWidth == "100" && eHeight == "100")) {
                if (eWidth > 0 && eHeight > 0) {
                    if (eHeight > 300) {
                        eWidth = eWidth / eHeight * 300;
                        eHeight = 300;
                    }
                    if (eWidth > _pag.pageWidth) {
                        eHeight = _pag.pageWidth * eHeight / eWidth
                        eWidth = _pag.pageWidth;
                    }
                }
            } else {
                eWidth = _pag.pageWidth;
                eHeight = _pag.pageHeight;
            }
            var obj = {
                "src": eSrc,
                "style": "width:" + eWidth + "px; height:" + eHeight + "px; display:block; margin:0px auto;max-height:300px"
            };

            if (data_videosrc) {
                obj["data-videosrc"] = data_videosrc;
            }
            return $('<p style="text-indent:0em;text-align:center;">').append($('<img>').attr(obj)).prop("outerHTML");
        }
        //分页处理中，处理table元素
        function disposeTable(element) {
            _pag.currentH = CLH(_pag.currentText); //之前文本的高度
            var remainH = _pag.textHeight - _pag.currentH; //当前页面的剩余高度
            _pag.thisH = CLH($(element).prop("outerHTML"));
            if (_pag.thisH <= remainH) {
                _pag.currentText += $(element).prop("outerHTML");
            } else {
                var $table1 = '<table border="1"><tbody>';
                var $table2 = '<table border="1"><tbody>';
                var tdWidth = getTdCount(element);
                $(element).find("tr").each(function () {
                    _pag.thisText = $(this).prop("outerHTML");
                    if ($table2 == '<table border="1"><tbody>') {
                        _pag.thisH = CLH($table1 + _pag.thisText + "</tbody></table>");
                    }
                    if (_pag.thisH > remainH) {
                        $table2 += _pag.thisText;
                    } else {
                        $table1 += _pag.thisText;
                    }
                });
                $table1 += "</tbody></table>";
                $table2 += "</tbody></table>";
                _pag.currentText += $table1;
                createDiv(_pag.currentText);
                _pag.currentText = "";
                _pag.currentH = CLH($table2);
                if (_pag.currentH > _pag.textHeight) {
                    disposeTable($.parseHTML($table2));
                } else {
                    _pag.currentText = $table2;
                }
            }
        }
        function getTdCount(table) {
            var $clh = $("#clh");
            if ($clh.length <= 0) {
                $clh = $("<div>").addClass("chText").attr({ "id": "clh" });
                $("#BookBody").append($clh);
            }
            var arr = [];
            $clh.width(_pag.pageWidth).empty();
            $clh.append(table);
            $clh.find("tr").eq(0).find("td").each(function () {
                arr.push($(this).width());
            });
            return arr;
        }
        function abc(thisElement) {
            _pag.tempText = _pag.currentText + thisElement;
            _pag.tempH = CLH(_pag.tempText);
            if (_pag.tempH <= _pag.textHeight) {
                _pag.currentText += thisElement;
            } else {
                createDiv(_pag.currentText);
                _pag.currentText = thisElement;
            }
        }
    }    

    //分页处理中，处理不能拆分的元素(非table) 存在问题：死循环，不能处理内容很多的p元素等
    //内容较多的p元素已经拆分成    
    function realsplitP(rmainH, element) {

        var rx1, rx2, r;
        var length = $(element)[0].childNodes.length;
        var t_node;
        var cruurent_conent = "";
        var copy = $($(element).prop("outerHTML")).html("");
        var livingContent = "";
        for (var i = 0; i < length; i++) {


            t_node = $(element)[0].childNodes[i];

            var eee
            var ttt = t_node.outerHTML || t_node.textContent;
            eee = $($(copy).html(ttt).prop('outerHTML'))
            var c_h = CLH(eee.prop('outerHTML'))
            if (c_h <= rmainH) {


                cruurent_conent += ttt;
            } else {

                //拆分当前节点

                if (t_node.nodeType != 3 && (t_node.tagName.toUpperCase() == 'BR')) {

                    rx1 = $($($(copy).html(cruurent_conent)).prop('outerHTML'))[0]
                    rx2 = $($($(copy).html(t_node.outerHTML).prop('outerHTML')).css("text-indent", "2em").prop('outerHTML'))[0]



                    r = [rx1, rx2];



                } else {

                    var tttText = t_node.innerHTML || t_node.textContent;

                    var wrap = "";

                    var c_t = "";


                    for (var ii = 0; ii < tttText.length; ii++) {

                        c_t = tttText.substring(0, ii)
                        if (t_node.nodeType == 3) {

                            eee = $($(copy).html(cruurent_conent + c_t).prop('outerHTML'))

                        } else {

                            var copy2 = $(t_node.outerHTML).html("");
                            eee = $($(copy).html(cruurent_conent + $(copy2).html(c_t).prop('outerHTML')).prop('outerHTML'))

                        }

                        c_h = CLH(eee.prop('outerHTML'))
                        if (c_h <= rmainH) {



                        } else {


                            if (t_node.nodeType != 3) {
                                rx1 = $($(copy).html(cruurent_conent + $(copy2).html(tttText.substring(0, ii - 1)).prop('outerHTML')).prop('outerHTML'))[0]
                                rx2 = $($(copy).html($(copy2).html(tttText.substring(ii - 1)).prop('outerHTML')).css("text-indent", "0em").prop('outerHTML'))[0]
                            }
                            else {
                                rx1 = $($($(copy).html(cruurent_conent + tttText.substring(0, ii - 1))).prop('outerHTML'))[0]
                                rx2 = $($($(copy).html(tttText.substring(ii - 1))).css("text-indent", "0em").prop('outerHTML'))[0]


                            }
                            r = [rx1, rx2];


                            break;


                        }



                    }




                }


                break;

            }



        }



        for (var y = i + 1; y < length; y++) {
            livingContent += ($(element)[0].childNodes[y].outerHTML || $(element)[0].childNodes[y].textContent)
        }

        rx2 = $(rx2).html($(rx2).html() + livingContent).prop('outerHTML');

        return r;
    }

    function isPjustContainerBr(e) {
        var r = true
        for (var i = 0; i < $(e).children().length; i++) {
            if ($(e).children()[i].tagName.toUpperCase() != 'BR')
                return false;
        }

        return r;
    }

    var callTimes = 0;
    function disposeNode(element) {

        callTimes = callTimes + 1;

        _pag.currentH = CLH(_pag.currentText); //之前文本的高度

        var remainH = _pag.textHeight - _pag.currentH; //当前页面的剩余高度

        var reLineNum = 0; //剩余高度能容纳的文本行数
        var reLineH = 0; //剩余高度能容纳的文本行数的高度
        var originalNum = Math.floor(CLH($(element).css({ "margin-top": "0px", "overflow": "auto", "height": "" }).prop("outerHTML")) / _pag.lineH);
        //当前文本的高度
        _pag.thisH = CLH($(element).prop("outerHTML"));
        if (remainH < _pag.thisH) {

            if ($(element)[0].tagName.toUpperCase() == "P" && remainH > _pag.lineH) {
                $(element).html($(element).html().replace('<br>', ''));
                console
                var rr = realsplitP(remainH, element);

                if (rr != undefined && rr.length > 0) {
                    createDiv(_pag.currentText + $(rr[0]).prop('outerHTML'));
                    _pag.currentText = "";
                }
                if (rr != undefined && rr.length > 1)
                    disposeNode(rr[1]);

            } else {
                createDiv(_pag.currentText);
                if (_pag.thisH <= _pag.textHeight) {
                    _pag.currentText = $(element).prop("outerHTML");
                } else {
                    //这个情况是该节点元素的高度大于页面高度
                    _pag.currentText = "";

                    if (callTimes >= 10) {
                        _pag.currentText += $(element).prop("outerHTML");                        
                        callTimes = 0;
                        return;
                    }
                    disposeNode($(element).prop("outerHTML"));
                }
            }

        } else {
            if (_pag.thisH <= remainH) {
                _pag.currentText += $(element).prop("outerHTML");
            } else {
                var bl = false;
                //查找里面是否有图片，并且如果其中高度最大的图片的高度大于3行的话，则另起一页
                if ($(element).find("img").length > 0 /*&& $(element).text() != ""*/) {
                    bl = true;
                }
                if (bl) {
                    createDiv(_pag.currentText);
                    _pag.currentText = $(element).prop("outerHTML");
                } else {
                    _pag.marginTopH = $(element).attr("data-margintop") || "0";
                    if (_pag.marginTopH.indexOf("px") > -1) _pag.marginTopH = parseFloat(Math.abs(_pag.marginTopH.substring(0, _pag.marginTopH.indexOf("px"))));

                    _pag.heightH = $(element).attr("data-height") || "0";
                    if (_pag.heightH.indexOf("px") > -1) _pag.heightH = parseFloat(Math.abs(_pag.heightH.substring(0, _pag.heightH.indexOf("px"))));

                    reLineNum = Math.floor(remainH / _pag.thisH);
                    reLineH = reLineNum * _pag.thisH;

                    //data-percent是为语音朗读准备的属性"data-percent": reLineNum / thisEH, "data-noFirst":"true"
                    var e = $(element).css({ "height": (parseFloat(reLineH) + parseFloat(_pag.marginTopH) + parseFloat(_pag.heightH)) + "px", "margin-top": "-" + _pag.heightH + "px", "overflow": "hidden" }).attr({ "data-percent": (reLineNum / originalNum), "data-noFirst": parseFloat(_pag.heightH) > 0 ? true : "" });
                    _pag.currentText += e.prop("outerHTML");
                    createDiv(_pag.currentText);

                    e = $(element).css({ "margin-top": "-" + (parseFloat(reLineH) + parseFloat(_pag.marginTopH) + parseFloat(_pag.heightH)) + "px", "overflow": "auto", "height": "" }).attr({ "data-height": (parseFloat(reLineH) + parseFloat(_pag.marginTopH) + parseFloat(_pag.heightH)), "data-margintop": _pag.heightH, "data-percent": (1 - (((parseFloat(reLineH) + parseFloat(_pag.marginTopH) + parseFloat(_pag.heightH)) / _pag.lineH) / originalNum)), "data-noFirst": true });
                    _pag.currentText = e.prop("outerHTML");
                    _pag.currentH = CLH(_pag.currentText);

                    if (_pag.currentH > _pag.textHeight) {
                        _pag.currentText = "";
                        _pag.count++;
                        if (_pag.count < 5) {
                            disposeNode(e.prop("outerHTML"));
                        }
                    }
                }
            }
        }
        callTimes = 0;
    }

    //分页处理中，生成的div页面
    function createDiv(cText) {
        _pag.chapTotalPage++;
        // if (_pag.chapIndex_d == 6 && _pag.chapTotalPage == 10) {
        //     console.log("")
        // }
        var $div_p = $('<div>').html(cText).addClass(SC_R._ecp).attr({ 
            "id": SC_R._ecp + _pag.chapIndex_d + "_" + _pag.chapTotalPage, 
            "name": SC_R._ecp, 
            "style": "width:" + _pag.pageWidth + "px;height:" + _pag.textHeight + "px;margin-left:" + _pag.pageMarginLeft + "px;margin-right:" + _pag.pageMarginLeft + "px;" 
        });

        //如果该页面里面的内容既没有文字，又没有图片，则不创建它；
        var patt = /\S/g;
        if ((!$div_p.text() || !(patt.test($div_p.text()))) && $div_p.find("img").length == 0) {
            _pag.chapTotalPage--;
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            return false;
        }

        var $div_ss = $("<div>").attr({ 
            "id": SC_R._ecss + _pag.chapIndex_d + "_" + _pag.chapTotalPage,
            "name": SC_R._ecss
        }).append($div_p);
        var $div_g = $("<div>").attr({
            "id": SC_R._ecg + _pag.chapIndex_d + "_" + _pag.chapTotalPage,
            "name": "keepOut"
        });
        var $div_s = $("<div>").attr({
            "id": SC_R._ecs + _pag.chapIndex_d + "_" + _pag.chapTotalPage,
            "name": SC_R._ecs
        }).append($div_ss);
        var dataFree = "Y";
        if (SC_R.ebook.info.content[_pag.pagChap].free == true) {
            dataFree = "Y";
        } else if (SC_R.ebook.info.content[_pag.pagChap].free == false) {
            dataFree = "N";
        } else {
            if (_pag.chapStartPage + _pag.chapTotalPage - 1 > SC_R.ebook.info.freePageNums) {
                dataFree = "N";
            }
        }
        var $div_div = $('<div>').addClass(SC_R._ecd).attr({
            "id": SC_R._ecd + _pag.chapIndex_d + "_" + _pag.chapTotalPage,
            "name": SC_R._ecd, "data-free": dataFree,
            "data-page": (_pag.chapStartPage + _pag.chapTotalPage - 1)
        });
        $div_div.append($div_s).append($div_g);

        if (_pag.chapTotalPage == "1") {
            _pag.chapDiv.append($div_div);
        }
        $div_p = $div_ss = $div_s = $div_g = null;

        if (!SC_R.ebook.info.content[_pag.pagChap].chapData.pageList) {
            SC_R.ebook.info.content[_pag.pagChap].chapData.pageList = {};
        }
        SC_R.ebook.info.content[_pag.pagChap].chapData.pageList[_pag.chapTotalPage] = $div_div.prop("outerHTML");
        $div_div = null;
    }

    //如果是最后一个节点元素
    function isLastElement() {
        if (!_pag.nextText) {
            _pag.currentH = CLH(_pag.currentText); //之前文本的高度
            var remainH = _pag.textHeight - _pag.currentH; //当前页面的剩余高度
            var chapterOverHtml = "";
            if (SC_R.ebook.info.content[_pag.pagChap].last && SC_R.ebook.info.content[_pag.pagChap].parentName && true) {
                var parentName = SC_R.ebook.info.content[_pag.pagChap].parentName;
                if (parentName.indexOf("部分") > -1) {
                    parentName = parentName.substring(0, parentName.indexOf("部分") + 2) + "完";
                } else {
                    parentName = "本章完";
                }
                if (remainH > 60) {
                    chapterOverHtml = '<div class="chapterOver"><span class="L"></span><span class="text">' + parentName + '</span><span class="text textcenter">' + parentName + '</span><span class="R"></span></div>';
                } else {
                    createDiv(_pag.currentText);
                    _pag.currentText = "";
                    chapterOverHtml = '<div class="chapterOver" style="top: 0px;"><span class="L"></span><span class="text">' + parentName + '</span><span class="text textcenter">' + parentName + '</span><span class="R"></span></div>';
                }
            }
            _pag.currentText += chapterOverHtml;
            createDiv(_pag.currentText);
            _pag.currentText = "";
        }
    }

    //判断element是否是占位置的空白元素  element是Jquery对象
    function isMarginElement(element) {
        if (element.length > 0) {
            if (!element.text().trim() && element.find("img").length <= 0 && element[0].nodeName.toUpperCase() != "IMG") {
                element.remove();
            }
        }
    }

    /////////////////////////////////////    PDF类电子书    ///////////////////////////////////////////
    //获取PDF类电子书的多媒体内容
    function loadPdfMedia(callback) {
        SC_R.iLoad.getData(SC_R.ebook.info.PdfMediaUrl, function (res) {
            if (!SC_R.ebook.info.PdfMediaInfo) SC_R.ebook.info.PdfMediaInfo = [];
            var mediaInfo;
            $(res).find("MyMoveContentControl ").each(function () {
                var list = {};
                list.type = $(this).attr("type");

                var isc = $(this).find("ISizeControl ");
                list.left = isc.attr("left");
                list.top = isc.attr("top");
                list.width = isc.attr("width");
                list.height = isc.attr("height");

                list.alpha = $(this).find("IAlphaControl").attr("alpha");

                var imstc = $(this).find("IMediaSelectableControl ");
                list.sourceType = imstc.attr("sourceType");
                list.refVideoUrl = imstc.attr("refVideoUrl");
                list.startTime = imstc.attr("startTime");
                list.endTime = imstc.attr("endTime");
                list.imageUrl = imstc.attr("imageUrl");
                list.videoTitle = imstc.attr("videoTitle");
                list.materialSn = imstc.attr("materialSn");
                list.mediaFilename = imstc.attr("mediaFilename");
                list.mediaTypeString = imstc.attr("mediaTypeString");

                //var IPlayModeControl = $(this).find("IPlayModeControl ");
                //mediaInfo.playStartMode = imstc.attr("playStartMode");
                //mediaInfo.playStopMode = imstc.attr("playStopMode");
                //mediaInfo.canCrossPage = imstc.attr("canCrossPage");
                //mediaInfo.styleType = imstc.attr("styleType");
                //mediaInfo.playMode = imstc.attr("playMode");

                mediaInfo = {};
                mediaInfo.pageIndex = parseInt($(this).attr("pageIndex")) + 1;
                mediaInfo.list = [];
                mediaInfo.list.push(list);

                var existFlag = "0";
                for (var a = 0; a < SC_R.ebook.info.PdfMediaInfo.length; a++) {
                    if (SC_R.ebook.info.PdfMediaInfo[a].pageIndex == mediaInfo.pageIndex) {
                        SC_R.ebook.info.PdfMediaInfo[a].list.push(list);
                        existFlag = "1";
                        break;
                    }
                }
                if (existFlag == "0") SC_R.ebook.info.PdfMediaInfo.push(mediaInfo);
            });

            disposePdf(SC_R.ebook.read, callback);
        });
    }

    //处理pdf类电子书的全部内容，分多个DIV显示
    function disposePdf(chap, callback) {
        creatPagConfig();

        console.log("disposePdf: paging the pdf ---" + chap.chap + ".................................paging");
        SC_R._cP = 1;
        var $div000, $div001;

        $("#BookBody").html("");
        _pag.chapTotalPage = 0;
        $("#chapDiv0").remove();
        var $chapDiv = createChapDiv("0");
        SC_R.ebook.info.freePageNums = Math.ceil(0.1 * SC_R.ebook.info.PdfPages);

        var startC = SC_R.ebook.read.page - _pag.retainPage;
        if (startC < 0) startC = 0;
        var endC = SC_R.ebook.read.page + _pag.retainPage;
        if (endC > SC_R.ebook.info.PdfPages) endC = SC_R.ebook.info.PdfPages;
        _pag.chapTotalPage = startC;
        for (var i = startC; i < endC; i++) {
            _pag.chapTotalPage++;
            createPdfECD(_pag.chapTotalPage);
            if (_pag.chapTotalPage < SC_R.ebook.read.page + 3 || _pag.chapTotalPage > SC_R.ebook.read.page - 3) addImg(_pag.chapTotalPage);
        }
        SC_R.ebook.info.content["chap0.html"].paging = 3;
        SC_R.ebook.info.loadAll = true;
        saveEbookLocal();
        console.log("disposePdf: paging the pdf ---" + chap.chap + " ................................succeed");

        //判断一下图片是否有成功的
        var aaaFun = setInterval(function () {
            if (SC_R.loadImgCount > 0) {
                clearInterval(aaaFun);

                //根据不同的翻页方式来设置这个页面div
                disposeBookBody(chap, function () {
                    if (callback) callback();
                    //toggleMenu();
                });
            } else {
                if (SC_R.errorImgCount >= 3) {
                    clearInterval(aaaFun);
                    ebookError("", "PDF类电子书的图片加载失败--14");
                }
            }
        }, 100);

        resetPagConfig();
        return false;
    }

    //创建PDF类电子书的SC_R._ecd DIV
    function createPdfECD(p) {
        var dataFree = "Y";
        if (p > SC_R.ebook.info.freePageNums) dataFree = "N";
        var $div000 = $('<div>').attr({ "id": SC_R._ecd + "0_" + p, "name": SC_R._ecd, "data-free": dataFree, "data-page": p }).addClass(SC_R._ecd);
        var $div001 = $('<div>').attr({ "id": SC_R._ecp + "0_" + p, "name": SC_R._ecp, "style": "width:" + _pag.pageWidth + "px;height:" + _pag.pageHeight + "px;" }).addClass(SC_R._ecp);
        var $div_ss = $("<div>").attr({ "id": SC_R._ecss + "0_" + p, "name": SC_R._ecss }).append($div001);
        var $div_g = $("<div>").attr({ "id": SC_R._ecg + "0_" + p, "name": "keepOut" });
        var $div_s = $("<div>").attr({ "id": SC_R._ecs + "0_" + p, "name": SC_R._ecs }).append($div_ss);
        $div000.append($div_s).append($div_g);
        $("#chapDiv0").append($div000);
        $div001 = $div_ss = $div_g = $div_s = null;
        return $div000;
    }

    //往PDF类电子书的SC_R._ecp中放入图片,
    function addImg(p) {
        var $chapDiv = $("#" + SC_R._ecp + SC_R._cI + "_" + p);
        if ($chapDiv.length <= 0) $chapDiv = createPdfECD(p);
        if ($chapDiv.find("img").size() <= 0) {
            var pdfSrc = SC_R.ebook.info.PdfImgUrl + p + ".png";
            var imgClass = p == 1 ? "coverImg" : "";
            var $div002 = $('<img class="' + imgClass + '" src="' + pdfSrc + '" style="width:' + _pag.pageWidth + 'px;height:' + _pag.pageHeight + 'px;display:none;" onload="loadImg(this,0)" onerror="errorImg(this,0)">');
            var $div003 = $('<div>').addClass("imgLoadFail").attr({ "style": "margin:" + ((__h / 2) - 20) + "px auto;" });
            $div003.append($('<img src="' + _eS.pdfLoadingImg + '" style="display:block;margin:0px auto;">'));
            $div003.append($('<span>').html("页面加载中，请稍后..."));
            $chapDiv.append($div002).append($div003);
            addVideo($chapDiv, p);
        }
    }

    //往PDF类电子书的SC_R._ecp中放入视频s
    function addVideo($div001, i) {
        var list, myVideo, type, videoWidth, videoHeight, videoTop, videoLeft, refVideoUrl, imageUrl, pervH;
        if (!SC_R.ebook.info.PdfMediaInfo) {
            SC_R.ebook.info.PdfMediaInfo = [];
        }
        for (var g = 0; g < SC_R.ebook.info.PdfMediaInfo.length; g++) {
            if (SC_R.ebook.info.PdfMediaInfo[g].pageIndex == i) {
                list = SC_R.ebook.info.PdfMediaInfo[g].list;
                break;
            }
        }
        if (!list) list = [];
        if (list.length > 0) {
            for (var k = 0; k < list.length; k++) {
                if (k == "0") pervH = 0;

                type = list[k].type;
                videoWidth = (parseFloat(list[k].width) * _pag.pageWidth).toFixed(2);
                videoHeight = (parseFloat(list[k].height) * _pag.pageHeight).toFixed(2);
                videoLeft = (parseFloat(list[k].left) * _pag.pageWidth).toFixed(2);
                videoTop = ((parseFloat(list[k].top) * _pag.pageHeight)).toFixed(2);
                refVideoUrl = list[k].refVideoUrl;
                //imageUrl = list[k].imageUrl;
                imageUrl = _eS.videoDefault;

                if (type == "MyVideo") {
                    //myVideo = $('<img>').addClass("scv scv-default-skin");
                    //myVideo.attr({ "src": "/images/Mobile_bg0084.jpg" });
                    //myVideo.attr({ "style": "position:absolute ;width:" + videoWidth + "px;height:" + videoHeight + "px;top:" + videoTop + "px;left:" + videoLeft + "px;display:none" });
                    //myVideo.attr({ "data-width": videoWidth, "data-height": videoHeight, "data-videoSrc": refVideoUrl });

                    myVideo = $('<img class="scv scv-default-skin" src="' + imageUrl + '" style="position:absolute ;width:' + videoWidth + 'px;height:' + videoHeight + 'px;top:' + videoTop + 'px;left:' + videoLeft + 'px;display:block;" data-videoSrc=' + refVideoUrl + ' onload="loadImg(this,1)" onerror="errorImg(this,1)">');
                    $div001.append(myVideo);
                }
            }
        }
    }

    //PDF图片加载完成之后处理的事情（js中不使用了，转到html页面上）
    function loadImg(thisP, n) {
        if (n == 0) {
            if (thisP.readyState == "complete" || thisP.complete == true) {
                thisP.style.display = "block";
                $(thisP).show();
                $(thisP).next().hide();
                SC_R.loadImgCount++;
            }
        } else {
            //if (thisP.readyState == "complete" || thisP.complete == true) {
            //    $(thisP).attr("src", _eS.videoDefault);
            //}
        }
    }

    //PDF图片加载失败之后处理的事情
    function errorImg(thisP, n) {
        if (n == 0) {
            $(thisP).next().empty();
            $(thisP).next().append($('<img src="' + _eS.pdferrorImg + '" style="display:block;margin:0px auto;">'));
            $(thisP).next().append($('<span>').html("页面加载失败"));
            SC_R.errorImgCount++;
        } else {
            //$(thisP).attr("src", _eS.videoDefault);
        }
    }

    //处理PDF类电子书的页面，保证同一时间DPF页面只有一定的数量，多了empty，少了creates
    function disposePdfPage(c) {
        if (!c) c = 2;
        if (SC_R.ebook.info.isPdf == true) {
            console.log("disposePdfPage");
            //准备好前后几页
            for (var p = SC_R._cP - 2; p < SC_R._cP + (c + 1) ; p++) {
                if (p <= SC_R.ebook.info.PdfPages - 1) {
                    if (p >= 0) {
                        addImg(p);
                    }
                }
            }
            $("." + SC_R._ecd).each(function () {
                var thisId = $(this).attr("id");
                var idNo = thisId.substring(thisId.lastIndexOf("_") + 1);
                if (idNo < SC_R._cP - _pag.retainPage || idNo > SC_R._cP + _pag.retainPage) {
                    $(this).remove();
                }
            });
        }
    }

    //创建chapDiv
    function createChapDiv(n) {
        var $chapDiv = $('<div>').addClass("chapDiv").attr({ "id": "chapDiv" + n, "name": "chapDiv" + n, "style": "width:" + __w + "px;height:" + __h + "px;" });
        $("#BookBody").append($chapDiv);
        return $chapDiv;
    }

    //创建分页配置对象
    function creatPagConfig() {
        window._pag = _pag = {
            pagChap: "", //当前章节的一位标识符
            chapIndex_d: 0, //当前章节的序号
            chapStartPage: 1, //当前章节的第一页在整本书中的页数
            chapTotalPage: 0, //当前章节的总页数
            cCD_P: {}, //当前章节的html数据
            elementList: [],
            currentIndex: -1,
            paused: false,
            cover: false, //判断是否是封面的参数
            pCount: 0, //当前章节的段落总数量
            currentText: "", //当前页面已经存在的所有文本
            currentH: 0, //当前页面已经存在的所有文本的高度
            thisText: "", //当前章节遍历节点元素时的当前节点文本
            thisH: 0, //当前章节遍历节点元素时的当前节点文本的高度
            nextText: "", //当前章节遍历节点元素时的下一个节点
            nextH: 0, //当前章节遍历节点元素时的下一个节点的文本高度
            tempText: "", //当前页面已经存在的所有文本+当前章节遍历节点元素时的当前节点文本
            tempH: 0, //当前页面已经存在的所有文本+当前章节遍历节点元素时的当前节点文本 的总高度
            marginTopH: 0, //当前节点元素的margin-top值
            heightH: "", //当前节点元素的height值
            lineCount: 3, //定义的常用参数，一般用在比较图片的高度

            pageWidth: __w - 20, //页面宽度
            pageHeight: __h - 20, //页面高度
            textHeight: __h - 20, //页面文本总高度
            chapDiv: null, //当前章节所在的div对象
            retainPage: 3, //定义的常用参数,用在PDF类电子书里面
        };
        getLineH();
        getPageWidth();
    }

    //重置_pag
    function resetPagConfig() {
        window._pag = _pag = {
            pageWidth: __w - 20, //页面宽度
            pageHeight: __h - 20, //页面高度
            textHeight: __h - 20, //页面文本总高度
        };
        getPageWidth();
        if (SC_R.ebook.info.isPdf == true) {
            _pag.retainPage = 3;
        }
    }
    //*****************************************************阅读器电子书加载处理   end ******************************************************//

    //*****************************************************阅读器界面设置与操作   start ******************************************************//
    //创建阅读器头部
    function createReaderTop() {
        var $Top = $("#Top");
        if ($Top.length > 0) $Top.remove();
        $Top = $('<div>').addClass("Top").addClass("Rhead").attr({ "id": "Top" });

        //左侧按钮
        var $LeftBtns = createTag("div", "LeftBtns");
        var $BtnBack = createTag("a", "BtnBack");

        // 去掉按钮间的分割线 txy2017-1-13
        //var $Separator = createTag("span", "Separator");

        appendTag($LeftBtns, $BtnBack);
        $BtnBack = null;

        //右侧按钮
        var $RightBtns = createTag("div", "RightBtns");
        var $BtnBuy = createTag("a", "BtnBuy").html("购买");

        // 去掉按钮间的分割线 txy2017-1-13
        //var $Separator_b = createTag("span", "Separator", "Separator_b");

        var $BtnSearch = $('<a>').addClass("Btn_t").append(createTag("div", "BtnSearch"));


        // 去掉按钮间的分割线 txy2017-1-13
        //var $Separator_s = createTag("span", "Separator", "Separator_s");


        var $BtnBookmark = $('<a>').addClass("Btn_t").append(createTag("div", "BtnBookmark"));

        appendTag($RightBtns, $BtnBuy, $BtnSearch, $BtnBookmark);
        $BtnBuy = $BtnSearch = $BtnBookmark = null;
        appendTag($Top, $LeftBtns, $RightBtns);
        $LeftBtns = $RightBtns = null;

        SC_R.fragment.appendChild($Top[0]);
        $Top = null;
    }

    //创建阅读器设置界面
    function createUISet() {
        var $UISetMenu = createTag("div", "UISetMenu");
        var $SetItem = null,
    	$Tag = null,
    	$li = null,
    	$SetBar = null,
    	$BtnReduce = null,
    	$BtnRaise = null,
    	$Progress = null,
    	$range = null;

        //阅读
        UISetItem_ul(_eS.flip_way, "nolast");

        //亮度
        UISetItem_range(_eS.brightness, "nolast");

        //背景
        UISetItem_ul(_eS.bgColor, "nolast");

        //字号
        //UISetItem_range(_eS.SizeFont, "last");

        //字体
        UISetItem_one();

        SC_R.fragment.appendChild($UISetMenu[0]);
        $UISetMenu = null;

        var $UISetMenuMask = createTag("div", "UISetMenuMask");
        SC_R.fragment.appendChild($UISetMenuMask[0]);
        $UISetMenuMask = null;

        function UISetItem_ul(obj, flag) {
            $SetItem = $("<div>").addClass("SetItem").attr({ "id": obj.classN });
            //$Tag = $("<div>").addClass("Tag").html(obj.itemName);
            $SetBar = $('<ul>').addClass("SetBar " + obj.classN);
            for (var f = 0; f < obj.list.length; f++) {
                var select = "";
                if (f == 0) select = "Selected";
                $li = $('<li>').append($('<a>').addClass(obj.list[f].classN + " " + select).attr({ "id": obj.list[f].classN, "index": f }).html(obj.list[f].name));
                $SetBar.append($li);
            }
            appendTag($SetItem, $SetBar);
            appendTag($UISetMenu, $SetItem);
            $SetBar = $li = $SetItem = null;
        }

        function UISetItem_range(obj, flag) {
            $SetItem = $("<div>").addClass("SetItem ").attr("id", obj.classN);
            //$Tag = $("<div>").addClass("Tag").html(obj.itemName);
            $SetBar = $('<div>').addClass("SetBar " + obj.classN);
            if (obj.subBtnId == "BrightnessReduce" || obj.subBtnId == "BrightnessIncrease") {
                $BtnReduce = $('<a>').addClass("BtnReduce").attr("id", obj.subBtnId);
                $BtnRaise = $('<a>').addClass("BtnRaise").attr("id", obj.addBtnId);
            } else {
                //$BtnReduce = $('<a>').addClass("BtnReduce").attr("id", obj.subBtnId).html("小");
                //$BtnRaise = $('<a>').addClass("BtnRaise").attr("id", obj.addBtnId).html("大");
            }

            $Progress = $('<div>').addClass("Progress");
            $range = $('<input>').addClass("ProgressBar").attr({ "type": "range", "id": obj.rangeId, "max": obj.max, "min": obj.min, "step": obj.step, "value": obj.value });
            appendTag($Progress, $range);
            appendTag($SetBar, $BtnReduce, $BtnRaise, $Progress);
            appendTag($SetItem, $Tag, $SetBar);
            appendTag($UISetMenu, $SetItem);
            $range = $Progress = $BtnRaise = $BtnReduce = $SetBar = $Tag = $SetItem = null;
        }

        function UISetItem_one() {
            $SetItem = $("<div>").addClass("SetItem ");
            //$Tag = $("<div>").addClass("Tag").html("字体");
            //$SetBar = $('<div>').addClass("SetBar SetFont");
            $SetFontsize = $('<div>').addClass("SetFontsize");
            $li1 = $("<li>").append($("<a>").attr({ "href": "javascript:void(0)", "class": "BtnReduce", "id": "WordSizeReduce" }));

            appendTag($SetFontsize, $li1);
            $li2 = $("<li>").append($("<span>").attr({ "id": "currnetFontsize", "class": "CurrentFontsize" }).html("18"));
            appendTag($SetFontsize, $li2);

            $li3 = $("<li>").append($("<a>").attr({ "href": "javascript:void(0)", "class": "BtnRaise", "id": "WordSizeIncrease" }));
            appendTag($SetFontsize, $li3);


            $SetBar = $('<div>').addClass("SetFont");
            $li = $("<a>").addClass("BtCHNType").attr("id", "BtCHNType").html("繁");
            appendTag($SetBar, $li);

            appendTag($SetItem, $SetFontsize, $SetBar);
            appendTag($UISetMenu, $SetItem);
            $SetBar = $li1 = $li2 = $li3 = $li = $SetItem = null;
        }
    }

    //创建当前阅读的章节的标题栏
    function createCurrentTitle() {
        var $FixChapInfo = $("#FixChapInfo");
        if ($FixChapInfo > 0) $FixChapInfo.remove();
        $FixChapInfo = $('<div>').addClass("FixChapInfo").attr({ "id": "FixChapInfo" });
        var $ChaperName = createTag("div", "ChaperName").html("封面");
        appendTag($FixChapInfo, $ChaperName);
        $ChaperName = null;
        SC_R.fragment.appendChild($FixChapInfo[0]);
        $FixChapInfo = null;
    }

    function createCurrentTitle() {
        var $FixChapInfo = $("#FixChapInfo");
        if ($FixChapInfo > 0) $FixChapInfo.remove();
        $FixChapInfo = $('<div>').addClass("FixChapInfo").attr({ "id": "FixChapInfo" });
        var $ChaperName = createTag("div", "ChaperName").html("封面");
        appendTag($FixChapInfo, $ChaperName);
        $ChaperName = null;
        SC_R.fragment.appendChild($FixChapInfo[0]);
        $FixChapInfo = null;
    }

    //创建阅读器底部
    function createReaderBot() {
        var $Bot = $("#Bot");
        if ($Bot.length > 0) $Bot.remove();
        $Bot = $('<div>').addClass("Bot").attr({ "id": "Bot" });

        //var $ChaperName = createTag("div", "ChaperName").html("封面");
        //新增底部菜单
        var $BotMenu = $('<div>').addClass('BotMenu');
        var $BotMenuUl = $('<ul>');
        var $BotMenuli1 = $('<li>').append($('<a>').addClass("BtnCatalog").attr({ "href": "javascript:void(0)", "id": "BtnCatalog" }).html('<span class="Ico Ico1"></span><span class="Txt">目录</span></a>'));
        appendTag($BotMenuUl, $BotMenuli1);
        var $BotMenuli2 = $('<li>').append($('<a>').addClass("BtnMyNote").attr({ "href": "javascript:void(0)", "id": "BtnMyNote" }).html('<span class="Ico Ico2"></span><span class="Txt">笔记评论</span></a>'));
        appendTag($BotMenuUl, $BotMenuli2);
        var $BotMenuli3 = $('<li>').append($('<a>').addClass("BtnUISet").attr({ "href": "javascript:void(0)", "id": "BtnUISet" }).html('<span class="Ico Ico3"></span><span class="Txt">页面设置</span></a>'));
        appendTag($BotMenuUl, $BotMenuli3);
        var $BotMenuli4 = $('<li>').append($('<a>').addClass("BtnSetExtend").attr({ "href": "javascript:void(0)", "id": "BtnSetExtend" }).html('<span class="Ico Ico4"></span><span class="Txt">更多</span></a>'));

        /*创建“更多”的上拉菜单 begin*/
        var $ExtendBtnList = $('<ul>').addClass('ExtendBtnList').attr("id", "ExtendBtnList");
        var $ExtendBtnLi1 = $('<li>').append($('<a>').addClass("BtnListen").attr({ "href": "javascript:void(0)", "id": "BtnListen" }).html('<span class="Ico Ico5"></span><span class="Txt">朗读</span></a>'));
        appendTag($ExtendBtnList, $ExtendBtnLi1);
        var $ExtendBtnLi2 = $('<li>').append($('<a>').addClass("BtnLive").attr({ "href": "javascript:void(0)", "id": "BtnLive" }).html('<span class="Ico Ico6"></span><span class="Txt">相关直播</span></a>'));
        appendTag($ExtendBtnList, $ExtendBtnLi2);
        var $ExtendBtnLi3 = $('<li>').append($('<a>').addClass("BtnCircle").attr({ "href": "javascript:void(0)", "id": "BtnCircle" }).html('<span class="Ico Ico7"></span><span class="Txt">学友群</span></a>'));
        appendTag($ExtendBtnList, $ExtendBtnLi3);
        appendTag($BotMenuli4, $ExtendBtnList);
        /*创建“更多”的上拉菜单 end*/

        appendTag($BotMenuUl, $BotMenuli4);

        appendTag($BotMenu, $BotMenuUl);


        $BotMenuli1 = $BotMenuli2 = $BotMenuli3 = $BotMenuli4 = $BotMenuUl = $ExtendBtnLi1 = $ExtendBtnLi2 = $ExtendBtnLi3 = $ExtendBtnList = null;
        var $Status = $('<div>').addClass("Status");
        //新版界面去掉时间 txy2017-1-13
        //var $Mytime = createTag("div", "Mytime").addClass("Tag")
        var $PageNum = createTag("div", "PageNum").addClass("Tag");
        var $currentPage = $('<input>').attr({ "type": "hidden", "id": "currentPage" });
        var $totalPage_All = $('<input>').attr({ "type": "hidden", "id": "totalPage_All" });
        var $Progress = $("<div>").addClass("Progress");
        var $range = $('<input>').addClass("ProgressBar").attr({ "type": "range", "id": "points", "max": "100", "min": "1", "step": "1", "value": "1" });
        appendTag($Progress, $range);

        appendTag($Status, $PageNum, $currentPage, $totalPage_All, $Progress);
        $PageNum = $currentPage = $totalPage_All = $Progress = null;
        appendTag($Bot, $Status, $BotMenu);
        $Status = null;
        SC_R.fragment.appendChild($Bot[0]);
        $Bot = null;
    }

    //创建阅读器右侧
    function createReaderRight() {
        var $Right = $("#Right");
        if ($Right.length > 0) $Right.remove();
        $Right = $('<div>').addClass("Right").attr({ "id": "Right" });

        //右下角的按钮
        var $ReadingMode = createTag("div", "ReadingMode");
        var $moon = $('<a>').addClass("Btn_r").attr({ "id": "moon", "style": "position: absolute; right: 0px;" }).append($('<div>').addClass("BtnNight").attr("id", "BtnNight"));
        var $sun = $('<a>').addClass("Btn_r").attr({ "id": "sun", "style": "position: absolute; right: -60px;" }).append($('<div>').addClass("BtnDay").attr("id", "BtnDay"));
        appendTag($ReadingMode, $moon, $sun);
        $moon = $sun = null;
        appendTag($Right, $ReadingMode);
        $ReadingMode = null;
        SC_R.fragment.appendChild($Right[0]);
        $Right = null;
    }

    //创建阅读器目录，笔记，纠错，书签界面
    function createReaderNavList() {
        //新增一个遮罩
        var $EbookNavListMask = $("#EbookNavListMask");
        if ($EbookNavListMask.length > 0) $EbookNavListMask.remove();
        $EbookNavListMask = $('<div>').addClass("EbookNavListMask").attr({ "id": "EbookNavListMask" });
        var $EbookNavList = $("#EbookNavList");
        if ($EbookNavList.length > 0) $EbookNavList.remove();
        $EbookNavList = $('<div>').addClass("EbookNavList leftDiv").attr({ "id": "EbookNavList" });

        //Top

        var $EbookNavListTop = $('<div>').addClass("EbookNavListTop");
        //var $BtnBack = $("<div>").addClass("BtnBack").attr("id", "BtnBack_nav");
        var $TopTab = $('<ul>').addClass("TopTab");
        var $li1 = $('<li>').addClass("Selected").append($('<a>').attr("id", "EbookNavA1").html("目录"));
        appendTag($TopTab, $li1);
        //$li1 = $('<li>').append($('<a>').attr("id", "EbookNavA2").html("笔记"));
        // appendTag($TopTab, $li1);
        //$li1 = $('<li>').append($('<a>').attr("id", "EbookNavA3").html("纠错"));
        //appendTag($TopTab, $li1);
        $li1 = $('<li>').append($('<a>').attr("id", "EbookNavA2").html("书签"));
        appendTag($TopTab, $li1);
        //appendTag($TopTab, $li1, $li2, $li3, $li4);
        //$li1 = $li2 = $li3 = $li4 = null;
        appendTag($EbookNavListTop, $TopTab);
        $li1 = $TopTab = null;

        //目录
        var $conEbookNavA1 = $('<div>').attr({ "id": "conEbookNavA1", "style": "overflow: auto;" }).height(__h - 44);
        var $Catalog = createTag("div", "Catalog").addClass("Rlist");
        appendTag($conEbookNavA1, $Catalog);
        $Catalog = null;

        //笔记
        //var $conEbookNavA2 = createEbookNavA(_eS.note);

        //纠错
        //var $conEbookNavA3 = createEbookNavA(_eS.Feedback);

        //书签
        var $conEbookNavA2 = $('<div>').attr({ "id": "conEbookNavA2", "style": "display: none;" }).height(__h - 44);;
        var $BookMarkList = createTag("div", "BookMarkList").addClass("Rlist");
        appendTag($conEbookNavA2, $BookMarkList);
        $BookMarkList = null;

        appendTag($EbookNavList, $EbookNavList, $conEbookNavA1, $conEbookNavA2, $EbookNavListTop);
        $EbookNavListTop = $conEbookNavA1 = $conEbookNavA2 = null;
        //加入遮罩层
        SC_R.fragment.appendChild($EbookNavListMask[0]); SC_R.fragment.appendChild($EbookNavList[0]);
        $EbookNavListMask = null; $EbookNavList = null;

        function createEbookNavA(obj) {
            var $conEbookNavA = $('<div>').attr({ "id": obj.id, "style": "display: none;" });
            var $SubTab = $('<ul>').addClass("SubTab");
            var $li = $('<li>').addClass("Selected").append($('<a>').attr({ "id": obj.myId }).html(obj.myName));
            appendTag($SubTab, $li);
            $li = $('<li>').append($('<a>').attr({ "id": obj.otherId }).html(obj.otherName));
            appendTag($SubTab, $li);
            var $List = $('<div>').addClass(obj.list.classN);
            var $my = $('<div>').addClass(obj.list.myClass).attr({ "id": obj.list.myId, "style": "overflow: auto;" });
            var $info = $('<div>').attr({ "id": obj.list.myInfoId });
            appendTag($my, $info);
            var $other = $('<div>').addClass(obj.list.otherClass).attr({ "id": obj.list.otherId, "style": "display: none; overflow: auto;" });
            $info = $('<div>').attr({ "id": obj.list.otherInfoId });
            appendTag($other, $info);
            appendTag($List, $my, $other);
            $li = $info = $my = $other = null;
            appendTag($conEbookNavA, $SubTab, $List);
            $List = $SubTab = null;
            return $conEbookNavA;
        }
    }

    //创建右上角的直播图片
    function createReaderLive() {
        var $LiveBox = createTag("div", "LiveTipsBox");
        var $ImgBox = createTag("a", "LiveImgBox").append($('<img>').attr({ "src": _eS.liveDefault, "name": "live" })).append($("<span>").addClass("TipsText").attr("name", "live").html("直播中"));
        var $CloseBtn = $("<a>").addClass("BtnClose").attr("id", "BtnClose_live");
        $LiveBox.append($ImgBox).append($CloseBtn);
        $ImgBox = $CloseBtn = null;
        $("#BookAction").append($LiveBox);
        $LiveBox = null;
    }

    function createTag() {
        if (arguments.length == 1) {
            return $('<' + arguments[0] + '>');
        } else if (arguments.length == 2) {
            return $('<' + arguments[0] + '>').addClass(arguments[1]).attr({ "id": arguments[1] });
        } else if (arguments.length == 3) {
            return $('<' + arguments[0] + '>').addClass(arguments[1]).attr({ "id": arguments[2] });
        }
    }

    function appendTag() {
        var parentTag = arguments[0];
        if (arguments.length > 1) {
            for (var a = 1; a < arguments.length; a++) {
                parentTag.append(arguments[a]);
            }
        }
    }

    //BookAction的事件监听
    function bookActionBind() {
        $("#BookAction").bind({
            click: function (e) {
                stopEvent(e);
                var $targetID = $(e.target).attr("id") || "";

                switch ($targetID) {
                    case "BtnBack": //返回按钮
                        if (SC_A) SC_A.exitAudio();
                        SCLocation(getGotoUrl("goback"));
                        break;
                    case "BtnCatalog": //目录 笔记 纠错 书签 明细按钮事件
                        layer.closeAll();
                        hideMenu(function () {
                            $(".EbookNavListMask").show(0, function () {
                                $("#EbookNavList").show().animate({ left: "0px" }, 300);
                                showCatalog();
                                showBookmark();
                                setPageStyle(true);
                                console.log("打开目录");
                            })
                        });
                        break;
                    case "BtnBuy": //购买按钮事件
                        SCLocation(getGotoUrl("payment"));
                        break;
                    case "BtnSearch": //搜索
                        showSearchDiv("", function () {
                            hideUISetMenu();
                        });
                        break;
                    case "BtnUISet": //设置按钮事件
                        toggleUISetMenu();
                        break;
                    case "UISetMenuMask": //设置按钮遮罩事件
                        hideUISetMenu();
                        break;
                    case "BtnSetExtend": //显示更多按钮事件
                        toggleExtendBtnList();
                        break; case "BtnBookmark": //添加书签按钮事件
                            if (SC_R.ebook.read.chap == "cover.xhtml") {
                                layer.msg("亲，封面不需要添加书签！");
                            } else {
                                addBookmark();
                                layer.msg("亲，添加书签成功！");
                            }
                            break;
                    case "BtnListen": //朗读按钮事件
                        SC_A = SC_Audio();
                        SC_A.showAudio(function () {
                            toggleMenu();
                        });
                        break;
                    case "BtnNote": //评论按钮事件
                        SCLocation(getGotoUrl("thisNote"));
                        break;
                    case "BtnCircle": //学友群聊天
                        SCLocation(getGotoUrl("thisCircle"));
                        $("#BtnCircleTips").hide();
                        break;
                    case "BtnMyNote": //笔记评论
                        //window.location.href = "/templates/my/myErrorcorrectingComment.html?platID=1&productID=" + ;
                        //SCLocation(getGotoUrl("other.my_errorcorrecting_comment"));

                        window.location.href = "/#/other/my_errorcorrecting_comment/" + SC_R.bookID + "/1";

                        break;
                    case "BtnNight": //点击进入黑夜模式
                        _cS.moon_sum = "moon";
                        $("#moon").animate({ right: '-60px' }, 500);
                        $("#sun").animate({ right: '0px' }, 500, setPageStyle(true));
                        changeMoonSunStyle()
                        //$(".Btn_r").css("border", "1px solid #fff");

                        break;
                    case "BtnDay": //点击进入白天模式
                        _cS.moon_sum = "sun";
                        $("#sun").animate({ right: '-60px' }, 500);
                        $("#moon").animate({ right: '0px' }, 500, setPageStyle(true));
                        changeMoonSunStyle()
                        //$(".Btn_r").css("border", "none");
                        break;
                    case "BtnBack_nav": //返回到阅读界面
                        hideEbookNavList();
                        break;
                    case "EbookNavA1": //点击显示目录
                        setTab('EbookNavA', 1, 2);
                        fadeOutLoad(false);
                        break;
                        /*case "EbookNavA2": //点击显示笔记
                            setTab('EbookNavA', 2, 4);
                            loadIfream("myNote", function() {});
                            break;
                        case "EbookNavA3": //点击显示纠错
                            setTab('EbookNavA', 3, 4);
                            loadIfream("myError", function() {});
                            break;
                            */
                    case "EbookNavA2": //点击显示书签
                        setTab('EbookNavA', 2, 2);
                        fadeOutLoad(false);
                        break;
                    case "NoteA1": //显示我的笔记
                        setTab('NoteA', 1, 2);
                        loadIfream("myNote", function () { });
                        break;
                    case "NoteA2": //显示他人笔记
                        setTab('NoteA', 2, 2);
                        loadIfream("otherNote", function () { });
                        break;
                    case "FeedbackA1": //显示我的纠错
                        setTab('FeedbackA', 1, 2);
                        loadIfream("myError", function () { });
                        break;
                    case "FeedbackA2": //显示他人纠错
                        setTab('FeedbackA', 2, 2);
                        loadIfream("otherError", function () { });
                        break;
                    case "BrightnessIncrease": //增加亮度
                        var s = parseInt($("#BrightnessNumber").val())
                        if ((s + 1) <= $("#BrightnessNumber").attr("max")) {
                            //changeBrightness(s + 1);
                        }
                        break;
                    case "BrightnessReduce": //减少亮度
                        var s = parseInt($("#BrightnessNumber").val())
                        if ((s - 1) >= $("#BrightnessNumber").attr("min")) {
                            changeBrightness(s - 1);
                        }
                        break;
                    case "WordSizeIncrease": //增加字号
                        var fs = parseInt($("#currnetFontsize").text());
                        console.log("当前字号为：" + fs);
                        if ((fs + 2) <= 34) {
                            changeFontSize(fs + 2);
                        }
                        break;

                    case "WordSizeReduce": //减小字号
                        var fs = parseInt($("#currnetFontsize").text());
                        console.log("当前字号为：" + fs);
                        if ((fs - 2) >= 14) {
                            changeFontSize(fs - 2);
                        }
                        break;
                    case "BtCHNType": //切换繁体字
                        changeFontFamily();
                        break;
                    case "BtnBack_search": //隐藏搜索
                        hideSearchDiv();
                        break;
                    case "searchBtn": //搜索
                        searchText();
                        break;
                    case "LoadMoreSearch": //加载更多的搜索结果
                        LoadMoreSearch();
                        break;
                    case "BtnClose_live": //关闭视频直播通知DIV
                        $("#LiveTipsBox").remove();
                        break;
                    case "BtnOkBuy": //立即购买
                        SCLocation(getGotoUrl("payment"));
                        $("#PopMaskBuy").hide();
                        $("#PopBuyTips").hide();
                        break;
                    case "EbookNavListMask": //点击目录遮罩，隐藏目录
                        hideEbookNavList();
                        break; default:
                            var i = $(e.target).attr("index") || 0;
                            var type = $(e.target).attr("class") || "";
                            if (type.indexOf("Bg") > -1) { //背景颜色
                                //设置背景颜色
                                $(e.target).addClass("Selected");
                                $(e.target).parents("li").siblings().children("a").removeClass("Selected");

                                _cS.bg = colorRgb(_eS.bgColor.list[i].type);
                                _cS.asbg = colorRgb(_eS.bgColor.list[i].asColor);
                                _cS.asbs = colorRgb(_eS.bgColor.list[i].asBoxShadow);

                                //无需设置目录背景色
                                //_cS.matalogChBg = colorRgb(_eS.bgColor.list[i].matalogCheckBgColor);

                                _cS.moon_sum = "sun";
                                $("#sun").animate({ right: '-60px' }, 0);
                                $("#moon").animate({ right: '0px' }, 0);
                                setPageStyle(true);
                            } else if (type.indexOf("Flip") > -1) { //翻页模式
                                //设置阅读模式
                                _cS.flip_way = _eS.flip_way.list[i].type;
                                changeFlipWay();
                            } else { }

                            var name = $(e.target).attr("name") || "";
                            if (name == "loginImg") { //我的笔记和纠错中提示登录的图片
                                SCLocation(getGotoUrl("login"));
                            } else if (name == "live") { //跳转去看直播
                                SCLocation(getGotoUrl("live"));
                            } else if (name == "catalog") { //目录章节跳转
                                if (checkPassword() == false) { //如果密码校验没有通过
                                    showPasswordInput(); //显示密码输入
                                    return false;
                                }
                                gotoCatalogLi(e);
                            } else if (name == "bookmark") { //书签章节跳转
                                if (checkPassword() == false) { //如果密码校验没有通过
                                    showPasswordInput(); //显示密码输入
                                    return false;
                                }
                                gotoBookmarkLi(e);
                            } else if (name == "search") { //搜索章节跳转
                                if (checkPassword() == false) { //如果密码校验没有通过
                                    showPasswordInput(); //显示密码输入
                                    return false;
                                }
                                gotoSearchLi(e);
                            } else if (name == "popBuy") { //隐藏购买提示
                                $("#PopMaskBuy").hide();
                                $("#PopBuyTips").hide();
                            } else {

                            }
                            return false;
                }
            },
            change: function (e) {
                var $targetID = $(e.target).attr("id");
                switch ($targetID) {
                    case "points": //滑动条滑动改变页码
                        changePoint();
                        break;
                    case "BrightnessNumber": //滑动条滑动改变亮度
                        changeBrightness(parseInt($("#BrightnessNumber").val()));
                        break;
                    case "fontSize": //滑动条滑动改变字号
                        changeFontSize(parseInt($("#fontSize").val()));
                        changeFontSize(parseInt($("#currnetFontsize").text()));
                    default:
                        return false;
                }
            }
        });
    }

    //隐藏目录界面
    function hideEbookNavList() {
        $("#EbookNavList").animate({ left: "-110%" }, 300, function () {
            $("#EbookNavList").hide();
            $(".EbookNavListMask").hide();
        });
    }

    //设置PDF类电子书阅读器的界面
    function setPdfConfig() {
        $("#SetFontsize").hide();
        //$("#BtnListen").hide();
        //$("#Separator_l").hide();
        $("#BtnSearch").hide();
        $("#Separator_s").hide();

        $("#BtnListen").parent().hide();
        $("#BtnNote").parent().hide();

        //$("#ExtendedBtns").hide();
    }

    //设置背景颜色
    function setBackGround() {
        for (var a = 0, a1 = _eS.bgColor.list.length; a < a1; a++) {
            if (_cS.bg == colorRgb(_eS.bgColor.list[a].type)) {
                $("#SetBg a").removeClass("Selected").eq(a).addClass("Selected");
                break;
            }
        }
    }

    //改变背景颜色
    function changeBackGround() {
    }

    //设置阅读方式
    function setFilpWay() {
        for (var a = 0, a1 = _eS.flip_way.list.length; a < a1; a++) {
            if (_cS.flip_way == _eS.flip_way.list[a].type) {
                $("#SetFilp a").removeClass("Selected").eq(a).addClass("Selected");
                break;
            }
        }
        saveUI();
    }

    //翻页方式的改变
    function changeFlipWay() {
        setFilpWay();
        disposeBookBody(SC_R.ebook.read);
    }

    //设置亮度
    function setBrightnessNumber() {
        $("#BrightnessNumber").val(_cS.brightness);
    }

    //改变亮度
    function changeBrightness(sn) {
        if (sn) {
            $("#BrightnessNumber").val(sn);
            _cS.brightness = sn;
        }

        if (!_cS.bg) _cS.bg = _eS.bgColor.list[0].type;
        setPageStyle(true);
        saveUI();
    }

    //设置字号大小
    function setFontSize() {
        if (_eS.fontSize.length > 0) {
            for (var a = 0, a1 = _eS.fontSize.length; a < a1; a++) {
                if (_cS.fs == _eS.fontSize[a]) {
                    $("#fontSize").val(a);
                    $("#currnetFontsize").text(_eS.fontSize[a]);
                    $("#BookBody").css("line-height", _cS.lh).css("font-size", _cS.fs);
                    break;
                }
            }
        }
    }

    //改变字体大小
    function changeFontSize(fs) {
        console.log("进入改变字体函数");

        if (parseInt(fs) >= 0) {
            $("#fontSize").val(fs);
            $("#currnetFontsize").text(fs);
            //_cS.fs = _eS.fontSize[parseInt(fs)];
            _cS.fs = $("#currnetFontsize").text();
            console.log(_cS.fs + " " + typeof _cS.fs);
        }
        console.log(_cS.fs);
        setLH();

        $("#BookBody").css("line-height", _cS.lh).css("font-size", parseInt(_cS.fs) + "px");
        $("html").css("font-size", parseInt(_cS.fs) * 6.25 / 1.8 + "%");
        console.log("获取#BookBody的字体大小" + $("#BookBody").css("font-size"));
        getLineH();

        //清空书签界面和搜索界面的内容
        clearSearchList();
        clearBookmarkList();
        //在改变字体之前，在当前页面找到一段文字作为记号，重新分页之后，进入到包含有该记号的文本的页面
        var cMarkText = getMarkText();
        fadeInLoad("fast", true, function () {
            var chap = {
                "chap": SC_R.ebook.read.chap,
                "page": SC_R.ebook.read.page,
                "fs": _cS.fs
            };
            console.time("changeFontSize");
            //把内存中的ebook章节里面的pageList重置，同时也要把保存在localstorag里面的pageList重置
            for (var key in SC_R.ebook.info.content) {
                getContentObj(key, false);
                if (SC_R.ebook.info.content[key].chapData) SC_R.ebook.info.content[key].chapData.pageList = {};
                SC_R.ebook.info.content[key].paging = 1;
                saveContentLocal(key, SC_R.ebook.info.content[key]);
                SC_R.ebook.info.content[key].chapData = {};
            }
            console.timeEnd("changeFontSize");
            pagingEpubChap(chap.chap, null);
            var markPage = gotoMarkPage(chap.chap, cMarkText, chap.page);
            if (markPage) chap.page = markPage;
            disposeBookBody(chap, function () {
                fadeOutLoad("fast", function () {
                    hideUISetMenu();
                });
            });
        });
    }

    //改变字体系列
    var isSimplified = true;
    function changeFontFamily() {
        console.log("繁简切换");
        if (isSimplified) {
            $('#BookBody').s2t();
            isSimplified = false;
            $("#BtCHNType").text('简');
        } else {
            $('#BookBody').t2s();
            isSimplified = true;
            $("#BtCHNType").text('繁');
        }
    }

    //获取当前页面里面的可做标记文本的段落内容，一般选择是该页面字符串最长的段落
    function getMarkText() {
        var cMarkText = "";
        SC_R._cObj.find("p").each(function () {
            var thisText = $(this).text();
            if (cMarkText.length < thisText.length && !$(this).attr("data-percent")) {
                cMarkText = thisText;
            }
        });
        return cMarkText;
    }

    //字体改变后，进入到有记号文本(markText)的页面
    function gotoMarkPage(chap, markText, page) {
        if (!SC_R.ebook.info.content[chap]) SC_R.ebook.info.content[chap] = {};
        if (!SC_R.ebook.info.content[chap].chapData) SC_R.ebook.info.content[chap].chapData = {};
        if (!SC_R.ebook.info.content[chap].chapData.pageList) SC_R.ebook.info.content[chap].chapData.pageList = {};
        var markPage = null;
        for (var key in SC_R.ebook.info.content[chap].chapData.pageList) {
            var epList = $(SC_R.ebook.info.content[chap].chapData.pageList[key]).children().eq(0).children().children().find("P");
            epList.each(function () {
                var thisText = $(this).text();
                if (markText == thisText) {
                    markPage = key;
                    return false;
                }
            })
            if (markPage) break;
        }
        if (!markPage) markPage = page;
        return markPage;
    }

    //设置白天黑夜模式
    function setSunMoon() {
        if (_cS.moon_sum == "sun") {
            $("#sun").css({ right: '-60px' });
            $("#moon").css({ right: '0px' });
            //$(".Btn_r").css("border", "none");


        } else {
            $("#moon").css({ right: '-60px' });
            $("#sun").css({ right: '0px' });
            //$(".Btn_r").css("border", "1px solid #fff");
        }
    }

    //根据章节chap获取章节name
    function getChapName(chap) {
        if (!SC_R.ebook.info.content) SC_R.ebook.info.content = {};
        return SC_R.ebook.info.content[chap].name || "";
    }

    //统一页面样式,背景颜色 和 字体颜色$BookBody
    function setPageStyle(flag) {
        var setBg = "",
    	setFc = "",
    	setAs = "",
    	setAsC = "",
    	setAboxS = "",
    	setImgb = "",
    	setRaB = "",
    	setconEN = "",
    	setmatalogChBg = "";
        if (_cS.moon_sum == "sun") {
            setBg = _cS.bg, setFc = _cS.fc, setAs = _cS.asbg, setAboxS = _cS.asbs, setImgb = _cS.bg;
            setRaB = "none", setconEN = "#e6e6e6"/*, setmatalogChBg = _cS.matalogChBg*/;
            setAsC = "#000000";
        } else {
            setBg = _eS.moonBg, setFc = _eS.moonFc, setAs = _eS.moonAsbg, setAboxS = _cS.moonAsbs, setImgb = "#ffffff";
            setRaB = "1px solid #CCE8CF", setconEN = "#2a2a2a"/*, setmatalogChBg = _eS.moon_cataC*/;
            setAsC = setFc;
        }

        //设置相关的背景颜色
        var $BookBody = $("#BookBody");
        var body = $("body");
        var e_div = $BookBody.find(".e_div");
        var $BookBodyEle = $BookBody.find("p");
        var $BookBodyImgEle = $BookBody.find("img");
        var $FixChapInfo = $("#FixChapInfo");

        $BookBody.css("background-color", getBright(setBg)).css("color", setFc);
        e_div.css("background-color", getBright(setBg)).css("color", setFc);
        body.css("background-color", getBright(setBg)).css("color", setFc);
        $FixChapInfo.css("background-color", getBright(setBg)).css("color", setFc);        //$BookBody.find("div[name!='keepOut']").css("background-color", getBright(setBg));
        if (_cS.moon_sum == "sun") {
            $BookBodyEle.css("color", "");//白天模式将段落文本颜色保持原样
            $BookBodyImgEle.css("background-color", "");//白天去掉图片背景色
        }
        else {
            $BookBodyEle.css("color", setFc);//夜晚将段落文本颜色重置
            $BookBodyImgEle.css("background-color", "#ffffff");//夜晚设置图片背景色
        }

        if (_cS.flip_way == "simulation") {
            //$BookBody.find("div[name='" + SC_R._ecd + "']").css("background", "transparent");
        }
        //$BookBody.find("img[class!='coverImg']").css("background", getBright(setImgb));
        //$BookBody.find(".e_div").css("background-color", getBright(setImgb));
        $BookBody = null;


        //遮挡答案的div
        $(".answer").each(function () {
            $(this).next(".BtnShowAnsCon").css("background-color", getBright(setAs));
            /*
            $(this).addClass("AnsConHide");
            $(this).next(".BtnShowAnsCon").css("background-color", getBright(setAs)).show();
*/
            /*
            if ($(this).children().attr("data-answer") == _eS.answerInfo) {
                $(this).css("background-color", getBright(setBg)).children().css("color", "#334b80");
            } else {
                $(this).css("background-color", getBright(setAs)).children().css("color", "#334b80");
            }
            */
        });

        if (flag) {
            //添加笔记和纠错界面

            /*
            $(".NoteBox").css("background-color", getBright(setBg));
            $("#Note").css("background-color", getBright(setBg));
            $("#textareaV").css("background-color", getBright(setBg));

            //目录界面 书签界面 搜索界面
            $("#conEbookNavA1").css("background-color", getBright(setconEN));
            $("#conEbookNavA4").css("background-color", getBright(setconEN));
            $("#SearchContent").css("background-color", getBright(setconEN));
            */


            var $Rlist = $(".Rlist");
            $Rlist.css("color", setFc);
            //不设置未选中项的背景色
            //$Rlist.find("a").css("background-color", getBright(setBg));
            //不设置选中项的背景色
            //$Rlist.find("a[data-check='check']").css("background-color", getBright(setmatalogChBg));
            $Rlist = null;

            //考点的DIV
            $("#knowledgeInfo").css("background-color", getBright(setconEN));
        }

        //封面处理
        if (SC_R._cI == 0 && (SC_R._cP == 1 || SC_R._cP == 2)) {
            $("#" + SC_R._ecp + "0_1").css({ "background": "#000000", "margin": "0", "width": "100%", "height": "100%" }).find("img").each(function () {
                $(this).css({ "width": "", "height": "" });
            });
            $("#" + SC_R._ecd + "0_1").addClass("cover");
        }

        //顶部印花处理
        if (SC_R._cI == 0) {
            $("#" + SC_R._ecp + "0_2").css("overflow", "visible");
        }
        if (SC_R._nP == 1) {
            $("#" + SC_R._ecp + SC_R._nI + "_1").css("overflow", "visible");
        }
        if (SC_R._pP == 1) {
            $("#" + SC_R._ecp + SC_R._pI + "_1").css("overflow", "visible");
        }
        if (SC_R._cP == 1) {
            $("#" + SC_R._ecp + SC_R._cI + "_1").css("overflow", "visible");
        }

        saveUI();
    }

    //点击查看图片
    function SC_Img() {
        var elWidth, elHeight;
        //元素大小
        var outWidth, outHeight;
        // 当前操作模式 pinch:缩放 swipe:滑动
        var mode = '';

        // 双指触摸点的距离 (缩放模式)
        var distance = 0;
        var initialDistance = 0;

        // 图片缩放参数
        var scale = 1;
        var relativeScale = 1;
        var initialScale = 1;
        var maxScale = 20;
        if (isNaN(maxScale) || maxScale <= 1) {
            maxScale = 20;
        }

        // position of the upper left corner of the element
        var positionX = 0;
        var positionY = 0;

        var initialPositionX = 0;
        var initialPositionY = 0;

        // central origin (缩放模式)
        var originX = 0;
        var originY = 0;

        // start coordinate and amount of movement （滑动模式）
        var startX = 0;
        var startY = 0;
        var moveX = 0;
        var moveY = 0;


        var outWidth = 0;
        var outHeight = 0;

        var clickStep = 0;

        var imgTop = 0;
        var imgLeft = 0;
        var $img;
        //显示图片
        function dblclickImgShow(event, callback) {
            //console.info("dblclickImgShow");
            stopEvent(event);
            createImgDiv();
            var thisImg = event.target;
            var thisSrc = thisImg.src;
            $img = $('<img>').attr({ "id": "showImg", "src": thisSrc, "style": "display:block;background:#ffffff;" });
            $("#imgInfo").empty().append($img);
            var $showImgDiv = $("#showImgDiv");
            aaa();
            //console.info(callback);
            callback();

            function aaa() {
                //console.info("aaa");
                $showImgDiv.animate({ left: "0px" }, 500);
                var showImgW = $showImgDiv.width(),
                showImgH = $showImgDiv.height(),
                imgW = $img.width(),
                imgH = $img.height();

                elWidth = $img.width();
                elHeight = $img.height();
                outWidth = $("#showImgDiv").width();
                outHeight = $("#showImgDiv").height();
                $img.css("top", (showImgH - imgH) / 2 + "px").css("left", (showImgW - imgW) / 2 + "px");
            }
        }
        //隐藏图片
        function dblclickImgHide() {
            $("#showImgDiv").animate({ left: "110%" }, 500);
            // 当前操作模式 pinch:缩放 swipe:滑动
            mode = '';

            // 双指触摸点的距离 (缩放模式)
            distance = 0;
            initialDistance = 0;

            // 图片缩放参数
            scale = 1;
            relativeScale = 1;
            initialScale = 1;
            maxScale = 20;
            if (isNaN(maxScale) || maxScale <= 1) {
                maxScale = 20;
            }

            // position of the upper left corner of the element
            positionX = 0;
            positionY = 0;

            initialPositionX = 0;
            initialPositionY = 0;

            // central origin (缩放模式)
            originX = 0;
            originY = 0;

            // start coordinate and amount of movement （滑动模式）
            startX = 0;
            startY = 0;
            moveX = 0;
            moveY = 0;

            transformElement();
            toggleMenu();
        }

        function createImgDiv() {
            if ($("#showImgDiv").length > 0) return false;
            var $div1 = $('<div>').addClass("showImgDiv rightDiv").attr({ "id": "showImgDiv" });
            //var $div11 = $('<div>').addClass("img_top Rhead");
            $div11 = null;
            var $a111 = $('<a>').addClass("BtnBack").attr({ "id": "BtnBack_img" }).bind("click", dblclickImgHide);
            //$div11.append($a111);
            $a111 = null;
            var $div12 = $('<div>').attr({ "id": "imgInfo" }).attr({ "style": "width:" + __w + "px;height:" + (__h - 44) + "px;" }).bind("click", dblclickImgHide);
            $div1.append($div11).append($div12);
            $div11 = $div12 = null;
            $("#EbookRead").append($div1);
            $div1 = null;
            touch.isTouchDevice(bindEvent);
        }
        //图片拖动
        function bindEvent() {
            document.getElementById("imgInfo").addEventListener(touch.start, touchSatrtFunc_Img, true);
            document.getElementById("imgInfo").addEventListener(touch.move, touchMoveFunc_Img, true);
            document.getElementById("imgInfo").addEventListener(touch.end, touchEndFunc_Img, true);
        }

        function touchSatrtFunc_Img(event) {
            stopEvent(event);
            clickStep = 0;
            var touches = event.originalEvent ? event.originalEvent.touches : event.touches;

            startX = touches[0].clientX;
            startY = touches[0].clientY;
            initialPositionX = positionX;
            initialPositionY = positionY;
            moveX = 0;
            moveY = 0;
            //console.info(positionX, positionY, elWidth, elHeight, outWidth, outHeight);
        }

        function touchMoveFunc_Img(evt) {
            //for new  cause roll mode
            //stopEvent(evt);
            clickStep = 1;
            var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;
            var leftX = positionX - elWidth * scale / 2 + outWidth / 2;
            var rightX = outWidth - (leftX + elWidth * scale);
            var topY = positionY - elHeight * scale / 2 + outHeight / 2;
            var bottomY = outHeight - (topY + elHeight * scale);

            if (mode === '') {
                if (touches.length === 1) {

                    mode = 'swipe';

                } else if (touches.length === 2) {

                    mode = 'pinch';

                    initialScale = scale;
                    initialDistance = getDistance(touches);
                    originX = touches[0].clientX -
            		parseInt((touches[0].clientX - touches[1].clientX) / 2, 10) -
            		$img.offsetLeft - initialPositionX;
                    originY = touches[0].clientY -
            		parseInt((touches[0].clientY - touches[1].clientY) / 2, 10) -
            		$img.offsetTop - initialPositionY;

                }
            }

            if (mode === 'swipe') {
                //移动
                evt.preventDefault();
                moveX = touches[0].clientX - startX;
                moveY = touches[0].clientY - startY;

                positionX = initialPositionX + moveX;
                positionY = initialPositionY + moveY;

                transformElement();

                //左右有空余，左右间距相同，禁止上下滑动
                if (leftX > 0 && rightX > 0) {
                    positionX = 0;
                    transformElement();
                }
                //上下都有空余，禁止左右滑动
                if (topY > 0 && bottomY > 0) {
                    positionY = 0;
                    transformElement();
                }

            } else if (mode === 'pinch') {
                //缩放
                evt.preventDefault();
                distance = getDistance(touches);
                relativeScale = distance / initialDistance;

                //


                scale = relativeScale * initialScale;

                positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
                positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

                transformElement();
                positionX = 0;
                positionY = 0;
                transformElement();
            }
        }

        function touchEndFunc_Img(evt) {
            if (clickStep == 0) {
                console.info("hide");
                dblclickImgHide();
            }
            stopEvent(event);
            var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

            if (mode === '' || touches.length > 0) {
                return;
            }
            //缩放比例小于原比例
            if (scale < 0.5) {

                scale = 0.5;
                positionX = 0;
                positionY = 0;

            } else if (scale > maxScale) {
                //缩放比例过大
                scale = maxScale;
                relativeScale = scale / initialScale;
                positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
                positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

            }

            var leftX = positionX - elWidth * scale / 2 + outWidth / 2;
            var rightX = outWidth - (leftX + elWidth * scale);
            var topY = positionY - elHeight * scale / 2 + outHeight / 2;
            var bottomY = outHeight - (topY + elHeight * scale);

            //console.info(positionX, positionY, elWidth, elHeight, outWidth, outHeight);

            if (leftX > 0 && rightX < 0) {
                //leftX=0;
                positionX = elWidth * scale / 2 - outWidth / 2;
                transformElement();
            } else if (leftX < 0 && rightX > 0) {
                //rightX=0;
                positionX = outWidth / 2 - elWidth * scale / 2;
                transformElement();
            }
            if (topY < 0 && bottomY > 0) {
                positionY = outHeight / 2 - elHeight * scale / 2;

                transformElement();
            } else if (topY > 0 && bottomY < 0) {
                positionY = elHeight * scale / 2 - outHeight / 2;
                transformElement();
            }


            leftX = positionX - elWidth * scale / 2 + outWidth / 2;
            rightX = outWidth - (leftX + elWidth * scale);
            topY = positionY - elHeight * scale / 2 + outHeight / 2;
            bottomY = outHeight - (topY + elHeight * scale);
            console.info(leftX, rightX, topY, bottomY);
            if (topY > 0 && bottomY > 0) {
                //让上下边距相同，只允许左右滑动
                //console.info(1);
                positionY = 0;
                transformElement();
            }
            if (leftX > 0 && rightX > 0) {
                //console.info(2);
                positionX = 0;
                transformElement();
            }
            leftX = positionX - elWidth * scale / 2 + outWidth / 2;
            rightX = outWidth - (leftX + elWidth * scale);
            topY = positionY - elHeight * scale / 2 + outHeight / 2;
            bottomY = outHeight - (topY + elHeight * scale);
            //console.info(leftX, rightX,topY, bottomY);
            transformElement(0.1);
            mode = '';
        }

        /**
         * @param {Array} 双指touch位置
         * @return {number} 
         */
        function getDistance(touches) {
            var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
         		Math.pow(touches[0].clientY - touches[1].clientY, 2));
            return parseInt(d, 10);
        }

        /**
         * @param {number} 动画时间
         */
        function transformElement(duration) {
            //console.info("transform");
            var transition = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '';
            var matrixArray = [scale, 0, 0, scale, positionX, positionY];
            var matrix = 'matrix(' + matrixArray.join(',') + ')';
            //console.info("transform",$img);
            $("#imgInfo img").css({
                '-webkit-transition': transition,
                transition: transition,
                '-webkit-transform': matrix + ' translate3d(0,0,0)',
                transform: matrix
            });
        }

        return {
            dblclickImgShow: function (event, callback) {
                dblclickImgShow(event, callback);
            }
        }
    }

    function SC_DealAudio($ecd) {
        var audios = $ecd.find(".M-Art-AudioBox audio");
        if (audios.length > 0) console.info("· 初始化音乐播放器------");
        audios.each(function () {

            // var AudioPlayerHtml='<span class="M-Art-AudioPlayer2"><span class="BtnControl"><span class="StatusIco"></span></span><span class="Progress"> <span class="ProgressBar"> <span class="ProgressInnerBar" style="width:0%"> <span class="ProgressPoint"><span class="StatusIco"></span></span> </span> </span> </span> <span class="Time">00:00/00:00</span> </span>';

            // //在当前audio标签后面添加播放器html，同时隐藏该audio标签
            // $(this).after(AudioPlayerHtml);
            // $(this).hide(); 

            var audio = $(this)[0];
            var audioPlayer = $(this).parents(".M-Art-AudioBox").children(".M-Art-AudioPlayer2");

            // //播放按钮点击事件
            // audioPlayer.on('touch',function(e){
            //     console.info("touch");
            //     e.stopPropagation();
            // });
            // audioPlayer.on('touchstart',function(e){
            //     console.info("touchstart");
            //     e.stopPropagation();
            //     // return false; 
            // });
            // audioPlayer.on('touchmove',function(e){
            //     console.info("touchmove");
            //     //e.stopPropagation();
            // });
            // audioPlayer.on('touchend',function(e){
            //     console.info("touchend");
            //     e.stopPropagation();
            // });

            /*************************阻止事件冒泡*************************** */
            audioPlayer.children(".BtnControl").on('touch', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".BtnControl").on('touchstart', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".BtnControl").on('touchmove', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".BtnControl").on('touchend', function (e) {
                e.stopPropagation();
            })


            audioPlayer.children(".Progress").on('touch', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Progress").on('touchstart', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Progress").on('touchmove', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Progress").on('touchend', function (e) {
                e.stopPropagation();
            })


            audioPlayer.children(".Time").on('touch', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Time").on('touchstart', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Time").on('touchmove', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".Time").on('touchend', function (e) {
                e.stopPropagation();
            })


            audioPlayer.children(".StatusIco").on('touch', function (e) {
                e.stopPropagation();
            })
            audioPlayer.children(".StatusIco").on('touchstart', function (e) {
                e.stopPropagation();
            })
            /**************************************************** */


            //播放按钮点击事件
            audioPlayer.children(".BtnControl").on('click', function (e) {
                e.stopPropagation();
                //console.info("1");
                //// 音视频互斥处理，获取该页面所有video，并停止播放
                var videos = $("video");
                for (i = 0; i < videos.length; i++) {
                    videos[i].pause();
                }
                //获取该页面所有audio，并停止播放
                var audios = $("audio");
                for (i = 0; i < audios.length; i++) {
                    audios[i].pause();
                }
                $("#BtnBgMusic").removeClass("BtnBgMusicPlaying");
                //如果是播放状态，则点击暂停播放，切换按钮到暂停状态
                if ($(this).hasClass("Playing")) {
                    Pause();
                    $(this).removeClass("Playing");
                }
                    //如果是停止状态，则点击继续播放，切换按钮到播放状态，同时将其他audio播放器的播放按钮还原到暂停状态
                else {
                    Play();
                    $(this).parents(".M-Art-AudioBox").siblings(".M-Art-AudioBox").find(".BtnControl").removeClass("Playing");
                    $(this).addClass("Playing");
                }
            });


            //播放
            function Play() {
                audio.play();
                TimeSpan();
            }

            //暂停
            function Pause() {
                audio.pause();
            }


            //实时更新播放器时间和进度条状态
            function TimeSpan() {
                var ProgressNow = 0;
                setInterval(function () {
                    var ProgressNow = (audio.currentTime / audio.duration) * 100;
                    audioPlayer.find(".ProgressInnerBar").css("width", ProgressNow + "%");
                    var currentTime = timeFormat(audio.currentTime);
                    var timeAll = timeFormat(TimeAll());
                    audioPlayer.find(".Time").html(currentTime + "/" + timeAll);

                    //播放完毕后，按钮回到原始状态，同时进度条回到起点，播放停止
                    if (audio.currentTime === audio.duration) {
                        audioPlayer.find(".BtnControl").removeClass("Playing");
                        audioPlayer.find(".ProgressInnerBar").css("width", "0%");
                        audio.pause();
                    }
                }, 500);
            }


            //时间格式化
            function timeFormat(number) {
                var minute = parseInt(number / 60);
                var second = parseInt(number % 60);
                minute = minute >= 10 ? minute : "0" + minute;
                second = second >= 10 ? second : "0" + second;
                return minute + ":" + second;
            }

            //获取总时长
            function TimeAll() {
                return audio.duration;
            }


            //计算进度条宽度和显示时间状态
            function setRangeBar(e) {
                e.stopPropagation();
                var pointX = e.pageX || e.originalEvent.targetTouches[0].pageX;
                var objX = audioPlayer.find(".ProgressBar").offset().left;
                var runnableTrackWidth = (pointX - objX) / audioPlayer.find(".ProgressBar").width() * 100;
                var RangeValue = Math.round(runnableTrackWidth);
                if (runnableTrackWidth <= 0) {
                    audioPlayer.find(".ProgressInnerBar").width("0%");
                    TimeSpan();
                    audio.currentTime = Math.round(RangeValue / 100 * audio.duration);
                }
                else if (runnableTrackWidth > 0 && runnableTrackWidth < 100) {
                    audioPlayer.find(".ProgressInnerBar").width(runnableTrackWidth + "%");
                    TimeSpan();
                    audio.currentTime = Math.round(RangeValue / 100 * audio.duration);
                }
                else if (runnableTrackWidth >= 100) {
                    audioPlayer.find(".ProgressInnerBar").width("100%");
                    TimeSpan();
                    audio.currentTime = Math.round(RangeValue / 100 * audio.duration);
                }
            }


            //点击进度条
            audioPlayer.find(".Progress").on("click", function (e) {
                e.stopPropagation();
                //console.info("2");
                setRangeBar(e);
            })

            //PC拖动进度条滑块
            audioPlayer.find(".ProgressBar .ProgressPoint .StatusIco").mousedown(function (e) {
                //console.info("3");
                setRangeBar(e);
                e.stopPropagation(e);
                function relase() {
                    $(window).off("mousemove", setRangeBar);
                    $(window).off("mouseup", relase);
                }
                $(this).on("mousemove", setRangeBar);
                $(this).on("mouseup", relase);
            })


            //移动端拖动进度条滑块
            audioPlayer.find(".ProgressBar .ProgressPoint .StatusIco").on("touchstart", function (e) {
                //console.info("4");
                setRangeBar(e);
                e.stopPropagation();
                function relase() {
                    $(window).off("touchmove", setRangeBar);
                    $(window).off("touchend", relase);
                }
                $(this).on("touchmove", setRangeBar);
                $(this).on("touchend", relase);
            });

        })
        if (audios.length > 0) console.info("· 完成初始化音乐播放器------");
    }

    //显示及隐藏工具栏切换toggle
    function toggleMenu() {
        SC_R.menuFlag = !SC_R.menuFlag;
        pageNum();
        var Right = $("#Right").stop();
        if (SC_A && SC_A.soundFlag) {
            $("#Top").hide();
            $("#Bot").hide();
            $("#TopSoundBar").slideToggle();
            $("#BotSoundBar").slideToggle();
            Right.attr("data-right", "right").hide();
        } else {
            $("#Top").slideToggle();
            $("#Bot").slideToggle();
            $("#TopSoundBar").hide();
            $("#BotSoundBar").hide();

            Right.show();
            if (!SC_R.menuFlag) {
                Right.attr("data-right", "right").children().animate({ right: "-60px" }, 300);
            } else {
                Right.attr("data-right", "left").children().animate({ right: "10px" }, 300);
            }

        }
        Right = null;
        $("#searchDiv").hide();
        hideUISetMenu();
    }

    //隐藏top bot的工具按钮
    function hideMenu(callback) {
        if (SC_R.menuFlag) {
            console.log("hideMenu");
            SC_R.menuFlag = false;
            var bl1 = false,
    		bl2 = false,
    		bl3 = false,
    		bl4 = false,
    		bl5 = false,
    		bl6 = false;
            $("#Top").slideUp(function () {
                bl1 = true;
                callb();
            });
            $("#Bot").slideUp(function () {
                bl2 = true;
                callb();
            });
            $("#Right").stop().attr("data-right", "right").children().animate({ right: "-60px" }, 50, function () {
                bl3 = true;
                callb();
            });

            var TopSoundBar = $("#TopSoundBar");
            if (TopSoundBar.length > 0) TopSoundBar.slideUp(function () {
                bl4 = true;
                callb();
            });
            else bl4 = true;

            var BotSoundBar = $("#BotSoundBar");
            if (BotSoundBar.length > 0) BotSoundBar.slideUp(function () {
                bl5 = true;
                callb();
            });
            else bl5 = true;

            $("#searchDiv").hide();
            hideUISetMenu(true, function () {
                bl6 = true;
                callb();
            });
        } else {
            if (callback) callback();
        }

        function callb() {
            if (bl1 && bl2 && bl3 && bl4 && bl5 && bl6) {
                if (callback) callback();
            }
        }
    }

    //隐藏阅读设置DIV
    function hideUISetMenu(bl, callback) {
        if (bl) $("#UISetMenu").hide(callback);
        else $("#UISetMenu").slideUp(callback);
        $("#BtnUISet").removeClass("Selected");
        $("#UISetMenuMask").hide();
    }

    //显示或隐藏阅读设置DIV
    function toggleUISetMenu() {
        $("#UISetMenu").slideToggle(200);
        $("#BtnUISet").toggleClass("Selected");
        $("#UISetMenuMask").toggle();

        $("#ExtendBtnList").hide(200);
        $("#BtnSetExtend").removeClass("Selected");
    }

    //显示或隐藏阅读设置DIV
    function toggleExtendBtnList() {
        $("#ExtendBtnList").slideToggle(200);
        $("#BtnSetExtend").toggleClass("Selected");

        $("#UISetMenu").hide(200);
        $("#BtnUISet").removeClass("Selected");

    }

    //滑动页码条
    function changePoint(e) {
        //滑动条滑动改变页数
        var pVal = $("#points").val();
        //判断是否可以继续往下看
        if (!isGoLook("FP", SC_R._cI, pVal)) {
            $("#points").val(SC_R._cP);
            return false;
        }
        var chap = {
            "chap": SC_R.ebook.read.chap,
            "page": parseInt(pVal),
            "fs": _cS.fs
        };

        disposeBookBody(chap, function () { });
        pageNum();
    }

    //显示页码
    function pageNum() {
        showTime();
        $("#ChaperName").text(getChapName(SC_R.ebook.read.chap));
        $("#totalPage_All").val(SC_R.totalPage_All);
        $("#points").attr("max", SC_R._tP).val(SC_R._cP);
        $("#currentPage").val(SC_R._cP);
        $("#PageNum").html('<span class="ReadPages">' + SC_R._cP + '</span>' + "/" + '<span class="SumPages">' + SC_R._tP + '</span>');
        saveEbookLocal();
        saveUI();
        bookRead("set");
    }

    //添加书签
    function addBookmark() {
        var SCConfig = SC_Config(SC_R.configKey);
        if (!SCConfig) SCConfig = {};
        if (!SCConfig.bookmark) SCConfig.bookmark = {};
        if (!SCConfig.bookmark[SC_R.ebook.info.id]) SCConfig.bookmark[SC_R.ebook.info.id] = {};
        if (!SCConfig.bookmark[SC_R.ebook.info.id][SC_R.ebook.read.chap]) SCConfig.bookmark[SC_R.ebook.info.id][SC_R.ebook.read.chap] = {};

        var mark = {
            'font_size': _cS.fs,
            'page': SC_R.ebook.read.page,
            'markText': getMarkText() //字体被改变后，通过该标记文本找到该页
        };
        SCConfig.bookmark[SC_R.ebook.info.id][SC_R.ebook.read.chap] = mark;
        SC_Config(SC_R.configKey, SCConfig);
        SC_R.ebook.info.MarkRead = false;
    }

    //显示书签 按章节顺序显示
    function showBookmark(callback) {
        if (!SC_R.ebook.info) SC_R.ebook.info = {};
        if (!SC_R.ebook.info.MarkRead) {
            var SCConfig = SC_Config(SC_R.configKey);
            if (!SCConfig.bookmark) SCConfig.bookmark = {};
            if (!SCConfig.bookmark[SC_R.ebook.info.id]) SCConfig.bookmark[SC_R.ebook.info.id] = {};
            var Bookmark = SCConfig.bookmark[SC_R.ebook.info.id];

            //如果当前字体改变了，不和之前书签里面的字体一样，则需要通过书签里面markText来重新计算page;
            for (var key in Bookmark) {
                if (Bookmark[key].font_size != _cS.fs && Bookmark[key].markText) {
                    Bookmark[key].page = gotoMarkPage(key, Bookmark[key].markText, Bookmark[key].page);
                    Bookmark[key].font_size = _cS.fs;
                }
            }
            SCConfig.bookmark[SC_R.ebook.info.id] = Bookmark;
            SC_Config(SC_R.configKey, SCConfig);

            var $BookMarkList = $("#BookMarkList");
            if (!jQuery.isEmptyObject(Bookmark)) {
                var $ul = $('<ul>'),
            	$li = $lia = null;
                var list = SC_R.ebook.info.chapList;
                var index = 0;
                for (var i = 0, l = list.length; i < l; i++) {
                    if (Bookmark[list[i]]) {
                        index++;
                        $li = $('<li>');
                        $lia = $("<a>").attr("name", "bookmark");
                        $lia.data("obj", { chap: list[i], page: Bookmark[list[i]].page, fs: Bookmark[list[i]].font_size, markText: Bookmark[list[i]].markText });
                        $lia.html("书签" + index + "：" + SC_R.ebook.info.content[list[i]].name + "(<em style=\"color:" + _cS.fcT + ";\" data-color=\"blueAndRed\">第" + Bookmark[list[i]].page + "页</em>)");
                        $li.append($lia);
                        $ul.append($li);
                        $lia = $li = null;
                    }
                }
                $BookMarkList.empty().append($ul);
                $ul = null;
            } else {
                var $div = $('<div>').addClass("NullTips").html("<p>尚未添加书签</p><p>阅读时点击右上角的书签即可添加</p>"); $span1 = $span2 = null;
                $BookMarkList.append($div);
                $div = null;
            }
            SC_R.ebook.info.MarkRead = true;
            $BookMarkList = null;
        }
        if (callback) callback();
    }

    //书签中章节跳转
    function gotoBookmarkLi(e) {
        var chap = $(e.target).data("obj");
        if (SC_R.showCatalogFlag) return false;
        SC_R.showCatalogFlag = true;

        fadeInLoad("fast", true, function () {
            if (SC_R.ebook.read.chap = chap.chap) {
                SC_R.ebook.read.page = chap.page;
            }
            chap.loadPrev = false;
            loadChapInfo(chap, function () {
                fadeOutLoad("fast", function () {
                    hideEbookNavList();
                    SC_R.showCatalogFlag = false;
                });
            });
        });
    }

    //清空书签内容
    function clearBookmarkList() {
        $("#BookMarkList").empty();
        SC_R.ebook.info.MarkRead = false;
    }

    //显示目录信息
    function showCatalog(callback) {
        if (!SC_R.ebook.info) SC_R.ebook.info = {};
        if (!SC_R.ebook.info.catalogRead) {
            if (SC_R.ebook.info.catalog) {

                var $Catalog = $("#Catalog");
                var $ul = $('<ul>'),
    			$li = $lia = null;
                var list = SC_R.ebook.info.catalog;
                for (var i = 0, i1 = list.length; i < i1; i++) {
                    $li = $("<li>");
                    $lia = $("<a>").attr({ "data-chap": list[i]['chap'], "data-free": list[i]['free'], "name": "catalog" }).text(list[i]['name']);
                    $li.append($lia);
                    $ul.append($li);
                    $lia = $li = null;
                }
                $Catalog.empty().append($ul);
                SC_R.ebook.info.catalogRead = true;
                $ul = $Catalog = null;
            }
        }
        markCatalog();
        if (callback) callback();
    }

    //目录中章节跳转
    function gotoCatalogLi(e) {
        var $target = $(e.target);
        var thisChap = $target.attr("data-chap") || "chap0.html";
        var dataFree = $target.attr("data-free") || "true";
        if (dataFree.toString() == "true" || SC_R.ebook.info.isbuy) {
            var chap = {
                "chap": thisChap,
                "fs": _cS.fs,
                "page": 1,
                "loadPrev": false

            };
            if (thisChap == SC_R.ebook.read.chap) {
                chap.page = SC_R.ebook.read.page;
            }
            if (SC_R.showCatalogFlag) return false;
            SC_R.showCatalogFlag = true;
            markCatalog(chap.chap);

            fadeInLoad("fast", true, function () {
                loadChapInfo(chap, function () {
                    fadeOutLoad("fast", function () {
                        hideEbookNavList();
                        SC_R.showCatalogFlag = false;
                    });
                });
            });
        } else if (dataFree.toString() == "false") {
            hideEbookNavList();
            buyDiv();
        } else { }
    }

    function gotoTargetCatalog(catalogIndex) {
        var thisChap = "chap" + catalogIndex + ".html";
        var dataFree = "true";
        if (dataFree.toString() == "true" || SC_R.ebook.info.isbuy) {
            var chap = {
                "chap": thisChap,
                "fs": _cS.fs,
                "page": 1,
                "loadPrev": false

            };
            if (thisChap == SC_R.ebook.read.chap) {
                chap.page = SC_R.ebook.read.page;
            }
            if (SC_R.showCatalogFlag) return false;
            SC_R.showCatalogFlag = true;
            markCatalog(chap.chap);

            fadeInLoad("fast", true, function () {
                loadChapInfo(chap, function () {
                    fadeOutLoad("fast", function () {
                        hideEbookNavList();
                        SC_R.showCatalogFlag = false;
                    });
                });
            });
        } else if (dataFree.toString() == "false") {
            hideEbookNavList();
            buyDiv();
        } else { }
    }

    //标记目录中的当前章节-- 去掉设置背景色
    function markCatalog(chap) {
        var setBg = "",
    	setmatalogChBg = "";
        if (_cS.moon_sum == "sun") {
            setBg = _cS.bg, setmatalogChBg = _cS.matalogChBg;
        } else {
            setBg = _eS.moonBg, setmatalogChBg = _eS.moon_cataC;
        }

        if (!SC_R.ebook.read) SC_R.ebook.read = {};
        if (!chap) chap = SC_R.ebook.read.chap;
        var match = "[data-chap='" + chap + "']";
        var $Catalog = $("#Catalog");
        if (SC_R.ebook.info.isbuy) {
            $Catalog.find("a").removeClass().attr("data-check", "no");
        } else {
            $Catalog.find("a").each(function () {
                if ($(this).attr("data-free") == "false") {
                    $(this).addClass("lock");
                } else {
                    $(this).removeClass();
                }
                $(this).attr("data-check", "no");
            });
        }

        $Catalog.find("a" + match).last().addClass("Current").attr("data-check", "check");

        if ($Catalog.find("a" + match).last().length > 0) {
            var top = $Catalog.find("a" + match).last().offset().top;
            if (top > (__h - 50)) {
                $("#conEbookNavA1").scrollTop(top - 100);
            }
            $Catalog = top = null;
        }
    }

    //加载笔记和纠错中的iframe
    function loadIfream(divID, callback) {
        var theDiv = $("#" + divID).empty();
        if (SC_R.userID) {
            var iframeLen = theDiv.find("iframe[name='" + divID + "Iframe']").length;
            if (iframeLen <= 0) {
                theDiv.width(__w).height(__h - 44).css("background", "#ffffff");
                var iframeFFF = document.createElement("iframe");
                iframeFFF.setAttribute("id", divID + "Iframe" + SC_R.bookID);
                iframeFFF.setAttribute("name", divID + "Iframe");
                iframeFFF.setAttribute("frameborder", "0px");
                iframeFFF.setAttribute("z-index", "19861017");
                iframeFFF.style.width = "100%";
                iframeFFF.style.height = (__h - 44) + "px";
                document.getElementById(divID).appendChild(iframeFFF);

                fadeOutLoad(false);
                fadeInLoad("normal", true, function () {
                    var src = "/templates/group/old/usertalk/FriendTalk.html?platID=1&productID=" + SC_R.bookID;
                    if (divID == "myNote") {
                        src += "&type=3&userID=" + SC_R.userID;
                    } else if (divID == "otherNote") {
                        src += "&type=3&unUserID=" + SC_R.userID;
                    } else if (divID == "myError") {
                        src += "&type=1&userID=" + SC_R.userID;
                    } else if (divID == "otherError") {
                        src += "&type=1&unUserID=" + SC_R.userID;
                    } else { }

                    if (iframeFFF.attachEvent) {
                        iframeFFF.attachEvent("onload", function () {
                            fadeOutLoad("normal");
                            isContentInIframe(divID + "Iframe" + SC_R.bookID);
                        });
                    } else {
                        iframeFFF.onload = function () {
                            fadeOutLoad("normal");
                            isContentInIframe(divID + "Iframe" + SC_R.bookID);
                        }
                    }
                    iframeFFF.setAttribute("src", src);
                    iframeFFF = null;
                });

                if (callback) callback();
            }
        } else {
            var $img = $("<img>").attr({ "src": _eS.promptloginImg, "style": "width:100%;height:auto;", "name": "loginImg" });
            theDiv.append($img);
            $img = null;
            if (callback) callback();
        }
    }

    //判断iframe里面的子页面是否加载有数据
    function isContentInIframe(id) {
        //获取iframe的window对象
        var thisIframe = window.self.document.getElementById(id).contentWindow;
        if (thisIframe.document.body.style.height <= 0) {
            var $parent = $("#" + id).parent().empty();

            var text1 = "",
        	text2 = "";
            if (id.indexOf("myNote") > -1) {
                text1 = "暂无我的笔记";
                text2 = "阅读时，长按屏幕即可添加笔记";

            } else if (id.indexOf("otherNote") > -1) {
                text1 = "暂无他人的笔记";
                text2 = "阅读时，长按屏幕即可添加笔记";

            } else if (id.indexOf("myError") > -1) {
                text1 = "暂无我的纠错";
                text2 = "阅读时，长按屏幕即可添加纠错";

            } else {
                text1 = "暂无他人的纠错";
                text2 = "阅读时，长按屏幕即可添加纠错";
            }
            var $div = $('<div>').attr({ "style": "width:px;height:100px;padding-top:30px;background:#ffffff;text-align:center;" })
            var $span1 = $('<h2>').attr({ "style": "text-align:center;display:block;height:30px;line-height:30px;margin:10px 0px;" }).html(text1);
            var $span2 = $('<span>').attr({ "style": "text-align:center;display:block;height:20px;line-height:20px;padding:0 32px;" }).html(text2);
            $div.append($span1);
            if (text2) $div.append($span2)
            $span1 = $span2 = null;
            $parent.append($div);
            $div = null;
        }
    }
    //*****************************************************阅读器界面设置与操作   end  ******************************************************//

    function showPasswordInput() {
        var tipContainer = $(".PasswordInput", parent.document);
        //console.info(tipContainer);
        tipContainer.addClass("popup-showing active");
    }

    //true 密码通过
    function checkPassword() {
        try {
            //localStorage.setItem("viewPassword" + SC_R.bookID, obj.viewPassword);
            //console.info(SC_R.ebook.info);
            //获取缓存中的书籍密码
            var localViewPassword = SC_R.ebook.info.viewPassword; //localStorage.getItem("viewPassword" + SC_R.bookID)
            //获取用户缓存密码，由书籍id唯一确定
            var myViewPassword = localStorage.getItem("myViewPassword" + SC_R.bookID);
            //console.info(localViewPassword);
            //console.info(myViewPassword);
            if (localViewPassword != null && localViewPassword != "") //初始值没有密码为"null",用户本地验证密码通过，则为null
            {
                if (myViewPassword == null) return false; //如果本地没有密码缓存
                else if (myViewPassword.toLowerCase() == localViewPassword.toLowerCase()) return true;
                else {
                    return false;
                }

            } else {
                //console.info("no password");
                return true;
            }
        } catch (e) {
            //console.error(e.toString());
        }
        //未知情况
        return true;
    }

    //*****************************************************阅读器翻页设置   start ******************************************************//
    //绑定BookBody触摸事件
    function bindEvent() {
        if (window.addEventListener) {
            document.getElementById("BookBody").addEventListener(touch.start, touchSatrtFunc, true);
            document.getElementById("BookBody").addEventListener(touch.move, touchMoveFunc, true);
            document.getElementById("BookBody").addEventListener(touch.end, touchEndFunc, true);
        }
    }

    //touchstart事件
    function touchSatrtFunc(event) {
        //for new 
        clearTimeout(touch.dblClickImgFun);
        //stopEvent(event);
        touch.moveFlag = false;

        if (!SC_R.readChapFlag) {
            processingData();
            return false;
        }

        if (touch.clickFlag) return false;

        //if (touch.touchFlag) return false;

        touch.startTime("touch");
        touch.setStartXY(event);
        touch.resetXY();

        //仿真翻页提前准备
        if (_cS.flip_way == "simulation") {
            if (touch.startY > __h / 2) touch.upDown = "down";
            else touch.upDown = "up";
            preparePCNPage();
        }

        //$("#UISetMenu").slideUp("normal");
        //$("#UISetMenuMask").hide();
        var targetName = event.target.tagName;
        if (targetName.toLocaleUpperCase() == "IMG") {
            //双击图片的处理
            if (!event.target.getAttribute("data-videoSrc")) {
                //双击放大图片
                clearTimeout(SC_R.clickFun);
                touch.dblClickImgCount++;
                if (touch.dblClickImgCount == 1) touch.dblClickImgFun = setTimeout(function () { touch.dblClickImgCount = 0; }, touch.dblClickT);
            }
        } 
        else if (targetName.toLocaleUpperCase() == "VIDEO") {
            touch.touchFlag = false;
            // $(event.target.pause());
        } 
        else {
            //如果开启了语音播放功能，则不允许长按添加笔记或者纠错
            if (!(SC_A && SC_A.soundFlag)) {
                clearTimeout(SC_R.longPressFun);

                if ((targetName.toLocaleUpperCase() == "P" && $(event.target).attr("data-mark") != "markLine") || (targetName.toLocaleUpperCase() != "P" && $(event.target).parents("p").attr("data-mark") != "markLine")) {
                    SC_N.hideOrShowPcontent();
                }

                //模拟长按事件  添加笔记和纠错
                SC_N.Pcontent = $(event.target);
                SC_R.longPressFun = setTimeout(function () {
                    touch.touchFlag = false;
                    if (targetName.toLocaleUpperCase() == "MARK") {
                        SC_N.Pcontent = $(event.target);
                        hideMenu(function () {
                            SC_N.submitNoteAndError({ flag: "updateNote", talkID: $(event.target).attr("data-talkid"), userID: SC_R.userID, bookID: SC_R.bookID, page: SC_R._cP });
                        });
                    } else {
                        SC_N.addNoteAndError(event, SC_R.userID, SC_R.bookID, hideMenu);
                        //长按出现放大镜
                        //SC_N.createMagnifier();
                    }
                }, touch.longPressT);
            }
        }

        //layer.closeAll();
        touch.touchFlag = true;
        touch.startFlag = true;

        //for new  
        return true;
    }

    //touchmove事件
    function touchMoveFunc(event) {
        // console.log(event.touches[0].clientY)
        clearTimeout(SC_R.longPressFun);
        touch.dblClickImgCount = 0;
        //for new 
        if (_cS.flip_way != "roll")
            stopEvent(event);
        else {
            if (checkPassword() == false) {
                //如果密码校验没有通过
                showPasswordInput();
                stopEvent(event);
                //显示密码输入
                //return false;
            }

            // var c_chap=   getCurrentChapInScroll  ();
            var c_chap = SC_R.ebook.info.chapList[SC_R._cI]
            if (!SC_R.ebook.info.isbuy && (!SC_R.ebook.info.content[c_chap].free)) {
                stopEvent(event);
                buyDiv();
                //return;
            }
        }

        touch.setEndXY(event);
        touch.setXY();
        touch.setMaxXY();

        //放大镜移动过程中
        if (SC_N.magnifierF) {
            $("#magnifierDiv").css("left", parseFloat(touch.endX) - 75).css("top", parseFloat(touch.endY) - 170);
            var wenziDivW = $("#wenziDiv").width(),
        	wenziDivH = $("#wenziDiv").height();
            var balanceW = wenziDivW - _pag.pageWidth;
            balanceW = (touch.endX / __w) * balanceW;

            var balanceH = wenziDivH - _pag.textHeight;
            balanceH = (touch.endY / __h) * balanceH;
            $("#wenziDiv").css("left", -1 * balanceW).css("top", -1 * (parseFloat(balanceH) + 75));
            return false;
        }
        if (!SC_R.readChapFlag) {
            processingData();
            return false;
        }
        if (!touch.touchFlag) return false;
        if (!touch.startFlag) return false;

        SC_R._cP = parseInt(SC_R._cP);
        SC_R._tP = parseInt(SC_R._tP);
        var callback_1 = function () { touch.touchFlag = true; };
        var callback_2 = function () { touch.touchFlag = false; };
        if (touch.X == 0 && touch.Y == 0) {
            callback_1();
        } else {
            if (!touch.moveFlag) hideMenu();
            if (_cS.flip_way == "slide") {
                if (touch.X > 0) {
                    judgePrevChap(function () {
                        SC_R._pObj.css("left", (touch.X - __w - 10) + "px");
                        SC_R._cObj.css("left", (touch.X - 10) + "px");
                    }, callback_2, true);
                }
                if (touch.X < 0) {
                    judgeNextChap(function () {
                        SC_R._cObj.css("left", (-1 * Math.abs(touch.X)) + "px");
                        SC_R._nObj.css("left", ((__w) - 1 * Math.abs(touch.X)) + "px");
                    }, callback_2, true);
                }
            } 
            else if (_cS.flip_way == "simulation") {
                $("#keepOut1").show();
                touch.angleX = touch.endX - _bbLeft;
                touch.angleY = touch.endY;
                if ((touch.startX - _bbLeft) < __w / 2) {
                    if (touch.endX > 50) touch.angleX = touch.endX - _bbLeft - touch.backX;
                    if (touch.upDown == "down") touch.angleY = __h - touch.backY;
                    else touch.angleY = touch.backY;
                    judgePrevChap(function () {
                        setTransform();
                        simulationFlip(SC_R._pI, SC_R._pP);
                    }, callback_2, true);
                } 
                else {
                    judgeNextChap(function () {
                        setTransform();
                        simulationFlip(SC_R._cI, SC_R._cP);
                    }, callback_2, true);
                }
            } 
            else if (_cS.flip_way == "roll") {

                //for new 
                return true;
                if (touch.Y > 0) {
                    judgePrevChap(function () {
                        SC_R._pObj.css("top", (touch.Y - __h - 10) + "px");
                        SC_R._cObj.css("top", (touch.Y - 10) + "px");
                    }, callback_2, true);
                }
                if (touch.Y < 0) {
                    judgeNextChap(function () {
                        SC_R._cObj.css("top", (-1 * Math.abs(touch.Y)) + "px");
                        SC_R._nObj.css("top", ((__h) - 1 * Math.abs(touch.Y)) + "px");
                    }, callback_2, true);
                }
            } else { // 连续翻页 wanghao
                console.log('连续翻页');
            }
        }
    }

    //touchend事件
    function touchEndFunc(event) {
        clearTimeout(SC_R.longPressFun);
        stopEvent(event);
        touch.setEndXY(event);
        touch.setXY();
        touch.setMaxXY();

        var callback = function () {
            touch.touchFlag = false;
            touch.moveFlag = false;
        };

        //放大镜移动之后
        if (SC_N.magnifierF) {
            SC_N.addNoteAndError(event, SC_R.userID, SC_R.bookID, hideMenu);
            callback();
            return false;
        }

        if (!SC_R.readChapFlag) {
            processingData();
            return false;
        }
        if (!touch.touchFlag) return false;
        if (!touch.startFlag) return false;
        touch.startFlag = false;

        SC_R._cP = parseInt(SC_R._cP), SC_R._tP = parseInt(SC_R._tP);
        if (touch.X == 0 && touch.Y == 0) {

            //保留之前双击打开图片
            if (touch.dblClickImgCount == 2) {
                //双击放大图片 20161031 qinxiankang 改为单击打开
                touch.dblClickImgCount = 0;
                SC_I = SC_Img();
                SC_I.dblclickImgShow(event, hideMenu);
                callback();
            } 
            else {
                console.info(touch.dblClickImgCount);
                var targetName = event.target.tagName;
                console.log("the touch node targetName:" + targetName);
                //单击打开图片
                if (touch.dblClickImgCount == 1 && targetName == "IMG") {
                    touch.dblClickImgCount = 0;
                    SC_I = SC_Img();
                    console.info();
                    if (!$(event.target).hasClass("coverImg")) {
                        SC_I.dblclickImgShow(event, hideMenu);
                        console.info("showImg toggleMenu");
                        callback();
                    } else {
                        toggleMenu();
                    }
                }
                //模拟点击事件,鼠标移动距离为0，同时触屏时间不超过400毫秒
                if (touch.getTime("touch") < touch.clickT) {
                    if (touch.dblClickImgCount == 0) {
                        var bl = true;

                        if (targetName.toLocaleUpperCase() == "IMG") {
                            bl = false;
                            //点击看视频
                            if (event.target.getAttribute("data-videoSrc")) {
                                var videoW = $(event.target).width();
                                var videoH = $(event.target).height();
                                var videoSrc = $(event.target).attr("data-videoSrc");
                                var videoImg = $(event.target).attr("src");

                                SC_V = SC_Video();
                                SC_V.ShowVideoDiv({ videoSrc: videoSrc, title: SC_R.ebook.info.name, isbuy: "Y" }, hideMenu);
                            }

                        } else if (targetName.toLocaleUpperCase() == "VIDEO") {
                            bl = false;
                            stopEvent(event);
                            //点击看视频
                            if (event.target.getAttribute("src")) {
                                //获取该页面所有video，并停止播放
                                var videos = $("video");
                                for (i = 0; i < videos.length; i++) {
                                    if(videos[i].src !== event.target.getAttribute("src")) {
                                        videos[i].pause();
                                    }
                                }
                                //获取该页面所有audio，并停止播放
                                var audios = $("audio");
                                for (i = 0; i < audios.length; i++) {
                                    audios[i].pause();
                                }
                                var video = event.target;
                                if(video.paused) {
                                    video.play();
                                } else {
                                    video.pause();
                                }
                            }
                        }
                        else if ($(event.target).hasClass("TagBoxP") && $(event.target).find(".answer").length > 0) {
                            bl = false;
                            console.log("点击了答案本身");
                            var $ansCon = $(event.target).children(".answer");
                            if ($ansCon.hasClass("AnsConHide")) {
                                $ansCon.removeClass("AnsConHide");
                                $ansCon.next(".BtnShowAnsCon").hide();
                            } else {
                                $ansCon.addClass("AnsConHide");
                                $ansCon.next(".BtnShowAnsCon").show();
                            }
                        }
                        else if ($(event.target).attr("data-flag")) {
                            bl = false;
                            //点击查看答案按钮
                            if ($(event.target).hasClass("BtnShowAnsCon")) {
                                bl = false;
                                console.log("点击了查看答案");
                                if ($(event.target).is(".hidden")) {
                                    console.log("隐藏答案");
                                } else {
                                    console.log("显示答案");
                                    $(event.target).prev(".answer").removeClass("AnsConHide");
                                    $(event.target).hide();
                                }
                            }

                            else if ($(event.target).attr("data-flag").toString() == "knowledge") {
                                bl = false;
                                //点击查看考点 
                                var categoryName = $(event.target).attr("data-categorybname");
                                var categoryCount = $(event.target).attr("data-count");
                                hideMenu(function () {
                                    SC_KL = SC_KnowLedge();
                                    SC_KL.showKnowledgeDiv(categoryName, categoryCount);
                                });

                            }

                        }
                            /*
                        else if (targetName.toLocaleUpperCase() == "EM") {

                            if ($(event.target).attr("data-flag")) {

                                if ($(event.target).attr("data-flag").toString() == "knowledge") {
                                    bl = false;
                                    //点击查看考点 
                                    var categoryName = $(event.target).attr("data-categorybname");
                                    var categoryCount = $(event.target).attr("data-count");
                                    hideMenu(function () {
                                        SC_KL = SC_KnowLedge();
                                        SC_KL.showKnowledgeDiv(categoryName, categoryCount);
                                    });

                                } else {

                                }


                                
                                if ($(event.target).attr("data-flag").toString() == "answer") {
                                    bl = false;
                                    //点击查看答案

                                    var emText = "";
                                    if ($(event.target).find("img").length > 0) {
                                        $(event.target).find("img").each(function () {
                                            emText += $(this).prop("outerHTML").toString();
                                        });
                                    } else {
                                        emText = $(event.target).text();
                                    }

                                    var emData = $(event.target).attr("data-answer");
                                    $(event.target).attr("data-answer", emText);
                                    $(event.target).html(emData);
                                    var setBg = "",
                                        setAs = "",
                                        setAsC = "";
                                    if (_cS.moon_sum == "sun") setBg = _cS.bg, setAs = _cS.asbg, setAsC = "#333333";
                                    else setBg = _eS.moonBg, setAs = _eS.moonAsbg, setAsC = _eS.moonFc;
                                    if ($(event.target).attr("data-answer") == _eS.answerInfo) {
                                        $(event.target).css("color", setAsC).css("padding-left", "0px").parent().css({
                                            "background-color": getBright(setBg),
                                            "background-image": "none",
                                        });
                                    } else {
                                        $(event.target).css("color", setAsC).css("padding-left", "10px").parent().css({
                                            "background-color": getBright(setAs),
                                            "background-image": "",
                                        });
                                    }
                                } else if ($(event.target).attr("data-flag").toString() == "knowledge") {
                                    bl = false;
                                    //点击查看考点 
                                    var categoryName = $(event.target).attr("data-categorybname");
                                    var categoryCount = $(event.target).attr("data-count");
                                    hideMenu(function () {
                                        SC_KL = SC_KnowLedge();
                                        SC_KL.showKnowledgeDiv(categoryName, categoryCount);
                                    });

                                } else {

                                }
                                
                            }
                            

                        }
                        */
                        else if (targetName.toLocaleUpperCase() == "MARK") {
                            bl = false;
                            //点击修改笔记
                            if ($(event.target).attr("name") == "markNote") {
                                hideMenu(function () {
                                    SC_N.Pcontent = $(event.target);
                                    SC_N.submitNoteAndError({ flag: "updateNote", talkID: $(event.target).attr("data-talkid"), userID: SC_R.userID, bookID: SC_R.ebook.info.id, page: SC_R._cP });
                                });
                            }
                        } else if (targetName.toLocaleUpperCase() == "A") {
                            //点击目录跳转
                            var thisA = $(event.target);
                            var dataHref = thisA.attr("data-href");
                            var dataFree = "";
                            if (SC_R.ebook.info.content[dataHref]) {
                                dataFree = SC_R.ebook.info.content[dataHref].free;
                            }

                            if (dataFree.toString() != "") {
                                if ((dataFree.toString() == "true" || SC_R.ebook.info.isbuy) && dataHref) {
                                    bl = false;
                                    var chap = {
                                        'chap': dataHref,
                                        'page': 1,
                                        'fs': _cS.fs
                                    }
                                    fadeInLoad("fast", true, function () {
                                        loadChapInfo(chap, function () {
                                            fadeOutLoad("fast");
                                        });
                                    });
                                    return false;
                                } else if (dataFree.toString() == "false") {
                                    bl = false;
                                    buyDiv();
                                } else { }
                            }

                        } else {
                            if ((targetName.toLocaleUpperCase() == "P" && $(event.target).attr("data-mark") == "markLine") || (targetName.toLocaleUpperCase() != "P" && $(event.target).parents("p").attr("data-mark") == "markLine")) {
                                bl = false;
                                SC_N.addNoteAndError(event, SC_R.userID, SC_R.bookID, hideMenu);
                            }
                        }

                        if (bl) {


                            flipPage(event, touch.endX, touch.endY, function () {
                                //退出语音朗读
                                if (SC_A) SC_A.exitAudio();
                            });
                        }

                    } else {
                        clickFun = setTimeout(function () {
                            flipPage(event, touch.endX, touch.endY, function () {
                                //退出语音朗读
                                if (SC_A) SC_A.exitAudio();
                            });
                        }, touch.dblClickT - touch.clickT);
                    }
                } else {
                    touch.dblClickImgCount = 0;
                }
            }
            callback();
        } 
        else {
            touch.dblClickImgCount = 0;
            if ((Math.abs(touch.X) <= touch.minDisplacement && _cS.flip_way != "roll") || (Math.abs(touch.Y) <= touch.minDisplacement && _cS.flip_way == "roll")) {
                //还原上一页或者当前页，移动的距离太小的还原
                if (_cS.flip_way == "slide") {
                    $("#" + SC_R._ecd + SC_R._pI + "_" + SC_R._pP).animate({ left: "-" + (__w + 10) + "px" }, 50, callback);
                    $("#" + SC_R._ecd + SC_R._cI + "_" + SC_R._cP).animate({ left: "0px" }, 50, callback);
                    $("#" + SC_R._ecd + SC_R._nI + "_" + SC_R._nP).animate({ left: (__w + 10) + "px" }, 50, callback);

                } 
                else if (_cS.flip_way == "simulation") {
                    if ((touch.startX - _bbLeft) < __w / 2) {
                        if (touch.endX > 50) touch.angleX = touch.endX - _bbLeft - touch.backX;
                        if (touch.upDown == "down") touch.angleY = __h - touch.backY;
                        else touch.angleY = touch.backY;

                        simulationSetInterval("backward_back", SC_R._pI, SC_R._pP, callback);
                    } 
                    else {
                        simulationSetInterval("forward_back", SC_R._cI, SC_R._cP, callback);
                    }
                } 
                else if (_cS.flip_way == "roll") {
                    $("#" + SC_R._ecd + SC_R._pI + "_" + SC_R._pP).animate({ top: "-" + (__h + 10) + "px" }, 50, callback);
                    $("#" + SC_R._ecd + SC_R._cI + "_" + SC_R._cP).animate({ top: "0px" }, 50, callback);
                    $("#" + SC_R._ecd + SC_R._nI + "_" + SC_R._nP).animate({ top: (__h + 10) + "px" }, 50, callback);
                } 
                else {

                }
            } 
            else {
                //滑动的距离很大，触发翻页
                //退出语音朗读
                if (SC_A) SC_A.exitAudio();
                var T = setSlideT();
                if (_cS.flip_way == "slide") {
                    if (touch.X > touch.minDisplacement) {
                        // 在判断一次滑动的距离
                        if (Math.abs(touch.X) < Math.abs(touch.maxX)) {
                            SC_R._pObj.animate({ left: "-" + (__w + 10) + "px" }, T, callback);
                            SC_R._cObj.animate({ left: "0px" }, T, callback);
                        } else {
                            judgePrevChap(function () {
                                SC_R._pObj.animate({ left: "0px" }, T, function () {
                                    enterPrePage();
                                    callback();
                                });
                                SC_R._cObj.animate({ left: (__w + 10) + "px" }, T, function () { });
                            }, callback, true);

                        }
                    } 
                    else if (touch.X < -1 * touch.minDisplacement) {
                        if (Math.abs(touch.X) < Math.abs(touch.maxX)) {
                            SC_R._cObj.animate({ left: "0px" }, T, callback);
                            SC_R._nObj.animate({ left: (__w + 10) + "px" }, T, callback);
                        } 
                        else {
                            judgeNextChap(function () {
                                SC_R._cObj.animate({ left: "-" + (__w + 10) + "px" }, T, function () {
                                    enterNextPage();
                                    callback();
                                });
                                SC_R._nObj.animate({ left: "0px" }, T, function () { });
                            }, callback, true);

                        }
                    } 
                    else {
                        callback();
                    }
                } 
                else if (_cS.flip_way == "simulation") {
                    if ((touch.startX - _bbLeft) < __w / 2) {
                        if (touch.endX > 50) touch.angleX = touch.endX - _bbLeft - touch.backX;
                        if (touch.upDown == "down") touch.angleY = __h - touch.backY;
                        else touch.angleY = touch.backY;
                        if (Math.abs(touch.X) < Math.abs(touch.maxX)) {
                            simulationSetInterval("backward_back", SC_R._pI, SC_R._pP, callback);
                            callback();
                        } 
                        else {
                            judgePrevChap(function () {
                                simulationSetInterval("backward", SC_R._pI, SC_R._pP, function () {
                                    enterPrePage();
                                    callback();
                                });
                            }, callback, true);

                        }
                    } 
                    else {
                        if (Math.abs(touch.X) < Math.abs(touch.maxX)) {
                            simulationSetInterval("forward_back", SC_R._cI, SC_R._cP, null);
                            callback();
                        } 
                        else {
                            judgeNextChap(function () {
                                simulationSetInterval("forward", SC_R._cI, SC_R._cP, function () {
                                    enterNextPage();
                                    callback();
                                });
                            }, callback, true);

                        }
                    }
                } 
                else if (_cS.flip_way == "roll") {
                    //for new 
                    return true;
                    if (touch.Y > touch.minDisplacement) {
                        if (Math.abs(touch.Y) < Math.abs(touch.maxY)) {
                            SC_R._pObj.animate({ top: "-" + (__h + 10) + "px" }, T, callback);
                            SC_R._cObj.animate({ top: "0px" }, T, callback);
                        } 
                        else {
                            judgePrevChap(function () {
                                SC_R._pObj.animate({ top: "0px" }, T, function () {
                                    enterPrePage();
                                    callback();
                                });
                                SC_R._cObj.animate({ top: (__h + 10) + "px" }, T, function () { });
                            }, callback, true);

                        }
                    } 
                    else if (touch.Y < -1 * touch.minDisplacement) {
                        if (Math.abs(touch.Y) < Math.abs(touch.maxY)) {
                            SC_R._cObj.animate({ top: "0px" }, T, null);
                            SC_R._nObj.animate({ top: (__h + 10) + "px" }, T, callback);
                            callback();
                        } 
                        else {
                            judgeNextChap(function () {
                                SC_R._cObj.animate({ top: "-" + (__h + 10) + "px" }, T, function () {
                                    enterNextPage();
                                    callback();
                                });
                                SC_R._nObj.animate({ top: "0px" }, T, function () { });
                            }, callback, true);
                        }
                    } 
                    else {
                        callback();
                    }
                } 
                else {
                    console.log('---------- touchend ----------');
                }
            }
        }
    }

    //模拟点击翻页事件
    function flipPage(e, cX, cY, callback) {
        if (e) {
            stopEvent(e);
            clickX = e.clientX || cX;
            clickY = e.clientY || cY;
        } else {
            clickX = cX;
            clickY = cY;
        }
        layer.closeAll();
        if (touch.clickFlag) {
            touch.clickFlag = false;
            return false;
        }
        touch.clickFlag = true;
        var clickX, clickY;

        clickX = clickX - _bbLeft, clickY = clickY - _bbTop;
        SC_R._cP = parseInt(SC_R._cP);
        SC_R._tP = parseInt(SC_R._tP);

        var newcallback = function () {
            touch.clickFlag = false;
            if (callback) callback();
        };

        if (clickY >= __h / 3 && clickY <= 2 * __h / 3 && clickX >= __w / 3 && clickX <= 2 * __w / 3) {
            //点击中间，显示菜单

            toggleMenu();
            touch.clickFlag = false;
        } else {
            hideMenu();
            //翻页方式
            if (_cS.flip_way == "slide") {
                if (clickX < __w / 3) {
                    SC_R._cObj.css({ left: "0px" })
                    judgePrevChap(function () {
                        SC_R._pObj.animate({ left: "0px" }, touch.slideT, function () {
                            enterPrePage();
                            newcallback();
                        });
                        SC_R._cObj.animate({ left: (__w) + "px" }, touch.slideT, function () { });
                    }, newcallback, false);

                } else if (clickX > 2 * __w / 3) {
                    SC_R._nObj.css({ left: (__w + 10) + "px" })
                    judgeNextChap(function () {
                        SC_R._cObj.animate({ left: "-" + (__w + 10) + "px" }, touch.slideT, function () {
                            enterNextPage();
                            newcallback();
                        });
                        SC_R._nObj.animate({ left: "0px" }, touch.slideT, function () { });
                    }, newcallback, false);
                } else {
                    newcallback();
                }
            } else if (_cS.flip_way == "simulation") {
                //if (clickY > __h / 2) touch.upDown = "down";
                //else touch.upDown = "up";
                $("#keepOut1").show();
                touch.angleX = clickX - _bbLeft;
                touch.angleY = clickY;

                if ((clickX - _bbLeft) < __w / 3) {
                    if (touch.endX > 50) touch.angleX = touch.endX - _bbLeft - touch.backX;
                    if (touch.upDown == "down") touch.angleY = __h - touch.backY;
                    else touch.angleY = touch.backY;

                    judgePrevChap(function () {
                        simulationSetInterval("backward", SC_R._pI, SC_R._pP, function () {
                            enterPrePage();
                            newcallback();
                        });
                    }, newcallback, false);

                } else if (clickX > 2 * __w / 3) {
                    judgeNextChap(function () {
                        simulationSetInterval("forward", SC_R._cI, SC_R._cP, function () {
                            $("#" + SC_R._ecg + SC_R._cI + "_" + SC_R._cP).css("background", "-webkit-gradient(linear, 100% 100%, -60% 100%, color-stop(0.6, rgba(0, 0, 0, 0)), color-stop(0.8, rgba(0, 0, 0, 0.298039)), to(rgba(255, 255, 255, 0)))");
                            enterNextPage();
                            newcallback();
                        });
                    }, newcallback, false);

                } else {
                    newcallback();
                }
            } else if (_cS.flip_way == "roll") {
                //for new 
                if (_cS.flip_way == "roll") {
                    newcallback();
                    return;
                }

                if (clickY < __h / 3) {
                    SC_R._cObj.css({ top: "0px" })
                    judgePrevChap(function () {
                        SC_R._pObj.animate({ top: "0px" }, touch.slideT, function () {
                            enterPrePage();
                            newcallback();
                        });
                        SC_R._cObj.animate({ top: (__h) + "px" }, touch.slideT, function () { });
                    }, newcallback, false);

                } else if (clickY > 2 * __h / 3) {
                    SC_R._nObj.css({ top: (__h + 10) + "px" })
                    judgeNextChap(function () {
                        SC_R._cObj.animate({ top: "-" + (__h + 10) + "px" }, touch.slideT, function () {
                            enterNextPage();
                            newcallback();
                        });
                        SC_R._nObj.animate({ top: "0px" }, touch.slideT, function () { });
                    }, newcallback, false);

                } else {
                    newcallback();
                }
            } else {

            }
        }
    }

    //进入上一页
    function enterPrePage() {
        SC_R._cI = SC_R._pI;
        SC_R._cP = SC_R._pP;
        SC_R._tP = SC_R._ptP;
        var chap = {
            chap: SC_R.ebook.info.chapList[SC_R._cI],
            page: SC_R._cP,
            fs: SC_R.ebook.read.fs
        };
        disposeBookBody(chap, null);
    }

    //进入下一页
    function enterNextPage() {

        SC_R._cI = SC_R._nI;
        SC_R._cP = SC_R._nP;
        SC_R._tP = SC_R._ntP;
        var chap = {
            chap: SC_R.ebook.info.chapList[SC_R._cI],
            page: SC_R._cP,
            fs: SC_R.ebook.read.fs
        };
        disposeBookBody(chap, null);
    }

    //判断上一页
    function judgePrevChap(callback1, callback2, bl) {
        if (bl) {
            if (!touch.moveFlag) {
                touch.moveFlag = true;

                asdd(callback1, callback2);
            } else {
                if (callback1) callback1();
            }
        } else {
            asdd(callback1, callback2);
        }

        function asdd(callback1, callback2) {
            if (SC_R._cI > 0 || SC_R._cP > 1) {
                if (SC_R._pObj.length > 0) {
                    if (callback1) callback1();
                } else {
                    //layerMsgFG("noPage");
                    preprocessChap(true, false);
                    if (callback2) callback2();
                    return false;
                }
            } else {
                layerMsgFG("f");
                if (callback2) callback2();
                return false;
            }
        }
    }

    //判断下一页
    function judgeNextChap(callback1, callback2, bl) {
        if (bl) {
            if (!touch.moveFlag) {
                touch.moveFlag = true;
                asdff(callback1, callback2);
            } else {
                if (callback1) callback1();
            }
        } else {
            asdff(callback1, callback2);
        }

        function asdff(callback1, callback2) {
            if (SC_R._cI < SC_R.ebook.info.totalChap - 1 || SC_R._cP < SC_R._tP) {
                if (!isGoLook("END", SC_R._nI, SC_R._nP)) {
                    if (callback2) callback2();
                    return false;
                }
                if (SC_R._nObj.length > 0) {
                    if (callback1) callback1();
                } else {
                    //layerMsgFG("noPage");
                    preprocessChap(false, true);
                    if (callback2) callback2();
                    return false;
                }
            } else {
                layerMsgFG("l");
                if (callback2) callback2();
                return false;
            }
        }
    }

    //计算动画在touchEnd中的剩余时间
    function setSlideT() {
        if (_cS.flip_way == "slide") {
            return ((__w - Math.abs(touch.X)) / __w) * touch.slideT;
        } else if (_cS.flip_way == "simulation") { } else {
            return ((__h - Math.abs(touch.Y)) / __h) * touch.slideT;
        }
        return touch.slideT;
    }

    //预处理上一章节和下一章节的页面
    function preprocessChap(loadPrev, loadNext) {
        emptyChap();
        if (!SC_R.readChapFlag) return false;

        //提前1页开始处理上一章节的数据  如果上一章节的数据还没有
        if (SC_R._cI > 0 && SC_R._cP <= 1 && loadPrev) {
            processChap(SC_R._cI - 1, null);
        }

        //提前1页开始处理下一章节的数据
        if (SC_R._cI < SC_R.ebook.info.totalChap - 1 && SC_R._cP >= SC_R._tP - 1 && loadNext) {
            processChap(SC_R._cI + 1, null);
        }

        function processChap(c, callback) {
            var chap = { 'chap': SC_R.ebook.info.chapList[c], 'page': 1, 'fs': _cS.fs };
            var paging = SC_R.ebook.info.content[chap.chap].paging;
            var loadFlag = SC_R.ebook.info.content[chap.chap].loadFlag;
            var free = SC_R.ebook.info.content[chap.chap].free;
            if (free || SC_R.ebook.info.isbuy) {
                if (loadFlag == 3) {
                    //已经加载，
                    if (paging != 3) {
                        //还没分页
                        SC_R.readChapFlag = false;
                        pagingEpubChap(chap.chap, function () {
                            preparePCNPage();
                            SC_R.readChapFlag = true;

                            SC_R.layerRead = false;
                            fadeOutLoad("fast");
                            if (callback) callback();
                        });

                    } else {
                        //已经分页
                        //fillEpubChap(chap.chap);
                    }

                } else if (loadFlag == 1) {
                    //还没加载的需要临时加载
                    SC_R.readChapFlag = false;
                    SC_R.ebook.info.content[chap.chap].loadFlag = 2;
                    chap.disposeChap = false;
                    iLoadChap(chap, function () {
                        preparePCNPage();
                        SC_R.readChapFlag = true;
                        SC_R.layerRead = false;
                        fadeOutLoad("fast");
                        if (callback) callback();
                    });


                } else if (loadFlag == 4) {
                    //加载失败

                } else {

                }

            }
        }
    }

    //创建Epub类电子书某一个chap中的某一个页面
    function createEpubECD(c, p) {
        if (SC_R.ebook.info.isPdf == false) {
            var $ecd = "";
            var $chapDiv = $("#chapDiv" + c);
            if ($chapDiv.length <= 0) {
                $chapDiv = createChapDiv(c);
            }
            getContentObj(SC_R.ebook.info.chapList[c]);
            var pageList = SC_R.ebook.info.content[SC_R.ebook.info.chapList[c]].chapData.pageList;
            if (!jQuery.isEmptyObject(pageList)) {
                if (pageList[p]) {
                    $ecd = $(pageList[p]);
                    $chapDiv.append($ecd);
                    //标记相关笔记
                    SC_N.markNote($ecd);
                    //标记相关考点
                    SC_KL = SC_KnowLedge();
                    SC_KL.MarkKnowledge($ecd);
                    //处理音乐播放器，绑定事件
                    //SC_DealAudio($ecd); 
                }
            } else {
                console.log("==========================================");
            }
            return $ecd;
        }
        return "";
    }

    //清空多余的chap内容  针对Epub类电子书
    function emptyChap() {
        if (SC_R.ebook.info.isPdf == false) {
            $(".chapDiv").each(function () {
                var idNo = $(this).attr("id").substring(7);
                if (idNo != SC_R._pI && idNo != SC_R._cI && idNo != SC_R._nI) {
                    $(this).remove();
                } else {
                    removeChapPage($(this));
                }
            });
        }
    }

    //删除当前chap中多余的页面
    function removeChapPage(thisChap) {
        var c = thisChap.attr("id").substring(7);
        thisChap.children().each(function () {
            var thisId = $(this).attr("id");
            if (thisId) {
                var idNo = thisId.substring(thisId.lastIndexOf("_") + 1);
                if (!((c == SC_R._pI && idNo == SC_R._pP) || (c == SC_R._cI && idNo == SC_R._cP) || (c == SC_R._nI && idNo == SC_R._nP))) {
                    $(this).remove();
                }
            }
        });
    }

    //根据当前页，计算前一页内容的DIV序号和页码，下一页内容的DIV序号和页码
    function setPrevCurrNextPage() {
        if (SC_R._cI > 0) {
            // 上一章总页数
            SC_R._ptP = SC_R.ebook.info.content[SC_R.ebook.info.chapList[SC_R._cI - 1]].totalPage;
        }
        if (SC_R._cI < SC_R.ebook.info.totalChap - 1) {
            // 下一章总页数
            SC_R._ntP = SC_R.ebook.info.content[SC_R.ebook.info.chapList[SC_R._cI + 1]].totalPage;
        }
        SC_R._pP = SC_R._cP - 1;
        SC_R._pI = SC_R._cI;
        SC_R._nP = SC_R._cP + 1;
        SC_R._nI = SC_R._cI;
        if (SC_R._cP <= 1) {
            if (SC_R._cI > 0) {
                SC_R._pP = SC_R._ptP;
                SC_R._pI = SC_R._cI - 1;;
            }
        }
        if (SC_R._cP >= SC_R._tP) {
            if (SC_R._cI < SC_R.ebook.info.totalChap - 1) {
                SC_R._nP = 1;
                SC_R._nI = SC_R._cI + 1;
            }
        }
    }

    function disposeContent() {
        setPrevCurrNextPage();
        if (SC_R._pI != SC_R._cI) {
            getContentObj(SC_R.ebook.info.chapList[SC_R._pI], true);
        }
        if (SC_R._nI != SC_R._cI) {
            getContentObj(SC_R.ebook.info.chapList[SC_R._nI], true);
        }

        for (var key in SC_R.ebook.info.content) {
            if (key != SC_R.ebook.info.chapList[SC_R._pI] 
                && key != SC_R.ebook.info.chapList[SC_R._cI] 
                && key != SC_R.ebook.info.chapList[SC_R._nI]) {
                SC_R.ebook.info.content[key].chapData = {};
                //delete SC_R.ebook.info.content[key];
            }
        }
    }

    //根据翻页方式的不同来设置每一页的样式,同时处理其他的一些事情
    function disposeBookBody(chap, callback) {

        //根据各种情况获取ebook.read
        //是否购买了该本书
        if (!SC_R.ebook.info.isbuy) {
            //console.log("disposeBookBody:this ebook is haven't buy");
            //电子书没有全部加载，则只能看简介
            if (!SC_R.ebook.info.loadAll && !SC_R.ebook.info.freeFlag) {
                if (chap.chap != SC_R.ebook.info.content[SC_R.ebook.info.chapList[0]]) {
                    layer.msg("等待电子书加载完成");
                }
            } else {
                //判断是否是当前的章节
                if (SC_R.ebook.read.chap != chap.chap) {
                    //先判断该chap是否已经分页处理,没有的话 ，先分页处理
                    isPagingChap(chap);
                    //提前找到需要跳转的chap页面
                    var gotoIndex = SC_R.ebook.info.content[chap.chap].chapDiv || 0;
                    //A.在免费页内
                    //B.超过了免费页
                    if ($("#" + SC_R._ecd + gotoIndex + "_1").attr("data-free") == "N") {
                        console.log("gotoChap is not free");
                        buyDiv();
                        return false;
                    }
                }
                SC_R.ebook.read = chap;
            }
        } else {
            //console.log("disposeBookBody:this ebook is have buy");
            //如果不是当前章节
            if (SC_R.ebook.read.chap != chap.chap) {
                //先判断该chap是否已经分页处理,没有的话 ，先分页处理
                isPagingChap(chap);
            }
            SC_R.ebook.read = chap;
        }

        //获取对应的章节chap页面 -----_cI
        if (SC_R.ebook.info.content) {
            SC_R._cI = SC_R.ebook.info.content[SC_R.ebook.read.chap].chapDiv;
            SC_R._tP = SC_R.ebook.info.content[SC_R.ebook.read.chap].totalPage;
        } else {
            SC_R._tP = SC_R.ebook.info.page;
        }

        //touch.clickFlag = false;
        //如果需要跳转的页面的字体和当前页面的字体不一样，则需要通过markText来查找需要跳转的page
        if (_cS.fs != chap.fs && chap.markText) {
            SC_R.ebook.read.fs = _cS.fs;
            SC_R.ebook.read.page = gotoMarkPage(chap.chap, chap.markText, SC_R.ebook.read.page)
        }
        SC_R._cP = parseInt(SC_R.ebook.read.page);
        SC_R._tP = parseInt(SC_R._tP);
        //保证_cP始终小于_tP
        if (SC_R._cP > SC_R._tP) SC_R._cP = SC_R._tP;

        //pageNum();
        SC_R.readChapFlag = true;
        preparePCNPage();

        chap.loadPrev = chap.loadPrev === false ? false : true;
        chap.loadNext = chap.loadNext === false ? false : true;
        preprocessChap(chap.loadPrev, chap.loadNext);

        //每次翻页停止当前正在播放的视频
        $("video").each(function (index, el) {
            //console.info(el);
            el.pause();
            //console.info("video",el.paused);
        });

        // SC_DealAudio($(".BookBody"));
        if (callback) callback();

        //for new 
        if (_cS.flip_way == "roll") {
            if (!roll_loading_new) $('#rollDiv').remove();
            if ($('#rollDiv').length == 0) {
                createRolldiv(SC_R.ebook.read.chap);
            }
            $('.chapDiv').remove();
        }
        else {
            $('#rollDiv').remove();
        }
    }

    function createRolldiv(chap) {
        var $div_roll = $('<div style="">').html('').addClass(SC_R._ecp).attr({ 
            'a': 1111, 
            "id": "rollDiv", 
            "style": "width:" + _pag.pageWidth + "px;height:" + __h + "px;padding-left:" + _pag.pageMarginLeft + "px;padding-right:" + _pag.pageMarginLeft + "px;" 
        });

        var $div_roll_chap = $('<div></div>').addClass("ChapItem").attr({ id: chap });
        $div_roll_chap[0].scrollTop = 5;
        scroll_start = 5;

        var div_container = $('<div></div>').attr({ id: 'scroll_div_container' });

        //设一个最小高度主要是为了触发当内容过短时，可以通过滑动触发翻页 txy20170401
        div_container.css('min-height', (_pag.textHeight + 32) + 'px')

        $div_roll_chap.append(SC_R.ebook.info.content[chap].chapData.chapInfo);
        div_container.append($div_roll_chap)
        $div_roll.append(div_container);

        $('#BookBody').append($div_roll)
        $div_roll.css('overflow-y', 'auto');
        $div_roll.css('overflow-x', 'hidden');
        $div_roll.css('-webkit-overflow-scrolling', 'touch');
        $('#rollDiv')[0].scrollTop = 5;
        $('#rollDiv')[0].addEventListener('scroll', rollListner)
    }

    //翻页前准备好 前一页 当前页 下一页 
    function preparePCNPage(callback) {
        clearInterval(touch.simulationSetIntervalFun);
        //PDF类电子书处理页面 ,提前加载图片
        disposePdfPage(2);

        $("div[name='" + SC_R._ecd + "']").css("z-index", "890");

        disposeContent();

        $("#keepOut1").remove();
        var _flip = { 'dw': __w, 'dh': __h, 'zIndex': 890, 'dl': 0, 'dl_p': 0, 'dt': 0, 'display': 'block', 'transform_s': '', 'transform_ss': '', 'transformOrigin': '0% 100% 0px', 'sw': 0, 'sh': 0 };
        if (_cS.flip_way == "slide") {
            _flip.zIndex++;
            _flip.dl = 0;
            resetECD(SC_R._nI, SC_R._nP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);

            _flip.zIndex++;
            resetECD(SC_R._cI, SC_R._cP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);

            _flip.zIndex++;
            _flip.dl = -1 * __w - 10;
            resetECD(SC_R._pI, SC_R._pP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);
        } else if (_cS.flip_way == "simulation") {
            if (touch.upDown == "down") _flip.transformOrigin = "0% 100% 0px";
            else _flip.transformOrigin = "0% 0% 0px";
            _flip.zIndex++;
            _flip.display = "block";
            resetECD(SC_R._nI, SC_R._nP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display, _flip.transformOrigin);

            _flip.zIndex++;
            resetECD(SC_R._cI, SC_R._cP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display, _flip.transformOrigin);

            _flip.zIndex++;
            _flip.display = "none";
            resetECD(SC_R._pI, SC_R._pP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display, _flip.transformOrigin);

            creatKeepOut(_flip.transformOrigin);
        } else if (_cS.flip_way == "roll") {

            _flip.zIndex++;
            _flip.dt = 0;
            resetECD(SC_R._nI, SC_R._nP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);

            _flip.zIndex++;
            resetECD(SC_R._cI, SC_R._cP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);

            _flip.zIndex++;
            _flip.dt = -1 * __h - 10;
            resetECD(SC_R._pI, SC_R._pP, _flip.dw, _flip.dh, _flip.zIndex, _flip.dt, _flip.dl, _flip.display);
        } else {
            console.log('---------- series ----------');
        }

        //当前页和下一页的对象
        SC_R._cObj = $("#" + SC_R._ecd + SC_R._cI + "_" + SC_R._cP);
        SC_R._pObj = $("#" + SC_R._ecd + SC_R._pI + "_" + SC_R._pP);
        SC_R._nObj = $("#" + SC_R._ecd + SC_R._nI + "_" + SC_R._nP);

        if (SC_R._nI != SC_R._cI) {
            $("#chapDiv" + SC_R._nI).show();
            $("#chapDiv" + SC_R._cI).show();
        }
        if (SC_R._pI != SC_R._cI) {
            $("#chapDiv" + SC_R._pI).show();
            $("#chapDiv" + SC_R._cI).show();
        }

        if (callback) callback();

        function resetECD(c, p, w, h, z, t, l, d, o) {
            //如果这个页面不存在的话，需要临时创建
            var $ecd = $("#" + SC_R._ecd + c + "_" + p);
            if ($ecd.length <= 0) {
                $ecd = createEpubECD(c, p);

            }

            if ($ecd) $ecd.attr({ "style": "width:" + w + "px;height:" + h + "px;z-index:" + z + ";top:" + t + "px;left:" + l + "px;display:" + d + ";" });
            if (_cS.flip_way == "simulation") {
                $("#" + SC_R._ecs + c + "_" + p).attr({ "style": "position: absolute; top: 0px; left: 0px; overflow: hidden; z-index: auto; width: " + hypotenuse() + "px; height: " + hypotenuse() + "px; transform-origin: " + o + ";-webkit-transform-origin: " + o + ";transform: translate3d(0px, 0px, 0px) rotate(0deg);-webkit-transform: translate3d(0px, 0px, 0px) rotate(0deg); display: block;background:transparent;" });
                $("#" + SC_R._ecss + c + "_" + p).attr({ "style": "position: absolute; top: 0px; left: 0px; bottom: auto; right: auto;overflow: hidden; z-index: auto; width: " + w + "px; height: " + h + "px; transform-origin: " + o + ";-webkit-transform-origin: " + o + ";transform: translate3d(0px, 0px, 0px) rotate(0deg);-webkit-transform: translate3d(0px, 0px, 0px) rotate(0deg); display: block;background:transparent;" });
                $("#" + SC_R._ecg + c + "_" + p).attr({ "style": "top: 0px; left: 0px; overflow: hidden; z-index: 1;display:block; width: " + w + "px; height: " + h + "px; background: -webkit-gradient(linear, 100% 100%, 100% 100%, color-stop(0.6, rgba(0, 0, 0, 0)), color-stop(0.8, rgba(0, 0, 0, 0.298039)), to(rgba(255, 255, 255, 0)));" });
            }
        }

        setPageStyle();
    }

    //页面数据加载中
    function processingData() {
        if (SC_R.layerRead) return false;
        touch.touchFlag = false;
        touch.startFlag = false;
        SC_R.layerRead = true;
        fadeInLoad("fast");
    }

    //仿真翻页的一些函数
    function hypotenuse() {
        return (Math.sqrt(__w * __w + __h * __h)).toFixed();
    }

    function setTransform() {
        var _K = 0.017453293;
        var _P = 3.141516;
        var D1 = { x: 0, y: hypotenuse() };
        var D2 = { x: 0, y: __h };

        if (touch.angleX > __w) touch.angleX = __w;
        if (touch.angleY > __h) touch.angleY = __h;
        if (touch.angleY < 0) touch.angleY = 0;
        var t_w = __w - touch.angleX;
        var t_h = __h - touch.angleY;
        if (touch.upDown == "up") t_h = touch.angleY;

        var hyp = Math.sqrt((t_w) * (t_w) + (t_h) * (t_h));
        var b = 0;
        var angle = 90;
        if (__w - touch.angleX != 0) {
            b = (hyp / 2) / ((t_w) / hyp);
            angle = Math.atan((t_h) / (t_w)) / (_P / 180);
        }
        angle = 90 - angle;

        var D3 = { x: __w - b, y: __h };
        if (b > __w) D3.x = 0;
        if (b < 0) D3.x = __w;
        var D33 = { x: 0, y: 0 };

        var q = Math.sin(Math.abs(angle * _K)) * D3.x;
        var x0 = Math.sin((90 - Math.abs(angle)) * _K) * q;
        var y0 = Math.cos((90 - Math.abs(angle)) * _K) * q;
        var D4 = { x: y0, y: (x0 + __h) };

        if (touch.upDown == "up") {
            D1.y = 0;
            D2.y = 0;
            D3.y = 0;
            D4.y = (-1) * x0;
        }

        var s0 = D4.x - D1.x;
        var s1 = D4.y - D1.y;
        var s2 = (-1) * s0;
        var s3 = s1 + (hypotenuse() - __h);
        if (touch.upDown == "up") s3 = s1;
        var s4 = touch.angleX - D4.x;
        var s5 = touch.angleY - D4.y;
        var s6 = 180 - 2 * angle;
        if (touch.upDown == "up") s6 = 180 + 2 * angle;


        if (touch.upDown == "up") {
            if (Math.sqrt(touch.angleX * touch.angleX + touch.angleY * touch.angleY) > __w) {
                var newx = Math.cos(Math.abs(angle) * 2 * _K) * __w;
                var newy = Math.sin(Math.abs(angle) * 2 * _K) * __w;
                s4 = newx - D4.x;
                s5 = newy - D4.y;
                hyp = Math.sqrt((__w - newx) * (__w - newx) + newy * newy);
            }
        } else {
            if (Math.sqrt(touch.angleX * touch.angleX + (__h - touch.angleY) * (__h - touch.angleY)) > __w) {
                var newx = Math.cos(Math.abs(angle) * 2 * _K) * __w;
                var newy = __h - Math.sin(Math.abs(angle) * 2 * _K) * __w;
                s4 = newx - D4.x;
                s5 = newy - D4.y;
                hyp = Math.sqrt((__w - newx) * (__w - newx) + (__h - newy) * (__h - newy));
            }
        }

        //渐变参数 D5是被翻页面的渐变   D6是需要显示页面的渐变
        var range1 = hyp / 15,
        range2 = hyp / 8;
        var x1 = Math.sin((Math.abs(angle)) * _K) * ((hyp / 2) + range1);
        var y1 = Math.cos((Math.abs(angle)) * _K) * ((hyp / 2) + range1);

        var D5 = { x: 0, y: 0 };
        D5.x = (x1 / __w) * 100;
        D5.y = ((__h - y1) / __h) * 100;
        var s7 = "0%";
        var s8 = "100%";
        if (touch.upDown == "up") {
            D5.y = (y1 / __h) * 100;
            s8 = "0%";
        }
        var s9 = (D5.x).toFixed(4) + "%";
        var s10 = (D5.y).toFixed(4) + "%";

        var x2 = Math.sin((Math.abs(angle)) * _K) * ((hyp / 2) + range2);
        var y2 = Math.cos((Math.abs(angle)) * _K) * ((hyp / 2) + range2);
        var D6 = { x: 0, y: 0 };
        D6.x = ((__w - x2) / __w) * 100;
        D6.y = ((__h - y2) / __h) * 100;
        var s11 = "100%";
        var s12 = "100%";
        if (touch.upDown == "up") {
            D6.y = (y2 / __h) * 100;
            s12 = "0%";
        }
        var s13 = (D6.x).toFixed(4) + "%";
        var s14 = (D6.y).toFixed(4) + "%";

        var top = "auto";
        var left = "0";
        var bottom = "0";
        var right = "auto";

        if (touch.upDown == "up") {
            angle = (-1) * angle;
            //s5 = (-1) * s5;
            top = "0";
            left = "0";
            bottom = "auto";
            right = "auto";
        }

        touch.transform = { "angle": angle.toFixed(4), 'top': top, 'left': left, 'bottom': bottom, 'right': right, "s0": s0.toFixed(4), "s1": s1.toFixed(4), "s2": s2.toFixed(4), "s3": s3.toFixed(4), "s4": s4.toFixed(4), "s5": s5.toFixed(4), "s6": s6.toFixed(4), "s7": s7, "s8": s8, "s9": s9, "s10": s10, "s11": s11, "s12": s12, "s13": s13, "s14": s14 };
    }

    function simulationFlip(ci, cp) {
        var tf = touch.transform;
        // console.log(_pag);
        // console.log($('#e_p'+ci+'_'+cp).html());
        var html = '1111111111111111111111111111111111111111111111111111111111111111';
        $("#" + SC_R._ecd + ci + "_" + cp).show();
        // $("#" + SC_R._ecg + ci + "_" + cp).html(html);
        $("#" + SC_R._ecs + ci + "_" + cp).css("transform", "translate3d(" + tf.s0 + "px, " + tf.s1 + "px ,0px) rotate(" + (-1) * tf.angle + "deg)").css("-webkit-transform", "translate3d(" + tf.s0 + "px, " + tf.s1 + "px ,0px) rotate(" + (-1) * tf.angle + "deg)");
        $("#" + SC_R._ecss + ci + "_" + cp).css("transform", "rotate(" + tf.angle + "deg) translate3d(" + tf.s2 + "px, " + (-1) * tf.s3 + "px ,0px)").css("-webkit-transform", "rotate(" + tf.angle + "deg) translate3d(" + tf.s2 + "px, " + (-1) * tf.s3 + "px ,0px)").css("top", tf.top).css("left", tf.left).css("bottom", tf.bottom).css("right", tf.right);
        $("#" + SC_R._ecg + ci + "_" + cp).css("background-image", "-webkit-gradient(linear, " + tf.s11 + " " + tf.s12 + ", " + tf.s13 + " " + tf.s14 + ", color-stop(0.6, rgba(0, 0, 0, 0)), color-stop(0.8, rgba(0, 0, 0, 0.298039)), to(rgba(255, 255, 255, 0)))");

        //$("#keepOut1").hide();
        
        $("#keepOut2").css("transform", "translate3d(" + tf.s0 + "px, " + tf.s1 + "px ,0px) rotate(" + (-1) * tf.angle + "deg)").css("-webkit-transform", "translate3d(" + tf.s0 + "px, " + tf.s1 + "px ,0px) rotate(" + (-1) * tf.angle + "deg)");
        $("#keepOut3").css("transform", "rotate(" + tf.angle + "deg) translate3d(" + tf.s4 + "px, " + tf.s5 + "px ,0px) rotate(" + tf.s6 + "deg)").css("-webkit-transform", "rotate(" + tf.angle + "deg) translate3d(" + tf.s4 + "px, " + tf.s5 + "px ,0px) rotate(" + tf.s6 + "deg)").css("top", tf.top).css("left", tf.left).css("bottom", tf.bottom).css("right", tf.right);
        $("#keepOut4").css("background-image", "-webkit-gradient(linear, " + tf.s7 + " " + tf.s8 + ", " + tf.s9 + " " + tf.s10 + ", color-stop(0.6,rgba(0, 0, 0, 0)), color-stop(0.8, rgba(0, 0, 0, 0.2)), to(rgba(255, 255, 255, 0.2)))");
        $("#keepOut4").html($('#e_p'+ci+'_'+cp).html()).css({
            'width':_pag.pageWidth,
            'height':_pag.pageHeight,
            'margin-left':_pag.pageMarginLeft,
            'margin-right':_pag.pageMarginLeft,
            'margin-top':'10px',
            'margin-bottom':'10px',
            'transform':'rotateY(180deg)',
            'opacity':0.2
        });
        // $("#keepOut5").html(html)
        // $("#keepOut5").css({'z-index':892})
        if($('#e_div'+ci+'_'+(cp+1))) {
            $('#e_div'+ci+'_'+(cp+1)).css({'z-index':891})
        } else if($('#e_div'+(ci+1)+'_'+cp)) {
            $('#e_div'+(ci+1)+'_'+cp).css({'z-index':891});
        }
        
    }

    function simulationSetInterval(flag, ci, cp, callback) {
        var T = touch.slideT;
        //if (flag == "forward" && isIos()) T = touch.IOSt;
        var degree = T / touch.refreshT;
        var targetX = 0,
        targetY = 0;
        if (flag == "forward" || flag == "backward_back") {
            targetX = (-1) * __w;
            targetY = __h;
            if (touch.upDown == "up") targetY = 0;
        } else if (flag == "backward") {
            targetX = __w;
            targetY = __h;
            if (touch.upDown == "up") targetY = 0;
        } else if (flag == "forward_back") {
            targetX = __w - touch.defaultSize;
            targetY = __h - touch.defaultSize;
            if (touch.upDown == "up") targetY = touch.defaultSize;
        }

        touch.addX = (targetX - touch.angleX) / degree;
        touch.addY = (targetY - touch.angleY) / degree;


        touch.counter = 0;
        clearInterval(touch.simulationSetIntervalFun);
        touch.simulationSetIntervalFun = setInterval(function () {
            touch.angleX = touch.angleX + touch.addX;
            touch.angleY = touch.angleY + touch.addY;
            setTransform();
            if (touch.counter < degree) {
                simulationFlip(ci, cp);
                touch.counter++;
            } else {
                clearInterval(touch.simulationSetIntervalFun);
                if (callback) callback();
                if (flag != "forward_back") {
                    preparePCNPage();
                    $("#keepOut1").hide();
                }
            }
        }, touch.refreshT);
    }

    function creatKeepOut(o) {
        var $div_1 = $('<div>').attr({ "id": "keepOut1", "name": "keepOut", "style": "pointer-events: none; position: absolute; top: 0px; left: 0px; width:" + __w + "px;height:" + __h + "px; overflow: visible; z-index: 1999; display: none;" });
        var $div_2 = $('<div>').attr({ "id": "keepOut2", "name": "keepOut", "style": "position: absolute; top: 0px; left: 0px; overflow: hidden; z-index: auto; width: " + hypotenuse() + "px; height: " + hypotenuse() + "px; transform-origin: " + o + ";-webkit-transform-origin: " + o + "; transform: translate3d(0px, 0px, 0px) rotate(-90deg);-webkit-transform: translate3d(0px, 0px, 0px) rotate(-90deg); display: block;background:transparent;" });
        var $div_3 = $('<div>').attr({ "id": "keepOut3", "name": "keepOut", "style": "position: absolute; top: auto; left: 0px; right: auto; bottom: 0px; overflow: hidden; z-index: auto; cursor: default; width: " + __w + "px; height: " + __h + "px; transform-origin: " + o + ";-webkit-transform-origin: " + o + "; transform: rotate(90deg) translate3d(0px, 0px, 0px) rotate(0deg);-webkit-transform: rotate(90deg) translate3d(0px, 0px, 0px) rotate(0deg);" });
        var $div_4 = $('<div>').attr({ "id": "keepOut4", "name": "keepOut", "style": "position: absolute; top: 0px; left: 0px; overflow: hidden; z-index: 1; width: " + __w + "px; height: " + __h + "px; background: -webkit-gradient(linear, 0% 100%, 0% 100%, from(rgba(0, 0, 0, 0)), color-stop(0.8, rgba(0, 0, 0, 0.2)), to(rgba(255, 255, 255, 0.2)));" });
        var $div_5 = $('<div>').attr({ "id": "keepOut5", "name": "keepOut", "style": "float: left; width: " + __w + "px; height: " + __h + "px; position: absolute; top: 0px; left: 0px; bottom: auto; right: auto; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 20px;-webkit-box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 20px;background:" + _cS.simulation_bg + ";transform-origin: " + o + ";-webkit-transform-origin: " + o + ";" });
        $div_3.append($div_4);
        $div_3.append($div_5);
        $div_2.append($div_3);
        $div_1.append($div_2);
        $("#BookBody").append($div_1);
        $div_1 = $div_2 = $div_3 = $div_4 = $div_5 = null;
    }
    //*****************************************************阅读器翻页设置   end ******************************************************//

    //*****************************************************阅读器搜索   start ******************************************************//
    //弹出搜索界面
    function showSearchDiv(text, callback) {
        creatSearchDiv();
        if (text) $("#SearchTxt").attr({ "value": text });
        $("#SearchTxt").css("width", (__w - 100) + "px").css("margin-right", "5px");

        if ($("#SearchContent").children().length > 0) {
            $("#searchDiv").show().animate({ left: "0" }, 500);
        } else {
            $("#searchDiv").show().animate({ top: "0px" }, 500);
        }
        if (callback) callback();
    }

    //创建搜索界面
    function creatSearchDiv() {
        if ($("#searchDiv").length > 0) return false;
        var $dsearchDiv = createTag("div", "searchDiv");
        var $top = $("<div>").addClass("searchTop Rhead");
        var $top_left = createTag("a", "BtnBack", "BtnBack_search");
        var $top_input = $("<input>").attr({ "type": "search", "id": "SearchTxt", "placeholder": SC_R.ebook.searchStr || "请输入关键字" });
        var $top_right = $("<a>").addClass("Btn_t_r").append(createTag("div", "BtnSearch", "searchBtn"));
        $top.append($top_left).append($top_input).append($top_right);
        $top_left = $top_input = $top_right = null;
        var $SearchContent = createTag("div", "SearchContent");
        $dsearchDiv.append($top).append($SearchContent);
        $top = $SearchContent = null;
        $("#BookAction").append($dsearchDiv);
        $dsearchDiv = null;
    }

    //隐藏搜索界面
    function hideSearchDiv() {
        //$("#searchDiv").toggle();
        var $SearchContent = $("#SearchContent");
        var $searchDiv = $("#searchDiv");
        if ($SearchContent.children().length > 0) {
            $searchDiv.animate({ left: "110%" }, 500, function () {
                if ($("#SearchTxt").val() == "") {
                    clearSearchList();
                    $searchDiv.css({ "left": "0", "top": "-44px" });
                    $SearchContent.css({ "height": "" });
                }
            });
        } else {
            $searchDiv.animate({ top: "-44px" }, 500);
        }
    }

    //点击搜索
    function searchText() {
        var stxt = $("#SearchTxt").val();
        //SC_R.ebook.searchStr = stxt;
        if (!stxt) {
            layer.msg('请输入需要查询的关键字');
            return false;
        }

        $("#SearchContent").height((__h - 12));

        if (stxt != SC_R.searchTXT) {
            //清空myNewSearchArray
            SC_R.myNewSearchArray.splice(0, SC_R.myNewSearchArray.length);
            //myNewSearchArray.length = 0;
            layer.msg('搜索中', { icon: 16 });
            SC_R.searchTXT = stxt;

            //搜索已经有数据并且处理了的章节
            if (SC_R.ebook.info.totalChap > 0) {
                for (var key in SC_R.ebook.info.content) {
                    if (SC_R.ebook.info.content[key].paging == 3) {
                        //对该章节的每一页进行搜索
                        if (SC_R.ebook.info.content[key].totalPage > 0) {
                            getContentObj(key, false);
                            for (var p = 1; p <= SC_R.ebook.info.content[key].totalPage; p++) {
                                settingHighLight(key, p, stxt, function () { });
                            }
                            saveContentLocal(key, SC_R.ebook.info.content[key]);
                        }
                    }
                }

                addSearchList(SC_R.myNewSearchArray, stxt);
            } else {
                layer.closeAll();
                layer.msg('没有所搜到相关内容');
            }
            //searchOneChap(stxt);
        } else {
            SC_R.myNewSearchArray;
            if (SC_R.myNewSearchArray.length >= 0) {
                addSearchList(SC_R.myNewSearchArray, SC_R.searchTXT);
            }
        }
    }

    //清空搜索内容
    function clearSearchList() {
        $("#SearchContent").empty();
    }

    //加载搜索出来的所有的明细
    function addSearchList(arrayList, str) {
        clearSearchList();
        var $SearchContent = $("#SearchContent");
        var $searchLi = $("<div>").addClass("SearchInfo Rlist").attr("id", "searchLi");
        $SearchContent.append($searchLi);
        var $li, $a;
        if (arrayList) {
            for (var p = 0, p1 = arrayList.length; p < p1; p++) {
                $li = $('<li>');
                $a = $('<a>').attr("name", "search");
                $a.html(arrayList[p].content);
                $a.data("obj", { chap: arrayList[p].chap, page: arrayList[p].page });
                $li.append($a);
                $searchLi.append($li);
                $a = $li = null;
            }
            //如果
            if (SC_R.ebook.info.loadAll != "1") {
                var $div = $('<div>').addClass("LoadingMore").attr({ "id": "LoadMoreSearch" }).html("加载更多");
                $searchLi.after($div);
            }

            layer.closeAll();
        } else {
            layer.closeAll();
            layer.msg('没有所搜到相关内容');
        }

        //删除现有的所有页面,重新生成
        $(".chapDiv").remove();
        disposeBookBody(SC_R.ebook.read, null);
    }

    //页面跳转
    function gotoSearchLi(e) {
        var layerEbook = layer.msg('数据处理中');
        var obj = $(e.target).data("obj");
        var chap = {
            "chap": obj.chap || SC_R._cI,
            "fs": _cS.fs,
            "page": obj.page || SC_R._cP,
            "loadPrev": false
        };

        loadChapInfo(chap, function () {
            layer.closeAll();
            $("#searchDiv").animate({ left: "110%" }, 500);
        });
    }

    //加载更多
    function LoadMoreSearch() {
        layer.msg('已经全部加载完成');
    }

    //设置关键字的高亮度
    function settingHighLight(c, p, s, callback) {
        if (s.length == 0) {
            layer.msg('请输入需要查询的关键字');
            return false;
        }
        s = encode(s);
        var selector = SC_R.ebook.info.content[c].chapData.pageList[p];

        var t = selector.replace(/\<span[\s]+class=[\"|\']{1}highlight[\"|\']{1}\>([^\<\>]*)\<\/span\>/g, "$1");
        t = t.replace(new RegExp(s, "gm"), "<span class='highlight'>" + s + "</span>");
        if (selector != t) {
            var hlList = $(t).find(".highlight");
            if (hlList.length > 0) {
                var content = hlList.eq(0).parents("p").text();
                if (content.length > 30) {
                    var preLen = content.indexOf(s);
                    if (preLen > 15) {
                        content = "..." + content.substring(preLen - 15);
                    }
                    var nexLen = content.length - content.indexOf(s) - s.length;
                    if (nexLen > 15) {
                        content = content.substring(0, content.indexOf(s) + s.length + 15) + "...";
                    }
                }
                content = content.replace(new RegExp(s, "gm"), "<span class='highlight'>" + s + "</span>");

                var mySearchList = {};
                mySearchList.chap = SC_R.ebook.info.content[c].chap;
                mySearchList.name = SC_R.ebook.info.content[c].name;
                mySearchList.content = content;
                mySearchList.page = p;
                SC_R.myNewSearchArray.push(mySearchList);
            }
            SC_R.ebook.info.content[c].chapData.pageList[p] = t;
        }
    }

    function encode(s) {
        return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/([\\\.\*\[\]\(\)\$\^])/g, "\\$1");
    }

    function decode(s) {
        return s.replace(/\\([\\\.\*\[\]\(\)\$\^])/g, "$1").replace(/>/g, ">").replace(/</g, "<").replace(/&/g, "&");
    }
    //*****************************************************阅读器搜索   end ******************************************************//

    //*****************************************************阅读器其他辅助方法   start ******************************************************//
    //获取用户ID
    function getUserID() {
        var CurrentUserID = "",
    	CurrentOrgID = "";
        var CurrentDataSource = getCookie("CurrentDataSource");
        CurrentDataSource = unescape(CurrentDataSource);
        if (CurrentDataSource) {
            var arrP = CurrentDataSource.split("&");
            for (var i = 0, i1 = arrP.length; i < i1; i++) {
                var arr = arrP[i].split("=");
                if (arr[0] == "userID") CurrentUserID = arr[1];
                if (arr[0] == "orgID") CurrentOrgID = arr[1];
            }
        }
        if (CurrentOrgID != SC_R.orgID) {
            //SC_R.orgID = "";
            CurrentUserID = "";
        }
        //顶部下载APP的广告
        // if (!SC_R.orgID || SC_R.orgID.toUpperCase() == "SC") {
        //    createDownloadAppTips();
        //}

        //if (!CurrentUserID) {
        //    CurrentUserID = localStorage.getItem("CurrentUserID");
        //}
        //SC_R.userID = CurrentUserID || "";

        if (!CurrentUserID) {
            CurrentUserID = localStorage.getItem("CurrentUserID");
            if (CurrentUserID) {
                console.log("CurrentUserID:" + CurrentUserID);
                SC_R.userID = CurrentUserID;
                console.log("SC_R.userID0:" + SC_R.userID);
            }
        }
    }

    //webConfig.host = "http://192.168.1.9:9420";
    webConfig.host = "http://192.168.1.50:9420";
    //webConfig.host = "http://wx.100xuexi.com";

    function userLoginNoNeedPassword(mobile) {
        $.ajax({
            url: webConfig.host + "/handle/UserInfoHandler.ashx?method=LoginTwo",
            type: "post",
            datatype: "json",
            data: {
                username: mobile,
                myposition: {
                    longitude: "114.300000",
                    latitude: "38.000000",
                    country: "中国",
                    province: "湖北",
                    city: "武汉",
                    countyArea: "江岸区",
                    street: "解放大道"
                }
            },
            success: function (rs) {
                var obj = JSON.parse(rs);
                if (obj.result == 1) {

                    var USERID_KEYWORD = 'CurrentUserID';
                    var USERINFO_KEYWORD = '_UserInfo';
                    localStorage.setItem(USERID_KEYWORD, obj.account.userID);
                    localStorage.setItem(obj.account.userID + USERINFO_KEYWORD, JSON.stringify(obj.account));

                    getIsBuy();

                }
            }
        });
    }

    //废弃
    function userLoginNoNeedPwd(tel, paw) {
        $.ajax({
            url: webConfig.host + "/handle/UserInfoHandler.ashx?method=Login",
            type: "post",
            datatype: "json",
            data: {
                username: tel,
                password: paw,
                myposition: {
                    longitude: "114.300000",
                    latitude: "38.000000",
                    country: "中国",
                    province: "湖北",
                    city: "武汉",
                    countyArea: "江岸区",
                    street: "解放大道"
                }
            },
            success: function (rs) {
                var obj = JSON.parse(rs);
                if (obj.result == 1) {

                    //登录成功
                    //UserInfo_Service.setUserID(rs.account.userID);
                    //UserInfo_Service.setInfoItem('loginName', tel);
                    //UserInfo_Service.setInfoItems(rs.account);
                    //MyAccount_Service.init();

                    var USERID_KEYWORD = 'CurrentUserID';
                    var USERINFO_KEYWORD = '_UserInfo';

                    localStorage.setItem(USERID_KEYWORD, obj.account.userID);
                    SC_R.userID = obj.account.userID;


                    //var userID = localStorage.getItem(USERID_KEYWORD);
                    //var userInfo = angular.fromJson(localStorage.getItem(userID + USERINFO_KEYWORD)) || {};


                    localStorage.setItem(obj.account.userID + USERINFO_KEYWORD, JSON.stringify(obj.account));
                    getIsBuy();
                }
            }
        });
    }

    function getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000);
    }

    function GetOrignalStr() {
        $.ajax({
            url: webConfig.host + "/handle/PartnerService.ashx?method=GetOrignalStr",
            type: "post",
            datatype: "json",
            data: {
                orgID: SC_R.orgID
            },
            success: function (resp) {
                var thedate = resp.split('|')[2];
                var myDate = getLocalTime(thedate);
                var dateNow = new Date();
                var boolDate = compare_hms(dateNow, myDate, 30);
                if (boolDate) { //未超时
                    SC_R.groupUserName = resp.split('|')[0];
                    mobile = resp.split('|')[1];
                    //免登
                    userLoginNoNeedPwd(mobile, mobile);
                } else {
                    console.log("访问失效");
                }
            }
        });
    }

    function compare_hms(after, before, minute) {
        var a = after.getHours() * 60 * 60 + after.getMinutes() * 60 + after.getSeconds();
        var b = before.getHours() * 60 * 60 + before.getMinutes() * 60 + before.getSeconds();
        if (a - b >= minute * 60) {
            return false;
        } else {
            return true;
        }
    }

    //设置localStorage中相应对象的key
    function getKey() {
        SC_R.bookKey = "SCEbook" + SC_R.userID + SC_R.bookID + SC_R.versions + SC_R.orgID;
        SC_R.contentKey = "SCEbookContent" + SC_R.bookID + SC_R.versions;
        SC_R.configKey = "ebook" + SC_R.versions;
    }

    //获取URL中其他参数
    function getParameter() {
        var request = getRequest();
        //console.log("×××××××××××××××××××××××××××××××××××××××××××××××××××××");
        //console.log(request);

        SC_R.bookID = Number(request["id"]);

        SC_R.fatherID = Number(request["fatherID"]);    //获取该书所属的圣才视频、全套资料或大礼包的id

        SC_R.orgID = request["orgID"];

        SC_R.groupUserName = request["groupUserName"];
        SC_R.sctsg = request["sctsg"];
        SC_R.gobackUrl = request["gobackUrl"];

        SC_R.userID = request["userID"];

        SC_R.host = request["host"];
    }

    //获取url参数并放到数组中
    function getRequest() {
        var url = location.search; //获取url中"?"符后的字串
        //console.log("电子书网址"+url);
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0, i1 = strs.length; i < i1; i++) {

                //拼接以"="分割的字符串
                var strParamArr = strs[i].split("=");
                strParamArr.shift();
                var newParamStr = strParamArr.join("=");
                //console.log('test----2---------拼接以" = "分割的字符串-------------')
                //console.log(newParamStr);

                //theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                theRequest[strs[i].split("=")[0]] = newParamStr;
            }
        }
        return theRequest;
    }

    //设置设备宽和高   weitao 1014  iphone5有问题
    function getScreenWH() {
        if ($("#DownloadAppTips")) window.AppTips = AppTips = $("#DownloadAppTips").height();

        __w = $(window).width();
        __w = __w > 990 ? 700 : __w;
        __h = $(window).height() - AppTips;
        //console.log("浏览器窗口高度" + __h)

        // console.info($(window).height());

        //alert("body:" + document.body.style.height)
        //alert("window:" + $(window).height())
        //alert("ad:" + $("#DownloadAppTips").height())
        //alert("innerWidth:" + window.innerHeight)
        //alert("__h:" + __h)
        //alert(window.innerHeight)


        /*
        var ua = navigator.userAgent.toLowerCase();

        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.screen.width == 320) {
            //alert("5");
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                __h = __h - 110;
            } else if (ua.match(/QQ/i) == "qq") {
                __h = __h - 120;
            } else {
                __h = __h - 100;
            }
        } else if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.screen.width == 375) {
            //alert("6 ");
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //alert("wx")
                __h = __h - 100;
            } else if (ua.match(/QQ/i) == "qq") {
                // alert("qq")
                __h = __h - 120;
            } else {
                //alert("other")
                __h = __h - 100;
            }
        } else if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.screen.width > 375) {
            //alert("6p");
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                __h = __h - 5;
            } else if (ua.match(/QQ/i) == "qq") {
                __h = __h - 60;
            } else {
                __h = __h - 20;
            }
        } else {

        }
        */

        // __h = $("#box-loading").height();
        // __w = $("#box-loading").width();

        $("body").attr({ "style": "overflow:hidden;text-align:center;height:" + $(window).height() + "px" });
        $("#EbookRead").css("top", AppTips + "px");
        $("#BookBody").width(__w).height(__h).css("left", ($(window).width() - __w) / 2 + "px");

        var offset = $("#BookBody").offset();
        _bbLeft = offset.left || 0;
        _bbTop = offset.top || 0;


        _pag.pageHeight = __h - 20;
        _pag.textHeight = __h - 20;
        //console.info("设备宽高:", _pag.pageHeight, _pag.textHeight)
    }

    //计算行高和行间距   计算行距的时候应该使用的是经浏览器加成之后的字体大小
    function getLineH() {
        var fs = getBrowserFontW();
        _pag.lineH = parseFloat(_cS.lh) * parseFloat(fs);
    }

    //计算文本宽度,保证文本宽度正好是字体大小的整数倍
    function getPageWidth() {
        var fs = getBrowserFontW();
        var s = __w % parseFloat(fs);
        if (s < 12) {
            s = parseFloat(s) + parseFloat(fs);
        }
        //_pag.pageMarginLeft = parseFloat(s) / 2;
        _pag.pageMarginLeft = parseFloat(s);
        _pag.pageWidth = __w - 2 * s;
    }

    //根据字体大小，设置对应的行高
    function setLH() {
        if (_cS.fs == _eS.fontSize[0]) {
            _cS.lh = _eS.lineHeight[4];
        } else {
            _cS.lh = _eS.lineHeight[2];
        }
        //_cS.lh = "1.5"; //固定行高为1.5
    }

    //获取浏览器的字体大小
    function getBrowserFontSize() {
        return $("#BookBody").css("font-size");
    }

    //获取浏览器的字体宽度
    function getBrowserFontW() {
        var fs = _cS.fs.toString();
        if (fs.indexOf("em") > -1) {
            fs = parseFloat(fs.substring(0, fs.indexOf("em"))) * 16;
        }
        else if (fs.indexOf("px") > -1) {
            fs = parseFloat(fs.substring(0, fs.indexOf("px")));
        }
        return fs;
    }

    //获取跳转的URL
    function getGotoUrl() {
        saveEbookLocal();
        saveUI();
        bookRead("set");

        if (SC_R.sctsg) {
            if (arguments[0] == "goback") {
                history.back();
            }
            return false;
        } else {
            if (!SC_R.gobackUrl) {
                if (arguments[0]) {
                    var msg = { flag: arguments[0], title: SC_R.ebook.info ? SC_R.ebook.info.name : "", price: SC_R.ebook.info ? SC_R.ebook.info.price : "", orgID: SC_R.orgID };
                    window.parent.postMessage(msg, '*');
                    return false;
                }
            } else {
                if (arguments[0]) {
                    if (arguments[1]) {
                        if ((arguments[0] == "thisCircle" && arguments[1]) || arguments[0] != "thisCircle") {
                            //console.log("orgID1:" + SC_R.orgID);
                            return webConfig.host + "/#/books/" + SC_R.bookID + "?gobackUrl=" + escape(SC_R.gobackUrl) + "&flag=" + arguments[0] + "&hxGroupID=" + arguments[1] + "&title=" + SC_R.ebook.info.name + "&price=" + SC_R.ebook.info.price + "&orgID=" + SC_R.orgID;
                        }
                    } else {
                        //console.log("orgID2:" + SC_R.orgID);
                        //console.log("bookID2:" + SC_R.bookID);
                        //return webConfig.host + "/#/books/" + SC_R.bookID + "?gobackUrl=" + escape(SC_R.gobackUrl) + "&flag=" + arguments[0] + "&title=" + SC_R.ebook.info.name + "&price=" + SC_R.ebook.info.price + "&orgID=" + SC_R.orgID;
                        return "http://" + SC_R.orgID + "/Ajax/ShopBusHandle.aspx?method=BuyNow&pId=" + SC_R.bookID + "&pType=1";
                    }
                }
            }
        }
        return "";
    }

    function SCLocation() {
        console.info(arguments);
        if (arguments[0]) location.href = arguments[0];
    }

    //保存阅读器配置参数到本地localStorage
    function saveUI() {
        var SCConfig = SC_Config(SC_R.configKey);
        if (!SCConfig) SCConfig = {};
        SCConfig.common = _cS;
        SC_Config(SC_R.configKey, SCConfig);
    }

    //保存ebook对象到本地localStorage
    function saveEbookLocal() {
        //console.log("saveEbookLocal");
        SetLocalStorage(SC_R.bookKey, SC_R.ebook, null);
    }

    //从localStorage中获取阅读器配置参数
    function refreshUI() {
        var SCConfig = SC_Config(SC_R.configKey);
        console.log("test------------------------_cSSCConfig-----------------------------");
        console.log(SCConfig);
        if (!SCConfig) SCConfig = {};
        if (!SCConfig.common) {
            SCConfig.common = _cS;
            SC_Config(SC_R.configKey, SCConfig);
        }
        _cS = SCConfig.common;
        //重新计算行高
        getLineH();
    }

    //存储正在阅读章节信息ebook.read.chap
    function bookRead(flag) {
        var SCConfig = SC_Config(SC_R.configKey);
        if (!SCConfig) SCConfig = {};
        if (!SCConfig.read) SCConfig.read = {};
        if (!SCConfig.read[SC_R.bookID]) SCConfig.read[SC_R.bookID] = {};
        if (flag == "set") {
            if (SC_R.ebook) {
                SCConfig.read[SC_R.bookID] = SC_R.ebook.read;
                SC_Config(SC_R.configKey, SCConfig);
            }
        } else {
            SC_R.ebook.read = SCConfig.read[SC_R.bookID];
        }
    }

    //阅读器配置参数保存到localStorage和从localStorage上读取
    function SC_Config() {
        var argLen = arguments.length;
        if (argLen === 1) {
            var res = null;
            var json = {};
            var key = arguments[0];
            if (localStorage.ScConfig) json = JSON.parse(localStorage.ScConfig);
            if (json[key]) res = json[key];
            return res;
        } else if (argLen === 2) {
            var json = {};
            var key = arguments[0];
            var val = arguments[1];
            if (localStorage.ScConfig) json = JSON.parse(localStorage.ScConfig);
            json[key] = val;
            localStorage.ScConfig = JSON.stringify(json);
            return true;
        }
        return null;
    }

    //从localStorage中获取电子书对象
    function getEbookObj() {
        var e = GetLocalStorage(SC_R.bookKey) || {};
        // console.log(e);
        SC_R.ebook = {};
        e = null;
    }

    //从localStorage中获取章节内容
    function getContentObj(chap, bl) {

        if (jQuery.isEmptyObject(SC_R.ebook.info.content[chap].chapData)) {
            bl = true;
        }

        if (bl) {
            var c = GetLocalStorage(SC_R.contentKey) || {};
            if (c[chap]) {
                SC_R.ebook.info.content[chap] = c[chap];
            } else {
                SC_R.ebook.info.content[chap].loadFlag = 1;
                SC_R.ebook.info.content[chap].paging = 1;
            }
            c = null;
        }
    }

    //保存章节内容对象到本地localStorage
    function saveContentLocal(chap, obj) {
        var c = GetLocalStorage(SC_R.contentKey) || {};
        c[chap] = obj;
        SetLocalStorage(SC_R.contentKey, c, null);
        c = null;
    }

    //localStorage相关封装的方法
    function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    function SetLocalStorage(key, value, validTime) {
        if (!supports_html5_storage()) {
            return false;
        } else {
            //valid time 默认为 20分钟
            if (!validTime) {
                validTime = 20 * 60 * 1000;
            } else if (validTime == -1) {
                var item = { validTime: 0, data: value };
                TryLoaclStorage(key, JSON.stringify(item));
                return;
            }
            var item = { validTime: new Date().getTime() + validTime, data: value };
            TryLoaclStorage(key, JSON.stringify(item));
        }
    }

    function TryLoaclStorage(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            console.log("window.localStorage if full..........................");
            window.localStorage.clear();
            window.localStorage.setItem(key, value);
        }
    }

    function GetLocalStorage(key) {
        if (!LocalStorageExists(key)) return null;
        var item = JSON.parse(window.localStorage.getItem(key));
        if (item.validTime == 0) return item.data;
        if (item.validTime < new Date().getTime()) return null;
        return item.data;
    }

    function LocalStorageExists(key) {
        if (supports_html5_storage()) {
            for (var i = 0; i < window.localStorage.length; i++)
                if (key === window.localStorage.key(i)) return true;
        }
        return false;
    }

    function RemoveLocalStorage(key) {
        if (supports_html5_storage()) localStorage.removeItem(key);
    }

    function getCookie(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0, i1 = arrCookie.length; i < i1; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) return arr[1];
        }
        return "";
    }

    //创建顶部下载App广告
    function createDownloadAppTips() {
        var $DownloadAppTips = $("#DownloadAppTips");
        if ($DownloadAppTips.length > 0) {
            return false
        } else {
            var html = '<div class="DownloadAppTips" id="DownloadAppTips">';
            html += '<a href="http://www.100xuexi.com/view/showitem/20160926/woyaochushu.html">';
            html += '   <span class="AppIco"><img src="/favicon.ico"></span>';
            html += '   <div class="BtnDownloadContainer">';
            html += '       <span  class="BtnDownload">立即制作</span>';
            html += '   </div>';
            html += '   <div class="Text">';
            html += '       <span class="Des">想把照片、视频做成精美的电子书吗？</span>';
            html += '       <span class="Des DesShort" style="text-align:left">把照片、视频做成电子书！</span>';
            html += '   </div>';
            html += '</a>';
            //            html += '<span class="BtnClose"></span>';
            //html +='<span  class="BtnClose"></span>';
            html += '</div>';

            $("body").append(html);
            // $("#appDoenload_0").data("obj", { id: SC_R.bookID, platNum: 1 }).bind("click", function () {
            //     var obj = $(this).data("obj");
            //     SC_downApp.appDoenload(obj.id, obj.platNum);
            // });
            $(".BtnClose").bind("click", function () {
                // $("#DownloadAppTips").remove();
                // $(".EbookRead").css("top", "0px");
                // getScreenWH();
            })
        }
    }

    //创建进入阅读器的动画
    function createEnterDiv() {
        var $box_loading = $('<div>').attr("id", "box-loading");
        var $LoadingIco = $('<div>').addClass("LoadingIco");
        $box_loading = $LoadingIco = null;
        $box_loading.append($LoadingIco);
        $("body").append($box_loading);
    }

    //创建加载动画
    function createLoadingDiv() {
        if ($("#loadingDiv").length > 0) return false;
        var $div1 = $('<div>').attr({ "id": "loadingDiv", "style": "display:none" });
        var $div2 = $('<div>').addClass("LoadingIco");
        var $div3 = $('<div>').addClass("LoadingTips").text("正在加载，请稍后...");
        $div1.append($div2).append($div3);
        $("body").append($("<div>").addClass("PopMask").attr("id", "PopMaskLoad")).append($div1);
        $div3 = $div2 = $div1 = null;
    }

    //显示加载动画
    function fadeInLoad(speed, mask, callback) {
        if (speed === false) {
            $("#loadingDiv").show();
        } else {
            $("#loadingDiv").fadeIn(speed, callback);
        }
        if (mask) $("#PopMaskLoad").show();
    }

    //隐藏加载动画
    function fadeOutLoad(speed, callback) {
        if (speed === false) {
            $("#loadingDiv").hide();
        } else {
            $("#loadingDiv").fadeOut(speed, callback);
        }
        $("#PopMaskLoad").hide();
    }

    //判断是否可以继续往下看
    function isGoLook(flag, c, p) {
        //点击事件开始时判断是否有分页错误
        console.info("isGoLook");
        console.info(c, p);
        // if (!(c == 1 && p == 1) && !checkHeight() && !SC_R.isRePaging) {
        //     rePage();
        //     //return false;
        // } else {

        // }

        if (checkPassword() == false) { //如果密码校验没有通过
            showPasswordInput(); //显示密码输入
            return false;
        }
        if (!SC_R.ebook.info.isbuy) {
            var $ecd = $("#" + SC_R._ecd + c + "_" + p);
            if ($ecd.length <= 0) {
                if (SC_R.ebook.info.isPdf == true) {
                    $ecd = createPdfECD(p);
                } else {
                    $ecd = createEpubECD(c, p);
                }
            }
            var thisFree = "Y";
            if ($ecd.length > 0) {
                thisFree = $ecd.attr("data-free") || "Y";
            } else {
                thisFree = "N";
            }

            if (thisFree == "N") {
                if (flag == "FP") {
                    touch.clickFlag = false;
                    buyDiv();
                } else if (flag == "END") {
                    buyDiv();
                }
                return false;
            }
        }
        return true;
    }

    //弹出电子书出错的提示
    function ebookError(title, flag) {
        if (!title) title = "电子书修订中！";
        var layerW = 220;
        var layerH = 82;

        layer.closeAll();
        var ebookErrorLayer = layer.open({
            type: 1,
            closeBtn: false,
            shade: false,
            title: title,
            offset: [(__h - layerH) / 2 + 'px', (((__w - layerW) / 2) + _bbLeft) + 'px'],
            area: layerW + 'px',
            content: '<a href="javascript:;" class="oneBTN" id="changeOneBtn">换一本书</a>'
        });

        $("#box-loading").hide();
        $("#changeOneBtn").bind("click", function (e) {
            stopEvent(e);
            layer.close(ebookErrorLayer);

            // //跳转到最新
            // SCLocation(getGotoUrl("productList"));
            //改为跳转到详情页
            SCLocation(getGotoUrl("productDetail"));
        });

        //3秒之后自动跳转到最新
        //改为跳转到详情页
        setTimeout(function () {
            // SCLocation(getGotoUrl("productList"));
            SCLocation(getGotoUrl("productDetail"));
        }, 3000);

        console.log("ebookError................." + flag);
        SC_R.ebook.info = null;
        saveEbookLocal();
    }

    //弹出购买电子书的提示框
    function buyDiv() {
        var $PopBuyTips = $("#PopBuyTips"),
    	$PopMaskBuy = $("#PopMaskBuy");
        if ($PopBuyTips.length <= 0) {
            var html = '  <div class="PopCon">';
            html += '         <p>查看后面的内容，请先购买!</p>';
            html += '     </div>';
            html += '     <div class="PopBot">';
            html += '         <ul>';
            html += '             <li><a href="javascript:;" class="BtnCancelBuy Btn" id="BtnCancelBuy" name="popBuy">暂不购买</a></li>';
            html += '             <li><a href="javascript:;" class="BtnOkBuy Btn" id="BtnOkBuy">立即购买</a></li>';
            html += '         </ul>';
            html += '     </div>';
            $PopBuyTips = $("<div>").addClass("PopBuyTips").attr("id", "PopBuyTips");
            $PopBuyTips.html(html).show();
            $PopMaskBuy = $("<div>").addClass("PopMask").attr({ "id": "PopMaskBuy", "name": "popBuy" }).show();
            $("#BookAction").append($PopMaskBuy).append($PopBuyTips);
        } else {
            $PopMaskBuy.show();
            $PopBuyTips.show();
        }
        $PopBuyTips = $PopMaskBuy = null;
    }

    //判断该fatherId是否包含这本书 接口返回慢
    function getIsFather(sonId,fatherId){

        console.log("sonId:"+sonId+"　fatherId:"+fatherId);
        var SC_Packge_SonBookList= localStorage.getItem("SC_Packge_SonBookList_"+fatherId);
        //console.log("◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇");
        //console.log(SC_Packge_SonBookList);

        if(SC_Packge_SonBookList){
            var arrSonBookId=[];

            sons = JSON.parse(SC_Packge_SonBookList).sons;
            $.each(sons,function(i,item){
                arrSonBookId[i]=item.id;
            })
            console.log(arrSonBookId);
            if(arrSonBookId.indexOf(sonId+"")>-1){
                console.log("亲子鉴定，是他爹");
                return true;
            }
            else{
                console.log("亲子鉴定，不是他爹");
                return false;
            }
        }
        else{
            return false;
        } 
    }

    //判断是否购买
    function getIsBuy() {
        //SC_R.ebook.info.isbuy = true;
        //return false;

        //价格小于等于0，则看书不受限制
        if (SC_R.orgID != "" && SC_R.groupUserName != "") {
            SC_R.ebook.info.isbuy = true;
            $("#BtnBuy").css("display", "none");
            $("#Separator_b").css("display", "none");
        }

        //如果是圣才图书馆访问
        else if (SC_R.sctsg) {
            //调取接口获取是否免费
            SC_R.ebook.info.isbuy = true;
        }

        //如果属于圣才视频、全套资料和大礼包，那么判断该圣才视频、全套资料和大礼包是否有已购买
        else if(SC_R.fatherID && getIsFather(SC_R.bookID,SC_R.fatherID)){
            if (SC_R.userID) {
                //如果是创业网站的用户
                if (SC_R.orgID) {
                    console.info("创业网站用户从圣才视频、全套资料或者大礼包访问");
                    $.post(webConfig.host + "/handle/UserTrackHandler.ashx", { method: "CheckBuyXuexiAgent", user_id: SC_R.userID, platnum: 1, id: SC_R.fatherID, groupUserName: SC_R.groupUserName }, function (res) {
                        console.log("result:" + JSON.parse(res));
                        res = JSON.parse(res);
                        if (res && res.result == 1) {
                            SC_R.ebook.info.isbuy = true;
                            $("#BtnBuy").css("display", "none");
                            $("#Separator_b").css("display", "none");
                            console.log("该书所属的圣才视频等已经购买，所以可以免费用" + SC_R.ebook.info.isbuy);
                        } else {
                            //console.log("SC_R.ebook.info.isbuy1:********************************************已登录用户：未购买");
                            $("#BtnBuy").css("display", "block");
                            $("#Separator_b").css("display", "block");
                        }
                    });

                }
                //如果是学习网的用户
                else {
                    console.info("学习网用户从圣才视频、全套资料或者大礼包访问");
                    //http://wx.100xuexi.com/handle/UserTrackHandler.ashx?method=CheckBuy&user_id=230058&platnum=1&id=157474
                    $.post(webConfig.host + "/handle/UserTrackHandler.ashx", { method: "CheckBuy", user_id: SC_R.userID, platnum: 1, id: SC_R.fatherID }, function (res) {
                        //console.info(res);
                        //已购买
                        if (res && res == "1") {
                            SC_R.ebook.info.isbuy = true;
                            $("#BtnBuy").css("display", "none");
                            $("#Separator_b").css("display", "none");
                             console.log("该书所属的圣才视频等已经购买，所以可以免费用" + SC_R.ebook.info.isbuy);
                        }
                        //未购买
                        else {
                            $("#BtnBuy").css("display", "block");
                            $("#Separator_b").css("display", "block");
                        }
                    });

                }
            } else {
                $("#BtnBuy").css("display", "block");
                $("#Separator_b").css("display", "block");
                console.log("SC_R.ebook.info.isbuy:未登录用户");
            }
            //如果没有购买，则不处理
        }

        else {
            //价格大于0，查看该用户是否购买了该书
            if (parseFloat(SC_R.ebook.info.price) > 0) {
                console.log("SC_R.userID:" + SC_R.userID);
                if (SC_R.userID) {
                    //如果是创业网站的用户
                    if (SC_R.orgID) {
                        console.info("创业网站用户访问");
                        $.post(webConfig.host + "/handle/UserTrackHandler.ashx", { method: "CheckBuyXuexiAgent", user_id: SC_R.userID, platnum: 1, id: SC_R.bookID, groupUserName: SC_R.groupUserName }, function (res) {
                            console.log("result:" + JSON.parse(res));
                            res = JSON.parse(res);
                            if (res && res.result == 1) {
                                SC_R.ebook.info.isbuy = true;
                                $("#BtnBuy").css("display", "none");
                                $("#Separator_b").css("display", "none");
                                console.log("SC_R.ebook.info.isbuy1:********************************************" + SC_R.ebook.info.isbuy);
                            } else {
                                //console.log("SC_R.ebook.info.isbuy1:********************************************已登录用户：未购买");
                                $("#BtnBuy").css("display", "block");
                                $("#Separator_b").css("display", "block");
                                console.log("SC_R.ebook.info.isbuy2");
                            }
                        });

                    }
                    //如果是学习网的用户
                    else {
                        console.info("学习网用户访问");
                        //http://wx.100xuexi.com/handle/UserTrackHandler.ashx?method=CheckBuy&user_id=230058&platnum=1&id=157474
                        $.post(webConfig.host + "/handle/UserTrackHandler.ashx", { method: "CheckBuy", user_id: SC_R.userID, platnum: 1, id: SC_R.bookID }, function (res) {
                            console.info(res);

                            //已购买
                            if (res && res == "1") {
                                SC_R.ebook.info.isbuy = true;
                                $("#BtnBuy").css("display", "none");
                                $("#Separator_b").css("display", "none");
                                console.log("SC_R.ebook.info.isbuy3:********************************************" + SC_R.ebook.info.isbuy);
                            }

                                //未购买
                            else {
                                //console.log("SC_R.ebook.info.isbuy2:********************************************已登录用户：未购买");
                                $("#BtnBuy").css("display", "block");
                                $("#Separator_b").css("display", "block");
                                console.log("SC_R.ebook.info.isbuy4");
                            }
                        });

                    }
                } else {

                    $("#BtnBuy").css("display", "block");
                    $("#Separator_b").css("display", "block");
                    console.log("SC_R.ebook.info.isbuy:********************************************未登录用户");
                }
            } else {
                SC_R.ebook.info.isbuy = true;
                console.log("这本书免费");
            }
        }
    }

    //判断有没有相关直播
    function getLive() {
        SC_R.ebook.info.islive = false;
        $.post(webConfig.host + "/handle/liveHandler.ashx", { method: "GetProductLives", platnum: 1, bookid: SC_R.bookID }, function (res) {
            var json = JSON.parse(res);
            if (json.Result == 1) {
                SC_R.ebook.info.islive = true;
                createReaderLive();
                $(".BtnLive").show();
            }
            else {
                $(".BtnLive").hide();
            }
        });
    }

    //判断横竖屏
    function orientation() {
    }

    //翻到第一页或者最后一页的提示
    function layerMsgFG(fg) {
        if (fg == "f") {
            layer.msg("亲，已经是第一页了！", { time: 1500 });
        } else if (fg == "l") {
            layer.msg("亲，已经是最后一页了！", { time: 1500 });
        } else if (fg == "noPage") {
            layer.msg("电子书加载失败", { time: 1500 });
        } else {
            return;
        }
    }

    //修改标题
    function setTitle() {
        return false;
        SCLocation(getGotoUrl("title"));
    }

    //tab切换
    function setTab(name, cursel, n) {
        for (i = 1; i <= n; i++) {
            var menu = document.getElementById(name + i).parentNode;
            var con = document.getElementById("con" + name + i);
            menu.className = i == cursel ? "over Selected" : " ";
            con.style.display = i == cursel ? "block" : "none";
        }
    }

    //计算一个字符串在固定宽度的N行里面显示的字符数量在整个字符串中占的百分比
    function percentP(str, lineNo) {
        var cW = _cS.fs;
        cW = cW.substring(0, cW.length - 2);
        console.log(cW);
        if (str.length > 0 && lineNo > 0) {
            for (var a = 0; a < str.length; a++) {

            }
        }
    }

    //动态显示时间
    function showTime() {
        //console.log("showTime");
        if (!SC_R.menuFlag) {
            stopTime();
        } else {
            var today = new Date()
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            $("#Mytime").html(h + ":" + m + ":" + s);
            SC_R.showTimeFun = setTimeout(function () { showTime() }, 1000);
        }
    }

    function stopTime() {
        clearTimeout(SC_R.showTimeFun);
    }

    function checkTime(i) {
        return i < 10 ? "0" + i : i;
    }

    //设置颜色的相关方法
    function getBright(MyRgb) {
        if (!MyRgb) return MyRgb;
        if (MyRgb.indexOf("#") >= 0) MyRgb = colorRgb(MyRgb);
        MyRgb = MyRgb.replace("RGB", "").replace("(", "").replace(")", "");
        if (MyRgb) MyRgb = MyRgb.split(",")
        var Shade = parseInt($("#BrightnessNumber").val());
        for (var i = 0; i < MyRgb.length; i++) {
            MyRgb[i] = parseInt(parseInt(MyRgb[i].trim()) * Shade * 0.01);
        }
        return "rgb(" + MyRgb.join(",") + ")";
    }

    function rgb(color) {
        if (color != undefined) {
            color = color.replace("rgb", "").replace("(", "").replace(")", "");
            return color;
        } else {
            return null;
        }
    }

    function colorRgb(str) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = str.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值  
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    }

    function getDPI() {
        var arrDPI = new Array;
        if (window.screen.deviceXDPI) {
            arrDPI[0] = window.screen.deviceXDPI;
            arrDPI[1] = window.screen.deviceYDPI;
        } else {
            var tmpNode = document.createElement("DIV");
            tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
            document.body.appendChild(tmpNode);
            arrDPI[0] = parseInt(tmpNode.offsetWidth);
            arrDPI[1] = parseInt(tmpNode.offsetHeight);
            tmpNode.parentNode.removeChild(tmpNode);
        }
        return arrDPI;
    }

    //重新分页
    function rePage() {
        SC_R.rePaging = true;
        //console.info("----------------fadeIn");
        fadeInLoad("slow", false, function () {
            //清除下一页缓存页面 目前是清除所有，熟悉代码的可修改
            //localStorage.removeItem(SC_R.contentKey);
            var c = 0;
            var chap = {};

            //重新分页当前章节
            c = SC_R._cI;
            if (c == 0) { //简介页大多数不可拆分，不做处理
                console.error(c);
                fadeOutLoad(false);
                return;
            }

            if (c < SC_R.ebook.info.chapList.length) {
                console.info("分页当前章", c);
                chap = { 'chap': SC_R.ebook.info.chapList[c], 'page': 1, 'fs': _cS.fs };
                //重新当前页面
                SC_R.readChapFlag = false;
                pagingEpubChap(chap.chap, function () {
                    preparePCNPage();
                    SC_R.readChapFlag = true;
                    SC_R.layerRead = false;
                    //fadeOutLoad("fast");
                });

            }

            //重新分页下一章节
            c = SC_R._cI + 1;
            console.info(SC_R.ebook.info.chapList.length, c);
            if (c < SC_R.ebook.info.chapList.length && !checkHeight()) {
                console.info("分页下一章", c);
                chap = { 'chap': SC_R.ebook.info.chapList[c], 'page': 1, 'fs': _cS.fs };
                //重新分下一页
                SC_R.readChapFlag = false;
                pagingEpubChap(chap.chap, function () {
                    preparePCNPage();
                    SC_R.readChapFlag = true;
                    SC_R.layerRead = false;
                });
            }
            //模拟一次翻页，确保新的分页正常
            if (SC_R._cI > 0) {
                console.info(SC_R._cI);
                enterPrePage();
                console.info(SC_R._cI);
                enterNextPage();
                console.info(SC_R._cI);
            }


            preparePCNPage();

            fadeOutLoad(false);
            SC_R.rePaging = false;
            //console.info("----------------fadeOut");
        });

        SC_R.rePaging = false;
    }

    //判断分页高度 true分页正确
    function checkHeight() {
        var flag = true;
        var chapDivs = $("#BookBody .chapDiv .e_div");
        var readerHeight = parseInt($("#BookBody").css("height"));
        //console.info("阅读器高度:" + readerHeight);
        chapDivs.each(function (i, e) {
            //console.info(i);
            //实际高度
            var formerHeight = parseInt($(this).find(".e_p").css("height"));
            var realHeight = parseInt($(this).find(".e_p").css("height", "auto").css("height"));

            //console.info("之前高度:" + formerHeight + " 实际高度" + realHeight);
            if (realHeight > readerHeight) {
                console.error("分页高度错误:" + i, readerHeight, realHeight, formerHeight);
                flag = false;
            }
            $(this).find(".e_p").css("height", formerHeight);
        });
        return flag;
    }

    function loadRollNextOrPrePage(d, c) {
        var will = c + (d);
        if (will >= SC_R.ebook.info.chapList.length || will < 0) {
            return;
        }

        var c_chap = SC_R.ebook.info.chapList[will]
        if (!SC_R.ebook.info.isbuy && (!SC_R.ebook.info.content[c_chap].free)) {
            buyDiv();
            return;
            //return;
        }

        var chapFile = SC_R.ebook.info.chapList[will];

        var chap = SC_R.ebook.info.content[chapFile] || {}
        chap.page = 1;
        chap.chap = chap.chap || chapFile;

        if ($('[id="' + chap.chap + '"]').length > 0) {
            return;
        } else {

        }
        if (roll_loading_new) {
            return;
        }

        roll_loading_new = true;

        SC_R.fadeInLoad('fast', function () { });

        loadChapInfo(chap, function () {
            SC_R.fadeOutLoad("fast", function () {

                var $div_roll = $('#rollDiv')

                var $div_roll_chap = $('<div></div>').addClass("ChapItem").attr({ id: chap.chap });

                var scroll_div_container = $('#scroll_div_container')
                $div_roll_chap.append(SC_R.ebook.info.content[chap.chap].chapData.chapInfo);

                SC_R._cI = will;

                if (d > 0) {
                    scroll_div_container.append($div_roll_chap);
                }
                if (d < 0) {
                    scroll_div_container.prepend($div_roll_chap);
                    $div_roll_chap[0].parentNode.parentNode.scrollTop = $div_roll_chap[0].offsetHeight;
                }

                $('.chapDiv').remove();

                roll_loading_new = false;
            });
        });
    }

    var roll_loading_new = false;
    var scroll_start = 0;
    var scroll_drection = 0;

    function rollListner(e) {

        var h = $('#rollDiv')[0].scrollHeight

        var t = $('#rollDiv')[0].scrollTop

        var h_body = _pag.pageHeight;

        scroll_drection = t - scroll_start;
        scroll_start = t;

        var cindex = 0;
        if ((h - t - h_body) < 40 && scroll_drection > 0) {
            cindex = htmlName2index($($('#scroll_div_container')[0].children[$('#scroll_div_container')[0].children.length - 1]).attr('id'))
            loadRollNextOrPrePage(1, cindex)
        }

        if (t < 2 && scroll_drection < 0) {
            cindex = htmlName2index($($('#scroll_div_container')[0].children[0]).attr('id'))
            loadRollNextOrPrePage(-1, cindex)
        }

        $('.chapDiv').remove();
    }

    function htmlName2index(n) {
        for (var i = 0; i < SC_R.ebook.info.chapList.length; i++) {
            if (SC_R.ebook.info.chapList[i] == n)
                return i;
        }
        return -2;
    }

})();


function iFrameLoader() {
    var url = "http://e.100xuexi.com/iloader/a.html"
    var obj = {};
    var iLoader = document.createElement('iframe');
    iLoader.id = "iLoader_" + (new Date().getTime().toString());
    iLoader.src = url;
    iLoader.style.display = "none";
    document.body.appendChild(iLoader);

    obj.loaded = false;
    obj.calllist = [];
    obj.loader = document.getElementById(iLoader.id);

    obj.onResponse = function () { } //obj.onRespones = function () { }

    obj.getData = function (url, callback) {
        //console.info("load:" + url);
        var timestamp = new Date().getTime().toString();
        var act = 'load:' + timestamp;
        if (obj.loaded) {
            var req = act + ";" + url;
            obj.loader.contentWindow.postMessage(req, '*');
            obj.onResponse = function (msg) { //obj.onRespones = function (msg) {
                if (msg) {
                    //console.log(typeof msg);
                    //msg = JSON.stringify(msg);
                    if (typeof msg == "object") {
                        msg = JSON.stringify(msg);
                        //console.log("msg1:" + JSON.stringify(msg));
                    } else {
                        //console.log("msg2:" + msg);
                    }
                    if (msg.indexOf('ajax:' + timestamp) === 0) callback(msg.substr(19));
                }
            }
        } else {
            obj.calllist.push({ 'url': url, 'callback': callback });
        }
    }

    obj.loader.onload = function () {
        obj.loaded = true;
        obj.doList();
    }

    obj.doList = function () {
        if (obj.calllist.length > 0) {
            var tmp = obj.calllist.shift();
            var old = tmp.callback;
            tmp.callback = function (msg) {
                old(msg);
                obj.doList();
            }
            obj.getData(tmp.url, tmp.callback);
        }
    }

    var old = window.onmessage;
    window.onmessage = function (msg) {
        if (typeof (obj.onResponse) == "function") obj.onResponse(msg.data); //if (typeof (obj.onRespones) == "function") obj.onRespones(msg.data);
        if (typeof (old) == "function") old(msg);

        if (msg.data.flag == "Easemob_Service") {
            document.getElementById("BtnCircleTips").style.display = "block";
        }
    }
    return obj;
}

function ServiceiFrameLoader() {
    var url = "http://service.100eshu.com/iloader/a.html"
    var obj = {};
    var iLoader = document.createElement('iframe');
    iLoader.id = "iLoader_" + (new Date().getTime().toString());
    iLoader.src = url;
    iLoader.style.display = "none";
    document.body.appendChild(iLoader);

    obj.loaded = false;
    obj.calllist = [];
    obj.loader = document.getElementById(iLoader.id);

    obj.onResponse = function () { } //obj.onRespones = function () { }

    obj.getData = function (url, callback) {
        console.info("load:" + url);
        var timestamp = new Date().getTime().toString();
        var act = 'load:' + timestamp;
        if (obj.loaded) {
            var req = act + ";" + url;
            obj.loader.contentWindow.postMessage(req, '*');
            obj.onResponse = function (msg) { //obj.onRespones = function (msg) {
                if (msg) {
                    //console.log(typeof msg);
                    //msg = JSON.stringify(msg);
                    if (typeof msg == "object") {
                        msg = JSON.stringify(msg);
                        //console.log("msg1:" + JSON.stringify(msg));
                    } else {
                        //console.log("msg2:" + msg);
                    }
                    if (msg.indexOf('ajax:' + timestamp) === 0) callback(msg.substr(19));
                }
            }
        } else {
            obj.calllist.push({ 'url': url, 'callback': callback });
        }
    }

    obj.loader.onload = function () {
        obj.loaded = true;
        obj.doList();
    }

    obj.doList = function () {
        if (obj.calllist.length > 0) {
            var tmp = obj.calllist.shift();
            var old = tmp.callback;
            tmp.callback = function (msg) {
                old(msg);
                obj.doList();
            }
            obj.getData(tmp.url, tmp.callback);
        }
    }

    var old = window.onmessage;
    window.onmessage = function (msg) {
        if (typeof (obj.onResponse) == "function") obj.onResponse(msg.data); //if (typeof (obj.onRespones) == "function") obj.onRespones(msg.data);
        if (typeof (old) == "function") old(msg);

        if (msg.data.flag == "Easemob_Service") {
            document.getElementById("BtnCircleTips").style.display = "block";
        }
    }
    return obj;
}

//通过user-agent判断是否是电脑访问
function checkPc() {
    var ua = navigator.userAgent.toLocaleLowerCase();
    console.debug(ua);
    if (ua.indexOf("android") !== -1) return false;      //安卓
    if (ua.indexOf("iphone") !== -1) return false;  //苹果
    if (ua.indexOf("like mac os") !== -1) return false;  //苹果
    if (ua.indexOf("windows phone") !== -1) return false;  //Wp
    if (ua.indexOf("ucweb") !== -1) return false;      //uc
    if (ua.indexOf("mac os x") !== -1) return true;      //Mac
    if (ua.indexOf("linux") !== -1) return true;         //linux
    if (ua.indexOf("windows") !== -1) return true;    //windows
    return false;
}
