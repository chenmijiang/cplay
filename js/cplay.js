(function () {
    const jsmediatags = window.jsmediatags;
    const imgPath = './img/';
    const contentInner = imgPath + 'contentInner.png';
    const cplayConfig = "../resource/cplay.json";
    const classEs = {
        detail: {
            artist: getEle('cplay-artist'),
            title: getEle('cplay-title'),
            album: getEle('cplay-album'),
            picture: getEle('cplay-cover-img')
        },
        lyLi: getEles('cplay-lyrics'),
        lytime: getEles('cplay-lytime'),
        lyrics: getEle('cplay-lyrics-list'),
        editime: getEle('cplay-editime'),
        play: getEle('cplay-play'),
        volumebtn: getEle('cplay-volume-btn'),
        volume: getEle('cplay-volume'),
        uploading: getEle('cplay-uploading'),
        edit: getEle('cplay-edit'),
        save: getEle('cplay-save'),
        overview: getEle('cplay-overview'),
        copy: getEle('cplay-copy'),
        current: getEle('cplay-current'),
        ctt: getEle('cplay-ctt'),
        duration: getEle('cplay-duration'),
        uploadingFile: getEle('cplay-upload-file'),
        uploadbtn: getEle('cplay-upload'),
        bgi: getEle('cplay-bgi'),
        hintbox: getEle('cplay-hintbox'),
        setting: getEle('cplay-setting'),
        settingbox: getEle('cplay-settingbox'),
    };

    Cplay = function (options) {
        this.init(options);
    }

    Cplay.prototype.init = async function (options) {
        var _this = this;
        this.data = await readJsonFile(cplayConfig);
        /* 自定义参数设置 this.data.options */
        this.audio = new Audio(this.data.url);
        this.audio.volume = this.data.options.volume;
        pageViewInit(this, this.data);
        this.pageListen();
    }

    /**
     * 处理上传文件
     * @param {*} musicfile mp3、flac、wav格式
     * @param {*} lyricsfile txt
     */
    Cplay.prototype.changeFile = function (musicfile, lyricsfile) {
        var _this = this;
        var url = URL.createObjectURL(musicfile);
        if (!this.audio) {
            this.audio = new Audio(url);
        } else {
            this.audio.src = url;
        }

        addEve(this.audio, 'durationchange', async function () {
            const mdata = await getMusicInfo(musicfile);
            const ldata = await formatLyrics(lyricsfile);

            _this.data.detail = mdata.content;
            _this.data.lyrics = ldata.content;
            _this.data.duration = this.duration;
            _this.data.isPlayed = !this.paused;

            this.volume = _this.data.options.volume;
            this.audioRate = _this.data.audioRate;
            pageViewInit(_this, _this.data);
        })
    }

    //页面监听
    Cplay.prototype.pageListen = function () {
        //监听事件添加（数据交互的事件）
        pagePlayerCtrl(classEs.play, this);
        pageVolumeCtrl(classEs.volumebtn, this);
        pageProgressBar(this);
        pageLyricsEdit(this);
        pageEditShortcuts(this);
        pageCopyLyrics(this);
        settingBox();
    }

    /** 如果当前为状态状态开始播放，反之暂停播放 */
    Cplay.prototype.playPause = function () {
        if (this.data.isPlayed) {
            this.audio.pause();
            classEs.play.style.setProperty('background-image', `url(${imgPath}pause.svg)`);
            classEs.detail.picture.style.setProperty('animation-play-state', 'paused');
        } else {
            this.audio.play();
            classEs.play.style.setProperty('background-image', `url(${imgPath}play.svg)`);
            classEs.detail.picture.style.setProperty('animation-play-state', 'running');
        }
        this.data.isPlayed = !this.data.isPlayed;
    }
    /** 获取当前播放的时长，单位：秒，字符串格式 */
    Cplay.prototype.getCurrentTime = function () {
        return numberToFixed(this.audio.currentTime);
    }
    /** 获取进度比例：当前播放的时长/总时长,单位：无*/
    Cplay.prototype.getProcess = function (callback) {
        addEve(this.audio, 'timeupdate', function () {
            callback(this.currentTime / this.duration);
        });
    }
    /** 设置音量[0-1] */
    Cplay.prototype.setVolume = function (v) {
        if (v <= 0) {
            v = 0;
        } else if (v > 1) {
            v = 1;
        }
        this.audio.volume = this.data.options.volume = numberToFixed(v * 1, 2) * 1;
        classEs.volumebtn.style.setProperty('width', v * 100 + '%');
    }
    /** 调到offset的位置,[0-1] */
    Cplay.prototype.skip = function (offset) {
        var _this = this;
        if (offset <= 0) {
            offset = 0;
        } else if (offset > 1) {
            offset = 1;
        }
        this.audio.currentTime = offset * this.audio.duration;
        classEs.ctt.style.setProperty('width', (this.getCurrentTime() / _this.audio.duration) * 100 + '%');
        setLyricsIndex(this, this.getCurrentTime());
        lyricsScroll(this, this.data.index, false);
    }
    /** 播放停止 */
    Cplay.prototype.isEnd = function () {
        var _this = this;
        addEve(this.audio, 'ended', function () {
            this.index = 0;
            classEs.play.style.setProperty('background-image', `url(${imgPath}pause.svg)`);
            classEs.detail.picture.style.setProperty('animation-play-state', 'paused');
        });
    }
    /** 获取歌词对象 */
    Cplay.prototype.getLyrics = function (index) {
        return this.data.lyrics[index];
    }
    /** 获取歌词时间 单位：秒 */
    Cplay.prototype.getLyricsTime = function (index) {
        return formatToSeconds(this.data.lyrics[index].time);
    }
    /** 设置歌词时间轴 单位：[00:00.000] */
    Cplay.prototype.setLyricsTime = function (index, time) {
        this.data.lyrics[index].time = time;
    }
    /** 设置歌词内容 */
    Cplay.prototype.setLyricsContent = function (index, lyrics) {
        this.data.lyrics[index].data = lyrics;
    }


    /**
     * 页面样式初始化
     * @param {*} data 
     */
    function pageViewInit(cplay, data) {
        //唱片图片、歌词信息初始化
        imagSwitch(data.detail.picture, src => {
            classEs.detail.picture.src = src;
            classEs.bgi.style.setProperty('background-image', `url(${src})`);
        });

        classEs.detail.title.innerHTML = data.detail.title;
        classEs.detail.artist.innerHTML = data.detail.artist;
        classEs.detail.picture.style.setProperty('animation-play-state', 'paused');
        // classEs.detail.album.innerHTML = data.detail.album;
        data.isPlayed = false;
        //默认一开始为编辑模式
        data.isEdited = false;
        data.isDrag = false;
        data.index = 0;

        classEs.lyrics = classEs.lyrics || getEle('cplay-lyrics-list');
        classEs.lyrics.innerHTML = '';
        for (let lyLi of data.lyrics) {
            classEs.lyrics.innerHTML += `<li index='${data.index++}' class="lr-li cplay-lyrics"><span class='cplay-lytime' contenteditable>${lyLi.time}</span>${lyLi.data}</li>`;
        }
        data.index = 0;

        //控制组件初始化
        classEs.play.style.setProperty('background-image', `url(${imgPath}pause.svg)`);
        classEs.volumebtn.style.setProperty('width', data.options.volume * 100 + '%');
        classEs.current.innerHTML = '00:00';
        classEs.duration.innerHTML = secondsToFormat(data.duration, false, 0);
        classEs.ctt.style.setProperty('width', '0%');

        //歌词加载时要重新添加事件
        lyricsEdit(cplay);
    }

    /** 页面播放&暂停 */
    function pagePlayerCtrl(p, cplay) {
        addEve(p, 'click', () => {
            playerCtrl(cplay);
        });
    }

    function playerCtrl(cplay) {
        cplay.playPause();
    }
    /** 音量控制 */
    function pageVolumeCtrl(vbtn, cplay) {

        addEve(classEs.volume, 'click', function () {
            getEle('m-vol').style.setProperty('display', 'block');
        })

        addEve(getEle('m-vol'), 'mouseleave', function () {
            getEle('m-vol').style.setProperty('display', 'none');
        })

        addEve(getEle('vbg'), 'click', function (event) {
            let leftVal = vbtn.getBoundingClientRect().left;
            let barWidth = getEle('vbg').getBoundingClientRect().width;
            let barleft = event.clientX - leftVal;
            cplay.setVolume(barleft / barWidth);
        })

        getEle('cplay-volume-btn .btn').onmousedown = function () {
            let leftVal = vbtn.getBoundingClientRect().left;
            let barWidth = getEle('vbg').getBoundingClientRect().width;
            document.onmouseup = null;

            // 拖动一定写到 down 里面才可以
            document.onmousemove = function (event) {
                let barleft = event.clientX - leftVal;
                cplay.setVolume(barleft / barWidth);
                //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                window.getSelection ? window.getSelection().removeAllRanges() :
                    document.selection.empty();
            }
            document.onmouseup = function () {
                document.onmousemove = null; //弹起鼠标不做任何操作
            }
        }
    }
    /** 进度条控制 */
    function pageProgressBar(cplay) {
        cplay.getProcess((percent) => {
            if (!cplay.data.isDrag) {
                classEs.current.innerHTML = secondsToFormat(cplay.getCurrentTime(), false, 0);
                classEs.ctt.style.setProperty('width', percent * 100 + '%');
            }
            if (!cplay.data.isEdited) {
                pageLyricsScroll(cplay.getCurrentTime() * 1, cplay);
            }
        });

        addEve(getEle('barbg'), 'click', function (event) {
            let leftVal = classEs.ctt.getBoundingClientRect().left;
            let barWidth = getEle('barbg').getBoundingClientRect().width;
            let barleft = event.clientX - leftVal;
            cplay.skip(barleft / barWidth);
        })

        getEle('cplay-ctt .btn').onmousedown = function () {
            let leftVal = classEs.ctt.getBoundingClientRect().left;
            let barWidth = getEle('barbg').getBoundingClientRect().width;
            document.onmouseup = null;
            // 拖动一定写到 down 里面才可以
            document.onmousemove = function (event) {
                cplay.data.isDrag = true;
                let barleft = event.clientX - leftVal;
                let offset = barleft / barWidth;
                if (offset <= 0) {
                    offset = 0;
                } else if (offset > 1) {
                    offset = 1;
                }
                classEs.ctt.style.setProperty('width', (offset * 100) + '%');
                classEs.current.innerHTML = secondsToFormat((offset * cplay.audio.duration), false, 0);

                //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                window.getSelection ? window.getSelection().removeAllRanges() :
                    document.selection.empty();
            }
            document.onmouseup = function (event) {
                cplay.data.isDrag = false;
                if (document.onmousemove) {
                    let barleft = event.clientX - leftVal;
                    cplay.skip(barleft / barWidth);
                }
                document.onmousemove = null; //弹起鼠标不做任何操作
            }
        }
    }
    /** 歌词滚动 */
    function pageLyricsScroll(currentime, cplay) {
        if (cplay.data.index >= cplay.data.lyrics.length) {
            return;
        }
        if (cplay.data.index == -1 || cplay.getLyricsTime(cplay.data.index) <= currentime) {
            lyricsScroll(cplay, cplay.data.index);
            cplay.data.index++;
        }
    }

    /**
     * 歌词滚动到固定位置
     * @param {*} index 索引
     * @param {*} flag 是否有动画,默认true
     * @param {*} ha 固定的高度调整,默认向上调整100px
     */
    function lyricsScroll(cplay, index, flag = true, ha = 100) {
        for (const li of getEles('cplay-lyrics')) {
            li.classList.remove('active');
        }
        if (index == -1) {
            cplay.data.index = index = 0;
        } else {
            getEles('cplay-lyrics')[index].classList.add('active');
        }
        //获取滚动歌词到歌词栏顶端的距离
        let top = getEles('cplay-lyrics')[index].offsetTop;
        //获取已滚动的高度
        let clientheight = classEs.lyrics.clientHeight;

        let height = top - clientheight / 2 + ha;

        if (flag) {
            animate({
                duration: cplay.data.options.sad,
                /** ease-out */
                timing: function (timeFraction) {
                    return -timeFraction * timeFraction + 2 * timeFraction;
                },
                draw: function (progress) {
                    classEs.lyrics.scroll(0, (height - (1 - progress) * 39));
                }
            });
        } else {
            classEs.lyrics.scroll(0, height);
        }
    }

    function setLyricsIndex(cplay, currentime) {
        let orgtime = cplay.getLyricsTime(0);
        if (currentime < orgtime) {
            //不存在-1项，只是为了解决第0行高亮问题
            cplay.data.index = -1;
            return;
        }

        for (let i = 0; i < cplay.data.lyrics.length; i++) {
            if (i == cplay.data.lyrics.length - 1) {
                cplay.data.index = i;
                return;
            }
            if (cplay.getLyricsTime(i) <= currentime && currentime <= cplay.getLyricsTime(i + 1)) {
                cplay.data.index = i;
                return;
            }
        }
    }

    /** 歌词编辑 */
    function pageLyricsEdit(cplay) {
        addEve(classEs.edit, 'click', () => {
            lyricsEdit(cplay);
        });
        pageLyricsView(cplay);
    }

    function lyricsEdit(cplay) {
        cplay.data.isEdited = true;
        classEs.lyrics.onclick = null;
        if (cplay.data.isEdited) {
            hintBox(hints.edit);
            // console.log('编辑模式');
            /** 键盘操作 */
            pageEditShortcuts(cplay);
            /** 单击歌词修改 */
            classEs.lyrics.onclick = function (e) {
                if (e.target.children[0]) {
                    var ele = e.target.children[0];
                    let index = e.target.getAttribute('index');
                    ele.style.setProperty('display', 'inline-block');
                    document.onkeydown = null;

                    e.target.onmouseleave = function () {
                        lyricsSave(cplay, this.children[0], index);
                        pageEditShortcuts(cplay);
                    }
                }
            };
        }
    }

    function pageLyricsView(cplay) {
        addEve(classEs.overview, 'click', () => {
            lyricsView(cplay)
        });
    }

    function lyricsView(cplay) {
        cplay.data.isEdited = false;
        if (!cplay.data.isEdited) {
            hintBox(hints.view);
            //编辑事件解绑
            classEs.lyrics.onclick = null;
            for (const lyLi of getEles('cplay-lyrics')) {
                lyLi.onmouseleave = null;
            }
            document.onkeydown = null;
            pageShortcuts(cplay);
            setLyricsIndex(cplay, cplay.getCurrentTime());
        }
    }

    function lyricsSave(cplay, ele, index) {
        if (!(/^\[[0-9]{2}:[0-9]{2}\.[0-9]{3}\]$/.test(ele.innerText))) {
            alert('时间轴格式不对，请修改后保存');
            return false;
        }
        cplay.setLyricsTime(index, ele.innerText);
        ele.style.setProperty('display', 'none');
        return true;
    }

    /** 键盘快捷键 */
    function pageShortcuts(cplay) {
        // document.onkeydown = null;
        document.onkeydown = function (event) {
            var event = event || window.event;

            switch (event.key.toLowerCase()) {
                case ' ': // 开始暂停播放
                    playerCtrl(cplay);
                    break;
                default:
                    break;
            }
        }
    }

    function pageEditShortcuts(cplay) {
        // document.onkeydown = null;
        document.onkeydown = function (event) {
            var event = event || window.event;
            switch (event.key.toLowerCase()) {
                case 'enter': // 添加时间轴
                    if (cplay.data.index < cplay.data.lyrics.length) {
                        let time = cplay.getCurrentTime();
                        getEles('cplay-lyrics')[cplay.data.index].children[0].innerHTML = secondsToFormat(time, true);
                        lyricsSave(cplay, getEles('cplay-lyrics')[cplay.data.index].children[0], cplay.data.index);
                        lyricsScroll(cplay, cplay.data.index);
                        cplay.data.index++;
                    }
                    break;
                case 'q': // 歌词回滚
                    if (cplay.data.index > 1) {
                        cplay.data.index = cplay.data.index - 2;

                        let bftime = formatToSeconds(cplay.data.lyrics[cplay.data.index].time);
                        let offset = bftime / cplay.data.duration;
                        cplay.skip(offset);
                        classEs.ctt.style.setProperty('width', (offset * 100) + '%');
                        classEs.current.innerHTML = secondsToFormat(bftime, false, 0);
                        cplay.data.index++;
                    } else if (cplay.data.index == 1) {
                        let bftime = formatToSeconds('[00:00.000]');
                        cplay.skip(0);
                        classEs.ctt.style.setProperty('width', 0 + '%');
                        classEs.current.innerHTML = secondsToFormat(bftime, false, 0);
                    }
                    break;
                case 'enter': // 结束歌词编辑，并保存信息
                    break;
                case ' ': // 暂停播放和开始播放
                    playerCtrl(cplay);
                    break;
                default:
                    break;
            }
        }
    }

    /** 设置本地存储 */


    /** 歌词复制 */
    function pageCopyLyrics(cplay) {
        addEve(classEs.copy, 'click', function () {
            let contents = "";
            for (const ly of cplay.data.lyrics) {
                contents += `${ly.time}${ly.data}\n`;
            }
            copyTxt(contents);
        })
    }

    function copyTxt(text) {
        if (typeof document.execCommand !== "function") {
            console.log("歌词复制失败");
            return;
        }
        var dom = document.createElement("textarea");
        dom.value = text;
        dom.setAttribute('style', 'display: block;width: 1px;height: 1px;');
        document.body.appendChild(dom);
        dom.select();
        var result = document.execCommand('copy');
        document.body.removeChild(dom);
        if (result) {
            // console.log("歌词复制成功");
            hintBox(hints.copy);

            return;
        }
        if (typeof document.createRange !== "function") {
            console.log("歌词复制失败");
            return;
        }
        var range = document.createRange();
        var div = document.createElement('div');
        div.innerHTML = text;
        div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;');
        document.body.appendChild(div);
        range.selectNode(div);
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
        selection.addRange(range);
        document.execCommand('copy');
        // console.log("歌词复制成功");
        hintBox(hints.copy);
    }

    /** 模式切换提示 */
    function hintBox(content) {
        classEs.hintbox.innerHTML = content;
        animate({
            duration: 1000,
            /** ease-in */
            timing: function (timeFraction) {
                return timeFraction * timeFraction;
            },
            draw: function (progress) {
                classEs.hintbox.style.setProperty('transform', `translate(-50%, ${50 - 150 * progress}%)`);
                classEs.hintbox.style.setProperty('opacity', 1 - progress);
            }
        });
    }
    var hints = {
        edit: '编辑模式',
        view: '预览模式',
        copy: '复制成功'
    }

    /** 页面设置动画 */
    function settingBox() {
        addEve(classEs.setting, 'click', function () {
            // let bounding = makeEaseOut(bounce);
            animate({
                duration: 300,
                /** ease-in */
                timing: function (timeFraction) {
                    return timeFraction * timeFraction;
                },
                draw: function (progress) {
                    classEs.settingbox.style.setProperty('transform', `translate(${-150 + 150 * progress}%, 0%)`);
                }
            });
        });
        addEve(classEs.settingbox, 'mouseleave', function () {
            animate({
                duration: 200,
                /** ease-in */
                timing: function (timeFraction) {
                    return timeFraction * timeFraction;
                },
                draw: function (progress) {
                    classEs.settingbox.style.setProperty('transform', `translate(${ - 150 * progress}%, 0%)`);
                }
            });
        });
    }

    /** 动画效果 */

    function bounce(timeFraction) {
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
    }

    function makeEaseOut(timing) {
        return function (timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    }

    function animate({
        timing,
        draw,
        duration
    }) {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            // calculate the current animation state
            let progress = timing(timeFraction)
            draw(progress); // draw it
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    /**
     * 获取json文件内容
     * @param {*} file 
     * @returns 
     */
    async function readJsonFile(file) {
        return new Promise((resolve) => {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    resolve(JSON.parse(rawFile.responseText));
                }
            }
            rawFile.send(null);
        })
    }

    /** 绑定事件 */
    function addEve(media, eventName, callback, flag = false) {
        media.addEventListener(eventName, callback, flag);
    }
    /** 解绑事件 */
    function removeEve(media, eventName, functionName) {
        media.removeEventListener(eventName, functionName);
    }

    /** 获取元素 */
    function getEle(classE) {
        return document.querySelector(`.${classE}`);
    }

    function getEles(classE) {
        return document.querySelectorAll(`.${classE}`);
    }

    /**
     * 修复切换背景图时出现的“白色闪屏”现象
     * @param {} src 图片路径
     * @param {} callback 回调函数
     */
    function imagSwitch(src, callback) {
        let img = new Image();
        img.src = src;
        img.onload = function () {
            callback(this.src);
        }
    }

    /**
     * 格式时间转秒
     * @param {格式时间} time [00:00.000]
     * @param {*} flag true：表示有[],false：表示无[] ,默认true
     * @returns 秒
     */
    function formatToSeconds(time, flag = true) {
        var times = '[00:00.000]';
        if (flag) {
            times = time.slice(1, time.length - 1).split(':');
        } else {
            times = time.split(":");
        }
        return times[0] * 60 + times[1] * 1;
    }

    /**
     * 秒转格式时间
     * @param {*} time 单位：秒，默认会将字符串格式转数字
     * @param {*} flag true：表示有[],false：表示无[] ，默认true
     * @param {*} number 小数位数，默认3
     * @returns 格式[00:00.000]
     */
    function secondsToFormat(time, flag = true, number = 3) {
        var minute = Math.floor(time / 60);
        var second = numberToFixed((time % 60), number);
        if (second > 59) {
            minute += 1;
            second = numberToFixed(0, number);
        }
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return (flag ? `[${minute}:${second}]` : `${minute}:${second}`);
    }

    /**
     * 保留小数点后位数
     * @param {数字} data 数字
     * @param {位数} number 小数点后位数,默认3位
     * @returns 格式化数字,字符串
     */
    function numberToFixed(data, number = 3) {
        return (data).toFixed(number);
    }

    /**
     * 通过jsmediatags获取歌曲文件信息
     * @param {音频文件} musicfile mp3、flac格式
     * @returns {*} promise
     */
    async function getMusicInfo(musicfile) {
        return new Promise((resolve, reject) => {
            jsmediatags.read(musicfile, {
                onSuccess: function (tag) {
                    //生成图片url链接
                    var picture;
                    if (tag.tags.picture) {
                        var imageData = tag.tags.picture.data;
                        var base64String = "";
                        for (var i = 0; i < imageData.length; i++) {
                            base64String += String.fromCharCode(imageData[i]);
                        }
                        picture = ("data:" + tag.tags.picture.format + ";base64," + window.btoa(base64String));
                    }
                    resolve({
                        flag: true,
                        content: {
                            artist: tag.tags.artist || '未知',
                            title: tag.tags.title || '未知',
                            album: tag.tags.album || '未知',
                            picture: picture || contentInner
                        }
                    });
                },
                onError: reject
            })
        })

    }

    /**
     * 格式化上传的歌词文件，去除多余的空行
     * @param {歌词文件} file txt
     * @returns {*} promise
     */
    async function formatLyrics(file) {
        return new Promise((resolve, reject) => {
            let lyrics = [];
            let reader = new FileReader();
            if (file == '', file == undefined) {
                resolve({
                    flag: false,
                    content: 'error'
                })
            }
            reader.readAsText(file, 'utf8');
            reader.onload = () => {
                let data = reader.result.replace(/(\r\n|\r)/g, '\n');
                let arrdata = data.split('\n');
                arrdata.reduce((pre, cur) => {
                    if (pre == '' && pre == cur) {} else {
                        lyrics.push({
                            time: '[00:00.000]',
                            data: cur
                        });
                    }
                    return cur;
                }, undefined);
                resolve({
                    flag: true,
                    content: lyrics
                })
            }
        })

    }

    /** 清除事件 */
    /** 清除所有事件 */
})()