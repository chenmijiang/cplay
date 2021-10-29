const custom = new Scrollbot(".custom-scroll", 6).setStyle({
    "background": "rgb(226 226 226)",
    "z-index": "2"
}, {
    "background": "rgba(0,0,0,0)"
});
window.addEventListener('DOMContentLoaded', changeHeight);
window.addEventListener('resize', changeHeight);

const cplay = new Cplay();
const boxclose = document.querySelector('.close');
const boxopen = document.querySelector('#uploading');
const box = document.querySelector('#upload-file');

//上传文件
document.querySelector('#upload').onclick = () => {
    let musicFile = checkFile(document.querySelector("#music-file"));
    let lyricsFile = checkFile(document.querySelector('#lyrics-file'));

    if (!musicFile.flag || !lyricsFile.flag) {
        console.log('上传失败');
        return false;
    }
    cplay.changeFile(musicFile.content, lyricsFile.content);
}
//显示窗口
boxopen.onclick = () => {
    box.style.setProperty('display', 'block');
}
//关闭上传窗口
boxclose.onclick = () => {
    box.style.setProperty('display', 'none');
    for (const ele of document.querySelectorAll('.uploadfile')) {
        ele.style.setProperty('background-position', '-60px -60px');
    }
}
//文件检查
for (const ele of document.querySelectorAll('.file input')) {
    ele.onchange = function () {
        let file = checkFile(this);
        if (!file.flag) {
            alert(file.content);
        }
    }
}

function checkFile(file) {
    if (file.files[0]) {
        document.querySelector(`.${file.name} .uploadfile`).style.setProperty('background-position', '-60px -120px');
        return {
            flag: true,
            content: file.files[0]
        }
    } else {
        return {
            flag: false,
            content: '请上传文件'
        }
    }
}

//响适应高度
function changeHeight() {
    document.querySelector("body").style.height = document.documentElement.clientHeight + 'px';
}