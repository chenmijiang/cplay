/**
 * cplay 用来 进行 数据渲染，数据处理，网页动画
 * 
 * 数据渲染：将后台处理的数据渲染到网页上。歌曲信息等，版本信息等，初始化设置等
 * 网页的动画（以 class 增删为主）：设置控件 的平移、唱片控件 滚动的旋转、
 * 
 * 
 * 注意：获取元素，统一改成 getXXXByXXX() 形式，这样就可以实时更新（相比于queryXXX）
 * 
 *  
 */
(function () {
    //获取音频文件信息所依赖的模块
    const jsmediatags = window.jsmediatags;


    /**
     * 设置一些可以改变的信息（目前未定）
     */
    Cplay = function (options) {
        this.options = options;
        // 用于初始化项目，数据渲染
    }

    /**
     * 将上传的 音频文件 和 歌词文件 转换成 对应的格式
     * 
     * @param {*} musicfile 
     * @param {*} lyricsfile 
     */
    Cplay.prototype.modifyFiles = function (musicfile, lyricsfile) {
        //对文件进行简单的校验： 
        //获取文件里面的信息
    }

    /***************************************************************
     * 下面是关于 数据渲染 的操作
     * 
     * 
     ***************************************************************/


    /***************************************************************
     * 下面是关于 数据处理 的操作
     * 
     * 
     ***************************************************************/

    /**
     * 处理上传的音频文件和歌词文件
     * 
     * 1. 获取音频文件的信息，如：专辑图片、歌手名、时长等
     * 2. 将歌词文件转换成相应的数组格式（除去多余的空格行）
     * 
     * 
     * @param {*} musicfile mp3、flac、wav格式
     * @param {*} lyricsfile txt
     */
    Cplay.prototype.dealUploadFile = function (musicfile, lyricsfile) {
        let _this = this;
        // 创建 音频文件 的 URL
        let url = URL.createObjectURL(musicfile);

        // 更换 this.audio 
        if (this.audio) {
            this.audio.src = url;
        } else {
            this.audio = new Audio(url);
        }

        //当音频文件 时长 发生改变的时候触发
        addEve(this.audio, 'durationchange', async function () {
            // 使用 await 同步获取 文件里面的信息
            let mdata = await getMusicInfo(musicfile);
            let ldata = await formatLyrics(lyricsfile);

            //将数据添加到 cplay 上，同时在这里 触发
        })
    }

    /***************************************************************
     * 下面是关于 数据获取 和 校验 的操作
     * 
     * 
     * *************************************************************
     */

    /**
     * 上传 文件
     * 
     */
    Cplay.prototype.uploadFile = function (file) {
        //对文件的校验，返回相应的信息
        //
    }


    /**
     * 通过请求获取 json文件
     * 
     * 请求方式 fetch 或者 XMLHttpRequest 
     * 
     * @param {*} url 请求的文件地址
     * @returns promise
     */
    async function readJSONFile(url) {
        if (fetch) {
            return fetch(url);
        } else {
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
    }


    /***************************************************************
     * 工具函数
     * 
     * 
     ***************************************************************/

    /**
     * 格式化的歌词文件
     * 
     * @param {*} file 格式采用 txt
     * @param {*} coding 默认采用 utf8
     * @returns promise({status,msg,data})
     */
    async function formatLyrics(file, coding = 'utf8') {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            if (file) {
                //文件不存在
                resolve({
                    status: false,
                    msg: '文件格式错误或文件不存在',
                    data: undefined
                })
            }
            reader.readAsText(file, coding);
            reader.onload = () => {
                // 兼容不同 操作系统的换行符, 统一采用 \n, 将多余的 \n 缩减到 两个(按照分段来处理)
                let dataArr = reader.result.replace(/(\r\n|\r)/g, '\n').replace(/(\n)\1+/g, '\n\n').split('\n');
                // 转换格式     {"time": "[00:04.000]","data": "作词 : kz"}
                let content = dataArr.map((element) => {
                    return {
                        time: '[00:00.000]',
                        data: element
                    }
                })
                resolve({
                    status: true,
                    msg: '格式化歌词文件成功',
                    data: content
                })
            }
        })

    }

    /**
     * 获取音频文件的信息，如：专辑图片、歌手名、专辑名
     * 
     * 调用 jsmediatags.js 获取信息，网址：https://github.com/aadsm/jsmediatags
     * 
     * @param {*} musicfile 
     * @param {*} contentInner 默认的专辑图片链接
     * @returns promise({status,msg,data})
     */
    async function getMusicInfo(musicfile, contentInner) {
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
                        status: true,
                        msg: '成功获取音频文件的信息',
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

})()